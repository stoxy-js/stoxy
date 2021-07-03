# Recipes >> Subscribing to updates

Subscribing to a key allows the developer to handle state updates programmatically in any way desired.

```js copy
import { sub } from '@stoxy/core';

sub("shoppingcart", updateItemCount);

function updateItemCount(e) {
    write("itemcount", e.data.length);
}
```

### Unsubscribing

As Stoxy utilizes event listeners in it's subscribing, it's good manner to clean up
after the subscription is no more needed.

The sub function returns a callable function which when called, removes the set event listeners.

```js copy
import { sub } from '@stoxy/core';

const unsub = sub("onlyone", updateOnlyOnce);

function updateOnlyOnce() {
    // Do something
    unsub();
}
```
