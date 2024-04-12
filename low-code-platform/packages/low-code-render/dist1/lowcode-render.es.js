import { resolveComponent as i, openBlock as n, createElementBlock as c, Fragment as _, renderList as u, createBlock as s, resolveDynamicComponent as p, mergeProps as v, toHandlers as P, createCommentVNode as f, normalizeClass as k } from "vue";
const y = (r, l) => {
  const a = r.__vccOpts || r;
  for (const [o, t] of l)
    a[o] = t;
  return a;
}, D = {
  class: /* @__PURE__ */ k(["meta-render"])
}, O = {
  __name: "lowcode-render",
  props: {
    metaData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  emits: ["editProps", "openPanel"],
  setup(r, { emit: l }) {
    const a = l, o = (t) => {
      a("openPanel", t);
    };
    return (t, g) => {
      const m = i("lowcode-render", !0);
      return n(), c("div", D, [
        (n(!0), c(_, null, u(r.metaData, (e, d) => (n(), c("div", {
          class: "hon-item",
          key: d
        }, [
          (n(), s(p(e[e.id]), {
            material: e,
            onOpenPanel: (w) => o(e)
          }, null, 40, ["material", "onOpenPanel"])),
          e.componentType !== "container" && (e == null ? void 0 : e.children.length) > 0 ? (n(), s(m, v({
            key: 0,
            metaData: e.children
          }, t.$attrs, P(t.$listeners), { onOpenPanel: o }), null, 16, ["metaData"])) : f("", !0)
        ]))), 128))
      ]);
    };
  }
}, $ = /* @__PURE__ */ y(O, [["__scopeId", "data-v-1ae797cb"]]);
export {
  $ as default
};
//# sourceMappingURL=lowcode-render.es.js.map
