import{g,aS as d,N as k,m as f,M as y,p as N,a as b,n as h,aR as L}from"./index-DdiE6swd.js";function $(t){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"div",e=arguments.length>2?arguments[2]:void 0;return g()({name:e??d(k(t.replace(/__/g,"-"))),props:{tag:{type:String,default:s},...f()},setup(a,n){let{slots:l}=n;return()=>{var i;return y(a.tag,{class:[t,a.class],style:a.style},(i=l.default)==null?void 0:i.call(l))}}})}const o=["start","end","center"],m=["space-between","space-around","space-evenly"];function u(t,s){return L.reduce((e,a)=>{const n=t+d(a);return e[n]=s(),e},{})}const P=[...o,"baseline","stretch"],C=t=>P.includes(t),S=u("align",()=>({type:String,default:null,validator:C})),A=[...o,...m],j=t=>A.includes(t),p=u("justify",()=>({type:String,default:null,validator:j})),E=[...o,...m,"stretch"],v=t=>E.includes(t),V=u("alignContent",()=>({type:String,default:null,validator:v})),c={align:Object.keys(S),justify:Object.keys(p),alignContent:Object.keys(V)},R={align:"align",justify:"justify",alignContent:"align-content"};function _(t,s,e){let a=R[t];if(e!=null){if(s){const n=s.replace(t,"");a+=`-${n}`}return a+=`-${e}`,a.toLowerCase()}}const G=N({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:C},...S,justify:{type:String,default:null,validator:j},...p,alignContent:{type:String,default:null,validator:v},...V,...f(),...b()},"VRow"),I=g()({name:"VRow",props:G(),setup(t,s){let{slots:e}=s;const a=h(()=>{const n=[];let l;for(l in c)c[l].forEach(i=>{const w=t[i],r=_(l,i,w);r&&n.push(r)});return n.push({"v-row--no-gutters":t.noGutters,"v-row--dense":t.dense,[`align-${t.align}`]:t.align,[`justify-${t.justify}`]:t.justify,[`align-content-${t.alignContent}`]:t.alignContent}),n});return()=>{var n;return y(t.tag,{class:["v-row",a.value,t.class],style:t.style},(n=e.default)==null?void 0:n.call(e))}}});export{I as V,$ as c};