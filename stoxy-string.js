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
        if (!data) {
            this._updateContent(this.getNoDataValue());
            return;
        }
        let content;
        if (typeof data === 'object') {
            const contentKey = this._getKeyAndPartsAsString();
            content = this._replaceObject(contentKey, this.key, data);
        } else {
            content = data;
        }
        this._updateContent(content);
        this._setReady(true);
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
