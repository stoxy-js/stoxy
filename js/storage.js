import { INIT_SUCCESS, PUT_SUCCESS, READ_SUCCESS, DELETE_SUCCESS } from './events.js';

const STOXY_VERSION_NUMBER = 1;
const STOXY_DATA_STORAGE = 'StoxyStorage';
const STOXY_CACHE_SIZE = 5;

const cacheKeys = [];
const cache = {};

function doEvent(name, data) {
    if (!data) {
        window.dispatchEvent(new Event('name'));
        return;
    }
    window.dispatchEvent(new CustomEvent(name, { detail: data }));
}

export function open() {
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

export function read(key) {
    return new Promise((resolve, reject) => {
        const cachedObject = fetchFromCache(key);
        if (cachedObject) {
            console.log('Cache hit');
            return resolve(cachedObject);
        }

        open().then(db => {
            console.log('Read Transaction started, because key ' + key + ' was not in the cache');
            const transaction = db.transaction([STOXY_DATA_STORAGE], 'readwrite');
            transaction.onerror = event => {
                reject(event);
            };

            const objectStore = transaction.objectStore(STOXY_DATA_STORAGE);
            const readRequest = objectStore.get(key);
            readRequest.onsuccess = event => {
                const resultData = event.target.result;
                if (resultData) {
                    updateCache(key, resultData);
                }
                doEvent(READ_SUCCESS, { key, data: resultData });
                resolve(resultData);
            };
        });
    });
}

function fetchFromCache(key) {
    const cachedObject = cache[key];
    return cachedObject ? cachedObject : null;
}

function updateCache(key, data) {
    if (!cacheKeys.includes(key)) {
        cacheKeys.push(key);
    }
    cache[key] = data;
    if (cacheKeys.length > 5) {
        const keyToRemove = cacheKeys.shift();
        delete cache[keyToRemove];
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

export function write(key, data) {
    return new Promise((resolve, reject) => {
        open().then(db => {
            const transaction = db.transaction([STOXY_DATA_STORAGE], 'readwrite');
            transaction.oncomplete = event => {
                invalidateCache(key);
                doEvent(PUT_SUCCESS, { key, data });
                resolve(event);
            };
            transaction.onerror = event => {
                reject(event);
            };

            const objectStore = transaction.objectStore(STOXY_DATA_STORAGE);
            objectStore.put(data, key);
        });
    });
}

export function del(key) {
    return new Promise((resolve, reject) => {
        open().then(db => {
            const transaction = db.transaction([STOXY_DATA_STORAGE], 'readwrite');
            transaction.oncomplete = event => {
                invalidateCache(key);
                doEvent(DELETE_SUCCESS, { key });
                resolve(event);
            };
            transaction.onerror = event => {
                reject(event);
            };

            const objectStore = transaction.objectStore(STOXY_DATA_STORAGE);
            objectStore.delete(key);
        });
    });
}
