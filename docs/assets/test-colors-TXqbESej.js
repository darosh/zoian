import{a as w,_ as E,b as G,C as N,e as P,V as _}from"./VTable-Da6LWRXJ.js";import{p as m,m as D,H as $,a as h,g as R,aa as x,J as I,u as T,f as i,n as F,M,ay as U,az as z,aA as J,au as q,ao as C,at as g,ap as l,av as u,an as b,ax as H,X as K,aw as X,aq as o}from"./index-B3o0lzaa.js";const Y=m({fluid:{type:Boolean,default:!1},...D(),...$(),...h()},"VContainer"),Q=R()({name:"VContainer",props:Y(),setup(t,e){let{slots:s}=e;const{rtlClasses:a}=x(),{dimensionStyles:n}=I(t);return T(()=>i(t.tag,{class:["v-container",{"v-container--fluid":t.fluid},a.value,t.class],style:[n.value,t.style]},s)),{}}}),y=["start","end","center"],S=["space-between","space-around","space-evenly"];function f(t,e){return U.reduce((s,a)=>{const n=t+z(a);return s[n]=e(),s},{})}const W=[...y,"baseline","stretch"],V=t=>W.includes(t),j=f("align",()=>({type:String,default:null,validator:V})),Z=[...y,...S],L=t=>Z.includes(t),A=f("justify",()=>({type:String,default:null,validator:L})),ll=[...y,...S,"stretch"],B=t=>ll.includes(t),O=f("alignContent",()=>({type:String,default:null,validator:B})),p={align:Object.keys(j),justify:Object.keys(A),alignContent:Object.keys(O)},tl={align:"align",justify:"justify",alignContent:"align-content"};function nl(t,e,s){let a=tl[t];if(s!=null){if(e){const n=e.replace(t,"");a+=`-${n}`}return a+=`-${s}`,a.toLowerCase()}}const sl=m({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:V},...j,justify:{type:String,default:null,validator:L},...A,alignContent:{type:String,default:null,validator:B},...O,...D(),...h()},"VRow"),el=R()({name:"VRow",props:sl(),setup(t,e){let{slots:s}=e;const a=F(()=>{const n=[];let d;for(d in p)p[d].forEach(c=>{const r=t[c],k=nl(d,c,r);k&&n.push(k)});return n.push({"v-row--no-gutters":t.noGutters,"v-row--dense":t.dense,[`align-${t.align}`]:t.align,[`justify-${t.justify}`]:t.justify,[`align-content-${t.alignContent}`]:t.alignContent}),n});return()=>{var n;return M(t.tag,{class:["v-row",a.value,t.class],style:t.style},(n=s.default)==null?void 0:n.call(s))}}}),v=w("v-spacer","div","VSpacer"),{RGBColors:ol,ColorScales:al,DocColors:rl,AdjustedColors:ul,LightColors:cl,DesaColors:il,DarkColors:dl,DesaDarkColors:Cl}=G(),gl=J({computed:{ColorScales(){return al},RGBColors(){return ol},COLOR_ORDER(){return N},Colors(){return P},DocColors(){return rl},LightColors(){return cl},AdjustedColors(){return ul},DesaColors(){return il},DarkColors(){return dl},DesaDarkColors(){return Cl}}}),yl={class:"x-table"},fl={style:{padding:"0 16px !important"}};function kl(t,e,s,a,n,d){return g(),q(Q,null,{default:C(()=>[i(el,null,{default:C(()=>[i(v),i(_,{class:"flex-shrink-1"},{default:C(()=>[e[0]||(e[0]=l("thead",null,[l("tr",null,[l("th"),l("th",null," RGB "),l("th",null,[u(" RGB "),l("br"),u("50% ")]),l("th",null," AI "),l("th",null,[u(" AI "),l("br"),u("50% ")]),l("th",null," Doc "),l("th",null,[u(" Doc "),l("br"),u("50% ")]),l("th",null," Adj. "),l("th",null," Lig. "),l("th",null,[l("b",null,[u("Desa "),l("br"),u("Lig.")])]),l("th",null," Dark "),l("th",null,[l("b",null,[u("Desa "),l("br"),u("Dark")])])])],-1)),l("tbody",yl,[(g(!0),b(K,null,H(t.COLOR_ORDER,(c,r)=>(g(),b("tr",{key:r},[l("td",fl,X(t.Colors[c]),1),l("td",null,[l("div",{style:o({backgroundColor:t.RGBColors[c]}),class:"x-c"},null,4)]),l("td",null,[l("div",{style:o([{opacity:".5"},{backgroundColor:t.RGBColors[c]}]),class:"x-c"},null,4)]),l("td",null,[l("div",{style:o({backgroundColor:t.ColorScales[c][400]}),class:"x-c"},null,4)]),l("td",null,[l("div",{style:o([{opacity:".5"},{backgroundColor:t.ColorScales[c][400]}]),class:"x-c"},null,4)]),l("td",null,[l("div",{style:o({backgroundColor:t.DocColors[r]}),class:"x-c"},null,4)]),l("td",null,[l("div",{style:o([{opacity:".5"},{backgroundColor:t.DocColors[r]}]),class:"x-c"},null,4)]),l("td",null,[l("div",{style:o({backgroundColor:t.AdjustedColors[r]}),class:"x-c"},null,4)]),l("td",null,[l("div",{style:o({backgroundColor:t.LightColors[r]}),class:"x-c"},null,4)]),l("td",null,[l("div",{style:o({backgroundColor:t.DesaColors[r]}),class:"x-c"},null,4)]),l("td",null,[l("div",{style:o({backgroundColor:t.DarkColors[r]}),class:"x-c"},null,4)]),l("td",null,[l("div",{style:o({backgroundColor:t.DesaDarkColors[r]}),class:"x-c"},null,4)])]))),128))])]),_:1}),i(v)]),_:1})]),_:1})}const vl=E(gl,[["render",kl],["__scopeId","data-v-bfd77b17"]]);export{vl as default};