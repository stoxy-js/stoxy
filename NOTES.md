Maybe make 2 seperate components?

stoxy-string
stoxy-object

Where String is for just normal values and the Object variant is for json object values

Usage of String (WIP):

```html
<stoxy-string>my.stoxy.string</stoxy-string>
```

Usage of Object:

```html
<stoxy-object key="user" prefix="u">
    <h2>Profile of u.name</h2>
    <p>Hello, u.name. Your profile has been visited u.profileViewCount times today</p>
</stoxy-object>
```

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
