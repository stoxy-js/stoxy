# Methods >> Persist Key

Declare a state object to be persisted through pageloads.

Stoxy utilized IndexedDB to persist state objects. There could be two reasons you would want to persist your state objects:

-   Persisted state objects are peristed through page page reloads / sessions
-   Persisted state objects can be removed from cache, and only fetched when needed

### Params

| Name      | Attribute                                        |
| --------- | ------------------------------------------------ |
| keyOrKeys | One or more keys as string, separated by a comma |


### Usage 

```js copy
import { persistKey } from '@stoxy/core';

persistKey('shoppingcart');

// with multiple keys
persistKey('shoppingcart', 'history', 'address');
```
