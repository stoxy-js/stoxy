import { INIT_SUCCESS, PUT_SUCCESS, READ_SUCCESS, DELETE_SUCCESS } from './stoxy-events.js';

const STOXY_VERSION_NUMBER = 1;
const STOXY_DATA_STORAGE = 'StoxyStorage';
const STOXY_CACHE_SIZE = 5;

if (window && !window._STOXY_STATE_CACHE) {
    window._STOXY_STATE_CACHE = {};
    window._STOXY_STATE_CACHE_KEYS = [];
    window._STOXY_LOCKS = {};
}

let persistKeys = [];
const cacheKeys = window._STOXY_STATE_CACHE_KEYS;
const cache = window._STOXY_STATE_CACHE;
const locks = window._STOXY_LOCKS;

let hasIDBAccess = true;

function canUseIDB() {
    return Boolean(window.indexedDB);
}

function lock(key, promise) {
    const topLevelKey = getTopLevelKey(key);
    if (!locks[topLevelKey]) locks[topLevelKey] = [];
    locks[topLevelKey].push(promise);
}

async function getLock(key, operation) {
    await new Promise(resolve => window.requestAnimationFrame(resolve));
    const topLevelKey = getTopLevelKey(key);

    const waitPromise = new Promise(async resolve => {
        const otherLocks = locks[topLevelKey] || [];
        await Promise.all(otherLocks);
        const result = await operation();
        resolve(result);
        locks[topLevelKey] = [];
    });
    lock(key, waitPromise);
    return waitPromise;
}

export function persistKey(...keyOrKeys) {
    persistKeys = [...persistKeys, ...keyOrKeys];
}

function shouldPersist(key) {
    return persistKeys.includes(key);
}

function getTopLevelKey(key) {
    return key.indexOf(".") === -1 ? key : key.split(".")[0];
}

function doEvent(name, data) {
    if (!data) {
        window.dispatchEvent(new Event(name));
        return;
    }
    window.dispatchEvent(new CustomEvent(name, { detail: data }));
}

export function sub(key, callback) {
    const putCallback = e => {
        if (shouldReact(e, key)) {
            const putEvent = copyObject(e.detail);
            putEvent.data = getPropertyAtKey(putEvent.data, key);
            putEvent.action = 'Update';
            callback(putEvent);
        }
    };

    const deleteCallback = e => {
        if (shouldReact(e, key)) {
            const delEvent = e.detail;
            delEvent.action = 'Delete';
            callback(delEvent);
        }
    };

    window.addEventListener(PUT_SUCCESS, putCallback);
    window.addEventListener(DELETE_SUCCESS, deleteCallback);

    // Return remover
    return () => {
        window.removeEventListener(PUT_SUCCESS, putCallback);
        window.removeEventListener(DELETE_SUCCESS, deleteCallback);
    }
}

function shouldReact(event, key) {
    const eventKey = event.detail.key
    if (key.indexOf(".") === -1) {
        const topLevelKey = eventKey.split(".")[0];
        return key === topLevelKey;
    }

    const eventKeySplit = eventKey.split(".");
    const keySplit = key.split(".");

    if (eventKeySplit.length >= 1 && keySplit.length >= 1) {
        let targetSameKey = true;
        while (eventKeySplit.length > 0 && keySplit.length > 0) {
            const eventKeyPart = eventKeySplit.shift();
            const keyPart = keySplit.shift();
            if (keyPart !== eventKeyPart) {
                targetSameKey = false;
                break;
            }
        }

        return targetSameKey;
    }
    return true;
}

function getPropertyAtKey(data, key) {
    // TODO: Merge this function with fetchFromCache
    if (key.indexOf(".") === -1) return data;

    const keyParts = key.split(".");
    let currentKey = keyParts.shift();
    let property = data;
    while (keyParts.length > 0) {
        currentKey = keyParts.shift();
        if (typeof property === "undefined")
            break;

        property = property[currentKey];
    }
    return property != null ? property : null;;
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
        // Reset keys
        Object.keys(cache).forEach(key => delete cache[key]);
        cacheKeys.length = 0;;
        return;
    }
    cacheKeys.splice(cacheKeys.indexOf(key), 1);
    delete cache[key];
}

//TODO: Test if read locks cause perf issue
export async function read(key) {
    return await getLock(key, async () => readTransaction(key));
}

function readTransaction(key) {
    return new Promise((resolve, reject) => {
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
}

export async function where(key, predicate) {
    const data = await read(key);
    if (!data) return data;

    return data.filter(d => predicate(d));
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

export async function write(key, data) {
    const dataCopy = copyObject(data);
    return await getLock(key, async () => writeTransaction(key, dataCopy))
}

function writeTransaction(key, data) {
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
        });
    });
}

function writeToKeyInStore(key, data, db, resolve, reject) {
    const keyParts = key.split('.');
    const topLevelKey = keyParts.shift();
    readTransaction(topLevelKey).then(keyData => {
        const dataToWrite = keyData ? copyObject(keyData) : {};
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

        writeToStore(topLevelKey, dataToWrite, db, resolve, reject, key);
    });
}

function writeToStore(key, data, db, resolve, reject, originalKey) {
    if (originalKey === undefined) originalKey = key;
    if (!canUseIDB() || !hasIDBAccess || !shouldPersist(key)) {
        updateCache(key, data);
        doEvent(PUT_SUCCESS, { key: originalKey, data });
        return resolve({ key, data });
    }
    const transaction = createWriteTransaction(key, data, db, resolve, reject, originalKey);
    const objectStore = transaction.objectStore(STOXY_DATA_STORAGE);
    objectStore.put(data, key);
    // No need to resolve here since it's done inside the transaction
}

function createWriteTransaction(key, data, db, resolve, reject, originalKey) {
    const transaction = db.transaction([STOXY_DATA_STORAGE], 'readwrite');
    transaction.oncomplete = event => {
        invalidateCache(key);
        doEvent(PUT_SUCCESS, { key: originalKey, data });
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
            if (key) {
                objectStore.delete(key);
            } else {
                objectStore.clear();
            }
        });
    });
}

export async function update(key, predicate) {
    return await getLock(key, async () => updateTransaction(key, predicate));
}

function updateTransaction(key, predicate) {
    return new Promise(async (resolve) => {
        const keyParts = key.split(".");
        const topLevelKey = keyParts.shift();
        let keyData = await readTransaction(topLevelKey);

        while (keyParts.length > 0) {
            const currentKey = keyParts.shift();
            if (typeof keyData === "undefined")
                break;

            keyData = keyData[currentKey];
        }
        const result = await writeTransaction(key, predicate(keyData));
        resolve(result);
    })
}

export async function add(key, data) {
    return await getLock(key, async () => addTransaction(key, data));
}

function addTransaction(key, data) {
    return new Promise(async (resolve) => {
        let keyData = await readTransaction(key);
        if (!keyData)
            keyData = [];
        const result = await writeTransaction(key, [...keyData, data]);
        resolve(result);

    });
}

export async function remove(key, predicate) {
    return await getLock(key, async () => removeTransaction(key, predicate));
}

function removeTransaction(key, predicate) {
    return new Promise(async resolve => {
        readTransaction(key).then(keyData => {
            if (!keyData) return;
            writeTransaction(
                key,
                keyData.filter(d => !predicate(d)),
            ).then(res => resolve(res));
        });
    });
}

function copyObject(obj) {
    const type = typeof obj;
    if (type !== "object") {
        return obj;
    }

    const isArray = Array.isArray(obj);
    let newObj;
    if (isArray) {
        newObj = obj.map(entry => copyObject(entry));
    } else {
        newObj = {};
        for (const [key, val] of Object.entries(obj)) {
            newObj[key] = copyObject(val);
        }
    }
    return newObj;
}
