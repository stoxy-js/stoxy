# Recipes >> Persisting data

Persisting data means that the state persists through page reloads and even
navigation outside of the page.

There are plenty of situtations where you might want to persist data. One example
would be persisting API data that doesn't update often, or implementing a **Stale-While-Revalidate**
state management system

Persisting data to IndexedDB isn't on by default, and needs to be opted in on a per-key basis.

After declaring the key with `persistKey` all the state of that key is persisted into the IndexedDB.

```js copy
import { persistKey } from "@stoxy/core";

persistKey("shoppingcart", "userhistory");
```

## Memory management

Persisting data onto the IndexedDB could also have a performance benefit. When persisting data, the Stoxy
system only keeps the latest 5 cache objects in memory cache, and let's the garbage collection handle older 
state objects.

This means that for an application using a large amount of state keys, it might be beneficial to persist the data
to enable the memory management benefits.
