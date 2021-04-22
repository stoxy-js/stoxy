import { expect } from '@esm-bundle/chai';
import { add, where } from '../lib/core';

it('Where clause should work on a array of items', async () => {

    add("stoxy-state", 1);
    add("stoxy-state", 2);
    add("stoxy-state", 3);
    add("stoxy-state", 4);

    const data = await where("stoxy-state", i => i < 3);
    expect(data.length).to.equal(2);
})

it('Where clause should work on a array of objects', async () => {

    add("stoxy-state", { id: 1, name: "Foo" });
    add("stoxy-state", { id: 2, name: "Bar" });
    add("stoxy-state", { id: 3, name: "Baz" });
    add("stoxy-state", { id: 4, name: "Bin" });

    const data = await where("stoxy-state", u => u.name === "Bin" || u.name === "Baz");
    expect(data.length).to.equal(2);
})
