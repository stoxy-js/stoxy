import { PUT_SUCCESS, DELETE_SUCCESS } from './stoxy-events.js';
import { openStorage } from './stoxy-storage.js';

export default class Stoxy extends HTMLElement {
    constructor() {
        super();
        window.addEventListener(PUT_SUCCESS, e => {
            if (e.detail.key === this.key) {
                this.stoxyUpdate(e.detail.data);
            }
        });
        window.addEventListener(DELETE_SUCCESS, e => {
            if (e.detail.key === this.key) {
                this.setNoDataValue();
            }
        });
    }

    setNoDataValue() {}

    stoxyUpdate(event) {}

    async stoxyInit() {}

    connectedCallback() {
        this.stoxyInit();
    }

    _replaceObject(newContent, regexKey, keyData) {
        if (!newContent.includes(regexKey)) {
            return newContent;
        }
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
        if (typeof keyData === 'undefined' || keyData === 'undefined') {
            keyData = regexKey;
        }
        const regexString = regexKey.replace('.', '.') + '(?=|[^.-])';
        return newContent.replace(new RegExp(regexString, 'g'), keyData);
    }
}

(async function init() {
    if (window.STOXY_INITIALIZED) return;

    await openStorage(); // Open once to create the db
    window.STOXY_INITIALIZED = true;
})();

export { openStorage, read, write, del } from './stoxy-storage.js';
