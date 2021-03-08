# Methods >> Clear

Clear state object from state cache and IndexedDB (is persisted).

Clears the state object with the given key.

Return a promise.

### Params

| Name | Attribute                                                |
| ---- | -------------------------------------------------------- |
| key  | Key in string form. Used as the name of the state object |

### Usage

```js copy
import { clear } from '@stoxy/core';

clear('shoppingcart');
```

The Add method is useful when managing an array of objects in state, e.g. users, products etc.
