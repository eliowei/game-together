import{B as c,C as u,K as h,E as m,Q as g,bD as y,M as f,d as C,X as s,G as _,g as r}from"./index-ru1HJReR.js";const b=c({color:String,inset:Boolean,length:[Number,String],opacity:[Number,String],thickness:[Number,String],vertical:Boolean,...u(),...h()},"VDivider"),S=m()({name:"VDivider",props:b(),setup(e,l){let{attrs:i,slots:a}=l;const{themeClasses:n}=g(e),{textColorClasses:o,textColorStyles:d}=y(f(e,"color")),v=C(()=>{const t={};return e.length&&(t[e.vertical?"height":"width"]=s(e.length)),e.thickness&&(t[e.vertical?"borderRightWidth":"borderTopWidth"]=s(e.thickness)),t});return _(()=>{const t=r("hr",{class:[{"v-divider":!0,"v-divider--inset":e.inset,"v-divider--vertical":e.vertical},n.value,o.value,e.class],style:[v.value,d.value,{"--v-border-opacity":e.opacity},e.style],"aria-orientation":!i.role||i.role==="separator"?e.vertical?"vertical":"horizontal":void 0,role:`${i.role||"separator"}`},null);return a.default?r("div",{class:["v-divider__wrapper",{"v-divider__wrapper--vertical":e.vertical,"v-divider__wrapper--inset":e.inset}]},[t,r("div",{class:"v-divider__content"},[a.default()]),t]):t}),{}}});export{S as V};
