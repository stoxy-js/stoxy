import { write, update, read, add, remove } from "@stoxy/core";



//write("foo.bar", "bar").then(res => console.log(res.data));
//write("foo.biz", "biz").then(res => console.log(res.data));;
//write("foo.zap", "zap").then(res => console.log(res.data));;
//write("foo.zoo", "zoo").then(res => console.log(res.data));;
//write("foo.zee", "zee").then(res => console.log(res.data));;




/*update("foo", obj => {
if (!obj) obj = {};
obj.bin = "bin";
return obj;
});
update("foo", obj => {
obj.ban = "ban";
return obj;
});
update("foo", obj => {
obj.ben = "ben";
return obj;
});
update("foo", obj => {
obj.bun = "bun";
return obj;
});*/



add("foo", "One");
add("foo", "Two");
add("foo", "Three");
add("foo", "Four");
add("foo", "Five");

setTimeout(() => {
    remove("foo", f => f == "One");
    remove("foo", f => f == "Three");
    remove("foo", f => f == "Five");
    read("foo").then(res => console.log(res));

}, 1000)



setTimeout(() => console.table(window._STOXY_STATE_CACHE), 200)

