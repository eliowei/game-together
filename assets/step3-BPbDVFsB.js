import{B as $}from"./BlotFormatter-B4-t91R4.js";import{r as g,u as z,i as E,c as M,_ as N,e as V,o as R,f as j,g as e,h as r,q as i,t as p,aA as q,p as u,ap as I,at as U,au as D,aq as L,V as x,j as k,F as J}from"./index-hejcbg2k.js";import{u as O}from"./group-BGgfpY2X.js";import{G as H}from"./GroupFooter-C41ZpHNO.js";import{b as P}from"./route-block-B_A1xBdJ.js";import{V as A,a as l}from"./VRow-B0rQePkN.js";import{V as B}from"./VContainer--v0OXicP.js";import{V as K}from"./VDivider-BWmcKJlk.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./VList-CmiqK28k.js";const Q={class:"text-center mb-2 mt-2"},W={class:"text-center"},X={class:"text-center mb-5"},Y={style:{height:"450px"}},Z={href:"https://chatgpt.com/",class:"creategroup__step3-chatgpt-link"},ee={style:{"max-width":"200px"}},te={__name:"step3",setup(oe){const d=g([]),w=g([]),C=g(null),{t:v}=z(),h=O(),c=E(),T=M(),f=g(!1),m=g(""),_={modules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["link"]],BlotFormatter:$},placeholder:"請輸入內容..."},F=async t=>{if(!t)throw new Error("沒有選擇檔案");if(!t.type.match(/image\/(jpeg|png)/))throw new Error("檔案格式不支援");return new Promise((o,s)=>{const a=new FileReader;a.onload=()=>o(a.result),a.onerror=()=>s(new Error("檔案讀取發生錯誤")),a.readAsDataURL(t)})},G=async()=>{if(!f.value)try{f.value=!0;const t=[];if(m.value===""){c({text:"請輸入內容",snackbarProps:{color:"red"}});return}if(d.value.length===0){c({text:"請上傳相片",snackbarProps:{color:"red"}});return}if(!["image/jpeg","image/png"].includes(d.value[0].file.type))throw new Error("檔案格式必須是 JPG 或 PNG");const s=1024*1024;if(d.value[0].file.size>s)throw new Error("檔案大小不能超過 1MB");const a=await F(d.value[0].file);t.push({content:m.value,image:a}),h.setStep3(t),T.push("/creategroup/step4")}catch(t){console.log(t),t.message==="檔案格式必須是 JPG 或 PNG"?c({text:"檔案格式必須是 JPG 或 PNG",snackbarProps:{color:"red"}}):t.message==="檔案大小不能超過 1MB"?c({text:"檔案大小不能超過 1MB",snackbarProps:{color:"red"}}):c({text:"上傳失敗",snackbarProps:{color:"red"}})}finally{f.value=!1}},S=(t,o)=>{const s=t.split(","),a=s[0].match(/:(.*?);/)[1],n=atob(s[1]);let b=n.length;const y=new Uint8Array(b);for(;b--;)y[b]=n.charCodeAt(b);return new File([y],o,{type:a})};return N(()=>{if(h.hasData.resotre.step3){const t=S(h.step3.image,"image.jpg");m.value=h.step3.content,w.value=[{file:t}]}}),(t,o)=>{const s=V("quill-editor"),a=V("VueFileAgent");return R(),j(J,null,[e(B,{fluid:""},{default:r(()=>[e(A,null,{default:r(()=>[e(l,{cols:"12"},{default:r(()=>[i("h2",Q,p(t.$t("group.createStep3")),1),e(q,{"model-value":"60",height:"10",color:"green-accent-4"})]),_:1})]),_:1})]),_:1}),e(B,{style:{"max-width":"1440px"}},{default:r(()=>[i("h1",W,p(t.$t("group.detail")),1),i("h2",X,[u(p(t.$t("group.detailIllustrateLine1")),1),o[3]||(o[3]=i("br",null,null,-1)),u(" "+p(t.$t("group.detailIllustrateLine2")),1)]),e(A,null,{default:r(()=>[e(l,{cols:"8",offset:"2",class:"mb-10"},{default:r(()=>[i("div",Y,[e(s,{theme:"snow",content:m.value,"onUpdate:content":o[0]||(o[0]=n=>m.value=n),toolbar:_.modules.toolbar,options:_,contentType:"html"},null,8,["content","toolbar"])])]),_:1}),e(l,{cols:"6",offset:"3",class:"mt-16"},{default:r(()=>[e(I,{color:"blue-grey-lighten-5"},{default:r(()=>[e(U,null,{default:r(()=>o[4]||(o[4]=[u("範例")])),_:1}),e(D,{class:"px-15 h-100"},{default:r(()=>o[5]||(o[5]=[u(" 如果你正在尋找一個有趣且能夠增進友誼的活動，那麼遊戲揪團就是你不容錯過的選擇。 這項活動不僅能夠讓你沉浸在令人興奮的遊戲世界中，還能增強團隊合作、策略思維和反應速度。 我們的揪團將會在線上或特定的遊戲場所進行，提供完善的設施和遊戲環境 任何人都能在這裡找到適合自己的遊戲對手與夥伴。 在遊戲之後，我們也可以一起分享心得、討論戰術，讓大家能夠在輕鬆愉悅的氛圍中享受社交樂趣。 ")])),_:1})]),_:1})]),_:1}),e(l,{cols:"12",offset:"7"},{default:r(()=>[i("a",Z,[o[6]||(o[6]=u("詢問ChatGPT ")),e(L,{icon:"mdi-open-in-new"})])]),_:1}),e(l,{cols:"12",offset:"2"},{default:r(()=>o[7]||(o[7]=[i("span",{class:"text-h6 font-weight-bold ml-15"},"上傳相片",-1)])),_:1}),e(l,{offset:"3"},{default:r(()=>[i("div",ee,[e(a,{modelValue:d.value,"onUpdate:modelValue":o[1]||(o[1]=n=>d.value=n),"raw-model-value":w.value,"onUpdate:rawModelValue":o[2]||(o[2]=n=>w.value=n),accept:"image/jpeg,image/png",deletable:"","max-size":"1MB","help-text":t.$t("fileAgent.helpText"),"error-text":{type:t.$t("fileAgent.errorType"),size:t.$t("fileAgent.errorSize")},ref_key:"fileAgent",ref:C},null,8,["modelValue","raw-model-value","help-text","error-text"])])]),_:1}),e(l,{cols:"8",offset:"2"},{default:r(()=>[e(K,{class:"border-opacity-100 my-12"})]),_:1}),e(l,{offset:"3"},{default:r(()=>[e(x,{width:"110","append-icon":"mdi-arrow-left",to:"/creategroup/step2"},{default:r(()=>[u(p(k(v)("group.previous")),1)]),_:1})]),_:1}),e(l,{offset:"1",class:"mb-16"},{default:r(()=>[e(x,{type:"submit",width:"110","append-icon":"mdi-arrow-right",onClick:G,loading:f.value,disabled:f.value},{default:r(()=>[u(p(k(v)("group.next")),1)]),_:1},8,["loading","disabled"])]),_:1})]),_:1})]),_:1}),e(H)],64)}}};typeof P=="function"&&P(te);export{te as default};
