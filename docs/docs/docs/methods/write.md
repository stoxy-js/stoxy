# Methods >> Write

Write the state object by key

Writes onto the state object given a key and a value

### Params

| Name  | Attribute                                                |
| ----- | -------------------------------------------------------- |
| key   | Key in string form. Used as the name of the state object |
| value | State object value                                       |


### Returns

A promise which resolves to the write result of the object: `{key: string, value: any}`

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

#### Specific write

You can also write a property of a state object just as easily as you would the whole state object

This is exteremely handy when you don't need to update the whole state object at the same time.

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

One could rewrite the userName with


```js copy
import { write } from '@stoxy/core';

write("userData.userName", "Foobar");
```
