# Examples >> Counter

A simple counter application, where a button can be used to increment and another can be used to decrement
would be extremely simple with Stoxy.

Given the HTML

```html copy
<main>
    <button id="dec">-</button>
    <p>
        <stoxy-string default="0">counter</stoxy-string>
    </p>
    <button id="inc">+</button>
</main>
```

One would only need to add the following javascript to create a functional counter app

```js copy
import '@stoxy/string';
import { write, update } from '@stoxy/core';

write('counter', 0);

document.querySelector('#dec').addEventListener('click', () => {
    update('counter', count => (count -= 1));
});

document.querySelector('#inc').addEventListener('click', () => {
    update('counter', counter => (counter += 1));
});
```

Or with LitHTML, this could be done even simpler, without anything in the html and just some javascript

```js copy
import '@stoxy/string';
import { write, update } from '@stoxy/core';
import { html, render } from 'lit-html';

write('counter', 0);
render(
    html`
        <main>
            <button @click=${() => update('counter', c => (c -= 1))} id="dec">
                -
            </button>
            <p>
                <stoxy-string default="0">counter</stoxy-string>
            </p>
            <button @click=${() => update('counter', c => (c += 1))} id="inc">
                +
            </button>
        </main>
    `,
    document.body,
);
```
