# Recipes >> Reading data

Reading data from the Stoxy storage is done through a promise-based system. State data lookup is fast and 
can be done from any part of the application. 

If the data is being persisted onto the IndexedDB, the last 5 persisted cache keys are stored onto the in memory cache 
for faster lookup.

```js copy
import { read } from "@stoxy/core";

async function getUserData() {
    return await read("userData");
}

```

---

```js copy
import { read } from "@stoxy/core";

read("userData").then(userData => {
    console.log("Logged in as " + userData.name);
});
```
