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

#### Specific read

You can also read a property of a state object just as easily as you would the whole state object

This is exteremely handy when you don't need the whole state object at the same time.

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

One could access the latest products in the shoppinghistory of the user with


```js copy
import { read } from '@stoxy/core';

read("userData.shoppingHistory.latestProducts").then(latestHistoryProducts => {
    latestHistoryProducts.map(item => console.log(item));
});
```
