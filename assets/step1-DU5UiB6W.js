import{u as O,c as W,d as k,_ as J,w as K,o as R,f as S,g as l,h as n,q as s,v as m,aA as Q,j as e,x as X,ao as $,m as U,ar as Y,as as Z,V as ee,t as ae,F as te}from"./index-Cocvi862.js";import{c as C,a as u,b as D,d as le,u as re,e as d}from"./index.esm-CLWLvJD1.js";import{u as oe}from"./areaData-CZW4_PEr.js";import{G as F,z as se}from"./zh-TW-CDu9b1RQ.js";import{u as ue}from"./group-6gzXahVB.js";import{G as ie}from"./GroupFooter-D10Btk8P.js";import{b as I}from"./route-block-B_A1xBdJ.js";import{V as T,a as c}from"./VRow-DI2sHk2h.js";import{V as G}from"./VContainer-BIZ3d2W9.js";import{V as ne}from"./VForm-C8jcUB_U.js";import{V as f}from"./VSelect-BbHBx2ZR.js";import{V as me}from"./VDivider-DTc4l7iP.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./VList-Bm72awTo.js";import"./VMenu-BOxrPE2i.js";import"./VChip-CTKnRZkU.js";const de={class:"text-center mb-2 mt-2"},pe={class:"text-center mb-15"},ve={class:"d-flex align-center"},ce={class:"mr-12"},ge={class:"d-flex align-center"},fe={class:"mr-12"},he={class:"d-flex align-center"},Ve={class:"mr-12"},ye={class:"ml-5 mr-6"},_e={class:"d-flex align-center"},xe={class:"mr-12"},we={key:0,class:"d-flex align-center"},be={class:"mr-12"},qe={key:1,class:"d-flex align-center"},$e={class:"mr-12"},Me={class:"d-flex align-center"},ke="yyyy'-'MM'-'dd'",Re="HH':'mm'",Se={__name:"step1",setup(De){const{t:a}=O(),i=ue(),{area_data:L}=oe(),P=W(),z=Array.from({length:19},(t,r)=>({text:String(r+2),value:r+2})),h=k(()=>[{text:a("group.online"),value:"線上"},{text:a("group.offline"),value:"線下"}]),B=C({name:u().required(a("group.nameRequired")),description:u().required(a("group.descriptionRequired")),type:u().required(a("group.typeRequired")),member_limit:D().required(a("group.memberLimitRequired")),contact_method:u().required().oneOf(["Line","Discord","Facebook","其他"],a("group.contactMethodRequired")),contact_info:u().required(a("group.contactInfoRequired")),city:u().when("type",{is:t=>t===a("group.offline"),then:()=>u().required(a("group.cityRequired")),otherwise:()=>u()}),region:u().when("type",{is:t=>t===a("group.offline"),then:()=>u().required(a("group.regionRequired")),otherwise:()=>u()}),address:u().when("type",{is:t=>t===a("group.offline"),then:()=>u().required(a("group.addressRequired")),otherwise:()=>u()}),date:le().required(a("group.dateRequired")),time:C({hours:D().required(),minutes:D().required()}).required(a("group.timeRequired"))}),{handleSubmit:N,isSubmitting:A}=re({validationSchema:B,initialValues:{name:"",description:"",type:a("group.online"),member_limit:5,contact_method:"Line",contact_info:"",city:"taipei",region:a("area.taipei_zhongzheng"),address:"台北市中正區",date:new Date,time:{hours:new Date().getHours(),minutes:new Date().getMinutes()}}}),V=d("name"),y=d("description"),v=d("type"),_=d("member_limit"),x=d("contact_method"),w=d("contact_info"),p=d("city"),g=d("region"),b=d("address"),M=d("date"),q=d("time"),H=N(t=>{i.setStep1(t),P.push("/creategroup/step2")});J(()=>{i.hasData.resotre.step1&&(V.value.value=i.step1.name,y.value.value=i.step1.description,v.value.value=i.step1.type,_.value.value=i.step1.member_limit,x.value.value=i.step1.contact_method,w.value.value=i.step1.contact_info,p.value.value=i.step1.city,g.value.value=i.step1.region,b.value.value=i.step1.address,M.value.value=new Date(i.step1.date),q.value.value=i.step1.time)});const j=k(()=>[{text:a("area.taipei"),value:"taipei"},{text:a("area.newTaipei"),value:"newTaipei"},{text:a("area.keeLung"),value:"keeLung"},{text:a("area.taoyuan"),value:"taoyuan"},{text:a("area.hsinchuCounty"),value:"hsinchuCounty"},{text:a("area.hsinchu"),value:"hsinchu"},{text:a("area.miaoli"),value:"miaoli"},{text:a("area.taichung"),value:"taichung"},{text:a("area.nantou"),value:"nantou"},{text:a("area.changhua"),value:"changhua"},{text:a("area.yunlin"),value:"yunlin"},{text:a("area.chiayi"),value:"chiayi"},{text:a("area.chiayiCounty"),value:"chiayiCounty"},{text:a("area.tainan"),value:"tainan"},{text:a("area.kaohsiung"),value:"kaohsiung"},{text:a("area.pingtung"),value:"pingtung"},{text:a("area.yilan"),value:"yilan"},{text:a("area.hualien"),value:"hualien"},{text:a("area.taitung"),value:"taitung"},{text:a("area.penghu"),value:"penghu"},{text:a("area.kinmen"),value:"kinmen"},{text:a("area.lienchiang"),value:"lienchiang"}]);K(()=>p.value.value,t=>{g.value.value=""});const E=k(()=>!p.value.value||!L[p.value.value]?[]:L[p.value.value].map(t=>({text:t,value:t})));return(t,r)=>(R(),S(te,null,[l(G,{fluid:""},{default:n(()=>[l(T,null,{default:n(()=>[l(c,{cols:"12"},{default:n(()=>[s("h2",de,m(t.$t("group.createStep1")),1),l(Q,{"model-value":"20",height:"10",color:"green-accent-4"})]),_:1})]),_:1})]),_:1}),l(G,{style:{"max-width":"1440px"}},{default:n(()=>[s("h1",pe,m(t.$t("group.step1Title")),1),l(ne,{disabled:e(A),onSubmit:X(e(H),["prevent"])},{default:n(()=>[l(T,null,{default:n(()=>[l(c,{cols:"6",offset:"3"},{default:n(()=>[s("div",ve,[s("span",ce,m(t.$t("group.name")),1),l($,{modelValue:e(V).value.value,"onUpdate:modelValue":r[0]||(r[0]=o=>e(V).value.value=o),placeholder:t.$t("group.namePlaceholder"),"error-messages":e(V).errorMessage.value,minLength:"1",variant:"outlined",class:"creategroup__step1-form"},null,8,["modelValue","placeholder","error-messages"])]),s("div",ge,[s("span",fe,m(t.$t("group.description")),1),l($,{modelValue:e(y).value.value,"onUpdate:modelValue":r[1]||(r[1]=o=>e(y).value.value=o),placeholder:t.$t("group.descriptionPlaceholder"),"error-messages":e(y).errorMessage.value,minLength:"1",variant:"outlined",class:"creategroup__step1-form"},null,8,["modelValue","placeholder","error-messages"])]),s("div",he,[s("span",Ve,m(t.$t("group.createdType")),1),l(f,{modelValue:e(v).value.value,"onUpdate:modelValue":r[2]||(r[2]=o=>e(v).value.value=o),items:h.value,"error-messages":e(v).errorMessage.value,"item-title":"text","item-value":"value",variant:"outlined",class:"creategroup__step1-form",style:{"max-width":"100px"}},null,8,["modelValue","items","error-messages"]),s("span",ye,m(t.$t("group.memberLimit")),1),l(f,{modelValue:e(_).value.value,"onUpdate:modelValue":r[3]||(r[3]=o=>e(_).value.value=o),items:e(z),"error-messages":e(_).errorMessage.value,"item-title":"text","item-value":"value",variant:"outlined",class:"creategroup__step1-form",style:{"max-width":"80px"}},null,8,["modelValue","items","error-messages"])]),s("div",_e,[s("span",xe,m(t.$t("group.contactInfo")),1),l(f,{modelValue:e(x).value.value,"onUpdate:modelValue":r[4]||(r[4]=o=>e(x).value.value=o),items:["Line","Discord","Facebook","其他"],"error-messages":e(x).errorMessage.value,variant:"outlined",class:"creategroup__step1-form",style:{"max-width":"150px"}},null,8,["modelValue","error-messages"]),l($,{modelValue:e(w).value.value,"onUpdate:modelValue":r[5]||(r[5]=o=>e(w).value.value=o),placeholder:t.$t("group.contactInfoPlaceholder"),"error-messages":e(w).errorMessage.value,variant:"outlined",class:"creategroup__step1-form ml-5"},null,8,["modelValue","placeholder","error-messages"])]),e(v).value.value===h.value[1].value?(R(),S("div",we,[s("span",be,m(t.$t("group.createdRegion")),1),l(f,{modelValue:e(p).value.value,"onUpdate:modelValue":r[6]||(r[6]=o=>e(p).value.value=o),"error-messages":e(p).errorMessage.value,items:j.value,"item-title":"text","item-value":"value",class:"creategroup__step1-form mr-4",variant:"outlined",style:{"max-width":"150px"}},null,8,["modelValue","error-messages","items"]),l(f,{modelValue:e(g).value.value,"onUpdate:modelValue":r[7]||(r[7]=o=>e(g).value.value=o),"error-messages":e(g).errorMessage.value,items:E.value,"item-title":"text","item-value":"value",class:"creategroup__step1-form",variant:"outlined",style:{"max-width":"150px"}},null,8,["modelValue","error-messages","items"])])):U("",!0),e(v).value.value===h.value[1].value?(R(),S("div",qe,[s("span",$e,m(t.$t("group.address")),1),Y(l($,{modelValue:e(b).value.value,"onUpdate:modelValue":r[8]||(r[8]=o=>e(b).value.value=o),placeholder:t.$t("group.addressPlaceholder"),"error-messages":e(b).errorMessage.value,class:"creategroup__step1-form",variant:"outlined"},null,8,["modelValue","placeholder","error-messages"]),[[Z,e(v).value.value===h.value[1].value]])])):U("",!0),s("div",Me,[s("span",null,m(t.$t("group.date")),1),l(c,{cols:"4"},{default:n(()=>[l(e(F),{modelValue:e(M).value.value,"onUpdate:modelValue":r[9]||(r[9]=o=>e(M).value.value=o),"auto-apply":"","enable-time-picker":!1,"format-locale":e(se),"hide-input-icon":"",format:ke,"min-date":new Date,class:"ml-9"},null,8,["modelValue","format-locale","min-date"])]),_:1}),l(c,{cols:"2",offset:"1"},{default:n(()=>[s("span",null,m(t.$t("group.time")),1)]),_:1}),l(c,{cols:"3"},{default:n(()=>[l(e(F),{modelValue:e(q).value.value,"onUpdate:modelValue":r[10]||(r[10]=o=>e(q).value.value=o),"time-picker":"","hide-input-icon":"","select-text":t.$t("group.selectSure"),"cancel-text":t.$t("group.selectCancel"),format:Re,"error-messages":e(q).errorMessage.value},null,8,["modelValue","select-text","cancel-text","error-messages"])]),_:1})]),l(me,{class:"border-opacity-100 my-12"}),l(c,{cols:"12",offset:"10",class:"mb-16"},{default:n(()=>[l(ee,{type:"submit",width:"110","append-icon":"mdi-arrow-right"},{default:n(()=>[ae(m(e(a)("group.next")),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1}),l(ie)],64))}};typeof I=="function"&&I(Se);export{Se as default};
