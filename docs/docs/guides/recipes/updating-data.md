# Recipes >> Updating data

In some cases you might want to update data from the state objects. There are a few ways to update data from
state.

## Overwriting data

The first method of updating data is by just overwriting the data with new data.

```js copy
import { read, write } from '@stoxy/core';

const shoppingCart = await read('shoppingcart');
shoppingCart.push({ id: 123, name: 'Cheetos' });

write('shoppingcart', shoppingCart);
```

## Updating with a delegate

Another method is using the `update` function of the Stoxy API

```js copy
import { update } from '@stoxy/core';

update('counter', counter => counter += 1);
```

This is a nice and fast way to update objects from state without having to manually read the state

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

update('userData.customerPoints', points => (points += 100));

// Or

update('userData', userData => {
    userData.customerPoints += 100;
    return userData;
});
```

The latter way is more versatile in that you could run a larger update in the same delegate

```js copy
update("userData", userData => {
    userData.customerPoints += 100;
    userData.userName = "foobar";
    return userData;
});
```
