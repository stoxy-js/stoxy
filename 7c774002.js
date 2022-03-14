function e(e){var t=e.getBoundingClientRect();return{width:t.width,height:t.height,top:t.top,right:t.right,bottom:t.bottom,left:t.left,x:t.left,y:t.top}}function t(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function n(e){var n=t(e);return{scrollLeft:n.pageXOffset,scrollTop:n.pageYOffset}}function r(e){return e instanceof t(e).Element||e instanceof Element}function o(e){return e instanceof t(e).HTMLElement||e instanceof HTMLElement}function i(e){return"undefined"!=typeof ShadowRoot&&(e instanceof t(e).ShadowRoot||e instanceof ShadowRoot)}function a(e){return e?(e.nodeName||"").toLowerCase():null}function s(e){return((r(e)?e.ownerDocument:e.document)||window.document).documentElement}function f(t){return e(s(t)).left+n(t).scrollLeft}function c(e){return t(e).getComputedStyle(e)}function p(e){var t=c(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function u(r,i,c){void 0===c&&(c=!1);var u,l,d=s(i),m=e(r),h=o(i),v={scrollLeft:0,scrollTop:0},g={x:0,y:0};return(h||!h&&!c)&&(("body"!==a(i)||p(d))&&(v=(u=i)!==t(u)&&o(u)?{scrollLeft:(l=u).scrollLeft,scrollTop:l.scrollTop}:n(u)),o(i)?((g=e(i)).x+=i.clientLeft,g.y+=i.clientTop):d&&(g.x=f(d))),{x:m.left+v.scrollLeft-g.x,y:m.top+v.scrollTop-g.y,width:m.width,height:m.height}}function l(t){var n=e(t),r=t.offsetWidth,o=t.offsetHeight;return Math.abs(n.width-r)<=1&&(r=n.width),Math.abs(n.height-o)<=1&&(o=n.height),{x:t.offsetLeft,y:t.offsetTop,width:r,height:o}}function d(e){return"html"===a(e)?e:e.assignedSlot||e.parentNode||(i(e)?e.host:null)||s(e)}function m(e){return["html","body","#document"].indexOf(a(e))>=0?e.ownerDocument.body:o(e)&&p(e)?e:m(d(e))}function h(e,n){var r;void 0===n&&(n=[]);var o=m(e),i=o===(null==(r=e.ownerDocument)?void 0:r.body),a=t(o),s=i?[a].concat(a.visualViewport||[],p(o)?o:[]):o,f=n.concat(s);return i?f:f.concat(h(d(s)))}function v(e){return["table","td","th"].indexOf(a(e))>=0}function g(e){return o(e)&&"fixed"!==c(e).position?e.offsetParent:null}function y(e){for(var n=t(e),r=g(e);r&&v(r)&&"static"===c(r).position;)r=g(r);return r&&("html"===a(r)||"body"===a(r)&&"static"===c(r).position)?n:r||function(e){for(var t=navigator.userAgent.toLowerCase().includes("firefox"),n=d(e);o(n)&&["html","body"].indexOf(a(n))<0;){var r=c(n);if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||["transform","perspective"].includes(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n;n=n.parentNode}return null}(e)||n}var b="top",w="bottom",x="right",O="left",j=[b,w,x,O],E=j.reduce((function(e,t){return e.concat([t+"-start",t+"-end"])}),[]),D=[].concat(j,["auto"]).reduce((function(e,t){return e.concat([t,t+"-start",t+"-end"])}),[]),L=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function k(e){var t=new Map,n=new Set,r=[];function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e);r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}function M(e){return e.split("-")[0]}var P=Math.max,W=Math.min,A=Math.round;function B(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&i(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function H(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function R(r,i){return"viewport"===i?H(function(e){var n=t(e),r=s(e),o=n.visualViewport,i=r.clientWidth,a=r.clientHeight,c=0,p=0;return o&&(i=o.width,a=o.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(c=o.offsetLeft,p=o.offsetTop)),{width:i,height:a,x:c+f(e),y:p}}(r)):o(i)?function(t){var n=e(t);return n.top=n.top+t.clientTop,n.left=n.left+t.clientLeft,n.bottom=n.top+t.clientHeight,n.right=n.left+t.clientWidth,n.width=t.clientWidth,n.height=t.clientHeight,n.x=n.left,n.y=n.top,n}(i):H(function(e){var t,r=s(e),o=n(e),i=null==(t=e.ownerDocument)?void 0:t.body,a=P(r.scrollWidth,r.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),p=P(r.scrollHeight,r.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),u=-o.scrollLeft+f(e),l=-o.scrollTop;return"rtl"===c(i||r).direction&&(u+=P(r.clientWidth,i?i.clientWidth:0)-a),{width:a,height:p,x:u,y:l}}(s(r)))}function S(e,t,n){var i="clippingParents"===t?function(e){var t=h(d(e)),n=["absolute","fixed"].indexOf(c(e).position)>=0&&o(e)?y(e):e;return r(n)?t.filter((function(e){return r(e)&&B(e,n)&&"body"!==a(e)})):[]}(e):[].concat(t),s=[].concat(i,[n]),f=s[0],p=s.reduce((function(t,n){var r=R(e,n);return t.top=P(r.top,t.top),t.right=W(r.right,t.right),t.bottom=W(r.bottom,t.bottom),t.left=P(r.left,t.left),t}),R(e,f));return p.width=p.right-p.left,p.height=p.bottom-p.top,p.x=p.left,p.y=p.top,p}function T(e){return e.split("-")[1]}function q(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function C(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?M(o):null,a=o?T(o):null,s=n.x+n.width/2-r.width/2,f=n.y+n.height/2-r.height/2;switch(i){case b:t={x:s,y:n.y-r.height};break;case w:t={x:s,y:n.y+n.height};break;case x:t={x:n.x+n.width,y:f};break;case O:t={x:n.x-r.width,y:f};break;default:t={x:n.x,y:n.y}}var c=i?q(i):null;if(null!=c){var p="y"===c?"height":"width";switch(a){case"start":t[c]=t[c]-(n[p]/2-r[p]/2);break;case"end":t[c]=t[c]+(n[p]/2-r[p]/2)}}return t}function N(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function V(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}function I(t,n){void 0===n&&(n={});var o=n,i=o.placement,a=void 0===i?t.placement:i,f=o.boundary,c=void 0===f?"clippingParents":f,p=o.rootBoundary,u=void 0===p?"viewport":p,l=o.elementContext,d=void 0===l?"popper":l,m=o.altBoundary,h=void 0!==m&&m,v=o.padding,g=void 0===v?0:v,y=N("number"!=typeof g?g:V(g,j)),O="popper"===d?"reference":"popper",E=t.elements.reference,D=t.rects.popper,L=t.elements[h?O:d],k=S(r(L)?L:L.contextElement||s(t.elements.popper),c,u),M=e(E),P=C({reference:M,element:D,strategy:"absolute",placement:a}),W=H(Object.assign({},D,P)),A="popper"===d?W:M,B={top:k.top-A.top+y.top,bottom:A.bottom-k.bottom+y.bottom,left:k.left-A.left+y.left,right:A.right-k.right+y.right},R=t.modifiersData.offset;if("popper"===d&&R){var T=R[a];Object.keys(B).forEach((function(e){var t=[x,w].indexOf(e)>=0?1:-1,n=[b,w].indexOf(e)>=0?"y":"x";B[e]+=T[n]*t}))}return B}var U={placement:"bottom",modifiers:[],strategy:"absolute"};function z(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function _(e){void 0===e&&(e={});var t=e,n=t.defaultModifiers,o=void 0===n?[]:n,i=t.defaultOptions,a=void 0===i?U:i;return function(e,t,n){void 0===n&&(n=a);var i,s,f={placement:"bottom",orderedModifiers:[],options:Object.assign({},U,a),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],p=!1,d={state:f,setOptions:function(n){m(),f.options=Object.assign({},a,f.options,n),f.scrollParents={reference:r(e)?h(e):e.contextElement?h(e.contextElement):[],popper:h(t)};var i,s,p=function(e){var t=k(e);return L.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((i=[].concat(o,f.options.modifiers),s=i.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(s).map((function(e){return s[e]}))));return f.orderedModifiers=p.filter((function(e){return e.enabled})),f.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect;if("function"==typeof o){var i=o({state:f,name:t,instance:d,options:r}),a=function(){};c.push(i||a)}})),d.update()},forceUpdate:function(){if(!p){var e=f.elements,t=e.reference,n=e.popper;if(z(t,n)){f.rects={reference:u(t,y(n),"fixed"===f.options.strategy),popper:l(n)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach((function(e){return f.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0;r<f.orderedModifiers.length;r++)if(!0!==f.reset){var o=f.orderedModifiers[r],i=o.fn,a=o.options,s=void 0===a?{}:a,c=o.name;"function"==typeof i&&(f=i({state:f,options:s,name:c,instance:d})||f)}else f.reset=!1,r=-1}}},update:(i=function(){return new Promise((function(e){d.forceUpdate(),e(f)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(i())}))}))),s}),destroy:function(){m(),p=!0}};if(!z(e,t))return d;function m(){c.forEach((function(e){return e()})),c=[]}return d.setOptions(n).then((function(e){!p&&n.onFirstUpdate&&n.onFirstUpdate(e)})),d}}var F={passive:!0};var X={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var n=e.state,r=e.instance,o=e.options,i=o.scroll,a=void 0===i||i,s=o.resize,f=void 0===s||s,c=t(n.elements.popper),p=[].concat(n.scrollParents.reference,n.scrollParents.popper);return a&&p.forEach((function(e){e.addEventListener("scroll",r.update,F)})),f&&c.addEventListener("resize",r.update,F),function(){a&&p.forEach((function(e){e.removeEventListener("scroll",r.update,F)})),f&&c.removeEventListener("resize",r.update,F)}},data:{}};var Y={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=C({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},G={top:"auto",right:"auto",bottom:"auto",left:"auto"};function J(e){var n,r=e.popper,o=e.popperRect,i=e.placement,a=e.offsets,f=e.position,p=e.gpuAcceleration,u=e.adaptive,l=e.roundOffsets,d=!0===l?function(e){var t=e.x,n=e.y,r=window.devicePixelRatio||1;return{x:A(A(t*r)/r)||0,y:A(A(n*r)/r)||0}}(a):"function"==typeof l?l(a):a,m=d.x,h=void 0===m?0:m,v=d.y,g=void 0===v?0:v,j=a.hasOwnProperty("x"),E=a.hasOwnProperty("y"),D=O,L=b,k=window;if(u){var M=y(r),P="clientHeight",W="clientWidth";M===t(r)&&"static"!==c(M=s(r)).position&&(P="scrollHeight",W="scrollWidth"),M=M,i===b&&(L=w,g-=M[P]-o.height,g*=p?1:-1),i===O&&(D=x,h-=M[W]-o.width,h*=p?1:-1)}var B,H=Object.assign({position:f},u&&G);return p?Object.assign({},H,((B={})[L]=E?"0":"",B[D]=j?"0":"",B.transform=(k.devicePixelRatio||1)<2?"translate("+h+"px, "+g+"px)":"translate3d("+h+"px, "+g+"px, 0)",B)):Object.assign({},H,((n={})[L]=E?g+"px":"",n[D]=j?h+"px":"",n.transform="",n))}var K={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,s=n.roundOffsets,f=void 0===s||s,c={placement:M(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,J(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:f})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,J(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}};var Q={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},i=t.elements[e];o(i)&&a(i)&&(Object.assign(i.style,n),Object.keys(r).forEach((function(e){var t=r[e];!1===t?i.removeAttribute(e):i.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],i=t.attributes[e]||{},s=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});o(r)&&a(r)&&(Object.assign(r.style,s),Object.keys(i).forEach((function(e){r.removeAttribute(e)})))}))}},requires:["computeStyles"]};var Z={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,a=D.reduce((function(e,n){return e[n]=function(e,t,n){var r=M(e),o=[O,b].indexOf(r)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,a=i[0],s=i[1];return a=a||0,s=(s||0)*o,[O,x].indexOf(r)>=0?{x:s,y:a}:{x:a,y:s}}(n,t.rects,i),e}),{}),s=a[t.placement],f=s.x,c=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=f,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=a}},$={left:"right",right:"left",bottom:"top",top:"bottom"};function ee(e){return e.replace(/left|right|bottom|top/g,(function(e){return $[e]}))}var te={start:"end",end:"start"};function ne(e){return e.replace(/start|end/g,(function(e){return te[e]}))}function re(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,f=n.allowedAutoPlacements,c=void 0===f?D:f,p=T(r),u=p?s?E:E.filter((function(e){return T(e)===p})):j,l=u.filter((function(e){return c.indexOf(e)>=0}));0===l.length&&(l=u);var d=l.reduce((function(t,n){return t[n]=I(e,{placement:n,boundary:o,rootBoundary:i,padding:a})[M(n)],t}),{});return Object.keys(d).sort((function(e,t){return d[e]-d[t]}))}var oe={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0===a||a,f=n.fallbackPlacements,c=n.padding,p=n.boundary,u=n.rootBoundary,l=n.altBoundary,d=n.flipVariations,m=void 0===d||d,h=n.allowedAutoPlacements,v=t.options.placement,g=M(v),y=f||(g===v||!m?[ee(v)]:function(e){if("auto"===M(e))return[];var t=ee(e);return[ne(e),t,ne(t)]}(v)),j=[v].concat(y).reduce((function(e,n){return e.concat("auto"===M(n)?re(t,{placement:n,boundary:p,rootBoundary:u,padding:c,flipVariations:m,allowedAutoPlacements:h}):n)}),[]),E=t.rects.reference,D=t.rects.popper,L=new Map,k=!0,P=j[0],W=0;W<j.length;W++){var A=j[W],B=M(A),H="start"===T(A),R=[b,w].indexOf(B)>=0,S=R?"width":"height",q=I(t,{placement:A,boundary:p,rootBoundary:u,altBoundary:l,padding:c}),C=R?H?x:O:H?w:b;E[S]>D[S]&&(C=ee(C));var N=ee(C),V=[];if(i&&V.push(q[B]<=0),s&&V.push(q[C]<=0,q[N]<=0),V.every((function(e){return e}))){P=A,k=!1;break}L.set(A,V)}if(k)for(var U=function(e){var t=j.find((function(t){var n=L.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return P=t,"break"},z=m?3:1;z>0;z--){if("break"===U(z))break}t.placement!==P&&(t.modifiersData[r]._skip=!0,t.placement=P,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function ie(e,t,n){return P(e,W(t,n))}var ae={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0!==a&&a,f=n.boundary,c=n.rootBoundary,p=n.altBoundary,u=n.padding,d=n.tether,m=void 0===d||d,h=n.tetherOffset,v=void 0===h?0:h,g=I(t,{boundary:f,rootBoundary:c,padding:u,altBoundary:p}),j=M(t.placement),E=T(t.placement),D=!E,L=q(j),k="x"===L?"y":"x",A=t.modifiersData.popperOffsets,B=t.rects.reference,H=t.rects.popper,R="function"==typeof v?v(Object.assign({},t.rects,{placement:t.placement})):v,S={x:0,y:0};if(A){if(i||s){var C="y"===L?b:O,N="y"===L?w:x,V="y"===L?"height":"width",U=A[L],z=A[L]+g[C],_=A[L]-g[N],F=m?-H[V]/2:0,X="start"===E?B[V]:H[V],Y="start"===E?-H[V]:-B[V],G=t.elements.arrow,J=m&&G?l(G):{width:0,height:0},K=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},Q=K[C],Z=K[N],$=ie(0,B[V],J[V]),ee=D?B[V]/2-F-$-Q-R:X-$-Q-R,te=D?-B[V]/2+F+$+Z+R:Y+$+Z+R,ne=t.elements.arrow&&y(t.elements.arrow),re=ne?"y"===L?ne.clientTop||0:ne.clientLeft||0:0,oe=t.modifiersData.offset?t.modifiersData.offset[t.placement][L]:0,ae=A[L]+ee-oe-re,se=A[L]+te-oe;if(i){var fe=ie(m?W(z,ae):z,U,m?P(_,se):_);A[L]=fe,S[L]=fe-U}if(s){var ce="x"===L?b:O,pe="x"===L?w:x,ue=A[k],le=ue+g[ce],de=ue-g[pe],me=ie(m?W(le,ae):le,ue,m?P(de,se):de);A[k]=me,S[k]=me-ue}}t.modifiersData[r]=S}},requiresIfExists:["offset"]};var se={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,s=M(n.placement),f=q(s),c=[O,x].indexOf(s)>=0?"height":"width";if(i&&a){var p=function(e,t){return N("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:V(e,j))}(o.padding,n),u=l(i),d="y"===f?b:O,m="y"===f?w:x,h=n.rects.reference[c]+n.rects.reference[f]-a[f]-n.rects.popper[c],v=a[f]-n.rects.reference[f],g=y(i),E=g?"y"===f?g.clientHeight||0:g.clientWidth||0:0,D=h/2-v/2,L=p[d],k=E-u[c]-p[m],P=E/2-u[c]/2+D,W=ie(L,P,k),A=f;n.modifiersData[r]=((t={})[A]=W,t.centerOffset=W-P,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&B(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function fe(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ce(e){return[b,x,w,O].some((function(t){return e[t]>=0}))}var pe={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=I(t,{elementContext:"reference"}),s=I(t,{altBoundary:!0}),f=fe(a,r),c=fe(s,o,i),p=ce(f),u=ce(c);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:u},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":u})}},ue=_({defaultModifiers:[X,Y,K,Q]}),le=[X,Y,K,Q,Z,oe,ae,se,pe],de=_({defaultModifiers:le});export{Q as applyStyles,se as arrow,K as computeStyles,de as createPopper,ue as createPopperLite,le as defaultModifiers,I as detectOverflow,X as eventListeners,oe as flip,pe as hide,Z as offset,_ as popperGenerator,Y as popperOffsets,ae as preventOverflow};
