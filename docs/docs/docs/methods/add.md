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
