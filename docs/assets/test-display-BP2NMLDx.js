import{_ as p}from"./XSvg-BK2sZS7K.js";import{M as l,G as c,e as _,b as f,_ as u}from"./VTable-CfEOkntA.js";import{aD as h,ax as d,aw as g}from"./index-DG4osx2A.js";import"./VDivider-Bn8CYIg-.js";import"./createSimpleFunctional-0cNcNhrg.js";function b(){let s=0,a=0,o=1;const r=[];return l.forEach((t,n)=>{for(let e=Math.min(c/2,t.maxBlocks);e>0;e--){const m={...t,number:n,type:t.name,version:0,dataSize:0,size:0,page:s,color:o,options:{},blocks:Object.fromEntries(Object.entries(t.blocks).slice(0,e)),parameterCount:0,parameters:{},position:Array.from({length:e}).map((y,i)=>i+a*c)};a++,a===_&&(a=0,s++),r.push(m)}o++,o=f[o]?o:1}),{modules:r,pages:Array.from({length:s+1}).map((t,n)=>({name:"",index:n})),connections:[],starred:[]}}const k=h({components:{XSvg:p},computed:{patch(){return b()}}});function x(s,a,o,r,t,n){const e=p;return g(),d(e,{"cols-max":3,patch:s.patch},null,8,["patch"])}const E=u(k,[["render",x]]);export{E as default};