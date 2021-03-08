# Methods >> Remove

Remove object(s) from a state object using a predicate.

Allows for removing one of multiple objects from the state object without having to read the object data manually.

### Params

| Name | Attribute                                                |
| ---- | -------------------------------------------------------- |
| key  | Key in string form. Used as the name of the state object |
| predicate  | The Predicate by which the objects are removed |

### Usage

```js copy
import { remove } from '@stoxy/core';

// Removes product with the id 1
remove("shoppingcart", product => product.id === 1);
```
---

```js copy
import { remove } from '@stoxy/core';

// Remove all products with a price over 5
remove("shoppingcart", product => product.price > 5);
```

---


```js copy
import { remove } from '@stoxy/core';

// Remove all meat
remove("shoppingcart", removeMeat);

function removeMeat(product) {
    if (product.type === "Meat" || product.type === "Chicken") {
        return true;
    }
    return false;
}
```
