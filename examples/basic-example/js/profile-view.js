import 'stoxy/stoxy-string';
import 'stoxy/stoxy-object';

export default class ProfileView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(ProfileView.template.content.cloneNode(true));
    }

    static get template() {
        const template = document.createElement('template');
        template.innerHTML = `
        <h1>Hello, <stoxy-string default="User name">user.firstName</stoxy-string>!</h1>

            <stoxy-object prefix="u." key="user">
                <div class="user-information">
                    <p><b>Name: </b>u.firstName u.lastName</p>
                    <p><b>Age: </b>u.age</p>
                    <p><b>Socials:</b></p>
                    <ul>
                        <li>u.socials.github</li>
                        <li>u.socials.twitter</li>
                    </ul>
                </div>
            </stoxy-object>
            
        `;
        return template;
    }
}

if (!customElements.get('profile-view')) {
    customElements.define('profile-view', ProfileView);
}
