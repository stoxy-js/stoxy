import { expect } from '@esm-bundle/chai';
import { write, read, clear, persistKey } from '../lib/core';


it('Should work even when iDB not in use', async () => {
    delete window.indexedDB;

    persistKey("stoxy-state");

    write("stoxy-state", {
        foo: "bar",
        bin: {
            baz: "xxx"
        }
    });

    const res = await read("stoxy-state");
    const foo = await read("stoxy-state.foo");
    const baz = await read("stoxy-state.bin.baz");

    expect(foo).to.equal("bar");
    expect(baz).to.equal("xxx");
})

it('Should work even when iDB stops working', async () => {
    delete window.indexedDB;
    window.indexedDB = true;

    persistKey("stoxy-state");

    write("stoxy-state", {
        foo: "bar",
        bin: {
            baz: "xxx"
        }
    });

    write("stoxy-state.bin.boo", "booboo");
    const res = await read("stoxy-state");
    const foo = await read("stoxy-state.foo");
    const baz = await read("stoxy-state.bin.baz");

    expect(foo).to.equal("bar");
    expect(baz).to.equal("xxx");
})

it("Can clear without iDB", async () => {
    delete window.indexedDB;
    await write("stoxy-state", { foo: "bar" })
    clear("stoxy-state");
});
