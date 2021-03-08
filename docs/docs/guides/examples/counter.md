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

<iframe src="https://codesandbox.io/embed/lively-glitter-hci63?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="lively-glitter-hci63"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
