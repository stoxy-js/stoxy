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
