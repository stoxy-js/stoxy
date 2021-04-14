import { write, update, read, add, remove } from "@stoxy/core";


// Write
/*
const objectValue = {
    foo: "Foo",
    bar: "Bar",
    bin: {
        biz: {
            zzz: "BRRR"
        },
        boo: [
            "ffff",
            "bbbb",
            "aaaa"
        ],
        gogo: {
            gugu: [
                { name: "john" },
                { name: "matt" }
            ]
        }
    }
}

const stringValue = "Foobar";
const intValue = 100;


write("objectValue", objectValue);
write("stringValue", stringValue);
write("intValue", intValue);

console.log("Assigning new value");
objectValue.foo = "FOFOFO";
objectValue.bin.biz.zzz = "KKGGGMM";
objectValue.bin.boo[1] = "XXXX";
objectValue.bin.gogo.gugu[0].name = "Matsu";

setTimeout(() => {
    console.log(JSON.stringify(window._STOXY_STATE_CACHE.objectValue, null, 4));
    console.log(JSON.stringify(objectValue, null, 4));
}, 100)
    */

// Update
/*
const objectValue = {
foo: "bar",
bin: {
    boo: "Boo"
}
};
write("objectValue", objectValue);

read("objectValue").then(async res => {

console.log("Before: ", res.bin.boo);
await update("objectValue.bin.boo", () => "Baa")
console.log("after: ", res.bin.boo);
});
*/

/*
* REMOVE
const objectValue = {
foo: "bar",
bin: {
    boo: [
        "Foo",
        "Bar",
        "Baz"
    ]
}
};
write("objectValue", objectValue);

read("objectValue").then(async res => {

console.log("Before: ", res.bin.boo);
await remove("objectValue.bin.boo", item => item === "Bar")
console.log("after: ", res.bin.boo);
console.log("State: ", window._STOXY_STATE_CACHE.objectValue.bin.boo);
});
*/

const objectValue = {
    foo: "bar",
    bin: {
        boo: [
            "Foo",
            "Bar",
            "Baz"
        ]
    }
};
write("objectValue", objectValue);

read("objectValue").then(async res => {

    console.log("Before: ", res.bin.boo);
    await add("objectValue.bin.boo", "ZULU")
    console.log("after: ", res.bin.boo);
    console.log("State: ", window._STOXY_STATE_CACHE.objectValue.bin.boo);
});
