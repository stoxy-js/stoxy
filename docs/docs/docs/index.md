# Docs

## Motivation

The motivation behind Stoxy as to provide a simpler solution for cross-app state management.

With Stoxy you are up and running after writing just one line of code. After setting your first state object, 
you have a functional state system ready to be used.

```js copy
import { write } from "@stoxy/core";

write("users", userList);
```

### Simplicity

All of Stoxy's commands are 1-2 parameters long, and can be executed as "one-liners".

They are however extremely extendable due to the nature of the state management system of Stoxy. Some of the Stoxy core
functions like `update` and `remove`  even take delegates or predicates as a parameter to give the developer
more control over their state management.

### Ecosystem

Stoxy ships with a small set of Web Components, which are framework agnostic components ready for use in any project.

The components are built to as reactive pieces of an application, updating their contents accordin to state
change without the developer having to do any work.

### Persistence

Stoxy comes shipped with persistence out of the box. There are many cases in which it is beneficial to persist the state
data through page reloads and navigation. Wether it be stale-while-revalidate patterns, or just static information fetched 
from the API.

The Persistence in Stoxy is opt-in, meaning that you control exactly what information gets persisted.


### Use them how you want to

The whole core set of Stoxy is built from smaller modules, which can be attached at will.

This means that you can use Stoxy only for managing state, and then handle all the events through subscribers,
or you can go all in on Stoxy and deploy a whole application built with stoxy elements using barely any Javascript

