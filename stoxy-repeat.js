import Stoxy from './stoxy.js';
import { read } from './stoxy-storage.js';

class StoxyRepeat extends Stoxy {
    constructor() {
        super();
        this.fullKey = this.getAttribute('key');
        this.key = this.fullKey.split('.').shift();
        this.content = this.innerHTML;
        this.originalNodes = this.childNodes;
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
        let newContent = [];
        for (const itData of iterableData) {
            console.log(itData);
            if (typeof itData !== 'object') {
                newContent.push(this._replaceString(contentTemplate, this.id, itData));
            } else {
                newContent.push(this._replaceObject(contentTemplate, `${this.id}`, itData));
            }
        }
        // This has to use the ugly innerHTML for now at least since the
        // updating of single elements can be iffy when working with arrays.
        //
        // If you ever come up with a solution that allows to only update needed keys of list,
        // implement it, but for now this has to do.
        this.innerHTML = newContent.reduce((a, b) => `${a}${b}`);
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
