# Methods >> Sub

Subscribe to updates in state of wanted object.

Allows you to programmatically react to state changes in wanted state objects

### Params

| Name | Attribute                                                |
| ---- | -------------------------------------------------------- |
| key  | Key in string form. Used as the name of the state object |
| callback  | Callback Function to call when state of given key is updated |

### Usage

```js copy
import { sub } from '@stoxy/core';

sub("shoppingcart", e => console.log("Shopping card updated. Current contents: ", e.data));
```
---

```js copy
import { sub } from '@stoxy/core';

sub("shoppingcart", updateItemCount);

function updateItemCount(e) {
    write("itemcount", e.data.length);
}
```

