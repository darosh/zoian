import{_ as p}from"./XSvg-LoxfBBn8.js";import{M as l,G as c,e as u,b as _,_ as f}from"./VTable-6LjZO6f1.js";import{aA as h,au as d,at as g}from"./index-BFsDkwSW.js";import"./createSimpleFunctional-ChBSgjzy.js";function b(){let s=0,a=0,o=1;const r=[];return l.forEach((t,n)=>{for(let e=Math.min(c/2,t.maxBlocks);e>0;e--){const m={...t,number:n,type:t.name,version:0,dataSize:0,size:0,page:s,color:o,options:{},blocks:Object.fromEntries(Object.entries(t.blocks).slice(0,e)),parameterCount:0,parameters:{},position:Array.from({length:e}).map((y,i)=>i+a*c)};a++,a===u&&(a=0,s++),r.push(m)}o++,o=_[o]?o:1}),{cpu:50,modules:r,pages:Array.from({length:s+1}).map((t,n)=>({name:"",index:n})),connections:[],starred:[]}}const k=h({components:{XSvg:p},computed:{patch(){return b()}}});function x(s,a,o,r,t,n){const e=p;return g(),d(e,{"cols-max":3,patch:s.patch},null,8,["patch"])}const C=f(k,[["render",x]]);export{C as default};