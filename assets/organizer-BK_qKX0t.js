import{u as ze,i as Ie,ax as Ge,r as m,z as Le,c as Be,d as D,w as ce,ai as U,e as ve,o as h,f as $,g as r,h as n,q as i,v as u,t as f,V as H,j as o,k as Y,m as Z,ap as Ee,at as We,au as He,F as O,s as ee,ao as F,az as Oe,av as Ne,aw as je,y as Ke}from"./index-Cocvi862.js";import{c as fe,a as d,b as te,d as Je,u as Qe,e as c}from"./index.esm-CLWLvJD1.js";import{u as Xe}from"./areaData-CZW4_PEr.js";import{G as he,z as Ye}from"./zh-TW-CDu9b1RQ.js";import{B as Ze}from"./BlotFormatter-aiVVAyQv.js";import{b as ye}from"./route-block-B_A1xBdJ.js";import{V as Ve,a as V}from"./VRow-DI2sHk2h.js";import{V as et}from"./VDataTable-DFNzdvyp.js";import{V as tt}from"./VPagination-B7cRx8Ow.js";import{V as N}from"./VContainer-BIZ3d2W9.js";import{V as at}from"./VForm-C8jcUB_U.js";import{V as lt,a as ot,b as ae,c as rt}from"./VTabs-B3pgZpe8.js";import{V as M}from"./VSelect-BbHBx2ZR.js";import{V as nt}from"./VDivider-DTc4l7iP.js";import{V as be}from"./VChip-CTKnRZkU.js";import"./VMenu-BOxrPE2i.js";import"./VList-Bm72awTo.js";const ut={class:"mb-11"},it={class:"d-flex"},st={class:"mt-3 mr-5"},dt={class:"d-flex"},mt={class:"mt-3 mr-5"},pt={class:"d-flex"},gt={class:"mt-3 mr-5"},ct={class:"mt-3 mr-5"},vt={class:"d-flex"},ft={class:"mt-3 mr-5"},ht={key:0,class:"d-flex"},yt={class:"mt-3 mr-5"},Vt={key:1,class:"d-flex"},bt={class:"mt-3 mr-5"},xt={class:"d-flex align-center"},_t={class:"mr-5"},wt={class:"mr-5"},kt={class:"text-center"},$t={class:"text-center mb-6"},Ct={class:"text-center"},qt={style:{"max-width":"200px"}},Rt="yyyy'-'MM'-'dd'",St="HH':'mm'",At={__name:"organizer",setup(Dt){const{apiAuth:j}=Ke(),{t}=ze(),{area_data:le}=Xe(),C=Ie(),b=Ge([]),xe=m(""),oe=Le(),x=m([]),re=m([]),K=m(null),_e=Be(),P=m(10),q=m(1),ne=D(()=>Math.ceil(b.length/P.value)),we=e=>{console.log(e),q.value=e.page,P.value=e.itemsPerPage},_=m(""),ue={modules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["link"]],BlotFormatter:Ze},placeholder:"請輸入內容..."},v=m(0),R=m(5),S=m(""),p=m([]),ke=[{text:t("tag.computer"),value:t("tag.computer")},{text:t("tag.mobile"),value:t("tag.mobile")},{text:t("tag.console"),value:t("tag.console")},{text:t("tag.virtualReality"),value:t("tag.virtualReality")},{text:t("tag.augmentedReality"),value:t("tag.augmentedReality")},{text:t("tag.webGame"),value:t("tag.webGame")},{text:t("tag.Adventure"),value:t("tag.Adventure")},{text:t("tag.RPG"),value:t("tag.RPG")},{text:t("tag.simulation"),value:t("tag.simulation")},{text:t("tag.sportsAndRacing"),value:t("tag.sportsAndRacing")},{text:t("tag.puzzleAndParty"),value:t("tag.puzzleAndParty")},{text:t("tag.musicAndRhythm"),value:t("tag.musicAndRhythm")},{text:t("tag.sandboxAndOpenWorld"),value:t("tag.sandboxAndOpenWorld")},{text:t("tag.scienceFictionAndFantasy"),value:t("tag.scienceFictionAndFantasy")},{text:t("tag.EducationAndExperimental"),value:t("tag.EducationAndExperimental")},{text:t("tag.massiveMultiplayer"),value:t("tag.massiveMultiplayer")}],$e=[{title:t("group.name"),key:"group_id.name",sortable:!0},{title:t("group.time"),key:"group_id.time",sortable:!0},{title:t("group.memberLimit"),key:"group_id.member_limit",sortable:!0},{title:t("group.type"),key:"group_id.type",sortable:!0},{title:t("group.address"),key:"group_id.address",sortable:!0},{title:t("group.contactMethod"),key:"group_id.contact_method",sortable:!0},{title:"",key:"page",sortable:!1},{title:"",key:"edit",sortable:!1}],J=D(()=>[{text:t("group.online"),value:"線上"},{text:t("group.offline"),value:"線下"}]),Ce=D(()=>[{text:t("area.taipei"),value:"taipei"},{text:t("area.newTaipei"),value:"newTaipei"},{text:t("area.keeLung"),value:"keeLung"},{text:t("area.taoyuan"),value:"taoyuan"},{text:t("area.hsinchuCounty"),value:"hsinchuCounty"},{text:t("area.hsinchu"),value:"hsinchu"},{text:t("area.miaoli"),value:"miaoli"},{text:t("area.taichung"),value:"taichung"},{text:t("area.nantou"),value:"nantou"},{text:t("area.changhua"),value:"changhua"},{text:t("area.yunlin"),value:"yunlin"},{text:t("area.chiayi"),value:"chiayi"},{text:t("area.chiayiCounty"),value:"chiayiCounty"},{text:t("area.tainan"),value:"tainan"},{text:t("area.kaohsiung"),value:"kaohsiung"},{text:t("area.pingtung"),value:"pingtung"},{text:t("area.yilan"),value:"yilan"},{text:t("area.hualien"),value:"hualien"},{text:t("area.taitung"),value:"taitung"},{text:t("area.penghu"),value:"penghu"},{text:t("area.kinmen"),value:"kinmen"},{text:t("area.lienchiang"),value:"lienchiang"}]),qe=Array.from({length:19},(e,l)=>({text:String(l+2),value:l+2})),ie=async()=>{var e,l;try{const{data:s}=await j.get("/user/organizerGroup");b.push(...s.result)}catch(s){console.log(s),C({text:t("api."+(((l=(e=s==null?void 0:s.response)==null?void 0:e.data)==null?void 0:l.message)||"unknownError")),snackbarProps:{color:"red"}})}};ie();const g=m({open:!1,id:""}),Re=async e=>{if(e){console.log(e),await U(),g.value.id=e.group_id._id,T.value.value=e.group_id.name,z.value.value=e.group_id.description,w.value.value=e.group_id.type,I.value.value=e.group_id.member_limit,G.value.value=e.group_id.contact_method,L.value.value=e.group_id.contact_info,y.value.value=e.group_id.city,await U(),A.value.value=e.group_id.region,B.value.value=e.group_id.address,Q.value.value=new Date(e.group_id.time),E.value.value={hours:new Date(e.group_id.time).getHours(),minutes:new Date(e.group_id.time).getMinutes()};const l=e.group_id.tags.map(s=>({text:s,value:s}));p.value=l,R.value=5-e.group_id.tags.length,v.value=2,await U(),_.value=e.group_id.content,v.value=0}g.value.open=!0},se=()=>{var e;Ue(),g.value.id="",g.value.open=!1,(e=K.value)!=null&&e.deleteFileRecord&&K.value.deleteFileRecord(),p.value.length=0,R.value=5,_.value=""},Se=D(()=>ke.filter(e=>!p.value.includes(e))),Ae=fe({name:d().required(t("group.nameRequired")),description:d().required(t("group.descriptionRequired")),type:d().required(t("group.typeRequired")),member_limit:te().required(t("group.memberLimitRequired")),contact_method:d().required().oneOf(["Line","Discord","Facebook","其他"],t("group.contactMethodRequired")),contact_info:d().required(t("group.contactInfoRequired")),city:d().when("type",{is:e=>e===t("group.offline"),then:()=>d().required(t("group.cityRequired")),otherwise:()=>d()}),region:d().when("type",{is:e=>e===t("group.offline"),then:()=>d().required(t("group.regionRequired")),otherwise:()=>d()}),address:d().when("type",{is:e=>e===t("group.offline"),then:()=>d().required(t("group.addressRequired")),otherwise:()=>d()}),date:Je().required(t("group.dateRequired")),time:fe({hours:te().required(),minutes:te().required()}).required(t("group.timeRequired"))}),{handleSubmit:De,isSubmitting:de,resetForm:Ue,errors:Fe}=Qe({validationSchema:Ae,initialValues:{name:"",description:"",type:t("group.online"),member_limit:"5",contact_method:"Line",contact_info:"",city:"taipei",region:t("area.taipei_zhongzheng"),address:"台北市中正區",date:new Date,time:{hours:new Date().getHours(),minutes:new Date().getMinutes()}}}),T=c("name"),z=c("description"),w=c("type"),I=c("member_limit"),G=c("contact_method"),L=c("contact_info"),y=c("city"),A=c("region"),B=c("address"),Q=c("date"),E=c("time");ce(Fe,e=>{Object.keys(e).length>0&&(v.value=0)},{deep:!0}),ce(()=>y.value.value,e=>{A.value.value=""});const Me=D(()=>!y.value.value||!le[y.value.value]?[]:le[y.value.value].map(e=>({text:e,value:e}))),Pe=async e=>{try{console.log(e.group_id),await _e.push("/group/"+e.group_id._id)}catch(l){console.log(l)}},me=[{id:1,title:t("tab.group")},{id:2,title:t("tab.tag")},{id:3,title:t("tab.content")}],pe=e=>{e.value.trim()!==""&&(p.value.length<5&&(p.value.push(e),R.value-=1,console.log(p.value)),S.value="")},ge=e=>{const l=p.value.findIndex(s=>s.value===e.value);l>-1&&p.value.splice(l,1),R.value+=1},Te=De(async e=>{var l,s,W;if(!((l=x.value[0])!=null&&l.error)){if(p.value.length===0){v.value=1,await U(),C({text:t("admin.groupTagRequired"),snackbarProps:{color:"red"}});return}else if(g.value.id.length===0&&x.value.length===0){v.value=2,await U(),C({text:t("admin.groupImageRequired"),snackbarProps:{color:"red"}});return}try{const a=new FormData;a.append("name",e.name),a.append("description",e.description),a.append("type",e.type),a.append("member_limit",e.member_limit),a.append("contact_method",e.contact_method),a.append("contact_info",e.contact_info),e.type===t("group.online")?(a.append("city",""),a.append("region",""),a.append("address","")):(a.append("city",e.city),a.append("region",e.region),a.append("address",e.address)),a.append("time",`${oe.format(e.date,"keyboardDate")} ${String(e.time.hours).padStart(2,"0")}:${String(e.time.minutes).padStart(2,"0")}:00`),console.log(`${oe.format(e.date,"keyboardDate")} ${String(e.time.hours).padStart(2,"0")}:${String(e.time.minutes).padStart(2,"0")}:00`);const k=p.value.map(X=>X.value);for(let X of k)a.append("tags[]",X);console.log(_.value),a.append("content",_.value),x.value.length>0&&a.append("image",x.value[0].file),g.value.id.length>0?await j.patch("/user/organizerGroup/"+g.value.id,a):await j.post("/group",a),b.splice(0,b.length),ie(),C({text:t(g.value.id.length>0?"adminGroup.editSuccess":"adminGroup.newSuccess"),snackbarProps:{color:"green"}}),se()}catch(a){console.log(a),C({text:t("api."+(((W=(s=a.response)==null?void 0:s.data)==null?void 0:W.message)||"unknownError")),snackbarProps:{color:"red"}})}}});return(e,l)=>{const s=ve("quill-editor"),W=ve("VueFileAgent");return h(),$(O,null,[r(N,{"max-width":"1440"},{default:n(()=>[r(Ve,null,{default:n(()=>[r(V,{cols:"11","offset-sm":"1","offset-md":"1","offset-lg":"1"},{default:n(()=>[i("h1",ut,u(e.$t("member.organizer")),1),r(V,{cols:"12"},{default:n(()=>[r(et,{page:q.value,"onUpdate:page":l[0]||(l[0]=a=>q.value=a),"items-per-page":P.value,"onUpdate:itemsPerPage":l[1]||(l[1]=a=>P.value=a),items:b,headers:$e,search:xe.value,"total-items":b.length,"hide-default-footer":"","onUpdate:options":we},{"item.group_id.address":n(({value:a})=>[f(u(a||"無"),1)]),"item.group_id.time":n(({value:a})=>[f(u(new Date(a).toLocaleDateString()),1)]),"item.edit":n(({item:a})=>[r(H,{onClick:k=>Re(a)},{default:n(()=>[f(u(e.$t("member.groupEdit")),1)]),_:2},1032,["onClick"])]),"item.page":n(({item:a})=>[r(H,{onClick:k=>Pe(a)},{default:n(()=>[f(u(e.$t("member.groupView")),1)]),_:2},1032,["onClick"])]),_:2},1032,["page","items-per-page","items","search","total-items"])]),_:1}),o(ne)>1?(h(),Y(V,{key:0,cols:"12"},{default:n(()=>[r(tt,{modelValue:q.value,"onUpdate:modelValue":l[2]||(l[2]=a=>q.value=a),length:o(ne),class:"mt-8 mb-8 group__pagination"},null,8,["modelValue","length"])]),_:1})):Z("",!0)]),_:1})]),_:1})]),_:1}),r(je,{modelValue:g.value.open,"onUpdate:modelValue":l[21]||(l[21]=a=>g.value.open=a),"max-width":"800",persistent:""},{default:n(()=>[r(at,{disable:o(de)},{default:n(()=>[r(Ee,{class:"member__organizer-info"},{default:n(()=>[r(We,null,{default:n(()=>[f(u(e.$t(g.value.id?"adminGroup.edit":"adminGroup.new"))+"-"+u(me[v.value].title),1)]),_:1}),r(He,null,{default:n(()=>[r(lt,{modelValue:v.value,"onUpdate:modelValue":l[3]||(l[3]=a=>v.value=a),"align-tabs":"star",color:"orange",style:{"border-bottom":"1px solid #eeeeee"}},{default:n(()=>[(h(),$(O,null,ee(me,a=>r(rt,{key:a.id},{default:n(()=>[f(u(a.title),1)]),_:2},1024)),64))]),_:1},8,["modelValue"]),r(ot,{modelValue:v.value,"onUpdate:modelValue":l[20]||(l[20]=a=>v.value=a),class:"my-8"},{default:n(()=>[r(ae,{value:0},{default:n(()=>[r(N,null,{default:n(()=>[i("div",it,[i("span",st,u(e.$t("group.name")),1),r(F,{modelValue:o(T).value.value,"onUpdate:modelValue":l[4]||(l[4]=a=>o(T).value.value=a),"error-messages":o(T).errorMessage.value,minLength:"1",variant:"outlined","max-width":"600"},null,8,["modelValue","error-messages"])]),i("div",dt,[i("span",mt,u(e.$t("group.description")),1),r(F,{modelValue:o(z).value.value,"onUpdate:modelValue":l[5]||(l[5]=a=>o(z).value.value=a),"error-messages":o(z).errorMessage.value,minLength:"1",variant:"outlined","max-width":"600"},null,8,["modelValue","error-messages"])]),i("div",pt,[i("span",gt,u(e.$t("group.createdType")),1),r(M,{modelValue:o(w).value.value,"onUpdate:modelValue":l[6]||(l[6]=a=>o(w).value.value=a),items:o(J),"error-messages":o(w).errorMessage.value,"item-title":"text","item-value":"value",variant:"outlined",class:"mr-5","max-width":"100"},null,8,["modelValue","items","error-messages"]),i("span",ct,u(e.$t("group.memberLimit")),1),r(M,{modelValue:o(I).value.value,"onUpdate:modelValue":l[7]||(l[7]=a=>o(I).value.value=a),items:o(qe),"error-messages":o(I).errorMessage.value,"item-title":"text","item-value":"value",variant:"outlined","max-width":"100"},null,8,["modelValue","items","error-messages"])]),i("div",vt,[i("span",ft,u(e.$t("group.contactInfo")),1),r(M,{modelValue:o(G).value.value,"onUpdate:modelValue":l[8]||(l[8]=a=>o(G).value.value=a),items:["Line","Discord","Facebook","其他"],"error-messages":o(G).errorMessage.value,variant:"outlined","max-width":"150",class:"mr-5"},null,8,["modelValue","error-messages"]),r(F,{modelValue:o(L).value.value,"onUpdate:modelValue":l[9]||(l[9]=a=>o(L).value.value=a),"error-messages":o(L).errorMessage.value,variant:"outlined","max-width":"430"},null,8,["modelValue","error-messages"])]),o(w).value.value===o(J)[1].value?(h(),$("div",ht,[i("span",yt,u(e.$t("group.createdRegion")),1),r(M,{modelValue:o(y).value.value,"onUpdate:modelValue":l[10]||(l[10]=a=>o(y).value.value=a),"error-messages":o(y).errorMessage.value,items:o(Ce),"item-title":"text","item-value":"value",variant:"outlined","max-width":"150",class:"mr-5"},null,8,["modelValue","error-messages","items"]),r(M,{modelValue:o(A).value.value,"onUpdate:modelValue":l[11]||(l[11]=a=>o(A).value.value=a),"error-messages":o(A).errorMessage.value,items:o(Me),"item-title":"text","item-value":"value",variant:"outlined","max-width":"150",class:"mr-5"},null,8,["modelValue","error-messages","items"])])):Z("",!0),o(w).value.value===o(J)[1].value?(h(),$("div",Vt,[i("span",bt,u(e.$t("group.address")),1),r(F,{modelValue:o(B).value.value,"onUpdate:modelValue":l[12]||(l[12]=a=>o(B).value.value=a),"error-messages":o(B).errorMessage.value,variant:"outlined","max-width":"600"},null,8,["modelValue","error-messages"])])):Z("",!0),i("div",xt,[i("span",_t,u(e.$t("group.date")),1),r(o(he),{modelValue:o(Q).value.value,"onUpdate:modelValue":l[13]||(l[13]=a=>o(Q).value.value=a),"auto-apply":"","enable-time-picker":!1,"format-locale":o(Ye),"hide-input-icon":"",format:Rt,"min-date":new Date,style:{"max-width":"300px"},class:"mr-5"},null,8,["modelValue","format-locale","min-date"]),i("span",wt,u(e.$t("group.time")),1),r(o(he),{modelValue:o(E).value.value,"onUpdate:modelValue":l[14]||(l[14]=a=>o(E).value.value=a),"time-picker":"","hide-input-icon":"","select-text":e.$t("group.selectSure"),"cancel-text":e.$t("group.selectCancel"),format:St,"error-messages":o(E).errorMessage.value,style:{"max-width":"140px"}},null,8,["modelValue","select-text","cancel-text","error-messages"])])]),_:1})]),_:1}),r(ae,{value:1},{default:n(()=>[r(N,{class:"member__organizer"},{default:n(()=>[i("h1",kt,u(e.$t("admin.groupTag")),1),i("h2",$t,u(e.$t("admin.groupTagInfo",{variable:R.value})),1),r(Ve,null,{default:n(()=>[r(V,{cols:"11"},{default:n(()=>[r(F,{modelValue:S.value,"onUpdate:modelValue":l[15]||(l[15]=a=>S.value=a),placeholder:o(t)("admin.groupPlaceHolder"),onKeydown:l[16]||(l[16]=Oe(a=>pe({text:S.value,value:S.value}),["enter"])),variant:"outlined"},null,8,["modelValue","placeholder"])]),_:1}),r(V,{cols:"12"},{default:n(()=>[(h(!0),$(O,null,ee(p.value,a=>(h(),Y(be,{key:a,class:"mr-2 mb-2 pt-1",variant:"outlined",closable:"",link:"","onClick:close":k=>ge(a),onClick:k=>ge(a),"prepend-icon":"mdi-tag"},{default:n(()=>[f(u(a.text),1)]),_:2},1032,["onClick:close","onClick"]))),128))]),_:1}),r(V,{cols:"12"},{default:n(()=>l[22]||(l[22]=[i("h2",null,"標籤:",-1)])),_:1}),r(V,null,{default:n(()=>[(h(!0),$(O,null,ee(o(Se),a=>(h(),Y(be,{key:a,class:"mr-2 mb-2 pt-1",variant:"outlined",link:"",onClick:k=>pe(a)},{default:n(()=>[f(u(a.text),1)]),_:2},1032,["onClick"]))),128))]),_:1})]),_:1})]),_:1})]),_:1}),r(ae,{value:2},{default:n(()=>[r(N,null,{default:n(()=>[i("h1",Ct,u(e.$t("admin.groupContent")),1),r(s,{theme:"snow",content:_.value,"onUpdate:content":l[17]||(l[17]=a=>_.value=a),toolbar:ue.modules.toolbar,options:ue,contentType:"html",class:"mb-3"},null,8,["content","toolbar"]),l[23]||(l[23]=i("span",{class:"text-h6 font-weight-bold"},"圖片:",-1)),i("div",qt,[r(W,{modelValue:x.value,"onUpdate:modelValue":l[18]||(l[18]=a=>x.value=a),"raw-model-value":re.value,"onUpdate:rawModelValue":l[19]||(l[19]=a=>re.value=a),accept:"image/jpeg,image/png",deletable:"","max-size":"1MB","help-text":e.$t("fileAgent.helpText"),"error-text":{type:e.$t("fileAgent.errorType"),size:e.$t("fileAgent.errorSize")},ref_key:"fileAgent",ref:K},null,8,["modelValue","raw-model-value","help-text","error-text"])])]),_:1})]),_:1})]),_:1},8,["modelValue"]),r(nt)]),_:1}),r(Ne,{class:"mb-3"},{default:n(()=>[r(H,{onClick:se},{default:n(()=>[f(u(e.$t("adminGroup.cancel")),1)]),_:1}),r(H,{type:"button",loading:o(de),onClick:o(Te)},{default:n(()=>[f(u(e.$t("adminGroup.submit")),1)]),_:1},8,["loading","onClick"])]),_:1})]),_:1})]),_:1},8,["disable"])]),_:1},8,["modelValue"])],64)}}};typeof ye=="function"&&ye(At);export{At as default};
