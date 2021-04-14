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
