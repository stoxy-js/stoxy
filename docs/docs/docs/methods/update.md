# Methods >> Update

Update state without having to manually read the state object

Useful for situtations, where you want to quickly update the state without having to excplicitly fetch the state object.

### Params

| Name     | Attribute                                                |
| -------- | -------------------------------------------------------- |
| key      | Key in string form. Used as the name of the state object |
| delegate | Delegate function to update the state by                 |

### Usage

```js copy
import { write, update } from '@stoxy/core';

write("counter", 0);

// Update counter every second
setInterval(() => {
    update("counter", counter => counter += 1);
}, 1000);
```
