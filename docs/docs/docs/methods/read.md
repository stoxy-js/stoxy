# Methods >> Read

Get the state object data from Stoxy.

Returns a promise, which when resolved contains the state object data.

### Params

| Name | Attribute                                                |
| ---- | -------------------------------------------------------- |
| key  | Key in string form. Used as the name of the state object |

### Usage

```js copy
import { read } from '@stoxy/core';

read('shoppingcart').then(shoppingCartItems => {
    shoppingCartItems.map(item => console.log(item));
});
```

```js copy
import { read } from '@stoxy/core';

async function getItems() {
    const items = await read('shoppingcart');
    return items;
}
```
