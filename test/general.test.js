// @ts-nocheck
import { expect } from '@esm-bundle/chai';
import { add, read, clear, write } from '../lib/core';

it('Locks should clean up after themselves', async () => {
    await clear("stoxy-state");

    write("stoxy-state", "Foo");
    write("stoxy-state", "Bar");
    write("stoxy-state", "Baz");

    const res = await read('stoxy-state');

    expect(res).to.equal("Baz");
    expect(window._STOXY_LOCKS["stoxy-state"].length).to.equal(0);
});

