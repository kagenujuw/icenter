(function(e,o){typeof exports=="object"&&typeof module<"u"?module.exports=o(require("vue")):typeof define=="function"&&define.amd?define(["vue"],o):(e=typeof globalThis<"u"?globalThis:e||self,e.LowcodeRender=o(e.Vue))})(this,function(e){"use strict";const o=(r,l)=>{const c=r.__vccOpts||r;for(const[a,n]of l)c[a]=n;return c},s={class:e.normalizeClass(["meta-render"])};return o({__name:"lowcode-render",props:{metaData:{type:Object,default(){return{}}}},emits:["editProps","openPanel"],setup(r,{emit:l}){const c=l,a=n=>{c("openPanel",n)};return(n,_)=>{const d=e.resolveComponent("lowcode-render",!0);return e.openBlock(),e.createElementBlock("div",s,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(r.metaData,(t,i)=>(e.openBlock(),e.createElementBlock("div",{class:"hon-item",key:i},[(e.openBlock(),e.createBlock(e.resolveDynamicComponent(t[t.id]),{material:t,onOpenPanel:f=>a(t)},null,40,["material","onOpenPanel"])),t.componentType!=="container"&&(t==null?void 0:t.children.length)>0?(e.openBlock(),e.createBlock(d,e.mergeProps({key:0,metaData:t.children},n.$attrs,e.toHandlers(n.$listeners),{onOpenPanel:a}),null,16,["metaData"])):e.createCommentVNode("",!0)]))),128))])}}},[["__scopeId","data-v-1ae797cb"]])});
//# sourceMappingURL=lowcode-render.umd.js.map
