import { expect } from '@esm-bundle/chai';
import { write, read, persistKey } from '../lib/core';

it('String read should work', async () => {
    const string = 'Stoxy';
    await write('stoxy-state', string);
    const res = await read('stoxy-state');

    expect(res).to.equal(string);
});

it('Number read should work', async () => {
    const number = 100;
    await write('stoxy-state', number);
    const res = await read('stoxy-state');

    expect(res).to.equal(number);
});

it("Should not break under a large event batch", async () => {
    for (let i = 0; i < 50; i++) {
        write("foo-" + i, { id: i });
    }

    for (let i = 0; i < 50; i++) {
        const res = await read("foo-" + i);
        expect(res.id).to.equal(i);
    }
});

it("Should get the latest object even with multiple writes", async () => {
    write("stoxy-state", { id: 1 });
    write("stoxy-state", { id: 1, name: "foo" });
    write("stoxy-state", { id: 1, name: "foo", age: 55 });
    write("stoxy-state", { id: 1, name: "foo", age: 55 });
    write("stoxy-state", { id: 1, name: "foo", age: 55, bar: { biz: "Ben" } });

    const res = await read("stoxy-state");
    const biz = await read("stoxy-state.bar.biz");
    expect(res.id).to.equal(1);
    expect(res.name).to.equal("foo");
    expect(res.age).to.equal(55);
    expect(res.bar.biz).to.equal("Ben");
    expect(biz).to.equal("Ben");
});

it('Object read should work', async () => {
    const obj = {
        foo: 'bar',
        bar: {
            bin: {
                boo: 'ZZZ'
            }
        }
    };
    await write('stoxy-state', obj);
    const res = await read('stoxy-state');

    expect(res.foo).to.equal(obj.foo);
    expect(res.bar.bin.boo).to.equal(obj.bar.bin.boo);
});

it('Array read should work', async () => {
    const arr = [
        "foo",
        "bar",
        "baz"
    ];
    await write('stoxy-state', arr);
    const res = await read('stoxy-state');

    expect(res[0]).to.equal(arr[0]);
    expect(res[1]).to.equal(arr[1]);
    expect(res[2]).to.equal(arr[2]);
});


it('Can read persisted state values', async () => {
    persistKey("stoxy-state");
    write("stoxy-state", {
        foo: "bar",
        bin: {
            baz: "foo"
        }
    });

    const foo = await read("stoxy-state.foo");
    const baz = await read("stoxy-state.bin.baz");

    expect(foo).to.equal("bar");
    expect(baz).to.equal("foo");
});

it("Can fetch undefined", async () => {
    const foo = await read("foo");
    const foobar = await read("foo.bar");

    expect(foo).to.equal(undefined);
    expect(foobar).to.equal(undefined);
});
