import{_ as p}from"./XSvg-BvlGc3VD.js";import{M as i,G as c,f as u,e as _,_ as f}from"./VTable-Da6LWRXJ.js";import{aA as h,au as d,at as g}from"./index-B3o0lzaa.js";function b(){let s=0,a=0,e=1;const r=[];return i.forEach((o,n)=>{for(let t=Math.min(c/2,o.maxBlocks);t>0;t--){const m={...o,number:n,type:o.name,version:0,dataSize:0,size:0,page:s,color:e,options:{},blocks:Object.fromEntries(Object.entries(o.blocks).slice(0,t)),parameterCount:0,parameters:{},position:Array.from({length:t}).map((y,l)=>l+a*c)};a++,a===u&&(a=0,s++),r.push(m)}e++,e=_[e]?e:1}),{cpu:50,modules:r,pages:Array.from({length:s+1}).map((o,n)=>({name:"",index:n})),connections:[],starred:[]}}const k=h({components:{XSvg:p},computed:{patch(){return b()}}});function x(s,a,e,r,o,n){const t=p;return g(),d(t,{"cols-max":3,patch:s.patch},null,8,["patch"])}const B=f(k,[["render",x]]);export{B as default};