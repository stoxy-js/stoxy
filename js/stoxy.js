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
        this.key = this.innerHTML;
    }

    stoxyUpdate(data) {
        this.innerHTML = data;
    }

    async stoxyInit() {
        const data = await read(this.key);
        this.stoxyUpdate(data ? data : this.getAttribute('default'));
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
        const prefix = this.getAttribute('prefix');
        const keys = Object.keys(data);
        let newContent = this.content;
        keys.map(k => {
            const regexKey = prefix + k;
            const keyData = data[k];
            if (!keyData) return;
            newContent = newContent.replace(new RegExp(regexKey, 'g'), keyData);
        });
        this.innerHTML = newContent;
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
