import 'stoxy/stoxy-string';
import 'stoxy/stoxy-object';
import 'stoxy/stoxy-repeat';

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
                    <p>Names:</p>
                    <stoxy-repeat key="user.names" id="n">
                        <li>n</li>
                    </stoxy-repeat>
                    <p>Favorite languages:</p>
                    <stoxy-repeat key="user.favorites.favLanguages" id="lang">
                        <li>lang</li>
                    </stoxy-repeat>
                    <p>Favorite games:</p>
                    <stoxy-repeat key="user.favorites.favGames" id="game">
                        <p><b>Game name: </b> game.name</p>
                        <p><b>Game genre: </b>game.genre</p>
                    </stoxy-repeat>
                </div>
            </stoxy-object>
            
        `;
        return template;
    }
}

if (!customElements.get('profile-view')) {
    customElements.define('profile-view', ProfileView);
}
