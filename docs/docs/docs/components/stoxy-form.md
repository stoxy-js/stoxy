# Components >> Stoxy Form

Stoxy Form is a web component used for handling Stoxy state without
having to write any javascript.

On submit, the form persists the form's data to state with the given key attribute.

If the url attribute is set, the form creates a HTTP request before saving the data to state.

### Attributes

| Name      | Attribute                                                                                                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key       | Key in string form. Used as the name of the state object                                                                                                                        |
| action    | Either _add_ or _set_ dependeing on wanted to add to a colleciton in state, or deplace the state                                                                                |
| url       | In some cases you might want to send the form data to the backend. For these situations you can declare the url property. If set, sends a fetch request to given url on submit. |
| method    | If url is set, specifies the HTTP method used for the request. Defaults to GET                                                                                                  |
| requireok | If url is set, specifies if the HTTP request is required to return a OK status before committing the object to state.                                                           |

### Usage


```js copy
import '@stoxy/form';
```

```html copy
<stoxy-form
    key="todos"
    action="add"
    @submit=${() => {
         this.shadowRoot.querySelector('input').value = '';
    }}
>
    <input
        type="text"
        name="task"
        placeholder="Add todo..."
        autocomplete="off"
    />
    <input type="submit" value="Submit" />
</stoxy-form>

```

Adds 

```js copy
{ task: "Your input" }
```

to the state at key "todos".

#### Sending the form data to a API on submit

In some cases we might want to send the data from the form to a backend API while we save it to our state at the
same time. This can be done by utilizing the stoxy-form's `url` attribute.


```js copy
import '@stoxy/form';
```

```html copy
<stoxy-form
    key="todos"
    action="add"
    url="https://my-website.app/todoadd"
    method="POST"
    requireok
    @submit=${() => {
         this.shadowRoot.querySelector('input').value = '';
    }}
>
    <input
        type="text"
        name="task"
        placeholder="Add todo..."
        autocomplete="off"
    />
    <input type="submit" value="Submit" />
</stoxy-form>

```

In the above case, a POST request would be made to `https://my-website.app/todoadd`, with the body 
`{ task: "Your input" }`.

The `requireok` attribute means that unless we get a OK response from the backend, we won't save the 
data to state either.

