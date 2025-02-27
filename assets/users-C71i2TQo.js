import{r as g,ax as oe,u as re,a as ne,i as ue,d as ie,o as de,f as me,g as s,h as t,q as u,t as i,V as p,p as m,ao as b,j as n,ap as N,at as pe,au as j,v as ce,U as ve,av as B,aw as L,F as fe,y as ge}from"./index-ru1HJReR.js";import{c as Ve,a as _,b as we,u as ke,e as V}from"./index.esm-CfLBVf3E.js";import{v as z}from"./index-ky0LNljT.js";import{b as G}from"./route-block-B_A1xBdJ.js";import{V as S,a as w}from"./VRow-BEW2BS5b.js";import{V as be}from"./VDataTable-D93ysj0p.js";import{V as J}from"./VContainer-DUDD_hfN.js";import{V as _e}from"./VForm-UZDyP0-H.js";import{V as O}from"./VSelect-C9cUg6Pu.js";import"./VPagination-B0jPp_cT.js";import"./VMenu-606rrcrx.js";import"./VChip-Z-TRrxK1.js";import"./VDivider-zOoPTT5j.js";import"./VList-Do-W5uMD.js";const xe={class:"text-center mb-5"},ye={class:"d-flex"},he={class:"mt-3 mr-5"},$e={class:"d-flex"},Ce={class:"mt-3 mr-13"},Ae={class:"d-flex"},Ue={class:"mt-3 mr-13"},Ee={class:"d-flex"},qe={class:"mt-3 mr-13"},De={class:"d-flex"},Ie={class:"mt-3 mr-13"},Re={class:"d-flex"},Se={class:"mt-3 mr-13"},Te={__name:"users",setup(Fe){const q=g(""),v=oe([]),{t:o}=re(),{apiAuth:x}=ge(),D=ne(),f=ue(),H=[{title:o("admin.userId"),key:"_id",sortable:!0},{title:o("admin.userName"),key:"name",sortable:!0},{title:o("admin.userGender"),key:"gender",sortable:!0},{title:o("admin.userAge"),key:"age",sortable:!0},{title:o("admin.userEmail"),key:"email",sortable:!0},{title:o("admin.userRole"),key:"role",sortable:!0},{title:"",key:"edit",sortable:!1},{title:"",key:"delete",sortable:!1}],d=g({open:!1,id:""}),c=g({open:!1,data:""}),K=e=>{c.value.open=!0,c.value.data=e},T=e=>{e==="cancel"?c.value.open=!1:e==="confirm"&&(Y(c.value.data),c.value.open=!1)},F=async e=>{e&&(console.log(e),d.value.id=e._id,$.value.value=e.name,k.value.value=e.account,C.value.value=e.email,A.value.value="*****",E.value.value=e.age,U.value.value=e.gender,I.value=e.image||`http://api.multiavatar.com/${k.value.value}.png`),d.value.open=!0},P=()=>{d.value.open=!1,d.value.id="",ae(),y.value=null,h.value=null},I=g("http://api.multiavatar.com/bbb.png"),y=g(null),h=g(null),Q=()=>{y.value.click()},W=async()=>{try{const e=y.value.files[0];if(!e)return;if(!["image/jpeg","image/png"].includes(e.type))throw new Error("userImageInvalid");if(e.size>1024*1024)throw new Error("userImageMaxSize");I.value=URL.createObjectURL(e),h.value=e}catch(e){console.log(e),f({text:o("admin."+(e.message||"unknownError")),snackbarProps:{color:"red"}})}},X=e=>{if(e===0)return o("admin.userRoleUser");if(e===1)return o("admin.userRoleMember");if(e===2)return o("admin.userRoleAdmin")},R=async()=>{var e,a;try{const{data:l}=await x.get("/user/all");v.push(...l.result),v.find(r=>{r._id===D.id&&(D.setAvatar(r.image),D.setNickname(r.name))})}catch(l){console.log(l),f({text:o("api."+(((a=(e=l==null?void 0:l.response)==null?void 0:e.data)==null?void 0:a.message)||"unknownError")),snackbarProps:{color:"red"}})}};R();const Y=async e=>{var a,l;try{await x.delete("/user/"+e._id),v.length=0,await R(),f({text:o("admin.groupDeleted"),snackbarProps:{color:"green"}})}catch(r){console.log(r),f({text:o("api."+(((l=(a=r==null?void 0:r.response)==null?void 0:a.data)==null?void 0:l.message)||"unknownError")),snackbarProps:{color:"red"}})}},Z=Ve({name:_().required(o("api.userNameRequired")),account:_().required(o("api.userAccountRequired")).min(4,o("api.userAccountTooShort")).max(20,o("api.userAccountTooLong")).test("isAlphanumeric",o("api.userAccountInvalid"),e=>z.isAlphanumeric(e)),email:_().required(o("api.userEmailRequired")).test("isEmail",o("api.userEmailInvalid"),e=>z.isEmail(e)),password:_().required(o("api.userPasswordRequired")).min(4,o("api.userPasswordTooShort")).max(20,o("api.userPasswordTooLong")),gender:_().required(o("api.userGenderRequired")),age:we().required(o("api.userAgeRequired"))}),{handleSubmit:ee,isSubmitting:M,resetForm:ae}=ke({validationSchema:Z}),$=V("name"),k=V("account"),C=V("email"),A=V("password"),U=V("gender"),E=V("age"),le=ee(async e=>{var a,l;try{const r=new FormData;r.append("name",e.name),r.append("account",e.account),r.append("email",e.email),r.append("age",e.age),r.append("gender",e.gender),e.password.includes("*")?r.append("password",""):r.append("password",e.password),h.value&&r.append("image",h.value),d.value.id.length>0?await x.patch("/user/profile/"+d.value.id,r):await x.post("/user",r),v.splice(0,v.length),R(),f({text:o(d.value.id.length>0?"admin.userEditSuccess":"admin.userCreated"),snackbarProps:{color:"green"}}),P()}catch(r){console.log(r),f({text:o("api."+(((l=(a=r==null?void 0:r.response)==null?void 0:a.data)==null?void 0:l.message)||"unknownError")),snackbarProps:{color:"red"}})}}),se=ie(()=>[{text:o("user.genderMale"),value:"男"},{text:o("user.genderFemale"),value:"女"}]),te=Array.from({length:100},(e,a)=>({text:a+1,value:a+1}));return(e,a)=>(de(),me(fe,null,[s(J,{class:"admin__user","max-width":"1440"},{default:t(()=>[s(S,null,{default:t(()=>[s(w,{cols:"11",offset:"0","offset-sm":"0","offset-md":"0","offset-lg":"0","offset-xl":"1"},{default:t(()=>[u("h1",xe,i(e.$t("nav.adminUsers")),1),s(w,{cols:"12"},{default:t(()=>[s(S,{class:"mb-5"},{default:t(()=>[s(w,{cols:"3","align-self":"center"},{default:t(()=>[s(p,{onClick:a[0]||(a[0]=l=>F(null))},{default:t(()=>[m(i(e.$t("admin.userNew")),1)]),_:1})]),_:1}),s(w,{cols:"9",sm:"9",md:"9",lg:"6",xl:"6"},{default:t(()=>[s(b,{modelValue:q.value,"onUpdate:modelValue":a[1]||(a[1]=l=>q.value=l),"prepend-inner-icon":"mdi-magnify",variant:"outlined","max-width":"600"},null,8,["modelValue"])]),_:1})]),_:1}),s(be,{items:v,headers:H,search:q.value},{"item.role":t(({item:l})=>[u("span",null,i(X(l.role)),1)]),"item.edit":t(({item:l})=>[s(p,{onClick:r=>F(l)},{default:t(()=>[m(i(e.$t("admin.userEdit")),1)]),_:2},1032,["onClick"])]),"item.delete":t(({item:l})=>[s(p,{onClick:r=>K(l)},{default:t(()=>[m(i(e.$t("admin.userDelete")),1)]),_:2},1032,["onClick"])]),_:2},1032,["items","search"])]),_:1})]),_:1})]),_:1})]),_:1}),s(L,{modelValue:d.value.open,"onUpdate:modelValue":a[8]||(a[8]=l=>d.value.open=l),"max-width":"500"},{default:t(()=>[s(_e,{disabled:n(M)},{default:t(()=>[s(N,{class:"admin__user-form"},{default:t(()=>[s(pe,null,{default:t(()=>[m(i(e.$t(d.value.id?"admin.userEdit":"admin.userNew")),1)]),_:1}),s(j,{class:"pb-0"},{default:t(()=>[s(J,null,{default:t(()=>[s(S,null,{default:t(()=>[s(w,{cols:"12",class:"d-flex align-center"},{default:t(()=>[s(ce,{size:"x-large"},{default:t(()=>[s(ve,{alt:"John",src:I.value},null,8,["src","alt"])]),_:1}),u("input",{ref_key:"fileInput",ref:y,type:"file",accept:"image/jpeg,image/png",minlength:"1024",onChange:W,class:"d-none"},null,544),s(p,{class:"ml-5",onClick:Q},{default:t(()=>a[12]||(a[12]=[m("變更頭像")])),_:1})]),_:1}),s(w,{cols:"12"},{default:t(()=>[u("div",ye,[u("span",he,i(e.$t("user.email")),1),s(b,{modelValue:n(C).value.value,"onUpdate:modelValue":a[2]||(a[2]=l=>n(C).value.value=l),"error-messages":n(C).errorMessage.value,variant:"outlined","max-width":"300"},null,8,["modelValue","error-messages"])]),u("div",$e,[u("span",Ce,i(e.$t("user.name")),1),s(b,{modelValue:n($).value.value,"onUpdate:modelValue":a[3]||(a[3]=l=>n($).value.value=l),"error-messages":n($).errorMessage.value,counter:"",variant:"outlined","max-width":"300"},null,8,["modelValue","error-messages"])]),u("div",Ae,[u("span",Ue,i(e.$t("user.account")),1),s(b,{modelValue:n(k).value.value,"onUpdate:modelValue":a[4]||(a[4]=l=>n(k).value.value=l),"error-messages":n(k).errorMessage.value,counter:"",variant:"outlined","max-width":"300"},null,8,["modelValue","error-messages"])]),u("div",Ee,[u("span",qe,i(e.$t("user.password")),1),s(b,{modelValue:n(A).value.value,"onUpdate:modelValue":a[5]||(a[5]=l=>n(A).value.value=l),type:"password","error-messages":n(A).errorMessage.value,counter:"",variant:"outlined","max-width":"300"},null,8,["modelValue","error-messages"])]),u("div",De,[u("span",Ie,i(e.$t("user.gender")),1),s(O,{modelValue:n(U).value.value,"onUpdate:modelValue":a[6]||(a[6]=l=>n(U).value.value=l),"error-messages":n(U).errorMessage.value,items:n(se),"item-title":"text","item-value":"value",variant:"outlined","max-width":"300"},null,8,["modelValue","error-messages","items"])]),u("div",Re,[u("span",Se,i(e.$t("user.age")),1),s(O,{modelValue:n(E).value.value,"onUpdate:modelValue":a[7]||(a[7]=l=>n(E).value.value=l),"error-messages":n(E).errorMessage.value,items:n(te),"item-title":"text","item-value":"value",variant:"outlined","max-width":"300"},null,8,["modelValue","error-messages","items"])])]),_:1})]),_:1})]),_:1})]),_:1}),s(B,{class:"mb-3"},{default:t(()=>[s(p,{onClick:P},{default:t(()=>[m(i(e.$t("user.cancel")),1)]),_:1}),s(p,{type:"button",loading:n(M),onClick:n(le)},{default:t(()=>[m(i(e.$t("user.submit")),1)]),_:1},8,["loading","onClick"])]),_:1})]),_:1})]),_:1},8,["disabled"])]),_:1},8,["modelValue"]),s(L,{modelValue:c.value.open,"onUpdate:modelValue":a[11]||(a[11]=l=>c.value.open=l),width:"350"},{default:t(()=>[s(N,null,{default:t(()=>[s(j,null,{default:t(()=>a[13]||(a[13]=[m("確定要刪除成員嗎?")])),_:1}),s(B,null,{default:t(()=>[s(p,{onClick:a[9]||(a[9]=l=>T("cancel"))},{default:t(()=>a[14]||(a[14]=[m("取消")])),_:1}),s(p,{onClick:a[10]||(a[10]=l=>T("confirm"))},{default:t(()=>a[15]||(a[15]=[m("確定")])),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}};typeof G=="function"&&G(Te);export{Te as default};
