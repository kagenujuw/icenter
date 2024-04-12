import { ref as a, openBlock as u, createElementBlock as n, createVNode as r, unref as l, withCtx as p, createTextVNode as m } from "vue";
import { ElInput as d, ElButton as i } from "element-plus";
const V = {
  __name: "test",
  props: {
    material: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  setup(s) {
    const e = a("");
    return (c, t) => (u(), n("div", null, [
      r(l(d), {
        modelValue: e.value,
        "onUpdate:modelValue": t[0] || (t[0] = (o) => e.value = o),
        placeholder: "Please input"
      }, null, 8, ["modelValue"]),
      r(l(i), { type: "primary" }, {
        default: p(() => [
          m("Primary")
        ]),
        _: 1
      })
    ]));
  }
};
export {
  V as test
};
//# sourceMappingURL=index.es.js.map
