import { expect } from '@esm-bundle/chai';
import { write, update, read } from '../lib/core';

it('Number should update and not leave a reference', async () => {
    const num = 100;
    write('stoxy-state', num);

    update("stoxy-state", num => num += 10);
    update("stoxy-state", num => num += 10);
    update("stoxy-state", num => num += 10);
    update("stoxy-state", num => num += 10);

    const res = await read('stoxy-state');

    expect(res).to.equal(140);
    expect(num).to.equal(100);
});

it("Object should update and not leave a reference", async () => {
    const clickState = { clickCount: 0 };

    write("stoxy-state", clickState);
    update("stoxy-state", state => {
        state.clickCount += 1
        return state;
    });

    const res = await read("stoxy-state.clickCount");
    expect(res).to.equal(1);
    expect(clickState.clickCount).to.equal(0);

});

it("Object should update and not leave a reference on direct update", async () => {
    const clickState = { clickCount: 0 };

    write("stoxy-state", clickState);
    update("stoxy-state.clickCount", c => c += 1);

    const res = await read("stoxy-state");
    expect(res.clickCount).to.equal(1);
    expect(clickState.clickCount).to.equal(0);
})
