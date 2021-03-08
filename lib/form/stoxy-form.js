import { write, add } from '@stoxy/core';

const template = document.createElement('template');
template.innerHTML = `<form></form>`;

class StoxyForm extends HTMLElement {
    constructor() {
        super();

        this.action = 'set';
        this.method = "GET";
        this.key = null;
        this.form = null;
        this.url = null;
        this.requireok = false;
        this.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.form = this.querySelector('form');
        const handleSubmit = this.handleSubmit.bind(this);
        this.form.addEventListener('submit', handleSubmit);
        this._updateFormProperties();
    }

    _updateFormProperties() {
        if (!this.form) return;
        const idString = 'story-form-' + this.key;
        this.form.id = idString;
        const inputElements = this.querySelectorAll('input, select, textarea');

        inputElements.forEach(inp => inp.setAttribute('form', idString));
    }

    async handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const submitData = {};

        for (const [key, val] of formData.entries()) {
            this._setFormDataEntryToData(key, val, submitData);
        }

        if (this.url) {
            let requestUrl = this.url;
            const requestData = {
                method: this.method
            }

            if (this.method === "GET") {
                const keys = Object.keys(submitData);
                if (keys.length > 0) {
                    requestUrl += "?";
                    for (const key of keys) {
                        requestUrl += `${key}=${submitData[key]}&`;
                    }
                    requestUrl = requestUrl.substring(0, requestUrl.length - 1);
                }
            } else {
                requestData.body = JSON.stringify(submitData);
            }

            let response;
            try {
                response = await fetch(requestUrl, requestData);
            } catch (err) {
                console.error(err);
                if (this.requireok) {
                    return;
                }
            }
            if (this.requireok && !response.ok) {
                return;
            }
        }

        switch (this.action) {
            case 'set':
                write(this.key, submitData);
                break;
            case "add":
                add(this.key, submitData);
                break;
            default:
                throw new Error('Stoxy form action not set to a valid value');
        }
    }

    _setFormDataEntryToData(key, val, submitData) {
        if (!key.includes('.')) {
            submitData[key] = val;
            return;
        }

        let elementReference = submitData;
        const keys = key.split('.');
        while (keys.length > 1) {
            const currentKey = keys.shift();
            if (typeof elementReference[currentKey] === 'undefined') {
                elementReference[currentKey] = {};
            }
            elementReference = elementReference[currentKey];
        }
        const finalKey = keys.shift();
        elementReference[finalKey] = val;
    }

    _parseKey(key) {
        const keyParts = key.split('.');
        this.key = keyParts.shift();
        this.parts = keyParts;

        this._updateFormProperties();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'key':
                this._parseKey(newValue);
                break;
            case "requireok":
                this[name] = newValue != null;
                break;
            default:
                this[name] = newValue;
        }
    }

    static get observedAttributes() {
        return ['action', 'key', 'method', 'url', 'requireok'];
    }
}

if (!customElements.get('stoxy-form')) {
    customElements.define('stoxy-form', StoxyForm);
}
