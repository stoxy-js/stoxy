import { expect } from '@esm-bundle/chai';
import { write, read, clear, sub, remove } from '../lib/core';

it('Should react to sub events', async () => {
    let foo = 0;
    sub("stoxy-state", (e) => {
        console.log(e);
        foo += 1
    });

    write("stoxy-state", "foo");
    clear("stoxy-state");
    write("stoxy-state", "fooo");
    await write("stoxy-state", "foooo");

    expect(foo).to.equal(4);
})
