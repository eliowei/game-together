import{B as W,C as he,E as oe,bH as ge,w as H,G as ue,g as c,F as j,A as L,b as Se,S as O,a4 as re,r as z,d as A,aa as ye,Z as le,bG as ke,bI as Pe,ai as Ve,bJ as ae,a6 as Te,b8 as Ie,a7 as xe,M as Ce,a2 as Re,_ as Ae,bK as De,X as Z,aM as Fe,aH as Be,bL as Oe,bM as _e,bN as Ee,aU as Me,a1 as ce,bO as Le,ao as de,v as He,aq as fe,bP as Ue,W as qe,p as Ne,b0 as ze,aP as Ke,bQ as ve,bR as me}from"./index-ru1HJReR.js";import{m as $e,c as je,a as We,V as pe}from"./VList-Do-W5uMD.js";import{V as Ge,a as Xe}from"./VMenu-606rrcrx.js";import{V as Je}from"./VChip-Z-TRrxK1.js";const Qe=W({renderless:Boolean,...he()},"VVirtualScrollItem"),Ye=oe()({name:"VVirtualScrollItem",inheritAttrs:!1,props:Qe(),emits:{"update:height":e=>!0},setup(e,d){let{attrs:n,emit:f,slots:s}=d;const{resizeRef:v,contentRect:m}=ge(void 0,"border");H(()=>{var u;return(u=m.value)==null?void 0:u.height},u=>{u!=null&&f("update:height",u)}),ue(()=>{var u,a;return e.renderless?c(j,null,[(u=s.default)==null?void 0:u.call(s,{itemRef:v})]):c("div",L({ref:v,class:["v-virtual-scroll__item",e.class],style:e.style},n),[(a=s.default)==null?void 0:a.call(s)])})}}),Ze=-1,et=1,ne=100,tt=W({itemHeight:{type:[Number,String],default:null},height:[Number,String]},"virtual");function lt(e,d){const n=Se(),f=O(0);re(()=>{f.value=parseFloat(e.itemHeight||0)});const s=O(0),v=O(Math.ceil((parseInt(e.height)||n.height.value)/(f.value||16))||1),m=O(0),u=O(0),a=z(),V=z();let R=0;const{resizeRef:B,contentRect:i}=ge();re(()=>{B.value=a.value});const w=A(()=>{var t;return a.value===document.documentElement?n.height.value:((t=i.value)==null?void 0:t.height)||parseInt(e.height)||0}),_=A(()=>!!(a.value&&V.value&&w.value&&f.value));let x=Array.from({length:d.value.length}),p=Array.from({length:d.value.length});const b=O(0);let k=-1;function E(t){return x[t]||f.value}const C=Pe(()=>{const t=performance.now();p[0]=0;const o=d.value.length;for(let g=1;g<=o-1;g++)p[g]=(p[g-1]||0)+E(g-1);b.value=Math.max(b.value,performance.now()-t)},b),G=H(_,t=>{t&&(G(),R=V.value.offsetTop,C.immediate(),D(),~k&&Ve(()=>{ae&&window.requestAnimationFrame(()=>{Y(k),k=-1})}))});ye(()=>{C.clear()});function ee(t,o){const g=x[t],y=f.value;f.value=y?Math.min(f.value,o):o,(g!==o||y!==f.value)&&(x[t]=o,C())}function P(t){return t=le(t,0,d.value.length-1),p[t]||0}function X(t){return nt(p,t)}let U=0,M=0,K=0;H(w,(t,o)=>{o&&(D(),t<o&&requestAnimationFrame(()=>{M=0,D()}))});let q=-1;function N(){if(!a.value||!V.value)return;const t=a.value.scrollTop,o=performance.now();o-K>500?(M=Math.sign(t-U),R=V.value.offsetTop):M=t-U,U=t,K=o,window.clearTimeout(q),q=window.setTimeout(J,500),D()}function J(){!a.value||!V.value||(M=0,K=0,window.clearTimeout(q),D())}let Q=-1;function D(){cancelAnimationFrame(Q),Q=requestAnimationFrame(te)}function te(){if(!a.value||!w.value)return;const t=U-R,o=Math.sign(M),g=Math.max(0,t-ne),y=le(X(g),0,d.value.length),r=t+w.value+ne,h=le(X(r)+1,y+1,d.value.length);if((o!==Ze||y<s.value)&&(o!==et||h>v.value)){const S=P(s.value)-P(y),F=P(h)-P(v.value);Math.max(S,F)>ne?(s.value=y,v.value=h):(y<=0&&(s.value=y),h>=d.value.length&&(v.value=h))}m.value=P(s.value),u.value=P(d.value.length)-P(v.value)}function Y(t){const o=P(t);!a.value||t&&!o?k=t:a.value.scrollTop=o}const l=A(()=>d.value.slice(s.value,v.value).map((t,o)=>({raw:t,index:o+s.value,key:ke(t)&&"value"in t?t.value:o+s.value})));return H(d,()=>{x=Array.from({length:d.value.length}),p=Array.from({length:d.value.length}),C.immediate(),D()},{deep:!0}),{calculateVisibleItems:D,containerRef:a,markerRef:V,computedItems:l,paddingTop:m,paddingBottom:u,scrollToIndex:Y,handleScroll:N,handleScrollend:J,handleItemResize:ee}}function nt(e,d){let n=e.length-1,f=0,s=0,v=null,m=-1;if(e[n]<d)return n;for(;f<=n;)if(s=f+n>>1,v=e[s],v>d)n=s-1;else if(v<d)m=s,f=s+1;else return v===d?s:f;return m}const at=W({items:{type:Array,default:()=>[]},renderless:Boolean,...tt(),...he(),...Te()},"VVirtualScroll"),ot=oe()({name:"VVirtualScroll",props:at(),setup(e,d){let{slots:n}=d;const f=Ie("VVirtualScroll"),{dimensionStyles:s}=xe(e),{calculateVisibleItems:v,containerRef:m,markerRef:u,handleScroll:a,handleScrollend:V,handleItemResize:R,scrollToIndex:B,paddingTop:i,paddingBottom:w,computedItems:_}=lt(e,Ce(e,"items"));return Re(()=>e.renderless,()=>{function x(){var k,E;const b=(arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1)?"addEventListener":"removeEventListener";m.value===document.documentElement?(document[b]("scroll",a,{passive:!0}),document[b]("scrollend",V)):((k=m.value)==null||k[b]("scroll",a,{passive:!0}),(E=m.value)==null||E[b]("scrollend",V))}Ae(()=>{m.value=De(f.vnode.el,!0),x(!0)}),ye(x)}),ue(()=>{const x=_.value.map(p=>c(Ye,{key:p.key,renderless:e.renderless,"onUpdate:height":b=>R(p.index,b)},{default:b=>{var k;return(k=n.default)==null?void 0:k.call(n,{item:p.raw,index:p.index,...b})}}));return e.renderless?c(j,null,[c("div",{ref:u,class:"v-virtual-scroll__spacer",style:{paddingTop:Z(i.value)}},null),x,c("div",{class:"v-virtual-scroll__spacer",style:{paddingBottom:Z(w.value)}},null)]):c("div",{ref:m,class:["v-virtual-scroll",e.class],onScrollPassive:a,onScrollend:V,style:[s.value,e.style]},[c("div",{ref:u,class:"v-virtual-scroll__container",style:{paddingTop:Z(i.value),paddingBottom:Z(w.value)}},[x])])}),{calculateVisibleItems:v,scrollToIndex:B}}});function ut(e,d){const n=O(!1);let f;function s(u){cancelAnimationFrame(f),n.value=!0,f=requestAnimationFrame(()=>{f=requestAnimationFrame(()=>{n.value=!1})})}async function v(){await new Promise(u=>requestAnimationFrame(u)),await new Promise(u=>requestAnimationFrame(u)),await new Promise(u=>requestAnimationFrame(u)),await new Promise(u=>{if(n.value){const a=H(n,()=>{a(),u()})}else u()})}async function m(u){var R,B;if(u.key==="Tab"&&((R=d.value)==null||R.focus()),!["PageDown","PageUp","Home","End"].includes(u.key))return;const a=(B=e.value)==null?void 0:B.$el;if(!a)return;(u.key==="Home"||u.key==="End")&&a.scrollTo({top:u.key==="Home"?0:a.scrollHeight,behavior:"smooth"}),await v();const V=a.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");if(u.key==="PageDown"||u.key==="Home"){const i=a.getBoundingClientRect().top;for(const w of V)if(w.getBoundingClientRect().top>=i){w.focus();break}}else{const i=a.getBoundingClientRect().bottom;for(const w of[...V].reverse())if(w.getBoundingClientRect().bottom<=i){w.focus();break}}}return{onScrollPassive:s,onKeydown:m}}const st=W({chips:Boolean,closableChips:Boolean,closeText:{type:String,default:"$vuetify.close"},openText:{type:String,default:"$vuetify.open"},eager:Boolean,hideNoData:Boolean,hideSelected:Boolean,listProps:{type:Object},menu:Boolean,menuIcon:{type:Fe,default:"$dropdown"},menuProps:{type:Object},multiple:Boolean,noDataText:{type:String,default:"$vuetify.noDataText"},openOnClear:Boolean,itemColor:String,...$e({itemChildren:!1})},"Select"),it=W({...st(),...Be(Oe({modelValue:null,role:"combobox"}),["validationValue","dirty","appendInnerIcon"]),..._e({transition:{component:Ee}})},"VSelect"),vt=oe()({name:"VSelect",props:it(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,d){let{slots:n}=d;const{t:f}=Me(),s=z(),v=z(),m=z(),u=ce(e,"menu"),a=A({get:()=>u.value,set:l=>{var t;u.value&&!l&&((t=v.value)!=null&&t.ΨopenChildren.size)||(u.value=l)}}),{items:V,transformIn:R,transformOut:B}=je(e),i=ce(e,"modelValue",[],l=>R(l===null?[null]:Ke(l)),l=>{const t=B(l);return e.multiple?t:t[0]??null}),w=A(()=>typeof e.counterValue=="function"?e.counterValue(i.value):typeof e.counterValue=="number"?e.counterValue:i.value.length),_=Le(e),x=A(()=>i.value.map(l=>l.value)),p=O(!1),b=A(()=>a.value?e.closeText:e.openText);let k="",E;const C=A(()=>e.hideSelected?V.value.filter(l=>!i.value.some(t=>e.valueComparator(t,l))):V.value),G=A(()=>e.hideNoData&&!C.value.length||_.isReadonly.value||_.isDisabled.value),ee=A(()=>{var l;return{...e.menuProps,activatorProps:{...((l=e.menuProps)==null?void 0:l.activatorProps)||{},"aria-haspopup":"listbox"}}}),P=z(),X=ut(P,s);function U(l){e.openOnClear&&(a.value=!0)}function M(){G.value||(a.value=!a.value)}function K(l){ve(l)&&q(l)}function q(l){var y,r;if(!l.key||_.isReadonly.value)return;["Enter"," ","ArrowDown","ArrowUp","Home","End"].includes(l.key)&&l.preventDefault(),["Enter","ArrowDown"," "].includes(l.key)&&(a.value=!0),["Escape","Tab"].includes(l.key)&&(a.value=!1),l.key==="Home"?(y=P.value)==null||y.focus("first"):l.key==="End"&&((r=P.value)==null||r.focus("last"));const t=1e3;if(e.multiple||!ve(l))return;const o=performance.now();o-E>t&&(k=""),k+=l.key.toLowerCase(),E=o;const g=V.value.find(h=>h.title.toLowerCase().startsWith(k));if(g!==void 0){i.value=[g];const h=C.value.indexOf(g);ae&&window.requestAnimationFrame(()=>{var S;h>=0&&((S=m.value)==null||S.scrollToIndex(h))})}}function N(l){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;if(!l.props.disabled)if(e.multiple){const o=i.value.findIndex(y=>e.valueComparator(y.value,l.value)),g=t??!~o;if(~o){const y=g?[...i.value,l]:[...i.value];y.splice(o,1),i.value=y}else g&&(i.value=[...i.value,l])}else{const o=t!==!1;i.value=o?[l]:[],Ve(()=>{a.value=!1})}}function J(l){var t;(t=P.value)!=null&&t.$el.contains(l.relatedTarget)||(a.value=!1)}function Q(){var l;e.eager&&((l=m.value)==null||l.calculateVisibleItems())}function D(){var l;p.value&&((l=s.value)==null||l.focus())}function te(l){p.value=!0}function Y(l){if(l==null)i.value=[];else if(me(s.value,":autofill")||me(s.value,":-webkit-autofill")){const t=V.value.find(o=>o.title===l);t&&N(t)}else s.value&&(s.value.value="")}return H(a,()=>{if(!e.hideSelected&&a.value&&i.value.length){const l=C.value.findIndex(t=>i.value.some(o=>e.valueComparator(o.value,t.value)));ae&&window.requestAnimationFrame(()=>{var t;l>=0&&((t=m.value)==null||t.scrollToIndex(l))})}}),H(()=>e.items,(l,t)=>{a.value||p.value&&!t.length&&l.length&&(a.value=!0)}),ue(()=>{const l=!!(e.chips||n.chip),t=!!(!e.hideNoData||C.value.length||n["prepend-item"]||n["append-item"]||n["no-data"]),o=i.value.length>0,g=de.filterProps(e),y=o||!p.value&&e.label&&!e.persistentPlaceholder?void 0:e.placeholder;return c(de,L({ref:s},g,{modelValue:i.value.map(r=>r.props.value).join(", "),"onUpdate:modelValue":Y,focused:p.value,"onUpdate:focused":r=>p.value=r,validationValue:i.externalValue,counterValue:w.value,dirty:o,class:["v-select",{"v-select--active-menu":a.value,"v-select--chips":!!e.chips,[`v-select--${e.multiple?"multiple":"single"}`]:!0,"v-select--selected":i.value.length,"v-select--selection-slot":!!n.selection},e.class],style:e.style,inputmode:"none",placeholder:y,"onClick:clear":U,"onMousedown:control":M,onBlur:J,onKeydown:q,"aria-label":f(b.value),title:f(b.value)}),{...n,default:()=>c(j,null,[c(Ge,L({ref:v,modelValue:a.value,"onUpdate:modelValue":r=>a.value=r,activator:"parent",contentClass:"v-select__content",disabled:G.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterEnter:Q,onAfterLeave:D},ee.value),{default:()=>[t&&c(We,L({ref:P,selected:x.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:r=>r.preventDefault(),onKeydown:K,onFocusin:te,tabindex:"-1","aria-live":"polite",color:e.itemColor??e.color},X,e.listProps),{default:()=>{var r,h,S;return[(r=n["prepend-item"])==null?void 0:r.call(n),!C.value.length&&!e.hideNoData&&(((h=n["no-data"])==null?void 0:h.call(n))??c(pe,{key:"no-data",title:f(e.noDataText)},null)),c(ot,{ref:m,renderless:!0,items:C.value},{default:F=>{var ie;let{item:T,index:$,itemRef:I}=F;const se=L(T.props,{ref:I,key:T.value,onClick:()=>N(T,null)});return((ie=n.item)==null?void 0:ie.call(n,{item:T,index:$,props:se}))??c(pe,L(se,{role:"option"}),{prepend:we=>{let{isSelected:be}=we;return c(j,null,[e.multiple&&!e.hideSelected?c(Xe,{key:T.value,modelValue:be,ripple:!1,tabindex:"-1"},null):void 0,T.props.prependAvatar&&c(He,{image:T.props.prependAvatar},null),T.props.prependIcon&&c(fe,{icon:T.props.prependIcon},null)])}})}}),(S=n["append-item"])==null?void 0:S.call(n)]}})]}),i.value.map((r,h)=>{function S(I){I.stopPropagation(),I.preventDefault(),N(r,!1)}const F={"onClick:close":S,onKeydown(I){I.key!=="Enter"&&I.key!==" "||(I.preventDefault(),I.stopPropagation(),S(I))},onMousedown(I){I.preventDefault(),I.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0},T=l?!!n.chip:!!n.selection,$=T?Ue(l?n.chip({item:r,index:h,props:F}):n.selection({item:r,index:h})):void 0;if(!(T&&!$))return c("div",{key:r.value,class:"v-select__selection"},[l?n.chip?c(qe,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:r.title}}},{default:()=>[$]}):c(Je,L({key:"chip",closable:e.closableChips,size:"small",text:r.title,disabled:r.props.disabled},F),null):$??c("span",{class:"v-select__selection-text"},[r.title,e.multiple&&h<i.value.length-1&&c("span",{class:"v-select__selection-comma"},[Ne(",")])])])})]),"append-inner":function(){var F;for(var r=arguments.length,h=new Array(r),S=0;S<r;S++)h[S]=arguments[S];return c(j,null,[(F=n["append-inner"])==null?void 0:F.call(n,...h),e.menuIcon?c(fe,{class:"v-select__menu-icon",icon:e.menuIcon},null):void 0])}})}),ze({isFocused:p,menu:a,select:N},s)}});export{vt as V};
