import{u as K,i as O,r as g,a as j,d as H,o as L,n as r,k as m,h as n,g as c,q as C,v,ap as Y,j as F,ax as J,V as w,t as p,m as f,f as _,x as Q,s as P,F as $,ay as X,aY as z,y as Z}from"./index-B1NrRx6B.js";import{b as T}from"./route-block-B_A1xBdJ.js";import{a as x,V as ee}from"./VRow-CqYwbDVl.js";import{V as te}from"./VForm-80Qsxh0m.js";import{V as ae}from"./VContainer-CJIQDdmk.js";import{V as B}from"./VChip-DyHpCdvL.js";const le={class:"text-h6"},se={class:"d-flex my-7"},ue={key:0},ne={__name:"tag",setup(oe){const{t:e}=K(),{apiAuth:E}=Z(),k=O(),h=g([]),G=j(),b=g(5),d=g(""),u=g([]),V=g([]),M=[{text:e("tag.computer"),value:e("tag.computer")},{text:e("tag.mobile"),value:e("tag.mobile")},{text:e("tag.console"),value:e("tag.console")},{text:e("tag.virtualReality"),value:e("tag.virtualReality")},{text:e("tag.augmentedReality"),value:e("tag.augmentedReality")},{text:e("tag.webGame"),value:e("tag.webGame")},{text:e("tag.Adventure"),value:e("tag.Adventure")},{text:e("tag.RPG"),value:e("tag.RPG")},{text:e("tag.simulation"),value:e("tag.simulation")},{text:e("tag.sportsAndRacing"),value:e("tag.sportsAndRacing")},{text:e("tag.puzzleAndParty"),value:e("tag.puzzleAndParty")},{text:e("tag.musicAndRhythm"),value:e("tag.musicAndRhythm")},{text:e("tag.sandboxAndOpenWorld"),value:e("tag.sandboxAndOpenWorld")},{text:e("tag.scienceFictionAndFantasy"),value:e("tag.scienceFictionAndFantasy")},{text:e("tag.EducationAndExperimental"),value:e("tag.EducationAndExperimental")},{text:e("tag.massiveMultiplayer"),value:e("tag.massiveMultiplayer")}],N=H(()=>M.filter(s=>!u.value.some(a=>a.value===s.value))),l=g(!1),D=()=>{l.value=!0,V.value.length=0,V.value.push(...u.value)},U=()=>{l.value=!1,u.value.length=0,u.value.push(...V.value),b.value=5-u.value.length},W=async()=>{var s,a,t,o;try{const{data:i}=await E.get("/user/profile");if(h.value=i.result,b.value=5-h.value.tags.length,(a=(s=h.value)==null?void 0:s.tags)!=null&&a.length){const y=h.value.tags.reduce((I,R)=>(I.push({text:R,value:R}),I),[]);u.value=y}}catch(i){console.log(i),k({text:e("api."+(((o=(t=i==null?void 0:i.response)==null?void 0:t.data)==null?void 0:o.message)||"unknownError")),snackbarProps:{color:"red"}})}};L(()=>{W()});const q=async s=>{var a,t;if(u.value.length===0){k({text:e("admin.groupTagRequired"),snackbarProps:{color:"red"}});return}try{const o=new FormData,i=u.value.map(y=>y.value);for(let y of i)o.append("tags[]",y);await E.patch("/user/profile",o),G.setTags(i),k({text:e("member.tagEditSuccess"),snackbarProps:{color:"success"}}),l.value=!1}catch(o){console.log(o),k({text:e("api."+(((t=(a=o==null?void 0:o.response)==null?void 0:a.data)==null?void 0:t.message)||"unknownError")),snackbarProps:{color:"red"}})}},A=s=>{s.value.trim()!==""&&(u.value.length<5&&(u.value.push(s),b.value-=1,console.log(u.value)),d.value="")},S=s=>{const a=u.value.findIndex(t=>t.value===s.value);a>-1&&u.value.splice(a,1),b.value+=1};return(s,a)=>(r(),m(ae,{"max-width":"1440",class:"member__tag"},{default:n(()=>[c(ee,null,{default:n(()=>[c(x,{cols:"11",offset:"1"},{default:n(()=>[C("h1",null,v(s.$t("member.tagSetting")),1)]),_:1}),c(x,{cols:"10",offset:"2"},{default:n(()=>[C("span",le,v(s.$t("member.TagInfo",{variable:b.value})),1)]),_:1}),c(x,{cols:"10",offset:"2",class:"d-flex align-center"},{default:n(()=>[c(Y,{disabled:!l.value,modelValue:d.value,"onUpdate:modelValue":a[0]||(a[0]=t=>d.value=t),placeholder:l.value?F(e)("member.tagPlaceHolder"):"",onKeydown:a[1]||(a[1]=J(t=>A({text:d.value,value:d.value}),["enter"])),variant:"outlined","max-width":"300"},null,8,["disabled","modelValue","placeholder"]),c(x,{cols:"6"},{default:n(()=>[l.value?(r(),m(w,{key:0,onClick:a[2]||(a[2]=t=>A({text:d.value,value:d.value})),class:"ml-5"},{default:n(()=>a[3]||(a[3]=[p("新增")])),_:1})):f("",!0),l.value?f("",!0):(r(),_("button",{key:1,onClick:D,class:"ml-5"},[c(Q,{icon:"mdi-pencil-outline",size:"large"}),p(" "+v(F(e)("member.tagEdit")),1)]))]),_:1})]),_:1}),c(x,{cols:"10 ",offset:"2"},{default:n(()=>[(r(!0),_($,null,P(u.value,t=>(r(),m(B,{key:t,class:z(["mr-2 mb-2 mt-1",{"member__tag-edit":l.value}]),variant:"outlined",closable:l.value,link:l.value,onClick:o=>l.value?S(t):null,"onClick:close":o=>S(t),size:"large"},{default:n(()=>[p(v(t.text),1)]),_:2},1032,["class","closable","link","onClick","onClick:close"]))),128)),c(te,{onSubmit:X(q,["prevent"])},{default:n(()=>[C("div",se,[l.value?(r(),m(w,{key:0,class:"mr-3",type:"submit"},{default:n(()=>[p(v(s.$t("member.submitEdit")),1)]),_:1})):f("",!0),l.value?(r(),m(w,{key:1,onClick:U},{default:n(()=>[p(v(s.$t("member.cancelEdit")),1)]),_:1})):f("",!0)])]),_:1}),l.value?(r(),_("h2",ue,"標籤:")):f("",!0)]),_:1}),l.value?(r(),m(x,{key:0,cols:"10",offset:"2",style:{"max-width":"516px"}},{default:n(()=>[(r(!0),_($,null,P(N.value,t=>(r(),m(B,{key:t,class:z(["mr-2 mb-2 mt-1",{"member__tag-edit":l.value}]),variant:"outlined",link:"",size:"large",onClick:o=>A(t)},{default:n(()=>[p(v(t.text),1)]),_:2},1032,["class","onClick"]))),128))]),_:1})):f("",!0)]),_:1})]),_:1}))}};typeof T=="function"&&T(ne);export{ne as default};
