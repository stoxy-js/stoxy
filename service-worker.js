if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let d=Promise.resolve();return c[e]||(d=new Promise((async d=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=d}else importScripts(e),d()}))),d.then((()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]}))},d=(d,c)=>{Promise.all(d.map(e)).then((e=>c(1===e.length?e[0]:e)))},c={require:Promise.resolve(d)};self.define=(d,i,s)=>{c[d]||(c[d]=Promise.resolve().then((()=>{let c={};const b={uri:location.origin+d.slice(1)};return Promise.all(i.map((d=>{switch(d){case"exports":return c;case"module":return b;default:return e(d)}}))).then((e=>{const d=s(...e);return c.default||(c.default=d),c}))})))}}define("./service-worker.js",["./workbox-6881a531"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"_merged_assets/_static/noscript.css",revision:"1a5e2651bf419b6261b64869ca95af04"},{url:"1ae651f9.js",revision:"c41b29007d5452446e08e23a8608bc2c"},{url:"1f9f77a0.js",revision:"738ae7a21439b3751cda0c138688c91d"},{url:"378e9adb.js",revision:"3c11ed6db060e04c7d31d7cde2d113c9"},{url:"378e9adb2.js",revision:"3c11ed6db060e04c7d31d7cde2d113c9"},{url:"378e9adb3.js",revision:"3c11ed6db060e04c7d31d7cde2d113c9"},{url:"39b5bedf.css",revision:"847abc33924c83ab09cf975120954b19"},{url:"404.html",revision:"6b1a1a88d1af2d9d73276286dc883e34"},{url:"50d23703.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370310.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370311.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370312.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370313.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370314.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370315.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370316.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370317.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370318.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370319.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d237032.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370320.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370321.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370322.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370323.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370324.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370325.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370326.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370327.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370328.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370329.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d237033.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370330.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370331.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370332.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370333.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370334.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370335.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370336.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370337.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370338.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d2370339.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d237034.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d237035.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d237036.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d237037.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d237038.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"50d237039.js",revision:"8b6164c92e89eb0dda69cbc21cc6a622"},{url:"7c774002.js",revision:"3c43baa614ba8cd35e7223e4cd59bf5e"},{url:"87893830.js",revision:"bfe8e049cb86c1924ca0f1d0a55ce089"},{url:"8e4cba22.js",revision:"f2c1c8016f3dab11281ce4c0bf98b439"},{url:"8ec74bec.css",revision:"067f3239e66dc9db72d816267f5699b8"},{url:"a0513237.css",revision:"a3d8fa08c801b54cf7b24db2c5e670d1"},{url:"a6d6f7c1.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c110.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c111.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c112.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c113.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c114.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c115.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c116.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c117.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c118.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c119.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c12.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c120.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c121.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c122.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c123.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c124.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c125.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c126.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c127.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c128.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c129.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c13.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c130.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c131.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c132.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c133.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c134.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c135.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c136.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c137.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c138.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c139.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c14.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c15.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c16.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c17.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c18.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"a6d6f7c19.js",revision:"7fde6d688778723bab6b55424ed4610e"},{url:"b8c01bc2.css",revision:"93ea8bd0b5fbfa74d10ceb56c127a465"},{url:"ca2b0b57.js",revision:"5e8f09d3fa9d924a3688dec4173db2b2"},{url:"d3699997.css",revision:"c5c47f2f2ced2181a977e96e88a73a6e"},{url:"docs/components/index.html",revision:"7780df84c029b306990dd3799d50fea0"},{url:"docs/components/stoxy-form/index.html",revision:"3870c6303c52f2752240dfcaffe118cb"},{url:"docs/components/stoxy-object/index.html",revision:"7a1eed1dddf014b0e9e088eedc896baf"},{url:"docs/components/stoxy-repeat/index.html",revision:"8ea37e24fd9bcd7791848ce1d5730e63"},{url:"docs/components/stoxy-string/index.html",revision:"5157cdc0055d67d55433a3897a0eeef8"},{url:"docs/hooks/index.html",revision:"84f746e84f74e7b9aa2ea3767e26c128"},{url:"docs/hooks/using-stoxy-with-hooks/index.html",revision:"26824376e6185e99d4cb0ca1c7995179"},{url:"docs/index.html",revision:"73f4139138b2a6b44291468bc2d35683"},{url:"docs/methods/add/index.html",revision:"d2e65d476c654233704a84b603d3ced7"},{url:"docs/methods/clear/index.html",revision:"0bf46d5b4068bb05ceaa5f3da6e8aa91"},{url:"docs/methods/index.html",revision:"a32b183ab012eada2e5df72233f99898"},{url:"docs/methods/persist-key/index.html",revision:"10ad6b186287c844925a9e699e37a316"},{url:"docs/methods/read/index.html",revision:"cb4f2f8db7fafb27609800dc7eca005c"},{url:"docs/methods/remove/index.html",revision:"151b81a4685de8693e1566c8ab6821ed"},{url:"docs/methods/sub/index.html",revision:"4dd48a0fd0a8fc485a9d57082c2cbf28"},{url:"docs/methods/update/index.html",revision:"5780c8ad126196567c255cea389055f5"},{url:"docs/methods/where/index.html",revision:"59b7c9027a4096b10cdc9ca6e4bfb3e6"},{url:"docs/methods/write/index.html",revision:"a26c30658cd5083d27f370a419f8c1a4"},{url:"docs/mixins/element-mixin/index.html",revision:"b29350c27ea055e231990a59a30d8146"},{url:"docs/mixins/index.html",revision:"d74d1767ec2d105b6be9a01c16e5519f"},{url:"guides/examples/counter/index.html",revision:"99f7fa3ff7746f42aaf37ecc770f880b"},{url:"guides/examples/hooks/index.html",revision:"0735dc522f634e87690808a05a59663b"},{url:"guides/examples/html-element-mixin/index.html",revision:"035797e9902117f495255e5626f8cf4a"},{url:"guides/examples/index.html",revision:"f29d4db901c9f9554404d63f2e95c7b3"},{url:"guides/examples/lit-element-mixin/index.html",revision:"e9e62c9187e2e8ddb7edb88ccb6facf4"},{url:"guides/examples/todo/index.html",revision:"49d7c8f9da6994bba396455853efa4e7"},{url:"guides/examples/user-list/index.html",revision:"b55b6cb43f23e19f7b816794817358c6"},{url:"guides/getting-started/core-functionality/index.html",revision:"42607b6e9ead5ffa670770acbc0870ec"},{url:"guides/getting-started/index.html",revision:"325ffd537df5a9084ecc0dd376ec80a8"},{url:"guides/getting-started/installation/index.html",revision:"4ebc6f01e2886d6427e8536aa6277ec3"},{url:"guides/index.html",revision:"aee0875e7dc2e1c7a3f40749465dea33"},{url:"guides/recipes/index.html",revision:"a5d2484e38e95dfcf9da774981b39389"},{url:"guides/recipes/persisting-data/index.html",revision:"132b3084405a9721f4d66b54996006b2"},{url:"guides/recipes/reading-data/index.html",revision:"946d1fce281adac7ddc6365688d32e89"},{url:"guides/recipes/removing-data/index.html",revision:"88e45fcbb30dd16e4aca3e13463bfbdc"},{url:"guides/recipes/subscribing-to-updates/index.html",revision:"2e92214c263896c51005419da37d3f4f"},{url:"guides/recipes/updating-data/index.html",revision:"99f65e51b48420f805c993a8341ef9c3"},{url:"guides/recipes/writing-data/index.html",revision:"eaf660b617483a025b9473c0bcefc2b3"},{url:"index.html",revision:"cd7fa3e4ec3a2b8335c992dfbdd01586"},{url:"_merged_assets/_static/rocket-search-index.json",revision:"9603eedb9e6fa6ef7abea6f38ce0e803"}],{}),e.registerRoute("polyfills/*.js",new e.CacheFirst,"GET")}));
//# sourceMappingURL=service-worker.js.map
