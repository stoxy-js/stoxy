import { expect } from '@esm-bundle/chai';
import { write, update, read, clear, sub, remove } from '../lib/core';

it('Should react to sub events', async () => {
    let foo = 0;
    const unsub = sub("stoxy-state", (e) => {
        foo += 1
    });

    write("stoxy-state", "foo");
    clear("stoxy-state");
    write("stoxy-state", "fooo");
    await write("stoxy-state", "foooo");

    expect(foo).to.equal(4);

    unsub();
})

it('Should react to sub events on subkeys', async () => {
    let foo = 0;

    const unsub = sub("stoxy-state.bar.counter", (e) => {
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

    expect(foo).to.equal(4);

    unsub();
})

it('Should return subkey value on sub events on subkeys', async () => {
    let foo = 0;
    let counterVal = 0;
    const unsub = sub("stoxy-foo.bar.counter", (e) => {
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

    expect(foo).to.equal(4);
    expect(counterVal).to.equal(1);

    unsub();
})

it('Event in subkey should trigger sub on parent key', async () => {
    let foo = 0;
    let counterVal = 0;
    const unsub = sub("stoxy-foo", (e) => {
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

    expect(foo).to.equal(4);

    unsub();
})
