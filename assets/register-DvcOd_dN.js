import{u as E,i as F,c as M,r as T,n as h,f as k,g as r,h as l,U as I,aY as R,k as U,q as n,v as w,ap as i,j as s,V as B,t as _,ay as j,m as P,x as L,F as D,y as G}from"./index-B1NrRx6B.js";import{_ as O}from"./swiper-2-b8GkgFeR.js";import{c as Y,a as u,g as H,u as J,e as m}from"./index.esm-DDDkmbFl.js";import{v as V}from"./index-I7j490vE.js";import K from"./GroupFooter-PT8IDCG7.js";import{b as S}from"./route-block-B_A1xBdJ.js";import{V as Q,a as A}from"./VRow-CqYwbDVl.js";import{V as W}from"./VSheet-CxJizK8i.js";import{V as X}from"./VForm-80Qsxh0m.js";import{V as Z}from"./VContainer-CJIQDdmk.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./VList-C-cNOl_I.js";import"./VDivider-BJVvPLnP.js";const ee={class:"mb-4"},se={key:1,class:"register__content-success"},ae={class:"mb-9"},oe={__name:"register",setup(re){const{t:o}=E(),{api:C}=G(),b=F(),$=M(),d=T(!1),q=Y({name:u().required(o("api.userNameRequired")).test("isAlphanumeric",o("api.userNameInvalid"),a=>V.isAlphanumeric(a)),account:u().required(o("api.userAccountRequired")).min(4,o("api.userAccountTooShort")).max(20,o("api.userAccountTooLong")).test("isAlphanumeric",o("api.userAccountInvalid"),a=>V.isAlphanumeric(a)),email:u().required(o("api.userEmailRequired")).test("isEmail",o("api.userEmailInvalid"),a=>V.isEmail(a)),password:u().required(o("api.userPasswordRequired")).min(4,o("api.userPasswordTooShort")).max(20,o("api.userPasswordTooLong")),passwordConfirm:u().oneOf([H("password")],o("api.userPasswordNotMatch"))}),{handleSubmit:N,isSubmitting:x}=J({validationSchema:q}),p=m("name"),c=m("account"),g=m("email"),f=m("password"),v=m("passwordConfirm"),z=N(async a=>{var e,t;try{await C.post("/user",{name:a.name,account:a.account,email:a.email,password:a.password}),b({text:o("register.success"),snackbarProps:{color:"green"}}),d.value=!0,setTimeout(()=>{$.push("/login")},1e3)}catch(y){console.log(y),b({text:o("api."+(((t=(e=y.response)==null?void 0:e.data)==null?void 0:t.message)||"unknownError")),snackbarProps:{color:"red"}})}});return(a,e)=>(h(),k(D,null,[r(Z,{fluid:"",class:"px-0",style:{"max-width":"1440px"}},{default:l(()=>[r(Q,null,{default:l(()=>[r(A,{class:"pa-0 mt-16 pt-16",sm:"6",md:"6",lg:"6",xl:"6"},{default:l(()=>[r(I,{src:O,"max-width":744,height:744,cover:""})]),_:1}),r(A,{class:"pa-0 mt-16 pt-3 mb-16 pb-9",cols:"9",sm:"6",md:"6",lg:"6",xl:"6"},{default:l(()=>[r(W,{height:850,"max-width":650,elevation:9,rounded:"",class:R(["register__content",["d-flex","flex-column","justify-center","bg-black",{"align-center":d.value}]])},{default:l(()=>[d.value?P("",!0):(h(),U(X,{key:0,disabled:s(x),onSubmit:j(s(z),["prevent"]),class:"px-12"},{default:l(()=>[n("h1",ee,w(a.$t("nav.register")),1),e[5]||(e[5]=n("span",{style:{"font-size":"20px","font-weight":"bold"}},"Nickname",-1)),r(i,{modelValue:s(p).value.value,"onUpdate:modelValue":e[0]||(e[0]=t=>s(p).value.value=t),"error-messages":s(p).errorMessage.value,placeholder:a.$t("user.namePlaceholder"),counter:"",variant:"outlined",class:"mt-3"},null,8,["modelValue","error-messages","placeholder"]),e[6]||(e[6]=n("span",{style:{"font-size":"20px","font-weight":"bold"}},"Account",-1)),r(i,{modelValue:s(c).value.value,"onUpdate:modelValue":e[1]||(e[1]=t=>s(c).value.value=t),"error-messages":s(c).errorMessage.value,placeholder:a.$t("user.accountPlaceholder"),minlength:"4",maxlength:"20",counter:"",variant:"outlined",class:"mt-3"},null,8,["modelValue","error-messages","placeholder"]),e[7]||(e[7]=n("span",{style:{"font-size":"20px","font-weight":"bold"}},"Email",-1)),r(i,{modelValue:s(g).value.value,"onUpdate:modelValue":e[2]||(e[2]=t=>s(g).value.value=t),"error-messages":s(g).errorMessage.value,placeholder:a.$t("user.loginPlaceholder"),counter:"",variant:"outlined",class:"mt-3"},null,8,["modelValue","error-messages","placeholder"]),e[8]||(e[8]=n("span",{style:{"font-size":"20px","font-weight":"bold"}},"Password",-1)),r(i,{modelValue:s(f).value.value,"onUpdate:modelValue":e[3]||(e[3]=t=>s(f).value.value=t),type:"password","error-messages":s(f).errorMessage.value,placeholder:a.$t("user.passwordPlaceholder"),minlength:"4",maxlength:"20",counter:"",variant:"outlined",class:"mt-3"},null,8,["modelValue","error-messages","placeholder"]),e[9]||(e[9]=n("span",{style:{"font-size":"20px","font-weight":"bold"}},"Confrim Password",-1)),r(i,{modelValue:s(v).value.value,"onUpdate:modelValue":e[4]||(e[4]=t=>s(v).value.value=t),type:"password","error-messages":s(v).errorMessage.value,placeholder:a.$t("user.passwordConfirmPlaceholder"),minlength:"4",maxlength:"20",counter:"",variant:"outlined",class:"mb-5 mt-3"},null,8,["modelValue","error-messages","placeholder"]),r(B,{loading:s(x),type:"submit",color:"orange",class:"w-100 register__form-button",variant:"outlined",height:"58"},{default:l(()=>[_(w(s(o)("register.submit")),1)]),_:1},8,["loading"])]),_:1},8,["disabled","onSubmit"])),d.value?(h(),k("div",se,[n("h1",ae,w(a.$t("register.success")),1),r(L,{class:"mb-5 register__content-success-icon",color:"success",icon:"mdi-check-circle",size:"112"})])):P("",!0)]),_:1},8,["class"])]),_:1})]),_:1})]),_:1}),r(K)],64))}};typeof S=="function"&&S(oe);export{oe as default};
