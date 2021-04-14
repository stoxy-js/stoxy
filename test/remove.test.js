import { expect } from '@esm-bundle/chai';
import { remove, update, add, read, clear, write } from '../lib/core';


it("Should be able to remove strings", async () => {
    write("stoxy-state", ["Foo", "Bar", "Baz"]);

    remove("stoxy-state", item => item === "Bar");
    const res = await read("stoxy-state");

    expect(res.length).to.equal(2);
    expect(res[0]).to.equal("Foo");
    expect(res[1]).to.equal("Baz");
})

it("Should be able to remove numbers", async () => {
    write("stoxy-state", [1, 2, 3]);

    remove("stoxy-state", item => item === 2);
    const res = await read("stoxy-state");

    expect(res.length).to.equal(2);
    expect(res[0]).to.equal(1);
    expect(res[1]).to.equal(3);
})

it("Should be able to remove objects", async () => {
    write("stoxy-state", [{ name: "Kate" }, { name: "Maisy" }, { name: "Misty" }]);

    remove("stoxy-state", item => item.name === "Maisy");
    const res = await read("stoxy-state");

    expect(res.length).to.equal(2);
    expect(res[0].name).to.equal("Kate");
    expect(res[1].name).to.equal("Misty");
})

it("Should be able to remove arrays", async () => {
    write("stoxy-state", [[1, 2], [1, 2, 3, 4], [1, 2, 3, 4, 5, 6]]);

    remove("stoxy-state", list => list.length <= 3);
    const res = await read("stoxy-state");

    expect(res.length).to.equal(2);
    expect(res[0].length).to.equal(4);
    expect(res[1].length).to.equal(6);
})
