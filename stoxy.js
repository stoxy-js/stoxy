import { PUT_SUCCESS, DELETE_SUCCESS } from './stoxy-events.js';
import { openStorage } from './stoxy-storage.js';

export default class Stoxy extends HTMLElement {
    constructor() {
        super();
    }

    getNoDataValue() {
        if (!this.hasAttribute('default')) {
            return this.placeholderKey;
        } else {
            return this.getAttribute('default');
        }
    }

    get placeholderKey() {
        return this.key;
    }

    stoxyUpdate(event) {}

    async stoxyInit() {}

    connectedCallback() {
        window.addEventListener(PUT_SUCCESS, e => {
            if (e.detail.key === this.key) {
                this.stoxyUpdate(e.detail.data);
            }
        });
        window.addEventListener(DELETE_SUCCESS, e => {
            if (e.detail.key === this.key) {
                this.stoxyUpdate();
            }
        });
        this.stoxyInit();
    }

    _setReady(isReady) {
        if (isReady) {
            this.setAttribute('ready', '');
        } else {
            this.removeAttribute('ready');
        }
    }

    /**
     * Update the content of the Stoxy Node with the
     * updated content
     *
     * Instead of replacing the whole innerHTML of the object, we
     * replace only the nodes inside the element.
     *
     * We also skip through the stoxy nodes not to re-attach them for performance
     * benefits.
     * */
    _updateContent(newContent) {
        // To access the childNodes, we must have a context for our content
        const newContentContext = document.createRange().createContextualFragment(newContent);
        const newContentNodes = newContentContext.childNodes;
        const childNodes = this.childNodes;
        childNodes.forEach(async (node, i) => {
            // Skip Stoxy instances
            if (node.nodeName.includes('STOXY')) return;
            const nodeValue = node.nodeValue;
            if (nodeValue && nodeValue.trim().length > 0) {
                if (nodeValue !== newContentNodes[i].nodeValue) {
                    node.nodeValue = newContentNodes[i].nodeValue;
                }
                return;
            }
            const nodeHTML = node.innerHTML;
            if (nodeHTML && nodeHTML.trim().length > 0) {
                // If the content didn't change, don't touch it
                if (nodeHTML !== newContentNodes[i].innerHTML) {
                    node.innerHTML = newContentNodes[i].innerHTML;
                }
            }
        });
    }

    _replaceObject(newContent, regexKey, keyData) {
        if (!newContent.includes(regexKey)) {
            return newContent;
        }
        // This regex might have a better solution..
        const objectPropertyRegex = new RegExp(`${regexKey}[\.A-Za-z0-9]*[^(.<>!,\`'" $)]`, 'g');
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
            return this.getNoDataValue();
        }
        const regexString = regexKey.replace('.', '\\.') + '(?=|[^.-])';
        return newContent.replace(new RegExp(regexString, 'g'), keyData);
    }
}

(async function init() {
    if (window.STOXY_INITIALIZED) return;

    await openStorage(); // Open once to create the db
    window.STOXY_INITIALIZED = true;
})();

export { openStorage, read, write, del, sub } from './stoxy-storage.js';
