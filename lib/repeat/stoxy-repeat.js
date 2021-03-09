import Stoxy, { read } from '@stoxy/core';

class StoxyRepeat extends Stoxy {
    constructor() {
        super();
        this.fullKey = this.getAttribute('key');
        this.key = this.fullKey.split('.').shift();
        this.content = this.innerHTML.trim();
        this.contentNodeCount = document.createRange().createContextualFragment(this.content).length;
        this.previousNodes = [];
    }

    stoxyUpdate(data) {
        if (!data) {
            this.innerHTML = '';
            this.previousNodes = [];
            return;
        }

        const iterableData = this._getIterableData(data);
        if (!iterableData || iterableData.length < 1) {
            this.innerHTML = ``;
            this.previousNodes = [];
            return;
        }
        if (this.arrayIsUnchanged(iterableData)) {
            return;
        }
        if (!this.hasAttribute('ready')) {
            this.innerHTML = '';
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

        // Remove elements that are not present anymore
        const removedNodes = [];
        this.previousNodes.forEach(childNode => {
            const isRemoved = !newContentNodes.some(n => childNode.originalOuterHTML === n.outerHTML);
            if (isRemoved) {
                removedNodes.push(childNode.node);
                childNode.node.remove();
            }
        });

        this.previousNodes = this.previousNodes.filter(n => !removedNodes.includes(n.node));

        // Add missing elements
        newContentNodes.forEach((newNode, i) => {
            const isPresent = this.previousNodes.some(n => newNode.outerHTML === n.originalOuterHTML);
            if (!isPresent) {
                const newNodeClone = newNode.cloneNode(true);
                const newNodeObject = { node: newNodeClone, originalOuterHTML: newNode.outerHTML };

                this.previousNodes = this.arrayPut(this.previousNodes, i, newNodeObject);
                this.appendChild(newNodeClone);
            }
        });

        // See which elements are falsly ordered
        const currentNodes = this.childNodes;
        let sortedPreviousNodes = [];
        const previousOrder = this.previousNodes.map(n => n.originalOuterHTML);
        newContentNodes.forEach((ncn, i) => {
            const corresponding = this.previousNodes.find(pn => pn.originalOuterHTML === ncn.outerHTML);
            const oldIndex = previousOrder.indexOf(corresponding.originalOuterHTML);
            sortedPreviousNodes.push(corresponding);
            if (i !== oldIndex) {
                currentNodes[i].before(corresponding.node);
            }
        });
        this.previousNodes = sortedPreviousNodes;

        this._setReady(true);
    }

    arrayMove(arr, oldIndex, newIndex) {
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
        return arr;
    }

    arrayPut(arr, index, object) {
        arr = [...arr.slice(0, index), object, ...arr.slice(index)];
        return arr;
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
