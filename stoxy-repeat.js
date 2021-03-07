import Stoxy from './stoxy.js';
import { read } from './stoxy-storage.js';

class StoxyRepeat extends Stoxy {
    constructor() {
        super();
        this.fullKey = this.getAttribute('key');
        this.key = this.fullKey.split('.').shift();
        this.content = this.innerHTML.trim();
        this.contentNodeCount = document.createRange().createContextualFragment(this.content).length;
    }

    stoxyUpdate(data) {
        if (!data) {
            this.innerHTML = '';
            return;
        }

        const iterableData = this._getIterableData(data);
        if (!iterableData || iterableData.length < 1) {
            this.innerHTML = ``;
            return;
        }
        if (this.arrayIsUnchanged(iterableData)) {
            return;
        }
        if (!this.hasAttribute("ready")) {
            this.innerHTML = "";
        }
        this.iterableData = iterableData;

        const contentTemplate = this.content;
        let newContent = [];
        for (const itData of iterableData) {
            if (typeof itData !== 'object') {
                newContent.push(this._replaceString(contentTemplate, this.id, itData));
            } else {
                newContent.push(this._replaceObject(contentTemplate, `${this.id}`, itData));
            }
        }
        if (newContent.length < 1) return;

        const newContentHTML = newContent.reduce((a, b) => `${a}${b}`);

        const newContentContext = document.createRange().createContextualFragment(newContentHTML);
        const newContentNodes = [...newContentContext.childNodes];
        const previousNodes = [...this.childNodes];

        const currentNodesMapped = this.mapNodesByName(previousNodes);
        const newNodesMapped = this.mapNodesByName(newContentNodes);

        // Remove elements that are not present anymore
        previousNodes.forEach(childNode => {
            const nodesWithSameName = newNodesMapped[childNode.nodeName] || [];
            const isRemoved = !nodesWithSameName.some(n => childNode.outerHTML === n.outerHTML);
            if (isRemoved) {
                childNode.remove();
            }
        });

        // Add missing elements
        newContentNodes.forEach(newNode => {
            const nodesWithSameName = currentNodesMapped[newNode.nodeName] || [];
            const isPresent = nodesWithSameName.some(n => newNode.outerHTML === n.outerHTML);
            if (!isPresent) {
                this.appendChild(newNode.cloneNode(true));
            }
        });

        // See which elements are falsly ordered
        const currentNodes = this.childNodes;
        currentNodes.forEach((n, i) => {
            if (n.outerHTML !== newContentNodes[i].outerHTML) {
                const correspondingNode = newContentNodes.filter(cn => cn.outerHTML === n.outerHTML)[0]
                const correctIndex = newContentNodes.indexOf(correspondingNode);
                currentNodes[correctIndex].before(n);
            }
        });


        this._setReady(true);
    }

    mapNodesByName(nodes) {
        const nodesMapped = {};
        nodes.forEach(n => {
            const nName = n.nodeName;
            if (!nodesMapped[nName]) nodesMapped[nName] = [];
            nodesMapped[nName].push(n);
        });
        return nodesMapped;
    }

    arrayIsUnchanged(iterableData) {
        return (
            Array.isArray(this.iterableData) &&
            Array.isArray(iterableData) &&
            this.iterableData.length === iterableData.length &&
            this.iterableData.every((val, index) => val === iterableData[index])
        );
    }

    /**
     * if the key provided was a property of object, search
     * the wanted value.
     *
     * e.g. key = user.profileInfo.languages
     * would access user["profileInfo"]["languages"]
     * */
    _getIterableData(data) {
        if (!this.fullKey.includes('.')) return data;
        const parts = this.fullKey.split('.');
        parts.shift(); // Remove the main key
        let d = data;
        while (parts.length > 0) {
            d = d[parts.shift()];
        }
        return d;
    }

    async stoxyInit() {
        const entity = this.key.split('.')[0];
        const data = await read(entity);
        this.stoxyUpdate(data);
    }

    static get observedAttributes() {
        return ['key', 'id'];
    }
}

if (!customElements.get('stoxy-repeat')) {
    customElements.define('stoxy-repeat', StoxyRepeat);
}
