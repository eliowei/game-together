import{B as C,H as L,C as T,I as S,a0 as E,J as B,D as z,K as P,E as R,r as V,Q as F,L as G,M as x,N as O,O as H,P as N,S as A,bJ as M,d as i,a2 as U,a3 as D,a4 as J,G as Q,g as a,X as Y,a as j,u as q,c6 as K,o as d,k as I,h as l,q as s,f as k,F as y,s as W,t as X,v as Z,m as $,x as f,V as ee}from"./index-BQRAE9B1.js";import{_ as te}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{V as oe}from"./VContainer-C_GQ6FSN.js";import{V as se,a as p}from"./VRow-BBsefl5D.js";import{a as ae,V as le}from"./VList-QIA1_mrl.js";import"./VDivider-C35dnkm6.js";const ne=C({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...L(),...T(),...S(),...E(),...B(),...z({tag:"footer"}),...P()},"VFooter"),re=R()({name:"VFooter",props:ne(),setup(e,o){let{slots:n}=o;const u=V(),{themeClasses:m}=F(e),{backgroundColorClasses:g,backgroundColorStyles:b}=G(x(e,"color")),{borderClasses:t}=O(e),{elevationClasses:r}=H(e),{roundedClasses:_}=N(e),h=A(32),{resizeRef:w}=M(c=>{c.length&&(h.value=c[0].target.clientHeight)}),v=i(()=>e.height==="auto"?h.value:parseInt(e.height,10));return U(()=>e.app,()=>{const c=D({id:e.name,order:i(()=>parseInt(e.order,10)),position:i(()=>"bottom"),layoutSize:v,elementSize:i(()=>e.height==="auto"?void 0:v.value),active:i(()=>e.app),absolute:x(e,"absolute")});J(()=>{u.value=c.layoutItemStyles.value})}),Q(()=>a(e.tag,{ref:w,class:["v-footer",m.value,g.value,t.value,r.value,_.value,e.class],style:[b.value,e.app?u.value:{height:Y(e.height)},e.style]},n)),{}}}),ie={class:"d-flex flex-column"},ue={class:"d-flex mt-5 flex-wrap"},ce={class:"mr-5 mb-5","aria-label":"facebook button"},de={class:"mr-5 mb-5","aria-label":"instagram button"},me={class:"mb-5","aria-label":"twitter button"},ge={__name:"GroupFooter",setup(e){const o=j(),{t:n}=q(),u=K(),m=V([{text:n("nav.groupList"),to:"/group",show:o.isLoggedIn||!o.isLoggedIn},{text:n("nav.groupCreate"),to:"/creategroup/step1",show:o.isLoggedIn||!o.isLoggedIn},{text:n("nav.membersSection"),to:"/member",show:o.isLoggedIn},{text:n("nav.adminSection"),to:"/admin",show:o.isLoggedIn&&o.isAdmin},{text:n("nav.contactUs"),to:"/contact",show:o.isLoggedIn||!o.isLoggedIn}]),g=()=>{u(0,{duration:700,offset:0,easing:"easeOutQuint"})};return(b,t)=>(d(),I(re,null,{default:l(()=>[a(oe,null,{default:l(()=>[a(se,{class:"d-flex justify-space-around"},{default:l(()=>[a(p,{cols:"4",class:"d-flex align-center"},{default:l(()=>t[0]||(t[0]=[s("h1",{style:{"font-size":"clamp(24px, 4vw, 32px)"}},"GAME TOGETHER",-1)])),_:1}),a(p,{cols:"3"},{default:l(()=>[t[1]||(t[1]=s("h1",{style:{"font-size":"clamp(24px, 4vw, 32px)"}},"SITEMAP",-1)),a(ae,null,{default:l(()=>[(d(!0),k(y,null,W(m.value,r=>(d(),k(y,{key:r.to},[r.show?(d(),I(le,{key:0,to:r.to,active:!1,ripple:!1,lines:"false"},{default:l(()=>[X(Z(r.text),1)]),_:2},1032,["to"])):$("",!0)],64))),128))]),_:1})]),_:1}),a(p,{cols:"3"},{default:l(()=>[s("div",ie,[t[2]||(t[2]=s("h2",{class:"mb-4",style:{"font-size":"clamp(18px, 4vw, 24px)"}},"COPYRIGHT",-1)),t[3]||(t[3]=s("p",{class:"mb-1"},"©2025 GAME TOGETHER",-1)),t[4]||(t[4]=s("p",{class:"mb-1"},"BY BOWEI LI",-1)),t[5]||(t[5]=s("p",{class:"mb-1"},"All rights reserved.",-1)),s("div",ue,[s("button",ce,[a(f,{icon:"mdi-facebook",size:"x-large"})]),s("button",de,[a(f,{icon:"mdi-instagram",size:"x-large"})]),s("button",me,[a(f,{icon:"mdi-twitter",size:"x-large"})])])])]),_:1})]),_:1}),a(ee,{icon:"mdi-chevron-up",rounded:"48px",width:48,height:"48","base-color":"orange",style:{"font-size":"22px",right:"50px",bottom:"30px"},onClick:g,class:"position-absolute back-to-top-button text-white","aria-label":"back to top button"})]),_:1})]),_:1}))}},Ie=te(ge,[["__scopeId","data-v-31f19355"]]);export{Ie as default};
