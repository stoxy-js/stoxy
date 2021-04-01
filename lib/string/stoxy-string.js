import { read } from '@stoxy/core';
import StoxyElement from "@stoxy/element-base";

class StoxyString extends StoxyElement {
    _parseKey() {
        const key = this.innerHTML.trim();
        this.key = key;
    }

    stoxyUpdate(data) {
        if (!data) {
            this._updateContent(this.getNoDataValue());
            return;
        }
        let content;
        if (typeof data === 'object') {
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
            this.stoxyUpdate(this.getAttribute('default') || "");
            return;
        }
        this.stoxyUpdate(data);
        this._dispatchUpdatedEvent(data);
    }

    static get observedAttributes() {
        return ['default'];
    }
}

if (!customElements.get('stoxy-string')) {
    customElements.define('stoxy-string', StoxyString);
}
