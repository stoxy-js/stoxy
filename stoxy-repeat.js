import Stoxy from './stoxy.js';
import { read } from './stoxy-storage.js';

class StoxyRepeat extends Stoxy {
    constructor() {
        super();
        this.fullKey = this.getAttribute('key');
        this.key = this.fullKey.split('.').shift();
        this.content = this.innerHTML;
    }

    stoxyUpdate(data) {
        if (!data) return;

        const iterableData = this._getIterableData(data);
        if (!iterableData) {
            this.innerHTML = ``;
            return;
        }
        if (this.arrayIsUnchanged(iterableData)) {
            return;
        }
        this.iterableData = iterableData;

        const contentTemplate = this.content;
        let newContent = '';
        for (const itData of iterableData) {
            if (typeof itData !== 'object') {
                newContent += this._replaceString(contentTemplate, this.id, itData);
            } else {
                newContent += this._replaceObject(contentTemplate, `${this.id}`, itData);
            }
        }
        // TODO: Check if we could use the same update here as others
        // A problem might arise due to the repeat but let's see.
        // Maybe iterate through and call the function and add those
        // Maybe need to separate the concerns?
        // Or maybe just make the master update function handle arrays.
        this.innerHTML = newContent;
        this._setReady(true);
    }

    arrayIsUnchanged(iterableData) {
        return (
            Array.isArray(this.iterableData) &&
            Array.isArray(iterableData) &&
            this.iterableData.length === iterableData.length &&
            this.iterableData.every((val, index) => val === iterableData[index])
        );
    }

    /**
     * if the key provided was a property of object, search
     * the wanted value.
     *
     * e.g. key = user.profileInfo.languages
     * would access user["profileInfo"]["languages"]
     * */
    _getIterableData(data) {
        if (!this.fullKey.includes('.')) return data;
        const parts = this.fullKey.split('.');
        parts.shift(); // Remove the main key
        let d = data;
        while (parts.length > 0) {
            d = d[parts.shift()];
        }
        return d;
    }

    async stoxyInit() {
        const entity = this.key.split('.')[0];
        const data = await read(entity);
        this.stoxyUpdate(data);
    }

    static get observedAttributes() {
        return ['key', 'id'];
    }
}

if (!customElements.get('stoxy-repeat')) {
    customElements.define('stoxy-repeat', StoxyRepeat);
}
