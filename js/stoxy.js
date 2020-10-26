import { open, write } from './storage.js';
import { PUT_SUCCESS } from './events.js';

class Stoxy extends HTMLElement {
    constructor() {
        super();
        window.addEventListener(PUT_SUCCESS, e => {
            console.log('Update', e);
        });
    }

    connectedCallback() {
        console.log(this.innerHTML);
    }

    static get observedAttributes() {
        return ['default'];
    }
}

const init = async () => {
    if (window.STOXY_INITIALIZED) return;

    await open(); // Open once to create the db
    window.STOXY_INITIALIZED = true;
};

if (!customElements.get('stoxy-get')) {
    init();
    customElements.define('stoxy-get', Stoxy);
}

export { read, write } from './storage.js';
