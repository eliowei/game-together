import{u as D,r as c,a as L,i as G,d as J,o as v,k as b,h as l,g as s,q as d,t as n,j as r,x as O,v as H,U as K,V as S,p as V,ao as Q,f as W,aq as X,m as k,y as Y}from"./index-ru1HJReR.js";import{c as Z,a as A,b as ee,u as ae,e as E}from"./index.esm-CfLBVf3E.js";import{b as C}from"./route-block-B_A1xBdJ.js";import{a as m,V as F}from"./VRow-BEW2BS5b.js";import{V as te}from"./VForm-UZDyP0-H.js";import{V as U}from"./VContainer-DUDD_hfN.js";import{V as M}from"./VSelect-C9cUg6Pu.js";import"./VList-Do-W5uMD.js";import"./VDivider-zOoPTT5j.js";import"./VMenu-606rrcrx.js";import"./VChip-Z-TRrxK1.js";const se={class:"d-flex justify-end"},le={__name:"info",setup(re){const{apiAuth:I}=Y(),{t:u}=D(),i=c([]),_=L(),y=G(),w=c("http://api.multiavatar.com/bbb.png"),x=c(null),h=c(null),o=c(!1),N=J(()=>[{text:u("user.genderMale"),value:"男"},{text:u("user.genderFemale"),value:"女"}]),R=Array.from({length:100},(a,e)=>({text:e+1,value:e+1})),j=()=>{x.value.click()},B=async()=>{try{const a=x.value.files[0];if(!a)return;if(!["image/jpeg","image/png"].includes(a.type))throw new Error("userImageInvalid");if(a.size>1024*1024)throw new Error("userImageMaxSize");w.value=URL.createObjectURL(a),h.value=a}catch(a){console.log(a),y({text:u("admin."+(a.message||"unknownError")),snackbarProps:{color:"red"}})}},z=Z({name:A().required(u("api.userNameRequired")),gender:A().required(u("api.userGenderRequired")),age:ee().required(u("api.userAgeRequired"))}),{handleSubmit:P,isSubmitting:$,resetForm:oe}=ae({validationSchema:z}),p=E("name"),f=E("gender"),g=E("age"),T=P(async a=>{try{const e=new FormData;e.append("name",a.name),e.append("age",a.age),e.append("gender",a.gender),h.value&&e.append("image",h.value),await I.patch("/user/profile",e),y({text:u("api.userEditSuccess"),snackbarProps:{color:"green"}}),q(),o.value=!1}catch(e){console.log(e)}}),q=async()=>{var a,e;try{const{data:t}=await I.get("/user/profile");i.value=t.result,console.log(i.value),w.value=i.value.image,p.value.value=i.value.name,g.value.value=i.value.age,f.value.value=i.value.gender,_.setAvatar(t.result.image),_.setNickname(t.result.name)}catch(t){console.log(t),y({text:u("api."+(((e=(a=t==null?void 0:t.response)==null?void 0:a.data)==null?void 0:e.message)||"unknownError")),snackbarProps:{color:"red"}})}};return q(),(a,e)=>(v(),b(U,{"max-width":"1440"},{default:l(()=>[s(F,null,{default:l(()=>[s(m,{cols:"11",offset:"1"},{default:l(()=>[d("h1",null,n(a.$t("member.userEdit")),1),s(te,{disabled:r($),onSubmit:O(r(T),["prevent"])},{default:l(()=>[s(U,{class:"member__info"},{default:l(()=>[s(F,null,{default:l(()=>[s(m,{cols:"11",offset:"1",class:"d-flex align-center"},{default:l(()=>[s(H,{size:"70"},{default:l(()=>[s(K,{alt:"John",src:w.value},null,8,["src","alt"])]),_:1}),d("input",{ref_key:"fileInput",ref:x,type:"file",accept:"image/jpeg,image/png",onChange:B,class:"d-none"},null,544),s(S,{class:"ml-5",onClick:j,disabled:!o.value},{default:l(()=>e[5]||(e[5]=[V("變更頭像")])),_:1},8,["disabled"])]),_:1}),s(m,{cols:"11",offset:"1"},{default:l(()=>[s(m,{cols:"12"},{default:l(()=>[d("span",null,n(a.$t("user.name")),1),s(Q,{modelValue:r(p).value.value,"onUpdate:modelValue":e[0]||(e[0]=t=>r(p).value.value=t),"error-messages":r(p).errorMessage.value,counter:"",variant:"outlined",disabled:!o.value,"max-width":"300"},null,8,["modelValue","error-messages","disabled"]),d("span",null,n(a.$t("user.gender")),1),s(M,{modelValue:r(f).value.value,"onUpdate:modelValue":e[1]||(e[1]=t=>r(f).value.value=t),"error-messages":r(f).errorMessage.value,items:r(N),"item-title":"text","item-value":"value",variant:"outlined",disabled:!o.value,"max-width":"300"},null,8,["modelValue","error-messages","items","disabled"]),d("span",null,n(a.$t("user.age")),1),s(M,{modelValue:r(g).value.value,"onUpdate:modelValue":e[2]||(e[2]=t=>r(g).value.value=t),"error-messages":r(g).errorMessage.value,items:r(R),"item-title":"text","item-value":"value",variant:"outlined",disabled:!o.value,"max-width":"300"},null,8,["modelValue","error-messages","items","disabled"])]),_:1})]),_:1}),o.value?k("",!0):(v(),b(m,{key:0,cols:"8",offset:"3"},{default:l(()=>[o.value?k("",!0):(v(),W("button",{key:0,onClick:e[3]||(e[3]=t=>o.value=!0)},[s(X,{icon:"mdi-pencil-outline",size:"large"}),V(" "+n(r(u)("member.userEdit")),1)]))]),_:1})),s(m,{cols:"4"},{default:l(()=>[d("div",se,[o.value?(v(),b(S,{key:0,type:"submit",loading:r($),class:"mr-3"},{default:l(()=>[V(n(a.$t("member.submitEdit")),1)]),_:1},8,["loading"])):k("",!0),o.value?(v(),b(S,{key:1,onClick:e[4]||(e[4]=t=>o.value=!1)},{default:l(()=>[V(n(a.$t("member.cancelEdit")),1)]),_:1})):k("",!0)])]),_:1})]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1})]),_:1}))}};typeof C=="function"&&C(le);export{le as default};
