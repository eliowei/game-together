import{B as p,C as b,cj as v,E as F,ck as V,r as y,G as h,g as R,b3 as k}from"./index-Br_C9Lit.js";const P=p({...b(),...v()},"VForm"),g=F()({name:"VForm",props:P(),emits:{"update:modelValue":o=>!0,submit:o=>!0},setup(o,i){let{slots:n,emit:c}=i;const r=V(o),s=y();function f(t){t.preventDefault(),r.reset()}function l(t){const a=t,e=r.validate();a.then=e.then.bind(e),a.catch=e.catch.bind(e),a.finally=e.finally.bind(e),c("submit",a),a.defaultPrevented||e.then(u=>{var m;let{valid:d}=u;d&&((m=s.value)==null||m.submit())}),a.preventDefault()}return h(()=>{var t;return R("form",{ref:s,class:["v-form",o.class],style:o.style,novalidate:!0,onReset:f,onSubmit:l},[(t=n.default)==null?void 0:t.call(n,r)])}),k(r,s)}});export{g as V};
