import { expect } from '@esm-bundle/chai';
import { add, read, clear, write } from '../lib/core';

it('String should be addable', async () => {
    await clear("stoxy-state");

    add("stoxy-state", "Foo");
    add("stoxy-state", "Bar");
    add("stoxy-state", "Baz");

    const res = await read('stoxy-state');

    expect(res[0]).to.equal('Foo');
    expect(res[1]).to.equal('Bar');
    expect(res[2]).to.equal('Baz');
});

it('Numbers should be addable', async () => {
    await clear("stoxy-state");

    add("stoxy-state", 5);
    add("stoxy-state", 10);
    add("stoxy-state", 15);

    const res = await read('stoxy-state');

    expect(res[0]).to.equal(5);
    expect(res[1]).to.equal(10);
    expect(res[2]).to.equal(15);
});

it('Objects should be addable', async () => {
    await clear("stoxy-state");

    add("stoxy-state", { name: "John" });
    add("stoxy-state", { name: "Matt" });
    add("stoxy-state", { name: "Kate" });

    const res = await read('stoxy-state');

    expect(res[0].name).to.equal("John");
    expect(res[1].name).to.equal("Matt");
    expect(res[2].name).to.equal("Kate");
});

it('Arrays should be addable', async () => {
    await clear("stoxy-state");

    add("stoxy-state", [1, 2, 3]);
    add("stoxy-state", [4, 6, 8]);
    add("stoxy-state", [3, 6, 9]);

    const res = await read('stoxy-state');

    expect(res[0][0]).to.equal(1);
    expect(res[0][1]).to.equal(2);
    expect(res[0][2]).to.equal(3);

    expect(res[1][0]).to.equal(4);
    expect(res[1][1]).to.equal(6);
    expect(res[1][2]).to.equal(8);

    expect(res[2][0]).to.equal(3);
    expect(res[2][1]).to.equal(6);
    expect(res[2][2]).to.equal(9);
});

it("Should not reflect adds in state", async () => {
    const data = {
        arr: ["foo", "bar"]
    }

    write("stoxy-state", data);
    add("stoxy-state.arr", "baz");

    const res = await read("stoxy-state.arr");

    expect(res.length).to.equal(3);
    expect(res[2]).to.equal("baz");
    expect(data.arr.length).to.equal(2);
});
