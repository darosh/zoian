import{_ as w,a as E,C as G,b as N,V as P}from"./VTable-6LjZO6f1.js";import{p as v,m as D,H as _,a as h,g as R,aa as $,J as x,u as I,f as i,n as T,M as F,ay as M,az as U,aA as z,au as J,ao as C,at as g,ap as l,av as u,an as b,ax as q,X as H,aw as K,aq as e}from"./index-BFsDkwSW.js";import{c as X}from"./createSimpleFunctional-ChBSgjzy.js";const Y=v({fluid:{type:Boolean,default:!1},...D(),..._(),...h()},"VContainer"),Q=R()({name:"VContainer",props:Y(),setup(t,o){let{slots:s}=o;const{rtlClasses:a}=$(),{dimensionStyles:n}=x(t);return I(()=>i(t.tag,{class:["v-container",{"v-container--fluid":t.fluid},a.value,t.class],style:[n.value,t.style]},s)),{}}}),y=["start","end","center"],S=["space-between","space-around","space-evenly"];function f(t,o){return M.reduce((s,a)=>{const n=t+U(a);return s[n]=o(),s},{})}const W=[...y,"baseline","stretch"],V=t=>W.includes(t),j=f("align",()=>({type:String,default:null,validator:V})),Z=[...y,...S],L=t=>Z.includes(t),A=f("justify",()=>({type:String,default:null,validator:L})),ll=[...y,...S,"stretch"],B=t=>ll.includes(t),O=f("alignContent",()=>({type:String,default:null,validator:B})),p={align:Object.keys(j),justify:Object.keys(A),alignContent:Object.keys(O)},tl={align:"align",justify:"justify",alignContent:"align-content"};function nl(t,o,s){let a=tl[t];if(s!=null){if(o){const n=o.replace(t,"");a+=`-${n}`}return a+=`-${s}`,a.toLowerCase()}}const sl=v({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:V},...j,justify:{type:String,default:null,validator:L},...A,alignContent:{type:String,default:null,validator:B},...O,...D(),...h()},"VRow"),ol=R()({name:"VRow",props:sl(),setup(t,o){let{slots:s}=o;const a=T(()=>{const n=[];let d;for(d in p)p[d].forEach(c=>{const r=t[c],k=nl(d,c,r);k&&n.push(k)});return n.push({"v-row--no-gutters":t.noGutters,"v-row--dense":t.dense,[`align-${t.align}`]:t.align,[`justify-${t.justify}`]:t.justify,[`align-content-${t.alignContent}`]:t.alignContent}),n});return()=>{var n;return F(t.tag,{class:["v-row",a.value,t.class],style:t.style},(n=s.default)==null?void 0:n.call(s))}}}),m=X("v-spacer","div","VSpacer"),{RGBColors:el,ColorScales:al,DocColors:rl,AdjustedColors:ul,LightColors:cl,DesaColors:il,DarkColors:dl,DesaDarkColors:Cl}=E(),gl=z({computed:{ColorScales(){return al},RGBColors(){return el},COLOR_ORDER(){return G},Colors(){return N},DocColors(){return rl},LightColors(){return cl},AdjustedColors(){return ul},DesaColors(){return il},DarkColors(){return dl},DesaDarkColors(){return Cl}}}),yl={class:"x-table"},fl={style:{padding:"0 16px !important"}};function kl(t,o,s,a,n,d){return g(),J(Q,null,{default:C(()=>[i(ol,null,{default:C(()=>[i(m),i(P,{class:"flex-shrink-1"},{default:C(()=>[o[0]||(o[0]=l("thead",null,[l("tr",null,[l("th"),l("th",null," RGB "),l("th",null,[u(" RGB "),l("br"),u("50% ")]),l("th",null," AI "),l("th",null,[u(" AI "),l("br"),u("50% ")]),l("th",null," Doc "),l("th",null,[u(" Doc "),l("br"),u("50% ")]),l("th",null," Adj. "),l("th",null," Lig. "),l("th",null,[l("b",null,[u("Desa "),l("br"),u("Lig.")])]),l("th",null," Dark "),l("th",null,[l("b",null,[u("Desa "),l("br"),u("Dark")])])])],-1)),l("tbody",yl,[(g(!0),b(H,null,q(t.COLOR_ORDER,(c,r)=>(g(),b("tr",{key:r},[l("td",fl,K(t.Colors[c]),1),l("td",null,[l("div",{style:e({backgroundColor:t.RGBColors[c]}),class:"x-c"},null,4)]),l("td",null,[l("div",{style:e([{opacity:".5"},{backgroundColor:t.RGBColors[c]}]),class:"x-c"},null,4)]),l("td",null,[l("div",{style:e({backgroundColor:t.ColorScales[c][400]}),class:"x-c"},null,4)]),l("td",null,[l("div",{style:e([{opacity:".5"},{backgroundColor:t.ColorScales[c][400]}]),class:"x-c"},null,4)]),l("td",null,[l("div",{style:e({backgroundColor:t.DocColors[r]}),class:"x-c"},null,4)]),l("td",null,[l("div",{style:e([{opacity:".5"},{backgroundColor:t.DocColors[r]}]),class:"x-c"},null,4)]),l("td",null,[l("div",{style:e({backgroundColor:t.AdjustedColors[r]}),class:"x-c"},null,4)]),l("td",null,[l("div",{style:e({backgroundColor:t.LightColors[r]}),class:"x-c"},null,4)]),l("td",null,[l("div",{style:e({backgroundColor:t.DesaColors[r]}),class:"x-c"},null,4)]),l("td",null,[l("div",{style:e({backgroundColor:t.DarkColors[r]}),class:"x-c"},null,4)]),l("td",null,[l("div",{style:e({backgroundColor:t.DesaDarkColors[r]}),class:"x-c"},null,4)])]))),128))])]),_:1}),i(m)]),_:1})]),_:1})}const vl=w(gl,[["render",kl],["__scopeId","data-v-bfd77b17"]]);export{vl as default};
