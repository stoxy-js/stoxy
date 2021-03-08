import "@stoxy/repeat";
import { sub, add, read, write, persistKey, remove } from "@stoxy/core";

persistKey("users");

read("users").then((userData) => {
    if (!userData) {
        write("users", [{ name: "Jane Smith", id: 24, age: 51 }]);
    }
});

document.querySelector("form").addEventListener("submit", onSubmit);

function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = {};
    userData.name = formData.get("name");
    userData.age = Number(formData.get("age"));
    userData.id = Number(formData.get("id"));
    if (userData.name && userData.age && userData.id) {
        add("users", userData);
    }
}

document.querySelector("select").addEventListener("change", async (e) => {
    const sortBy = e.target.options[e.target.selectedIndex].value;
    if (sortBy) {
        const userData = await read("users");
        userData.sort((a, b) => sorter(a[sortBy], b[sortBy]));
        write("users", userData);
    }
});

function sorter(a, b) {
    if (typeof a === "string") {
        const aStr = a.toLowerCase();
        const bStr = b.toLowerCase();
        if (aStr > bStr) {
            return 1
        }
        if (aStr < bStr) {
            return -1;
        }
        return 0;
    } else {
        return a - b;

    }
}

sub("users", addListeners);

setTimeout(() => {
    addListeners();
}, 100);

function addListeners() {
    document.querySelectorAll("button").forEach((but) => {
        if (!but.hasAttribute("listening-for-delete")) {
            but.addEventListener("click", removeUser);
            but.setAttribute("listening-for-delete", "");
        }
    });
}

function removeUser(e) {
    const parent = e.target.parentNode;
    const userId = Number(parent.id);

    parent.setAttribute("leaving", "");
    parent.addEventListener("transitionend", () => {
        remove("users", (user) => user.id === userId);
    });
}

