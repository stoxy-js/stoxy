# Methods >> Add

Add an element to the state object array by key.

If not state atom for key is set, an empty array is initialized before adding object.

Returns a promise.

### Params

| Name  | Attribute                                                |
| ----- | -------------------------------------------------------- |
| key   | Key in string form. Used as the name of the state object |
| value | Any possible storable value                              |

### Usage

```js copy
import { add } from '@stoxy/core';

const product = { id: 123, name: 'Flaming hot Cheetos' };
add('shoppingcart', product);
```

The Add method is useful when managing an array of objects in state, e.g. users, products etc.


#### Specific add

You can also add a property of a state object's property just as easily as you would the whole state object

This is exteremely handy when you have a array as a property of you state object

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

One could add a product to the cart with just


```js copy
import { add } from '@stoxy/core';

const product = { id: 555, name: "Doritos" };
add("userData.shoppingCart", product);
```
