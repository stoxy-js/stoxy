# Methods >> Read

Get the state object data from Stoxy.

Returns a promise, which when resolved contains the state object data.

### Params

| Name | Attribute                                                |
| ---- | -------------------------------------------------------- |
| key  | Key in string form. Used as the name of the state object |


### Returns

A promise which resolves to the read result of the object: `{any}`

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

#### Specific read

You can also read a property of a state object just as easily as you would the whole state object

This is exteremely handy when you don't need the whole state object at the same time.

With a state object like

```json copy
const userData = {
    userName: "Stoxy",
    shoppingCart: [
        { id: 123, name: "Flaming hot cheetos" }
    ],
    shoppingHistory: {
        latestProducts: [
            { id: 555, name: "Doritos" },
            { id: 958, name: "Pringles" }
        ]
    }
};
```

One could access the latest products in the shoppinghistory of the user with


```js copy
import { read } from '@stoxy/core';

read("userData.shoppingHistory.latestProducts").then(latestHistoryProducts => {
    latestHistoryProducts.map(item => console.log(item));
});
```
