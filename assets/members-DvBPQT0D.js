import{u as J,a as K,i as Q,c as X,r as I,z as Y,b as Z,d as x,w as ee,o as te,e as oe,f as d,g as a,h as t,j as p,k as n,m as i,F as m,n as o,V,p as b,q as k,s as y,t as f,v as g,A as F,x as ae,y as le}from"./index-B1NrRx6B.js";import{_ as re}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{V as ne,a as G,b as se,c as ie}from"./VNavigationDrawer-DCDaMwU4.js";import{V as W}from"./VContainer-CJIQDdmk.js";import{V as u,a as L,b as O}from"./VList-C-cNOl_I.js";import{V as $}from"./VChip-DyHpCdvL.js";import{V as D}from"./VDivider-BJVvPLnP.js";const ue={class:"d-flex mr-6"},ce={class:"d-flex"},de={class:"d-flex flex-column ml-3 justify-center"},pe={class:"mr-3"},me={class:"d-flex justify-space-between align-center"},ge={__name:"members",setup(fe){const{t:v}=J(),l=K(),{apiAuth:z}=le(),M=Q(),P=X(),C=I([]),N=Y(),{mdAndUp:w}=Z(),R=x(()=>l.tags),_=I(!1),s=I(!1),A=I(new URL("/game-together/assets/logo-FHMshnbs.png",import.meta.url).href),B=x(()=>[{to:"/group",text:v("nav.groupList"),icon:"mdi-invoice-list-outline",show:l.isLoggedIn||!l.isLoggedIn},{to:"/creategroup/step1",text:v("nav.groupCreate"),icon:"mdi-flag-outline",show:l.isLoggedIn||!l.isLoggedIn},{to:"/member/organizer",text:v("nav.membersSection"),icon:"mdi-account-group",show:l.isLoggedIn},{to:"/admin/groups",text:v("nav.adminSection"),icon:"mdi-cog",show:l.isLoggedIn&&l.isAdmin},{to:"/contact",text:v("nav.contactUs"),icon:"mdi-chat",show:l.isLoggedIn||!l.isLoggedIn},{to:"/login",text:v("nav.login"),icon:"mdi-account-arrow-left",show:!l.isLoggedIn},{to:"/register",text:v("nav.register"),icon:"mdi-account-plus",show:!l.isLoggedIn}]),T=x(()=>[{title:"主辦的揪團",icon:"",to:"/member/organizer"},{title:"參加的揪團",icon:"",to:"/member/participation"},{title:"收藏的揪團",icon:"",to:"/member/favorites"}]),q=x(()=>[{title:"個人資訊",icon:"",to:"/member/info"},{title:"個人標籤",icon:"",to:"/member/tag"}]),j=async()=>{try{await z.delete("/user/logout")}catch(c){console.log(c)}l.logout(),M({text:v("logout.success"),snackbarProps:{color:"green"}}),_.value=!1,P.push("/")};(async()=>{try{const c=await Promise.all([z.get("/user/organizerGroup"),z.get("/user/joinGroup")]);for(let r=0;r<c.length;r++)C.value.push(...c[r].data.result)}catch(c){console.log(c)}})();const S=x(()=>{const c=N.startOfWeek(new Date),r=N.endOfWeek(new Date);return C.value.filter(h=>{const e=new Date(h.group_id.time),E=e>=c&&e<=r,H=e>=new Date;return E&&H}).sort((h,e)=>new Date(h.group_id.time)-new Date(e.group_id.time)).slice(0,3)}),U=()=>{w.value&&(_.value&&(_.value=!1),s.value&&(s.value=!1)),w.value||s.value||(s.value=!0)};return ee(w,U),te(U),(c,r)=>{const h=oe("router-view");return o(),d(m,null,[a(ne,null,{default:t(()=>[p(w)?(o(),n(W,{key:0,class:"d-flex justify-space-between align-center",fluid:"",style:{"max-width":"1440px"}},{default:t(()=>[a(V,{to:"/",active:!1,class:"ml-2",height:"60",ripple:!1},{default:t(()=>[a(b,{image:A.value,rounded:"0",size:"65"},null,8,["image"])]),_:1}),k("div",ue,[(o(!0),d(m,null,y(B.value,e=>(o(),d(m,{key:e.to},[e.show?(o(),n(V,{key:0,to:e.to,"prepend-icon":e.icon},{default:t(()=>[f(g(e.text),1)]),_:2},1032,["to","prepend-icon"])):i("",!0)],64))),128)),p(l).isLoggedIn?(o(),n(V,{key:0,"prepend-icon":"mdi-account-arrow-right",onClick:j},{default:t(()=>[f(g(c.$t("nav.logout")),1)]),_:1})):i("",!0),a(b,{border:"xs",image:p(l).avatar},null,8,["image"])])]),_:1})):p(w)?i("",!0):(o(),n(W,{key:1,class:"d-flex justify-space-between align-center",fluid:""},{default:t(()=>[a(V,{to:"/",active:!1,class:"ml-2",height:"60",ripple:!1},{default:t(()=>[a(b,{image:A.value,rounded:"0",size:"65"},null,8,["image"])]),_:1}),a(ie,{onClick:r[0]||(r[0]=e=>_.value=!_.value),class:"mr-6"})]),_:1}))]),_:1}),p(w)?i("",!0):(o(),n(G,{key:0,modelValue:_.value,"onUpdate:modelValue":r[2]||(r[2]=e=>_.value=e),temporary:"",location:"top"},{default:t(()=>[a(L,null,{default:t(()=>[(o(!0),d(m,null,y(B.value,e=>(o(),d(m,null,[e.show?(o(),n(u,{key:0,to:e.to,"prepend-icon":e.icon},{default:t(()=>[f(g(e.text),1)]),_:2},1032,["to","prepend-icon"])):i("",!0)],64))),256)),p(l).isLoggedIn?(o(),n(u,{key:0,onClick:r[1]||(r[1]=()=>{j(),_.value=!1}),"prepend-icon":"mdi-account-arrow-right"},{default:t(()=>[f(g(c.$t("nav.logout")),1)]),_:1})):i("",!0)]),_:1})]),_:1},8,["modelValue"])),a(G,{permanent:"",rail:s.value,"rail-width":"10",drawer:"drawer",width:"260",class:"custom-drawer"},{default:t(()=>[s.value?(o(),n(L,{key:0},{default:t(()=>[a(u,null,{default:t(()=>[a(b,{image:p(l).avatar,size:"50"},null,8,["image"])]),_:1})]),_:1})):i("",!0),s.value?i("",!0):(o(),n(L,{key:1},{default:t(()=>[a(u,null,{default:t(()=>[k("div",ce,[a(b,{image:p(l).avatar,size:"50"},null,8,["image"]),k("div",de,[k("span",pe,g(p(l).nickname),1),k("span",null,g(p(l).email),1)])])]),_:1}),a(u,null,{default:t(()=>[(o(!0),d(m,null,y(R.value,e=>(o(),n($,{"prepend-icon":"mdi-tag",key:e,class:"mr-2 mb-1 pt-1",size:"small",variant:"outlined"},{default:t(()=>[f(g(e),1)]),_:2},1024))),128))]),_:1})]),_:1})),s.value?i("",!0):(o(),n(D,{key:2})),s.value?i("",!0):(o(),n(L,{key:3},{default:t(()=>[a(O,{value:"Numbers"},{activator:t(({props:e})=>[a(u,F(e,{"prepend-icon":"mdi-account-group",title:"我的揪團"}),null,16)]),default:t(()=>[(o(!0),d(m,null,y(T.value,e=>(o(),n(u,{key:e.to,"prepend-icon":e.icon,title:e.title,to:e.to},null,8,["prepend-icon","title","to"]))),128))]),_:1})]),_:1})),s.value?i("",!0):(o(),n(L,{key:4},{default:t(()=>[a(O,{value:"Users"},{activator:t(({props:e})=>[a(u,F(e,{"prepend-icon":"mdi-account-circle",title:"我的資訊"}),null,16)]),default:t(()=>[(o(!0),d(m,null,y(q.value,e=>(o(),n(u,{key:e.to,"prepend-icon":e.icon,title:e.title,to:e.to},null,8,["prepend-icon","title","to"]))),128))]),_:1})]),_:1})),s.value?i("",!0):(o(),n(D,{key:5})),s.value?i("",!0):(o(),n(u,{key:6,class:"w-100"},{default:t(()=>[k("div",me,[r[5]||(r[5]=k("span",{class:"font-weight-bold"},"本周揪團",-1)),a(V,{to:"/member/date","append-icon":"mdi-arrow-top-right",variant:"text",ripple:!1,active:!1},{default:t(()=>r[4]||(r[4]=[f(" 詳細月曆 ")])),_:1})])]),_:1})),s.value?i("",!0):(o(!0),d(m,{key:7},y(S.value,e=>(o(),d(m,null,[a(D),a(u,{style:{"font-size":"14px"}},{default:t(()=>[f(g(e.group_id.name)+" "+g(e.group_id.type)+" ",1),a($,{class:"ml-1 mt-2","prepend-icon":"mdi-clock-time-four-outline",variant:"outlined",color:"orange"},{default:t(()=>[f(g(new Date(e.group_id.time).toLocaleDateString()),1)]),_:2},1024)]),_:2},1024)],64))),256)),s.value?i("",!0):(o(),n(D,{key:8})),S.value.length===0&&!s.value?(o(),n(u,{key:9},{default:t(()=>r[6]||(r[6]=[f("本周無揪團")])),_:1})):i("",!0),p(w)?i("",!0):(o(),d("div",{key:10,class:"drawer-toggle",onClick:r[3]||(r[3]=e=>s.value=!s.value)},[a(ae,{icon:s.value?"mdi-chevron-right":"mdi-chevron-left",size:"small"},null,8,["icon"])]))]),_:1},8,["rail"]),a(se,null,{default:t(()=>[a(h)]),_:1})],64)}}},be=re(ge,[["__scopeId","data-v-180e00cd"]]);export{be as default};
