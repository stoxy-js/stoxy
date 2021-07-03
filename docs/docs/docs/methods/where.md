# Methods >> Where

Returns object(s) from a state object matching a predicate.

Allows for reading a filtered take from the state object.

### Params

| Name | Attribute                                                |
| ---- | -------------------------------------------------------- |
| key  | Key in string form. Used as the name of the state object |
| predicate  | The Predicate by which the objects are filtered |


### Returns

A promise which resolves to the read result of the object: `{any}`

### Usage

```js copy
import { where } from '@stoxy/core';

// Find products with price below 5
where("shoppingcart", product => product.price <= 5);
```

