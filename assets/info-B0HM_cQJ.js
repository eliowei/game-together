import{u as D,r as c,a as L,i as G,d as J,n as v,k as b,h as l,g as s,q as d,v as n,j as r,ay as O,p as H,U as K,V as S,t as V,ap as Q,f as W,x as X,m as y,y as Y}from"./index-B1NrRx6B.js";import{c as Z,a as C,b as ee,u as ae,e as E}from"./index.esm-DDDkmbFl.js";import{b as F}from"./route-block-B_A1xBdJ.js";import{a as m,V as U}from"./VRow-CqYwbDVl.js";import{V as te}from"./VForm-80Qsxh0m.js";import{V as q}from"./VContainer-CJIQDdmk.js";import{V as M}from"./VSelect-Ba1H83Ob.js";import"./VList-C-cNOl_I.js";import"./VDivider-BJVvPLnP.js";import"./VMenu-fm70IgU3.js";import"./VChip-DyHpCdvL.js";const se={class:"d-flex justify-end"},le={__name:"info",setup(re){const{apiAuth:I}=Y(),{t:o}=D(),i=c([]),_=L(),k=G(),w=c("http://api.multiavatar.com/bbb.png"),x=c(null),h=c(null),u=c(!1),N=J(()=>[{text:o("user.genderMale"),value:"男"},{text:o("user.genderFemale"),value:"女"}]),R=Array.from({length:100},(a,e)=>({text:e+1,value:e+1})),j=()=>{x.value.click()},B=async()=>{try{const a=x.value.files[0];if(!a)return;if(!["image/jpeg","image/png"].includes(a.type))throw new Error("userImageInvalid");if(a.size>1024*1024)throw new Error("userImageMaxSize");w.value=URL.createObjectURL(a),h.value=a}catch(a){console.log(a),k({text:o("admin."+(a.message||"unknownError")),snackbarProps:{color:"red"}})}},z=Z({name:C().required(o("api.userNameRequired")),gender:C().required(o("api.userGenderRequired")),age:ee().required(o("api.userAgeRequired"))}),{handleSubmit:P,isSubmitting:$,resetForm:ue}=ae({validationSchema:z}),p=E("name"),f=E("gender"),g=E("age"),T=P(async a=>{try{const e=new FormData;e.append("name",a.name),e.append("age",a.age),e.append("gender",a.gender),h.value&&e.append("image",h.value),await I.patch("/user/profile",e),k({text:o("api.userEditSuccess"),snackbarProps:{color:"green"}}),A(),u.value=!1}catch(e){console.log(e)}}),A=async()=>{var a,e;try{const{data:t}=await I.get("/user/profile");i.value=t.result,console.log(i.value),w.value=i.value.image,p.value.value=i.value.name,g.value.value=i.value.age,f.value.value=i.value.gender,_.setAvatar(t.result.image),_.setNickname(t.result.name)}catch(t){console.log(t),k({text:o("api."+(((e=(a=t==null?void 0:t.response)==null?void 0:a.data)==null?void 0:e.message)||"unknownError")),snackbarProps:{color:"red"}})}};return A(),(a,e)=>(v(),b(q,{"max-width":"1440"},{default:l(()=>[s(U,null,{default:l(()=>[s(m,{cols:"11",offset:"1"},{default:l(()=>[d("h1",null,n(a.$t("member.userEdit")),1),s(te,{disabled:r($),onSubmit:O(r(T),["prevent"])},{default:l(()=>[s(q,{class:"member__info"},{default:l(()=>[s(U,null,{default:l(()=>[s(m,{cols:"11",offset:"1",class:"d-flex align-center"},{default:l(()=>[s(H,{size:"70"},{default:l(()=>[s(K,{alt:"John",src:w.value},null,8,["src","alt"])]),_:1}),d("input",{ref_key:"fileInput",ref:x,type:"file",accept:"image/jpeg,image/png",onChange:B,class:"d-none"},null,544),s(S,{class:"ml-5",onClick:j,disabled:!u.value},{default:l(()=>e[5]||(e[5]=[V("變更頭像")])),_:1},8,["disabled"])]),_:1}),s(m,{cols:"11",offset:"1"},{default:l(()=>[s(m,{cols:"12"},{default:l(()=>[d("span",null,n(a.$t("user.name")),1),s(Q,{modelValue:r(p).value.value,"onUpdate:modelValue":e[0]||(e[0]=t=>r(p).value.value=t),"error-messages":r(p).errorMessage.value,counter:"",variant:"outlined",disabled:!u.value,"max-width":"300"},null,8,["modelValue","error-messages","disabled"]),d("span",null,n(a.$t("user.gender")),1),s(M,{modelValue:r(f).value.value,"onUpdate:modelValue":e[1]||(e[1]=t=>r(f).value.value=t),"error-messages":r(f).errorMessage.value,items:r(N),"item-title":"text","item-value":"value",variant:"outlined",disabled:!u.value,"max-width":"300"},null,8,["modelValue","error-messages","items","disabled"]),d("span",null,n(a.$t("user.age")),1),s(M,{modelValue:r(g).value.value,"onUpdate:modelValue":e[2]||(e[2]=t=>r(g).value.value=t),"error-messages":r(g).errorMessage.value,items:r(R),"item-title":"text","item-value":"value",variant:"outlined",disabled:!u.value,"max-width":"300"},null,8,["modelValue","error-messages","items","disabled"])]),_:1})]),_:1}),u.value?y("",!0):(v(),b(m,{key:0,cols:"8",offset:"3"},{default:l(()=>[u.value?y("",!0):(v(),W("button",{key:0,onClick:e[3]||(e[3]=t=>u.value=!0)},[s(X,{icon:"mdi-pencil-outline",size:"large"}),V(" "+n(r(o)("member.userEdit")),1)]))]),_:1})),s(m,{cols:"4"},{default:l(()=>[d("div",se,[u.value?(v(),b(S,{key:0,type:"submit",loading:r($),class:"mr-3"},{default:l(()=>[V(n(a.$t("member.submitEdit")),1)]),_:1},8,["loading"])):y("",!0),u.value?(v(),b(S,{key:1,onClick:e[4]||(e[4]=t=>u.value=!1)},{default:l(()=>[V(n(a.$t("member.cancelEdit")),1)]),_:1})):y("",!0)])]),_:1})]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1})]),_:1}))}};typeof F=="function"&&F(le);export{le as default};
