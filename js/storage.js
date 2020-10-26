import { INIT_SUCCESS, PUT_SUCCESS } from './events.js';

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

export function read() {}

export function write(key, data) {
    return new Promise((resolve, reject) => {
        open().then(db => {
            const transaction = db.transaction([STOXY_DATA_STORAGE], 'readwrite');
            transaction.oncomplete = event => {
                doEvent(PUT_SUCCESS, data);
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
