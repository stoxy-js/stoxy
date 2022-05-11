import { read, sub } from "@stoxy/core";

async function readValue() {
    const val = await read<string>("KEY");

    sub("KEY", (e) => {
    })
}
