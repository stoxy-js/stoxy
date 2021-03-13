# Components >> Stoxy Repeat

Stoxy Repeat is a web component used for iterating state content onto the web page.

The repeat component is useful for situations where the state object is iterable
and is desired to be displayed as e.g. a list

```js script
import '@rocket/launch/inline-notification/inline-notification.js';
```

<inline-notification type="tip" title="Reactivity">

As with all of Stoxy elements, Stoxy Repeat also updates it's contents automatically
as the state changes. No action needed from the developer side.

</inline-notification>

### Attributes

| Name | Attribute                                                |
| ---- | -------------------------------------------------------- |
| key  | Key in string form. Used as the name of the state object |
| id   | Identifier for the accessed iterable object              |

### Events

| Name    | Attribute                                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------------------ |
| updated | Triggers when the state object observed by the stoxy element is updated. Event detail contains data about the new state. |

### Usage

With a state object of

```js copy
import "@stoxy/repeat";
import { write } from 'stoxy';

const todos = [
    { task: "Take out the trash" }
    { task: "Write documentation" },
    { task: "Eat healthy" }
];

write("todos", todos);
```

we could do:

```html copy
<stoxy-repeat key="todos" id="todoItem">
    <li>todoItem.task</li>
</stoxy-repeat>
```

And end up with

```html copy
<stoxy-repeat key="todos" id="todoItem">
    <li>Take out the trash</li>
    <li>Write documentation</li>
    <li>Eat healthy</li>
</stoxy-repeat>
```
