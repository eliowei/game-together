import{u as F,i as S,o as y,f as E,g as t,h as s,q as _,v as M,j as e,x as R,ao as f,V as U,t as B,F as C,y as N}from"./index-Br_C9Lit.js";import{c as T,a as n,u as $,e as m}from"./index.esm-KudVmecD.js";import{v as I}from"./index-kdve7fvv.js";import P from"./GroupFooter-XQ0qpBiK.js";import{b}from"./route-block-B_A1xBdJ.js";import{V as j,a as v}from"./VRow-BDy_d8GI.js";import{V as z}from"./VForm-DrHUerBY.js";import{V as A}from"./VTextarea-D6MZRoo_.js";import{V as D}from"./VContainer-BAVni2Y5.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./VList-CBqJ3zIb.js";import"./VDivider-DEsP684Z.js";const G={class:"text-center"},H={__name:"contact",setup(J){const{t:o}=F(),{api:h}=N(),V=S(),k=T({nickname:n().required(o("contact.nicknameRequired")),email:n().required(o("api.userEmailRequired")).test("isEmail",o("api.userEmailInvalid"),l=>I.isEmail(l)),title:n().required(o("contact.titleRequired")),description:n().required(o("contact.descriptionRequired"))}),{handleSubmit:x,isSubmitting:g,resetForm:q}=$({validationSchema:k}),u=m("nickname"),d=m("email"),c=m("title"),p=m("description"),w=x(async l=>{var a,r;try{await h.post("/contactform/",{nickname:l.nickname,email:l.email,title:l.title,description:l.description}),q(),V({text:o("contact.success"),snackbarProps:{color:"green"}})}catch(i){console.log(i),V({text:o("api."+(((r=(a=i==null?void 0:i.response)==null?void 0:a.data)==null?void 0:r.message)||"unknownError")),snackbarProps:{color:"red"}})}});return(l,a)=>(y(),E(C,null,[t(D,{fluid:"",style:{"max-width":"1440px"}},{default:s(()=>[t(j,null,{default:s(()=>[t(v,{cols:"12"},{default:s(()=>[_("h1",G,M(l.$t("nav.contactUs")),1)]),_:1}),t(v,{cols:"6",offset:"3"},{default:s(()=>[t(z,{disabled:e(g),onSubmit:R(e(w),["prevent"])},{default:s(()=>[t(f,{modelValue:e(u).value.value,"onUpdate:modelValue":a[0]||(a[0]=r=>e(u).value.value=r),placeholder:e(o)("contact.nickname"),"error-messages":e(u).errorMessage.value,variant:"outlined"},null,8,["modelValue","placeholder","error-messages"]),t(f,{modelValue:e(d).value.value,"onUpdate:modelValue":a[1]||(a[1]=r=>e(d).value.value=r),placeholder:e(o)("contact.email"),"error-messages":e(d).errorMessage.value,variant:"outlined"},null,8,["modelValue","placeholder","error-messages"]),t(f,{modelValue:e(c).value.value,"onUpdate:modelValue":a[2]||(a[2]=r=>e(c).value.value=r),placeholder:e(o)("contact.title"),"error-messages":e(c).errorMessage.value,variant:"outlined"},null,8,["modelValue","placeholder","error-messages"]),t(A,{modelValue:e(p).value.value,"onUpdate:modelValue":a[3]||(a[3]=r=>e(p).value.value=r),placeholder:e(o)("contact.description"),variant:"outlined","no-resize":"","error-messages":e(p).errorMessage.value},null,8,["modelValue","placeholder","error-messages"]),t(v,{cols:"3",offset:"9"},{default:s(()=>[t(U,{class:"mb-15 text-white",type:"submit",loading:e(g),"append-icon":"mdi-arrow-right",width:"120",height:"40",color:"orange"},{default:s(()=>a[4]||(a[4]=[B("送出")])),_:1},8,["loading"])]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1})]),_:1}),t(P,{class:"mt-15"})],64))}};typeof b=="function"&&b(H);export{H as default};
