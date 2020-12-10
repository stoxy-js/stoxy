import './profile-view.js';
import './update-view.js';

import { read, write } from 'stoxy';

async function aa() {
    const user = await read('user');
    user.age = 23;
    user.firstName = 'Matias';
    user.lastName = 'Huhta';
    user.socials = { github: 'https://github.com/Matsuuu', twitter: 'https://twitter.com/matsuuu_' };
    user.favorites = [];
    user.favorites.favLanguages = ['Java', 'Javascript'];
    user.favorites.favGames = [
        { name: 'Starcraft 2', genre: 'RTS' },
        { name: 'World of Warcraft', genre: 'MMORPG' },
    ];
    user.names = ['Matias', 'Joona', 'Aleksanteri'];
    write('user', user);
}

//aa();
