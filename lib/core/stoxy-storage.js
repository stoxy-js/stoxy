import { INIT_SUCCESS, PUT_SUCCESS, READ_SUCCESS, DELETE_SUCCESS } from './stoxy-events.js';

const STOXY_VERSION_NUMBER = 1;
const STOXY_DATA_STORAGE = 'StoxyStorage';
const STOXY_CACHE_SIZE = 5;

if (window && !window._STOXY_STATE_CACHE) {
    window._STOXY_STATE_CACHE = {};
    window._STOXY_STATE_CACHE_KEYS = [];
}

let persistKeys = [];
const cacheKeys = window._STOXY_STATE_CACHE_KEYS;
const cache = window._STOXY_STATE_CACHE;

let hasIDBAccess = true;

function canUseIDB() {
    return Boolean(window.indexedDB);
}

export function persistKey(...keyOrKeys) {
    persistKeys = [...persistKeys, ...keyOrKeys];
}

function shouldPersist(key) {
    return persistKeys.includes(key);
}

function doEvent(name, data) {
    if (!data) {
        window.dispatchEvent(new Event(name));
        return;
    }
    window.dispatchEvent(new CustomEvent(name, { detail: data }));
}

export function sub(key, callback) {
    window.addEventListener(PUT_SUCCESS, e => {
        if (e.detail.key === key) {
            const putEvent = e.detail;
            putEvent.action = 'Update';
            callback(e.detail);
        }
    });
    window.addEventListener(DELETE_SUCCESS, e => {
        if (e.detail.key === key) {
            const delEvent = e.detail;
            delEvent.action = 'Delete';
            callback(delEvent);
        }
    });
}

export function openStorage() {
    if (!canUseIDB()) return new Promise(resolve => resolve());
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(STOXY_DATA_STORAGE, STOXY_VERSION_NUMBER);
        request.onsuccess = event => {
            doEvent(INIT_SUCCESS);
            resolve(event.target.result);
        };
        request.onerror = event => {
            reject(event);
        };
        request.onupgradeneeded = upgrade;
    });
}

function upgrade(event) {
    const db = event.target.result;
    db.createObjectStore(STOXY_DATA_STORAGE);
}

function fetchFromCache(key) {
    const keyParts = key.split(".");
    const topLevelKey = keyParts.shift();
    let cachedObject = cache[topLevelKey];

    while (keyParts.length > 0) {
        const currentKey = keyParts.shift();
        if (typeof cachedObject === "undefined")
            break;

        cachedObject = cachedObject[currentKey];
    }

    return cachedObject != null ? cachedObject : null;
}

function updateCache(key, data) {
    if (!cacheKeys.includes(key)) {
        cacheKeys.push(key);
    }
    cache[key] = data;
    // If we have persisted keys in cache, we remove one of them to make room
    if (canUseIDB() && cacheKeys.length > STOXY_CACHE_SIZE) {
        for (let i = cacheKeys.length; i >= 0; i--) {
            const cacheKey = cacheKeys[i];
            if (persistKeys.includes(cacheKey)) {
                persistKeys.splice(i, 1);
                delete cache[cacheKey];
                break;
            }
        }
    }
}

function invalidateCache(key) {
    // If no key is provide, invalidate whole cache
    if (!key) {
        cache = {};
        cacheKeys = [];
        return;
    }
    cacheKeys.splice(cacheKeys.indexOf(key), 1);
    delete cache[key];
}

export function read(key) {
    const readPromise = new Promise((resolve, reject) => {
        const cachedObject = fetchFromCache(key);
        if ((cachedObject != null && typeof cachedObject !== "undefined") || !canUseIDB() || !hasIDBAccess) {
            // To prevent direct array reference. Needed for stoxy repeat to work when e.g. sorting
            if (Array.isArray(cachedObject)) {
                return resolve([...cachedObject]);
            }
            return resolve(cachedObject);
        }

        openStorage().then(db => {
            readFromStore(key, db, resolve, reject);
        }).catch(() => {
            if (hasIDBAccess) {
                hasIDBAccess = false;
                console.warn("Stoxy can't access IndexedDB. Using in-memory storage");
            }
            resolve(read(key));
        });
    });
    return readPromise;
}

function readFromStore(key, db, resolve, reject) {
    const transaction = db.transaction([STOXY_DATA_STORAGE], 'readwrite');
    transaction.onerror = event => {
        reject(event);
    };

    const objectStore = transaction.objectStore(STOXY_DATA_STORAGE);

    if (!key.includes('.')) {
        const readRequest = objectStore.get(key);
        readRequest.onsuccess = event => {
            const resultData = event.target.result;
            if (resultData) {
                updateCache(key, resultData);
            }
            doEvent(READ_SUCCESS, { key, data: resultData });
            resolve(resultData);
        };
    } else {
        const keyParts = key.split(".");
        const topLevelKey = keyParts.shift();
        const readRequest = objectStore.get(topLevelKey);

        readRequest.onsuccess = event => {
            const resultData = event.target.result;

            let keyData = resultData;
            while (keyParts.length > 0) {
                const currentKey = keyParts.shift();
                if (typeof keyData === "undefined")
                    break;

                keyData = keyData[currentKey];
            }

            if (keyData) {
                updateCache(key, keyData);
            }
            doEvent(READ_SUCCESS, { key, data: keyData });
            resolve(keyData);
        };
    }
}

export function write(key, data) {
    return new Promise((resolve, reject) => {
        openStorage().then(db => {
            // If writing on top level
            if (!key.includes('.')) {
                writeToStore(key, data, db, resolve, reject);
            } else {
                // If we're only writing to a property of data
                writeToKeyInStore(key, data, db, resolve, reject);
            }
        }).catch(() => {
            if (hasIDBAccess) {
                hasIDBAccess = false;
                console.warn("Stoxy can't access IndexedDB. Using in-memory storage");
            }
            if (!key.includes('.')) {
                writeToStore(key, data, null, resolve, reject);
            } else {
                // If we're only writing to a property of data
                writeToKeyInStore(key, data, null, resolve, reject);
            }
        });;
    });
}

function writeToKeyInStore(key, data, db, resolve, reject) {
    const keyParts = key.split('.');
    const topLevelKey = keyParts.shift();
    read(topLevelKey).then(keyData => {
        const dataToWrite = keyData || {};
        let elementReference = dataToWrite;
        while (keyParts.length > 1) {
            const currentKey = keyParts.shift();
            if (typeof elementReference[currentKey] === 'undefined') {
                elementReference[currentKey] = {};
            }
            elementReference = elementReference[currentKey];
        }
        const finalKey = keyParts.shift();
        elementReference[finalKey] = data;

        writeToStore(topLevelKey, dataToWrite, db, resolve, reject);
    });
}

function writeToStore(key, data, db, resolve, reject) {
    if (!canUseIDB() || !hasIDBAccess || !shouldPersist(key)) {
        updateCache(key, data);
        doEvent(PUT_SUCCESS, { key, data });
        return resolve({ key, data });
    }
    const transaction = createWriteTransaction(key, data, db, resolve, reject);
    const objectStore = transaction.objectStore(STOXY_DATA_STORAGE);
    objectStore.put(data, key);
}

function createWriteTransaction(key, data, db, resolve, reject) {
    const transaction = db.transaction([STOXY_DATA_STORAGE], 'readwrite');
    transaction.oncomplete = event => {
        invalidateCache(key);
        doEvent(PUT_SUCCESS, { key, data });
        resolve({ key, data });
    };
    transaction.onerror = event => {
        reject(event);
    };
    return transaction;
}

export function clear(key) {
    return new Promise((resolve, reject) => {
        if (!hasIDBAccess || !canUseIDB()) {
            invalidateCache(key);
            doEvent(DELETE_SUCCESS, { key });
            return resolve();
        }
        openStorage().then(db => {
            const transaction = db.transaction([STOXY_DATA_STORAGE], 'readwrite');
            transaction.oncomplete = event => {
                invalidateCache(key);
                doEvent(DELETE_SUCCESS, { key });
                resolve();
            };
            transaction.onerror = event => {
                reject();
            };

            const objectStore = transaction.objectStore(STOXY_DATA_STORAGE);
            objectStore.delete(key);
        });
    });
}

export async function update(key, predicate) {
    const keyParts = key.split(".");
    const topLevelKey = keyParts.shift();
    let keyData = await read(topLevelKey);

    while (keyParts.length > 0) {
        const currentKey = keyParts.shift();
        if (typeof keyData === "undefined")
            break;

        keyData = keyData[currentKey];
    }

    return await write(key, predicate(keyData));
}

export async function add(key, data) {
    let keyData = await read(key);
    if (!keyData)
        keyData = [];
    return await write(key, [...keyData, data]);
}

export async function remove(key, predicate) {
    return read(key).then(keyData => {
        if (!keyData) return;
        write(
            key,
            keyData.filter(d => !predicate(d)),
        );
    });
}
