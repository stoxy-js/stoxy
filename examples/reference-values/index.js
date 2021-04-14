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

const objectValue = [
    { name: "Foo" },
    { name: "Bar" },
    { name: "Baz" }
];
write("objectValue", objectValue);

read("objectValue").then(async res => {

    console.log("Before: ", res);
    await remove("objectValue", item => item.name === "Bar")
    console.log("after: ", res);
    console.log("State: ", window._STOXY_STATE_CACHE.objectValue);
});


/*
const arrayValue = [
    "Foo",
    "Bar",
    "Baz"
]
write("arrayValue", arrayValue);

read("arrayValue").then(async res => {

    console.log("Before: ", res);
    await add("arrayValue", "ZULU")
    console.log("after: ", res);
    console.log("State: ", window._STOXY_STATE_CACHE.arrayValue);
});
*/
