import{C as _,D as z,E as F,G as R,H as L,g,I as ie,J as ue,K as se,L as re,M as U,N as W,O as ce,P as ve,Q as de,R as me,S as ge,T as H,d,U as he,W as fe,X as $,Y,Z as Ee,r as q,_ as Pe,w as I,o as Z,$ as G,a0 as ye,a1 as be,a2 as A,a3 as we,B as X,a4 as Se,a5 as He,V as Ce,a6 as Me,a7 as Ie,a8 as Ne,a9 as _e,aa as pe,ab as De,ac as Re,b as Le,ad as Ye,ae as Ae,af as We,ag as Oe,F as $e,ah as Xe,ai as ze}from"./index-24mE6f4M.js";import{u as J}from"./VList-CnEGHizC.js";const Fe=_({text:String,...z(),...F()},"VToolbarTitle"),Ue=R()({name:"VToolbarTitle",props:Fe(),setup(e,u){let{slots:t}=u;return L(()=>{const S=!!(t.default||t.text||e.text);return g(e.tag,{class:["v-toolbar-title",e.class],style:e.style},{default:()=>{var a;return[S&&g("div",{class:"v-toolbar-title__placeholder"},[t.text?t.text():e.text,(a=t.default)==null?void 0:a.call(t)])]}})}),{}}}),qe=[null,"prominent","default","comfortable","compact"],Te=_({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>qe.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...ie(),...z(),...ue(),...se(),...F({tag:"header"}),...re()},"VToolbar"),le=R()({name:"VToolbar",props:Te(),setup(e,u){var f;let{slots:t}=u;const{backgroundColorClasses:S,backgroundColorStyles:a}=U(W(e,"color")),{borderClasses:l}=ce(e),{elevationClasses:n}=ve(e),{roundedClasses:i}=de(e),{themeClasses:V}=me(e),{rtlClasses:T}=ge(),s=H(!!(e.extended||(f=t.extension)!=null&&f.call(t))),r=d(()=>parseInt(Number(e.height)+(e.density==="prominent"?Number(e.height):0)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0),10)),h=d(()=>s.value?parseInt(Number(e.extensionHeight)+(e.density==="prominent"?Number(e.extensionHeight):0)-(e.density==="comfortable"?4:0)-(e.density==="compact"?8:0),10):0);return he({VBtn:{variant:"text"}}),L(()=>{var C;const o=!!(e.title||t.title),b=!!(t.image||e.image),P=(C=t.extension)==null?void 0:C.call(t);return s.value=!!(e.extended||P),g(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},S.value,l.value,n.value,i.value,V.value,T.value,e.class],style:[a.value,e.style]},{default:()=>[b&&g("div",{key:"image",class:"v-toolbar__image"},[t.image?g($,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},t.image):g(fe,{key:"image-img",cover:!0,src:e.image},null)]),g($,{defaults:{VTabs:{height:Y(r.value)}}},{default:()=>{var c,B,M;return[g("div",{class:"v-toolbar__content",style:{height:Y(r.value)}},[t.prepend&&g("div",{class:"v-toolbar__prepend"},[(c=t.prepend)==null?void 0:c.call(t)]),o&&g(Ue,{key:"title",text:e.title},{text:t.title}),(B=t.default)==null?void 0:B.call(t),t.append&&g("div",{class:"v-toolbar__append"},[(M=t.append)==null?void 0:M.call(t)])])]}}),g($,{defaults:{VTabs:{height:Y(h.value)}}},{default:()=>[g(Ee,null,{default:()=>[s.value&&g("div",{class:"v-toolbar__extension",style:{height:Y(h.value)}},[P])]})]})]})}),{contentHeight:r,extensionHeight:h}}}),Ze=_({scrollTarget:{type:String},scrollThreshold:{type:[String,Number],default:300}},"scroll");function Ge(e){let u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{canScroll:t}=u;let S=0,a=0;const l=q(null),n=H(0),i=H(0),V=H(0),T=H(!1),s=H(!1),r=d(()=>Number(e.scrollThreshold)),h=d(()=>Pe((r.value-n.value)/r.value||0)),f=()=>{const o=l.value;if(!o||t&&!t.value)return;S=n.value,n.value="window"in o?o.pageYOffset:o.scrollTop;const b=o instanceof Window?document.documentElement.scrollHeight:o.scrollHeight;if(a!==b){a=b;return}s.value=n.value<S,V.value=Math.abs(n.value-r.value)};return I(s,()=>{i.value=i.value||n.value}),I(T,()=>{i.value=0}),Z(()=>{I(()=>e.scrollTarget,o=>{var P;const b=o?document.querySelector(o):window;b&&b!==l.value&&((P=l.value)==null||P.removeEventListener("scroll",f),l.value=b,l.value.addEventListener("scroll",f,{passive:!0}))},{immediate:!0})}),G(()=>{var o;(o=l.value)==null||o.removeEventListener("scroll",f)}),t&&I(t,f,{immediate:!0}),{scrollThreshold:r,currentScroll:n,currentThreshold:V,isScrollActive:T,scrollRatio:h,isScrollingUp:s,savedScroll:i}}const Je=_({scrollBehavior:String,modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},...Te(),...ye(),...Ze(),height:{type:[Number,String],default:64}},"VAppBar"),rt=R()({name:"VAppBar",props:Je(),emits:{"update:modelValue":e=>!0},setup(e,u){let{slots:t}=u;const S=q(),a=be(e,"modelValue"),l=d(()=>{var B;const c=new Set(((B=e.scrollBehavior)==null?void 0:B.split(" "))??[]);return{hide:c.has("hide"),fullyHide:c.has("fully-hide"),inverted:c.has("inverted"),collapse:c.has("collapse"),elevate:c.has("elevate"),fadeImage:c.has("fade-image")}}),n=d(()=>{const c=l.value;return c.hide||c.fullyHide||c.inverted||c.collapse||c.elevate||c.fadeImage||!a.value}),{currentScroll:i,scrollThreshold:V,isScrollingUp:T,scrollRatio:s}=Ge(e,{canScroll:n}),r=d(()=>l.value.hide||l.value.fullyHide),h=d(()=>e.collapse||l.value.collapse&&(l.value.inverted?s.value>0:s.value===0)),f=d(()=>e.flat||l.value.fullyHide&&!a.value||l.value.elevate&&(l.value.inverted?i.value>0:i.value===0)),o=d(()=>l.value.fadeImage?l.value.inverted?1-s.value:s.value:void 0),b=d(()=>{var M,N;if(l.value.hide&&l.value.inverted)return 0;const c=((M=S.value)==null?void 0:M.contentHeight)??0,B=((N=S.value)==null?void 0:N.extensionHeight)??0;return r.value?i.value<V.value||l.value.fullyHide?c+B:c:c+B});A(d(()=>!!e.scrollBehavior),()=>{Se(()=>{r.value?l.value.inverted?a.value=i.value>V.value:a.value=T.value||i.value<V.value:a.value=!0})});const{ssrBootStyles:P}=J(),{layoutItemStyles:C}=we({id:e.name,order:d(()=>parseInt(e.order,10)),position:W(e,"location"),layoutSize:b,elementSize:H(void 0),active:a,absolute:W(e,"absolute")});return L(()=>{const c=le.filterProps(e);return g(le,X({ref:S,class:["v-app-bar",{"v-app-bar--bottom":e.location==="bottom"},e.class],style:[{...C.value,"--v-toolbar-image-opacity":o.value,height:void 0,...P.value},e.style]},c,{collapse:h.value,flat:f.value}),t)}),{}}}),Ke=_({...He({icon:"$menu",variant:"text"})},"VAppBarNavIcon"),ct=R()({name:"VAppBarNavIcon",props:Ke(),setup(e,u){let{slots:t}=u;return L(()=>g(Ce,X(e,{class:["v-app-bar-nav-icon"]}),t)),{}}}),Qe=_({scrollable:Boolean,...z(),...Me(),...F({tag:"main"})},"VMain"),vt=R()({name:"VMain",props:Qe(),setup(e,u){let{slots:t}=u;const{dimensionStyles:S}=Ie(e),{mainStyles:a}=Ne(),{ssrBootStyles:l}=J();return L(()=>g(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable},e.class],style:[a.value,l.value,S.value,e.style]},{default:()=>{var n,i;return[e.scrollable?g("div",{class:"v-main__scroller"},[(n=t.default)==null?void 0:n.call(t)]):(i=t.default)==null?void 0:i.call(t)]}})),{}}});function je(e){let{rootEl:u,isSticky:t,layoutItemStyles:S}=e;const a=H(!1),l=H(0),n=d(()=>{const T=typeof a.value=="boolean"?"top":a.value;return[t.value?{top:"auto",bottom:"auto",height:void 0}:void 0,a.value?{[T]:Y(l.value)}:{top:S.value.top}]});Z(()=>{I(t,T=>{T?window.addEventListener("scroll",V,{passive:!0}):window.removeEventListener("scroll",V)},{immediate:!0})}),G(()=>{window.removeEventListener("scroll",V)});let i=0;function V(){const T=i>window.scrollY?"up":"down",s=u.value.getBoundingClientRect(),r=parseFloat(S.value.top??0),h=window.scrollY-Math.max(0,l.value-r),f=s.height+Math.max(l.value,r)-window.scrollY-window.innerHeight,o=parseFloat(getComputedStyle(u.value).getPropertyValue("--v-body-scroll-y"))||0;s.height<window.innerHeight-r?(a.value="top",l.value=r):T==="up"&&a.value==="bottom"||T==="down"&&a.value==="top"?(l.value=window.scrollY+s.top-o,a.value=!0):T==="down"&&f<=0?(l.value=0,a.value="bottom"):T==="up"&&h<=0&&(o?a.value!=="top"&&(l.value=-h+o+r,a.value="top"):(l.value=s.top+h,a.value="top")),i=window.scrollY}return{isStuck:a,stickyStyles:n}}const et=100,tt=20;function ne(e){return(e<0?-1:1)*Math.sqrt(Math.abs(e))*1.41421356237}function oe(e){if(e.length<2)return 0;if(e.length===2)return e[1].t===e[0].t?0:(e[1].d-e[0].d)/(e[1].t-e[0].t);let u=0;for(let t=e.length-1;t>0;t--){if(e[t].t===e[t-1].t)continue;const S=ne(u),a=(e[t].d-e[t-1].d)/(e[t].t-e[t-1].t);u+=(a-S)*Math.abs(a),t===e.length-1&&(u*=.5)}return ne(u)*1e3}function at(){const e={};function u(a){Array.from(a.changedTouches).forEach(l=>{(e[l.identifier]??(e[l.identifier]=new _e(tt))).push([a.timeStamp,l])})}function t(a){Array.from(a.changedTouches).forEach(l=>{delete e[l.identifier]})}function S(a){var T;const l=(T=e[a])==null?void 0:T.values().reverse();if(!l)throw new Error(`No samples for touch id ${a}`);const n=l[0],i=[],V=[];for(const s of l){if(n[0]-s[0]>et)break;i.push({t:s[0],d:s[1].clientX}),V.push({t:s[0],d:s[1].clientY})}return{x:oe(i),y:oe(V),get direction(){const{x:s,y:r}=this,[h,f]=[Math.abs(s),Math.abs(r)];return h>f&&s>=0?"right":h>f&&s<=0?"left":f>h&&r>=0?"down":f>h&&r<=0?"up":lt()}}}return{addMovement:u,endTouch:t,getVelocity:S}}function lt(){throw new Error}function nt(e){let{el:u,isActive:t,isTemporary:S,width:a,touchless:l,position:n}=e;Z(()=>{window.addEventListener("touchstart",c,{passive:!0}),window.addEventListener("touchmove",B,{passive:!1}),window.addEventListener("touchend",M,{passive:!0})}),G(()=>{window.removeEventListener("touchstart",c),window.removeEventListener("touchmove",B),window.removeEventListener("touchend",M)});const i=d(()=>["left","right"].includes(n.value)),{addMovement:V,endTouch:T,getVelocity:s}=at();let r=!1;const h=H(!1),f=H(0),o=H(0);let b;function P(v,m){return(n.value==="left"?v:n.value==="right"?document.documentElement.clientWidth-v:n.value==="top"?v:n.value==="bottom"?document.documentElement.clientHeight-v:D())-(m?a.value:0)}function C(v){let m=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;const y=n.value==="left"?(v-o.value)/a.value:n.value==="right"?(document.documentElement.clientWidth-v-o.value)/a.value:n.value==="top"?(v-o.value)/a.value:n.value==="bottom"?(document.documentElement.clientHeight-v-o.value)/a.value:D();return m?Math.max(0,Math.min(1,y)):y}function c(v){if(l.value)return;const m=v.changedTouches[0].clientX,y=v.changedTouches[0].clientY,w=25,k=n.value==="left"?m<w:n.value==="right"?m>document.documentElement.clientWidth-w:n.value==="top"?y<w:n.value==="bottom"?y>document.documentElement.clientHeight-w:D(),x=t.value&&(n.value==="left"?m<a.value:n.value==="right"?m>document.documentElement.clientWidth-a.value:n.value==="top"?y<a.value:n.value==="bottom"?y>document.documentElement.clientHeight-a.value:D());(k||x||t.value&&S.value)&&(b=[m,y],o.value=P(i.value?m:y,t.value),f.value=C(i.value?m:y),r=o.value>-20&&o.value<80,T(v),V(v))}function B(v){const m=v.changedTouches[0].clientX,y=v.changedTouches[0].clientY;if(r){if(!v.cancelable){r=!1;return}const k=Math.abs(m-b[0]),x=Math.abs(y-b[1]);(i.value?k>x&&k>3:x>k&&x>3)?(h.value=!0,r=!1):(i.value?x:k)>3&&(r=!1)}if(!h.value)return;v.preventDefault(),V(v);const w=C(i.value?m:y,!1);f.value=Math.max(0,Math.min(1,w)),w>1?o.value=P(i.value?m:y,!0):w<0&&(o.value=P(i.value?m:y,!1))}function M(v){if(r=!1,!h.value)return;V(v),h.value=!1;const m=s(v.changedTouches[0].identifier),y=Math.abs(m.x),w=Math.abs(m.y);(i.value?y>w&&y>400:w>y&&w>3)?t.value=m.direction===({left:"right",right:"left",top:"down",bottom:"up"}[n.value]||D()):t.value=f.value>.5}const N=d(()=>h.value?{transform:n.value==="left"?`translateX(calc(-100% + ${f.value*a.value}px))`:n.value==="right"?`translateX(calc(100% - ${f.value*a.value}px))`:n.value==="top"?`translateY(calc(-100% + ${f.value*a.value}px))`:n.value==="bottom"?`translateY(calc(100% - ${f.value*a.value}px))`:D(),transition:"none"}:void 0);return A(h,()=>{var y,w;const v=((y=u.value)==null?void 0:y.style.transform)??null,m=((w=u.value)==null?void 0:w.style.transition)??null;Se(()=>{var k,x,p,O;(x=u.value)==null||x.style.setProperty("transform",((k=N.value)==null?void 0:k.transform)||"none"),(O=u.value)==null||O.style.setProperty("transition",((p=N.value)==null?void 0:p.transition)||null)}),pe(()=>{var k,x;(k=u.value)==null||k.style.setProperty("transform",v),(x=u.value)==null||x.style.setProperty("transition",m)})}),{isDragging:h,dragProgress:f,dragStyles:N}}function D(){throw new Error}const ot=["start","end","left","right","top","bottom"],it=_({color:String,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,modelValue:{type:Boolean,default:null},permanent:Boolean,rail:{type:Boolean,default:null},railWidth:{type:[Number,String],default:56},scrim:{type:[Boolean,String],default:!0},image:String,temporary:Boolean,persistent:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},location:{type:String,default:"start",validator:e=>ot.includes(e)},sticky:Boolean,...ie(),...z(),...De(),...Re({mobile:null}),...ue(),...ye(),...se(),...F({tag:"nav"}),...re()},"VNavigationDrawer"),dt=R()({name:"VNavigationDrawer",props:it(),emits:{"update:modelValue":e=>!0,"update:rail":e=>!0},setup(e,u){let{attrs:t,emit:S,slots:a}=u;const{isRtl:l}=ge(),{themeClasses:n}=me(e),{borderClasses:i}=ce(e),{backgroundColorClasses:V,backgroundColorStyles:T}=U(W(e,"color")),{elevationClasses:s}=ve(e),{displayClasses:r,mobile:h}=Le(e),{roundedClasses:f}=de(e),o=Ye(),b=be(e,"modelValue",null,E=>!!E),{ssrBootStyles:P}=J(),{scopeId:C}=Ae(),c=q(),B=H(!1),{runOpenDelay:M,runCloseDelay:N}=Xe(e,E=>{B.value=E}),v=d(()=>e.rail&&e.expandOnHover&&B.value?Number(e.width):Number(e.rail?e.railWidth:e.width)),m=d(()=>We(e.location,l.value)),y=d(()=>e.persistent),w=d(()=>!e.permanent&&(h.value||e.temporary)),k=d(()=>e.sticky&&!w.value&&m.value!=="bottom");A(()=>e.expandOnHover&&e.rail!=null,()=>{I(B,E=>S("update:rail",!E))}),A(()=>!e.disableResizeWatcher,()=>{I(w,E=>!e.permanent&&ze(()=>b.value=!E))}),A(()=>!e.disableRouteWatcher&&!!o,()=>{I(o.currentRoute,()=>w.value&&(b.value=!1))}),I(()=>e.permanent,E=>{E&&(b.value=!0)}),e.modelValue==null&&!w.value&&(b.value=e.permanent||!h.value);const{isDragging:x,dragProgress:p}=nt({el:c,isActive:b,isTemporary:w,width:v,touchless:W(e,"touchless"),position:m}),O=d(()=>{const E=w.value?0:e.rail&&e.expandOnHover?Number(e.railWidth):v.value;return x.value?E*p.value:E}),Ve=d(()=>["top","bottom"].includes(e.location)?0:v.value),{layoutItemStyles:K,layoutItemScrimStyles:xe}=we({id:e.name,order:d(()=>parseInt(e.order,10)),position:m,layoutSize:O,elementSize:Ve,active:d(()=>b.value||x.value),disableTransitions:d(()=>x.value),absolute:d(()=>e.absolute||k.value&&typeof Q.value!="string")}),{isStuck:Q,stickyStyles:ke}=je({rootEl:c,isSticky:k,layoutItemStyles:K}),j=U(d(()=>typeof e.scrim=="string"?e.scrim:null)),Be=d(()=>({...x.value?{opacity:p.value*.2,transition:"none"}:void 0,...xe.value}));return he({VList:{bgColor:"transparent"}}),L(()=>{const E=a.image||e.image;return g($e,null,[g(e.tag,X({ref:c,onMouseenter:M,onMouseleave:N,class:["v-navigation-drawer",`v-navigation-drawer--${m.value}`,{"v-navigation-drawer--expand-on-hover":e.expandOnHover,"v-navigation-drawer--floating":e.floating,"v-navigation-drawer--is-hovering":B.value,"v-navigation-drawer--rail":e.rail,"v-navigation-drawer--temporary":w.value,"v-navigation-drawer--persistent":y.value,"v-navigation-drawer--active":b.value,"v-navigation-drawer--sticky":k.value},n.value,V.value,i.value,r.value,s.value,f.value,e.class],style:[T.value,K.value,P.value,ke.value,e.style,["top","bottom"].includes(m.value)?{height:"auto"}:{}]},C,t),{default:()=>{var ee,te,ae;return[E&&g("div",{key:"image",class:"v-navigation-drawer__img"},[a.image?g($,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{alt:"",cover:!0,height:"inherit",src:e.image}}},a.image):g(fe,{key:"image-img",alt:"",cover:!0,height:"inherit",src:e.image},null)]),a.prepend&&g("div",{class:"v-navigation-drawer__prepend"},[(ee=a.prepend)==null?void 0:ee.call(a)]),g("div",{class:"v-navigation-drawer__content"},[(te=a.default)==null?void 0:te.call(a)]),a.append&&g("div",{class:"v-navigation-drawer__append"},[(ae=a.append)==null?void 0:ae.call(a)])]}}),g(Oe,{name:"fade-transition"},{default:()=>[w.value&&(x.value||b.value)&&!!e.scrim&&g("div",X({class:["v-navigation-drawer__scrim",j.backgroundColorClasses.value],style:[Be.value,j.backgroundColorStyles.value],onClick:()=>{y.value||(b.value=!1)}},C),null)]})])}),{isStuck:Q}}});export{rt as V,dt as a,vt as b,ct as c};
