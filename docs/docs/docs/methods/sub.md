# Methods >> Sub

Subscribe to updates in state of wanted object.

Allows you to programmatically react to state changes in wanted state objects

### Params

| Name     | Attribute                                                    |
| -------- | ------------------------------------------------------------ |
| key      | Key in string form. Used as the name of the state object     |
| callback | Callback Function to call when state of given key is updated |


### Returns

void

### Usage

```js copy
import { sub } from '@stoxy/core';

sub('shoppingcart', e => console.log('Shopping card updated. Current contents: ', e.data));
```

---

```js copy
import { sub } from '@stoxy/core';

sub('shoppingcart', updateItemCount);

function updateItemCount(e) {
    write('itemcount', e.data.length);
}
```

### Callback payload

The callback function is passed information about the event as a parameter, which can then be
used to easily react to the change.

### Callback params

| Name   | Attribute                                                                                          |
| ------ | -------------------------------------------------------------------------------------------------- |
| key    | Key in string form. Used as the name of the state object                                           |
| action | Action type or the update event (Update on content update, Delete on successful clear of said key) |
| data   | Current data in said state                                                                         |

### Usage

This can be used to easily react to the events happening with the state

```js copy
import { sub } from '@stoxy/core';

sub('shoppingcart', onShoppingcartUpdate);

function onShoppingcartUpdate(e) {
    if (e.action === 'Update') {
        console.log('Shoppingcart updated');
    } else {
        console.log('Shoppingcart cleared');
    }

    fetch(myShoppingCardContentApiUrl, {
        method: 'POST',
        body: JSON.stringify(e.data),
    });
}
```
