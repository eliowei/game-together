import{u as j,a as D,i as F,b as M,c as R,r as y,d as b,w as q,e as E,f as p,g as n,h as o,j as t,k as l,l as G,m as d,n as H,F as f,o as s,V as v,p as h,q as B,s as V,t as w,v as x,x as P}from"./index-91QIX5EU.js";import{V as T,a as z,b as J,c as K}from"./VNavigationDrawer-Dp6FYZS_.js";import{V as A}from"./VContainer-BFfq6ZoQ.js";import{V as k,a as _}from"./VList-BAfCkTK2.js";import{V as O}from"./VDivider-Dh8I4qD4.js";const Q={class:"d-flex mr-6"},W={class:"d-flex justify-space-between align-center"},oe={__name:"admin",setup(X){const{t:r}=j(),a=D(),N=F(),{mdAndUp:m}=M(),U=R(),c=y(!1),i=y(!1),L=y(new URL("/assets/logo-FHMshnbs.png",import.meta.url).href),I=b(()=>[{to:"/group",text:r("nav.groupList"),icon:"mdi-invoice-list-outline",show:a.isLoggedIn||!a.isLoggedIn},{to:"/creategroup/step1",text:r("nav.groupCreate"),icon:"mdi-flag-outline",show:a.isLoggedIn||!a.isLoggedIn},{to:"/member/organizer",text:r("nav.membersSection"),icon:"mdi-account-group",show:a.isLoggedIn},{to:"/admin/groups",text:r("nav.adminSection"),icon:"mdi-cog",show:a.isLoggedIn&&a.isAdmin},{to:"/contact",text:r("nav.contactUs"),icon:"mdi-chat",show:a.isLoggedIn||!a.isLoggedIn},{to:"/login",text:r("nav.login"),icon:"mdi-account-arrow-left",show:!a.isLoggedIn},{to:"/register",text:r("nav.register"),icon:"mdi-account-plus",show:!a.isLoggedIn}]),S=b(()=>[{to:"/admin/groups",text:r("nav.adminGroups")},{to:"/admin/users",text:r("nav.adminUsers")},{to:"/admin/contacts",text:r("nav.adminContacts")}]),C=async()=>{try{await apiAuth.delete("/user/logout")}catch(g){console.log(g)}a.logout(),N({text:r("logout.success"),snackbarProps:{color:"green"}}),c.value=!1,U.push("/")};return q(m,g=>{console.log(g),g&&(c.value&&(c.value=!1),i.value&&(i.value=!1)),g||i.value||(i.value=!0)}),(g,u)=>{const $=E("router-view");return s(),p(f,null,[n(T,null,{default:o(()=>[t(m)?(s(),l(A,{key:0,class:"d-flex justify-space-between align-center",fluid:"",style:{"max-width":"1440px"}},{default:o(()=>[n(v,{to:"/",active:!1,class:"ml-2",height:"60",ripple:!1},{default:o(()=>[n(h,{image:t(L),rounded:"0",size:"65"},null,8,["image"])]),_:1}),B("div",Q,[(s(!0),p(f,null,V(I.value,e=>(s(),p(f,{key:e.to},[e.show?(s(),l(v,{key:0,to:e.to,"prepend-icon":e.icon},{default:o(()=>[w(x(e.text),1)]),_:2},1032,["to","prepend-icon"])):d("",!0)],64))),128)),t(a).isLoggedIn?(s(),l(v,{key:0,"prepend-icon":"mdi-account-arrow-right",onClick:C},{default:o(()=>[w(x(g.$t("nav.logout")),1)]),_:1})):d("",!0),n(h,{border:"xs",image:t(a).avatar},null,8,["image"])])]),_:1})):d("",!0),t(m)?d("",!0):(s(),l(A,{key:1,class:"d-flex justify-space-between align-center",fluid:""},{default:o(()=>[n(v,{to:"/",active:!1,class:"ml-2",height:"60",ripple:!1},{default:o(()=>[n(h,{image:t(L),rounded:"0",size:"65"},null,8,["image"])]),_:1}),n(K,{onClick:u[0]||(u[0]=e=>c.value=!t(c))})]),_:1}))]),_:1}),t(m)?d("",!0):(s(),l(z,{key:0,modelValue:t(c),"onUpdate:modelValue":u[2]||(u[2]=e=>G(c)?c.value=e:null),temporary:"",location:"top"},{default:o(()=>[n(_,null,{default:o(()=>[(s(!0),p(f,null,V(I.value,e=>(s(),p(f,null,[e.show?(s(),l(k,{key:0,to:e.to,"prepend-icon":e.icon},{default:o(()=>[w(x(e.text),1)]),_:2},1032,["to","prepend-icon"])):d("",!0)],64))),256)),t(a).isLoggedIn?(s(),l(k,{key:0,"prepend-icon":"mdi-account-arrow-right",onClick:u[1]||(u[1]=()=>{C(),c.value=!1})},{default:o(()=>[w(x(g.$t("nav.logout")),1)]),_:1})):d("",!0)]),_:1})]),_:1},8,["modelValue"])),n(z,{permanent:"",rail:t(i),"rail-width":"90",drawer:"drawer",onClick:u[4]||(u[4]=e=>t(m)?null:i.value=!1),width:"260",class:H({"cursor-pointer":t(i)})},{default:o(()=>[t(i)?(s(),l(_,{key:0},{default:o(()=>[n(k,null,{default:o(()=>[n(h,{image:t(a).avatar,size:"40"},null,8,["image"])]),_:1})]),_:1})):d("",!0),t(i)?d("",!0):(s(),l(_,{key:1},{default:o(()=>[B("div",W,[n(k,{"prepend-avatar":t(a).avatar,title:t(a).nickname},null,8,["prepend-avatar","title"]),t(m)?d("",!0):(s(),l(v,{key:0,icon:"mdi-chevron-left",size:"40",variant:"text",onClick:u[3]||(u[3]=P(e=>i.value=!0,["stop"]))}))]),n(O),(s(!0),p(f,null,V(S.value,e=>(s(),l(k,{key:e.to,to:e.to},{default:o(()=>[w(x(e.text),1)]),_:2},1032,["to"]))),128))]),_:1}))]),_:1},8,["rail","class"]),n(J,null,{default:o(()=>[n($)]),_:1})],64)}}};export{oe as default};
