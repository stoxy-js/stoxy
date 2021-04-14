import { expect } from '@esm-bundle/chai';
import { write, read, clear, sub, persistKey } from '../lib/core';

// This test fails sometimes for no apparent reason
it('Should save data to IndexedDB if persistKey is set', async () => {
    persistKey("persistent-state-key");

    await write("persistent-state-key", { id: 123, name: "Stoxy" });
    const readResult = await read("persistent-state-key");

    const dataInDb = await getValueFromIndexedDb();

    expect(dataInDb.id).to.equal(123);
    expect(dataInDb.name).to.equal("Stoxy");
})

function getValueFromIndexedDb() {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open("StoxyStorage", 1);
        request.onsuccess = function(ev) {
            const db = ev.target.result;
            const transaction = db.transaction(["StoxyStorage"])
            const objectStore = transaction.objectStore("StoxyStorage");

            const query = objectStore.get("persistent-state-key");

            query.onsuccess = function(event) {
                const result = event.target.result;
                return resolve(result);
            }

            query.onerror = function(event) {
                console.log("ERROR");
                reject(query);
            }
        }

        request.onerror = function() {
            console.log("ERROR");
        }
    });
}
