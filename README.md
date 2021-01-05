![Stoxy Logo](assets/stoxy.png)

![](https://badgen.net/npm/v/stoxy)
![](https://badgen.net/bundlephobia/dependency-count/stoxy)
![](https://badgen.net/bundlephobia/minzip/stoxy)

# 🗂️ Stoxy

Stoxy is a state management API equipped with Web Components for ease of use.

Stoxy allows you to easily handle, persist and update data in your DOM without the weight of a framework.

## ❓ How

Stoxy utilizes the browser's tooling with respect to your computer's memory.

Stoxy stores the data in a in-browser Database called [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API),
only keeping the latest 5 accessed objects in-memory for faster access.

Stoxy utilizes a promise-based use flow making it really easy to asynchronously read and write from the storage.

If your browser doesn't support IndexedDB, there's no need to worry. Stoxy recognizes these cases automatically, and
opts out of using it and utilizes a in-memory system only.

## ❓ Why

When writing websites with dynamic content, the markdown can easily become a spaghetti of plain text and
Javascript escaped variables inside a template literal. like:

```javascript
<h1>Hello, ${user.name}</h1>
<p>Your profile has accumulated ${user.viewCount} views</p>
<p>Top 3 visitors on your page:</p>
<ul>
    ${
        user.topVisitors.map(vis => `<li>${vis}</li>`);
    }
</ul>
```

With Stoxy, the same markdown could be created without being in the same context as the data with:

```html
<stoxy-object key="user" prefix="u.">
    <h1>Hello, u.name</h1>
    <p>Your profile has accumulated u.viewCount views</p>
    <p>Top 3 visitors on your page:</p>
    <ul>
        <stoxy-repeat key="user.topVisitors" id="vis">
            <li>vis</li>
        </stoxy-repeat>
    </ul>
</stoxy-object>
```

**Dynamic content inside Stoxy Elements updates when the data does. Update once, DOM updates everywhere.**

## 🔔 Reactivity

Stoxy is a reactive state management system, meaning that when you update the data in Stoxy with the `write` command,
all of the elements using that object will update automatically their content in the DOM.

No more need for flowing data around the whole system.

```javascript
write('user', newData);

// Triggers update in the element below

<stoxy-object key="user" prefix="u.">
    <p>Hello, u.name</p>
</stoxy-object>;
```

Stoxy will not update any element which's data didn't change, enhancing the performance greatly.

**_ Only the DOM elements which had their data changed will be updated _**

## 🧰 Installation

```sh
npm install stoxy
```

## Usage

#### Data Storage

##### Write

```javascript
import { write } from 'stoxy';

const userData = {
    name: 'Matsuuu',
    favoriteLanguage: 'Javascript',
    knownLanguages: ['Java', 'Javascript', 'C#'],
};

write('user', userData);
```

##### Read

```javascript
import { read } from 'stoxy';

const userData = await read('user');
console.log(userData);
/*
 *  {
 *    name: 'Matsuuu',
 *    favoriteLanguage: 'Javascript',
 *    knownLanguages: ['Java', 'Javascript', 'C#'],
 *  }
 */
```

### Usage in DOM

Stoxy ships with 3 Web Components to ease the usage:

#### Stoxy Object

Stoxy object is the most common use case: you want to access multiple keys of a certain object within your DOM.

```html
<stoxy-object key="user-data" prefix="u.">
    <h1>Hello, World!</h1>

    <p>My name is: u.name, and I'm from u.country.countryName (u.country.countryCode).</p>
    <p>My favorite animal is: u.favoriteAnimal</p>

    <p>My favorite programming languages are:</p>
    <stoxy-repeat key="stoxy-user-demo.favoriteProgrammingLanguages" id="progLang">
        <li>progLang</li>
    </stoxy-repeat>
</stoxy-object>
```

Which then renders as

```html
<stoxy-object key="stoxy-user-demo" prefix="u." ready="">
    <h1>Hello, World!</h1>

    <p>My name is: Matsu, and I'm from Finland (FI).</p>
    <p>My favorite animal is: Cats</p>

    <p>My favorite programming languages are:</p>
    <stoxy-repeat key="stoxy-user-demo.favoriteProgrammingLanguages" id="progLang">
        <li>Javascript</li>

        <li>Java</li>

        <li>C++</li>
    </stoxy-repeat>
</stoxy-object>
```

Stoxy Object can access data in as low levels as needed. As seen in the example, you can access subobjects like `user.country.countryCode`

Stoxy elements can also be nested without any stress.

#### Stoxy Repeat

A lot of the time when you have content, you end up having lists of data you want to display.

In these cases you can use the Stoxy Repeat Web Component

```html
<p>My favorite games:</p>
<stoxy-repeat key="user.favoriteGames" id="game">
    <div class="game-entry">
        <p>Name: game.name</p>
        <p>Genre: game.genre</p>
        <p>Rating: game.rating</p>
    </div>
</stoxy-repeat>
```

Which will then result in the following HTML

```html
<p>My favorite games:</p>
<stoxy-repeat key="user.favoriteGames" id="game">
    <div class="game-entry">
        <p>Name: StarCraft 2</p>
        <p>Genre: RTS</p>
        <p>Rating: 4.7/5</p>
    </div>
    <div class="game-entry">
        <p>Name: World of Warcraft</p>
        <p>Genre: MMORPG</p>
        <p>Rating: 4.0/5</p>
    </div>
</stoxy-repeat>
```

#### Stoxy String

The final Web Component is for when you just want to use a single string from your object

```html
<h2>Hello, <stoxy-string>user.name</stoxy-string>!</h2>
```

## Future plans

-   Pub-Sub system for programmatic reactions

Have something you want Stoxy to support? [Create an issue!](https://github.com/Matsuuu/stoxy/issues/new)
