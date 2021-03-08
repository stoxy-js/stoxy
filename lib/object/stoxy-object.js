import Stoxy, { read } from '@stoxy/core';

class StoxyObject extends Stoxy {
    constructor() {
        super();
        this.key = this.getAttribute('key');
        this.content = this.innerHTML;
    }

    stoxyUpdate(data) {
        if (!data) {
            this._updateContent(this.content);
            return;
        }
        const prefix = this.getAttribute('prefix');
        const keys = Object.keys(data);
        let newContent = this.content;
        keys.map(k => {
            const regexKey = prefix + k;
            const keyData = data[k];
            if (!keyData) return;

            if (typeof keyData === 'object') {
                newContent = this._replaceObject(newContent, regexKey, keyData);
            } else {
                newContent = this._replaceString(newContent, regexKey, keyData);
            }
        });
        this._updateContent(newContent);
        this._setReady(true);
    }

    async stoxyInit() {
        const key = this.getAttribute('key');
        const data = await read(key);
        this.stoxyUpdate(data);
    }

    static get observedAttributes() {
        return ['key', 'prefix'];
    }
}

if (!customElements.get('stoxy-object')) {
    customElements.define('stoxy-object', StoxyObject);
}
