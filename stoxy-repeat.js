import Stoxy from './stoxy.js';
import { read } from './stoxy-storage.js';

class StoxyRepeat extends Stoxy {
    constructor() {
        super();
        this.key = this.getAttribute('key');
        this.content = this.innerHTML;
    }

    stoxyUpdate(data) {
        if (!data) return;

        const contentTemplate = this.content;
        let newContent = '';
        const iterableData = this._getIterableData(data);
        for (const itData of iterableData) {
            // If wanted value is just a string, we can just easily replace it
            if (typeof itData !== 'object') {
                newContent += this._replaceString(contentTemplate, this.id, itData);
                continue;
            } else {
                newContent += this._replaceObject(contentTemplate, `${this.id}`, itData);
            }
        }
        this.innerHTML = newContent;
    }

    /**
     * if the key provided was a property of object, search
     * the wanted value.
     *
     * e.g. key = user.profileInfo.languages
     * would access user["profileInfo"]["languages"]
     * */
    _getIterableData(data) {
        if (!this.key.includes('.')) return data;
        const parts = this.key.split('.');
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
