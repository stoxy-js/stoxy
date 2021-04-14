import { expect } from '@esm-bundle/chai';
import { write, update, read, clear, sub, remove } from '../lib/core';

it('Should react to sub events', async () => {
    let foo = 0;
    sub("stoxy-state", (e) => {
        foo += 1
    });

    write("stoxy-state", "foo");
    clear("stoxy-state");
    write("stoxy-state", "fooo");
    await write("stoxy-state", "foooo");

    expect(foo).to.equal(4);
})

it('Should react to sub events on subkeys', async () => {
    let foo = 0;
    sub("stoxy-state.bar.counter", (e) => {
        foo += 1
    });

    write("stoxy-state", {
        foo: "ff",
        bar: {
            counter: 0
        }
    });
    clear("stoxy-state");
    write("stoxy-state",
        {
            foo: "ff",
            bar: {
                counter: 0
            }
        }
    );
    await update("stoxy-state.bar.counter", c => c += 1);

    expect(foo).to.equal(1);
})

it('Should return subkey value on sub events on subkeys', async () => {
    let foo = 0;
    let counterVal = 0;
    sub("stoxy-foo.bar.counter", (e) => {
        foo += 1
        counterVal = e.data;
    });

    write("stoxy-foo", {
        foo: "ff",
        bar: {
            counter: 0
        }
    });
    clear("stoxy-foo");
    write("stoxy-foo",
        {
            foo: "ff",
            bar: {
                counter: 0
            }
        }
    );
    await update("stoxy-foo.bar.counter", c => c += 1);

    expect(foo).to.equal(1);
    expect(counterVal).to.equal(1);
})
