import { open, write, read } from './storage.js';
import { PUT_SUCCESS } from './events.js';

class Stoxy extends HTMLElement {
    constructor() {
        super();
        window.addEventListener(PUT_SUCCESS, e => {
            if (e.detail.key === this.key) {
                this.stoxyUpdate(e.detail.data);
            }
        });
    }

    stoxyUpdate(event) {}

    async stoxyInit() {}

    connectedCallback() {
        this.stoxyInit();
    }
}

class StoxyString extends Stoxy {
    constructor() {
        super();
    }

    _parseKey() {
        const key = this.innerHTML;
        if (!key.includes('.')) {
            this.key = key;
            return;
        }
        const keyParts = key.split('.');
        this.key = keyParts.shift();
        this.parts = keyParts;
    }

    stoxyUpdate(data) {
        //TODO: Handle the object props kinda like in object variant.
        // Currently doesn't work with for example user.profileInfo.viewCount
        this.innerHTML = data;
    }

    async stoxyInit() {
        this._parseKey();
        const data = await read(this.key);
        if (!this.parts) {
            this.stoxyUpdate(data ? data : this.getAttribute('default'));
        } else {
            const parts = [...this.parts];
            let dataPart = data;
            while (parts.length > 0) {
                const partKey = parts.shift();
                dataPart = dataPart[partKey];
            }
            this.stoxyUpdate(dataPart ? dataPart : this.this.getAttribute('default'));
        }
    }

    static get observedAttributes() {
        return ['default'];
    }
}

class StoxyObject extends Stoxy {
    constructor() {
        super();
        this.key = this.getAttribute('key');
        this.content = this.innerHTML;
    }

    stoxyUpdate(data) {
        if (!data) return;
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
        this.innerHTML = newContent;
    }

    _replaceObject(newContent, regexKey, keyData) {
        if (!newContent.includes(regexKey)) {
            return newContent;
        }
        // TODO: Try to find a regex to fix case of "your name is user.name." with the period at end
        const objectPropertyRegex = new RegExp(`${regexKey}[^ <>]*`, 'g');
        const regexKeys = newContent.match(objectPropertyRegex);
        const foundProperties = regexKeys.map(k => k.replace(`${regexKey}.`, ''));
        for (const prop of foundProperties) {
            if (prop.includes('.')) {
                const regexKeyAddition = prop.split('.')[0];
                newContent = this._replaceObject(
                    newContent,
                    `${regexKey}.${regexKeyAddition}`,
                    keyData[regexKeyAddition],
                );
            } else {
                newContent = this._replaceString(newContent, `${regexKey}.${prop}`, keyData[prop]);
            }
        }
        return newContent;
    }

    _replaceString(newContent, regexKey, keyData) {
        return newContent.replace(new RegExp(regexKey, 'g'), keyData);
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

(async function init() {
    if (window.STOXY_INITIALIZED) return;

    await open(); // Open once to create the db
    window.STOXY_INITIALIZED = true;
})();

if (!customElements.get('stoxy-string')) {
    customElements.define('stoxy-string', StoxyString);
}

if (!customElements.get('stoxy-object')) {
    customElements.define('stoxy-object', StoxyObject);
}

export { read, write } from './storage.js';
