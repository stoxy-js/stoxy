# Methods >> Write

Write the state object by key

Writes onto the state object given a key and a value

### Params

| Name  | Attribute                                                |
| ----- | -------------------------------------------------------- |
| key   | Key in string form. Used as the name of the state object |
| value | State object value                                       |

### Usage

```js copy
import { write } from '@stoxy/core';

write("counter", 0);
```

---

```js copy
import { write } from '@stoxy/core';

write("Shoppingcart", [{id: 123, name: "Free gift"}]);
```
