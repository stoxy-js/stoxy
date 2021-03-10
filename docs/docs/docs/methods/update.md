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


#### Specific update

You can also update a property of a state object just as easily as you would the whole state object

This is exteremely handy when you don't need to update the whole state object at the same time.

With a state object like

```json copy
const userData = {
    userName: "Stoxy",
    customerPoints: 5,
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

One could update the customerPoints with one of the following ways


```js copy
import { update } from '@stoxy/core';

update("userData.customerPoints", points => points += 100);

// Or

update("userData", userData => {
    userData.customerPoints += 100;
    return userData;
});
```

The latter way is more versatile in that you could run a larger update in the same delegate

```
update("userData", userData => {
    userData.customerPoints += 100;
    userData.userName = "foobar";
    return userData;
});
```
