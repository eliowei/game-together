import{aC as ce,c as pe,u as me,r as u,d as A,o as fe,a0 as ge,n as r,f as v,g as a,h as n,q as s,ar as R,C as q,V,t as z,v as J,j as f,F as h,s as P,k as U,ao as F,as as I,m as W,x as H,y as K,ap as Q,at as X,au as ve,A as he}from"./index-Dm4GjeRj.js";import{_ as xe}from"./GroupCard-C0oag4Lx.js";import ye from"./GroupFooter-CeNy3hxn.js";import{u as we}from"./areaData-DM6_ZYSR.js";import{b as Y}from"./route-block-B_A1xBdJ.js";import{V as _e,a as x}from"./VRow-nSsvLguS.js";import{V as be}from"./VMenu-C3Px50h8.js";import{V as Ve,a as Z,b as ee}from"./VHover-CLhYBMTE.js";import{V as ke}from"./VSelect-C78TMFGv.js";import{V as De}from"./VPagination-Cggyl2uo.js";import{V as Ce}from"./VContainer-Ch3yX1s4.js";import{V as G}from"./VDivider-lJyuuRFq.js";import"./VChip-DTJKT1x6.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./VList-sRP_dp5u.js";import"./VSheet-CbaVSDac.js";const Ae={class:"group__search-filters d-flex flex-wrap"},Re={class:"d-flex group__search-bar flex-wrap"},qe={class:"d-flex justify-space-between align-center group__search-select"},Pe={style:{"font-size":"20px"}},Ue={class:"d-flex align-center"},Ge={style:{"max-width":"954px"}},Se={style:{"max-width":"954px"}},Oe={style:{"max-width":"954px"}},je={class:"d-flex",style:{width:"850px"}},ze={class:"mt-3 mr-3",style:{"font-size":"18px"}},Fe={class:"d-flex flex-wrap custom-input",style:{width:"750px"}},Ie={class:"d-flex flex-wrap",style:{width:"750px"}},E=3,Ee={__name:"index",setup(Ne){const{api:N}=he(),i=ce(),S=pe(),{area_data:T}=we(),{t}=me(),p=u(1),te=A(()=>{const l=w.value.filter(e=>{const o=new Date;return new Date(e.time)>o});return Math.ceil(l.length/E)}),ae=()=>{S.replace({path:i.path,query:{page:p.value}})},y=u(0),w=u([]),_=u(""),B=u(""),le=A(()=>[{title:"揪團時間: 由近到遠",value:0},{title:"揪團時間: 由遠到近",value:1},{title:"建立時間: 由舊到新",value:2},{title:"建立時間: 由新到舊",value:3},{title:"人數上限: 由少到多",value:4},{title:"人數上限: 由多到少",value:5},{title:"參加人數: 由少到多",value:6},{title:"參加人數: 由多到少",value:7}]),oe={0:(l,e)=>new Date(l.time)-new Date(e.time),1:(l,e)=>new Date(e.time)-new Date(l.time),2:(l,e)=>new Date(l.createdAt)-new Date(e.createdAt),3:(l,e)=>new Date(e.createdAt)-new Date(l.createdAt),4:(l,e)=>l.member_limit-e.member_limit,5:(l,e)=>e.member_limit-l.member_limit,6:(l,e)=>l.member_count-e.member_count,7:(l,e)=>e.member_count-l.member_count},M=A(()=>w.value.filter(e=>{const o=new Date;return new Date(e.time)>o}).sort(oe[y.value]).slice((p.value-1)*E,p.value*E));(async()=>{try{const{data:l}=await N.post("/group/search",{search:i.query.search?JSON.parse(decodeURIComponent(i.query.search)):void 0,city:i.query.city?JSON.parse(decodeURIComponent(i.query.city)):void 0,region:i.query.region?JSON.parse(decodeURIComponent(i.query.region)):void 0,tags:i.query.tags?JSON.parse(decodeURIComponent(i.query.tags)):void 0,time:i.query.time||void 0});w.value=l.result,S.replace({path:i.path,query:{page:p.value}})}catch(l){console.log(l),w.value=[]}})();const k=async()=>{try{const l=D.value.map(c=>t("area."+c.city)+c.district),e=g.value?new Date(g.value).toLocaleDateString():void 0;B.value=_.value;const{data:o}=await N.post("/group/search",{search:_.value?_.value:void 0,city:l.length?l.join(","):void 0,region:l.length?l.join(","):void 0,tags:b.value.length?b.value:void 0,time:e});w.value=o.result,S.replace({path:i.path,query:{page:p.value}}),L()}catch(l){console.log(l)}},ne=A(()=>[{text:t("area.taipei"),value:"taipei"},{text:t("area.newTaipei"),value:"newTaipei"},{text:t("area.keeLung"),value:"keeLung"},{text:t("area.taoyuan"),value:"taoyuan"},{text:t("area.hsinchuCounty"),value:"hsinchuCounty"},{text:t("area.hsinchu"),value:"hsinchu"},{text:t("area.miaoli"),value:"miaoli"},{text:t("area.taichung"),value:"taichung"},{text:t("area.nantou"),value:"nantou"},{text:t("area.changhua"),value:"changhua"},{text:t("area.yunlin"),value:"yunlin"},{text:t("area.chiayi"),value:"chiayi"},{text:t("area.chiayiCounty"),value:"chiayiCounty"},{text:t("area.tainan"),value:"tainan"},{text:t("area.kaohsiung"),value:"kaohsiung"},{text:t("area.pingtung"),value:"pingtung"},{text:t("area.yilan"),value:"yilan"},{text:t("area.hualien"),value:"hualien"},{text:t("area.taitung"),value:"taitung"},{text:t("area.penghu"),value:"penghu"},{text:t("area.kinmen"),value:"kinmen"},{text:t("area.lienchiang"),value:"lienchiang"}]),se=[{text:t("tag.computer"),value:t("tag.computer")},{text:t("tag.mobile"),value:t("tag.mobile")},{text:t("tag.console"),value:t("tag.console")},{text:t("tag.virtualReality"),value:t("tag.virtualReality")},{text:t("tag.augmentedReality"),value:t("tag.augmentedReality")},{text:t("tag.webGame"),value:t("tag.webGame")},{text:t("tag.Adventure"),value:t("tag.Adventure")},{text:t("tag.RPG"),value:t("tag.RPG")},{text:t("tag.simulation"),value:t("tag.simulation")},{text:t("tag.sportsAndRacing"),value:t("tag.sportsAndRacing")},{text:t("tag.puzzleAndParty"),value:t("tag.puzzleAndParty")},{text:t("tag.musicAndRhythm"),value:t("tag.musicAndRhythm")},{text:t("tag.sandboxAndOpenWorld"),value:t("tag.sandboxAndOpenWorld")},{text:t("tag.scienceFictionAndFantasy"),value:t("tag.scienceFictionAndFantasy")},{text:t("tag.EducationAndExperimental"),value:t("tag.EducationAndExperimental")},{text:t("tag.massiveMultiplayer"),value:t("tag.massiveMultiplayer")}],d=u({open:!1,type:1}),$=async l=>{d.value.type=l,d.value.open=!0},L=()=>{d.value.open=!1,D.value=[],b.value=[]},D=u([]),b=u([]),O=u(!1),g=u(null),ie=l=>{try{if(!l)return;g.value=l,O.value=!1;const e=new Date(l).toLocaleDateString();k(),g.value=null}catch(e){console.log("日期格式錯誤:",e)}};return fe(()=>{window.history.state.type==="newest"?y.value=0:window.history.state.type==="upcoming"&&(y.value=3)}),ge(()=>{window.history.replaceState({...window.history.state,type:null},"")}),(l,e)=>(r(),v(h,null,[a(Ce,{style:{"min-height":"100vh","max-width":"1440px"},class:"mt-13"},{default:n(()=>[a(_e,null,{default:n(()=>[a(x,{cols:"10",offset:"1","offset-sm":"1","offset-md":"1","offset-lg":"2"},{default:n(()=>[s("div",Ae,[a(R,{"append-inner-icon":"mdi-plus-circle",variant:"solo",placeholder:"選擇",class:"group__search-input group__search-input-click","persistent-placeholder":"",prefix:"地區",readonly:"",onClick:e[0]||(e[0]=o=>$(1))}),a(R,{"append-inner-icon":"mdi-plus-circle",variant:"solo",placeholder:"選擇",class:"group__search-input group__search-input-click","persistent-placeholder":"",prefix:"標籤",readonly:"",onClick:e[1]||(e[1]=o=>$(2))}),a(be,{modelValue:O.value,"onUpdate:modelValue":e[3]||(e[3]=o=>O.value=o),"close-on-content-click":!1},{activator:n(({props:o})=>[a(R,q(o,{"append-inner-icon":"mdi-plus-circle",variant:"solo",placeholder:"選擇",class:"group__search-input group__search-input-click","persistent-placeholder":"",prefix:"日期",readonly:""}),null,16)]),default:n(()=>[a(Ve,{modelValue:g.value,"onUpdate:modelValue":[e[2]||(e[2]=o=>g.value=o),ie],"show-adjacent-months":"",landscape:"","hide-header":""},null,8,["modelValue"])]),_:1},8,["modelValue"])])]),_:1}),a(x,{cols:"10",offset:"1","offset-sm":"1","offset-md":"1","offset-lg":"2"},{default:n(()=>[s("div",Re,[a(R,{modelValue:_.value,"onUpdate:modelValue":e[4]||(e[4]=o=>_.value=o),variant:"solo",placeholder:"縣市區、遊戲類型等",class:"group__search-input","persistent-placeholder":"",prefix:"關鍵字"},null,8,["modelValue"]),a(V,{height:50,style:{"font-size":"18px","border-radius":"8px"},"base-color":"orange",onClick:k,block:""},{default:n(()=>e[11]||(e[11]=[z("搜尋")])),_:1})])]),_:1}),a(x,{cols:"10",offset:"1","offset-sm":"1","offset-md":"1","offset-lg":"2"},{default:n(()=>[s("div",qe,[s("span",Pe,J(B.value)+" 搜尋結果",1),s("div",Ue,[e[12]||(e[12]=s("span",{class:"font-weight-bold"},"排序:",-1)),a(ke,{items:f(le),"item-title":"title","item-value":"value",modelValue:y.value,"onUpdate:modelValue":e[5]||(e[5]=o=>y.value=o),variant:"solo",flat:"",class:"group__select"},null,8,["items","modelValue"])])])]),_:1}),(r(!0),v(h,null,P(f(M),o=>(r(),U(x,{cols:"10",offset:"1","offset-sm":"1","offset-md":"1","offset-lg":"2",key:o._id},{default:n(()=>[s("div",Ge,[a(xe,q({ref_for:!0},o),null,16),a(G,{class:"mb-3"})])]),_:2},1024))),128)),f(M).length===0?(r(),U(x,{key:0,cols:"10",offset:"1","offset-sm":"1","offset-md":"1","offset-lg":"2"},{default:n(()=>[s("div",Se,[a(F,{height:"200",style:{"box-shadow":"none"}},{default:n(()=>[a(I,{"max-width":"576",class:"d-flex justify-center align-center flex-column h-100"},{default:n(()=>e[13]||(e[13]=[s("p",{class:"font-weight-bold text-h5"},"未找到符合條件的搜尋",-1),s("p",{class:"font-weight-bold text-h5"},"請更改您的搜尋條件並重新搜尋",-1)])),_:1})]),_:1})])]),_:1})):W("",!0),a(x,{cols:"10",offset:"1","offset-sm":"1","offset-md":"1","offset-lg":"2"},{default:n(()=>[s("div",Oe,[a(De,{modelValue:p.value,"onUpdate:modelValue":[e[6]||(e[6]=o=>p.value=o),ae],length:f(te),class:"mt-8 mb-8 group__pagination"},null,8,["modelValue","length"])])]),_:1})]),_:1})]),_:1}),a(ye),a(ve,{modelValue:d.value.open,"onUpdate:modelValue":e[10]||(e[10]=o=>d.value.open=o),width:"1000",scrollable:"",eager:""},{default:n(()=>[H(a(F,null,{default:n(()=>[a(Q,{class:"d-flex mb-0 pb-0"},{default:n(()=>[e[14]||(e[14]=s("div",{class:"d-flex w-100 justify-center align-center"},[s("span",{class:"font-weight-bold",style:{"font-size":"20px"}},"按縣市搜尋")],-1)),a(V,{icon:"mdi-close",variant:"text",onClick:L})]),_:1}),a(G,{class:"mt-3"}),a(I,{class:"d-flex flex-column align-center pt-0 mb-2 font-weight-bold"},{default:n(()=>[(r(!0),v(h,null,P(Object.entries(f(T)),([o,c],j)=>{var C;return r(),v(h,{key:o},[s("div",je,[s("span",ze,J(((C=f(ne).find(m=>m.value===o))==null?void 0:C.text)||o),1),s("div",Fe,[(r(!0),v(h,null,P(c,m=>(r(),U(Z,{key:`${o}-${m}`},{default:n(({isHovering:ue,props:re})=>[a(ee,q({ref_for:!0},re,{modelValue:D.value,"onUpdate:modelValue":e[7]||(e[7]=de=>D.value=de),label:m,value:{city:o,district:m},"hide-details":"",density:"compact","false-icon":ue?" mdi-checkbox-outline":"mdi-checkbox-blank-outline","true-icon":"mdi-checkbox-marked",color:"orange"}),null,16,["modelValue","label","value","false-icon"])]),_:2},1024))),128))])]),j!==Object.entries(f(T)).length-1?(r(),U(G,{key:0,style:{width:"850px"}})):W("",!0)],64)}),128))]),_:1}),a(X,{class:"bg-orange pa-0"},{default:n(()=>[a(V,{onClick:k,class:"w-100 font-weight-bold",style:{height:"54px"},color:"white"},{default:n(()=>e[15]||(e[15]=[z("搜尋")])),_:1})]),_:1})]),_:1},512),[[K,d.value.type===1]]),H(a(F,{width:"1000"},{default:n(()=>[a(Q,{class:"d-flex mb-0 pb-0"},{default:n(()=>[e[16]||(e[16]=s("div",{class:"d-flex w-100 justify-center align-center"},[s("span",{class:"font-weight-bold",style:{"font-size":"20px"}},"按標籤搜尋")],-1)),a(V,{icon:"mdi-close",variant:"text",onClick:e[8]||(e[8]=o=>d.value.open=!1)})]),_:1}),a(G,{class:"mt-3"}),a(I,{class:"d-flex flex-column align-center pt-0 mb-2 font-weight-bold"},{default:n(()=>[s("div",Ie,[(r(),v(h,null,P(se,(o,c)=>s("div",{key:c,style:{width:"170px",height:"30px"}},[a(Z,null,{default:n(({isHovering:j,props:C})=>[a(ee,q({ref_for:!0},C,{modelValue:b.value,"onUpdate:modelValue":e[9]||(e[9]=m=>b.value=m),label:o.text,value:o.value,"hide-details":"",density:"compact","false-icon":j?" mdi-checkbox-outline":"mdi-checkbox-blank-outline","true-icon":"mdi-checkbox-marked",color:"orange"}),null,16,["modelValue","label","value","false-icon"])]),_:2},1024)])),64))])]),_:1}),a(X,{class:"bg-orange pa-0"},{default:n(()=>[a(V,{onClick:k,class:"w-100 font-weight-bold",style:{height:"54px"},color:"white"},{default:n(()=>e[17]||(e[17]=[z("搜尋")])),_:1})]),_:1})]),_:1},512),[[K,d.value.type===2]])]),_:1},8,["modelValue"])],64))}};typeof Y=="function"&&Y(Ee);export{Ee as default};
