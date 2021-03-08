# Recipes >> Subscribing to updates

Subscribing to a key allows the developer to handle state updates programmatically in any way desired.

```js copy
import { sub } from '@stoxy/core';

sub("shoppingcart", updateItemCount);

function updateItemCount(e) {
    write("itemcount", e.data.length);
}
```

