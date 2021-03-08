# Components >> Stoxy String

Stoxy String is a web component used for situtations, where you want to
display a single state object in the DOM, for example the current item count.

As with all of Stoxy elements, Stoxy String also updates it's contents automatically
as the state changes. No action needed from the developer side.

### Usage

```js copy
import "@stoxy/stoxy-string";
```

```html copy
<p><stoxy-string>itemcount</stoxy-string></p>
```

Say the state object of `itemcount` was 5 at the moment, we would have our DOM as:

```html copy
<p><stoxy-string>5</stoxy-string></p>
```


