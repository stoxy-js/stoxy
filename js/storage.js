import { INIT_SUCCESS, PUT_SUCCESS, READ_SUCCESS } from './events.js';

const STOXY_VERSION_NUMBER = 1;
const STOXY_DATA_STORAGE = 'StoxyStorage';

function doEvent(name, data) {
    if (!data) {
        window.dispatchEvent(new Event('name'));
        return;
    }
    window.dispatchEvent(new CustomEvent(name, { detail: data }));
}

export function create() {
    open();
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
        open().then(db => {
            const transaction = db.transaction([STOXY_DATA_STORAGE], 'readwrite');
            transaction.onerror = event => {
                reject(event);
            };

            const objectStore = transaction.objectStore(STOXY_DATA_STORAGE);
            const readRequest = objectStore.get(key);
            readRequest.onsuccess = event => {
                console.log(event);
                const resultData = event.target.result;
                doEvent(READ_SUCCESS, { key, data: resultData });
                resolve(resultData);
            };
        });
    });
}

export function write(key, data) {
    return new Promise((resolve, reject) => {
        open().then(db => {
            const transaction = db.transaction([STOXY_DATA_STORAGE], 'readwrite');
            transaction.oncomplete = event => {
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

export function del(key) {}
