import { defineComponent as c, openBlock as r, createElementBlock as a, toDisplayString as p } from "vue";
const _ = { class: "personal-button" }, l = /* @__PURE__ */ c({
  __name: "PersonalButton",
  props: {
    text: {}
  },
  setup(t) {
    const o = t;
    return (e, n) => (r(), a("button", _, p(o.text), 1));
  }
}), u = (t, o) => {
  const e = t.__vccOpts || t;
  for (const [n, s] of o)
    e[n] = s;
  return e;
}, m = /* @__PURE__ */ u(l, [["__scopeId", "data-v-c304a871"]]);
export {
  m as PersonalButton
};
