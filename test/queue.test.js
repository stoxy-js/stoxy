import { expect } from '@esm-bundle/chai';
import { update, add, read, clear, write } from '../lib/core';


it("Queue should resolve in order", async () => {
    write("stoxy-state", {
        foo: "bar",
        arr: [],
        counter: 0
    });
    add("stoxy-state.arr", "foo");
    add("stoxy-state.arr", "bar");
    add("stoxy-state.arr", "baz");

    update("stoxy-state.counter", c => c += 1);
    update("stoxy-state.counter", c => c += 1);

    const res = await read("stoxy-state");

    expect(res.foo).to.equal("bar");
    expect(res.arr[0]).to.equal("foo");
    expect(res.arr[1]).to.equal("bar");
    expect(res.arr[2]).to.equal("baz");
    expect(res.counter).to.equal(2);
});

it("Should be able to overwrite values with the queue", async () => {
    write("stoxy-state", "Foo");
    write("stoxy-state", "Bar");
    write("stoxy-state", "Baz");

    const res = await read("stoxy-state");
    expect(res).to.equal("Baz");
});
