Ideas:

-   Some kind of a componaent variant / markdown for list iteration?

Maybe something like

```html
<!-- Iterates through userinformation.users -->
<stoxy-repeat items="users" var="user">
    <p>User user.id</p>
    <p>Name: user.name</p>
    <p>Age: user.age</p>
</stoxy-repeat>
```

Optimize the read operation.

-   Set key to array when fetching, with a reference to the promise of fetch.
-   Others fetching the same info should wait for that promise to fulfill
