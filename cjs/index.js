var c=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var k=Object.getOwnPropertyNames,T=Object.getOwnPropertySymbols;var l=Object.prototype.hasOwnProperty,m=Object.prototype.propertyIsEnumerable;var v=(n,e,r)=>e in n?c(n,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[e]=r,a=(n,e)=>{for(var r in e||(e={}))l.call(e,r)&&v(n,r,e[r]);if(T)for(var r of T(e))m.call(e,r)&&v(n,r,e[r]);return n};var S=n=>c(n,"__esModule",{value:!0});var d=(n,e)=>{for(var r in e)c(n,r,{get:e[r],enumerable:!0})},w=(n,e,r,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of k(e))!l.call(n,t)&&(r||t!=="default")&&c(n,t,{get:()=>e[t],enumerable:!(s=x(e,t))||s.enumerable});return n};var O=(n=>(e,r)=>n&&n.get(e)||(r=w(S({}),e,1),n&&n.set(e,r),r))(typeof WeakMap!="undefined"?new WeakMap:0);var h={};d(h,{Consumer:()=>C,Observer:()=>E,useObserver:()=>p});var o=require("react");function p(n,e){let[r,s]=(0,o.useState)(n.val),t=(0,o.useRef)(e(n.val));return(0,o.useEffect)(()=>{let i=()=>{let b=!1,f=e(n.val);for(let u=0;u<f.length;u++)if(f[u]!==t.current[u]){b=!0;break}t.current=f,b&&s(a({},n.val))};return n.subscribs.add(i),()=>{n.subscribs.delete(i)}},[]),r}function C({data:n,render:e,memo:r}){let s=p(n,r);return e(s)}function E(n){let e=new Set;return{subscribs:e,next:()=>{e.forEach(r=>r())},val:n}}module.exports=O(h);
