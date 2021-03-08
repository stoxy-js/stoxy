# Recipes >> Removing data

In some cases you might want to remove data from the state objects. There are a few ways to remove data from
state.


## Overwriting data

The first method of removing data is by just overwriting the data with new data.

```js copy
import { read, write } from "@stoxy/core";

const shoppingCart = await read("shoppingcart");
// Filter only items that are prices under 10
shoppingCart = shoppingCart.filter(item => item.price < 10);

write("shoppingcart", shoppingCart);
```


## Removing by predicate

Another method is using the `remove` function of the Stoxy API

```js copy
import { remove } from "@stoxy/core";

// Remove items prices above 10
remove("shoppingcart", item => item.price > 10);
```

This is a nice and fast way to remove objects from state without having to manually read the state
