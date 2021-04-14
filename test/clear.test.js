import { expect } from '@esm-bundle/chai';
import { write, read, clear } from '../lib/core';

it('Clear should clear data', async () => {
    write("stoxy-state", "foo");
    const res = await read("stoxy-state");
    await clear("stoxy-state");
    const afterClearRes = await read("stoxy-state");

    expect(res).to.equal("foo");
    expect(afterClearRes).to.equal(undefined);
})

it("Clear without param should remove all state objects", async () => {

    await write("stoxy-state", "foo");
    await write("stoxy-state-two", "foo");
    await clear();

    const state = await read("stoxy-state");
    const stateTwo = await read("stoxy-state-two");

    expect(state).to.equal(undefined);
    expect(stateTwo).to.equal(undefined);
});
