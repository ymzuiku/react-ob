var w=Object.create;var u=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var d=Object.getOwnPropertyNames,a=Object.getOwnPropertySymbols,S=Object.getPrototypeOf,y=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var p=(e,r,t)=>r in e?u(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,h=(e,r)=>{for(var t in r||(r={}))y.call(r,t)&&p(e,t,r[t]);if(a)for(var t of a(r))C.call(r,t)&&p(e,t,r[t]);return e};var k=(e,r)=>{for(var t in r)u(e,t,{get:r[t],enumerable:!0})},v=(e,r,t,n)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of d(r))!y.call(e,o)&&o!==t&&u(e,o,{get:()=>r[o],enumerable:!(n=x(r,o))||n.enumerable});return e};var E=(e,r,t)=>(t=e!=null?w(S(e)):{},v(r||!e||!e.__esModule?u(t,"default",{value:e,enumerable:!0}):t,e)),A=e=>v(u({},"__esModule",{value:!0}),e);var q={};k(q,{Consumer:()=>z,CreateObserver:()=>m,isEqual:()=>l,useCreateObserver:()=>P,useObserver:()=>O});module.exports=A(q);var T=E(require("react"));var f=require("react");var j=typeof Element!="undefined",B=typeof Map=="function",M=typeof Set=="function",_=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function i(e,r){if(e===r)return!0;if(e&&r&&typeof e=="object"&&typeof r=="object"){if(e.constructor!==r.constructor)return!1;let t,n,o;if(Array.isArray(e)){if(t=e.length,t!=r.length)return!1;for(n=t;n--!==0;)if(!i(e[n],r[n]))return!1;return!0}let s;if(B&&e instanceof Map&&r instanceof Map){if(e.size!==r.size)return!1;for(s=e.entries();!(n=s.next()).done;)if(!r.has(n.value[0]))return!1;for(s=e.entries();!(n=s.next()).done;)if(!i(n.value[1],r.get(n.value[0])))return!1;return!0}if(M&&e instanceof Set&&r instanceof Set){if(e.size!==r.size)return!1;for(s=e.entries();!(n=s.next()).done;)if(!r.has(n.value[0]))return!1;return!0}if(_&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(r)){if(t=e.length,t!=r.length)return!1;for(n=t;n--!==0;)if(e[n]!==r[n])return!1;return!0}if(e.constructor===RegExp)return e.source===r.source&&e.flags===r.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===r.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===r.toString();if(o=Object.keys(e),t=o.length,t!==Object.keys(r).length)return!1;for(n=t;n--!==0;)if(!Object.prototype.hasOwnProperty.call(r,o[n]))return!1;if(j&&e instanceof Element)return!1;for(n=t;n--!==0;)if(!((o[n]==="_owner"||o[n]==="__v"||o[n]==="__o")&&e.$$typeof)&&!i(e[o[n]],r[o[n]]))return!1;return!0}return e!==e&&r!==r}function l(e,r){try{return i(e,r)}catch(t){if((t.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw t}}function O(e,r){let[t,n]=(0,f.useState)(e.val),o=(0,f.useRef)(r(e.val));return(0,f.useEffect)(()=>{let s=()=>{let c=r(e.val),g=!l(c,o.current);o.current=c,g&&n(h({},e.val))};return e.subscribs.add(s),()=>{e.subscribs.delete(s)}},[]),t}function z({data:e,children:r,memo:t}){let n=O(e,t);return r(n)}function m(e){let r=new Set,t={subscribs:r,next:n=>{n?Promise.resolve(n(t.val)).then(()=>{r.forEach(o=>o())}):r.forEach(o=>o())},val:e};return t}function P(e,r){return(0,f.useMemo)(()=>m(e),r)}
