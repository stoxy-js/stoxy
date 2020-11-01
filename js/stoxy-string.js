import Stoxy from './stoxy.js';
import { read } from './storage.js';

class StoxyString extends Stoxy {
    constructor() {
        super();
    }

    _parseKey() {
        const key = this.innerHTML;
        const keyParts = key.split('.');
        this.key = keyParts.shift();
        this.parts = keyParts;
    }

    stoxyUpdate(data) {
        if (!data) return;
        if (typeof data === 'object') {
            const contentKey = [this.key, ...this.parts].reduce((a, b) => `${a}.${b}`);
            const content = this._replaceObject(contentKey, this.key, data);
            this.innerHTML = content;
        } else {
            this.innerHTML = data;
        }
    }

    async stoxyInit() {
        this._parseKey();
        const data = await read(this.key);
        if (!data) {
            this.stoxyUpdate(this.getAttribute('default'));
            return;
        }
        this.stoxyUpdate(data);
    }

    static get observedAttributes() {
        return ['default'];
    }
}

if (!customElements.get('stoxy-string')) {
    customElements.define('stoxy-string', StoxyString);
}
