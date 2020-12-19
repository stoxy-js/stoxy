import { INIT_SUCCESS, PUT_SUCCESS, READ_SUCCESS, DELETE_SUCCESS } from './stoxy-events.js';

// TODO's:
//
// - Finish cacheing
// - Create a fetch queue (no need for all of the simoutaneous requests to
// access the db, just make them all listen to one promise and handle the resolved value)
// - Make implementation for cases where indexedDB doesn't work (just rely on cache, and se cache size
// to like Max int

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

export function openStorage() {
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
            return resolve(cachedObject);
        }

        openStorage().then(db => {
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
    if (cacheKeys.length > STOXY_CACHE_SIZE) {
        const keyToRemove = cacheKeys.shift();
        // Make this work nicer. delete is a ugly way to do this. Object.fromentries etc. is better
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
        openStorage().then(db => {
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
        openStorage().then(db => {
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
