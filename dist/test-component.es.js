/**
* @vue/shared v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function sn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const T = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, on = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], te = () => {
}, cn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), y = Object.assign, ln = Object.prototype.hasOwnProperty, b = (e, t) => ln.call(e, t), m = Array.isArray, J = (e) => Re(e) === "[object Map]", bt = (e) => Re(e) === "[object Set]", w = (e) => typeof e == "function", I = (e) => typeof e == "string", Q = (e) => typeof e == "symbol", O = (e) => e !== null && typeof e == "object", an = (e) => (O(e) || w(e)) && w(e.then) && w(e.catch), vt = Object.prototype.toString, Re = (e) => vt.call(e), wt = (e) => Re(e).slice(8, -1), Nt = (e) => Re(e) === "[object Object]", Ze = (e) => I(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, un = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, fn = un((e) => e.charAt(0).toUpperCase() + e.slice(1)), Y = (e, t) => !Object.is(e, t), pn = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
};
let ut;
const Te = () => ut || (ut = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ke(e) {
  if (m(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = I(s) ? gn(s) : ke(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (I(e) || O(e))
    return e;
}
const dn = /;(?![^(]*\))/g, hn = /:([^]+)/, _n = /\/\*[^]*?\*\//g;
function gn(e) {
  const t = {};
  return e.replace(_n, "").split(dn).forEach((n) => {
    if (n) {
      const s = n.split(hn);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function et(e) {
  let t = "";
  if (I(e))
    t = e;
  else if (m(e))
    for (let n = 0; n < e.length; n++) {
      const s = et(e[n]);
      s && (t += s + " ");
    }
  else if (O(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Ot = (e) => !!(e && e.__v_isRef === !0), St = (e) => I(e) ? e : e == null ? "" : m(e) || O(e) && (e.toString === vt || !w(e.toString)) ? Ot(e) ? St(e.value) : JSON.stringify(e, xt, 2) : String(e), xt = (e, t) => Ot(t) ? xt(e, t.value) : J(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], o) => (n[Me(s, o) + " =>"] = r, n),
    {}
  )
} : bt(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Me(n))
} : Q(t) ? Me(t) : O(t) && !m(t) && !Nt(t) ? String(t) : t, Me = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Q(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function L(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let g;
const Fe = /* @__PURE__ */ new WeakSet();
class mn {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Fe.has(this) && (Fe.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || En(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, ft(this), Dt(this);
    const t = g, n = $;
    g = this, $ = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && g !== this && L(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Vt(this), g = t, $ = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        rt(t);
      this.deps = this.depsTail = void 0, ft(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Fe.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ue(this) && this.run();
  }
  get dirty() {
    return Ue(this);
  }
}
let yt = 0, ce, le;
function En(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = le, le = e;
    return;
  }
  e.next = ce, ce = e;
}
function tt() {
  yt++;
}
function nt() {
  if (--yt > 0)
    return;
  if (le) {
    let t = le;
    for (le = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; ce; ) {
    let t = ce;
    for (ce = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Dt(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Vt(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), rt(s), vn(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function Ue(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (bn(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function bn(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === we))
    return;
  e.globalVersion = we;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !Ue(e)) {
    e.flags &= -3;
    return;
  }
  const n = g, s = $;
  g = e, $ = !0;
  try {
    Dt(e);
    const r = e.fn(e._value);
    (t.version === 0 || Y(r, e._value)) && (e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    g = n, $ = s, Vt(e), e.flags &= -3;
  }
}
function rt(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = r), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep)
      rt(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function vn(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let $ = !0;
const Rt = [];
function Ce() {
  Rt.push($), $ = !1;
}
function Ie() {
  const e = Rt.pop();
  $ = e === void 0 ? !0 : e;
}
function ft(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = g;
    g = void 0;
    try {
      t();
    } finally {
      g = n;
    }
  }
}
let we = 0;
class wn {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Nn {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!g || !$ || g === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== g)
      n = this.activeLink = new wn(g, this), g.deps ? (n.prevDep = g.depsTail, g.depsTail.nextDep = n, g.depsTail = n) : g.deps = g.depsTail = n, Tt(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = g.depsTail, n.nextDep = void 0, g.depsTail.nextDep = n, g.depsTail = n, g.deps === n && (g.deps = s);
    }
    return process.env.NODE_ENV !== "production" && g.onTrack && g.onTrack(
      y(
        {
          effect: g
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, we++, this.notify(t);
  }
  notify(t) {
    tt();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            y(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      nt();
    }
  }
}
function Tt(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Tt(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const Be = /* @__PURE__ */ new WeakMap(), q = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), Je = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), ue = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function N(e, t, n) {
  if ($ && g) {
    let s = Be.get(e);
    s || Be.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new Nn()), r.map = s, r.key = n), process.env.NODE_ENV !== "production" ? r.track({
      target: e,
      type: t,
      key: n
    }) : r.track();
  }
}
function W(e, t, n, s, r, o) {
  const i = Be.get(e);
  if (!i) {
    we++;
    return;
  }
  const c = (a) => {
    a && (process.env.NODE_ENV !== "production" ? a.trigger({
      target: e,
      type: t,
      key: n,
      newValue: s,
      oldValue: r,
      oldTarget: o
    }) : a.trigger());
  };
  if (tt(), t === "clear")
    i.forEach(c);
  else {
    const a = m(e), f = a && Ze(n);
    if (a && n === "length") {
      const d = Number(s);
      i.forEach((l, u) => {
        (u === "length" || u === ue || !Q(u) && u >= d) && c(l);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && c(i.get(n)), f && c(i.get(ue)), t) {
        case "add":
          a ? f && c(i.get("length")) : (c(i.get(q)), J(e) && c(i.get(Je)));
          break;
        case "delete":
          a || (c(i.get(q)), J(e) && c(i.get(Je)));
          break;
        case "set":
          J(e) && c(i.get(q));
          break;
      }
  }
  nt();
}
function Z(e) {
  const t = h(e);
  return t === e ? t : (N(t, "iterate", ue), V(e) ? t : t.map(D));
}
function st(e) {
  return N(e = h(e), "iterate", ue), e;
}
const On = {
  __proto__: null,
  [Symbol.iterator]() {
    return He(this, Symbol.iterator, D);
  },
  concat(...e) {
    return Z(this).concat(
      ...e.map((t) => m(t) ? Z(t) : t)
    );
  },
  entries() {
    return He(this, "entries", (e) => (e[1] = D(e[1]), e));
  },
  every(e, t) {
    return M(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return M(this, "filter", e, t, (n) => n.map(D), arguments);
  },
  find(e, t) {
    return M(this, "find", e, t, D, arguments);
  },
  findIndex(e, t) {
    return M(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return M(this, "findLast", e, t, D, arguments);
  },
  findLastIndex(e, t) {
    return M(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return M(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return je(this, "includes", e);
  },
  indexOf(...e) {
    return je(this, "indexOf", e);
  },
  join(e) {
    return Z(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return je(this, "lastIndexOf", e);
  },
  map(e, t) {
    return M(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return oe(this, "pop");
  },
  push(...e) {
    return oe(this, "push", e);
  },
  reduce(e, ...t) {
    return pt(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return pt(this, "reduceRight", e, t);
  },
  shift() {
    return oe(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return M(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return oe(this, "splice", e);
  },
  toReversed() {
    return Z(this).toReversed();
  },
  toSorted(e) {
    return Z(this).toSorted(e);
  },
  toSpliced(...e) {
    return Z(this).toSpliced(...e);
  },
  unshift(...e) {
    return oe(this, "unshift", e);
  },
  values() {
    return He(this, "values", D);
  }
};
function He(e, t, n) {
  const s = st(e), r = s[t]();
  return s !== e && !V(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.value && (o.value = n(o.value)), o;
  }), r;
}
const Sn = Array.prototype;
function M(e, t, n, s, r, o) {
  const i = st(e), c = i !== e && !V(e), a = i[t];
  if (a !== Sn[t]) {
    const l = a.apply(e, o);
    return c ? D(l) : l;
  }
  let f = n;
  i !== e && (c ? f = function(l, u) {
    return n.call(this, D(l), u, e);
  } : n.length > 2 && (f = function(l, u) {
    return n.call(this, l, u, e);
  }));
  const d = a.call(i, f, s);
  return c && r ? r(d) : d;
}
function pt(e, t, n, s) {
  const r = st(e);
  let o = n;
  return r !== e && (V(e) ? n.length > 3 && (o = function(i, c, a) {
    return n.call(this, i, c, a, e);
  }) : o = function(i, c, a) {
    return n.call(this, i, D(c), a, e);
  }), r[t](o, ...s);
}
function je(e, t, n) {
  const s = h(e);
  N(s, "iterate", ue);
  const r = s[t](...n);
  return (r === -1 || r === !1) && Ne(n[0]) ? (n[0] = h(n[0]), s[t](...n)) : r;
}
function oe(e, t, n = []) {
  Ce(), tt();
  const s = h(e)[t].apply(e, n);
  return nt(), Ie(), s;
}
const xn = /* @__PURE__ */ sn("__proto__,__v_isRef,__isVue"), Ct = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Q)
);
function yn(e) {
  Q(e) || (e = String(e));
  const t = h(this);
  return N(t, "has", e), t.hasOwnProperty(e);
}
class It {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    const r = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return s === (r ? o ? Mt : At : o ? Mn : $t).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = m(t);
    if (!r) {
      let a;
      if (i && (a = On[n]))
        return a;
      if (n === "hasOwnProperty")
        return yn;
    }
    const c = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      x(t) ? t : s
    );
    return (Q(n) ? Ct.has(n) : xn(n)) || (r || N(t, "get", n), o) ? c : x(c) ? i && Ze(n) ? c : c.value : O(c) ? r ? Ht(c) : Ft(c) : c;
  }
}
class Dn extends It {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._isShallow) {
      const a = z(o);
      if (!V(s) && !z(s) && (o = h(o), s = h(s)), !m(t) && x(o) && !x(s))
        return a ? !1 : (o.value = s, !0);
    }
    const i = m(t) && Ze(n) ? Number(n) < t.length : b(t, n), c = Reflect.set(
      t,
      n,
      s,
      x(t) ? t : r
    );
    return t === h(r) && (i ? Y(s, o) && W(t, "set", n, s, o) : W(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = b(t, n), r = t[n], o = Reflect.deleteProperty(t, n);
    return o && s && W(t, "delete", n, void 0, r), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Q(n) || !Ct.has(n)) && N(t, "has", n), s;
  }
  ownKeys(t) {
    return N(
      t,
      "iterate",
      m(t) ? "length" : q
    ), Reflect.ownKeys(t);
  }
}
class Pt extends It {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && L(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && L(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Vn = /* @__PURE__ */ new Dn(), Rn = /* @__PURE__ */ new Pt(), Tn = /* @__PURE__ */ new Pt(!0), Ye = (e) => e, he = (e) => Reflect.getPrototypeOf(e);
function Cn(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = h(r), i = J(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, f = r[e](...s), d = n ? Ye : t ? qe : D;
    return !t && N(
      o,
      "iterate",
      a ? Je : q
    ), {
      // iterator protocol
      next() {
        const { value: l, done: u } = f.next();
        return u ? { value: l, done: u } : {
          value: c ? [d(l[0]), d(l[1])] : d(l),
          done: u
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function _e(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      L(
        `${fn(e)} operation ${n}failed: target is readonly.`,
        h(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function In(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw, i = h(o), c = h(r);
      e || (Y(r, c) && N(i, "get", r), N(i, "get", c));
      const { has: a } = he(i), f = t ? Ye : e ? qe : D;
      if (a.call(i, r))
        return f(o.get(r));
      if (a.call(i, c))
        return f(o.get(c));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && N(h(r), "iterate", q), Reflect.get(r, "size", r);
    },
    has(r) {
      const o = this.__v_raw, i = h(o), c = h(r);
      return e || (Y(r, c) && N(i, "has", r), N(i, "has", c)), r === c ? o.has(r) : o.has(r) || o.has(c);
    },
    forEach(r, o) {
      const i = this, c = i.__v_raw, a = h(c), f = t ? Ye : e ? qe : D;
      return !e && N(a, "iterate", q), c.forEach((d, l) => r.call(o, f(d), f(l), i));
    }
  };
  return y(
    n,
    e ? {
      add: _e("add"),
      set: _e("set"),
      delete: _e("delete"),
      clear: _e("clear")
    } : {
      add(r) {
        !t && !V(r) && !z(r) && (r = h(r));
        const o = h(this);
        return he(o).has.call(o, r) || (o.add(r), W(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !V(o) && !z(o) && (o = h(o));
        const i = h(this), { has: c, get: a } = he(i);
        let f = c.call(i, r);
        f ? process.env.NODE_ENV !== "production" && dt(i, c, r) : (r = h(r), f = c.call(i, r));
        const d = a.call(i, r);
        return i.set(r, o), f ? Y(o, d) && W(i, "set", r, o, d) : W(i, "add", r, o), this;
      },
      delete(r) {
        const o = h(this), { has: i, get: c } = he(o);
        let a = i.call(o, r);
        a ? process.env.NODE_ENV !== "production" && dt(o, i, r) : (r = h(r), a = i.call(o, r));
        const f = c ? c.call(o, r) : void 0, d = o.delete(r);
        return a && W(o, "delete", r, void 0, f), d;
      },
      clear() {
        const r = h(this), o = r.size !== 0, i = process.env.NODE_ENV !== "production" ? J(r) ? new Map(r) : new Set(r) : void 0, c = r.clear();
        return o && W(
          r,
          "clear",
          void 0,
          void 0,
          i
        ), c;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    n[r] = Cn(r, e, t);
  }), n;
}
function ot(e, t) {
  const n = In(e, t);
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    b(n, r) && r in s ? n : s,
    r,
    o
  );
}
const Pn = {
  get: /* @__PURE__ */ ot(!1, !1)
}, $n = {
  get: /* @__PURE__ */ ot(!0, !1)
}, An = {
  get: /* @__PURE__ */ ot(!0, !0)
};
function dt(e, t, n) {
  const s = h(n);
  if (s !== n && t.call(e, s)) {
    const r = wt(e);
    L(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const $t = /* @__PURE__ */ new WeakMap(), Mn = /* @__PURE__ */ new WeakMap(), At = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ new WeakMap();
function Fn(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Hn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Fn(wt(e));
}
function Ft(e) {
  return z(e) ? e : it(
    e,
    !1,
    Vn,
    Pn,
    $t
  );
}
function Ht(e) {
  return it(
    e,
    !0,
    Rn,
    $n,
    At
  );
}
function ge(e) {
  return it(
    e,
    !0,
    Tn,
    An,
    Mt
  );
}
function it(e, t, n, s, r) {
  if (!O(e))
    return process.env.NODE_ENV !== "production" && L(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = Hn(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, c), c;
}
function ne(e) {
  return z(e) ? ne(e.__v_raw) : !!(e && e.__v_isReactive);
}
function z(e) {
  return !!(e && e.__v_isReadonly);
}
function V(e) {
  return !!(e && e.__v_isShallow);
}
function Ne(e) {
  return e ? !!e.__v_raw : !1;
}
function h(e) {
  const t = e && e.__v_raw;
  return t ? h(t) : e;
}
function jn(e) {
  return !b(e, "__v_skip") && Object.isExtensible(e) && pn(e, "__v_skip", !0), e;
}
const D = (e) => O(e) ? Ft(e) : e, qe = (e) => O(e) ? Ht(e) : e;
function x(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Wn(e) {
  return x(e) ? e.value : e;
}
const Kn = {
  get: (e, t, n) => t === "__v_raw" ? e : Wn(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return x(r) && !x(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Ln(e) {
  return ne(e) ? e : new Proxy(e, Kn);
}
const me = {}, Oe = /* @__PURE__ */ new WeakMap();
let B;
function zn(e, t = !1, n = B) {
  if (n) {
    let s = Oe.get(n);
    s || Oe.set(n, s = []), s.push(e);
  } else process.env.NODE_ENV !== "production" && !t && L(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Un(e, t, n = T) {
  const { immediate: s, deep: r, once: o, scheduler: i, augmentJob: c, call: a } = n, f = (_) => {
    (n.onWarn || L)(
      "Invalid watch source: ",
      _,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, d = (_) => r ? _ : V(_) || r === !1 || r === 0 ? K(_, 1) : K(_);
  let l, u, p, v, R = !1, pe = !1;
  if (x(e) ? (u = () => e.value, R = V(e)) : ne(e) ? (u = () => d(e), R = !0) : m(e) ? (pe = !0, R = e.some((_) => ne(_) || V(_)), u = () => e.map((_) => {
    if (x(_))
      return _.value;
    if (ne(_))
      return d(_);
    if (w(_))
      return a ? a(_, 2) : _();
    process.env.NODE_ENV !== "production" && f(_);
  })) : w(e) ? t ? u = a ? () => a(e, 2) : e : u = () => {
    if (p) {
      Ce();
      try {
        p();
      } finally {
        Ie();
      }
    }
    const _ = B;
    B = l;
    try {
      return a ? a(e, 3, [v]) : e(v);
    } finally {
      B = _;
    }
  } : (u = te, process.env.NODE_ENV !== "production" && f(e)), t && r) {
    const _ = u, A = r === !0 ? 1 / 0 : r;
    u = () => K(_(), A);
  }
  const X = () => {
    l.stop();
  };
  if (o && t) {
    const _ = t;
    t = (...A) => {
      _(...A), X();
    };
  }
  let U = pe ? new Array(e.length).fill(me) : me;
  const se = (_) => {
    if (!(!(l.flags & 1) || !l.dirty && !_))
      if (t) {
        const A = l.run();
        if (r || R || (pe ? A.some((Ae, de) => Y(Ae, U[de])) : Y(A, U))) {
          p && p();
          const Ae = B;
          B = l;
          try {
            const de = [
              A,
              // pass undefined as the old value when it's changed for the first time
              U === me ? void 0 : pe && U[0] === me ? [] : U,
              v
            ];
            a ? a(t, 3, de) : (
              // @ts-expect-error
              t(...de)
            ), U = A;
          } finally {
            B = Ae;
          }
        }
      } else
        l.run();
  };
  return c && c(se), l = new mn(u), l.scheduler = i ? () => i(se, !1) : se, v = (_) => zn(_, !1, l), p = l.onStop = () => {
    const _ = Oe.get(l);
    if (_) {
      if (a)
        a(_, 4);
      else
        for (const A of _) A();
      Oe.delete(l);
    }
  }, process.env.NODE_ENV !== "production" && (l.onTrack = n.onTrack, l.onTrigger = n.onTrigger), t ? s ? se(!0) : U = l.run() : i ? i(se.bind(null, !0), !0) : l.run(), X.pause = l.pause.bind(l), X.resume = l.resume.bind(l), X.stop = X, X;
}
function K(e, t = 1 / 0, n) {
  if (t <= 0 || !O(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, x(e))
    K(e.value, t, n);
  else if (m(e))
    for (let s = 0; s < e.length; s++)
      K(e[s], t, n);
  else if (bt(e) || J(e))
    e.forEach((s) => {
      K(s, t, n);
    });
  else if (Nt(e)) {
    for (const s in e)
      K(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && K(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const G = [];
function Bn(e) {
  G.push(e);
}
function Jn() {
  G.pop();
}
let We = !1;
function E(e, ...t) {
  if (We) return;
  We = !0, Ce();
  const n = G.length ? G[G.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = Yn();
  if (s)
    Pe(
      s,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((o) => {
          var i, c;
          return (c = (i = o.toString) == null ? void 0 : i.call(o)) != null ? c : JSON.stringify(o);
        }).join(""),
        n && n.proxy,
        r.map(
          ({ vnode: o }) => `at <${nn(n, o.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...qn(r)), console.warn(...o);
  }
  Ie(), We = !1;
}
function Yn() {
  let e = G[G.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function qn(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...Gn(n));
  }), t;
}
function Gn({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${nn(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ...Qn(e.props), o] : [r + o];
}
function Qn(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...jt(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function jt(e, t, n) {
  return I(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : x(t) ? (t = jt(e, h(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : w(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = h(t), n ? t : [`${e}=`, t]);
}
const Wt = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function Pe(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    ct(r, t, n);
  }
}
function Kt(e, t, n, s) {
  if (w(e)) {
    const r = Pe(e, t, n, s);
    return r && an(r) && r.catch((o) => {
      ct(o, t, n);
    }), r;
  }
  if (m(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(Kt(e[o], t, n, s));
    return r;
  } else process.env.NODE_ENV !== "production" && E(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function ct(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || T;
  if (t) {
    let c = t.parent;
    const a = t.proxy, f = process.env.NODE_ENV !== "production" ? Wt[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; c; ) {
      const d = c.ec;
      if (d) {
        for (let l = 0; l < d.length; l++)
          if (d[l](e, a, f) === !1)
            return;
      }
      c = c.parent;
    }
    if (o) {
      Ce(), Pe(o, null, 10, [
        e,
        a,
        f
      ]), Ie();
      return;
    }
  }
  Xn(e, n, r, s, i);
}
function Xn(e, t, n, s = !0, r = !1) {
  if (process.env.NODE_ENV !== "production") {
    const o = Wt[t];
    if (n && Bn(n), E(`Unhandled error${o ? ` during execution of ${o}` : ""}`), n && Jn(), s)
      throw e;
    console.error(e);
  } else {
    if (r)
      throw e;
    console.error(e);
  }
}
const C = [];
let F = -1;
const re = [];
let j = null, k = 0;
const Lt = /* @__PURE__ */ Promise.resolve();
let Se = null;
const Zn = 100;
function kn(e) {
  const t = Se || Lt;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function er(e) {
  let t = F + 1, n = C.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = C[s], o = fe(r);
    o < e || o === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function lt(e) {
  if (!(e.flags & 1)) {
    const t = fe(e), n = C[C.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= fe(n) ? C.push(e) : C.splice(er(t), 0, e), e.flags |= 1, zt();
  }
}
function zt() {
  Se || (Se = Lt.then(Bt));
}
function Ut(e) {
  m(e) ? re.push(...e) : j && e.id === -1 ? j.splice(k + 1, 0, e) : e.flags & 1 || (re.push(e), e.flags |= 1), zt();
}
function tr(e) {
  if (re.length) {
    const t = [...new Set(re)].sort(
      (n, s) => fe(n) - fe(s)
    );
    if (re.length = 0, j) {
      j.push(...t);
      return;
    }
    for (j = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), k = 0; k < j.length; k++) {
      const n = j[k];
      process.env.NODE_ENV !== "production" && Jt(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    j = null, k = 0;
  }
}
const fe = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Bt(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => Jt(e, n) : te;
  try {
    for (F = 0; F < C.length; F++) {
      const n = C[F];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), Pe(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; F < C.length; F++) {
      const n = C[F];
      n && (n.flags &= -2);
    }
    F = -1, C.length = 0, tr(e), Se = null, (C.length || re.length) && Bt(e);
  }
}
function Jt(e, t) {
  const n = e.get(t) || 0;
  if (n > Zn) {
    const s = t.i, r = s && tn(s.type);
    return ct(
      `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
const Ke = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (Te().__VUE_HMR_RUNTIME__ = {
  createRecord: Le(nr),
  rerender: Le(rr),
  reload: Le(sr)
});
const xe = /* @__PURE__ */ new Map();
function nr(e, t) {
  return xe.has(e) ? !1 : (xe.set(e, {
    initialDef: ye(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ye(e) {
  return rn(e) ? e.__vccOpts : e;
}
function rr(e, t) {
  const n = xe.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, ye(s.type).render = t), s.renderCache = [], s.update();
  }));
}
function sr(e, t) {
  const n = xe.get(e);
  if (!n) return;
  t = ye(t), ht(n.initialDef, t);
  const s = [...n.instances];
  for (let r = 0; r < s.length; r++) {
    const o = s[r], i = ye(o.type);
    let c = Ke.get(i);
    c || (i !== n.initialDef && ht(i, t), Ke.set(i, c = /* @__PURE__ */ new Set())), c.add(o), o.appContext.propsCache.delete(o.type), o.appContext.emitsCache.delete(o.type), o.appContext.optionsCache.delete(o.type), o.ceReload ? (c.add(o), o.ceReload(t.styles), c.delete(o)) : o.parent ? lt(() => {
      o.parent.update(), c.delete(o);
    }) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), o.root.ce && o !== o.root && o.root.ce._removeChildStyle(i);
  }
  Ut(() => {
    Ke.clear();
  });
}
function ht(e, t) {
  y(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Le(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let ee, Ee = [];
function Yt(e, t) {
  var n, s;
  ee = e, ee ? (ee.enabled = !0, Ee.forEach(({ event: r, args: o }) => ee.emit(r, ...o)), Ee = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((s = (n = window.navigator) == null ? void 0 : n.userAgent) != null && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
    Yt(o, t);
  }), setTimeout(() => {
    ee || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Ee = []);
  }, 3e3)) : Ee = [];
}
let H = null, or = null;
const ir = (e) => e.__isTeleport;
function qt(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, qt(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function cr(e, t) {
  return w(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    y({ name: e.name }, t, { setup: e })
  ) : e;
}
Te().requestIdleCallback;
Te().cancelIdleCallback;
const lr = Symbol.for("v-ndc"), Ge = (e) => e ? jr(e) ? Wr(e) : Ge(e.parent) : null, ae = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ y(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? ge(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? ge(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? ge(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? ge(e.refs) : e.refs,
    $parent: (e) => Ge(e.parent),
    $root: (e) => Ge(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => fr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      lt(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = kn.bind(e.proxy)),
    $watch: (e) => Nr.bind(e)
  })
), ar = (e) => e === "_" || e === "$", ze = (e, t) => e !== T && !e.__isScriptSetup && b(e, t), ur = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let f;
    if (t[0] !== "$") {
      const p = i[t];
      if (p !== void 0)
        switch (p) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (ze(s, t))
          return i[t] = 1, s[t];
        if (r !== T && b(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = e.propsOptions[0]) && b(f, t)
        )
          return i[t] = 3, o[t];
        if (n !== T && b(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = ae[t];
    let l, u;
    if (d)
      return t === "$attrs" ? (N(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && N(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== T && b(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      u = a.config.globalProperties, b(u, t)
    )
      return u[t];
    process.env.NODE_ENV !== "production" && H && (!I(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== T && ar(t[0]) && b(r, t) ? E(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === H && E(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return ze(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && b(r, t) ? (E(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== T && b(s, t) ? (s[t] = n, !0) : b(e.props, t) ? (process.env.NODE_ENV !== "production" && E(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && E(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o }
  }, i) {
    let c;
    return !!n[i] || e !== T && b(e, i) || ze(t, i) || (c = o[0]) && b(c, i) || b(s, i) || b(ae, i) || b(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : b(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (ur.ownKeys = (e) => (E(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function _t(e) {
  return m(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function fr(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach(
    (f) => De(a, f, i, !0)
  ), De(a, t, i)), O(t) && o.set(t, a), a;
}
function De(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && De(e, o, n, !0), r && r.forEach(
    (i) => De(e, i, n, !0)
  );
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && E(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = pr[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const pr = {
  data: gt,
  props: Et,
  emits: Et,
  // objects
  methods: ie,
  computed: ie,
  // lifecycle
  beforeCreate: S,
  created: S,
  beforeMount: S,
  mounted: S,
  beforeUpdate: S,
  updated: S,
  beforeDestroy: S,
  beforeUnmount: S,
  destroyed: S,
  unmounted: S,
  activated: S,
  deactivated: S,
  errorCaptured: S,
  serverPrefetch: S,
  // assets
  components: ie,
  directives: ie,
  // watch
  watch: hr,
  // provide / inject
  provide: gt,
  inject: dr
};
function gt(e, t) {
  return t ? e ? function() {
    return y(
      w(e) ? e.call(this, this) : e,
      w(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function dr(e, t) {
  return ie(mt(e), mt(t));
}
function mt(e) {
  if (m(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function S(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ie(e, t) {
  return e ? y(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Et(e, t) {
  return e ? m(e) && m(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : y(
    /* @__PURE__ */ Object.create(null),
    _t(e),
    _t(t ?? {})
  ) : t;
}
function hr(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = y(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = S(e[s], t[s]);
  return n;
}
let _r = null;
function gr(e, t, n = !1) {
  const s = $e || H;
  if (s || _r) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && w(t) ? t.call(s && s.proxy) : t;
    process.env.NODE_ENV !== "production" && E(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && E("inject() can only be used inside setup() or functional components.");
}
const mr = {}, Gt = (e) => Object.getPrototypeOf(e) === mr, Er = xr, br = Symbol.for("v-scx"), vr = () => {
  {
    const e = gr(br);
    return e || process.env.NODE_ENV !== "production" && E(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function wr(e, t, n = T) {
  const { immediate: s, deep: r, flush: o, once: i } = n;
  process.env.NODE_ENV !== "production" && !t && (s !== void 0 && E(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && E(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && E(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const c = y({}, n);
  process.env.NODE_ENV !== "production" && (c.onWarn = E);
  const a = t && s || !t && o !== "post";
  let f;
  if (Xe) {
    if (o === "sync") {
      const p = vr();
      f = p.__watcherHandles || (p.__watcherHandles = []);
    } else if (!a) {
      const p = () => {
      };
      return p.stop = te, p.resume = te, p.pause = te, p;
    }
  }
  const d = $e;
  c.call = (p, v, R) => Kt(p, d, v, R);
  let l = !1;
  o === "post" ? c.scheduler = (p) => {
    Er(p, d && d.suspense);
  } : o !== "sync" && (l = !0, c.scheduler = (p, v) => {
    v ? p() : lt(p);
  }), c.augmentJob = (p) => {
    t && (p.flags |= 4), l && (p.flags |= 2, d && (p.id = d.uid, p.i = d));
  };
  const u = Un(e, t, c);
  return Xe && (f ? f.push(u) : a && u()), u;
}
function Nr(e, t, n) {
  const s = this.proxy, r = I(e) ? e.includes(".") ? Or(s, e) : () => s[e] : e.bind(s, s);
  let o;
  w(t) ? o = t : (o = t.handler, n = t);
  const i = Hr(this), c = wr(r, o.bind(s), n);
  return i(), c;
}
function Or(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const Sr = (e) => e.__isSuspense;
function xr(e, t) {
  t && t.pendingBranch ? m(e) ? t.effects.push(...e) : t.effects.push(e) : Ut(e);
}
const Qt = Symbol.for("v-fgt"), yr = Symbol.for("v-txt"), Dr = Symbol.for("v-cmt"), be = [];
let P = null;
function Vr(e = !1) {
  be.push(P = e ? null : []);
}
function Rr() {
  be.pop(), P = be[be.length - 1] || null;
}
function Tr(e) {
  return e.dynamicChildren = P || on, Rr(), P && P.push(e), e;
}
function Cr(e, t, n, s, r, o) {
  return Tr(
    Zt(
      e,
      t,
      n,
      s,
      r,
      o,
      !0
    )
  );
}
function Ir(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Pr = (...e) => kt(
  ...e
), Xt = ({ key: e }) => e ?? null, ve = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? I(e) || x(e) || w(e) ? { i: H, r: e, k: t, f: !!n } : e : null);
function Zt(e, t = null, n = null, s = 0, r = null, o = e === Qt ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Xt(t),
    ref: t && ve(t),
    scopeId: or,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: H
  };
  return c ? (at(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= I(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && E("VNode created with invalid key (NaN). VNode type:", a.type), // avoid a block node from tracking itself
  !i && // has current parent block
  P && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && P.push(a), a;
}
const $r = process.env.NODE_ENV !== "production" ? Pr : kt;
function kt(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === lr) && (process.env.NODE_ENV !== "production" && !e && E(`Invalid vnode type when creating vnode: ${e}.`), e = Dr), Ir(e)) {
    const c = Ve(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && at(c, n), !o && P && (c.shapeFlag & 6 ? P[P.indexOf(e)] = c : P.push(c)), c.patchFlag = -2, c;
  }
  if (rn(e) && (e = e.__vccOpts), t) {
    t = Ar(t);
    let { class: c, style: a } = t;
    c && !I(c) && (t.class = et(c)), O(a) && (Ne(a) && !m(a) && (a = y({}, a)), t.style = ke(a));
  }
  const i = I(e) ? 1 : Sr(e) ? 128 : ir(e) ? 64 : O(e) ? 4 : w(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Ne(e) && (e = h(e), E(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Zt(
    e,
    t,
    n,
    s,
    r,
    i,
    o,
    !0
  );
}
function Ar(e) {
  return e ? Ne(e) || Gt(e) ? y({}, e) : e : null;
}
function Ve(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: c, transition: a } = e, f = t ? Fr(r || {}, t) : r, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Xt(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? m(o) ? o.concat(ve(t)) : [o, ve(t)] : ve(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && m(c) ? c.map(en) : c,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Qt ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ve(e.ssContent),
    ssFallback: e.ssFallback && Ve(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && s && qt(
    d,
    a.clone(d)
  ), d;
}
function en(e) {
  const t = Ve(e);
  return m(e.children) && (t.children = e.children.map(en)), t;
}
function Mr(e = " ", t = 0) {
  return $r(yr, null, e, t);
}
function at(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (m(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), at(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Gt(t) ? t._ctx = H : r === 3 && H && (H.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else w(t) ? (t = { default: t, _ctx: H }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Mr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Fr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = et([t.class, s.class]));
      else if (r === "style")
        t.style = ke([t.style, s.style]);
      else if (cn(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(m(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
let $e = null, Qe;
{
  const e = Te(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  Qe = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => $e = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => Xe = n
  );
}
const Hr = (e) => {
  const t = $e;
  return Qe(e), e.scope.on(), () => {
    e.scope.off(), Qe(t);
  };
};
function jr(e) {
  return e.vnode.shapeFlag & 4;
}
let Xe = !1;
process.env.NODE_ENV;
function Wr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ln(jn(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in ae)
        return ae[n](e);
    },
    has(t, n) {
      return n in t || n in ae;
    }
  })) : e.proxy;
}
const Kr = /(?:^|[-_])(\w)/g, Lr = (e) => e.replace(Kr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function tn(e, t = !0) {
  return w(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function nn(e, t, n = !1) {
  let s = tn(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e && e.parent) {
    const r = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    s = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return s ? Lr(s) : n ? "App" : "Anonymous";
}
function rn(e) {
  return w(e) && "__vccOpts" in e;
}
function zr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, s = { style: "color:#eb2f96" }, r = {
    __vue_custom_formatter: !0,
    header(l) {
      return O(l) ? l.__isVue ? ["div", e, "VueInstance"] : x(l) ? [
        "div",
        {},
        ["span", e, d(l)],
        "<",
        // avoid debugger accessing value affecting behavior
        c("_value" in l ? l._value : l),
        ">"
      ] : ne(l) ? [
        "div",
        {},
        ["span", e, V(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${z(l) ? " (readonly)" : ""}`
      ] : z(l) ? [
        "div",
        {},
        ["span", e, V(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const u = [];
    l.type.props && l.props && u.push(i("props", h(l.props))), l.setupState !== T && u.push(i("setup", l.setupState)), l.data !== T && u.push(i("data", h(l.data)));
    const p = a(l, "computed");
    p && u.push(i("computed", p));
    const v = a(l, "inject");
    return v && u.push(i("injected", v)), u.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), u;
  }
  function i(l, u) {
    return u = y({}, u), Object.keys(u).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(u).map((p) => [
          "div",
          {},
          ["span", s, p + ": "],
          c(u[p], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, u = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", s, l] : O(l) ? ["object", { object: u ? h(l) : l }] : ["span", n, String(l)];
  }
  function a(l, u) {
    const p = l.type;
    if (w(p))
      return;
    const v = {};
    for (const R in l.ctx)
      f(p, R, u) && (v[R] = l.ctx[R]);
    return v;
  }
  function f(l, u, p) {
    const v = l[p];
    if (m(v) && v.includes(u) || O(v) && u in v || l.extends && f(l.extends, u, p) || l.mixins && l.mixins.some((R) => f(R, u, p)))
      return !0;
  }
  function d(l) {
    return V(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
process.env.NODE_ENV;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* vue v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Ur() {
  zr();
}
process.env.NODE_ENV !== "production" && Ur();
const Br = { class: "personal-button" }, Jr = /* @__PURE__ */ cr({
  __name: "PersonalButton",
  props: {
    text: {}
  },
  setup(e) {
    const t = e;
    return (n, s) => (Vr(), Cr("button", Br, St(t.text), 1));
  }
}), Yr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, qr = /* @__PURE__ */ Yr(Jr, [["__scopeId", "data-v-3a8fc161"]]);
export {
  qr as PersonalButton
};
