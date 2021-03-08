# Recipes >> Writing data

Writing data to the Stoxy storage is done through a promise-based system. Writing data into state can be done from
anywhere in the web application

If the data is being persisted onto the IndexedDB, the last 5 persisted cache keys are stored onto the in memory cache 
for faster lookup.

```js copy
import { write } from "@stoxy/core";

const userData = { id: 123, name: "Matsuuu" };
write("userData", userData);

```


If the state object is to be persisted through page reloads, the developer needs to declare it at 
some point before writing into the state.

The persistKey call needs to be only made once per key.

```js copy
import { write, persistKey } from "@stoxy/core";

persistKey("userData");

const userData = { id: 123, name: "Matsuuu" };
write("userData", userData);

```
