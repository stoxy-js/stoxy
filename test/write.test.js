import { expect } from '@esm-bundle/chai';
import { write, read } from '../lib/core';

it('String should write and not leave a reference', async () => {
    let string = 'Stoxy';
    await write('stoxy-state', string);
    string = "Not Stoxy";
    const res = await read('stoxy-state');

    expect(res).to.equal('Stoxy');
});

it('Number should write and not leave a reference', async () => {
    let num = 100;
    await write('stoxy-state', num);
    num = 50;
    const res = await read('stoxy-state');

    expect(res).to.equal(100);
});

it('Object should write and not leave a reference', async () => {
    const obj = {
        foo: 'bar',
        bar: {
            bin: {
                boo: 'ZZZ'
            }
        }
    };
    await write('stoxy-state', obj);

    obj.foo = "Bin";
    obj.bar.bin.boo = "XXX";

    const res = await read('stoxy-state');

    expect(res.foo).to.equal('bar');
    expect(res.bar.bin.boo).to.equal('ZZZ');
});

it('Object should write and not leave a reference without await', async () => {
    const obj = {
        foo: 'bar',
        bar: {
            bin: {
                boo: 'ZZZ'
            }
        }
    };
    const writePromise = write('stoxy-state', obj);

    obj.foo = "Bin";
    obj.bar.bin.boo = "XXX";

    await writePromise;
    const res = await read('stoxy-state');

    expect(res.foo).to.equal('bar');
    expect(res.bar.bin.boo).to.equal('ZZZ');
});


it('Array should write and not leave a reference', async () => {
    const arr = [
        "foo",
        "bar",
        "baz"
    ];
    await write('stoxy-state', arr);

    arr[3] = "bin";
    const res = await read('stoxy-state');

    expect(res[0]).to.equal(arr[0]);
    expect(res[1]).to.equal(arr[1]);
    expect(res[2]).to.equal(arr[2]);
    expect(res.length).to.equal(3);
});


it("Should write and not reference anything on complex objects", async () => {
    const obj = {
        foo: "Foo",
        bar: "Bar",
        bin: {
            biz: {
                zzz: "BRRR"
            },
            boo: [
                "ffff",
                "bbbb",
                "aaaa"
            ],
            gogo: {
                gugu: [
                    { name: "john" },
                    { name: "matt" }
                ]
            }
        }
    };
    write("stoxy-state", obj);

    obj.foo = "FOFOFO";
    obj.bin.biz.zzz = "KKGGGMM";
    obj.bin.boo[1] = "XXXX";
    obj.bin.gogo.gugu[0].name = "Stoxy";

    const res = await read("stoxy-state")

    expect(res.foo).to.not.equal(obj.foo);
    expect(res.bin.biz.zzz).to.not.equal(obj.bin.biz.zz);
    expect(res.bin.boo[1]).to.not.equal(obj.bin.boo[1]);
    expect(res.bin.gogo.gugu[0].name).to.not.equal(obj.bin.gogo.gugu[0].name);
});

it("Can write to subkeys", async () => {
    write("stoxy-state", {})

    write("stoxy-state.foo.bar.bin.baz", "xxx");
    const res = await read("stoxy-state.foo.bar.bin.baz");

    expect(res).to.equal("xxx");
});
