# Hooks >> Using Stoxy with hooks

Some frameworks and libraries like React and Preact employ a hook based system for their actions

For these libraries, Stoxy's normal workflow might not be the most fitting choice, and that is
why we provide a separate `@stoxy/hooks` -package to be used with them.

The `useStoxy` hook employs the Stoxy functionality within a single hook, allowing you to
utilize a global persistent state with libraries like React and Preact.

## Installation

Stoxy hooks package depends on the `@stoxy/core`, meaning that you only need to import the main hooks package
to your project.

```
npm install @stoxy/hooks
```

## Usage

Stoxy hook takes 2 parameters: a instance of React (or similiar), and the properties to
operate Stoxy with.

More information about the parameters can be found in the API description below

### React example

```javascript
import { useStoxy } from "@stoxy/hooks";
import React from "react";

export function ShoppingList() {
    const { state } = useStoxy(React, {
        key: "shopping-cart",
        state: {
            items: []
        }
        init: true,
        persist: true
    });

    return (
        <ul>
            {state.items.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
    );
}
```

### Preact example

```javascript
import { useStoxy } from "@stoxy/hooks";
import * as preact from "preact/hooks";

export function ShoppingList() {
    const { state } = useStoxy(preact, {
        key: "shopping-cart",
        state: {
            items: []
        }
        init: true,
        persist: true
    });

    return (
        <ul>
            {state.items.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
    );
}
```

#### Calling Stoxy functions

The `useStoxy` hook returns the Stoxy operation function with the key prefilled, allowing for a even more minimal use of the API.

```javascript
import { useStoxy } from "@stoxy/hooks";
import React from "react";

export function Clicker() {
    // You can rename the variables returned by useStoxy while destructuring
    const { state: counterState, update: updateConter } = useStoxy(React, {
        key: "demo.counter",
        state: 0
    });

    function inc() {
        // No need to add the key name here
        updateCounter(c => c += 1);
    }

    return (
        <div>
            <p>Pushed {counterState} times</p>
            <button onClick={inc} type="button">Click</button>
        </div>
    );
}
```

#### Use what you need

The idea behind the hook implementation is to not having to use what you don't need. For cases where you
want to just update the state, you don't even need to destructure the state from the returned values.

```javascript
import { useStoxy } from '@stoxy/hooks';
import React from 'react';

export function AddToList() {
    const { add } = useStoxy(React, { key: 'task-list' });

    function addItem(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const taskName = formData.get('task');

        add({ created: Date.now(), name: taskName });

        const inputField = document.querySelector("input[name='task']")
        inputField.value = "";
    }

    return (
        <form onSubmit={addItem}>
            <input type="text" name="task" />
            <input type="submit" value="Add" />
        </form>
    );
}
```

## API

#### Parameters

| Name  | Description                   |
| ----- | ----------------------------- |
| React | An instance of React          |
| props | Properties for stoxy instance |

#### Props

| Name    | Description                                                                                                                                                                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key     | Key of the state store to access                                                                                                                                                                                                                    |
| state   | Initial state object to set, only the properties listed into the state property are updated, even if the Stoxy state object has additional fields                                                                                                   |
| init    | Should the state be initialized into the Stoxy storage on creation? Defaults to false                                                                                                                                                               |
| persist | Should the state object be persisted? Calls Stoxy's `persistKey` method on the `key` property. Persists the top level key, meaning that if your `key` property is set to `shoppinglist.description`, the whole `shoppinglist` key will be persisted |

#### Returned properties and functions

These properties can be accessed by destructuring when calling `useStoxy`.

| Name   | Description                                                                                                                                              |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| state  | The reactive state object to use in your application                                                                                                     |
| add    | A partly pre-filled function call to the `add` function of Stoxy. Doesn't require the key as first parameter like the regular Stoxy `add` function       |
| remove | A partly pre-filled function call to the `remove` function of Stoxy. Doesn't require the key as first parameter like the regular Stoxy `remove` function |
| write  | A partly pre-filled function call to the `write` function of Stoxy. Doesn't require the key as first parameter like the regular Stoxy `write` function   |
| update | A partly pre-filled function call to the `update` function of Stoxy. Doesn't require the key as first parameter like the regular Stoxy `update` function |
| where  | A partly pre-filled function call to the `where` function of Stoxy. Doesn't require the key as first parameter like the regular Stoxy `where` function   |
