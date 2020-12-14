import Stoxy from './stoxy.js';
import { read } from './stoxy-storage.js';

class StoxyString extends Stoxy {
    get placeholderKey() {
        return this._getKeyAndPartsAsString();
    }

    _getKeyAndPartsAsString() {
        return [this.key, ...this.parts].reduce((a, b) => `${a}.${b}`);
    }

    _parseKey() {
        const key = this.innerHTML.trim();
        const keyParts = key.split('.');
        this.key = keyParts.shift();
        this.parts = keyParts;
    }

    stoxyUpdate(data) {
        if (!data) return;
        if (typeof data === 'object') {
            const contentKey = this._getKeyAndPartsAsString();
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
