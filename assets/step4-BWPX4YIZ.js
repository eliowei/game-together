import{aB as ue,c as X,r as N,u as Y,a as Z,d as pe,aC as me,o as _,f as w,g as e,h as a,q as n,t as r,v as J,U as T,j as g,F as k,s as A,k as L,p,ap as H,au as K,aq as V,m as Q,V as b,ar as fe,at as ge,ay as _e,aw as ye,z as ve,i as he,_ as be,aA as xe,aD as Ve,aE as we,y as Se}from"./index-ru1HJReR.js";import{u as qe}from"./group-ClrJUjiU.js";import{b as R}from"./route-block-B_A1xBdJ.js";import{V as C,a as x}from"./VRow-BEW2BS5b.js";import{V as z}from"./VContainer-DUDD_hfN.js";import{V as ke}from"./VChip-Z-TRrxK1.js";import{V as B}from"./VDivider-zOoPTT5j.js";import{V as $e,c as De,a as Re,b as Ce}from"./VTabs-BcY-LJtE.js";import{a as ze,V as Fe}from"./VList-Do-W5uMD.js";import{c as Ie,a as c,b as Pe,f as Te,u as Ae,e as m}from"./index.esm-CfLBVf3E.js";import{G as Le}from"./GroupFooter-Bt_O2dZb.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const Ne={class:"d-flex d-wrap align-center"},Be={class:"d-flex flex-column pl-3 align-center"},Ue={class:"group-content mt-15",style:{"margin-bottom":"100px"}},je={class:"d-flex flex-wrap"},Ge={class:"card-content d-flex flex-column"},Ee={class:"mb-1"},Oe={class:"mb-1"},Me={class:"mb-1"},We={key:0,class:"mb-1"},Je={class:"d-flex flex-column align-center",style:{width:"260px"}},He={class:"ml-6 mt-5 mb-5"},Ke={class:"d-flex"},Qe={class:"d-flex flex-column mr-9 align-center"},Xe={class:"mt-3 ml-1"},Ye={class:"mt-1"},Ze={class:"d-flex justify-space-between mb-13 mt-4"},et={class:"d-flex flex-column"},tt={class:"d-flex flex-column mr-8 align-center"},at={class:"d-flex creategroup__step4-preview"},ee={__name:"GroupPreview",props:{organizer_id:{type:String,default:()=>({})},name:{type:String,default:""},description:{type:String,default:""},type:{type:String,default:""},member_limit:{type:Number,default:0},contact_method:{type:String,default:""},contact_info:{type:String,default:""},city:{type:String,default:""},region:{type:String,default:""},address:{type:String,default:""},time:{type:String,default:""},tags:{type:Array,default:()=>[]},content:{type:String,default:""},images:{type:String,default:""}},setup(F){ue(),X();const v=N(0),t=[{id:0,title:"參與者"},{id:1,title:"留言"}],l=F,o=N(!1),{t:S}=Y(),f=Z(),I=pe(()=>[{title:"聯絡方式",icon:"mdi-forum",value:l.contact_method},{title:"聯絡資訊",icon:"",value:l.contact_info}]);return(U,i)=>{const $=me("dompurify-html");return _(),w(k,null,[e(z,null,{default:a(()=>[e(C,null,{default:a(()=>[e(x,{cols:"10"},{default:a(()=>[n("h2",null,r(l.name),1),n("div",Ne,[e(J,{size:"50"},{default:a(()=>[e(T,{src:g(f).image},null,8,["src"])]),_:1}),n("div",Be,[i[5]||(i[5]=n("span",null,"主辦者",-1)),n("span",null,r(g(f).nickname),1)])])]),_:1})]),_:1})]),_:1}),e(z,{class:"bg-orange-lighten-5"},{default:a(()=>[e(C,null,{default:a(()=>[e(x,{cols:"10",offset:"1"},{default:a(()=>[n("div",Ue,[n("div",je,[e(x,{cols:"12",sm:"12",md:"5",lg:"5",xl:"5"},{default:a(()=>[e(T,{src:l.images,"max-height":"400","min-width":"300","max-width":"628","aspect-ratio":"16/9",cover:""},null,8,["src"])]),_:1}),e(x,{cols:"12",offset:"1",sm:"12","offset-sm":"3",md:"4","offset-md":"3",lg:"4","offset-lg":"3",xl:"4","offset-xl":"2"},{default:a(()=>[(_(!0),w(k,null,A(l.tags,d=>(_(),L(ke,{class:"mb-2 mt-1 mr-1",variant:"outlined",color:"orange"},{default:a(()=>[p(r(d),1)]),_:2},1024))),256)),n("div",Ge,[e(H,{width:"260",height:"150"},{default:a(()=>[e(K,{class:"d-flex flex-column"},{default:a(()=>[n("span",Ee,[e(V,{icon:"mdi-calendar-range"}),p(r(l.time),1)]),n("span",Oe,[e(V,{icon:"mdi-web"}),p(" "+r(l.type),1)]),n("span",Me,[e(V,{icon:"mdi-forum"}),p(" "+r(l.contact_method),1)]),F.type==="線下"?(_(),w("span",We,[e(V,{icon:"mdi-map-marker-outline"}),p(" "+r(l.city+l.region),1)])):Q("",!0),n("span",null,[e(V,{icon:"mdi-account-multiple-outline"}),p(" "+r(l.member_limit),1)])]),_:1})]),_:1})]),n("div",Je,[e(b,{class:"mt-3","prepend-icon":"mdi-clipboard-list",style:{width:"160px",height:"40px"},onClick:i[0]||(i[0]=d=>o.value=!0)},{default:a(()=>i[6]||(i[6]=[p("聯絡資訊")])),_:1})])]),_:1})]),fe(n("div",He,null,512),[[$,l.content]]),e(B,{class:"border-opacity-100"}),e($e,{modelValue:v.value,"onUpdate:modelValue":i[1]||(i[1]=d=>v.value=d),"align-tabs":"star",color:"orange",style:{"border-bottom":"1px solid #eeeeee"},class:"mt-8"},{default:a(()=>[(_(),w(k,null,A(t,d=>e(De,{key:d.id},{default:a(()=>[p(r(d.title),1)]),_:2},1024)),64))]),_:1},8,["modelValue"]),e(Re,{modelValue:v.value,"onUpdate:modelValue":i[2]||(i[2]=d=>v.value=d),class:"my-8"},{default:a(()=>[e(Ce,{value:0},{default:a(()=>[n("div",Ke,[n("div",Qe,[e(J,{size:"50"},{default:a(()=>[e(T,{src:g(f).image},null,8,["src"])]),_:1}),n("span",Xe,r(g(f).nickname),1),n("span",Ye,r(l.organizer_id===g(f).id?"主辦者":"成員"),1)])])]),_:1})]),_:1},8,["modelValue"]),e(B,{class:"border-opacity-100"})]),n("div",Ze,[n("div",et,[n("span",null,r(l.time),1),n("h2",null,r(l.name),1)]),n("div",tt,[n("span",null,r(l.member_limit-1)+"個空位",1),e(b,{icon:"mdi-bookmark-outline",variant:"text"})]),n("div",at,[e(b,{height:"50",disabled:!0},{default:a(()=>i[7]||(i[7]=[p("主辦者")])),_:1}),e(b,{height:"50"},{default:a(()=>i[8]||(i[8]=[p("取消揪團")])),_:1})])])]),_:1})]),_:1})]),_:1}),e(ye,{modelValue:o.value,"onUpdate:modelValue":i[4]||(i[4]=d=>o.value=d),width:"350",opacity:"0"},{default:a(()=>[e(H,null,{default:a(()=>[e(ge,{class:"d-flex align-center mb-0 pb-0"},{default:a(()=>[n("span",null,r(g(S)("group.contactInfo")),1),e(_e),e(b,{icon:"mdi-close",variant:"text",onClick:i[3]||(i[3]=d=>o.value=!1)})]),_:1}),e(K,{class:"pt-0"},{default:a(()=>[e(ze,{class:"py-0"},{default:a(()=>[(_(!0),w(k,null,A(I.value,(d,P)=>(_(),L(Fe,{class:"py-0",key:P},{default:a(()=>[p(r(d.title)+": ",1),d.icon?(_(),L(V,{key:0,icon:d.icon},null,8,["icon"])):Q("",!0),p(" "+r(d.value),1)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}}};typeof R=="function"&&R(ee);const st={class:"text-center mb-2 mt-2"},ot={style:{"max-width":"100%"}},nt={__name:"step4",setup(F){const v=Z(),t=qe(),l=ve(),{t:o}=Y(),S=X(),f=he(),{apiAuth:I}=Se(),U=Ie({organizer_id:c().required(o("group.organizerNameRequired")),name:c().required(o("group.nameRequired")),description:c().required(o("group.descriptionRequired")),type:c().required(o("group.typeRequired")),member_limit:Pe().required(o("group.memberLimitRequired")),contact_method:c().required().oneOf(["Line","Discord","Facebook"],o("group.contactMethodRequired")),contact_info:c().required(o("group.contactInfoRequired")),city:c().when("type",{is:u=>u===o("group.offline"),then:()=>c().required(o("group.cityRequired")),otherwise:()=>c()}),region:c().when("type",{is:u=>u===o("group.offline"),then:()=>c().required(o("group.regionRequired")),otherwise:()=>c()}),address:c().when("type",{is:u=>u===o("group.offline"),then:()=>c().required(o("group.addressRequired")),otherwise:()=>c()}),time:c().required(o("group.timeRequired")),tags:Te().required(o("group.tagRequired")),content:c().required(o("group.contentRequired"))}),{handleSubmit:i,isSubmitting:$}=Ae({validationSchema:U,initialValues:{organizer_id:v.id,name:t.step1.name,description:t.step1.description,type:t.step1.type,member_limit:t.step1.member_limit,contact_method:t.step1.contact_method,contact_info:t.step1.contact_info,city:t.step1.city,region:t.step1.region,address:t.step1.address,time:t.step1.date,tags:t.step2.tags,content:t.step3.content}}),d=m("organizer_id"),P=m("name"),te=m("description"),j=m("type"),ae=m("member_limit"),se=m("contact_method"),oe=m("contact_info"),ne=m("city"),ie=m("region"),re=m("address"),G=m("time"),le=m("tags"),de=m("content"),E=N({organizer_id:v.id,name:t.step1.name,description:t.step1.description,type:t.step1.type,member_limit:t.step1.member_limit,contact_method:t.step1.contact_method,contact_info:t.step1.contact_info,city:t.step1.city,region:t.step1.region,address:t.step1.address,time:`${l.format(t.step1.date,"keyboardDate")} ${String(t.step1.time.hours).padStart(2,"0")}:${String(t.step1.time.minutes).padStart(2,"0")}:00`,tags:t.step2.tags,content:t.step3.content,images:t.step3.image}),O=((u,h)=>{const s=u.split(","),q=s[0].match(/:(.*?);/)[1],y=atob(s[1]);let D=y.length;const W=new Uint8Array(D);for(;D--;)W[D]=y.charCodeAt(D);return new File([W],h,{type:q})})(E.value.images,"image.jpg"),ce=i(async()=>{var u,h;if(!O){f({text:o("group.imageRequired"),snackbarProps:{color:"red"}}),S.push("/creategroup/step3");return}try{G.value.value=`${l.format(t.step1.date,"keyboardDate")} ${String(t.step1.time.hours).padStart(2,"0")}:${String(t.step1.time.minutes).padStart(2,"0")}:00`;const s=new FormData;s.append("organizer_id",d.value.value),s.append("name",P.value.value),s.append("description",te.value.value),s.append("type",j.value.value),s.append("member_limit",ae.value.value),s.append("contact_method",se.value.value),s.append("contact_info",oe.value.value),j.value.value===o("group.online")?(s.append("city",""),s.append("region",""),s.append("address","")):(s.append("city",ne.value.value),s.append("region",ie.value.value),s.append("address",re.value.value)),s.append("time",G.value.value);for(let q of le.value.value)s.append("tags[]",q);s.append("content",de.value.value),s.append("image",O),await I.post("/group",s),t.restData(),f({text:o("group.createSuccess"),snackbarProps:{color:"green"}}),t.restData(),S.push("/creategroup/step5")}catch(s){console.log(s),f({text:o("api."+(((h=(u=s.response)==null?void 0:u.data)==null?void 0:h.message)||"unknownError")),snackbarProps:{color:"red"}})}});be(()=>{M()});const M=()=>{const u=JSON.parse(localStorage.getItem("createGroupData")),h={step1:["name","description","type","member_limit","contact_method","contact_info","city","region","address","time"],step2:["tags"],step3:["content","image"]};try{for(const[s,q]of Object.entries(h))for(const y of q)if(!(y in u[s])){s==="step1"?t.step1[y]="":s==="step2"?t.step2[y]=[]:s==="step3"&&(t.step3[y]=""),f({text:`${s} 的 ${o(`group.${y}`)}資料有誤，已重置`,snackbarProps:{color:"red"}}),S.push(`/creategroup/${s}`);return}}catch(s){f({text:s.message,snackbarProps:{color:"red"}})}};return window.addEventListener("storage",()=>{M()}),(u,h)=>(_(),w(k,null,[e(z,{fluid:""},{default:a(()=>[e(C,null,{default:a(()=>[e(x,{cols:"12"},{default:a(()=>[n("h2",st,r(u.$t("group.createStep4")),1),e(xe,{"model-value":"80",height:"10",color:"green-accent-4"})]),_:1})]),_:1})]),_:1}),e(z,{style:{"max-width":"1440px"}},{default:a(()=>[e(C,null,{default:a(()=>[e(x,{cols:"10",offset:"1","offset-sm":"1","offset-md":"1"},{default:a(()=>[n("div",ot,[e(ee,Ve(we(E.value)),null,16),e(B,{class:"border-opacity-100 my-12"}),e(x,{class:"d-flex justify-space-between",cols:"10",offset:"1"},{default:a(()=>[e(b,{class:"mb-16",width:"110","append-icon":"mdi-arrow-left",to:"/creategroup/step3"},{default:a(()=>[p(r(g(o)("group.previous")),1)]),_:1}),e(b,{type:"submit",class:"mb-16",width:"110","append-icon":"mdi-arrow-right",onClick:g(ce),loading:g($),disabled:g($)},{default:a(()=>[p(r(g(o)("group.next")),1)]),_:1},8,["onClick","loading","disabled"])]),_:1})])]),_:1})]),_:1})]),_:1}),e(Le)],64))}};typeof R=="function"&&R(nt);export{nt as default};
