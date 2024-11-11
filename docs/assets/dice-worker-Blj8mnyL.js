(function () {
  "use strict";
  /**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */ const Ce = Symbol("Comlink.proxy"),
    _t = Symbol("Comlink.endpoint"),
    bt = Symbol("Comlink.releaseProxy"),
    pe = Symbol("Comlink.finalizer"),
    ee = Symbol("Comlink.thrown"),
    De = (r) => (typeof r == "object" && r !== null) || typeof r == "function",
    wt = {
      canHandle: (r) => De(r) && r[Ce],
      serialize(r) {
        const { port1: e, port2: t } = new MessageChannel();
        return he(r, e), [t, [t]];
      },
      deserialize(r) {
        return r.start(), Lt(r);
      },
    },
    At = {
      canHandle: (r) => De(r) && ee in r,
      serialize({ value: r }) {
        let e;
        return (
          r instanceof Error
            ? (e = {
                isError: !0,
                value: { message: r.message, name: r.name, stack: r.stack },
              })
            : (e = { isError: !1, value: r }),
          [e, []]
        );
      },
      deserialize(r) {
        throw r.isError
          ? Object.assign(new Error(r.value.message), r.value)
          : r.value;
      },
    },
    Te = new Map([
      ["proxy", wt],
      ["throw", At],
    ]);
  function Ot(r, e) {
    for (const t of r)
      if (e === t || t === "*" || (t instanceof RegExp && t.test(e))) return !0;
    return !1;
  }
  function he(r, e = globalThis, t = ["*"]) {
    e.addEventListener("message", function n(i) {
      if (!i || !i.data) return;
      if (!Ot(t, i.origin)) {
        console.warn(`Invalid origin '${i.origin}' for comlink proxy`);
        return;
      }
      const { id: s, type: o, path: l } = Object.assign({ path: [] }, i.data),
        u = (i.data.argumentList || []).map(z);
      let h;
      try {
        const a = l.slice(0, -1).reduce((p, m) => p[m], r),
          c = l.reduce((p, m) => p[m], r);
        switch (o) {
          case "GET":
            h = c;
            break;
          case "SET":
            (a[l.slice(-1)[0]] = z(i.data.value)), (h = !0);
            break;
          case "APPLY":
            h = c.apply(a, u);
            break;
          case "CONSTRUCT":
            {
              const p = new c(...u);
              h = Ct(p);
            }
            break;
          case "ENDPOINT":
            {
              const { port1: p, port2: m } = new MessageChannel();
              he(r, m), (h = Ft(p, [p]));
            }
            break;
          case "RELEASE":
            h = void 0;
            break;
          default:
            return;
        }
      } catch (a) {
        h = { value: a, [ee]: 0 };
      }
      Promise.resolve(h)
        .catch((a) => ({ value: a, [ee]: 0 }))
        .then((a) => {
          const [c, p] = ie(a);
          e.postMessage(Object.assign(Object.assign({}, c), { id: s }), p),
            o === "RELEASE" &&
              (e.removeEventListener("message", n),
              ke(e),
              pe in r && typeof r[pe] == "function" && r[pe]());
        })
        .catch((a) => {
          const [c, p] = ie({
            value: new TypeError("Unserializable return value"),
            [ee]: 0,
          });
          e.postMessage(Object.assign(Object.assign({}, c), { id: s }), p);
        });
    }),
      e.start && e.start();
  }
  function Nt(r) {
    return r.constructor.name === "MessagePort";
  }
  function ke(r) {
    Nt(r) && r.close();
  }
  function Lt(r, e) {
    const t = new Map();
    return (
      r.addEventListener("message", function (i) {
        const { data: s } = i;
        if (!s || !s.id) return;
        const o = t.get(s.id);
        if (o)
          try {
            o(s);
          } finally {
            t.delete(s.id);
          }
      }),
      me(r, t, [], e)
    );
  }
  function te(r) {
    if (r) throw new Error("Proxy has been released and is not useable");
  }
  function Me(r) {
    return W(r, new Map(), { type: "RELEASE" }).then(() => {
      ke(r);
    });
  }
  const re = new WeakMap(),
    ne =
      "FinalizationRegistry" in globalThis &&
      new FinalizationRegistry((r) => {
        const e = (re.get(r) || 0) - 1;
        re.set(r, e), e === 0 && Me(r);
      });
  function Et(r, e) {
    const t = (re.get(e) || 0) + 1;
    re.set(e, t), ne && ne.register(r, e, r);
  }
  function Rt(r) {
    ne && ne.unregister(r);
  }
  function me(r, e, t = [], n = function () {}) {
    let i = !1;
    const s = new Proxy(n, {
      get(o, l) {
        if ((te(i), l === bt))
          return () => {
            Rt(s), Me(r), e.clear(), (i = !0);
          };
        if (l === "then") {
          if (t.length === 0) return { then: () => s };
          const u = W(r, e, {
            type: "GET",
            path: t.map((h) => h.toString()),
          }).then(z);
          return u.then.bind(u);
        }
        return me(r, e, [...t, l]);
      },
      set(o, l, u) {
        te(i);
        const [h, a] = ie(u);
        return W(
          r,
          e,
          { type: "SET", path: [...t, l].map((c) => c.toString()), value: h },
          a
        ).then(z);
      },
      apply(o, l, u) {
        te(i);
        const h = t[t.length - 1];
        if (h === _t) return W(r, e, { type: "ENDPOINT" }).then(z);
        if (h === "bind") return me(r, e, t.slice(0, -1));
        const [a, c] = je(u);
        return W(
          r,
          e,
          { type: "APPLY", path: t.map((p) => p.toString()), argumentList: a },
          c
        ).then(z);
      },
      construct(o, l) {
        te(i);
        const [u, h] = je(l);
        return W(
          r,
          e,
          {
            type: "CONSTRUCT",
            path: t.map((a) => a.toString()),
            argumentList: u,
          },
          h
        ).then(z);
      },
    });
    return Et(s, r), s;
  }
  function Pt(r) {
    return Array.prototype.concat.apply([], r);
  }
  function je(r) {
    const e = r.map(ie);
    return [e.map((t) => t[0]), Pt(e.map((t) => t[1]))];
  }
  const Be = new WeakMap();
  function Ft(r, e) {
    return Be.set(r, e), r;
  }
  function Ct(r) {
    return Object.assign(r, { [Ce]: !0 });
  }
  function ie(r) {
    for (const [e, t] of Te)
      if (t.canHandle(r)) {
        const [n, i] = t.serialize(r);
        return [{ type: "HANDLER", name: e, value: n }, i];
      }
    return [{ type: "RAW", value: r }, Be.get(r) || []];
  }
  function z(r) {
    switch (r.type) {
      case "HANDLER":
        return Te.get(r.name).deserialize(r.value);
      case "RAW":
        return r.value;
    }
  }
  function W(r, e, t, n) {
    return new Promise((i) => {
      const s = Dt();
      e.set(s, i),
        r.start && r.start(),
        r.postMessage(Object.assign({ id: s }, t), n);
    });
  }
  function Dt() {
    return new Array(4)
      .fill(0)
      .map(() =>
        Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)
      )
      .join("-");
  }
  function E(r) {
    const e = r || "";
    return function () {
      throw new Error(
        "this method " +
          e +
          " is abstract! (it has no implementation in class " +
          this.constructor.name +
          ")"
      );
    };
  }
  function G(r, e) {
    if (!r) throw new Error(e || "Assertion failed");
  }
  function fe(r, e, t) {
    let n;
    Object.defineProperty(r, e, {
      get() {
        return n || (n = t.call(this)), n;
      },
    });
  }
  function Tt(r) {
    return r && Object.assign({}, r);
  }
  function Ge(r, e) {
    const t = [];
    for (; e-- > 0; ) t.push(r());
    return t;
  }
  function qe(r, e) {
    return new Array(e + 1).join(r);
  }
  function se(r, e) {
    return Ge(() => r, e);
  }
  function de(r) {
    const e = [];
    for (let t = 0; t < r.length; t++) {
      const n = r[t];
      r.lastIndexOf(n) !== t && e.indexOf(n) < 0 && e.push(n);
    }
    return e;
  }
  function ze(r) {
    const e = [];
    return (
      r.forEach((t) => {
        e.indexOf(t) < 0 && e.push(t);
      }),
      e
    );
  }
  function U(r) {
    const e = r[0];
    return e === e.toUpperCase();
  }
  function Ue(r) {
    return !U(r);
  }
  function $e(r, e, t) {
    const n = t || " ";
    return r.length < e ? qe(n, e - r.length) + r : r;
  }
  function $() {
    this.strings = [];
  }
  ($.prototype.append = function (r) {
    this.strings.push(r);
  }),
    ($.prototype.contents = function () {
      return this.strings.join("");
    });
  const ge = (r) => String.fromCodePoint(parseInt(r, 16));
  function He(r) {
    if (r.charAt(0) === "\\")
      switch (r.charAt(1)) {
        case "b":
          return "\b";
        case "f":
          return "\f";
        case "n":
          return `
`;
        case "r":
          return "\r";
        case "t":
          return "	";
        case "v":
          return "\v";
        case "x":
          return ge(r.slice(2, 4));
        case "u":
          return r.charAt(2) === "{" ? ge(r.slice(3, -1)) : ge(r.slice(2, 6));
        default:
          return r.charAt(1);
      }
    else return r;
  }
  function ve(r) {
    if (r == null) return String(r);
    const e = Object.prototype.toString.call(r);
    try {
      let t;
      return (
        r.constructor && r.constructor.name
          ? (t = r.constructor.name)
          : e.indexOf("[object ") === 0
            ? (t = e.slice(8, -1))
            : (t = typeof r),
        t + ": " + JSON.stringify(String(r))
      );
    } catch {
      return e;
    }
  }
  var kt = Object.freeze({
    __proto__: null,
    StringBuffer: $,
    abstract: E,
    assert: G,
    clone: Tt,
    copyWithoutDuplicates: ze,
    defineLazyProperty: fe,
    getDuplicates: de,
    isLexical: Ue,
    isSyntactic: U,
    padLeft: $e,
    repeat: se,
    repeatFn: Ge,
    repeatStr: qe,
    unescapeCodePoint: He,
    unexpectedObjToString: ve,
  });
  const Mt = {
    Lu: new RegExp("\\p{Lu}", "u"),
    Ll: new RegExp("\\p{Ll}", "u"),
    Lt: new RegExp("\\p{Lt}", "u"),
    Lm: new RegExp("\\p{Lm}", "u"),
    Lo: new RegExp("\\p{Lo}", "u"),
    Nl: new RegExp("\\p{Nl}", "u"),
    Nd: new RegExp("\\p{Nd}", "u"),
    Mn: new RegExp("\\p{Mn}", "u"),
    Mc: new RegExp("\\p{Mc}", "u"),
    Pc: new RegExp("\\p{Pc}", "u"),
    Zs: new RegExp("\\p{Zs}", "u"),
    L: new RegExp("\\p{Letter}", "u"),
    Ltmo: new RegExp("\\p{Lt}|\\p{Lm}|\\p{Lo}", "u"),
  };
  class f {
    constructor() {
      if (this.constructor === f)
        throw new Error("PExpr cannot be instantiated -- it's abstract");
    }
    withSource(e) {
      return e && (this.source = e.trimmed()), this;
    }
  }
  const w = Object.create(f.prototype),
    A = Object.create(f.prototype);
  class S extends f {
    constructor(e) {
      super(), (this.obj = e);
    }
  }
  class O extends f {
    constructor(e, t) {
      super(),
        (this.from = e),
        (this.to = t),
        (this.matchCodePoint = e.length > 1 || t.length > 1);
    }
  }
  class N extends f {
    constructor(e) {
      super(), (this.index = e);
    }
  }
  class y extends f {
    constructor(e) {
      super(), (this.terms = e);
    }
  }
  class oe extends y {
    constructor(e, t, n) {
      const i = e.rules[t].body;
      super([n, i]), (this.superGrammar = e), (this.name = t), (this.body = n);
    }
  }
  class ae extends y {
    constructor(e, t, n, i) {
      const s = e.rules[t].body;
      super([...n, s, ...i]),
        (this.superGrammar = e),
        (this.ruleName = t),
        (this.expansionPos = n.length);
    }
  }
  class x extends f {
    constructor(e) {
      super(), (this.factors = e);
    }
  }
  class R extends f {
    constructor(e) {
      super(), (this.expr = e);
    }
  }
  class H extends R {}
  class J extends R {}
  class B extends R {}
  (H.prototype.operator = "*"),
    (J.prototype.operator = "+"),
    (B.prototype.operator = "?"),
    (H.prototype.minNumMatches = 0),
    (J.prototype.minNumMatches = 1),
    (B.prototype.minNumMatches = 0),
    (H.prototype.maxNumMatches = Number.POSITIVE_INFINITY),
    (J.prototype.maxNumMatches = Number.POSITIVE_INFINITY),
    (B.prototype.maxNumMatches = 1);
  class P extends f {
    constructor(e) {
      super(), (this.expr = e);
    }
  }
  class F extends f {
    constructor(e) {
      super(), (this.expr = e);
    }
  }
  class D extends f {
    constructor(e) {
      super(), (this.expr = e);
    }
  }
  class g extends f {
    constructor(e, t = []) {
      super(), (this.ruleName = e), (this.args = t);
    }
    isSyntactic() {
      return U(this.ruleName);
    }
    toMemoKey() {
      return (
        this._memoKey ||
          Object.defineProperty(this, "_memoKey", { value: this.toString() }),
        this._memoKey
      );
    }
  }
  class _ extends f {
    constructor(e) {
      super(), (this.category = e), (this.pattern = Mt[e]);
    }
  }
  function v(r, e) {
    let t;
    return (
      e
        ? ((t = new Error(e.getLineAndColumnMessage() + r)),
          (t.shortMessage = r),
          (t.interval = e))
        : (t = new Error(r)),
      t
    );
  }
  function ye() {
    return v("Interval sources don't match");
  }
  function jt(r) {
    const e = new Error();
    return (
      Object.defineProperty(e, "message", {
        enumerable: !0,
        get() {
          return r.message;
        },
      }),
      Object.defineProperty(e, "shortMessage", {
        enumerable: !0,
        get() {
          return "Expected " + r.getExpectedText();
        },
      }),
      (e.interval = r.getInterval()),
      e
    );
  }
  function Bt(r, e, t) {
    const n = e
      ? `Grammar ${r} is not declared in namespace '${e}'`
      : "Undeclared grammar " + r;
    return v(n, t);
  }
  function Gt(r, e) {
    return v("Grammar " + r.name + " is already declared in this namespace");
  }
  function qt(r) {
    return v(`Grammar '${r.name}' does not support incremental parsing`);
  }
  function Ke(r, e, t) {
    return v("Rule " + r + " is not declared in grammar " + e, t);
  }
  function zt(r, e, t) {
    return v(
      "Cannot override rule " + r + " because it is not declared in " + e,
      t
    );
  }
  function Ut(r, e, t) {
    return v(
      "Cannot extend rule " + r + " because it is not declared in " + e,
      t
    );
  }
  function Ve(r, e, t, n) {
    let i = "Duplicate declaration for rule '" + r + "' in grammar '" + e + "'";
    return e !== t && (i += " (originally declared in '" + t + "')"), v(i, n);
  }
  function We(r, e, t, n) {
    return v(
      "Wrong number of parameters for rule " +
        r +
        " (expected " +
        e +
        ", got " +
        t +
        ")",
      n
    );
  }
  function $t(r, e, t, n) {
    return v(
      "Wrong number of arguments for rule " +
        r +
        " (expected " +
        e +
        ", got " +
        t +
        ")",
      n
    );
  }
  function Je(r, e, t) {
    return v("Duplicate parameter names in rule " + r + ": " + e.join(", "), t);
  }
  function Ht(r, e) {
    return v(
      "Invalid parameter to rule " +
        r +
        ": " +
        e +
        " has arity " +
        e.getArity() +
        ", but parameter expressions must have arity 1",
      e.source
    );
  }
  const Kt =
    "NOTE: A _syntactic rule_ is a rule whose name begins with a capital letter. See https://ohmjs.org/d/svl for more details.";
  function Vt(r, e) {
    return v(
      "Cannot apply syntactic rule " +
        r +
        " from here (inside a lexical context)",
      e.source
    );
  }
  function Wt(r) {
    const { ruleName: e } = r;
    return v(
      `applySyntactic is for syntactic rules, but '${e}' is a lexical rule. ` +
        Kt,
      r.source
    );
  }
  function Jt(r) {
    return v(
      "applySyntactic is not required here (in a syntactic context)",
      r.source
    );
  }
  function Ye(r, e) {
    return v("Incorrect argument type: expected " + r, e.source);
  }
  function Yt(r) {
    return v("'...' can appear at most once in a rule body", r.source);
  }
  function Qt(r) {
    const e = r._node;
    G(e && e.isNonterminal() && e.ctorName === "escapeChar_unicodeCodePoint");
    const t = r.children.slice(1, -1).map((i) => i.source),
      n = t[0].coverageWith(...t.slice(1));
    return v(`U+${n.contents} is not a valid Unicode code point`, n);
  }
  function Qe(r, e) {
    const t = e.length > 0 ? e[e.length - 1].args : [];
    let i =
      "Nullable expression " +
      r.expr.substituteParams(t) +
      " is not allowed inside '" +
      r.operator +
      "' (possible infinite loop)";
    if (e.length > 0) {
      const s = e.map((o) => new g(o.ruleName, o.args)).join(`
`);
      i +=
        `
Application stack (most recent application last):
` + s;
    }
    return v(i, r.expr.source);
  }
  function Ze(r, e, t, n) {
    return v(
      "Rule " +
        r +
        " involves an alternation which has inconsistent arity (expected " +
        e +
        ", got " +
        t +
        ")",
      n.source
    );
  }
  function Zt(r) {
    const e = r.map((t) => t.message);
    return v(
      ["Errors:"].concat(e).join(`
- `),
      r[0].interval
    );
  }
  function Xt(r, e, t, n) {
    let i = n.slice(0, -1).map((u) => {
      const h = "  " + u[0].name + " > " + u[1];
      return u.length === 3 ? h + " for '" + u[2] + "'" : h;
    }).join(`
`);
    i +=
      `
  ` +
      e +
      " > " +
      r;
    let s = "";
    r === "_iter" &&
      (s = [
        `
NOTE: as of Ohm v16, there is no default action for iteration nodes — see `,
        "  https://ohmjs.org/d/dsa for details.",
      ].join(`
`));
    const o = [
        `Missing semantic action for '${r}' in ${t} '${e}'.${s}`,
        "Action stack (most recent call last):",
        i,
      ].join(`
`),
      l = v(o);
    return (l.name = "missingSemanticAction"), l;
  }
  function er(r) {
    if (r.length === 1) throw r[0];
    if (r.length > 1) throw Zt(r);
  }
  function tr(r) {
    let e = 0;
    return r
      .map((n) => {
        const i = n.toString();
        return (e = Math.max(e, i.length)), i;
      })
      .map((n) => $e(n, e));
  }
  function Xe(r, e, t) {
    const n = r.length,
      i = r.slice(0, t),
      s = r.slice(t + e.length);
    return (i + e + s).substr(0, n);
  }
  function rr(...r) {
    const e = this,
      { offset: t } = e,
      { repeatStr: n } = kt,
      i = new $();
    i.append(
      "Line " +
        e.lineNum +
        ", col " +
        e.colNum +
        `:
`
    );
    const s = tr([
        e.prevLine == null ? 0 : e.lineNum - 1,
        e.lineNum,
        e.nextLine == null ? 0 : e.lineNum + 1,
      ]),
      o = (a, c, p) => {
        i.append(
          p +
            s[a] +
            " | " +
            c +
            `
`
        );
      };
    e.prevLine != null && o(0, e.prevLine, "  "), o(1, e.line, "> ");
    const l = e.line.length;
    let u = n(" ", l + 1);
    for (let a = 0; a < r.length; ++a) {
      let c = r[a][0],
        p = r[a][1];
      G(c >= 0 && c <= p, "range start must be >= 0 and <= end");
      const m = t - e.colNum + 1;
      (c = Math.max(0, c - m)),
        (p = Math.min(p - m, l)),
        (u = Xe(u, n("~", p - c), c));
    }
    const h = 2 + s[1].length + 3;
    return (
      i.append(n(" ", h)),
      (u = Xe(u, "^", e.colNum - 1)),
      i.append(
        u.replace(/ +$/, "") +
          `
`
      ),
      e.nextLine != null && o(2, e.nextLine, "  "),
      i.contents()
    );
  }
  let Ie = [];
  function et(r) {
    Ie.push(r);
  }
  function nr(r) {
    Ie.forEach((e) => {
      e(r);
    }),
      (Ie = null);
  }
  function xe(r, e) {
    let t = 1,
      n = 1,
      i = 0,
      s = 0,
      o = null,
      l = null,
      u = -1;
    for (; i < e; ) {
      const c = r.charAt(i++);
      c ===
      `
`
        ? (t++, (n = 1), (u = s), (s = i))
        : c !== "\r" && n++;
    }
    let h = r.indexOf(
      `
`,
      s
    );
    if (h === -1) h = r.length;
    else {
      const c = r.indexOf(
        `
`,
        h + 1
      );
      (o = c === -1 ? r.slice(h) : r.slice(h, c)),
        (o = o.replace(/^\r?\n/, "").replace(/\r$/, ""));
    }
    u >= 0 && (l = r.slice(u, s).replace(/\r?\n$/, ""));
    const a = r.slice(s, h).replace(/\r$/, "");
    return {
      offset: e,
      lineNum: t,
      colNum: n,
      line: a,
      prevLine: l,
      nextLine: o,
      toString: rr,
    };
  }
  function Se(r, e, ...t) {
    return xe(r, e).toString(...t);
  }
  const tt = (() => {
    let r = 0;
    return (e) => "" + e + r++;
  })();
  class L {
    constructor(e, t, n) {
      (this.sourceString = e), (this.startIdx = t), (this.endIdx = n);
    }
    get contents() {
      return (
        this._contents === void 0 &&
          (this._contents = this.sourceString.slice(
            this.startIdx,
            this.endIdx
          )),
        this._contents
      );
    }
    get length() {
      return this.endIdx - this.startIdx;
    }
    coverageWith(...e) {
      return L.coverage(...e, this);
    }
    collapsedLeft() {
      return new L(this.sourceString, this.startIdx, this.startIdx);
    }
    collapsedRight() {
      return new L(this.sourceString, this.endIdx, this.endIdx);
    }
    getLineAndColumn() {
      return xe(this.sourceString, this.startIdx);
    }
    getLineAndColumnMessage() {
      const e = [this.startIdx, this.endIdx];
      return Se(this.sourceString, this.startIdx, e);
    }
    minus(e) {
      if (this.sourceString !== e.sourceString) throw ye();
      return this.startIdx === e.startIdx && this.endIdx === e.endIdx
        ? []
        : this.startIdx < e.startIdx && e.endIdx < this.endIdx
          ? [
              new L(this.sourceString, this.startIdx, e.startIdx),
              new L(this.sourceString, e.endIdx, this.endIdx),
            ]
          : this.startIdx < e.endIdx && e.endIdx < this.endIdx
            ? [new L(this.sourceString, e.endIdx, this.endIdx)]
            : this.startIdx < e.startIdx && e.startIdx < this.endIdx
              ? [new L(this.sourceString, this.startIdx, e.startIdx)]
              : [this];
    }
    relativeTo(e) {
      if (this.sourceString !== e.sourceString) throw ye();
      return (
        G(
          this.startIdx >= e.startIdx && this.endIdx <= e.endIdx,
          "other interval does not cover this one"
        ),
        new L(
          this.sourceString,
          this.startIdx - e.startIdx,
          this.endIdx - e.startIdx
        )
      );
    }
    trimmed() {
      const { contents: e } = this,
        t = this.startIdx + e.match(/^\s*/)[0].length,
        n = this.endIdx - e.match(/\s*$/)[0].length;
      return new L(this.sourceString, t, n);
    }
    subInterval(e, t) {
      const n = this.startIdx + e;
      return new L(this.sourceString, n, n + t);
    }
  }
  L.coverage = function (r, ...e) {
    let { startIdx: t, endIdx: n } = r;
    for (const i of e) {
      if (i.sourceString !== r.sourceString) throw ye();
      (t = Math.min(t, i.startIdx)), (n = Math.max(n, i.endIdx));
    }
    return new L(r.sourceString, t, n);
  };
  const ir = 65535;
  class ce {
    constructor(e) {
      (this.source = e), (this.pos = 0), (this.examinedLength = 0);
    }
    atEnd() {
      const e = this.pos >= this.source.length;
      return (
        (this.examinedLength = Math.max(this.examinedLength, this.pos + 1)), e
      );
    }
    next() {
      const e = this.source[this.pos++];
      return (this.examinedLength = Math.max(this.examinedLength, this.pos)), e;
    }
    nextCharCode() {
      const e = this.next();
      return e && e.charCodeAt(0);
    }
    nextCodePoint() {
      const e = this.source.slice(this.pos++).codePointAt(0);
      return (
        e > ir && (this.pos += 1),
        (this.examinedLength = Math.max(this.examinedLength, this.pos)),
        e
      );
    }
    matchString(e, t) {
      let n;
      if (t) {
        for (n = 0; n < e.length; n++) {
          const i = this.next(),
            s = e[n];
          if (i == null || i.toUpperCase() !== s.toUpperCase()) return !1;
        }
        return !0;
      }
      for (n = 0; n < e.length; n++) if (this.next() !== e[n]) return !1;
      return !0;
    }
    sourceSlice(e, t) {
      return this.source.slice(e, t);
    }
    interval(e, t) {
      return new L(this.source, e, t || this.pos);
    }
  }
  class rt {
    constructor(e, t, n, i, s, o, l) {
      (this.matcher = e),
        (this.input = t),
        (this.startExpr = n),
        (this._cst = i),
        (this._cstOffset = s),
        (this._rightmostFailurePosition = o),
        (this._rightmostFailures = l),
        this.failed() &&
          (fe(this, "message", function () {
            const u = "Expected " + this.getExpectedText();
            return Se(this.input, this.getRightmostFailurePosition()) + u;
          }),
          fe(this, "shortMessage", function () {
            const u = "expected " + this.getExpectedText(),
              h = xe(this.input, this.getRightmostFailurePosition());
            return "Line " + h.lineNum + ", col " + h.colNum + ": " + u;
          }));
    }
    succeeded() {
      return !!this._cst;
    }
    failed() {
      return !this.succeeded();
    }
    getRightmostFailurePosition() {
      return this._rightmostFailurePosition;
    }
    getRightmostFailures() {
      if (!this._rightmostFailures) {
        this.matcher.setInput(this.input);
        const e = this.matcher._match(this.startExpr, {
          tracing: !1,
          positionToRecordFailures: this.getRightmostFailurePosition(),
        });
        this._rightmostFailures = e.getRightmostFailures();
      }
      return this._rightmostFailures;
    }
    toString() {
      return this.succeeded()
        ? "[match succeeded]"
        : "[match failed at position " +
            this.getRightmostFailurePosition() +
            "]";
    }
    getExpectedText() {
      if (this.succeeded())
        throw new Error("cannot get expected text of a successful MatchResult");
      const e = new $();
      let t = this.getRightmostFailures();
      t = t.filter((n) => !n.isFluffy());
      for (let n = 0; n < t.length; n++)
        n > 0 &&
          (n === t.length - 1
            ? e.append(t.length > 2 ? ", or " : " or ")
            : e.append(", ")),
          e.append(t[n].toString());
      return e.contents();
    }
    getInterval() {
      const e = this.getRightmostFailurePosition();
      return new L(this.input, e, e);
    }
  }
  class sr {
    constructor() {
      (this.applicationMemoKeyStack = []),
        (this.memo = {}),
        (this.maxExaminedLength = 0),
        (this.maxRightmostFailureOffset = -1),
        (this.currentLeftRecursion = void 0);
    }
    isActive(e) {
      return this.applicationMemoKeyStack.indexOf(e.toMemoKey()) >= 0;
    }
    enter(e) {
      this.applicationMemoKeyStack.push(e.toMemoKey());
    }
    exit() {
      this.applicationMemoKeyStack.pop();
    }
    startLeftRecursion(e, t) {
      (t.isLeftRecursion = !0),
        (t.headApplication = e),
        (t.nextLeftRecursion = this.currentLeftRecursion),
        (this.currentLeftRecursion = t);
      const { applicationMemoKeyStack: n } = this,
        i = n.indexOf(e.toMemoKey()) + 1,
        s = n.slice(i);
      (t.isInvolved = function (o) {
        return s.indexOf(o) >= 0;
      }),
        (t.updateInvolvedApplicationMemoKeys = function () {
          for (let o = i; o < n.length; o++) {
            const l = n[o];
            this.isInvolved(l) || s.push(l);
          }
        });
    }
    endLeftRecursion() {
      this.currentLeftRecursion = this.currentLeftRecursion.nextLeftRecursion;
    }
    shouldUseMemoizedResult(e) {
      if (!e.isLeftRecursion) return !0;
      const { applicationMemoKeyStack: t } = this;
      for (let n = 0; n < t.length; n++) {
        const i = t[n];
        if (e.isInvolved(i)) return !1;
      }
      return !0;
    }
    memoize(e, t) {
      return (
        (this.memo[e] = t),
        (this.maxExaminedLength = Math.max(
          this.maxExaminedLength,
          t.examinedLength
        )),
        (this.maxRightmostFailureOffset = Math.max(
          this.maxRightmostFailureOffset,
          t.rightmostFailureOffset
        )),
        t
      );
    }
    clearObsoleteEntries(e, t) {
      if (e + this.maxExaminedLength <= t) return;
      const { memo: n } = this;
      (this.maxExaminedLength = 0),
        (this.maxRightmostFailureOffset = -1),
        Object.keys(n).forEach((i) => {
          const s = n[i];
          e + s.examinedLength > t
            ? delete n[i]
            : ((this.maxExaminedLength = Math.max(
                this.maxExaminedLength,
                s.examinedLength
              )),
              (this.maxRightmostFailureOffset = Math.max(
                this.maxRightmostFailureOffset,
                s.rightmostFailureOffset
              )));
        });
    }
  }
  const or = "✗",
    ar = "✓",
    cr = "⋅",
    ur = "⇒",
    lr = "␉",
    pr = "␊",
    hr = "␍",
    _e = {
      succeeded: 1,
      isRootNode: 2,
      isImplicitSpaces: 4,
      isMemoized: 8,
      isHeadOfLeftRecursion: 16,
      terminatesLR: 32,
    };
  function mr(r) {
    return se(" ", r).join("");
  }
  function fr(r, e, t) {
    const n = nt(r.slice(e, e + t));
    return n.length < t ? n + se(" ", t - n.length).join("") : n;
  }
  function nt(r) {
    return typeof r == "string"
      ? r
          .replace(/ /g, cr)
          .replace(/\t/g, lr)
          .replace(/\n/g, pr)
          .replace(/\r/g, hr)
      : String(r);
  }
  class q {
    constructor(e, t, n, i, s, o, l) {
      (this.input = e),
        (this.pos = this.pos1 = t),
        (this.pos2 = n),
        (this.source = new L(e, t, n)),
        (this.expr = i),
        (this.bindings = o),
        (this.children = l || []),
        (this.terminatingLREntry = null),
        (this._flags = s ? _e.succeeded : 0);
    }
    get displayString() {
      return this.expr.toDisplayString();
    }
    clone() {
      return this.cloneWithExpr(this.expr);
    }
    cloneWithExpr(e) {
      const t = new q(
        this.input,
        this.pos,
        this.pos2,
        e,
        this.succeeded,
        this.bindings,
        this.children
      );
      return (
        (t.isHeadOfLeftRecursion = this.isHeadOfLeftRecursion),
        (t.isImplicitSpaces = this.isImplicitSpaces),
        (t.isMemoized = this.isMemoized),
        (t.isRootNode = this.isRootNode),
        (t.terminatesLR = this.terminatesLR),
        (t.terminatingLREntry = this.terminatingLREntry),
        t
      );
    }
    recordLRTermination(e, t) {
      (this.terminatingLREntry = new q(
        this.input,
        this.pos,
        this.pos2,
        this.expr,
        !1,
        [t],
        [e]
      )),
        (this.terminatingLREntry.terminatesLR = !0);
    }
    walk(e, t) {
      let n = e;
      typeof n == "function" && (n = { enter: n });
      function i(s, o, l) {
        let u = !0;
        n.enter && n.enter.call(t, s, o, l) === q.prototype.SKIP && (u = !1),
          u &&
            (s.children.forEach((h) => {
              i(h, s, l + 1);
            }),
            n.exit && n.exit.call(t, s, o, l));
      }
      this.isRootNode
        ? this.children.forEach((s) => {
            i(s, null, 0);
          })
        : i(this, null, 0);
    }
    toString() {
      const e = new $();
      return (
        this.walk((t, n, i) => {
          if (!t) return this.SKIP;
          if (t.expr.constructor.name !== "Alt") {
            if (
              (e.append(fr(t.input, t.pos, 10) + mr(i * 2 + 1)),
              e.append((t.succeeded ? ar : or) + " " + t.displayString),
              t.isHeadOfLeftRecursion && e.append(" (LR)"),
              t.succeeded)
            ) {
              const o = nt(t.source.contents);
              e.append(" " + ur + "  "),
                e.append(typeof o == "string" ? '"' + o + '"' : o);
            }
            e.append(`
`);
          }
        }),
        e.contents()
      );
    }
  }
  (q.prototype.SKIP = {}),
    Object.keys(_e).forEach((r) => {
      const e = _e[r];
      Object.defineProperty(q.prototype, r, {
        get() {
          return (this._flags & e) !== 0;
        },
        set(t) {
          t ? (this._flags |= e) : (this._flags &= ~e);
        },
      });
    }),
    (f.prototype.allowsSkippingPrecedingSpace = E(
      "allowsSkippingPrecedingSpace"
    )),
    (w.allowsSkippingPrecedingSpace =
      A.allowsSkippingPrecedingSpace =
      g.prototype.allowsSkippingPrecedingSpace =
      S.prototype.allowsSkippingPrecedingSpace =
      O.prototype.allowsSkippingPrecedingSpace =
      _.prototype.allowsSkippingPrecedingSpace =
        function () {
          return !0;
        }),
    (y.prototype.allowsSkippingPrecedingSpace =
      R.prototype.allowsSkippingPrecedingSpace =
      D.prototype.allowsSkippingPrecedingSpace =
      F.prototype.allowsSkippingPrecedingSpace =
      P.prototype.allowsSkippingPrecedingSpace =
      N.prototype.allowsSkippingPrecedingSpace =
      x.prototype.allowsSkippingPrecedingSpace =
        function () {
          return !1;
        });
  let Y;
  et((r) => {
    Y = r;
  });
  let ue;
  (f.prototype.assertAllApplicationsAreValid = function (r, e) {
    (ue = 0), this._assertAllApplicationsAreValid(r, e);
  }),
    (f.prototype._assertAllApplicationsAreValid = E(
      "_assertAllApplicationsAreValid"
    )),
    (w._assertAllApplicationsAreValid =
      A._assertAllApplicationsAreValid =
      S.prototype._assertAllApplicationsAreValid =
      O.prototype._assertAllApplicationsAreValid =
      N.prototype._assertAllApplicationsAreValid =
      _.prototype._assertAllApplicationsAreValid =
        function (r, e) {}),
    (D.prototype._assertAllApplicationsAreValid = function (r, e) {
      ue++, this.expr._assertAllApplicationsAreValid(r, e), ue--;
    }),
    (y.prototype._assertAllApplicationsAreValid = function (r, e) {
      for (let t = 0; t < this.terms.length; t++)
        this.terms[t]._assertAllApplicationsAreValid(r, e);
    }),
    (x.prototype._assertAllApplicationsAreValid = function (r, e) {
      for (let t = 0; t < this.factors.length; t++)
        this.factors[t]._assertAllApplicationsAreValid(r, e);
    }),
    (R.prototype._assertAllApplicationsAreValid =
      P.prototype._assertAllApplicationsAreValid =
      F.prototype._assertAllApplicationsAreValid =
        function (r, e) {
          this.expr._assertAllApplicationsAreValid(r, e);
        }),
    (g.prototype._assertAllApplicationsAreValid = function (r, e, t = !1) {
      const n = e.rules[this.ruleName],
        i = U(r) && ue === 0;
      if (!n) throw Ke(this.ruleName, e.name, this.source);
      if (!t && U(this.ruleName) && !i) throw Vt(this.ruleName, this);
      const s = this.args.length,
        o = n.formals.length;
      if (s !== o) throw $t(this.ruleName, o, s, this.source);
      const l = Y && n === Y.rules.applySyntactic;
      if (Y && n === Y.rules.caseInsensitive && !(this.args[0] instanceof S))
        throw Ye('a Terminal (e.g. "abc")', this.args[0]);
      if (l) {
        const h = this.args[0];
        if (!(h instanceof g)) throw Ye("a syntactic rule application", h);
        if (!U(h.ruleName)) throw Wt(h);
        if (i) throw Jt(this);
      }
      this.args.forEach((h) => {
        if ((h._assertAllApplicationsAreValid(r, e, l), h.getArity() !== 1))
          throw Ht(this.ruleName, h);
      });
    }),
    (f.prototype.assertChoicesHaveUniformArity = E(
      "assertChoicesHaveUniformArity"
    )),
    (w.assertChoicesHaveUniformArity =
      A.assertChoicesHaveUniformArity =
      S.prototype.assertChoicesHaveUniformArity =
      O.prototype.assertChoicesHaveUniformArity =
      N.prototype.assertChoicesHaveUniformArity =
      D.prototype.assertChoicesHaveUniformArity =
      _.prototype.assertChoicesHaveUniformArity =
        function (r) {}),
    (y.prototype.assertChoicesHaveUniformArity = function (r) {
      if (this.terms.length === 0) return;
      const e = this.terms[0].getArity();
      for (let t = 0; t < this.terms.length; t++) {
        const n = this.terms[t];
        n.assertChoicesHaveUniformArity();
        const i = n.getArity();
        if (e !== i) throw Ze(r, e, i, n);
      }
    }),
    (oe.prototype.assertChoicesHaveUniformArity = function (r) {
      const e = this.terms[0].getArity(),
        t = this.terms[1].getArity();
      if (e !== t) throw Ze(r, t, e, this.terms[0]);
    }),
    (x.prototype.assertChoicesHaveUniformArity = function (r) {
      for (let e = 0; e < this.factors.length; e++)
        this.factors[e].assertChoicesHaveUniformArity(r);
    }),
    (R.prototype.assertChoicesHaveUniformArity = function (r) {
      this.expr.assertChoicesHaveUniformArity(r);
    }),
    (P.prototype.assertChoicesHaveUniformArity = function (r) {}),
    (F.prototype.assertChoicesHaveUniformArity = function (r) {
      this.expr.assertChoicesHaveUniformArity(r);
    }),
    (g.prototype.assertChoicesHaveUniformArity = function (r) {}),
    (f.prototype.assertIteratedExprsAreNotNullable = E(
      "assertIteratedExprsAreNotNullable"
    )),
    (w.assertIteratedExprsAreNotNullable =
      A.assertIteratedExprsAreNotNullable =
      S.prototype.assertIteratedExprsAreNotNullable =
      O.prototype.assertIteratedExprsAreNotNullable =
      N.prototype.assertIteratedExprsAreNotNullable =
      _.prototype.assertIteratedExprsAreNotNullable =
        function (r) {}),
    (y.prototype.assertIteratedExprsAreNotNullable = function (r) {
      for (let e = 0; e < this.terms.length; e++)
        this.terms[e].assertIteratedExprsAreNotNullable(r);
    }),
    (x.prototype.assertIteratedExprsAreNotNullable = function (r) {
      for (let e = 0; e < this.factors.length; e++)
        this.factors[e].assertIteratedExprsAreNotNullable(r);
    }),
    (R.prototype.assertIteratedExprsAreNotNullable = function (r) {
      if (
        (this.expr.assertIteratedExprsAreNotNullable(r),
        this.expr.isNullable(r))
      )
        throw Qe(this, []);
    }),
    (B.prototype.assertIteratedExprsAreNotNullable =
      P.prototype.assertIteratedExprsAreNotNullable =
      F.prototype.assertIteratedExprsAreNotNullable =
      D.prototype.assertIteratedExprsAreNotNullable =
        function (r) {
          this.expr.assertIteratedExprsAreNotNullable(r);
        }),
    (g.prototype.assertIteratedExprsAreNotNullable = function (r) {
      this.args.forEach((e) => {
        e.assertIteratedExprsAreNotNullable(r);
      });
    });
  class be {
    constructor(e) {
      this.matchLength = e;
    }
    get ctorName() {
      throw new Error("subclass responsibility");
    }
    numChildren() {
      return this.children ? this.children.length : 0;
    }
    childAt(e) {
      if (this.children) return this.children[e];
    }
    indexOfChild(e) {
      return this.children.indexOf(e);
    }
    hasChildren() {
      return this.numChildren() > 0;
    }
    hasNoChildren() {
      return !this.hasChildren();
    }
    onlyChild() {
      if (this.numChildren() !== 1)
        throw new Error(
          "cannot get only child of a node of type " +
            this.ctorName +
            " (it has " +
            this.numChildren() +
            " children)"
        );
      return this.firstChild();
    }
    firstChild() {
      if (this.hasNoChildren())
        throw new Error(
          "cannot get first child of a " +
            this.ctorName +
            " node, which has no children"
        );
      return this.childAt(0);
    }
    lastChild() {
      if (this.hasNoChildren())
        throw new Error(
          "cannot get last child of a " +
            this.ctorName +
            " node, which has no children"
        );
      return this.childAt(this.numChildren() - 1);
    }
    childBefore(e) {
      const t = this.indexOfChild(e);
      if (t < 0)
        throw new Error(
          "Node.childBefore() called w/ an argument that is not a child"
        );
      if (t === 0) throw new Error("cannot get child before first child");
      return this.childAt(t - 1);
    }
    childAfter(e) {
      const t = this.indexOfChild(e);
      if (t < 0)
        throw new Error(
          "Node.childAfter() called w/ an argument that is not a child"
        );
      if (t === this.numChildren() - 1)
        throw new Error("cannot get child after last child");
      return this.childAt(t + 1);
    }
    isTerminal() {
      return !1;
    }
    isNonterminal() {
      return !1;
    }
    isIteration() {
      return !1;
    }
    isOptional() {
      return !1;
    }
  }
  class K extends be {
    get ctorName() {
      return "_terminal";
    }
    isTerminal() {
      return !0;
    }
    get primitiveValue() {
      throw new Error("The `primitiveValue` property was removed in Ohm v17.");
    }
  }
  class dr extends be {
    constructor(e, t, n, i) {
      super(i),
        (this.ruleName = e),
        (this.children = t),
        (this.childOffsets = n);
    }
    get ctorName() {
      return this.ruleName;
    }
    isNonterminal() {
      return !0;
    }
    isLexical() {
      return Ue(this.ctorName);
    }
    isSyntactic() {
      return U(this.ctorName);
    }
  }
  class it extends be {
    constructor(e, t, n, i) {
      super(n),
        (this.children = e),
        (this.childOffsets = t),
        (this.optional = i);
    }
    get ctorName() {
      return "_iter";
    }
    isIteration() {
      return !0;
    }
    isOptional() {
      return this.optional;
    }
  }
  (f.prototype.eval = E("eval")),
    (w.eval = function (r) {
      const { inputStream: e } = r,
        t = e.pos,
        n = e.nextCodePoint();
      return n !== void 0
        ? (r.pushBinding(new K(String.fromCodePoint(n).length), t), !0)
        : (r.processFailure(t, this), !1);
    }),
    (A.eval = function (r) {
      const { inputStream: e } = r,
        t = e.pos;
      return e.atEnd()
        ? (r.pushBinding(new K(0), t), !0)
        : (r.processFailure(t, this), !1);
    }),
    (S.prototype.eval = function (r) {
      const { inputStream: e } = r,
        t = e.pos;
      return e.matchString(this.obj)
        ? (r.pushBinding(new K(this.obj.length), t), !0)
        : (r.processFailure(t, this), !1);
    }),
    (O.prototype.eval = function (r) {
      const { inputStream: e } = r,
        t = e.pos,
        n = this.matchCodePoint ? e.nextCodePoint() : e.nextCharCode();
      return n !== void 0 &&
        this.from.codePointAt(0) <= n &&
        n <= this.to.codePointAt(0)
        ? (r.pushBinding(new K(String.fromCodePoint(n).length), t), !0)
        : (r.processFailure(t, this), !1);
    }),
    (N.prototype.eval = function (r) {
      return r.eval(r.currentApplication().args[this.index]);
    }),
    (D.prototype.eval = function (r) {
      r.enterLexifiedContext();
      const e = r.eval(this.expr);
      return r.exitLexifiedContext(), e;
    }),
    (y.prototype.eval = function (r) {
      for (let e = 0; e < this.terms.length; e++)
        if (r.eval(this.terms[e])) return !0;
      return !1;
    }),
    (x.prototype.eval = function (r) {
      for (let e = 0; e < this.factors.length; e++) {
        const t = this.factors[e];
        if (!r.eval(t)) return !1;
      }
      return !0;
    }),
    (R.prototype.eval = function (r) {
      const { inputStream: e } = r,
        t = e.pos,
        n = this.getArity(),
        i = [],
        s = [];
      for (; i.length < n; ) i.push([]), s.push([]);
      let o = 0,
        l = t,
        u;
      for (; o < this.maxNumMatches && r.eval(this.expr); ) {
        if (e.pos === l) throw Qe(this, r._applicationStack);
        (l = e.pos), o++;
        const p = r._bindings.splice(r._bindings.length - n, n),
          m = r._bindingOffsets.splice(r._bindingOffsets.length - n, n);
        for (u = 0; u < p.length; u++) i[u].push(p[u]), s[u].push(m[u]);
      }
      if (o < this.minNumMatches) return !1;
      let h = r.posToOffset(t),
        a = 0;
      if (o > 0) {
        const p = i[n - 1],
          m = s[n - 1],
          d = m[m.length - 1] + p[p.length - 1].matchLength;
        (h = s[0][0]), (a = d - h);
      }
      const c = this instanceof B;
      for (u = 0; u < i.length; u++)
        r._bindings.push(new it(i[u], s[u], a, c)), r._bindingOffsets.push(h);
      return !0;
    }),
    (P.prototype.eval = function (r) {
      const { inputStream: e } = r,
        t = e.pos;
      r.pushFailuresInfo();
      const n = r.eval(this.expr);
      return (
        r.popFailuresInfo(),
        n ? (r.processFailure(t, this), !1) : ((e.pos = t), !0)
      );
    }),
    (F.prototype.eval = function (r) {
      const { inputStream: e } = r,
        t = e.pos;
      return r.eval(this.expr) ? ((e.pos = t), !0) : !1;
    }),
    (g.prototype.eval = function (r) {
      const e = r.currentApplication(),
        t = e ? e.args : [],
        n = this.substituteParams(t),
        i = r.getCurrentPosInfo();
      if (i.isActive(n)) return n.handleCycle(r);
      const s = n.toMemoKey(),
        o = i.memo[s];
      if (o && i.shouldUseMemoizedResult(o)) {
        if (r.hasNecessaryInfo(o))
          return r.useMemoizedResult(r.inputStream.pos, o);
        delete i.memo[s];
      }
      return n.reallyEval(r);
    }),
    (g.prototype.handleCycle = function (r) {
      const e = r.getCurrentPosInfo(),
        { currentLeftRecursion: t } = e,
        n = this.toMemoKey();
      let i = e.memo[n];
      return (
        t && t.headApplication.toMemoKey() === n
          ? i.updateInvolvedApplicationMemoKeys()
          : i ||
            ((i = e.memoize(n, {
              matchLength: 0,
              examinedLength: 0,
              value: !1,
              rightmostFailureOffset: -1,
            })),
            e.startLeftRecursion(this, i)),
        r.useMemoizedResult(r.inputStream.pos, i)
      );
    }),
    (g.prototype.reallyEval = function (r) {
      const { inputStream: e } = r,
        t = e.pos,
        n = r.getCurrentPosInfo(),
        i = r.grammar.rules[this.ruleName],
        { body: s } = i,
        { description: o } = i;
      r.enterApplication(n, this), o && r.pushFailuresInfo();
      const l = e.examinedLength;
      e.examinedLength = 0;
      let u = this.evalOnce(s, r);
      const h = n.currentLeftRecursion,
        a = this.toMemoKey(),
        c = h && h.headApplication.toMemoKey() === a;
      let p;
      r.doNotMemoize
        ? (r.doNotMemoize = !1)
        : c
          ? ((u = this.growSeedResult(s, r, t, h, u)),
            n.endLeftRecursion(),
            (p = h),
            (p.examinedLength = e.examinedLength - t),
            (p.rightmostFailureOffset = r._getRightmostFailureOffset()),
            n.memoize(a, p))
          : (!h || !h.isInvolved(a)) &&
            (p = n.memoize(a, {
              matchLength: e.pos - t,
              examinedLength: e.examinedLength - t,
              value: u,
              failuresAtRightmostPosition: r.cloneRecordedFailures(),
              rightmostFailureOffset: r._getRightmostFailureOffset(),
            }));
      const m = !!u;
      if (
        (o &&
          (r.popFailuresInfo(),
          m || r.processFailure(t, this),
          p && (p.failuresAtRightmostPosition = r.cloneRecordedFailures())),
        r.isTracing() && p)
      ) {
        const d = r.getTraceEntry(t, this, m, m ? [u] : []);
        c &&
          (G(d.terminatingLREntry != null || !m),
          (d.isHeadOfLeftRecursion = !0)),
          (p.traceEntry = d);
      }
      return (
        (e.examinedLength = Math.max(e.examinedLength, l)),
        r.exitApplication(n, u),
        m
      );
    }),
    (g.prototype.evalOnce = function (r, e) {
      const { inputStream: t } = e,
        n = t.pos;
      if (e.eval(r)) {
        const i = r.getArity(),
          s = e._bindings.splice(e._bindings.length - i, i),
          o = e._bindingOffsets.splice(e._bindingOffsets.length - i, i),
          l = t.pos - n;
        return new dr(this.ruleName, s, o, l);
      } else return !1;
    }),
    (g.prototype.growSeedResult = function (r, e, t, n, i) {
      if (!i) return !1;
      const { inputStream: s } = e;
      for (;;) {
        if (
          ((n.matchLength = s.pos - t),
          (n.value = i),
          (n.failuresAtRightmostPosition = e.cloneRecordedFailures()),
          e.isTracing())
        ) {
          const o = e.trace[e.trace.length - 1];
          n.traceEntry = new q(e.input, t, s.pos, this, !0, [i], [o.clone()]);
        }
        if (
          ((s.pos = t), (i = this.evalOnce(r, e)), s.pos - t <= n.matchLength)
        )
          break;
        e.isTracing() && e.trace.splice(-2, 1);
      }
      return (
        e.isTracing() && n.traceEntry.recordLRTermination(e.trace.pop(), i),
        (s.pos = t + n.matchLength),
        n.value
      );
    }),
    (_.prototype.eval = function (r) {
      const { inputStream: e } = r,
        t = e.pos,
        n = e.next();
      return n && this.pattern.test(n)
        ? (r.pushBinding(new K(n.length), t), !0)
        : (r.processFailure(t, this), !1);
    }),
    (f.prototype.getArity = E("getArity")),
    (w.getArity =
      A.getArity =
      S.prototype.getArity =
      O.prototype.getArity =
      N.prototype.getArity =
      g.prototype.getArity =
      _.prototype.getArity =
        function () {
          return 1;
        }),
    (y.prototype.getArity = function () {
      return this.terms.length === 0 ? 0 : this.terms[0].getArity();
    }),
    (x.prototype.getArity = function () {
      let r = 0;
      for (let e = 0; e < this.factors.length; e++)
        r += this.factors[e].getArity();
      return r;
    }),
    (R.prototype.getArity = function () {
      return this.expr.getArity();
    }),
    (P.prototype.getArity = function () {
      return 0;
    }),
    (F.prototype.getArity = D.prototype.getArity =
      function () {
        return this.expr.getArity();
      });
  function j(r, e) {
    const t = {};
    if (r.source && e) {
      const n = r.source.relativeTo(e);
      t.sourceInterval = [n.startIdx, n.endIdx];
    }
    return t;
  }
  (f.prototype.outputRecipe = E("outputRecipe")),
    (w.outputRecipe = function (r, e) {
      return ["any", j(this, e)];
    }),
    (A.outputRecipe = function (r, e) {
      return ["end", j(this, e)];
    }),
    (S.prototype.outputRecipe = function (r, e) {
      return ["terminal", j(this, e), this.obj];
    }),
    (O.prototype.outputRecipe = function (r, e) {
      return ["range", j(this, e), this.from, this.to];
    }),
    (N.prototype.outputRecipe = function (r, e) {
      return ["param", j(this, e), this.index];
    }),
    (y.prototype.outputRecipe = function (r, e) {
      return ["alt", j(this, e)].concat(
        this.terms.map((t) => t.outputRecipe(r, e))
      );
    }),
    (oe.prototype.outputRecipe = function (r, e) {
      return this.terms[0].outputRecipe(r, e);
    }),
    (ae.prototype.outputRecipe = function (r, e) {
      const t = this.terms.slice(0, this.expansionPos),
        n = this.terms.slice(this.expansionPos + 1);
      return [
        "splice",
        j(this, e),
        t.map((i) => i.outputRecipe(r, e)),
        n.map((i) => i.outputRecipe(r, e)),
      ];
    }),
    (x.prototype.outputRecipe = function (r, e) {
      return ["seq", j(this, e)].concat(
        this.factors.map((t) => t.outputRecipe(r, e))
      );
    }),
    (H.prototype.outputRecipe =
      J.prototype.outputRecipe =
      B.prototype.outputRecipe =
      P.prototype.outputRecipe =
      F.prototype.outputRecipe =
      D.prototype.outputRecipe =
        function (r, e) {
          return [
            this.constructor.name.toLowerCase(),
            j(this, e),
            this.expr.outputRecipe(r, e),
          ];
        }),
    (g.prototype.outputRecipe = function (r, e) {
      return [
        "app",
        j(this, e),
        this.ruleName,
        this.args.map((t) => t.outputRecipe(r, e)),
      ];
    }),
    (_.prototype.outputRecipe = function (r, e) {
      return ["unicodeChar", j(this, e), this.category];
    }),
    (f.prototype.introduceParams = E("introduceParams")),
    (w.introduceParams =
      A.introduceParams =
      S.prototype.introduceParams =
      O.prototype.introduceParams =
      N.prototype.introduceParams =
      _.prototype.introduceParams =
        function (r) {
          return this;
        }),
    (y.prototype.introduceParams = function (r) {
      return (
        this.terms.forEach((e, t, n) => {
          n[t] = e.introduceParams(r);
        }),
        this
      );
    }),
    (x.prototype.introduceParams = function (r) {
      return (
        this.factors.forEach((e, t, n) => {
          n[t] = e.introduceParams(r);
        }),
        this
      );
    }),
    (R.prototype.introduceParams =
      P.prototype.introduceParams =
      F.prototype.introduceParams =
      D.prototype.introduceParams =
        function (r) {
          return (this.expr = this.expr.introduceParams(r)), this;
        }),
    (g.prototype.introduceParams = function (r) {
      const e = r.indexOf(this.ruleName);
      if (e >= 0) {
        if (this.args.length > 0)
          throw new Error(
            "Parameterized rules cannot be passed as arguments to another rule."
          );
        return new N(e).withSource(this.source);
      } else
        return (
          this.args.forEach((t, n, i) => {
            i[n] = t.introduceParams(r);
          }),
          this
        );
    }),
    (f.prototype.isNullable = function (r) {
      return this._isNullable(r, Object.create(null));
    }),
    (f.prototype._isNullable = E("_isNullable")),
    (w._isNullable =
      O.prototype._isNullable =
      N.prototype._isNullable =
      J.prototype._isNullable =
      _.prototype._isNullable =
        function (r, e) {
          return !1;
        }),
    (A._isNullable = function (r, e) {
      return !0;
    }),
    (S.prototype._isNullable = function (r, e) {
      return typeof this.obj == "string" ? this.obj === "" : !1;
    }),
    (y.prototype._isNullable = function (r, e) {
      return (
        this.terms.length === 0 || this.terms.some((t) => t._isNullable(r, e))
      );
    }),
    (x.prototype._isNullable = function (r, e) {
      return this.factors.every((t) => t._isNullable(r, e));
    }),
    (H.prototype._isNullable =
      B.prototype._isNullable =
      P.prototype._isNullable =
      F.prototype._isNullable =
        function (r, e) {
          return !0;
        }),
    (D.prototype._isNullable = function (r, e) {
      return this.expr._isNullable(r, e);
    }),
    (g.prototype._isNullable = function (r, e) {
      const t = this.toMemoKey();
      if (!Object.prototype.hasOwnProperty.call(e, t)) {
        const { body: n } = r.rules[this.ruleName],
          i = n.substituteParams(this.args);
        (e[t] = !1), (e[t] = i._isNullable(r, e));
      }
      return e[t];
    }),
    (f.prototype.substituteParams = E("substituteParams")),
    (w.substituteParams =
      A.substituteParams =
      S.prototype.substituteParams =
      O.prototype.substituteParams =
      _.prototype.substituteParams =
        function (r) {
          return this;
        }),
    (N.prototype.substituteParams = function (r) {
      return r[this.index];
    }),
    (y.prototype.substituteParams = function (r) {
      return new y(this.terms.map((e) => e.substituteParams(r)));
    }),
    (x.prototype.substituteParams = function (r) {
      return new x(this.factors.map((e) => e.substituteParams(r)));
    }),
    (R.prototype.substituteParams =
      P.prototype.substituteParams =
      F.prototype.substituteParams =
      D.prototype.substituteParams =
        function (r) {
          return new this.constructor(this.expr.substituteParams(r));
        }),
    (g.prototype.substituteParams = function (r) {
      if (this.args.length === 0) return this;
      {
        const e = this.args.map((t) => t.substituteParams(r));
        return new g(this.ruleName, e);
      }
    });
  function st(r) {
    return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(r);
  }
  function we(r) {
    const e = Object.create(null);
    r.forEach((t) => {
      e[t] = (e[t] || 0) + 1;
    }),
      Object.keys(e).forEach((t) => {
        if (e[t] <= 1) return;
        let n = 1;
        r.forEach((i, s) => {
          i === t && (r[s] = i + "_" + n++);
        });
      });
  }
  (f.prototype.toArgumentNameList = E("toArgumentNameList")),
    (w.toArgumentNameList = function (r, e) {
      return ["any"];
    }),
    (A.toArgumentNameList = function (r, e) {
      return ["end"];
    }),
    (S.prototype.toArgumentNameList = function (r, e) {
      return typeof this.obj == "string" && /^[_a-zA-Z0-9]+$/.test(this.obj)
        ? ["_" + this.obj]
        : ["$" + r];
    }),
    (O.prototype.toArgumentNameList = function (r, e) {
      let t = this.from + "_to_" + this.to;
      return st(t) || (t = "_" + t), st(t) || (t = "$" + r), [t];
    }),
    (y.prototype.toArgumentNameList = function (r, e) {
      const t = this.terms.map((s) => s.toArgumentNameList(r, !0)),
        n = [],
        i = t[0].length;
      for (let s = 0; s < i; s++) {
        const o = [];
        for (let u = 0; u < this.terms.length; u++) o.push(t[u][s]);
        const l = ze(o);
        n.push(l.join("_or_"));
      }
      return e || we(n), n;
    }),
    (x.prototype.toArgumentNameList = function (r, e) {
      let t = [];
      return (
        this.factors.forEach((n) => {
          const i = n.toArgumentNameList(r, !0);
          (t = t.concat(i)), (r += i.length);
        }),
        e || we(t),
        t
      );
    }),
    (R.prototype.toArgumentNameList = function (r, e) {
      const t = this.expr
        .toArgumentNameList(r, e)
        .map((n) => (n[n.length - 1] === "s" ? n + "es" : n + "s"));
      return e || we(t), t;
    }),
    (B.prototype.toArgumentNameList = function (r, e) {
      return this.expr
        .toArgumentNameList(r, e)
        .map((t) => "opt" + t[0].toUpperCase() + t.slice(1));
    }),
    (P.prototype.toArgumentNameList = function (r, e) {
      return [];
    }),
    (F.prototype.toArgumentNameList = D.prototype.toArgumentNameList =
      function (r, e) {
        return this.expr.toArgumentNameList(r, e);
      }),
    (g.prototype.toArgumentNameList = function (r, e) {
      return [this.ruleName];
    }),
    (_.prototype.toArgumentNameList = function (r, e) {
      return ["$" + r];
    }),
    (N.prototype.toArgumentNameList = function (r, e) {
      return ["param" + this.index];
    }),
    (f.prototype.toDisplayString = E("toDisplayString")),
    (y.prototype.toDisplayString = x.prototype.toDisplayString =
      function () {
        return this.source
          ? this.source.trimmed().contents
          : "[" + this.constructor.name + "]";
      }),
    (w.toDisplayString =
      A.toDisplayString =
      R.prototype.toDisplayString =
      P.prototype.toDisplayString =
      F.prototype.toDisplayString =
      D.prototype.toDisplayString =
      S.prototype.toDisplayString =
      O.prototype.toDisplayString =
      N.prototype.toDisplayString =
        function () {
          return this.toString();
        }),
    (g.prototype.toDisplayString = function () {
      if (this.args.length > 0) {
        const r = this.args.map((e) => e.toDisplayString());
        return this.ruleName + "<" + r.join(",") + ">";
      } else return this.ruleName;
    }),
    (_.prototype.toDisplayString = function () {
      return "Unicode [" + this.category + "] character";
    });
  function gr(r) {
    return r === "description" || r === "string" || r === "code";
  }
  class T {
    constructor(e, t, n) {
      if (!gr(n)) throw new Error("invalid Failure type: " + n);
      (this.pexpr = e), (this.text = t), (this.type = n), (this.fluffy = !1);
    }
    getPExpr() {
      return this.pexpr;
    }
    getText() {
      return this.text;
    }
    getType() {
      return this.type;
    }
    isDescription() {
      return this.type === "description";
    }
    isStringTerminal() {
      return this.type === "string";
    }
    isCode() {
      return this.type === "code";
    }
    isFluffy() {
      return this.fluffy;
    }
    makeFluffy() {
      this.fluffy = !0;
    }
    clearFluffy() {
      this.fluffy = !1;
    }
    subsumes(e) {
      return (
        this.getText() === e.getText() &&
        this.type === e.type &&
        (!this.isFluffy() || (this.isFluffy() && e.isFluffy()))
      );
    }
    toString() {
      return this.type === "string"
        ? JSON.stringify(this.getText())
        : this.getText();
    }
    clone() {
      const e = new T(this.pexpr, this.text, this.type);
      return this.isFluffy() && e.makeFluffy(), e;
    }
    toKey() {
      return this.toString() + "#" + this.type;
    }
  }
  (f.prototype.toFailure = E("toFailure")),
    (w.toFailure = function (r) {
      return new T(this, "any object", "description");
    }),
    (A.toFailure = function (r) {
      return new T(this, "end of input", "description");
    }),
    (S.prototype.toFailure = function (r) {
      return new T(this, this.obj, "string");
    }),
    (O.prototype.toFailure = function (r) {
      return new T(
        this,
        JSON.stringify(this.from) + ".." + JSON.stringify(this.to),
        "code"
      );
    }),
    (P.prototype.toFailure = function (r) {
      const e = this.expr === w ? "nothing" : "not " + this.expr.toFailure(r);
      return new T(this, e, "description");
    }),
    (F.prototype.toFailure = function (r) {
      return this.expr.toFailure(r);
    }),
    (g.prototype.toFailure = function (r) {
      let { description: e } = r.rules[this.ruleName];
      return (
        e ||
          (e =
            (/^[aeiouAEIOU]/.test(this.ruleName) ? "an" : "a") +
            " " +
            this.ruleName),
        new T(this, e, "description")
      );
    }),
    (_.prototype.toFailure = function (r) {
      return new T(
        this,
        "a Unicode [" + this.category + "] character",
        "description"
      );
    }),
    (y.prototype.toFailure = function (r) {
      const t = "(" + this.terms.map((n) => n.toFailure(r)).join(" or ") + ")";
      return new T(this, t, "description");
    }),
    (x.prototype.toFailure = function (r) {
      const t = "(" + this.factors.map((n) => n.toFailure(r)).join(" ") + ")";
      return new T(this, t, "description");
    }),
    (R.prototype.toFailure = function (r) {
      const e = "(" + this.expr.toFailure(r) + this.operator + ")";
      return new T(this, e, "description");
    }),
    (f.prototype.toString = E("toString")),
    (w.toString = function () {
      return "any";
    }),
    (A.toString = function () {
      return "end";
    }),
    (S.prototype.toString = function () {
      return JSON.stringify(this.obj);
    }),
    (O.prototype.toString = function () {
      return JSON.stringify(this.from) + ".." + JSON.stringify(this.to);
    }),
    (N.prototype.toString = function () {
      return "$" + this.index;
    }),
    (D.prototype.toString = function () {
      return "#(" + this.expr.toString() + ")";
    }),
    (y.prototype.toString = function () {
      return this.terms.length === 1
        ? this.terms[0].toString()
        : "(" + this.terms.map((r) => r.toString()).join(" | ") + ")";
    }),
    (x.prototype.toString = function () {
      return this.factors.length === 1
        ? this.factors[0].toString()
        : "(" + this.factors.map((r) => r.toString()).join(" ") + ")";
    }),
    (R.prototype.toString = function () {
      return this.expr + this.operator;
    }),
    (P.prototype.toString = function () {
      return "~" + this.expr;
    }),
    (F.prototype.toString = function () {
      return "&" + this.expr;
    }),
    (g.prototype.toString = function () {
      if (this.args.length > 0) {
        const r = this.args.map((e) => e.toString());
        return this.ruleName + "<" + r.join(",") + ">";
      } else return this.ruleName;
    }),
    (_.prototype.toString = function () {
      return "\\p{" + this.category + "}";
    });
  class Ae extends f {
    constructor(e) {
      super(), (this.obj = e);
    }
    _getString(e) {
      const t = e.currentApplication().args[this.obj.index];
      return G(t instanceof S, "expected a Terminal expression"), t.obj;
    }
    allowsSkippingPrecedingSpace() {
      return !0;
    }
    eval(e) {
      const { inputStream: t } = e,
        n = t.pos,
        i = this._getString(e);
      return t.matchString(i, !0)
        ? (e.pushBinding(new K(i.length), n), !0)
        : (e.processFailure(n, this), !1);
    }
    getArity() {
      return 1;
    }
    substituteParams(e) {
      return new Ae(this.obj.substituteParams(e));
    }
    toDisplayString() {
      return this.obj.toDisplayString() + " (case-insensitive)";
    }
    toFailure(e) {
      return new T(
        this,
        this.obj.toFailure(e) + " (case-insensitive)",
        "description"
      );
    }
    _isNullable(e, t) {
      return this.obj._isNullable(e, t);
    }
  }
  let ot;
  et((r) => {
    ot = r.rules.applySyntactic.body;
  });
  const Oe = new g("spaces");
  class vr {
    constructor(e, t, n) {
      (this.matcher = e),
        (this.startExpr = t),
        (this.grammar = e.grammar),
        (this.input = e.getInput()),
        (this.inputStream = new ce(this.input)),
        (this.memoTable = e._memoTable),
        (this.userData = void 0),
        (this.doNotMemoize = !1),
        (this._bindings = []),
        (this._bindingOffsets = []),
        (this._applicationStack = []),
        (this._posStack = [0]),
        (this.inLexifiedContextStack = [!1]),
        (this.rightmostFailurePosition = -1),
        (this._rightmostFailurePositionStack = []),
        (this._recordedFailuresStack = []),
        n !== void 0 &&
          ((this.positionToRecordFailures = n),
          (this.recordedFailures = Object.create(null)));
    }
    posToOffset(e) {
      return e - this._posStack[this._posStack.length - 1];
    }
    enterApplication(e, t) {
      this._posStack.push(this.inputStream.pos),
        this._applicationStack.push(t),
        this.inLexifiedContextStack.push(!1),
        e.enter(t),
        this._rightmostFailurePositionStack.push(this.rightmostFailurePosition),
        (this.rightmostFailurePosition = -1);
    }
    exitApplication(e, t) {
      const n = this._posStack.pop();
      this._applicationStack.pop(),
        this.inLexifiedContextStack.pop(),
        e.exit(),
        (this.rightmostFailurePosition = Math.max(
          this.rightmostFailurePosition,
          this._rightmostFailurePositionStack.pop()
        )),
        t && this.pushBinding(t, n);
    }
    enterLexifiedContext() {
      this.inLexifiedContextStack.push(!0);
    }
    exitLexifiedContext() {
      this.inLexifiedContextStack.pop();
    }
    currentApplication() {
      return this._applicationStack[this._applicationStack.length - 1];
    }
    inSyntacticContext() {
      const e = this.currentApplication();
      return e
        ? e.isSyntactic() && !this.inLexifiedContext()
        : this.startExpr.factors[0].isSyntactic();
    }
    inLexifiedContext() {
      return this.inLexifiedContextStack[
        this.inLexifiedContextStack.length - 1
      ];
    }
    skipSpaces() {
      return (
        this.pushFailuresInfo(),
        this.eval(Oe),
        this.popBinding(),
        this.popFailuresInfo(),
        this.inputStream.pos
      );
    }
    skipSpacesIfInSyntacticContext() {
      return this.inSyntacticContext()
        ? this.skipSpaces()
        : this.inputStream.pos;
    }
    maybeSkipSpacesBefore(e) {
      return e.allowsSkippingPrecedingSpace() && e !== Oe
        ? this.skipSpacesIfInSyntacticContext()
        : this.inputStream.pos;
    }
    pushBinding(e, t) {
      this._bindings.push(e), this._bindingOffsets.push(this.posToOffset(t));
    }
    popBinding() {
      this._bindings.pop(), this._bindingOffsets.pop();
    }
    numBindings() {
      return this._bindings.length;
    }
    truncateBindings(e) {
      for (; this._bindings.length > e; ) this.popBinding();
    }
    getCurrentPosInfo() {
      return this.getPosInfo(this.inputStream.pos);
    }
    getPosInfo(e) {
      let t = this.memoTable[e];
      return t || (t = this.memoTable[e] = new sr()), t;
    }
    processFailure(e, t) {
      if (
        ((this.rightmostFailurePosition = Math.max(
          this.rightmostFailurePosition,
          e
        )),
        this.recordedFailures && e === this.positionToRecordFailures)
      ) {
        const n = this.currentApplication();
        n && (t = t.substituteParams(n.args)),
          this.recordFailure(t.toFailure(this.grammar), !1);
      }
    }
    recordFailure(e, t) {
      const n = e.toKey();
      this.recordedFailures[n]
        ? this.recordedFailures[n].isFluffy() &&
          !e.isFluffy() &&
          this.recordedFailures[n].clearFluffy()
        : (this.recordedFailures[n] = t ? e.clone() : e);
    }
    recordFailures(e, t) {
      Object.keys(e).forEach((n) => {
        this.recordFailure(e[n], t);
      });
    }
    cloneRecordedFailures() {
      if (!this.recordedFailures) return;
      const e = Object.create(null);
      return (
        Object.keys(this.recordedFailures).forEach((t) => {
          e[t] = this.recordedFailures[t].clone();
        }),
        e
      );
    }
    getRightmostFailurePosition() {
      return this.rightmostFailurePosition;
    }
    _getRightmostFailureOffset() {
      return this.rightmostFailurePosition >= 0
        ? this.posToOffset(this.rightmostFailurePosition)
        : -1;
    }
    getMemoizedTraceEntry(e, t) {
      const n = this.memoTable[e];
      if (n && t instanceof g) {
        const i = n.memo[t.toMemoKey()];
        if (i && i.traceEntry) {
          const s = i.traceEntry.cloneWithExpr(t);
          return (s.isMemoized = !0), s;
        }
      }
      return null;
    }
    getTraceEntry(e, t, n, i) {
      if (t instanceof g) {
        const s = this.currentApplication(),
          o = s ? s.args : [];
        t = t.substituteParams(o);
      }
      return (
        this.getMemoizedTraceEntry(e, t) ||
        new q(this.input, e, this.inputStream.pos, t, n, i, this.trace)
      );
    }
    isTracing() {
      return !!this.trace;
    }
    hasNecessaryInfo(e) {
      return this.trace && !e.traceEntry
        ? !1
        : this.recordedFailures &&
            this.inputStream.pos + e.rightmostFailureOffset ===
              this.positionToRecordFailures
          ? !!e.failuresAtRightmostPosition
          : !0;
    }
    useMemoizedResult(e, t) {
      this.trace && this.trace.push(t.traceEntry);
      const n = this.inputStream.pos + t.rightmostFailureOffset;
      return (
        (this.rightmostFailurePosition = Math.max(
          this.rightmostFailurePosition,
          n
        )),
        this.recordedFailures &&
          this.positionToRecordFailures === n &&
          t.failuresAtRightmostPosition &&
          this.recordFailures(t.failuresAtRightmostPosition, !0),
        (this.inputStream.examinedLength = Math.max(
          this.inputStream.examinedLength,
          t.examinedLength + e
        )),
        t.value
          ? ((this.inputStream.pos += t.matchLength),
            this.pushBinding(t.value, e),
            !0)
          : !1
      );
    }
    eval(e) {
      const { inputStream: t } = this,
        n = this._bindings.length,
        i = this.userData;
      let s;
      this.recordedFailures &&
        ((s = this.recordedFailures),
        (this.recordedFailures = Object.create(null)));
      const o = t.pos,
        l = this.maybeSkipSpacesBefore(e);
      let u;
      this.trace && ((u = this.trace), (this.trace = []));
      const h = e.eval(this);
      if (this.trace) {
        const a = this._bindings.slice(n),
          c = this.getTraceEntry(l, e, h, a);
        (c.isImplicitSpaces = e === Oe),
          (c.isRootNode = e === this.startExpr),
          u.push(c),
          (this.trace = u);
      }
      return (
        h
          ? this.recordedFailures &&
            t.pos === this.positionToRecordFailures &&
            Object.keys(this.recordedFailures).forEach((a) => {
              this.recordedFailures[a].makeFluffy();
            })
          : ((t.pos = o), this.truncateBindings(n), (this.userData = i)),
        this.recordedFailures && this.recordFailures(s, !1),
        e === ot && this.skipSpaces(),
        h
      );
    }
    getMatchResult() {
      this.grammar._setUpMatchState(this), this.eval(this.startExpr);
      let e;
      this.recordedFailures &&
        (e = Object.keys(this.recordedFailures).map(
          (n) => this.recordedFailures[n]
        ));
      const t = this._bindings[0];
      return (
        t && (t.grammar = this.grammar),
        new rt(
          this.matcher,
          this.input,
          this.startExpr,
          t,
          this._bindingOffsets[0],
          this.rightmostFailurePosition,
          e
        )
      );
    }
    getTrace() {
      this.trace = [];
      const e = this.getMatchResult(),
        t = this.trace[this.trace.length - 1];
      return (t.result = e), t;
    }
    pushFailuresInfo() {
      this._rightmostFailurePositionStack.push(this.rightmostFailurePosition),
        this._recordedFailuresStack.push(this.recordedFailures);
    }
    popFailuresInfo() {
      (this.rightmostFailurePosition =
        this._rightmostFailurePositionStack.pop()),
        (this.recordedFailures = this._recordedFailuresStack.pop());
    }
  }
  class yr {
    constructor(e) {
      (this.grammar = e),
        (this._memoTable = []),
        (this._input = ""),
        (this._isMemoTableStale = !1);
    }
    _resetMemoTable() {
      (this._memoTable = []), (this._isMemoTableStale = !1);
    }
    getInput() {
      return this._input;
    }
    setInput(e) {
      return (
        this._input !== e && this.replaceInputRange(0, this._input.length, e),
        this
      );
    }
    replaceInputRange(e, t, n) {
      const i = this._input,
        s = this._memoTable;
      if (e < 0 || e > i.length || t < 0 || t > i.length || e > t)
        throw new Error("Invalid indices: " + e + " and " + t);
      (this._input = i.slice(0, e) + n + i.slice(t)),
        this._input !== i && s.length > 0 && (this._isMemoTableStale = !0);
      const o = s.slice(t);
      s.length = e;
      for (let l = 0; l < n.length; l++) s.push(void 0);
      for (const l of o) s.push(l);
      for (let l = 0; l < e; l++) {
        const u = s[l];
        u && u.clearObsoleteEntries(l, e);
      }
      return this;
    }
    match(e, t = { incremental: !0 }) {
      return this._match(this._getStartExpr(e), {
        incremental: t.incremental,
        tracing: !1,
      });
    }
    trace(e, t = { incremental: !0 }) {
      return this._match(this._getStartExpr(e), {
        incremental: t.incremental,
        tracing: !0,
      });
    }
    _match(e, t = {}) {
      const n = {
        tracing: !1,
        incremental: !0,
        positionToRecordFailures: void 0,
        ...t,
      };
      if (!n.incremental) this._resetMemoTable();
      else if (
        this._isMemoTableStale &&
        !this.grammar.supportsIncrementalParsing
      )
        throw qt(this.grammar);
      const i = new vr(this, e, n.positionToRecordFailures);
      return n.tracing ? i.getTrace() : i.getMatchResult();
    }
    _getStartExpr(e) {
      const t = e || this.grammar.defaultStartRule;
      if (!t)
        throw new Error(
          "Missing start rule argument -- the grammar has no default start rule."
        );
      const n = this.grammar.parseApplication(t);
      return new x([n, A]);
    }
  }
  const Q = [],
    Ne = (r, e) => Object.prototype.hasOwnProperty.call(r, e);
  class at {
    constructor(e, t, n) {
      (this._node = e),
        (this.source = t),
        (this._baseInterval = n),
        e.isNonterminal() && G(t === n),
        (this._childWrappers = []);
    }
    _forgetMemoizedResultFor(e) {
      delete this._node[this._semantics.attributeKeys[e]],
        this.children.forEach((t) => {
          t._forgetMemoizedResultFor(e);
        });
    }
    child(e) {
      if (!(0 <= e && e < this._node.numChildren())) return;
      let t = this._childWrappers[e];
      if (!t) {
        const n = this._node.childAt(e),
          i = this._node.childOffsets[e],
          s = this._baseInterval.subInterval(i, n.matchLength),
          o = n.isNonterminal() ? s : this._baseInterval;
        t = this._childWrappers[e] = this._semantics.wrap(n, s, o);
      }
      return t;
    }
    _children() {
      for (let e = 0; e < this._node.numChildren(); e++) this.child(e);
      return this._childWrappers;
    }
    isIteration() {
      return this._node.isIteration();
    }
    isTerminal() {
      return this._node.isTerminal();
    }
    isNonterminal() {
      return this._node.isNonterminal();
    }
    isSyntactic() {
      return this.isNonterminal() && this._node.isSyntactic();
    }
    isLexical() {
      return this.isNonterminal() && this._node.isLexical();
    }
    isOptional() {
      return this._node.isOptional();
    }
    iteration(e) {
      const t = e || [],
        n = t.map((o) => o._node),
        i = new it(n, [], -1, !1),
        s = this._semantics.wrap(i, null, null);
      return (s._childWrappers = t), s;
    }
    get children() {
      return this._children();
    }
    get ctorName() {
      return this._node.ctorName;
    }
    get numChildren() {
      return this._node.numChildren();
    }
    get sourceString() {
      return this.source.contents;
    }
  }
  class k {
    constructor(e, t) {
      const n = this;
      if (
        ((this.grammar = e),
        (this.checkedActionDicts = !1),
        (this.Wrapper = class extends (t ? t.Wrapper : at) {
          constructor(i, s, o) {
            super(i, s, o),
              n.checkActionDictsIfHaventAlready(),
              (this._semantics = n);
          }
          toString() {
            return "[semantics wrapper for " + n.grammar.name + "]";
          }
        }),
        (this.super = t),
        t)
      ) {
        if (
          !(e.equals(this.super.grammar) || e._inheritsFrom(this.super.grammar))
        )
          throw new Error(
            "Cannot extend a semantics for grammar '" +
              this.super.grammar.name +
              "' for use with grammar '" +
              e.name +
              "' (not a sub-grammar)"
          );
        (this.operations = Object.create(this.super.operations)),
          (this.attributes = Object.create(this.super.attributes)),
          (this.attributeKeys = Object.create(null));
        for (const i in this.attributes)
          Object.defineProperty(this.attributeKeys, i, { value: tt(i) });
      } else
        (this.operations = Object.create(null)),
          (this.attributes = Object.create(null)),
          (this.attributeKeys = Object.create(null));
    }
    toString() {
      return "[semantics for " + this.grammar.name + "]";
    }
    checkActionDictsIfHaventAlready() {
      this.checkedActionDicts ||
        (this.checkActionDicts(), (this.checkedActionDicts = !0));
    }
    checkActionDicts() {
      let e;
      for (e in this.operations)
        this.operations[e].checkActionDict(this.grammar);
      for (e in this.attributes)
        this.attributes[e].checkActionDict(this.grammar);
    }
    toRecipe(e) {
      function t(i) {
        return i.super !== k.BuiltInSemantics._getSemantics();
      }
      let n = `(function(g) {
`;
      if (t(this)) {
        n += "  var semantics = " + this.super.toRecipe(!0) + "(g";
        const i = this.super.grammar;
        let s = this.grammar;
        for (; s !== i; ) (n += ".superGrammar"), (s = s.superGrammar);
        (n += `);
`),
          (n += "  return g.extendSemantics(semantics)");
      } else n += "  return g.createSemantics()";
      return (
        ["Operation", "Attribute"].forEach((i) => {
          const s = this[i.toLowerCase() + "s"];
          Object.keys(s).forEach((o) => {
            const { actionDict: l, formals: u, builtInDefault: h } = s[o];
            let a = o;
            u.length > 0 && (a += "(" + u.join(", ") + ")");
            let c;
            t(this) && this.super[i.toLowerCase() + "s"][o]
              ? (c = "extend" + i)
              : (c = "add" + i),
              (n +=
                `
    .` +
                c +
                "(" +
                JSON.stringify(a) +
                ", {");
            const p = [];
            Object.keys(l).forEach((m) => {
              if (l[m] !== h) {
                let d = l[m].toString().trim();
                (d = d.replace(/^.*\(/, "function(")),
                  p.push(
                    `
      ` +
                      JSON.stringify(m) +
                      ": " +
                      d
                  );
              }
            }),
              (n +=
                p.join(",") +
                `
    })`);
          });
        }),
        (n += `;
  })`),
        e ||
          (n =
            `(function() {
  var grammar = this.fromRecipe(` +
            this.grammar.toRecipe() +
            `);
  var semantics = ` +
            n +
            `(grammar);
  return semantics;
});
`),
        n
      );
    }
    addOperationOrAttribute(e, t, n) {
      const i = e + "s",
        s = ct(t, e),
        { name: o } = s,
        { formals: l } = s;
      this.assertNewName(o, e);
      const u = Ir(e, o, c),
        h = { _default: u };
      Object.keys(n).forEach((p) => {
        h[p] = n[p];
      });
      const a = e === "operation" ? new Z(o, l, h, u) : new Le(o, h, u);
      a.checkActionDict(this.grammar), (this[i][o] = a);
      function c(...p) {
        const m = this._semantics[i][o];
        if (arguments.length !== m.formals.length)
          throw new Error(
            "Invalid number of arguments passed to " +
              o +
              " " +
              e +
              " (expected " +
              m.formals.length +
              ", got " +
              arguments.length +
              ")"
          );
        const d = Object.create(null);
        for (const [V, X] of Object.entries(p)) {
          const $r = m.formals[V];
          d[$r] = X;
        }
        const I = this.args;
        this.args = d;
        const b = m.execute(this._semantics, this);
        return (this.args = I), b;
      }
      e === "operation"
        ? ((this.Wrapper.prototype[o] = c),
          (this.Wrapper.prototype[o].toString = function () {
            return "[" + o + " operation]";
          }))
        : (Object.defineProperty(this.Wrapper.prototype, o, {
            get: c,
            configurable: !0,
          }),
          Object.defineProperty(this.attributeKeys, o, { value: tt(o) }));
    }
    extendOperationOrAttribute(e, t, n) {
      const i = e + "s";
      if ((ct(t, "attribute"), !(this.super && t in this.super[i])))
        throw new Error(
          "Cannot extend " +
            e +
            " '" +
            t +
            "': did not inherit an " +
            e +
            " with that name"
        );
      if (Ne(this[i], t))
        throw new Error("Cannot extend " + e + " '" + t + "' again");
      const s = this[i][t].formals,
        o = this[i][t].actionDict,
        l = Object.create(o);
      Object.keys(n).forEach((u) => {
        l[u] = n[u];
      }),
        (this[i][t] = e === "operation" ? new Z(t, s, l) : new Le(t, l)),
        this[i][t].checkActionDict(this.grammar);
    }
    assertNewName(e, t) {
      if (Ne(at.prototype, e))
        throw new Error(
          "Cannot add " + t + " '" + e + "': that's a reserved name"
        );
      if (e in this.operations)
        throw new Error(
          "Cannot add " +
            t +
            " '" +
            e +
            "': an operation with that name already exists"
        );
      if (e in this.attributes)
        throw new Error(
          "Cannot add " +
            t +
            " '" +
            e +
            "': an attribute with that name already exists"
        );
    }
    wrap(e, t, n) {
      const i = n || t;
      return e instanceof this.Wrapper ? e : new this.Wrapper(e, t, i);
    }
  }
  function ct(r, e) {
    if (!k.prototypeGrammar)
      return G(r.indexOf("(") === -1), { name: r, formals: [] };
    const t = k.prototypeGrammar.match(
      r,
      e === "operation" ? "OperationSignature" : "AttributeSignature"
    );
    if (t.failed()) throw new Error(t.message);
    return k.prototypeGrammarSemantics(t).parse();
  }
  function Ir(r, e, t) {
    return function (...n) {
      const s = (
        this._semantics.operations[e] || this._semantics.attributes[e]
      ).formals.map((o) => this.args[o]);
      if (!this.isIteration() && n.length === 1) return t.apply(n[0], s);
      throw Xt(this.ctorName, e, r, Q);
    };
  }
  k.createSemantics = function (r, e) {
    const t = new k(r, e !== void 0 ? e : k.BuiltInSemantics._getSemantics()),
      n = function (s) {
        if (!(s instanceof rt))
          throw new TypeError(
            "Semantics expected a MatchResult, but got " + ve(s)
          );
        if (s.failed())
          throw new TypeError("cannot apply Semantics to " + s.toString());
        const o = s._cst;
        if (o.grammar !== r)
          throw new Error(
            "Cannot use a MatchResult from grammar '" +
              o.grammar.name +
              "' with a semantics for '" +
              r.name +
              "'"
          );
        const l = new ce(s.input);
        return t.wrap(o, l.interval(s._cstOffset, s.input.length));
      };
    return (
      (n.addOperation = function (i, s) {
        return t.addOperationOrAttribute("operation", i, s), n;
      }),
      (n.extendOperation = function (i, s) {
        return t.extendOperationOrAttribute("operation", i, s), n;
      }),
      (n.addAttribute = function (i, s) {
        return t.addOperationOrAttribute("attribute", i, s), n;
      }),
      (n.extendAttribute = function (i, s) {
        return t.extendOperationOrAttribute("attribute", i, s), n;
      }),
      (n._getActionDict = function (i) {
        const s = t.operations[i] || t.attributes[i];
        if (!s)
          throw new Error(
            '"' +
              i +
              '" is not a valid operation or attribute name in this semantics for "' +
              r.name +
              '"'
          );
        return s.actionDict;
      }),
      (n._remove = function (i) {
        let s;
        return (
          i in t.operations
            ? ((s = t.operations[i]), delete t.operations[i])
            : i in t.attributes &&
              ((s = t.attributes[i]), delete t.attributes[i]),
          delete t.Wrapper.prototype[i],
          s
        );
      }),
      (n.getOperationNames = function () {
        return Object.keys(t.operations);
      }),
      (n.getAttributeNames = function () {
        return Object.keys(t.attributes);
      }),
      (n.getGrammar = function () {
        return t.grammar;
      }),
      (n.toRecipe = function (i) {
        return t.toRecipe(i);
      }),
      (n.toString = t.toString.bind(t)),
      (n._getSemantics = function () {
        return t;
      }),
      n
    );
  };
  class Z {
    constructor(e, t, n, i) {
      (this.name = e),
        (this.formals = t),
        (this.actionDict = n),
        (this.builtInDefault = i);
    }
    checkActionDict(e) {
      e._checkTopDownActionDict(this.typeName, this.name, this.actionDict);
    }
    execute(e, t) {
      try {
        const { ctorName: n } = t._node;
        let i = this.actionDict[n];
        return i
          ? (Q.push([this, n]), i.apply(t, t._children()))
          : t.isNonterminal() && ((i = this.actionDict._nonterminal), i)
            ? (Q.push([this, "_nonterminal", n]), i.apply(t, t._children()))
            : (Q.push([this, "default action", n]),
              this.actionDict._default.apply(t, t._children()));
      } finally {
        Q.pop();
      }
    }
  }
  Z.prototype.typeName = "operation";
  class Le extends Z {
    constructor(e, t, n) {
      super(e, [], t, n);
    }
    execute(e, t) {
      const n = t._node,
        i = e.attributeKeys[this.name];
      return Ne(n, i) || (n[i] = Z.prototype.execute.call(this, e, t)), n[i];
    }
  }
  Le.prototype.typeName = "attribute";
  const ut = ["_iter", "_terminal", "_nonterminal", "_default"];
  function lt(r) {
    return Object.keys(r.rules)
      .sort()
      .map((e) => r.rules[e]);
  }
  const xr = (r) =>
    r.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  let pt, ht;
  class C {
    constructor(e, t, n, i) {
      if (((this.name = e), (this.superGrammar = t), (this.rules = n), i)) {
        if (!(i in n))
          throw new Error(
            "Invalid start rule: '" +
              i +
              "' is not a rule in grammar '" +
              e +
              "'"
          );
        this.defaultStartRule = i;
      }
      (this._matchStateInitializer = void 0),
        (this.supportsIncrementalParsing = !0);
    }
    matcher() {
      return new yr(this);
    }
    isBuiltIn() {
      return this === C.ProtoBuiltInRules || this === C.BuiltInRules;
    }
    equals(e) {
      if (this === e) return !0;
      if (
        e == null ||
        this.name !== e.name ||
        this.defaultStartRule !== e.defaultStartRule ||
        !(
          this.superGrammar === e.superGrammar ||
          this.superGrammar.equals(e.superGrammar)
        )
      )
        return !1;
      const t = lt(this),
        n = lt(e);
      return (
        t.length === n.length &&
        t.every(
          (i, s) =>
            i.description === n[s].description &&
            i.formals.join(",") === n[s].formals.join(",") &&
            i.body.toString() === n[s].body.toString()
        )
      );
    }
    match(e, t) {
      const n = this.matcher();
      return n.replaceInputRange(0, 0, e), n.match(t);
    }
    trace(e, t) {
      const n = this.matcher();
      return n.replaceInputRange(0, 0, e), n.trace(t);
    }
    createSemantics() {
      return k.createSemantics(this);
    }
    extendSemantics(e) {
      return k.createSemantics(this, e._getSemantics());
    }
    _checkTopDownActionDict(e, t, n) {
      const i = [];
      for (const s in n) {
        const o = n[s];
        if (!ut.includes(s) && !(s in this.rules)) {
          i.push(`'${s}' is not a valid semantic action for '${this.name}'`);
          continue;
        }
        if (typeof o != "function") {
          i.push(
            `'${s}' must be a function in an action dictionary for '${this.name}'`
          );
          continue;
        }
        const u = o.length,
          h = this._topDownActionArity(s);
        if (u !== h) {
          let a;
          s === "_iter" || s === "_nonterminal"
            ? (a = `it should use a rest parameter, e.g. \`${s}(...children) {}\`. NOTE: this is new in Ohm v16 — see https://ohmjs.org/d/ati for details.`)
            : (a = `expected ${h}, got ${u}`),
            i.push(`Semantic action '${s}' has the wrong arity: ${a}`);
        }
      }
      if (i.length > 0) {
        const s = i.map((l) => "- " + l),
          o = new Error(
            [`Found errors in the action dictionary of the '${t}' ${e}:`, ...s]
              .join(`
`)
          );
        throw ((o.problems = i), o);
      }
    }
    _topDownActionArity(e) {
      return ut.includes(e) ? 0 : this.rules[e].body.getArity();
    }
    _inheritsFrom(e) {
      let t = this.superGrammar;
      for (; t; ) {
        if (t.equals(e, !0)) return !0;
        t = t.superGrammar;
      }
      return !1;
    }
    toRecipe(e = void 0) {
      const t = {};
      this.source && (t.source = this.source.contents);
      let n = null;
      this.defaultStartRule && (n = this.defaultStartRule);
      const i = {};
      Object.keys(this.rules).forEach((l) => {
        const u = this.rules[l],
          { body: h } = u,
          a = !this.superGrammar || !this.superGrammar.rules[l];
        let c;
        a ? (c = "define") : (c = h instanceof oe ? "extend" : "override");
        const p = {};
        if (u.source && this.source) {
          const I = u.source.relativeTo(this.source);
          p.sourceInterval = [I.startIdx, I.endIdx];
        }
        const m = a ? u.description : null,
          d = h.outputRecipe(u.formals, this.source);
        i[l] = [c, p, m, u.formals, d];
      });
      let s = "null";
      e
        ? (s = e)
        : this.superGrammar &&
          !this.superGrammar.isBuiltIn() &&
          (s = this.superGrammar.toRecipe());
      const o = [
        ...["grammar", t, this.name].map(JSON.stringify),
        s,
        ...[n, i].map(JSON.stringify),
      ];
      return xr(`[${o.join(",")}]`);
    }
    toOperationActionDictionaryTemplate() {
      return this._toOperationOrAttributeActionDictionaryTemplate();
    }
    toAttributeActionDictionaryTemplate() {
      return this._toOperationOrAttributeActionDictionaryTemplate();
    }
    _toOperationOrAttributeActionDictionaryTemplate() {
      const e = new $();
      e.append("{");
      let t = !0;
      for (const n in this.rules) {
        const { body: i } = this.rules[n];
        t ? (t = !1) : e.append(","),
          e.append(`
`),
          e.append("  "),
          this.addSemanticActionTemplate(n, i, e);
      }
      return (
        e.append(`
}`),
        e.contents()
      );
    }
    addSemanticActionTemplate(e, t, n) {
      n.append(e), n.append(": function(");
      const i = this._topDownActionArity(e);
      n.append(se("_", i).join(", ")),
        n.append(`) {
`),
        n.append("  }");
    }
    parseApplication(e) {
      let t;
      if (e.indexOf("<") === -1) t = new g(e);
      else {
        const i = pt.match(e, "Base_application");
        t = ht(i, {});
      }
      if (!(t.ruleName in this.rules)) throw Ke(t.ruleName, this.name);
      const { formals: n } = this.rules[t.ruleName];
      if (n.length !== t.args.length) {
        const { source: i } = this.rules[t.ruleName];
        throw We(t.ruleName, n.length, t.args.length, i);
      }
      return t;
    }
    _setUpMatchState(e) {
      this._matchStateInitializer && this._matchStateInitializer(e);
    }
  }
  (C.ProtoBuiltInRules = new C("ProtoBuiltInRules", void 0, {
    any: { body: w, formals: [], description: "any character", primitive: !0 },
    end: { body: A, formals: [], description: "end of input", primitive: !0 },
    caseInsensitive: {
      body: new Ae(new N(0)),
      formals: ["str"],
      primitive: !0,
    },
    lower: {
      body: new _("Ll"),
      formals: [],
      description: "a lowercase letter",
      primitive: !0,
    },
    upper: {
      body: new _("Lu"),
      formals: [],
      description: "an uppercase letter",
      primitive: !0,
    },
    unicodeLtmo: {
      body: new _("Ltmo"),
      formals: [],
      description: "a Unicode character in Lt, Lm, or Lo",
      primitive: !0,
    },
    spaces: { body: new H(new g("space")), formals: [] },
    space: { body: new O("\0", " "), formals: [], description: "a space" },
  })),
    (C.initApplicationParser = function (r, e) {
      (pt = r), (ht = e);
    });
  class mt {
    constructor(e) {
      this.name = e;
    }
    sourceInterval(e, t) {
      return this.source.subInterval(e, t - e);
    }
    ensureSuperGrammar() {
      return (
        this.superGrammar ||
          this.withSuperGrammar(
            this.name === "BuiltInRules" ? C.ProtoBuiltInRules : C.BuiltInRules
          ),
        this.superGrammar
      );
    }
    ensureSuperGrammarRuleForOverriding(e, t) {
      const n = this.ensureSuperGrammar().rules[e];
      if (!n) throw zt(e, this.superGrammar.name, t);
      return n;
    }
    installOverriddenOrExtendedRule(e, t, n, i) {
      const s = de(t);
      if (s.length > 0) throw Je(e, s, i);
      const o = this.ensureSuperGrammar().rules[e],
        l = o.formals,
        u = l ? l.length : 0;
      if (t.length !== u) throw We(e, u, t.length, i);
      return this.install(e, t, n, o.description, i);
    }
    install(e, t, n, i, s, o = !1) {
      return (
        (this.rules[e] = {
          body: n.introduceParams(t),
          formals: t,
          description: i,
          source: s,
          primitive: o,
        }),
        this
      );
    }
    withSuperGrammar(e) {
      if (this.superGrammar)
        throw new Error(
          "the super grammar of a GrammarDecl cannot be set more than once"
        );
      return (
        (this.superGrammar = e),
        (this.rules = Object.create(e.rules)),
        e.isBuiltIn() || (this.defaultStartRule = e.defaultStartRule),
        this
      );
    }
    withDefaultStartRule(e) {
      return (this.defaultStartRule = e), this;
    }
    withSource(e) {
      return (this.source = new ce(e).interval(0, e.length)), this;
    }
    build() {
      const e = new C(
        this.name,
        this.ensureSuperGrammar(),
        this.rules,
        this.defaultStartRule
      );
      (e._matchStateInitializer = e.superGrammar._matchStateInitializer),
        (e.supportsIncrementalParsing =
          e.superGrammar.supportsIncrementalParsing);
      const t = [];
      let n = !1;
      return (
        Object.keys(e.rules).forEach((i) => {
          const { body: s } = e.rules[i];
          try {
            s.assertChoicesHaveUniformArity(i);
          } catch (o) {
            t.push(o);
          }
          try {
            s.assertAllApplicationsAreValid(i, e);
          } catch (o) {
            t.push(o), (n = !0);
          }
        }),
        n ||
          Object.keys(e.rules).forEach((i) => {
            const { body: s } = e.rules[i];
            try {
              s.assertIteratedExprsAreNotNullable(e, []);
            } catch (o) {
              t.push(o);
            }
          }),
        t.length > 0 && er(t),
        this.source && (e.source = this.source),
        e
      );
    }
    define(e, t, n, i, s, o) {
      if ((this.ensureSuperGrammar(), this.superGrammar.rules[e]))
        throw Ve(e, this.name, this.superGrammar.name, s);
      if (this.rules[e]) throw Ve(e, this.name, this.name, s);
      const l = de(t);
      if (l.length > 0) throw Je(e, l, s);
      return this.install(e, t, n, i, s, o);
    }
    override(e, t, n, i, s) {
      return (
        this.ensureSuperGrammarRuleForOverriding(e, s),
        this.installOverriddenOrExtendedRule(e, t, n, s),
        this
      );
    }
    extend(e, t, n, i, s) {
      if (!this.ensureSuperGrammar().rules[e])
        throw Ut(e, this.superGrammar.name, s);
      const l = new oe(this.superGrammar, e, n);
      return (
        (l.source = n.source),
        this.installOverriddenOrExtendedRule(e, t, l, s),
        this
      );
    }
  }
  class le {
    constructor() {
      (this.currentDecl = null), (this.currentRuleName = null);
    }
    newGrammar(e) {
      return new mt(e);
    }
    grammar(e, t, n, i, s) {
      const o = new mt(t);
      return (
        n && o.withSuperGrammar(n instanceof C ? n : this.fromRecipe(n)),
        i && o.withDefaultStartRule(i),
        e && e.source && o.withSource(e.source),
        (this.currentDecl = o),
        Object.keys(s).forEach((l) => {
          this.currentRuleName = l;
          const u = s[l],
            h = u[0],
            a = u[1],
            c = u[2],
            p = u[3],
            m = this.fromRecipe(u[4]);
          let d;
          o.source &&
            a &&
            a.sourceInterval &&
            (d = o.source.subInterval(
              a.sourceInterval[0],
              a.sourceInterval[1] - a.sourceInterval[0]
            )),
            o[h](l, p, m, c, d);
        }),
        (this.currentRuleName = this.currentDecl = null),
        o.build()
      );
    }
    terminal(e) {
      return new S(e);
    }
    range(e, t) {
      return new O(e, t);
    }
    param(e) {
      return new N(e);
    }
    alt(...e) {
      let t = [];
      for (let n of e)
        n instanceof f || (n = this.fromRecipe(n)),
          n instanceof y ? (t = t.concat(n.terms)) : t.push(n);
      return t.length === 1 ? t[0] : new y(t);
    }
    seq(...e) {
      let t = [];
      for (let n of e)
        n instanceof f || (n = this.fromRecipe(n)),
          n instanceof x ? (t = t.concat(n.factors)) : t.push(n);
      return t.length === 1 ? t[0] : new x(t);
    }
    star(e) {
      return e instanceof f || (e = this.fromRecipe(e)), new H(e);
    }
    plus(e) {
      return e instanceof f || (e = this.fromRecipe(e)), new J(e);
    }
    opt(e) {
      return e instanceof f || (e = this.fromRecipe(e)), new B(e);
    }
    not(e) {
      return e instanceof f || (e = this.fromRecipe(e)), new P(e);
    }
    lookahead(e) {
      return e instanceof f || (e = this.fromRecipe(e)), new F(e);
    }
    lex(e) {
      return e instanceof f || (e = this.fromRecipe(e)), new D(e);
    }
    app(e, t) {
      return (
        t &&
          t.length > 0 &&
          (t = t.map(function (n) {
            return n instanceof f ? n : this.fromRecipe(n);
          }, this)),
        new g(e, t)
      );
    }
    splice(e, t) {
      return new ae(
        this.currentDecl.superGrammar,
        this.currentRuleName,
        e.map((n) => this.fromRecipe(n)),
        t.map((n) => this.fromRecipe(n))
      );
    }
    fromRecipe(e) {
      const t = e[0] === "grammar" ? e.slice(1) : e.slice(2),
        n = this[e[0]](...t),
        i = e[1];
      return (
        i &&
          i.sourceInterval &&
          this.currentDecl &&
          n.withSource(this.currentDecl.sourceInterval(...i.sourceInterval)),
        n
      );
    }
  }
  function Ee(r) {
    return typeof r == "function"
      ? r.call(new le())
      : (typeof r == "string" && (r = JSON.parse(r)), new le().fromRecipe(r));
  }
  var Re = Ee([
    "grammar",
    {
      source: `BuiltInRules {

  alnum  (an alpha-numeric character)
    = letter
    | digit

  letter  (a letter)
    = lower
    | upper
    | unicodeLtmo

  digit  (a digit)
    = "0".."9"

  hexDigit  (a hexadecimal digit)
    = digit
    | "a".."f"
    | "A".."F"

  ListOf<elem, sep>
    = NonemptyListOf<elem, sep>
    | EmptyListOf<elem, sep>

  NonemptyListOf<elem, sep>
    = elem (sep elem)*

  EmptyListOf<elem, sep>
    = /* nothing */

  listOf<elem, sep>
    = nonemptyListOf<elem, sep>
    | emptyListOf<elem, sep>

  nonemptyListOf<elem, sep>
    = elem (sep elem)*

  emptyListOf<elem, sep>
    = /* nothing */

  // Allows a syntactic rule application within a lexical context.
  applySyntactic<app> = app
}`,
    },
    "BuiltInRules",
    null,
    null,
    {
      alnum: [
        "define",
        { sourceInterval: [18, 78] },
        "an alpha-numeric character",
        [],
        [
          "alt",
          { sourceInterval: [60, 78] },
          ["app", { sourceInterval: [60, 66] }, "letter", []],
          ["app", { sourceInterval: [73, 78] }, "digit", []],
        ],
      ],
      letter: [
        "define",
        { sourceInterval: [82, 142] },
        "a letter",
        [],
        [
          "alt",
          { sourceInterval: [107, 142] },
          ["app", { sourceInterval: [107, 112] }, "lower", []],
          ["app", { sourceInterval: [119, 124] }, "upper", []],
          ["app", { sourceInterval: [131, 142] }, "unicodeLtmo", []],
        ],
      ],
      digit: [
        "define",
        { sourceInterval: [146, 177] },
        "a digit",
        [],
        ["range", { sourceInterval: [169, 177] }, "0", "9"],
      ],
      hexDigit: [
        "define",
        { sourceInterval: [181, 254] },
        "a hexadecimal digit",
        [],
        [
          "alt",
          { sourceInterval: [219, 254] },
          ["app", { sourceInterval: [219, 224] }, "digit", []],
          ["range", { sourceInterval: [231, 239] }, "a", "f"],
          ["range", { sourceInterval: [246, 254] }, "A", "F"],
        ],
      ],
      ListOf: [
        "define",
        { sourceInterval: [258, 336] },
        null,
        ["elem", "sep"],
        [
          "alt",
          { sourceInterval: [282, 336] },
          [
            "app",
            { sourceInterval: [282, 307] },
            "NonemptyListOf",
            [
              ["param", { sourceInterval: [297, 301] }, 0],
              ["param", { sourceInterval: [303, 306] }, 1],
            ],
          ],
          [
            "app",
            { sourceInterval: [314, 336] },
            "EmptyListOf",
            [
              ["param", { sourceInterval: [326, 330] }, 0],
              ["param", { sourceInterval: [332, 335] }, 1],
            ],
          ],
        ],
      ],
      NonemptyListOf: [
        "define",
        { sourceInterval: [340, 388] },
        null,
        ["elem", "sep"],
        [
          "seq",
          { sourceInterval: [372, 388] },
          ["param", { sourceInterval: [372, 376] }, 0],
          [
            "star",
            { sourceInterval: [377, 388] },
            [
              "seq",
              { sourceInterval: [378, 386] },
              ["param", { sourceInterval: [378, 381] }, 1],
              ["param", { sourceInterval: [382, 386] }, 0],
            ],
          ],
        ],
      ],
      EmptyListOf: [
        "define",
        { sourceInterval: [392, 434] },
        null,
        ["elem", "sep"],
        ["seq", { sourceInterval: [438, 438] }],
      ],
      listOf: [
        "define",
        { sourceInterval: [438, 516] },
        null,
        ["elem", "sep"],
        [
          "alt",
          { sourceInterval: [462, 516] },
          [
            "app",
            { sourceInterval: [462, 487] },
            "nonemptyListOf",
            [
              ["param", { sourceInterval: [477, 481] }, 0],
              ["param", { sourceInterval: [483, 486] }, 1],
            ],
          ],
          [
            "app",
            { sourceInterval: [494, 516] },
            "emptyListOf",
            [
              ["param", { sourceInterval: [506, 510] }, 0],
              ["param", { sourceInterval: [512, 515] }, 1],
            ],
          ],
        ],
      ],
      nonemptyListOf: [
        "define",
        { sourceInterval: [520, 568] },
        null,
        ["elem", "sep"],
        [
          "seq",
          { sourceInterval: [552, 568] },
          ["param", { sourceInterval: [552, 556] }, 0],
          [
            "star",
            { sourceInterval: [557, 568] },
            [
              "seq",
              { sourceInterval: [558, 566] },
              ["param", { sourceInterval: [558, 561] }, 1],
              ["param", { sourceInterval: [562, 566] }, 0],
            ],
          ],
        ],
      ],
      emptyListOf: [
        "define",
        { sourceInterval: [572, 682] },
        null,
        ["elem", "sep"],
        ["seq", { sourceInterval: [685, 685] }],
      ],
      applySyntactic: [
        "define",
        { sourceInterval: [685, 710] },
        null,
        ["app"],
        ["param", { sourceInterval: [707, 710] }, 0],
      ],
    },
  ]);
  (C.BuiltInRules = Re), nr(C.BuiltInRules);
  var Pe = Ee([
    "grammar",
    {
      source: `Ohm {

  Grammars
    = Grammar*

  Grammar
    = ident SuperGrammar? "{" Rule* "}"

  SuperGrammar
    = "<:" ident

  Rule
    = ident Formals? ruleDescr? "="  RuleBody  -- define
    | ident Formals?            ":=" OverrideRuleBody  -- override
    | ident Formals?            "+=" RuleBody  -- extend

  RuleBody
    = "|"? NonemptyListOf<TopLevelTerm, "|">

  TopLevelTerm
    = Seq caseName  -- inline
    | Seq

  OverrideRuleBody
    = "|"? NonemptyListOf<OverrideTopLevelTerm, "|">

  OverrideTopLevelTerm
    = "..."  -- superSplice
    | TopLevelTerm

  Formals
    = "<" ListOf<ident, ","> ">"

  Params
    = "<" ListOf<Seq, ","> ">"

  Alt
    = NonemptyListOf<Seq, "|">

  Seq
    = Iter*

  Iter
    = Pred "*"  -- star
    | Pred "+"  -- plus
    | Pred "?"  -- opt
    | Pred

  Pred
    = "~" Lex  -- not
    | "&" Lex  -- lookahead
    | Lex

  Lex
    = "#" Base  -- lex
    | Base

  Base
    = ident Params? ~(ruleDescr? "=" | ":=" | "+=")  -- application
    | oneCharTerminal ".." oneCharTerminal           -- range
    | terminal                                       -- terminal
    | "(" Alt ")"                                    -- paren

  ruleDescr  (a rule description)
    = "(" ruleDescrText ")"

  ruleDescrText
    = (~")" any)*

  caseName
    = "--" (~"\\n" space)* name (~"\\n" space)* ("\\n" | &"}")

  name  (a name)
    = nameFirst nameRest*

  nameFirst
    = "_"
    | letter

  nameRest
    = "_"
    | alnum

  ident  (an identifier)
    = name

  terminal
    = "\\"" terminalChar* "\\""

  oneCharTerminal
    = "\\"" terminalChar "\\""

  terminalChar
    = escapeChar
      | ~"\\\\" ~"\\"" ~"\\n" "\\u{0}".."\\u{10FFFF}"

  escapeChar  (an escape sequence)
    = "\\\\\\\\"                                     -- backslash
    | "\\\\\\""                                     -- doubleQuote
    | "\\\\\\'"                                     -- singleQuote
    | "\\\\b"                                      -- backspace
    | "\\\\n"                                      -- lineFeed
    | "\\\\r"                                      -- carriageReturn
    | "\\\\t"                                      -- tab
    | "\\\\u{" hexDigit hexDigit? hexDigit?
             hexDigit? hexDigit? hexDigit? "}"   -- unicodeCodePoint
    | "\\\\u" hexDigit hexDigit hexDigit hexDigit  -- unicodeEscape
    | "\\\\x" hexDigit hexDigit                    -- hexEscape

  space
   += comment

  comment
    = "//" (~"\\n" any)* &("\\n" | end)  -- singleLine
    | "/*" (~"*/" any)* "*/"  -- multiLine

  tokens = token*

  token = caseName | comment | ident | operator | punctuation | terminal | any

  operator = "<:" | "=" | ":=" | "+=" | "*" | "+" | "?" | "~" | "&"

  punctuation = "<" | ">" | "," | "--"
}`,
    },
    "Ohm",
    null,
    "Grammars",
    {
      Grammars: [
        "define",
        { sourceInterval: [9, 32] },
        null,
        [],
        [
          "star",
          { sourceInterval: [24, 32] },
          ["app", { sourceInterval: [24, 31] }, "Grammar", []],
        ],
      ],
      Grammar: [
        "define",
        { sourceInterval: [36, 83] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [50, 83] },
          ["app", { sourceInterval: [50, 55] }, "ident", []],
          [
            "opt",
            { sourceInterval: [56, 69] },
            ["app", { sourceInterval: [56, 68] }, "SuperGrammar", []],
          ],
          ["terminal", { sourceInterval: [70, 73] }, "{"],
          [
            "star",
            { sourceInterval: [74, 79] },
            ["app", { sourceInterval: [74, 78] }, "Rule", []],
          ],
          ["terminal", { sourceInterval: [80, 83] }, "}"],
        ],
      ],
      SuperGrammar: [
        "define",
        { sourceInterval: [87, 116] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [106, 116] },
          ["terminal", { sourceInterval: [106, 110] }, "<:"],
          ["app", { sourceInterval: [111, 116] }, "ident", []],
        ],
      ],
      Rule_define: [
        "define",
        { sourceInterval: [131, 181] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [131, 170] },
          ["app", { sourceInterval: [131, 136] }, "ident", []],
          [
            "opt",
            { sourceInterval: [137, 145] },
            ["app", { sourceInterval: [137, 144] }, "Formals", []],
          ],
          [
            "opt",
            { sourceInterval: [146, 156] },
            ["app", { sourceInterval: [146, 155] }, "ruleDescr", []],
          ],
          ["terminal", { sourceInterval: [157, 160] }, "="],
          ["app", { sourceInterval: [162, 170] }, "RuleBody", []],
        ],
      ],
      Rule_override: [
        "define",
        { sourceInterval: [188, 248] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [188, 235] },
          ["app", { sourceInterval: [188, 193] }, "ident", []],
          [
            "opt",
            { sourceInterval: [194, 202] },
            ["app", { sourceInterval: [194, 201] }, "Formals", []],
          ],
          ["terminal", { sourceInterval: [214, 218] }, ":="],
          ["app", { sourceInterval: [219, 235] }, "OverrideRuleBody", []],
        ],
      ],
      Rule_extend: [
        "define",
        { sourceInterval: [255, 305] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [255, 294] },
          ["app", { sourceInterval: [255, 260] }, "ident", []],
          [
            "opt",
            { sourceInterval: [261, 269] },
            ["app", { sourceInterval: [261, 268] }, "Formals", []],
          ],
          ["terminal", { sourceInterval: [281, 285] }, "+="],
          ["app", { sourceInterval: [286, 294] }, "RuleBody", []],
        ],
      ],
      Rule: [
        "define",
        { sourceInterval: [120, 305] },
        null,
        [],
        [
          "alt",
          { sourceInterval: [131, 305] },
          ["app", { sourceInterval: [131, 170] }, "Rule_define", []],
          ["app", { sourceInterval: [188, 235] }, "Rule_override", []],
          ["app", { sourceInterval: [255, 294] }, "Rule_extend", []],
        ],
      ],
      RuleBody: [
        "define",
        { sourceInterval: [309, 362] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [324, 362] },
          [
            "opt",
            { sourceInterval: [324, 328] },
            ["terminal", { sourceInterval: [324, 327] }, "|"],
          ],
          [
            "app",
            { sourceInterval: [329, 362] },
            "NonemptyListOf",
            [
              ["app", { sourceInterval: [344, 356] }, "TopLevelTerm", []],
              ["terminal", { sourceInterval: [358, 361] }, "|"],
            ],
          ],
        ],
      ],
      TopLevelTerm_inline: [
        "define",
        { sourceInterval: [385, 408] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [385, 397] },
          ["app", { sourceInterval: [385, 388] }, "Seq", []],
          ["app", { sourceInterval: [389, 397] }, "caseName", []],
        ],
      ],
      TopLevelTerm: [
        "define",
        { sourceInterval: [366, 418] },
        null,
        [],
        [
          "alt",
          { sourceInterval: [385, 418] },
          ["app", { sourceInterval: [385, 397] }, "TopLevelTerm_inline", []],
          ["app", { sourceInterval: [415, 418] }, "Seq", []],
        ],
      ],
      OverrideRuleBody: [
        "define",
        { sourceInterval: [422, 491] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [445, 491] },
          [
            "opt",
            { sourceInterval: [445, 449] },
            ["terminal", { sourceInterval: [445, 448] }, "|"],
          ],
          [
            "app",
            { sourceInterval: [450, 491] },
            "NonemptyListOf",
            [
              [
                "app",
                { sourceInterval: [465, 485] },
                "OverrideTopLevelTerm",
                [],
              ],
              ["terminal", { sourceInterval: [487, 490] }, "|"],
            ],
          ],
        ],
      ],
      OverrideTopLevelTerm_superSplice: [
        "define",
        { sourceInterval: [522, 543] },
        null,
        [],
        ["terminal", { sourceInterval: [522, 527] }, "..."],
      ],
      OverrideTopLevelTerm: [
        "define",
        { sourceInterval: [495, 562] },
        null,
        [],
        [
          "alt",
          { sourceInterval: [522, 562] },
          [
            "app",
            { sourceInterval: [522, 527] },
            "OverrideTopLevelTerm_superSplice",
            [],
          ],
          ["app", { sourceInterval: [550, 562] }, "TopLevelTerm", []],
        ],
      ],
      Formals: [
        "define",
        { sourceInterval: [566, 606] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [580, 606] },
          ["terminal", { sourceInterval: [580, 583] }, "<"],
          [
            "app",
            { sourceInterval: [584, 602] },
            "ListOf",
            [
              ["app", { sourceInterval: [591, 596] }, "ident", []],
              ["terminal", { sourceInterval: [598, 601] }, ","],
            ],
          ],
          ["terminal", { sourceInterval: [603, 606] }, ">"],
        ],
      ],
      Params: [
        "define",
        { sourceInterval: [610, 647] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [623, 647] },
          ["terminal", { sourceInterval: [623, 626] }, "<"],
          [
            "app",
            { sourceInterval: [627, 643] },
            "ListOf",
            [
              ["app", { sourceInterval: [634, 637] }, "Seq", []],
              ["terminal", { sourceInterval: [639, 642] }, ","],
            ],
          ],
          ["terminal", { sourceInterval: [644, 647] }, ">"],
        ],
      ],
      Alt: [
        "define",
        { sourceInterval: [651, 685] },
        null,
        [],
        [
          "app",
          { sourceInterval: [661, 685] },
          "NonemptyListOf",
          [
            ["app", { sourceInterval: [676, 679] }, "Seq", []],
            ["terminal", { sourceInterval: [681, 684] }, "|"],
          ],
        ],
      ],
      Seq: [
        "define",
        { sourceInterval: [689, 704] },
        null,
        [],
        [
          "star",
          { sourceInterval: [699, 704] },
          ["app", { sourceInterval: [699, 703] }, "Iter", []],
        ],
      ],
      Iter_star: [
        "define",
        { sourceInterval: [719, 736] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [719, 727] },
          ["app", { sourceInterval: [719, 723] }, "Pred", []],
          ["terminal", { sourceInterval: [724, 727] }, "*"],
        ],
      ],
      Iter_plus: [
        "define",
        { sourceInterval: [743, 760] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [743, 751] },
          ["app", { sourceInterval: [743, 747] }, "Pred", []],
          ["terminal", { sourceInterval: [748, 751] }, "+"],
        ],
      ],
      Iter_opt: [
        "define",
        { sourceInterval: [767, 783] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [767, 775] },
          ["app", { sourceInterval: [767, 771] }, "Pred", []],
          ["terminal", { sourceInterval: [772, 775] }, "?"],
        ],
      ],
      Iter: [
        "define",
        { sourceInterval: [708, 794] },
        null,
        [],
        [
          "alt",
          { sourceInterval: [719, 794] },
          ["app", { sourceInterval: [719, 727] }, "Iter_star", []],
          ["app", { sourceInterval: [743, 751] }, "Iter_plus", []],
          ["app", { sourceInterval: [767, 775] }, "Iter_opt", []],
          ["app", { sourceInterval: [790, 794] }, "Pred", []],
        ],
      ],
      Pred_not: [
        "define",
        { sourceInterval: [809, 824] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [809, 816] },
          ["terminal", { sourceInterval: [809, 812] }, "~"],
          ["app", { sourceInterval: [813, 816] }, "Lex", []],
        ],
      ],
      Pred_lookahead: [
        "define",
        { sourceInterval: [831, 852] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [831, 838] },
          ["terminal", { sourceInterval: [831, 834] }, "&"],
          ["app", { sourceInterval: [835, 838] }, "Lex", []],
        ],
      ],
      Pred: [
        "define",
        { sourceInterval: [798, 862] },
        null,
        [],
        [
          "alt",
          { sourceInterval: [809, 862] },
          ["app", { sourceInterval: [809, 816] }, "Pred_not", []],
          ["app", { sourceInterval: [831, 838] }, "Pred_lookahead", []],
          ["app", { sourceInterval: [859, 862] }, "Lex", []],
        ],
      ],
      Lex_lex: [
        "define",
        { sourceInterval: [876, 892] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [876, 884] },
          ["terminal", { sourceInterval: [876, 879] }, "#"],
          ["app", { sourceInterval: [880, 884] }, "Base", []],
        ],
      ],
      Lex: [
        "define",
        { sourceInterval: [866, 903] },
        null,
        [],
        [
          "alt",
          { sourceInterval: [876, 903] },
          ["app", { sourceInterval: [876, 884] }, "Lex_lex", []],
          ["app", { sourceInterval: [899, 903] }, "Base", []],
        ],
      ],
      Base_application: [
        "define",
        { sourceInterval: [918, 979] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [918, 963] },
          ["app", { sourceInterval: [918, 923] }, "ident", []],
          [
            "opt",
            { sourceInterval: [924, 931] },
            ["app", { sourceInterval: [924, 930] }, "Params", []],
          ],
          [
            "not",
            { sourceInterval: [932, 963] },
            [
              "alt",
              { sourceInterval: [934, 962] },
              [
                "seq",
                { sourceInterval: [934, 948] },
                [
                  "opt",
                  { sourceInterval: [934, 944] },
                  ["app", { sourceInterval: [934, 943] }, "ruleDescr", []],
                ],
                ["terminal", { sourceInterval: [945, 948] }, "="],
              ],
              ["terminal", { sourceInterval: [951, 955] }, ":="],
              ["terminal", { sourceInterval: [958, 962] }, "+="],
            ],
          ],
        ],
      ],
      Base_range: [
        "define",
        { sourceInterval: [986, 1041] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [986, 1022] },
          ["app", { sourceInterval: [986, 1001] }, "oneCharTerminal", []],
          ["terminal", { sourceInterval: [1002, 1006] }, ".."],
          ["app", { sourceInterval: [1007, 1022] }, "oneCharTerminal", []],
        ],
      ],
      Base_terminal: [
        "define",
        { sourceInterval: [1048, 1106] },
        null,
        [],
        ["app", { sourceInterval: [1048, 1056] }, "terminal", []],
      ],
      Base_paren: [
        "define",
        { sourceInterval: [1113, 1168] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [1113, 1124] },
          ["terminal", { sourceInterval: [1113, 1116] }, "("],
          ["app", { sourceInterval: [1117, 1120] }, "Alt", []],
          ["terminal", { sourceInterval: [1121, 1124] }, ")"],
        ],
      ],
      Base: [
        "define",
        { sourceInterval: [907, 1168] },
        null,
        [],
        [
          "alt",
          { sourceInterval: [918, 1168] },
          ["app", { sourceInterval: [918, 963] }, "Base_application", []],
          ["app", { sourceInterval: [986, 1022] }, "Base_range", []],
          ["app", { sourceInterval: [1048, 1056] }, "Base_terminal", []],
          ["app", { sourceInterval: [1113, 1124] }, "Base_paren", []],
        ],
      ],
      ruleDescr: [
        "define",
        { sourceInterval: [1172, 1231] },
        "a rule description",
        [],
        [
          "seq",
          { sourceInterval: [1210, 1231] },
          ["terminal", { sourceInterval: [1210, 1213] }, "("],
          ["app", { sourceInterval: [1214, 1227] }, "ruleDescrText", []],
          ["terminal", { sourceInterval: [1228, 1231] }, ")"],
        ],
      ],
      ruleDescrText: [
        "define",
        { sourceInterval: [1235, 1266] },
        null,
        [],
        [
          "star",
          { sourceInterval: [1255, 1266] },
          [
            "seq",
            { sourceInterval: [1256, 1264] },
            [
              "not",
              { sourceInterval: [1256, 1260] },
              ["terminal", { sourceInterval: [1257, 1260] }, ")"],
            ],
            ["app", { sourceInterval: [1261, 1264] }, "any", []],
          ],
        ],
      ],
      caseName: [
        "define",
        { sourceInterval: [1270, 1338] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [1285, 1338] },
          ["terminal", { sourceInterval: [1285, 1289] }, "--"],
          [
            "star",
            { sourceInterval: [1290, 1304] },
            [
              "seq",
              { sourceInterval: [1291, 1302] },
              [
                "not",
                { sourceInterval: [1291, 1296] },
                [
                  "terminal",
                  { sourceInterval: [1292, 1296] },
                  `
`,
                ],
              ],
              ["app", { sourceInterval: [1297, 1302] }, "space", []],
            ],
          ],
          ["app", { sourceInterval: [1305, 1309] }, "name", []],
          [
            "star",
            { sourceInterval: [1310, 1324] },
            [
              "seq",
              { sourceInterval: [1311, 1322] },
              [
                "not",
                { sourceInterval: [1311, 1316] },
                [
                  "terminal",
                  { sourceInterval: [1312, 1316] },
                  `
`,
                ],
              ],
              ["app", { sourceInterval: [1317, 1322] }, "space", []],
            ],
          ],
          [
            "alt",
            { sourceInterval: [1326, 1337] },
            [
              "terminal",
              { sourceInterval: [1326, 1330] },
              `
`,
            ],
            [
              "lookahead",
              { sourceInterval: [1333, 1337] },
              ["terminal", { sourceInterval: [1334, 1337] }, "}"],
            ],
          ],
        ],
      ],
      name: [
        "define",
        { sourceInterval: [1342, 1382] },
        "a name",
        [],
        [
          "seq",
          { sourceInterval: [1363, 1382] },
          ["app", { sourceInterval: [1363, 1372] }, "nameFirst", []],
          [
            "star",
            { sourceInterval: [1373, 1382] },
            ["app", { sourceInterval: [1373, 1381] }, "nameRest", []],
          ],
        ],
      ],
      nameFirst: [
        "define",
        { sourceInterval: [1386, 1418] },
        null,
        [],
        [
          "alt",
          { sourceInterval: [1402, 1418] },
          ["terminal", { sourceInterval: [1402, 1405] }, "_"],
          ["app", { sourceInterval: [1412, 1418] }, "letter", []],
        ],
      ],
      nameRest: [
        "define",
        { sourceInterval: [1422, 1452] },
        null,
        [],
        [
          "alt",
          { sourceInterval: [1437, 1452] },
          ["terminal", { sourceInterval: [1437, 1440] }, "_"],
          ["app", { sourceInterval: [1447, 1452] }, "alnum", []],
        ],
      ],
      ident: [
        "define",
        { sourceInterval: [1456, 1489] },
        "an identifier",
        [],
        ["app", { sourceInterval: [1485, 1489] }, "name", []],
      ],
      terminal: [
        "define",
        { sourceInterval: [1493, 1531] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [1508, 1531] },
          ["terminal", { sourceInterval: [1508, 1512] }, '"'],
          [
            "star",
            { sourceInterval: [1513, 1526] },
            ["app", { sourceInterval: [1513, 1525] }, "terminalChar", []],
          ],
          ["terminal", { sourceInterval: [1527, 1531] }, '"'],
        ],
      ],
      oneCharTerminal: [
        "define",
        { sourceInterval: [1535, 1579] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [1557, 1579] },
          ["terminal", { sourceInterval: [1557, 1561] }, '"'],
          ["app", { sourceInterval: [1562, 1574] }, "terminalChar", []],
          ["terminal", { sourceInterval: [1575, 1579] }, '"'],
        ],
      ],
      terminalChar: [
        "define",
        { sourceInterval: [1583, 1660] },
        null,
        [],
        [
          "alt",
          { sourceInterval: [1602, 1660] },
          ["app", { sourceInterval: [1602, 1612] }, "escapeChar", []],
          [
            "seq",
            { sourceInterval: [1621, 1660] },
            [
              "not",
              { sourceInterval: [1621, 1626] },
              ["terminal", { sourceInterval: [1622, 1626] }, "\\"],
            ],
            [
              "not",
              { sourceInterval: [1627, 1632] },
              ["terminal", { sourceInterval: [1628, 1632] }, '"'],
            ],
            [
              "not",
              { sourceInterval: [1633, 1638] },
              [
                "terminal",
                { sourceInterval: [1634, 1638] },
                `
`,
              ],
            ],
            ["range", { sourceInterval: [1639, 1660] }, "\0", "􏿿"],
          ],
        ],
      ],
      escapeChar_backslash: [
        "define",
        { sourceInterval: [1703, 1758] },
        null,
        [],
        ["terminal", { sourceInterval: [1703, 1709] }, "\\\\"],
      ],
      escapeChar_doubleQuote: [
        "define",
        { sourceInterval: [1765, 1822] },
        null,
        [],
        ["terminal", { sourceInterval: [1765, 1771] }, '\\"'],
      ],
      escapeChar_singleQuote: [
        "define",
        { sourceInterval: [1829, 1886] },
        null,
        [],
        ["terminal", { sourceInterval: [1829, 1835] }, "\\'"],
      ],
      escapeChar_backspace: [
        "define",
        { sourceInterval: [1893, 1948] },
        null,
        [],
        ["terminal", { sourceInterval: [1893, 1898] }, "\\b"],
      ],
      escapeChar_lineFeed: [
        "define",
        { sourceInterval: [1955, 2009] },
        null,
        [],
        ["terminal", { sourceInterval: [1955, 1960] }, "\\n"],
      ],
      escapeChar_carriageReturn: [
        "define",
        { sourceInterval: [2016, 2076] },
        null,
        [],
        ["terminal", { sourceInterval: [2016, 2021] }, "\\r"],
      ],
      escapeChar_tab: [
        "define",
        { sourceInterval: [2083, 2132] },
        null,
        [],
        ["terminal", { sourceInterval: [2083, 2088] }, "\\t"],
      ],
      escapeChar_unicodeCodePoint: [
        "define",
        { sourceInterval: [2139, 2243] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [2139, 2221] },
          ["terminal", { sourceInterval: [2139, 2145] }, "\\u{"],
          ["app", { sourceInterval: [2146, 2154] }, "hexDigit", []],
          [
            "opt",
            { sourceInterval: [2155, 2164] },
            ["app", { sourceInterval: [2155, 2163] }, "hexDigit", []],
          ],
          [
            "opt",
            { sourceInterval: [2165, 2174] },
            ["app", { sourceInterval: [2165, 2173] }, "hexDigit", []],
          ],
          [
            "opt",
            { sourceInterval: [2188, 2197] },
            ["app", { sourceInterval: [2188, 2196] }, "hexDigit", []],
          ],
          [
            "opt",
            { sourceInterval: [2198, 2207] },
            ["app", { sourceInterval: [2198, 2206] }, "hexDigit", []],
          ],
          [
            "opt",
            { sourceInterval: [2208, 2217] },
            ["app", { sourceInterval: [2208, 2216] }, "hexDigit", []],
          ],
          ["terminal", { sourceInterval: [2218, 2221] }, "}"],
        ],
      ],
      escapeChar_unicodeEscape: [
        "define",
        { sourceInterval: [2250, 2309] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [2250, 2291] },
          ["terminal", { sourceInterval: [2250, 2255] }, "\\u"],
          ["app", { sourceInterval: [2256, 2264] }, "hexDigit", []],
          ["app", { sourceInterval: [2265, 2273] }, "hexDigit", []],
          ["app", { sourceInterval: [2274, 2282] }, "hexDigit", []],
          ["app", { sourceInterval: [2283, 2291] }, "hexDigit", []],
        ],
      ],
      escapeChar_hexEscape: [
        "define",
        { sourceInterval: [2316, 2371] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [2316, 2339] },
          ["terminal", { sourceInterval: [2316, 2321] }, "\\x"],
          ["app", { sourceInterval: [2322, 2330] }, "hexDigit", []],
          ["app", { sourceInterval: [2331, 2339] }, "hexDigit", []],
        ],
      ],
      escapeChar: [
        "define",
        { sourceInterval: [1664, 2371] },
        "an escape sequence",
        [],
        [
          "alt",
          { sourceInterval: [1703, 2371] },
          ["app", { sourceInterval: [1703, 1709] }, "escapeChar_backslash", []],
          [
            "app",
            { sourceInterval: [1765, 1771] },
            "escapeChar_doubleQuote",
            [],
          ],
          [
            "app",
            { sourceInterval: [1829, 1835] },
            "escapeChar_singleQuote",
            [],
          ],
          ["app", { sourceInterval: [1893, 1898] }, "escapeChar_backspace", []],
          ["app", { sourceInterval: [1955, 1960] }, "escapeChar_lineFeed", []],
          [
            "app",
            { sourceInterval: [2016, 2021] },
            "escapeChar_carriageReturn",
            [],
          ],
          ["app", { sourceInterval: [2083, 2088] }, "escapeChar_tab", []],
          [
            "app",
            { sourceInterval: [2139, 2221] },
            "escapeChar_unicodeCodePoint",
            [],
          ],
          [
            "app",
            { sourceInterval: [2250, 2291] },
            "escapeChar_unicodeEscape",
            [],
          ],
          ["app", { sourceInterval: [2316, 2339] }, "escapeChar_hexEscape", []],
        ],
      ],
      space: [
        "extend",
        { sourceInterval: [2375, 2394] },
        null,
        [],
        ["app", { sourceInterval: [2387, 2394] }, "comment", []],
      ],
      comment_singleLine: [
        "define",
        { sourceInterval: [2412, 2458] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [2412, 2443] },
          ["terminal", { sourceInterval: [2412, 2416] }, "//"],
          [
            "star",
            { sourceInterval: [2417, 2429] },
            [
              "seq",
              { sourceInterval: [2418, 2427] },
              [
                "not",
                { sourceInterval: [2418, 2423] },
                [
                  "terminal",
                  { sourceInterval: [2419, 2423] },
                  `
`,
                ],
              ],
              ["app", { sourceInterval: [2424, 2427] }, "any", []],
            ],
          ],
          [
            "lookahead",
            { sourceInterval: [2430, 2443] },
            [
              "alt",
              { sourceInterval: [2432, 2442] },
              [
                "terminal",
                { sourceInterval: [2432, 2436] },
                `
`,
              ],
              ["app", { sourceInterval: [2439, 2442] }, "end", []],
            ],
          ],
        ],
      ],
      comment_multiLine: [
        "define",
        { sourceInterval: [2465, 2501] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [2465, 2487] },
          ["terminal", { sourceInterval: [2465, 2469] }, "/*"],
          [
            "star",
            { sourceInterval: [2470, 2482] },
            [
              "seq",
              { sourceInterval: [2471, 2480] },
              [
                "not",
                { sourceInterval: [2471, 2476] },
                ["terminal", { sourceInterval: [2472, 2476] }, "*/"],
              ],
              ["app", { sourceInterval: [2477, 2480] }, "any", []],
            ],
          ],
          ["terminal", { sourceInterval: [2483, 2487] }, "*/"],
        ],
      ],
      comment: [
        "define",
        { sourceInterval: [2398, 2501] },
        null,
        [],
        [
          "alt",
          { sourceInterval: [2412, 2501] },
          ["app", { sourceInterval: [2412, 2443] }, "comment_singleLine", []],
          ["app", { sourceInterval: [2465, 2487] }, "comment_multiLine", []],
        ],
      ],
      tokens: [
        "define",
        { sourceInterval: [2505, 2520] },
        null,
        [],
        [
          "star",
          { sourceInterval: [2514, 2520] },
          ["app", { sourceInterval: [2514, 2519] }, "token", []],
        ],
      ],
      token: [
        "define",
        { sourceInterval: [2524, 2600] },
        null,
        [],
        [
          "alt",
          { sourceInterval: [2532, 2600] },
          ["app", { sourceInterval: [2532, 2540] }, "caseName", []],
          ["app", { sourceInterval: [2543, 2550] }, "comment", []],
          ["app", { sourceInterval: [2553, 2558] }, "ident", []],
          ["app", { sourceInterval: [2561, 2569] }, "operator", []],
          ["app", { sourceInterval: [2572, 2583] }, "punctuation", []],
          ["app", { sourceInterval: [2586, 2594] }, "terminal", []],
          ["app", { sourceInterval: [2597, 2600] }, "any", []],
        ],
      ],
      operator: [
        "define",
        { sourceInterval: [2604, 2669] },
        null,
        [],
        [
          "alt",
          { sourceInterval: [2615, 2669] },
          ["terminal", { sourceInterval: [2615, 2619] }, "<:"],
          ["terminal", { sourceInterval: [2622, 2625] }, "="],
          ["terminal", { sourceInterval: [2628, 2632] }, ":="],
          ["terminal", { sourceInterval: [2635, 2639] }, "+="],
          ["terminal", { sourceInterval: [2642, 2645] }, "*"],
          ["terminal", { sourceInterval: [2648, 2651] }, "+"],
          ["terminal", { sourceInterval: [2654, 2657] }, "?"],
          ["terminal", { sourceInterval: [2660, 2663] }, "~"],
          ["terminal", { sourceInterval: [2666, 2669] }, "&"],
        ],
      ],
      punctuation: [
        "define",
        { sourceInterval: [2673, 2709] },
        null,
        [],
        [
          "alt",
          { sourceInterval: [2687, 2709] },
          ["terminal", { sourceInterval: [2687, 2690] }, "<"],
          ["terminal", { sourceInterval: [2693, 2696] }, ">"],
          ["terminal", { sourceInterval: [2699, 2702] }, ","],
          ["terminal", { sourceInterval: [2705, 2709] }, "--"],
        ],
      ],
    },
  ]);
  const Fe = Object.create(f.prototype);
  function ft(r, e) {
    for (const t in r) if (t === e) return !0;
    return !1;
  }
  function dt(r, e, t) {
    const n = new le();
    let i,
      s,
      o,
      l = !1;
    return (t || Pe)
      .createSemantics()
      .addOperation("visit", {
        Grammars(a) {
          return a.children.map((c) => c.visit());
        },
        Grammar(a, c, p, m, d) {
          const I = a.visit();
          (i = n.newGrammar(I)),
            c.child(0) && c.child(0).visit(),
            m.children.map((V) => V.visit());
          const b = i.build();
          if (((b.source = this.source.trimmed()), ft(e, I))) throw Gt(b);
          return (e[I] = b), b;
        },
        SuperGrammar(a, c) {
          const p = c.visit();
          if (p === "null") i.withSuperGrammar(null);
          else {
            if (!e || !ft(e, p)) throw Bt(p, e, c.source);
            i.withSuperGrammar(e[p]);
          }
        },
        Rule_define(a, c, p, m, d) {
          (s = a.visit()),
            (o = c.children.map((X) => X.visit())[0] || []),
            !i.defaultStartRule &&
              i.ensureSuperGrammar() !== C.ProtoBuiltInRules &&
              i.withDefaultStartRule(s);
          const I = d.visit(),
            b = p.children.map((X) => X.visit())[0],
            V = this.source.trimmed();
          return i.define(s, o, I, b, V);
        },
        Rule_override(a, c, p, m) {
          (s = a.visit()), (o = c.children.map((b) => b.visit())[0] || []);
          const d = this.source.trimmed();
          i.ensureSuperGrammarRuleForOverriding(s, d), (l = !0);
          const I = m.visit();
          return (l = !1), i.override(s, o, I, null, d);
        },
        Rule_extend(a, c, p, m) {
          (s = a.visit()), (o = c.children.map((b) => b.visit())[0] || []);
          const d = m.visit(),
            I = this.source.trimmed();
          return i.extend(s, o, d, null, I);
        },
        RuleBody(a, c) {
          return n.alt(...c.visit()).withSource(this.source);
        },
        OverrideRuleBody(a, c) {
          const p = c.visit(),
            m = p.indexOf(Fe);
          if (m >= 0) {
            const d = p.slice(0, m),
              I = p.slice(m + 1);
            return (
              I.forEach((b) => {
                if (b === Fe) throw Yt(b);
              }),
              new ae(i.superGrammar, s, d, I).withSource(this.source)
            );
          } else return n.alt(...p).withSource(this.source);
        },
        Formals(a, c, p) {
          return c.visit();
        },
        Params(a, c, p) {
          return c.visit();
        },
        Alt(a) {
          return n.alt(...a.visit()).withSource(this.source);
        },
        TopLevelTerm_inline(a, c) {
          const p = s + "_" + c.visit(),
            m = a.visit(),
            d = this.source.trimmed(),
            I = !(i.superGrammar && i.superGrammar.rules[p]);
          l && !I ? i.override(p, o, m, null, d) : i.define(p, o, m, null, d);
          const b = o.map((V) => n.app(V));
          return n.app(p, b).withSource(m.source);
        },
        OverrideTopLevelTerm_superSplice(a) {
          return Fe;
        },
        Seq(a) {
          return n
            .seq(...a.children.map((c) => c.visit()))
            .withSource(this.source);
        },
        Iter_star(a, c) {
          return n.star(a.visit()).withSource(this.source);
        },
        Iter_plus(a, c) {
          return n.plus(a.visit()).withSource(this.source);
        },
        Iter_opt(a, c) {
          return n.opt(a.visit()).withSource(this.source);
        },
        Pred_not(a, c) {
          return n.not(c.visit()).withSource(this.source);
        },
        Pred_lookahead(a, c) {
          return n.lookahead(c.visit()).withSource(this.source);
        },
        Lex_lex(a, c) {
          return n.lex(c.visit()).withSource(this.source);
        },
        Base_application(a, c) {
          const p = c.children.map((m) => m.visit())[0] || [];
          return n.app(a.visit(), p).withSource(this.source);
        },
        Base_range(a, c, p) {
          return n.range(a.visit(), p.visit()).withSource(this.source);
        },
        Base_terminal(a) {
          return n.terminal(a.visit()).withSource(this.source);
        },
        Base_paren(a, c, p) {
          return c.visit();
        },
        ruleDescr(a, c, p) {
          return c.visit();
        },
        ruleDescrText(a) {
          return this.sourceString.trim();
        },
        caseName(a, c, p, m, d) {
          return p.visit();
        },
        name(a, c) {
          return this.sourceString;
        },
        nameFirst(a) {},
        nameRest(a) {},
        terminal(a, c, p) {
          return c.children.map((m) => m.visit()).join("");
        },
        oneCharTerminal(a, c, p) {
          return c.visit();
        },
        escapeChar(a) {
          try {
            return He(this.sourceString);
          } catch (c) {
            throw c instanceof RangeError &&
              c.message.startsWith("Invalid code point ")
              ? Qt(a)
              : c;
          }
        },
        NonemptyListOf(a, c, p) {
          return [a.visit()].concat(p.children.map((m) => m.visit()));
        },
        EmptyListOf() {
          return [];
        },
        _terminal() {
          return this.sourceString;
        },
      })(r)
      .visit();
  }
  var Sr = Ee([
    "grammar",
    {
      source: `OperationsAndAttributes {

  AttributeSignature =
    name

  OperationSignature =
    name Formals?

  Formals
    = "(" ListOf<name, ","> ")"

  name  (a name)
    = nameFirst nameRest*

  nameFirst
    = "_"
    | letter

  nameRest
    = "_"
    | alnum

}`,
    },
    "OperationsAndAttributes",
    null,
    "AttributeSignature",
    {
      AttributeSignature: [
        "define",
        { sourceInterval: [29, 58] },
        null,
        [],
        ["app", { sourceInterval: [54, 58] }, "name", []],
      ],
      OperationSignature: [
        "define",
        { sourceInterval: [62, 100] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [87, 100] },
          ["app", { sourceInterval: [87, 91] }, "name", []],
          [
            "opt",
            { sourceInterval: [92, 100] },
            ["app", { sourceInterval: [92, 99] }, "Formals", []],
          ],
        ],
      ],
      Formals: [
        "define",
        { sourceInterval: [104, 143] },
        null,
        [],
        [
          "seq",
          { sourceInterval: [118, 143] },
          ["terminal", { sourceInterval: [118, 121] }, "("],
          [
            "app",
            { sourceInterval: [122, 139] },
            "ListOf",
            [
              ["app", { sourceInterval: [129, 133] }, "name", []],
              ["terminal", { sourceInterval: [135, 138] }, ","],
            ],
          ],
          ["terminal", { sourceInterval: [140, 143] }, ")"],
        ],
      ],
      name: [
        "define",
        { sourceInterval: [147, 187] },
        "a name",
        [],
        [
          "seq",
          { sourceInterval: [168, 187] },
          ["app", { sourceInterval: [168, 177] }, "nameFirst", []],
          [
            "star",
            { sourceInterval: [178, 187] },
            ["app", { sourceInterval: [178, 186] }, "nameRest", []],
          ],
        ],
      ],
      nameFirst: [
        "define",
        { sourceInterval: [191, 223] },
        null,
        [],
        [
          "alt",
          { sourceInterval: [207, 223] },
          ["terminal", { sourceInterval: [207, 210] }, "_"],
          ["app", { sourceInterval: [217, 223] }, "letter", []],
        ],
      ],
      nameRest: [
        "define",
        { sourceInterval: [227, 257] },
        null,
        [],
        [
          "alt",
          { sourceInterval: [242, 257] },
          ["terminal", { sourceInterval: [242, 245] }, "_"],
          ["app", { sourceInterval: [252, 257] }, "alnum", []],
        ],
      ],
    },
  ]);
  _r(C.BuiltInRules), br(Sr);
  function _r(r) {
    const e = {
      empty() {
        return this.iteration();
      },
      nonEmpty(t, n, i) {
        return this.iteration([t].concat(i.children));
      },
    };
    k.BuiltInSemantics = k
      .createSemantics(r, null)
      .addOperation("asIteration", {
        emptyListOf: e.empty,
        nonemptyListOf: e.nonEmpty,
        EmptyListOf: e.empty,
        NonemptyListOf: e.nonEmpty,
      });
  }
  function br(r) {
    (k.prototypeGrammarSemantics = r.createSemantics().addOperation("parse", {
      AttributeSignature(e) {
        return { name: e.parse(), formals: [] };
      },
      OperationSignature(e, t) {
        return {
          name: e.parse(),
          formals: t.children.map((n) => n.parse())[0] || [],
        };
      },
      Formals(e, t, n) {
        return t.asIteration().children.map((i) => i.parse());
      },
      name(e, t) {
        return this.sourceString;
      },
    })),
      (k.prototypeGrammar = r);
  }
  function wr(r) {
    let e = 0;
    const t = [0],
      n = () => t[t.length - 1],
      i = {},
      s = /( *).*(?:$|\r?\n|\r)/g;
    let o;
    for (; (o = s.exec(r)) != null; ) {
      const [l, u] = o;
      if (l.length === 0) break;
      const h = u.length,
        a = n(),
        c = e + h;
      if (h > a) t.push(h), (i[c] = 1);
      else if (h < a) {
        const p = t.length;
        for (; n() !== h; ) t.pop();
        i[c] = -1 * (p - t.length);
      }
      e += l.length;
    }
    return t.length > 1 && (i[e] = 1 - t.length), i;
  }
  const gt = "an indented block",
    vt = "a dedent",
    yt = 1114112;
  class Ar extends ce {
    constructor(e) {
      super(e.input), (this.state = e);
    }
    _indentationAt(e) {
      return this.state.userData[e] || 0;
    }
    atEnd() {
      return super.atEnd() && this._indentationAt(this.pos) === 0;
    }
    next() {
      if (this._indentationAt(this.pos) !== 0) {
        this.examinedLength = Math.max(this.examinedLength, this.pos);
        return;
      }
      return super.next();
    }
    nextCharCode() {
      return this._indentationAt(this.pos) !== 0
        ? ((this.examinedLength = Math.max(this.examinedLength, this.pos)), yt)
        : super.nextCharCode();
    }
    nextCodePoint() {
      return this._indentationAt(this.pos) !== 0
        ? ((this.examinedLength = Math.max(this.examinedLength, this.pos)), yt)
        : super.nextCodePoint();
    }
  }
  class It extends f {
    constructor(e = !0) {
      super(), (this.isIndent = e);
    }
    allowsSkippingPrecedingSpace() {
      return !0;
    }
    eval(e) {
      const { inputStream: t } = e,
        n = e.userData;
      e.doNotMemoize = !0;
      const i = t.pos,
        s = this.isIndent ? 1 : -1;
      return (n[i] || 0) * s > 0
        ? ((e.userData = Object.create(n)),
          (e.userData[i] -= s),
          e.pushBinding(new K(0), i),
          !0)
        : (e.processFailure(i, this), !1);
    }
    getArity() {
      return 1;
    }
    _assertAllApplicationsAreValid(e, t) {}
    _isNullable(e, t) {
      return !1;
    }
    assertChoicesHaveUniformArity(e) {}
    assertIteratedExprsAreNotNullable(e) {}
    introduceParams(e) {
      return this;
    }
    substituteParams(e) {
      return this;
    }
    toString() {
      return this.isIndent ? "indent" : "dedent";
    }
    toDisplayString() {
      return this.toString();
    }
    toFailure(e) {
      const t = this.isIndent ? gt : vt;
      return new T(this, t, "description");
    }
  }
  const Or = new g("indent"),
    Nr = new g("dedent"),
    Lr = new ae(Re, "any", [Or, Nr], []),
    Er = new le()
      .newGrammar("IndentationSensitive")
      .withSuperGrammar(Re)
      .define("indent", [], new It(!0), gt, void 0, !0)
      .define("dedent", [], new It(!1), vt, void 0, !0)
      .extend("any", [], Lr, "any character", void 0)
      .build();
  Object.assign(Er, {
    _matchStateInitializer(r) {
      (r.userData = wr(r.input)), (r.inputStream = new Ar(r));
    },
    supportsIncrementalParsing: !1,
  }),
    C.initApplicationParser(Pe, dt);
  const Rr = (r) =>
    !!r.constructor &&
    typeof r.constructor.isBuffer == "function" &&
    r.constructor.isBuffer(r);
  function Pr(r, e) {
    const t = Pe.match(r, "Grammars");
    if (t.failed()) throw jt(t);
    return dt(t, e);
  }
  function Fr(r, e) {
    const t = Cr(r),
      n = Object.keys(t);
    if (n.length === 0) throw new Error("Missing grammar definition");
    if (n.length > 1) {
      const s = t[n[1]].source;
      throw new Error(
        Se(s.sourceString, s.startIdx) +
          "Found more than one grammar definition -- use ohm.grammars() instead."
      );
    }
    return t[n[0]];
  }
  function Cr(r, e) {
    const t = Object.create({});
    if (typeof r != "string")
      if (Rr(r)) r = r.toString();
      else
        throw new TypeError("Expected string as first argument, got " + ve(r));
    return Pr(r, t), t;
  }
  function Dr(r, e, t) {
    let n = (i) => r(i, ...e);
    return t === void 0 ? n : Object.assign(n, { lazy: t, lazyArgs: e });
  }
  function xt(r, e, t) {
    let n = r.length - e.length;
    if (n === 0) return r(...e);
    if (n === 1) return Dr(r, e, t);
    throw new Error("Wrong number of arguments");
  }
  function Tr(r, e) {
    let t = Math.ceil(r),
      n = Math.floor(e);
    if (n < t)
      throw new RangeError(
        `randomInteger: The range [${r.toString()},${e.toString()}] contains no integer`
      );
    return Math.floor(Math.random() * (n - t + 1) + t);
  }
  function kr(...r) {
    return xt(Mr, r);
  }
  function Mr(r, e) {
    let t = [];
    for (let n = r; n < e; n++) t.push(n);
    return t;
  }
  function jr(...r) {
    return xt(Br, r);
  }
  function Br(r) {
    let e = typeof r[0] == "bigint" ? 0n : 0;
    for (let t of r) e += t;
    return e;
  }
  const St = Fr(String.raw`
DiceLang {
  Program = ASExpr
  ASExpr =
    | ASExpr "+" ASExpr -- add
    | ASExpr "-" ASExpr -- sub
    | Roll
    | MDExpr
  MDExpr =
    | MDExpr "*" MDExpr -- mul
    | MDExpr "/" MDExpr -- div
    | ExpExpr
  ExpExpr =
    | ExpExpr "^" ExpExpr -- exp
    | ParenExpr
  ParenExpr =
    | "(" ASExpr ")" -- parens
    | Number
  Roll = ParenExpr "d" ParenExpr
  Number = "-"? digit+ (":" ident)?
  ident = (letter | "_")+
}
`),
    Gr = St.createSemantics()
      .addOperation("eval(overrides)", {
        ASExpr_add(r, e, t) {
          return r.eval(this.args.overrides) + t.eval(this.args.overrides);
        },
        ASExpr_sub(r, e, t) {
          return Math.max(
            r.eval(this.args.overrides) - t.eval(this.args.overrides),
            0
          );
        },
        MDExpr_mul(r, e, t) {
          return r.eval(this.args.overrides) * t.eval(this.args.overrides);
        },
        MDExpr_div(r, e, t) {
          return Math.floor(
            r.eval(this.args.overrides) / t.eval(this.args.overrides)
          );
        },
        ExpExpr_exp(r, e, t) {
          return Math.pow(
            r.eval(this.args.overrides),
            t.eval(this.args.overrides)
          );
        },
        ParenExpr_parens(r, e, t) {
          return e.eval(this.args.overrides);
        },
        Roll(r, e, t) {
          const n = Math.max(r.eval(this.args.overrides), 0),
            i = Math.max(t.eval(this.args.overrides), 0);
          return i === 0 ? 0 : jr(kr(0, n).map(() => Tr(1, i)));
        },
        Number(r, e, t, n) {
          var s;
          const i = (s = n.child(0)) == null ? void 0 : s.sourceString;
          return (i == null ? void 0 : i.length) > 0 && i in this.args.overrides
            ? this.args.overrides[i]
            : parseInt(r.sourceString + e.sourceString);
        },
      })
      .addOperation("toDescription()", {
        ASExpr_add(r, e, t) {
          return M(r.toDescription(), M([" + "], t.toDescription()));
        },
        ASExpr_sub(r, e, t) {
          return M(r.toDescription(), M([" - "], t.toDescription()));
        },
        MDExpr_mul(r, e, t) {
          return M(r.toDescription(), M([" * "], t.toDescription()));
        },
        MDExpr_div(r, e, t) {
          return M(r.toDescription(), M([" / "], t.toDescription()));
        },
        ExpExpr_exp(r, e, t) {
          return M(r.toDescription(), M([" ^ "], t.toDescription()));
        },
        ParenExpr_parens(r, e, t) {
          return M(["("], M(e.toDescription(), [")"]));
        },
        Roll(r, e, t) {
          return M(r.toDescription(), M(["d"], t.toDescription()));
        },
        Number(r, e, t, n) {
          var s;
          const i = (s = n.child(0)) == null ? void 0 : s.sourceString;
          return (i == null ? void 0 : i.length) > 0
            ? [
                {
                  type: "label",
                  name: i,
                  value: parseInt(r.sourceString + e.sourceString),
                },
              ]
            : [`${r.sourceString}${e.sourceString}`];
        },
      }),
    qr = (r) => [r[0], r.slice(1)],
    zr = (r) => [r.slice(0, r.length - 1), r[r.length - 1]],
    M = (r, e) => {
      if (r.length === 0) return e;
      if (e.length === 0) return r;
      const [t, n] = zr(r),
        [i, s] = qr(e);
      return typeof n == "string" && typeof i == "string"
        ? [...t, `${n}${i}`, ...s]
        : [...r, ...e];
    };
  var Ur = Object.freeze({
    __proto__: null,
    calculateDistribtion: async (r, e, t = 1e4) => {
      const n = St.match(r);
      if (!n.succeeded()) throw new Error(n.message);
      const i = {};
      for (let s = 0; s < t; s++) {
        const o = Gr(n).eval(e);
        i[o] = (i[o] || 0) + 1;
      }
      return Object.entries(i)
        .map(([s, o]) => [Number(s), o])
        .sort(([s, o], [l, u]) => s - l);
    },
  });
  he(Ur);
})();
