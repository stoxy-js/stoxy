import { expect } from '@esm-bundle/chai';
import { write, read, clear, sub, remove, persistKey } from '../lib/core';

it('Should have cache remove items when overflowing', async () => {

    let removedItems = 0;

    sub("one", () => removedItems += 1);

    persistKey("one", "two", "three", "four", "five", "six");
    write("one", 1);
    write("two", 1);
    write("three", 1);
    write("four", 1);
    write("five", 1);
    write("six", 1);

    read("one");
    read("two");
    read("three");
    read("four");
    read("five");
    await read("six");

    expect(removedItems).to.equal(1);
})
