# Getting started >> Core functionality

Stoxy is a dynamic state management system, which allows the developer to handle state across the whole
application without hassle.

Stoxy utilizes the [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) to persist
data across page reloads and navigation. The usage of IDB also means that state persisted onto it is accessible
even when the user is offline.

## Persistance

By default Stoxy doesn't persist anything onto the IndexedDB. When the developer decides that they want to
persist a certain cache key onto the indexedDB, they can do so by declaring it via the Stoxy API

```js copy
import { persistKey } from '@stoxy/core';

persistKey('shoppingcart');
```

## Updates

Stoxy elements are a perfect tool for creating reactive web experiences. When using Stoxy elements, the developer
doesn't need to worry about reacting to state changes. The elements handle their state and updates to said state
automatically, without any input from the developer.

The updates are ran in a dynamic fashion, and only the content that has updated will be changed.

With elements like [Stoxy Repeat](../../../docs/components/stoxy-repeat), the iterable stateobject are 
compared to their old state, and sorted automatically to match the new order of the
state array. Only the items in the wrong order are moved around the DOM, and the ones that didn't change order
will be kept untouched.

## Reactivity

On top of the reactivity provided by the Stoxy elements, the developer can also subscribe to the 
state updates happening around their web application.

The developer is able to set a callback function to be called with the new data set onto the state, as the
state updates. This allows for reactive programming patterns to be done by the developer even without using
Stoxy elements.

```js copy
import {sub} from "@stoxy/core";

sub("shoppingcart", () => console.log("Shopping card updated"));
```
