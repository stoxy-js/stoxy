import { write, read, del } from 'stoxy';

export default class UpdateView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(UpdateView.template.content.cloneNode(true));
    }

    connectedCallback() {
        this.form = this.shadowRoot.querySelector('form');
        this.writeOnKeyUpRef = this._writeOnKeyUp.bind(this);
        this.form.addEventListener('submit', this._writeFormData.bind(this));

        this.shadowRoot.querySelector('#onkey-update').addEventListener('input', e => {
            if (e.target.checked) {
                this.form.querySelectorAll('input:not([type="submit"])').forEach(inp => {
                    inp.addEventListener('keyup', this.writeOnKeyUpRef);
                });
            } else {
                this.form.querySelectorAll('input:not([type="submit"])').forEach(inp => {
                    inp.removeEventListener('keyup', this.writeOnKeyUpRef);
                });
            }
        });

        this.shadowRoot.querySelector('#del-button').addEventListener('click', () => {
            del('user');
        });

        this._initInputs();
    }

    _writeOnKeyUp(e) {
        this.shadowRoot.querySelector("input[type='submit']").click();
    }

    async _writeFormData(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        const data = (await read('user')) || {};
        data.firstName = formData.get('firstName');
        data.lastName = formData.get('lastName');
        data.age = formData.get('age');
        data.socials = {};
        data.socials.github = formData.get('github');
        data.socials.twitter = formData.get('twitter');
        write('user', data);
    }

    async _initInputs() {
        const user = await read('user');
        if (!user) return;
        this.shadowRoot.querySelectorAll('input:not([type="submit"]):not([type="button"])').forEach(inp => {
            switch (inp.name) {
                case 'github':
                    inp.value = user.socials.github;
                    break;
                case 'twitter':
                    inp.value = user.socials.twitter;
                    break;
                default:
                    inp.value = user[inp.name];
                    break;
            }
        });
    }

    static get template() {
        const template = document.createElement('template');
        template.innerHTML = `
<style>
    form {
        display: flex;
        flex-wrap: wrap;
        max-width: 400px;
    }

    form label,
    form input {
        flex-basis: 45%;
    }

    form h3 {
        flex-basis: 100%;
    }
</style>

        <h2>Update user data</h2>
        <label for="onkey-update">Update data on keyup</label>
        <input type="checkbox" id="onkey-update" />
        <form>
            <h3>Personal information</h3>
            <label>First name</label>
            <input type="text" name="firstName" />
            <label>Last name</label>
            <input type="text" name="lastName" />
            <label>Age</label>
            <input type="text" name="age" />

            <h3>Social medias:</h3>
            <label>Twitter</label>
            <input type="text" name="twitter">
            <label>Github</label>
            <input type="text" name="github">

            <input type="submit" value="Update user data" />
        </form>
        <input type="button" id="del-button" value="Clear user data" /> 
        `;
        return template;
    }
}

if (!customElements.get('update-view')) {
    customElements.define('update-view', UpdateView);
}
