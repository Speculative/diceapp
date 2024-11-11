(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) n(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const a of o.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && n(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : i.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function n(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = r(i);
    fetch(i.href, o);
  }
})();
var Xu =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function he(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Ow = { exports: {} },
  dc = {},
  _w = { exports: {} },
  ee = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Nu = Symbol.for("react.element"),
  BA = Symbol.for("react.portal"),
  zA = Symbol.for("react.fragment"),
  UA = Symbol.for("react.strict_mode"),
  WA = Symbol.for("react.profiler"),
  HA = Symbol.for("react.provider"),
  GA = Symbol.for("react.context"),
  VA = Symbol.for("react.forward_ref"),
  qA = Symbol.for("react.suspense"),
  KA = Symbol.for("react.memo"),
  XA = Symbol.for("react.lazy"),
  cy = Symbol.iterator;
function YA(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (cy && e[cy]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Pw = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Aw = Object.assign,
  Ew = {};
function No(e, t, r) {
  (this.props = e),
    (this.context = t),
    (this.refs = Ew),
    (this.updater = r || Pw);
}
No.prototype.isReactComponent = {};
No.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
No.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Iw() {}
Iw.prototype = No.prototype;
function Qh(e, t, r) {
  (this.props = e),
    (this.context = t),
    (this.refs = Ew),
    (this.updater = r || Pw);
}
var Zh = (Qh.prototype = new Iw());
Zh.constructor = Qh;
Aw(Zh, No.prototype);
Zh.isPureReactComponent = !0;
var fy = Array.isArray,
  Tw = Object.prototype.hasOwnProperty,
  Jh = { current: null },
  $w = { key: !0, ref: !0, __self: !0, __source: !0 };
function Cw(e, t, r) {
  var n,
    i = {},
    o = null,
    a = null;
  if (t != null)
    for (n in (t.ref !== void 0 && (a = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      Tw.call(t, n) && !$w.hasOwnProperty(n) && (i[n] = t[n]);
  var u = arguments.length - 2;
  if (u === 1) i.children = r;
  else if (1 < u) {
    for (var s = Array(u), l = 0; l < u; l++) s[l] = arguments[l + 2];
    i.children = s;
  }
  if (e && e.defaultProps)
    for (n in ((u = e.defaultProps), u)) i[n] === void 0 && (i[n] = u[n]);
  return {
    $$typeof: Nu,
    type: e,
    key: o,
    ref: a,
    props: i,
    _owner: Jh.current,
  };
}
function QA(e, t) {
  return {
    $$typeof: Nu,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function ev(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Nu;
}
function ZA(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (r) {
      return t[r];
    })
  );
}
var py = /\/+/g;
function Pf(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? ZA("" + e.key)
    : t.toString(36);
}
function Is(e, t, r, n, i) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var a = !1;
  if (e === null) a = !0;
  else
    switch (o) {
      case "string":
      case "number":
        a = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Nu:
          case BA:
            a = !0;
        }
    }
  if (a)
    return (
      (a = e),
      (i = i(a)),
      (e = n === "" ? "." + Pf(a, 0) : n),
      fy(i)
        ? ((r = ""),
          e != null && (r = e.replace(py, "$&/") + "/"),
          Is(i, t, r, "", function (l) {
            return l;
          }))
        : i != null &&
          (ev(i) &&
            (i = QA(
              i,
              r +
                (!i.key || (a && a.key === i.key)
                  ? ""
                  : ("" + i.key).replace(py, "$&/") + "/") +
                e
            )),
          t.push(i)),
      1
    );
  if (((a = 0), (n = n === "" ? "." : n + ":"), fy(e)))
    for (var u = 0; u < e.length; u++) {
      o = e[u];
      var s = n + Pf(o, u);
      a += Is(o, t, r, s, i);
    }
  else if (((s = YA(e)), typeof s == "function"))
    for (e = s.call(e), u = 0; !(o = e.next()).done; )
      (o = o.value), (s = n + Pf(o, u++)), (a += Is(o, t, r, s, i));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return a;
}
function Yu(e, t, r) {
  if (e == null) return e;
  var n = [],
    i = 0;
  return (
    Is(e, n, "", "", function (o) {
      return t.call(r, o, i++);
    }),
    n
  );
}
function JA(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (r) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = r));
        },
        function (r) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = r));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var xt = { current: null },
  Ts = { transition: null },
  eE = {
    ReactCurrentDispatcher: xt,
    ReactCurrentBatchConfig: Ts,
    ReactCurrentOwner: Jh,
  };
function kw() {
  throw Error("act(...) is not supported in production builds of React.");
}
ee.Children = {
  map: Yu,
  forEach: function (e, t, r) {
    Yu(
      e,
      function () {
        t.apply(this, arguments);
      },
      r
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Yu(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Yu(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!ev(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
ee.Component = No;
ee.Fragment = zA;
ee.Profiler = WA;
ee.PureComponent = Qh;
ee.StrictMode = UA;
ee.Suspense = qA;
ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = eE;
ee.act = kw;
ee.cloneElement = function (e, t, r) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var n = Aw({}, e.props),
    i = e.key,
    o = e.ref,
    a = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (a = Jh.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var u = e.type.defaultProps;
    for (s in t)
      Tw.call(t, s) &&
        !$w.hasOwnProperty(s) &&
        (n[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) n.children = r;
  else if (1 < s) {
    u = Array(s);
    for (var l = 0; l < s; l++) u[l] = arguments[l + 2];
    n.children = u;
  }
  return { $$typeof: Nu, type: e.type, key: i, ref: o, props: n, _owner: a };
};
ee.createContext = function (e) {
  return (
    (e = {
      $$typeof: GA,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: HA, _context: e }),
    (e.Consumer = e)
  );
};
ee.createElement = Cw;
ee.createFactory = function (e) {
  var t = Cw.bind(null, e);
  return (t.type = e), t;
};
ee.createRef = function () {
  return { current: null };
};
ee.forwardRef = function (e) {
  return { $$typeof: VA, render: e };
};
ee.isValidElement = ev;
ee.lazy = function (e) {
  return { $$typeof: XA, _payload: { _status: -1, _result: e }, _init: JA };
};
ee.memo = function (e, t) {
  return { $$typeof: KA, type: e, compare: t === void 0 ? null : t };
};
ee.startTransition = function (e) {
  var t = Ts.transition;
  Ts.transition = {};
  try {
    e();
  } finally {
    Ts.transition = t;
  }
};
ee.unstable_act = kw;
ee.useCallback = function (e, t) {
  return xt.current.useCallback(e, t);
};
ee.useContext = function (e) {
  return xt.current.useContext(e);
};
ee.useDebugValue = function () {};
ee.useDeferredValue = function (e) {
  return xt.current.useDeferredValue(e);
};
ee.useEffect = function (e, t) {
  return xt.current.useEffect(e, t);
};
ee.useId = function () {
  return xt.current.useId();
};
ee.useImperativeHandle = function (e, t, r) {
  return xt.current.useImperativeHandle(e, t, r);
};
ee.useInsertionEffect = function (e, t) {
  return xt.current.useInsertionEffect(e, t);
};
ee.useLayoutEffect = function (e, t) {
  return xt.current.useLayoutEffect(e, t);
};
ee.useMemo = function (e, t) {
  return xt.current.useMemo(e, t);
};
ee.useReducer = function (e, t, r) {
  return xt.current.useReducer(e, t, r);
};
ee.useRef = function (e) {
  return xt.current.useRef(e);
};
ee.useState = function (e) {
  return xt.current.useState(e);
};
ee.useSyncExternalStore = function (e, t, r) {
  return xt.current.useSyncExternalStore(e, t, r);
};
ee.useTransition = function () {
  return xt.current.useTransition();
};
ee.version = "18.3.1";
_w.exports = ee;
var z = _w.exports;
const A = he(z);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var tE = z,
  rE = Symbol.for("react.element"),
  nE = Symbol.for("react.fragment"),
  iE = Object.prototype.hasOwnProperty,
  oE = tE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  aE = { key: !0, ref: !0, __self: !0, __source: !0 };
function jw(e, t, r) {
  var n,
    i = {},
    o = null,
    a = null;
  r !== void 0 && (o = "" + r),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (a = t.ref);
  for (n in t) iE.call(t, n) && !aE.hasOwnProperty(n) && (i[n] = t[n]);
  if (e && e.defaultProps)
    for (n in ((t = e.defaultProps), t)) i[n] === void 0 && (i[n] = t[n]);
  return {
    $$typeof: rE,
    type: e,
    key: o,
    ref: a,
    props: i,
    _owner: oE.current,
  };
}
dc.Fragment = nE;
dc.jsx = jw;
dc.jsxs = jw;
Ow.exports = dc;
var de = Ow.exports,
  Mw = { exports: {} },
  qt = {},
  Nw = { exports: {} },
  Dw = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(T, k) {
    var F = T.length;
    T.push(k);
    e: for (; 0 < F; ) {
      var H = (F - 1) >>> 1,
        U = T[H];
      if (0 < i(U, k)) (T[H] = k), (T[F] = U), (F = H);
      else break e;
    }
  }
  function r(T) {
    return T.length === 0 ? null : T[0];
  }
  function n(T) {
    if (T.length === 0) return null;
    var k = T[0],
      F = T.pop();
    if (F !== k) {
      T[0] = F;
      e: for (var H = 0, U = T.length, K = U >>> 1; H < K; ) {
        var re = 2 * (H + 1) - 1,
          Se = T[re],
          ke = re + 1,
          Xt = T[ke];
        if (0 > i(Se, F))
          ke < U && 0 > i(Xt, Se)
            ? ((T[H] = Xt), (T[ke] = F), (H = ke))
            : ((T[H] = Se), (T[re] = F), (H = re));
        else if (ke < U && 0 > i(Xt, F)) (T[H] = Xt), (T[ke] = F), (H = ke);
        else break e;
      }
    }
    return k;
  }
  function i(T, k) {
    var F = T.sortIndex - k.sortIndex;
    return F !== 0 ? F : T.id - k.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var a = Date,
      u = a.now();
    e.unstable_now = function () {
      return a.now() - u;
    };
  }
  var s = [],
    l = [],
    f = 1,
    c = null,
    p = 3,
    d = !1,
    h = !1,
    y = !1,
    w = typeof setTimeout == "function" ? setTimeout : null,
    m = typeof clearTimeout == "function" ? clearTimeout : null,
    v = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(T) {
    for (var k = r(l); k !== null; ) {
      if (k.callback === null) n(l);
      else if (k.startTime <= T)
        n(l), (k.sortIndex = k.expirationTime), t(s, k);
      else break;
      k = r(l);
    }
  }
  function S(T) {
    if (((y = !1), g(T), !h))
      if (r(s) !== null) (h = !0), D(b);
      else {
        var k = r(l);
        k !== null && L(S, k.startTime - T);
      }
  }
  function b(T, k) {
    (h = !1), y && ((y = !1), m(_), (_ = -1)), (d = !0);
    var F = p;
    try {
      for (
        g(k), c = r(s);
        c !== null && (!(c.expirationTime > k) || (T && !E()));

      ) {
        var H = c.callback;
        if (typeof H == "function") {
          (c.callback = null), (p = c.priorityLevel);
          var U = H(c.expirationTime <= k);
          (k = e.unstable_now()),
            typeof U == "function" ? (c.callback = U) : c === r(s) && n(s),
            g(k);
        } else n(s);
        c = r(s);
      }
      if (c !== null) var K = !0;
      else {
        var re = r(l);
        re !== null && L(S, re.startTime - k), (K = !1);
      }
      return K;
    } finally {
      (c = null), (p = F), (d = !1);
    }
  }
  var x = !1,
    O = null,
    _ = -1,
    P = 5,
    I = -1;
  function E() {
    return !(e.unstable_now() - I < P);
  }
  function $() {
    if (O !== null) {
      var T = e.unstable_now();
      I = T;
      var k = !0;
      try {
        k = O(!0, T);
      } finally {
        k ? M() : ((x = !1), (O = null));
      }
    } else x = !1;
  }
  var M;
  if (typeof v == "function")
    M = function () {
      v($);
    };
  else if (typeof MessageChannel < "u") {
    var N = new MessageChannel(),
      j = N.port2;
    (N.port1.onmessage = $),
      (M = function () {
        j.postMessage(null);
      });
  } else
    M = function () {
      w($, 0);
    };
  function D(T) {
    (O = T), x || ((x = !0), M());
  }
  function L(T, k) {
    _ = w(function () {
      T(e.unstable_now());
    }, k);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (T) {
      T.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      h || d || ((h = !0), D(b));
    }),
    (e.unstable_forceFrameRate = function (T) {
      0 > T || 125 < T
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (P = 0 < T ? Math.floor(1e3 / T) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return p;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return r(s);
    }),
    (e.unstable_next = function (T) {
      switch (p) {
        case 1:
        case 2:
        case 3:
          var k = 3;
          break;
        default:
          k = p;
      }
      var F = p;
      p = k;
      try {
        return T();
      } finally {
        p = F;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (T, k) {
      switch (T) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          T = 3;
      }
      var F = p;
      p = T;
      try {
        return k();
      } finally {
        p = F;
      }
    }),
    (e.unstable_scheduleCallback = function (T, k, F) {
      var H = e.unstable_now();
      switch (
        (typeof F == "object" && F !== null
          ? ((F = F.delay), (F = typeof F == "number" && 0 < F ? H + F : H))
          : (F = H),
        T)
      ) {
        case 1:
          var U = -1;
          break;
        case 2:
          U = 250;
          break;
        case 5:
          U = 1073741823;
          break;
        case 4:
          U = 1e4;
          break;
        default:
          U = 5e3;
      }
      return (
        (U = F + U),
        (T = {
          id: f++,
          callback: k,
          priorityLevel: T,
          startTime: F,
          expirationTime: U,
          sortIndex: -1,
        }),
        F > H
          ? ((T.sortIndex = F),
            t(l, T),
            r(s) === null &&
              T === r(l) &&
              (y ? (m(_), (_ = -1)) : (y = !0), L(S, F - H)))
          : ((T.sortIndex = U), t(s, T), h || d || ((h = !0), D(b))),
        T
      );
    }),
    (e.unstable_shouldYield = E),
    (e.unstable_wrapCallback = function (T) {
      var k = p;
      return function () {
        var F = p;
        p = k;
        try {
          return T.apply(this, arguments);
        } finally {
          p = F;
        }
      };
    });
})(Dw);
Nw.exports = Dw;
var uE = Nw.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var sE = z,
  Vt = uE;
function B(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1;
    r < arguments.length;
    r++
  )
    t += "&args[]=" + encodeURIComponent(arguments[r]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Lw = new Set(),
  Da = {};
function bi(e, t) {
  ao(e, t), ao(e + "Capture", t);
}
function ao(e, t) {
  for (Da[e] = t, e = 0; e < t.length; e++) Lw.add(t[e]);
}
var Kr = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Tp = Object.prototype.hasOwnProperty,
  lE =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  dy = {},
  hy = {};
function cE(e) {
  return Tp.call(hy, e)
    ? !0
    : Tp.call(dy, e)
      ? !1
      : lE.test(e)
        ? (hy[e] = !0)
        : ((dy[e] = !0), !1);
}
function fE(e, t, r, n) {
  if (r !== null && r.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return n
        ? !1
        : r !== null
          ? !r.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function pE(e, t, r, n) {
  if (t === null || typeof t > "u" || fE(e, t, r, n)) return !0;
  if (n) return !1;
  if (r !== null)
    switch (r.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function St(e, t, r, n, i, o, a) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = n),
    (this.attributeNamespace = i),
    (this.mustUseProperty = r),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = a);
}
var rt = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    rt[e] = new St(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  rt[t] = new St(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  rt[e] = new St(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  rt[e] = new St(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    rt[e] = new St(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  rt[e] = new St(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  rt[e] = new St(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  rt[e] = new St(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  rt[e] = new St(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var tv = /[\-:]([a-z])/g;
function rv(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(tv, rv);
    rt[t] = new St(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(tv, rv);
    rt[t] = new St(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(tv, rv);
  rt[t] = new St(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  rt[e] = new St(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
rt.xlinkHref = new St(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  rt[e] = new St(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function nv(e, t, r, n) {
  var i = rt.hasOwnProperty(t) ? rt[t] : null;
  (i !== null
    ? i.type !== 0
    : n ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (pE(t, r, i, n) && (r = null),
    n || i === null
      ? cE(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r))
      : i.mustUseProperty
        ? (e[i.propertyName] = r === null ? (i.type === 3 ? !1 : "") : r)
        : ((t = i.attributeName),
          (n = i.attributeNamespace),
          r === null
            ? e.removeAttribute(t)
            : ((i = i.type),
              (r = i === 3 || (i === 4 && r === !0) ? "" : "" + r),
              n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r))));
}
var tn = sE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Qu = Symbol.for("react.element"),
  Ni = Symbol.for("react.portal"),
  Di = Symbol.for("react.fragment"),
  iv = Symbol.for("react.strict_mode"),
  $p = Symbol.for("react.profiler"),
  Rw = Symbol.for("react.provider"),
  Fw = Symbol.for("react.context"),
  ov = Symbol.for("react.forward_ref"),
  Cp = Symbol.for("react.suspense"),
  kp = Symbol.for("react.suspense_list"),
  av = Symbol.for("react.memo"),
  ln = Symbol.for("react.lazy"),
  Bw = Symbol.for("react.offscreen"),
  vy = Symbol.iterator;
function Zo(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (vy && e[vy]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Ee = Object.assign,
  Af;
function ma(e) {
  if (Af === void 0)
    try {
      throw Error();
    } catch (r) {
      var t = r.stack.trim().match(/\n( *(at )?)/);
      Af = (t && t[1]) || "";
    }
  return (
    `
` +
    Af +
    e
  );
}
var Ef = !1;
function If(e, t) {
  if (!e || Ef) return "";
  Ef = !0;
  var r = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (l) {
          var n = l;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (l) {
          n = l;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (l) {
        n = l;
      }
      e();
    }
  } catch (l) {
    if (l && n && typeof l.stack == "string") {
      for (
        var i = l.stack.split(`
`),
          o = n.stack.split(`
`),
          a = i.length - 1,
          u = o.length - 1;
        1 <= a && 0 <= u && i[a] !== o[u];

      )
        u--;
      for (; 1 <= a && 0 <= u; a--, u--)
        if (i[a] !== o[u]) {
          if (a !== 1 || u !== 1)
            do
              if ((a--, u--, 0 > u || i[a] !== o[u])) {
                var s =
                  `
` + i[a].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    s.includes("<anonymous>") &&
                    (s = s.replace("<anonymous>", e.displayName)),
                  s
                );
              }
            while (1 <= a && 0 <= u);
          break;
        }
    }
  } finally {
    (Ef = !1), (Error.prepareStackTrace = r);
  }
  return (e = e ? e.displayName || e.name : "") ? ma(e) : "";
}
function dE(e) {
  switch (e.tag) {
    case 5:
      return ma(e.type);
    case 16:
      return ma("Lazy");
    case 13:
      return ma("Suspense");
    case 19:
      return ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = If(e.type, !1)), e;
    case 11:
      return (e = If(e.type.render, !1)), e;
    case 1:
      return (e = If(e.type, !0)), e;
    default:
      return "";
  }
}
function jp(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Di:
      return "Fragment";
    case Ni:
      return "Portal";
    case $p:
      return "Profiler";
    case iv:
      return "StrictMode";
    case Cp:
      return "Suspense";
    case kp:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Fw:
        return (e.displayName || "Context") + ".Consumer";
      case Rw:
        return (e._context.displayName || "Context") + ".Provider";
      case ov:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case av:
        return (
          (t = e.displayName || null), t !== null ? t : jp(e.type) || "Memo"
        );
      case ln:
        (t = e._payload), (e = e._init);
        try {
          return jp(e(t));
        } catch {}
    }
  return null;
}
function hE(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return jp(t);
    case 8:
      return t === iv ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Tn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function zw(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function vE(e) {
  var t = zw(e) ? "checked" : "value",
    r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    n = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof r < "u" &&
    typeof r.get == "function" &&
    typeof r.set == "function"
  ) {
    var i = r.get,
      o = r.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (a) {
          (n = "" + a), o.call(this, a);
        },
      }),
      Object.defineProperty(e, t, { enumerable: r.enumerable }),
      {
        getValue: function () {
          return n;
        },
        setValue: function (a) {
          n = "" + a;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Zu(e) {
  e._valueTracker || (e._valueTracker = vE(e));
}
function Uw(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var r = t.getValue(),
    n = "";
  return (
    e && (n = zw(e) ? (e.checked ? "true" : "false") : e.value),
    (e = n),
    e !== r ? (t.setValue(e), !0) : !1
  );
}
function zs(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Mp(e, t) {
  var r = t.checked;
  return Ee({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: r ?? e._wrapperState.initialChecked,
  });
}
function my(e, t) {
  var r = t.defaultValue == null ? "" : t.defaultValue,
    n = t.checked != null ? t.checked : t.defaultChecked;
  (r = Tn(t.value != null ? t.value : r)),
    (e._wrapperState = {
      initialChecked: n,
      initialValue: r,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function Ww(e, t) {
  (t = t.checked), t != null && nv(e, "checked", t, !1);
}
function Np(e, t) {
  Ww(e, t);
  var r = Tn(t.value),
    n = t.type;
  if (r != null)
    n === "number"
      ? ((r === 0 && e.value === "") || e.value != r) && (e.value = "" + r)
      : e.value !== "" + r && (e.value = "" + r);
  else if (n === "submit" || n === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? Dp(e, t.type, r)
    : t.hasOwnProperty("defaultValue") && Dp(e, t.type, Tn(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function yy(e, t, r) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var n = t.type;
    if (
      !(
        (n !== "submit" && n !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      r || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (r = e.name),
    r !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    r !== "" && (e.name = r);
}
function Dp(e, t, r) {
  (t !== "number" || zs(e.ownerDocument) !== e) &&
    (r == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
}
var ya = Array.isArray;
function Yi(e, t, r, n) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < r.length; i++) t["$" + r[i]] = !0;
    for (r = 0; r < e.length; r++)
      (i = t.hasOwnProperty("$" + e[r].value)),
        e[r].selected !== i && (e[r].selected = i),
        i && n && (e[r].defaultSelected = !0);
  } else {
    for (r = "" + Tn(r), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === r) {
        (e[i].selected = !0), n && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function Lp(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(B(91));
  return Ee({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function gy(e, t) {
  var r = t.value;
  if (r == null) {
    if (((r = t.children), (t = t.defaultValue), r != null)) {
      if (t != null) throw Error(B(92));
      if (ya(r)) {
        if (1 < r.length) throw Error(B(93));
        r = r[0];
      }
      t = r;
    }
    t == null && (t = ""), (r = t);
  }
  e._wrapperState = { initialValue: Tn(r) };
}
function Hw(e, t) {
  var r = Tn(t.value),
    n = Tn(t.defaultValue);
  r != null &&
    ((r = "" + r),
    r !== e.value && (e.value = r),
    t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)),
    n != null && (e.defaultValue = "" + n);
}
function by(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Gw(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Rp(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Gw(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Ju,
  Vw = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, r, n, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, r, n, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Ju = Ju || document.createElement("div"),
          Ju.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Ju.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function La(e, t) {
  if (t) {
    var r = e.firstChild;
    if (r && r === e.lastChild && r.nodeType === 3) {
      r.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Oa = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  mE = ["Webkit", "ms", "Moz", "O"];
Object.keys(Oa).forEach(function (e) {
  mE.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Oa[t] = Oa[e]);
  });
});
function qw(e, t, r) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : r || typeof t != "number" || t === 0 || (Oa.hasOwnProperty(e) && Oa[e])
      ? ("" + t).trim()
      : t + "px";
}
function Kw(e, t) {
  e = e.style;
  for (var r in t)
    if (t.hasOwnProperty(r)) {
      var n = r.indexOf("--") === 0,
        i = qw(r, t[r], n);
      r === "float" && (r = "cssFloat"), n ? e.setProperty(r, i) : (e[r] = i);
    }
}
var yE = Ee(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function Fp(e, t) {
  if (t) {
    if (yE[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(B(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(B(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(B(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(B(62));
  }
}
function Bp(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var zp = null;
function uv(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Up = null,
  Qi = null,
  Zi = null;
function wy(e) {
  if ((e = Ru(e))) {
    if (typeof Up != "function") throw Error(B(280));
    var t = e.stateNode;
    t && ((t = gc(t)), Up(e.stateNode, e.type, t));
  }
}
function Xw(e) {
  Qi ? (Zi ? Zi.push(e) : (Zi = [e])) : (Qi = e);
}
function Yw() {
  if (Qi) {
    var e = Qi,
      t = Zi;
    if (((Zi = Qi = null), wy(e), t)) for (e = 0; e < t.length; e++) wy(t[e]);
  }
}
function Qw(e, t) {
  return e(t);
}
function Zw() {}
var Tf = !1;
function Jw(e, t, r) {
  if (Tf) return e(t, r);
  Tf = !0;
  try {
    return Qw(e, t, r);
  } finally {
    (Tf = !1), (Qi !== null || Zi !== null) && (Zw(), Yw());
  }
}
function Ra(e, t) {
  var r = e.stateNode;
  if (r === null) return null;
  var n = gc(r);
  if (n === null) return null;
  r = n[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (n = !n.disabled) ||
        ((e = e.type),
        (n = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !n);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (r && typeof r != "function") throw Error(B(231, t, typeof r));
  return r;
}
var Wp = !1;
if (Kr)
  try {
    var Jo = {};
    Object.defineProperty(Jo, "passive", {
      get: function () {
        Wp = !0;
      },
    }),
      window.addEventListener("test", Jo, Jo),
      window.removeEventListener("test", Jo, Jo);
  } catch {
    Wp = !1;
  }
function gE(e, t, r, n, i, o, a, u, s) {
  var l = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(r, l);
  } catch (f) {
    this.onError(f);
  }
}
var _a = !1,
  Us = null,
  Ws = !1,
  Hp = null,
  bE = {
    onError: function (e) {
      (_a = !0), (Us = e);
    },
  };
function wE(e, t, r, n, i, o, a, u, s) {
  (_a = !1), (Us = null), gE.apply(bE, arguments);
}
function xE(e, t, r, n, i, o, a, u, s) {
  if ((wE.apply(this, arguments), _a)) {
    if (_a) {
      var l = Us;
      (_a = !1), (Us = null);
    } else throw Error(B(198));
    Ws || ((Ws = !0), (Hp = l));
  }
}
function wi(e) {
  var t = e,
    r = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (r = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? r : null;
}
function ex(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function xy(e) {
  if (wi(e) !== e) throw Error(B(188));
}
function SE(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = wi(e)), t === null)) throw Error(B(188));
    return t !== e ? null : e;
  }
  for (var r = e, n = t; ; ) {
    var i = r.return;
    if (i === null) break;
    var o = i.alternate;
    if (o === null) {
      if (((n = i.return), n !== null)) {
        r = n;
        continue;
      }
      break;
    }
    if (i.child === o.child) {
      for (o = i.child; o; ) {
        if (o === r) return xy(i), e;
        if (o === n) return xy(i), t;
        o = o.sibling;
      }
      throw Error(B(188));
    }
    if (r.return !== n.return) (r = i), (n = o);
    else {
      for (var a = !1, u = i.child; u; ) {
        if (u === r) {
          (a = !0), (r = i), (n = o);
          break;
        }
        if (u === n) {
          (a = !0), (n = i), (r = o);
          break;
        }
        u = u.sibling;
      }
      if (!a) {
        for (u = o.child; u; ) {
          if (u === r) {
            (a = !0), (r = o), (n = i);
            break;
          }
          if (u === n) {
            (a = !0), (n = o), (r = i);
            break;
          }
          u = u.sibling;
        }
        if (!a) throw Error(B(189));
      }
    }
    if (r.alternate !== n) throw Error(B(190));
  }
  if (r.tag !== 3) throw Error(B(188));
  return r.stateNode.current === r ? e : t;
}
function tx(e) {
  return (e = SE(e)), e !== null ? rx(e) : null;
}
function rx(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = rx(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var nx = Vt.unstable_scheduleCallback,
  Sy = Vt.unstable_cancelCallback,
  OE = Vt.unstable_shouldYield,
  _E = Vt.unstable_requestPaint,
  je = Vt.unstable_now,
  PE = Vt.unstable_getCurrentPriorityLevel,
  sv = Vt.unstable_ImmediatePriority,
  ix = Vt.unstable_UserBlockingPriority,
  Hs = Vt.unstable_NormalPriority,
  AE = Vt.unstable_LowPriority,
  ox = Vt.unstable_IdlePriority,
  hc = null,
  Tr = null;
function EE(e) {
  if (Tr && typeof Tr.onCommitFiberRoot == "function")
    try {
      Tr.onCommitFiberRoot(hc, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var gr = Math.clz32 ? Math.clz32 : $E,
  IE = Math.log,
  TE = Math.LN2;
function $E(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((IE(e) / TE) | 0)) | 0;
}
var es = 64,
  ts = 4194304;
function ga(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Gs(e, t) {
  var r = e.pendingLanes;
  if (r === 0) return 0;
  var n = 0,
    i = e.suspendedLanes,
    o = e.pingedLanes,
    a = r & 268435455;
  if (a !== 0) {
    var u = a & ~i;
    u !== 0 ? (n = ga(u)) : ((o &= a), o !== 0 && (n = ga(o)));
  } else (a = r & ~i), a !== 0 ? (n = ga(a)) : o !== 0 && (n = ga(o));
  if (n === 0) return 0;
  if (
    t !== 0 &&
    t !== n &&
    !(t & i) &&
    ((i = n & -n), (o = t & -t), i >= o || (i === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((n & 4 && (n |= r & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= n; 0 < t; )
      (r = 31 - gr(t)), (i = 1 << r), (n |= e[r]), (t &= ~i);
  return n;
}
function CE(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function kE(e, t) {
  for (
    var r = e.suspendedLanes,
      n = e.pingedLanes,
      i = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var a = 31 - gr(o),
      u = 1 << a,
      s = i[a];
    s === -1
      ? (!(u & r) || u & n) && (i[a] = CE(u, t))
      : s <= t && (e.expiredLanes |= u),
      (o &= ~u);
  }
}
function Gp(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function ax() {
  var e = es;
  return (es <<= 1), !(es & 4194240) && (es = 64), e;
}
function $f(e) {
  for (var t = [], r = 0; 31 > r; r++) t.push(e);
  return t;
}
function Du(e, t, r) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - gr(t)),
    (e[t] = r);
}
function jE(e, t) {
  var r = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var n = e.eventTimes;
  for (e = e.expirationTimes; 0 < r; ) {
    var i = 31 - gr(r),
      o = 1 << i;
    (t[i] = 0), (n[i] = -1), (e[i] = -1), (r &= ~o);
  }
}
function lv(e, t) {
  var r = (e.entangledLanes |= t);
  for (e = e.entanglements; r; ) {
    var n = 31 - gr(r),
      i = 1 << n;
    (i & t) | (e[n] & t) && (e[n] |= t), (r &= ~i);
  }
}
var le = 0;
function ux(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var sx,
  cv,
  lx,
  cx,
  fx,
  Vp = !1,
  rs = [],
  gn = null,
  bn = null,
  wn = null,
  Fa = new Map(),
  Ba = new Map(),
  pn = [],
  ME =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function Oy(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      gn = null;
      break;
    case "dragenter":
    case "dragleave":
      bn = null;
      break;
    case "mouseover":
    case "mouseout":
      wn = null;
      break;
    case "pointerover":
    case "pointerout":
      Fa.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ba.delete(t.pointerId);
  }
}
function ea(e, t, r, n, i, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: r,
        eventSystemFlags: n,
        nativeEvent: o,
        targetContainers: [i],
      }),
      t !== null && ((t = Ru(t)), t !== null && cv(t)),
      e)
    : ((e.eventSystemFlags |= n),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function NE(e, t, r, n, i) {
  switch (t) {
    case "focusin":
      return (gn = ea(gn, e, t, r, n, i)), !0;
    case "dragenter":
      return (bn = ea(bn, e, t, r, n, i)), !0;
    case "mouseover":
      return (wn = ea(wn, e, t, r, n, i)), !0;
    case "pointerover":
      var o = i.pointerId;
      return Fa.set(o, ea(Fa.get(o) || null, e, t, r, n, i)), !0;
    case "gotpointercapture":
      return (
        (o = i.pointerId), Ba.set(o, ea(Ba.get(o) || null, e, t, r, n, i)), !0
      );
  }
  return !1;
}
function px(e) {
  var t = Qn(e.target);
  if (t !== null) {
    var r = wi(t);
    if (r !== null) {
      if (((t = r.tag), t === 13)) {
        if (((t = ex(r)), t !== null)) {
          (e.blockedOn = t),
            fx(e.priority, function () {
              lx(r);
            });
          return;
        }
      } else if (t === 3 && r.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function $s(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var r = qp(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (r === null) {
      r = e.nativeEvent;
      var n = new r.constructor(r.type, r);
      (zp = n), r.target.dispatchEvent(n), (zp = null);
    } else return (t = Ru(r)), t !== null && cv(t), (e.blockedOn = r), !1;
    t.shift();
  }
  return !0;
}
function _y(e, t, r) {
  $s(e) && r.delete(t);
}
function DE() {
  (Vp = !1),
    gn !== null && $s(gn) && (gn = null),
    bn !== null && $s(bn) && (bn = null),
    wn !== null && $s(wn) && (wn = null),
    Fa.forEach(_y),
    Ba.forEach(_y);
}
function ta(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Vp ||
      ((Vp = !0),
      Vt.unstable_scheduleCallback(Vt.unstable_NormalPriority, DE)));
}
function za(e) {
  function t(i) {
    return ta(i, e);
  }
  if (0 < rs.length) {
    ta(rs[0], e);
    for (var r = 1; r < rs.length; r++) {
      var n = rs[r];
      n.blockedOn === e && (n.blockedOn = null);
    }
  }
  for (
    gn !== null && ta(gn, e),
      bn !== null && ta(bn, e),
      wn !== null && ta(wn, e),
      Fa.forEach(t),
      Ba.forEach(t),
      r = 0;
    r < pn.length;
    r++
  )
    (n = pn[r]), n.blockedOn === e && (n.blockedOn = null);
  for (; 0 < pn.length && ((r = pn[0]), r.blockedOn === null); )
    px(r), r.blockedOn === null && pn.shift();
}
var Ji = tn.ReactCurrentBatchConfig,
  Vs = !0;
function LE(e, t, r, n) {
  var i = le,
    o = Ji.transition;
  Ji.transition = null;
  try {
    (le = 1), fv(e, t, r, n);
  } finally {
    (le = i), (Ji.transition = o);
  }
}
function RE(e, t, r, n) {
  var i = le,
    o = Ji.transition;
  Ji.transition = null;
  try {
    (le = 4), fv(e, t, r, n);
  } finally {
    (le = i), (Ji.transition = o);
  }
}
function fv(e, t, r, n) {
  if (Vs) {
    var i = qp(e, t, r, n);
    if (i === null) Bf(e, t, n, qs, r), Oy(e, n);
    else if (NE(i, e, t, r, n)) n.stopPropagation();
    else if ((Oy(e, n), t & 4 && -1 < ME.indexOf(e))) {
      for (; i !== null; ) {
        var o = Ru(i);
        if (
          (o !== null && sx(o),
          (o = qp(e, t, r, n)),
          o === null && Bf(e, t, n, qs, r),
          o === i)
        )
          break;
        i = o;
      }
      i !== null && n.stopPropagation();
    } else Bf(e, t, n, null, r);
  }
}
var qs = null;
function qp(e, t, r, n) {
  if (((qs = null), (e = uv(n)), (e = Qn(e)), e !== null))
    if (((t = wi(e)), t === null)) e = null;
    else if (((r = t.tag), r === 13)) {
      if (((e = ex(t)), e !== null)) return e;
      e = null;
    } else if (r === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (qs = e), null;
}
function dx(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (PE()) {
        case sv:
          return 1;
        case ix:
          return 4;
        case Hs:
        case AE:
          return 16;
        case ox:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var vn = null,
  pv = null,
  Cs = null;
function hx() {
  if (Cs) return Cs;
  var e,
    t = pv,
    r = t.length,
    n,
    i = "value" in vn ? vn.value : vn.textContent,
    o = i.length;
  for (e = 0; e < r && t[e] === i[e]; e++);
  var a = r - e;
  for (n = 1; n <= a && t[r - n] === i[o - n]; n++);
  return (Cs = i.slice(e, 1 < n ? 1 - n : void 0));
}
function ks(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function ns() {
  return !0;
}
function Py() {
  return !1;
}
function Kt(e) {
  function t(r, n, i, o, a) {
    (this._reactName = r),
      (this._targetInst = i),
      (this.type = n),
      (this.nativeEvent = o),
      (this.target = a),
      (this.currentTarget = null);
    for (var u in e)
      e.hasOwnProperty(u) && ((r = e[u]), (this[u] = r ? r(o) : o[u]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? ns
        : Py),
      (this.isPropagationStopped = Py),
      this
    );
  }
  return (
    Ee(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r &&
          (r.preventDefault
            ? r.preventDefault()
            : typeof r.returnValue != "unknown" && (r.returnValue = !1),
          (this.isDefaultPrevented = ns));
      },
      stopPropagation: function () {
        var r = this.nativeEvent;
        r &&
          (r.stopPropagation
            ? r.stopPropagation()
            : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0),
          (this.isPropagationStopped = ns));
      },
      persist: function () {},
      isPersistent: ns,
    }),
    t
  );
}
var Do = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  dv = Kt(Do),
  Lu = Ee({}, Do, { view: 0, detail: 0 }),
  FE = Kt(Lu),
  Cf,
  kf,
  ra,
  vc = Ee({}, Lu, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: hv,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== ra &&
            (ra && e.type === "mousemove"
              ? ((Cf = e.screenX - ra.screenX), (kf = e.screenY - ra.screenY))
              : (kf = Cf = 0),
            (ra = e)),
          Cf);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : kf;
    },
  }),
  Ay = Kt(vc),
  BE = Ee({}, vc, { dataTransfer: 0 }),
  zE = Kt(BE),
  UE = Ee({}, Lu, { relatedTarget: 0 }),
  jf = Kt(UE),
  WE = Ee({}, Do, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  HE = Kt(WE),
  GE = Ee({}, Do, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  VE = Kt(GE),
  qE = Ee({}, Do, { data: 0 }),
  Ey = Kt(qE),
  KE = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  XE = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  YE = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function QE(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = YE[e]) ? !!t[e] : !1;
}
function hv() {
  return QE;
}
var ZE = Ee({}, Lu, {
    key: function (e) {
      if (e.key) {
        var t = KE[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = ks(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? XE[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: hv,
    charCode: function (e) {
      return e.type === "keypress" ? ks(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? ks(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  JE = Kt(ZE),
  e2 = Ee({}, vc, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Iy = Kt(e2),
  t2 = Ee({}, Lu, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: hv,
  }),
  r2 = Kt(t2),
  n2 = Ee({}, Do, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  i2 = Kt(n2),
  o2 = Ee({}, vc, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  a2 = Kt(o2),
  u2 = [9, 13, 27, 32],
  vv = Kr && "CompositionEvent" in window,
  Pa = null;
Kr && "documentMode" in document && (Pa = document.documentMode);
var s2 = Kr && "TextEvent" in window && !Pa,
  vx = Kr && (!vv || (Pa && 8 < Pa && 11 >= Pa)),
  Ty = " ",
  $y = !1;
function mx(e, t) {
  switch (e) {
    case "keyup":
      return u2.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function yx(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Li = !1;
function l2(e, t) {
  switch (e) {
    case "compositionend":
      return yx(t);
    case "keypress":
      return t.which !== 32 ? null : (($y = !0), Ty);
    case "textInput":
      return (e = t.data), e === Ty && $y ? null : e;
    default:
      return null;
  }
}
function c2(e, t) {
  if (Li)
    return e === "compositionend" || (!vv && mx(e, t))
      ? ((e = hx()), (Cs = pv = vn = null), (Li = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return vx && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var f2 = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Cy(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!f2[e.type] : t === "textarea";
}
function gx(e, t, r, n) {
  Xw(n),
    (t = Ks(t, "onChange")),
    0 < t.length &&
      ((r = new dv("onChange", "change", null, r, n)),
      e.push({ event: r, listeners: t }));
}
var Aa = null,
  Ua = null;
function p2(e) {
  Tx(e, 0);
}
function mc(e) {
  var t = Bi(e);
  if (Uw(t)) return e;
}
function d2(e, t) {
  if (e === "change") return t;
}
var bx = !1;
if (Kr) {
  var Mf;
  if (Kr) {
    var Nf = "oninput" in document;
    if (!Nf) {
      var ky = document.createElement("div");
      ky.setAttribute("oninput", "return;"),
        (Nf = typeof ky.oninput == "function");
    }
    Mf = Nf;
  } else Mf = !1;
  bx = Mf && (!document.documentMode || 9 < document.documentMode);
}
function jy() {
  Aa && (Aa.detachEvent("onpropertychange", wx), (Ua = Aa = null));
}
function wx(e) {
  if (e.propertyName === "value" && mc(Ua)) {
    var t = [];
    gx(t, Ua, e, uv(e)), Jw(p2, t);
  }
}
function h2(e, t, r) {
  e === "focusin"
    ? (jy(), (Aa = t), (Ua = r), Aa.attachEvent("onpropertychange", wx))
    : e === "focusout" && jy();
}
function v2(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return mc(Ua);
}
function m2(e, t) {
  if (e === "click") return mc(t);
}
function y2(e, t) {
  if (e === "input" || e === "change") return mc(t);
}
function g2(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var xr = typeof Object.is == "function" ? Object.is : g2;
function Wa(e, t) {
  if (xr(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var r = Object.keys(e),
    n = Object.keys(t);
  if (r.length !== n.length) return !1;
  for (n = 0; n < r.length; n++) {
    var i = r[n];
    if (!Tp.call(t, i) || !xr(e[i], t[i])) return !1;
  }
  return !0;
}
function My(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ny(e, t) {
  var r = My(e);
  e = 0;
  for (var n; r; ) {
    if (r.nodeType === 3) {
      if (((n = e + r.textContent.length), e <= t && n >= t))
        return { node: r, offset: t - e };
      e = n;
    }
    e: {
      for (; r; ) {
        if (r.nextSibling) {
          r = r.nextSibling;
          break e;
        }
        r = r.parentNode;
      }
      r = void 0;
    }
    r = My(r);
  }
}
function xx(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? xx(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Sx() {
  for (var e = window, t = zs(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var r = typeof t.contentWindow.location.href == "string";
    } catch {
      r = !1;
    }
    if (r) e = t.contentWindow;
    else break;
    t = zs(e.document);
  }
  return t;
}
function mv(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function b2(e) {
  var t = Sx(),
    r = e.focusedElem,
    n = e.selectionRange;
  if (
    t !== r &&
    r &&
    r.ownerDocument &&
    xx(r.ownerDocument.documentElement, r)
  ) {
    if (n !== null && mv(r)) {
      if (
        ((t = n.start),
        (e = n.end),
        e === void 0 && (e = t),
        "selectionStart" in r)
      )
        (r.selectionStart = t), (r.selectionEnd = Math.min(e, r.value.length));
      else if (
        ((e = ((t = r.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = r.textContent.length,
          o = Math.min(n.start, i);
        (n = n.end === void 0 ? o : Math.min(n.end, i)),
          !e.extend && o > n && ((i = n), (n = o), (o = i)),
          (i = Ny(r, o));
        var a = Ny(r, n);
        i &&
          a &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== a.node ||
            e.focusOffset !== a.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          o > n
            ? (e.addRange(t), e.extend(a.node, a.offset))
            : (t.setEnd(a.node, a.offset), e.addRange(t)));
      }
    }
    for (t = [], e = r; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof r.focus == "function" && r.focus(), r = 0; r < t.length; r++)
      (e = t[r]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var w2 = Kr && "documentMode" in document && 11 >= document.documentMode,
  Ri = null,
  Kp = null,
  Ea = null,
  Xp = !1;
function Dy(e, t, r) {
  var n = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
  Xp ||
    Ri == null ||
    Ri !== zs(n) ||
    ((n = Ri),
    "selectionStart" in n && mv(n)
      ? (n = { start: n.selectionStart, end: n.selectionEnd })
      : ((n = (
          (n.ownerDocument && n.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (n = {
          anchorNode: n.anchorNode,
          anchorOffset: n.anchorOffset,
          focusNode: n.focusNode,
          focusOffset: n.focusOffset,
        })),
    (Ea && Wa(Ea, n)) ||
      ((Ea = n),
      (n = Ks(Kp, "onSelect")),
      0 < n.length &&
        ((t = new dv("onSelect", "select", null, t, r)),
        e.push({ event: t, listeners: n }),
        (t.target = Ri))));
}
function is(e, t) {
  var r = {};
  return (
    (r[e.toLowerCase()] = t.toLowerCase()),
    (r["Webkit" + e] = "webkit" + t),
    (r["Moz" + e] = "moz" + t),
    r
  );
}
var Fi = {
    animationend: is("Animation", "AnimationEnd"),
    animationiteration: is("Animation", "AnimationIteration"),
    animationstart: is("Animation", "AnimationStart"),
    transitionend: is("Transition", "TransitionEnd"),
  },
  Df = {},
  Ox = {};
Kr &&
  ((Ox = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Fi.animationend.animation,
    delete Fi.animationiteration.animation,
    delete Fi.animationstart.animation),
  "TransitionEvent" in window || delete Fi.transitionend.transition);
function yc(e) {
  if (Df[e]) return Df[e];
  if (!Fi[e]) return e;
  var t = Fi[e],
    r;
  for (r in t) if (t.hasOwnProperty(r) && r in Ox) return (Df[e] = t[r]);
  return e;
}
var _x = yc("animationend"),
  Px = yc("animationiteration"),
  Ax = yc("animationstart"),
  Ex = yc("transitionend"),
  Ix = new Map(),
  Ly =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function kn(e, t) {
  Ix.set(e, t), bi(t, [e]);
}
for (var Lf = 0; Lf < Ly.length; Lf++) {
  var Rf = Ly[Lf],
    x2 = Rf.toLowerCase(),
    S2 = Rf[0].toUpperCase() + Rf.slice(1);
  kn(x2, "on" + S2);
}
kn(_x, "onAnimationEnd");
kn(Px, "onAnimationIteration");
kn(Ax, "onAnimationStart");
kn("dblclick", "onDoubleClick");
kn("focusin", "onFocus");
kn("focusout", "onBlur");
kn(Ex, "onTransitionEnd");
ao("onMouseEnter", ["mouseout", "mouseover"]);
ao("onMouseLeave", ["mouseout", "mouseover"]);
ao("onPointerEnter", ["pointerout", "pointerover"]);
ao("onPointerLeave", ["pointerout", "pointerover"]);
bi(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
bi(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
bi("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
bi(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
bi(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
bi(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var ba =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  O2 = new Set("cancel close invalid load scroll toggle".split(" ").concat(ba));
function Ry(e, t, r) {
  var n = e.type || "unknown-event";
  (e.currentTarget = r), xE(n, t, void 0, e), (e.currentTarget = null);
}
function Tx(e, t) {
  t = (t & 4) !== 0;
  for (var r = 0; r < e.length; r++) {
    var n = e[r],
      i = n.event;
    n = n.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var a = n.length - 1; 0 <= a; a--) {
          var u = n[a],
            s = u.instance,
            l = u.currentTarget;
          if (((u = u.listener), s !== o && i.isPropagationStopped())) break e;
          Ry(i, u, l), (o = s);
        }
      else
        for (a = 0; a < n.length; a++) {
          if (
            ((u = n[a]),
            (s = u.instance),
            (l = u.currentTarget),
            (u = u.listener),
            s !== o && i.isPropagationStopped())
          )
            break e;
          Ry(i, u, l), (o = s);
        }
    }
  }
  if (Ws) throw ((e = Hp), (Ws = !1), (Hp = null), e);
}
function ge(e, t) {
  var r = t[ed];
  r === void 0 && (r = t[ed] = new Set());
  var n = e + "__bubble";
  r.has(n) || ($x(t, e, 2, !1), r.add(n));
}
function Ff(e, t, r) {
  var n = 0;
  t && (n |= 4), $x(r, e, n, t);
}
var os = "_reactListening" + Math.random().toString(36).slice(2);
function Ha(e) {
  if (!e[os]) {
    (e[os] = !0),
      Lw.forEach(function (r) {
        r !== "selectionchange" && (O2.has(r) || Ff(r, !1, e), Ff(r, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[os] || ((t[os] = !0), Ff("selectionchange", !1, t));
  }
}
function $x(e, t, r, n) {
  switch (dx(t)) {
    case 1:
      var i = LE;
      break;
    case 4:
      i = RE;
      break;
    default:
      i = fv;
  }
  (r = i.bind(null, t, r, e)),
    (i = void 0),
    !Wp ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (i = !0),
    n
      ? i !== void 0
        ? e.addEventListener(t, r, { capture: !0, passive: i })
        : e.addEventListener(t, r, !0)
      : i !== void 0
        ? e.addEventListener(t, r, { passive: i })
        : e.addEventListener(t, r, !1);
}
function Bf(e, t, r, n, i) {
  var o = n;
  if (!(t & 1) && !(t & 2) && n !== null)
    e: for (;;) {
      if (n === null) return;
      var a = n.tag;
      if (a === 3 || a === 4) {
        var u = n.stateNode.containerInfo;
        if (u === i || (u.nodeType === 8 && u.parentNode === i)) break;
        if (a === 4)
          for (a = n.return; a !== null; ) {
            var s = a.tag;
            if (
              (s === 3 || s === 4) &&
              ((s = a.stateNode.containerInfo),
              s === i || (s.nodeType === 8 && s.parentNode === i))
            )
              return;
            a = a.return;
          }
        for (; u !== null; ) {
          if (((a = Qn(u)), a === null)) return;
          if (((s = a.tag), s === 5 || s === 6)) {
            n = o = a;
            continue e;
          }
          u = u.parentNode;
        }
      }
      n = n.return;
    }
  Jw(function () {
    var l = o,
      f = uv(r),
      c = [];
    e: {
      var p = Ix.get(e);
      if (p !== void 0) {
        var d = dv,
          h = e;
        switch (e) {
          case "keypress":
            if (ks(r) === 0) break e;
          case "keydown":
          case "keyup":
            d = JE;
            break;
          case "focusin":
            (h = "focus"), (d = jf);
            break;
          case "focusout":
            (h = "blur"), (d = jf);
            break;
          case "beforeblur":
          case "afterblur":
            d = jf;
            break;
          case "click":
            if (r.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            d = Ay;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            d = zE;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            d = r2;
            break;
          case _x:
          case Px:
          case Ax:
            d = HE;
            break;
          case Ex:
            d = i2;
            break;
          case "scroll":
            d = FE;
            break;
          case "wheel":
            d = a2;
            break;
          case "copy":
          case "cut":
          case "paste":
            d = VE;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            d = Iy;
        }
        var y = (t & 4) !== 0,
          w = !y && e === "scroll",
          m = y ? (p !== null ? p + "Capture" : null) : p;
        y = [];
        for (var v = l, g; v !== null; ) {
          g = v;
          var S = g.stateNode;
          if (
            (g.tag === 5 &&
              S !== null &&
              ((g = S),
              m !== null && ((S = Ra(v, m)), S != null && y.push(Ga(v, S, g)))),
            w)
          )
            break;
          v = v.return;
        }
        0 < y.length &&
          ((p = new d(p, h, null, r, f)), c.push({ event: p, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((p = e === "mouseover" || e === "pointerover"),
          (d = e === "mouseout" || e === "pointerout"),
          p &&
            r !== zp &&
            (h = r.relatedTarget || r.fromElement) &&
            (Qn(h) || h[Xr]))
        )
          break e;
        if (
          (d || p) &&
          ((p =
            f.window === f
              ? f
              : (p = f.ownerDocument)
                ? p.defaultView || p.parentWindow
                : window),
          d
            ? ((h = r.relatedTarget || r.toElement),
              (d = l),
              (h = h ? Qn(h) : null),
              h !== null &&
                ((w = wi(h)), h !== w || (h.tag !== 5 && h.tag !== 6)) &&
                (h = null))
            : ((d = null), (h = l)),
          d !== h)
        ) {
          if (
            ((y = Ay),
            (S = "onMouseLeave"),
            (m = "onMouseEnter"),
            (v = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((y = Iy),
              (S = "onPointerLeave"),
              (m = "onPointerEnter"),
              (v = "pointer")),
            (w = d == null ? p : Bi(d)),
            (g = h == null ? p : Bi(h)),
            (p = new y(S, v + "leave", d, r, f)),
            (p.target = w),
            (p.relatedTarget = g),
            (S = null),
            Qn(f) === l &&
              ((y = new y(m, v + "enter", h, r, f)),
              (y.target = g),
              (y.relatedTarget = w),
              (S = y)),
            (w = S),
            d && h)
          )
            t: {
              for (y = d, m = h, v = 0, g = y; g; g = Ti(g)) v++;
              for (g = 0, S = m; S; S = Ti(S)) g++;
              for (; 0 < v - g; ) (y = Ti(y)), v--;
              for (; 0 < g - v; ) (m = Ti(m)), g--;
              for (; v--; ) {
                if (y === m || (m !== null && y === m.alternate)) break t;
                (y = Ti(y)), (m = Ti(m));
              }
              y = null;
            }
          else y = null;
          d !== null && Fy(c, p, d, y, !1),
            h !== null && w !== null && Fy(c, w, h, y, !0);
        }
      }
      e: {
        if (
          ((p = l ? Bi(l) : window),
          (d = p.nodeName && p.nodeName.toLowerCase()),
          d === "select" || (d === "input" && p.type === "file"))
        )
          var b = d2;
        else if (Cy(p))
          if (bx) b = y2;
          else {
            b = v2;
            var x = h2;
          }
        else
          (d = p.nodeName) &&
            d.toLowerCase() === "input" &&
            (p.type === "checkbox" || p.type === "radio") &&
            (b = m2);
        if (b && (b = b(e, l))) {
          gx(c, b, r, f);
          break e;
        }
        x && x(e, p, l),
          e === "focusout" &&
            (x = p._wrapperState) &&
            x.controlled &&
            p.type === "number" &&
            Dp(p, "number", p.value);
      }
      switch (((x = l ? Bi(l) : window), e)) {
        case "focusin":
          (Cy(x) || x.contentEditable === "true") &&
            ((Ri = x), (Kp = l), (Ea = null));
          break;
        case "focusout":
          Ea = Kp = Ri = null;
          break;
        case "mousedown":
          Xp = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Xp = !1), Dy(c, r, f);
          break;
        case "selectionchange":
          if (w2) break;
        case "keydown":
        case "keyup":
          Dy(c, r, f);
      }
      var O;
      if (vv)
        e: {
          switch (e) {
            case "compositionstart":
              var _ = "onCompositionStart";
              break e;
            case "compositionend":
              _ = "onCompositionEnd";
              break e;
            case "compositionupdate":
              _ = "onCompositionUpdate";
              break e;
          }
          _ = void 0;
        }
      else
        Li
          ? mx(e, r) && (_ = "onCompositionEnd")
          : e === "keydown" && r.keyCode === 229 && (_ = "onCompositionStart");
      _ &&
        (vx &&
          r.locale !== "ko" &&
          (Li || _ !== "onCompositionStart"
            ? _ === "onCompositionEnd" && Li && (O = hx())
            : ((vn = f),
              (pv = "value" in vn ? vn.value : vn.textContent),
              (Li = !0))),
        (x = Ks(l, _)),
        0 < x.length &&
          ((_ = new Ey(_, e, null, r, f)),
          c.push({ event: _, listeners: x }),
          O ? (_.data = O) : ((O = yx(r)), O !== null && (_.data = O)))),
        (O = s2 ? l2(e, r) : c2(e, r)) &&
          ((l = Ks(l, "onBeforeInput")),
          0 < l.length &&
            ((f = new Ey("onBeforeInput", "beforeinput", null, r, f)),
            c.push({ event: f, listeners: l }),
            (f.data = O)));
    }
    Tx(c, t);
  });
}
function Ga(e, t, r) {
  return { instance: e, listener: t, currentTarget: r };
}
function Ks(e, t) {
  for (var r = t + "Capture", n = []; e !== null; ) {
    var i = e,
      o = i.stateNode;
    i.tag === 5 &&
      o !== null &&
      ((i = o),
      (o = Ra(e, r)),
      o != null && n.unshift(Ga(e, o, i)),
      (o = Ra(e, t)),
      o != null && n.push(Ga(e, o, i))),
      (e = e.return);
  }
  return n;
}
function Ti(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Fy(e, t, r, n, i) {
  for (var o = t._reactName, a = []; r !== null && r !== n; ) {
    var u = r,
      s = u.alternate,
      l = u.stateNode;
    if (s !== null && s === n) break;
    u.tag === 5 &&
      l !== null &&
      ((u = l),
      i
        ? ((s = Ra(r, o)), s != null && a.unshift(Ga(r, s, u)))
        : i || ((s = Ra(r, o)), s != null && a.push(Ga(r, s, u)))),
      (r = r.return);
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var _2 = /\r\n?/g,
  P2 = /\u0000|\uFFFD/g;
function By(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      _2,
      `
`
    )
    .replace(P2, "");
}
function as(e, t, r) {
  if (((t = By(t)), By(e) !== t && r)) throw Error(B(425));
}
function Xs() {}
var Yp = null,
  Qp = null;
function Zp(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Jp = typeof setTimeout == "function" ? setTimeout : void 0,
  A2 = typeof clearTimeout == "function" ? clearTimeout : void 0,
  zy = typeof Promise == "function" ? Promise : void 0,
  E2 =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof zy < "u"
        ? function (e) {
            return zy.resolve(null).then(e).catch(I2);
          }
        : Jp;
function I2(e) {
  setTimeout(function () {
    throw e;
  });
}
function zf(e, t) {
  var r = t,
    n = 0;
  do {
    var i = r.nextSibling;
    if ((e.removeChild(r), i && i.nodeType === 8))
      if (((r = i.data), r === "/$")) {
        if (n === 0) {
          e.removeChild(i), za(t);
          return;
        }
        n--;
      } else (r !== "$" && r !== "$?" && r !== "$!") || n++;
    r = i;
  } while (r);
  za(t);
}
function xn(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Uy(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var r = e.data;
      if (r === "$" || r === "$!" || r === "$?") {
        if (t === 0) return e;
        t--;
      } else r === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Lo = Math.random().toString(36).slice(2),
  Er = "__reactFiber$" + Lo,
  Va = "__reactProps$" + Lo,
  Xr = "__reactContainer$" + Lo,
  ed = "__reactEvents$" + Lo,
  T2 = "__reactListeners$" + Lo,
  $2 = "__reactHandles$" + Lo;
function Qn(e) {
  var t = e[Er];
  if (t) return t;
  for (var r = e.parentNode; r; ) {
    if ((t = r[Xr] || r[Er])) {
      if (
        ((r = t.alternate),
        t.child !== null || (r !== null && r.child !== null))
      )
        for (e = Uy(e); e !== null; ) {
          if ((r = e[Er])) return r;
          e = Uy(e);
        }
      return t;
    }
    (e = r), (r = e.parentNode);
  }
  return null;
}
function Ru(e) {
  return (
    (e = e[Er] || e[Xr]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Bi(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(B(33));
}
function gc(e) {
  return e[Va] || null;
}
var td = [],
  zi = -1;
function jn(e) {
  return { current: e };
}
function xe(e) {
  0 > zi || ((e.current = td[zi]), (td[zi] = null), zi--);
}
function ye(e, t) {
  zi++, (td[zi] = e.current), (e.current = t);
}
var $n = {},
  ft = jn($n),
  jt = jn(!1),
  ci = $n;
function uo(e, t) {
  var r = e.type.contextTypes;
  if (!r) return $n;
  var n = e.stateNode;
  if (n && n.__reactInternalMemoizedUnmaskedChildContext === t)
    return n.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    o;
  for (o in r) i[o] = t[o];
  return (
    n &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function Mt(e) {
  return (e = e.childContextTypes), e != null;
}
function Ys() {
  xe(jt), xe(ft);
}
function Wy(e, t, r) {
  if (ft.current !== $n) throw Error(B(168));
  ye(ft, t), ye(jt, r);
}
function Cx(e, t, r) {
  var n = e.stateNode;
  if (((t = t.childContextTypes), typeof n.getChildContext != "function"))
    return r;
  n = n.getChildContext();
  for (var i in n) if (!(i in t)) throw Error(B(108, hE(e) || "Unknown", i));
  return Ee({}, r, n);
}
function Qs(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || $n),
    (ci = ft.current),
    ye(ft, e),
    ye(jt, jt.current),
    !0
  );
}
function Hy(e, t, r) {
  var n = e.stateNode;
  if (!n) throw Error(B(169));
  r
    ? ((e = Cx(e, t, ci)),
      (n.__reactInternalMemoizedMergedChildContext = e),
      xe(jt),
      xe(ft),
      ye(ft, e))
    : xe(jt),
    ye(jt, r);
}
var Rr = null,
  bc = !1,
  Uf = !1;
function kx(e) {
  Rr === null ? (Rr = [e]) : Rr.push(e);
}
function C2(e) {
  (bc = !0), kx(e);
}
function Mn() {
  if (!Uf && Rr !== null) {
    Uf = !0;
    var e = 0,
      t = le;
    try {
      var r = Rr;
      for (le = 1; e < r.length; e++) {
        var n = r[e];
        do n = n(!0);
        while (n !== null);
      }
      (Rr = null), (bc = !1);
    } catch (i) {
      throw (Rr !== null && (Rr = Rr.slice(e + 1)), nx(sv, Mn), i);
    } finally {
      (le = t), (Uf = !1);
    }
  }
  return null;
}
var Ui = [],
  Wi = 0,
  Zs = null,
  Js = 0,
  Jt = [],
  er = 0,
  fi = null,
  Fr = 1,
  Br = "";
function Hn(e, t) {
  (Ui[Wi++] = Js), (Ui[Wi++] = Zs), (Zs = e), (Js = t);
}
function jx(e, t, r) {
  (Jt[er++] = Fr), (Jt[er++] = Br), (Jt[er++] = fi), (fi = e);
  var n = Fr;
  e = Br;
  var i = 32 - gr(n) - 1;
  (n &= ~(1 << i)), (r += 1);
  var o = 32 - gr(t) + i;
  if (30 < o) {
    var a = i - (i % 5);
    (o = (n & ((1 << a) - 1)).toString(32)),
      (n >>= a),
      (i -= a),
      (Fr = (1 << (32 - gr(t) + i)) | (r << i) | n),
      (Br = o + e);
  } else (Fr = (1 << o) | (r << i) | n), (Br = e);
}
function yv(e) {
  e.return !== null && (Hn(e, 1), jx(e, 1, 0));
}
function gv(e) {
  for (; e === Zs; )
    (Zs = Ui[--Wi]), (Ui[Wi] = null), (Js = Ui[--Wi]), (Ui[Wi] = null);
  for (; e === fi; )
    (fi = Jt[--er]),
      (Jt[er] = null),
      (Br = Jt[--er]),
      (Jt[er] = null),
      (Fr = Jt[--er]),
      (Jt[er] = null);
}
var Gt = null,
  Ht = null,
  Oe = !1,
  vr = null;
function Mx(e, t) {
  var r = tr(5, null, null, 0);
  (r.elementType = "DELETED"),
    (r.stateNode = t),
    (r.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [r]), (e.flags |= 16)) : t.push(r);
}
function Gy(e, t) {
  switch (e.tag) {
    case 5:
      var r = e.type;
      return (
        (t =
          t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Gt = e), (Ht = xn(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Gt = e), (Ht = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((r = fi !== null ? { id: Fr, overflow: Br } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: r,
              retryLane: 1073741824,
            }),
            (r = tr(18, null, null, 0)),
            (r.stateNode = t),
            (r.return = e),
            (e.child = r),
            (Gt = e),
            (Ht = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function rd(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function nd(e) {
  if (Oe) {
    var t = Ht;
    if (t) {
      var r = t;
      if (!Gy(e, t)) {
        if (rd(e)) throw Error(B(418));
        t = xn(r.nextSibling);
        var n = Gt;
        t && Gy(e, t)
          ? Mx(n, r)
          : ((e.flags = (e.flags & -4097) | 2), (Oe = !1), (Gt = e));
      }
    } else {
      if (rd(e)) throw Error(B(418));
      (e.flags = (e.flags & -4097) | 2), (Oe = !1), (Gt = e);
    }
  }
}
function Vy(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Gt = e;
}
function us(e) {
  if (e !== Gt) return !1;
  if (!Oe) return Vy(e), (Oe = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Zp(e.type, e.memoizedProps))),
    t && (t = Ht))
  ) {
    if (rd(e)) throw (Nx(), Error(B(418)));
    for (; t; ) Mx(e, t), (t = xn(t.nextSibling));
  }
  if ((Vy(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(B(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var r = e.data;
          if (r === "/$") {
            if (t === 0) {
              Ht = xn(e.nextSibling);
              break e;
            }
            t--;
          } else (r !== "$" && r !== "$!" && r !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Ht = null;
    }
  } else Ht = Gt ? xn(e.stateNode.nextSibling) : null;
  return !0;
}
function Nx() {
  for (var e = Ht; e; ) e = xn(e.nextSibling);
}
function so() {
  (Ht = Gt = null), (Oe = !1);
}
function bv(e) {
  vr === null ? (vr = [e]) : vr.push(e);
}
var k2 = tn.ReactCurrentBatchConfig;
function na(e, t, r) {
  if (
    ((e = r.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (r._owner) {
      if (((r = r._owner), r)) {
        if (r.tag !== 1) throw Error(B(309));
        var n = r.stateNode;
      }
      if (!n) throw Error(B(147, e));
      var i = n,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (a) {
            var u = i.refs;
            a === null ? delete u[o] : (u[o] = a);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(B(284));
    if (!r._owner) throw Error(B(290, e));
  }
  return e;
}
function ss(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      B(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function qy(e) {
  var t = e._init;
  return t(e._payload);
}
function Dx(e) {
  function t(m, v) {
    if (e) {
      var g = m.deletions;
      g === null ? ((m.deletions = [v]), (m.flags |= 16)) : g.push(v);
    }
  }
  function r(m, v) {
    if (!e) return null;
    for (; v !== null; ) t(m, v), (v = v.sibling);
    return null;
  }
  function n(m, v) {
    for (m = new Map(); v !== null; )
      v.key !== null ? m.set(v.key, v) : m.set(v.index, v), (v = v.sibling);
    return m;
  }
  function i(m, v) {
    return (m = Pn(m, v)), (m.index = 0), (m.sibling = null), m;
  }
  function o(m, v, g) {
    return (
      (m.index = g),
      e
        ? ((g = m.alternate),
          g !== null
            ? ((g = g.index), g < v ? ((m.flags |= 2), v) : g)
            : ((m.flags |= 2), v))
        : ((m.flags |= 1048576), v)
    );
  }
  function a(m) {
    return e && m.alternate === null && (m.flags |= 2), m;
  }
  function u(m, v, g, S) {
    return v === null || v.tag !== 6
      ? ((v = Xf(g, m.mode, S)), (v.return = m), v)
      : ((v = i(v, g)), (v.return = m), v);
  }
  function s(m, v, g, S) {
    var b = g.type;
    return b === Di
      ? f(m, v, g.props.children, S, g.key)
      : v !== null &&
          (v.elementType === b ||
            (typeof b == "object" &&
              b !== null &&
              b.$$typeof === ln &&
              qy(b) === v.type))
        ? ((S = i(v, g.props)), (S.ref = na(m, v, g)), (S.return = m), S)
        : ((S = Fs(g.type, g.key, g.props, null, m.mode, S)),
          (S.ref = na(m, v, g)),
          (S.return = m),
          S);
  }
  function l(m, v, g, S) {
    return v === null ||
      v.tag !== 4 ||
      v.stateNode.containerInfo !== g.containerInfo ||
      v.stateNode.implementation !== g.implementation
      ? ((v = Yf(g, m.mode, S)), (v.return = m), v)
      : ((v = i(v, g.children || [])), (v.return = m), v);
  }
  function f(m, v, g, S, b) {
    return v === null || v.tag !== 7
      ? ((v = oi(g, m.mode, S, b)), (v.return = m), v)
      : ((v = i(v, g)), (v.return = m), v);
  }
  function c(m, v, g) {
    if ((typeof v == "string" && v !== "") || typeof v == "number")
      return (v = Xf("" + v, m.mode, g)), (v.return = m), v;
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Qu:
          return (
            (g = Fs(v.type, v.key, v.props, null, m.mode, g)),
            (g.ref = na(m, null, v)),
            (g.return = m),
            g
          );
        case Ni:
          return (v = Yf(v, m.mode, g)), (v.return = m), v;
        case ln:
          var S = v._init;
          return c(m, S(v._payload), g);
      }
      if (ya(v) || Zo(v))
        return (v = oi(v, m.mode, g, null)), (v.return = m), v;
      ss(m, v);
    }
    return null;
  }
  function p(m, v, g, S) {
    var b = v !== null ? v.key : null;
    if ((typeof g == "string" && g !== "") || typeof g == "number")
      return b !== null ? null : u(m, v, "" + g, S);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Qu:
          return g.key === b ? s(m, v, g, S) : null;
        case Ni:
          return g.key === b ? l(m, v, g, S) : null;
        case ln:
          return (b = g._init), p(m, v, b(g._payload), S);
      }
      if (ya(g) || Zo(g)) return b !== null ? null : f(m, v, g, S, null);
      ss(m, g);
    }
    return null;
  }
  function d(m, v, g, S, b) {
    if ((typeof S == "string" && S !== "") || typeof S == "number")
      return (m = m.get(g) || null), u(v, m, "" + S, b);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case Qu:
          return (m = m.get(S.key === null ? g : S.key) || null), s(v, m, S, b);
        case Ni:
          return (m = m.get(S.key === null ? g : S.key) || null), l(v, m, S, b);
        case ln:
          var x = S._init;
          return d(m, v, g, x(S._payload), b);
      }
      if (ya(S) || Zo(S)) return (m = m.get(g) || null), f(v, m, S, b, null);
      ss(v, S);
    }
    return null;
  }
  function h(m, v, g, S) {
    for (
      var b = null, x = null, O = v, _ = (v = 0), P = null;
      O !== null && _ < g.length;
      _++
    ) {
      O.index > _ ? ((P = O), (O = null)) : (P = O.sibling);
      var I = p(m, O, g[_], S);
      if (I === null) {
        O === null && (O = P);
        break;
      }
      e && O && I.alternate === null && t(m, O),
        (v = o(I, v, _)),
        x === null ? (b = I) : (x.sibling = I),
        (x = I),
        (O = P);
    }
    if (_ === g.length) return r(m, O), Oe && Hn(m, _), b;
    if (O === null) {
      for (; _ < g.length; _++)
        (O = c(m, g[_], S)),
          O !== null &&
            ((v = o(O, v, _)), x === null ? (b = O) : (x.sibling = O), (x = O));
      return Oe && Hn(m, _), b;
    }
    for (O = n(m, O); _ < g.length; _++)
      (P = d(O, m, _, g[_], S)),
        P !== null &&
          (e && P.alternate !== null && O.delete(P.key === null ? _ : P.key),
          (v = o(P, v, _)),
          x === null ? (b = P) : (x.sibling = P),
          (x = P));
    return (
      e &&
        O.forEach(function (E) {
          return t(m, E);
        }),
      Oe && Hn(m, _),
      b
    );
  }
  function y(m, v, g, S) {
    var b = Zo(g);
    if (typeof b != "function") throw Error(B(150));
    if (((g = b.call(g)), g == null)) throw Error(B(151));
    for (
      var x = (b = null), O = v, _ = (v = 0), P = null, I = g.next();
      O !== null && !I.done;
      _++, I = g.next()
    ) {
      O.index > _ ? ((P = O), (O = null)) : (P = O.sibling);
      var E = p(m, O, I.value, S);
      if (E === null) {
        O === null && (O = P);
        break;
      }
      e && O && E.alternate === null && t(m, O),
        (v = o(E, v, _)),
        x === null ? (b = E) : (x.sibling = E),
        (x = E),
        (O = P);
    }
    if (I.done) return r(m, O), Oe && Hn(m, _), b;
    if (O === null) {
      for (; !I.done; _++, I = g.next())
        (I = c(m, I.value, S)),
          I !== null &&
            ((v = o(I, v, _)), x === null ? (b = I) : (x.sibling = I), (x = I));
      return Oe && Hn(m, _), b;
    }
    for (O = n(m, O); !I.done; _++, I = g.next())
      (I = d(O, m, _, I.value, S)),
        I !== null &&
          (e && I.alternate !== null && O.delete(I.key === null ? _ : I.key),
          (v = o(I, v, _)),
          x === null ? (b = I) : (x.sibling = I),
          (x = I));
    return (
      e &&
        O.forEach(function ($) {
          return t(m, $);
        }),
      Oe && Hn(m, _),
      b
    );
  }
  function w(m, v, g, S) {
    if (
      (typeof g == "object" &&
        g !== null &&
        g.type === Di &&
        g.key === null &&
        (g = g.props.children),
      typeof g == "object" && g !== null)
    ) {
      switch (g.$$typeof) {
        case Qu:
          e: {
            for (var b = g.key, x = v; x !== null; ) {
              if (x.key === b) {
                if (((b = g.type), b === Di)) {
                  if (x.tag === 7) {
                    r(m, x.sibling),
                      (v = i(x, g.props.children)),
                      (v.return = m),
                      (m = v);
                    break e;
                  }
                } else if (
                  x.elementType === b ||
                  (typeof b == "object" &&
                    b !== null &&
                    b.$$typeof === ln &&
                    qy(b) === x.type)
                ) {
                  r(m, x.sibling),
                    (v = i(x, g.props)),
                    (v.ref = na(m, x, g)),
                    (v.return = m),
                    (m = v);
                  break e;
                }
                r(m, x);
                break;
              } else t(m, x);
              x = x.sibling;
            }
            g.type === Di
              ? ((v = oi(g.props.children, m.mode, S, g.key)),
                (v.return = m),
                (m = v))
              : ((S = Fs(g.type, g.key, g.props, null, m.mode, S)),
                (S.ref = na(m, v, g)),
                (S.return = m),
                (m = S));
          }
          return a(m);
        case Ni:
          e: {
            for (x = g.key; v !== null; ) {
              if (v.key === x)
                if (
                  v.tag === 4 &&
                  v.stateNode.containerInfo === g.containerInfo &&
                  v.stateNode.implementation === g.implementation
                ) {
                  r(m, v.sibling),
                    (v = i(v, g.children || [])),
                    (v.return = m),
                    (m = v);
                  break e;
                } else {
                  r(m, v);
                  break;
                }
              else t(m, v);
              v = v.sibling;
            }
            (v = Yf(g, m.mode, S)), (v.return = m), (m = v);
          }
          return a(m);
        case ln:
          return (x = g._init), w(m, v, x(g._payload), S);
      }
      if (ya(g)) return h(m, v, g, S);
      if (Zo(g)) return y(m, v, g, S);
      ss(m, g);
    }
    return (typeof g == "string" && g !== "") || typeof g == "number"
      ? ((g = "" + g),
        v !== null && v.tag === 6
          ? (r(m, v.sibling), (v = i(v, g)), (v.return = m), (m = v))
          : (r(m, v), (v = Xf(g, m.mode, S)), (v.return = m), (m = v)),
        a(m))
      : r(m, v);
  }
  return w;
}
var lo = Dx(!0),
  Lx = Dx(!1),
  el = jn(null),
  tl = null,
  Hi = null,
  wv = null;
function xv() {
  wv = Hi = tl = null;
}
function Sv(e) {
  var t = el.current;
  xe(el), (e._currentValue = t);
}
function id(e, t, r) {
  for (; e !== null; ) {
    var n = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), n !== null && (n.childLanes |= t))
        : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t),
      e === r)
    )
      break;
    e = e.return;
  }
}
function eo(e, t) {
  (tl = e),
    (wv = Hi = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ct = !0), (e.firstContext = null));
}
function or(e) {
  var t = e._currentValue;
  if (wv !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Hi === null)) {
      if (tl === null) throw Error(B(308));
      (Hi = e), (tl.dependencies = { lanes: 0, firstContext: e });
    } else Hi = Hi.next = e;
  return t;
}
var Zn = null;
function Ov(e) {
  Zn === null ? (Zn = [e]) : Zn.push(e);
}
function Rx(e, t, r, n) {
  var i = t.interleaved;
  return (
    i === null ? ((r.next = r), Ov(t)) : ((r.next = i.next), (i.next = r)),
    (t.interleaved = r),
    Yr(e, n)
  );
}
function Yr(e, t) {
  e.lanes |= t;
  var r = e.alternate;
  for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (r = e.alternate),
      r !== null && (r.childLanes |= t),
      (r = e),
      (e = e.return);
  return r.tag === 3 ? r.stateNode : null;
}
var cn = !1;
function _v(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Fx(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Hr(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Sn(e, t, r) {
  var n = e.updateQueue;
  if (n === null) return null;
  if (((n = n.shared), ie & 2)) {
    var i = n.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (n.pending = t),
      Yr(e, r)
    );
  }
  return (
    (i = n.interleaved),
    i === null ? ((t.next = t), Ov(n)) : ((t.next = i.next), (i.next = t)),
    (n.interleaved = t),
    Yr(e, r)
  );
}
function js(e, t, r) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (r & 4194240) !== 0))
  ) {
    var n = t.lanes;
    (n &= e.pendingLanes), (r |= n), (t.lanes = r), lv(e, r);
  }
}
function Ky(e, t) {
  var r = e.updateQueue,
    n = e.alternate;
  if (n !== null && ((n = n.updateQueue), r === n)) {
    var i = null,
      o = null;
    if (((r = r.firstBaseUpdate), r !== null)) {
      do {
        var a = {
          eventTime: r.eventTime,
          lane: r.lane,
          tag: r.tag,
          payload: r.payload,
          callback: r.callback,
          next: null,
        };
        o === null ? (i = o = a) : (o = o.next = a), (r = r.next);
      } while (r !== null);
      o === null ? (i = o = t) : (o = o.next = t);
    } else i = o = t;
    (r = {
      baseState: n.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: o,
      shared: n.shared,
      effects: n.effects,
    }),
      (e.updateQueue = r);
    return;
  }
  (e = r.lastBaseUpdate),
    e === null ? (r.firstBaseUpdate = t) : (e.next = t),
    (r.lastBaseUpdate = t);
}
function rl(e, t, r, n) {
  var i = e.updateQueue;
  cn = !1;
  var o = i.firstBaseUpdate,
    a = i.lastBaseUpdate,
    u = i.shared.pending;
  if (u !== null) {
    i.shared.pending = null;
    var s = u,
      l = s.next;
    (s.next = null), a === null ? (o = l) : (a.next = l), (a = s);
    var f = e.alternate;
    f !== null &&
      ((f = f.updateQueue),
      (u = f.lastBaseUpdate),
      u !== a &&
        (u === null ? (f.firstBaseUpdate = l) : (u.next = l),
        (f.lastBaseUpdate = s)));
  }
  if (o !== null) {
    var c = i.baseState;
    (a = 0), (f = l = s = null), (u = o);
    do {
      var p = u.lane,
        d = u.eventTime;
      if ((n & p) === p) {
        f !== null &&
          (f = f.next =
            {
              eventTime: d,
              lane: 0,
              tag: u.tag,
              payload: u.payload,
              callback: u.callback,
              next: null,
            });
        e: {
          var h = e,
            y = u;
          switch (((p = t), (d = r), y.tag)) {
            case 1:
              if (((h = y.payload), typeof h == "function")) {
                c = h.call(d, c, p);
                break e;
              }
              c = h;
              break e;
            case 3:
              h.flags = (h.flags & -65537) | 128;
            case 0:
              if (
                ((h = y.payload),
                (p = typeof h == "function" ? h.call(d, c, p) : h),
                p == null)
              )
                break e;
              c = Ee({}, c, p);
              break e;
            case 2:
              cn = !0;
          }
        }
        u.callback !== null &&
          u.lane !== 0 &&
          ((e.flags |= 64),
          (p = i.effects),
          p === null ? (i.effects = [u]) : p.push(u));
      } else
        (d = {
          eventTime: d,
          lane: p,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null,
        }),
          f === null ? ((l = f = d), (s = c)) : (f = f.next = d),
          (a |= p);
      if (((u = u.next), u === null)) {
        if (((u = i.shared.pending), u === null)) break;
        (p = u),
          (u = p.next),
          (p.next = null),
          (i.lastBaseUpdate = p),
          (i.shared.pending = null);
      }
    } while (!0);
    if (
      (f === null && (s = c),
      (i.baseState = s),
      (i.firstBaseUpdate = l),
      (i.lastBaseUpdate = f),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do (a |= i.lane), (i = i.next);
      while (i !== t);
    } else o === null && (i.shared.lanes = 0);
    (di |= a), (e.lanes = a), (e.memoizedState = c);
  }
}
function Xy(e, t, r) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var n = e[t],
        i = n.callback;
      if (i !== null) {
        if (((n.callback = null), (n = r), typeof i != "function"))
          throw Error(B(191, i));
        i.call(n);
      }
    }
}
var Fu = {},
  $r = jn(Fu),
  qa = jn(Fu),
  Ka = jn(Fu);
function Jn(e) {
  if (e === Fu) throw Error(B(174));
  return e;
}
function Pv(e, t) {
  switch ((ye(Ka, t), ye(qa, e), ye($r, Fu), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Rp(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Rp(t, e));
  }
  xe($r), ye($r, t);
}
function co() {
  xe($r), xe(qa), xe(Ka);
}
function Bx(e) {
  Jn(Ka.current);
  var t = Jn($r.current),
    r = Rp(t, e.type);
  t !== r && (ye(qa, e), ye($r, r));
}
function Av(e) {
  qa.current === e && (xe($r), xe(qa));
}
var Pe = jn(0);
function nl(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var r = t.memoizedState;
      if (
        r !== null &&
        ((r = r.dehydrated), r === null || r.data === "$?" || r.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Wf = [];
function Ev() {
  for (var e = 0; e < Wf.length; e++)
    Wf[e]._workInProgressVersionPrimary = null;
  Wf.length = 0;
}
var Ms = tn.ReactCurrentDispatcher,
  Hf = tn.ReactCurrentBatchConfig,
  pi = 0,
  Ae = null,
  Be = null,
  Ve = null,
  il = !1,
  Ia = !1,
  Xa = 0,
  j2 = 0;
function it() {
  throw Error(B(321));
}
function Iv(e, t) {
  if (t === null) return !1;
  for (var r = 0; r < t.length && r < e.length; r++)
    if (!xr(e[r], t[r])) return !1;
  return !0;
}
function Tv(e, t, r, n, i, o) {
  if (
    ((pi = o),
    (Ae = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Ms.current = e === null || e.memoizedState === null ? L2 : R2),
    (e = r(n, i)),
    Ia)
  ) {
    o = 0;
    do {
      if (((Ia = !1), (Xa = 0), 25 <= o)) throw Error(B(301));
      (o += 1),
        (Ve = Be = null),
        (t.updateQueue = null),
        (Ms.current = F2),
        (e = r(n, i));
    } while (Ia);
  }
  if (
    ((Ms.current = ol),
    (t = Be !== null && Be.next !== null),
    (pi = 0),
    (Ve = Be = Ae = null),
    (il = !1),
    t)
  )
    throw Error(B(300));
  return e;
}
function $v() {
  var e = Xa !== 0;
  return (Xa = 0), e;
}
function Pr() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return Ve === null ? (Ae.memoizedState = Ve = e) : (Ve = Ve.next = e), Ve;
}
function ar() {
  if (Be === null) {
    var e = Ae.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Be.next;
  var t = Ve === null ? Ae.memoizedState : Ve.next;
  if (t !== null) (Ve = t), (Be = e);
  else {
    if (e === null) throw Error(B(310));
    (Be = e),
      (e = {
        memoizedState: Be.memoizedState,
        baseState: Be.baseState,
        baseQueue: Be.baseQueue,
        queue: Be.queue,
        next: null,
      }),
      Ve === null ? (Ae.memoizedState = Ve = e) : (Ve = Ve.next = e);
  }
  return Ve;
}
function Ya(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Gf(e) {
  var t = ar(),
    r = t.queue;
  if (r === null) throw Error(B(311));
  r.lastRenderedReducer = e;
  var n = Be,
    i = n.baseQueue,
    o = r.pending;
  if (o !== null) {
    if (i !== null) {
      var a = i.next;
      (i.next = o.next), (o.next = a);
    }
    (n.baseQueue = i = o), (r.pending = null);
  }
  if (i !== null) {
    (o = i.next), (n = n.baseState);
    var u = (a = null),
      s = null,
      l = o;
    do {
      var f = l.lane;
      if ((pi & f) === f)
        s !== null &&
          (s = s.next =
            {
              lane: 0,
              action: l.action,
              hasEagerState: l.hasEagerState,
              eagerState: l.eagerState,
              next: null,
            }),
          (n = l.hasEagerState ? l.eagerState : e(n, l.action));
      else {
        var c = {
          lane: f,
          action: l.action,
          hasEagerState: l.hasEagerState,
          eagerState: l.eagerState,
          next: null,
        };
        s === null ? ((u = s = c), (a = n)) : (s = s.next = c),
          (Ae.lanes |= f),
          (di |= f);
      }
      l = l.next;
    } while (l !== null && l !== o);
    s === null ? (a = n) : (s.next = u),
      xr(n, t.memoizedState) || (Ct = !0),
      (t.memoizedState = n),
      (t.baseState = a),
      (t.baseQueue = s),
      (r.lastRenderedState = n);
  }
  if (((e = r.interleaved), e !== null)) {
    i = e;
    do (o = i.lane), (Ae.lanes |= o), (di |= o), (i = i.next);
    while (i !== e);
  } else i === null && (r.lanes = 0);
  return [t.memoizedState, r.dispatch];
}
function Vf(e) {
  var t = ar(),
    r = t.queue;
  if (r === null) throw Error(B(311));
  r.lastRenderedReducer = e;
  var n = r.dispatch,
    i = r.pending,
    o = t.memoizedState;
  if (i !== null) {
    r.pending = null;
    var a = (i = i.next);
    do (o = e(o, a.action)), (a = a.next);
    while (a !== i);
    xr(o, t.memoizedState) || (Ct = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (r.lastRenderedState = o);
  }
  return [o, n];
}
function zx() {}
function Ux(e, t) {
  var r = Ae,
    n = ar(),
    i = t(),
    o = !xr(n.memoizedState, i);
  if (
    (o && ((n.memoizedState = i), (Ct = !0)),
    (n = n.queue),
    Cv(Gx.bind(null, r, n, e), [e]),
    n.getSnapshot !== t || o || (Ve !== null && Ve.memoizedState.tag & 1))
  ) {
    if (
      ((r.flags |= 2048),
      Qa(9, Hx.bind(null, r, n, i, t), void 0, null),
      Ke === null)
    )
      throw Error(B(349));
    pi & 30 || Wx(r, t, i);
  }
  return i;
}
function Wx(e, t, r) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: r }),
    (t = Ae.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Ae.updateQueue = t),
        (t.stores = [e]))
      : ((r = t.stores), r === null ? (t.stores = [e]) : r.push(e));
}
function Hx(e, t, r, n) {
  (t.value = r), (t.getSnapshot = n), Vx(t) && qx(e);
}
function Gx(e, t, r) {
  return r(function () {
    Vx(t) && qx(e);
  });
}
function Vx(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var r = t();
    return !xr(e, r);
  } catch {
    return !0;
  }
}
function qx(e) {
  var t = Yr(e, 1);
  t !== null && br(t, e, 1, -1);
}
function Yy(e) {
  var t = Pr();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ya,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = D2.bind(null, Ae, e)),
    [t.memoizedState, e]
  );
}
function Qa(e, t, r, n) {
  return (
    (e = { tag: e, create: t, destroy: r, deps: n, next: null }),
    (t = Ae.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Ae.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((r = t.lastEffect),
        r === null
          ? (t.lastEffect = e.next = e)
          : ((n = r.next), (r.next = e), (e.next = n), (t.lastEffect = e))),
    e
  );
}
function Kx() {
  return ar().memoizedState;
}
function Ns(e, t, r, n) {
  var i = Pr();
  (Ae.flags |= e),
    (i.memoizedState = Qa(1 | t, r, void 0, n === void 0 ? null : n));
}
function wc(e, t, r, n) {
  var i = ar();
  n = n === void 0 ? null : n;
  var o = void 0;
  if (Be !== null) {
    var a = Be.memoizedState;
    if (((o = a.destroy), n !== null && Iv(n, a.deps))) {
      i.memoizedState = Qa(t, r, o, n);
      return;
    }
  }
  (Ae.flags |= e), (i.memoizedState = Qa(1 | t, r, o, n));
}
function Qy(e, t) {
  return Ns(8390656, 8, e, t);
}
function Cv(e, t) {
  return wc(2048, 8, e, t);
}
function Xx(e, t) {
  return wc(4, 2, e, t);
}
function Yx(e, t) {
  return wc(4, 4, e, t);
}
function Qx(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Zx(e, t, r) {
  return (
    (r = r != null ? r.concat([e]) : null), wc(4, 4, Qx.bind(null, t, e), r)
  );
}
function kv() {}
function Jx(e, t) {
  var r = ar();
  t = t === void 0 ? null : t;
  var n = r.memoizedState;
  return n !== null && t !== null && Iv(t, n[1])
    ? n[0]
    : ((r.memoizedState = [e, t]), e);
}
function eS(e, t) {
  var r = ar();
  t = t === void 0 ? null : t;
  var n = r.memoizedState;
  return n !== null && t !== null && Iv(t, n[1])
    ? n[0]
    : ((e = e()), (r.memoizedState = [e, t]), e);
}
function tS(e, t, r) {
  return pi & 21
    ? (xr(r, t) || ((r = ax()), (Ae.lanes |= r), (di |= r), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ct = !0)), (e.memoizedState = r));
}
function M2(e, t) {
  var r = le;
  (le = r !== 0 && 4 > r ? r : 4), e(!0);
  var n = Hf.transition;
  Hf.transition = {};
  try {
    e(!1), t();
  } finally {
    (le = r), (Hf.transition = n);
  }
}
function rS() {
  return ar().memoizedState;
}
function N2(e, t, r) {
  var n = _n(e);
  if (
    ((r = {
      lane: n,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    nS(e))
  )
    iS(t, r);
  else if (((r = Rx(e, t, r, n)), r !== null)) {
    var i = bt();
    br(r, e, n, i), oS(r, t, n);
  }
}
function D2(e, t, r) {
  var n = _n(e),
    i = { lane: n, action: r, hasEagerState: !1, eagerState: null, next: null };
  if (nS(e)) iS(t, i);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var a = t.lastRenderedState,
          u = o(a, r);
        if (((i.hasEagerState = !0), (i.eagerState = u), xr(u, a))) {
          var s = t.interleaved;
          s === null
            ? ((i.next = i), Ov(t))
            : ((i.next = s.next), (s.next = i)),
            (t.interleaved = i);
          return;
        }
      } catch {
      } finally {
      }
    (r = Rx(e, t, i, n)),
      r !== null && ((i = bt()), br(r, e, n, i), oS(r, t, n));
  }
}
function nS(e) {
  var t = e.alternate;
  return e === Ae || (t !== null && t === Ae);
}
function iS(e, t) {
  Ia = il = !0;
  var r = e.pending;
  r === null ? (t.next = t) : ((t.next = r.next), (r.next = t)),
    (e.pending = t);
}
function oS(e, t, r) {
  if (r & 4194240) {
    var n = t.lanes;
    (n &= e.pendingLanes), (r |= n), (t.lanes = r), lv(e, r);
  }
}
var ol = {
    readContext: or,
    useCallback: it,
    useContext: it,
    useEffect: it,
    useImperativeHandle: it,
    useInsertionEffect: it,
    useLayoutEffect: it,
    useMemo: it,
    useReducer: it,
    useRef: it,
    useState: it,
    useDebugValue: it,
    useDeferredValue: it,
    useTransition: it,
    useMutableSource: it,
    useSyncExternalStore: it,
    useId: it,
    unstable_isNewReconciler: !1,
  },
  L2 = {
    readContext: or,
    useCallback: function (e, t) {
      return (Pr().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: or,
    useEffect: Qy,
    useImperativeHandle: function (e, t, r) {
      return (
        (r = r != null ? r.concat([e]) : null),
        Ns(4194308, 4, Qx.bind(null, t, e), r)
      );
    },
    useLayoutEffect: function (e, t) {
      return Ns(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Ns(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var r = Pr();
      return (
        (t = t === void 0 ? null : t), (e = e()), (r.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, r) {
      var n = Pr();
      return (
        (t = r !== void 0 ? r(t) : t),
        (n.memoizedState = n.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (n.queue = e),
        (e = e.dispatch = N2.bind(null, Ae, e)),
        [n.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Pr();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Yy,
    useDebugValue: kv,
    useDeferredValue: function (e) {
      return (Pr().memoizedState = e);
    },
    useTransition: function () {
      var e = Yy(!1),
        t = e[0];
      return (e = M2.bind(null, e[1])), (Pr().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, r) {
      var n = Ae,
        i = Pr();
      if (Oe) {
        if (r === void 0) throw Error(B(407));
        r = r();
      } else {
        if (((r = t()), Ke === null)) throw Error(B(349));
        pi & 30 || Wx(n, t, r);
      }
      i.memoizedState = r;
      var o = { value: r, getSnapshot: t };
      return (
        (i.queue = o),
        Qy(Gx.bind(null, n, o, e), [e]),
        (n.flags |= 2048),
        Qa(9, Hx.bind(null, n, o, r, t), void 0, null),
        r
      );
    },
    useId: function () {
      var e = Pr(),
        t = Ke.identifierPrefix;
      if (Oe) {
        var r = Br,
          n = Fr;
        (r = (n & ~(1 << (32 - gr(n) - 1))).toString(32) + r),
          (t = ":" + t + "R" + r),
          (r = Xa++),
          0 < r && (t += "H" + r.toString(32)),
          (t += ":");
      } else (r = j2++), (t = ":" + t + "r" + r.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  R2 = {
    readContext: or,
    useCallback: Jx,
    useContext: or,
    useEffect: Cv,
    useImperativeHandle: Zx,
    useInsertionEffect: Xx,
    useLayoutEffect: Yx,
    useMemo: eS,
    useReducer: Gf,
    useRef: Kx,
    useState: function () {
      return Gf(Ya);
    },
    useDebugValue: kv,
    useDeferredValue: function (e) {
      var t = ar();
      return tS(t, Be.memoizedState, e);
    },
    useTransition: function () {
      var e = Gf(Ya)[0],
        t = ar().memoizedState;
      return [e, t];
    },
    useMutableSource: zx,
    useSyncExternalStore: Ux,
    useId: rS,
    unstable_isNewReconciler: !1,
  },
  F2 = {
    readContext: or,
    useCallback: Jx,
    useContext: or,
    useEffect: Cv,
    useImperativeHandle: Zx,
    useInsertionEffect: Xx,
    useLayoutEffect: Yx,
    useMemo: eS,
    useReducer: Vf,
    useRef: Kx,
    useState: function () {
      return Vf(Ya);
    },
    useDebugValue: kv,
    useDeferredValue: function (e) {
      var t = ar();
      return Be === null ? (t.memoizedState = e) : tS(t, Be.memoizedState, e);
    },
    useTransition: function () {
      var e = Vf(Ya)[0],
        t = ar().memoizedState;
      return [e, t];
    },
    useMutableSource: zx,
    useSyncExternalStore: Ux,
    useId: rS,
    unstable_isNewReconciler: !1,
  };
function pr(e, t) {
  if (e && e.defaultProps) {
    (t = Ee({}, t)), (e = e.defaultProps);
    for (var r in e) t[r] === void 0 && (t[r] = e[r]);
    return t;
  }
  return t;
}
function od(e, t, r, n) {
  (t = e.memoizedState),
    (r = r(n, t)),
    (r = r == null ? t : Ee({}, t, r)),
    (e.memoizedState = r),
    e.lanes === 0 && (e.updateQueue.baseState = r);
}
var xc = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? wi(e) === e : !1;
  },
  enqueueSetState: function (e, t, r) {
    e = e._reactInternals;
    var n = bt(),
      i = _n(e),
      o = Hr(n, i);
    (o.payload = t),
      r != null && (o.callback = r),
      (t = Sn(e, o, i)),
      t !== null && (br(t, e, i, n), js(t, e, i));
  },
  enqueueReplaceState: function (e, t, r) {
    e = e._reactInternals;
    var n = bt(),
      i = _n(e),
      o = Hr(n, i);
    (o.tag = 1),
      (o.payload = t),
      r != null && (o.callback = r),
      (t = Sn(e, o, i)),
      t !== null && (br(t, e, i, n), js(t, e, i));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var r = bt(),
      n = _n(e),
      i = Hr(r, n);
    (i.tag = 2),
      t != null && (i.callback = t),
      (t = Sn(e, i, n)),
      t !== null && (br(t, e, n, r), js(t, e, n));
  },
};
function Zy(e, t, r, n, i, o, a) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(n, o, a)
      : t.prototype && t.prototype.isPureReactComponent
        ? !Wa(r, n) || !Wa(i, o)
        : !0
  );
}
function aS(e, t, r) {
  var n = !1,
    i = $n,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = or(o))
      : ((i = Mt(t) ? ci : ft.current),
        (n = t.contextTypes),
        (o = (n = n != null) ? uo(e, i) : $n)),
    (t = new t(r, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = xc),
    (e.stateNode = t),
    (t._reactInternals = e),
    n &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function Jy(e, t, r, n) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(r, n),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(r, n),
    t.state !== e && xc.enqueueReplaceState(t, t.state, null);
}
function ad(e, t, r, n) {
  var i = e.stateNode;
  (i.props = r), (i.state = e.memoizedState), (i.refs = {}), _v(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (i.context = or(o))
    : ((o = Mt(t) ? ci : ft.current), (i.context = uo(e, o))),
    (i.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (od(e, t, o, r), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && xc.enqueueReplaceState(i, i.state, null),
      rl(e, r, i, n),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function fo(e, t) {
  try {
    var r = "",
      n = t;
    do (r += dE(n)), (n = n.return);
    while (n);
    var i = r;
  } catch (o) {
    i =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function qf(e, t, r) {
  return { value: e, source: null, stack: r ?? null, digest: t ?? null };
}
function ud(e, t) {
  try {
    console.error(t.value);
  } catch (r) {
    setTimeout(function () {
      throw r;
    });
  }
}
var B2 = typeof WeakMap == "function" ? WeakMap : Map;
function uS(e, t, r) {
  (r = Hr(-1, r)), (r.tag = 3), (r.payload = { element: null });
  var n = t.value;
  return (
    (r.callback = function () {
      ul || ((ul = !0), (yd = n)), ud(e, t);
    }),
    r
  );
}
function sS(e, t, r) {
  (r = Hr(-1, r)), (r.tag = 3);
  var n = e.type.getDerivedStateFromError;
  if (typeof n == "function") {
    var i = t.value;
    (r.payload = function () {
      return n(i);
    }),
      (r.callback = function () {
        ud(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (r.callback = function () {
        ud(e, t),
          typeof n != "function" &&
            (On === null ? (On = new Set([this])) : On.add(this));
        var a = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: a !== null ? a : "",
        });
      }),
    r
  );
}
function eg(e, t, r) {
  var n = e.pingCache;
  if (n === null) {
    n = e.pingCache = new B2();
    var i = new Set();
    n.set(t, i);
  } else (i = n.get(t)), i === void 0 && ((i = new Set()), n.set(t, i));
  i.has(r) || (i.add(r), (e = eI.bind(null, e, t, r)), t.then(e, e));
}
function tg(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function rg(e, t, r, n, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (r.flags |= 131072),
          (r.flags &= -52805),
          r.tag === 1 &&
            (r.alternate === null
              ? (r.tag = 17)
              : ((t = Hr(-1, 1)), (t.tag = 2), Sn(r, t, 1))),
          (r.lanes |= 1)),
      e);
}
var z2 = tn.ReactCurrentOwner,
  Ct = !1;
function yt(e, t, r, n) {
  t.child = e === null ? Lx(t, null, r, n) : lo(t, e.child, r, n);
}
function ng(e, t, r, n, i) {
  r = r.render;
  var o = t.ref;
  return (
    eo(t, i),
    (n = Tv(e, t, r, n, o, i)),
    (r = $v()),
    e !== null && !Ct
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Qr(e, t, i))
      : (Oe && r && yv(t), (t.flags |= 1), yt(e, t, n, i), t.child)
  );
}
function ig(e, t, r, n, i) {
  if (e === null) {
    var o = r.type;
    return typeof o == "function" &&
      !Bv(o) &&
      o.defaultProps === void 0 &&
      r.compare === null &&
      r.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), lS(e, t, o, n, i))
      : ((e = Fs(r.type, null, n, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & i))) {
    var a = o.memoizedProps;
    if (
      ((r = r.compare), (r = r !== null ? r : Wa), r(a, n) && e.ref === t.ref)
    )
      return Qr(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = Pn(o, n)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function lS(e, t, r, n, i) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Wa(o, n) && e.ref === t.ref)
      if (((Ct = !1), (t.pendingProps = n = o), (e.lanes & i) !== 0))
        e.flags & 131072 && (Ct = !0);
      else return (t.lanes = e.lanes), Qr(e, t, i);
  }
  return sd(e, t, r, n, i);
}
function cS(e, t, r) {
  var n = t.pendingProps,
    i = n.children,
    o = e !== null ? e.memoizedState : null;
  if (n.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        ye(Vi, zt),
        (zt |= r);
    else {
      if (!(r & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | r : r),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          ye(Vi, zt),
          (zt |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (n = o !== null ? o.baseLanes : r),
        ye(Vi, zt),
        (zt |= n);
    }
  else
    o !== null ? ((n = o.baseLanes | r), (t.memoizedState = null)) : (n = r),
      ye(Vi, zt),
      (zt |= n);
  return yt(e, t, i, r), t.child;
}
function fS(e, t) {
  var r = t.ref;
  ((e === null && r !== null) || (e !== null && e.ref !== r)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function sd(e, t, r, n, i) {
  var o = Mt(r) ? ci : ft.current;
  return (
    (o = uo(t, o)),
    eo(t, i),
    (r = Tv(e, t, r, n, o, i)),
    (n = $v()),
    e !== null && !Ct
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Qr(e, t, i))
      : (Oe && n && yv(t), (t.flags |= 1), yt(e, t, r, i), t.child)
  );
}
function og(e, t, r, n, i) {
  if (Mt(r)) {
    var o = !0;
    Qs(t);
  } else o = !1;
  if ((eo(t, i), t.stateNode === null))
    Ds(e, t), aS(t, r, n), ad(t, r, n, i), (n = !0);
  else if (e === null) {
    var a = t.stateNode,
      u = t.memoizedProps;
    a.props = u;
    var s = a.context,
      l = r.contextType;
    typeof l == "object" && l !== null
      ? (l = or(l))
      : ((l = Mt(r) ? ci : ft.current), (l = uo(t, l)));
    var f = r.getDerivedStateFromProps,
      c =
        typeof f == "function" ||
        typeof a.getSnapshotBeforeUpdate == "function";
    c ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((u !== n || s !== l) && Jy(t, a, n, l)),
      (cn = !1);
    var p = t.memoizedState;
    (a.state = p),
      rl(t, n, a, i),
      (s = t.memoizedState),
      u !== n || p !== s || jt.current || cn
        ? (typeof f == "function" && (od(t, r, f, n), (s = t.memoizedState)),
          (u = cn || Zy(t, r, u, n, p, s, l))
            ? (c ||
                (typeof a.UNSAFE_componentWillMount != "function" &&
                  typeof a.componentWillMount != "function") ||
                (typeof a.componentWillMount == "function" &&
                  a.componentWillMount(),
                typeof a.UNSAFE_componentWillMount == "function" &&
                  a.UNSAFE_componentWillMount()),
              typeof a.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = n),
              (t.memoizedState = s)),
          (a.props = n),
          (a.state = s),
          (a.context = l),
          (n = u))
        : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
          (n = !1));
  } else {
    (a = t.stateNode),
      Fx(e, t),
      (u = t.memoizedProps),
      (l = t.type === t.elementType ? u : pr(t.type, u)),
      (a.props = l),
      (c = t.pendingProps),
      (p = a.context),
      (s = r.contextType),
      typeof s == "object" && s !== null
        ? (s = or(s))
        : ((s = Mt(r) ? ci : ft.current), (s = uo(t, s)));
    var d = r.getDerivedStateFromProps;
    (f =
      typeof d == "function" ||
      typeof a.getSnapshotBeforeUpdate == "function") ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((u !== c || p !== s) && Jy(t, a, n, s)),
      (cn = !1),
      (p = t.memoizedState),
      (a.state = p),
      rl(t, n, a, i);
    var h = t.memoizedState;
    u !== c || p !== h || jt.current || cn
      ? (typeof d == "function" && (od(t, r, d, n), (h = t.memoizedState)),
        (l = cn || Zy(t, r, l, n, p, h, s) || !1)
          ? (f ||
              (typeof a.UNSAFE_componentWillUpdate != "function" &&
                typeof a.componentWillUpdate != "function") ||
              (typeof a.componentWillUpdate == "function" &&
                a.componentWillUpdate(n, h, s),
              typeof a.UNSAFE_componentWillUpdate == "function" &&
                a.UNSAFE_componentWillUpdate(n, h, s)),
            typeof a.componentDidUpdate == "function" && (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof a.componentDidUpdate != "function" ||
              (u === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate != "function" ||
              (u === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = n),
            (t.memoizedState = h)),
        (a.props = n),
        (a.state = h),
        (a.context = s),
        (n = l))
      : (typeof a.componentDidUpdate != "function" ||
          (u === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 4),
        typeof a.getSnapshotBeforeUpdate != "function" ||
          (u === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 1024),
        (n = !1));
  }
  return ld(e, t, r, n, o, i);
}
function ld(e, t, r, n, i, o) {
  fS(e, t);
  var a = (t.flags & 128) !== 0;
  if (!n && !a) return i && Hy(t, r, !1), Qr(e, t, o);
  (n = t.stateNode), (z2.current = t);
  var u =
    a && typeof r.getDerivedStateFromError != "function" ? null : n.render();
  return (
    (t.flags |= 1),
    e !== null && a
      ? ((t.child = lo(t, e.child, null, o)), (t.child = lo(t, null, u, o)))
      : yt(e, t, u, o),
    (t.memoizedState = n.state),
    i && Hy(t, r, !0),
    t.child
  );
}
function pS(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Wy(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Wy(e, t.context, !1),
    Pv(e, t.containerInfo);
}
function ag(e, t, r, n, i) {
  return so(), bv(i), (t.flags |= 256), yt(e, t, r, n), t.child;
}
var cd = { dehydrated: null, treeContext: null, retryLane: 0 };
function fd(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function dS(e, t, r) {
  var n = t.pendingProps,
    i = Pe.current,
    o = !1,
    a = (t.flags & 128) !== 0,
    u;
  if (
    ((u = a) ||
      (u = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    u
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    ye(Pe, i & 1),
    e === null)
  )
    return (
      nd(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((a = n.children),
          (e = n.fallback),
          o
            ? ((n = t.mode),
              (o = t.child),
              (a = { mode: "hidden", children: a }),
              !(n & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = a))
                : (o = _c(a, n, 0, null)),
              (e = oi(e, n, r, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = fd(r)),
              (t.memoizedState = cd),
              e)
            : jv(t, a))
    );
  if (((i = e.memoizedState), i !== null && ((u = i.dehydrated), u !== null)))
    return U2(e, t, a, n, u, i, r);
  if (o) {
    (o = n.fallback), (a = t.mode), (i = e.child), (u = i.sibling);
    var s = { mode: "hidden", children: n.children };
    return (
      !(a & 1) && t.child !== i
        ? ((n = t.child),
          (n.childLanes = 0),
          (n.pendingProps = s),
          (t.deletions = null))
        : ((n = Pn(i, s)), (n.subtreeFlags = i.subtreeFlags & 14680064)),
      u !== null ? (o = Pn(u, o)) : ((o = oi(o, a, r, null)), (o.flags |= 2)),
      (o.return = t),
      (n.return = t),
      (n.sibling = o),
      (t.child = n),
      (n = o),
      (o = t.child),
      (a = e.child.memoizedState),
      (a =
        a === null
          ? fd(r)
          : {
              baseLanes: a.baseLanes | r,
              cachePool: null,
              transitions: a.transitions,
            }),
      (o.memoizedState = a),
      (o.childLanes = e.childLanes & ~r),
      (t.memoizedState = cd),
      n
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (n = Pn(o, { mode: "visible", children: n.children })),
    !(t.mode & 1) && (n.lanes = r),
    (n.return = t),
    (n.sibling = null),
    e !== null &&
      ((r = t.deletions),
      r === null ? ((t.deletions = [e]), (t.flags |= 16)) : r.push(e)),
    (t.child = n),
    (t.memoizedState = null),
    n
  );
}
function jv(e, t) {
  return (
    (t = _c({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function ls(e, t, r, n) {
  return (
    n !== null && bv(n),
    lo(t, e.child, null, r),
    (e = jv(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function U2(e, t, r, n, i, o, a) {
  if (r)
    return t.flags & 256
      ? ((t.flags &= -257), (n = qf(Error(B(422)))), ls(e, t, a, n))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((o = n.fallback),
          (i = t.mode),
          (n = _c({ mode: "visible", children: n.children }, i, 0, null)),
          (o = oi(o, i, a, null)),
          (o.flags |= 2),
          (n.return = t),
          (o.return = t),
          (n.sibling = o),
          (t.child = n),
          t.mode & 1 && lo(t, e.child, null, a),
          (t.child.memoizedState = fd(a)),
          (t.memoizedState = cd),
          o);
  if (!(t.mode & 1)) return ls(e, t, a, null);
  if (i.data === "$!") {
    if (((n = i.nextSibling && i.nextSibling.dataset), n)) var u = n.dgst;
    return (n = u), (o = Error(B(419))), (n = qf(o, n, void 0)), ls(e, t, a, n);
  }
  if (((u = (a & e.childLanes) !== 0), Ct || u)) {
    if (((n = Ke), n !== null)) {
      switch (a & -a) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      (i = i & (n.suspendedLanes | a) ? 0 : i),
        i !== 0 &&
          i !== o.retryLane &&
          ((o.retryLane = i), Yr(e, i), br(n, e, i, -1));
    }
    return Fv(), (n = qf(Error(B(421)))), ls(e, t, a, n);
  }
  return i.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = tI.bind(null, e)),
      (i._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (Ht = xn(i.nextSibling)),
      (Gt = t),
      (Oe = !0),
      (vr = null),
      e !== null &&
        ((Jt[er++] = Fr),
        (Jt[er++] = Br),
        (Jt[er++] = fi),
        (Fr = e.id),
        (Br = e.overflow),
        (fi = t)),
      (t = jv(t, n.children)),
      (t.flags |= 4096),
      t);
}
function ug(e, t, r) {
  e.lanes |= t;
  var n = e.alternate;
  n !== null && (n.lanes |= t), id(e.return, t, r);
}
function Kf(e, t, r, n, i) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: n,
        tail: r,
        tailMode: i,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = n),
      (o.tail = r),
      (o.tailMode = i));
}
function hS(e, t, r) {
  var n = t.pendingProps,
    i = n.revealOrder,
    o = n.tail;
  if ((yt(e, t, n.children, r), (n = Pe.current), n & 2))
    (n = (n & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && ug(e, r, t);
        else if (e.tag === 19) ug(e, r, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    n &= 1;
  }
  if ((ye(Pe, n), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (r = t.child, i = null; r !== null; )
          (e = r.alternate),
            e !== null && nl(e) === null && (i = r),
            (r = r.sibling);
        (r = i),
          r === null
            ? ((i = t.child), (t.child = null))
            : ((i = r.sibling), (r.sibling = null)),
          Kf(t, !1, i, r, o);
        break;
      case "backwards":
        for (r = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && nl(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = r), (r = i), (i = e);
        }
        Kf(t, !0, r, null, o);
        break;
      case "together":
        Kf(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Ds(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Qr(e, t, r) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (di |= t.lanes),
    !(r & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(B(153));
  if (t.child !== null) {
    for (
      e = t.child, r = Pn(e, e.pendingProps), t.child = r, r.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (r = r.sibling = Pn(e, e.pendingProps)), (r.return = t);
    r.sibling = null;
  }
  return t.child;
}
function W2(e, t, r) {
  switch (t.tag) {
    case 3:
      pS(t), so();
      break;
    case 5:
      Bx(t);
      break;
    case 1:
      Mt(t.type) && Qs(t);
      break;
    case 4:
      Pv(t, t.stateNode.containerInfo);
      break;
    case 10:
      var n = t.type._context,
        i = t.memoizedProps.value;
      ye(el, n._currentValue), (n._currentValue = i);
      break;
    case 13:
      if (((n = t.memoizedState), n !== null))
        return n.dehydrated !== null
          ? (ye(Pe, Pe.current & 1), (t.flags |= 128), null)
          : r & t.child.childLanes
            ? dS(e, t, r)
            : (ye(Pe, Pe.current & 1),
              (e = Qr(e, t, r)),
              e !== null ? e.sibling : null);
      ye(Pe, Pe.current & 1);
      break;
    case 19:
      if (((n = (r & t.childLanes) !== 0), e.flags & 128)) {
        if (n) return hS(e, t, r);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        ye(Pe, Pe.current),
        n)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), cS(e, t, r);
  }
  return Qr(e, t, r);
}
var vS, pd, mS, yS;
vS = function (e, t) {
  for (var r = t.child; r !== null; ) {
    if (r.tag === 5 || r.tag === 6) e.appendChild(r.stateNode);
    else if (r.tag !== 4 && r.child !== null) {
      (r.child.return = r), (r = r.child);
      continue;
    }
    if (r === t) break;
    for (; r.sibling === null; ) {
      if (r.return === null || r.return === t) return;
      r = r.return;
    }
    (r.sibling.return = r.return), (r = r.sibling);
  }
};
pd = function () {};
mS = function (e, t, r, n) {
  var i = e.memoizedProps;
  if (i !== n) {
    (e = t.stateNode), Jn($r.current);
    var o = null;
    switch (r) {
      case "input":
        (i = Mp(e, i)), (n = Mp(e, n)), (o = []);
        break;
      case "select":
        (i = Ee({}, i, { value: void 0 })),
          (n = Ee({}, n, { value: void 0 })),
          (o = []);
        break;
      case "textarea":
        (i = Lp(e, i)), (n = Lp(e, n)), (o = []);
        break;
      default:
        typeof i.onClick != "function" &&
          typeof n.onClick == "function" &&
          (e.onclick = Xs);
    }
    Fp(r, n);
    var a;
    r = null;
    for (l in i)
      if (!n.hasOwnProperty(l) && i.hasOwnProperty(l) && i[l] != null)
        if (l === "style") {
          var u = i[l];
          for (a in u) u.hasOwnProperty(a) && (r || (r = {}), (r[a] = ""));
        } else
          l !== "dangerouslySetInnerHTML" &&
            l !== "children" &&
            l !== "suppressContentEditableWarning" &&
            l !== "suppressHydrationWarning" &&
            l !== "autoFocus" &&
            (Da.hasOwnProperty(l)
              ? o || (o = [])
              : (o = o || []).push(l, null));
    for (l in n) {
      var s = n[l];
      if (
        ((u = i != null ? i[l] : void 0),
        n.hasOwnProperty(l) && s !== u && (s != null || u != null))
      )
        if (l === "style")
          if (u) {
            for (a in u)
              !u.hasOwnProperty(a) ||
                (s && s.hasOwnProperty(a)) ||
                (r || (r = {}), (r[a] = ""));
            for (a in s)
              s.hasOwnProperty(a) &&
                u[a] !== s[a] &&
                (r || (r = {}), (r[a] = s[a]));
          } else r || (o || (o = []), o.push(l, r)), (r = s);
        else
          l === "dangerouslySetInnerHTML"
            ? ((s = s ? s.__html : void 0),
              (u = u ? u.__html : void 0),
              s != null && u !== s && (o = o || []).push(l, s))
            : l === "children"
              ? (typeof s != "string" && typeof s != "number") ||
                (o = o || []).push(l, "" + s)
              : l !== "suppressContentEditableWarning" &&
                l !== "suppressHydrationWarning" &&
                (Da.hasOwnProperty(l)
                  ? (s != null && l === "onScroll" && ge("scroll", e),
                    o || u === s || (o = []))
                  : (o = o || []).push(l, s));
    }
    r && (o = o || []).push("style", r);
    var l = o;
    (t.updateQueue = l) && (t.flags |= 4);
  }
};
yS = function (e, t, r, n) {
  r !== n && (t.flags |= 4);
};
function ia(e, t) {
  if (!Oe)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var r = null; t !== null; )
          t.alternate !== null && (r = t), (t = t.sibling);
        r === null ? (e.tail = null) : (r.sibling = null);
        break;
      case "collapsed":
        r = e.tail;
        for (var n = null; r !== null; )
          r.alternate !== null && (n = r), (r = r.sibling);
        n === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (n.sibling = null);
    }
}
function ot(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    r = 0,
    n = 0;
  if (t)
    for (var i = e.child; i !== null; )
      (r |= i.lanes | i.childLanes),
        (n |= i.subtreeFlags & 14680064),
        (n |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; i !== null; )
      (r |= i.lanes | i.childLanes),
        (n |= i.subtreeFlags),
        (n |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= n), (e.childLanes = r), t;
}
function H2(e, t, r) {
  var n = t.pendingProps;
  switch ((gv(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return ot(t), null;
    case 1:
      return Mt(t.type) && Ys(), ot(t), null;
    case 3:
      return (
        (n = t.stateNode),
        co(),
        xe(jt),
        xe(ft),
        Ev(),
        n.pendingContext &&
          ((n.context = n.pendingContext), (n.pendingContext = null)),
        (e === null || e.child === null) &&
          (us(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), vr !== null && (wd(vr), (vr = null)))),
        pd(e, t),
        ot(t),
        null
      );
    case 5:
      Av(t);
      var i = Jn(Ka.current);
      if (((r = t.type), e !== null && t.stateNode != null))
        mS(e, t, r, n, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!n) {
          if (t.stateNode === null) throw Error(B(166));
          return ot(t), null;
        }
        if (((e = Jn($r.current)), us(t))) {
          (n = t.stateNode), (r = t.type);
          var o = t.memoizedProps;
          switch (((n[Er] = t), (n[Va] = o), (e = (t.mode & 1) !== 0), r)) {
            case "dialog":
              ge("cancel", n), ge("close", n);
              break;
            case "iframe":
            case "object":
            case "embed":
              ge("load", n);
              break;
            case "video":
            case "audio":
              for (i = 0; i < ba.length; i++) ge(ba[i], n);
              break;
            case "source":
              ge("error", n);
              break;
            case "img":
            case "image":
            case "link":
              ge("error", n), ge("load", n);
              break;
            case "details":
              ge("toggle", n);
              break;
            case "input":
              my(n, o), ge("invalid", n);
              break;
            case "select":
              (n._wrapperState = { wasMultiple: !!o.multiple }),
                ge("invalid", n);
              break;
            case "textarea":
              gy(n, o), ge("invalid", n);
          }
          Fp(r, o), (i = null);
          for (var a in o)
            if (o.hasOwnProperty(a)) {
              var u = o[a];
              a === "children"
                ? typeof u == "string"
                  ? n.textContent !== u &&
                    (o.suppressHydrationWarning !== !0 &&
                      as(n.textContent, u, e),
                    (i = ["children", u]))
                  : typeof u == "number" &&
                    n.textContent !== "" + u &&
                    (o.suppressHydrationWarning !== !0 &&
                      as(n.textContent, u, e),
                    (i = ["children", "" + u]))
                : Da.hasOwnProperty(a) &&
                  u != null &&
                  a === "onScroll" &&
                  ge("scroll", n);
            }
          switch (r) {
            case "input":
              Zu(n), yy(n, o, !0);
              break;
            case "textarea":
              Zu(n), by(n);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (n.onclick = Xs);
          }
          (n = i), (t.updateQueue = n), n !== null && (t.flags |= 4);
        } else {
          (a = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Gw(r)),
            e === "http://www.w3.org/1999/xhtml"
              ? r === "script"
                ? ((e = a.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof n.is == "string"
                  ? (e = a.createElement(r, { is: n.is }))
                  : ((e = a.createElement(r)),
                    r === "select" &&
                      ((a = e),
                      n.multiple
                        ? (a.multiple = !0)
                        : n.size && (a.size = n.size)))
              : (e = a.createElementNS(e, r)),
            (e[Er] = t),
            (e[Va] = n),
            vS(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((a = Bp(r, n)), r)) {
              case "dialog":
                ge("cancel", e), ge("close", e), (i = n);
                break;
              case "iframe":
              case "object":
              case "embed":
                ge("load", e), (i = n);
                break;
              case "video":
              case "audio":
                for (i = 0; i < ba.length; i++) ge(ba[i], e);
                i = n;
                break;
              case "source":
                ge("error", e), (i = n);
                break;
              case "img":
              case "image":
              case "link":
                ge("error", e), ge("load", e), (i = n);
                break;
              case "details":
                ge("toggle", e), (i = n);
                break;
              case "input":
                my(e, n), (i = Mp(e, n)), ge("invalid", e);
                break;
              case "option":
                i = n;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!n.multiple }),
                  (i = Ee({}, n, { value: void 0 })),
                  ge("invalid", e);
                break;
              case "textarea":
                gy(e, n), (i = Lp(e, n)), ge("invalid", e);
                break;
              default:
                i = n;
            }
            Fp(r, i), (u = i);
            for (o in u)
              if (u.hasOwnProperty(o)) {
                var s = u[o];
                o === "style"
                  ? Kw(e, s)
                  : o === "dangerouslySetInnerHTML"
                    ? ((s = s ? s.__html : void 0), s != null && Vw(e, s))
                    : o === "children"
                      ? typeof s == "string"
                        ? (r !== "textarea" || s !== "") && La(e, s)
                        : typeof s == "number" && La(e, "" + s)
                      : o !== "suppressContentEditableWarning" &&
                        o !== "suppressHydrationWarning" &&
                        o !== "autoFocus" &&
                        (Da.hasOwnProperty(o)
                          ? s != null && o === "onScroll" && ge("scroll", e)
                          : s != null && nv(e, o, s, a));
              }
            switch (r) {
              case "input":
                Zu(e), yy(e, n, !1);
                break;
              case "textarea":
                Zu(e), by(e);
                break;
              case "option":
                n.value != null && e.setAttribute("value", "" + Tn(n.value));
                break;
              case "select":
                (e.multiple = !!n.multiple),
                  (o = n.value),
                  o != null
                    ? Yi(e, !!n.multiple, o, !1)
                    : n.defaultValue != null &&
                      Yi(e, !!n.multiple, n.defaultValue, !0);
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = Xs);
            }
            switch (r) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n = !!n.autoFocus;
                break e;
              case "img":
                n = !0;
                break e;
              default:
                n = !1;
            }
          }
          n && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return ot(t), null;
    case 6:
      if (e && t.stateNode != null) yS(e, t, e.memoizedProps, n);
      else {
        if (typeof n != "string" && t.stateNode === null) throw Error(B(166));
        if (((r = Jn(Ka.current)), Jn($r.current), us(t))) {
          if (
            ((n = t.stateNode),
            (r = t.memoizedProps),
            (n[Er] = t),
            (o = n.nodeValue !== r) && ((e = Gt), e !== null))
          )
            switch (e.tag) {
              case 3:
                as(n.nodeValue, r, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  as(n.nodeValue, r, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (n = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(n)),
            (n[Er] = t),
            (t.stateNode = n);
      }
      return ot(t), null;
    case 13:
      if (
        (xe(Pe),
        (n = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (Oe && Ht !== null && t.mode & 1 && !(t.flags & 128))
          Nx(), so(), (t.flags |= 98560), (o = !1);
        else if (((o = us(t)), n !== null && n.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(B(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(B(317));
            o[Er] = t;
          } else
            so(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          ot(t), (o = !1);
        } else vr !== null && (wd(vr), (vr = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = r), t)
        : ((n = n !== null),
          n !== (e !== null && e.memoizedState !== null) &&
            n &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || Pe.current & 1 ? ze === 0 && (ze = 3) : Fv())),
          t.updateQueue !== null && (t.flags |= 4),
          ot(t),
          null);
    case 4:
      return (
        co(), pd(e, t), e === null && Ha(t.stateNode.containerInfo), ot(t), null
      );
    case 10:
      return Sv(t.type._context), ot(t), null;
    case 17:
      return Mt(t.type) && Ys(), ot(t), null;
    case 19:
      if ((xe(Pe), (o = t.memoizedState), o === null)) return ot(t), null;
      if (((n = (t.flags & 128) !== 0), (a = o.rendering), a === null))
        if (n) ia(o, !1);
        else {
          if (ze !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((a = nl(e)), a !== null)) {
                for (
                  t.flags |= 128,
                    ia(o, !1),
                    n = a.updateQueue,
                    n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    n = r,
                    r = t.child;
                  r !== null;

                )
                  (o = r),
                    (e = n),
                    (o.flags &= 14680066),
                    (a = o.alternate),
                    a === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = a.childLanes),
                        (o.lanes = a.lanes),
                        (o.child = a.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = a.memoizedProps),
                        (o.memoizedState = a.memoizedState),
                        (o.updateQueue = a.updateQueue),
                        (o.type = a.type),
                        (e = a.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (r = r.sibling);
                return ye(Pe, (Pe.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            je() > po &&
            ((t.flags |= 128), (n = !0), ia(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!n)
          if (((e = nl(a)), e !== null)) {
            if (
              ((t.flags |= 128),
              (n = !0),
              (r = e.updateQueue),
              r !== null && ((t.updateQueue = r), (t.flags |= 4)),
              ia(o, !0),
              o.tail === null && o.tailMode === "hidden" && !a.alternate && !Oe)
            )
              return ot(t), null;
          } else
            2 * je() - o.renderingStartTime > po &&
              r !== 1073741824 &&
              ((t.flags |= 128), (n = !0), ia(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((a.sibling = t.child), (t.child = a))
          : ((r = o.last),
            r !== null ? (r.sibling = a) : (t.child = a),
            (o.last = a));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = je()),
          (t.sibling = null),
          (r = Pe.current),
          ye(Pe, n ? (r & 1) | 2 : r & 1),
          t)
        : (ot(t), null);
    case 22:
    case 23:
      return (
        Rv(),
        (n = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== n && (t.flags |= 8192),
        n && t.mode & 1
          ? zt & 1073741824 && (ot(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ot(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(B(156, t.tag));
}
function G2(e, t) {
  switch ((gv(t), t.tag)) {
    case 1:
      return (
        Mt(t.type) && Ys(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        co(),
        xe(jt),
        xe(ft),
        Ev(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Av(t), null;
    case 13:
      if (
        (xe(Pe), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(B(340));
        so();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return xe(Pe), null;
    case 4:
      return co(), null;
    case 10:
      return Sv(t.type._context), null;
    case 22:
    case 23:
      return Rv(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var cs = !1,
  st = !1,
  V2 = typeof WeakSet == "function" ? WeakSet : Set,
  V = null;
function Gi(e, t) {
  var r = e.ref;
  if (r !== null)
    if (typeof r == "function")
      try {
        r(null);
      } catch (n) {
        Te(e, t, n);
      }
    else r.current = null;
}
function dd(e, t, r) {
  try {
    r();
  } catch (n) {
    Te(e, t, n);
  }
}
var sg = !1;
function q2(e, t) {
  if (((Yp = Vs), (e = Sx()), mv(e))) {
    if ("selectionStart" in e)
      var r = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        r = ((r = e.ownerDocument) && r.defaultView) || window;
        var n = r.getSelection && r.getSelection();
        if (n && n.rangeCount !== 0) {
          r = n.anchorNode;
          var i = n.anchorOffset,
            o = n.focusNode;
          n = n.focusOffset;
          try {
            r.nodeType, o.nodeType;
          } catch {
            r = null;
            break e;
          }
          var a = 0,
            u = -1,
            s = -1,
            l = 0,
            f = 0,
            c = e,
            p = null;
          t: for (;;) {
            for (
              var d;
              c !== r || (i !== 0 && c.nodeType !== 3) || (u = a + i),
                c !== o || (n !== 0 && c.nodeType !== 3) || (s = a + n),
                c.nodeType === 3 && (a += c.nodeValue.length),
                (d = c.firstChild) !== null;

            )
              (p = c), (c = d);
            for (;;) {
              if (c === e) break t;
              if (
                (p === r && ++l === i && (u = a),
                p === o && ++f === n && (s = a),
                (d = c.nextSibling) !== null)
              )
                break;
              (c = p), (p = c.parentNode);
            }
            c = d;
          }
          r = u === -1 || s === -1 ? null : { start: u, end: s };
        } else r = null;
      }
    r = r || { start: 0, end: 0 };
  } else r = null;
  for (Qp = { focusedElem: e, selectionRange: r }, Vs = !1, V = t; V !== null; )
    if (((t = V), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (V = e);
    else
      for (; V !== null; ) {
        t = V;
        try {
          var h = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (h !== null) {
                  var y = h.memoizedProps,
                    w = h.memoizedState,
                    m = t.stateNode,
                    v = m.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? y : pr(t.type, y),
                      w
                    );
                  m.__reactInternalSnapshotBeforeUpdate = v;
                }
                break;
              case 3:
                var g = t.stateNode.containerInfo;
                g.nodeType === 1
                  ? (g.textContent = "")
                  : g.nodeType === 9 &&
                    g.documentElement &&
                    g.removeChild(g.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(B(163));
            }
        } catch (S) {
          Te(t, t.return, S);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (V = e);
          break;
        }
        V = t.return;
      }
  return (h = sg), (sg = !1), h;
}
function Ta(e, t, r) {
  var n = t.updateQueue;
  if (((n = n !== null ? n.lastEffect : null), n !== null)) {
    var i = (n = n.next);
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy;
        (i.destroy = void 0), o !== void 0 && dd(t, r, o);
      }
      i = i.next;
    } while (i !== n);
  }
}
function Sc(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var r = (t = t.next);
    do {
      if ((r.tag & e) === e) {
        var n = r.create;
        r.destroy = n();
      }
      r = r.next;
    } while (r !== t);
  }
}
function hd(e) {
  var t = e.ref;
  if (t !== null) {
    var r = e.stateNode;
    switch (e.tag) {
      case 5:
        e = r;
        break;
      default:
        e = r;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function gS(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), gS(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Er], delete t[Va], delete t[ed], delete t[T2], delete t[$2])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function bS(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function lg(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || bS(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function vd(e, t, r) {
  var n = e.tag;
  if (n === 5 || n === 6)
    (e = e.stateNode),
      t
        ? r.nodeType === 8
          ? r.parentNode.insertBefore(e, t)
          : r.insertBefore(e, t)
        : (r.nodeType === 8
            ? ((t = r.parentNode), t.insertBefore(e, r))
            : ((t = r), t.appendChild(e)),
          (r = r._reactRootContainer),
          r != null || t.onclick !== null || (t.onclick = Xs));
  else if (n !== 4 && ((e = e.child), e !== null))
    for (vd(e, t, r), e = e.sibling; e !== null; ) vd(e, t, r), (e = e.sibling);
}
function md(e, t, r) {
  var n = e.tag;
  if (n === 5 || n === 6)
    (e = e.stateNode), t ? r.insertBefore(e, t) : r.appendChild(e);
  else if (n !== 4 && ((e = e.child), e !== null))
    for (md(e, t, r), e = e.sibling; e !== null; ) md(e, t, r), (e = e.sibling);
}
var Ze = null,
  dr = !1;
function sn(e, t, r) {
  for (r = r.child; r !== null; ) wS(e, t, r), (r = r.sibling);
}
function wS(e, t, r) {
  if (Tr && typeof Tr.onCommitFiberUnmount == "function")
    try {
      Tr.onCommitFiberUnmount(hc, r);
    } catch {}
  switch (r.tag) {
    case 5:
      st || Gi(r, t);
    case 6:
      var n = Ze,
        i = dr;
      (Ze = null),
        sn(e, t, r),
        (Ze = n),
        (dr = i),
        Ze !== null &&
          (dr
            ? ((e = Ze),
              (r = r.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r))
            : Ze.removeChild(r.stateNode));
      break;
    case 18:
      Ze !== null &&
        (dr
          ? ((e = Ze),
            (r = r.stateNode),
            e.nodeType === 8
              ? zf(e.parentNode, r)
              : e.nodeType === 1 && zf(e, r),
            za(e))
          : zf(Ze, r.stateNode));
      break;
    case 4:
      (n = Ze),
        (i = dr),
        (Ze = r.stateNode.containerInfo),
        (dr = !0),
        sn(e, t, r),
        (Ze = n),
        (dr = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !st &&
        ((n = r.updateQueue), n !== null && ((n = n.lastEffect), n !== null))
      ) {
        i = n = n.next;
        do {
          var o = i,
            a = o.destroy;
          (o = o.tag),
            a !== void 0 && (o & 2 || o & 4) && dd(r, t, a),
            (i = i.next);
        } while (i !== n);
      }
      sn(e, t, r);
      break;
    case 1:
      if (
        !st &&
        (Gi(r, t),
        (n = r.stateNode),
        typeof n.componentWillUnmount == "function")
      )
        try {
          (n.props = r.memoizedProps),
            (n.state = r.memoizedState),
            n.componentWillUnmount();
        } catch (u) {
          Te(r, t, u);
        }
      sn(e, t, r);
      break;
    case 21:
      sn(e, t, r);
      break;
    case 22:
      r.mode & 1
        ? ((st = (n = st) || r.memoizedState !== null), sn(e, t, r), (st = n))
        : sn(e, t, r);
      break;
    default:
      sn(e, t, r);
  }
}
function cg(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var r = e.stateNode;
    r === null && (r = e.stateNode = new V2()),
      t.forEach(function (n) {
        var i = rI.bind(null, e, n);
        r.has(n) || (r.add(n), n.then(i, i));
      });
  }
}
function cr(e, t) {
  var r = t.deletions;
  if (r !== null)
    for (var n = 0; n < r.length; n++) {
      var i = r[n];
      try {
        var o = e,
          a = t,
          u = a;
        e: for (; u !== null; ) {
          switch (u.tag) {
            case 5:
              (Ze = u.stateNode), (dr = !1);
              break e;
            case 3:
              (Ze = u.stateNode.containerInfo), (dr = !0);
              break e;
            case 4:
              (Ze = u.stateNode.containerInfo), (dr = !0);
              break e;
          }
          u = u.return;
        }
        if (Ze === null) throw Error(B(160));
        wS(o, a, i), (Ze = null), (dr = !1);
        var s = i.alternate;
        s !== null && (s.return = null), (i.return = null);
      } catch (l) {
        Te(i, t, l);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) xS(t, e), (t = t.sibling);
}
function xS(e, t) {
  var r = e.alternate,
    n = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((cr(t, e), _r(e), n & 4)) {
        try {
          Ta(3, e, e.return), Sc(3, e);
        } catch (y) {
          Te(e, e.return, y);
        }
        try {
          Ta(5, e, e.return);
        } catch (y) {
          Te(e, e.return, y);
        }
      }
      break;
    case 1:
      cr(t, e), _r(e), n & 512 && r !== null && Gi(r, r.return);
      break;
    case 5:
      if (
        (cr(t, e),
        _r(e),
        n & 512 && r !== null && Gi(r, r.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          La(i, "");
        } catch (y) {
          Te(e, e.return, y);
        }
      }
      if (n & 4 && ((i = e.stateNode), i != null)) {
        var o = e.memoizedProps,
          a = r !== null ? r.memoizedProps : o,
          u = e.type,
          s = e.updateQueue;
        if (((e.updateQueue = null), s !== null))
          try {
            u === "input" && o.type === "radio" && o.name != null && Ww(i, o),
              Bp(u, a);
            var l = Bp(u, o);
            for (a = 0; a < s.length; a += 2) {
              var f = s[a],
                c = s[a + 1];
              f === "style"
                ? Kw(i, c)
                : f === "dangerouslySetInnerHTML"
                  ? Vw(i, c)
                  : f === "children"
                    ? La(i, c)
                    : nv(i, f, c, l);
            }
            switch (u) {
              case "input":
                Np(i, o);
                break;
              case "textarea":
                Hw(i, o);
                break;
              case "select":
                var p = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var d = o.value;
                d != null
                  ? Yi(i, !!o.multiple, d, !1)
                  : p !== !!o.multiple &&
                    (o.defaultValue != null
                      ? Yi(i, !!o.multiple, o.defaultValue, !0)
                      : Yi(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[Va] = o;
          } catch (y) {
            Te(e, e.return, y);
          }
      }
      break;
    case 6:
      if ((cr(t, e), _r(e), n & 4)) {
        if (e.stateNode === null) throw Error(B(162));
        (i = e.stateNode), (o = e.memoizedProps);
        try {
          i.nodeValue = o;
        } catch (y) {
          Te(e, e.return, y);
        }
      }
      break;
    case 3:
      if (
        (cr(t, e), _r(e), n & 4 && r !== null && r.memoizedState.isDehydrated)
      )
        try {
          za(t.containerInfo);
        } catch (y) {
          Te(e, e.return, y);
        }
      break;
    case 4:
      cr(t, e), _r(e);
      break;
    case 13:
      cr(t, e),
        _r(e),
        (i = e.child),
        i.flags & 8192 &&
          ((o = i.memoizedState !== null),
          (i.stateNode.isHidden = o),
          !o ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            (Dv = je())),
        n & 4 && cg(e);
      break;
    case 22:
      if (
        ((f = r !== null && r.memoizedState !== null),
        e.mode & 1 ? ((st = (l = st) || f), cr(t, e), (st = l)) : cr(t, e),
        _r(e),
        n & 8192)
      ) {
        if (
          ((l = e.memoizedState !== null),
          (e.stateNode.isHidden = l) && !f && e.mode & 1)
        )
          for (V = e, f = e.child; f !== null; ) {
            for (c = V = f; V !== null; ) {
              switch (((p = V), (d = p.child), p.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Ta(4, p, p.return);
                  break;
                case 1:
                  Gi(p, p.return);
                  var h = p.stateNode;
                  if (typeof h.componentWillUnmount == "function") {
                    (n = p), (r = p.return);
                    try {
                      (t = n),
                        (h.props = t.memoizedProps),
                        (h.state = t.memoizedState),
                        h.componentWillUnmount();
                    } catch (y) {
                      Te(n, r, y);
                    }
                  }
                  break;
                case 5:
                  Gi(p, p.return);
                  break;
                case 22:
                  if (p.memoizedState !== null) {
                    pg(c);
                    continue;
                  }
              }
              d !== null ? ((d.return = p), (V = d)) : pg(c);
            }
            f = f.sibling;
          }
        e: for (f = null, c = e; ; ) {
          if (c.tag === 5) {
            if (f === null) {
              f = c;
              try {
                (i = c.stateNode),
                  l
                    ? ((o = i.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((u = c.stateNode),
                      (s = c.memoizedProps.style),
                      (a =
                        s != null && s.hasOwnProperty("display")
                          ? s.display
                          : null),
                      (u.style.display = qw("display", a)));
              } catch (y) {
                Te(e, e.return, y);
              }
            }
          } else if (c.tag === 6) {
            if (f === null)
              try {
                c.stateNode.nodeValue = l ? "" : c.memoizedProps;
              } catch (y) {
                Te(e, e.return, y);
              }
          } else if (
            ((c.tag !== 22 && c.tag !== 23) ||
              c.memoizedState === null ||
              c === e) &&
            c.child !== null
          ) {
            (c.child.return = c), (c = c.child);
            continue;
          }
          if (c === e) break e;
          for (; c.sibling === null; ) {
            if (c.return === null || c.return === e) break e;
            f === c && (f = null), (c = c.return);
          }
          f === c && (f = null), (c.sibling.return = c.return), (c = c.sibling);
        }
      }
      break;
    case 19:
      cr(t, e), _r(e), n & 4 && cg(e);
      break;
    case 21:
      break;
    default:
      cr(t, e), _r(e);
  }
}
function _r(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var r = e.return; r !== null; ) {
          if (bS(r)) {
            var n = r;
            break e;
          }
          r = r.return;
        }
        throw Error(B(160));
      }
      switch (n.tag) {
        case 5:
          var i = n.stateNode;
          n.flags & 32 && (La(i, ""), (n.flags &= -33));
          var o = lg(e);
          md(e, o, i);
          break;
        case 3:
        case 4:
          var a = n.stateNode.containerInfo,
            u = lg(e);
          vd(e, u, a);
          break;
        default:
          throw Error(B(161));
      }
    } catch (s) {
      Te(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function K2(e, t, r) {
  (V = e), SS(e);
}
function SS(e, t, r) {
  for (var n = (e.mode & 1) !== 0; V !== null; ) {
    var i = V,
      o = i.child;
    if (i.tag === 22 && n) {
      var a = i.memoizedState !== null || cs;
      if (!a) {
        var u = i.alternate,
          s = (u !== null && u.memoizedState !== null) || st;
        u = cs;
        var l = st;
        if (((cs = a), (st = s) && !l))
          for (V = i; V !== null; )
            (a = V),
              (s = a.child),
              a.tag === 22 && a.memoizedState !== null
                ? dg(i)
                : s !== null
                  ? ((s.return = a), (V = s))
                  : dg(i);
        for (; o !== null; ) (V = o), SS(o), (o = o.sibling);
        (V = i), (cs = u), (st = l);
      }
      fg(e);
    } else
      i.subtreeFlags & 8772 && o !== null ? ((o.return = i), (V = o)) : fg(e);
  }
}
function fg(e) {
  for (; V !== null; ) {
    var t = V;
    if (t.flags & 8772) {
      var r = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              st || Sc(5, t);
              break;
            case 1:
              var n = t.stateNode;
              if (t.flags & 4 && !st)
                if (r === null) n.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? r.memoizedProps
                      : pr(t.type, r.memoizedProps);
                  n.componentDidUpdate(
                    i,
                    r.memoizedState,
                    n.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var o = t.updateQueue;
              o !== null && Xy(t, o, n);
              break;
            case 3:
              var a = t.updateQueue;
              if (a !== null) {
                if (((r = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      r = t.child.stateNode;
                      break;
                    case 1:
                      r = t.child.stateNode;
                  }
                Xy(t, a, r);
              }
              break;
            case 5:
              var u = t.stateNode;
              if (r === null && t.flags & 4) {
                r = u;
                var s = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    s.autoFocus && r.focus();
                    break;
                  case "img":
                    s.src && (r.src = s.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var l = t.alternate;
                if (l !== null) {
                  var f = l.memoizedState;
                  if (f !== null) {
                    var c = f.dehydrated;
                    c !== null && za(c);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(B(163));
          }
        st || (t.flags & 512 && hd(t));
      } catch (p) {
        Te(t, t.return, p);
      }
    }
    if (t === e) {
      V = null;
      break;
    }
    if (((r = t.sibling), r !== null)) {
      (r.return = t.return), (V = r);
      break;
    }
    V = t.return;
  }
}
function pg(e) {
  for (; V !== null; ) {
    var t = V;
    if (t === e) {
      V = null;
      break;
    }
    var r = t.sibling;
    if (r !== null) {
      (r.return = t.return), (V = r);
      break;
    }
    V = t.return;
  }
}
function dg(e) {
  for (; V !== null; ) {
    var t = V;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var r = t.return;
          try {
            Sc(4, t);
          } catch (s) {
            Te(t, r, s);
          }
          break;
        case 1:
          var n = t.stateNode;
          if (typeof n.componentDidMount == "function") {
            var i = t.return;
            try {
              n.componentDidMount();
            } catch (s) {
              Te(t, i, s);
            }
          }
          var o = t.return;
          try {
            hd(t);
          } catch (s) {
            Te(t, o, s);
          }
          break;
        case 5:
          var a = t.return;
          try {
            hd(t);
          } catch (s) {
            Te(t, a, s);
          }
      }
    } catch (s) {
      Te(t, t.return, s);
    }
    if (t === e) {
      V = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      (u.return = t.return), (V = u);
      break;
    }
    V = t.return;
  }
}
var X2 = Math.ceil,
  al = tn.ReactCurrentDispatcher,
  Mv = tn.ReactCurrentOwner,
  nr = tn.ReactCurrentBatchConfig,
  ie = 0,
  Ke = null,
  Ne = null,
  et = 0,
  zt = 0,
  Vi = jn(0),
  ze = 0,
  Za = null,
  di = 0,
  Oc = 0,
  Nv = 0,
  $a = null,
  $t = null,
  Dv = 0,
  po = 1 / 0,
  Lr = null,
  ul = !1,
  yd = null,
  On = null,
  fs = !1,
  mn = null,
  sl = 0,
  Ca = 0,
  gd = null,
  Ls = -1,
  Rs = 0;
function bt() {
  return ie & 6 ? je() : Ls !== -1 ? Ls : (Ls = je());
}
function _n(e) {
  return e.mode & 1
    ? ie & 2 && et !== 0
      ? et & -et
      : k2.transition !== null
        ? (Rs === 0 && (Rs = ax()), Rs)
        : ((e = le),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : dx(e.type))),
          e)
    : 1;
}
function br(e, t, r, n) {
  if (50 < Ca) throw ((Ca = 0), (gd = null), Error(B(185)));
  Du(e, r, n),
    (!(ie & 2) || e !== Ke) &&
      (e === Ke && (!(ie & 2) && (Oc |= r), ze === 4 && dn(e, et)),
      Nt(e, n),
      r === 1 && ie === 0 && !(t.mode & 1) && ((po = je() + 500), bc && Mn()));
}
function Nt(e, t) {
  var r = e.callbackNode;
  kE(e, t);
  var n = Gs(e, e === Ke ? et : 0);
  if (n === 0)
    r !== null && Sy(r), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = n & -n), e.callbackPriority !== t)) {
    if ((r != null && Sy(r), t === 1))
      e.tag === 0 ? C2(hg.bind(null, e)) : kx(hg.bind(null, e)),
        E2(function () {
          !(ie & 6) && Mn();
        }),
        (r = null);
    else {
      switch (ux(n)) {
        case 1:
          r = sv;
          break;
        case 4:
          r = ix;
          break;
        case 16:
          r = Hs;
          break;
        case 536870912:
          r = ox;
          break;
        default:
          r = Hs;
      }
      r = $S(r, OS.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = r);
  }
}
function OS(e, t) {
  if (((Ls = -1), (Rs = 0), ie & 6)) throw Error(B(327));
  var r = e.callbackNode;
  if (to() && e.callbackNode !== r) return null;
  var n = Gs(e, e === Ke ? et : 0);
  if (n === 0) return null;
  if (n & 30 || n & e.expiredLanes || t) t = ll(e, n);
  else {
    t = n;
    var i = ie;
    ie |= 2;
    var o = PS();
    (Ke !== e || et !== t) && ((Lr = null), (po = je() + 500), ii(e, t));
    do
      try {
        Z2();
        break;
      } catch (u) {
        _S(e, u);
      }
    while (!0);
    xv(),
      (al.current = o),
      (ie = i),
      Ne !== null ? (t = 0) : ((Ke = null), (et = 0), (t = ze));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = Gp(e)), i !== 0 && ((n = i), (t = bd(e, i)))), t === 1)
    )
      throw ((r = Za), ii(e, 0), dn(e, n), Nt(e, je()), r);
    if (t === 6) dn(e, n);
    else {
      if (
        ((i = e.current.alternate),
        !(n & 30) &&
          !Y2(i) &&
          ((t = ll(e, n)),
          t === 2 && ((o = Gp(e)), o !== 0 && ((n = o), (t = bd(e, o)))),
          t === 1))
      )
        throw ((r = Za), ii(e, 0), dn(e, n), Nt(e, je()), r);
      switch (((e.finishedWork = i), (e.finishedLanes = n), t)) {
        case 0:
        case 1:
          throw Error(B(345));
        case 2:
          Gn(e, $t, Lr);
          break;
        case 3:
          if (
            (dn(e, n), (n & 130023424) === n && ((t = Dv + 500 - je()), 10 < t))
          ) {
            if (Gs(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & n) !== n)) {
              bt(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = Jp(Gn.bind(null, e, $t, Lr), t);
            break;
          }
          Gn(e, $t, Lr);
          break;
        case 4:
          if ((dn(e, n), (n & 4194240) === n)) break;
          for (t = e.eventTimes, i = -1; 0 < n; ) {
            var a = 31 - gr(n);
            (o = 1 << a), (a = t[a]), a > i && (i = a), (n &= ~o);
          }
          if (
            ((n = i),
            (n = je() - n),
            (n =
              (120 > n
                ? 120
                : 480 > n
                  ? 480
                  : 1080 > n
                    ? 1080
                    : 1920 > n
                      ? 1920
                      : 3e3 > n
                        ? 3e3
                        : 4320 > n
                          ? 4320
                          : 1960 * X2(n / 1960)) - n),
            10 < n)
          ) {
            e.timeoutHandle = Jp(Gn.bind(null, e, $t, Lr), n);
            break;
          }
          Gn(e, $t, Lr);
          break;
        case 5:
          Gn(e, $t, Lr);
          break;
        default:
          throw Error(B(329));
      }
    }
  }
  return Nt(e, je()), e.callbackNode === r ? OS.bind(null, e) : null;
}
function bd(e, t) {
  var r = $a;
  return (
    e.current.memoizedState.isDehydrated && (ii(e, t).flags |= 256),
    (e = ll(e, t)),
    e !== 2 && ((t = $t), ($t = r), t !== null && wd(t)),
    e
  );
}
function wd(e) {
  $t === null ? ($t = e) : $t.push.apply($t, e);
}
function Y2(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var r = t.updateQueue;
      if (r !== null && ((r = r.stores), r !== null))
        for (var n = 0; n < r.length; n++) {
          var i = r[n],
            o = i.getSnapshot;
          i = i.value;
          try {
            if (!xr(o(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((r = t.child), t.subtreeFlags & 16384 && r !== null))
      (r.return = t), (t = r);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function dn(e, t) {
  for (
    t &= ~Nv,
      t &= ~Oc,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var r = 31 - gr(t),
      n = 1 << r;
    (e[r] = -1), (t &= ~n);
  }
}
function hg(e) {
  if (ie & 6) throw Error(B(327));
  to();
  var t = Gs(e, 0);
  if (!(t & 1)) return Nt(e, je()), null;
  var r = ll(e, t);
  if (e.tag !== 0 && r === 2) {
    var n = Gp(e);
    n !== 0 && ((t = n), (r = bd(e, n)));
  }
  if (r === 1) throw ((r = Za), ii(e, 0), dn(e, t), Nt(e, je()), r);
  if (r === 6) throw Error(B(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Gn(e, $t, Lr),
    Nt(e, je()),
    null
  );
}
function Lv(e, t) {
  var r = ie;
  ie |= 1;
  try {
    return e(t);
  } finally {
    (ie = r), ie === 0 && ((po = je() + 500), bc && Mn());
  }
}
function hi(e) {
  mn !== null && mn.tag === 0 && !(ie & 6) && to();
  var t = ie;
  ie |= 1;
  var r = nr.transition,
    n = le;
  try {
    if (((nr.transition = null), (le = 1), e)) return e();
  } finally {
    (le = n), (nr.transition = r), (ie = t), !(ie & 6) && Mn();
  }
}
function Rv() {
  (zt = Vi.current), xe(Vi);
}
function ii(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var r = e.timeoutHandle;
  if ((r !== -1 && ((e.timeoutHandle = -1), A2(r)), Ne !== null))
    for (r = Ne.return; r !== null; ) {
      var n = r;
      switch ((gv(n), n.tag)) {
        case 1:
          (n = n.type.childContextTypes), n != null && Ys();
          break;
        case 3:
          co(), xe(jt), xe(ft), Ev();
          break;
        case 5:
          Av(n);
          break;
        case 4:
          co();
          break;
        case 13:
          xe(Pe);
          break;
        case 19:
          xe(Pe);
          break;
        case 10:
          Sv(n.type._context);
          break;
        case 22:
        case 23:
          Rv();
      }
      r = r.return;
    }
  if (
    ((Ke = e),
    (Ne = e = Pn(e.current, null)),
    (et = zt = t),
    (ze = 0),
    (Za = null),
    (Nv = Oc = di = 0),
    ($t = $a = null),
    Zn !== null)
  ) {
    for (t = 0; t < Zn.length; t++)
      if (((r = Zn[t]), (n = r.interleaved), n !== null)) {
        r.interleaved = null;
        var i = n.next,
          o = r.pending;
        if (o !== null) {
          var a = o.next;
          (o.next = i), (n.next = a);
        }
        r.pending = n;
      }
    Zn = null;
  }
  return e;
}
function _S(e, t) {
  do {
    var r = Ne;
    try {
      if ((xv(), (Ms.current = ol), il)) {
        for (var n = Ae.memoizedState; n !== null; ) {
          var i = n.queue;
          i !== null && (i.pending = null), (n = n.next);
        }
        il = !1;
      }
      if (
        ((pi = 0),
        (Ve = Be = Ae = null),
        (Ia = !1),
        (Xa = 0),
        (Mv.current = null),
        r === null || r.return === null)
      ) {
        (ze = 1), (Za = t), (Ne = null);
        break;
      }
      e: {
        var o = e,
          a = r.return,
          u = r,
          s = t;
        if (
          ((t = et),
          (u.flags |= 32768),
          s !== null && typeof s == "object" && typeof s.then == "function")
        ) {
          var l = s,
            f = u,
            c = f.tag;
          if (!(f.mode & 1) && (c === 0 || c === 11 || c === 15)) {
            var p = f.alternate;
            p
              ? ((f.updateQueue = p.updateQueue),
                (f.memoizedState = p.memoizedState),
                (f.lanes = p.lanes))
              : ((f.updateQueue = null), (f.memoizedState = null));
          }
          var d = tg(a);
          if (d !== null) {
            (d.flags &= -257),
              rg(d, a, u, o, t),
              d.mode & 1 && eg(o, l, t),
              (t = d),
              (s = l);
            var h = t.updateQueue;
            if (h === null) {
              var y = new Set();
              y.add(s), (t.updateQueue = y);
            } else h.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              eg(o, l, t), Fv();
              break e;
            }
            s = Error(B(426));
          }
        } else if (Oe && u.mode & 1) {
          var w = tg(a);
          if (w !== null) {
            !(w.flags & 65536) && (w.flags |= 256),
              rg(w, a, u, o, t),
              bv(fo(s, u));
            break e;
          }
        }
        (o = s = fo(s, u)),
          ze !== 4 && (ze = 2),
          $a === null ? ($a = [o]) : $a.push(o),
          (o = a);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var m = uS(o, s, t);
              Ky(o, m);
              break e;
            case 1:
              u = s;
              var v = o.type,
                g = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof v.getDerivedStateFromError == "function" ||
                  (g !== null &&
                    typeof g.componentDidCatch == "function" &&
                    (On === null || !On.has(g))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var S = sS(o, u, t);
                Ky(o, S);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      ES(r);
    } catch (b) {
      (t = b), Ne === r && r !== null && (Ne = r = r.return);
      continue;
    }
    break;
  } while (!0);
}
function PS() {
  var e = al.current;
  return (al.current = ol), e === null ? ol : e;
}
function Fv() {
  (ze === 0 || ze === 3 || ze === 2) && (ze = 4),
    Ke === null || (!(di & 268435455) && !(Oc & 268435455)) || dn(Ke, et);
}
function ll(e, t) {
  var r = ie;
  ie |= 2;
  var n = PS();
  (Ke !== e || et !== t) && ((Lr = null), ii(e, t));
  do
    try {
      Q2();
      break;
    } catch (i) {
      _S(e, i);
    }
  while (!0);
  if ((xv(), (ie = r), (al.current = n), Ne !== null)) throw Error(B(261));
  return (Ke = null), (et = 0), ze;
}
function Q2() {
  for (; Ne !== null; ) AS(Ne);
}
function Z2() {
  for (; Ne !== null && !OE(); ) AS(Ne);
}
function AS(e) {
  var t = TS(e.alternate, e, zt);
  (e.memoizedProps = e.pendingProps),
    t === null ? ES(e) : (Ne = t),
    (Mv.current = null);
}
function ES(e) {
  var t = e;
  do {
    var r = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((r = G2(r, t)), r !== null)) {
        (r.flags &= 32767), (Ne = r);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (ze = 6), (Ne = null);
        return;
      }
    } else if (((r = H2(r, t, zt)), r !== null)) {
      Ne = r;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      Ne = t;
      return;
    }
    Ne = t = e;
  } while (t !== null);
  ze === 0 && (ze = 5);
}
function Gn(e, t, r) {
  var n = le,
    i = nr.transition;
  try {
    (nr.transition = null), (le = 1), J2(e, t, r, n);
  } finally {
    (nr.transition = i), (le = n);
  }
  return null;
}
function J2(e, t, r, n) {
  do to();
  while (mn !== null);
  if (ie & 6) throw Error(B(327));
  r = e.finishedWork;
  var i = e.finishedLanes;
  if (r === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), r === e.current))
    throw Error(B(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = r.lanes | r.childLanes;
  if (
    (jE(e, o),
    e === Ke && ((Ne = Ke = null), (et = 0)),
    (!(r.subtreeFlags & 2064) && !(r.flags & 2064)) ||
      fs ||
      ((fs = !0),
      $S(Hs, function () {
        return to(), null;
      })),
    (o = (r.flags & 15990) !== 0),
    r.subtreeFlags & 15990 || o)
  ) {
    (o = nr.transition), (nr.transition = null);
    var a = le;
    le = 1;
    var u = ie;
    (ie |= 4),
      (Mv.current = null),
      q2(e, r),
      xS(r, e),
      b2(Qp),
      (Vs = !!Yp),
      (Qp = Yp = null),
      (e.current = r),
      K2(r),
      _E(),
      (ie = u),
      (le = a),
      (nr.transition = o);
  } else e.current = r;
  if (
    (fs && ((fs = !1), (mn = e), (sl = i)),
    (o = e.pendingLanes),
    o === 0 && (On = null),
    EE(r.stateNode),
    Nt(e, je()),
    t !== null)
  )
    for (n = e.onRecoverableError, r = 0; r < t.length; r++)
      (i = t[r]), n(i.value, { componentStack: i.stack, digest: i.digest });
  if (ul) throw ((ul = !1), (e = yd), (yd = null), e);
  return (
    sl & 1 && e.tag !== 0 && to(),
    (o = e.pendingLanes),
    o & 1 ? (e === gd ? Ca++ : ((Ca = 0), (gd = e))) : (Ca = 0),
    Mn(),
    null
  );
}
function to() {
  if (mn !== null) {
    var e = ux(sl),
      t = nr.transition,
      r = le;
    try {
      if (((nr.transition = null), (le = 16 > e ? 16 : e), mn === null))
        var n = !1;
      else {
        if (((e = mn), (mn = null), (sl = 0), ie & 6)) throw Error(B(331));
        var i = ie;
        for (ie |= 4, V = e.current; V !== null; ) {
          var o = V,
            a = o.child;
          if (V.flags & 16) {
            var u = o.deletions;
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var l = u[s];
                for (V = l; V !== null; ) {
                  var f = V;
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ta(8, f, o);
                  }
                  var c = f.child;
                  if (c !== null) (c.return = f), (V = c);
                  else
                    for (; V !== null; ) {
                      f = V;
                      var p = f.sibling,
                        d = f.return;
                      if ((gS(f), f === l)) {
                        V = null;
                        break;
                      }
                      if (p !== null) {
                        (p.return = d), (V = p);
                        break;
                      }
                      V = d;
                    }
                }
              }
              var h = o.alternate;
              if (h !== null) {
                var y = h.child;
                if (y !== null) {
                  h.child = null;
                  do {
                    var w = y.sibling;
                    (y.sibling = null), (y = w);
                  } while (y !== null);
                }
              }
              V = o;
            }
          }
          if (o.subtreeFlags & 2064 && a !== null) (a.return = o), (V = a);
          else
            e: for (; V !== null; ) {
              if (((o = V), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ta(9, o, o.return);
                }
              var m = o.sibling;
              if (m !== null) {
                (m.return = o.return), (V = m);
                break e;
              }
              V = o.return;
            }
        }
        var v = e.current;
        for (V = v; V !== null; ) {
          a = V;
          var g = a.child;
          if (a.subtreeFlags & 2064 && g !== null) (g.return = a), (V = g);
          else
            e: for (a = v; V !== null; ) {
              if (((u = V), u.flags & 2048))
                try {
                  switch (u.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Sc(9, u);
                  }
                } catch (b) {
                  Te(u, u.return, b);
                }
              if (u === a) {
                V = null;
                break e;
              }
              var S = u.sibling;
              if (S !== null) {
                (S.return = u.return), (V = S);
                break e;
              }
              V = u.return;
            }
        }
        if (
          ((ie = i), Mn(), Tr && typeof Tr.onPostCommitFiberRoot == "function")
        )
          try {
            Tr.onPostCommitFiberRoot(hc, e);
          } catch {}
        n = !0;
      }
      return n;
    } finally {
      (le = r), (nr.transition = t);
    }
  }
  return !1;
}
function vg(e, t, r) {
  (t = fo(r, t)),
    (t = uS(e, t, 1)),
    (e = Sn(e, t, 1)),
    (t = bt()),
    e !== null && (Du(e, 1, t), Nt(e, t));
}
function Te(e, t, r) {
  if (e.tag === 3) vg(e, e, r);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        vg(t, e, r);
        break;
      } else if (t.tag === 1) {
        var n = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof n.componentDidCatch == "function" &&
            (On === null || !On.has(n)))
        ) {
          (e = fo(r, e)),
            (e = sS(t, e, 1)),
            (t = Sn(t, e, 1)),
            (e = bt()),
            t !== null && (Du(t, 1, e), Nt(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function eI(e, t, r) {
  var n = e.pingCache;
  n !== null && n.delete(t),
    (t = bt()),
    (e.pingedLanes |= e.suspendedLanes & r),
    Ke === e &&
      (et & r) === r &&
      (ze === 4 || (ze === 3 && (et & 130023424) === et && 500 > je() - Dv)
        ? ii(e, 0)
        : (Nv |= r)),
    Nt(e, t);
}
function IS(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = ts), (ts <<= 1), !(ts & 130023424) && (ts = 4194304))
      : (t = 1));
  var r = bt();
  (e = Yr(e, t)), e !== null && (Du(e, t, r), Nt(e, r));
}
function tI(e) {
  var t = e.memoizedState,
    r = 0;
  t !== null && (r = t.retryLane), IS(e, r);
}
function rI(e, t) {
  var r = 0;
  switch (e.tag) {
    case 13:
      var n = e.stateNode,
        i = e.memoizedState;
      i !== null && (r = i.retryLane);
      break;
    case 19:
      n = e.stateNode;
      break;
    default:
      throw Error(B(314));
  }
  n !== null && n.delete(t), IS(e, r);
}
var TS;
TS = function (e, t, r) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || jt.current) Ct = !0;
    else {
      if (!(e.lanes & r) && !(t.flags & 128)) return (Ct = !1), W2(e, t, r);
      Ct = !!(e.flags & 131072);
    }
  else (Ct = !1), Oe && t.flags & 1048576 && jx(t, Js, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var n = t.type;
      Ds(e, t), (e = t.pendingProps);
      var i = uo(t, ft.current);
      eo(t, r), (i = Tv(null, t, n, e, i, r));
      var o = $v();
      return (
        (t.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Mt(n) ? ((o = !0), Qs(t)) : (o = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            _v(t),
            (i.updater = xc),
            (t.stateNode = i),
            (i._reactInternals = t),
            ad(t, n, e, r),
            (t = ld(null, t, n, !0, o, r)))
          : ((t.tag = 0), Oe && o && yv(t), yt(null, t, i, r), (t = t.child)),
        t
      );
    case 16:
      n = t.elementType;
      e: {
        switch (
          (Ds(e, t),
          (e = t.pendingProps),
          (i = n._init),
          (n = i(n._payload)),
          (t.type = n),
          (i = t.tag = iI(n)),
          (e = pr(n, e)),
          i)
        ) {
          case 0:
            t = sd(null, t, n, e, r);
            break e;
          case 1:
            t = og(null, t, n, e, r);
            break e;
          case 11:
            t = ng(null, t, n, e, r);
            break e;
          case 14:
            t = ig(null, t, n, pr(n.type, e), r);
            break e;
        }
        throw Error(B(306, n, ""));
      }
      return t;
    case 0:
      return (
        (n = t.type),
        (i = t.pendingProps),
        (i = t.elementType === n ? i : pr(n, i)),
        sd(e, t, n, i, r)
      );
    case 1:
      return (
        (n = t.type),
        (i = t.pendingProps),
        (i = t.elementType === n ? i : pr(n, i)),
        og(e, t, n, i, r)
      );
    case 3:
      e: {
        if ((pS(t), e === null)) throw Error(B(387));
        (n = t.pendingProps),
          (o = t.memoizedState),
          (i = o.element),
          Fx(e, t),
          rl(t, n, null, r);
        var a = t.memoizedState;
        if (((n = a.element), o.isDehydrated))
          if (
            ((o = {
              element: n,
              isDehydrated: !1,
              cache: a.cache,
              pendingSuspenseBoundaries: a.pendingSuspenseBoundaries,
              transitions: a.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (i = fo(Error(B(423)), t)), (t = ag(e, t, n, r, i));
            break e;
          } else if (n !== i) {
            (i = fo(Error(B(424)), t)), (t = ag(e, t, n, r, i));
            break e;
          } else
            for (
              Ht = xn(t.stateNode.containerInfo.firstChild),
                Gt = t,
                Oe = !0,
                vr = null,
                r = Lx(t, null, n, r),
                t.child = r;
              r;

            )
              (r.flags = (r.flags & -3) | 4096), (r = r.sibling);
        else {
          if ((so(), n === i)) {
            t = Qr(e, t, r);
            break e;
          }
          yt(e, t, n, r);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Bx(t),
        e === null && nd(t),
        (n = t.type),
        (i = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (a = i.children),
        Zp(n, i) ? (a = null) : o !== null && Zp(n, o) && (t.flags |= 32),
        fS(e, t),
        yt(e, t, a, r),
        t.child
      );
    case 6:
      return e === null && nd(t), null;
    case 13:
      return dS(e, t, r);
    case 4:
      return (
        Pv(t, t.stateNode.containerInfo),
        (n = t.pendingProps),
        e === null ? (t.child = lo(t, null, n, r)) : yt(e, t, n, r),
        t.child
      );
    case 11:
      return (
        (n = t.type),
        (i = t.pendingProps),
        (i = t.elementType === n ? i : pr(n, i)),
        ng(e, t, n, i, r)
      );
    case 7:
      return yt(e, t, t.pendingProps, r), t.child;
    case 8:
      return yt(e, t, t.pendingProps.children, r), t.child;
    case 12:
      return yt(e, t, t.pendingProps.children, r), t.child;
    case 10:
      e: {
        if (
          ((n = t.type._context),
          (i = t.pendingProps),
          (o = t.memoizedProps),
          (a = i.value),
          ye(el, n._currentValue),
          (n._currentValue = a),
          o !== null)
        )
          if (xr(o.value, a)) {
            if (o.children === i.children && !jt.current) {
              t = Qr(e, t, r);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var u = o.dependencies;
              if (u !== null) {
                a = o.child;
                for (var s = u.firstContext; s !== null; ) {
                  if (s.context === n) {
                    if (o.tag === 1) {
                      (s = Hr(-1, r & -r)), (s.tag = 2);
                      var l = o.updateQueue;
                      if (l !== null) {
                        l = l.shared;
                        var f = l.pending;
                        f === null
                          ? (s.next = s)
                          : ((s.next = f.next), (f.next = s)),
                          (l.pending = s);
                      }
                    }
                    (o.lanes |= r),
                      (s = o.alternate),
                      s !== null && (s.lanes |= r),
                      id(o.return, r, t),
                      (u.lanes |= r);
                    break;
                  }
                  s = s.next;
                }
              } else if (o.tag === 10) a = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((a = o.return), a === null)) throw Error(B(341));
                (a.lanes |= r),
                  (u = a.alternate),
                  u !== null && (u.lanes |= r),
                  id(a, r, t),
                  (a = o.sibling);
              } else a = o.child;
              if (a !== null) a.return = o;
              else
                for (a = o; a !== null; ) {
                  if (a === t) {
                    a = null;
                    break;
                  }
                  if (((o = a.sibling), o !== null)) {
                    (o.return = a.return), (a = o);
                    break;
                  }
                  a = a.return;
                }
              o = a;
            }
        yt(e, t, i.children, r), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (n = t.pendingProps.children),
        eo(t, r),
        (i = or(i)),
        (n = n(i)),
        (t.flags |= 1),
        yt(e, t, n, r),
        t.child
      );
    case 14:
      return (
        (n = t.type),
        (i = pr(n, t.pendingProps)),
        (i = pr(n.type, i)),
        ig(e, t, n, i, r)
      );
    case 15:
      return lS(e, t, t.type, t.pendingProps, r);
    case 17:
      return (
        (n = t.type),
        (i = t.pendingProps),
        (i = t.elementType === n ? i : pr(n, i)),
        Ds(e, t),
        (t.tag = 1),
        Mt(n) ? ((e = !0), Qs(t)) : (e = !1),
        eo(t, r),
        aS(t, n, i),
        ad(t, n, i, r),
        ld(null, t, n, !0, e, r)
      );
    case 19:
      return hS(e, t, r);
    case 22:
      return cS(e, t, r);
  }
  throw Error(B(156, t.tag));
};
function $S(e, t) {
  return nx(e, t);
}
function nI(e, t, r, n) {
  (this.tag = e),
    (this.key = r),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = n),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function tr(e, t, r, n) {
  return new nI(e, t, r, n);
}
function Bv(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function iI(e) {
  if (typeof e == "function") return Bv(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === ov)) return 11;
    if (e === av) return 14;
  }
  return 2;
}
function Pn(e, t) {
  var r = e.alternate;
  return (
    r === null
      ? ((r = tr(e.tag, t, e.key, e.mode)),
        (r.elementType = e.elementType),
        (r.type = e.type),
        (r.stateNode = e.stateNode),
        (r.alternate = e),
        (e.alternate = r))
      : ((r.pendingProps = t),
        (r.type = e.type),
        (r.flags = 0),
        (r.subtreeFlags = 0),
        (r.deletions = null)),
    (r.flags = e.flags & 14680064),
    (r.childLanes = e.childLanes),
    (r.lanes = e.lanes),
    (r.child = e.child),
    (r.memoizedProps = e.memoizedProps),
    (r.memoizedState = e.memoizedState),
    (r.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (r.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (r.sibling = e.sibling),
    (r.index = e.index),
    (r.ref = e.ref),
    r
  );
}
function Fs(e, t, r, n, i, o) {
  var a = 2;
  if (((n = e), typeof e == "function")) Bv(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else
    e: switch (e) {
      case Di:
        return oi(r.children, i, o, t);
      case iv:
        (a = 8), (i |= 8);
        break;
      case $p:
        return (
          (e = tr(12, r, t, i | 2)), (e.elementType = $p), (e.lanes = o), e
        );
      case Cp:
        return (e = tr(13, r, t, i)), (e.elementType = Cp), (e.lanes = o), e;
      case kp:
        return (e = tr(19, r, t, i)), (e.elementType = kp), (e.lanes = o), e;
      case Bw:
        return _c(r, i, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Rw:
              a = 10;
              break e;
            case Fw:
              a = 9;
              break e;
            case ov:
              a = 11;
              break e;
            case av:
              a = 14;
              break e;
            case ln:
              (a = 16), (n = null);
              break e;
          }
        throw Error(B(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = tr(a, r, t, i)), (t.elementType = e), (t.type = n), (t.lanes = o), t
  );
}
function oi(e, t, r, n) {
  return (e = tr(7, e, n, t)), (e.lanes = r), e;
}
function _c(e, t, r, n) {
  return (
    (e = tr(22, e, n, t)),
    (e.elementType = Bw),
    (e.lanes = r),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Xf(e, t, r) {
  return (e = tr(6, e, null, t)), (e.lanes = r), e;
}
function Yf(e, t, r) {
  return (
    (t = tr(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = r),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function oI(e, t, r, n, i) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = $f(0)),
    (this.expirationTimes = $f(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = $f(0)),
    (this.identifierPrefix = n),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function zv(e, t, r, n, i, o, a, u, s) {
  return (
    (e = new oI(e, t, r, u, s)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = tr(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: n,
      isDehydrated: r,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    _v(o),
    e
  );
}
function aI(e, t, r) {
  var n = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Ni,
    key: n == null ? null : "" + n,
    children: e,
    containerInfo: t,
    implementation: r,
  };
}
function CS(e) {
  if (!e) return $n;
  e = e._reactInternals;
  e: {
    if (wi(e) !== e || e.tag !== 1) throw Error(B(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Mt(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(B(171));
  }
  if (e.tag === 1) {
    var r = e.type;
    if (Mt(r)) return Cx(e, r, t);
  }
  return t;
}
function kS(e, t, r, n, i, o, a, u, s) {
  return (
    (e = zv(r, n, !0, e, i, o, a, u, s)),
    (e.context = CS(null)),
    (r = e.current),
    (n = bt()),
    (i = _n(r)),
    (o = Hr(n, i)),
    (o.callback = t ?? null),
    Sn(r, o, i),
    (e.current.lanes = i),
    Du(e, i, n),
    Nt(e, n),
    e
  );
}
function Pc(e, t, r, n) {
  var i = t.current,
    o = bt(),
    a = _n(i);
  return (
    (r = CS(r)),
    t.context === null ? (t.context = r) : (t.pendingContext = r),
    (t = Hr(o, a)),
    (t.payload = { element: e }),
    (n = n === void 0 ? null : n),
    n !== null && (t.callback = n),
    (e = Sn(i, t, a)),
    e !== null && (br(e, i, a, o), js(e, i, a)),
    a
  );
}
function cl(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function mg(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var r = e.retryLane;
    e.retryLane = r !== 0 && r < t ? r : t;
  }
}
function Uv(e, t) {
  mg(e, t), (e = e.alternate) && mg(e, t);
}
function uI() {
  return null;
}
var jS =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Wv(e) {
  this._internalRoot = e;
}
Ac.prototype.render = Wv.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(B(409));
  Pc(e, t, null, null);
};
Ac.prototype.unmount = Wv.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    hi(function () {
      Pc(null, e, null, null);
    }),
      (t[Xr] = null);
  }
};
function Ac(e) {
  this._internalRoot = e;
}
Ac.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = cx();
    e = { blockedOn: null, target: e, priority: t };
    for (var r = 0; r < pn.length && t !== 0 && t < pn[r].priority; r++);
    pn.splice(r, 0, e), r === 0 && px(e);
  }
};
function Hv(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Ec(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function yg() {}
function sI(e, t, r, n, i) {
  if (i) {
    if (typeof n == "function") {
      var o = n;
      n = function () {
        var l = cl(a);
        o.call(l);
      };
    }
    var a = kS(t, n, e, 0, null, !1, !1, "", yg);
    return (
      (e._reactRootContainer = a),
      (e[Xr] = a.current),
      Ha(e.nodeType === 8 ? e.parentNode : e),
      hi(),
      a
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof n == "function") {
    var u = n;
    n = function () {
      var l = cl(s);
      u.call(l);
    };
  }
  var s = zv(e, 0, !1, null, null, !1, !1, "", yg);
  return (
    (e._reactRootContainer = s),
    (e[Xr] = s.current),
    Ha(e.nodeType === 8 ? e.parentNode : e),
    hi(function () {
      Pc(t, s, r, n);
    }),
    s
  );
}
function Ic(e, t, r, n, i) {
  var o = r._reactRootContainer;
  if (o) {
    var a = o;
    if (typeof i == "function") {
      var u = i;
      i = function () {
        var s = cl(a);
        u.call(s);
      };
    }
    Pc(t, a, e, i);
  } else a = sI(r, t, e, i, n);
  return cl(a);
}
sx = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var r = ga(t.pendingLanes);
        r !== 0 &&
          (lv(t, r | 1), Nt(t, je()), !(ie & 6) && ((po = je() + 500), Mn()));
      }
      break;
    case 13:
      hi(function () {
        var n = Yr(e, 1);
        if (n !== null) {
          var i = bt();
          br(n, e, 1, i);
        }
      }),
        Uv(e, 1);
  }
};
cv = function (e) {
  if (e.tag === 13) {
    var t = Yr(e, 134217728);
    if (t !== null) {
      var r = bt();
      br(t, e, 134217728, r);
    }
    Uv(e, 134217728);
  }
};
lx = function (e) {
  if (e.tag === 13) {
    var t = _n(e),
      r = Yr(e, t);
    if (r !== null) {
      var n = bt();
      br(r, e, t, n);
    }
    Uv(e, t);
  }
};
cx = function () {
  return le;
};
fx = function (e, t) {
  var r = le;
  try {
    return (le = e), t();
  } finally {
    le = r;
  }
};
Up = function (e, t, r) {
  switch (t) {
    case "input":
      if ((Np(e, r), (t = r.name), r.type === "radio" && t != null)) {
        for (r = e; r.parentNode; ) r = r.parentNode;
        for (
          r = r.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < r.length;
          t++
        ) {
          var n = r[t];
          if (n !== e && n.form === e.form) {
            var i = gc(n);
            if (!i) throw Error(B(90));
            Uw(n), Np(n, i);
          }
        }
      }
      break;
    case "textarea":
      Hw(e, r);
      break;
    case "select":
      (t = r.value), t != null && Yi(e, !!r.multiple, t, !1);
  }
};
Qw = Lv;
Zw = hi;
var lI = { usingClientEntryPoint: !1, Events: [Ru, Bi, gc, Xw, Yw, Lv] },
  oa = {
    findFiberByHostInstance: Qn,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  cI = {
    bundleType: oa.bundleType,
    version: oa.version,
    rendererPackageName: oa.rendererPackageName,
    rendererConfig: oa.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: tn.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = tx(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: oa.findFiberByHostInstance || uI,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var ps = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ps.isDisabled && ps.supportsFiber)
    try {
      (hc = ps.inject(cI)), (Tr = ps);
    } catch {}
}
qt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = lI;
qt.createPortal = function (e, t) {
  var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Hv(t)) throw Error(B(200));
  return aI(e, t, null, r);
};
qt.createRoot = function (e, t) {
  if (!Hv(e)) throw Error(B(299));
  var r = !1,
    n = "",
    i = jS;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (r = !0),
      t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = zv(e, 1, !1, null, null, r, !1, n, i)),
    (e[Xr] = t.current),
    Ha(e.nodeType === 8 ? e.parentNode : e),
    new Wv(t)
  );
};
qt.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(B(188))
      : ((e = Object.keys(e).join(",")), Error(B(268, e)));
  return (e = tx(t)), (e = e === null ? null : e.stateNode), e;
};
qt.flushSync = function (e) {
  return hi(e);
};
qt.hydrate = function (e, t, r) {
  if (!Ec(t)) throw Error(B(200));
  return Ic(null, e, t, !0, r);
};
qt.hydrateRoot = function (e, t, r) {
  if (!Hv(e)) throw Error(B(405));
  var n = (r != null && r.hydratedSources) || null,
    i = !1,
    o = "",
    a = jS;
  if (
    (r != null &&
      (r.unstable_strictMode === !0 && (i = !0),
      r.identifierPrefix !== void 0 && (o = r.identifierPrefix),
      r.onRecoverableError !== void 0 && (a = r.onRecoverableError)),
    (t = kS(t, null, e, 1, r ?? null, i, !1, o, a)),
    (e[Xr] = t.current),
    Ha(e),
    n)
  )
    for (e = 0; e < n.length; e++)
      (r = n[e]),
        (i = r._getVersion),
        (i = i(r._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [r, i])
          : t.mutableSourceEagerHydrationData.push(r, i);
  return new Ac(t);
};
qt.render = function (e, t, r) {
  if (!Ec(t)) throw Error(B(200));
  return Ic(null, e, t, !1, r);
};
qt.unmountComponentAtNode = function (e) {
  if (!Ec(e)) throw Error(B(40));
  return e._reactRootContainer
    ? (hi(function () {
        Ic(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[Xr] = null);
        });
      }),
      !0)
    : !1;
};
qt.unstable_batchedUpdates = Lv;
qt.unstable_renderSubtreeIntoContainer = function (e, t, r, n) {
  if (!Ec(r)) throw Error(B(200));
  if (e == null || e._reactInternals === void 0) throw Error(B(38));
  return Ic(e, t, r, !1, n);
};
qt.version = "18.3.1-next-f1338f8080-20240426";
function MS() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(MS);
    } catch (e) {
      console.error(e);
    }
}
MS(), (Mw.exports = qt);
var fI = Mw.exports,
  NS,
  gg = fI;
(NS = gg.createRoot), gg.hydrateRoot;
var DS = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/ (function (e) {
  (function () {
    var t = {}.hasOwnProperty;
    function r() {
      for (var o = "", a = 0; a < arguments.length; a++) {
        var u = arguments[a];
        u && (o = i(o, n(u)));
      }
      return o;
    }
    function n(o) {
      if (typeof o == "string" || typeof o == "number") return o;
      if (typeof o != "object") return "";
      if (Array.isArray(o)) return r.apply(null, o);
      if (
        o.toString !== Object.prototype.toString &&
        !o.toString.toString().includes("[native code]")
      )
        return o.toString();
      var a = "";
      for (var u in o) t.call(o, u) && o[u] && (a = i(a, u));
      return a;
    }
    function i(o, a) {
      return a ? (o ? o + " " + a : o + a) : o;
    }
    e.exports ? ((r.default = r), (e.exports = r)) : (window.classNames = r);
  })();
})(DS);
var pI = DS.exports;
const dI = he(pI);
function Ot(e) {
  const t = e || "";
  return function () {
    throw new Error(
      "this method " +
        t +
        " is abstract! (it has no implementation in class " +
        this.constructor.name +
        ")"
    );
  };
}
function Nn(e, t) {
  if (!e) throw new Error(t || "Assertion failed");
}
function xd(e, t, r) {
  let n;
  Object.defineProperty(e, t, {
    get() {
      return n || (n = r.call(this)), n;
    },
  });
}
function hI(e) {
  return e && Object.assign({}, e);
}
function LS(e, t) {
  const r = [];
  for (; t-- > 0; ) r.push(e());
  return r;
}
function RS(e, t) {
  return new Array(t + 1).join(e);
}
function Tc(e, t) {
  return LS(() => e, t);
}
function Sd(e) {
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    e.lastIndexOf(n) !== r && t.indexOf(n) < 0 && t.push(n);
  }
  return t;
}
function FS(e) {
  const t = [];
  return (
    e.forEach((r) => {
      t.indexOf(r) < 0 && t.push(r);
    }),
    t
  );
}
function ai(e) {
  const t = e[0];
  return t === t.toUpperCase();
}
function BS(e) {
  return !ai(e);
}
function zS(e, t, r) {
  const n = r || " ";
  return e.length < t ? RS(n, t - e.length) + e : e;
}
function xi() {
  this.strings = [];
}
xi.prototype.append = function (e) {
  this.strings.push(e);
};
xi.prototype.contents = function () {
  return this.strings.join("");
};
const Qf = (e) => String.fromCodePoint(parseInt(e, 16));
function US(e) {
  if (e.charAt(0) === "\\")
    switch (e.charAt(1)) {
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
        return Qf(e.slice(2, 4));
      case "u":
        return e.charAt(2) === "{" ? Qf(e.slice(3, -1)) : Qf(e.slice(2, 6));
      default:
        return e.charAt(1);
    }
  else return e;
}
function Gv(e) {
  if (e == null) return String(e);
  const t = Object.prototype.toString.call(e);
  try {
    let r;
    return (
      e.constructor && e.constructor.name
        ? (r = e.constructor.name)
        : t.indexOf("[object ") === 0
          ? (r = t.slice(8, -1))
          : (r = typeof e),
      r + ": " + JSON.stringify(String(e))
    );
  } catch {
    return t;
  }
}
const vI = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        StringBuffer: xi,
        abstract: Ot,
        assert: Nn,
        clone: hI,
        copyWithoutDuplicates: FS,
        defineLazyProperty: xd,
        getDuplicates: Sd,
        isLexical: BS,
        isSyntactic: ai,
        padLeft: zS,
        repeat: Tc,
        repeatFn: LS,
        repeatStr: RS,
        unescapeCodePoint: US,
        unexpectedObjToString: Gv,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  mI = {
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
class Y {
  constructor() {
    if (this.constructor === Y)
      throw new Error("PExpr cannot be instantiated -- it's abstract");
  }
  withSource(t) {
    return t && (this.source = t.trimmed()), this;
  }
}
const pt = Object.create(Y.prototype),
  dt = Object.create(Y.prototype);
class nt extends Y {
  constructor(t) {
    super(), (this.obj = t);
  }
}
class ht extends Y {
  constructor(t, r) {
    super(),
      (this.from = t),
      (this.to = r),
      (this.matchCodePoint = t.length > 1 || r.length > 1);
  }
}
class vt extends Y {
  constructor(t) {
    super(), (this.index = t);
  }
}
class We extends Y {
  constructor(t) {
    super(), (this.terms = t);
  }
}
class $c extends We {
  constructor(t, r, n) {
    const i = t.rules[r].body;
    super([n, i]), (this.superGrammar = t), (this.name = r), (this.body = n);
  }
}
class Cc extends We {
  constructor(t, r, n, i) {
    const o = t.rules[r].body;
    super([...n, o, ...i]),
      (this.superGrammar = t),
      (this.ruleName = r),
      (this.expansionPos = n.length);
  }
}
class Xe extends Y {
  constructor(t) {
    super(), (this.factors = t);
  }
}
class _t extends Y {
  constructor(t) {
    super(), (this.expr = t);
  }
}
class Si extends _t {}
class Ro extends _t {}
class rn extends _t {}
Si.prototype.operator = "*";
Ro.prototype.operator = "+";
rn.prototype.operator = "?";
Si.prototype.minNumMatches = 0;
Ro.prototype.minNumMatches = 1;
rn.prototype.minNumMatches = 0;
Si.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
Ro.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
rn.prototype.maxNumMatches = 1;
class Pt extends Y {
  constructor(t) {
    super(), (this.expr = t);
  }
}
class At extends Y {
  constructor(t) {
    super(), (this.expr = t);
  }
}
class Lt extends Y {
  constructor(t) {
    super(), (this.expr = t);
  }
}
class ce extends Y {
  constructor(t, r = []) {
    super(), (this.ruleName = t), (this.args = r);
  }
  isSyntactic() {
    return ai(this.ruleName);
  }
  toMemoKey() {
    return (
      this._memoKey ||
        Object.defineProperty(this, "_memoKey", { value: this.toString() }),
      this._memoKey
    );
  }
}
class tt extends Y {
  constructor(t) {
    super(), (this.category = t), (this.pattern = mI[t]);
  }
}
function Ce(e, t) {
  let r;
  return (
    t
      ? ((r = new Error(t.getLineAndColumnMessage() + e)),
        (r.shortMessage = e),
        (r.interval = t))
      : (r = new Error(e)),
    r
  );
}
function Od() {
  return Ce("Interval sources don't match");
}
function yI(e) {
  const t = new Error();
  return (
    Object.defineProperty(t, "message", {
      enumerable: !0,
      get() {
        return e.message;
      },
    }),
    Object.defineProperty(t, "shortMessage", {
      enumerable: !0,
      get() {
        return "Expected " + e.getExpectedText();
      },
    }),
    (t.interval = e.getInterval()),
    t
  );
}
function gI(e, t, r) {
  const n = t
    ? `Grammar ${e} is not declared in namespace '${t}'`
    : "Undeclared grammar " + e;
  return Ce(n, r);
}
function bI(e, t) {
  return Ce("Grammar " + e.name + " is already declared in this namespace");
}
function wI(e) {
  return Ce(`Grammar '${e.name}' does not support incremental parsing`);
}
function WS(e, t, r) {
  return Ce("Rule " + e + " is not declared in grammar " + t, r);
}
function xI(e, t, r) {
  return Ce(
    "Cannot override rule " + e + " because it is not declared in " + t,
    r
  );
}
function SI(e, t, r) {
  return Ce(
    "Cannot extend rule " + e + " because it is not declared in " + t,
    r
  );
}
function bg(e, t, r, n) {
  let i = "Duplicate declaration for rule '" + e + "' in grammar '" + t + "'";
  return t !== r && (i += " (originally declared in '" + r + "')"), Ce(i, n);
}
function HS(e, t, r, n) {
  return Ce(
    "Wrong number of parameters for rule " +
      e +
      " (expected " +
      t +
      ", got " +
      r +
      ")",
    n
  );
}
function OI(e, t, r, n) {
  return Ce(
    "Wrong number of arguments for rule " +
      e +
      " (expected " +
      t +
      ", got " +
      r +
      ")",
    n
  );
}
function wg(e, t, r) {
  return Ce("Duplicate parameter names in rule " + e + ": " + t.join(", "), r);
}
function _I(e, t) {
  return Ce(
    "Invalid parameter to rule " +
      e +
      ": " +
      t +
      " has arity " +
      t.getArity() +
      ", but parameter expressions must have arity 1",
    t.source
  );
}
const PI =
  "NOTE: A _syntactic rule_ is a rule whose name begins with a capital letter. See https://ohmjs.org/d/svl for more details.";
function AI(e, t) {
  return Ce(
    "Cannot apply syntactic rule " +
      e +
      " from here (inside a lexical context)",
    t.source
  );
}
function EI(e) {
  const { ruleName: t } = e;
  return Ce(
    `applySyntactic is for syntactic rules, but '${t}' is a lexical rule. ` +
      PI,
    e.source
  );
}
function II(e) {
  return Ce(
    "applySyntactic is not required here (in a syntactic context)",
    e.source
  );
}
function xg(e, t) {
  return Ce("Incorrect argument type: expected " + e, t.source);
}
function TI(e) {
  return Ce("'...' can appear at most once in a rule body", e.source);
}
function $I(e) {
  const t = e._node;
  Nn(t && t.isNonterminal() && t.ctorName === "escapeChar_unicodeCodePoint");
  const r = e.children.slice(1, -1).map((i) => i.source),
    n = r[0].coverageWith(...r.slice(1));
  return Ce(`U+${n.contents} is not a valid Unicode code point`, n);
}
function GS(e, t) {
  const r = t.length > 0 ? t[t.length - 1].args : [];
  let i =
    "Nullable expression " +
    e.expr.substituteParams(r) +
    " is not allowed inside '" +
    e.operator +
    "' (possible infinite loop)";
  if (t.length > 0) {
    const o = t.map((a) => new ce(a.ruleName, a.args)).join(`
`);
    i +=
      `
Application stack (most recent application last):
` + o;
  }
  return Ce(i, e.expr.source);
}
function VS(e, t, r, n) {
  return Ce(
    "Rule " +
      e +
      " involves an alternation which has inconsistent arity (expected " +
      t +
      ", got " +
      r +
      ")",
    n.source
  );
}
function CI(e) {
  const t = e.map((r) => r.message);
  return Ce(
    ["Errors:"].concat(t).join(`
- `),
    e[0].interval
  );
}
function kI(e, t, r, n) {
  let i = n.slice(0, -1).map((s) => {
    const l = "  " + s[0].name + " > " + s[1];
    return s.length === 3 ? l + " for '" + s[2] + "'" : l;
  }).join(`
`);
  i +=
    `
  ` +
    t +
    " > " +
    e;
  let o = "";
  e === "_iter" &&
    (o = [
      `
NOTE: as of Ohm v16, there is no default action for iteration nodes — see `,
      "  https://ohmjs.org/d/dsa for details.",
    ].join(`
`));
  const a = [
      `Missing semantic action for '${e}' in ${r} '${t}'.${o}`,
      "Action stack (most recent call last):",
      i,
    ].join(`
`),
    u = Ce(a);
  return (u.name = "missingSemanticAction"), u;
}
function jI(e) {
  if (e.length === 1) throw e[0];
  if (e.length > 1) throw CI(e);
}
function MI(e) {
  let t = 0;
  return e
    .map((n) => {
      const i = n.toString();
      return (t = Math.max(t, i.length)), i;
    })
    .map((n) => zS(n, t));
}
function Sg(e, t, r) {
  const n = e.length,
    i = e.slice(0, r),
    o = e.slice(r + t.length);
  return (i + t + o).substr(0, n);
}
function NI(...e) {
  const t = this,
    { offset: r } = t,
    { repeatStr: n } = vI,
    i = new xi();
  i.append(
    "Line " +
      t.lineNum +
      ", col " +
      t.colNum +
      `:
`
  );
  const o = MI([
      t.prevLine == null ? 0 : t.lineNum - 1,
      t.lineNum,
      t.nextLine == null ? 0 : t.lineNum + 1,
    ]),
    a = (f, c, p) => {
      i.append(
        p +
          o[f] +
          " | " +
          c +
          `
`
      );
    };
  t.prevLine != null && a(0, t.prevLine, "  "), a(1, t.line, "> ");
  const u = t.line.length;
  let s = n(" ", u + 1);
  for (let f = 0; f < e.length; ++f) {
    let c = e[f][0],
      p = e[f][1];
    Nn(c >= 0 && c <= p, "range start must be >= 0 and <= end");
    const d = r - t.colNum + 1;
    (c = Math.max(0, c - d)),
      (p = Math.min(p - d, u)),
      (s = Sg(s, n("~", p - c), c));
  }
  const l = 2 + o[1].length + 3;
  return (
    i.append(n(" ", l)),
    (s = Sg(s, "^", t.colNum - 1)),
    i.append(
      s.replace(/ +$/, "") +
        `
`
    ),
    t.nextLine != null && a(2, t.nextLine, "  "),
    i.contents()
  );
}
let _d = [];
function qS(e) {
  _d.push(e);
}
function DI(e) {
  _d.forEach((t) => {
    t(e);
  }),
    (_d = null);
}
function Vv(e, t) {
  let r = 1,
    n = 1,
    i = 0,
    o = 0,
    a = null,
    u = null,
    s = -1;
  for (; i < t; ) {
    const c = e.charAt(i++);
    c ===
    `
`
      ? (r++, (n = 1), (s = o), (o = i))
      : c !== "\r" && n++;
  }
  let l = e.indexOf(
    `
`,
    o
  );
  if (l === -1) l = e.length;
  else {
    const c = e.indexOf(
      `
`,
      l + 1
    );
    (a = c === -1 ? e.slice(l) : e.slice(l, c)),
      (a = a.replace(/^\r?\n/, "").replace(/\r$/, ""));
  }
  s >= 0 && (u = e.slice(s, o).replace(/\r?\n$/, ""));
  const f = e.slice(o, l).replace(/\r$/, "");
  return {
    offset: t,
    lineNum: r,
    colNum: n,
    line: f,
    prevLine: u,
    nextLine: a,
    toString: NI,
  };
}
function qv(e, t, ...r) {
  return Vv(e, t).toString(...r);
}
const Og = (() => {
  let e = 0;
  return (t) => "" + t + e++;
})();
class at {
  constructor(t, r, n) {
    (this.sourceString = t), (this.startIdx = r), (this.endIdx = n);
  }
  get contents() {
    return (
      this._contents === void 0 &&
        (this._contents = this.sourceString.slice(this.startIdx, this.endIdx)),
      this._contents
    );
  }
  get length() {
    return this.endIdx - this.startIdx;
  }
  coverageWith(...t) {
    return at.coverage(...t, this);
  }
  collapsedLeft() {
    return new at(this.sourceString, this.startIdx, this.startIdx);
  }
  collapsedRight() {
    return new at(this.sourceString, this.endIdx, this.endIdx);
  }
  getLineAndColumn() {
    return Vv(this.sourceString, this.startIdx);
  }
  getLineAndColumnMessage() {
    const t = [this.startIdx, this.endIdx];
    return qv(this.sourceString, this.startIdx, t);
  }
  minus(t) {
    if (this.sourceString !== t.sourceString) throw Od();
    return this.startIdx === t.startIdx && this.endIdx === t.endIdx
      ? []
      : this.startIdx < t.startIdx && t.endIdx < this.endIdx
        ? [
            new at(this.sourceString, this.startIdx, t.startIdx),
            new at(this.sourceString, t.endIdx, this.endIdx),
          ]
        : this.startIdx < t.endIdx && t.endIdx < this.endIdx
          ? [new at(this.sourceString, t.endIdx, this.endIdx)]
          : this.startIdx < t.startIdx && t.startIdx < this.endIdx
            ? [new at(this.sourceString, this.startIdx, t.startIdx)]
            : [this];
  }
  relativeTo(t) {
    if (this.sourceString !== t.sourceString) throw Od();
    return (
      Nn(
        this.startIdx >= t.startIdx && this.endIdx <= t.endIdx,
        "other interval does not cover this one"
      ),
      new at(
        this.sourceString,
        this.startIdx - t.startIdx,
        this.endIdx - t.startIdx
      )
    );
  }
  trimmed() {
    const { contents: t } = this,
      r = this.startIdx + t.match(/^\s*/)[0].length,
      n = this.endIdx - t.match(/\s*$/)[0].length;
    return new at(this.sourceString, r, n);
  }
  subInterval(t, r) {
    const n = this.startIdx + t;
    return new at(this.sourceString, n, n + r);
  }
}
at.coverage = function (e, ...t) {
  let { startIdx: r, endIdx: n } = e;
  for (const i of t) {
    if (i.sourceString !== e.sourceString) throw Od();
    (r = Math.min(r, i.startIdx)), (n = Math.max(n, i.endIdx));
  }
  return new at(e.sourceString, r, n);
};
const LI = 65535;
class kc {
  constructor(t) {
    (this.source = t), (this.pos = 0), (this.examinedLength = 0);
  }
  atEnd() {
    const t = this.pos >= this.source.length;
    return (
      (this.examinedLength = Math.max(this.examinedLength, this.pos + 1)), t
    );
  }
  next() {
    const t = this.source[this.pos++];
    return (this.examinedLength = Math.max(this.examinedLength, this.pos)), t;
  }
  nextCharCode() {
    const t = this.next();
    return t && t.charCodeAt(0);
  }
  nextCodePoint() {
    const t = this.source.slice(this.pos++).codePointAt(0);
    return (
      t > LI && (this.pos += 1),
      (this.examinedLength = Math.max(this.examinedLength, this.pos)),
      t
    );
  }
  matchString(t, r) {
    let n;
    if (r) {
      for (n = 0; n < t.length; n++) {
        const i = this.next(),
          o = t[n];
        if (i == null || i.toUpperCase() !== o.toUpperCase()) return !1;
      }
      return !0;
    }
    for (n = 0; n < t.length; n++) if (this.next() !== t[n]) return !1;
    return !0;
  }
  sourceSlice(t, r) {
    return this.source.slice(t, r);
  }
  interval(t, r) {
    return new at(this.source, t, r || this.pos);
  }
}
class KS {
  constructor(t, r, n, i, o, a, u) {
    (this.matcher = t),
      (this.input = r),
      (this.startExpr = n),
      (this._cst = i),
      (this._cstOffset = o),
      (this._rightmostFailurePosition = a),
      (this._rightmostFailures = u),
      this.failed() &&
        (xd(this, "message", function () {
          const s = "Expected " + this.getExpectedText();
          return qv(this.input, this.getRightmostFailurePosition()) + s;
        }),
        xd(this, "shortMessage", function () {
          const s = "expected " + this.getExpectedText(),
            l = Vv(this.input, this.getRightmostFailurePosition());
          return "Line " + l.lineNum + ", col " + l.colNum + ": " + s;
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
      const t = this.matcher._match(this.startExpr, {
        tracing: !1,
        positionToRecordFailures: this.getRightmostFailurePosition(),
      });
      this._rightmostFailures = t.getRightmostFailures();
    }
    return this._rightmostFailures;
  }
  toString() {
    return this.succeeded()
      ? "[match succeeded]"
      : "[match failed at position " + this.getRightmostFailurePosition() + "]";
  }
  getExpectedText() {
    if (this.succeeded())
      throw new Error("cannot get expected text of a successful MatchResult");
    const t = new xi();
    let r = this.getRightmostFailures();
    r = r.filter((n) => !n.isFluffy());
    for (let n = 0; n < r.length; n++)
      n > 0 &&
        (n === r.length - 1
          ? t.append(r.length > 2 ? ", or " : " or ")
          : t.append(", ")),
        t.append(r[n].toString());
    return t.contents();
  }
  getInterval() {
    const t = this.getRightmostFailurePosition();
    return new at(this.input, t, t);
  }
}
class RI {
  constructor() {
    (this.applicationMemoKeyStack = []),
      (this.memo = {}),
      (this.maxExaminedLength = 0),
      (this.maxRightmostFailureOffset = -1),
      (this.currentLeftRecursion = void 0);
  }
  isActive(t) {
    return this.applicationMemoKeyStack.indexOf(t.toMemoKey()) >= 0;
  }
  enter(t) {
    this.applicationMemoKeyStack.push(t.toMemoKey());
  }
  exit() {
    this.applicationMemoKeyStack.pop();
  }
  startLeftRecursion(t, r) {
    (r.isLeftRecursion = !0),
      (r.headApplication = t),
      (r.nextLeftRecursion = this.currentLeftRecursion),
      (this.currentLeftRecursion = r);
    const { applicationMemoKeyStack: n } = this,
      i = n.indexOf(t.toMemoKey()) + 1,
      o = n.slice(i);
    (r.isInvolved = function (a) {
      return o.indexOf(a) >= 0;
    }),
      (r.updateInvolvedApplicationMemoKeys = function () {
        for (let a = i; a < n.length; a++) {
          const u = n[a];
          this.isInvolved(u) || o.push(u);
        }
      });
  }
  endLeftRecursion() {
    this.currentLeftRecursion = this.currentLeftRecursion.nextLeftRecursion;
  }
  shouldUseMemoizedResult(t) {
    if (!t.isLeftRecursion) return !0;
    const { applicationMemoKeyStack: r } = this;
    for (let n = 0; n < r.length; n++) {
      const i = r[n];
      if (t.isInvolved(i)) return !1;
    }
    return !0;
  }
  memoize(t, r) {
    return (
      (this.memo[t] = r),
      (this.maxExaminedLength = Math.max(
        this.maxExaminedLength,
        r.examinedLength
      )),
      (this.maxRightmostFailureOffset = Math.max(
        this.maxRightmostFailureOffset,
        r.rightmostFailureOffset
      )),
      r
    );
  }
  clearObsoleteEntries(t, r) {
    if (t + this.maxExaminedLength <= r) return;
    const { memo: n } = this;
    (this.maxExaminedLength = 0),
      (this.maxRightmostFailureOffset = -1),
      Object.keys(n).forEach((i) => {
        const o = n[i];
        t + o.examinedLength > r
          ? delete n[i]
          : ((this.maxExaminedLength = Math.max(
              this.maxExaminedLength,
              o.examinedLength
            )),
            (this.maxRightmostFailureOffset = Math.max(
              this.maxRightmostFailureOffset,
              o.rightmostFailureOffset
            )));
      });
  }
}
const FI = "✗",
  BI = "✓",
  zI = "⋅",
  UI = "⇒",
  WI = "␉",
  HI = "␊",
  GI = "␍",
  Pd = {
    succeeded: 1,
    isRootNode: 2,
    isImplicitSpaces: 4,
    isMemoized: 8,
    isHeadOfLeftRecursion: 16,
    terminatesLR: 32,
  };
function VI(e) {
  return Tc(" ", e).join("");
}
function qI(e, t, r) {
  const n = XS(e.slice(t, t + r));
  return n.length < r ? n + Tc(" ", r - n.length).join("") : n;
}
function XS(e) {
  return typeof e == "string"
    ? e
        .replace(/ /g, zI)
        .replace(/\t/g, WI)
        .replace(/\n/g, HI)
        .replace(/\r/g, GI)
    : String(e);
}
class An {
  constructor(t, r, n, i, o, a, u) {
    (this.input = t),
      (this.pos = this.pos1 = r),
      (this.pos2 = n),
      (this.source = new at(t, r, n)),
      (this.expr = i),
      (this.bindings = a),
      (this.children = u || []),
      (this.terminatingLREntry = null),
      (this._flags = o ? Pd.succeeded : 0);
  }
  get displayString() {
    return this.expr.toDisplayString();
  }
  clone() {
    return this.cloneWithExpr(this.expr);
  }
  cloneWithExpr(t) {
    const r = new An(
      this.input,
      this.pos,
      this.pos2,
      t,
      this.succeeded,
      this.bindings,
      this.children
    );
    return (
      (r.isHeadOfLeftRecursion = this.isHeadOfLeftRecursion),
      (r.isImplicitSpaces = this.isImplicitSpaces),
      (r.isMemoized = this.isMemoized),
      (r.isRootNode = this.isRootNode),
      (r.terminatesLR = this.terminatesLR),
      (r.terminatingLREntry = this.terminatingLREntry),
      r
    );
  }
  recordLRTermination(t, r) {
    (this.terminatingLREntry = new An(
      this.input,
      this.pos,
      this.pos2,
      this.expr,
      !1,
      [r],
      [t]
    )),
      (this.terminatingLREntry.terminatesLR = !0);
  }
  walk(t, r) {
    let n = t;
    typeof n == "function" && (n = { enter: n });
    function i(o, a, u) {
      let s = !0;
      n.enter && n.enter.call(r, o, a, u) === An.prototype.SKIP && (s = !1),
        s &&
          (o.children.forEach((l) => {
            i(l, o, u + 1);
          }),
          n.exit && n.exit.call(r, o, a, u));
    }
    this.isRootNode
      ? this.children.forEach((o) => {
          i(o, null, 0);
        })
      : i(this, null, 0);
  }
  toString() {
    const t = new xi();
    return (
      this.walk((r, n, i) => {
        if (!r) return this.SKIP;
        if (r.expr.constructor.name !== "Alt") {
          if (
            (t.append(qI(r.input, r.pos, 10) + VI(i * 2 + 1)),
            t.append((r.succeeded ? BI : FI) + " " + r.displayString),
            r.isHeadOfLeftRecursion && t.append(" (LR)"),
            r.succeeded)
          ) {
            const a = XS(r.source.contents);
            t.append(" " + UI + "  "),
              t.append(typeof a == "string" ? '"' + a + '"' : a);
          }
          t.append(`
`);
        }
      }),
      t.contents()
    );
  }
}
An.prototype.SKIP = {};
Object.keys(Pd).forEach((e) => {
  const t = Pd[e];
  Object.defineProperty(An.prototype, e, {
    get() {
      return (this._flags & t) !== 0;
    },
    set(r) {
      r ? (this._flags |= t) : (this._flags &= ~t);
    },
  });
});
Y.prototype.allowsSkippingPrecedingSpace = Ot("allowsSkippingPrecedingSpace");
pt.allowsSkippingPrecedingSpace =
  dt.allowsSkippingPrecedingSpace =
  ce.prototype.allowsSkippingPrecedingSpace =
  nt.prototype.allowsSkippingPrecedingSpace =
  ht.prototype.allowsSkippingPrecedingSpace =
  tt.prototype.allowsSkippingPrecedingSpace =
    function () {
      return !0;
    };
We.prototype.allowsSkippingPrecedingSpace =
  _t.prototype.allowsSkippingPrecedingSpace =
  Lt.prototype.allowsSkippingPrecedingSpace =
  At.prototype.allowsSkippingPrecedingSpace =
  Pt.prototype.allowsSkippingPrecedingSpace =
  vt.prototype.allowsSkippingPrecedingSpace =
  Xe.prototype.allowsSkippingPrecedingSpace =
    function () {
      return !1;
    };
let wa;
qS((e) => {
  wa = e;
});
let fl;
Y.prototype.assertAllApplicationsAreValid = function (e, t) {
  (fl = 0), this._assertAllApplicationsAreValid(e, t);
};
Y.prototype._assertAllApplicationsAreValid = Ot(
  "_assertAllApplicationsAreValid"
);
pt._assertAllApplicationsAreValid =
  dt._assertAllApplicationsAreValid =
  nt.prototype._assertAllApplicationsAreValid =
  ht.prototype._assertAllApplicationsAreValid =
  vt.prototype._assertAllApplicationsAreValid =
  tt.prototype._assertAllApplicationsAreValid =
    function (e, t) {};
Lt.prototype._assertAllApplicationsAreValid = function (e, t) {
  fl++, this.expr._assertAllApplicationsAreValid(e, t), fl--;
};
We.prototype._assertAllApplicationsAreValid = function (e, t) {
  for (let r = 0; r < this.terms.length; r++)
    this.terms[r]._assertAllApplicationsAreValid(e, t);
};
Xe.prototype._assertAllApplicationsAreValid = function (e, t) {
  for (let r = 0; r < this.factors.length; r++)
    this.factors[r]._assertAllApplicationsAreValid(e, t);
};
_t.prototype._assertAllApplicationsAreValid =
  Pt.prototype._assertAllApplicationsAreValid =
  At.prototype._assertAllApplicationsAreValid =
    function (e, t) {
      this.expr._assertAllApplicationsAreValid(e, t);
    };
ce.prototype._assertAllApplicationsAreValid = function (e, t, r = !1) {
  const n = t.rules[this.ruleName],
    i = ai(e) && fl === 0;
  if (!n) throw WS(this.ruleName, t.name, this.source);
  if (!r && ai(this.ruleName) && !i) throw AI(this.ruleName, this);
  const o = this.args.length,
    a = n.formals.length;
  if (o !== a) throw OI(this.ruleName, a, o, this.source);
  const u = wa && n === wa.rules.applySyntactic;
  if (wa && n === wa.rules.caseInsensitive && !(this.args[0] instanceof nt))
    throw xg('a Terminal (e.g. "abc")', this.args[0]);
  if (u) {
    const l = this.args[0];
    if (!(l instanceof ce)) throw xg("a syntactic rule application", l);
    if (!ai(l.ruleName)) throw EI(l);
    if (i) throw II(this);
  }
  this.args.forEach((l) => {
    if ((l._assertAllApplicationsAreValid(e, t, u), l.getArity() !== 1))
      throw _I(this.ruleName, l);
  });
};
Y.prototype.assertChoicesHaveUniformArity = Ot("assertChoicesHaveUniformArity");
pt.assertChoicesHaveUniformArity =
  dt.assertChoicesHaveUniformArity =
  nt.prototype.assertChoicesHaveUniformArity =
  ht.prototype.assertChoicesHaveUniformArity =
  vt.prototype.assertChoicesHaveUniformArity =
  Lt.prototype.assertChoicesHaveUniformArity =
  tt.prototype.assertChoicesHaveUniformArity =
    function (e) {};
We.prototype.assertChoicesHaveUniformArity = function (e) {
  if (this.terms.length === 0) return;
  const t = this.terms[0].getArity();
  for (let r = 0; r < this.terms.length; r++) {
    const n = this.terms[r];
    n.assertChoicesHaveUniformArity();
    const i = n.getArity();
    if (t !== i) throw VS(e, t, i, n);
  }
};
$c.prototype.assertChoicesHaveUniformArity = function (e) {
  const t = this.terms[0].getArity(),
    r = this.terms[1].getArity();
  if (t !== r) throw VS(e, r, t, this.terms[0]);
};
Xe.prototype.assertChoicesHaveUniformArity = function (e) {
  for (let t = 0; t < this.factors.length; t++)
    this.factors[t].assertChoicesHaveUniformArity(e);
};
_t.prototype.assertChoicesHaveUniformArity = function (e) {
  this.expr.assertChoicesHaveUniformArity(e);
};
Pt.prototype.assertChoicesHaveUniformArity = function (e) {};
At.prototype.assertChoicesHaveUniformArity = function (e) {
  this.expr.assertChoicesHaveUniformArity(e);
};
ce.prototype.assertChoicesHaveUniformArity = function (e) {};
Y.prototype.assertIteratedExprsAreNotNullable = Ot(
  "assertIteratedExprsAreNotNullable"
);
pt.assertIteratedExprsAreNotNullable =
  dt.assertIteratedExprsAreNotNullable =
  nt.prototype.assertIteratedExprsAreNotNullable =
  ht.prototype.assertIteratedExprsAreNotNullable =
  vt.prototype.assertIteratedExprsAreNotNullable =
  tt.prototype.assertIteratedExprsAreNotNullable =
    function (e) {};
We.prototype.assertIteratedExprsAreNotNullable = function (e) {
  for (let t = 0; t < this.terms.length; t++)
    this.terms[t].assertIteratedExprsAreNotNullable(e);
};
Xe.prototype.assertIteratedExprsAreNotNullable = function (e) {
  for (let t = 0; t < this.factors.length; t++)
    this.factors[t].assertIteratedExprsAreNotNullable(e);
};
_t.prototype.assertIteratedExprsAreNotNullable = function (e) {
  if ((this.expr.assertIteratedExprsAreNotNullable(e), this.expr.isNullable(e)))
    throw GS(this, []);
};
rn.prototype.assertIteratedExprsAreNotNullable =
  Pt.prototype.assertIteratedExprsAreNotNullable =
  At.prototype.assertIteratedExprsAreNotNullable =
  Lt.prototype.assertIteratedExprsAreNotNullable =
    function (e) {
      this.expr.assertIteratedExprsAreNotNullable(e);
    };
ce.prototype.assertIteratedExprsAreNotNullable = function (e) {
  this.args.forEach((t) => {
    t.assertIteratedExprsAreNotNullable(e);
  });
};
class Kv {
  constructor(t) {
    this.matchLength = t;
  }
  get ctorName() {
    throw new Error("subclass responsibility");
  }
  numChildren() {
    return this.children ? this.children.length : 0;
  }
  childAt(t) {
    if (this.children) return this.children[t];
  }
  indexOfChild(t) {
    return this.children.indexOf(t);
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
  childBefore(t) {
    const r = this.indexOfChild(t);
    if (r < 0)
      throw new Error(
        "Node.childBefore() called w/ an argument that is not a child"
      );
    if (r === 0) throw new Error("cannot get child before first child");
    return this.childAt(r - 1);
  }
  childAfter(t) {
    const r = this.indexOfChild(t);
    if (r < 0)
      throw new Error(
        "Node.childAfter() called w/ an argument that is not a child"
      );
    if (r === this.numChildren() - 1)
      throw new Error("cannot get child after last child");
    return this.childAt(r + 1);
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
class Oi extends Kv {
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
class KI extends Kv {
  constructor(t, r, n, i) {
    super(i), (this.ruleName = t), (this.children = r), (this.childOffsets = n);
  }
  get ctorName() {
    return this.ruleName;
  }
  isNonterminal() {
    return !0;
  }
  isLexical() {
    return BS(this.ctorName);
  }
  isSyntactic() {
    return ai(this.ctorName);
  }
}
class YS extends Kv {
  constructor(t, r, n, i) {
    super(n), (this.children = t), (this.childOffsets = r), (this.optional = i);
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
Y.prototype.eval = Ot("eval");
pt.eval = function (e) {
  const { inputStream: t } = e,
    r = t.pos,
    n = t.nextCodePoint();
  return n !== void 0
    ? (e.pushBinding(new Oi(String.fromCodePoint(n).length), r), !0)
    : (e.processFailure(r, this), !1);
};
dt.eval = function (e) {
  const { inputStream: t } = e,
    r = t.pos;
  return t.atEnd()
    ? (e.pushBinding(new Oi(0), r), !0)
    : (e.processFailure(r, this), !1);
};
nt.prototype.eval = function (e) {
  const { inputStream: t } = e,
    r = t.pos;
  return t.matchString(this.obj)
    ? (e.pushBinding(new Oi(this.obj.length), r), !0)
    : (e.processFailure(r, this), !1);
};
ht.prototype.eval = function (e) {
  const { inputStream: t } = e,
    r = t.pos,
    n = this.matchCodePoint ? t.nextCodePoint() : t.nextCharCode();
  return n !== void 0 &&
    this.from.codePointAt(0) <= n &&
    n <= this.to.codePointAt(0)
    ? (e.pushBinding(new Oi(String.fromCodePoint(n).length), r), !0)
    : (e.processFailure(r, this), !1);
};
vt.prototype.eval = function (e) {
  return e.eval(e.currentApplication().args[this.index]);
};
Lt.prototype.eval = function (e) {
  e.enterLexifiedContext();
  const t = e.eval(this.expr);
  return e.exitLexifiedContext(), t;
};
We.prototype.eval = function (e) {
  for (let t = 0; t < this.terms.length; t++)
    if (e.eval(this.terms[t])) return !0;
  return !1;
};
Xe.prototype.eval = function (e) {
  for (let t = 0; t < this.factors.length; t++) {
    const r = this.factors[t];
    if (!e.eval(r)) return !1;
  }
  return !0;
};
_t.prototype.eval = function (e) {
  const { inputStream: t } = e,
    r = t.pos,
    n = this.getArity(),
    i = [],
    o = [];
  for (; i.length < n; ) i.push([]), o.push([]);
  let a = 0,
    u = r,
    s;
  for (; a < this.maxNumMatches && e.eval(this.expr); ) {
    if (t.pos === u) throw GS(this, e._applicationStack);
    (u = t.pos), a++;
    const p = e._bindings.splice(e._bindings.length - n, n),
      d = e._bindingOffsets.splice(e._bindingOffsets.length - n, n);
    for (s = 0; s < p.length; s++) i[s].push(p[s]), o[s].push(d[s]);
  }
  if (a < this.minNumMatches) return !1;
  let l = e.posToOffset(r),
    f = 0;
  if (a > 0) {
    const p = i[n - 1],
      d = o[n - 1],
      h = d[d.length - 1] + p[p.length - 1].matchLength;
    (l = o[0][0]), (f = h - l);
  }
  const c = this instanceof rn;
  for (s = 0; s < i.length; s++)
    e._bindings.push(new YS(i[s], o[s], f, c)), e._bindingOffsets.push(l);
  return !0;
};
Pt.prototype.eval = function (e) {
  const { inputStream: t } = e,
    r = t.pos;
  e.pushFailuresInfo();
  const n = e.eval(this.expr);
  return (
    e.popFailuresInfo(), n ? (e.processFailure(r, this), !1) : ((t.pos = r), !0)
  );
};
At.prototype.eval = function (e) {
  const { inputStream: t } = e,
    r = t.pos;
  return e.eval(this.expr) ? ((t.pos = r), !0) : !1;
};
ce.prototype.eval = function (e) {
  const t = e.currentApplication(),
    r = t ? t.args : [],
    n = this.substituteParams(r),
    i = e.getCurrentPosInfo();
  if (i.isActive(n)) return n.handleCycle(e);
  const o = n.toMemoKey(),
    a = i.memo[o];
  if (a && i.shouldUseMemoizedResult(a)) {
    if (e.hasNecessaryInfo(a)) return e.useMemoizedResult(e.inputStream.pos, a);
    delete i.memo[o];
  }
  return n.reallyEval(e);
};
ce.prototype.handleCycle = function (e) {
  const t = e.getCurrentPosInfo(),
    { currentLeftRecursion: r } = t,
    n = this.toMemoKey();
  let i = t.memo[n];
  return (
    r && r.headApplication.toMemoKey() === n
      ? i.updateInvolvedApplicationMemoKeys()
      : i ||
        ((i = t.memoize(n, {
          matchLength: 0,
          examinedLength: 0,
          value: !1,
          rightmostFailureOffset: -1,
        })),
        t.startLeftRecursion(this, i)),
    e.useMemoizedResult(e.inputStream.pos, i)
  );
};
ce.prototype.reallyEval = function (e) {
  const { inputStream: t } = e,
    r = t.pos,
    n = e.getCurrentPosInfo(),
    i = e.grammar.rules[this.ruleName],
    { body: o } = i,
    { description: a } = i;
  e.enterApplication(n, this), a && e.pushFailuresInfo();
  const u = t.examinedLength;
  t.examinedLength = 0;
  let s = this.evalOnce(o, e);
  const l = n.currentLeftRecursion,
    f = this.toMemoKey(),
    c = l && l.headApplication.toMemoKey() === f;
  let p;
  e.doNotMemoize
    ? (e.doNotMemoize = !1)
    : c
      ? ((s = this.growSeedResult(o, e, r, l, s)),
        n.endLeftRecursion(),
        (p = l),
        (p.examinedLength = t.examinedLength - r),
        (p.rightmostFailureOffset = e._getRightmostFailureOffset()),
        n.memoize(f, p))
      : (!l || !l.isInvolved(f)) &&
        (p = n.memoize(f, {
          matchLength: t.pos - r,
          examinedLength: t.examinedLength - r,
          value: s,
          failuresAtRightmostPosition: e.cloneRecordedFailures(),
          rightmostFailureOffset: e._getRightmostFailureOffset(),
        }));
  const d = !!s;
  if (
    (a &&
      (e.popFailuresInfo(),
      d || e.processFailure(r, this),
      p && (p.failuresAtRightmostPosition = e.cloneRecordedFailures())),
    e.isTracing() && p)
  ) {
    const h = e.getTraceEntry(r, this, d, d ? [s] : []);
    c &&
      (Nn(h.terminatingLREntry != null || !d), (h.isHeadOfLeftRecursion = !0)),
      (p.traceEntry = h);
  }
  return (
    (t.examinedLength = Math.max(t.examinedLength, u)),
    e.exitApplication(n, s),
    d
  );
};
ce.prototype.evalOnce = function (e, t) {
  const { inputStream: r } = t,
    n = r.pos;
  if (t.eval(e)) {
    const i = e.getArity(),
      o = t._bindings.splice(t._bindings.length - i, i),
      a = t._bindingOffsets.splice(t._bindingOffsets.length - i, i),
      u = r.pos - n;
    return new KI(this.ruleName, o, a, u);
  } else return !1;
};
ce.prototype.growSeedResult = function (e, t, r, n, i) {
  if (!i) return !1;
  const { inputStream: o } = t;
  for (;;) {
    if (
      ((n.matchLength = o.pos - r),
      (n.value = i),
      (n.failuresAtRightmostPosition = t.cloneRecordedFailures()),
      t.isTracing())
    ) {
      const a = t.trace[t.trace.length - 1];
      n.traceEntry = new An(t.input, r, o.pos, this, !0, [i], [a.clone()]);
    }
    if (((o.pos = r), (i = this.evalOnce(e, t)), o.pos - r <= n.matchLength))
      break;
    t.isTracing() && t.trace.splice(-2, 1);
  }
  return (
    t.isTracing() && n.traceEntry.recordLRTermination(t.trace.pop(), i),
    (o.pos = r + n.matchLength),
    n.value
  );
};
tt.prototype.eval = function (e) {
  const { inputStream: t } = e,
    r = t.pos,
    n = t.next();
  return n && this.pattern.test(n)
    ? (e.pushBinding(new Oi(n.length), r), !0)
    : (e.processFailure(r, this), !1);
};
Y.prototype.getArity = Ot("getArity");
pt.getArity =
  dt.getArity =
  nt.prototype.getArity =
  ht.prototype.getArity =
  vt.prototype.getArity =
  ce.prototype.getArity =
  tt.prototype.getArity =
    function () {
      return 1;
    };
We.prototype.getArity = function () {
  return this.terms.length === 0 ? 0 : this.terms[0].getArity();
};
Xe.prototype.getArity = function () {
  let e = 0;
  for (let t = 0; t < this.factors.length; t++) e += this.factors[t].getArity();
  return e;
};
_t.prototype.getArity = function () {
  return this.expr.getArity();
};
Pt.prototype.getArity = function () {
  return 0;
};
At.prototype.getArity = Lt.prototype.getArity = function () {
  return this.expr.getArity();
};
function Sr(e, t) {
  const r = {};
  if (e.source && t) {
    const n = e.source.relativeTo(t);
    r.sourceInterval = [n.startIdx, n.endIdx];
  }
  return r;
}
Y.prototype.outputRecipe = Ot("outputRecipe");
pt.outputRecipe = function (e, t) {
  return ["any", Sr(this, t)];
};
dt.outputRecipe = function (e, t) {
  return ["end", Sr(this, t)];
};
nt.prototype.outputRecipe = function (e, t) {
  return ["terminal", Sr(this, t), this.obj];
};
ht.prototype.outputRecipe = function (e, t) {
  return ["range", Sr(this, t), this.from, this.to];
};
vt.prototype.outputRecipe = function (e, t) {
  return ["param", Sr(this, t), this.index];
};
We.prototype.outputRecipe = function (e, t) {
  return ["alt", Sr(this, t)].concat(
    this.terms.map((r) => r.outputRecipe(e, t))
  );
};
$c.prototype.outputRecipe = function (e, t) {
  return this.terms[0].outputRecipe(e, t);
};
Cc.prototype.outputRecipe = function (e, t) {
  const r = this.terms.slice(0, this.expansionPos),
    n = this.terms.slice(this.expansionPos + 1);
  return [
    "splice",
    Sr(this, t),
    r.map((i) => i.outputRecipe(e, t)),
    n.map((i) => i.outputRecipe(e, t)),
  ];
};
Xe.prototype.outputRecipe = function (e, t) {
  return ["seq", Sr(this, t)].concat(
    this.factors.map((r) => r.outputRecipe(e, t))
  );
};
Si.prototype.outputRecipe =
  Ro.prototype.outputRecipe =
  rn.prototype.outputRecipe =
  Pt.prototype.outputRecipe =
  At.prototype.outputRecipe =
  Lt.prototype.outputRecipe =
    function (e, t) {
      return [
        this.constructor.name.toLowerCase(),
        Sr(this, t),
        this.expr.outputRecipe(e, t),
      ];
    };
ce.prototype.outputRecipe = function (e, t) {
  return [
    "app",
    Sr(this, t),
    this.ruleName,
    this.args.map((r) => r.outputRecipe(e, t)),
  ];
};
tt.prototype.outputRecipe = function (e, t) {
  return ["unicodeChar", Sr(this, t), this.category];
};
Y.prototype.introduceParams = Ot("introduceParams");
pt.introduceParams =
  dt.introduceParams =
  nt.prototype.introduceParams =
  ht.prototype.introduceParams =
  vt.prototype.introduceParams =
  tt.prototype.introduceParams =
    function (e) {
      return this;
    };
We.prototype.introduceParams = function (e) {
  return (
    this.terms.forEach((t, r, n) => {
      n[r] = t.introduceParams(e);
    }),
    this
  );
};
Xe.prototype.introduceParams = function (e) {
  return (
    this.factors.forEach((t, r, n) => {
      n[r] = t.introduceParams(e);
    }),
    this
  );
};
_t.prototype.introduceParams =
  Pt.prototype.introduceParams =
  At.prototype.introduceParams =
  Lt.prototype.introduceParams =
    function (e) {
      return (this.expr = this.expr.introduceParams(e)), this;
    };
ce.prototype.introduceParams = function (e) {
  const t = e.indexOf(this.ruleName);
  if (t >= 0) {
    if (this.args.length > 0)
      throw new Error(
        "Parameterized rules cannot be passed as arguments to another rule."
      );
    return new vt(t).withSource(this.source);
  } else
    return (
      this.args.forEach((r, n, i) => {
        i[n] = r.introduceParams(e);
      }),
      this
    );
};
Y.prototype.isNullable = function (e) {
  return this._isNullable(e, Object.create(null));
};
Y.prototype._isNullable = Ot("_isNullable");
pt._isNullable =
  ht.prototype._isNullable =
  vt.prototype._isNullable =
  Ro.prototype._isNullable =
  tt.prototype._isNullable =
    function (e, t) {
      return !1;
    };
dt._isNullable = function (e, t) {
  return !0;
};
nt.prototype._isNullable = function (e, t) {
  return typeof this.obj == "string" ? this.obj === "" : !1;
};
We.prototype._isNullable = function (e, t) {
  return this.terms.length === 0 || this.terms.some((r) => r._isNullable(e, t));
};
Xe.prototype._isNullable = function (e, t) {
  return this.factors.every((r) => r._isNullable(e, t));
};
Si.prototype._isNullable =
  rn.prototype._isNullable =
  Pt.prototype._isNullable =
  At.prototype._isNullable =
    function (e, t) {
      return !0;
    };
Lt.prototype._isNullable = function (e, t) {
  return this.expr._isNullable(e, t);
};
ce.prototype._isNullable = function (e, t) {
  const r = this.toMemoKey();
  if (!Object.prototype.hasOwnProperty.call(t, r)) {
    const { body: n } = e.rules[this.ruleName],
      i = n.substituteParams(this.args);
    (t[r] = !1), (t[r] = i._isNullable(e, t));
  }
  return t[r];
};
Y.prototype.substituteParams = Ot("substituteParams");
pt.substituteParams =
  dt.substituteParams =
  nt.prototype.substituteParams =
  ht.prototype.substituteParams =
  tt.prototype.substituteParams =
    function (e) {
      return this;
    };
vt.prototype.substituteParams = function (e) {
  return e[this.index];
};
We.prototype.substituteParams = function (e) {
  return new We(this.terms.map((t) => t.substituteParams(e)));
};
Xe.prototype.substituteParams = function (e) {
  return new Xe(this.factors.map((t) => t.substituteParams(e)));
};
_t.prototype.substituteParams =
  Pt.prototype.substituteParams =
  At.prototype.substituteParams =
  Lt.prototype.substituteParams =
    function (e) {
      return new this.constructor(this.expr.substituteParams(e));
    };
ce.prototype.substituteParams = function (e) {
  if (this.args.length === 0) return this;
  {
    const t = this.args.map((r) => r.substituteParams(e));
    return new ce(this.ruleName, t);
  }
};
function _g(e) {
  return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(e);
}
function Xv(e) {
  const t = Object.create(null);
  e.forEach((r) => {
    t[r] = (t[r] || 0) + 1;
  }),
    Object.keys(t).forEach((r) => {
      if (t[r] <= 1) return;
      let n = 1;
      e.forEach((i, o) => {
        i === r && (e[o] = i + "_" + n++);
      });
    });
}
Y.prototype.toArgumentNameList = Ot("toArgumentNameList");
pt.toArgumentNameList = function (e, t) {
  return ["any"];
};
dt.toArgumentNameList = function (e, t) {
  return ["end"];
};
nt.prototype.toArgumentNameList = function (e, t) {
  return typeof this.obj == "string" && /^[_a-zA-Z0-9]+$/.test(this.obj)
    ? ["_" + this.obj]
    : ["$" + e];
};
ht.prototype.toArgumentNameList = function (e, t) {
  let r = this.from + "_to_" + this.to;
  return _g(r) || (r = "_" + r), _g(r) || (r = "$" + e), [r];
};
We.prototype.toArgumentNameList = function (e, t) {
  const r = this.terms.map((o) => o.toArgumentNameList(e, !0)),
    n = [],
    i = r[0].length;
  for (let o = 0; o < i; o++) {
    const a = [];
    for (let s = 0; s < this.terms.length; s++) a.push(r[s][o]);
    const u = FS(a);
    n.push(u.join("_or_"));
  }
  return t || Xv(n), n;
};
Xe.prototype.toArgumentNameList = function (e, t) {
  let r = [];
  return (
    this.factors.forEach((n) => {
      const i = n.toArgumentNameList(e, !0);
      (r = r.concat(i)), (e += i.length);
    }),
    t || Xv(r),
    r
  );
};
_t.prototype.toArgumentNameList = function (e, t) {
  const r = this.expr
    .toArgumentNameList(e, t)
    .map((n) => (n[n.length - 1] === "s" ? n + "es" : n + "s"));
  return t || Xv(r), r;
};
rn.prototype.toArgumentNameList = function (e, t) {
  return this.expr
    .toArgumentNameList(e, t)
    .map((r) => "opt" + r[0].toUpperCase() + r.slice(1));
};
Pt.prototype.toArgumentNameList = function (e, t) {
  return [];
};
At.prototype.toArgumentNameList = Lt.prototype.toArgumentNameList = function (
  e,
  t
) {
  return this.expr.toArgumentNameList(e, t);
};
ce.prototype.toArgumentNameList = function (e, t) {
  return [this.ruleName];
};
tt.prototype.toArgumentNameList = function (e, t) {
  return ["$" + e];
};
vt.prototype.toArgumentNameList = function (e, t) {
  return ["param" + this.index];
};
Y.prototype.toDisplayString = Ot("toDisplayString");
We.prototype.toDisplayString = Xe.prototype.toDisplayString = function () {
  return this.source
    ? this.source.trimmed().contents
    : "[" + this.constructor.name + "]";
};
pt.toDisplayString =
  dt.toDisplayString =
  _t.prototype.toDisplayString =
  Pt.prototype.toDisplayString =
  At.prototype.toDisplayString =
  Lt.prototype.toDisplayString =
  nt.prototype.toDisplayString =
  ht.prototype.toDisplayString =
  vt.prototype.toDisplayString =
    function () {
      return this.toString();
    };
ce.prototype.toDisplayString = function () {
  if (this.args.length > 0) {
    const e = this.args.map((t) => t.toDisplayString());
    return this.ruleName + "<" + e.join(",") + ">";
  } else return this.ruleName;
};
tt.prototype.toDisplayString = function () {
  return "Unicode [" + this.category + "] character";
};
function XI(e) {
  return e === "description" || e === "string" || e === "code";
}
class Rt {
  constructor(t, r, n) {
    if (!XI(n)) throw new Error("invalid Failure type: " + n);
    (this.pexpr = t), (this.text = r), (this.type = n), (this.fluffy = !1);
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
  subsumes(t) {
    return (
      this.getText() === t.getText() &&
      this.type === t.type &&
      (!this.isFluffy() || (this.isFluffy() && t.isFluffy()))
    );
  }
  toString() {
    return this.type === "string"
      ? JSON.stringify(this.getText())
      : this.getText();
  }
  clone() {
    const t = new Rt(this.pexpr, this.text, this.type);
    return this.isFluffy() && t.makeFluffy(), t;
  }
  toKey() {
    return this.toString() + "#" + this.type;
  }
}
Y.prototype.toFailure = Ot("toFailure");
pt.toFailure = function (e) {
  return new Rt(this, "any object", "description");
};
dt.toFailure = function (e) {
  return new Rt(this, "end of input", "description");
};
nt.prototype.toFailure = function (e) {
  return new Rt(this, this.obj, "string");
};
ht.prototype.toFailure = function (e) {
  return new Rt(
    this,
    JSON.stringify(this.from) + ".." + JSON.stringify(this.to),
    "code"
  );
};
Pt.prototype.toFailure = function (e) {
  const t = this.expr === pt ? "nothing" : "not " + this.expr.toFailure(e);
  return new Rt(this, t, "description");
};
At.prototype.toFailure = function (e) {
  return this.expr.toFailure(e);
};
ce.prototype.toFailure = function (e) {
  let { description: t } = e.rules[this.ruleName];
  return (
    t ||
      (t =
        (/^[aeiouAEIOU]/.test(this.ruleName) ? "an" : "a") +
        " " +
        this.ruleName),
    new Rt(this, t, "description")
  );
};
tt.prototype.toFailure = function (e) {
  return new Rt(
    this,
    "a Unicode [" + this.category + "] character",
    "description"
  );
};
We.prototype.toFailure = function (e) {
  const r = "(" + this.terms.map((n) => n.toFailure(e)).join(" or ") + ")";
  return new Rt(this, r, "description");
};
Xe.prototype.toFailure = function (e) {
  const r = "(" + this.factors.map((n) => n.toFailure(e)).join(" ") + ")";
  return new Rt(this, r, "description");
};
_t.prototype.toFailure = function (e) {
  const t = "(" + this.expr.toFailure(e) + this.operator + ")";
  return new Rt(this, t, "description");
};
Y.prototype.toString = Ot("toString");
pt.toString = function () {
  return "any";
};
dt.toString = function () {
  return "end";
};
nt.prototype.toString = function () {
  return JSON.stringify(this.obj);
};
ht.prototype.toString = function () {
  return JSON.stringify(this.from) + ".." + JSON.stringify(this.to);
};
vt.prototype.toString = function () {
  return "$" + this.index;
};
Lt.prototype.toString = function () {
  return "#(" + this.expr.toString() + ")";
};
We.prototype.toString = function () {
  return this.terms.length === 1
    ? this.terms[0].toString()
    : "(" + this.terms.map((e) => e.toString()).join(" | ") + ")";
};
Xe.prototype.toString = function () {
  return this.factors.length === 1
    ? this.factors[0].toString()
    : "(" + this.factors.map((e) => e.toString()).join(" ") + ")";
};
_t.prototype.toString = function () {
  return this.expr + this.operator;
};
Pt.prototype.toString = function () {
  return "~" + this.expr;
};
At.prototype.toString = function () {
  return "&" + this.expr;
};
ce.prototype.toString = function () {
  if (this.args.length > 0) {
    const e = this.args.map((t) => t.toString());
    return this.ruleName + "<" + e.join(",") + ">";
  } else return this.ruleName;
};
tt.prototype.toString = function () {
  return "\\p{" + this.category + "}";
};
class Yv extends Y {
  constructor(t) {
    super(), (this.obj = t);
  }
  _getString(t) {
    const r = t.currentApplication().args[this.obj.index];
    return Nn(r instanceof nt, "expected a Terminal expression"), r.obj;
  }
  allowsSkippingPrecedingSpace() {
    return !0;
  }
  eval(t) {
    const { inputStream: r } = t,
      n = r.pos,
      i = this._getString(t);
    return r.matchString(i, !0)
      ? (t.pushBinding(new Oi(i.length), n), !0)
      : (t.processFailure(n, this), !1);
  }
  getArity() {
    return 1;
  }
  substituteParams(t) {
    return new Yv(this.obj.substituteParams(t));
  }
  toDisplayString() {
    return this.obj.toDisplayString() + " (case-insensitive)";
  }
  toFailure(t) {
    return new Rt(
      this,
      this.obj.toFailure(t) + " (case-insensitive)",
      "description"
    );
  }
  _isNullable(t, r) {
    return this.obj._isNullable(t, r);
  }
}
let QS;
qS((e) => {
  QS = e.rules.applySyntactic.body;
});
const Zf = new ce("spaces");
class YI {
  constructor(t, r, n) {
    (this.matcher = t),
      (this.startExpr = r),
      (this.grammar = t.grammar),
      (this.input = t.getInput()),
      (this.inputStream = new kc(this.input)),
      (this.memoTable = t._memoTable),
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
  posToOffset(t) {
    return t - this._posStack[this._posStack.length - 1];
  }
  enterApplication(t, r) {
    this._posStack.push(this.inputStream.pos),
      this._applicationStack.push(r),
      this.inLexifiedContextStack.push(!1),
      t.enter(r),
      this._rightmostFailurePositionStack.push(this.rightmostFailurePosition),
      (this.rightmostFailurePosition = -1);
  }
  exitApplication(t, r) {
    const n = this._posStack.pop();
    this._applicationStack.pop(),
      this.inLexifiedContextStack.pop(),
      t.exit(),
      (this.rightmostFailurePosition = Math.max(
        this.rightmostFailurePosition,
        this._rightmostFailurePositionStack.pop()
      )),
      r && this.pushBinding(r, n);
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
    const t = this.currentApplication();
    return t
      ? t.isSyntactic() && !this.inLexifiedContext()
      : this.startExpr.factors[0].isSyntactic();
  }
  inLexifiedContext() {
    return this.inLexifiedContextStack[this.inLexifiedContextStack.length - 1];
  }
  skipSpaces() {
    return (
      this.pushFailuresInfo(),
      this.eval(Zf),
      this.popBinding(),
      this.popFailuresInfo(),
      this.inputStream.pos
    );
  }
  skipSpacesIfInSyntacticContext() {
    return this.inSyntacticContext() ? this.skipSpaces() : this.inputStream.pos;
  }
  maybeSkipSpacesBefore(t) {
    return t.allowsSkippingPrecedingSpace() && t !== Zf
      ? this.skipSpacesIfInSyntacticContext()
      : this.inputStream.pos;
  }
  pushBinding(t, r) {
    this._bindings.push(t), this._bindingOffsets.push(this.posToOffset(r));
  }
  popBinding() {
    this._bindings.pop(), this._bindingOffsets.pop();
  }
  numBindings() {
    return this._bindings.length;
  }
  truncateBindings(t) {
    for (; this._bindings.length > t; ) this.popBinding();
  }
  getCurrentPosInfo() {
    return this.getPosInfo(this.inputStream.pos);
  }
  getPosInfo(t) {
    let r = this.memoTable[t];
    return r || (r = this.memoTable[t] = new RI()), r;
  }
  processFailure(t, r) {
    if (
      ((this.rightmostFailurePosition = Math.max(
        this.rightmostFailurePosition,
        t
      )),
      this.recordedFailures && t === this.positionToRecordFailures)
    ) {
      const n = this.currentApplication();
      n && (r = r.substituteParams(n.args)),
        this.recordFailure(r.toFailure(this.grammar), !1);
    }
  }
  recordFailure(t, r) {
    const n = t.toKey();
    this.recordedFailures[n]
      ? this.recordedFailures[n].isFluffy() &&
        !t.isFluffy() &&
        this.recordedFailures[n].clearFluffy()
      : (this.recordedFailures[n] = r ? t.clone() : t);
  }
  recordFailures(t, r) {
    Object.keys(t).forEach((n) => {
      this.recordFailure(t[n], r);
    });
  }
  cloneRecordedFailures() {
    if (!this.recordedFailures) return;
    const t = Object.create(null);
    return (
      Object.keys(this.recordedFailures).forEach((r) => {
        t[r] = this.recordedFailures[r].clone();
      }),
      t
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
  getMemoizedTraceEntry(t, r) {
    const n = this.memoTable[t];
    if (n && r instanceof ce) {
      const i = n.memo[r.toMemoKey()];
      if (i && i.traceEntry) {
        const o = i.traceEntry.cloneWithExpr(r);
        return (o.isMemoized = !0), o;
      }
    }
    return null;
  }
  getTraceEntry(t, r, n, i) {
    if (r instanceof ce) {
      const o = this.currentApplication(),
        a = o ? o.args : [];
      r = r.substituteParams(a);
    }
    return (
      this.getMemoizedTraceEntry(t, r) ||
      new An(this.input, t, this.inputStream.pos, r, n, i, this.trace)
    );
  }
  isTracing() {
    return !!this.trace;
  }
  hasNecessaryInfo(t) {
    return this.trace && !t.traceEntry
      ? !1
      : this.recordedFailures &&
          this.inputStream.pos + t.rightmostFailureOffset ===
            this.positionToRecordFailures
        ? !!t.failuresAtRightmostPosition
        : !0;
  }
  useMemoizedResult(t, r) {
    this.trace && this.trace.push(r.traceEntry);
    const n = this.inputStream.pos + r.rightmostFailureOffset;
    return (
      (this.rightmostFailurePosition = Math.max(
        this.rightmostFailurePosition,
        n
      )),
      this.recordedFailures &&
        this.positionToRecordFailures === n &&
        r.failuresAtRightmostPosition &&
        this.recordFailures(r.failuresAtRightmostPosition, !0),
      (this.inputStream.examinedLength = Math.max(
        this.inputStream.examinedLength,
        r.examinedLength + t
      )),
      r.value
        ? ((this.inputStream.pos += r.matchLength),
          this.pushBinding(r.value, t),
          !0)
        : !1
    );
  }
  eval(t) {
    const { inputStream: r } = this,
      n = this._bindings.length,
      i = this.userData;
    let o;
    this.recordedFailures &&
      ((o = this.recordedFailures),
      (this.recordedFailures = Object.create(null)));
    const a = r.pos,
      u = this.maybeSkipSpacesBefore(t);
    let s;
    this.trace && ((s = this.trace), (this.trace = []));
    const l = t.eval(this);
    if (this.trace) {
      const f = this._bindings.slice(n),
        c = this.getTraceEntry(u, t, l, f);
      (c.isImplicitSpaces = t === Zf),
        (c.isRootNode = t === this.startExpr),
        s.push(c),
        (this.trace = s);
    }
    return (
      l
        ? this.recordedFailures &&
          r.pos === this.positionToRecordFailures &&
          Object.keys(this.recordedFailures).forEach((f) => {
            this.recordedFailures[f].makeFluffy();
          })
        : ((r.pos = a), this.truncateBindings(n), (this.userData = i)),
      this.recordedFailures && this.recordFailures(o, !1),
      t === QS && this.skipSpaces(),
      l
    );
  }
  getMatchResult() {
    this.grammar._setUpMatchState(this), this.eval(this.startExpr);
    let t;
    this.recordedFailures &&
      (t = Object.keys(this.recordedFailures).map(
        (n) => this.recordedFailures[n]
      ));
    const r = this._bindings[0];
    return (
      r && (r.grammar = this.grammar),
      new KS(
        this.matcher,
        this.input,
        this.startExpr,
        r,
        this._bindingOffsets[0],
        this.rightmostFailurePosition,
        t
      )
    );
  }
  getTrace() {
    this.trace = [];
    const t = this.getMatchResult(),
      r = this.trace[this.trace.length - 1];
    return (r.result = t), r;
  }
  pushFailuresInfo() {
    this._rightmostFailurePositionStack.push(this.rightmostFailurePosition),
      this._recordedFailuresStack.push(this.recordedFailures);
  }
  popFailuresInfo() {
    (this.rightmostFailurePosition = this._rightmostFailurePositionStack.pop()),
      (this.recordedFailures = this._recordedFailuresStack.pop());
  }
}
class QI {
  constructor(t) {
    (this.grammar = t),
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
  setInput(t) {
    return (
      this._input !== t && this.replaceInputRange(0, this._input.length, t),
      this
    );
  }
  replaceInputRange(t, r, n) {
    const i = this._input,
      o = this._memoTable;
    if (t < 0 || t > i.length || r < 0 || r > i.length || t > r)
      throw new Error("Invalid indices: " + t + " and " + r);
    (this._input = i.slice(0, t) + n + i.slice(r)),
      this._input !== i && o.length > 0 && (this._isMemoTableStale = !0);
    const a = o.slice(r);
    o.length = t;
    for (let u = 0; u < n.length; u++) o.push(void 0);
    for (const u of a) o.push(u);
    for (let u = 0; u < t; u++) {
      const s = o[u];
      s && s.clearObsoleteEntries(u, t);
    }
    return this;
  }
  match(t, r = { incremental: !0 }) {
    return this._match(this._getStartExpr(t), {
      incremental: r.incremental,
      tracing: !1,
    });
  }
  trace(t, r = { incremental: !0 }) {
    return this._match(this._getStartExpr(t), {
      incremental: r.incremental,
      tracing: !0,
    });
  }
  _match(t, r = {}) {
    const n = {
      tracing: !1,
      incremental: !0,
      positionToRecordFailures: void 0,
      ...r,
    };
    if (!n.incremental) this._resetMemoTable();
    else if (this._isMemoTableStale && !this.grammar.supportsIncrementalParsing)
      throw wI(this.grammar);
    const i = new YI(this, t, n.positionToRecordFailures);
    return n.tracing ? i.getTrace() : i.getMatchResult();
  }
  _getStartExpr(t) {
    const r = t || this.grammar.defaultStartRule;
    if (!r)
      throw new Error(
        "Missing start rule argument -- the grammar has no default start rule."
      );
    const n = this.grammar.parseApplication(r);
    return new Xe([n, dt]);
  }
}
const xa = [],
  Ad = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
class Pg {
  constructor(t, r, n) {
    (this._node = t),
      (this.source = r),
      (this._baseInterval = n),
      t.isNonterminal() && Nn(r === n),
      (this._childWrappers = []);
  }
  _forgetMemoizedResultFor(t) {
    delete this._node[this._semantics.attributeKeys[t]],
      this.children.forEach((r) => {
        r._forgetMemoizedResultFor(t);
      });
  }
  child(t) {
    if (!(0 <= t && t < this._node.numChildren())) return;
    let r = this._childWrappers[t];
    if (!r) {
      const n = this._node.childAt(t),
        i = this._node.childOffsets[t],
        o = this._baseInterval.subInterval(i, n.matchLength),
        a = n.isNonterminal() ? o : this._baseInterval;
      r = this._childWrappers[t] = this._semantics.wrap(n, o, a);
    }
    return r;
  }
  _children() {
    for (let t = 0; t < this._node.numChildren(); t++) this.child(t);
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
  iteration(t) {
    const r = t || [],
      n = r.map((a) => a._node),
      i = new YS(n, [], -1, !1),
      o = this._semantics.wrap(i, null, null);
    return (o._childWrappers = r), o;
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
class Dt {
  constructor(t, r) {
    const n = this;
    if (
      ((this.grammar = t),
      (this.checkedActionDicts = !1),
      (this.Wrapper = class extends (r ? r.Wrapper : Pg) {
        constructor(i, o, a) {
          super(i, o, a),
            n.checkActionDictsIfHaventAlready(),
            (this._semantics = n);
        }
        toString() {
          return "[semantics wrapper for " + n.grammar.name + "]";
        }
      }),
      (this.super = r),
      r)
    ) {
      if (
        !(t.equals(this.super.grammar) || t._inheritsFrom(this.super.grammar))
      )
        throw new Error(
          "Cannot extend a semantics for grammar '" +
            this.super.grammar.name +
            "' for use with grammar '" +
            t.name +
            "' (not a sub-grammar)"
        );
      (this.operations = Object.create(this.super.operations)),
        (this.attributes = Object.create(this.super.attributes)),
        (this.attributeKeys = Object.create(null));
      for (const i in this.attributes)
        Object.defineProperty(this.attributeKeys, i, { value: Og(i) });
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
    let t;
    for (t in this.operations) this.operations[t].checkActionDict(this.grammar);
    for (t in this.attributes) this.attributes[t].checkActionDict(this.grammar);
  }
  toRecipe(t) {
    function r(i) {
      return i.super !== Dt.BuiltInSemantics._getSemantics();
    }
    let n = `(function(g) {
`;
    if (r(this)) {
      n += "  var semantics = " + this.super.toRecipe(!0) + "(g";
      const i = this.super.grammar;
      let o = this.grammar;
      for (; o !== i; ) (n += ".superGrammar"), (o = o.superGrammar);
      (n += `);
`),
        (n += "  return g.extendSemantics(semantics)");
    } else n += "  return g.createSemantics()";
    return (
      ["Operation", "Attribute"].forEach((i) => {
        const o = this[i.toLowerCase() + "s"];
        Object.keys(o).forEach((a) => {
          const { actionDict: u, formals: s, builtInDefault: l } = o[a];
          let f = a;
          s.length > 0 && (f += "(" + s.join(", ") + ")");
          let c;
          r(this) && this.super[i.toLowerCase() + "s"][a]
            ? (c = "extend" + i)
            : (c = "add" + i),
            (n +=
              `
    .` +
              c +
              "(" +
              JSON.stringify(f) +
              ", {");
          const p = [];
          Object.keys(u).forEach((d) => {
            if (u[d] !== l) {
              let h = u[d].toString().trim();
              (h = h.replace(/^.*\(/, "function(")),
                p.push(
                  `
      ` +
                    JSON.stringify(d) +
                    ": " +
                    h
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
      t ||
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
  addOperationOrAttribute(t, r, n) {
    const i = t + "s",
      o = Ag(r, t),
      { name: a } = o,
      { formals: u } = o;
    this.assertNewName(a, t);
    const s = ZI(t, a, c),
      l = { _default: s };
    Object.keys(n).forEach((p) => {
      l[p] = n[p];
    });
    const f = t === "operation" ? new Ja(a, u, l, s) : new Ed(a, l, s);
    f.checkActionDict(this.grammar), (this[i][a] = f);
    function c(...p) {
      const d = this._semantics[i][a];
      if (arguments.length !== d.formals.length)
        throw new Error(
          "Invalid number of arguments passed to " +
            a +
            " " +
            t +
            " (expected " +
            d.formals.length +
            ", got " +
            arguments.length +
            ")"
        );
      const h = Object.create(null);
      for (const [m, v] of Object.entries(p)) {
        const g = d.formals[m];
        h[g] = v;
      }
      const y = this.args;
      this.args = h;
      const w = d.execute(this._semantics, this);
      return (this.args = y), w;
    }
    t === "operation"
      ? ((this.Wrapper.prototype[a] = c),
        (this.Wrapper.prototype[a].toString = function () {
          return "[" + a + " operation]";
        }))
      : (Object.defineProperty(this.Wrapper.prototype, a, {
          get: c,
          configurable: !0,
        }),
        Object.defineProperty(this.attributeKeys, a, { value: Og(a) }));
  }
  extendOperationOrAttribute(t, r, n) {
    const i = t + "s";
    if ((Ag(r, "attribute"), !(this.super && r in this.super[i])))
      throw new Error(
        "Cannot extend " +
          t +
          " '" +
          r +
          "': did not inherit an " +
          t +
          " with that name"
      );
    if (Ad(this[i], r))
      throw new Error("Cannot extend " + t + " '" + r + "' again");
    const o = this[i][r].formals,
      a = this[i][r].actionDict,
      u = Object.create(a);
    Object.keys(n).forEach((s) => {
      u[s] = n[s];
    }),
      (this[i][r] = t === "operation" ? new Ja(r, o, u) : new Ed(r, u)),
      this[i][r].checkActionDict(this.grammar);
  }
  assertNewName(t, r) {
    if (Ad(Pg.prototype, t))
      throw new Error(
        "Cannot add " + r + " '" + t + "': that's a reserved name"
      );
    if (t in this.operations)
      throw new Error(
        "Cannot add " +
          r +
          " '" +
          t +
          "': an operation with that name already exists"
      );
    if (t in this.attributes)
      throw new Error(
        "Cannot add " +
          r +
          " '" +
          t +
          "': an attribute with that name already exists"
      );
  }
  wrap(t, r, n) {
    const i = n || r;
    return t instanceof this.Wrapper ? t : new this.Wrapper(t, r, i);
  }
}
function Ag(e, t) {
  if (!Dt.prototypeGrammar)
    return Nn(e.indexOf("(") === -1), { name: e, formals: [] };
  const r = Dt.prototypeGrammar.match(
    e,
    t === "operation" ? "OperationSignature" : "AttributeSignature"
  );
  if (r.failed()) throw new Error(r.message);
  return Dt.prototypeGrammarSemantics(r).parse();
}
function ZI(e, t, r) {
  return function (...n) {
    const o = (
      this._semantics.operations[t] || this._semantics.attributes[t]
    ).formals.map((a) => this.args[a]);
    if (!this.isIteration() && n.length === 1) return r.apply(n[0], o);
    throw kI(this.ctorName, t, e, xa);
  };
}
Dt.createSemantics = function (e, t) {
  const r = new Dt(e, t !== void 0 ? t : Dt.BuiltInSemantics._getSemantics()),
    n = function (o) {
      if (!(o instanceof KS))
        throw new TypeError(
          "Semantics expected a MatchResult, but got " + Gv(o)
        );
      if (o.failed())
        throw new TypeError("cannot apply Semantics to " + o.toString());
      const a = o._cst;
      if (a.grammar !== e)
        throw new Error(
          "Cannot use a MatchResult from grammar '" +
            a.grammar.name +
            "' with a semantics for '" +
            e.name +
            "'"
        );
      const u = new kc(o.input);
      return r.wrap(a, u.interval(o._cstOffset, o.input.length));
    };
  return (
    (n.addOperation = function (i, o) {
      return r.addOperationOrAttribute("operation", i, o), n;
    }),
    (n.extendOperation = function (i, o) {
      return r.extendOperationOrAttribute("operation", i, o), n;
    }),
    (n.addAttribute = function (i, o) {
      return r.addOperationOrAttribute("attribute", i, o), n;
    }),
    (n.extendAttribute = function (i, o) {
      return r.extendOperationOrAttribute("attribute", i, o), n;
    }),
    (n._getActionDict = function (i) {
      const o = r.operations[i] || r.attributes[i];
      if (!o)
        throw new Error(
          '"' +
            i +
            '" is not a valid operation or attribute name in this semantics for "' +
            e.name +
            '"'
        );
      return o.actionDict;
    }),
    (n._remove = function (i) {
      let o;
      return (
        i in r.operations
          ? ((o = r.operations[i]), delete r.operations[i])
          : i in r.attributes &&
            ((o = r.attributes[i]), delete r.attributes[i]),
        delete r.Wrapper.prototype[i],
        o
      );
    }),
    (n.getOperationNames = function () {
      return Object.keys(r.operations);
    }),
    (n.getAttributeNames = function () {
      return Object.keys(r.attributes);
    }),
    (n.getGrammar = function () {
      return r.grammar;
    }),
    (n.toRecipe = function (i) {
      return r.toRecipe(i);
    }),
    (n.toString = r.toString.bind(r)),
    (n._getSemantics = function () {
      return r;
    }),
    n
  );
};
class Ja {
  constructor(t, r, n, i) {
    (this.name = t),
      (this.formals = r),
      (this.actionDict = n),
      (this.builtInDefault = i);
  }
  checkActionDict(t) {
    t._checkTopDownActionDict(this.typeName, this.name, this.actionDict);
  }
  execute(t, r) {
    try {
      const { ctorName: n } = r._node;
      let i = this.actionDict[n];
      return i
        ? (xa.push([this, n]), i.apply(r, r._children()))
        : r.isNonterminal() && ((i = this.actionDict._nonterminal), i)
          ? (xa.push([this, "_nonterminal", n]), i.apply(r, r._children()))
          : (xa.push([this, "default action", n]),
            this.actionDict._default.apply(r, r._children()));
    } finally {
      xa.pop();
    }
  }
}
Ja.prototype.typeName = "operation";
class Ed extends Ja {
  constructor(t, r, n) {
    super(t, [], r, n);
  }
  execute(t, r) {
    const n = r._node,
      i = t.attributeKeys[this.name];
    return Ad(n, i) || (n[i] = Ja.prototype.execute.call(this, t, r)), n[i];
  }
}
Ed.prototype.typeName = "attribute";
const Eg = ["_iter", "_terminal", "_nonterminal", "_default"];
function Ig(e) {
  return Object.keys(e.rules)
    .sort()
    .map((t) => e.rules[t]);
}
const JI = (e) => e.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
let ZS, JS;
class wt {
  constructor(t, r, n, i) {
    if (((this.name = t), (this.superGrammar = r), (this.rules = n), i)) {
      if (!(i in n))
        throw new Error(
          "Invalid start rule: '" + i + "' is not a rule in grammar '" + t + "'"
        );
      this.defaultStartRule = i;
    }
    (this._matchStateInitializer = void 0),
      (this.supportsIncrementalParsing = !0);
  }
  matcher() {
    return new QI(this);
  }
  isBuiltIn() {
    return this === wt.ProtoBuiltInRules || this === wt.BuiltInRules;
  }
  equals(t) {
    if (this === t) return !0;
    if (
      t == null ||
      this.name !== t.name ||
      this.defaultStartRule !== t.defaultStartRule ||
      !(
        this.superGrammar === t.superGrammar ||
        this.superGrammar.equals(t.superGrammar)
      )
    )
      return !1;
    const r = Ig(this),
      n = Ig(t);
    return (
      r.length === n.length &&
      r.every(
        (i, o) =>
          i.description === n[o].description &&
          i.formals.join(",") === n[o].formals.join(",") &&
          i.body.toString() === n[o].body.toString()
      )
    );
  }
  match(t, r) {
    const n = this.matcher();
    return n.replaceInputRange(0, 0, t), n.match(r);
  }
  trace(t, r) {
    const n = this.matcher();
    return n.replaceInputRange(0, 0, t), n.trace(r);
  }
  createSemantics() {
    return Dt.createSemantics(this);
  }
  extendSemantics(t) {
    return Dt.createSemantics(this, t._getSemantics());
  }
  _checkTopDownActionDict(t, r, n) {
    const i = [];
    for (const o in n) {
      const a = n[o];
      if (!Eg.includes(o) && !(o in this.rules)) {
        i.push(`'${o}' is not a valid semantic action for '${this.name}'`);
        continue;
      }
      if (typeof a != "function") {
        i.push(
          `'${o}' must be a function in an action dictionary for '${this.name}'`
        );
        continue;
      }
      const s = a.length,
        l = this._topDownActionArity(o);
      if (s !== l) {
        let f;
        o === "_iter" || o === "_nonterminal"
          ? (f = `it should use a rest parameter, e.g. \`${o}(...children) {}\`. NOTE: this is new in Ohm v16 — see https://ohmjs.org/d/ati for details.`)
          : (f = `expected ${l}, got ${s}`),
          i.push(`Semantic action '${o}' has the wrong arity: ${f}`);
      }
    }
    if (i.length > 0) {
      const o = i.map((u) => "- " + u),
        a = new Error(
          [`Found errors in the action dictionary of the '${r}' ${t}:`, ...o]
            .join(`
`)
        );
      throw ((a.problems = i), a);
    }
  }
  _topDownActionArity(t) {
    return Eg.includes(t) ? 0 : this.rules[t].body.getArity();
  }
  _inheritsFrom(t) {
    let r = this.superGrammar;
    for (; r; ) {
      if (r.equals(t, !0)) return !0;
      r = r.superGrammar;
    }
    return !1;
  }
  toRecipe(t = void 0) {
    const r = {};
    this.source && (r.source = this.source.contents);
    let n = null;
    this.defaultStartRule && (n = this.defaultStartRule);
    const i = {};
    Object.keys(this.rules).forEach((u) => {
      const s = this.rules[u],
        { body: l } = s,
        f = !this.superGrammar || !this.superGrammar.rules[u];
      let c;
      f ? (c = "define") : (c = l instanceof $c ? "extend" : "override");
      const p = {};
      if (s.source && this.source) {
        const y = s.source.relativeTo(this.source);
        p.sourceInterval = [y.startIdx, y.endIdx];
      }
      const d = f ? s.description : null,
        h = l.outputRecipe(s.formals, this.source);
      i[u] = [c, p, d, s.formals, h];
    });
    let o = "null";
    t
      ? (o = t)
      : this.superGrammar &&
        !this.superGrammar.isBuiltIn() &&
        (o = this.superGrammar.toRecipe());
    const a = [
      ...["grammar", r, this.name].map(JSON.stringify),
      o,
      ...[n, i].map(JSON.stringify),
    ];
    return JI(`[${a.join(",")}]`);
  }
  toOperationActionDictionaryTemplate() {
    return this._toOperationOrAttributeActionDictionaryTemplate();
  }
  toAttributeActionDictionaryTemplate() {
    return this._toOperationOrAttributeActionDictionaryTemplate();
  }
  _toOperationOrAttributeActionDictionaryTemplate() {
    const t = new xi();
    t.append("{");
    let r = !0;
    for (const n in this.rules) {
      const { body: i } = this.rules[n];
      r ? (r = !1) : t.append(","),
        t.append(`
`),
        t.append("  "),
        this.addSemanticActionTemplate(n, i, t);
    }
    return (
      t.append(`
}`),
      t.contents()
    );
  }
  addSemanticActionTemplate(t, r, n) {
    n.append(t), n.append(": function(");
    const i = this._topDownActionArity(t);
    n.append(Tc("_", i).join(", ")),
      n.append(`) {
`),
      n.append("  }");
  }
  parseApplication(t) {
    let r;
    if (t.indexOf("<") === -1) r = new ce(t);
    else {
      const i = ZS.match(t, "Base_application");
      r = JS(i, {});
    }
    if (!(r.ruleName in this.rules)) throw WS(r.ruleName, this.name);
    const { formals: n } = this.rules[r.ruleName];
    if (n.length !== r.args.length) {
      const { source: i } = this.rules[r.ruleName];
      throw HS(r.ruleName, n.length, r.args.length, i);
    }
    return r;
  }
  _setUpMatchState(t) {
    this._matchStateInitializer && this._matchStateInitializer(t);
  }
}
wt.ProtoBuiltInRules = new wt("ProtoBuiltInRules", void 0, {
  any: { body: pt, formals: [], description: "any character", primitive: !0 },
  end: { body: dt, formals: [], description: "end of input", primitive: !0 },
  caseInsensitive: { body: new Yv(new vt(0)), formals: ["str"], primitive: !0 },
  lower: {
    body: new tt("Ll"),
    formals: [],
    description: "a lowercase letter",
    primitive: !0,
  },
  upper: {
    body: new tt("Lu"),
    formals: [],
    description: "an uppercase letter",
    primitive: !0,
  },
  unicodeLtmo: {
    body: new tt("Ltmo"),
    formals: [],
    description: "a Unicode character in Lt, Lm, or Lo",
    primitive: !0,
  },
  spaces: { body: new Si(new ce("space")), formals: [] },
  space: { body: new ht("\0", " "), formals: [], description: "a space" },
});
wt.initApplicationParser = function (e, t) {
  (ZS = e), (JS = t);
};
class Tg {
  constructor(t) {
    this.name = t;
  }
  sourceInterval(t, r) {
    return this.source.subInterval(t, r - t);
  }
  ensureSuperGrammar() {
    return (
      this.superGrammar ||
        this.withSuperGrammar(
          this.name === "BuiltInRules" ? wt.ProtoBuiltInRules : wt.BuiltInRules
        ),
      this.superGrammar
    );
  }
  ensureSuperGrammarRuleForOverriding(t, r) {
    const n = this.ensureSuperGrammar().rules[t];
    if (!n) throw xI(t, this.superGrammar.name, r);
    return n;
  }
  installOverriddenOrExtendedRule(t, r, n, i) {
    const o = Sd(r);
    if (o.length > 0) throw wg(t, o, i);
    const a = this.ensureSuperGrammar().rules[t],
      u = a.formals,
      s = u ? u.length : 0;
    if (r.length !== s) throw HS(t, s, r.length, i);
    return this.install(t, r, n, a.description, i);
  }
  install(t, r, n, i, o, a = !1) {
    return (
      (this.rules[t] = {
        body: n.introduceParams(r),
        formals: r,
        description: i,
        source: o,
        primitive: a,
      }),
      this
    );
  }
  withSuperGrammar(t) {
    if (this.superGrammar)
      throw new Error(
        "the super grammar of a GrammarDecl cannot be set more than once"
      );
    return (
      (this.superGrammar = t),
      (this.rules = Object.create(t.rules)),
      t.isBuiltIn() || (this.defaultStartRule = t.defaultStartRule),
      this
    );
  }
  withDefaultStartRule(t) {
    return (this.defaultStartRule = t), this;
  }
  withSource(t) {
    return (this.source = new kc(t).interval(0, t.length)), this;
  }
  build() {
    const t = new wt(
      this.name,
      this.ensureSuperGrammar(),
      this.rules,
      this.defaultStartRule
    );
    (t._matchStateInitializer = t.superGrammar._matchStateInitializer),
      (t.supportsIncrementalParsing =
        t.superGrammar.supportsIncrementalParsing);
    const r = [];
    let n = !1;
    return (
      Object.keys(t.rules).forEach((i) => {
        const { body: o } = t.rules[i];
        try {
          o.assertChoicesHaveUniformArity(i);
        } catch (a) {
          r.push(a);
        }
        try {
          o.assertAllApplicationsAreValid(i, t);
        } catch (a) {
          r.push(a), (n = !0);
        }
      }),
      n ||
        Object.keys(t.rules).forEach((i) => {
          const { body: o } = t.rules[i];
          try {
            o.assertIteratedExprsAreNotNullable(t, []);
          } catch (a) {
            r.push(a);
          }
        }),
      r.length > 0 && jI(r),
      this.source && (t.source = this.source),
      t
    );
  }
  define(t, r, n, i, o, a) {
    if ((this.ensureSuperGrammar(), this.superGrammar.rules[t]))
      throw bg(t, this.name, this.superGrammar.name, o);
    if (this.rules[t]) throw bg(t, this.name, this.name, o);
    const u = Sd(r);
    if (u.length > 0) throw wg(t, u, o);
    return this.install(t, r, n, i, o, a);
  }
  override(t, r, n, i, o) {
    return (
      this.ensureSuperGrammarRuleForOverriding(t, o),
      this.installOverriddenOrExtendedRule(t, r, n, o),
      this
    );
  }
  extend(t, r, n, i, o) {
    if (!this.ensureSuperGrammar().rules[t])
      throw SI(t, this.superGrammar.name, o);
    const u = new $c(this.superGrammar, t, n);
    return (
      (u.source = n.source),
      this.installOverriddenOrExtendedRule(t, r, u, o),
      this
    );
  }
}
class pl {
  constructor() {
    (this.currentDecl = null), (this.currentRuleName = null);
  }
  newGrammar(t) {
    return new Tg(t);
  }
  grammar(t, r, n, i, o) {
    const a = new Tg(r);
    return (
      n && a.withSuperGrammar(n instanceof wt ? n : this.fromRecipe(n)),
      i && a.withDefaultStartRule(i),
      t && t.source && a.withSource(t.source),
      (this.currentDecl = a),
      Object.keys(o).forEach((u) => {
        this.currentRuleName = u;
        const s = o[u],
          l = s[0],
          f = s[1],
          c = s[2],
          p = s[3],
          d = this.fromRecipe(s[4]);
        let h;
        a.source &&
          f &&
          f.sourceInterval &&
          (h = a.source.subInterval(
            f.sourceInterval[0],
            f.sourceInterval[1] - f.sourceInterval[0]
          )),
          a[l](u, p, d, c, h);
      }),
      (this.currentRuleName = this.currentDecl = null),
      a.build()
    );
  }
  terminal(t) {
    return new nt(t);
  }
  range(t, r) {
    return new ht(t, r);
  }
  param(t) {
    return new vt(t);
  }
  alt(...t) {
    let r = [];
    for (let n of t)
      n instanceof Y || (n = this.fromRecipe(n)),
        n instanceof We ? (r = r.concat(n.terms)) : r.push(n);
    return r.length === 1 ? r[0] : new We(r);
  }
  seq(...t) {
    let r = [];
    for (let n of t)
      n instanceof Y || (n = this.fromRecipe(n)),
        n instanceof Xe ? (r = r.concat(n.factors)) : r.push(n);
    return r.length === 1 ? r[0] : new Xe(r);
  }
  star(t) {
    return t instanceof Y || (t = this.fromRecipe(t)), new Si(t);
  }
  plus(t) {
    return t instanceof Y || (t = this.fromRecipe(t)), new Ro(t);
  }
  opt(t) {
    return t instanceof Y || (t = this.fromRecipe(t)), new rn(t);
  }
  not(t) {
    return t instanceof Y || (t = this.fromRecipe(t)), new Pt(t);
  }
  lookahead(t) {
    return t instanceof Y || (t = this.fromRecipe(t)), new At(t);
  }
  lex(t) {
    return t instanceof Y || (t = this.fromRecipe(t)), new Lt(t);
  }
  app(t, r) {
    return (
      r &&
        r.length > 0 &&
        (r = r.map(function (n) {
          return n instanceof Y ? n : this.fromRecipe(n);
        }, this)),
      new ce(t, r)
    );
  }
  splice(t, r) {
    return new Cc(
      this.currentDecl.superGrammar,
      this.currentRuleName,
      t.map((n) => this.fromRecipe(n)),
      r.map((n) => this.fromRecipe(n))
    );
  }
  fromRecipe(t) {
    const r = t[0] === "grammar" ? t.slice(1) : t.slice(2),
      n = this[t[0]](...r),
      i = t[1];
    return (
      i &&
        i.sourceInterval &&
        this.currentDecl &&
        n.withSource(this.currentDecl.sourceInterval(...i.sourceInterval)),
      n
    );
  }
}
function Qv(e) {
  return typeof e == "function"
    ? e.call(new pl())
    : (typeof e == "string" && (e = JSON.parse(e)), new pl().fromRecipe(e));
}
const Zv = Qv([
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
wt.BuiltInRules = Zv;
DI(wt.BuiltInRules);
const Jv = Qv([
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
  ]),
  Jf = Object.create(Y.prototype);
function $g(e, t) {
  for (const r in e) if (r === t) return !0;
  return !1;
}
function eO(e, t, r) {
  const n = new pl();
  let i,
    o,
    a,
    u = !1;
  return (r || Jv)
    .createSemantics()
    .addOperation("visit", {
      Grammars(f) {
        return f.children.map((c) => c.visit());
      },
      Grammar(f, c, p, d, h) {
        const y = f.visit();
        (i = n.newGrammar(y)),
          c.child(0) && c.child(0).visit(),
          d.children.map((m) => m.visit());
        const w = i.build();
        if (((w.source = this.source.trimmed()), $g(t, y))) throw bI(w);
        return (t[y] = w), w;
      },
      SuperGrammar(f, c) {
        const p = c.visit();
        if (p === "null") i.withSuperGrammar(null);
        else {
          if (!t || !$g(t, p)) throw gI(p, t, c.source);
          i.withSuperGrammar(t[p]);
        }
      },
      Rule_define(f, c, p, d, h) {
        (o = f.visit()),
          (a = c.children.map((v) => v.visit())[0] || []),
          !i.defaultStartRule &&
            i.ensureSuperGrammar() !== wt.ProtoBuiltInRules &&
            i.withDefaultStartRule(o);
        const y = h.visit(),
          w = p.children.map((v) => v.visit())[0],
          m = this.source.trimmed();
        return i.define(o, a, y, w, m);
      },
      Rule_override(f, c, p, d) {
        (o = f.visit()), (a = c.children.map((w) => w.visit())[0] || []);
        const h = this.source.trimmed();
        i.ensureSuperGrammarRuleForOverriding(o, h), (u = !0);
        const y = d.visit();
        return (u = !1), i.override(o, a, y, null, h);
      },
      Rule_extend(f, c, p, d) {
        (o = f.visit()), (a = c.children.map((w) => w.visit())[0] || []);
        const h = d.visit(),
          y = this.source.trimmed();
        return i.extend(o, a, h, null, y);
      },
      RuleBody(f, c) {
        return n.alt(...c.visit()).withSource(this.source);
      },
      OverrideRuleBody(f, c) {
        const p = c.visit(),
          d = p.indexOf(Jf);
        if (d >= 0) {
          const h = p.slice(0, d),
            y = p.slice(d + 1);
          return (
            y.forEach((w) => {
              if (w === Jf) throw TI(w);
            }),
            new Cc(i.superGrammar, o, h, y).withSource(this.source)
          );
        } else return n.alt(...p).withSource(this.source);
      },
      Formals(f, c, p) {
        return c.visit();
      },
      Params(f, c, p) {
        return c.visit();
      },
      Alt(f) {
        return n.alt(...f.visit()).withSource(this.source);
      },
      TopLevelTerm_inline(f, c) {
        const p = o + "_" + c.visit(),
          d = f.visit(),
          h = this.source.trimmed(),
          y = !(i.superGrammar && i.superGrammar.rules[p]);
        u && !y ? i.override(p, a, d, null, h) : i.define(p, a, d, null, h);
        const w = a.map((m) => n.app(m));
        return n.app(p, w).withSource(d.source);
      },
      OverrideTopLevelTerm_superSplice(f) {
        return Jf;
      },
      Seq(f) {
        return n
          .seq(...f.children.map((c) => c.visit()))
          .withSource(this.source);
      },
      Iter_star(f, c) {
        return n.star(f.visit()).withSource(this.source);
      },
      Iter_plus(f, c) {
        return n.plus(f.visit()).withSource(this.source);
      },
      Iter_opt(f, c) {
        return n.opt(f.visit()).withSource(this.source);
      },
      Pred_not(f, c) {
        return n.not(c.visit()).withSource(this.source);
      },
      Pred_lookahead(f, c) {
        return n.lookahead(c.visit()).withSource(this.source);
      },
      Lex_lex(f, c) {
        return n.lex(c.visit()).withSource(this.source);
      },
      Base_application(f, c) {
        const p = c.children.map((d) => d.visit())[0] || [];
        return n.app(f.visit(), p).withSource(this.source);
      },
      Base_range(f, c, p) {
        return n.range(f.visit(), p.visit()).withSource(this.source);
      },
      Base_terminal(f) {
        return n.terminal(f.visit()).withSource(this.source);
      },
      Base_paren(f, c, p) {
        return c.visit();
      },
      ruleDescr(f, c, p) {
        return c.visit();
      },
      ruleDescrText(f) {
        return this.sourceString.trim();
      },
      caseName(f, c, p, d, h) {
        return p.visit();
      },
      name(f, c) {
        return this.sourceString;
      },
      nameFirst(f) {},
      nameRest(f) {},
      terminal(f, c, p) {
        return c.children.map((d) => d.visit()).join("");
      },
      oneCharTerminal(f, c, p) {
        return c.visit();
      },
      escapeChar(f) {
        try {
          return US(this.sourceString);
        } catch (c) {
          throw c instanceof RangeError &&
            c.message.startsWith("Invalid code point ")
            ? $I(f)
            : c;
        }
      },
      NonemptyListOf(f, c, p) {
        return [f.visit()].concat(p.children.map((d) => d.visit()));
      },
      EmptyListOf() {
        return [];
      },
      _terminal() {
        return this.sourceString;
      },
    })(e)
    .visit();
}
const eT = Qv([
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
tT(wt.BuiltInRules);
rT(eT);
function tT(e) {
  const t = {
    empty() {
      return this.iteration();
    },
    nonEmpty(r, n, i) {
      return this.iteration([r].concat(i.children));
    },
  };
  Dt.BuiltInSemantics = Dt.createSemantics(e, null).addOperation(
    "asIteration",
    {
      emptyListOf: t.empty,
      nonemptyListOf: t.nonEmpty,
      EmptyListOf: t.empty,
      NonemptyListOf: t.nonEmpty,
    }
  );
}
function rT(e) {
  (Dt.prototypeGrammarSemantics = e.createSemantics().addOperation("parse", {
    AttributeSignature(t) {
      return { name: t.parse(), formals: [] };
    },
    OperationSignature(t, r) {
      return {
        name: t.parse(),
        formals: r.children.map((n) => n.parse())[0] || [],
      };
    },
    Formals(t, r, n) {
      return r.asIteration().children.map((i) => i.parse());
    },
    name(t, r) {
      return this.sourceString;
    },
  })),
    (Dt.prototypeGrammar = e);
}
function nT(e) {
  let t = 0;
  const r = [0],
    n = () => r[r.length - 1],
    i = {},
    o = /( *).*(?:$|\r?\n|\r)/g;
  let a;
  for (; (a = o.exec(e)) != null; ) {
    const [u, s] = a;
    if (u.length === 0) break;
    const l = s.length,
      f = n(),
      c = t + l;
    if (l > f) r.push(l), (i[c] = 1);
    else if (l < f) {
      const p = r.length;
      for (; n() !== l; ) r.pop();
      i[c] = -1 * (p - r.length);
    }
    t += u.length;
  }
  return r.length > 1 && (i[t] = 1 - r.length), i;
}
const tO = "an indented block",
  rO = "a dedent",
  Cg = 1114112;
class iT extends kc {
  constructor(t) {
    super(t.input), (this.state = t);
  }
  _indentationAt(t) {
    return this.state.userData[t] || 0;
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
      ? ((this.examinedLength = Math.max(this.examinedLength, this.pos)), Cg)
      : super.nextCharCode();
  }
  nextCodePoint() {
    return this._indentationAt(this.pos) !== 0
      ? ((this.examinedLength = Math.max(this.examinedLength, this.pos)), Cg)
      : super.nextCodePoint();
  }
}
class kg extends Y {
  constructor(t = !0) {
    super(), (this.isIndent = t);
  }
  allowsSkippingPrecedingSpace() {
    return !0;
  }
  eval(t) {
    const { inputStream: r } = t,
      n = t.userData;
    t.doNotMemoize = !0;
    const i = r.pos,
      o = this.isIndent ? 1 : -1;
    return (n[i] || 0) * o > 0
      ? ((t.userData = Object.create(n)),
        (t.userData[i] -= o),
        t.pushBinding(new Oi(0), i),
        !0)
      : (t.processFailure(i, this), !1);
  }
  getArity() {
    return 1;
  }
  _assertAllApplicationsAreValid(t, r) {}
  _isNullable(t, r) {
    return !1;
  }
  assertChoicesHaveUniformArity(t) {}
  assertIteratedExprsAreNotNullable(t) {}
  introduceParams(t) {
    return this;
  }
  substituteParams(t) {
    return this;
  }
  toString() {
    return this.isIndent ? "indent" : "dedent";
  }
  toDisplayString() {
    return this.toString();
  }
  toFailure(t) {
    const r = this.isIndent ? tO : rO;
    return new Rt(this, r, "description");
  }
}
const oT = new ce("indent"),
  aT = new ce("dedent"),
  uT = new Cc(Zv, "any", [oT, aT], []),
  sT = new pl()
    .newGrammar("IndentationSensitive")
    .withSuperGrammar(Zv)
    .define("indent", [], new kg(!0), tO, void 0, !0)
    .define("dedent", [], new kg(!1), rO, void 0, !0)
    .extend("any", [], uT, "any character", void 0)
    .build();
Object.assign(sT, {
  _matchStateInitializer(e) {
    (e.userData = nT(e.input)), (e.inputStream = new iT(e));
  },
  supportsIncrementalParsing: !1,
});
wt.initApplicationParser(Jv, eO);
const lT = (e) =>
  !!e.constructor &&
  typeof e.constructor.isBuffer == "function" &&
  e.constructor.isBuffer(e);
function cT(e, t) {
  const r = Jv.match(e, "Grammars");
  if (r.failed()) throw yI(r);
  return eO(r, t);
}
function fT(e, t) {
  const r = pT(e),
    n = Object.keys(r);
  if (n.length === 0) throw new Error("Missing grammar definition");
  if (n.length > 1) {
    const o = r[n[1]].source;
    throw new Error(
      qv(o.sourceString, o.startIdx) +
        "Found more than one grammar definition -- use ohm.grammars() instead."
    );
  }
  return r[n[0]];
}
function pT(e, t) {
  const r = Object.create({});
  if (typeof e != "string")
    if (lT(e)) e = e.toString();
    else throw new TypeError("Expected string as first argument, got " + Gv(e));
  return cT(e, r), r;
}
function dT(e, t, r) {
  let n = (i) => e(i, ...t);
  return r === void 0 ? n : Object.assign(n, { lazy: r, lazyArgs: t });
}
function em(e, t, r) {
  let n = e.length - t.length;
  if (n === 0) return e(...t);
  if (n === 1) return dT(e, t, r);
  throw new Error("Wrong number of arguments");
}
function jg(...e) {
  return em(hT, e);
}
var hT = (e, t) => {
  let r = e.entries(),
    n = r.next();
  if (n.done ?? !1) return 0;
  let {
      value: [, i],
    } = n,
    o = t(i, 0, e);
  for (let [a, u] of r) {
    let s = t(u, a, e);
    o += s;
  }
  return o;
};
function vT(e, t) {
  let r = Math.ceil(e),
    n = Math.floor(t);
  if (n < r)
    throw new RangeError(
      `randomInteger: The range [${e.toString()},${t.toString()}] contains no integer`
    );
  return Math.floor(Math.random() * (n - r + 1) + r);
}
function mT(...e) {
  return em(yT, e);
}
function yT(e, t) {
  let r = [];
  for (let n = e; n < t; n++) r.push(n);
  return r;
}
function gT(...e) {
  return em(bT, e);
}
function bT(e) {
  let t = typeof e[0] == "bigint" ? 0n : 0;
  for (let r of e) t += r;
  return t;
}
const nO = fT(String.raw`
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
  wT = nO
    .createSemantics()
    .addOperation("eval(overrides)", {
      ASExpr_add(e, t, r) {
        return e.eval(this.args.overrides) + r.eval(this.args.overrides);
      },
      ASExpr_sub(e, t, r) {
        return Math.max(
          e.eval(this.args.overrides) - r.eval(this.args.overrides),
          0
        );
      },
      MDExpr_mul(e, t, r) {
        return e.eval(this.args.overrides) * r.eval(this.args.overrides);
      },
      MDExpr_div(e, t, r) {
        return Math.floor(
          e.eval(this.args.overrides) / r.eval(this.args.overrides)
        );
      },
      ExpExpr_exp(e, t, r) {
        return Math.pow(
          e.eval(this.args.overrides),
          r.eval(this.args.overrides)
        );
      },
      ParenExpr_parens(e, t, r) {
        return t.eval(this.args.overrides);
      },
      Roll(e, t, r) {
        const n = Math.max(e.eval(this.args.overrides), 0),
          i = Math.max(r.eval(this.args.overrides), 0);
        return i === 0 ? 0 : gT(mT(0, n).map(() => vT(1, i)));
      },
      Number(e, t, r, n) {
        var o;
        const i = (o = n.child(0)) == null ? void 0 : o.sourceString;
        return (i == null ? void 0 : i.length) > 0 && i in this.args.overrides
          ? this.args.overrides[i]
          : parseInt(e.sourceString + t.sourceString);
      },
    })
    .addOperation("toDescription()", {
      ASExpr_add(e, t, r) {
        return Tt(e.toDescription(), Tt([" + "], r.toDescription()));
      },
      ASExpr_sub(e, t, r) {
        return Tt(e.toDescription(), Tt([" - "], r.toDescription()));
      },
      MDExpr_mul(e, t, r) {
        return Tt(e.toDescription(), Tt([" * "], r.toDescription()));
      },
      MDExpr_div(e, t, r) {
        return Tt(e.toDescription(), Tt([" / "], r.toDescription()));
      },
      ExpExpr_exp(e, t, r) {
        return Tt(e.toDescription(), Tt([" ^ "], r.toDescription()));
      },
      ParenExpr_parens(e, t, r) {
        return Tt(["("], Tt(t.toDescription(), [")"]));
      },
      Roll(e, t, r) {
        return Tt(e.toDescription(), Tt(["d"], r.toDescription()));
      },
      Number(e, t, r, n) {
        var o;
        const i = (o = n.child(0)) == null ? void 0 : o.sourceString;
        return (i == null ? void 0 : i.length) > 0
          ? [
              {
                type: "label",
                name: i,
                value: parseInt(e.sourceString + t.sourceString),
              },
            ]
          : [`${e.sourceString}${t.sourceString}`];
      },
    }),
  xT = (e) => [e[0], e.slice(1)],
  ST = (e) => [e.slice(0, e.length - 1), e[e.length - 1]],
  Tt = (e, t) => {
    if (e.length === 0) return t;
    if (t.length === 0) return e;
    const [r, n] = ST(e),
      [i, o] = xT(t);
    return typeof n == "string" && typeof i == "string"
      ? [...r, `${n}${i}`, ...o]
      : [...e, ...t];
  },
  OT = "_description_muh06_1",
  _T = "_override-control_muh06_5",
  PT = "_override-value_muh06_14",
  AT = "_override-label_muh06_19",
  ET = "_dragging_muh06_24",
  IT = "_override-dragging_muh06_28",
  Vn = {
    description: OT,
    "override-control": "_override-control_muh06_5",
    overrideControl: _T,
    "override-value": "_override-value_muh06_14",
    overrideValue: PT,
    "override-label": "_override-label_muh06_19",
    overrideLabel: AT,
    dragging: ET,
    "override-dragging": "_override-dragging_muh06_28",
    overrideDragging: IT,
  },
  TT = ({ progSrc: e, overrides: t, onUpdateProgram: r }) => {
    const n = nO.match(e),
      i = n.succeeded() ? wT(n).toDescription() : null;
    return de.jsxs("div", {
      children: [
        de.jsx("textarea", {
          value: e,
          onChange: (o) => r(o.target.value, t),
          style: { width: "100%", height: "100%" },
        }),
        de.jsx("div", {
          className: Vn.description,
          children: i
            ? i.map((o, a) =>
                de.jsx(
                  $T,
                  {
                    desc: o,
                    overrides: t,
                    onOverrideChange: (u, s) => {
                      r(e, { ...t, [u]: s });
                    },
                  },
                  a
                )
              )
            : de.jsx("span", { children: n.message }),
        }),
      ],
    });
  },
  $T = ({ desc: e, overrides: t, onOverrideChange: r }) =>
    typeof e == "string"
      ? de.jsx(CT, { desc: e })
      : de.jsx(jT, { desc: e, overrides: t, onOverrideChange: r }),
  CT = ({ desc: e }) => de.jsx("span", { children: e }),
  kT = 40,
  jT = ({ desc: e, overrides: t, onOverrideChange: r }) => {
    const [n, i] = z.useState(!1);
    return de.jsxs("span", {
      className: dI({ [Vn.overrideControl]: !0, [Vn.dragging]: n }),
      onMouseDown: async () => {
        await document.body.requestPointerLock(),
          i(!0),
          document.body.classList.add(Vn.overrideDragging);
        const o = t[e.name] || e.value;
        let a = 0,
          u = o;
        const s = (l) => {
          a += l.movementX;
          const f = Math.max(o + Math.floor(a / kT), 0);
          f !== u && (r(e.name, f), (u = f));
        };
        document.addEventListener("mousemove", s),
          document.addEventListener(
            "mouseup",
            () => {
              i(!1),
                document.body.classList.remove(Vn.overrideDragging),
                document.removeEventListener("mousemove", s),
                document.exitPointerLock();
            },
            { once: !0 }
          );
      },
      children: [
        de.jsx("span", {
          className: Vn.overrideValue,
          children: t[e.name] !== void 0 ? t[e.name] : e.value,
        }),
        de.jsx("span", { className: Vn.overrideLabel, children: e.name }),
      ],
    });
  };
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const iO = Symbol("Comlink.proxy"),
  MT = Symbol("Comlink.endpoint"),
  NT = Symbol("Comlink.releaseProxy"),
  ep = Symbol("Comlink.finalizer"),
  Bs = Symbol("Comlink.thrown"),
  oO = (e) => (typeof e == "object" && e !== null) || typeof e == "function",
  DT = {
    canHandle: (e) => oO(e) && e[iO],
    serialize(e) {
      const { port1: t, port2: r } = new MessageChannel();
      return uO(e, t), [r, [r]];
    },
    deserialize(e) {
      return e.start(), lO(e);
    },
  },
  LT = {
    canHandle: (e) => oO(e) && Bs in e,
    serialize({ value: e }) {
      let t;
      return (
        e instanceof Error
          ? (t = {
              isError: !0,
              value: { message: e.message, name: e.name, stack: e.stack },
            })
          : (t = { isError: !1, value: e }),
        [t, []]
      );
    },
    deserialize(e) {
      throw e.isError
        ? Object.assign(new Error(e.value.message), e.value)
        : e.value;
    },
  },
  aO = new Map([
    ["proxy", DT],
    ["throw", LT],
  ]);
function RT(e, t) {
  for (const r of e)
    if (t === r || r === "*" || (r instanceof RegExp && r.test(t))) return !0;
  return !1;
}
function uO(e, t = globalThis, r = ["*"]) {
  t.addEventListener("message", function n(i) {
    if (!i || !i.data) return;
    if (!RT(r, i.origin)) {
      console.warn(`Invalid origin '${i.origin}' for comlink proxy`);
      return;
    }
    const { id: o, type: a, path: u } = Object.assign({ path: [] }, i.data),
      s = (i.data.argumentList || []).map(Yn);
    let l;
    try {
      const f = u.slice(0, -1).reduce((p, d) => p[d], e),
        c = u.reduce((p, d) => p[d], e);
      switch (a) {
        case "GET":
          l = c;
          break;
        case "SET":
          (f[u.slice(-1)[0]] = Yn(i.data.value)), (l = !0);
          break;
        case "APPLY":
          l = c.apply(f, s);
          break;
        case "CONSTRUCT":
          {
            const p = new c(...s);
            l = HT(p);
          }
          break;
        case "ENDPOINT":
          {
            const { port1: p, port2: d } = new MessageChannel();
            uO(e, d), (l = WT(p, [p]));
          }
          break;
        case "RELEASE":
          l = void 0;
          break;
        default:
          return;
      }
    } catch (f) {
      l = { value: f, [Bs]: 0 };
    }
    Promise.resolve(l)
      .catch((f) => ({ value: f, [Bs]: 0 }))
      .then((f) => {
        const [c, p] = vl(f);
        t.postMessage(Object.assign(Object.assign({}, c), { id: o }), p),
          a === "RELEASE" &&
            (t.removeEventListener("message", n),
            sO(t),
            ep in e && typeof e[ep] == "function" && e[ep]());
      })
      .catch((f) => {
        const [c, p] = vl({
          value: new TypeError("Unserializable return value"),
          [Bs]: 0,
        });
        t.postMessage(Object.assign(Object.assign({}, c), { id: o }), p);
      });
  }),
    t.start && t.start();
}
function FT(e) {
  return e.constructor.name === "MessagePort";
}
function sO(e) {
  FT(e) && e.close();
}
function lO(e, t) {
  const r = new Map();
  return (
    e.addEventListener("message", function (i) {
      const { data: o } = i;
      if (!o || !o.id) return;
      const a = r.get(o.id);
      if (a)
        try {
          a(o);
        } finally {
          r.delete(o.id);
        }
    }),
    Id(e, r, [], t)
  );
}
function ds(e) {
  if (e) throw new Error("Proxy has been released and is not useable");
}
function cO(e) {
  return Mi(e, new Map(), { type: "RELEASE" }).then(() => {
    sO(e);
  });
}
const dl = new WeakMap(),
  hl =
    "FinalizationRegistry" in globalThis &&
    new FinalizationRegistry((e) => {
      const t = (dl.get(e) || 0) - 1;
      dl.set(e, t), t === 0 && cO(e);
    });
function BT(e, t) {
  const r = (dl.get(t) || 0) + 1;
  dl.set(t, r), hl && hl.register(e, t, e);
}
function zT(e) {
  hl && hl.unregister(e);
}
function Id(e, t, r = [], n = function () {}) {
  let i = !1;
  const o = new Proxy(n, {
    get(a, u) {
      if ((ds(i), u === NT))
        return () => {
          zT(o), cO(e), t.clear(), (i = !0);
        };
      if (u === "then") {
        if (r.length === 0) return { then: () => o };
        const s = Mi(e, t, {
          type: "GET",
          path: r.map((l) => l.toString()),
        }).then(Yn);
        return s.then.bind(s);
      }
      return Id(e, t, [...r, u]);
    },
    set(a, u, s) {
      ds(i);
      const [l, f] = vl(s);
      return Mi(
        e,
        t,
        { type: "SET", path: [...r, u].map((c) => c.toString()), value: l },
        f
      ).then(Yn);
    },
    apply(a, u, s) {
      ds(i);
      const l = r[r.length - 1];
      if (l === MT) return Mi(e, t, { type: "ENDPOINT" }).then(Yn);
      if (l === "bind") return Id(e, t, r.slice(0, -1));
      const [f, c] = Mg(s);
      return Mi(
        e,
        t,
        { type: "APPLY", path: r.map((p) => p.toString()), argumentList: f },
        c
      ).then(Yn);
    },
    construct(a, u) {
      ds(i);
      const [s, l] = Mg(u);
      return Mi(
        e,
        t,
        {
          type: "CONSTRUCT",
          path: r.map((f) => f.toString()),
          argumentList: s,
        },
        l
      ).then(Yn);
    },
  });
  return BT(o, e), o;
}
function UT(e) {
  return Array.prototype.concat.apply([], e);
}
function Mg(e) {
  const t = e.map(vl);
  return [t.map((r) => r[0]), UT(t.map((r) => r[1]))];
}
const fO = new WeakMap();
function WT(e, t) {
  return fO.set(e, t), e;
}
function HT(e) {
  return Object.assign(e, { [iO]: !0 });
}
function vl(e) {
  for (const [t, r] of aO)
    if (r.canHandle(e)) {
      const [n, i] = r.serialize(e);
      return [{ type: "HANDLER", name: t, value: n }, i];
    }
  return [{ type: "RAW", value: e }, fO.get(e) || []];
}
function Yn(e) {
  switch (e.type) {
    case "HANDLER":
      return aO.get(e.name).deserialize(e.value);
    case "RAW":
      return e.value;
  }
}
function Mi(e, t, r, n) {
  return new Promise((i) => {
    const o = GT();
    t.set(o, i),
      e.start && e.start(),
      e.postMessage(Object.assign({ id: o }, r), n);
  });
}
function GT() {
  return new Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
    .join("-");
}
var VT = Symbol("getEndpoint"),
  qT = (e) => {
    const t = lO(e);
    return new Proxy(t, {
      get(r, n, i) {
        return n === VT ? e : Reflect.get(r, n, i);
      },
    });
  };
function pO(e) {
  var t,
    r,
    n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var i = e.length;
      for (t = 0; t < i; t++)
        e[t] && (r = pO(e[t])) && (n && (n += " "), (n += r));
    } else for (r in e) e[r] && (n && (n += " "), (n += r));
  return n;
}
function se() {
  for (var e, t, r = 0, n = "", i = arguments.length; r < i; r++)
    (e = arguments[r]) && (t = pO(e)) && (n && (n += " "), (n += t));
  return n;
}
var KT = Array.isArray,
  Ft = KT,
  XT = typeof Xu == "object" && Xu && Xu.Object === Object && Xu,
  dO = XT,
  YT = dO,
  QT = typeof self == "object" && self && self.Object === Object && self,
  ZT = YT || QT || Function("return this")(),
  Nr = ZT,
  JT = Nr,
  e$ = JT.Symbol,
  Bu = e$,
  Ng = Bu,
  hO = Object.prototype,
  t$ = hO.hasOwnProperty,
  r$ = hO.toString,
  aa = Ng ? Ng.toStringTag : void 0;
function n$(e) {
  var t = t$.call(e, aa),
    r = e[aa];
  try {
    e[aa] = void 0;
    var n = !0;
  } catch {}
  var i = r$.call(e);
  return n && (t ? (e[aa] = r) : delete e[aa]), i;
}
var i$ = n$,
  o$ = Object.prototype,
  a$ = o$.toString;
function u$(e) {
  return a$.call(e);
}
var s$ = u$,
  Dg = Bu,
  l$ = i$,
  c$ = s$,
  f$ = "[object Null]",
  p$ = "[object Undefined]",
  Lg = Dg ? Dg.toStringTag : void 0;
function d$(e) {
  return e == null
    ? e === void 0
      ? p$
      : f$
    : Lg && Lg in Object(e)
      ? l$(e)
      : c$(e);
}
var nn = d$;
function h$(e) {
  return e != null && typeof e == "object";
}
var on = h$,
  v$ = nn,
  m$ = on,
  y$ = "[object Symbol]";
function g$(e) {
  return typeof e == "symbol" || (m$(e) && v$(e) == y$);
}
var Fo = g$,
  b$ = Ft,
  w$ = Fo,
  x$ = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  S$ = /^\w*$/;
function O$(e, t) {
  if (b$(e)) return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || w$(e)
    ? !0
    : S$.test(e) || !x$.test(e) || (t != null && e in Object(t));
}
var tm = O$;
function _$(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Dn = _$;
const Bo = he(Dn);
var P$ = nn,
  A$ = Dn,
  E$ = "[object AsyncFunction]",
  I$ = "[object Function]",
  T$ = "[object GeneratorFunction]",
  $$ = "[object Proxy]";
function C$(e) {
  if (!A$(e)) return !1;
  var t = P$(e);
  return t == I$ || t == T$ || t == E$ || t == $$;
}
var rm = C$;
const te = he(rm);
var k$ = Nr,
  j$ = k$["__core-js_shared__"],
  M$ = j$,
  tp = M$,
  Rg = (function () {
    var e = /[^.]+$/.exec((tp && tp.keys && tp.keys.IE_PROTO) || "");
    return e ? "Symbol(src)_1." + e : "";
  })();
function N$(e) {
  return !!Rg && Rg in e;
}
var D$ = N$,
  L$ = Function.prototype,
  R$ = L$.toString;
function F$(e) {
  if (e != null) {
    try {
      return R$.call(e);
    } catch {}
    try {
      return e + "";
    } catch {}
  }
  return "";
}
var vO = F$,
  B$ = rm,
  z$ = D$,
  U$ = Dn,
  W$ = vO,
  H$ = /[\\^$.*+?()[\]{}|]/g,
  G$ = /^\[object .+?Constructor\]$/,
  V$ = Function.prototype,
  q$ = Object.prototype,
  K$ = V$.toString,
  X$ = q$.hasOwnProperty,
  Y$ = RegExp(
    "^" +
      K$.call(X$)
        .replace(H$, "\\$&")
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          "$1.*?"
        ) +
      "$"
  );
function Q$(e) {
  if (!U$(e) || z$(e)) return !1;
  var t = B$(e) ? Y$ : G$;
  return t.test(W$(e));
}
var Z$ = Q$;
function J$(e, t) {
  return e == null ? void 0 : e[t];
}
var eC = J$,
  tC = Z$,
  rC = eC;
function nC(e, t) {
  var r = rC(e, t);
  return tC(r) ? r : void 0;
}
var _i = nC,
  iC = _i,
  oC = iC(Object, "create"),
  jc = oC,
  Fg = jc;
function aC() {
  (this.__data__ = Fg ? Fg(null) : {}), (this.size = 0);
}
var uC = aC;
function sC(e) {
  var t = this.has(e) && delete this.__data__[e];
  return (this.size -= t ? 1 : 0), t;
}
var lC = sC,
  cC = jc,
  fC = "__lodash_hash_undefined__",
  pC = Object.prototype,
  dC = pC.hasOwnProperty;
function hC(e) {
  var t = this.__data__;
  if (cC) {
    var r = t[e];
    return r === fC ? void 0 : r;
  }
  return dC.call(t, e) ? t[e] : void 0;
}
var vC = hC,
  mC = jc,
  yC = Object.prototype,
  gC = yC.hasOwnProperty;
function bC(e) {
  var t = this.__data__;
  return mC ? t[e] !== void 0 : gC.call(t, e);
}
var wC = bC,
  xC = jc,
  SC = "__lodash_hash_undefined__";
function OC(e, t) {
  var r = this.__data__;
  return (
    (this.size += this.has(e) ? 0 : 1),
    (r[e] = xC && t === void 0 ? SC : t),
    this
  );
}
var _C = OC,
  PC = uC,
  AC = lC,
  EC = vC,
  IC = wC,
  TC = _C;
function zo(e) {
  var t = -1,
    r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
zo.prototype.clear = PC;
zo.prototype.delete = AC;
zo.prototype.get = EC;
zo.prototype.has = IC;
zo.prototype.set = TC;
var $C = zo;
function CC() {
  (this.__data__ = []), (this.size = 0);
}
var kC = CC;
function jC(e, t) {
  return e === t || (e !== e && t !== t);
}
var nm = jC,
  MC = nm;
function NC(e, t) {
  for (var r = e.length; r--; ) if (MC(e[r][0], t)) return r;
  return -1;
}
var Mc = NC,
  DC = Mc,
  LC = Array.prototype,
  RC = LC.splice;
function FC(e) {
  var t = this.__data__,
    r = DC(t, e);
  if (r < 0) return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : RC.call(t, r, 1), --this.size, !0;
}
var BC = FC,
  zC = Mc;
function UC(e) {
  var t = this.__data__,
    r = zC(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var WC = UC,
  HC = Mc;
function GC(e) {
  return HC(this.__data__, e) > -1;
}
var VC = GC,
  qC = Mc;
function KC(e, t) {
  var r = this.__data__,
    n = qC(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
}
var XC = KC,
  YC = kC,
  QC = BC,
  ZC = WC,
  JC = VC,
  ek = XC;
function Uo(e) {
  var t = -1,
    r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Uo.prototype.clear = YC;
Uo.prototype.delete = QC;
Uo.prototype.get = ZC;
Uo.prototype.has = JC;
Uo.prototype.set = ek;
var Nc = Uo,
  tk = _i,
  rk = Nr,
  nk = tk(rk, "Map"),
  im = nk,
  Bg = $C,
  ik = Nc,
  ok = im;
function ak() {
  (this.size = 0),
    (this.__data__ = {
      hash: new Bg(),
      map: new (ok || ik)(),
      string: new Bg(),
    });
}
var uk = ak;
function sk(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean"
    ? e !== "__proto__"
    : e === null;
}
var lk = sk,
  ck = lk;
function fk(e, t) {
  var r = e.__data__;
  return ck(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var Dc = fk,
  pk = Dc;
function dk(e) {
  var t = pk(this, e).delete(e);
  return (this.size -= t ? 1 : 0), t;
}
var hk = dk,
  vk = Dc;
function mk(e) {
  return vk(this, e).get(e);
}
var yk = mk,
  gk = Dc;
function bk(e) {
  return gk(this, e).has(e);
}
var wk = bk,
  xk = Dc;
function Sk(e, t) {
  var r = xk(this, e),
    n = r.size;
  return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
}
var Ok = Sk,
  _k = uk,
  Pk = hk,
  Ak = yk,
  Ek = wk,
  Ik = Ok;
function Wo(e) {
  var t = -1,
    r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Wo.prototype.clear = _k;
Wo.prototype.delete = Pk;
Wo.prototype.get = Ak;
Wo.prototype.has = Ek;
Wo.prototype.set = Ik;
var om = Wo,
  mO = om,
  Tk = "Expected a function";
function am(e, t) {
  if (typeof e != "function" || (t != null && typeof t != "function"))
    throw new TypeError(Tk);
  var r = function () {
    var n = arguments,
      i = t ? t.apply(this, n) : n[0],
      o = r.cache;
    if (o.has(i)) return o.get(i);
    var a = e.apply(this, n);
    return (r.cache = o.set(i, a) || o), a;
  };
  return (r.cache = new (am.Cache || mO)()), r;
}
am.Cache = mO;
var yO = am;
const $k = he(yO);
var Ck = yO,
  kk = 500;
function jk(e) {
  var t = Ck(e, function (n) {
      return r.size === kk && r.clear(), n;
    }),
    r = t.cache;
  return t;
}
var Mk = jk,
  Nk = Mk,
  Dk =
    /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
  Lk = /\\(\\)?/g,
  Rk = Nk(function (e) {
    var t = [];
    return (
      e.charCodeAt(0) === 46 && t.push(""),
      e.replace(Dk, function (r, n, i, o) {
        t.push(i ? o.replace(Lk, "$1") : n || r);
      }),
      t
    );
  }),
  Fk = Rk;
function Bk(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; )
    i[r] = t(e[r], r, e);
  return i;
}
var um = Bk,
  zg = Bu,
  zk = um,
  Uk = Ft,
  Wk = Fo,
  Hk = 1 / 0,
  Ug = zg ? zg.prototype : void 0,
  Wg = Ug ? Ug.toString : void 0;
function gO(e) {
  if (typeof e == "string") return e;
  if (Uk(e)) return zk(e, gO) + "";
  if (Wk(e)) return Wg ? Wg.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -Hk ? "-0" : t;
}
var Gk = gO,
  Vk = Gk;
function qk(e) {
  return e == null ? "" : Vk(e);
}
var bO = qk,
  Kk = Ft,
  Xk = tm,
  Yk = Fk,
  Qk = bO;
function Zk(e, t) {
  return Kk(e) ? e : Xk(e, t) ? [e] : Yk(Qk(e));
}
var wO = Zk,
  Jk = Fo,
  ej = 1 / 0;
function tj(e) {
  if (typeof e == "string" || Jk(e)) return e;
  var t = e + "";
  return t == "0" && 1 / e == -ej ? "-0" : t;
}
var Lc = tj,
  rj = wO,
  nj = Lc;
function ij(e, t) {
  t = rj(t, e);
  for (var r = 0, n = t.length; e != null && r < n; ) e = e[nj(t[r++])];
  return r && r == n ? e : void 0;
}
var sm = ij,
  oj = sm;
function aj(e, t, r) {
  var n = e == null ? void 0 : oj(e, t);
  return n === void 0 ? r : n;
}
var xO = aj;
const ir = he(xO);
function uj(e) {
  return e == null;
}
var sj = uj;
const ue = he(sj);
var lj = nn,
  cj = Ft,
  fj = on,
  pj = "[object String]";
function dj(e) {
  return typeof e == "string" || (!cj(e) && fj(e) && lj(e) == pj);
}
var hj = dj;
const zu = he(hj);
var SO = { exports: {} },
  fe = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var lm = Symbol.for("react.element"),
  cm = Symbol.for("react.portal"),
  Rc = Symbol.for("react.fragment"),
  Fc = Symbol.for("react.strict_mode"),
  Bc = Symbol.for("react.profiler"),
  zc = Symbol.for("react.provider"),
  Uc = Symbol.for("react.context"),
  vj = Symbol.for("react.server_context"),
  Wc = Symbol.for("react.forward_ref"),
  Hc = Symbol.for("react.suspense"),
  Gc = Symbol.for("react.suspense_list"),
  Vc = Symbol.for("react.memo"),
  qc = Symbol.for("react.lazy"),
  mj = Symbol.for("react.offscreen"),
  OO;
OO = Symbol.for("react.module.reference");
function sr(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case lm:
        switch (((e = e.type), e)) {
          case Rc:
          case Bc:
          case Fc:
          case Hc:
          case Gc:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case vj:
              case Uc:
              case Wc:
              case qc:
              case Vc:
              case zc:
                return e;
              default:
                return t;
            }
        }
      case cm:
        return t;
    }
  }
}
fe.ContextConsumer = Uc;
fe.ContextProvider = zc;
fe.Element = lm;
fe.ForwardRef = Wc;
fe.Fragment = Rc;
fe.Lazy = qc;
fe.Memo = Vc;
fe.Portal = cm;
fe.Profiler = Bc;
fe.StrictMode = Fc;
fe.Suspense = Hc;
fe.SuspenseList = Gc;
fe.isAsyncMode = function () {
  return !1;
};
fe.isConcurrentMode = function () {
  return !1;
};
fe.isContextConsumer = function (e) {
  return sr(e) === Uc;
};
fe.isContextProvider = function (e) {
  return sr(e) === zc;
};
fe.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === lm;
};
fe.isForwardRef = function (e) {
  return sr(e) === Wc;
};
fe.isFragment = function (e) {
  return sr(e) === Rc;
};
fe.isLazy = function (e) {
  return sr(e) === qc;
};
fe.isMemo = function (e) {
  return sr(e) === Vc;
};
fe.isPortal = function (e) {
  return sr(e) === cm;
};
fe.isProfiler = function (e) {
  return sr(e) === Bc;
};
fe.isStrictMode = function (e) {
  return sr(e) === Fc;
};
fe.isSuspense = function (e) {
  return sr(e) === Hc;
};
fe.isSuspenseList = function (e) {
  return sr(e) === Gc;
};
fe.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === Rc ||
    e === Bc ||
    e === Fc ||
    e === Hc ||
    e === Gc ||
    e === mj ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === qc ||
        e.$$typeof === Vc ||
        e.$$typeof === zc ||
        e.$$typeof === Uc ||
        e.$$typeof === Wc ||
        e.$$typeof === OO ||
        e.getModuleId !== void 0))
  );
};
fe.typeOf = sr;
SO.exports = fe;
var yj = SO.exports,
  gj = nn,
  bj = on,
  wj = "[object Number]";
function xj(e) {
  return typeof e == "number" || (bj(e) && gj(e) == wj);
}
var _O = xj;
const Sj = he(_O);
var Oj = _O;
function _j(e) {
  return Oj(e) && e != +e;
}
var Pj = _j;
const Uu = he(Pj);
var yr = function (t) {
    return t === 0 ? 0 : t > 0 ? 1 : -1;
  },
  ei = function (t) {
    return zu(t) && t.indexOf("%") === t.length - 1;
  },
  W = function (t) {
    return Sj(t) && !Uu(t);
  },
  Ue = function (t) {
    return W(t) || zu(t);
  },
  Aj = 0,
  Kc = function (t) {
    var r = ++Aj;
    return "".concat(t || "").concat(r);
  },
  vi = function (t, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
      i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    if (!W(t) && !zu(t)) return n;
    var o;
    if (ei(t)) {
      var a = t.indexOf("%");
      o = (r * parseFloat(t.slice(0, a))) / 100;
    } else o = +t;
    return Uu(o) && (o = n), i && o > r && (o = r), o;
  },
  hn = function (t) {
    if (!t) return null;
    var r = Object.keys(t);
    return r && r.length ? t[r[0]] : null;
  },
  Ej = function (t) {
    if (!Array.isArray(t)) return !1;
    for (var r = t.length, n = {}, i = 0; i < r; i++)
      if (!n[t[i]]) n[t[i]] = !0;
      else return !0;
    return !1;
  },
  $i = function (t, r) {
    return W(t) && W(r)
      ? function (n) {
          return t + n * (r - t);
        }
      : function () {
          return r;
        };
  };
function Td(e, t, r) {
  return !e || !e.length
    ? null
    : e.find(function (n) {
        return n && (typeof t == "function" ? t(n) : ir(n, t)) === r;
      });
}
function ro(e, t) {
  for (var r in e)
    if (
      {}.hasOwnProperty.call(e, r) &&
      (!{}.hasOwnProperty.call(t, r) || e[r] !== t[r])
    )
      return !1;
  for (var n in t)
    if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n))
      return !1;
  return !0;
}
function $d(e) {
  "@babel/helpers - typeof";
  return (
    ($d =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    $d(e)
  );
}
var Ij = ["viewBox", "children"],
  Tj = [
    "aria-activedescendant",
    "aria-atomic",
    "aria-autocomplete",
    "aria-busy",
    "aria-checked",
    "aria-colcount",
    "aria-colindex",
    "aria-colspan",
    "aria-controls",
    "aria-current",
    "aria-describedby",
    "aria-details",
    "aria-disabled",
    "aria-errormessage",
    "aria-expanded",
    "aria-flowto",
    "aria-haspopup",
    "aria-hidden",
    "aria-invalid",
    "aria-keyshortcuts",
    "aria-label",
    "aria-labelledby",
    "aria-level",
    "aria-live",
    "aria-modal",
    "aria-multiline",
    "aria-multiselectable",
    "aria-orientation",
    "aria-owns",
    "aria-placeholder",
    "aria-posinset",
    "aria-pressed",
    "aria-readonly",
    "aria-relevant",
    "aria-required",
    "aria-roledescription",
    "aria-rowcount",
    "aria-rowindex",
    "aria-rowspan",
    "aria-selected",
    "aria-setsize",
    "aria-sort",
    "aria-valuemax",
    "aria-valuemin",
    "aria-valuenow",
    "aria-valuetext",
    "className",
    "color",
    "height",
    "id",
    "lang",
    "max",
    "media",
    "method",
    "min",
    "name",
    "style",
    "target",
    "width",
    "role",
    "tabIndex",
    "accentHeight",
    "accumulate",
    "additive",
    "alignmentBaseline",
    "allowReorder",
    "alphabetic",
    "amplitude",
    "arabicForm",
    "ascent",
    "attributeName",
    "attributeType",
    "autoReverse",
    "azimuth",
    "baseFrequency",
    "baselineShift",
    "baseProfile",
    "bbox",
    "begin",
    "bias",
    "by",
    "calcMode",
    "capHeight",
    "clip",
    "clipPath",
    "clipPathUnits",
    "clipRule",
    "colorInterpolation",
    "colorInterpolationFilters",
    "colorProfile",
    "colorRendering",
    "contentScriptType",
    "contentStyleType",
    "cursor",
    "cx",
    "cy",
    "d",
    "decelerate",
    "descent",
    "diffuseConstant",
    "direction",
    "display",
    "divisor",
    "dominantBaseline",
    "dur",
    "dx",
    "dy",
    "edgeMode",
    "elevation",
    "enableBackground",
    "end",
    "exponent",
    "externalResourcesRequired",
    "fill",
    "fillOpacity",
    "fillRule",
    "filter",
    "filterRes",
    "filterUnits",
    "floodColor",
    "floodOpacity",
    "focusable",
    "fontFamily",
    "fontSize",
    "fontSizeAdjust",
    "fontStretch",
    "fontStyle",
    "fontVariant",
    "fontWeight",
    "format",
    "from",
    "fx",
    "fy",
    "g1",
    "g2",
    "glyphName",
    "glyphOrientationHorizontal",
    "glyphOrientationVertical",
    "glyphRef",
    "gradientTransform",
    "gradientUnits",
    "hanging",
    "horizAdvX",
    "horizOriginX",
    "href",
    "ideographic",
    "imageRendering",
    "in2",
    "in",
    "intercept",
    "k1",
    "k2",
    "k3",
    "k4",
    "k",
    "kernelMatrix",
    "kernelUnitLength",
    "kerning",
    "keyPoints",
    "keySplines",
    "keyTimes",
    "lengthAdjust",
    "letterSpacing",
    "lightingColor",
    "limitingConeAngle",
    "local",
    "markerEnd",
    "markerHeight",
    "markerMid",
    "markerStart",
    "markerUnits",
    "markerWidth",
    "mask",
    "maskContentUnits",
    "maskUnits",
    "mathematical",
    "mode",
    "numOctaves",
    "offset",
    "opacity",
    "operator",
    "order",
    "orient",
    "orientation",
    "origin",
    "overflow",
    "overlinePosition",
    "overlineThickness",
    "paintOrder",
    "panose1",
    "pathLength",
    "patternContentUnits",
    "patternTransform",
    "patternUnits",
    "pointerEvents",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "preserveAlpha",
    "preserveAspectRatio",
    "primitiveUnits",
    "r",
    "radius",
    "refX",
    "refY",
    "renderingIntent",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "restart",
    "result",
    "rotate",
    "rx",
    "ry",
    "seed",
    "shapeRendering",
    "slope",
    "spacing",
    "specularConstant",
    "specularExponent",
    "speed",
    "spreadMethod",
    "startOffset",
    "stdDeviation",
    "stemh",
    "stemv",
    "stitchTiles",
    "stopColor",
    "stopOpacity",
    "strikethroughPosition",
    "strikethroughThickness",
    "string",
    "stroke",
    "strokeDasharray",
    "strokeDashoffset",
    "strokeLinecap",
    "strokeLinejoin",
    "strokeMiterlimit",
    "strokeOpacity",
    "strokeWidth",
    "surfaceScale",
    "systemLanguage",
    "tableValues",
    "targetX",
    "targetY",
    "textAnchor",
    "textDecoration",
    "textLength",
    "textRendering",
    "to",
    "transform",
    "u1",
    "u2",
    "underlinePosition",
    "underlineThickness",
    "unicode",
    "unicodeBidi",
    "unicodeRange",
    "unitsPerEm",
    "vAlphabetic",
    "values",
    "vectorEffect",
    "version",
    "vertAdvY",
    "vertOriginX",
    "vertOriginY",
    "vHanging",
    "vIdeographic",
    "viewTarget",
    "visibility",
    "vMathematical",
    "widths",
    "wordSpacing",
    "writingMode",
    "x1",
    "x2",
    "x",
    "xChannelSelector",
    "xHeight",
    "xlinkActuate",
    "xlinkArcrole",
    "xlinkHref",
    "xlinkRole",
    "xlinkShow",
    "xlinkTitle",
    "xlinkType",
    "xmlBase",
    "xmlLang",
    "xmlns",
    "xmlnsXlink",
    "xmlSpace",
    "y1",
    "y2",
    "y",
    "yChannelSelector",
    "z",
    "zoomAndPan",
    "ref",
    "key",
    "angle",
  ],
  Hg = ["points", "pathLength"],
  rp = { svg: Ij, polygon: Hg, polyline: Hg },
  fm = [
    "dangerouslySetInnerHTML",
    "onCopy",
    "onCopyCapture",
    "onCut",
    "onCutCapture",
    "onPaste",
    "onPasteCapture",
    "onCompositionEnd",
    "onCompositionEndCapture",
    "onCompositionStart",
    "onCompositionStartCapture",
    "onCompositionUpdate",
    "onCompositionUpdateCapture",
    "onFocus",
    "onFocusCapture",
    "onBlur",
    "onBlurCapture",
    "onChange",
    "onChangeCapture",
    "onBeforeInput",
    "onBeforeInputCapture",
    "onInput",
    "onInputCapture",
    "onReset",
    "onResetCapture",
    "onSubmit",
    "onSubmitCapture",
    "onInvalid",
    "onInvalidCapture",
    "onLoad",
    "onLoadCapture",
    "onError",
    "onErrorCapture",
    "onKeyDown",
    "onKeyDownCapture",
    "onKeyPress",
    "onKeyPressCapture",
    "onKeyUp",
    "onKeyUpCapture",
    "onAbort",
    "onAbortCapture",
    "onCanPlay",
    "onCanPlayCapture",
    "onCanPlayThrough",
    "onCanPlayThroughCapture",
    "onDurationChange",
    "onDurationChangeCapture",
    "onEmptied",
    "onEmptiedCapture",
    "onEncrypted",
    "onEncryptedCapture",
    "onEnded",
    "onEndedCapture",
    "onLoadedData",
    "onLoadedDataCapture",
    "onLoadedMetadata",
    "onLoadedMetadataCapture",
    "onLoadStart",
    "onLoadStartCapture",
    "onPause",
    "onPauseCapture",
    "onPlay",
    "onPlayCapture",
    "onPlaying",
    "onPlayingCapture",
    "onProgress",
    "onProgressCapture",
    "onRateChange",
    "onRateChangeCapture",
    "onSeeked",
    "onSeekedCapture",
    "onSeeking",
    "onSeekingCapture",
    "onStalled",
    "onStalledCapture",
    "onSuspend",
    "onSuspendCapture",
    "onTimeUpdate",
    "onTimeUpdateCapture",
    "onVolumeChange",
    "onVolumeChangeCapture",
    "onWaiting",
    "onWaitingCapture",
    "onAuxClick",
    "onAuxClickCapture",
    "onClick",
    "onClickCapture",
    "onContextMenu",
    "onContextMenuCapture",
    "onDoubleClick",
    "onDoubleClickCapture",
    "onDrag",
    "onDragCapture",
    "onDragEnd",
    "onDragEndCapture",
    "onDragEnter",
    "onDragEnterCapture",
    "onDragExit",
    "onDragExitCapture",
    "onDragLeave",
    "onDragLeaveCapture",
    "onDragOver",
    "onDragOverCapture",
    "onDragStart",
    "onDragStartCapture",
    "onDrop",
    "onDropCapture",
    "onMouseDown",
    "onMouseDownCapture",
    "onMouseEnter",
    "onMouseLeave",
    "onMouseMove",
    "onMouseMoveCapture",
    "onMouseOut",
    "onMouseOutCapture",
    "onMouseOver",
    "onMouseOverCapture",
    "onMouseUp",
    "onMouseUpCapture",
    "onSelect",
    "onSelectCapture",
    "onTouchCancel",
    "onTouchCancelCapture",
    "onTouchEnd",
    "onTouchEndCapture",
    "onTouchMove",
    "onTouchMoveCapture",
    "onTouchStart",
    "onTouchStartCapture",
    "onPointerDown",
    "onPointerDownCapture",
    "onPointerMove",
    "onPointerMoveCapture",
    "onPointerUp",
    "onPointerUpCapture",
    "onPointerCancel",
    "onPointerCancelCapture",
    "onPointerEnter",
    "onPointerEnterCapture",
    "onPointerLeave",
    "onPointerLeaveCapture",
    "onPointerOver",
    "onPointerOverCapture",
    "onPointerOut",
    "onPointerOutCapture",
    "onGotPointerCapture",
    "onGotPointerCaptureCapture",
    "onLostPointerCapture",
    "onLostPointerCaptureCapture",
    "onScroll",
    "onScrollCapture",
    "onWheel",
    "onWheelCapture",
    "onAnimationStart",
    "onAnimationStartCapture",
    "onAnimationEnd",
    "onAnimationEndCapture",
    "onAnimationIteration",
    "onAnimationIterationCapture",
    "onTransitionEnd",
    "onTransitionEndCapture",
  ],
  ml = function (t, r) {
    if (!t || typeof t == "function" || typeof t == "boolean") return null;
    var n = t;
    if ((z.isValidElement(t) && (n = t.props), !Bo(n))) return null;
    var i = {};
    return (
      Object.keys(n).forEach(function (o) {
        fm.includes(o) &&
          (i[o] =
            r ||
            function (a) {
              return n[o](n, a);
            });
      }),
      i
    );
  },
  $j = function (t, r, n) {
    return function (i) {
      return t(r, n, i), null;
    };
  },
  yl = function (t, r, n) {
    if (!Bo(t) || $d(t) !== "object") return null;
    var i = null;
    return (
      Object.keys(t).forEach(function (o) {
        var a = t[o];
        fm.includes(o) &&
          typeof a == "function" &&
          (i || (i = {}), (i[o] = $j(a, r, n)));
      }),
      i
    );
  },
  Cj = ["children"],
  kj = ["children"];
function Gg(e, t) {
  if (e == null) return {};
  var r = jj(e, t),
    n,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (n = o[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n]);
  }
  return r;
}
function jj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var Vg = {
    click: "onClick",
    mousedown: "onMouseDown",
    mouseup: "onMouseUp",
    mouseover: "onMouseOver",
    mousemove: "onMouseMove",
    mouseout: "onMouseOut",
    mouseenter: "onMouseEnter",
    mouseleave: "onMouseLeave",
    touchcancel: "onTouchCancel",
    touchend: "onTouchEnd",
    touchmove: "onTouchMove",
    touchstart: "onTouchStart",
  },
  Gr = function (t) {
    return typeof t == "string"
      ? t
      : t
        ? t.displayName || t.name || "Component"
        : "";
  },
  qg = null,
  np = null,
  pm = function e(t) {
    if (t === qg && Array.isArray(np)) return np;
    var r = [];
    return (
      z.Children.forEach(t, function (n) {
        ue(n) ||
          (yj.isFragment(n) ? (r = r.concat(e(n.props.children))) : r.push(n));
      }),
      (np = r),
      (qg = t),
      r
    );
  };
function wr(e, t) {
  var r = [],
    n = [];
  return (
    Array.isArray(t)
      ? (n = t.map(function (i) {
          return Gr(i);
        }))
      : (n = [Gr(t)]),
    pm(e).forEach(function (i) {
      var o = ir(i, "type.displayName") || ir(i, "type.name");
      n.indexOf(o) !== -1 && r.push(i);
    }),
    r
  );
}
function Ut(e, t) {
  var r = wr(e, t);
  return r && r[0];
}
var Kg = function (t) {
    if (!t || !t.props) return !1;
    var r = t.props,
      n = r.width,
      i = r.height;
    return !(!W(n) || n <= 0 || !W(i) || i <= 0);
  },
  Mj = [
    "a",
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animate",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "circle",
    "clipPath",
    "color-profile",
    "cursor",
    "defs",
    "desc",
    "ellipse",
    "feBlend",
    "feColormatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "filter",
    "font",
    "font-face",
    "font-face-format",
    "font-face-name",
    "font-face-url",
    "foreignObject",
    "g",
    "glyph",
    "glyphRef",
    "hkern",
    "image",
    "line",
    "lineGradient",
    "marker",
    "mask",
    "metadata",
    "missing-glyph",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "script",
    "set",
    "stop",
    "style",
    "svg",
    "switch",
    "symbol",
    "text",
    "textPath",
    "title",
    "tref",
    "tspan",
    "use",
    "view",
    "vkern",
  ],
  Nj = function (t) {
    return t && t.type && zu(t.type) && Mj.indexOf(t.type) >= 0;
  },
  Dj = function (t, r, n, i) {
    var o,
      a = (o = rp == null ? void 0 : rp[i]) !== null && o !== void 0 ? o : [];
    return (
      (!te(t) && ((i && a.includes(r)) || Tj.includes(r))) ||
      (n && fm.includes(r))
    );
  },
  ae = function (t, r, n) {
    if (!t || typeof t == "function" || typeof t == "boolean") return null;
    var i = t;
    if ((z.isValidElement(t) && (i = t.props), !Bo(i))) return null;
    var o = {};
    return (
      Object.keys(i).forEach(function (a) {
        var u;
        Dj((u = i) === null || u === void 0 ? void 0 : u[a], a, r, n) &&
          (o[a] = i[a]);
      }),
      o
    );
  },
  Cd = function e(t, r) {
    if (t === r) return !0;
    var n = z.Children.count(t);
    if (n !== z.Children.count(r)) return !1;
    if (n === 0) return !0;
    if (n === 1)
      return Xg(Array.isArray(t) ? t[0] : t, Array.isArray(r) ? r[0] : r);
    for (var i = 0; i < n; i++) {
      var o = t[i],
        a = r[i];
      if (Array.isArray(o) || Array.isArray(a)) {
        if (!e(o, a)) return !1;
      } else if (!Xg(o, a)) return !1;
    }
    return !0;
  },
  Xg = function (t, r) {
    if (ue(t) && ue(r)) return !0;
    if (!ue(t) && !ue(r)) {
      var n = t.props || {},
        i = n.children,
        o = Gg(n, Cj),
        a = r.props || {},
        u = a.children,
        s = Gg(a, kj);
      return i && u ? ro(o, s) && Cd(i, u) : !i && !u ? ro(o, s) : !1;
    }
    return !1;
  },
  Yg = function (t, r) {
    var n = [],
      i = {};
    return (
      pm(t).forEach(function (o, a) {
        if (Nj(o)) n.push(o);
        else if (o) {
          var u = Gr(o.type),
            s = r[u] || {},
            l = s.handler,
            f = s.once;
          if (l && (!f || !i[u])) {
            var c = l(o, u, a);
            n.push(c), (i[u] = !0);
          }
        }
      }),
      n
    );
  },
  Lj = function (t) {
    var r = t && t.type;
    return r && Vg[r] ? Vg[r] : null;
  },
  Rj = function (t, r) {
    return pm(r).indexOf(t);
  },
  Fj = [
    "children",
    "width",
    "height",
    "viewBox",
    "className",
    "style",
    "title",
    "desc",
  ];
function kd() {
  return (
    (kd = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    kd.apply(this, arguments)
  );
}
function Bj(e, t) {
  if (e == null) return {};
  var r = zj(e, t),
    n,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (n = o[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n]);
  }
  return r;
}
function zj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function jd(e) {
  var t = e.children,
    r = e.width,
    n = e.height,
    i = e.viewBox,
    o = e.className,
    a = e.style,
    u = e.title,
    s = e.desc,
    l = Bj(e, Fj),
    f = i || { width: r, height: n, x: 0, y: 0 },
    c = se("recharts-surface", o);
  return A.createElement(
    "svg",
    kd({}, ae(l, !0, "svg"), {
      className: c,
      width: r,
      height: n,
      style: a,
      viewBox: ""
        .concat(f.x, " ")
        .concat(f.y, " ")
        .concat(f.width, " ")
        .concat(f.height),
    }),
    A.createElement("title", null, u),
    A.createElement("desc", null, s),
    t
  );
}
var Uj = ["children", "className"];
function Md() {
  return (
    (Md = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Md.apply(this, arguments)
  );
}
function Wj(e, t) {
  if (e == null) return {};
  var r = Hj(e, t),
    n,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (n = o[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n]);
  }
  return r;
}
function Hj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var qe = A.forwardRef(function (e, t) {
    var r = e.children,
      n = e.className,
      i = Wj(e, Uj),
      o = se("recharts-layer", n);
    return A.createElement("g", Md({ className: o }, ae(i, !0), { ref: t }), r);
  }),
  Vr = function (t, r) {
    for (
      var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), o = 2;
      o < n;
      o++
    )
      i[o - 2] = arguments[o];
  };
function Gj(e, t, r) {
  var n = -1,
    i = e.length;
  t < 0 && (t = -t > i ? 0 : i + t),
    (r = r > i ? i : r),
    r < 0 && (r += i),
    (i = t > r ? 0 : (r - t) >>> 0),
    (t >>>= 0);
  for (var o = Array(i); ++n < i; ) o[n] = e[n + t];
  return o;
}
var Vj = Gj,
  qj = Vj;
function Kj(e, t, r) {
  var n = e.length;
  return (r = r === void 0 ? n : r), !t && r >= n ? e : qj(e, t, r);
}
var Xj = Kj,
  Yj = "\\ud800-\\udfff",
  Qj = "\\u0300-\\u036f",
  Zj = "\\ufe20-\\ufe2f",
  Jj = "\\u20d0-\\u20ff",
  eM = Qj + Zj + Jj,
  tM = "\\ufe0e\\ufe0f",
  rM = "\\u200d",
  nM = RegExp("[" + rM + Yj + eM + tM + "]");
function iM(e) {
  return nM.test(e);
}
var PO = iM;
function oM(e) {
  return e.split("");
}
var aM = oM,
  AO = "\\ud800-\\udfff",
  uM = "\\u0300-\\u036f",
  sM = "\\ufe20-\\ufe2f",
  lM = "\\u20d0-\\u20ff",
  cM = uM + sM + lM,
  fM = "\\ufe0e\\ufe0f",
  pM = "[" + AO + "]",
  Nd = "[" + cM + "]",
  Dd = "\\ud83c[\\udffb-\\udfff]",
  dM = "(?:" + Nd + "|" + Dd + ")",
  EO = "[^" + AO + "]",
  IO = "(?:\\ud83c[\\udde6-\\uddff]){2}",
  TO = "[\\ud800-\\udbff][\\udc00-\\udfff]",
  hM = "\\u200d",
  $O = dM + "?",
  CO = "[" + fM + "]?",
  vM = "(?:" + hM + "(?:" + [EO, IO, TO].join("|") + ")" + CO + $O + ")*",
  mM = CO + $O + vM,
  yM = "(?:" + [EO + Nd + "?", Nd, IO, TO, pM].join("|") + ")",
  gM = RegExp(Dd + "(?=" + Dd + ")|" + yM + mM, "g");
function bM(e) {
  return e.match(gM) || [];
}
var wM = bM,
  xM = aM,
  SM = PO,
  OM = wM;
function _M(e) {
  return SM(e) ? OM(e) : xM(e);
}
var PM = _M,
  AM = Xj,
  EM = PO,
  IM = PM,
  TM = bO;
function $M(e) {
  return function (t) {
    t = TM(t);
    var r = EM(t) ? IM(t) : void 0,
      n = r ? r[0] : t.charAt(0),
      i = r ? AM(r, 1).join("") : t.slice(1);
    return n[e]() + i;
  };
}
var CM = $M,
  kM = CM,
  jM = kM("toUpperCase"),
  MM = jM;
const Xc = he(MM);
function me(e) {
  return function () {
    return e;
  };
}
const kO = Math.cos,
  gl = Math.sin,
  Or = Math.sqrt,
  bl = Math.PI,
  Yc = 2 * bl,
  Ld = Math.PI,
  Rd = 2 * Ld,
  qn = 1e-6,
  NM = Rd - qn;
function jO(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t) this._ += arguments[t] + e[t];
}
function DM(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return jO;
  const r = 10 ** t;
  return function (n) {
    this._ += n[0];
    for (let i = 1, o = n.length; i < o; ++i)
      this._ += Math.round(arguments[i] * r) / r + n[i];
  };
}
class LM {
  constructor(t) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = t == null ? jO : DM(t));
  }
  moveTo(t, r) {
    this._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +r)}`;
  }
  closePath() {
    this._x1 !== null &&
      ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
  }
  lineTo(t, r) {
    this._append`L${(this._x1 = +t)},${(this._y1 = +r)}`;
  }
  quadraticCurveTo(t, r, n, i) {
    this._append`Q${+t},${+r},${(this._x1 = +n)},${(this._y1 = +i)}`;
  }
  bezierCurveTo(t, r, n, i, o, a) {
    this
      ._append`C${+t},${+r},${+n},${+i},${(this._x1 = +o)},${(this._y1 = +a)}`;
  }
  arcTo(t, r, n, i, o) {
    if (((t = +t), (r = +r), (n = +n), (i = +i), (o = +o), o < 0))
      throw new Error(`negative radius: ${o}`);
    let a = this._x1,
      u = this._y1,
      s = n - t,
      l = i - r,
      f = a - t,
      c = u - r,
      p = f * f + c * c;
    if (this._x1 === null) this._append`M${(this._x1 = t)},${(this._y1 = r)}`;
    else if (p > qn)
      if (!(Math.abs(c * s - l * f) > qn) || !o)
        this._append`L${(this._x1 = t)},${(this._y1 = r)}`;
      else {
        let d = n - a,
          h = i - u,
          y = s * s + l * l,
          w = d * d + h * h,
          m = Math.sqrt(y),
          v = Math.sqrt(p),
          g = o * Math.tan((Ld - Math.acos((y + p - w) / (2 * m * v))) / 2),
          S = g / v,
          b = g / m;
        Math.abs(S - 1) > qn && this._append`L${t + S * f},${r + S * c}`,
          this
            ._append`A${o},${o},0,0,${+(c * d > f * h)},${(this._x1 = t + b * s)},${(this._y1 = r + b * l)}`;
      }
  }
  arc(t, r, n, i, o, a) {
    if (((t = +t), (r = +r), (n = +n), (a = !!a), n < 0))
      throw new Error(`negative radius: ${n}`);
    let u = n * Math.cos(i),
      s = n * Math.sin(i),
      l = t + u,
      f = r + s,
      c = 1 ^ a,
      p = a ? i - o : o - i;
    this._x1 === null
      ? this._append`M${l},${f}`
      : (Math.abs(this._x1 - l) > qn || Math.abs(this._y1 - f) > qn) &&
        this._append`L${l},${f}`,
      n &&
        (p < 0 && (p = (p % Rd) + Rd),
        p > NM
          ? this
              ._append`A${n},${n},0,1,${c},${t - u},${r - s}A${n},${n},0,1,${c},${(this._x1 = l)},${(this._y1 = f)}`
          : p > qn &&
            this
              ._append`A${n},${n},0,${+(p >= Ld)},${c},${(this._x1 = t + n * Math.cos(o))},${(this._y1 = r + n * Math.sin(o))}`);
  }
  rect(t, r, n, i) {
    this
      ._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +r)}h${(n = +n)}v${+i}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function dm(e) {
  let t = 3;
  return (
    (e.digits = function (r) {
      if (!arguments.length) return t;
      if (r == null) t = null;
      else {
        const n = Math.floor(r);
        if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`);
        t = n;
      }
      return e;
    }),
    () => new LM(t)
  );
}
function hm(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function MO(e) {
  this._context = e;
}
MO.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    (this._line || (this._line !== 0 && this._point === 1)) &&
      this._context.closePath(),
      (this._line = 1 - this._line);
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        (this._point = 1),
          this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(e, t);
        break;
    }
  },
};
function Qc(e) {
  return new MO(e);
}
function NO(e) {
  return e[0];
}
function DO(e) {
  return e[1];
}
function LO(e, t) {
  var r = me(!0),
    n = null,
    i = Qc,
    o = null,
    a = dm(u);
  (e = typeof e == "function" ? e : e === void 0 ? NO : me(e)),
    (t = typeof t == "function" ? t : t === void 0 ? DO : me(t));
  function u(s) {
    var l,
      f = (s = hm(s)).length,
      c,
      p = !1,
      d;
    for (n == null && (o = i((d = a()))), l = 0; l <= f; ++l)
      !(l < f && r((c = s[l]), l, s)) === p &&
        ((p = !p) ? o.lineStart() : o.lineEnd()),
        p && o.point(+e(c, l, s), +t(c, l, s));
    if (d) return (o = null), d + "" || null;
  }
  return (
    (u.x = function (s) {
      return arguments.length
        ? ((e = typeof s == "function" ? s : me(+s)), u)
        : e;
    }),
    (u.y = function (s) {
      return arguments.length
        ? ((t = typeof s == "function" ? s : me(+s)), u)
        : t;
    }),
    (u.defined = function (s) {
      return arguments.length
        ? ((r = typeof s == "function" ? s : me(!!s)), u)
        : r;
    }),
    (u.curve = function (s) {
      return arguments.length ? ((i = s), n != null && (o = i(n)), u) : i;
    }),
    (u.context = function (s) {
      return arguments.length
        ? (s == null ? (n = o = null) : (o = i((n = s))), u)
        : n;
    }),
    u
  );
}
function hs(e, t, r) {
  var n = null,
    i = me(!0),
    o = null,
    a = Qc,
    u = null,
    s = dm(l);
  (e = typeof e == "function" ? e : e === void 0 ? NO : me(+e)),
    (t = typeof t == "function" ? t : me(t === void 0 ? 0 : +t)),
    (r = typeof r == "function" ? r : r === void 0 ? DO : me(+r));
  function l(c) {
    var p,
      d,
      h,
      y = (c = hm(c)).length,
      w,
      m = !1,
      v,
      g = new Array(y),
      S = new Array(y);
    for (o == null && (u = a((v = s()))), p = 0; p <= y; ++p) {
      if (!(p < y && i((w = c[p]), p, c)) === m)
        if ((m = !m)) (d = p), u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), h = p - 1; h >= d; --h)
            u.point(g[h], S[h]);
          u.lineEnd(), u.areaEnd();
        }
      m &&
        ((g[p] = +e(w, p, c)),
        (S[p] = +t(w, p, c)),
        u.point(n ? +n(w, p, c) : g[p], r ? +r(w, p, c) : S[p]));
    }
    if (v) return (u = null), v + "" || null;
  }
  function f() {
    return LO().defined(i).curve(a).context(o);
  }
  return (
    (l.x = function (c) {
      return arguments.length
        ? ((e = typeof c == "function" ? c : me(+c)), (n = null), l)
        : e;
    }),
    (l.x0 = function (c) {
      return arguments.length
        ? ((e = typeof c == "function" ? c : me(+c)), l)
        : e;
    }),
    (l.x1 = function (c) {
      return arguments.length
        ? ((n = c == null ? null : typeof c == "function" ? c : me(+c)), l)
        : n;
    }),
    (l.y = function (c) {
      return arguments.length
        ? ((t = typeof c == "function" ? c : me(+c)), (r = null), l)
        : t;
    }),
    (l.y0 = function (c) {
      return arguments.length
        ? ((t = typeof c == "function" ? c : me(+c)), l)
        : t;
    }),
    (l.y1 = function (c) {
      return arguments.length
        ? ((r = c == null ? null : typeof c == "function" ? c : me(+c)), l)
        : r;
    }),
    (l.lineX0 = l.lineY0 =
      function () {
        return f().x(e).y(t);
      }),
    (l.lineY1 = function () {
      return f().x(e).y(r);
    }),
    (l.lineX1 = function () {
      return f().x(n).y(t);
    }),
    (l.defined = function (c) {
      return arguments.length
        ? ((i = typeof c == "function" ? c : me(!!c)), l)
        : i;
    }),
    (l.curve = function (c) {
      return arguments.length ? ((a = c), o != null && (u = a(o)), l) : a;
    }),
    (l.context = function (c) {
      return arguments.length
        ? (c == null ? (o = u = null) : (u = a((o = c))), l)
        : o;
    }),
    l
  );
}
class RO {
  constructor(t, r) {
    (this._context = t), (this._x = r);
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || (this._line !== 0 && this._point === 1)) &&
      this._context.closePath(),
      (this._line = 1 - this._line);
  }
  point(t, r) {
    switch (((t = +t), (r = +r), this._point)) {
      case 0: {
        (this._point = 1),
          this._line ? this._context.lineTo(t, r) : this._context.moveTo(t, r);
        break;
      }
      case 1:
        this._point = 2;
      default: {
        this._x
          ? this._context.bezierCurveTo(
              (this._x0 = (this._x0 + t) / 2),
              this._y0,
              this._x0,
              r,
              t,
              r
            )
          : this._context.bezierCurveTo(
              this._x0,
              (this._y0 = (this._y0 + r) / 2),
              t,
              this._y0,
              t,
              r
            );
        break;
      }
    }
    (this._x0 = t), (this._y0 = r);
  }
}
function RM(e) {
  return new RO(e, !0);
}
function FM(e) {
  return new RO(e, !1);
}
const vm = {
    draw(e, t) {
      const r = Or(t / bl);
      e.moveTo(r, 0), e.arc(0, 0, r, 0, Yc);
    },
  },
  BM = {
    draw(e, t) {
      const r = Or(t / 5) / 2;
      e.moveTo(-3 * r, -r),
        e.lineTo(-r, -r),
        e.lineTo(-r, -3 * r),
        e.lineTo(r, -3 * r),
        e.lineTo(r, -r),
        e.lineTo(3 * r, -r),
        e.lineTo(3 * r, r),
        e.lineTo(r, r),
        e.lineTo(r, 3 * r),
        e.lineTo(-r, 3 * r),
        e.lineTo(-r, r),
        e.lineTo(-3 * r, r),
        e.closePath();
    },
  },
  FO = Or(1 / 3),
  zM = FO * 2,
  UM = {
    draw(e, t) {
      const r = Or(t / zM),
        n = r * FO;
      e.moveTo(0, -r),
        e.lineTo(n, 0),
        e.lineTo(0, r),
        e.lineTo(-n, 0),
        e.closePath();
    },
  },
  WM = {
    draw(e, t) {
      const r = Or(t),
        n = -r / 2;
      e.rect(n, n, r, r);
    },
  },
  HM = 0.8908130915292852,
  BO = gl(bl / 10) / gl((7 * bl) / 10),
  GM = gl(Yc / 10) * BO,
  VM = -kO(Yc / 10) * BO,
  qM = {
    draw(e, t) {
      const r = Or(t * HM),
        n = GM * r,
        i = VM * r;
      e.moveTo(0, -r), e.lineTo(n, i);
      for (let o = 1; o < 5; ++o) {
        const a = (Yc * o) / 5,
          u = kO(a),
          s = gl(a);
        e.lineTo(s * r, -u * r), e.lineTo(u * n - s * i, s * n + u * i);
      }
      e.closePath();
    },
  },
  ip = Or(3),
  KM = {
    draw(e, t) {
      const r = -Or(t / (ip * 3));
      e.moveTo(0, r * 2),
        e.lineTo(-ip * r, -r),
        e.lineTo(ip * r, -r),
        e.closePath();
    },
  },
  Yt = -0.5,
  Qt = Or(3) / 2,
  Fd = 1 / Or(12),
  XM = (Fd / 2 + 1) * 3,
  YM = {
    draw(e, t) {
      const r = Or(t / XM),
        n = r / 2,
        i = r * Fd,
        o = n,
        a = r * Fd + r,
        u = -o,
        s = a;
      e.moveTo(n, i),
        e.lineTo(o, a),
        e.lineTo(u, s),
        e.lineTo(Yt * n - Qt * i, Qt * n + Yt * i),
        e.lineTo(Yt * o - Qt * a, Qt * o + Yt * a),
        e.lineTo(Yt * u - Qt * s, Qt * u + Yt * s),
        e.lineTo(Yt * n + Qt * i, Yt * i - Qt * n),
        e.lineTo(Yt * o + Qt * a, Yt * a - Qt * o),
        e.lineTo(Yt * u + Qt * s, Yt * s - Qt * u),
        e.closePath();
    },
  };
function QM(e, t) {
  let r = null,
    n = dm(i);
  (e = typeof e == "function" ? e : me(e || vm)),
    (t = typeof t == "function" ? t : me(t === void 0 ? 64 : +t));
  function i() {
    let o;
    if (
      (r || (r = o = n()),
      e.apply(this, arguments).draw(r, +t.apply(this, arguments)),
      o)
    )
      return (r = null), o + "" || null;
  }
  return (
    (i.type = function (o) {
      return arguments.length
        ? ((e = typeof o == "function" ? o : me(o)), i)
        : e;
    }),
    (i.size = function (o) {
      return arguments.length
        ? ((t = typeof o == "function" ? o : me(+o)), i)
        : t;
    }),
    (i.context = function (o) {
      return arguments.length ? ((r = o ?? null), i) : r;
    }),
    i
  );
}
function wl() {}
function xl(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function zO(e) {
  this._context = e;
}
zO.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    (this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
  },
  lineEnd: function () {
    switch (this._point) {
      case 3:
        xl(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || (this._line !== 0 && this._point === 1)) &&
      this._context.closePath(),
      (this._line = 1 - this._line);
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        (this._point = 1),
          this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        (this._point = 3),
          this._context.lineTo(
            (5 * this._x0 + this._x1) / 6,
            (5 * this._y0 + this._y1) / 6
          );
      default:
        xl(this, e, t);
        break;
    }
    (this._x0 = this._x1),
      (this._x1 = e),
      (this._y0 = this._y1),
      (this._y1 = t);
  },
};
function ZM(e) {
  return new zO(e);
}
function UO(e) {
  this._context = e;
}
UO.prototype = {
  areaStart: wl,
  areaEnd: wl,
  lineStart: function () {
    (this._x0 =
      this._x1 =
      this._x2 =
      this._x3 =
      this._x4 =
      this._y0 =
      this._y1 =
      this._y2 =
      this._y3 =
      this._y4 =
        NaN),
      (this._point = 0);
  },
  lineEnd: function () {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo(
          (this._x2 + 2 * this._x3) / 3,
          (this._y2 + 2 * this._y3) / 3
        ),
          this._context.lineTo(
            (this._x3 + 2 * this._x2) / 3,
            (this._y3 + 2 * this._y2) / 3
          ),
          this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2),
          this.point(this._x3, this._y3),
          this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        (this._point = 1), (this._x2 = e), (this._y2 = t);
        break;
      case 1:
        (this._point = 2), (this._x3 = e), (this._y3 = t);
        break;
      case 2:
        (this._point = 3),
          (this._x4 = e),
          (this._y4 = t),
          this._context.moveTo(
            (this._x0 + 4 * this._x1 + e) / 6,
            (this._y0 + 4 * this._y1 + t) / 6
          );
        break;
      default:
        xl(this, e, t);
        break;
    }
    (this._x0 = this._x1),
      (this._x1 = e),
      (this._y0 = this._y1),
      (this._y1 = t);
  },
};
function JM(e) {
  return new UO(e);
}
function WO(e) {
  this._context = e;
}
WO.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    (this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
  },
  lineEnd: function () {
    (this._line || (this._line !== 0 && this._point === 3)) &&
      this._context.closePath(),
      (this._line = 1 - this._line);
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var r = (this._x0 + 4 * this._x1 + e) / 6,
          n = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(r, n) : this._context.moveTo(r, n);
        break;
      case 3:
        this._point = 4;
      default:
        xl(this, e, t);
        break;
    }
    (this._x0 = this._x1),
      (this._x1 = e),
      (this._y0 = this._y1),
      (this._y1 = t);
  },
};
function eN(e) {
  return new WO(e);
}
function HO(e) {
  this._context = e;
}
HO.prototype = {
  areaStart: wl,
  areaEnd: wl,
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    this._point && this._context.closePath();
  },
  point: function (e, t) {
    (e = +e),
      (t = +t),
      this._point
        ? this._context.lineTo(e, t)
        : ((this._point = 1), this._context.moveTo(e, t));
  },
};
function tN(e) {
  return new HO(e);
}
function Qg(e) {
  return e < 0 ? -1 : 1;
}
function Zg(e, t, r) {
  var n = e._x1 - e._x0,
    i = t - e._x1,
    o = (e._y1 - e._y0) / (n || (i < 0 && -0)),
    a = (r - e._y1) / (i || (n < 0 && -0)),
    u = (o * i + a * n) / (n + i);
  return (
    (Qg(o) + Qg(a)) * Math.min(Math.abs(o), Math.abs(a), 0.5 * Math.abs(u)) || 0
  );
}
function Jg(e, t) {
  var r = e._x1 - e._x0;
  return r ? ((3 * (e._y1 - e._y0)) / r - t) / 2 : t;
}
function op(e, t, r) {
  var n = e._x0,
    i = e._y0,
    o = e._x1,
    a = e._y1,
    u = (o - n) / 3;
  e._context.bezierCurveTo(n + u, i + u * t, o - u, a - u * r, o, a);
}
function Sl(e) {
  this._context = e;
}
Sl.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    (this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN),
      (this._point = 0);
  },
  lineEnd: function () {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        op(this, this._t0, Jg(this, this._t0));
        break;
    }
    (this._line || (this._line !== 0 && this._point === 1)) &&
      this._context.closePath(),
      (this._line = 1 - this._line);
  },
  point: function (e, t) {
    var r = NaN;
    if (((e = +e), (t = +t), !(e === this._x1 && t === this._y1))) {
      switch (this._point) {
        case 0:
          (this._point = 1),
            this._line
              ? this._context.lineTo(e, t)
              : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          (this._point = 3), op(this, Jg(this, (r = Zg(this, e, t))), r);
          break;
        default:
          op(this, this._t0, (r = Zg(this, e, t)));
          break;
      }
      (this._x0 = this._x1),
        (this._x1 = e),
        (this._y0 = this._y1),
        (this._y1 = t),
        (this._t0 = r);
    }
  },
};
function GO(e) {
  this._context = new VO(e);
}
(GO.prototype = Object.create(Sl.prototype)).point = function (e, t) {
  Sl.prototype.point.call(this, t, e);
};
function VO(e) {
  this._context = e;
}
VO.prototype = {
  moveTo: function (e, t) {
    this._context.moveTo(t, e);
  },
  closePath: function () {
    this._context.closePath();
  },
  lineTo: function (e, t) {
    this._context.lineTo(t, e);
  },
  bezierCurveTo: function (e, t, r, n, i, o) {
    this._context.bezierCurveTo(t, e, n, r, o, i);
  },
};
function rN(e) {
  return new Sl(e);
}
function nN(e) {
  return new GO(e);
}
function qO(e) {
  this._context = e;
}
qO.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    (this._x = []), (this._y = []);
  },
  lineEnd: function () {
    var e = this._x,
      t = this._y,
      r = e.length;
    if (r)
      if (
        (this._line
          ? this._context.lineTo(e[0], t[0])
          : this._context.moveTo(e[0], t[0]),
        r === 2)
      )
        this._context.lineTo(e[1], t[1]);
      else
        for (var n = e0(e), i = e0(t), o = 0, a = 1; a < r; ++o, ++a)
          this._context.bezierCurveTo(
            n[0][o],
            i[0][o],
            n[1][o],
            i[1][o],
            e[a],
            t[a]
          );
    (this._line || (this._line !== 0 && r === 1)) && this._context.closePath(),
      (this._line = 1 - this._line),
      (this._x = this._y = null);
  },
  point: function (e, t) {
    this._x.push(+e), this._y.push(+t);
  },
};
function e0(e) {
  var t,
    r = e.length - 1,
    n,
    i = new Array(r),
    o = new Array(r),
    a = new Array(r);
  for (i[0] = 0, o[0] = 2, a[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t)
    (i[t] = 1), (o[t] = 4), (a[t] = 4 * e[t] + 2 * e[t + 1]);
  for (
    i[r - 1] = 2, o[r - 1] = 7, a[r - 1] = 8 * e[r - 1] + e[r], t = 1;
    t < r;
    ++t
  )
    (n = i[t] / o[t - 1]), (o[t] -= n), (a[t] -= n * a[t - 1]);
  for (i[r - 1] = a[r - 1] / o[r - 1], t = r - 2; t >= 0; --t)
    i[t] = (a[t] - i[t + 1]) / o[t];
  for (o[r - 1] = (e[r] + i[r - 1]) / 2, t = 0; t < r - 1; ++t)
    o[t] = 2 * e[t + 1] - i[t + 1];
  return [i, o];
}
function iN(e) {
  return new qO(e);
}
function Zc(e, t) {
  (this._context = e), (this._t = t);
}
Zc.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    (this._x = this._y = NaN), (this._point = 0);
  },
  lineEnd: function () {
    0 < this._t &&
      this._t < 1 &&
      this._point === 2 &&
      this._context.lineTo(this._x, this._y),
      (this._line || (this._line !== 0 && this._point === 1)) &&
        this._context.closePath(),
      this._line >= 0 &&
        ((this._t = 1 - this._t), (this._line = 1 - this._line));
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        (this._point = 1),
          this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default: {
        if (this._t <= 0)
          this._context.lineTo(this._x, t), this._context.lineTo(e, t);
        else {
          var r = this._x * (1 - this._t) + e * this._t;
          this._context.lineTo(r, this._y), this._context.lineTo(r, t);
        }
        break;
      }
    }
    (this._x = e), (this._y = t);
  },
};
function oN(e) {
  return new Zc(e, 0.5);
}
function aN(e) {
  return new Zc(e, 0);
}
function uN(e) {
  return new Zc(e, 1);
}
function ho(e, t) {
  if ((a = e.length) > 1)
    for (var r = 1, n, i, o = e[t[0]], a, u = o.length; r < a; ++r)
      for (i = o, o = e[t[r]], n = 0; n < u; ++n)
        o[n][1] += o[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1];
}
function Bd(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
  return r;
}
function sN(e, t) {
  return e[t];
}
function lN(e) {
  const t = [];
  return (t.key = e), t;
}
function cN() {
  var e = me([]),
    t = Bd,
    r = ho,
    n = sN;
  function i(o) {
    var a = Array.from(e.apply(this, arguments), lN),
      u,
      s = a.length,
      l = -1,
      f;
    for (const c of o)
      for (u = 0, ++l; u < s; ++u)
        (a[u][l] = [0, +n(c, a[u].key, l, o)]).data = c;
    for (u = 0, f = hm(t(a)); u < s; ++u) a[f[u]].index = u;
    return r(a, f), a;
  }
  return (
    (i.keys = function (o) {
      return arguments.length
        ? ((e = typeof o == "function" ? o : me(Array.from(o))), i)
        : e;
    }),
    (i.value = function (o) {
      return arguments.length
        ? ((n = typeof o == "function" ? o : me(+o)), i)
        : n;
    }),
    (i.order = function (o) {
      return arguments.length
        ? ((t =
            o == null ? Bd : typeof o == "function" ? o : me(Array.from(o))),
          i)
        : t;
    }),
    (i.offset = function (o) {
      return arguments.length ? ((r = o ?? ho), i) : r;
    }),
    i
  );
}
function fN(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, i = 0, o = e[0].length, a; i < o; ++i) {
      for (a = r = 0; r < n; ++r) a += e[r][i][1] || 0;
      if (a) for (r = 0; r < n; ++r) e[r][i][1] /= a;
    }
    ho(e, t);
  }
}
function pN(e, t) {
  if ((i = e.length) > 0) {
    for (var r = 0, n = e[t[0]], i, o = n.length; r < o; ++r) {
      for (var a = 0, u = 0; a < i; ++a) u += e[a][r][1] || 0;
      n[r][1] += n[r][0] = -u / 2;
    }
    ho(e, t);
  }
}
function dN(e, t) {
  if (!(!((a = e.length) > 0) || !((o = (i = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, i, o, a; n < o; ++n) {
      for (var u = 0, s = 0, l = 0; u < a; ++u) {
        for (
          var f = e[t[u]],
            c = f[n][1] || 0,
            p = f[n - 1][1] || 0,
            d = (c - p) / 2,
            h = 0;
          h < u;
          ++h
        ) {
          var y = e[t[h]],
            w = y[n][1] || 0,
            m = y[n - 1][1] || 0;
          d += w - m;
        }
        (s += c), (l += d * c);
      }
      (i[n - 1][1] += i[n - 1][0] = r), s && (r -= l / s);
    }
    (i[n - 1][1] += i[n - 1][0] = r), ho(e, t);
  }
}
function eu(e) {
  "@babel/helpers - typeof";
  return (
    (eu =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    eu(e)
  );
}
var hN = ["type", "size", "sizeType"];
function zd() {
  return (
    (zd = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    zd.apply(this, arguments)
  );
}
function t0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function r0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? t0(Object(r), !0).forEach(function (n) {
          vN(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : t0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function vN(e, t, r) {
  return (
    (t = mN(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function mN(e) {
  var t = yN(e, "string");
  return eu(t) == "symbol" ? t : t + "";
}
function yN(e, t) {
  if (eu(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (eu(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function gN(e, t) {
  if (e == null) return {};
  var r = bN(e, t),
    n,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (n = o[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n]);
  }
  return r;
}
function bN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var KO = {
    symbolCircle: vm,
    symbolCross: BM,
    symbolDiamond: UM,
    symbolSquare: WM,
    symbolStar: qM,
    symbolTriangle: KM,
    symbolWye: YM,
  },
  wN = Math.PI / 180,
  xN = function (t) {
    var r = "symbol".concat(Xc(t));
    return KO[r] || vm;
  },
  SN = function (t, r, n) {
    if (r === "area") return t;
    switch (n) {
      case "cross":
        return (5 * t * t) / 9;
      case "diamond":
        return (0.5 * t * t) / Math.sqrt(3);
      case "square":
        return t * t;
      case "star": {
        var i = 18 * wN;
        return (
          1.25 *
          t *
          t *
          (Math.tan(i) - Math.tan(i * 2) * Math.pow(Math.tan(i), 2))
        );
      }
      case "triangle":
        return (Math.sqrt(3) * t * t) / 4;
      case "wye":
        return ((21 - 10 * Math.sqrt(3)) * t * t) / 8;
      default:
        return (Math.PI * t * t) / 4;
    }
  },
  ON = function (t, r) {
    KO["symbol".concat(Xc(t))] = r;
  },
  mm = function (t) {
    var r = t.type,
      n = r === void 0 ? "circle" : r,
      i = t.size,
      o = i === void 0 ? 64 : i,
      a = t.sizeType,
      u = a === void 0 ? "area" : a,
      s = gN(t, hN),
      l = r0(r0({}, s), {}, { type: n, size: o, sizeType: u }),
      f = function () {
        var w = xN(n),
          m = QM()
            .type(w)
            .size(SN(o, u, n));
        return m();
      },
      c = l.className,
      p = l.cx,
      d = l.cy,
      h = ae(l, !0);
    return p === +p && d === +d && o === +o
      ? A.createElement(
          "path",
          zd({}, h, {
            className: se("recharts-symbols", c),
            transform: "translate(".concat(p, ", ").concat(d, ")"),
            d: f(),
          })
        )
      : null;
  };
mm.registerSymbol = ON;
function vo(e) {
  "@babel/helpers - typeof";
  return (
    (vo =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    vo(e)
  );
}
function Ud() {
  return (
    (Ud = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Ud.apply(this, arguments)
  );
}
function n0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function _N(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? n0(Object(r), !0).forEach(function (n) {
          tu(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : n0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function PN(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function AN(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, YO(n.key), n);
  }
}
function EN(e, t, r) {
  return (
    t && AN(e.prototype, t),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function IN(e, t, r) {
  return (
    (t = Ol(t)),
    TN(
      e,
      XO() ? Reflect.construct(t, r || [], Ol(e).constructor) : t.apply(e, r)
    )
  );
}
function TN(e, t) {
  if (t && (vo(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return $N(e);
}
function $N(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function XO() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch {}
  return (XO = function () {
    return !!e;
  })();
}
function Ol(e) {
  return (
    (Ol = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }),
    Ol(e)
  );
}
function CN(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && Wd(e, t);
}
function Wd(e, t) {
  return (
    (Wd = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n;
        }),
    Wd(e, t)
  );
}
function tu(e, t, r) {
  return (
    (t = YO(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function YO(e) {
  var t = kN(e, "string");
  return vo(t) == "symbol" ? t : t + "";
}
function kN(e, t) {
  if (vo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (vo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Zt = 32,
  ym = (function (e) {
    function t() {
      return PN(this, t), IN(this, t, arguments);
    }
    return (
      CN(t, e),
      EN(t, [
        {
          key: "renderIcon",
          value: function (n) {
            var i = this.props.inactiveColor,
              o = Zt / 2,
              a = Zt / 6,
              u = Zt / 3,
              s = n.inactive ? i : n.color;
            if (n.type === "plainline")
              return A.createElement("line", {
                strokeWidth: 4,
                fill: "none",
                stroke: s,
                strokeDasharray: n.payload.strokeDasharray,
                x1: 0,
                y1: o,
                x2: Zt,
                y2: o,
                className: "recharts-legend-icon",
              });
            if (n.type === "line")
              return A.createElement("path", {
                strokeWidth: 4,
                fill: "none",
                stroke: s,
                d: "M0,"
                  .concat(o, "h")
                  .concat(
                    u,
                    `
            A`
                  )
                  .concat(a, ",")
                  .concat(a, ",0,1,1,")
                  .concat(2 * u, ",")
                  .concat(
                    o,
                    `
            H`
                  )
                  .concat(Zt, "M")
                  .concat(2 * u, ",")
                  .concat(
                    o,
                    `
            A`
                  )
                  .concat(a, ",")
                  .concat(a, ",0,1,1,")
                  .concat(u, ",")
                  .concat(o),
                className: "recharts-legend-icon",
              });
            if (n.type === "rect")
              return A.createElement("path", {
                stroke: "none",
                fill: s,
                d: "M0,"
                  .concat(Zt / 8, "h")
                  .concat(Zt, "v")
                  .concat((Zt * 3) / 4, "h")
                  .concat(-Zt, "z"),
                className: "recharts-legend-icon",
              });
            if (A.isValidElement(n.legendIcon)) {
              var l = _N({}, n);
              return delete l.legendIcon, A.cloneElement(n.legendIcon, l);
            }
            return A.createElement(mm, {
              fill: s,
              cx: o,
              cy: o,
              size: Zt,
              sizeType: "diameter",
              type: n.type,
            });
          },
        },
        {
          key: "renderItems",
          value: function () {
            var n = this,
              i = this.props,
              o = i.payload,
              a = i.iconSize,
              u = i.layout,
              s = i.formatter,
              l = i.inactiveColor,
              f = { x: 0, y: 0, width: Zt, height: Zt },
              c = {
                display: u === "horizontal" ? "inline-block" : "block",
                marginRight: 10,
              },
              p = {
                display: "inline-block",
                verticalAlign: "middle",
                marginRight: 4,
              };
            return o.map(function (d, h) {
              var y = d.formatter || s,
                w = se(
                  tu(
                    tu(
                      { "recharts-legend-item": !0 },
                      "legend-item-".concat(h),
                      !0
                    ),
                    "inactive",
                    d.inactive
                  )
                );
              if (d.type === "none") return null;
              var m = te(d.value) ? null : d.value;
              Vr(
                !te(d.value),
                `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`
              );
              var v = d.inactive ? l : d.color;
              return A.createElement(
                "li",
                Ud(
                  { className: w, style: c, key: "legend-item-".concat(h) },
                  yl(n.props, d, h)
                ),
                A.createElement(
                  jd,
                  { width: a, height: a, viewBox: f, style: p },
                  n.renderIcon(d)
                ),
                A.createElement(
                  "span",
                  {
                    className: "recharts-legend-item-text",
                    style: { color: v },
                  },
                  y ? y(m, d, h) : m
                )
              );
            });
          },
        },
        {
          key: "render",
          value: function () {
            var n = this.props,
              i = n.payload,
              o = n.layout,
              a = n.align;
            if (!i || !i.length) return null;
            var u = {
              padding: 0,
              margin: 0,
              textAlign: o === "horizontal" ? a : "left",
            };
            return A.createElement(
              "ul",
              { className: "recharts-default-legend", style: u },
              this.renderItems()
            );
          },
        },
      ])
    );
  })(z.PureComponent);
tu(ym, "displayName", "Legend");
tu(ym, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc",
});
var jN = Nc;
function MN() {
  (this.__data__ = new jN()), (this.size = 0);
}
var NN = MN;
function DN(e) {
  var t = this.__data__,
    r = t.delete(e);
  return (this.size = t.size), r;
}
var LN = DN;
function RN(e) {
  return this.__data__.get(e);
}
var FN = RN;
function BN(e) {
  return this.__data__.has(e);
}
var zN = BN,
  UN = Nc,
  WN = im,
  HN = om,
  GN = 200;
function VN(e, t) {
  var r = this.__data__;
  if (r instanceof UN) {
    var n = r.__data__;
    if (!WN || n.length < GN - 1)
      return n.push([e, t]), (this.size = ++r.size), this;
    r = this.__data__ = new HN(n);
  }
  return r.set(e, t), (this.size = r.size), this;
}
var qN = VN,
  KN = Nc,
  XN = NN,
  YN = LN,
  QN = FN,
  ZN = zN,
  JN = qN;
function Ho(e) {
  var t = (this.__data__ = new KN(e));
  this.size = t.size;
}
Ho.prototype.clear = XN;
Ho.prototype.delete = YN;
Ho.prototype.get = QN;
Ho.prototype.has = ZN;
Ho.prototype.set = JN;
var QO = Ho,
  eD = "__lodash_hash_undefined__";
function tD(e) {
  return this.__data__.set(e, eD), this;
}
var rD = tD;
function nD(e) {
  return this.__data__.has(e);
}
var iD = nD,
  oD = om,
  aD = rD,
  uD = iD;
function _l(e) {
  var t = -1,
    r = e == null ? 0 : e.length;
  for (this.__data__ = new oD(); ++t < r; ) this.add(e[t]);
}
_l.prototype.add = _l.prototype.push = aD;
_l.prototype.has = uD;
var ZO = _l;
function sD(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e)) return !0;
  return !1;
}
var JO = sD;
function lD(e, t) {
  return e.has(t);
}
var e_ = lD,
  cD = ZO,
  fD = JO,
  pD = e_,
  dD = 1,
  hD = 2;
function vD(e, t, r, n, i, o) {
  var a = r & dD,
    u = e.length,
    s = t.length;
  if (u != s && !(a && s > u)) return !1;
  var l = o.get(e),
    f = o.get(t);
  if (l && f) return l == t && f == e;
  var c = -1,
    p = !0,
    d = r & hD ? new cD() : void 0;
  for (o.set(e, t), o.set(t, e); ++c < u; ) {
    var h = e[c],
      y = t[c];
    if (n) var w = a ? n(y, h, c, t, e, o) : n(h, y, c, e, t, o);
    if (w !== void 0) {
      if (w) continue;
      p = !1;
      break;
    }
    if (d) {
      if (
        !fD(t, function (m, v) {
          if (!pD(d, v) && (h === m || i(h, m, r, n, o))) return d.push(v);
        })
      ) {
        p = !1;
        break;
      }
    } else if (!(h === y || i(h, y, r, n, o))) {
      p = !1;
      break;
    }
  }
  return o.delete(e), o.delete(t), p;
}
var t_ = vD,
  mD = Nr,
  yD = mD.Uint8Array,
  gD = yD;
function bD(e) {
  var t = -1,
    r = Array(e.size);
  return (
    e.forEach(function (n, i) {
      r[++t] = [i, n];
    }),
    r
  );
}
var wD = bD;
function xD(e) {
  var t = -1,
    r = Array(e.size);
  return (
    e.forEach(function (n) {
      r[++t] = n;
    }),
    r
  );
}
var gm = xD,
  i0 = Bu,
  o0 = gD,
  SD = nm,
  OD = t_,
  _D = wD,
  PD = gm,
  AD = 1,
  ED = 2,
  ID = "[object Boolean]",
  TD = "[object Date]",
  $D = "[object Error]",
  CD = "[object Map]",
  kD = "[object Number]",
  jD = "[object RegExp]",
  MD = "[object Set]",
  ND = "[object String]",
  DD = "[object Symbol]",
  LD = "[object ArrayBuffer]",
  RD = "[object DataView]",
  a0 = i0 ? i0.prototype : void 0,
  ap = a0 ? a0.valueOf : void 0;
function FD(e, t, r, n, i, o, a) {
  switch (r) {
    case RD:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      (e = e.buffer), (t = t.buffer);
    case LD:
      return !(e.byteLength != t.byteLength || !o(new o0(e), new o0(t)));
    case ID:
    case TD:
    case kD:
      return SD(+e, +t);
    case $D:
      return e.name == t.name && e.message == t.message;
    case jD:
    case ND:
      return e == t + "";
    case CD:
      var u = _D;
    case MD:
      var s = n & AD;
      if ((u || (u = PD), e.size != t.size && !s)) return !1;
      var l = a.get(e);
      if (l) return l == t;
      (n |= ED), a.set(e, t);
      var f = OD(u(e), u(t), n, i, o, a);
      return a.delete(e), f;
    case DD:
      if (ap) return ap.call(e) == ap.call(t);
  }
  return !1;
}
var BD = FD;
function zD(e, t) {
  for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
  return e;
}
var r_ = zD,
  UD = r_,
  WD = Ft;
function HD(e, t, r) {
  var n = t(e);
  return WD(e) ? n : UD(n, r(e));
}
var GD = HD;
function VD(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
    var a = e[r];
    t(a, r, e) && (o[i++] = a);
  }
  return o;
}
var qD = VD;
function KD() {
  return [];
}
var XD = KD,
  YD = qD,
  QD = XD,
  ZD = Object.prototype,
  JD = ZD.propertyIsEnumerable,
  u0 = Object.getOwnPropertySymbols,
  eL = u0
    ? function (e) {
        return e == null
          ? []
          : ((e = Object(e)),
            YD(u0(e), function (t) {
              return JD.call(e, t);
            }));
      }
    : QD,
  tL = eL;
function rL(e, t) {
  for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
  return n;
}
var nL = rL,
  iL = nn,
  oL = on,
  aL = "[object Arguments]";
function uL(e) {
  return oL(e) && iL(e) == aL;
}
var sL = uL,
  s0 = sL,
  lL = on,
  n_ = Object.prototype,
  cL = n_.hasOwnProperty,
  fL = n_.propertyIsEnumerable,
  pL = s0(
    (function () {
      return arguments;
    })()
  )
    ? s0
    : function (e) {
        return lL(e) && cL.call(e, "callee") && !fL.call(e, "callee");
      },
  bm = pL,
  Pl = { exports: {} };
function dL() {
  return !1;
}
var hL = dL;
Pl.exports;
(function (e, t) {
  var r = Nr,
    n = hL,
    i = t && !t.nodeType && t,
    o = i && !0 && e && !e.nodeType && e,
    a = o && o.exports === i,
    u = a ? r.Buffer : void 0,
    s = u ? u.isBuffer : void 0,
    l = s || n;
  e.exports = l;
})(Pl, Pl.exports);
var i_ = Pl.exports,
  vL = 9007199254740991,
  mL = /^(?:0|[1-9]\d*)$/;
function yL(e, t) {
  var r = typeof e;
  return (
    (t = t ?? vL),
    !!t &&
      (r == "number" || (r != "symbol" && mL.test(e))) &&
      e > -1 &&
      e % 1 == 0 &&
      e < t
  );
}
var wm = yL,
  gL = 9007199254740991;
function bL(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= gL;
}
var xm = bL,
  wL = nn,
  xL = xm,
  SL = on,
  OL = "[object Arguments]",
  _L = "[object Array]",
  PL = "[object Boolean]",
  AL = "[object Date]",
  EL = "[object Error]",
  IL = "[object Function]",
  TL = "[object Map]",
  $L = "[object Number]",
  CL = "[object Object]",
  kL = "[object RegExp]",
  jL = "[object Set]",
  ML = "[object String]",
  NL = "[object WeakMap]",
  DL = "[object ArrayBuffer]",
  LL = "[object DataView]",
  RL = "[object Float32Array]",
  FL = "[object Float64Array]",
  BL = "[object Int8Array]",
  zL = "[object Int16Array]",
  UL = "[object Int32Array]",
  WL = "[object Uint8Array]",
  HL = "[object Uint8ClampedArray]",
  GL = "[object Uint16Array]",
  VL = "[object Uint32Array]",
  be = {};
be[RL] =
  be[FL] =
  be[BL] =
  be[zL] =
  be[UL] =
  be[WL] =
  be[HL] =
  be[GL] =
  be[VL] =
    !0;
be[OL] =
  be[_L] =
  be[DL] =
  be[PL] =
  be[LL] =
  be[AL] =
  be[EL] =
  be[IL] =
  be[TL] =
  be[$L] =
  be[CL] =
  be[kL] =
  be[jL] =
  be[ML] =
  be[NL] =
    !1;
function qL(e) {
  return SL(e) && xL(e.length) && !!be[wL(e)];
}
var KL = qL;
function XL(e) {
  return function (t) {
    return e(t);
  };
}
var o_ = XL,
  Al = { exports: {} };
Al.exports;
(function (e, t) {
  var r = dO,
    n = t && !t.nodeType && t,
    i = n && !0 && e && !e.nodeType && e,
    o = i && i.exports === n,
    a = o && r.process,
    u = (function () {
      try {
        var s = i && i.require && i.require("util").types;
        return s || (a && a.binding && a.binding("util"));
      } catch {}
    })();
  e.exports = u;
})(Al, Al.exports);
var YL = Al.exports,
  QL = KL,
  ZL = o_,
  l0 = YL,
  c0 = l0 && l0.isTypedArray,
  JL = c0 ? ZL(c0) : QL,
  a_ = JL,
  e3 = nL,
  t3 = bm,
  r3 = Ft,
  n3 = i_,
  i3 = wm,
  o3 = a_,
  a3 = Object.prototype,
  u3 = a3.hasOwnProperty;
function s3(e, t) {
  var r = r3(e),
    n = !r && t3(e),
    i = !r && !n && n3(e),
    o = !r && !n && !i && o3(e),
    a = r || n || i || o,
    u = a ? e3(e.length, String) : [],
    s = u.length;
  for (var l in e)
    (t || u3.call(e, l)) &&
      !(
        a &&
        (l == "length" ||
          (i && (l == "offset" || l == "parent")) ||
          (o && (l == "buffer" || l == "byteLength" || l == "byteOffset")) ||
          i3(l, s))
      ) &&
      u.push(l);
  return u;
}
var l3 = s3,
  c3 = Object.prototype;
function f3(e) {
  var t = e && e.constructor,
    r = (typeof t == "function" && t.prototype) || c3;
  return e === r;
}
var p3 = f3;
function d3(e, t) {
  return function (r) {
    return e(t(r));
  };
}
var u_ = d3,
  h3 = u_,
  v3 = h3(Object.keys, Object),
  m3 = v3,
  y3 = p3,
  g3 = m3,
  b3 = Object.prototype,
  w3 = b3.hasOwnProperty;
function x3(e) {
  if (!y3(e)) return g3(e);
  var t = [];
  for (var r in Object(e)) w3.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var S3 = x3,
  O3 = rm,
  _3 = xm;
function P3(e) {
  return e != null && _3(e.length) && !O3(e);
}
var Wu = P3,
  A3 = l3,
  E3 = S3,
  I3 = Wu;
function T3(e) {
  return I3(e) ? A3(e) : E3(e);
}
var Jc = T3,
  $3 = GD,
  C3 = tL,
  k3 = Jc;
function j3(e) {
  return $3(e, k3, C3);
}
var M3 = j3,
  f0 = M3,
  N3 = 1,
  D3 = Object.prototype,
  L3 = D3.hasOwnProperty;
function R3(e, t, r, n, i, o) {
  var a = r & N3,
    u = f0(e),
    s = u.length,
    l = f0(t),
    f = l.length;
  if (s != f && !a) return !1;
  for (var c = s; c--; ) {
    var p = u[c];
    if (!(a ? p in t : L3.call(t, p))) return !1;
  }
  var d = o.get(e),
    h = o.get(t);
  if (d && h) return d == t && h == e;
  var y = !0;
  o.set(e, t), o.set(t, e);
  for (var w = a; ++c < s; ) {
    p = u[c];
    var m = e[p],
      v = t[p];
    if (n) var g = a ? n(v, m, p, t, e, o) : n(m, v, p, e, t, o);
    if (!(g === void 0 ? m === v || i(m, v, r, n, o) : g)) {
      y = !1;
      break;
    }
    w || (w = p == "constructor");
  }
  if (y && !w) {
    var S = e.constructor,
      b = t.constructor;
    S != b &&
      "constructor" in e &&
      "constructor" in t &&
      !(
        typeof S == "function" &&
        S instanceof S &&
        typeof b == "function" &&
        b instanceof b
      ) &&
      (y = !1);
  }
  return o.delete(e), o.delete(t), y;
}
var F3 = R3,
  B3 = _i,
  z3 = Nr,
  U3 = B3(z3, "DataView"),
  W3 = U3,
  H3 = _i,
  G3 = Nr,
  V3 = H3(G3, "Promise"),
  q3 = V3,
  K3 = _i,
  X3 = Nr,
  Y3 = K3(X3, "Set"),
  s_ = Y3,
  Q3 = _i,
  Z3 = Nr,
  J3 = Q3(Z3, "WeakMap"),
  eR = J3,
  Hd = W3,
  Gd = im,
  Vd = q3,
  qd = s_,
  Kd = eR,
  l_ = nn,
  Go = vO,
  p0 = "[object Map]",
  tR = "[object Object]",
  d0 = "[object Promise]",
  h0 = "[object Set]",
  v0 = "[object WeakMap]",
  m0 = "[object DataView]",
  rR = Go(Hd),
  nR = Go(Gd),
  iR = Go(Vd),
  oR = Go(qd),
  aR = Go(Kd),
  Kn = l_;
((Hd && Kn(new Hd(new ArrayBuffer(1))) != m0) ||
  (Gd && Kn(new Gd()) != p0) ||
  (Vd && Kn(Vd.resolve()) != d0) ||
  (qd && Kn(new qd()) != h0) ||
  (Kd && Kn(new Kd()) != v0)) &&
  (Kn = function (e) {
    var t = l_(e),
      r = t == tR ? e.constructor : void 0,
      n = r ? Go(r) : "";
    if (n)
      switch (n) {
        case rR:
          return m0;
        case nR:
          return p0;
        case iR:
          return d0;
        case oR:
          return h0;
        case aR:
          return v0;
      }
    return t;
  });
var uR = Kn,
  up = QO,
  sR = t_,
  lR = BD,
  cR = F3,
  y0 = uR,
  g0 = Ft,
  b0 = i_,
  fR = a_,
  pR = 1,
  w0 = "[object Arguments]",
  x0 = "[object Array]",
  vs = "[object Object]",
  dR = Object.prototype,
  S0 = dR.hasOwnProperty;
function hR(e, t, r, n, i, o) {
  var a = g0(e),
    u = g0(t),
    s = a ? x0 : y0(e),
    l = u ? x0 : y0(t);
  (s = s == w0 ? vs : s), (l = l == w0 ? vs : l);
  var f = s == vs,
    c = l == vs,
    p = s == l;
  if (p && b0(e)) {
    if (!b0(t)) return !1;
    (a = !0), (f = !1);
  }
  if (p && !f)
    return (
      o || (o = new up()),
      a || fR(e) ? sR(e, t, r, n, i, o) : lR(e, t, s, r, n, i, o)
    );
  if (!(r & pR)) {
    var d = f && S0.call(e, "__wrapped__"),
      h = c && S0.call(t, "__wrapped__");
    if (d || h) {
      var y = d ? e.value() : e,
        w = h ? t.value() : t;
      return o || (o = new up()), i(y, w, r, n, o);
    }
  }
  return p ? (o || (o = new up()), cR(e, t, r, n, i, o)) : !1;
}
var vR = hR,
  mR = vR,
  O0 = on;
function c_(e, t, r, n, i) {
  return e === t
    ? !0
    : e == null || t == null || (!O0(e) && !O0(t))
      ? e !== e && t !== t
      : mR(e, t, r, n, c_, i);
}
var Sm = c_,
  yR = QO,
  gR = Sm,
  bR = 1,
  wR = 2;
function xR(e, t, r, n) {
  var i = r.length,
    o = i,
    a = !n;
  if (e == null) return !o;
  for (e = Object(e); i--; ) {
    var u = r[i];
    if (a && u[2] ? u[1] !== e[u[0]] : !(u[0] in e)) return !1;
  }
  for (; ++i < o; ) {
    u = r[i];
    var s = u[0],
      l = e[s],
      f = u[1];
    if (a && u[2]) {
      if (l === void 0 && !(s in e)) return !1;
    } else {
      var c = new yR();
      if (n) var p = n(l, f, s, e, t, c);
      if (!(p === void 0 ? gR(f, l, bR | wR, n, c) : p)) return !1;
    }
  }
  return !0;
}
var SR = xR,
  OR = Dn;
function _R(e) {
  return e === e && !OR(e);
}
var f_ = _R,
  PR = f_,
  AR = Jc;
function ER(e) {
  for (var t = AR(e), r = t.length; r--; ) {
    var n = t[r],
      i = e[n];
    t[r] = [n, i, PR(i)];
  }
  return t;
}
var IR = ER;
function TR(e, t) {
  return function (r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
var p_ = TR,
  $R = SR,
  CR = IR,
  kR = p_;
function jR(e) {
  var t = CR(e);
  return t.length == 1 && t[0][2]
    ? kR(t[0][0], t[0][1])
    : function (r) {
        return r === e || $R(r, e, t);
      };
}
var MR = jR;
function NR(e, t) {
  return e != null && t in Object(e);
}
var DR = NR,
  LR = wO,
  RR = bm,
  FR = Ft,
  BR = wm,
  zR = xm,
  UR = Lc;
function WR(e, t, r) {
  t = LR(t, e);
  for (var n = -1, i = t.length, o = !1; ++n < i; ) {
    var a = UR(t[n]);
    if (!(o = e != null && r(e, a))) break;
    e = e[a];
  }
  return o || ++n != i
    ? o
    : ((i = e == null ? 0 : e.length),
      !!i && zR(i) && BR(a, i) && (FR(e) || RR(e)));
}
var HR = WR,
  GR = DR,
  VR = HR;
function qR(e, t) {
  return e != null && VR(e, t, GR);
}
var KR = qR,
  XR = Sm,
  YR = xO,
  QR = KR,
  ZR = tm,
  JR = f_,
  e4 = p_,
  t4 = Lc,
  r4 = 1,
  n4 = 2;
function i4(e, t) {
  return ZR(e) && JR(t)
    ? e4(t4(e), t)
    : function (r) {
        var n = YR(r, e);
        return n === void 0 && n === t ? QR(r, e) : XR(t, n, r4 | n4);
      };
}
var o4 = i4;
function a4(e) {
  return e;
}
var Vo = a4;
function u4(e) {
  return function (t) {
    return t == null ? void 0 : t[e];
  };
}
var s4 = u4,
  l4 = sm;
function c4(e) {
  return function (t) {
    return l4(t, e);
  };
}
var f4 = c4,
  p4 = s4,
  d4 = f4,
  h4 = tm,
  v4 = Lc;
function m4(e) {
  return h4(e) ? p4(v4(e)) : d4(e);
}
var y4 = m4,
  g4 = MR,
  b4 = o4,
  w4 = Vo,
  x4 = Ft,
  S4 = y4;
function O4(e) {
  return typeof e == "function"
    ? e
    : e == null
      ? w4
      : typeof e == "object"
        ? x4(e)
          ? b4(e[0], e[1])
          : g4(e)
        : S4(e);
}
var Ln = O4;
function _4(e, t, r, n) {
  for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; )
    if (t(e[o], o, e)) return o;
  return -1;
}
var d_ = _4;
function P4(e) {
  return e !== e;
}
var A4 = P4;
function E4(e, t, r) {
  for (var n = r - 1, i = e.length; ++n < i; ) if (e[n] === t) return n;
  return -1;
}
var I4 = E4,
  T4 = d_,
  $4 = A4,
  C4 = I4;
function k4(e, t, r) {
  return t === t ? C4(e, t, r) : T4(e, $4, r);
}
var j4 = k4,
  M4 = j4;
function N4(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && M4(e, t, 0) > -1;
}
var D4 = N4;
function L4(e, t, r) {
  for (var n = -1, i = e == null ? 0 : e.length; ++n < i; )
    if (r(t, e[n])) return !0;
  return !1;
}
var R4 = L4;
function F4() {}
var B4 = F4,
  sp = s_,
  z4 = B4,
  U4 = gm,
  W4 = 1 / 0,
  H4 =
    sp && 1 / U4(new sp([, -0]))[1] == W4
      ? function (e) {
          return new sp(e);
        }
      : z4,
  G4 = H4,
  V4 = ZO,
  q4 = D4,
  K4 = R4,
  X4 = e_,
  Y4 = G4,
  Q4 = gm,
  Z4 = 200;
function J4(e, t, r) {
  var n = -1,
    i = q4,
    o = e.length,
    a = !0,
    u = [],
    s = u;
  if (r) (a = !1), (i = K4);
  else if (o >= Z4) {
    var l = t ? null : Y4(e);
    if (l) return Q4(l);
    (a = !1), (i = X4), (s = new V4());
  } else s = t ? [] : u;
  e: for (; ++n < o; ) {
    var f = e[n],
      c = t ? t(f) : f;
    if (((f = r || f !== 0 ? f : 0), a && c === c)) {
      for (var p = s.length; p--; ) if (s[p] === c) continue e;
      t && s.push(c), u.push(f);
    } else i(s, c, r) || (s !== u && s.push(c), u.push(f));
  }
  return u;
}
var e8 = J4,
  t8 = Ln,
  r8 = e8;
function n8(e, t) {
  return e && e.length ? r8(e, t8(t)) : [];
}
var i8 = n8;
const _0 = he(i8);
function h_(e, t, r) {
  return t === !0 ? _0(e, r) : te(t) ? _0(e, t) : e;
}
function mo(e) {
  "@babel/helpers - typeof";
  return (
    (mo =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    mo(e)
  );
}
var o8 = ["ref"];
function P0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function Dr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? P0(Object(r), !0).forEach(function (n) {
          ef(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : P0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function a8(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function A0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, m_(n.key), n);
  }
}
function u8(e, t, r) {
  return (
    t && A0(e.prototype, t),
    r && A0(e, r),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function s8(e, t, r) {
  return (
    (t = El(t)),
    l8(
      e,
      v_() ? Reflect.construct(t, r || [], El(e).constructor) : t.apply(e, r)
    )
  );
}
function l8(e, t) {
  if (t && (mo(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return c8(e);
}
function c8(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function v_() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch {}
  return (v_ = function () {
    return !!e;
  })();
}
function El(e) {
  return (
    (El = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }),
    El(e)
  );
}
function f8(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && Xd(e, t);
}
function Xd(e, t) {
  return (
    (Xd = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n;
        }),
    Xd(e, t)
  );
}
function ef(e, t, r) {
  return (
    (t = m_(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function m_(e) {
  var t = p8(e, "string");
  return mo(t) == "symbol" ? t : t + "";
}
function p8(e, t) {
  if (mo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (mo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function d8(e, t) {
  if (e == null) return {};
  var r = h8(e, t),
    n,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (n = o[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n]);
  }
  return r;
}
function h8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function v8(e) {
  return e.value;
}
function m8(e, t) {
  if (A.isValidElement(e)) return A.cloneElement(e, t);
  if (typeof e == "function") return A.createElement(e, t);
  t.ref;
  var r = d8(t, o8);
  return A.createElement(ym, r);
}
var E0 = 1,
  no = (function (e) {
    function t() {
      var r;
      a8(this, t);
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++)
        i[o] = arguments[o];
      return (
        (r = s8(this, t, [].concat(i))),
        ef(r, "lastBoundingBox", { width: -1, height: -1 }),
        r
      );
    }
    return (
      f8(t, e),
      u8(
        t,
        [
          {
            key: "componentDidMount",
            value: function () {
              this.updateBBox();
            },
          },
          {
            key: "componentDidUpdate",
            value: function () {
              this.updateBBox();
            },
          },
          {
            key: "getBBox",
            value: function () {
              if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
                var n = this.wrapperNode.getBoundingClientRect();
                return (
                  (n.height = this.wrapperNode.offsetHeight),
                  (n.width = this.wrapperNode.offsetWidth),
                  n
                );
              }
              return null;
            },
          },
          {
            key: "updateBBox",
            value: function () {
              var n = this.props.onBBoxUpdate,
                i = this.getBBox();
              i
                ? (Math.abs(i.width - this.lastBoundingBox.width) > E0 ||
                    Math.abs(i.height - this.lastBoundingBox.height) > E0) &&
                  ((this.lastBoundingBox.width = i.width),
                  (this.lastBoundingBox.height = i.height),
                  n && n(i))
                : (this.lastBoundingBox.width !== -1 ||
                    this.lastBoundingBox.height !== -1) &&
                  ((this.lastBoundingBox.width = -1),
                  (this.lastBoundingBox.height = -1),
                  n && n(null));
            },
          },
          {
            key: "getBBoxSnapshot",
            value: function () {
              return this.lastBoundingBox.width >= 0 &&
                this.lastBoundingBox.height >= 0
                ? Dr({}, this.lastBoundingBox)
                : { width: 0, height: 0 };
            },
          },
          {
            key: "getDefaultPosition",
            value: function (n) {
              var i = this.props,
                o = i.layout,
                a = i.align,
                u = i.verticalAlign,
                s = i.margin,
                l = i.chartWidth,
                f = i.chartHeight,
                c,
                p;
              if (
                !n ||
                ((n.left === void 0 || n.left === null) &&
                  (n.right === void 0 || n.right === null))
              )
                if (a === "center" && o === "vertical") {
                  var d = this.getBBoxSnapshot();
                  c = { left: ((l || 0) - d.width) / 2 };
                } else
                  c =
                    a === "right"
                      ? { right: (s && s.right) || 0 }
                      : { left: (s && s.left) || 0 };
              if (
                !n ||
                ((n.top === void 0 || n.top === null) &&
                  (n.bottom === void 0 || n.bottom === null))
              )
                if (u === "middle") {
                  var h = this.getBBoxSnapshot();
                  p = { top: ((f || 0) - h.height) / 2 };
                } else
                  p =
                    u === "bottom"
                      ? { bottom: (s && s.bottom) || 0 }
                      : { top: (s && s.top) || 0 };
              return Dr(Dr({}, c), p);
            },
          },
          {
            key: "render",
            value: function () {
              var n = this,
                i = this.props,
                o = i.content,
                a = i.width,
                u = i.height,
                s = i.wrapperStyle,
                l = i.payloadUniqBy,
                f = i.payload,
                c = Dr(
                  Dr(
                    {
                      position: "absolute",
                      width: a || "auto",
                      height: u || "auto",
                    },
                    this.getDefaultPosition(s)
                  ),
                  s
                );
              return A.createElement(
                "div",
                {
                  className: "recharts-legend-wrapper",
                  style: c,
                  ref: function (d) {
                    n.wrapperNode = d;
                  },
                },
                m8(o, Dr(Dr({}, this.props), {}, { payload: h_(f, l, v8) }))
              );
            },
          },
        ],
        [
          {
            key: "getWithHeight",
            value: function (n, i) {
              var o = Dr(Dr({}, this.defaultProps), n.props),
                a = o.layout;
              return a === "vertical" && W(n.props.height)
                ? { height: n.props.height }
                : a === "horizontal"
                  ? { width: n.props.width || i }
                  : null;
            },
          },
        ]
      )
    );
  })(z.PureComponent);
ef(no, "displayName", "Legend");
ef(no, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom",
});
var I0 = Bu,
  y8 = bm,
  g8 = Ft,
  T0 = I0 ? I0.isConcatSpreadable : void 0;
function b8(e) {
  return g8(e) || y8(e) || !!(T0 && e && e[T0]);
}
var w8 = b8,
  x8 = r_,
  S8 = w8;
function y_(e, t, r, n, i) {
  var o = -1,
    a = e.length;
  for (r || (r = S8), i || (i = []); ++o < a; ) {
    var u = e[o];
    t > 0 && r(u)
      ? t > 1
        ? y_(u, t - 1, r, n, i)
        : x8(i, u)
      : n || (i[i.length] = u);
  }
  return i;
}
var g_ = y_;
function O8(e) {
  return function (t, r, n) {
    for (var i = -1, o = Object(t), a = n(t), u = a.length; u--; ) {
      var s = a[e ? u : ++i];
      if (r(o[s], s, o) === !1) break;
    }
    return t;
  };
}
var _8 = O8,
  P8 = _8,
  A8 = P8(),
  E8 = A8,
  I8 = E8,
  T8 = Jc;
function $8(e, t) {
  return e && I8(e, t, T8);
}
var b_ = $8,
  C8 = Wu;
function k8(e, t) {
  return function (r, n) {
    if (r == null) return r;
    if (!C8(r)) return e(r, n);
    for (
      var i = r.length, o = t ? i : -1, a = Object(r);
      (t ? o-- : ++o < i) && n(a[o], o, a) !== !1;

    );
    return r;
  };
}
var j8 = k8,
  M8 = b_,
  N8 = j8,
  D8 = N8(M8),
  Om = D8,
  L8 = Om,
  R8 = Wu;
function F8(e, t) {
  var r = -1,
    n = R8(e) ? Array(e.length) : [];
  return (
    L8(e, function (i, o, a) {
      n[++r] = t(i, o, a);
    }),
    n
  );
}
var w_ = F8;
function B8(e, t) {
  var r = e.length;
  for (e.sort(t); r--; ) e[r] = e[r].value;
  return e;
}
var z8 = B8,
  $0 = Fo;
function U8(e, t) {
  if (e !== t) {
    var r = e !== void 0,
      n = e === null,
      i = e === e,
      o = $0(e),
      a = t !== void 0,
      u = t === null,
      s = t === t,
      l = $0(t);
    if (
      (!u && !l && !o && e > t) ||
      (o && a && s && !u && !l) ||
      (n && a && s) ||
      (!r && s) ||
      !i
    )
      return 1;
    if (
      (!n && !o && !l && e < t) ||
      (l && r && i && !n && !o) ||
      (u && r && i) ||
      (!a && i) ||
      !s
    )
      return -1;
  }
  return 0;
}
var W8 = U8,
  H8 = W8;
function G8(e, t, r) {
  for (
    var n = -1, i = e.criteria, o = t.criteria, a = i.length, u = r.length;
    ++n < a;

  ) {
    var s = H8(i[n], o[n]);
    if (s) {
      if (n >= u) return s;
      var l = r[n];
      return s * (l == "desc" ? -1 : 1);
    }
  }
  return e.index - t.index;
}
var V8 = G8,
  lp = um,
  q8 = sm,
  K8 = Ln,
  X8 = w_,
  Y8 = z8,
  Q8 = o_,
  Z8 = V8,
  J8 = Vo,
  e6 = Ft;
function t6(e, t, r) {
  t.length
    ? (t = lp(t, function (o) {
        return e6(o)
          ? function (a) {
              return q8(a, o.length === 1 ? o[0] : o);
            }
          : o;
      }))
    : (t = [J8]);
  var n = -1;
  t = lp(t, Q8(K8));
  var i = X8(e, function (o, a, u) {
    var s = lp(t, function (l) {
      return l(o);
    });
    return { criteria: s, index: ++n, value: o };
  });
  return Y8(i, function (o, a) {
    return Z8(o, a, r);
  });
}
var r6 = t6;
function n6(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, r[0]);
    case 2:
      return e.call(t, r[0], r[1]);
    case 3:
      return e.call(t, r[0], r[1], r[2]);
  }
  return e.apply(t, r);
}
var i6 = n6,
  o6 = i6,
  C0 = Math.max;
function a6(e, t, r) {
  return (
    (t = C0(t === void 0 ? e.length - 1 : t, 0)),
    function () {
      for (
        var n = arguments, i = -1, o = C0(n.length - t, 0), a = Array(o);
        ++i < o;

      )
        a[i] = n[t + i];
      i = -1;
      for (var u = Array(t + 1); ++i < t; ) u[i] = n[i];
      return (u[t] = r(a)), o6(e, this, u);
    }
  );
}
var u6 = a6;
function s6(e) {
  return function () {
    return e;
  };
}
var l6 = s6,
  c6 = _i,
  f6 = (function () {
    try {
      var e = c6(Object, "defineProperty");
      return e({}, "", {}), e;
    } catch {}
  })(),
  x_ = f6,
  p6 = l6,
  k0 = x_,
  d6 = Vo,
  h6 = k0
    ? function (e, t) {
        return k0(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: p6(t),
          writable: !0,
        });
      }
    : d6,
  v6 = h6,
  m6 = 800,
  y6 = 16,
  g6 = Date.now;
function b6(e) {
  var t = 0,
    r = 0;
  return function () {
    var n = g6(),
      i = y6 - (n - r);
    if (((r = n), i > 0)) {
      if (++t >= m6) return arguments[0];
    } else t = 0;
    return e.apply(void 0, arguments);
  };
}
var w6 = b6,
  x6 = v6,
  S6 = w6,
  O6 = S6(x6),
  _6 = O6,
  P6 = Vo,
  A6 = u6,
  E6 = _6;
function I6(e, t) {
  return E6(A6(e, t, P6), e + "");
}
var T6 = I6,
  $6 = nm,
  C6 = Wu,
  k6 = wm,
  j6 = Dn;
function M6(e, t, r) {
  if (!j6(r)) return !1;
  var n = typeof t;
  return (n == "number" ? C6(r) && k6(t, r.length) : n == "string" && t in r)
    ? $6(r[t], e)
    : !1;
}
var tf = M6,
  N6 = g_,
  D6 = r6,
  L6 = T6,
  j0 = tf,
  R6 = L6(function (e, t) {
    if (e == null) return [];
    var r = t.length;
    return (
      r > 1 && j0(e, t[0], t[1])
        ? (t = [])
        : r > 2 && j0(t[0], t[1], t[2]) && (t = [t[0]]),
      D6(e, N6(t, 1), [])
    );
  }),
  F6 = R6;
const _m = he(F6);
function ru(e) {
  "@babel/helpers - typeof";
  return (
    (ru =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    ru(e)
  );
}
function Yd() {
  return (
    (Yd = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Yd.apply(this, arguments)
  );
}
function B6(e, t) {
  return H6(e) || W6(e, t) || U6(e, t) || z6();
}
function z6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function U6(e, t) {
  if (e) {
    if (typeof e == "string") return M0(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return M0(e, t);
  }
}
function M0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function W6(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (r != null) {
    var n,
      i,
      o,
      a,
      u = [],
      s = !0,
      l = !1;
    try {
      if (((o = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t);
          s = !0
        );
    } catch (f) {
      (l = !0), (i = f);
    } finally {
      try {
        if (!s && r.return != null && ((a = r.return()), Object(a) !== a))
          return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function H6(e) {
  if (Array.isArray(e)) return e;
}
function N0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function cp(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? N0(Object(r), !0).forEach(function (n) {
          G6(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : N0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function G6(e, t, r) {
  return (
    (t = V6(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function V6(e) {
  var t = q6(e, "string");
  return ru(t) == "symbol" ? t : t + "";
}
function q6(e, t) {
  if (ru(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ru(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function K6(e) {
  return Array.isArray(e) && Ue(e[0]) && Ue(e[1]) ? e.join(" ~ ") : e;
}
var X6 = function (t) {
  var r = t.separator,
    n = r === void 0 ? " : " : r,
    i = t.contentStyle,
    o = i === void 0 ? {} : i,
    a = t.itemStyle,
    u = a === void 0 ? {} : a,
    s = t.labelStyle,
    l = s === void 0 ? {} : s,
    f = t.payload,
    c = t.formatter,
    p = t.itemSorter,
    d = t.wrapperClassName,
    h = t.labelClassName,
    y = t.label,
    w = t.labelFormatter,
    m = t.accessibilityLayer,
    v = m === void 0 ? !1 : m,
    g = function () {
      if (f && f.length) {
        var $ = { padding: 0, margin: 0 },
          M = (p ? _m(f, p) : f).map(function (N, j) {
            if (N.type === "none") return null;
            var D = cp(
                {
                  display: "block",
                  paddingTop: 4,
                  paddingBottom: 4,
                  color: N.color || "#000",
                },
                u
              ),
              L = N.formatter || c || K6,
              T = N.value,
              k = N.name,
              F = T,
              H = k;
            if (L && F != null && H != null) {
              var U = L(T, k, N, j, f);
              if (Array.isArray(U)) {
                var K = B6(U, 2);
                (F = K[0]), (H = K[1]);
              } else F = U;
            }
            return A.createElement(
              "li",
              {
                className: "recharts-tooltip-item",
                key: "tooltip-item-".concat(j),
                style: D,
              },
              Ue(H)
                ? A.createElement(
                    "span",
                    { className: "recharts-tooltip-item-name" },
                    H
                  )
                : null,
              Ue(H)
                ? A.createElement(
                    "span",
                    { className: "recharts-tooltip-item-separator" },
                    n
                  )
                : null,
              A.createElement(
                "span",
                { className: "recharts-tooltip-item-value" },
                F
              ),
              A.createElement(
                "span",
                { className: "recharts-tooltip-item-unit" },
                N.unit || ""
              )
            );
          });
        return A.createElement(
          "ul",
          { className: "recharts-tooltip-item-list", style: $ },
          M
        );
      }
      return null;
    },
    S = cp(
      {
        margin: 0,
        padding: 10,
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        whiteSpace: "nowrap",
      },
      o
    ),
    b = cp({ margin: 0 }, l),
    x = !ue(y),
    O = x ? y : "",
    _ = se("recharts-default-tooltip", d),
    P = se("recharts-tooltip-label", h);
  x && w && f !== void 0 && f !== null && (O = w(y, f));
  var I = v ? { role: "status", "aria-live": "assertive" } : {};
  return A.createElement(
    "div",
    Yd({ className: _, style: S }, I),
    A.createElement(
      "p",
      { className: P, style: b },
      A.isValidElement(O) ? O : "".concat(O)
    ),
    g()
  );
};
function nu(e) {
  "@babel/helpers - typeof";
  return (
    (nu =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    nu(e)
  );
}
function ms(e, t, r) {
  return (
    (t = Y6(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function Y6(e) {
  var t = Q6(e, "string");
  return nu(t) == "symbol" ? t : t + "";
}
function Q6(e, t) {
  if (nu(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (nu(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ua = "recharts-tooltip-wrapper",
  Z6 = { visibility: "hidden" };
function J6(e) {
  var t = e.coordinate,
    r = e.translateX,
    n = e.translateY;
  return se(
    ua,
    ms(
      ms(
        ms(
          ms({}, "".concat(ua, "-right"), W(r) && t && W(t.x) && r >= t.x),
          "".concat(ua, "-left"),
          W(r) && t && W(t.x) && r < t.x
        ),
        "".concat(ua, "-bottom"),
        W(n) && t && W(t.y) && n >= t.y
      ),
      "".concat(ua, "-top"),
      W(n) && t && W(t.y) && n < t.y
    )
  );
}
function D0(e) {
  var t = e.allowEscapeViewBox,
    r = e.coordinate,
    n = e.key,
    i = e.offsetTopLeft,
    o = e.position,
    a = e.reverseDirection,
    u = e.tooltipDimension,
    s = e.viewBox,
    l = e.viewBoxDimension;
  if (o && W(o[n])) return o[n];
  var f = r[n] - u - i,
    c = r[n] + i;
  if (t[n]) return a[n] ? f : c;
  if (a[n]) {
    var p = f,
      d = s[n];
    return p < d ? Math.max(c, s[n]) : Math.max(f, s[n]);
  }
  var h = c + u,
    y = s[n] + l;
  return h > y ? Math.max(f, s[n]) : Math.max(c, s[n]);
}
function e5(e) {
  var t = e.translateX,
    r = e.translateY,
    n = e.useTranslate3d;
  return {
    transform: n
      ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)")
      : "translate(".concat(t, "px, ").concat(r, "px)"),
  };
}
function t5(e) {
  var t = e.allowEscapeViewBox,
    r = e.coordinate,
    n = e.offsetTopLeft,
    i = e.position,
    o = e.reverseDirection,
    a = e.tooltipBox,
    u = e.useTranslate3d,
    s = e.viewBox,
    l,
    f,
    c;
  return (
    a.height > 0 && a.width > 0 && r
      ? ((f = D0({
          allowEscapeViewBox: t,
          coordinate: r,
          key: "x",
          offsetTopLeft: n,
          position: i,
          reverseDirection: o,
          tooltipDimension: a.width,
          viewBox: s,
          viewBoxDimension: s.width,
        })),
        (c = D0({
          allowEscapeViewBox: t,
          coordinate: r,
          key: "y",
          offsetTopLeft: n,
          position: i,
          reverseDirection: o,
          tooltipDimension: a.height,
          viewBox: s,
          viewBoxDimension: s.height,
        })),
        (l = e5({ translateX: f, translateY: c, useTranslate3d: u })))
      : (l = Z6),
    {
      cssProperties: l,
      cssClasses: J6({ translateX: f, translateY: c, coordinate: r }),
    }
  );
}
function yo(e) {
  "@babel/helpers - typeof";
  return (
    (yo =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    yo(e)
  );
}
function L0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function R0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? L0(Object(r), !0).forEach(function (n) {
          Zd(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : L0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function r5(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function n5(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, O_(n.key), n);
  }
}
function i5(e, t, r) {
  return (
    t && n5(e.prototype, t),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function o5(e, t, r) {
  return (
    (t = Il(t)),
    a5(
      e,
      S_() ? Reflect.construct(t, r || [], Il(e).constructor) : t.apply(e, r)
    )
  );
}
function a5(e, t) {
  if (t && (yo(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return u5(e);
}
function u5(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function S_() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch {}
  return (S_ = function () {
    return !!e;
  })();
}
function Il(e) {
  return (
    (Il = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }),
    Il(e)
  );
}
function s5(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && Qd(e, t);
}
function Qd(e, t) {
  return (
    (Qd = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n;
        }),
    Qd(e, t)
  );
}
function Zd(e, t, r) {
  return (
    (t = O_(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function O_(e) {
  var t = l5(e, "string");
  return yo(t) == "symbol" ? t : t + "";
}
function l5(e, t) {
  if (yo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (yo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var F0 = 1,
  c5 = (function (e) {
    function t() {
      var r;
      r5(this, t);
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++)
        i[o] = arguments[o];
      return (
        (r = o5(this, t, [].concat(i))),
        Zd(r, "state", {
          dismissed: !1,
          dismissedAtCoordinate: { x: 0, y: 0 },
          lastBoundingBox: { width: -1, height: -1 },
        }),
        Zd(r, "handleKeyDown", function (a) {
          if (a.key === "Escape") {
            var u, s, l, f;
            r.setState({
              dismissed: !0,
              dismissedAtCoordinate: {
                x:
                  (u =
                    (s = r.props.coordinate) === null || s === void 0
                      ? void 0
                      : s.x) !== null && u !== void 0
                    ? u
                    : 0,
                y:
                  (l =
                    (f = r.props.coordinate) === null || f === void 0
                      ? void 0
                      : f.y) !== null && l !== void 0
                    ? l
                    : 0,
              },
            });
          }
        }),
        r
      );
    }
    return (
      s5(t, e),
      i5(t, [
        {
          key: "updateBBox",
          value: function () {
            if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
              var n = this.wrapperNode.getBoundingClientRect();
              (Math.abs(n.width - this.state.lastBoundingBox.width) > F0 ||
                Math.abs(n.height - this.state.lastBoundingBox.height) > F0) &&
                this.setState({
                  lastBoundingBox: { width: n.width, height: n.height },
                });
            } else
              (this.state.lastBoundingBox.width !== -1 ||
                this.state.lastBoundingBox.height !== -1) &&
                this.setState({ lastBoundingBox: { width: -1, height: -1 } });
          },
        },
        {
          key: "componentDidMount",
          value: function () {
            document.addEventListener("keydown", this.handleKeyDown),
              this.updateBBox();
          },
        },
        {
          key: "componentWillUnmount",
          value: function () {
            document.removeEventListener("keydown", this.handleKeyDown);
          },
        },
        {
          key: "componentDidUpdate",
          value: function () {
            var n, i;
            this.props.active && this.updateBBox(),
              this.state.dismissed &&
                (((n = this.props.coordinate) === null || n === void 0
                  ? void 0
                  : n.x) !== this.state.dismissedAtCoordinate.x ||
                  ((i = this.props.coordinate) === null || i === void 0
                    ? void 0
                    : i.y) !== this.state.dismissedAtCoordinate.y) &&
                (this.state.dismissed = !1);
          },
        },
        {
          key: "render",
          value: function () {
            var n = this,
              i = this.props,
              o = i.active,
              a = i.allowEscapeViewBox,
              u = i.animationDuration,
              s = i.animationEasing,
              l = i.children,
              f = i.coordinate,
              c = i.hasPayload,
              p = i.isAnimationActive,
              d = i.offset,
              h = i.position,
              y = i.reverseDirection,
              w = i.useTranslate3d,
              m = i.viewBox,
              v = i.wrapperStyle,
              g = t5({
                allowEscapeViewBox: a,
                coordinate: f,
                offsetTopLeft: d,
                position: h,
                reverseDirection: y,
                tooltipBox: this.state.lastBoundingBox,
                useTranslate3d: w,
                viewBox: m,
              }),
              S = g.cssClasses,
              b = g.cssProperties,
              x = R0(
                R0(
                  {
                    transition:
                      p && o ? "transform ".concat(u, "ms ").concat(s) : void 0,
                  },
                  b
                ),
                {},
                {
                  pointerEvents: "none",
                  visibility:
                    !this.state.dismissed && o && c ? "visible" : "hidden",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                v
              );
            return A.createElement(
              "div",
              {
                tabIndex: -1,
                className: S,
                style: x,
                ref: function (_) {
                  n.wrapperNode = _;
                },
              },
              l
            );
          },
        },
      ])
    );
  })(z.PureComponent),
  f5 = function () {
    return !(
      typeof window < "u" &&
      window.document &&
      window.document.createElement &&
      window.setTimeout
    );
  },
  En = {
    isSsr: f5(),
    get: function (t) {
      return En[t];
    },
    set: function (t, r) {
      if (typeof t == "string") En[t] = r;
      else {
        var n = Object.keys(t);
        n &&
          n.length &&
          n.forEach(function (i) {
            En[i] = t[i];
          });
      }
    },
  };
function go(e) {
  "@babel/helpers - typeof";
  return (
    (go =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    go(e)
  );
}
function B0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function z0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? B0(Object(r), !0).forEach(function (n) {
          Pm(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : B0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function p5(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function d5(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, P_(n.key), n);
  }
}
function h5(e, t, r) {
  return (
    t && d5(e.prototype, t),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function v5(e, t, r) {
  return (
    (t = Tl(t)),
    m5(
      e,
      __() ? Reflect.construct(t, r || [], Tl(e).constructor) : t.apply(e, r)
    )
  );
}
function m5(e, t) {
  if (t && (go(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return y5(e);
}
function y5(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function __() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch {}
  return (__ = function () {
    return !!e;
  })();
}
function Tl(e) {
  return (
    (Tl = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }),
    Tl(e)
  );
}
function g5(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && Jd(e, t);
}
function Jd(e, t) {
  return (
    (Jd = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n;
        }),
    Jd(e, t)
  );
}
function Pm(e, t, r) {
  return (
    (t = P_(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function P_(e) {
  var t = b5(e, "string");
  return go(t) == "symbol" ? t : t + "";
}
function b5(e, t) {
  if (go(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (go(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function w5(e) {
  return e.dataKey;
}
function x5(e, t) {
  return A.isValidElement(e)
    ? A.cloneElement(e, t)
    : typeof e == "function"
      ? A.createElement(e, t)
      : A.createElement(X6, t);
}
var Ar = (function (e) {
  function t() {
    return p5(this, t), v5(this, t, arguments);
  }
  return (
    g5(t, e),
    h5(t, [
      {
        key: "render",
        value: function () {
          var n = this,
            i = this.props,
            o = i.active,
            a = i.allowEscapeViewBox,
            u = i.animationDuration,
            s = i.animationEasing,
            l = i.content,
            f = i.coordinate,
            c = i.filterNull,
            p = i.isAnimationActive,
            d = i.offset,
            h = i.payload,
            y = i.payloadUniqBy,
            w = i.position,
            m = i.reverseDirection,
            v = i.useTranslate3d,
            g = i.viewBox,
            S = i.wrapperStyle,
            b = h ?? [];
          c &&
            b.length &&
            (b = h_(
              h.filter(function (O) {
                return (
                  O.value != null && (O.hide !== !0 || n.props.includeHidden)
                );
              }),
              y,
              w5
            ));
          var x = b.length > 0;
          return A.createElement(
            c5,
            {
              allowEscapeViewBox: a,
              animationDuration: u,
              animationEasing: s,
              isAnimationActive: p,
              active: o,
              coordinate: f,
              hasPayload: x,
              offset: d,
              position: w,
              reverseDirection: m,
              useTranslate3d: v,
              viewBox: g,
              wrapperStyle: S,
            },
            x5(l, z0(z0({}, this.props), {}, { payload: b }))
          );
        },
      },
    ])
  );
})(z.PureComponent);
Pm(Ar, "displayName", "Tooltip");
Pm(Ar, "defaultProps", {
  accessibilityLayer: !1,
  allowEscapeViewBox: { x: !1, y: !1 },
  animationDuration: 400,
  animationEasing: "ease",
  contentStyle: {},
  coordinate: { x: 0, y: 0 },
  cursor: !0,
  cursorStyle: {},
  filterNull: !0,
  isAnimationActive: !En.isSsr,
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: { x: !1, y: !1 },
  separator: " : ",
  trigger: "hover",
  useTranslate3d: !1,
  viewBox: { x: 0, y: 0, height: 0, width: 0 },
  wrapperStyle: {},
});
var S5 = Nr,
  O5 = function () {
    return S5.Date.now();
  },
  _5 = O5,
  P5 = /\s/;
function A5(e) {
  for (var t = e.length; t-- && P5.test(e.charAt(t)); );
  return t;
}
var E5 = A5,
  I5 = E5,
  T5 = /^\s+/;
function $5(e) {
  return e && e.slice(0, I5(e) + 1).replace(T5, "");
}
var C5 = $5,
  k5 = C5,
  U0 = Dn,
  j5 = Fo,
  W0 = NaN,
  M5 = /^[-+]0x[0-9a-f]+$/i,
  N5 = /^0b[01]+$/i,
  D5 = /^0o[0-7]+$/i,
  L5 = parseInt;
function R5(e) {
  if (typeof e == "number") return e;
  if (j5(e)) return W0;
  if (U0(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = U0(t) ? t + "" : t;
  }
  if (typeof e != "string") return e === 0 ? e : +e;
  e = k5(e);
  var r = N5.test(e);
  return r || D5.test(e) ? L5(e.slice(2), r ? 2 : 8) : M5.test(e) ? W0 : +e;
}
var A_ = R5,
  F5 = Dn,
  fp = _5,
  H0 = A_,
  B5 = "Expected a function",
  z5 = Math.max,
  U5 = Math.min;
function W5(e, t, r) {
  var n,
    i,
    o,
    a,
    u,
    s,
    l = 0,
    f = !1,
    c = !1,
    p = !0;
  if (typeof e != "function") throw new TypeError(B5);
  (t = H0(t) || 0),
    F5(r) &&
      ((f = !!r.leading),
      (c = "maxWait" in r),
      (o = c ? z5(H0(r.maxWait) || 0, t) : o),
      (p = "trailing" in r ? !!r.trailing : p));
  function d(x) {
    var O = n,
      _ = i;
    return (n = i = void 0), (l = x), (a = e.apply(_, O)), a;
  }
  function h(x) {
    return (l = x), (u = setTimeout(m, t)), f ? d(x) : a;
  }
  function y(x) {
    var O = x - s,
      _ = x - l,
      P = t - O;
    return c ? U5(P, o - _) : P;
  }
  function w(x) {
    var O = x - s,
      _ = x - l;
    return s === void 0 || O >= t || O < 0 || (c && _ >= o);
  }
  function m() {
    var x = fp();
    if (w(x)) return v(x);
    u = setTimeout(m, y(x));
  }
  function v(x) {
    return (u = void 0), p && n ? d(x) : ((n = i = void 0), a);
  }
  function g() {
    u !== void 0 && clearTimeout(u), (l = 0), (n = s = i = u = void 0);
  }
  function S() {
    return u === void 0 ? a : v(fp());
  }
  function b() {
    var x = fp(),
      O = w(x);
    if (((n = arguments), (i = this), (s = x), O)) {
      if (u === void 0) return h(s);
      if (c) return clearTimeout(u), (u = setTimeout(m, t)), d(s);
    }
    return u === void 0 && (u = setTimeout(m, t)), a;
  }
  return (b.cancel = g), (b.flush = S), b;
}
var H5 = W5,
  G5 = H5,
  V5 = Dn,
  q5 = "Expected a function";
function K5(e, t, r) {
  var n = !0,
    i = !0;
  if (typeof e != "function") throw new TypeError(q5);
  return (
    V5(r) &&
      ((n = "leading" in r ? !!r.leading : n),
      (i = "trailing" in r ? !!r.trailing : i)),
    G5(e, t, { leading: n, maxWait: t, trailing: i })
  );
}
var X5 = K5;
const E_ = he(X5);
function iu(e) {
  "@babel/helpers - typeof";
  return (
    (iu =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    iu(e)
  );
}
function G0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function ys(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? G0(Object(r), !0).forEach(function (n) {
          Y5(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : G0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function Y5(e, t, r) {
  return (
    (t = Q5(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function Q5(e) {
  var t = Z5(e, "string");
  return iu(t) == "symbol" ? t : t + "";
}
function Z5(e, t) {
  if (iu(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (iu(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function J5(e, t) {
  return nF(e) || rF(e, t) || tF(e, t) || eF();
}
function eF() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function tF(e, t) {
  if (e) {
    if (typeof e == "string") return V0(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return V0(e, t);
  }
}
function V0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function rF(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (r != null) {
    var n,
      i,
      o,
      a,
      u = [],
      s = !0,
      l = !1;
    try {
      if (((o = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t);
          s = !0
        );
    } catch (f) {
      (l = !0), (i = f);
    } finally {
      try {
        if (!s && r.return != null && ((a = r.return()), Object(a) !== a))
          return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function nF(e) {
  if (Array.isArray(e)) return e;
}
var iF = z.forwardRef(function (e, t) {
    var r = e.aspect,
      n = e.initialDimension,
      i = n === void 0 ? { width: -1, height: -1 } : n,
      o = e.width,
      a = o === void 0 ? "100%" : o,
      u = e.height,
      s = u === void 0 ? "100%" : u,
      l = e.minWidth,
      f = l === void 0 ? 0 : l,
      c = e.minHeight,
      p = e.maxHeight,
      d = e.children,
      h = e.debounce,
      y = h === void 0 ? 0 : h,
      w = e.id,
      m = e.className,
      v = e.onResize,
      g = e.style,
      S = g === void 0 ? {} : g,
      b = z.useRef(null),
      x = z.useRef();
    (x.current = v),
      z.useImperativeHandle(t, function () {
        return Object.defineProperty(b.current, "current", {
          get: function () {
            return (
              console.warn(
                "The usage of ref.current.current is deprecated and will no longer be supported."
              ),
              b.current
            );
          },
          configurable: !0,
        });
      });
    var O = z.useState({ containerWidth: i.width, containerHeight: i.height }),
      _ = J5(O, 2),
      P = _[0],
      I = _[1],
      E = z.useCallback(function (M, N) {
        I(function (j) {
          var D = Math.round(M),
            L = Math.round(N);
          return j.containerWidth === D && j.containerHeight === L
            ? j
            : { containerWidth: D, containerHeight: L };
        });
      }, []);
    z.useEffect(
      function () {
        var M = function (k) {
          var F,
            H = k[0].contentRect,
            U = H.width,
            K = H.height;
          E(U, K), (F = x.current) === null || F === void 0 || F.call(x, U, K);
        };
        y > 0 && (M = E_(M, y, { trailing: !0, leading: !1 }));
        var N = new ResizeObserver(M),
          j = b.current.getBoundingClientRect(),
          D = j.width,
          L = j.height;
        return (
          E(D, L),
          N.observe(b.current),
          function () {
            N.disconnect();
          }
        );
      },
      [E, y]
    );
    var $ = z.useMemo(
      function () {
        var M = P.containerWidth,
          N = P.containerHeight;
        if (M < 0 || N < 0) return null;
        Vr(
          ei(a) || ei(s),
          `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`,
          a,
          s
        ),
          Vr(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
        var j = ei(a) ? M : a,
          D = ei(s) ? N : s;
        r &&
          r > 0 &&
          (j ? (D = j / r) : D && (j = D * r), p && D > p && (D = p)),
          Vr(
            j > 0 || D > 0,
            `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`,
            j,
            D,
            a,
            s,
            f,
            c,
            r
          );
        var L = !Array.isArray(d) && Gr(d.type).endsWith("Chart");
        return A.Children.map(d, function (T) {
          return A.isValidElement(T)
            ? z.cloneElement(
                T,
                ys(
                  { width: j, height: D },
                  L
                    ? {
                        style: ys(
                          {
                            height: "100%",
                            width: "100%",
                            maxHeight: D,
                            maxWidth: j,
                          },
                          T.props.style
                        ),
                      }
                    : {}
                )
              )
            : T;
        });
      },
      [r, d, s, p, c, f, P, a]
    );
    return A.createElement(
      "div",
      {
        id: w ? "".concat(w) : void 0,
        className: se("recharts-responsive-container", m),
        style: ys(
          ys({}, S),
          {},
          { width: a, height: s, minWidth: f, minHeight: c, maxHeight: p }
        ),
        ref: b,
      },
      $
    );
  }),
  I_ = function (t) {
    return null;
  };
I_.displayName = "Cell";
function ou(e) {
  "@babel/helpers - typeof";
  return (
    (ou =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    ou(e)
  );
}
function q0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function eh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? q0(Object(r), !0).forEach(function (n) {
          oF(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : q0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function oF(e, t, r) {
  return (
    (t = aF(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function aF(e) {
  var t = uF(e, "string");
  return ou(t) == "symbol" ? t : t + "";
}
function uF(e, t) {
  if (ou(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ou(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ci = { widthCache: {}, cacheCount: 0 },
  sF = 2e3,
  lF = {
    position: "absolute",
    top: "-20000px",
    left: 0,
    padding: 0,
    margin: 0,
    border: "none",
    whiteSpace: "pre",
  },
  K0 = "recharts_measurement_span";
function cF(e) {
  var t = eh({}, e);
  return (
    Object.keys(t).forEach(function (r) {
      t[r] || delete t[r];
    }),
    t
  );
}
var ka = function (t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (t == null || En.isSsr) return { width: 0, height: 0 };
    var n = cF(r),
      i = JSON.stringify({ text: t, copyStyle: n });
    if (Ci.widthCache[i]) return Ci.widthCache[i];
    try {
      var o = document.getElementById(K0);
      o ||
        ((o = document.createElement("span")),
        o.setAttribute("id", K0),
        o.setAttribute("aria-hidden", "true"),
        document.body.appendChild(o));
      var a = eh(eh({}, lF), n);
      Object.assign(o.style, a), (o.textContent = "".concat(t));
      var u = o.getBoundingClientRect(),
        s = { width: u.width, height: u.height };
      return (
        (Ci.widthCache[i] = s),
        ++Ci.cacheCount > sF && ((Ci.cacheCount = 0), (Ci.widthCache = {})),
        s
      );
    } catch {
      return { width: 0, height: 0 };
    }
  },
  fF = function (t) {
    return {
      top: t.top + window.scrollY - document.documentElement.clientTop,
      left: t.left + window.scrollX - document.documentElement.clientLeft,
    };
  };
function au(e) {
  "@babel/helpers - typeof";
  return (
    (au =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    au(e)
  );
}
function $l(e, t) {
  return vF(e) || hF(e, t) || dF(e, t) || pF();
}
function pF() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function dF(e, t) {
  if (e) {
    if (typeof e == "string") return X0(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return X0(e, t);
  }
}
function X0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function hF(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (r != null) {
    var n,
      i,
      o,
      a,
      u = [],
      s = !0,
      l = !1;
    try {
      if (((o = (r = r.call(e)).next), t === 0)) {
        if (Object(r) !== r) return;
        s = !1;
      } else
        for (
          ;
          !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t);
          s = !0
        );
    } catch (f) {
      (l = !0), (i = f);
    } finally {
      try {
        if (!s && r.return != null && ((a = r.return()), Object(a) !== a))
          return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function vF(e) {
  if (Array.isArray(e)) return e;
}
function mF(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Y0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, gF(n.key), n);
  }
}
function yF(e, t, r) {
  return (
    t && Y0(e.prototype, t),
    r && Y0(e, r),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function gF(e) {
  var t = bF(e, "string");
  return au(t) == "symbol" ? t : t + "";
}
function bF(e, t) {
  if (au(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (au(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Q0 = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  Z0 = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  wF = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/,
  xF = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/,
  T_ = {
    cm: 96 / 2.54,
    mm: 96 / 25.4,
    pt: 96 / 72,
    pc: 96 / 6,
    in: 96,
    Q: 96 / (2.54 * 40),
    px: 1,
  },
  SF = Object.keys(T_),
  qi = "NaN";
function OF(e, t) {
  return e * T_[t];
}
var gs = (function () {
  function e(t, r) {
    mF(this, e),
      (this.num = t),
      (this.unit = r),
      (this.num = t),
      (this.unit = r),
      Number.isNaN(t) && (this.unit = ""),
      r !== "" && !wF.test(r) && ((this.num = NaN), (this.unit = "")),
      SF.includes(r) && ((this.num = OF(t, r)), (this.unit = "px"));
  }
  return yF(
    e,
    [
      {
        key: "add",
        value: function (r) {
          return this.unit !== r.unit
            ? new e(NaN, "")
            : new e(this.num + r.num, this.unit);
        },
      },
      {
        key: "subtract",
        value: function (r) {
          return this.unit !== r.unit
            ? new e(NaN, "")
            : new e(this.num - r.num, this.unit);
        },
      },
      {
        key: "multiply",
        value: function (r) {
          return this.unit !== "" && r.unit !== "" && this.unit !== r.unit
            ? new e(NaN, "")
            : new e(this.num * r.num, this.unit || r.unit);
        },
      },
      {
        key: "divide",
        value: function (r) {
          return this.unit !== "" && r.unit !== "" && this.unit !== r.unit
            ? new e(NaN, "")
            : new e(this.num / r.num, this.unit || r.unit);
        },
      },
      {
        key: "toString",
        value: function () {
          return "".concat(this.num).concat(this.unit);
        },
      },
      {
        key: "isNaN",
        value: function () {
          return Number.isNaN(this.num);
        },
      },
    ],
    [
      {
        key: "parse",
        value: function (r) {
          var n,
            i = (n = xF.exec(r)) !== null && n !== void 0 ? n : [],
            o = $l(i, 3),
            a = o[1],
            u = o[2];
          return new e(parseFloat(a), u ?? "");
        },
      },
    ]
  );
})();
function $_(e) {
  if (e.includes(qi)) return qi;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var r,
      n = (r = Q0.exec(t)) !== null && r !== void 0 ? r : [],
      i = $l(n, 4),
      o = i[1],
      a = i[2],
      u = i[3],
      s = gs.parse(o ?? ""),
      l = gs.parse(u ?? ""),
      f = a === "*" ? s.multiply(l) : s.divide(l);
    if (f.isNaN()) return qi;
    t = t.replace(Q0, f.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var c,
      p = (c = Z0.exec(t)) !== null && c !== void 0 ? c : [],
      d = $l(p, 4),
      h = d[1],
      y = d[2],
      w = d[3],
      m = gs.parse(h ?? ""),
      v = gs.parse(w ?? ""),
      g = y === "+" ? m.add(v) : m.subtract(v);
    if (g.isNaN()) return qi;
    t = t.replace(Z0, g.toString());
  }
  return t;
}
var J0 = /\(([^()]*)\)/;
function _F(e) {
  for (var t = e; t.includes("("); ) {
    var r = J0.exec(t),
      n = $l(r, 2),
      i = n[1];
    t = t.replace(J0, $_(i));
  }
  return t;
}
function PF(e) {
  var t = e.replace(/\s+/g, "");
  return (t = _F(t)), (t = $_(t)), t;
}
function AF(e) {
  try {
    return PF(e);
  } catch {
    return qi;
  }
}
function pp(e) {
  var t = AF(e.slice(5, -1));
  return t === qi ? "" : t;
}
var EF = [
    "x",
    "y",
    "lineHeight",
    "capHeight",
    "scaleToFit",
    "textAnchor",
    "verticalAnchor",
    "fill",
  ],
  IF = ["dx", "dy", "angle", "className", "breakAll"];
function th() {
  return (
    (th = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    th.apply(this, arguments)
  );
}
function e1(e, t) {
  if (e == null) return {};
  var r = TF(e, t),
    n,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (n = o[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n]);
  }
  return r;
}
function TF(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function t1(e, t) {
  return jF(e) || kF(e, t) || CF(e, t) || $F();
}
function $F() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function CF(e, t) {
  if (e) {
    if (typeof e == "string") return r1(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return r1(e, t);
  }
}
function r1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function kF(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (r != null) {
    var n,
      i,
      o,
      a,
      u = [],
      s = !0,
      l = !1;
    try {
      if (((o = (r = r.call(e)).next), t === 0)) {
        if (Object(r) !== r) return;
        s = !1;
      } else
        for (
          ;
          !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t);
          s = !0
        );
    } catch (f) {
      (l = !0), (i = f);
    } finally {
      try {
        if (!s && r.return != null && ((a = r.return()), Object(a) !== a))
          return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function jF(e) {
  if (Array.isArray(e)) return e;
}
var C_ = /[ \f\n\r\t\v\u2028\u2029]+/,
  k_ = function (t) {
    var r = t.children,
      n = t.breakAll,
      i = t.style;
    try {
      var o = [];
      ue(r) ||
        (n ? (o = r.toString().split("")) : (o = r.toString().split(C_)));
      var a = o.map(function (s) {
          return { word: s, width: ka(s, i).width };
        }),
        u = n ? 0 : ka(" ", i).width;
      return { wordsWithComputedWidth: a, spaceWidth: u };
    } catch {
      return null;
    }
  },
  MF = function (t, r, n, i, o) {
    var a = t.maxLines,
      u = t.children,
      s = t.style,
      l = t.breakAll,
      f = W(a),
      c = u,
      p = function () {
        var j =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        return j.reduce(function (D, L) {
          var T = L.word,
            k = L.width,
            F = D[D.length - 1];
          if (F && (i == null || o || F.width + k + n < Number(i)))
            F.words.push(T), (F.width += k + n);
          else {
            var H = { words: [T], width: k };
            D.push(H);
          }
          return D;
        }, []);
      },
      d = p(r),
      h = function (j) {
        return j.reduce(function (D, L) {
          return D.width > L.width ? D : L;
        });
      };
    if (!f) return d;
    for (
      var y = "…",
        w = function (j) {
          var D = c.slice(0, j),
            L = k_({
              breakAll: l,
              style: s,
              children: D + y,
            }).wordsWithComputedWidth,
            T = p(L),
            k = T.length > a || h(T).width > Number(i);
          return [k, T];
        },
        m = 0,
        v = c.length - 1,
        g = 0,
        S;
      m <= v && g <= c.length - 1;

    ) {
      var b = Math.floor((m + v) / 2),
        x = b - 1,
        O = w(x),
        _ = t1(O, 2),
        P = _[0],
        I = _[1],
        E = w(b),
        $ = t1(E, 1),
        M = $[0];
      if ((!P && !M && (m = b + 1), P && M && (v = b - 1), !P && M)) {
        S = I;
        break;
      }
      g++;
    }
    return S || d;
  },
  n1 = function (t) {
    var r = ue(t) ? [] : t.toString().split(C_);
    return [{ words: r }];
  },
  NF = function (t) {
    var r = t.width,
      n = t.scaleToFit,
      i = t.children,
      o = t.style,
      a = t.breakAll,
      u = t.maxLines;
    if ((r || n) && !En.isSsr) {
      var s,
        l,
        f = k_({ breakAll: a, children: i, style: o });
      if (f) {
        var c = f.wordsWithComputedWidth,
          p = f.spaceWidth;
        (s = c), (l = p);
      } else return n1(i);
      return MF(
        { breakAll: a, children: i, maxLines: u, style: o },
        s,
        l,
        r,
        n
      );
    }
    return n1(i);
  },
  i1 = "#808080",
  Cl = function (t) {
    var r = t.x,
      n = r === void 0 ? 0 : r,
      i = t.y,
      o = i === void 0 ? 0 : i,
      a = t.lineHeight,
      u = a === void 0 ? "1em" : a,
      s = t.capHeight,
      l = s === void 0 ? "0.71em" : s,
      f = t.scaleToFit,
      c = f === void 0 ? !1 : f,
      p = t.textAnchor,
      d = p === void 0 ? "start" : p,
      h = t.verticalAnchor,
      y = h === void 0 ? "end" : h,
      w = t.fill,
      m = w === void 0 ? i1 : w,
      v = e1(t, EF),
      g = z.useMemo(
        function () {
          return NF({
            breakAll: v.breakAll,
            children: v.children,
            maxLines: v.maxLines,
            scaleToFit: c,
            style: v.style,
            width: v.width,
          });
        },
        [v.breakAll, v.children, v.maxLines, c, v.style, v.width]
      ),
      S = v.dx,
      b = v.dy,
      x = v.angle,
      O = v.className,
      _ = v.breakAll,
      P = e1(v, IF);
    if (!Ue(n) || !Ue(o)) return null;
    var I = n + (W(S) ? S : 0),
      E = o + (W(b) ? b : 0),
      $;
    switch (y) {
      case "start":
        $ = pp("calc(".concat(l, ")"));
        break;
      case "middle":
        $ = pp(
          "calc("
            .concat((g.length - 1) / 2, " * -")
            .concat(u, " + (")
            .concat(l, " / 2))")
        );
        break;
      default:
        $ = pp("calc(".concat(g.length - 1, " * -").concat(u, ")"));
        break;
    }
    var M = [];
    if (c) {
      var N = g[0].width,
        j = v.width;
      M.push("scale(".concat((W(j) ? j / N : 1) / N, ")"));
    }
    return (
      x && M.push("rotate(".concat(x, ", ").concat(I, ", ").concat(E, ")")),
      M.length && (P.transform = M.join(" ")),
      A.createElement(
        "text",
        th({}, ae(P, !0), {
          x: I,
          y: E,
          className: se("recharts-text", O),
          textAnchor: d,
          fill: m.includes("url") ? i1 : m,
        }),
        g.map(function (D, L) {
          var T = D.words.join(_ ? "" : " ");
          return A.createElement(
            "tspan",
            { x: I, dy: L === 0 ? $ : u, key: "".concat(T, "-").concat(L) },
            T
          );
        })
      )
    );
  };
function In(e, t) {
  return e == null || t == null
    ? NaN
    : e < t
      ? -1
      : e > t
        ? 1
        : e >= t
          ? 0
          : NaN;
}
function DF(e, t) {
  return e == null || t == null
    ? NaN
    : t < e
      ? -1
      : t > e
        ? 1
        : t >= e
          ? 0
          : NaN;
}
function Am(e) {
  let t, r, n;
  e.length !== 2
    ? ((t = In), (r = (u, s) => In(e(u), s)), (n = (u, s) => e(u) - s))
    : ((t = e === In || e === DF ? e : LF), (r = e), (n = e));
  function i(u, s, l = 0, f = u.length) {
    if (l < f) {
      if (t(s, s) !== 0) return f;
      do {
        const c = (l + f) >>> 1;
        r(u[c], s) < 0 ? (l = c + 1) : (f = c);
      } while (l < f);
    }
    return l;
  }
  function o(u, s, l = 0, f = u.length) {
    if (l < f) {
      if (t(s, s) !== 0) return f;
      do {
        const c = (l + f) >>> 1;
        r(u[c], s) <= 0 ? (l = c + 1) : (f = c);
      } while (l < f);
    }
    return l;
  }
  function a(u, s, l = 0, f = u.length) {
    const c = i(u, s, l, f - 1);
    return c > l && n(u[c - 1], s) > -n(u[c], s) ? c - 1 : c;
  }
  return { left: i, center: a, right: o };
}
function LF() {
  return 0;
}
function j_(e) {
  return e === null ? NaN : +e;
}
function* RF(e, t) {
  for (let r of e) r != null && (r = +r) >= r && (yield r);
}
const FF = Am(In),
  Hu = FF.right;
Am(j_).center;
class o1 extends Map {
  constructor(t, r = UF) {
    if (
      (super(),
      Object.defineProperties(this, {
        _intern: { value: new Map() },
        _key: { value: r },
      }),
      t != null)
    )
      for (const [n, i] of t) this.set(n, i);
  }
  get(t) {
    return super.get(a1(this, t));
  }
  has(t) {
    return super.has(a1(this, t));
  }
  set(t, r) {
    return super.set(BF(this, t), r);
  }
  delete(t) {
    return super.delete(zF(this, t));
  }
}
function a1({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : r;
}
function BF({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function zF({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) && ((r = e.get(n)), e.delete(n)), r;
}
function UF(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function WF(e = In) {
  if (e === In) return M_;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    const n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
  };
}
function M_(e, t) {
  return (
    (e == null || !(e >= e)) - (t == null || !(t >= t)) ||
    (e < t ? -1 : e > t ? 1 : 0)
  );
}
const HF = Math.sqrt(50),
  GF = Math.sqrt(10),
  VF = Math.sqrt(2);
function kl(e, t, r) {
  const n = (t - e) / Math.max(0, r),
    i = Math.floor(Math.log10(n)),
    o = n / Math.pow(10, i),
    a = o >= HF ? 10 : o >= GF ? 5 : o >= VF ? 2 : 1;
  let u, s, l;
  return (
    i < 0
      ? ((l = Math.pow(10, -i) / a),
        (u = Math.round(e * l)),
        (s = Math.round(t * l)),
        u / l < e && ++u,
        s / l > t && --s,
        (l = -l))
      : ((l = Math.pow(10, i) * a),
        (u = Math.round(e / l)),
        (s = Math.round(t / l)),
        u * l < e && ++u,
        s * l > t && --s),
    s < u && 0.5 <= r && r < 2 ? kl(e, t, r * 2) : [u, s, l]
  );
}
function rh(e, t, r) {
  if (((t = +t), (e = +e), (r = +r), !(r > 0))) return [];
  if (e === t) return [e];
  const n = t < e,
    [i, o, a] = n ? kl(t, e, r) : kl(e, t, r);
  if (!(o >= i)) return [];
  const u = o - i + 1,
    s = new Array(u);
  if (n)
    if (a < 0) for (let l = 0; l < u; ++l) s[l] = (o - l) / -a;
    else for (let l = 0; l < u; ++l) s[l] = (o - l) * a;
  else if (a < 0) for (let l = 0; l < u; ++l) s[l] = (i + l) / -a;
  else for (let l = 0; l < u; ++l) s[l] = (i + l) * a;
  return s;
}
function nh(e, t, r) {
  return (t = +t), (e = +e), (r = +r), kl(e, t, r)[2];
}
function ih(e, t, r) {
  (t = +t), (e = +e), (r = +r);
  const n = t < e,
    i = n ? nh(t, e, r) : nh(e, t, r);
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function u1(e, t) {
  let r;
  for (const n of e)
    n != null && (r < n || (r === void 0 && n >= n)) && (r = n);
  return r;
}
function s1(e, t) {
  let r;
  for (const n of e)
    n != null && (r > n || (r === void 0 && n >= n)) && (r = n);
  return r;
}
function N_(e, t, r = 0, n = 1 / 0, i) {
  if (
    ((t = Math.floor(t)),
    (r = Math.floor(Math.max(0, r))),
    (n = Math.floor(Math.min(e.length - 1, n))),
    !(r <= t && t <= n))
  )
    return e;
  for (i = i === void 0 ? M_ : WF(i); n > r; ) {
    if (n - r > 600) {
      const s = n - r + 1,
        l = t - r + 1,
        f = Math.log(s),
        c = 0.5 * Math.exp((2 * f) / 3),
        p = 0.5 * Math.sqrt((f * c * (s - c)) / s) * (l - s / 2 < 0 ? -1 : 1),
        d = Math.max(r, Math.floor(t - (l * c) / s + p)),
        h = Math.min(n, Math.floor(t + ((s - l) * c) / s + p));
      N_(e, t, d, h, i);
    }
    const o = e[t];
    let a = r,
      u = n;
    for (sa(e, r, t), i(e[n], o) > 0 && sa(e, r, n); a < u; ) {
      for (sa(e, a, u), ++a, --u; i(e[a], o) < 0; ) ++a;
      for (; i(e[u], o) > 0; ) --u;
    }
    i(e[r], o) === 0 ? sa(e, r, u) : (++u, sa(e, u, n)),
      u <= t && (r = u + 1),
      t <= u && (n = u - 1);
  }
  return e;
}
function sa(e, t, r) {
  const n = e[t];
  (e[t] = e[r]), (e[r] = n);
}
function qF(e, t, r) {
  if (((e = Float64Array.from(RF(e))), !(!(n = e.length) || isNaN((t = +t))))) {
    if (t <= 0 || n < 2) return s1(e);
    if (t >= 1) return u1(e);
    var n,
      i = (n - 1) * t,
      o = Math.floor(i),
      a = u1(N_(e, o).subarray(0, o + 1)),
      u = s1(e.subarray(o + 1));
    return a + (u - a) * (i - o);
  }
}
function KF(e, t, r = j_) {
  if (!(!(n = e.length) || isNaN((t = +t)))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n,
      i = (n - 1) * t,
      o = Math.floor(i),
      a = +r(e[o], o, e),
      u = +r(e[o + 1], o + 1, e);
    return a + (u - a) * (i - o);
  }
}
function XF(e, t, r) {
  (e = +e),
    (t = +t),
    (r = (i = arguments.length) < 2 ? ((t = e), (e = 0), 1) : i < 3 ? 1 : +r);
  for (
    var n = -1, i = Math.max(0, Math.ceil((t - e) / r)) | 0, o = new Array(i);
    ++n < i;

  )
    o[n] = e + n * r;
  return o;
}
function lr(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function an(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof e == "function" ? this.interpolator(e) : this.range(e);
      break;
    }
    default: {
      this.domain(e),
        typeof t == "function" ? this.interpolator(t) : this.range(t);
      break;
    }
  }
  return this;
}
const oh = Symbol("implicit");
function Em() {
  var e = new o1(),
    t = [],
    r = [],
    n = oh;
  function i(o) {
    let a = e.get(o);
    if (a === void 0) {
      if (n !== oh) return n;
      e.set(o, (a = t.push(o) - 1));
    }
    return r[a % r.length];
  }
  return (
    (i.domain = function (o) {
      if (!arguments.length) return t.slice();
      (t = []), (e = new o1());
      for (const a of o) e.has(a) || e.set(a, t.push(a) - 1);
      return i;
    }),
    (i.range = function (o) {
      return arguments.length ? ((r = Array.from(o)), i) : r.slice();
    }),
    (i.unknown = function (o) {
      return arguments.length ? ((n = o), i) : n;
    }),
    (i.copy = function () {
      return Em(t, r).unknown(n);
    }),
    lr.apply(i, arguments),
    i
  );
}
function uu() {
  var e = Em().unknown(void 0),
    t = e.domain,
    r = e.range,
    n = 0,
    i = 1,
    o,
    a,
    u = !1,
    s = 0,
    l = 0,
    f = 0.5;
  delete e.unknown;
  function c() {
    var p = t().length,
      d = i < n,
      h = d ? i : n,
      y = d ? n : i;
    (o = (y - h) / Math.max(1, p - s + l * 2)),
      u && (o = Math.floor(o)),
      (h += (y - h - o * (p - s)) * f),
      (a = o * (1 - s)),
      u && ((h = Math.round(h)), (a = Math.round(a)));
    var w = XF(p).map(function (m) {
      return h + o * m;
    });
    return r(d ? w.reverse() : w);
  }
  return (
    (e.domain = function (p) {
      return arguments.length ? (t(p), c()) : t();
    }),
    (e.range = function (p) {
      return arguments.length
        ? (([n, i] = p), (n = +n), (i = +i), c())
        : [n, i];
    }),
    (e.rangeRound = function (p) {
      return ([n, i] = p), (n = +n), (i = +i), (u = !0), c();
    }),
    (e.bandwidth = function () {
      return a;
    }),
    (e.step = function () {
      return o;
    }),
    (e.round = function (p) {
      return arguments.length ? ((u = !!p), c()) : u;
    }),
    (e.padding = function (p) {
      return arguments.length ? ((s = Math.min(1, (l = +p))), c()) : s;
    }),
    (e.paddingInner = function (p) {
      return arguments.length ? ((s = Math.min(1, p)), c()) : s;
    }),
    (e.paddingOuter = function (p) {
      return arguments.length ? ((l = +p), c()) : l;
    }),
    (e.align = function (p) {
      return arguments.length ? ((f = Math.max(0, Math.min(1, p))), c()) : f;
    }),
    (e.copy = function () {
      return uu(t(), [n, i]).round(u).paddingInner(s).paddingOuter(l).align(f);
    }),
    lr.apply(c(), arguments)
  );
}
function D_(e) {
  var t = e.copy;
  return (
    (e.padding = e.paddingOuter),
    delete e.paddingInner,
    delete e.paddingOuter,
    (e.copy = function () {
      return D_(t());
    }),
    e
  );
}
function ja() {
  return D_(uu.apply(null, arguments).paddingInner(1));
}
function Im(e, t, r) {
  (e.prototype = t.prototype = r), (r.constructor = e);
}
function L_(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function Gu() {}
var su = 0.7,
  jl = 1 / su,
  io = "\\s*([+-]?\\d+)\\s*",
  lu = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  Cr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  YF = /^#([0-9a-f]{3,8})$/,
  QF = new RegExp(`^rgb\\(${io},${io},${io}\\)$`),
  ZF = new RegExp(`^rgb\\(${Cr},${Cr},${Cr}\\)$`),
  JF = new RegExp(`^rgba\\(${io},${io},${io},${lu}\\)$`),
  eB = new RegExp(`^rgba\\(${Cr},${Cr},${Cr},${lu}\\)$`),
  tB = new RegExp(`^hsl\\(${lu},${Cr},${Cr}\\)$`),
  rB = new RegExp(`^hsla\\(${lu},${Cr},${Cr},${lu}\\)$`),
  l1 = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  };
Im(Gu, cu, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: c1,
  formatHex: c1,
  formatHex8: nB,
  formatHsl: iB,
  formatRgb: f1,
  toString: f1,
});
function c1() {
  return this.rgb().formatHex();
}
function nB() {
  return this.rgb().formatHex8();
}
function iB() {
  return R_(this).formatHsl();
}
function f1() {
  return this.rgb().formatRgb();
}
function cu(e) {
  var t, r;
  return (
    (e = (e + "").trim().toLowerCase()),
    (t = YF.exec(e))
      ? ((r = t[1].length),
        (t = parseInt(t[1], 16)),
        r === 6
          ? p1(t)
          : r === 3
            ? new kt(
                ((t >> 8) & 15) | ((t >> 4) & 240),
                ((t >> 4) & 15) | (t & 240),
                ((t & 15) << 4) | (t & 15),
                1
              )
            : r === 8
              ? bs(
                  (t >> 24) & 255,
                  (t >> 16) & 255,
                  (t >> 8) & 255,
                  (t & 255) / 255
                )
              : r === 4
                ? bs(
                    ((t >> 12) & 15) | ((t >> 8) & 240),
                    ((t >> 8) & 15) | ((t >> 4) & 240),
                    ((t >> 4) & 15) | (t & 240),
                    (((t & 15) << 4) | (t & 15)) / 255
                  )
                : null)
      : (t = QF.exec(e))
        ? new kt(t[1], t[2], t[3], 1)
        : (t = ZF.exec(e))
          ? new kt(
              (t[1] * 255) / 100,
              (t[2] * 255) / 100,
              (t[3] * 255) / 100,
              1
            )
          : (t = JF.exec(e))
            ? bs(t[1], t[2], t[3], t[4])
            : (t = eB.exec(e))
              ? bs(
                  (t[1] * 255) / 100,
                  (t[2] * 255) / 100,
                  (t[3] * 255) / 100,
                  t[4]
                )
              : (t = tB.exec(e))
                ? v1(t[1], t[2] / 100, t[3] / 100, 1)
                : (t = rB.exec(e))
                  ? v1(t[1], t[2] / 100, t[3] / 100, t[4])
                  : l1.hasOwnProperty(e)
                    ? p1(l1[e])
                    : e === "transparent"
                      ? new kt(NaN, NaN, NaN, 0)
                      : null
  );
}
function p1(e) {
  return new kt((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function bs(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new kt(e, t, r, n);
}
function oB(e) {
  return (
    e instanceof Gu || (e = cu(e)),
    e ? ((e = e.rgb()), new kt(e.r, e.g, e.b, e.opacity)) : new kt()
  );
}
function ah(e, t, r, n) {
  return arguments.length === 1 ? oB(e) : new kt(e, t, r, n ?? 1);
}
function kt(e, t, r, n) {
  (this.r = +e), (this.g = +t), (this.b = +r), (this.opacity = +n);
}
Im(
  kt,
  ah,
  L_(Gu, {
    brighter(e) {
      return (
        (e = e == null ? jl : Math.pow(jl, e)),
        new kt(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? su : Math.pow(su, e)),
        new kt(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new kt(ui(this.r), ui(this.g), ui(this.b), Ml(this.opacity));
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    hex: d1,
    formatHex: d1,
    formatHex8: aB,
    formatRgb: h1,
    toString: h1,
  })
);
function d1() {
  return `#${ti(this.r)}${ti(this.g)}${ti(this.b)}`;
}
function aB() {
  return `#${ti(this.r)}${ti(this.g)}${ti(this.b)}${ti((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function h1() {
  const e = Ml(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ui(this.r)}, ${ui(this.g)}, ${ui(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Ml(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ui(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ti(e) {
  return (e = ui(e)), (e < 16 ? "0" : "") + e.toString(16);
}
function v1(e, t, r, n) {
  return (
    n <= 0
      ? (e = t = r = NaN)
      : r <= 0 || r >= 1
        ? (e = t = NaN)
        : t <= 0 && (e = NaN),
    new mr(e, t, r, n)
  );
}
function R_(e) {
  if (e instanceof mr) return new mr(e.h, e.s, e.l, e.opacity);
  if ((e instanceof Gu || (e = cu(e)), !e)) return new mr();
  if (e instanceof mr) return e;
  e = e.rgb();
  var t = e.r / 255,
    r = e.g / 255,
    n = e.b / 255,
    i = Math.min(t, r, n),
    o = Math.max(t, r, n),
    a = NaN,
    u = o - i,
    s = (o + i) / 2;
  return (
    u
      ? (t === o
          ? (a = (r - n) / u + (r < n) * 6)
          : r === o
            ? (a = (n - t) / u + 2)
            : (a = (t - r) / u + 4),
        (u /= s < 0.5 ? o + i : 2 - o - i),
        (a *= 60))
      : (u = s > 0 && s < 1 ? 0 : a),
    new mr(a, u, s, e.opacity)
  );
}
function uB(e, t, r, n) {
  return arguments.length === 1 ? R_(e) : new mr(e, t, r, n ?? 1);
}
function mr(e, t, r, n) {
  (this.h = +e), (this.s = +t), (this.l = +r), (this.opacity = +n);
}
Im(
  mr,
  uB,
  L_(Gu, {
    brighter(e) {
      return (
        (e = e == null ? jl : Math.pow(jl, e)),
        new mr(this.h, this.s, this.l * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? su : Math.pow(su, e)),
        new mr(this.h, this.s, this.l * e, this.opacity)
      );
    },
    rgb() {
      var e = (this.h % 360) + (this.h < 0) * 360,
        t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
        r = this.l,
        n = r + (r < 0.5 ? r : 1 - r) * t,
        i = 2 * r - n;
      return new kt(
        dp(e >= 240 ? e - 240 : e + 120, i, n),
        dp(e, i, n),
        dp(e < 120 ? e + 240 : e - 120, i, n),
        this.opacity
      );
    },
    clamp() {
      return new mr(m1(this.h), ws(this.s), ws(this.l), Ml(this.opacity));
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl() {
      const e = Ml(this.opacity);
      return `${e === 1 ? "hsl(" : "hsla("}${m1(this.h)}, ${ws(this.s) * 100}%, ${ws(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
    },
  })
);
function m1(e) {
  return (e = (e || 0) % 360), e < 0 ? e + 360 : e;
}
function ws(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function dp(e, t, r) {
  return (
    (e < 60
      ? t + ((r - t) * e) / 60
      : e < 180
        ? r
        : e < 240
          ? t + ((r - t) * (240 - e)) / 60
          : t) * 255
  );
}
const Tm = (e) => () => e;
function sB(e, t) {
  return function (r) {
    return e + r * t;
  };
}
function lB(e, t, r) {
  return (
    (e = Math.pow(e, r)),
    (t = Math.pow(t, r) - e),
    (r = 1 / r),
    function (n) {
      return Math.pow(e + n * t, r);
    }
  );
}
function cB(e) {
  return (e = +e) == 1
    ? F_
    : function (t, r) {
        return r - t ? lB(t, r, e) : Tm(isNaN(t) ? r : t);
      };
}
function F_(e, t) {
  var r = t - e;
  return r ? sB(e, r) : Tm(isNaN(e) ? t : e);
}
const y1 = (function e(t) {
  var r = cB(t);
  function n(i, o) {
    var a = r((i = ah(i)).r, (o = ah(o)).r),
      u = r(i.g, o.g),
      s = r(i.b, o.b),
      l = F_(i.opacity, o.opacity);
    return function (f) {
      return (
        (i.r = a(f)), (i.g = u(f)), (i.b = s(f)), (i.opacity = l(f)), i + ""
      );
    };
  }
  return (n.gamma = e), n;
})(1);
function fB(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0,
    n = t.slice(),
    i;
  return function (o) {
    for (i = 0; i < r; ++i) n[i] = e[i] * (1 - o) + t[i] * o;
    return n;
  };
}
function pB(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function dB(e, t) {
  var r = t ? t.length : 0,
    n = e ? Math.min(r, e.length) : 0,
    i = new Array(n),
    o = new Array(r),
    a;
  for (a = 0; a < n; ++a) i[a] = qo(e[a], t[a]);
  for (; a < r; ++a) o[a] = t[a];
  return function (u) {
    for (a = 0; a < n; ++a) o[a] = i[a](u);
    return o;
  };
}
function hB(e, t) {
  var r = new Date();
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return r.setTime(e * (1 - n) + t * n), r;
    }
  );
}
function Nl(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (r) {
      return e * (1 - r) + t * r;
    }
  );
}
function vB(e, t) {
  var r = {},
    n = {},
    i;
  (e === null || typeof e != "object") && (e = {}),
    (t === null || typeof t != "object") && (t = {});
  for (i in t) i in e ? (r[i] = qo(e[i], t[i])) : (n[i] = t[i]);
  return function (o) {
    for (i in r) n[i] = r[i](o);
    return n;
  };
}
var uh = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  hp = new RegExp(uh.source, "g");
function mB(e) {
  return function () {
    return e;
  };
}
function yB(e) {
  return function (t) {
    return e(t) + "";
  };
}
function gB(e, t) {
  var r = (uh.lastIndex = hp.lastIndex = 0),
    n,
    i,
    o,
    a = -1,
    u = [],
    s = [];
  for (e = e + "", t = t + ""; (n = uh.exec(e)) && (i = hp.exec(t)); )
    (o = i.index) > r &&
      ((o = t.slice(r, o)), u[a] ? (u[a] += o) : (u[++a] = o)),
      (n = n[0]) === (i = i[0])
        ? u[a]
          ? (u[a] += i)
          : (u[++a] = i)
        : ((u[++a] = null), s.push({ i: a, x: Nl(n, i) })),
      (r = hp.lastIndex);
  return (
    r < t.length && ((o = t.slice(r)), u[a] ? (u[a] += o) : (u[++a] = o)),
    u.length < 2
      ? s[0]
        ? yB(s[0].x)
        : mB(t)
      : ((t = s.length),
        function (l) {
          for (var f = 0, c; f < t; ++f) u[(c = s[f]).i] = c.x(l);
          return u.join("");
        })
  );
}
function qo(e, t) {
  var r = typeof t,
    n;
  return t == null || r === "boolean"
    ? Tm(t)
    : (r === "number"
        ? Nl
        : r === "string"
          ? (n = cu(t))
            ? ((t = n), y1)
            : gB
          : t instanceof cu
            ? y1
            : t instanceof Date
              ? hB
              : pB(t)
                ? fB
                : Array.isArray(t)
                  ? dB
                  : (typeof t.valueOf != "function" &&
                        typeof t.toString != "function") ||
                      isNaN(t)
                    ? vB
                    : Nl)(e, t);
}
function $m(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (r) {
      return Math.round(e * (1 - r) + t * r);
    }
  );
}
function bB(e, t) {
  t === void 0 && ((t = e), (e = qo));
  for (
    var r = 0, n = t.length - 1, i = t[0], o = new Array(n < 0 ? 0 : n);
    r < n;

  )
    o[r] = e(i, (i = t[++r]));
  return function (a) {
    var u = Math.max(0, Math.min(n - 1, Math.floor((a *= n))));
    return o[u](a - u);
  };
}
function wB(e) {
  return function () {
    return e;
  };
}
function Dl(e) {
  return +e;
}
var g1 = [0, 1];
function gt(e) {
  return e;
}
function sh(e, t) {
  return (t -= e = +e)
    ? function (r) {
        return (r - e) / t;
      }
    : wB(isNaN(t) ? NaN : 0.5);
}
function xB(e, t) {
  var r;
  return (
    e > t && ((r = e), (e = t), (t = r)),
    function (n) {
      return Math.max(e, Math.min(t, n));
    }
  );
}
function SB(e, t, r) {
  var n = e[0],
    i = e[1],
    o = t[0],
    a = t[1];
  return (
    i < n ? ((n = sh(i, n)), (o = r(a, o))) : ((n = sh(n, i)), (o = r(o, a))),
    function (u) {
      return o(n(u));
    }
  );
}
function OB(e, t, r) {
  var n = Math.min(e.length, t.length) - 1,
    i = new Array(n),
    o = new Array(n),
    a = -1;
  for (
    e[n] < e[0] && ((e = e.slice().reverse()), (t = t.slice().reverse()));
    ++a < n;

  )
    (i[a] = sh(e[a], e[a + 1])), (o[a] = r(t[a], t[a + 1]));
  return function (u) {
    var s = Hu(e, u, 1, n) - 1;
    return o[s](i[s](u));
  };
}
function Vu(e, t) {
  return t
    .domain(e.domain())
    .range(e.range())
    .interpolate(e.interpolate())
    .clamp(e.clamp())
    .unknown(e.unknown());
}
function rf() {
  var e = g1,
    t = g1,
    r = qo,
    n,
    i,
    o,
    a = gt,
    u,
    s,
    l;
  function f() {
    var p = Math.min(e.length, t.length);
    return (
      a !== gt && (a = xB(e[0], e[p - 1])),
      (u = p > 2 ? OB : SB),
      (s = l = null),
      c
    );
  }
  function c(p) {
    return p == null || isNaN((p = +p))
      ? o
      : (s || (s = u(e.map(n), t, r)))(n(a(p)));
  }
  return (
    (c.invert = function (p) {
      return a(i((l || (l = u(t, e.map(n), Nl)))(p)));
    }),
    (c.domain = function (p) {
      return arguments.length ? ((e = Array.from(p, Dl)), f()) : e.slice();
    }),
    (c.range = function (p) {
      return arguments.length ? ((t = Array.from(p)), f()) : t.slice();
    }),
    (c.rangeRound = function (p) {
      return (t = Array.from(p)), (r = $m), f();
    }),
    (c.clamp = function (p) {
      return arguments.length ? ((a = p ? !0 : gt), f()) : a !== gt;
    }),
    (c.interpolate = function (p) {
      return arguments.length ? ((r = p), f()) : r;
    }),
    (c.unknown = function (p) {
      return arguments.length ? ((o = p), c) : o;
    }),
    function (p, d) {
      return (n = p), (i = d), f();
    }
  );
}
function Cm() {
  return rf()(gt, gt);
}
function _B(e) {
  return Math.abs((e = Math.round(e))) >= 1e21
    ? e.toLocaleString("en").replace(/,/g, "")
    : e.toString(10);
}
function Ll(e, t) {
  if (
    (r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0
  )
    return null;
  var r,
    n = e.slice(0, r);
  return [n.length > 1 ? n[0] + n.slice(2) : n, +e.slice(r + 1)];
}
function bo(e) {
  return (e = Ll(Math.abs(e))), e ? e[1] : NaN;
}
function PB(e, t) {
  return function (r, n) {
    for (
      var i = r.length, o = [], a = 0, u = e[0], s = 0;
      i > 0 &&
      u > 0 &&
      (s + u + 1 > n && (u = Math.max(1, n - s)),
      o.push(r.substring((i -= u), i + u)),
      !((s += u + 1) > n));

    )
      u = e[(a = (a + 1) % e.length)];
    return o.reverse().join(t);
  };
}
function AB(e) {
  return function (t) {
    return t.replace(/[0-9]/g, function (r) {
      return e[+r];
    });
  };
}
var EB =
  /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function fu(e) {
  if (!(t = EB.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new km({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10],
  });
}
fu.prototype = km.prototype;
function km(e) {
  (this.fill = e.fill === void 0 ? " " : e.fill + ""),
    (this.align = e.align === void 0 ? ">" : e.align + ""),
    (this.sign = e.sign === void 0 ? "-" : e.sign + ""),
    (this.symbol = e.symbol === void 0 ? "" : e.symbol + ""),
    (this.zero = !!e.zero),
    (this.width = e.width === void 0 ? void 0 : +e.width),
    (this.comma = !!e.comma),
    (this.precision = e.precision === void 0 ? void 0 : +e.precision),
    (this.trim = !!e.trim),
    (this.type = e.type === void 0 ? "" : e.type + "");
}
km.prototype.toString = function () {
  return (
    this.fill +
    this.align +
    this.sign +
    this.symbol +
    (this.zero ? "0" : "") +
    (this.width === void 0 ? "" : Math.max(1, this.width | 0)) +
    (this.comma ? "," : "") +
    (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) +
    (this.trim ? "~" : "") +
    this.type
  );
};
function IB(e) {
  e: for (var t = e.length, r = 1, n = -1, i; r < t; ++r)
    switch (e[r]) {
      case ".":
        n = i = r;
        break;
      case "0":
        n === 0 && (n = r), (i = r);
        break;
      default:
        if (!+e[r]) break e;
        n > 0 && (n = 0);
        break;
    }
  return n > 0 ? e.slice(0, n) + e.slice(i + 1) : e;
}
var B_;
function TB(e, t) {
  var r = Ll(e, t);
  if (!r) return e + "";
  var n = r[0],
    i = r[1],
    o = i - (B_ = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
    a = n.length;
  return o === a
    ? n
    : o > a
      ? n + new Array(o - a + 1).join("0")
      : o > 0
        ? n.slice(0, o) + "." + n.slice(o)
        : "0." + new Array(1 - o).join("0") + Ll(e, Math.max(0, t + o - 1))[0];
}
function b1(e, t) {
  var r = Ll(e, t);
  if (!r) return e + "";
  var n = r[0],
    i = r[1];
  return i < 0
    ? "0." + new Array(-i).join("0") + n
    : n.length > i + 1
      ? n.slice(0, i + 1) + "." + n.slice(i + 1)
      : n + new Array(i - n.length + 2).join("0");
}
const w1 = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: _B,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => b1(e * 100, t),
  r: b1,
  s: TB,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16),
};
function x1(e) {
  return e;
}
var S1 = Array.prototype.map,
  O1 = [
    "y",
    "z",
    "a",
    "f",
    "p",
    "n",
    "µ",
    "m",
    "",
    "k",
    "M",
    "G",
    "T",
    "P",
    "E",
    "Z",
    "Y",
  ];
function $B(e) {
  var t =
      e.grouping === void 0 || e.thousands === void 0
        ? x1
        : PB(S1.call(e.grouping, Number), e.thousands + ""),
    r = e.currency === void 0 ? "" : e.currency[0] + "",
    n = e.currency === void 0 ? "" : e.currency[1] + "",
    i = e.decimal === void 0 ? "." : e.decimal + "",
    o = e.numerals === void 0 ? x1 : AB(S1.call(e.numerals, String)),
    a = e.percent === void 0 ? "%" : e.percent + "",
    u = e.minus === void 0 ? "−" : e.minus + "",
    s = e.nan === void 0 ? "NaN" : e.nan + "";
  function l(c) {
    c = fu(c);
    var p = c.fill,
      d = c.align,
      h = c.sign,
      y = c.symbol,
      w = c.zero,
      m = c.width,
      v = c.comma,
      g = c.precision,
      S = c.trim,
      b = c.type;
    b === "n"
      ? ((v = !0), (b = "g"))
      : w1[b] || (g === void 0 && (g = 12), (S = !0), (b = "g")),
      (w || (p === "0" && d === "=")) && ((w = !0), (p = "0"), (d = "="));
    var x =
        y === "$"
          ? r
          : y === "#" && /[boxX]/.test(b)
            ? "0" + b.toLowerCase()
            : "",
      O = y === "$" ? n : /[%p]/.test(b) ? a : "",
      _ = w1[b],
      P = /[defgprs%]/.test(b);
    g =
      g === void 0
        ? 6
        : /[gprs]/.test(b)
          ? Math.max(1, Math.min(21, g))
          : Math.max(0, Math.min(20, g));
    function I(E) {
      var $ = x,
        M = O,
        N,
        j,
        D;
      if (b === "c") (M = _(E) + M), (E = "");
      else {
        E = +E;
        var L = E < 0 || 1 / E < 0;
        if (
          ((E = isNaN(E) ? s : _(Math.abs(E), g)),
          S && (E = IB(E)),
          L && +E == 0 && h !== "+" && (L = !1),
          ($ = (L ? (h === "(" ? h : u) : h === "-" || h === "(" ? "" : h) + $),
          (M =
            (b === "s" ? O1[8 + B_ / 3] : "") +
            M +
            (L && h === "(" ? ")" : "")),
          P)
        ) {
          for (N = -1, j = E.length; ++N < j; )
            if (((D = E.charCodeAt(N)), 48 > D || D > 57)) {
              (M = (D === 46 ? i + E.slice(N + 1) : E.slice(N)) + M),
                (E = E.slice(0, N));
              break;
            }
        }
      }
      v && !w && (E = t(E, 1 / 0));
      var T = $.length + E.length + M.length,
        k = T < m ? new Array(m - T + 1).join(p) : "";
      switch (
        (v && w && ((E = t(k + E, k.length ? m - M.length : 1 / 0)), (k = "")),
        d)
      ) {
        case "<":
          E = $ + E + M + k;
          break;
        case "=":
          E = $ + k + E + M;
          break;
        case "^":
          E = k.slice(0, (T = k.length >> 1)) + $ + E + M + k.slice(T);
          break;
        default:
          E = k + $ + E + M;
          break;
      }
      return o(E);
    }
    return (
      (I.toString = function () {
        return c + "";
      }),
      I
    );
  }
  function f(c, p) {
    var d = l(((c = fu(c)), (c.type = "f"), c)),
      h = Math.max(-8, Math.min(8, Math.floor(bo(p) / 3))) * 3,
      y = Math.pow(10, -h),
      w = O1[8 + h / 3];
    return function (m) {
      return d(y * m) + w;
    };
  }
  return { format: l, formatPrefix: f };
}
var xs, jm, z_;
CB({ thousands: ",", grouping: [3], currency: ["$", ""] });
function CB(e) {
  return (xs = $B(e)), (jm = xs.format), (z_ = xs.formatPrefix), xs;
}
function kB(e) {
  return Math.max(0, -bo(Math.abs(e)));
}
function jB(e, t) {
  return Math.max(
    0,
    Math.max(-8, Math.min(8, Math.floor(bo(t) / 3))) * 3 - bo(Math.abs(e))
  );
}
function MB(e, t) {
  return (
    (e = Math.abs(e)), (t = Math.abs(t) - e), Math.max(0, bo(t) - bo(e)) + 1
  );
}
function U_(e, t, r, n) {
  var i = ih(e, t, r),
    o;
  switch (((n = fu(n ?? ",f")), n.type)) {
    case "s": {
      var a = Math.max(Math.abs(e), Math.abs(t));
      return (
        n.precision == null && !isNaN((o = jB(i, a))) && (n.precision = o),
        z_(n, a)
      );
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null &&
        !isNaN((o = MB(i, Math.max(Math.abs(e), Math.abs(t))))) &&
        (n.precision = o - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null &&
        !isNaN((o = kB(i))) &&
        (n.precision = o - (n.type === "%") * 2);
      break;
    }
  }
  return jm(n);
}
function Rn(e) {
  var t = e.domain;
  return (
    (e.ticks = function (r) {
      var n = t();
      return rh(n[0], n[n.length - 1], r ?? 10);
    }),
    (e.tickFormat = function (r, n) {
      var i = t();
      return U_(i[0], i[i.length - 1], r ?? 10, n);
    }),
    (e.nice = function (r) {
      r == null && (r = 10);
      var n = t(),
        i = 0,
        o = n.length - 1,
        a = n[i],
        u = n[o],
        s,
        l,
        f = 10;
      for (
        u < a && ((l = a), (a = u), (u = l), (l = i), (i = o), (o = l));
        f-- > 0;

      ) {
        if (((l = nh(a, u, r)), l === s)) return (n[i] = a), (n[o] = u), t(n);
        if (l > 0) (a = Math.floor(a / l) * l), (u = Math.ceil(u / l) * l);
        else if (l < 0) (a = Math.ceil(a * l) / l), (u = Math.floor(u * l) / l);
        else break;
        s = l;
      }
      return e;
    }),
    e
  );
}
function Rl() {
  var e = Cm();
  return (
    (e.copy = function () {
      return Vu(e, Rl());
    }),
    lr.apply(e, arguments),
    Rn(e)
  );
}
function W_(e) {
  var t;
  function r(n) {
    return n == null || isNaN((n = +n)) ? t : n;
  }
  return (
    (r.invert = r),
    (r.domain = r.range =
      function (n) {
        return arguments.length ? ((e = Array.from(n, Dl)), r) : e.slice();
      }),
    (r.unknown = function (n) {
      return arguments.length ? ((t = n), r) : t;
    }),
    (r.copy = function () {
      return W_(e).unknown(t);
    }),
    (e = arguments.length ? Array.from(e, Dl) : [0, 1]),
    Rn(r)
  );
}
function H_(e, t) {
  e = e.slice();
  var r = 0,
    n = e.length - 1,
    i = e[r],
    o = e[n],
    a;
  return (
    o < i && ((a = r), (r = n), (n = a), (a = i), (i = o), (o = a)),
    (e[r] = t.floor(i)),
    (e[n] = t.ceil(o)),
    e
  );
}
function _1(e) {
  return Math.log(e);
}
function P1(e) {
  return Math.exp(e);
}
function NB(e) {
  return -Math.log(-e);
}
function DB(e) {
  return -Math.exp(-e);
}
function LB(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function RB(e) {
  return e === 10 ? LB : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function FB(e) {
  return e === Math.E
    ? Math.log
    : (e === 10 && Math.log10) ||
        (e === 2 && Math.log2) ||
        ((e = Math.log(e)), (t) => Math.log(t) / e);
}
function A1(e) {
  return (t, r) => -e(-t, r);
}
function Mm(e) {
  const t = e(_1, P1),
    r = t.domain;
  let n = 10,
    i,
    o;
  function a() {
    return (
      (i = FB(n)),
      (o = RB(n)),
      r()[0] < 0 ? ((i = A1(i)), (o = A1(o)), e(NB, DB)) : e(_1, P1),
      t
    );
  }
  return (
    (t.base = function (u) {
      return arguments.length ? ((n = +u), a()) : n;
    }),
    (t.domain = function (u) {
      return arguments.length ? (r(u), a()) : r();
    }),
    (t.ticks = (u) => {
      const s = r();
      let l = s[0],
        f = s[s.length - 1];
      const c = f < l;
      c && ([l, f] = [f, l]);
      let p = i(l),
        d = i(f),
        h,
        y;
      const w = u == null ? 10 : +u;
      let m = [];
      if (!(n % 1) && d - p < w) {
        if (((p = Math.floor(p)), (d = Math.ceil(d)), l > 0)) {
          for (; p <= d; ++p)
            for (h = 1; h < n; ++h)
              if (((y = p < 0 ? h / o(-p) : h * o(p)), !(y < l))) {
                if (y > f) break;
                m.push(y);
              }
        } else
          for (; p <= d; ++p)
            for (h = n - 1; h >= 1; --h)
              if (((y = p > 0 ? h / o(-p) : h * o(p)), !(y < l))) {
                if (y > f) break;
                m.push(y);
              }
        m.length * 2 < w && (m = rh(l, f, w));
      } else m = rh(p, d, Math.min(d - p, w)).map(o);
      return c ? m.reverse() : m;
    }),
    (t.tickFormat = (u, s) => {
      if (
        (u == null && (u = 10),
        s == null && (s = n === 10 ? "s" : ","),
        typeof s != "function" &&
          (!(n % 1) && (s = fu(s)).precision == null && (s.trim = !0),
          (s = jm(s))),
        u === 1 / 0)
      )
        return s;
      const l = Math.max(1, (n * u) / t.ticks().length);
      return (f) => {
        let c = f / o(Math.round(i(f)));
        return c * n < n - 0.5 && (c *= n), c <= l ? s(f) : "";
      };
    }),
    (t.nice = () =>
      r(
        H_(r(), {
          floor: (u) => o(Math.floor(i(u))),
          ceil: (u) => o(Math.ceil(i(u))),
        })
      )),
    t
  );
}
function G_() {
  const e = Mm(rf()).domain([1, 10]);
  return (e.copy = () => Vu(e, G_()).base(e.base())), lr.apply(e, arguments), e;
}
function E1(e) {
  return function (t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function I1(e) {
  return function (t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function Nm(e) {
  var t = 1,
    r = e(E1(t), I1(t));
  return (
    (r.constant = function (n) {
      return arguments.length ? e(E1((t = +n)), I1(t)) : t;
    }),
    Rn(r)
  );
}
function V_() {
  var e = Nm(rf());
  return (
    (e.copy = function () {
      return Vu(e, V_()).constant(e.constant());
    }),
    lr.apply(e, arguments)
  );
}
function T1(e) {
  return function (t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function BB(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function zB(e) {
  return e < 0 ? -e * e : e * e;
}
function Dm(e) {
  var t = e(gt, gt),
    r = 1;
  function n() {
    return r === 1 ? e(gt, gt) : r === 0.5 ? e(BB, zB) : e(T1(r), T1(1 / r));
  }
  return (
    (t.exponent = function (i) {
      return arguments.length ? ((r = +i), n()) : r;
    }),
    Rn(t)
  );
}
function Lm() {
  var e = Dm(rf());
  return (
    (e.copy = function () {
      return Vu(e, Lm()).exponent(e.exponent());
    }),
    lr.apply(e, arguments),
    e
  );
}
function UB() {
  return Lm.apply(null, arguments).exponent(0.5);
}
function $1(e) {
  return Math.sign(e) * e * e;
}
function WB(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function q_() {
  var e = Cm(),
    t = [0, 1],
    r = !1,
    n;
  function i(o) {
    var a = WB(e(o));
    return isNaN(a) ? n : r ? Math.round(a) : a;
  }
  return (
    (i.invert = function (o) {
      return e.invert($1(o));
    }),
    (i.domain = function (o) {
      return arguments.length ? (e.domain(o), i) : e.domain();
    }),
    (i.range = function (o) {
      return arguments.length
        ? (e.range((t = Array.from(o, Dl)).map($1)), i)
        : t.slice();
    }),
    (i.rangeRound = function (o) {
      return i.range(o).round(!0);
    }),
    (i.round = function (o) {
      return arguments.length ? ((r = !!o), i) : r;
    }),
    (i.clamp = function (o) {
      return arguments.length ? (e.clamp(o), i) : e.clamp();
    }),
    (i.unknown = function (o) {
      return arguments.length ? ((n = o), i) : n;
    }),
    (i.copy = function () {
      return q_(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
    }),
    lr.apply(i, arguments),
    Rn(i)
  );
}
function K_() {
  var e = [],
    t = [],
    r = [],
    n;
  function i() {
    var a = 0,
      u = Math.max(1, t.length);
    for (r = new Array(u - 1); ++a < u; ) r[a - 1] = KF(e, a / u);
    return o;
  }
  function o(a) {
    return a == null || isNaN((a = +a)) ? n : t[Hu(r, a)];
  }
  return (
    (o.invertExtent = function (a) {
      var u = t.indexOf(a);
      return u < 0
        ? [NaN, NaN]
        : [u > 0 ? r[u - 1] : e[0], u < r.length ? r[u] : e[e.length - 1]];
    }),
    (o.domain = function (a) {
      if (!arguments.length) return e.slice();
      e = [];
      for (let u of a) u != null && !isNaN((u = +u)) && e.push(u);
      return e.sort(In), i();
    }),
    (o.range = function (a) {
      return arguments.length ? ((t = Array.from(a)), i()) : t.slice();
    }),
    (o.unknown = function (a) {
      return arguments.length ? ((n = a), o) : n;
    }),
    (o.quantiles = function () {
      return r.slice();
    }),
    (o.copy = function () {
      return K_().domain(e).range(t).unknown(n);
    }),
    lr.apply(o, arguments)
  );
}
function X_() {
  var e = 0,
    t = 1,
    r = 1,
    n = [0.5],
    i = [0, 1],
    o;
  function a(s) {
    return s != null && s <= s ? i[Hu(n, s, 0, r)] : o;
  }
  function u() {
    var s = -1;
    for (n = new Array(r); ++s < r; )
      n[s] = ((s + 1) * t - (s - r) * e) / (r + 1);
    return a;
  }
  return (
    (a.domain = function (s) {
      return arguments.length
        ? (([e, t] = s), (e = +e), (t = +t), u())
        : [e, t];
    }),
    (a.range = function (s) {
      return arguments.length
        ? ((r = (i = Array.from(s)).length - 1), u())
        : i.slice();
    }),
    (a.invertExtent = function (s) {
      var l = i.indexOf(s);
      return l < 0
        ? [NaN, NaN]
        : l < 1
          ? [e, n[0]]
          : l >= r
            ? [n[r - 1], t]
            : [n[l - 1], n[l]];
    }),
    (a.unknown = function (s) {
      return arguments.length && (o = s), a;
    }),
    (a.thresholds = function () {
      return n.slice();
    }),
    (a.copy = function () {
      return X_().domain([e, t]).range(i).unknown(o);
    }),
    lr.apply(Rn(a), arguments)
  );
}
function Y_() {
  var e = [0.5],
    t = [0, 1],
    r,
    n = 1;
  function i(o) {
    return o != null && o <= o ? t[Hu(e, o, 0, n)] : r;
  }
  return (
    (i.domain = function (o) {
      return arguments.length
        ? ((e = Array.from(o)), (n = Math.min(e.length, t.length - 1)), i)
        : e.slice();
    }),
    (i.range = function (o) {
      return arguments.length
        ? ((t = Array.from(o)), (n = Math.min(e.length, t.length - 1)), i)
        : t.slice();
    }),
    (i.invertExtent = function (o) {
      var a = t.indexOf(o);
      return [e[a - 1], e[a]];
    }),
    (i.unknown = function (o) {
      return arguments.length ? ((r = o), i) : r;
    }),
    (i.copy = function () {
      return Y_().domain(e).range(t).unknown(r);
    }),
    lr.apply(i, arguments)
  );
}
const vp = new Date(),
  mp = new Date();
function He(e, t, r, n) {
  function i(o) {
    return e((o = arguments.length === 0 ? new Date() : new Date(+o))), o;
  }
  return (
    (i.floor = (o) => (e((o = new Date(+o))), o)),
    (i.ceil = (o) => (e((o = new Date(o - 1))), t(o, 1), e(o), o)),
    (i.round = (o) => {
      const a = i(o),
        u = i.ceil(o);
      return o - a < u - o ? a : u;
    }),
    (i.offset = (o, a) => (
      t((o = new Date(+o)), a == null ? 1 : Math.floor(a)), o
    )),
    (i.range = (o, a, u) => {
      const s = [];
      if (
        ((o = i.ceil(o)),
        (u = u == null ? 1 : Math.floor(u)),
        !(o < a) || !(u > 0))
      )
        return s;
      let l;
      do s.push((l = new Date(+o))), t(o, u), e(o);
      while (l < o && o < a);
      return s;
    }),
    (i.filter = (o) =>
      He(
        (a) => {
          if (a >= a) for (; e(a), !o(a); ) a.setTime(a - 1);
        },
        (a, u) => {
          if (a >= a)
            if (u < 0) for (; ++u <= 0; ) for (; t(a, -1), !o(a); );
            else for (; --u >= 0; ) for (; t(a, 1), !o(a); );
        }
      )),
    r &&
      ((i.count = (o, a) => (
        vp.setTime(+o), mp.setTime(+a), e(vp), e(mp), Math.floor(r(vp, mp))
      )),
      (i.every = (o) => (
        (o = Math.floor(o)),
        !isFinite(o) || !(o > 0)
          ? null
          : o > 1
            ? i.filter(
                n ? (a) => n(a) % o === 0 : (a) => i.count(0, a) % o === 0
              )
            : i
      ))),
    i
  );
}
const Fl = He(
  () => {},
  (e, t) => {
    e.setTime(+e + t);
  },
  (e, t) => t - e
);
Fl.every = (e) => (
  (e = Math.floor(e)),
  !isFinite(e) || !(e > 0)
    ? null
    : e > 1
      ? He(
          (t) => {
            t.setTime(Math.floor(t / e) * e);
          },
          (t, r) => {
            t.setTime(+t + r * e);
          },
          (t, r) => (r - t) / e
        )
      : Fl
);
Fl.range;
const zr = 1e3,
  rr = zr * 60,
  Ur = rr * 60,
  Zr = Ur * 24,
  Rm = Zr * 7,
  C1 = Zr * 30,
  yp = Zr * 365,
  ri = He(
    (e) => {
      e.setTime(e - e.getMilliseconds());
    },
    (e, t) => {
      e.setTime(+e + t * zr);
    },
    (e, t) => (t - e) / zr,
    (e) => e.getUTCSeconds()
  );
ri.range;
const Fm = He(
  (e) => {
    e.setTime(e - e.getMilliseconds() - e.getSeconds() * zr);
  },
  (e, t) => {
    e.setTime(+e + t * rr);
  },
  (e, t) => (t - e) / rr,
  (e) => e.getMinutes()
);
Fm.range;
const Bm = He(
  (e) => {
    e.setUTCSeconds(0, 0);
  },
  (e, t) => {
    e.setTime(+e + t * rr);
  },
  (e, t) => (t - e) / rr,
  (e) => e.getUTCMinutes()
);
Bm.range;
const zm = He(
  (e) => {
    e.setTime(
      e - e.getMilliseconds() - e.getSeconds() * zr - e.getMinutes() * rr
    );
  },
  (e, t) => {
    e.setTime(+e + t * Ur);
  },
  (e, t) => (t - e) / Ur,
  (e) => e.getHours()
);
zm.range;
const Um = He(
  (e) => {
    e.setUTCMinutes(0, 0, 0);
  },
  (e, t) => {
    e.setTime(+e + t * Ur);
  },
  (e, t) => (t - e) / Ur,
  (e) => e.getUTCHours()
);
Um.range;
const qu = He(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * rr) / Zr,
  (e) => e.getDate() - 1
);
qu.range;
const nf = He(
  (e) => {
    e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCDate(e.getUTCDate() + t);
  },
  (e, t) => (t - e) / Zr,
  (e) => e.getUTCDate() - 1
);
nf.range;
const Q_ = He(
  (e) => {
    e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCDate(e.getUTCDate() + t);
  },
  (e, t) => (t - e) / Zr,
  (e) => Math.floor(e / Zr)
);
Q_.range;
function Pi(e) {
  return He(
    (t) => {
      t.setDate(t.getDate() - ((t.getDay() + 7 - e) % 7)),
        t.setHours(0, 0, 0, 0);
    },
    (t, r) => {
      t.setDate(t.getDate() + r * 7);
    },
    (t, r) =>
      (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * rr) / Rm
  );
}
const of = Pi(0),
  Bl = Pi(1),
  HB = Pi(2),
  GB = Pi(3),
  wo = Pi(4),
  VB = Pi(5),
  qB = Pi(6);
of.range;
Bl.range;
HB.range;
GB.range;
wo.range;
VB.range;
qB.range;
function Ai(e) {
  return He(
    (t) => {
      t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 7 - e) % 7)),
        t.setUTCHours(0, 0, 0, 0);
    },
    (t, r) => {
      t.setUTCDate(t.getUTCDate() + r * 7);
    },
    (t, r) => (r - t) / Rm
  );
}
const af = Ai(0),
  zl = Ai(1),
  KB = Ai(2),
  XB = Ai(3),
  xo = Ai(4),
  YB = Ai(5),
  QB = Ai(6);
af.range;
zl.range;
KB.range;
XB.range;
xo.range;
YB.range;
QB.range;
const Wm = He(
  (e) => {
    e.setDate(1), e.setHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setMonth(e.getMonth() + t);
  },
  (e, t) =>
    t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12,
  (e) => e.getMonth()
);
Wm.range;
const Hm = He(
  (e) => {
    e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCMonth(e.getUTCMonth() + t);
  },
  (e, t) =>
    t.getUTCMonth() -
    e.getUTCMonth() +
    (t.getUTCFullYear() - e.getUTCFullYear()) * 12,
  (e) => e.getUTCMonth()
);
Hm.range;
const Jr = He(
  (e) => {
    e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setFullYear(e.getFullYear() + t);
  },
  (e, t) => t.getFullYear() - e.getFullYear(),
  (e) => e.getFullYear()
);
Jr.every = (e) =>
  !isFinite((e = Math.floor(e))) || !(e > 0)
    ? null
    : He(
        (t) => {
          t.setFullYear(Math.floor(t.getFullYear() / e) * e),
            t.setMonth(0, 1),
            t.setHours(0, 0, 0, 0);
        },
        (t, r) => {
          t.setFullYear(t.getFullYear() + r * e);
        }
      );
Jr.range;
const en = He(
  (e) => {
    e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCFullYear(e.getUTCFullYear() + t);
  },
  (e, t) => t.getUTCFullYear() - e.getUTCFullYear(),
  (e) => e.getUTCFullYear()
);
en.every = (e) =>
  !isFinite((e = Math.floor(e))) || !(e > 0)
    ? null
    : He(
        (t) => {
          t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e),
            t.setUTCMonth(0, 1),
            t.setUTCHours(0, 0, 0, 0);
        },
        (t, r) => {
          t.setUTCFullYear(t.getUTCFullYear() + r * e);
        }
      );
en.range;
function Z_(e, t, r, n, i, o) {
  const a = [
    [ri, 1, zr],
    [ri, 5, 5 * zr],
    [ri, 15, 15 * zr],
    [ri, 30, 30 * zr],
    [o, 1, rr],
    [o, 5, 5 * rr],
    [o, 15, 15 * rr],
    [o, 30, 30 * rr],
    [i, 1, Ur],
    [i, 3, 3 * Ur],
    [i, 6, 6 * Ur],
    [i, 12, 12 * Ur],
    [n, 1, Zr],
    [n, 2, 2 * Zr],
    [r, 1, Rm],
    [t, 1, C1],
    [t, 3, 3 * C1],
    [e, 1, yp],
  ];
  function u(l, f, c) {
    const p = f < l;
    p && ([l, f] = [f, l]);
    const d = c && typeof c.range == "function" ? c : s(l, f, c),
      h = d ? d.range(l, +f + 1) : [];
    return p ? h.reverse() : h;
  }
  function s(l, f, c) {
    const p = Math.abs(f - l) / c,
      d = Am(([, , w]) => w).right(a, p);
    if (d === a.length) return e.every(ih(l / yp, f / yp, c));
    if (d === 0) return Fl.every(Math.max(ih(l, f, c), 1));
    const [h, y] = a[p / a[d - 1][2] < a[d][2] / p ? d - 1 : d];
    return h.every(y);
  }
  return [u, s];
}
const [ZB, JB] = Z_(en, Hm, af, Q_, Um, Bm),
  [ez, tz] = Z_(Jr, Wm, of, qu, zm, Fm);
function gp(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function bp(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function la(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function rz(e) {
  var t = e.dateTime,
    r = e.date,
    n = e.time,
    i = e.periods,
    o = e.days,
    a = e.shortDays,
    u = e.months,
    s = e.shortMonths,
    l = ca(i),
    f = fa(i),
    c = ca(o),
    p = fa(o),
    d = ca(a),
    h = fa(a),
    y = ca(u),
    w = fa(u),
    m = ca(s),
    v = fa(s),
    g = {
      a: L,
      A: T,
      b: k,
      B: F,
      c: null,
      d: L1,
      e: L1,
      f: Pz,
      g: Nz,
      G: Lz,
      H: Sz,
      I: Oz,
      j: _z,
      L: J_,
      m: Az,
      M: Ez,
      p: H,
      q: U,
      Q: B1,
      s: z1,
      S: Iz,
      u: Tz,
      U: $z,
      V: Cz,
      w: kz,
      W: jz,
      x: null,
      X: null,
      y: Mz,
      Y: Dz,
      Z: Rz,
      "%": F1,
    },
    S = {
      a: K,
      A: re,
      b: Se,
      B: ke,
      c: null,
      d: R1,
      e: R1,
      f: Uz,
      g: Zz,
      G: e7,
      H: Fz,
      I: Bz,
      j: zz,
      L: tP,
      m: Wz,
      M: Hz,
      p: Xt,
      q: Et,
      Q: B1,
      s: z1,
      S: Gz,
      u: Vz,
      U: qz,
      V: Kz,
      w: Xz,
      W: Yz,
      x: null,
      X: null,
      y: Qz,
      Y: Jz,
      Z: t7,
      "%": F1,
    },
    b = {
      a: I,
      A: E,
      b: $,
      B: M,
      c: N,
      d: N1,
      e: N1,
      f: gz,
      g: M1,
      G: j1,
      H: D1,
      I: D1,
      j: hz,
      L: yz,
      m: dz,
      M: vz,
      p: P,
      q: pz,
      Q: wz,
      s: xz,
      S: mz,
      u: uz,
      U: sz,
      V: lz,
      w: az,
      W: cz,
      x: j,
      X: D,
      y: M1,
      Y: j1,
      Z: fz,
      "%": bz,
    };
  (g.x = x(r, g)),
    (g.X = x(n, g)),
    (g.c = x(t, g)),
    (S.x = x(r, S)),
    (S.X = x(n, S)),
    (S.c = x(t, S));
  function x(G, Q) {
    return function (J) {
      var R = [],
        Ie = -1,
        ne = 0,
        Le = G.length,
        Re,
        It,
        un;
      for (J instanceof Date || (J = new Date(+J)); ++Ie < Le; )
        G.charCodeAt(Ie) === 37 &&
          (R.push(G.slice(ne, Ie)),
          (It = k1[(Re = G.charAt(++Ie))]) != null
            ? (Re = G.charAt(++Ie))
            : (It = Re === "e" ? " " : "0"),
          (un = Q[Re]) && (Re = un(J, It)),
          R.push(Re),
          (ne = Ie + 1));
      return R.push(G.slice(ne, Ie)), R.join("");
    };
  }
  function O(G, Q) {
    return function (J) {
      var R = la(1900, void 0, 1),
        Ie = _(R, G, (J += ""), 0),
        ne,
        Le;
      if (Ie != J.length) return null;
      if ("Q" in R) return new Date(R.Q);
      if ("s" in R) return new Date(R.s * 1e3 + ("L" in R ? R.L : 0));
      if (
        (Q && !("Z" in R) && (R.Z = 0),
        "p" in R && (R.H = (R.H % 12) + R.p * 12),
        R.m === void 0 && (R.m = "q" in R ? R.q : 0),
        "V" in R)
      ) {
        if (R.V < 1 || R.V > 53) return null;
        "w" in R || (R.w = 1),
          "Z" in R
            ? ((ne = bp(la(R.y, 0, 1))),
              (Le = ne.getUTCDay()),
              (ne = Le > 4 || Le === 0 ? zl.ceil(ne) : zl(ne)),
              (ne = nf.offset(ne, (R.V - 1) * 7)),
              (R.y = ne.getUTCFullYear()),
              (R.m = ne.getUTCMonth()),
              (R.d = ne.getUTCDate() + ((R.w + 6) % 7)))
            : ((ne = gp(la(R.y, 0, 1))),
              (Le = ne.getDay()),
              (ne = Le > 4 || Le === 0 ? Bl.ceil(ne) : Bl(ne)),
              (ne = qu.offset(ne, (R.V - 1) * 7)),
              (R.y = ne.getFullYear()),
              (R.m = ne.getMonth()),
              (R.d = ne.getDate() + ((R.w + 6) % 7)));
      } else
        ("W" in R || "U" in R) &&
          ("w" in R || (R.w = "u" in R ? R.u % 7 : "W" in R ? 1 : 0),
          (Le =
            "Z" in R
              ? bp(la(R.y, 0, 1)).getUTCDay()
              : gp(la(R.y, 0, 1)).getDay()),
          (R.m = 0),
          (R.d =
            "W" in R
              ? ((R.w + 6) % 7) + R.W * 7 - ((Le + 5) % 7)
              : R.w + R.U * 7 - ((Le + 6) % 7)));
      return "Z" in R
        ? ((R.H += (R.Z / 100) | 0), (R.M += R.Z % 100), bp(R))
        : gp(R);
    };
  }
  function _(G, Q, J, R) {
    for (var Ie = 0, ne = Q.length, Le = J.length, Re, It; Ie < ne; ) {
      if (R >= Le) return -1;
      if (((Re = Q.charCodeAt(Ie++)), Re === 37)) {
        if (
          ((Re = Q.charAt(Ie++)),
          (It = b[Re in k1 ? Q.charAt(Ie++) : Re]),
          !It || (R = It(G, J, R)) < 0)
        )
          return -1;
      } else if (Re != J.charCodeAt(R++)) return -1;
    }
    return R;
  }
  function P(G, Q, J) {
    var R = l.exec(Q.slice(J));
    return R ? ((G.p = f.get(R[0].toLowerCase())), J + R[0].length) : -1;
  }
  function I(G, Q, J) {
    var R = d.exec(Q.slice(J));
    return R ? ((G.w = h.get(R[0].toLowerCase())), J + R[0].length) : -1;
  }
  function E(G, Q, J) {
    var R = c.exec(Q.slice(J));
    return R ? ((G.w = p.get(R[0].toLowerCase())), J + R[0].length) : -1;
  }
  function $(G, Q, J) {
    var R = m.exec(Q.slice(J));
    return R ? ((G.m = v.get(R[0].toLowerCase())), J + R[0].length) : -1;
  }
  function M(G, Q, J) {
    var R = y.exec(Q.slice(J));
    return R ? ((G.m = w.get(R[0].toLowerCase())), J + R[0].length) : -1;
  }
  function N(G, Q, J) {
    return _(G, t, Q, J);
  }
  function j(G, Q, J) {
    return _(G, r, Q, J);
  }
  function D(G, Q, J) {
    return _(G, n, Q, J);
  }
  function L(G) {
    return a[G.getDay()];
  }
  function T(G) {
    return o[G.getDay()];
  }
  function k(G) {
    return s[G.getMonth()];
  }
  function F(G) {
    return u[G.getMonth()];
  }
  function H(G) {
    return i[+(G.getHours() >= 12)];
  }
  function U(G) {
    return 1 + ~~(G.getMonth() / 3);
  }
  function K(G) {
    return a[G.getUTCDay()];
  }
  function re(G) {
    return o[G.getUTCDay()];
  }
  function Se(G) {
    return s[G.getUTCMonth()];
  }
  function ke(G) {
    return u[G.getUTCMonth()];
  }
  function Xt(G) {
    return i[+(G.getUTCHours() >= 12)];
  }
  function Et(G) {
    return 1 + ~~(G.getUTCMonth() / 3);
  }
  return {
    format: function (G) {
      var Q = x((G += ""), g);
      return (
        (Q.toString = function () {
          return G;
        }),
        Q
      );
    },
    parse: function (G) {
      var Q = O((G += ""), !1);
      return (
        (Q.toString = function () {
          return G;
        }),
        Q
      );
    },
    utcFormat: function (G) {
      var Q = x((G += ""), S);
      return (
        (Q.toString = function () {
          return G;
        }),
        Q
      );
    },
    utcParse: function (G) {
      var Q = O((G += ""), !0);
      return (
        (Q.toString = function () {
          return G;
        }),
        Q
      );
    },
  };
}
var k1 = { "-": "", _: " ", 0: "0" },
  Ye = /^\s*\d+/,
  nz = /^%/,
  iz = /[\\^$*+?|[\]().{}]/g;
function oe(e, t, r) {
  var n = e < 0 ? "-" : "",
    i = (n ? -e : e) + "",
    o = i.length;
  return n + (o < r ? new Array(r - o + 1).join(t) + i : i);
}
function oz(e) {
  return e.replace(iz, "\\$&");
}
function ca(e) {
  return new RegExp("^(?:" + e.map(oz).join("|") + ")", "i");
}
function fa(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function az(e, t, r) {
  var n = Ye.exec(t.slice(r, r + 1));
  return n ? ((e.w = +n[0]), r + n[0].length) : -1;
}
function uz(e, t, r) {
  var n = Ye.exec(t.slice(r, r + 1));
  return n ? ((e.u = +n[0]), r + n[0].length) : -1;
}
function sz(e, t, r) {
  var n = Ye.exec(t.slice(r, r + 2));
  return n ? ((e.U = +n[0]), r + n[0].length) : -1;
}
function lz(e, t, r) {
  var n = Ye.exec(t.slice(r, r + 2));
  return n ? ((e.V = +n[0]), r + n[0].length) : -1;
}
function cz(e, t, r) {
  var n = Ye.exec(t.slice(r, r + 2));
  return n ? ((e.W = +n[0]), r + n[0].length) : -1;
}
function j1(e, t, r) {
  var n = Ye.exec(t.slice(r, r + 4));
  return n ? ((e.y = +n[0]), r + n[0].length) : -1;
}
function M1(e, t, r) {
  var n = Ye.exec(t.slice(r, r + 2));
  return n ? ((e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3)), r + n[0].length) : -1;
}
function fz(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n
    ? ((e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00"))), r + n[0].length)
    : -1;
}
function pz(e, t, r) {
  var n = Ye.exec(t.slice(r, r + 1));
  return n ? ((e.q = n[0] * 3 - 3), r + n[0].length) : -1;
}
function dz(e, t, r) {
  var n = Ye.exec(t.slice(r, r + 2));
  return n ? ((e.m = n[0] - 1), r + n[0].length) : -1;
}
function N1(e, t, r) {
  var n = Ye.exec(t.slice(r, r + 2));
  return n ? ((e.d = +n[0]), r + n[0].length) : -1;
}
function hz(e, t, r) {
  var n = Ye.exec(t.slice(r, r + 3));
  return n ? ((e.m = 0), (e.d = +n[0]), r + n[0].length) : -1;
}
function D1(e, t, r) {
  var n = Ye.exec(t.slice(r, r + 2));
  return n ? ((e.H = +n[0]), r + n[0].length) : -1;
}
function vz(e, t, r) {
  var n = Ye.exec(t.slice(r, r + 2));
  return n ? ((e.M = +n[0]), r + n[0].length) : -1;
}
function mz(e, t, r) {
  var n = Ye.exec(t.slice(r, r + 2));
  return n ? ((e.S = +n[0]), r + n[0].length) : -1;
}
function yz(e, t, r) {
  var n = Ye.exec(t.slice(r, r + 3));
  return n ? ((e.L = +n[0]), r + n[0].length) : -1;
}
function gz(e, t, r) {
  var n = Ye.exec(t.slice(r, r + 6));
  return n ? ((e.L = Math.floor(n[0] / 1e3)), r + n[0].length) : -1;
}
function bz(e, t, r) {
  var n = nz.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function wz(e, t, r) {
  var n = Ye.exec(t.slice(r));
  return n ? ((e.Q = +n[0]), r + n[0].length) : -1;
}
function xz(e, t, r) {
  var n = Ye.exec(t.slice(r));
  return n ? ((e.s = +n[0]), r + n[0].length) : -1;
}
function L1(e, t) {
  return oe(e.getDate(), t, 2);
}
function Sz(e, t) {
  return oe(e.getHours(), t, 2);
}
function Oz(e, t) {
  return oe(e.getHours() % 12 || 12, t, 2);
}
function _z(e, t) {
  return oe(1 + qu.count(Jr(e), e), t, 3);
}
function J_(e, t) {
  return oe(e.getMilliseconds(), t, 3);
}
function Pz(e, t) {
  return J_(e, t) + "000";
}
function Az(e, t) {
  return oe(e.getMonth() + 1, t, 2);
}
function Ez(e, t) {
  return oe(e.getMinutes(), t, 2);
}
function Iz(e, t) {
  return oe(e.getSeconds(), t, 2);
}
function Tz(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function $z(e, t) {
  return oe(of.count(Jr(e) - 1, e), t, 2);
}
function eP(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? wo(e) : wo.ceil(e);
}
function Cz(e, t) {
  return (e = eP(e)), oe(wo.count(Jr(e), e) + (Jr(e).getDay() === 4), t, 2);
}
function kz(e) {
  return e.getDay();
}
function jz(e, t) {
  return oe(Bl.count(Jr(e) - 1, e), t, 2);
}
function Mz(e, t) {
  return oe(e.getFullYear() % 100, t, 2);
}
function Nz(e, t) {
  return (e = eP(e)), oe(e.getFullYear() % 100, t, 2);
}
function Dz(e, t) {
  return oe(e.getFullYear() % 1e4, t, 4);
}
function Lz(e, t) {
  var r = e.getDay();
  return (
    (e = r >= 4 || r === 0 ? wo(e) : wo.ceil(e)),
    oe(e.getFullYear() % 1e4, t, 4)
  );
}
function Rz(e) {
  var t = e.getTimezoneOffset();
  return (
    (t > 0 ? "-" : ((t *= -1), "+")) +
    oe((t / 60) | 0, "0", 2) +
    oe(t % 60, "0", 2)
  );
}
function R1(e, t) {
  return oe(e.getUTCDate(), t, 2);
}
function Fz(e, t) {
  return oe(e.getUTCHours(), t, 2);
}
function Bz(e, t) {
  return oe(e.getUTCHours() % 12 || 12, t, 2);
}
function zz(e, t) {
  return oe(1 + nf.count(en(e), e), t, 3);
}
function tP(e, t) {
  return oe(e.getUTCMilliseconds(), t, 3);
}
function Uz(e, t) {
  return tP(e, t) + "000";
}
function Wz(e, t) {
  return oe(e.getUTCMonth() + 1, t, 2);
}
function Hz(e, t) {
  return oe(e.getUTCMinutes(), t, 2);
}
function Gz(e, t) {
  return oe(e.getUTCSeconds(), t, 2);
}
function Vz(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function qz(e, t) {
  return oe(af.count(en(e) - 1, e), t, 2);
}
function rP(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? xo(e) : xo.ceil(e);
}
function Kz(e, t) {
  return (e = rP(e)), oe(xo.count(en(e), e) + (en(e).getUTCDay() === 4), t, 2);
}
function Xz(e) {
  return e.getUTCDay();
}
function Yz(e, t) {
  return oe(zl.count(en(e) - 1, e), t, 2);
}
function Qz(e, t) {
  return oe(e.getUTCFullYear() % 100, t, 2);
}
function Zz(e, t) {
  return (e = rP(e)), oe(e.getUTCFullYear() % 100, t, 2);
}
function Jz(e, t) {
  return oe(e.getUTCFullYear() % 1e4, t, 4);
}
function e7(e, t) {
  var r = e.getUTCDay();
  return (
    (e = r >= 4 || r === 0 ? xo(e) : xo.ceil(e)),
    oe(e.getUTCFullYear() % 1e4, t, 4)
  );
}
function t7() {
  return "+0000";
}
function F1() {
  return "%";
}
function B1(e) {
  return +e;
}
function z1(e) {
  return Math.floor(+e / 1e3);
}
var ki, nP, iP;
r7({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  shortMonths: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
});
function r7(e) {
  return (
    (ki = rz(e)),
    (nP = ki.format),
    ki.parse,
    (iP = ki.utcFormat),
    ki.utcParse,
    ki
  );
}
function n7(e) {
  return new Date(e);
}
function i7(e) {
  return e instanceof Date ? +e : +new Date(+e);
}
function Gm(e, t, r, n, i, o, a, u, s, l) {
  var f = Cm(),
    c = f.invert,
    p = f.domain,
    d = l(".%L"),
    h = l(":%S"),
    y = l("%I:%M"),
    w = l("%I %p"),
    m = l("%a %d"),
    v = l("%b %d"),
    g = l("%B"),
    S = l("%Y");
  function b(x) {
    return (
      s(x) < x
        ? d
        : u(x) < x
          ? h
          : a(x) < x
            ? y
            : o(x) < x
              ? w
              : n(x) < x
                ? i(x) < x
                  ? m
                  : v
                : r(x) < x
                  ? g
                  : S
    )(x);
  }
  return (
    (f.invert = function (x) {
      return new Date(c(x));
    }),
    (f.domain = function (x) {
      return arguments.length ? p(Array.from(x, i7)) : p().map(n7);
    }),
    (f.ticks = function (x) {
      var O = p();
      return e(O[0], O[O.length - 1], x ?? 10);
    }),
    (f.tickFormat = function (x, O) {
      return O == null ? b : l(O);
    }),
    (f.nice = function (x) {
      var O = p();
      return (
        (!x || typeof x.range != "function") &&
          (x = t(O[0], O[O.length - 1], x ?? 10)),
        x ? p(H_(O, x)) : f
      );
    }),
    (f.copy = function () {
      return Vu(f, Gm(e, t, r, n, i, o, a, u, s, l));
    }),
    f
  );
}
function o7() {
  return lr.apply(
    Gm(ez, tz, Jr, Wm, of, qu, zm, Fm, ri, nP).domain([
      new Date(2e3, 0, 1),
      new Date(2e3, 0, 2),
    ]),
    arguments
  );
}
function a7() {
  return lr.apply(
    Gm(ZB, JB, en, Hm, af, nf, Um, Bm, ri, iP).domain([
      Date.UTC(2e3, 0, 1),
      Date.UTC(2e3, 0, 2),
    ]),
    arguments
  );
}
function uf() {
  var e = 0,
    t = 1,
    r,
    n,
    i,
    o,
    a = gt,
    u = !1,
    s;
  function l(c) {
    return c == null || isNaN((c = +c))
      ? s
      : a(
          i === 0
            ? 0.5
            : ((c = (o(c) - r) * i), u ? Math.max(0, Math.min(1, c)) : c)
        );
  }
  (l.domain = function (c) {
    return arguments.length
      ? (([e, t] = c),
        (r = o((e = +e))),
        (n = o((t = +t))),
        (i = r === n ? 0 : 1 / (n - r)),
        l)
      : [e, t];
  }),
    (l.clamp = function (c) {
      return arguments.length ? ((u = !!c), l) : u;
    }),
    (l.interpolator = function (c) {
      return arguments.length ? ((a = c), l) : a;
    });
  function f(c) {
    return function (p) {
      var d, h;
      return arguments.length ? (([d, h] = p), (a = c(d, h)), l) : [a(0), a(1)];
    };
  }
  return (
    (l.range = f(qo)),
    (l.rangeRound = f($m)),
    (l.unknown = function (c) {
      return arguments.length ? ((s = c), l) : s;
    }),
    function (c) {
      return (
        (o = c), (r = c(e)), (n = c(t)), (i = r === n ? 0 : 1 / (n - r)), l
      );
    }
  );
}
function Fn(e, t) {
  return t
    .domain(e.domain())
    .interpolator(e.interpolator())
    .clamp(e.clamp())
    .unknown(e.unknown());
}
function oP() {
  var e = Rn(uf()(gt));
  return (
    (e.copy = function () {
      return Fn(e, oP());
    }),
    an.apply(e, arguments)
  );
}
function aP() {
  var e = Mm(uf()).domain([1, 10]);
  return (
    (e.copy = function () {
      return Fn(e, aP()).base(e.base());
    }),
    an.apply(e, arguments)
  );
}
function uP() {
  var e = Nm(uf());
  return (
    (e.copy = function () {
      return Fn(e, uP()).constant(e.constant());
    }),
    an.apply(e, arguments)
  );
}
function Vm() {
  var e = Dm(uf());
  return (
    (e.copy = function () {
      return Fn(e, Vm()).exponent(e.exponent());
    }),
    an.apply(e, arguments)
  );
}
function u7() {
  return Vm.apply(null, arguments).exponent(0.5);
}
function sP() {
  var e = [],
    t = gt;
  function r(n) {
    if (n != null && !isNaN((n = +n)))
      return t((Hu(e, n, 1) - 1) / (e.length - 1));
  }
  return (
    (r.domain = function (n) {
      if (!arguments.length) return e.slice();
      e = [];
      for (let i of n) i != null && !isNaN((i = +i)) && e.push(i);
      return e.sort(In), r;
    }),
    (r.interpolator = function (n) {
      return arguments.length ? ((t = n), r) : t;
    }),
    (r.range = function () {
      return e.map((n, i) => t(i / (e.length - 1)));
    }),
    (r.quantiles = function (n) {
      return Array.from({ length: n + 1 }, (i, o) => qF(e, o / n));
    }),
    (r.copy = function () {
      return sP(t).domain(e);
    }),
    an.apply(r, arguments)
  );
}
function sf() {
  var e = 0,
    t = 0.5,
    r = 1,
    n = 1,
    i,
    o,
    a,
    u,
    s,
    l = gt,
    f,
    c = !1,
    p;
  function d(y) {
    return isNaN((y = +y))
      ? p
      : ((y = 0.5 + ((y = +f(y)) - o) * (n * y < n * o ? u : s)),
        l(c ? Math.max(0, Math.min(1, y)) : y));
  }
  (d.domain = function (y) {
    return arguments.length
      ? (([e, t, r] = y),
        (i = f((e = +e))),
        (o = f((t = +t))),
        (a = f((r = +r))),
        (u = i === o ? 0 : 0.5 / (o - i)),
        (s = o === a ? 0 : 0.5 / (a - o)),
        (n = o < i ? -1 : 1),
        d)
      : [e, t, r];
  }),
    (d.clamp = function (y) {
      return arguments.length ? ((c = !!y), d) : c;
    }),
    (d.interpolator = function (y) {
      return arguments.length ? ((l = y), d) : l;
    });
  function h(y) {
    return function (w) {
      var m, v, g;
      return arguments.length
        ? (([m, v, g] = w), (l = bB(y, [m, v, g])), d)
        : [l(0), l(0.5), l(1)];
    };
  }
  return (
    (d.range = h(qo)),
    (d.rangeRound = h($m)),
    (d.unknown = function (y) {
      return arguments.length ? ((p = y), d) : p;
    }),
    function (y) {
      return (
        (f = y),
        (i = y(e)),
        (o = y(t)),
        (a = y(r)),
        (u = i === o ? 0 : 0.5 / (o - i)),
        (s = o === a ? 0 : 0.5 / (a - o)),
        (n = o < i ? -1 : 1),
        d
      );
    }
  );
}
function lP() {
  var e = Rn(sf()(gt));
  return (
    (e.copy = function () {
      return Fn(e, lP());
    }),
    an.apply(e, arguments)
  );
}
function cP() {
  var e = Mm(sf()).domain([0.1, 1, 10]);
  return (
    (e.copy = function () {
      return Fn(e, cP()).base(e.base());
    }),
    an.apply(e, arguments)
  );
}
function fP() {
  var e = Nm(sf());
  return (
    (e.copy = function () {
      return Fn(e, fP()).constant(e.constant());
    }),
    an.apply(e, arguments)
  );
}
function qm() {
  var e = Dm(sf());
  return (
    (e.copy = function () {
      return Fn(e, qm()).exponent(e.exponent());
    }),
    an.apply(e, arguments)
  );
}
function s7() {
  return qm.apply(null, arguments).exponent(0.5);
}
const U1 = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      scaleBand: uu,
      scaleDiverging: lP,
      scaleDivergingLog: cP,
      scaleDivergingPow: qm,
      scaleDivergingSqrt: s7,
      scaleDivergingSymlog: fP,
      scaleIdentity: W_,
      scaleImplicit: oh,
      scaleLinear: Rl,
      scaleLog: G_,
      scaleOrdinal: Em,
      scalePoint: ja,
      scalePow: Lm,
      scaleQuantile: K_,
      scaleQuantize: X_,
      scaleRadial: q_,
      scaleSequential: oP,
      scaleSequentialLog: aP,
      scaleSequentialPow: Vm,
      scaleSequentialQuantile: sP,
      scaleSequentialSqrt: u7,
      scaleSequentialSymlog: uP,
      scaleSqrt: UB,
      scaleSymlog: V_,
      scaleThreshold: Y_,
      scaleTime: o7,
      scaleUtc: a7,
      tickFormat: U_,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
var l7 = Fo;
function c7(e, t, r) {
  for (var n = -1, i = e.length; ++n < i; ) {
    var o = e[n],
      a = t(o);
    if (a != null && (u === void 0 ? a === a && !l7(a) : r(a, u)))
      var u = a,
        s = o;
  }
  return s;
}
var pP = c7;
function f7(e, t) {
  return e > t;
}
var p7 = f7,
  d7 = pP,
  h7 = p7,
  v7 = Vo;
function m7(e) {
  return e && e.length ? d7(e, v7, h7) : void 0;
}
var y7 = m7;
const lf = he(y7);
function g7(e, t) {
  return e < t;
}
var b7 = g7,
  w7 = pP,
  x7 = b7,
  S7 = Vo;
function O7(e) {
  return e && e.length ? w7(e, S7, x7) : void 0;
}
var _7 = O7;
const cf = he(_7);
var P7 = um,
  A7 = Ln,
  E7 = w_,
  I7 = Ft;
function T7(e, t) {
  var r = I7(e) ? P7 : E7;
  return r(e, A7(t));
}
var $7 = T7,
  C7 = g_,
  k7 = $7;
function j7(e, t) {
  return C7(k7(e, t), 1);
}
var M7 = j7;
const N7 = he(M7);
var D7 = Sm;
function L7(e, t) {
  return D7(e, t);
}
var R7 = L7;
const Km = he(R7);
var Ko = 1e9,
  F7 = {
    precision: 20,
    rounding: 4,
    toExpNeg: -7,
    toExpPos: 21,
    LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286",
  },
  Ym,
  _e = !0,
  ur = "[DecimalError] ",
  si = ur + "Invalid argument: ",
  Xm = ur + "Exponent out of range: ",
  Xo = Math.floor,
  Xn = Math.pow,
  B7 = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
  Wt,
  Ge = 1e7,
  we = 7,
  dP = 9007199254740991,
  Ul = Xo(dP / we),
  q = {};
q.absoluteValue = q.abs = function () {
  var e = new this.constructor(this);
  return e.s && (e.s = 1), e;
};
q.comparedTo = q.cmp = function (e) {
  var t,
    r,
    n,
    i,
    o = this;
  if (((e = new o.constructor(e)), o.s !== e.s)) return o.s || -e.s;
  if (o.e !== e.e) return (o.e > e.e) ^ (o.s < 0) ? 1 : -1;
  for (n = o.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t)
    if (o.d[t] !== e.d[t]) return (o.d[t] > e.d[t]) ^ (o.s < 0) ? 1 : -1;
  return n === i ? 0 : (n > i) ^ (o.s < 0) ? 1 : -1;
};
q.decimalPlaces = q.dp = function () {
  var e = this,
    t = e.d.length - 1,
    r = (t - e.e) * we;
  if (((t = e.d[t]), t)) for (; t % 10 == 0; t /= 10) r--;
  return r < 0 ? 0 : r;
};
q.dividedBy = q.div = function (e) {
  return qr(this, new this.constructor(e));
};
q.dividedToIntegerBy = q.idiv = function (e) {
  var t = this,
    r = t.constructor;
  return ve(qr(t, new r(e), 0, 1), r.precision);
};
q.equals = q.eq = function (e) {
  return !this.cmp(e);
};
q.exponent = function () {
  return De(this);
};
q.greaterThan = q.gt = function (e) {
  return this.cmp(e) > 0;
};
q.greaterThanOrEqualTo = q.gte = function (e) {
  return this.cmp(e) >= 0;
};
q.isInteger = q.isint = function () {
  return this.e > this.d.length - 2;
};
q.isNegative = q.isneg = function () {
  return this.s < 0;
};
q.isPositive = q.ispos = function () {
  return this.s > 0;
};
q.isZero = function () {
  return this.s === 0;
};
q.lessThan = q.lt = function (e) {
  return this.cmp(e) < 0;
};
q.lessThanOrEqualTo = q.lte = function (e) {
  return this.cmp(e) < 1;
};
q.logarithm = q.log = function (e) {
  var t,
    r = this,
    n = r.constructor,
    i = n.precision,
    o = i + 5;
  if (e === void 0) e = new n(10);
  else if (((e = new n(e)), e.s < 1 || e.eq(Wt))) throw Error(ur + "NaN");
  if (r.s < 1) throw Error(ur + (r.s ? "NaN" : "-Infinity"));
  return r.eq(Wt)
    ? new n(0)
    : ((_e = !1), (t = qr(pu(r, o), pu(e, o), o)), (_e = !0), ve(t, i));
};
q.minus = q.sub = function (e) {
  var t = this;
  return (
    (e = new t.constructor(e)), t.s == e.s ? mP(t, e) : hP(t, ((e.s = -e.s), e))
  );
};
q.modulo = q.mod = function (e) {
  var t,
    r = this,
    n = r.constructor,
    i = n.precision;
  if (((e = new n(e)), !e.s)) throw Error(ur + "NaN");
  return r.s
    ? ((_e = !1), (t = qr(r, e, 0, 1).times(e)), (_e = !0), r.minus(t))
    : ve(new n(r), i);
};
q.naturalExponential = q.exp = function () {
  return vP(this);
};
q.naturalLogarithm = q.ln = function () {
  return pu(this);
};
q.negated = q.neg = function () {
  var e = new this.constructor(this);
  return (e.s = -e.s || 0), e;
};
q.plus = q.add = function (e) {
  var t = this;
  return (
    (e = new t.constructor(e)), t.s == e.s ? hP(t, e) : mP(t, ((e.s = -e.s), e))
  );
};
q.precision = q.sd = function (e) {
  var t,
    r,
    n,
    i = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(si + e);
  if (
    ((t = De(i) + 1), (n = i.d.length - 1), (r = n * we + 1), (n = i.d[n]), n)
  ) {
    for (; n % 10 == 0; n /= 10) r--;
    for (n = i.d[0]; n >= 10; n /= 10) r++;
  }
  return e && t > r ? t : r;
};
q.squareRoot = q.sqrt = function () {
  var e,
    t,
    r,
    n,
    i,
    o,
    a,
    u = this,
    s = u.constructor;
  if (u.s < 1) {
    if (!u.s) return new s(0);
    throw Error(ur + "NaN");
  }
  for (
    e = De(u),
      _e = !1,
      i = Math.sqrt(+u),
      i == 0 || i == 1 / 0
        ? ((t = Ir(u.d)),
          (t.length + e) % 2 == 0 && (t += "0"),
          (i = Math.sqrt(t)),
          (e = Xo((e + 1) / 2) - (e < 0 || e % 2)),
          i == 1 / 0
            ? (t = "5e" + e)
            : ((t = i.toExponential()),
              (t = t.slice(0, t.indexOf("e") + 1) + e)),
          (n = new s(t)))
        : (n = new s(i.toString())),
      r = s.precision,
      i = a = r + 3;
    ;

  )
    if (
      ((o = n),
      (n = o.plus(qr(u, o, a + 2)).times(0.5)),
      Ir(o.d).slice(0, a) === (t = Ir(n.d)).slice(0, a))
    ) {
      if (((t = t.slice(a - 3, a + 1)), i == a && t == "4999")) {
        if ((ve(o, r + 1, 0), o.times(o).eq(u))) {
          n = o;
          break;
        }
      } else if (t != "9999") break;
      a += 4;
    }
  return (_e = !0), ve(n, r);
};
q.times = q.mul = function (e) {
  var t,
    r,
    n,
    i,
    o,
    a,
    u,
    s,
    l,
    f = this,
    c = f.constructor,
    p = f.d,
    d = (e = new c(e)).d;
  if (!f.s || !e.s) return new c(0);
  for (
    e.s *= f.s,
      r = f.e + e.e,
      s = p.length,
      l = d.length,
      s < l && ((o = p), (p = d), (d = o), (a = s), (s = l), (l = a)),
      o = [],
      a = s + l,
      n = a;
    n--;

  )
    o.push(0);
  for (n = l; --n >= 0; ) {
    for (t = 0, i = s + n; i > n; )
      (u = o[i] + d[n] * p[i - n - 1] + t),
        (o[i--] = u % Ge | 0),
        (t = (u / Ge) | 0);
    o[i] = (o[i] + t) % Ge | 0;
  }
  for (; !o[--a]; ) o.pop();
  return t ? ++r : o.shift(), (e.d = o), (e.e = r), _e ? ve(e, c.precision) : e;
};
q.toDecimalPlaces = q.todp = function (e, t) {
  var r = this,
    n = r.constructor;
  return (
    (r = new n(r)),
    e === void 0
      ? r
      : (jr(e, 0, Ko),
        t === void 0 ? (t = n.rounding) : jr(t, 0, 8),
        ve(r, e + De(r) + 1, t))
  );
};
q.toExponential = function (e, t) {
  var r,
    n = this,
    i = n.constructor;
  return (
    e === void 0
      ? (r = mi(n, !0))
      : (jr(e, 0, Ko),
        t === void 0 ? (t = i.rounding) : jr(t, 0, 8),
        (n = ve(new i(n), e + 1, t)),
        (r = mi(n, !0, e + 1))),
    r
  );
};
q.toFixed = function (e, t) {
  var r,
    n,
    i = this,
    o = i.constructor;
  return e === void 0
    ? mi(i)
    : (jr(e, 0, Ko),
      t === void 0 ? (t = o.rounding) : jr(t, 0, 8),
      (n = ve(new o(i), e + De(i) + 1, t)),
      (r = mi(n.abs(), !1, e + De(n) + 1)),
      i.isneg() && !i.isZero() ? "-" + r : r);
};
q.toInteger = q.toint = function () {
  var e = this,
    t = e.constructor;
  return ve(new t(e), De(e) + 1, t.rounding);
};
q.toNumber = function () {
  return +this;
};
q.toPower = q.pow = function (e) {
  var t,
    r,
    n,
    i,
    o,
    a,
    u = this,
    s = u.constructor,
    l = 12,
    f = +(e = new s(e));
  if (!e.s) return new s(Wt);
  if (((u = new s(u)), !u.s)) {
    if (e.s < 1) throw Error(ur + "Infinity");
    return u;
  }
  if (u.eq(Wt)) return u;
  if (((n = s.precision), e.eq(Wt))) return ve(u, n);
  if (((t = e.e), (r = e.d.length - 1), (a = t >= r), (o = u.s), a)) {
    if ((r = f < 0 ? -f : f) <= dP) {
      for (
        i = new s(Wt), t = Math.ceil(n / we + 4), _e = !1;
        r % 2 && ((i = i.times(u)), H1(i.d, t)), (r = Xo(r / 2)), r !== 0;

      )
        (u = u.times(u)), H1(u.d, t);
      return (_e = !0), e.s < 0 ? new s(Wt).div(i) : ve(i, n);
    }
  } else if (o < 0) throw Error(ur + "NaN");
  return (
    (o = o < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1),
    (u.s = 1),
    (_e = !1),
    (i = e.times(pu(u, n + l))),
    (_e = !0),
    (i = vP(i)),
    (i.s = o),
    i
  );
};
q.toPrecision = function (e, t) {
  var r,
    n,
    i = this,
    o = i.constructor;
  return (
    e === void 0
      ? ((r = De(i)), (n = mi(i, r <= o.toExpNeg || r >= o.toExpPos)))
      : (jr(e, 1, Ko),
        t === void 0 ? (t = o.rounding) : jr(t, 0, 8),
        (i = ve(new o(i), e, t)),
        (r = De(i)),
        (n = mi(i, e <= r || r <= o.toExpNeg, e))),
    n
  );
};
q.toSignificantDigits = q.tosd = function (e, t) {
  var r = this,
    n = r.constructor;
  return (
    e === void 0
      ? ((e = n.precision), (t = n.rounding))
      : (jr(e, 1, Ko), t === void 0 ? (t = n.rounding) : jr(t, 0, 8)),
    ve(new n(r), e, t)
  );
};
q.toString =
  q.valueOf =
  q.val =
  q.toJSON =
  q[Symbol.for("nodejs.util.inspect.custom")] =
    function () {
      var e = this,
        t = De(e),
        r = e.constructor;
      return mi(e, t <= r.toExpNeg || t >= r.toExpPos);
    };
function hP(e, t) {
  var r,
    n,
    i,
    o,
    a,
    u,
    s,
    l,
    f = e.constructor,
    c = f.precision;
  if (!e.s || !t.s) return t.s || (t = new f(e)), _e ? ve(t, c) : t;
  if (
    ((s = e.d),
    (l = t.d),
    (a = e.e),
    (i = t.e),
    (s = s.slice()),
    (o = a - i),
    o)
  ) {
    for (
      o < 0
        ? ((n = s), (o = -o), (u = l.length))
        : ((n = l), (i = a), (u = s.length)),
        a = Math.ceil(c / we),
        u = a > u ? a + 1 : u + 1,
        o > u && ((o = u), (n.length = 1)),
        n.reverse();
      o--;

    )
      n.push(0);
    n.reverse();
  }
  for (
    u = s.length,
      o = l.length,
      u - o < 0 && ((o = u), (n = l), (l = s), (s = n)),
      r = 0;
    o;

  )
    (r = ((s[--o] = s[o] + l[o] + r) / Ge) | 0), (s[o] %= Ge);
  for (r && (s.unshift(r), ++i), u = s.length; s[--u] == 0; ) s.pop();
  return (t.d = s), (t.e = i), _e ? ve(t, c) : t;
}
function jr(e, t, r) {
  if (e !== ~~e || e < t || e > r) throw Error(si + e);
}
function Ir(e) {
  var t,
    r,
    n,
    i = e.length - 1,
    o = "",
    a = e[0];
  if (i > 0) {
    for (o += a, t = 1; t < i; t++)
      (n = e[t] + ""), (r = we - n.length), r && (o += fn(r)), (o += n);
    (a = e[t]), (n = a + ""), (r = we - n.length), r && (o += fn(r));
  } else if (a === 0) return "0";
  for (; a % 10 === 0; ) a /= 10;
  return o + a;
}
var qr = (function () {
  function e(n, i) {
    var o,
      a = 0,
      u = n.length;
    for (n = n.slice(); u--; )
      (o = n[u] * i + a), (n[u] = o % Ge | 0), (a = (o / Ge) | 0);
    return a && n.unshift(a), n;
  }
  function t(n, i, o, a) {
    var u, s;
    if (o != a) s = o > a ? 1 : -1;
    else
      for (u = s = 0; u < o; u++)
        if (n[u] != i[u]) {
          s = n[u] > i[u] ? 1 : -1;
          break;
        }
    return s;
  }
  function r(n, i, o) {
    for (var a = 0; o--; )
      (n[o] -= a), (a = n[o] < i[o] ? 1 : 0), (n[o] = a * Ge + n[o] - i[o]);
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function (n, i, o, a) {
    var u,
      s,
      l,
      f,
      c,
      p,
      d,
      h,
      y,
      w,
      m,
      v,
      g,
      S,
      b,
      x,
      O,
      _,
      P = n.constructor,
      I = n.s == i.s ? 1 : -1,
      E = n.d,
      $ = i.d;
    if (!n.s) return new P(n);
    if (!i.s) throw Error(ur + "Division by zero");
    for (
      s = n.e - i.e,
        O = $.length,
        b = E.length,
        d = new P(I),
        h = d.d = [],
        l = 0;
      $[l] == (E[l] || 0);

    )
      ++l;
    if (
      ($[l] > (E[l] || 0) && --s,
      o == null
        ? (v = o = P.precision)
        : a
          ? (v = o + (De(n) - De(i)) + 1)
          : (v = o),
      v < 0)
    )
      return new P(0);
    if (((v = (v / we + 2) | 0), (l = 0), O == 1))
      for (f = 0, $ = $[0], v++; (l < b || f) && v--; l++)
        (g = f * Ge + (E[l] || 0)), (h[l] = (g / $) | 0), (f = g % $ | 0);
    else {
      for (
        f = (Ge / ($[0] + 1)) | 0,
          f > 1 &&
            (($ = e($, f)), (E = e(E, f)), (O = $.length), (b = E.length)),
          S = O,
          y = E.slice(0, O),
          w = y.length;
        w < O;

      )
        y[w++] = 0;
      (_ = $.slice()), _.unshift(0), (x = $[0]), $[1] >= Ge / 2 && ++x;
      do
        (f = 0),
          (u = t($, y, O, w)),
          u < 0
            ? ((m = y[0]),
              O != w && (m = m * Ge + (y[1] || 0)),
              (f = (m / x) | 0),
              f > 1
                ? (f >= Ge && (f = Ge - 1),
                  (c = e($, f)),
                  (p = c.length),
                  (w = y.length),
                  (u = t(c, y, p, w)),
                  u == 1 && (f--, r(c, O < p ? _ : $, p)))
                : (f == 0 && (u = f = 1), (c = $.slice())),
              (p = c.length),
              p < w && c.unshift(0),
              r(y, c, w),
              u == -1 &&
                ((w = y.length),
                (u = t($, y, O, w)),
                u < 1 && (f++, r(y, O < w ? _ : $, w))),
              (w = y.length))
            : u === 0 && (f++, (y = [0])),
          (h[l++] = f),
          u && y[0] ? (y[w++] = E[S] || 0) : ((y = [E[S]]), (w = 1));
      while ((S++ < b || y[0] !== void 0) && v--);
    }
    return h[0] || h.shift(), (d.e = s), ve(d, a ? o + De(d) + 1 : o);
  };
})();
function vP(e, t) {
  var r,
    n,
    i,
    o,
    a,
    u,
    s = 0,
    l = 0,
    f = e.constructor,
    c = f.precision;
  if (De(e) > 16) throw Error(Xm + De(e));
  if (!e.s) return new f(Wt);
  for (
    t == null ? ((_e = !1), (u = c)) : (u = t), a = new f(0.03125);
    e.abs().gte(0.1);

  )
    (e = e.times(a)), (l += 5);
  for (
    n = ((Math.log(Xn(2, l)) / Math.LN10) * 2 + 5) | 0,
      u += n,
      r = i = o = new f(Wt),
      f.precision = u;
    ;

  ) {
    if (
      ((i = ve(i.times(e), u)),
      (r = r.times(++s)),
      (a = o.plus(qr(i, r, u))),
      Ir(a.d).slice(0, u) === Ir(o.d).slice(0, u))
    ) {
      for (; l--; ) o = ve(o.times(o), u);
      return (f.precision = c), t == null ? ((_e = !0), ve(o, c)) : o;
    }
    o = a;
  }
}
function De(e) {
  for (var t = e.e * we, r = e.d[0]; r >= 10; r /= 10) t++;
  return t;
}
function wp(e, t, r) {
  if (t > e.LN10.sd())
    throw (
      ((_e = !0),
      r && (e.precision = r),
      Error(ur + "LN10 precision limit exceeded"))
    );
  return ve(new e(e.LN10), t);
}
function fn(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function pu(e, t) {
  var r,
    n,
    i,
    o,
    a,
    u,
    s,
    l,
    f,
    c = 1,
    p = 10,
    d = e,
    h = d.d,
    y = d.constructor,
    w = y.precision;
  if (d.s < 1) throw Error(ur + (d.s ? "NaN" : "-Infinity"));
  if (d.eq(Wt)) return new y(0);
  if ((t == null ? ((_e = !1), (l = w)) : (l = t), d.eq(10)))
    return t == null && (_e = !0), wp(y, l);
  if (
    ((l += p),
    (y.precision = l),
    (r = Ir(h)),
    (n = r.charAt(0)),
    (o = De(d)),
    Math.abs(o) < 15e14)
  ) {
    for (; (n < 7 && n != 1) || (n == 1 && r.charAt(1) > 3); )
      (d = d.times(e)), (r = Ir(d.d)), (n = r.charAt(0)), c++;
    (o = De(d)),
      n > 1 ? ((d = new y("0." + r)), o++) : (d = new y(n + "." + r.slice(1)));
  } else
    return (
      (s = wp(y, l + 2, w).times(o + "")),
      (d = pu(new y(n + "." + r.slice(1)), l - p).plus(s)),
      (y.precision = w),
      t == null ? ((_e = !0), ve(d, w)) : d
    );
  for (
    u = a = d = qr(d.minus(Wt), d.plus(Wt), l), f = ve(d.times(d), l), i = 3;
    ;

  ) {
    if (
      ((a = ve(a.times(f), l)),
      (s = u.plus(qr(a, new y(i), l))),
      Ir(s.d).slice(0, l) === Ir(u.d).slice(0, l))
    )
      return (
        (u = u.times(2)),
        o !== 0 && (u = u.plus(wp(y, l + 2, w).times(o + ""))),
        (u = qr(u, new y(c), l)),
        (y.precision = w),
        t == null ? ((_e = !0), ve(u, w)) : u
      );
    (u = s), (i += 2);
  }
}
function W1(e, t) {
  var r, n, i;
  for (
    (r = t.indexOf(".")) > -1 && (t = t.replace(".", "")),
      (n = t.search(/e/i)) > 0
        ? (r < 0 && (r = n), (r += +t.slice(n + 1)), (t = t.substring(0, n)))
        : r < 0 && (r = t.length),
      n = 0;
    t.charCodeAt(n) === 48;

  )
    ++n;
  for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
  if (((t = t.slice(n, i)), t)) {
    if (
      ((i -= n),
      (r = r - n - 1),
      (e.e = Xo(r / we)),
      (e.d = []),
      (n = (r + 1) % we),
      r < 0 && (n += we),
      n < i)
    ) {
      for (n && e.d.push(+t.slice(0, n)), i -= we; n < i; )
        e.d.push(+t.slice(n, (n += we)));
      (t = t.slice(n)), (n = we - t.length);
    } else n -= i;
    for (; n--; ) t += "0";
    if ((e.d.push(+t), _e && (e.e > Ul || e.e < -Ul))) throw Error(Xm + r);
  } else (e.s = 0), (e.e = 0), (e.d = [0]);
  return e;
}
function ve(e, t, r) {
  var n,
    i,
    o,
    a,
    u,
    s,
    l,
    f,
    c = e.d;
  for (a = 1, o = c[0]; o >= 10; o /= 10) a++;
  if (((n = t - a), n < 0)) (n += we), (i = t), (l = c[(f = 0)]);
  else {
    if (((f = Math.ceil((n + 1) / we)), (o = c.length), f >= o)) return e;
    for (l = o = c[f], a = 1; o >= 10; o /= 10) a++;
    (n %= we), (i = n - we + a);
  }
  if (
    (r !== void 0 &&
      ((o = Xn(10, a - i - 1)),
      (u = (l / o) % 10 | 0),
      (s = t < 0 || c[f + 1] !== void 0 || l % o),
      (s =
        r < 4
          ? (u || s) && (r == 0 || r == (e.s < 0 ? 3 : 2))
          : u > 5 ||
            (u == 5 &&
              (r == 4 ||
                s ||
                (r == 6 &&
                  (n > 0 ? (i > 0 ? l / Xn(10, a - i) : 0) : c[f - 1]) % 10 &
                    1) ||
                r == (e.s < 0 ? 8 : 7))))),
    t < 1 || !c[0])
  )
    return (
      s
        ? ((o = De(e)),
          (c.length = 1),
          (t = t - o - 1),
          (c[0] = Xn(10, (we - (t % we)) % we)),
          (e.e = Xo(-t / we) || 0))
        : ((c.length = 1), (c[0] = e.e = e.s = 0)),
      e
    );
  if (
    (n == 0
      ? ((c.length = f), (o = 1), f--)
      : ((c.length = f + 1),
        (o = Xn(10, we - n)),
        (c[f] = i > 0 ? ((l / Xn(10, a - i)) % Xn(10, i) | 0) * o : 0)),
    s)
  )
    for (;;)
      if (f == 0) {
        (c[0] += o) == Ge && ((c[0] = 1), ++e.e);
        break;
      } else {
        if (((c[f] += o), c[f] != Ge)) break;
        (c[f--] = 0), (o = 1);
      }
  for (n = c.length; c[--n] === 0; ) c.pop();
  if (_e && (e.e > Ul || e.e < -Ul)) throw Error(Xm + De(e));
  return e;
}
function mP(e, t) {
  var r,
    n,
    i,
    o,
    a,
    u,
    s,
    l,
    f,
    c,
    p = e.constructor,
    d = p.precision;
  if (!e.s || !t.s)
    return t.s ? (t.s = -t.s) : (t = new p(e)), _e ? ve(t, d) : t;
  if (
    ((s = e.d),
    (c = t.d),
    (n = t.e),
    (l = e.e),
    (s = s.slice()),
    (a = l - n),
    a)
  ) {
    for (
      f = a < 0,
        f
          ? ((r = s), (a = -a), (u = c.length))
          : ((r = c), (n = l), (u = s.length)),
        i = Math.max(Math.ceil(d / we), u) + 2,
        a > i && ((a = i), (r.length = 1)),
        r.reverse(),
        i = a;
      i--;

    )
      r.push(0);
    r.reverse();
  } else {
    for (i = s.length, u = c.length, f = i < u, f && (u = i), i = 0; i < u; i++)
      if (s[i] != c[i]) {
        f = s[i] < c[i];
        break;
      }
    a = 0;
  }
  for (
    f && ((r = s), (s = c), (c = r), (t.s = -t.s)),
      u = s.length,
      i = c.length - u;
    i > 0;
    --i
  )
    s[u++] = 0;
  for (i = c.length; i > a; ) {
    if (s[--i] < c[i]) {
      for (o = i; o && s[--o] === 0; ) s[o] = Ge - 1;
      --s[o], (s[i] += Ge);
    }
    s[i] -= c[i];
  }
  for (; s[--u] === 0; ) s.pop();
  for (; s[0] === 0; s.shift()) --n;
  return s[0] ? ((t.d = s), (t.e = n), _e ? ve(t, d) : t) : new p(0);
}
function mi(e, t, r) {
  var n,
    i = De(e),
    o = Ir(e.d),
    a = o.length;
  return (
    t
      ? (r && (n = r - a) > 0
          ? (o = o.charAt(0) + "." + o.slice(1) + fn(n))
          : a > 1 && (o = o.charAt(0) + "." + o.slice(1)),
        (o = o + (i < 0 ? "e" : "e+") + i))
      : i < 0
        ? ((o = "0." + fn(-i - 1) + o), r && (n = r - a) > 0 && (o += fn(n)))
        : i >= a
          ? ((o += fn(i + 1 - a)),
            r && (n = r - i - 1) > 0 && (o = o + "." + fn(n)))
          : ((n = i + 1) < a && (o = o.slice(0, n) + "." + o.slice(n)),
            r && (n = r - a) > 0 && (i + 1 === a && (o += "."), (o += fn(n)))),
    e.s < 0 ? "-" + o : o
  );
}
function H1(e, t) {
  if (e.length > t) return (e.length = t), !0;
}
function yP(e) {
  var t, r, n;
  function i(o) {
    var a = this;
    if (!(a instanceof i)) return new i(o);
    if (((a.constructor = i), o instanceof i)) {
      (a.s = o.s), (a.e = o.e), (a.d = (o = o.d) ? o.slice() : o);
      return;
    }
    if (typeof o == "number") {
      if (o * 0 !== 0) throw Error(si + o);
      if (o > 0) a.s = 1;
      else if (o < 0) (o = -o), (a.s = -1);
      else {
        (a.s = 0), (a.e = 0), (a.d = [0]);
        return;
      }
      if (o === ~~o && o < 1e7) {
        (a.e = 0), (a.d = [o]);
        return;
      }
      return W1(a, o.toString());
    } else if (typeof o != "string") throw Error(si + o);
    if (
      (o.charCodeAt(0) === 45 ? ((o = o.slice(1)), (a.s = -1)) : (a.s = 1),
      B7.test(o))
    )
      W1(a, o);
    else throw Error(si + o);
  }
  if (
    ((i.prototype = q),
    (i.ROUND_UP = 0),
    (i.ROUND_DOWN = 1),
    (i.ROUND_CEIL = 2),
    (i.ROUND_FLOOR = 3),
    (i.ROUND_HALF_UP = 4),
    (i.ROUND_HALF_DOWN = 5),
    (i.ROUND_HALF_EVEN = 6),
    (i.ROUND_HALF_CEIL = 7),
    (i.ROUND_HALF_FLOOR = 8),
    (i.clone = yP),
    (i.config = i.set = z7),
    e === void 0 && (e = {}),
    e)
  )
    for (
      n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0;
      t < n.length;

    )
      e.hasOwnProperty((r = n[t++])) || (e[r] = this[r]);
  return i.config(e), i;
}
function z7(e) {
  if (!e || typeof e != "object") throw Error(ur + "Object expected");
  var t,
    r,
    n,
    i = [
      "precision",
      1,
      Ko,
      "rounding",
      0,
      8,
      "toExpNeg",
      -1 / 0,
      0,
      "toExpPos",
      0,
      1 / 0,
    ];
  for (t = 0; t < i.length; t += 3)
    if ((n = e[(r = i[t])]) !== void 0)
      if (Xo(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
      else throw Error(si + r + ": " + n);
  if ((n = e[(r = "LN10")]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(si + r + ": " + n);
  return this;
}
var Ym = yP(F7);
Wt = new Ym(1);
const pe = Ym;
function U7(e) {
  return V7(e) || G7(e) || H7(e) || W7();
}
function W7() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function H7(e, t) {
  if (e) {
    if (typeof e == "string") return lh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return lh(e, t);
  }
}
function G7(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function V7(e) {
  if (Array.isArray(e)) return lh(e);
}
function lh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var q7 = function (t) {
    return t;
  },
  gP = { "@@functional/placeholder": !0 },
  bP = function (t) {
    return t === gP;
  },
  G1 = function (t) {
    return function r() {
      return arguments.length === 0 ||
        (arguments.length === 1 &&
          bP(arguments.length <= 0 ? void 0 : arguments[0]))
        ? r
        : t.apply(void 0, arguments);
    };
  },
  K7 = function e(t, r) {
    return t === 1
      ? r
      : G1(function () {
          for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++)
            i[o] = arguments[o];
          var a = i.filter(function (u) {
            return u !== gP;
          }).length;
          return a >= t
            ? r.apply(void 0, i)
            : e(
                t - a,
                G1(function () {
                  for (
                    var u = arguments.length, s = new Array(u), l = 0;
                    l < u;
                    l++
                  )
                    s[l] = arguments[l];
                  var f = i.map(function (c) {
                    return bP(c) ? s.shift() : c;
                  });
                  return r.apply(void 0, U7(f).concat(s));
                })
              );
        });
  },
  ff = function (t) {
    return K7(t.length, t);
  },
  ch = function (t, r) {
    for (var n = [], i = t; i < r; ++i) n[i - t] = i;
    return n;
  },
  X7 = ff(function (e, t) {
    return Array.isArray(t)
      ? t.map(e)
      : Object.keys(t)
          .map(function (r) {
            return t[r];
          })
          .map(e);
  }),
  Y7 = function () {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
      r[n] = arguments[n];
    if (!r.length) return q7;
    var i = r.reverse(),
      o = i[0],
      a = i.slice(1);
    return function () {
      return a.reduce(
        function (u, s) {
          return s(u);
        },
        o.apply(void 0, arguments)
      );
    };
  },
  fh = function (t) {
    return Array.isArray(t) ? t.reverse() : t.split("").reverse.join("");
  },
  wP = function (t) {
    var r = null,
      n = null;
    return function () {
      for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++)
        o[a] = arguments[a];
      return (
        (r &&
          o.every(function (u, s) {
            return u === r[s];
          })) ||
          ((r = o), (n = t.apply(void 0, o))),
        n
      );
    };
  };
function Q7(e) {
  var t;
  return (
    e === 0
      ? (t = 1)
      : (t = Math.floor(new pe(e).abs().log(10).toNumber()) + 1),
    t
  );
}
function Z7(e, t, r) {
  for (var n = new pe(e), i = 0, o = []; n.lt(t) && i < 1e5; )
    o.push(n.toNumber()), (n = n.add(r)), i++;
  return o;
}
var J7 = ff(function (e, t, r) {
    var n = +e,
      i = +t;
    return n + r * (i - n);
  }),
  e9 = ff(function (e, t, r) {
    var n = t - +e;
    return (n = n || 1 / 0), (r - e) / n;
  }),
  t9 = ff(function (e, t, r) {
    var n = t - +e;
    return (n = n || 1 / 0), Math.max(0, Math.min(1, (r - e) / n));
  });
const pf = {
  rangeStep: Z7,
  getDigitCount: Q7,
  interpolateNumber: J7,
  uninterpolateNumber: e9,
  uninterpolateTruncation: t9,
};
function ph(e) {
  return i9(e) || n9(e) || xP(e) || r9();
}
function r9() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function n9(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function i9(e) {
  if (Array.isArray(e)) return dh(e);
}
function du(e, t) {
  return u9(e) || a9(e, t) || xP(e, t) || o9();
}
function o9() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xP(e, t) {
  if (e) {
    if (typeof e == "string") return dh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return dh(e, t);
  }
}
function dh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function a9(e, t) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(e)))) {
    var r = [],
      n = !0,
      i = !1,
      o = void 0;
    try {
      for (
        var a = e[Symbol.iterator](), u;
        !(n = (u = a.next()).done) && (r.push(u.value), !(t && r.length === t));
        n = !0
      );
    } catch (s) {
      (i = !0), (o = s);
    } finally {
      try {
        !n && a.return != null && a.return();
      } finally {
        if (i) throw o;
      }
    }
    return r;
  }
}
function u9(e) {
  if (Array.isArray(e)) return e;
}
function SP(e) {
  var t = du(e, 2),
    r = t[0],
    n = t[1],
    i = r,
    o = n;
  return r > n && ((i = n), (o = r)), [i, o];
}
function OP(e, t, r) {
  if (e.lte(0)) return new pe(0);
  var n = pf.getDigitCount(e.toNumber()),
    i = new pe(10).pow(n),
    o = e.div(i),
    a = n !== 1 ? 0.05 : 0.1,
    u = new pe(Math.ceil(o.div(a).toNumber())).add(r).mul(a),
    s = u.mul(i);
  return t ? s : new pe(Math.ceil(s));
}
function s9(e, t, r) {
  var n = 1,
    i = new pe(e);
  if (!i.isint() && r) {
    var o = Math.abs(e);
    o < 1
      ? ((n = new pe(10).pow(pf.getDigitCount(e) - 1)),
        (i = new pe(Math.floor(i.div(n).toNumber())).mul(n)))
      : o > 1 && (i = new pe(Math.floor(e)));
  } else
    e === 0
      ? (i = new pe(Math.floor((t - 1) / 2)))
      : r || (i = new pe(Math.floor(e)));
  var a = Math.floor((t - 1) / 2),
    u = Y7(
      X7(function (s) {
        return i.add(new pe(s - a).mul(n)).toNumber();
      }),
      ch
    );
  return u(0, t);
}
function _P(e, t, r, n) {
  var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((t - e) / (r - 1)))
    return { step: new pe(0), tickMin: new pe(0), tickMax: new pe(0) };
  var o = OP(new pe(t).sub(e).div(r - 1), n, i),
    a;
  e <= 0 && t >= 0
    ? (a = new pe(0))
    : ((a = new pe(e).add(t).div(2)), (a = a.sub(new pe(a).mod(o))));
  var u = Math.ceil(a.sub(e).div(o).toNumber()),
    s = Math.ceil(new pe(t).sub(a).div(o).toNumber()),
    l = u + s + 1;
  return l > r
    ? _P(e, t, r, n, i + 1)
    : (l < r && ((s = t > 0 ? s + (r - l) : s), (u = t > 0 ? u : u + (r - l))),
      {
        step: o,
        tickMin: a.sub(new pe(u).mul(o)),
        tickMax: a.add(new pe(s).mul(o)),
      });
}
function l9(e) {
  var t = du(e, 2),
    r = t[0],
    n = t[1],
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = Math.max(i, 2),
    u = SP([r, n]),
    s = du(u, 2),
    l = s[0],
    f = s[1];
  if (l === -1 / 0 || f === 1 / 0) {
    var c =
      f === 1 / 0
        ? [l].concat(
            ph(
              ch(0, i - 1).map(function () {
                return 1 / 0;
              })
            )
          )
        : [].concat(
            ph(
              ch(0, i - 1).map(function () {
                return -1 / 0;
              })
            ),
            [f]
          );
    return r > n ? fh(c) : c;
  }
  if (l === f) return s9(l, i, o);
  var p = _P(l, f, a, o),
    d = p.step,
    h = p.tickMin,
    y = p.tickMax,
    w = pf.rangeStep(h, y.add(new pe(0.1).mul(d)), d);
  return r > n ? fh(w) : w;
}
function c9(e, t) {
  var r = du(e, 2),
    n = r[0],
    i = r[1],
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = SP([n, i]),
    u = du(a, 2),
    s = u[0],
    l = u[1];
  if (s === -1 / 0 || l === 1 / 0) return [n, i];
  if (s === l) return [s];
  var f = Math.max(t, 2),
    c = OP(new pe(l).sub(s).div(f - 1), o, 0),
    p = [].concat(
      ph(pf.rangeStep(new pe(s), new pe(l).sub(new pe(0.99).mul(c)), c)),
      [l]
    );
  return n > i ? fh(p) : p;
}
var f9 = wP(l9),
  p9 = wP(c9),
  d9 = "Invariant failed";
function yi(e, t) {
  throw new Error(d9);
}
var h9 = [
  "offset",
  "layout",
  "width",
  "dataKey",
  "data",
  "dataPointFormatter",
  "xAxis",
  "yAxis",
];
function So(e) {
  "@babel/helpers - typeof";
  return (
    (So =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    So(e)
  );
}
function Wl() {
  return (
    (Wl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Wl.apply(this, arguments)
  );
}
function v9(e, t) {
  return b9(e) || g9(e, t) || y9(e, t) || m9();
}
function m9() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function y9(e, t) {
  if (e) {
    if (typeof e == "string") return V1(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return V1(e, t);
  }
}
function V1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function g9(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (r != null) {
    var n,
      i,
      o,
      a,
      u = [],
      s = !0,
      l = !1;
    try {
      if (((o = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t);
          s = !0
        );
    } catch (f) {
      (l = !0), (i = f);
    } finally {
      try {
        if (!s && r.return != null && ((a = r.return()), Object(a) !== a))
          return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function b9(e) {
  if (Array.isArray(e)) return e;
}
function w9(e, t) {
  if (e == null) return {};
  var r = x9(e, t),
    n,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (n = o[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n]);
  }
  return r;
}
function x9(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function S9(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function O9(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, EP(n.key), n);
  }
}
function _9(e, t, r) {
  return (
    t && O9(e.prototype, t),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function P9(e, t, r) {
  return (
    (t = Hl(t)),
    A9(
      e,
      PP() ? Reflect.construct(t, r || [], Hl(e).constructor) : t.apply(e, r)
    )
  );
}
function A9(e, t) {
  if (t && (So(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return E9(e);
}
function E9(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function PP() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch {}
  return (PP = function () {
    return !!e;
  })();
}
function Hl(e) {
  return (
    (Hl = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }),
    Hl(e)
  );
}
function I9(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && hh(e, t);
}
function hh(e, t) {
  return (
    (hh = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n;
        }),
    hh(e, t)
  );
}
function AP(e, t, r) {
  return (
    (t = EP(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function EP(e) {
  var t = T9(e, "string");
  return So(t) == "symbol" ? t : t + "";
}
function T9(e, t) {
  if (So(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (So(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var df = (function (e) {
  function t() {
    return S9(this, t), P9(this, t, arguments);
  }
  return (
    I9(t, e),
    _9(t, [
      {
        key: "render",
        value: function () {
          var n = this.props,
            i = n.offset,
            o = n.layout,
            a = n.width,
            u = n.dataKey,
            s = n.data,
            l = n.dataPointFormatter,
            f = n.xAxis,
            c = n.yAxis,
            p = w9(n, h9),
            d = ae(p, !1);
          this.props.direction === "x" && f.type !== "number" && yi();
          var h = s.map(function (y) {
            var w = l(y, u),
              m = w.x,
              v = w.y,
              g = w.value,
              S = w.errorVal;
            if (!S) return null;
            var b = [],
              x,
              O;
            if (Array.isArray(S)) {
              var _ = v9(S, 2);
              (x = _[0]), (O = _[1]);
            } else x = O = S;
            if (o === "vertical") {
              var P = f.scale,
                I = v + i,
                E = I + a,
                $ = I - a,
                M = P(g - x),
                N = P(g + O);
              b.push({ x1: N, y1: E, x2: N, y2: $ }),
                b.push({ x1: M, y1: I, x2: N, y2: I }),
                b.push({ x1: M, y1: E, x2: M, y2: $ });
            } else if (o === "horizontal") {
              var j = c.scale,
                D = m + i,
                L = D - a,
                T = D + a,
                k = j(g - x),
                F = j(g + O);
              b.push({ x1: L, y1: F, x2: T, y2: F }),
                b.push({ x1: D, y1: k, x2: D, y2: F }),
                b.push({ x1: L, y1: k, x2: T, y2: k });
            }
            return A.createElement(
              qe,
              Wl(
                {
                  className: "recharts-errorBar",
                  key: "bar-".concat(
                    b.map(function (H) {
                      return ""
                        .concat(H.x1, "-")
                        .concat(H.x2, "-")
                        .concat(H.y1, "-")
                        .concat(H.y2);
                    })
                  ),
                },
                d
              ),
              b.map(function (H) {
                return A.createElement(
                  "line",
                  Wl({}, H, {
                    key: "line-"
                      .concat(H.x1, "-")
                      .concat(H.x2, "-")
                      .concat(H.y1, "-")
                      .concat(H.y2),
                  })
                );
              })
            );
          });
          return A.createElement(qe, { className: "recharts-errorBars" }, h);
        },
      },
    ])
  );
})(A.Component);
AP(df, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal",
});
AP(df, "displayName", "ErrorBar");
function hu(e) {
  "@babel/helpers - typeof";
  return (
    (hu =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    hu(e)
  );
}
function q1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function Wn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? q1(Object(r), !0).forEach(function (n) {
          $9(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : q1(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function $9(e, t, r) {
  return (
    (t = C9(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function C9(e) {
  var t = k9(e, "string");
  return hu(t) == "symbol" ? t : t + "";
}
function k9(e, t) {
  if (hu(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (hu(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var IP = function (t) {
  var r = t.children,
    n = t.formattedGraphicalItems,
    i = t.legendWidth,
    o = t.legendContent,
    a = Ut(r, no);
  if (!a) return null;
  var u = no.defaultProps,
    s = u !== void 0 ? Wn(Wn({}, u), a.props) : {},
    l;
  return (
    a.props && a.props.payload
      ? (l = a.props && a.props.payload)
      : o === "children"
        ? (l = (n || []).reduce(function (f, c) {
            var p = c.item,
              d = c.props,
              h = d.sectors || d.data || [];
            return f.concat(
              h.map(function (y) {
                return {
                  type: a.props.iconType || p.props.legendType,
                  value: y.name,
                  color: y.fill,
                  payload: y,
                };
              })
            );
          }, []))
        : (l = (n || []).map(function (f) {
            var c = f.item,
              p = c.type.defaultProps,
              d = p !== void 0 ? Wn(Wn({}, p), c.props) : {},
              h = d.dataKey,
              y = d.name,
              w = d.legendType,
              m = d.hide;
            return {
              inactive: m,
              dataKey: h,
              type: s.iconType || w || "square",
              color: Qm(c),
              value: y || h,
              payload: d,
            };
          })),
    Wn(Wn(Wn({}, s), no.getWithHeight(a, i)), {}, { payload: l, item: a })
  );
};
function vu(e) {
  "@babel/helpers - typeof";
  return (
    (vu =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    vu(e)
  );
}
function K1(e) {
  return D9(e) || N9(e) || M9(e) || j9();
}
function j9() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function M9(e, t) {
  if (e) {
    if (typeof e == "string") return vh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return vh(e, t);
  }
}
function N9(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function D9(e) {
  if (Array.isArray(e)) return vh(e);
}
function vh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function X1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function $e(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? X1(Object(r), !0).forEach(function (n) {
          oo(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : X1(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function oo(e, t, r) {
  return (
    (t = L9(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function L9(e) {
  var t = R9(e, "string");
  return vu(t) == "symbol" ? t : t + "";
}
function R9(e, t) {
  if (vu(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (vu(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Mr(e, t, r) {
  return ue(e) || ue(t) ? r : Ue(t) ? ir(e, t, r) : te(t) ? t(e) : r;
}
function Ma(e, t, r, n) {
  var i = N7(e, function (u) {
    return Mr(u, t);
  });
  if (r === "number") {
    var o = i.filter(function (u) {
      return W(u) || parseFloat(u);
    });
    return o.length ? [cf(o), lf(o)] : [1 / 0, -1 / 0];
  }
  var a = n
    ? i.filter(function (u) {
        return !ue(u);
      })
    : i;
  return a.map(function (u) {
    return Ue(u) || u instanceof Date ? u : "";
  });
}
var F9 = function (t) {
    var r,
      n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
      i = arguments.length > 2 ? arguments[2] : void 0,
      o = arguments.length > 3 ? arguments[3] : void 0,
      a = -1,
      u = (r = n == null ? void 0 : n.length) !== null && r !== void 0 ? r : 0;
    if (u <= 1) return 0;
    if (
      o &&
      o.axisType === "angleAxis" &&
      Math.abs(Math.abs(o.range[1] - o.range[0]) - 360) <= 1e-6
    )
      for (var s = o.range, l = 0; l < u; l++) {
        var f = l > 0 ? i[l - 1].coordinate : i[u - 1].coordinate,
          c = i[l].coordinate,
          p = l >= u - 1 ? i[0].coordinate : i[l + 1].coordinate,
          d = void 0;
        if (yr(c - f) !== yr(p - c)) {
          var h = [];
          if (yr(p - c) === yr(s[1] - s[0])) {
            d = p;
            var y = c + s[1] - s[0];
            (h[0] = Math.min(y, (y + f) / 2)),
              (h[1] = Math.max(y, (y + f) / 2));
          } else {
            d = f;
            var w = p + s[1] - s[0];
            (h[0] = Math.min(c, (w + c) / 2)),
              (h[1] = Math.max(c, (w + c) / 2));
          }
          var m = [Math.min(c, (d + c) / 2), Math.max(c, (d + c) / 2)];
          if ((t > m[0] && t <= m[1]) || (t >= h[0] && t <= h[1])) {
            a = i[l].index;
            break;
          }
        } else {
          var v = Math.min(f, p),
            g = Math.max(f, p);
          if (t > (v + c) / 2 && t <= (g + c) / 2) {
            a = i[l].index;
            break;
          }
        }
      }
    else
      for (var S = 0; S < u; S++)
        if (
          (S === 0 && t <= (n[S].coordinate + n[S + 1].coordinate) / 2) ||
          (S > 0 &&
            S < u - 1 &&
            t > (n[S].coordinate + n[S - 1].coordinate) / 2 &&
            t <= (n[S].coordinate + n[S + 1].coordinate) / 2) ||
          (S === u - 1 && t > (n[S].coordinate + n[S - 1].coordinate) / 2)
        ) {
          a = n[S].index;
          break;
        }
    return a;
  },
  Qm = function (t) {
    var r,
      n = t,
      i = n.type.displayName,
      o =
        (r = t.type) !== null && r !== void 0 && r.defaultProps
          ? $e($e({}, t.type.defaultProps), t.props)
          : t.props,
      a = o.stroke,
      u = o.fill,
      s;
    switch (i) {
      case "Line":
        s = a;
        break;
      case "Area":
      case "Radar":
        s = a && a !== "none" ? a : u;
        break;
      default:
        s = u;
        break;
    }
    return s;
  },
  B9 = function (t) {
    var r = t.barSize,
      n = t.totalSize,
      i = t.stackGroups,
      o = i === void 0 ? {} : i;
    if (!o) return {};
    for (var a = {}, u = Object.keys(o), s = 0, l = u.length; s < l; s++)
      for (
        var f = o[u[s]].stackGroups, c = Object.keys(f), p = 0, d = c.length;
        p < d;
        p++
      ) {
        var h = f[c[p]],
          y = h.items,
          w = h.cateAxisId,
          m = y.filter(function (O) {
            return Gr(O.type).indexOf("Bar") >= 0;
          });
        if (m && m.length) {
          var v = m[0].type.defaultProps,
            g = v !== void 0 ? $e($e({}, v), m[0].props) : m[0].props,
            S = g.barSize,
            b = g[w];
          a[b] || (a[b] = []);
          var x = ue(S) ? r : S;
          a[b].push({
            item: m[0],
            stackList: m.slice(1),
            barSize: ue(x) ? void 0 : vi(x, n, 0),
          });
        }
      }
    return a;
  },
  z9 = function (t) {
    var r = t.barGap,
      n = t.barCategoryGap,
      i = t.bandSize,
      o = t.sizeList,
      a = o === void 0 ? [] : o,
      u = t.maxBarSize,
      s = a.length;
    if (s < 1) return null;
    var l = vi(r, i, 0, !0),
      f,
      c = [];
    if (a[0].barSize === +a[0].barSize) {
      var p = !1,
        d = i / s,
        h = a.reduce(function (S, b) {
          return S + b.barSize || 0;
        }, 0);
      (h += (s - 1) * l),
        h >= i && ((h -= (s - 1) * l), (l = 0)),
        h >= i && d > 0 && ((p = !0), (d *= 0.9), (h = s * d));
      var y = ((i - h) / 2) >> 0,
        w = { offset: y - l, size: 0 };
      f = a.reduce(function (S, b) {
        var x = {
            item: b.item,
            position: {
              offset: w.offset + w.size + l,
              size: p ? d : b.barSize,
            },
          },
          O = [].concat(K1(S), [x]);
        return (
          (w = O[O.length - 1].position),
          b.stackList &&
            b.stackList.length &&
            b.stackList.forEach(function (_) {
              O.push({ item: _, position: w });
            }),
          O
        );
      }, c);
    } else {
      var m = vi(n, i, 0, !0);
      i - 2 * m - (s - 1) * l <= 0 && (l = 0);
      var v = (i - 2 * m - (s - 1) * l) / s;
      v > 1 && (v >>= 0);
      var g = u === +u ? Math.min(v, u) : v;
      f = a.reduce(function (S, b, x) {
        var O = [].concat(K1(S), [
          {
            item: b.item,
            position: { offset: m + (v + l) * x + (v - g) / 2, size: g },
          },
        ]);
        return (
          b.stackList &&
            b.stackList.length &&
            b.stackList.forEach(function (_) {
              O.push({ item: _, position: O[O.length - 1].position });
            }),
          O
        );
      }, c);
    }
    return f;
  },
  U9 = function (t, r, n, i) {
    var o = n.children,
      a = n.width,
      u = n.margin,
      s = a - (u.left || 0) - (u.right || 0),
      l = IP({ children: o, legendWidth: s });
    if (l) {
      var f = i || {},
        c = f.width,
        p = f.height,
        d = l.align,
        h = l.verticalAlign,
        y = l.layout;
      if (
        (y === "vertical" || (y === "horizontal" && h === "middle")) &&
        d !== "center" &&
        W(t[d])
      )
        return $e($e({}, t), {}, oo({}, d, t[d] + (c || 0)));
      if (
        (y === "horizontal" || (y === "vertical" && d === "center")) &&
        h !== "middle" &&
        W(t[h])
      )
        return $e($e({}, t), {}, oo({}, h, t[h] + (p || 0)));
    }
    return t;
  },
  W9 = function (t, r, n) {
    return ue(r)
      ? !0
      : t === "horizontal"
        ? r === "yAxis"
        : t === "vertical" || n === "x"
          ? r === "xAxis"
          : n === "y"
            ? r === "yAxis"
            : !0;
  },
  TP = function (t, r, n, i, o) {
    var a = r.props.children,
      u = wr(a, df).filter(function (l) {
        return W9(i, o, l.props.direction);
      });
    if (u && u.length) {
      var s = u.map(function (l) {
        return l.props.dataKey;
      });
      return t.reduce(
        function (l, f) {
          var c = Mr(f, n);
          if (ue(c)) return l;
          var p = Array.isArray(c) ? [cf(c), lf(c)] : [c, c],
            d = s.reduce(
              function (h, y) {
                var w = Mr(f, y, 0),
                  m = p[0] - Math.abs(Array.isArray(w) ? w[0] : w),
                  v = p[1] + Math.abs(Array.isArray(w) ? w[1] : w);
                return [Math.min(m, h[0]), Math.max(v, h[1])];
              },
              [1 / 0, -1 / 0]
            );
          return [Math.min(d[0], l[0]), Math.max(d[1], l[1])];
        },
        [1 / 0, -1 / 0]
      );
    }
    return null;
  },
  H9 = function (t, r, n, i, o) {
    var a = r
      .map(function (u) {
        return TP(t, u, n, o, i);
      })
      .filter(function (u) {
        return !ue(u);
      });
    return a && a.length
      ? a.reduce(
          function (u, s) {
            return [Math.min(u[0], s[0]), Math.max(u[1], s[1])];
          },
          [1 / 0, -1 / 0]
        )
      : null;
  },
  $P = function (t, r, n, i, o) {
    var a = r.map(function (s) {
      var l = s.props.dataKey;
      return (n === "number" && l && TP(t, s, l, i)) || Ma(t, l, n, o);
    });
    if (n === "number")
      return a.reduce(
        function (s, l) {
          return [Math.min(s[0], l[0]), Math.max(s[1], l[1])];
        },
        [1 / 0, -1 / 0]
      );
    var u = {};
    return a.reduce(function (s, l) {
      for (var f = 0, c = l.length; f < c; f++)
        u[l[f]] || ((u[l[f]] = !0), s.push(l[f]));
      return s;
    }, []);
  },
  CP = function (t, r) {
    return (
      (t === "horizontal" && r === "xAxis") ||
      (t === "vertical" && r === "yAxis") ||
      (t === "centric" && r === "angleAxis") ||
      (t === "radial" && r === "radiusAxis")
    );
  },
  kP = function (t, r, n, i) {
    if (i)
      return t.map(function (s) {
        return s.coordinate;
      });
    var o,
      a,
      u = t.map(function (s) {
        return (
          s.coordinate === r && (o = !0),
          s.coordinate === n && (a = !0),
          s.coordinate
        );
      });
    return o || u.push(r), a || u.push(n), u;
  },
  Wr = function (t, r, n) {
    if (!t) return null;
    var i = t.scale,
      o = t.duplicateDomain,
      a = t.type,
      u = t.range,
      s = t.realScaleType === "scaleBand" ? i.bandwidth() / 2 : 2,
      l = (r || n) && a === "category" && i.bandwidth ? i.bandwidth() / s : 0;
    if (
      ((l =
        t.axisType === "angleAxis" && (u == null ? void 0 : u.length) >= 2
          ? yr(u[0] - u[1]) * 2 * l
          : l),
      r && (t.ticks || t.niceTicks))
    ) {
      var f = (t.ticks || t.niceTicks).map(function (c) {
        var p = o ? o.indexOf(c) : c;
        return { coordinate: i(p) + l, value: c, offset: l };
      });
      return f.filter(function (c) {
        return !Uu(c.coordinate);
      });
    }
    return t.isCategorical && t.categoricalDomain
      ? t.categoricalDomain.map(function (c, p) {
          return { coordinate: i(c) + l, value: c, index: p, offset: l };
        })
      : i.ticks && !n
        ? i.ticks(t.tickCount).map(function (c) {
            return { coordinate: i(c) + l, value: c, offset: l };
          })
        : i.domain().map(function (c, p) {
            return {
              coordinate: i(c) + l,
              value: o ? o[c] : c,
              index: p,
              offset: l,
            };
          });
  },
  xp = new WeakMap(),
  Ss = function (t, r) {
    if (typeof r != "function") return t;
    xp.has(t) || xp.set(t, new WeakMap());
    var n = xp.get(t);
    if (n.has(r)) return n.get(r);
    var i = function () {
      t.apply(void 0, arguments), r.apply(void 0, arguments);
    };
    return n.set(r, i), i;
  },
  G9 = function (t, r, n) {
    var i = t.scale,
      o = t.type,
      a = t.layout,
      u = t.axisType;
    if (i === "auto")
      return a === "radial" && u === "radiusAxis"
        ? { scale: uu(), realScaleType: "band" }
        : a === "radial" && u === "angleAxis"
          ? { scale: Rl(), realScaleType: "linear" }
          : o === "category" &&
              r &&
              (r.indexOf("LineChart") >= 0 ||
                r.indexOf("AreaChart") >= 0 ||
                (r.indexOf("ComposedChart") >= 0 && !n))
            ? { scale: ja(), realScaleType: "point" }
            : o === "category"
              ? { scale: uu(), realScaleType: "band" }
              : { scale: Rl(), realScaleType: "linear" };
    if (zu(i)) {
      var s = "scale".concat(Xc(i));
      return { scale: (U1[s] || ja)(), realScaleType: U1[s] ? s : "point" };
    }
    return te(i) ? { scale: i } : { scale: ja(), realScaleType: "point" };
  },
  Y1 = 1e-4,
  V9 = function (t) {
    var r = t.domain();
    if (!(!r || r.length <= 2)) {
      var n = r.length,
        i = t.range(),
        o = Math.min(i[0], i[1]) - Y1,
        a = Math.max(i[0], i[1]) + Y1,
        u = t(r[0]),
        s = t(r[n - 1]);
      (u < o || u > a || s < o || s > a) && t.domain([r[0], r[n - 1]]);
    }
  },
  q9 = function (t, r) {
    if (!t) return null;
    for (var n = 0, i = t.length; n < i; n++)
      if (t[n].item === r) return t[n].position;
    return null;
  },
  K9 = function (t, r) {
    if (!r || r.length !== 2 || !W(r[0]) || !W(r[1])) return t;
    var n = Math.min(r[0], r[1]),
      i = Math.max(r[0], r[1]),
      o = [t[0], t[1]];
    return (
      (!W(t[0]) || t[0] < n) && (o[0] = n),
      (!W(t[1]) || t[1] > i) && (o[1] = i),
      o[0] > i && (o[0] = i),
      o[1] < n && (o[1] = n),
      o
    );
  },
  X9 = function (t) {
    var r = t.length;
    if (!(r <= 0))
      for (var n = 0, i = t[0].length; n < i; ++n)
        for (var o = 0, a = 0, u = 0; u < r; ++u) {
          var s = Uu(t[u][n][1]) ? t[u][n][0] : t[u][n][1];
          s >= 0
            ? ((t[u][n][0] = o), (t[u][n][1] = o + s), (o = t[u][n][1]))
            : ((t[u][n][0] = a), (t[u][n][1] = a + s), (a = t[u][n][1]));
        }
  },
  Y9 = function (t) {
    var r = t.length;
    if (!(r <= 0))
      for (var n = 0, i = t[0].length; n < i; ++n)
        for (var o = 0, a = 0; a < r; ++a) {
          var u = Uu(t[a][n][1]) ? t[a][n][0] : t[a][n][1];
          u >= 0
            ? ((t[a][n][0] = o), (t[a][n][1] = o + u), (o = t[a][n][1]))
            : ((t[a][n][0] = 0), (t[a][n][1] = 0));
        }
  },
  Q9 = {
    sign: X9,
    expand: fN,
    none: ho,
    silhouette: pN,
    wiggle: dN,
    positive: Y9,
  },
  Z9 = function (t, r, n) {
    var i = r.map(function (u) {
        return u.props.dataKey;
      }),
      o = Q9[n],
      a = cN()
        .keys(i)
        .value(function (u, s) {
          return +Mr(u, s, 0);
        })
        .order(Bd)
        .offset(o);
    return a(t);
  },
  J9 = function (t, r, n, i, o, a) {
    if (!t) return null;
    var u = a ? r.reverse() : r,
      s = {},
      l = u.reduce(function (c, p) {
        var d,
          h =
            (d = p.type) !== null && d !== void 0 && d.defaultProps
              ? $e($e({}, p.type.defaultProps), p.props)
              : p.props,
          y = h.stackId,
          w = h.hide;
        if (w) return c;
        var m = h[n],
          v = c[m] || { hasStack: !1, stackGroups: {} };
        if (Ue(y)) {
          var g = v.stackGroups[y] || {
            numericAxisId: n,
            cateAxisId: i,
            items: [],
          };
          g.items.push(p), (v.hasStack = !0), (v.stackGroups[y] = g);
        } else
          v.stackGroups[Kc("_stackId_")] = {
            numericAxisId: n,
            cateAxisId: i,
            items: [p],
          };
        return $e($e({}, c), {}, oo({}, m, v));
      }, s),
      f = {};
    return Object.keys(l).reduce(function (c, p) {
      var d = l[p];
      if (d.hasStack) {
        var h = {};
        d.stackGroups = Object.keys(d.stackGroups).reduce(function (y, w) {
          var m = d.stackGroups[w];
          return $e(
            $e({}, y),
            {},
            oo({}, w, {
              numericAxisId: n,
              cateAxisId: i,
              items: m.items,
              stackedData: Z9(t, m.items, o),
            })
          );
        }, h);
      }
      return $e($e({}, c), {}, oo({}, p, d));
    }, f);
  },
  eU = function (t, r) {
    var n = r.realScaleType,
      i = r.type,
      o = r.tickCount,
      a = r.originalDomain,
      u = r.allowDecimals,
      s = n || r.scale;
    if (s !== "auto" && s !== "linear") return null;
    if (o && i === "number" && a && (a[0] === "auto" || a[1] === "auto")) {
      var l = t.domain();
      if (!l.length) return null;
      var f = f9(l, o, u);
      return t.domain([cf(f), lf(f)]), { niceTicks: f };
    }
    if (o && i === "number") {
      var c = t.domain(),
        p = p9(c, o, u);
      return { niceTicks: p };
    }
    return null;
  },
  Q1 = function (t) {
    var r = t.axis,
      n = t.ticks,
      i = t.offset,
      o = t.bandSize,
      a = t.entry,
      u = t.index;
    if (r.type === "category") return n[u] ? n[u].coordinate + i : null;
    var s = Mr(a, r.dataKey, r.domain[u]);
    return ue(s) ? null : r.scale(s) - o / 2 + i;
  },
  tU = function (t) {
    var r = t.numericAxis,
      n = r.scale.domain();
    if (r.type === "number") {
      var i = Math.min(n[0], n[1]),
        o = Math.max(n[0], n[1]);
      return i <= 0 && o >= 0 ? 0 : o < 0 ? o : i;
    }
    return n[0];
  },
  rU = function (t, r) {
    var n,
      i =
        (n = t.type) !== null && n !== void 0 && n.defaultProps
          ? $e($e({}, t.type.defaultProps), t.props)
          : t.props,
      o = i.stackId;
    if (Ue(o)) {
      var a = r[o];
      if (a) {
        var u = a.items.indexOf(t);
        return u >= 0 ? a.stackedData[u] : null;
      }
    }
    return null;
  },
  nU = function (t) {
    return t.reduce(
      function (r, n) {
        return [cf(n.concat([r[0]]).filter(W)), lf(n.concat([r[1]]).filter(W))];
      },
      [1 / 0, -1 / 0]
    );
  },
  jP = function (t, r, n) {
    return Object.keys(t)
      .reduce(
        function (i, o) {
          var a = t[o],
            u = a.stackedData,
            s = u.reduce(
              function (l, f) {
                var c = nU(f.slice(r, n + 1));
                return [Math.min(l[0], c[0]), Math.max(l[1], c[1])];
              },
              [1 / 0, -1 / 0]
            );
          return [Math.min(s[0], i[0]), Math.max(s[1], i[1])];
        },
        [1 / 0, -1 / 0]
      )
      .map(function (i) {
        return i === 1 / 0 || i === -1 / 0 ? 0 : i;
      });
  },
  Z1 = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  J1 = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  mh = function (t, r, n) {
    if (te(t)) return t(r, n);
    if (!Array.isArray(t)) return r;
    var i = [];
    if (W(t[0])) i[0] = n ? t[0] : Math.min(t[0], r[0]);
    else if (Z1.test(t[0])) {
      var o = +Z1.exec(t[0])[1];
      i[0] = r[0] - o;
    } else te(t[0]) ? (i[0] = t[0](r[0])) : (i[0] = r[0]);
    if (W(t[1])) i[1] = n ? t[1] : Math.max(t[1], r[1]);
    else if (J1.test(t[1])) {
      var a = +J1.exec(t[1])[1];
      i[1] = r[1] + a;
    } else te(t[1]) ? (i[1] = t[1](r[1])) : (i[1] = r[1]);
    return i;
  },
  Gl = function (t, r, n) {
    if (t && t.scale && t.scale.bandwidth) {
      var i = t.scale.bandwidth();
      if (!n || i > 0) return i;
    }
    if (t && r && r.length >= 2) {
      for (
        var o = _m(r, function (c) {
            return c.coordinate;
          }),
          a = 1 / 0,
          u = 1,
          s = o.length;
        u < s;
        u++
      ) {
        var l = o[u],
          f = o[u - 1];
        a = Math.min((l.coordinate || 0) - (f.coordinate || 0), a);
      }
      return a === 1 / 0 ? 0 : a;
    }
    return n ? void 0 : 0;
  },
  eb = function (t, r, n) {
    return !t || !t.length || Km(t, ir(n, "type.defaultProps.domain")) ? r : t;
  },
  MP = function (t, r) {
    var n = t.type.defaultProps
        ? $e($e({}, t.type.defaultProps), t.props)
        : t.props,
      i = n.dataKey,
      o = n.name,
      a = n.unit,
      u = n.formatter,
      s = n.tooltipType,
      l = n.chartType,
      f = n.hide;
    return $e(
      $e({}, ae(t, !1)),
      {},
      {
        dataKey: i,
        unit: a,
        formatter: u,
        name: o || i,
        color: Qm(t),
        value: Mr(r, i),
        type: s,
        payload: r,
        chartType: l,
        hide: f,
      }
    );
  };
function mu(e) {
  "@babel/helpers - typeof";
  return (
    (mu =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    mu(e)
  );
}
function tb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function rb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? tb(Object(r), !0).forEach(function (n) {
          iU(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : tb(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function iU(e, t, r) {
  return (
    (t = oU(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function oU(e) {
  var t = aU(e, "string");
  return mu(t) == "symbol" ? t : t + "";
}
function aU(e, t) {
  if (mu(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (mu(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Vl = Math.PI / 180,
  uU = function (t) {
    return (t * 180) / Math.PI;
  },
  Je = function (t, r, n, i) {
    return { x: t + Math.cos(-Vl * i) * n, y: r + Math.sin(-Vl * i) * n };
  },
  sU = function (t, r) {
    var n = t.x,
      i = t.y,
      o = r.x,
      a = r.y;
    return Math.sqrt(Math.pow(n - o, 2) + Math.pow(i - a, 2));
  },
  lU = function (t, r) {
    var n = t.x,
      i = t.y,
      o = r.cx,
      a = r.cy,
      u = sU({ x: n, y: i }, { x: o, y: a });
    if (u <= 0) return { radius: u };
    var s = (n - o) / u,
      l = Math.acos(s);
    return (
      i > a && (l = 2 * Math.PI - l),
      { radius: u, angle: uU(l), angleInRadian: l }
    );
  },
  cU = function (t) {
    var r = t.startAngle,
      n = t.endAngle,
      i = Math.floor(r / 360),
      o = Math.floor(n / 360),
      a = Math.min(i, o);
    return { startAngle: r - a * 360, endAngle: n - a * 360 };
  },
  fU = function (t, r) {
    var n = r.startAngle,
      i = r.endAngle,
      o = Math.floor(n / 360),
      a = Math.floor(i / 360),
      u = Math.min(o, a);
    return t + u * 360;
  },
  nb = function (t, r) {
    var n = t.x,
      i = t.y,
      o = lU({ x: n, y: i }, r),
      a = o.radius,
      u = o.angle,
      s = r.innerRadius,
      l = r.outerRadius;
    if (a < s || a > l) return !1;
    if (a === 0) return !0;
    var f = cU(r),
      c = f.startAngle,
      p = f.endAngle,
      d = u,
      h;
    if (c <= p) {
      for (; d > p; ) d -= 360;
      for (; d < c; ) d += 360;
      h = d >= c && d <= p;
    } else {
      for (; d > c; ) d -= 360;
      for (; d < p; ) d += 360;
      h = d >= p && d <= c;
    }
    return h ? rb(rb({}, r), {}, { radius: a, angle: fU(d, r) }) : null;
  };
function yu(e) {
  "@babel/helpers - typeof";
  return (
    (yu =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    yu(e)
  );
}
var pU = ["offset"];
function dU(e) {
  return yU(e) || mU(e) || vU(e) || hU();
}
function hU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function vU(e, t) {
  if (e) {
    if (typeof e == "string") return yh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return yh(e, t);
  }
}
function mU(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function yU(e) {
  if (Array.isArray(e)) return yh(e);
}
function yh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function gU(e, t) {
  if (e == null) return {};
  var r = bU(e, t),
    n,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (n = o[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n]);
  }
  return r;
}
function bU(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function ib(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function Fe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? ib(Object(r), !0).forEach(function (n) {
          wU(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : ib(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function wU(e, t, r) {
  return (
    (t = xU(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function xU(e) {
  var t = SU(e, "string");
  return yu(t) == "symbol" ? t : t + "";
}
function SU(e, t) {
  if (yu(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (yu(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function gu() {
  return (
    (gu = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    gu.apply(this, arguments)
  );
}
var OU = function (t) {
    var r = t.value,
      n = t.formatter,
      i = ue(t.children) ? r : t.children;
    return te(n) ? n(i) : i;
  },
  _U = function (t, r) {
    var n = yr(r - t),
      i = Math.min(Math.abs(r - t), 360);
    return n * i;
  },
  PU = function (t, r, n) {
    var i = t.position,
      o = t.viewBox,
      a = t.offset,
      u = t.className,
      s = o,
      l = s.cx,
      f = s.cy,
      c = s.innerRadius,
      p = s.outerRadius,
      d = s.startAngle,
      h = s.endAngle,
      y = s.clockWise,
      w = (c + p) / 2,
      m = _U(d, h),
      v = m >= 0 ? 1 : -1,
      g,
      S;
    i === "insideStart"
      ? ((g = d + v * a), (S = y))
      : i === "insideEnd"
        ? ((g = h - v * a), (S = !y))
        : i === "end" && ((g = h + v * a), (S = y)),
      (S = m <= 0 ? S : !S);
    var b = Je(l, f, w, g),
      x = Je(l, f, w, g + (S ? 1 : -1) * 359),
      O = "M"
        .concat(b.x, ",")
        .concat(
          b.y,
          `
    A`
        )
        .concat(w, ",")
        .concat(w, ",0,1,")
        .concat(
          S ? 0 : 1,
          `,
    `
        )
        .concat(x.x, ",")
        .concat(x.y),
      _ = ue(t.id) ? Kc("recharts-radial-line-") : t.id;
    return A.createElement(
      "text",
      gu({}, n, {
        dominantBaseline: "central",
        className: se("recharts-radial-bar-label", u),
      }),
      A.createElement("defs", null, A.createElement("path", { id: _, d: O })),
      A.createElement("textPath", { xlinkHref: "#".concat(_) }, r)
    );
  },
  AU = function (t) {
    var r = t.viewBox,
      n = t.offset,
      i = t.position,
      o = r,
      a = o.cx,
      u = o.cy,
      s = o.innerRadius,
      l = o.outerRadius,
      f = o.startAngle,
      c = o.endAngle,
      p = (f + c) / 2;
    if (i === "outside") {
      var d = Je(a, u, l + n, p),
        h = d.x,
        y = d.y;
      return {
        x: h,
        y,
        textAnchor: h >= a ? "start" : "end",
        verticalAnchor: "middle",
      };
    }
    if (i === "center")
      return { x: a, y: u, textAnchor: "middle", verticalAnchor: "middle" };
    if (i === "centerTop")
      return { x: a, y: u, textAnchor: "middle", verticalAnchor: "start" };
    if (i === "centerBottom")
      return { x: a, y: u, textAnchor: "middle", verticalAnchor: "end" };
    var w = (s + l) / 2,
      m = Je(a, u, w, p),
      v = m.x,
      g = m.y;
    return { x: v, y: g, textAnchor: "middle", verticalAnchor: "middle" };
  },
  EU = function (t) {
    var r = t.viewBox,
      n = t.parentViewBox,
      i = t.offset,
      o = t.position,
      a = r,
      u = a.x,
      s = a.y,
      l = a.width,
      f = a.height,
      c = f >= 0 ? 1 : -1,
      p = c * i,
      d = c > 0 ? "end" : "start",
      h = c > 0 ? "start" : "end",
      y = l >= 0 ? 1 : -1,
      w = y * i,
      m = y > 0 ? "end" : "start",
      v = y > 0 ? "start" : "end";
    if (o === "top") {
      var g = {
        x: u + l / 2,
        y: s - c * i,
        textAnchor: "middle",
        verticalAnchor: d,
      };
      return Fe(Fe({}, g), n ? { height: Math.max(s - n.y, 0), width: l } : {});
    }
    if (o === "bottom") {
      var S = {
        x: u + l / 2,
        y: s + f + p,
        textAnchor: "middle",
        verticalAnchor: h,
      };
      return Fe(
        Fe({}, S),
        n ? { height: Math.max(n.y + n.height - (s + f), 0), width: l } : {}
      );
    }
    if (o === "left") {
      var b = {
        x: u - w,
        y: s + f / 2,
        textAnchor: m,
        verticalAnchor: "middle",
      };
      return Fe(
        Fe({}, b),
        n ? { width: Math.max(b.x - n.x, 0), height: f } : {}
      );
    }
    if (o === "right") {
      var x = {
        x: u + l + w,
        y: s + f / 2,
        textAnchor: v,
        verticalAnchor: "middle",
      };
      return Fe(
        Fe({}, x),
        n ? { width: Math.max(n.x + n.width - x.x, 0), height: f } : {}
      );
    }
    var O = n ? { width: l, height: f } : {};
    return o === "insideLeft"
      ? Fe(
          { x: u + w, y: s + f / 2, textAnchor: v, verticalAnchor: "middle" },
          O
        )
      : o === "insideRight"
        ? Fe(
            {
              x: u + l - w,
              y: s + f / 2,
              textAnchor: m,
              verticalAnchor: "middle",
            },
            O
          )
        : o === "insideTop"
          ? Fe(
              {
                x: u + l / 2,
                y: s + p,
                textAnchor: "middle",
                verticalAnchor: h,
              },
              O
            )
          : o === "insideBottom"
            ? Fe(
                {
                  x: u + l / 2,
                  y: s + f - p,
                  textAnchor: "middle",
                  verticalAnchor: d,
                },
                O
              )
            : o === "insideTopLeft"
              ? Fe({ x: u + w, y: s + p, textAnchor: v, verticalAnchor: h }, O)
              : o === "insideTopRight"
                ? Fe(
                    {
                      x: u + l - w,
                      y: s + p,
                      textAnchor: m,
                      verticalAnchor: h,
                    },
                    O
                  )
                : o === "insideBottomLeft"
                  ? Fe(
                      {
                        x: u + w,
                        y: s + f - p,
                        textAnchor: v,
                        verticalAnchor: d,
                      },
                      O
                    )
                  : o === "insideBottomRight"
                    ? Fe(
                        {
                          x: u + l - w,
                          y: s + f - p,
                          textAnchor: m,
                          verticalAnchor: d,
                        },
                        O
                      )
                    : Bo(o) && (W(o.x) || ei(o.x)) && (W(o.y) || ei(o.y))
                      ? Fe(
                          {
                            x: u + vi(o.x, l),
                            y: s + vi(o.y, f),
                            textAnchor: "end",
                            verticalAnchor: "end",
                          },
                          O
                        )
                      : Fe(
                          {
                            x: u + l / 2,
                            y: s + f / 2,
                            textAnchor: "middle",
                            verticalAnchor: "middle",
                          },
                          O
                        );
  },
  IU = function (t) {
    return "cx" in t && W(t.cx);
  };
function lt(e) {
  var t = e.offset,
    r = t === void 0 ? 5 : t,
    n = gU(e, pU),
    i = Fe({ offset: r }, n),
    o = i.viewBox,
    a = i.position,
    u = i.value,
    s = i.children,
    l = i.content,
    f = i.className,
    c = f === void 0 ? "" : f,
    p = i.textBreakAll;
  if (!o || (ue(u) && ue(s) && !z.isValidElement(l) && !te(l))) return null;
  if (z.isValidElement(l)) return z.cloneElement(l, i);
  var d;
  if (te(l)) {
    if (((d = z.createElement(l, i)), z.isValidElement(d))) return d;
  } else d = OU(i);
  var h = IU(o),
    y = ae(i, !0);
  if (h && (a === "insideStart" || a === "insideEnd" || a === "end"))
    return PU(i, d, y);
  var w = h ? AU(i) : EU(i);
  return A.createElement(
    Cl,
    gu({ className: se("recharts-label", c) }, y, w, { breakAll: p }),
    d
  );
}
lt.displayName = "Label";
var NP = function (t) {
    var r = t.cx,
      n = t.cy,
      i = t.angle,
      o = t.startAngle,
      a = t.endAngle,
      u = t.r,
      s = t.radius,
      l = t.innerRadius,
      f = t.outerRadius,
      c = t.x,
      p = t.y,
      d = t.top,
      h = t.left,
      y = t.width,
      w = t.height,
      m = t.clockWise,
      v = t.labelViewBox;
    if (v) return v;
    if (W(y) && W(w)) {
      if (W(c) && W(p)) return { x: c, y: p, width: y, height: w };
      if (W(d) && W(h)) return { x: d, y: h, width: y, height: w };
    }
    return W(c) && W(p)
      ? { x: c, y: p, width: 0, height: 0 }
      : W(r) && W(n)
        ? {
            cx: r,
            cy: n,
            startAngle: o || i || 0,
            endAngle: a || i || 0,
            innerRadius: l || 0,
            outerRadius: f || s || u || 0,
            clockWise: m,
          }
        : t.viewBox
          ? t.viewBox
          : {};
  },
  TU = function (t, r) {
    return t
      ? t === !0
        ? A.createElement(lt, { key: "label-implicit", viewBox: r })
        : Ue(t)
          ? A.createElement(lt, { key: "label-implicit", viewBox: r, value: t })
          : z.isValidElement(t)
            ? t.type === lt
              ? z.cloneElement(t, { key: "label-implicit", viewBox: r })
              : A.createElement(lt, {
                  key: "label-implicit",
                  content: t,
                  viewBox: r,
                })
            : te(t)
              ? A.createElement(lt, {
                  key: "label-implicit",
                  content: t,
                  viewBox: r,
                })
              : Bo(t)
                ? A.createElement(
                    lt,
                    gu({ viewBox: r }, t, { key: "label-implicit" })
                  )
                : null
      : null;
  },
  $U = function (t, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    if (!t || (!t.children && n && !t.label)) return null;
    var i = t.children,
      o = NP(t),
      a = wr(i, lt).map(function (s, l) {
        return z.cloneElement(s, { viewBox: r || o, key: "label-".concat(l) });
      });
    if (!n) return a;
    var u = TU(t.label, r || o);
    return [u].concat(dU(a));
  };
lt.parseViewBox = NP;
lt.renderCallByParent = $U;
function CU(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
var kU = CU;
const jU = he(kU);
function bu(e) {
  "@babel/helpers - typeof";
  return (
    (bu =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    bu(e)
  );
}
var MU = ["valueAccessor"],
  NU = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
function DU(e) {
  return BU(e) || FU(e) || RU(e) || LU();
}
function LU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function RU(e, t) {
  if (e) {
    if (typeof e == "string") return gh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return gh(e, t);
  }
}
function FU(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function BU(e) {
  if (Array.isArray(e)) return gh(e);
}
function gh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function ql() {
  return (
    (ql = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    ql.apply(this, arguments)
  );
}
function ob(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function ab(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? ob(Object(r), !0).forEach(function (n) {
          zU(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : ob(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function zU(e, t, r) {
  return (
    (t = UU(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function UU(e) {
  var t = WU(e, "string");
  return bu(t) == "symbol" ? t : t + "";
}
function WU(e, t) {
  if (bu(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (bu(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ub(e, t) {
  if (e == null) return {};
  var r = HU(e, t),
    n,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (n = o[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n]);
  }
  return r;
}
function HU(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var GU = function (t) {
  return Array.isArray(t.value) ? jU(t.value) : t.value;
};
function li(e) {
  var t = e.valueAccessor,
    r = t === void 0 ? GU : t,
    n = ub(e, MU),
    i = n.data,
    o = n.dataKey,
    a = n.clockWise,
    u = n.id,
    s = n.textBreakAll,
    l = ub(n, NU);
  return !i || !i.length
    ? null
    : A.createElement(
        qe,
        { className: "recharts-label-list" },
        i.map(function (f, c) {
          var p = ue(o) ? r(f, c) : Mr(f && f.payload, o),
            d = ue(u) ? {} : { id: "".concat(u, "-").concat(c) };
          return A.createElement(
            lt,
            ql({}, ae(f, !0), l, d, {
              parentViewBox: f.parentViewBox,
              value: p,
              textBreakAll: s,
              viewBox: lt.parseViewBox(
                ue(a) ? f : ab(ab({}, f), {}, { clockWise: a })
              ),
              key: "label-".concat(c),
              index: c,
            })
          );
        })
      );
}
li.displayName = "LabelList";
function VU(e, t) {
  return e
    ? e === !0
      ? A.createElement(li, { key: "labelList-implicit", data: t })
      : A.isValidElement(e) || te(e)
        ? A.createElement(li, {
            key: "labelList-implicit",
            data: t,
            content: e,
          })
        : Bo(e)
          ? A.createElement(
              li,
              ql({ data: t }, e, { key: "labelList-implicit" })
            )
          : null
    : null;
}
function qU(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!e || (!e.children && r && !e.label)) return null;
  var n = e.children,
    i = wr(n, li).map(function (a, u) {
      return z.cloneElement(a, { data: t, key: "labelList-".concat(u) });
    });
  if (!r) return i;
  var o = VU(e.label, t);
  return [o].concat(DU(i));
}
li.renderCallByParent = qU;
function wu(e) {
  "@babel/helpers - typeof";
  return (
    (wu =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    wu(e)
  );
}
function bh() {
  return (
    (bh = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    bh.apply(this, arguments)
  );
}
function sb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function lb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? sb(Object(r), !0).forEach(function (n) {
          KU(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : sb(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function KU(e, t, r) {
  return (
    (t = XU(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function XU(e) {
  var t = YU(e, "string");
  return wu(t) == "symbol" ? t : t + "";
}
function YU(e, t) {
  if (wu(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (wu(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var QU = function (t, r) {
    var n = yr(r - t),
      i = Math.min(Math.abs(r - t), 359.999);
    return n * i;
  },
  Os = function (t) {
    var r = t.cx,
      n = t.cy,
      i = t.radius,
      o = t.angle,
      a = t.sign,
      u = t.isExternal,
      s = t.cornerRadius,
      l = t.cornerIsExternal,
      f = s * (u ? 1 : -1) + i,
      c = Math.asin(s / f) / Vl,
      p = l ? o : o + a * c,
      d = Je(r, n, f, p),
      h = Je(r, n, i, p),
      y = l ? o - a * c : o,
      w = Je(r, n, f * Math.cos(c * Vl), y);
    return { center: d, circleTangency: h, lineTangency: w, theta: c };
  },
  DP = function (t) {
    var r = t.cx,
      n = t.cy,
      i = t.innerRadius,
      o = t.outerRadius,
      a = t.startAngle,
      u = t.endAngle,
      s = QU(a, u),
      l = a + s,
      f = Je(r, n, o, a),
      c = Je(r, n, o, l),
      p = "M "
        .concat(f.x, ",")
        .concat(
          f.y,
          `
    A `
        )
        .concat(o, ",")
        .concat(
          o,
          `,0,
    `
        )
        .concat(+(Math.abs(s) > 180), ",")
        .concat(
          +(a > l),
          `,
    `
        )
        .concat(c.x, ",")
        .concat(
          c.y,
          `
  `
        );
    if (i > 0) {
      var d = Je(r, n, i, a),
        h = Je(r, n, i, l);
      p += "L "
        .concat(h.x, ",")
        .concat(
          h.y,
          `
            A `
        )
        .concat(i, ",")
        .concat(
          i,
          `,0,
            `
        )
        .concat(+(Math.abs(s) > 180), ",")
        .concat(
          +(a <= l),
          `,
            `
        )
        .concat(d.x, ",")
        .concat(d.y, " Z");
    } else p += "L ".concat(r, ",").concat(n, " Z");
    return p;
  },
  ZU = function (t) {
    var r = t.cx,
      n = t.cy,
      i = t.innerRadius,
      o = t.outerRadius,
      a = t.cornerRadius,
      u = t.forceCornerRadius,
      s = t.cornerIsExternal,
      l = t.startAngle,
      f = t.endAngle,
      c = yr(f - l),
      p = Os({
        cx: r,
        cy: n,
        radius: o,
        angle: l,
        sign: c,
        cornerRadius: a,
        cornerIsExternal: s,
      }),
      d = p.circleTangency,
      h = p.lineTangency,
      y = p.theta,
      w = Os({
        cx: r,
        cy: n,
        radius: o,
        angle: f,
        sign: -c,
        cornerRadius: a,
        cornerIsExternal: s,
      }),
      m = w.circleTangency,
      v = w.lineTangency,
      g = w.theta,
      S = s ? Math.abs(l - f) : Math.abs(l - f) - y - g;
    if (S < 0)
      return u
        ? "M "
            .concat(h.x, ",")
            .concat(
              h.y,
              `
        a`
            )
            .concat(a, ",")
            .concat(a, ",0,0,1,")
            .concat(
              a * 2,
              `,0
        a`
            )
            .concat(a, ",")
            .concat(a, ",0,0,1,")
            .concat(
              -a * 2,
              `,0
      `
            )
        : DP({
            cx: r,
            cy: n,
            innerRadius: i,
            outerRadius: o,
            startAngle: l,
            endAngle: f,
          });
    var b = "M "
      .concat(h.x, ",")
      .concat(
        h.y,
        `
    A`
      )
      .concat(a, ",")
      .concat(a, ",0,0,")
      .concat(+(c < 0), ",")
      .concat(d.x, ",")
      .concat(
        d.y,
        `
    A`
      )
      .concat(o, ",")
      .concat(o, ",0,")
      .concat(+(S > 180), ",")
      .concat(+(c < 0), ",")
      .concat(m.x, ",")
      .concat(
        m.y,
        `
    A`
      )
      .concat(a, ",")
      .concat(a, ",0,0,")
      .concat(+(c < 0), ",")
      .concat(v.x, ",")
      .concat(
        v.y,
        `
  `
      );
    if (i > 0) {
      var x = Os({
          cx: r,
          cy: n,
          radius: i,
          angle: l,
          sign: c,
          isExternal: !0,
          cornerRadius: a,
          cornerIsExternal: s,
        }),
        O = x.circleTangency,
        _ = x.lineTangency,
        P = x.theta,
        I = Os({
          cx: r,
          cy: n,
          radius: i,
          angle: f,
          sign: -c,
          isExternal: !0,
          cornerRadius: a,
          cornerIsExternal: s,
        }),
        E = I.circleTangency,
        $ = I.lineTangency,
        M = I.theta,
        N = s ? Math.abs(l - f) : Math.abs(l - f) - P - M;
      if (N < 0 && a === 0)
        return "".concat(b, "L").concat(r, ",").concat(n, "Z");
      b += "L"
        .concat($.x, ",")
        .concat(
          $.y,
          `
      A`
        )
        .concat(a, ",")
        .concat(a, ",0,0,")
        .concat(+(c < 0), ",")
        .concat(E.x, ",")
        .concat(
          E.y,
          `
      A`
        )
        .concat(i, ",")
        .concat(i, ",0,")
        .concat(+(N > 180), ",")
        .concat(+(c > 0), ",")
        .concat(O.x, ",")
        .concat(
          O.y,
          `
      A`
        )
        .concat(a, ",")
        .concat(a, ",0,0,")
        .concat(+(c < 0), ",")
        .concat(_.x, ",")
        .concat(_.y, "Z");
    } else b += "L".concat(r, ",").concat(n, "Z");
    return b;
  },
  JU = {
    cx: 0,
    cy: 0,
    innerRadius: 0,
    outerRadius: 0,
    startAngle: 0,
    endAngle: 0,
    cornerRadius: 0,
    forceCornerRadius: !1,
    cornerIsExternal: !1,
  },
  LP = function (t) {
    var r = lb(lb({}, JU), t),
      n = r.cx,
      i = r.cy,
      o = r.innerRadius,
      a = r.outerRadius,
      u = r.cornerRadius,
      s = r.forceCornerRadius,
      l = r.cornerIsExternal,
      f = r.startAngle,
      c = r.endAngle,
      p = r.className;
    if (a < o || f === c) return null;
    var d = se("recharts-sector", p),
      h = a - o,
      y = vi(u, h, 0, !0),
      w;
    return (
      y > 0 && Math.abs(f - c) < 360
        ? (w = ZU({
            cx: n,
            cy: i,
            innerRadius: o,
            outerRadius: a,
            cornerRadius: Math.min(y, h / 2),
            forceCornerRadius: s,
            cornerIsExternal: l,
            startAngle: f,
            endAngle: c,
          }))
        : (w = DP({
            cx: n,
            cy: i,
            innerRadius: o,
            outerRadius: a,
            startAngle: f,
            endAngle: c,
          })),
      A.createElement(
        "path",
        bh({}, ae(r, !0), { className: d, d: w, role: "img" })
      )
    );
  };
function xu(e) {
  "@babel/helpers - typeof";
  return (
    (xu =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    xu(e)
  );
}
function wh() {
  return (
    (wh = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    wh.apply(this, arguments)
  );
}
function cb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function fb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? cb(Object(r), !0).forEach(function (n) {
          eW(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : cb(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function eW(e, t, r) {
  return (
    (t = tW(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function tW(e) {
  var t = rW(e, "string");
  return xu(t) == "symbol" ? t : t + "";
}
function rW(e, t) {
  if (xu(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (xu(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var pb = {
    curveBasisClosed: JM,
    curveBasisOpen: eN,
    curveBasis: ZM,
    curveBumpX: RM,
    curveBumpY: FM,
    curveLinearClosed: tN,
    curveLinear: Qc,
    curveMonotoneX: rN,
    curveMonotoneY: nN,
    curveNatural: iN,
    curveStep: oN,
    curveStepAfter: uN,
    curveStepBefore: aN,
  },
  _s = function (t) {
    return t.x === +t.x && t.y === +t.y;
  },
  pa = function (t) {
    return t.x;
  },
  da = function (t) {
    return t.y;
  },
  nW = function (t, r) {
    if (te(t)) return t;
    var n = "curve".concat(Xc(t));
    return (n === "curveMonotone" || n === "curveBump") && r
      ? pb["".concat(n).concat(r === "vertical" ? "Y" : "X")]
      : pb[n] || Qc;
  },
  iW = function (t) {
    var r = t.type,
      n = r === void 0 ? "linear" : r,
      i = t.points,
      o = i === void 0 ? [] : i,
      a = t.baseLine,
      u = t.layout,
      s = t.connectNulls,
      l = s === void 0 ? !1 : s,
      f = nW(n, u),
      c = l
        ? o.filter(function (y) {
            return _s(y);
          })
        : o,
      p;
    if (Array.isArray(a)) {
      var d = l
          ? a.filter(function (y) {
              return _s(y);
            })
          : a,
        h = c.map(function (y, w) {
          return fb(fb({}, y), {}, { base: d[w] });
        });
      return (
        u === "vertical"
          ? (p = hs()
              .y(da)
              .x1(pa)
              .x0(function (y) {
                return y.base.x;
              }))
          : (p = hs()
              .x(pa)
              .y1(da)
              .y0(function (y) {
                return y.base.y;
              })),
        p.defined(_s).curve(f),
        p(h)
      );
    }
    return (
      u === "vertical" && W(a)
        ? (p = hs().y(da).x1(pa).x0(a))
        : W(a)
          ? (p = hs().x(pa).y1(da).y0(a))
          : (p = LO().x(pa).y(da)),
      p.defined(_s).curve(f),
      p(c)
    );
  },
  db = function (t) {
    var r = t.className,
      n = t.points,
      i = t.path,
      o = t.pathRef;
    if ((!n || !n.length) && !i) return null;
    var a = n && n.length ? iW(t) : i;
    return A.createElement(
      "path",
      wh({}, ae(t, !1), ml(t), {
        className: se("recharts-curve", r),
        d: a,
        ref: o,
      })
    );
  },
  RP = { exports: {} },
  oW = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
  aW = oW,
  uW = aW;
function FP() {}
function BP() {}
BP.resetWarningCache = FP;
var sW = function () {
  function e(n, i, o, a, u, s) {
    if (s !== uW) {
      var l = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
      );
      throw ((l.name = "Invariant Violation"), l);
    }
  }
  e.isRequired = e;
  function t() {
    return e;
  }
  var r = {
    array: e,
    bigint: e,
    bool: e,
    func: e,
    number: e,
    object: e,
    string: e,
    symbol: e,
    any: e,
    arrayOf: t,
    element: e,
    elementType: e,
    instanceOf: t,
    node: e,
    objectOf: t,
    oneOf: t,
    oneOfType: t,
    shape: t,
    exact: t,
    checkPropTypes: BP,
    resetWarningCache: FP,
  };
  return (r.PropTypes = r), r;
};
RP.exports = sW();
var lW = RP.exports;
const Z = he(lW);
var cW = Object.getOwnPropertyNames,
  fW = Object.getOwnPropertySymbols,
  pW = Object.prototype.hasOwnProperty;
function hb(e, t) {
  return function (n, i, o) {
    return e(n, i, o) && t(n, i, o);
  };
}
function Ps(e) {
  return function (r, n, i) {
    if (!r || !n || typeof r != "object" || typeof n != "object")
      return e(r, n, i);
    var o = i.cache,
      a = o.get(r),
      u = o.get(n);
    if (a && u) return a === n && u === r;
    o.set(r, n), o.set(n, r);
    var s = e(r, n, i);
    return o.delete(r), o.delete(n), s;
  };
}
function vb(e) {
  return cW(e).concat(fW(e));
}
var zP =
  Object.hasOwn ||
  function (e, t) {
    return pW.call(e, t);
  };
function Yo(e, t) {
  return e || t ? e === t : e === t || (e !== e && t !== t);
}
var UP = "_owner",
  mb = Object.getOwnPropertyDescriptor,
  yb = Object.keys;
function dW(e, t, r) {
  var n = e.length;
  if (t.length !== n) return !1;
  for (; n-- > 0; ) if (!r.equals(e[n], t[n], n, n, e, t, r)) return !1;
  return !0;
}
function hW(e, t) {
  return Yo(e.getTime(), t.getTime());
}
function gb(e, t, r) {
  if (e.size !== t.size) return !1;
  for (var n = {}, i = e.entries(), o = 0, a, u; (a = i.next()) && !a.done; ) {
    for (var s = t.entries(), l = !1, f = 0; (u = s.next()) && !u.done; ) {
      var c = a.value,
        p = c[0],
        d = c[1],
        h = u.value,
        y = h[0],
        w = h[1];
      !l &&
        !n[f] &&
        (l = r.equals(p, y, o, f, e, t, r) && r.equals(d, w, p, y, e, t, r)) &&
        (n[f] = !0),
        f++;
    }
    if (!l) return !1;
    o++;
  }
  return !0;
}
function vW(e, t, r) {
  var n = yb(e),
    i = n.length;
  if (yb(t).length !== i) return !1;
  for (var o; i-- > 0; )
    if (
      ((o = n[i]),
      (o === UP && (e.$$typeof || t.$$typeof) && e.$$typeof !== t.$$typeof) ||
        !zP(t, o) ||
        !r.equals(e[o], t[o], o, o, e, t, r))
    )
      return !1;
  return !0;
}
function ha(e, t, r) {
  var n = vb(e),
    i = n.length;
  if (vb(t).length !== i) return !1;
  for (var o, a, u; i-- > 0; )
    if (
      ((o = n[i]),
      (o === UP && (e.$$typeof || t.$$typeof) && e.$$typeof !== t.$$typeof) ||
        !zP(t, o) ||
        !r.equals(e[o], t[o], o, o, e, t, r) ||
        ((a = mb(e, o)),
        (u = mb(t, o)),
        (a || u) &&
          (!a ||
            !u ||
            a.configurable !== u.configurable ||
            a.enumerable !== u.enumerable ||
            a.writable !== u.writable)))
    )
      return !1;
  return !0;
}
function mW(e, t) {
  return Yo(e.valueOf(), t.valueOf());
}
function yW(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function bb(e, t, r) {
  if (e.size !== t.size) return !1;
  for (var n = {}, i = e.values(), o, a; (o = i.next()) && !o.done; ) {
    for (var u = t.values(), s = !1, l = 0; (a = u.next()) && !a.done; )
      !s &&
        !n[l] &&
        (s = r.equals(o.value, a.value, o.value, a.value, e, t, r)) &&
        (n[l] = !0),
        l++;
    if (!s) return !1;
  }
  return !0;
}
function gW(e, t) {
  var r = e.length;
  if (t.length !== r) return !1;
  for (; r-- > 0; ) if (e[r] !== t[r]) return !1;
  return !0;
}
var bW = "[object Arguments]",
  wW = "[object Boolean]",
  xW = "[object Date]",
  SW = "[object Map]",
  OW = "[object Number]",
  _W = "[object Object]",
  PW = "[object RegExp]",
  AW = "[object Set]",
  EW = "[object String]",
  IW = Array.isArray,
  wb =
    typeof ArrayBuffer == "function" && ArrayBuffer.isView
      ? ArrayBuffer.isView
      : null,
  xb = Object.assign,
  TW = Object.prototype.toString.call.bind(Object.prototype.toString);
function $W(e) {
  var t = e.areArraysEqual,
    r = e.areDatesEqual,
    n = e.areMapsEqual,
    i = e.areObjectsEqual,
    o = e.arePrimitiveWrappersEqual,
    a = e.areRegExpsEqual,
    u = e.areSetsEqual,
    s = e.areTypedArraysEqual;
  return function (f, c, p) {
    if (f === c) return !0;
    if (f == null || c == null || typeof f != "object" || typeof c != "object")
      return f !== f && c !== c;
    var d = f.constructor;
    if (d !== c.constructor) return !1;
    if (d === Object) return i(f, c, p);
    if (IW(f)) return t(f, c, p);
    if (wb != null && wb(f)) return s(f, c, p);
    if (d === Date) return r(f, c, p);
    if (d === RegExp) return a(f, c, p);
    if (d === Map) return n(f, c, p);
    if (d === Set) return u(f, c, p);
    var h = TW(f);
    return h === xW
      ? r(f, c, p)
      : h === PW
        ? a(f, c, p)
        : h === SW
          ? n(f, c, p)
          : h === AW
            ? u(f, c, p)
            : h === _W
              ? typeof f.then != "function" &&
                typeof c.then != "function" &&
                i(f, c, p)
              : h === bW
                ? i(f, c, p)
                : h === wW || h === OW || h === EW
                  ? o(f, c, p)
                  : !1;
  };
}
function CW(e) {
  var t = e.circular,
    r = e.createCustomConfig,
    n = e.strict,
    i = {
      areArraysEqual: n ? ha : dW,
      areDatesEqual: hW,
      areMapsEqual: n ? hb(gb, ha) : gb,
      areObjectsEqual: n ? ha : vW,
      arePrimitiveWrappersEqual: mW,
      areRegExpsEqual: yW,
      areSetsEqual: n ? hb(bb, ha) : bb,
      areTypedArraysEqual: n ? ha : gW,
    };
  if ((r && (i = xb({}, i, r(i))), t)) {
    var o = Ps(i.areArraysEqual),
      a = Ps(i.areMapsEqual),
      u = Ps(i.areObjectsEqual),
      s = Ps(i.areSetsEqual);
    i = xb({}, i, {
      areArraysEqual: o,
      areMapsEqual: a,
      areObjectsEqual: u,
      areSetsEqual: s,
    });
  }
  return i;
}
function kW(e) {
  return function (t, r, n, i, o, a, u) {
    return e(t, r, u);
  };
}
function jW(e) {
  var t = e.circular,
    r = e.comparator,
    n = e.createState,
    i = e.equals,
    o = e.strict;
  if (n)
    return function (s, l) {
      var f = n(),
        c = f.cache,
        p = c === void 0 ? (t ? new WeakMap() : void 0) : c,
        d = f.meta;
      return r(s, l, { cache: p, equals: i, meta: d, strict: o });
    };
  if (t)
    return function (s, l) {
      return r(s, l, {
        cache: new WeakMap(),
        equals: i,
        meta: void 0,
        strict: o,
      });
    };
  var a = { cache: void 0, equals: i, meta: void 0, strict: o };
  return function (s, l) {
    return r(s, l, a);
  };
}
var MW = Bn();
Bn({ strict: !0 });
Bn({ circular: !0 });
Bn({ circular: !0, strict: !0 });
Bn({
  createInternalComparator: function () {
    return Yo;
  },
});
Bn({
  strict: !0,
  createInternalComparator: function () {
    return Yo;
  },
});
Bn({
  circular: !0,
  createInternalComparator: function () {
    return Yo;
  },
});
Bn({
  circular: !0,
  createInternalComparator: function () {
    return Yo;
  },
  strict: !0,
});
function Bn(e) {
  e === void 0 && (e = {});
  var t = e.circular,
    r = t === void 0 ? !1 : t,
    n = e.createInternalComparator,
    i = e.createState,
    o = e.strict,
    a = o === void 0 ? !1 : o,
    u = CW(e),
    s = $W(u),
    l = n ? n(s) : kW(s);
  return jW({
    circular: r,
    comparator: s,
    createState: i,
    equals: l,
    strict: a,
  });
}
function NW(e) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(e);
}
function Sb(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    r = -1,
    n = function i(o) {
      r < 0 && (r = o), o - r > t ? (e(o), (r = -1)) : NW(i);
    };
  requestAnimationFrame(n);
}
function xh(e) {
  "@babel/helpers - typeof";
  return (
    (xh =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    xh(e)
  );
}
function DW(e) {
  return BW(e) || FW(e) || RW(e) || LW();
}
function LW() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function RW(e, t) {
  if (e) {
    if (typeof e == "string") return Ob(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Ob(e, t);
  }
}
function Ob(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function FW(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function BW(e) {
  if (Array.isArray(e)) return e;
}
function zW() {
  var e = {},
    t = function () {
      return null;
    },
    r = !1,
    n = function i(o) {
      if (!r) {
        if (Array.isArray(o)) {
          if (!o.length) return;
          var a = o,
            u = DW(a),
            s = u[0],
            l = u.slice(1);
          if (typeof s == "number") {
            Sb(i.bind(null, l), s);
            return;
          }
          i(s), Sb(i.bind(null, l));
          return;
        }
        xh(o) === "object" && ((e = o), t(e)), typeof o == "function" && o();
      }
    };
  return {
    stop: function () {
      r = !0;
    },
    start: function (o) {
      (r = !1), n(o);
    },
    subscribe: function (o) {
      return (
        (t = o),
        function () {
          t = function () {
            return null;
          };
        }
      );
    },
  };
}
function Su(e) {
  "@babel/helpers - typeof";
  return (
    (Su =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Su(e)
  );
}
function _b(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function Pb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? _b(Object(r), !0).forEach(function (n) {
          WP(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : _b(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function WP(e, t, r) {
  return (
    (t = UW(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function UW(e) {
  var t = WW(e, "string");
  return Su(t) === "symbol" ? t : String(t);
}
function WW(e, t) {
  if (Su(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Su(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var HW = function (t, r) {
    return [Object.keys(t), Object.keys(r)].reduce(function (n, i) {
      return n.filter(function (o) {
        return i.includes(o);
      });
    });
  },
  GW = function (t) {
    return t;
  },
  VW = function (t) {
    return t.replace(/([A-Z])/g, function (r) {
      return "-".concat(r.toLowerCase());
    });
  },
  Na = function (t, r) {
    return Object.keys(r).reduce(function (n, i) {
      return Pb(Pb({}, n), {}, WP({}, i, t(i, r[i])));
    }, {});
  },
  Ab = function (t, r, n) {
    return t
      .map(function (i) {
        return "".concat(VW(i), " ").concat(r, "ms ").concat(n);
      })
      .join(",");
  };
function qW(e, t) {
  return YW(e) || XW(e, t) || HP(e, t) || KW();
}
function KW() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function XW(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (r != null) {
    var n,
      i,
      o,
      a,
      u = [],
      s = !0,
      l = !1;
    try {
      if (((o = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t);
          s = !0
        );
    } catch (f) {
      (l = !0), (i = f);
    } finally {
      try {
        if (!s && r.return != null && ((a = r.return()), Object(a) !== a))
          return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function YW(e) {
  if (Array.isArray(e)) return e;
}
function QW(e) {
  return eH(e) || JW(e) || HP(e) || ZW();
}
function ZW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function HP(e, t) {
  if (e) {
    if (typeof e == "string") return Sh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Sh(e, t);
  }
}
function JW(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function eH(e) {
  if (Array.isArray(e)) return Sh(e);
}
function Sh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var Kl = 1e-4,
  GP = function (t, r) {
    return [0, 3 * t, 3 * r - 6 * t, 3 * t - 3 * r + 1];
  },
  VP = function (t, r) {
    return t
      .map(function (n, i) {
        return n * Math.pow(r, i);
      })
      .reduce(function (n, i) {
        return n + i;
      });
  },
  Eb = function (t, r) {
    return function (n) {
      var i = GP(t, r);
      return VP(i, n);
    };
  },
  tH = function (t, r) {
    return function (n) {
      var i = GP(t, r),
        o = [].concat(
          QW(
            i
              .map(function (a, u) {
                return a * u;
              })
              .slice(1)
          ),
          [0]
        );
      return VP(o, n);
    };
  },
  Ib = function () {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
      r[n] = arguments[n];
    var i = r[0],
      o = r[1],
      a = r[2],
      u = r[3];
    if (r.length === 1)
      switch (r[0]) {
        case "linear":
          (i = 0), (o = 0), (a = 1), (u = 1);
          break;
        case "ease":
          (i = 0.25), (o = 0.1), (a = 0.25), (u = 1);
          break;
        case "ease-in":
          (i = 0.42), (o = 0), (a = 1), (u = 1);
          break;
        case "ease-out":
          (i = 0.42), (o = 0), (a = 0.58), (u = 1);
          break;
        case "ease-in-out":
          (i = 0), (o = 0), (a = 0.58), (u = 1);
          break;
        default: {
          var s = r[0].split("(");
          if (
            s[0] === "cubic-bezier" &&
            s[1].split(")")[0].split(",").length === 4
          ) {
            var l = s[1]
                .split(")")[0]
                .split(",")
                .map(function (w) {
                  return parseFloat(w);
                }),
              f = qW(l, 4);
            (i = f[0]), (o = f[1]), (a = f[2]), (u = f[3]);
          }
        }
      }
    var c = Eb(i, a),
      p = Eb(o, u),
      d = tH(i, a),
      h = function (m) {
        return m > 1 ? 1 : m < 0 ? 0 : m;
      },
      y = function (m) {
        for (var v = m > 1 ? 1 : m, g = v, S = 0; S < 8; ++S) {
          var b = c(g) - v,
            x = d(g);
          if (Math.abs(b - v) < Kl || x < Kl) return p(g);
          g = h(g - b / x);
        }
        return p(g);
      };
    return (y.isStepper = !1), y;
  },
  rH = function () {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      r = t.stiff,
      n = r === void 0 ? 100 : r,
      i = t.damping,
      o = i === void 0 ? 8 : i,
      a = t.dt,
      u = a === void 0 ? 17 : a,
      s = function (f, c, p) {
        var d = -(f - c) * n,
          h = p * o,
          y = p + ((d - h) * u) / 1e3,
          w = (p * u) / 1e3 + f;
        return Math.abs(w - c) < Kl && Math.abs(y) < Kl ? [c, 0] : [w, y];
      };
    return (s.isStepper = !0), (s.dt = u), s;
  },
  nH = function () {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
      r[n] = arguments[n];
    var i = r[0];
    if (typeof i == "string")
      switch (i) {
        case "ease":
        case "ease-in-out":
        case "ease-out":
        case "ease-in":
        case "linear":
          return Ib(i);
        case "spring":
          return rH();
        default:
          if (i.split("(")[0] === "cubic-bezier") return Ib(i);
      }
    return typeof i == "function" ? i : null;
  };
function Ou(e) {
  "@babel/helpers - typeof";
  return (
    (Ou =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Ou(e)
  );
}
function Tb(e) {
  return aH(e) || oH(e) || qP(e) || iH();
}
function iH() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function oH(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function aH(e) {
  if (Array.isArray(e)) return _h(e);
}
function $b(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function Qe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? $b(Object(r), !0).forEach(function (n) {
          Oh(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : $b(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function Oh(e, t, r) {
  return (
    (t = uH(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function uH(e) {
  var t = sH(e, "string");
  return Ou(t) === "symbol" ? t : String(t);
}
function sH(e, t) {
  if (Ou(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ou(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function lH(e, t) {
  return pH(e) || fH(e, t) || qP(e, t) || cH();
}
function cH() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function qP(e, t) {
  if (e) {
    if (typeof e == "string") return _h(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return _h(e, t);
  }
}
function _h(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function fH(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (r != null) {
    var n,
      i,
      o,
      a,
      u = [],
      s = !0,
      l = !1;
    try {
      if (((o = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t);
          s = !0
        );
    } catch (f) {
      (l = !0), (i = f);
    } finally {
      try {
        if (!s && r.return != null && ((a = r.return()), Object(a) !== a))
          return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function pH(e) {
  if (Array.isArray(e)) return e;
}
var Xl = function (t, r, n) {
    return t + (r - t) * n;
  },
  Ph = function (t) {
    var r = t.from,
      n = t.to;
    return r !== n;
  },
  dH = function e(t, r, n) {
    var i = Na(function (o, a) {
      if (Ph(a)) {
        var u = t(a.from, a.to, a.velocity),
          s = lH(u, 2),
          l = s[0],
          f = s[1];
        return Qe(Qe({}, a), {}, { from: l, velocity: f });
      }
      return a;
    }, r);
    return n < 1
      ? Na(function (o, a) {
          return Ph(a)
            ? Qe(
                Qe({}, a),
                {},
                {
                  velocity: Xl(a.velocity, i[o].velocity, n),
                  from: Xl(a.from, i[o].from, n),
                }
              )
            : a;
        }, r)
      : e(t, i, n - 1);
  };
const hH = function (e, t, r, n, i) {
  var o = HW(e, t),
    a = o.reduce(function (w, m) {
      return Qe(Qe({}, w), {}, Oh({}, m, [e[m], t[m]]));
    }, {}),
    u = o.reduce(function (w, m) {
      return Qe(
        Qe({}, w),
        {},
        Oh({}, m, { from: e[m], velocity: 0, to: t[m] })
      );
    }, {}),
    s = -1,
    l,
    f,
    c = function () {
      return null;
    },
    p = function () {
      return Na(function (m, v) {
        return v.from;
      }, u);
    },
    d = function () {
      return !Object.values(u).filter(Ph).length;
    },
    h = function (m) {
      l || (l = m);
      var v = m - l,
        g = v / r.dt;
      (u = dH(r, u, g)),
        i(Qe(Qe(Qe({}, e), t), p())),
        (l = m),
        d() || (s = requestAnimationFrame(c));
    },
    y = function (m) {
      f || (f = m);
      var v = (m - f) / n,
        g = Na(function (b, x) {
          return Xl.apply(void 0, Tb(x).concat([r(v)]));
        }, a);
      if ((i(Qe(Qe(Qe({}, e), t), g)), v < 1)) s = requestAnimationFrame(c);
      else {
        var S = Na(function (b, x) {
          return Xl.apply(void 0, Tb(x).concat([r(1)]));
        }, a);
        i(Qe(Qe(Qe({}, e), t), S));
      }
    };
  return (
    (c = r.isStepper ? h : y),
    function () {
      return (
        requestAnimationFrame(c),
        function () {
          cancelAnimationFrame(s);
        }
      );
    }
  );
};
function Oo(e) {
  "@babel/helpers - typeof";
  return (
    (Oo =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Oo(e)
  );
}
var vH = [
  "children",
  "begin",
  "duration",
  "attributeName",
  "easing",
  "isActive",
  "steps",
  "from",
  "to",
  "canBegin",
  "onAnimationEnd",
  "shouldReAnimate",
  "onAnimationReStart",
];
function mH(e, t) {
  if (e == null) return {};
  var r = yH(e, t),
    n,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (n = o[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n]);
  }
  return r;
}
function yH(e, t) {
  if (e == null) return {};
  var r = {},
    n = Object.keys(e),
    i,
    o;
  for (o = 0; o < n.length; o++)
    (i = n[o]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
  return r;
}
function Sp(e) {
  return xH(e) || wH(e) || bH(e) || gH();
}
function gH() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function bH(e, t) {
  if (e) {
    if (typeof e == "string") return Ah(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Ah(e, t);
  }
}
function wH(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function xH(e) {
  if (Array.isArray(e)) return Ah(e);
}
function Ah(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Cb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function fr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Cb(Object(r), !0).forEach(function (n) {
          Sa(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Cb(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function Sa(e, t, r) {
  return (
    (t = KP(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function SH(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function OH(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, KP(n.key), n);
  }
}
function _H(e, t, r) {
  return (
    t && OH(e.prototype, t),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function KP(e) {
  var t = PH(e, "string");
  return Oo(t) === "symbol" ? t : String(t);
}
function PH(e, t) {
  if (Oo(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Oo(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function AH(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && Eh(e, t);
}
function Eh(e, t) {
  return (
    (Eh = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n;
        }),
    Eh(e, t)
  );
}
function EH(e) {
  var t = IH();
  return function () {
    var n = Yl(e),
      i;
    if (t) {
      var o = Yl(this).constructor;
      i = Reflect.construct(n, arguments, o);
    } else i = n.apply(this, arguments);
    return Ih(this, i);
  };
}
function Ih(e, t) {
  if (t && (Oo(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return Th(e);
}
function Th(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function IH() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return (
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      ),
      !0
    );
  } catch {
    return !1;
  }
}
function Yl(e) {
  return (
    (Yl = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }),
    Yl(e)
  );
}
var Cn = (function (e) {
  AH(r, e);
  var t = EH(r);
  function r(n, i) {
    var o;
    SH(this, r), (o = t.call(this, n, i));
    var a = o.props,
      u = a.isActive,
      s = a.attributeName,
      l = a.from,
      f = a.to,
      c = a.steps,
      p = a.children,
      d = a.duration;
    if (
      ((o.handleStyleChange = o.handleStyleChange.bind(Th(o))),
      (o.changeStyle = o.changeStyle.bind(Th(o))),
      !u || d <= 0)
    )
      return (
        (o.state = { style: {} }),
        typeof p == "function" && (o.state = { style: f }),
        Ih(o)
      );
    if (c && c.length) o.state = { style: c[0].style };
    else if (l) {
      if (typeof p == "function") return (o.state = { style: l }), Ih(o);
      o.state = { style: s ? Sa({}, s, l) : l };
    } else o.state = { style: {} };
    return o;
  }
  return (
    _H(r, [
      {
        key: "componentDidMount",
        value: function () {
          var i = this.props,
            o = i.isActive,
            a = i.canBegin;
          (this.mounted = !0), !(!o || !a) && this.runAnimation(this.props);
        },
      },
      {
        key: "componentDidUpdate",
        value: function (i) {
          var o = this.props,
            a = o.isActive,
            u = o.canBegin,
            s = o.attributeName,
            l = o.shouldReAnimate,
            f = o.to,
            c = o.from,
            p = this.state.style;
          if (u) {
            if (!a) {
              var d = { style: s ? Sa({}, s, f) : f };
              this.state &&
                p &&
                ((s && p[s] !== f) || (!s && p !== f)) &&
                this.setState(d);
              return;
            }
            if (!(MW(i.to, f) && i.canBegin && i.isActive)) {
              var h = !i.canBegin || !i.isActive;
              this.manager && this.manager.stop(),
                this.stopJSAnimation && this.stopJSAnimation();
              var y = h || l ? c : i.to;
              if (this.state && p) {
                var w = { style: s ? Sa({}, s, y) : y };
                ((s && p[s] !== y) || (!s && p !== y)) && this.setState(w);
              }
              this.runAnimation(
                fr(fr({}, this.props), {}, { from: y, begin: 0 })
              );
            }
          }
        },
      },
      {
        key: "componentWillUnmount",
        value: function () {
          this.mounted = !1;
          var i = this.props.onAnimationEnd;
          this.unSubscribe && this.unSubscribe(),
            this.manager && (this.manager.stop(), (this.manager = null)),
            this.stopJSAnimation && this.stopJSAnimation(),
            i && i();
        },
      },
      {
        key: "handleStyleChange",
        value: function (i) {
          this.changeStyle(i);
        },
      },
      {
        key: "changeStyle",
        value: function (i) {
          this.mounted && this.setState({ style: i });
        },
      },
      {
        key: "runJSAnimation",
        value: function (i) {
          var o = this,
            a = i.from,
            u = i.to,
            s = i.duration,
            l = i.easing,
            f = i.begin,
            c = i.onAnimationEnd,
            p = i.onAnimationStart,
            d = hH(a, u, nH(l), s, this.changeStyle),
            h = function () {
              o.stopJSAnimation = d();
            };
          this.manager.start([p, f, h, s, c]);
        },
      },
      {
        key: "runStepAnimation",
        value: function (i) {
          var o = this,
            a = i.steps,
            u = i.begin,
            s = i.onAnimationStart,
            l = a[0],
            f = l.style,
            c = l.duration,
            p = c === void 0 ? 0 : c,
            d = function (y, w, m) {
              if (m === 0) return y;
              var v = w.duration,
                g = w.easing,
                S = g === void 0 ? "ease" : g,
                b = w.style,
                x = w.properties,
                O = w.onAnimationEnd,
                _ = m > 0 ? a[m - 1] : w,
                P = x || Object.keys(b);
              if (typeof S == "function" || S === "spring")
                return [].concat(Sp(y), [
                  o.runJSAnimation.bind(o, {
                    from: _.style,
                    to: b,
                    duration: v,
                    easing: S,
                  }),
                  v,
                ]);
              var I = Ab(P, v, S),
                E = fr(fr(fr({}, _.style), b), {}, { transition: I });
              return [].concat(Sp(y), [E, v, O]).filter(GW);
            };
          return this.manager.start(
            [s].concat(Sp(a.reduce(d, [f, Math.max(p, u)])), [i.onAnimationEnd])
          );
        },
      },
      {
        key: "runAnimation",
        value: function (i) {
          this.manager || (this.manager = zW());
          var o = i.begin,
            a = i.duration,
            u = i.attributeName,
            s = i.to,
            l = i.easing,
            f = i.onAnimationStart,
            c = i.onAnimationEnd,
            p = i.steps,
            d = i.children,
            h = this.manager;
          if (
            ((this.unSubscribe = h.subscribe(this.handleStyleChange)),
            typeof l == "function" || typeof d == "function" || l === "spring")
          ) {
            this.runJSAnimation(i);
            return;
          }
          if (p.length > 1) {
            this.runStepAnimation(i);
            return;
          }
          var y = u ? Sa({}, u, s) : s,
            w = Ab(Object.keys(y), a, l);
          h.start([f, o, fr(fr({}, y), {}, { transition: w }), a, c]);
        },
      },
      {
        key: "render",
        value: function () {
          var i = this.props,
            o = i.children;
          i.begin;
          var a = i.duration;
          i.attributeName, i.easing;
          var u = i.isActive;
          i.steps,
            i.from,
            i.to,
            i.canBegin,
            i.onAnimationEnd,
            i.shouldReAnimate,
            i.onAnimationReStart;
          var s = mH(i, vH),
            l = z.Children.count(o),
            f = this.state.style;
          if (typeof o == "function") return o(f);
          if (!u || l === 0 || a <= 0) return o;
          var c = function (d) {
            var h = d.props,
              y = h.style,
              w = y === void 0 ? {} : y,
              m = h.className,
              v = z.cloneElement(
                d,
                fr(fr({}, s), {}, { style: fr(fr({}, w), f), className: m })
              );
            return v;
          };
          return l === 1
            ? c(z.Children.only(o))
            : A.createElement(
                "div",
                null,
                z.Children.map(o, function (p) {
                  return c(p);
                })
              );
        },
      },
    ]),
    r
  );
})(z.PureComponent);
Cn.displayName = "Animate";
Cn.defaultProps = {
  begin: 0,
  duration: 1e3,
  from: "",
  to: "",
  attributeName: "",
  easing: "ease",
  isActive: !0,
  canBegin: !0,
  steps: [],
  onAnimationEnd: function () {},
  onAnimationStart: function () {},
};
Cn.propTypes = {
  from: Z.oneOfType([Z.object, Z.string]),
  to: Z.oneOfType([Z.object, Z.string]),
  attributeName: Z.string,
  duration: Z.number,
  begin: Z.number,
  easing: Z.oneOfType([Z.string, Z.func]),
  steps: Z.arrayOf(
    Z.shape({
      duration: Z.number.isRequired,
      style: Z.object.isRequired,
      easing: Z.oneOfType([
        Z.oneOf(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]),
        Z.func,
      ]),
      properties: Z.arrayOf("string"),
      onAnimationEnd: Z.func,
    })
  ),
  children: Z.oneOfType([Z.node, Z.func]),
  isActive: Z.bool,
  canBegin: Z.bool,
  onAnimationEnd: Z.func,
  shouldReAnimate: Z.bool,
  onAnimationStart: Z.func,
  onAnimationReStart: Z.func,
};
Z.object, Z.object, Z.object, Z.element;
Z.object, Z.object, Z.object, Z.oneOfType([Z.array, Z.element]), Z.any;
function _u(e) {
  "@babel/helpers - typeof";
  return (
    (_u =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    _u(e)
  );
}
function Ql() {
  return (
    (Ql = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Ql.apply(this, arguments)
  );
}
function TH(e, t) {
  return jH(e) || kH(e, t) || CH(e, t) || $H();
}
function $H() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function CH(e, t) {
  if (e) {
    if (typeof e == "string") return kb(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return kb(e, t);
  }
}
function kb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function kH(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (r != null) {
    var n,
      i,
      o,
      a,
      u = [],
      s = !0,
      l = !1;
    try {
      if (((o = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t);
          s = !0
        );
    } catch (f) {
      (l = !0), (i = f);
    } finally {
      try {
        if (!s && r.return != null && ((a = r.return()), Object(a) !== a))
          return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function jH(e) {
  if (Array.isArray(e)) return e;
}
function jb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function Mb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? jb(Object(r), !0).forEach(function (n) {
          MH(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : jb(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function MH(e, t, r) {
  return (
    (t = NH(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function NH(e) {
  var t = DH(e, "string");
  return _u(t) == "symbol" ? t : t + "";
}
function DH(e, t) {
  if (_u(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (_u(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Nb = function (t, r, n, i, o) {
    var a = Math.min(Math.abs(n) / 2, Math.abs(i) / 2),
      u = i >= 0 ? 1 : -1,
      s = n >= 0 ? 1 : -1,
      l = (i >= 0 && n >= 0) || (i < 0 && n < 0) ? 1 : 0,
      f;
    if (a > 0 && o instanceof Array) {
      for (var c = [0, 0, 0, 0], p = 0, d = 4; p < d; p++)
        c[p] = o[p] > a ? a : o[p];
      (f = "M".concat(t, ",").concat(r + u * c[0])),
        c[0] > 0 &&
          (f += "A "
            .concat(c[0], ",")
            .concat(c[0], ",0,0,")
            .concat(l, ",")
            .concat(t + s * c[0], ",")
            .concat(r)),
        (f += "L ".concat(t + n - s * c[1], ",").concat(r)),
        c[1] > 0 &&
          (f += "A "
            .concat(c[1], ",")
            .concat(c[1], ",0,0,")
            .concat(
              l,
              `,
        `
            )
            .concat(t + n, ",")
            .concat(r + u * c[1])),
        (f += "L ".concat(t + n, ",").concat(r + i - u * c[2])),
        c[2] > 0 &&
          (f += "A "
            .concat(c[2], ",")
            .concat(c[2], ",0,0,")
            .concat(
              l,
              `,
        `
            )
            .concat(t + n - s * c[2], ",")
            .concat(r + i)),
        (f += "L ".concat(t + s * c[3], ",").concat(r + i)),
        c[3] > 0 &&
          (f += "A "
            .concat(c[3], ",")
            .concat(c[3], ",0,0,")
            .concat(
              l,
              `,
        `
            )
            .concat(t, ",")
            .concat(r + i - u * c[3])),
        (f += "Z");
    } else if (a > 0 && o === +o && o > 0) {
      var h = Math.min(a, o);
      f = "M "
        .concat(t, ",")
        .concat(
          r + u * h,
          `
            A `
        )
        .concat(h, ",")
        .concat(h, ",0,0,")
        .concat(l, ",")
        .concat(t + s * h, ",")
        .concat(
          r,
          `
            L `
        )
        .concat(t + n - s * h, ",")
        .concat(
          r,
          `
            A `
        )
        .concat(h, ",")
        .concat(h, ",0,0,")
        .concat(l, ",")
        .concat(t + n, ",")
        .concat(
          r + u * h,
          `
            L `
        )
        .concat(t + n, ",")
        .concat(
          r + i - u * h,
          `
            A `
        )
        .concat(h, ",")
        .concat(h, ",0,0,")
        .concat(l, ",")
        .concat(t + n - s * h, ",")
        .concat(
          r + i,
          `
            L `
        )
        .concat(t + s * h, ",")
        .concat(
          r + i,
          `
            A `
        )
        .concat(h, ",")
        .concat(h, ",0,0,")
        .concat(l, ",")
        .concat(t, ",")
        .concat(r + i - u * h, " Z");
    } else
      f = "M "
        .concat(t, ",")
        .concat(r, " h ")
        .concat(n, " v ")
        .concat(i, " h ")
        .concat(-n, " Z");
    return f;
  },
  LH = function (t, r) {
    if (!t || !r) return !1;
    var n = t.x,
      i = t.y,
      o = r.x,
      a = r.y,
      u = r.width,
      s = r.height;
    if (Math.abs(u) > 0 && Math.abs(s) > 0) {
      var l = Math.min(o, o + u),
        f = Math.max(o, o + u),
        c = Math.min(a, a + s),
        p = Math.max(a, a + s);
      return n >= l && n <= f && i >= c && i <= p;
    }
    return !1;
  },
  RH = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    radius: 0,
    isAnimationActive: !1,
    isUpdateAnimationActive: !1,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: "ease",
  },
  Zm = function (t) {
    var r = Mb(Mb({}, RH), t),
      n = z.useRef(),
      i = z.useState(-1),
      o = TH(i, 2),
      a = o[0],
      u = o[1];
    z.useEffect(function () {
      if (n.current && n.current.getTotalLength)
        try {
          var S = n.current.getTotalLength();
          S && u(S);
        } catch {}
    }, []);
    var s = r.x,
      l = r.y,
      f = r.width,
      c = r.height,
      p = r.radius,
      d = r.className,
      h = r.animationEasing,
      y = r.animationDuration,
      w = r.animationBegin,
      m = r.isAnimationActive,
      v = r.isUpdateAnimationActive;
    if (s !== +s || l !== +l || f !== +f || c !== +c || f === 0 || c === 0)
      return null;
    var g = se("recharts-rectangle", d);
    return v
      ? A.createElement(
          Cn,
          {
            canBegin: a > 0,
            from: { width: f, height: c, x: s, y: l },
            to: { width: f, height: c, x: s, y: l },
            duration: y,
            animationEasing: h,
            isActive: v,
          },
          function (S) {
            var b = S.width,
              x = S.height,
              O = S.x,
              _ = S.y;
            return A.createElement(
              Cn,
              {
                canBegin: a > 0,
                from: "0px ".concat(a === -1 ? 1 : a, "px"),
                to: "".concat(a, "px 0px"),
                attributeName: "strokeDasharray",
                begin: w,
                duration: y,
                isActive: m,
                easing: h,
              },
              A.createElement(
                "path",
                Ql({}, ae(r, !0), {
                  className: g,
                  d: Nb(O, _, b, x, p),
                  ref: n,
                })
              )
            );
          }
        )
      : A.createElement(
          "path",
          Ql({}, ae(r, !0), { className: g, d: Nb(s, l, f, c, p) })
        );
  };
function $h() {
  return (
    ($h = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    $h.apply(this, arguments)
  );
}
var XP = function (t) {
  var r = t.cx,
    n = t.cy,
    i = t.r,
    o = t.className,
    a = se("recharts-dot", o);
  return r === +r && n === +n && i === +i
    ? A.createElement(
        "circle",
        $h({}, ae(t, !1), ml(t), { className: a, cx: r, cy: n, r: i })
      )
    : null;
};
function Pu(e) {
  "@babel/helpers - typeof";
  return (
    (Pu =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Pu(e)
  );
}
var FH = ["x", "y", "top", "left", "width", "height", "className"];
function Ch() {
  return (
    (Ch = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Ch.apply(this, arguments)
  );
}
function Db(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function BH(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Db(Object(r), !0).forEach(function (n) {
          zH(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Db(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function zH(e, t, r) {
  return (
    (t = UH(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function UH(e) {
  var t = WH(e, "string");
  return Pu(t) == "symbol" ? t : t + "";
}
function WH(e, t) {
  if (Pu(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Pu(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function HH(e, t) {
  if (e == null) return {};
  var r = GH(e, t),
    n,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (n = o[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n]);
  }
  return r;
}
function GH(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var VH = function (t, r, n, i, o, a) {
    return "M"
      .concat(t, ",")
      .concat(o, "v")
      .concat(i, "M")
      .concat(a, ",")
      .concat(r, "h")
      .concat(n);
  },
  qH = function (t) {
    var r = t.x,
      n = r === void 0 ? 0 : r,
      i = t.y,
      o = i === void 0 ? 0 : i,
      a = t.top,
      u = a === void 0 ? 0 : a,
      s = t.left,
      l = s === void 0 ? 0 : s,
      f = t.width,
      c = f === void 0 ? 0 : f,
      p = t.height,
      d = p === void 0 ? 0 : p,
      h = t.className,
      y = HH(t, FH),
      w = BH({ x: n, y: o, top: u, left: l, width: c, height: d }, y);
    return !W(n) || !W(o) || !W(c) || !W(d) || !W(u) || !W(l)
      ? null
      : A.createElement(
          "path",
          Ch({}, ae(w, !0), {
            className: se("recharts-cross", h),
            d: VH(n, o, c, d, u, l),
          })
        );
  },
  KH = u_,
  XH = KH(Object.getPrototypeOf, Object),
  YH = XH,
  QH = nn,
  ZH = YH,
  JH = on,
  eG = "[object Object]",
  tG = Function.prototype,
  rG = Object.prototype,
  YP = tG.toString,
  nG = rG.hasOwnProperty,
  iG = YP.call(Object);
function oG(e) {
  if (!JH(e) || QH(e) != eG) return !1;
  var t = ZH(e);
  if (t === null) return !0;
  var r = nG.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && YP.call(r) == iG;
}
var aG = oG;
const uG = he(aG);
var sG = nn,
  lG = on,
  cG = "[object Boolean]";
function fG(e) {
  return e === !0 || e === !1 || (lG(e) && sG(e) == cG);
}
var pG = fG;
const dG = he(pG);
function Au(e) {
  "@babel/helpers - typeof";
  return (
    (Au =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Au(e)
  );
}
function Zl() {
  return (
    (Zl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Zl.apply(this, arguments)
  );
}
function hG(e, t) {
  return gG(e) || yG(e, t) || mG(e, t) || vG();
}
function vG() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function mG(e, t) {
  if (e) {
    if (typeof e == "string") return Lb(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Lb(e, t);
  }
}
function Lb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function yG(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (r != null) {
    var n,
      i,
      o,
      a,
      u = [],
      s = !0,
      l = !1;
    try {
      if (((o = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t);
          s = !0
        );
    } catch (f) {
      (l = !0), (i = f);
    } finally {
      try {
        if (!s && r.return != null && ((a = r.return()), Object(a) !== a))
          return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function gG(e) {
  if (Array.isArray(e)) return e;
}
function Rb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function Fb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Rb(Object(r), !0).forEach(function (n) {
          bG(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Rb(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function bG(e, t, r) {
  return (
    (t = wG(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function wG(e) {
  var t = xG(e, "string");
  return Au(t) == "symbol" ? t : t + "";
}
function xG(e, t) {
  if (Au(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Au(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Bb = function (t, r, n, i, o) {
    var a = n - i,
      u;
    return (
      (u = "M ".concat(t, ",").concat(r)),
      (u += "L ".concat(t + n, ",").concat(r)),
      (u += "L ".concat(t + n - a / 2, ",").concat(r + o)),
      (u += "L ".concat(t + n - a / 2 - i, ",").concat(r + o)),
      (u += "L ".concat(t, ",").concat(r, " Z")),
      u
    );
  },
  SG = {
    x: 0,
    y: 0,
    upperWidth: 0,
    lowerWidth: 0,
    height: 0,
    isUpdateAnimationActive: !1,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: "ease",
  },
  OG = function (t) {
    var r = Fb(Fb({}, SG), t),
      n = z.useRef(),
      i = z.useState(-1),
      o = hG(i, 2),
      a = o[0],
      u = o[1];
    z.useEffect(function () {
      if (n.current && n.current.getTotalLength)
        try {
          var g = n.current.getTotalLength();
          g && u(g);
        } catch {}
    }, []);
    var s = r.x,
      l = r.y,
      f = r.upperWidth,
      c = r.lowerWidth,
      p = r.height,
      d = r.className,
      h = r.animationEasing,
      y = r.animationDuration,
      w = r.animationBegin,
      m = r.isUpdateAnimationActive;
    if (
      s !== +s ||
      l !== +l ||
      f !== +f ||
      c !== +c ||
      p !== +p ||
      (f === 0 && c === 0) ||
      p === 0
    )
      return null;
    var v = se("recharts-trapezoid", d);
    return m
      ? A.createElement(
          Cn,
          {
            canBegin: a > 0,
            from: { upperWidth: 0, lowerWidth: 0, height: p, x: s, y: l },
            to: { upperWidth: f, lowerWidth: c, height: p, x: s, y: l },
            duration: y,
            animationEasing: h,
            isActive: m,
          },
          function (g) {
            var S = g.upperWidth,
              b = g.lowerWidth,
              x = g.height,
              O = g.x,
              _ = g.y;
            return A.createElement(
              Cn,
              {
                canBegin: a > 0,
                from: "0px ".concat(a === -1 ? 1 : a, "px"),
                to: "".concat(a, "px 0px"),
                attributeName: "strokeDasharray",
                begin: w,
                duration: y,
                easing: h,
              },
              A.createElement(
                "path",
                Zl({}, ae(r, !0), {
                  className: v,
                  d: Bb(O, _, S, b, x),
                  ref: n,
                })
              )
            );
          }
        )
      : A.createElement(
          "g",
          null,
          A.createElement(
            "path",
            Zl({}, ae(r, !0), { className: v, d: Bb(s, l, f, c, p) })
          )
        );
  },
  _G = [
    "option",
    "shapeType",
    "propTransformer",
    "activeClassName",
    "isActive",
  ];
function Eu(e) {
  "@babel/helpers - typeof";
  return (
    (Eu =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Eu(e)
  );
}
function PG(e, t) {
  if (e == null) return {};
  var r = AG(e, t),
    n,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (n = o[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n]);
  }
  return r;
}
function AG(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function zb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function Jl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? zb(Object(r), !0).forEach(function (n) {
          EG(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : zb(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function EG(e, t, r) {
  return (
    (t = IG(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function IG(e) {
  var t = TG(e, "string");
  return Eu(t) == "symbol" ? t : t + "";
}
function TG(e, t) {
  if (Eu(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Eu(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function $G(e, t) {
  return Jl(Jl({}, t), e);
}
function CG(e, t) {
  return e === "symbols";
}
function Ub(e) {
  var t = e.shapeType,
    r = e.elementProps;
  switch (t) {
    case "rectangle":
      return A.createElement(Zm, r);
    case "trapezoid":
      return A.createElement(OG, r);
    case "sector":
      return A.createElement(LP, r);
    case "symbols":
      if (CG(t)) return A.createElement(mm, r);
      break;
    default:
      return null;
  }
}
function kG(e) {
  return z.isValidElement(e) ? e.props : e;
}
function jG(e) {
  var t = e.option,
    r = e.shapeType,
    n = e.propTransformer,
    i = n === void 0 ? $G : n,
    o = e.activeClassName,
    a = o === void 0 ? "recharts-active-shape" : o,
    u = e.isActive,
    s = PG(e, _G),
    l;
  if (z.isValidElement(t)) l = z.cloneElement(t, Jl(Jl({}, s), kG(t)));
  else if (te(t)) l = t(s);
  else if (uG(t) && !dG(t)) {
    var f = i(t, s);
    l = A.createElement(Ub, { shapeType: r, elementProps: f });
  } else {
    var c = s;
    l = A.createElement(Ub, { shapeType: r, elementProps: c });
  }
  return u ? A.createElement(qe, { className: a }, l) : l;
}
function hf(e, t) {
  return t != null && "trapezoids" in e.props;
}
function vf(e, t) {
  return t != null && "sectors" in e.props;
}
function Iu(e, t) {
  return t != null && "points" in e.props;
}
function MG(e, t) {
  var r,
    n,
    i =
      e.x ===
        (t == null || (r = t.labelViewBox) === null || r === void 0
          ? void 0
          : r.x) || e.x === t.x,
    o =
      e.y ===
        (t == null || (n = t.labelViewBox) === null || n === void 0
          ? void 0
          : n.y) || e.y === t.y;
  return i && o;
}
function NG(e, t) {
  var r = e.endAngle === t.endAngle,
    n = e.startAngle === t.startAngle;
  return r && n;
}
function DG(e, t) {
  var r = e.x === t.x,
    n = e.y === t.y,
    i = e.z === t.z;
  return r && n && i;
}
function LG(e, t) {
  var r;
  return hf(e, t) ? (r = MG) : vf(e, t) ? (r = NG) : Iu(e, t) && (r = DG), r;
}
function RG(e, t) {
  var r;
  return (
    hf(e, t)
      ? (r = "trapezoids")
      : vf(e, t)
        ? (r = "sectors")
        : Iu(e, t) && (r = "points"),
    r
  );
}
function FG(e, t) {
  if (hf(e, t)) {
    var r;
    return (r = t.tooltipPayload) === null ||
      r === void 0 ||
      (r = r[0]) === null ||
      r === void 0 ||
      (r = r.payload) === null ||
      r === void 0
      ? void 0
      : r.payload;
  }
  if (vf(e, t)) {
    var n;
    return (n = t.tooltipPayload) === null ||
      n === void 0 ||
      (n = n[0]) === null ||
      n === void 0 ||
      (n = n.payload) === null ||
      n === void 0
      ? void 0
      : n.payload;
  }
  return Iu(e, t) ? t.payload : {};
}
function BG(e) {
  var t = e.activeTooltipItem,
    r = e.graphicalItem,
    n = e.itemData,
    i = RG(r, t),
    o = FG(r, t),
    a = n.filter(function (s, l) {
      var f = Km(o, s),
        c = r.props[i].filter(function (h) {
          var y = LG(r, t);
          return y(h, t);
        }),
        p = r.props[i].indexOf(c[c.length - 1]),
        d = l === p;
      return f && d;
    }),
    u = n.indexOf(a[a.length - 1]);
  return u;
}
var zG = Math.ceil,
  UG = Math.max;
function WG(e, t, r, n) {
  for (var i = -1, o = UG(zG((t - e) / (r || 1)), 0), a = Array(o); o--; )
    (a[n ? o : ++i] = e), (e += r);
  return a;
}
var HG = WG,
  GG = A_,
  Wb = 1 / 0,
  VG = 17976931348623157e292;
function qG(e) {
  if (!e) return e === 0 ? e : 0;
  if (((e = GG(e)), e === Wb || e === -Wb)) {
    var t = e < 0 ? -1 : 1;
    return t * VG;
  }
  return e === e ? e : 0;
}
var QP = qG,
  KG = HG,
  XG = tf,
  Op = QP;
function YG(e) {
  return function (t, r, n) {
    return (
      n && typeof n != "number" && XG(t, r, n) && (r = n = void 0),
      (t = Op(t)),
      r === void 0 ? ((r = t), (t = 0)) : (r = Op(r)),
      (n = n === void 0 ? (t < r ? 1 : -1) : Op(n)),
      KG(t, r, n, e)
    );
  };
}
var QG = YG,
  ZG = QG,
  JG = ZG(),
  eV = JG;
const ec = he(eV);
function Tu(e) {
  "@babel/helpers - typeof";
  return (
    (Tu =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Tu(e)
  );
}
function Hb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function Gb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Hb(Object(r), !0).forEach(function (n) {
          ZP(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Hb(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function ZP(e, t, r) {
  return (
    (t = tV(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function tV(e) {
  var t = rV(e, "string");
  return Tu(t) == "symbol" ? t : t + "";
}
function rV(e, t) {
  if (Tu(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Tu(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var nV = ["Webkit", "Moz", "O", "ms"],
  iV = function (t, r) {
    var n = t.replace(/(\w)/, function (o) {
        return o.toUpperCase();
      }),
      i = nV.reduce(function (o, a) {
        return Gb(Gb({}, o), {}, ZP({}, a + n, r));
      }, {});
    return (i[t] = r), i;
  };
function _o(e) {
  "@babel/helpers - typeof";
  return (
    (_o =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    _o(e)
  );
}
function tc() {
  return (
    (tc = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    tc.apply(this, arguments)
  );
}
function Vb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function _p(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Vb(Object(r), !0).forEach(function (n) {
          Bt(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Vb(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function oV(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function qb(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, eA(n.key), n);
  }
}
function aV(e, t, r) {
  return (
    t && qb(e.prototype, t),
    r && qb(e, r),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function uV(e, t, r) {
  return (
    (t = rc(t)),
    sV(
      e,
      JP() ? Reflect.construct(t, r || [], rc(e).constructor) : t.apply(e, r)
    )
  );
}
function sV(e, t) {
  if (t && (_o(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return lV(e);
}
function lV(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function JP() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch {}
  return (JP = function () {
    return !!e;
  })();
}
function rc(e) {
  return (
    (rc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }),
    rc(e)
  );
}
function cV(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && kh(e, t);
}
function kh(e, t) {
  return (
    (kh = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n;
        }),
    kh(e, t)
  );
}
function Bt(e, t, r) {
  return (
    (t = eA(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function eA(e) {
  var t = fV(e, "string");
  return _o(t) == "symbol" ? t : t + "";
}
function fV(e, t) {
  if (_o(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (_o(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var pV = function (t) {
    var r = t.data,
      n = t.startIndex,
      i = t.endIndex,
      o = t.x,
      a = t.width,
      u = t.travellerWidth;
    if (!r || !r.length) return {};
    var s = r.length,
      l = ja()
        .domain(ec(0, s))
        .range([o, o + a - u]),
      f = l.domain().map(function (c) {
        return l(c);
      });
    return {
      isTextActive: !1,
      isSlideMoving: !1,
      isTravellerMoving: !1,
      isTravellerFocused: !1,
      startX: l(n),
      endX: l(i),
      scale: l,
      scaleValues: f,
    };
  },
  Kb = function (t) {
    return t.changedTouches && !!t.changedTouches.length;
  },
  Po = (function (e) {
    function t(r) {
      var n;
      return (
        oV(this, t),
        (n = uV(this, t, [r])),
        Bt(n, "handleDrag", function (i) {
          n.leaveTimer && (clearTimeout(n.leaveTimer), (n.leaveTimer = null)),
            n.state.isTravellerMoving
              ? n.handleTravellerMove(i)
              : n.state.isSlideMoving && n.handleSlideDrag(i);
        }),
        Bt(n, "handleTouchMove", function (i) {
          i.changedTouches != null &&
            i.changedTouches.length > 0 &&
            n.handleDrag(i.changedTouches[0]);
        }),
        Bt(n, "handleDragEnd", function () {
          n.setState({ isTravellerMoving: !1, isSlideMoving: !1 }, function () {
            var i = n.props,
              o = i.endIndex,
              a = i.onDragEnd,
              u = i.startIndex;
            a == null || a({ endIndex: o, startIndex: u });
          }),
            n.detachDragEndListener();
        }),
        Bt(n, "handleLeaveWrapper", function () {
          (n.state.isTravellerMoving || n.state.isSlideMoving) &&
            (n.leaveTimer = window.setTimeout(
              n.handleDragEnd,
              n.props.leaveTimeOut
            ));
        }),
        Bt(n, "handleEnterSlideOrTraveller", function () {
          n.setState({ isTextActive: !0 });
        }),
        Bt(n, "handleLeaveSlideOrTraveller", function () {
          n.setState({ isTextActive: !1 });
        }),
        Bt(n, "handleSlideDragStart", function (i) {
          var o = Kb(i) ? i.changedTouches[0] : i;
          n.setState({
            isTravellerMoving: !1,
            isSlideMoving: !0,
            slideMoveStartX: o.pageX,
          }),
            n.attachDragEndListener();
        }),
        (n.travellerDragStartHandlers = {
          startX: n.handleTravellerDragStart.bind(n, "startX"),
          endX: n.handleTravellerDragStart.bind(n, "endX"),
        }),
        (n.state = {}),
        n
      );
    }
    return (
      cV(t, e),
      aV(
        t,
        [
          {
            key: "componentWillUnmount",
            value: function () {
              this.leaveTimer &&
                (clearTimeout(this.leaveTimer), (this.leaveTimer = null)),
                this.detachDragEndListener();
            },
          },
          {
            key: "getIndex",
            value: function (n) {
              var i = n.startX,
                o = n.endX,
                a = this.state.scaleValues,
                u = this.props,
                s = u.gap,
                l = u.data,
                f = l.length - 1,
                c = Math.min(i, o),
                p = Math.max(i, o),
                d = t.getIndexInRange(a, c),
                h = t.getIndexInRange(a, p);
              return {
                startIndex: d - (d % s),
                endIndex: h === f ? f : h - (h % s),
              };
            },
          },
          {
            key: "getTextOfTick",
            value: function (n) {
              var i = this.props,
                o = i.data,
                a = i.tickFormatter,
                u = i.dataKey,
                s = Mr(o[n], u, n);
              return te(a) ? a(s, n) : s;
            },
          },
          {
            key: "attachDragEndListener",
            value: function () {
              window.addEventListener("mouseup", this.handleDragEnd, !0),
                window.addEventListener("touchend", this.handleDragEnd, !0),
                window.addEventListener("mousemove", this.handleDrag, !0);
            },
          },
          {
            key: "detachDragEndListener",
            value: function () {
              window.removeEventListener("mouseup", this.handleDragEnd, !0),
                window.removeEventListener("touchend", this.handleDragEnd, !0),
                window.removeEventListener("mousemove", this.handleDrag, !0);
            },
          },
          {
            key: "handleSlideDrag",
            value: function (n) {
              var i = this.state,
                o = i.slideMoveStartX,
                a = i.startX,
                u = i.endX,
                s = this.props,
                l = s.x,
                f = s.width,
                c = s.travellerWidth,
                p = s.startIndex,
                d = s.endIndex,
                h = s.onChange,
                y = n.pageX - o;
              y > 0
                ? (y = Math.min(y, l + f - c - u, l + f - c - a))
                : y < 0 && (y = Math.max(y, l - a, l - u));
              var w = this.getIndex({ startX: a + y, endX: u + y });
              (w.startIndex !== p || w.endIndex !== d) && h && h(w),
                this.setState({
                  startX: a + y,
                  endX: u + y,
                  slideMoveStartX: n.pageX,
                });
            },
          },
          {
            key: "handleTravellerDragStart",
            value: function (n, i) {
              var o = Kb(i) ? i.changedTouches[0] : i;
              this.setState({
                isSlideMoving: !1,
                isTravellerMoving: !0,
                movingTravellerId: n,
                brushMoveStartX: o.pageX,
              }),
                this.attachDragEndListener();
            },
          },
          {
            key: "handleTravellerMove",
            value: function (n) {
              var i = this.state,
                o = i.brushMoveStartX,
                a = i.movingTravellerId,
                u = i.endX,
                s = i.startX,
                l = this.state[a],
                f = this.props,
                c = f.x,
                p = f.width,
                d = f.travellerWidth,
                h = f.onChange,
                y = f.gap,
                w = f.data,
                m = { startX: this.state.startX, endX: this.state.endX },
                v = n.pageX - o;
              v > 0
                ? (v = Math.min(v, c + p - d - l))
                : v < 0 && (v = Math.max(v, c - l)),
                (m[a] = l + v);
              var g = this.getIndex(m),
                S = g.startIndex,
                b = g.endIndex,
                x = function () {
                  var _ = w.length - 1;
                  return (
                    (a === "startX" && (u > s ? S % y === 0 : b % y === 0)) ||
                    (u < s && b === _) ||
                    (a === "endX" && (u > s ? b % y === 0 : S % y === 0)) ||
                    (u > s && b === _)
                  );
                };
              this.setState(
                Bt(Bt({}, a, l + v), "brushMoveStartX", n.pageX),
                function () {
                  h && x() && h(g);
                }
              );
            },
          },
          {
            key: "handleTravellerMoveKeyboard",
            value: function (n, i) {
              var o = this,
                a = this.state,
                u = a.scaleValues,
                s = a.startX,
                l = a.endX,
                f = this.state[i],
                c = u.indexOf(f);
              if (c !== -1) {
                var p = c + n;
                if (!(p === -1 || p >= u.length)) {
                  var d = u[p];
                  (i === "startX" && d >= l) ||
                    (i === "endX" && d <= s) ||
                    this.setState(Bt({}, i, d), function () {
                      o.props.onChange(
                        o.getIndex({
                          startX: o.state.startX,
                          endX: o.state.endX,
                        })
                      );
                    });
                }
              }
            },
          },
          {
            key: "renderBackground",
            value: function () {
              var n = this.props,
                i = n.x,
                o = n.y,
                a = n.width,
                u = n.height,
                s = n.fill,
                l = n.stroke;
              return A.createElement("rect", {
                stroke: l,
                fill: s,
                x: i,
                y: o,
                width: a,
                height: u,
              });
            },
          },
          {
            key: "renderPanorama",
            value: function () {
              var n = this.props,
                i = n.x,
                o = n.y,
                a = n.width,
                u = n.height,
                s = n.data,
                l = n.children,
                f = n.padding,
                c = z.Children.only(l);
              return c
                ? A.cloneElement(c, {
                    x: i,
                    y: o,
                    width: a,
                    height: u,
                    margin: f,
                    compact: !0,
                    data: s,
                  })
                : null;
            },
          },
          {
            key: "renderTravellerLayer",
            value: function (n, i) {
              var o,
                a,
                u = this,
                s = this.props,
                l = s.y,
                f = s.travellerWidth,
                c = s.height,
                p = s.traveller,
                d = s.ariaLabel,
                h = s.data,
                y = s.startIndex,
                w = s.endIndex,
                m = Math.max(n, this.props.x),
                v = _p(
                  _p({}, ae(this.props, !1)),
                  {},
                  { x: m, y: l, width: f, height: c }
                ),
                g =
                  d ||
                  "Min value: "
                    .concat(
                      (o = h[y]) === null || o === void 0 ? void 0 : o.name,
                      ", Max value: "
                    )
                    .concat(
                      (a = h[w]) === null || a === void 0 ? void 0 : a.name
                    );
              return A.createElement(
                qe,
                {
                  tabIndex: 0,
                  role: "slider",
                  "aria-label": g,
                  "aria-valuenow": n,
                  className: "recharts-brush-traveller",
                  onMouseEnter: this.handleEnterSlideOrTraveller,
                  onMouseLeave: this.handleLeaveSlideOrTraveller,
                  onMouseDown: this.travellerDragStartHandlers[i],
                  onTouchStart: this.travellerDragStartHandlers[i],
                  onKeyDown: function (b) {
                    ["ArrowLeft", "ArrowRight"].includes(b.key) &&
                      (b.preventDefault(),
                      b.stopPropagation(),
                      u.handleTravellerMoveKeyboard(
                        b.key === "ArrowRight" ? 1 : -1,
                        i
                      ));
                  },
                  onFocus: function () {
                    u.setState({ isTravellerFocused: !0 });
                  },
                  onBlur: function () {
                    u.setState({ isTravellerFocused: !1 });
                  },
                  style: { cursor: "col-resize" },
                },
                t.renderTraveller(p, v)
              );
            },
          },
          {
            key: "renderSlide",
            value: function (n, i) {
              var o = this.props,
                a = o.y,
                u = o.height,
                s = o.stroke,
                l = o.travellerWidth,
                f = Math.min(n, i) + l,
                c = Math.max(Math.abs(i - n) - l, 0);
              return A.createElement("rect", {
                className: "recharts-brush-slide",
                onMouseEnter: this.handleEnterSlideOrTraveller,
                onMouseLeave: this.handleLeaveSlideOrTraveller,
                onMouseDown: this.handleSlideDragStart,
                onTouchStart: this.handleSlideDragStart,
                style: { cursor: "move" },
                stroke: "none",
                fill: s,
                fillOpacity: 0.2,
                x: f,
                y: a,
                width: c,
                height: u,
              });
            },
          },
          {
            key: "renderText",
            value: function () {
              var n = this.props,
                i = n.startIndex,
                o = n.endIndex,
                a = n.y,
                u = n.height,
                s = n.travellerWidth,
                l = n.stroke,
                f = this.state,
                c = f.startX,
                p = f.endX,
                d = 5,
                h = { pointerEvents: "none", fill: l };
              return A.createElement(
                qe,
                { className: "recharts-brush-texts" },
                A.createElement(
                  Cl,
                  tc(
                    {
                      textAnchor: "end",
                      verticalAnchor: "middle",
                      x: Math.min(c, p) - d,
                      y: a + u / 2,
                    },
                    h
                  ),
                  this.getTextOfTick(i)
                ),
                A.createElement(
                  Cl,
                  tc(
                    {
                      textAnchor: "start",
                      verticalAnchor: "middle",
                      x: Math.max(c, p) + s + d,
                      y: a + u / 2,
                    },
                    h
                  ),
                  this.getTextOfTick(o)
                )
              );
            },
          },
          {
            key: "render",
            value: function () {
              var n = this.props,
                i = n.data,
                o = n.className,
                a = n.children,
                u = n.x,
                s = n.y,
                l = n.width,
                f = n.height,
                c = n.alwaysShowText,
                p = this.state,
                d = p.startX,
                h = p.endX,
                y = p.isTextActive,
                w = p.isSlideMoving,
                m = p.isTravellerMoving,
                v = p.isTravellerFocused;
              if (
                !i ||
                !i.length ||
                !W(u) ||
                !W(s) ||
                !W(l) ||
                !W(f) ||
                l <= 0 ||
                f <= 0
              )
                return null;
              var g = se("recharts-brush", o),
                S = A.Children.count(a) === 1,
                b = iV("userSelect", "none");
              return A.createElement(
                qe,
                {
                  className: g,
                  onMouseLeave: this.handleLeaveWrapper,
                  onTouchMove: this.handleTouchMove,
                  style: b,
                },
                this.renderBackground(),
                S && this.renderPanorama(),
                this.renderSlide(d, h),
                this.renderTravellerLayer(d, "startX"),
                this.renderTravellerLayer(h, "endX"),
                (y || w || m || v || c) && this.renderText()
              );
            },
          },
        ],
        [
          {
            key: "renderDefaultTraveller",
            value: function (n) {
              var i = n.x,
                o = n.y,
                a = n.width,
                u = n.height,
                s = n.stroke,
                l = Math.floor(o + u / 2) - 1;
              return A.createElement(
                A.Fragment,
                null,
                A.createElement("rect", {
                  x: i,
                  y: o,
                  width: a,
                  height: u,
                  fill: s,
                  stroke: "none",
                }),
                A.createElement("line", {
                  x1: i + 1,
                  y1: l,
                  x2: i + a - 1,
                  y2: l,
                  fill: "none",
                  stroke: "#fff",
                }),
                A.createElement("line", {
                  x1: i + 1,
                  y1: l + 2,
                  x2: i + a - 1,
                  y2: l + 2,
                  fill: "none",
                  stroke: "#fff",
                })
              );
            },
          },
          {
            key: "renderTraveller",
            value: function (n, i) {
              var o;
              return (
                A.isValidElement(n)
                  ? (o = A.cloneElement(n, i))
                  : te(n)
                    ? (o = n(i))
                    : (o = t.renderDefaultTraveller(i)),
                o
              );
            },
          },
          {
            key: "getDerivedStateFromProps",
            value: function (n, i) {
              var o = n.data,
                a = n.width,
                u = n.x,
                s = n.travellerWidth,
                l = n.updateId,
                f = n.startIndex,
                c = n.endIndex;
              if (o !== i.prevData || l !== i.prevUpdateId)
                return _p(
                  {
                    prevData: o,
                    prevTravellerWidth: s,
                    prevUpdateId: l,
                    prevX: u,
                    prevWidth: a,
                  },
                  o && o.length
                    ? pV({
                        data: o,
                        width: a,
                        x: u,
                        travellerWidth: s,
                        startIndex: f,
                        endIndex: c,
                      })
                    : { scale: null, scaleValues: null }
                );
              if (
                i.scale &&
                (a !== i.prevWidth ||
                  u !== i.prevX ||
                  s !== i.prevTravellerWidth)
              ) {
                i.scale.range([u, u + a - s]);
                var p = i.scale.domain().map(function (d) {
                  return i.scale(d);
                });
                return {
                  prevData: o,
                  prevTravellerWidth: s,
                  prevUpdateId: l,
                  prevX: u,
                  prevWidth: a,
                  startX: i.scale(n.startIndex),
                  endX: i.scale(n.endIndex),
                  scaleValues: p,
                };
              }
              return null;
            },
          },
          {
            key: "getIndexInRange",
            value: function (n, i) {
              for (var o = n.length, a = 0, u = o - 1; u - a > 1; ) {
                var s = Math.floor((a + u) / 2);
                n[s] > i ? (u = s) : (a = s);
              }
              return i >= n[u] ? u : a;
            },
          },
        ]
      )
    );
  })(z.PureComponent);
Bt(Po, "displayName", "Brush");
Bt(Po, "defaultProps", {
  height: 40,
  travellerWidth: 5,
  gap: 1,
  fill: "#fff",
  stroke: "#666",
  padding: { top: 1, right: 1, bottom: 1, left: 1 },
  leaveTimeOut: 1e3,
  alwaysShowText: !1,
});
var dV = Om;
function hV(e, t) {
  var r;
  return (
    dV(e, function (n, i, o) {
      return (r = t(n, i, o)), !r;
    }),
    !!r
  );
}
var vV = hV,
  mV = JO,
  yV = Ln,
  gV = vV,
  bV = Ft,
  wV = tf;
function xV(e, t, r) {
  var n = bV(e) ? mV : gV;
  return r && wV(e, t, r) && (t = void 0), n(e, yV(t));
}
var SV = xV;
const OV = he(SV);
var kr = function (t, r) {
    var n = t.alwaysShow,
      i = t.ifOverflow;
    return n && (i = "extendDomain"), i === r;
  },
  Xb = x_;
function _V(e, t, r) {
  t == "__proto__" && Xb
    ? Xb(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
    : (e[t] = r);
}
var PV = _V,
  AV = PV,
  EV = b_,
  IV = Ln;
function TV(e, t) {
  var r = {};
  return (
    (t = IV(t)),
    EV(e, function (n, i, o) {
      AV(r, i, t(n, i, o));
    }),
    r
  );
}
var $V = TV;
const CV = he($V);
function kV(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (!t(e[r], r, e)) return !1;
  return !0;
}
var jV = kV,
  MV = Om;
function NV(e, t) {
  var r = !0;
  return (
    MV(e, function (n, i, o) {
      return (r = !!t(n, i, o)), r;
    }),
    r
  );
}
var DV = NV,
  LV = jV,
  RV = DV,
  FV = Ln,
  BV = Ft,
  zV = tf;
function UV(e, t, r) {
  var n = BV(e) ? LV : RV;
  return r && zV(e, t, r) && (t = void 0), n(e, FV(t));
}
var WV = UV;
const tA = he(WV);
var HV = ["x", "y"];
function $u(e) {
  "@babel/helpers - typeof";
  return (
    ($u =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    $u(e)
  );
}
function jh() {
  return (
    (jh = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    jh.apply(this, arguments)
  );
}
function Yb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function va(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Yb(Object(r), !0).forEach(function (n) {
          GV(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Yb(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function GV(e, t, r) {
  return (
    (t = VV(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function VV(e) {
  var t = qV(e, "string");
  return $u(t) == "symbol" ? t : t + "";
}
function qV(e, t) {
  if ($u(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if ($u(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function KV(e, t) {
  if (e == null) return {};
  var r = XV(e, t),
    n,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (n = o[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n]);
  }
  return r;
}
function XV(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function YV(e, t) {
  var r = e.x,
    n = e.y,
    i = KV(e, HV),
    o = "".concat(r),
    a = parseInt(o, 10),
    u = "".concat(n),
    s = parseInt(u, 10),
    l = "".concat(t.height || i.height),
    f = parseInt(l, 10),
    c = "".concat(t.width || i.width),
    p = parseInt(c, 10);
  return va(
    va(va(va(va({}, t), i), a ? { x: a } : {}), s ? { y: s } : {}),
    {},
    { height: f, width: p, name: t.name, radius: t.radius }
  );
}
function Qb(e) {
  return A.createElement(
    jG,
    jh(
      {
        shapeType: "rectangle",
        propTransformer: YV,
        activeClassName: "recharts-active-bar",
      },
      e
    )
  );
}
var QV = function (t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return function (n, i) {
      if (typeof t == "number") return t;
      var o = typeof n == "number";
      return o ? t(n, i) : (o || yi(), r);
    };
  },
  ZV = ["value", "background"],
  rA;
function Ao(e) {
  "@babel/helpers - typeof";
  return (
    (Ao =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Ao(e)
  );
}
function JV(e, t) {
  if (e == null) return {};
  var r = eq(e, t),
    n,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (n = o[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n]);
  }
  return r;
}
function eq(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function nc() {
  return (
    (nc = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    nc.apply(this, arguments)
  );
}
function Zb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function Me(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Zb(Object(r), !0).forEach(function (n) {
          yn(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Zb(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function tq(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Jb(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, iA(n.key), n);
  }
}
function rq(e, t, r) {
  return (
    t && Jb(e.prototype, t),
    r && Jb(e, r),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function nq(e, t, r) {
  return (
    (t = ic(t)),
    iq(
      e,
      nA() ? Reflect.construct(t, r || [], ic(e).constructor) : t.apply(e, r)
    )
  );
}
function iq(e, t) {
  if (t && (Ao(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return oq(e);
}
function oq(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function nA() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch {}
  return (nA = function () {
    return !!e;
  })();
}
function ic(e) {
  return (
    (ic = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }),
    ic(e)
  );
}
function aq(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && Mh(e, t);
}
function Mh(e, t) {
  return (
    (Mh = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n;
        }),
    Mh(e, t)
  );
}
function yn(e, t, r) {
  return (
    (t = iA(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function iA(e) {
  var t = uq(e, "string");
  return Ao(t) == "symbol" ? t : t + "";
}
function uq(e, t) {
  if (Ao(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ao(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ei = (function (e) {
  function t() {
    var r;
    tq(this, t);
    for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++)
      i[o] = arguments[o];
    return (
      (r = nq(this, t, [].concat(i))),
      yn(r, "state", { isAnimationFinished: !1 }),
      yn(r, "id", Kc("recharts-bar-")),
      yn(r, "handleAnimationEnd", function () {
        var a = r.props.onAnimationEnd;
        r.setState({ isAnimationFinished: !0 }), a && a();
      }),
      yn(r, "handleAnimationStart", function () {
        var a = r.props.onAnimationStart;
        r.setState({ isAnimationFinished: !1 }), a && a();
      }),
      r
    );
  }
  return (
    aq(t, e),
    rq(
      t,
      [
        {
          key: "renderRectanglesStatically",
          value: function (n) {
            var i = this,
              o = this.props,
              a = o.shape,
              u = o.dataKey,
              s = o.activeIndex,
              l = o.activeBar,
              f = ae(this.props, !1);
            return (
              n &&
              n.map(function (c, p) {
                var d = p === s,
                  h = d ? l : a,
                  y = Me(
                    Me(Me({}, f), c),
                    {},
                    {
                      isActive: d,
                      option: h,
                      index: p,
                      dataKey: u,
                      onAnimationStart: i.handleAnimationStart,
                      onAnimationEnd: i.handleAnimationEnd,
                    }
                  );
                return A.createElement(
                  qe,
                  nc(
                    { className: "recharts-bar-rectangle" },
                    yl(i.props, c, p),
                    {
                      key: "rectangle-"
                        .concat(c == null ? void 0 : c.x, "-")
                        .concat(c == null ? void 0 : c.y, "-")
                        .concat(c == null ? void 0 : c.value),
                    }
                  ),
                  A.createElement(Qb, y)
                );
              })
            );
          },
        },
        {
          key: "renderRectanglesWithAnimation",
          value: function () {
            var n = this,
              i = this.props,
              o = i.data,
              a = i.layout,
              u = i.isAnimationActive,
              s = i.animationBegin,
              l = i.animationDuration,
              f = i.animationEasing,
              c = i.animationId,
              p = this.state.prevData;
            return A.createElement(
              Cn,
              {
                begin: s,
                duration: l,
                isActive: u,
                easing: f,
                from: { t: 0 },
                to: { t: 1 },
                key: "bar-".concat(c),
                onAnimationEnd: this.handleAnimationEnd,
                onAnimationStart: this.handleAnimationStart,
              },
              function (d) {
                var h = d.t,
                  y = o.map(function (w, m) {
                    var v = p && p[m];
                    if (v) {
                      var g = $i(v.x, w.x),
                        S = $i(v.y, w.y),
                        b = $i(v.width, w.width),
                        x = $i(v.height, w.height);
                      return Me(
                        Me({}, w),
                        {},
                        { x: g(h), y: S(h), width: b(h), height: x(h) }
                      );
                    }
                    if (a === "horizontal") {
                      var O = $i(0, w.height),
                        _ = O(h);
                      return Me(
                        Me({}, w),
                        {},
                        { y: w.y + w.height - _, height: _ }
                      );
                    }
                    var P = $i(0, w.width),
                      I = P(h);
                    return Me(Me({}, w), {}, { width: I });
                  });
                return A.createElement(
                  qe,
                  null,
                  n.renderRectanglesStatically(y)
                );
              }
            );
          },
        },
        {
          key: "renderRectangles",
          value: function () {
            var n = this.props,
              i = n.data,
              o = n.isAnimationActive,
              a = this.state.prevData;
            return o && i && i.length && (!a || !Km(a, i))
              ? this.renderRectanglesWithAnimation()
              : this.renderRectanglesStatically(i);
          },
        },
        {
          key: "renderBackground",
          value: function () {
            var n = this,
              i = this.props,
              o = i.data,
              a = i.dataKey,
              u = i.activeIndex,
              s = ae(this.props.background, !1);
            return o.map(function (l, f) {
              l.value;
              var c = l.background,
                p = JV(l, ZV);
              if (!c) return null;
              var d = Me(
                Me(
                  Me(Me(Me({}, p), {}, { fill: "#eee" }, c), s),
                  yl(n.props, l, f)
                ),
                {},
                {
                  onAnimationStart: n.handleAnimationStart,
                  onAnimationEnd: n.handleAnimationEnd,
                  dataKey: a,
                  index: f,
                  className: "recharts-bar-background-rectangle",
                }
              );
              return A.createElement(
                Qb,
                nc(
                  {
                    key: "background-bar-".concat(f),
                    option: n.props.background,
                    isActive: f === u,
                  },
                  d
                )
              );
            });
          },
        },
        {
          key: "renderErrorBar",
          value: function (n, i) {
            if (this.props.isAnimationActive && !this.state.isAnimationFinished)
              return null;
            var o = this.props,
              a = o.data,
              u = o.xAxis,
              s = o.yAxis,
              l = o.layout,
              f = o.children,
              c = wr(f, df);
            if (!c) return null;
            var p = l === "vertical" ? a[0].height / 2 : a[0].width / 2,
              d = function (w, m) {
                var v = Array.isArray(w.value) ? w.value[1] : w.value;
                return { x: w.x, y: w.y, value: v, errorVal: Mr(w, m) };
              },
              h = { clipPath: n ? "url(#clipPath-".concat(i, ")") : null };
            return A.createElement(
              qe,
              h,
              c.map(function (y) {
                return A.cloneElement(y, {
                  key: "error-bar-".concat(i, "-").concat(y.props.dataKey),
                  data: a,
                  xAxis: u,
                  yAxis: s,
                  layout: l,
                  offset: p,
                  dataPointFormatter: d,
                });
              })
            );
          },
        },
        {
          key: "render",
          value: function () {
            var n = this.props,
              i = n.hide,
              o = n.data,
              a = n.className,
              u = n.xAxis,
              s = n.yAxis,
              l = n.left,
              f = n.top,
              c = n.width,
              p = n.height,
              d = n.isAnimationActive,
              h = n.background,
              y = n.id;
            if (i || !o || !o.length) return null;
            var w = this.state.isAnimationFinished,
              m = se("recharts-bar", a),
              v = u && u.allowDataOverflow,
              g = s && s.allowDataOverflow,
              S = v || g,
              b = ue(y) ? this.id : y;
            return A.createElement(
              qe,
              { className: m },
              v || g
                ? A.createElement(
                    "defs",
                    null,
                    A.createElement(
                      "clipPath",
                      { id: "clipPath-".concat(b) },
                      A.createElement("rect", {
                        x: v ? l : l - c / 2,
                        y: g ? f : f - p / 2,
                        width: v ? c : c * 2,
                        height: g ? p : p * 2,
                      })
                    )
                  )
                : null,
              A.createElement(
                qe,
                {
                  className: "recharts-bar-rectangles",
                  clipPath: S ? "url(#clipPath-".concat(b, ")") : null,
                },
                h ? this.renderBackground() : null,
                this.renderRectangles()
              ),
              this.renderErrorBar(S, b),
              (!d || w) && li.renderCallByParent(this.props, o)
            );
          },
        },
      ],
      [
        {
          key: "getDerivedStateFromProps",
          value: function (n, i) {
            return n.animationId !== i.prevAnimationId
              ? {
                  prevAnimationId: n.animationId,
                  curData: n.data,
                  prevData: i.curData,
                }
              : n.data !== i.curData
                ? { curData: n.data }
                : null;
          },
        },
      ]
    )
  );
})(z.PureComponent);
rA = Ei;
yn(Ei, "displayName", "Bar");
yn(Ei, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  legendType: "rect",
  minPointSize: 0,
  hide: !1,
  data: [],
  layout: "vertical",
  activeBar: !1,
  isAnimationActive: !En.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease",
});
yn(Ei, "getComposedData", function (e) {
  var t = e.props,
    r = e.item,
    n = e.barPosition,
    i = e.bandSize,
    o = e.xAxis,
    a = e.yAxis,
    u = e.xAxisTicks,
    s = e.yAxisTicks,
    l = e.stackedData,
    f = e.dataStartIndex,
    c = e.displayedData,
    p = e.offset,
    d = q9(n, r);
  if (!d) return null;
  var h = t.layout,
    y = r.type.defaultProps,
    w = y !== void 0 ? Me(Me({}, y), r.props) : r.props,
    m = w.dataKey,
    v = w.children,
    g = w.minPointSize,
    S = h === "horizontal" ? a : o,
    b = l ? S.scale.domain() : null,
    x = tU({ numericAxis: S }),
    O = wr(v, I_),
    _ = c.map(function (P, I) {
      var E, $, M, N, j, D;
      l
        ? (E = K9(l[f + I], b))
        : ((E = Mr(P, m)), Array.isArray(E) || (E = [x, E]));
      var L = QV(g, rA.defaultProps.minPointSize)(E[1], I);
      if (h === "horizontal") {
        var T,
          k = [a.scale(E[0]), a.scale(E[1])],
          F = k[0],
          H = k[1];
        ($ = Q1({
          axis: o,
          ticks: u,
          bandSize: i,
          offset: d.offset,
          entry: P,
          index: I,
        })),
          (M = (T = H ?? F) !== null && T !== void 0 ? T : void 0),
          (N = d.size);
        var U = F - H;
        if (
          ((j = Number.isNaN(U) ? 0 : U),
          (D = { x: $, y: a.y, width: N, height: a.height }),
          Math.abs(L) > 0 && Math.abs(j) < Math.abs(L))
        ) {
          var K = yr(j || L) * (Math.abs(L) - Math.abs(j));
          (M -= K), (j += K);
        }
      } else {
        var re = [o.scale(E[0]), o.scale(E[1])],
          Se = re[0],
          ke = re[1];
        if (
          (($ = Se),
          (M = Q1({
            axis: a,
            ticks: s,
            bandSize: i,
            offset: d.offset,
            entry: P,
            index: I,
          })),
          (N = ke - Se),
          (j = d.size),
          (D = { x: o.x, y: M, width: o.width, height: j }),
          Math.abs(L) > 0 && Math.abs(N) < Math.abs(L))
        ) {
          var Xt = yr(N || L) * (Math.abs(L) - Math.abs(N));
          N += Xt;
        }
      }
      return Me(
        Me(
          Me({}, P),
          {},
          {
            x: $,
            y: M,
            width: N,
            height: j,
            value: l ? E : E[1],
            payload: P,
            background: D,
          },
          O && O[I] && O[I].props
        ),
        {},
        {
          tooltipPayload: [MP(r, P)],
          tooltipPosition: { x: $ + N / 2, y: M + j / 2 },
        }
      );
    });
  return Me({ data: _, layout: h }, p);
});
function Cu(e) {
  "@babel/helpers - typeof";
  return (
    (Cu =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Cu(e)
  );
}
function sq(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function ew(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, oA(n.key), n);
  }
}
function lq(e, t, r) {
  return (
    t && ew(e.prototype, t),
    r && ew(e, r),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function tw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function hr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? tw(Object(r), !0).forEach(function (n) {
          mf(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : tw(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function mf(e, t, r) {
  return (
    (t = oA(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function oA(e) {
  var t = cq(e, "string");
  return Cu(t) == "symbol" ? t : t + "";
}
function cq(e, t) {
  if (Cu(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Cu(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var fq = function (t, r, n, i, o) {
    var a = t.width,
      u = t.height,
      s = t.layout,
      l = t.children,
      f = Object.keys(r),
      c = {
        left: n.left,
        leftMirror: n.left,
        right: a - n.right,
        rightMirror: a - n.right,
        top: n.top,
        topMirror: n.top,
        bottom: u - n.bottom,
        bottomMirror: u - n.bottom,
      },
      p = !!Ut(l, Ei);
    return f.reduce(function (d, h) {
      var y = r[h],
        w = y.orientation,
        m = y.domain,
        v = y.padding,
        g = v === void 0 ? {} : v,
        S = y.mirror,
        b = y.reversed,
        x = "".concat(w).concat(S ? "Mirror" : ""),
        O,
        _,
        P,
        I,
        E;
      if (
        y.type === "number" &&
        (y.padding === "gap" || y.padding === "no-gap")
      ) {
        var $ = m[1] - m[0],
          M = 1 / 0,
          N = y.categoricalDomain.sort();
        if (
          (N.forEach(function (re, Se) {
            Se > 0 && (M = Math.min((re || 0) - (N[Se - 1] || 0), M));
          }),
          Number.isFinite(M))
        ) {
          var j = M / $,
            D = y.layout === "vertical" ? n.height : n.width;
          if (
            (y.padding === "gap" && (O = (j * D) / 2), y.padding === "no-gap")
          ) {
            var L = vi(t.barCategoryGap, j * D),
              T = (j * D) / 2;
            O = T - L - ((T - L) / D) * L;
          }
        }
      }
      i === "xAxis"
        ? (_ = [
            n.left + (g.left || 0) + (O || 0),
            n.left + n.width - (g.right || 0) - (O || 0),
          ])
        : i === "yAxis"
          ? (_ =
              s === "horizontal"
                ? [n.top + n.height - (g.bottom || 0), n.top + (g.top || 0)]
                : [
                    n.top + (g.top || 0) + (O || 0),
                    n.top + n.height - (g.bottom || 0) - (O || 0),
                  ])
          : (_ = y.range),
        b && (_ = [_[1], _[0]]);
      var k = G9(y, o, p),
        F = k.scale,
        H = k.realScaleType;
      F.domain(m).range(_), V9(F);
      var U = eU(F, hr(hr({}, y), {}, { realScaleType: H }));
      i === "xAxis"
        ? ((E = (w === "top" && !S) || (w === "bottom" && S)),
          (P = n.left),
          (I = c[x] - E * y.height))
        : i === "yAxis" &&
          ((E = (w === "left" && !S) || (w === "right" && S)),
          (P = c[x] - E * y.width),
          (I = n.top));
      var K = hr(
        hr(hr({}, y), U),
        {},
        {
          realScaleType: H,
          x: P,
          y: I,
          scale: F,
          width: i === "xAxis" ? n.width : y.width,
          height: i === "yAxis" ? n.height : y.height,
        }
      );
      return (
        (K.bandSize = Gl(K, U)),
        !y.hide && i === "xAxis"
          ? (c[x] += (E ? -1 : 1) * K.height)
          : y.hide || (c[x] += (E ? -1 : 1) * K.width),
        hr(hr({}, d), {}, mf({}, h, K))
      );
    }, {});
  },
  aA = function (t, r) {
    var n = t.x,
      i = t.y,
      o = r.x,
      a = r.y;
    return {
      x: Math.min(n, o),
      y: Math.min(i, a),
      width: Math.abs(o - n),
      height: Math.abs(a - i),
    };
  },
  pq = function (t) {
    var r = t.x1,
      n = t.y1,
      i = t.x2,
      o = t.y2;
    return aA({ x: r, y: n }, { x: i, y: o });
  },
  uA = (function () {
    function e(t) {
      sq(this, e), (this.scale = t);
    }
    return lq(
      e,
      [
        {
          key: "domain",
          get: function () {
            return this.scale.domain;
          },
        },
        {
          key: "range",
          get: function () {
            return this.scale.range;
          },
        },
        {
          key: "rangeMin",
          get: function () {
            return this.range()[0];
          },
        },
        {
          key: "rangeMax",
          get: function () {
            return this.range()[1];
          },
        },
        {
          key: "bandwidth",
          get: function () {
            return this.scale.bandwidth;
          },
        },
        {
          key: "apply",
          value: function (r) {
            var n =
                arguments.length > 1 && arguments[1] !== void 0
                  ? arguments[1]
                  : {},
              i = n.bandAware,
              o = n.position;
            if (r !== void 0) {
              if (o)
                switch (o) {
                  case "start":
                    return this.scale(r);
                  case "middle": {
                    var a = this.bandwidth ? this.bandwidth() / 2 : 0;
                    return this.scale(r) + a;
                  }
                  case "end": {
                    var u = this.bandwidth ? this.bandwidth() : 0;
                    return this.scale(r) + u;
                  }
                  default:
                    return this.scale(r);
                }
              if (i) {
                var s = this.bandwidth ? this.bandwidth() / 2 : 0;
                return this.scale(r) + s;
              }
              return this.scale(r);
            }
          },
        },
        {
          key: "isInRange",
          value: function (r) {
            var n = this.range(),
              i = n[0],
              o = n[n.length - 1];
            return i <= o ? r >= i && r <= o : r >= o && r <= i;
          },
        },
      ],
      [
        {
          key: "create",
          value: function (r) {
            return new e(r);
          },
        },
      ]
    );
  })();
mf(uA, "EPS", 1e-4);
var Jm = function (t) {
  var r = Object.keys(t).reduce(function (n, i) {
    return hr(hr({}, n), {}, mf({}, i, uA.create(t[i])));
  }, {});
  return hr(
    hr({}, r),
    {},
    {
      apply: function (i) {
        var o =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
          a = o.bandAware,
          u = o.position;
        return CV(i, function (s, l) {
          return r[l].apply(s, { bandAware: a, position: u });
        });
      },
      isInRange: function (i) {
        return tA(i, function (o, a) {
          return r[a].isInRange(o);
        });
      },
    }
  );
};
function dq(e) {
  return ((e % 180) + 180) % 180;
}
var hq = function (t) {
    var r = t.width,
      n = t.height,
      i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
      o = dq(i),
      a = (o * Math.PI) / 180,
      u = Math.atan(n / r),
      s = a > u && a < Math.PI - u ? n / Math.sin(a) : r / Math.cos(a);
    return Math.abs(s);
  },
  vq = Ln,
  mq = Wu,
  yq = Jc;
function gq(e) {
  return function (t, r, n) {
    var i = Object(t);
    if (!mq(t)) {
      var o = vq(r);
      (t = yq(t)),
        (r = function (u) {
          return o(i[u], u, i);
        });
    }
    var a = e(t, r, n);
    return a > -1 ? i[o ? t[a] : a] : void 0;
  };
}
var bq = gq,
  wq = QP;
function xq(e) {
  var t = wq(e),
    r = t % 1;
  return t === t ? (r ? t - r : t) : 0;
}
var Sq = xq,
  Oq = d_,
  _q = Ln,
  Pq = Sq,
  Aq = Math.max;
function Eq(e, t, r) {
  var n = e == null ? 0 : e.length;
  if (!n) return -1;
  var i = r == null ? 0 : Pq(r);
  return i < 0 && (i = Aq(n + i, 0)), Oq(e, _q(t), i);
}
var Iq = Eq,
  Tq = bq,
  $q = Iq,
  Cq = Tq($q),
  kq = Cq;
const jq = he(kq);
var Mq = $k(
    function (e) {
      return { x: e.left, y: e.top, width: e.width, height: e.height };
    },
    function (e) {
      return ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join("");
    }
  ),
  ey = z.createContext(void 0),
  ty = z.createContext(void 0),
  sA = z.createContext(void 0),
  lA = z.createContext({}),
  cA = z.createContext(void 0),
  fA = z.createContext(0),
  pA = z.createContext(0),
  rw = function (t) {
    var r = t.state,
      n = r.xAxisMap,
      i = r.yAxisMap,
      o = r.offset,
      a = t.clipPathId,
      u = t.children,
      s = t.width,
      l = t.height,
      f = Mq(o);
    return A.createElement(
      ey.Provider,
      { value: n },
      A.createElement(
        ty.Provider,
        { value: i },
        A.createElement(
          lA.Provider,
          { value: o },
          A.createElement(
            sA.Provider,
            { value: f },
            A.createElement(
              cA.Provider,
              { value: a },
              A.createElement(
                fA.Provider,
                { value: l },
                A.createElement(pA.Provider, { value: s }, u)
              )
            )
          )
        )
      )
    );
  },
  Nq = function () {
    return z.useContext(cA);
  },
  dA = function (t) {
    var r = z.useContext(ey);
    r == null && yi();
    var n = r[t];
    return n == null && yi(), n;
  },
  Dq = function () {
    var t = z.useContext(ey);
    return hn(t);
  },
  Lq = function () {
    var t = z.useContext(ty),
      r = jq(t, function (n) {
        return tA(n.domain, Number.isFinite);
      });
    return r || hn(t);
  },
  hA = function (t) {
    var r = z.useContext(ty);
    r == null && yi();
    var n = r[t];
    return n == null && yi(), n;
  },
  Rq = function () {
    var t = z.useContext(sA);
    return t;
  },
  Fq = function () {
    return z.useContext(lA);
  },
  ry = function () {
    return z.useContext(pA);
  },
  ny = function () {
    return z.useContext(fA);
  };
function Eo(e) {
  "@babel/helpers - typeof";
  return (
    (Eo =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Eo(e)
  );
}
function Bq(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function zq(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, mA(n.key), n);
  }
}
function Uq(e, t, r) {
  return (
    t && zq(e.prototype, t),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function Wq(e, t, r) {
  return (
    (t = oc(t)),
    Hq(
      e,
      vA() ? Reflect.construct(t, r || [], oc(e).constructor) : t.apply(e, r)
    )
  );
}
function Hq(e, t) {
  if (t && (Eo(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return Gq(e);
}
function Gq(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function vA() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch {}
  return (vA = function () {
    return !!e;
  })();
}
function oc(e) {
  return (
    (oc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }),
    oc(e)
  );
}
function Vq(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && Nh(e, t);
}
function Nh(e, t) {
  return (
    (Nh = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n;
        }),
    Nh(e, t)
  );
}
function nw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function iw(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? nw(Object(r), !0).forEach(function (n) {
          iy(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : nw(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function iy(e, t, r) {
  return (
    (t = mA(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function mA(e) {
  var t = qq(e, "string");
  return Eo(t) == "symbol" ? t : t + "";
}
function qq(e, t) {
  if (Eo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Eo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Kq(e, t) {
  return Zq(e) || Qq(e, t) || Yq(e, t) || Xq();
}
function Xq() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Yq(e, t) {
  if (e) {
    if (typeof e == "string") return ow(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return ow(e, t);
  }
}
function ow(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Qq(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (r != null) {
    var n,
      i,
      o,
      a,
      u = [],
      s = !0,
      l = !1;
    try {
      if (((o = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t);
          s = !0
        );
    } catch (f) {
      (l = !0), (i = f);
    } finally {
      try {
        if (!s && r.return != null && ((a = r.return()), Object(a) !== a))
          return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function Zq(e) {
  if (Array.isArray(e)) return e;
}
function Dh() {
  return (
    (Dh = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Dh.apply(this, arguments)
  );
}
var Jq = function (t, r) {
    var n;
    return (
      A.isValidElement(t)
        ? (n = A.cloneElement(t, r))
        : te(t)
          ? (n = t(r))
          : (n = A.createElement(
              "line",
              Dh({}, r, { className: "recharts-reference-line-line" })
            )),
      n
    );
  },
  eK = function (t, r, n, i, o, a, u, s, l) {
    var f = o.x,
      c = o.y,
      p = o.width,
      d = o.height;
    if (n) {
      var h = l.y,
        y = t.y.apply(h, { position: a });
      if (kr(l, "discard") && !t.y.isInRange(y)) return null;
      var w = [
        { x: f + p, y },
        { x: f, y },
      ];
      return s === "left" ? w.reverse() : w;
    }
    if (r) {
      var m = l.x,
        v = t.x.apply(m, { position: a });
      if (kr(l, "discard") && !t.x.isInRange(v)) return null;
      var g = [
        { x: v, y: c + d },
        { x: v, y: c },
      ];
      return u === "top" ? g.reverse() : g;
    }
    if (i) {
      var S = l.segment,
        b = S.map(function (x) {
          return t.apply(x, { position: a });
        });
      return kr(l, "discard") &&
        OV(b, function (x) {
          return !t.isInRange(x);
        })
        ? null
        : b;
    }
    return null;
  };
function tK(e) {
  var t = e.x,
    r = e.y,
    n = e.segment,
    i = e.xAxisId,
    o = e.yAxisId,
    a = e.shape,
    u = e.className,
    s = e.alwaysShow,
    l = Nq(),
    f = dA(i),
    c = hA(o),
    p = Rq();
  if (!l || !p) return null;
  Vr(
    s === void 0,
    'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'
  );
  var d = Jm({ x: f.scale, y: c.scale }),
    h = Ue(t),
    y = Ue(r),
    w = n && n.length === 2,
    m = eK(d, h, y, w, p, e.position, f.orientation, c.orientation, e);
  if (!m) return null;
  var v = Kq(m, 2),
    g = v[0],
    S = g.x,
    b = g.y,
    x = v[1],
    O = x.x,
    _ = x.y,
    P = kr(e, "hidden") ? "url(#".concat(l, ")") : void 0,
    I = iw(iw({ clipPath: P }, ae(e, !0)), {}, { x1: S, y1: b, x2: O, y2: _ });
  return A.createElement(
    qe,
    { className: se("recharts-reference-line", u) },
    Jq(a, I),
    lt.renderCallByParent(e, pq({ x1: S, y1: b, x2: O, y2: _ }))
  );
}
var oy = (function (e) {
  function t() {
    return Bq(this, t), Wq(this, t, arguments);
  }
  return (
    Vq(t, e),
    Uq(t, [
      {
        key: "render",
        value: function () {
          return A.createElement(tK, this.props);
        },
      },
    ])
  );
})(A.Component);
iy(oy, "displayName", "ReferenceLine");
iy(oy, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  fill: "none",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1,
  position: "middle",
});
function Lh() {
  return (
    (Lh = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Lh.apply(this, arguments)
  );
}
function Io(e) {
  "@babel/helpers - typeof";
  return (
    (Io =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Io(e)
  );
}
function aw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function uw(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? aw(Object(r), !0).forEach(function (n) {
          yf(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : aw(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function rK(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function nK(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, gA(n.key), n);
  }
}
function iK(e, t, r) {
  return (
    t && nK(e.prototype, t),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function oK(e, t, r) {
  return (
    (t = ac(t)),
    aK(
      e,
      yA() ? Reflect.construct(t, r || [], ac(e).constructor) : t.apply(e, r)
    )
  );
}
function aK(e, t) {
  if (t && (Io(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return uK(e);
}
function uK(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function yA() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch {}
  return (yA = function () {
    return !!e;
  })();
}
function ac(e) {
  return (
    (ac = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }),
    ac(e)
  );
}
function sK(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && Rh(e, t);
}
function Rh(e, t) {
  return (
    (Rh = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n;
        }),
    Rh(e, t)
  );
}
function yf(e, t, r) {
  return (
    (t = gA(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function gA(e) {
  var t = lK(e, "string");
  return Io(t) == "symbol" ? t : t + "";
}
function lK(e, t) {
  if (Io(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Io(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var cK = function (t) {
    var r = t.x,
      n = t.y,
      i = t.xAxis,
      o = t.yAxis,
      a = Jm({ x: i.scale, y: o.scale }),
      u = a.apply({ x: r, y: n }, { bandAware: !0 });
    return kr(t, "discard") && !a.isInRange(u) ? null : u;
  },
  gf = (function (e) {
    function t() {
      return rK(this, t), oK(this, t, arguments);
    }
    return (
      sK(t, e),
      iK(t, [
        {
          key: "render",
          value: function () {
            var n = this.props,
              i = n.x,
              o = n.y,
              a = n.r,
              u = n.alwaysShow,
              s = n.clipPathId,
              l = Ue(i),
              f = Ue(o);
            if (
              (Vr(
                u === void 0,
                'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'
              ),
              !l || !f)
            )
              return null;
            var c = cK(this.props);
            if (!c) return null;
            var p = c.x,
              d = c.y,
              h = this.props,
              y = h.shape,
              w = h.className,
              m = kr(this.props, "hidden") ? "url(#".concat(s, ")") : void 0,
              v = uw(
                uw({ clipPath: m }, ae(this.props, !0)),
                {},
                { cx: p, cy: d }
              );
            return A.createElement(
              qe,
              { className: se("recharts-reference-dot", w) },
              t.renderDot(y, v),
              lt.renderCallByParent(this.props, {
                x: p - a,
                y: d - a,
                width: 2 * a,
                height: 2 * a,
              })
            );
          },
        },
      ])
    );
  })(A.Component);
yf(gf, "displayName", "ReferenceDot");
yf(gf, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#fff",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1,
});
yf(gf, "renderDot", function (e, t) {
  var r;
  return (
    A.isValidElement(e)
      ? (r = A.cloneElement(e, t))
      : te(e)
        ? (r = e(t))
        : (r = A.createElement(
            XP,
            Lh({}, t, {
              cx: t.cx,
              cy: t.cy,
              className: "recharts-reference-dot-dot",
            })
          )),
    r
  );
});
function Fh() {
  return (
    (Fh = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Fh.apply(this, arguments)
  );
}
function To(e) {
  "@babel/helpers - typeof";
  return (
    (To =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    To(e)
  );
}
function sw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function lw(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? sw(Object(r), !0).forEach(function (n) {
          bf(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : sw(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function fK(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function pK(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, wA(n.key), n);
  }
}
function dK(e, t, r) {
  return (
    t && pK(e.prototype, t),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function hK(e, t, r) {
  return (
    (t = uc(t)),
    vK(
      e,
      bA() ? Reflect.construct(t, r || [], uc(e).constructor) : t.apply(e, r)
    )
  );
}
function vK(e, t) {
  if (t && (To(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return mK(e);
}
function mK(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function bA() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch {}
  return (bA = function () {
    return !!e;
  })();
}
function uc(e) {
  return (
    (uc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }),
    uc(e)
  );
}
function yK(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && Bh(e, t);
}
function Bh(e, t) {
  return (
    (Bh = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n;
        }),
    Bh(e, t)
  );
}
function bf(e, t, r) {
  return (
    (t = wA(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function wA(e) {
  var t = gK(e, "string");
  return To(t) == "symbol" ? t : t + "";
}
function gK(e, t) {
  if (To(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (To(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var bK = function (t, r, n, i, o) {
    var a = o.x1,
      u = o.x2,
      s = o.y1,
      l = o.y2,
      f = o.xAxis,
      c = o.yAxis;
    if (!f || !c) return null;
    var p = Jm({ x: f.scale, y: c.scale }),
      d = {
        x: t ? p.x.apply(a, { position: "start" }) : p.x.rangeMin,
        y: n ? p.y.apply(s, { position: "start" }) : p.y.rangeMin,
      },
      h = {
        x: r ? p.x.apply(u, { position: "end" }) : p.x.rangeMax,
        y: i ? p.y.apply(l, { position: "end" }) : p.y.rangeMax,
      };
    return kr(o, "discard") && (!p.isInRange(d) || !p.isInRange(h))
      ? null
      : aA(d, h);
  },
  wf = (function (e) {
    function t() {
      return fK(this, t), hK(this, t, arguments);
    }
    return (
      yK(t, e),
      dK(t, [
        {
          key: "render",
          value: function () {
            var n = this.props,
              i = n.x1,
              o = n.x2,
              a = n.y1,
              u = n.y2,
              s = n.className,
              l = n.alwaysShow,
              f = n.clipPathId;
            Vr(
              l === void 0,
              'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'
            );
            var c = Ue(i),
              p = Ue(o),
              d = Ue(a),
              h = Ue(u),
              y = this.props.shape;
            if (!c && !p && !d && !h && !y) return null;
            var w = bK(c, p, d, h, this.props);
            if (!w && !y) return null;
            var m = kr(this.props, "hidden") ? "url(#".concat(f, ")") : void 0;
            return A.createElement(
              qe,
              { className: se("recharts-reference-area", s) },
              t.renderRect(y, lw(lw({ clipPath: m }, ae(this.props, !0)), w)),
              lt.renderCallByParent(this.props, w)
            );
          },
        },
      ])
    );
  })(A.Component);
bf(wf, "displayName", "ReferenceArea");
bf(wf, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#ccc",
  fillOpacity: 0.5,
  stroke: "none",
  strokeWidth: 1,
});
bf(wf, "renderRect", function (e, t) {
  var r;
  return (
    A.isValidElement(e)
      ? (r = A.cloneElement(e, t))
      : te(e)
        ? (r = e(t))
        : (r = A.createElement(
            Zm,
            Fh({}, t, { className: "recharts-reference-area-rect" })
          )),
    r
  );
});
function xA(e, t, r) {
  if (t < 1) return [];
  if (t === 1 && r === void 0) return e;
  for (var n = [], i = 0; i < e.length; i += t) n.push(e[i]);
  return n;
}
function wK(e, t, r) {
  var n = { width: e.width + t.width, height: e.height + t.height };
  return hq(n, r);
}
function xK(e, t, r) {
  var n = r === "width",
    i = e.x,
    o = e.y,
    a = e.width,
    u = e.height;
  return t === 1
    ? { start: n ? i : o, end: n ? i + a : o + u }
    : { start: n ? i + a : o + u, end: n ? i : o };
}
function sc(e, t, r, n, i) {
  if (e * t < e * n || e * t > e * i) return !1;
  var o = r();
  return e * (t - (e * o) / 2 - n) >= 0 && e * (t + (e * o) / 2 - i) <= 0;
}
function SK(e, t) {
  return xA(e, t + 1);
}
function OK(e, t, r, n, i) {
  for (
    var o = (n || []).slice(),
      a = t.start,
      u = t.end,
      s = 0,
      l = 1,
      f = a,
      c = function () {
        var h = n == null ? void 0 : n[s];
        if (h === void 0) return { v: xA(n, l) };
        var y = s,
          w,
          m = function () {
            return w === void 0 && (w = r(h, y)), w;
          },
          v = h.coordinate,
          g = s === 0 || sc(e, v, m, f, u);
        g || ((s = 0), (f = a), (l += 1)),
          g && ((f = v + e * (m() / 2 + i)), (s += l));
      },
      p;
    l <= o.length;

  )
    if (((p = c()), p)) return p.v;
  return [];
}
function ku(e) {
  "@babel/helpers - typeof";
  return (
    (ku =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    ku(e)
  );
}
function cw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function ut(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? cw(Object(r), !0).forEach(function (n) {
          _K(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : cw(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function _K(e, t, r) {
  return (
    (t = PK(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function PK(e) {
  var t = AK(e, "string");
  return ku(t) == "symbol" ? t : t + "";
}
function AK(e, t) {
  if (ku(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ku(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function EK(e, t, r, n, i) {
  for (
    var o = (n || []).slice(),
      a = o.length,
      u = t.start,
      s = t.end,
      l = function (p) {
        var d = o[p],
          h,
          y = function () {
            return h === void 0 && (h = r(d, p)), h;
          };
        if (p === a - 1) {
          var w = e * (d.coordinate + (e * y()) / 2 - s);
          o[p] = d = ut(
            ut({}, d),
            {},
            { tickCoord: w > 0 ? d.coordinate - w * e : d.coordinate }
          );
        } else o[p] = d = ut(ut({}, d), {}, { tickCoord: d.coordinate });
        var m = sc(e, d.tickCoord, y, u, s);
        m &&
          ((s = d.tickCoord - e * (y() / 2 + i)),
          (o[p] = ut(ut({}, d), {}, { isShow: !0 })));
      },
      f = a - 1;
    f >= 0;
    f--
  )
    l(f);
  return o;
}
function IK(e, t, r, n, i, o) {
  var a = (n || []).slice(),
    u = a.length,
    s = t.start,
    l = t.end;
  if (o) {
    var f = n[u - 1],
      c = r(f, u - 1),
      p = e * (f.coordinate + (e * c) / 2 - l);
    a[u - 1] = f = ut(
      ut({}, f),
      {},
      { tickCoord: p > 0 ? f.coordinate - p * e : f.coordinate }
    );
    var d = sc(
      e,
      f.tickCoord,
      function () {
        return c;
      },
      s,
      l
    );
    d &&
      ((l = f.tickCoord - e * (c / 2 + i)),
      (a[u - 1] = ut(ut({}, f), {}, { isShow: !0 })));
  }
  for (
    var h = o ? u - 1 : u,
      y = function (v) {
        var g = a[v],
          S,
          b = function () {
            return S === void 0 && (S = r(g, v)), S;
          };
        if (v === 0) {
          var x = e * (g.coordinate - (e * b()) / 2 - s);
          a[v] = g = ut(
            ut({}, g),
            {},
            { tickCoord: x < 0 ? g.coordinate - x * e : g.coordinate }
          );
        } else a[v] = g = ut(ut({}, g), {}, { tickCoord: g.coordinate });
        var O = sc(e, g.tickCoord, b, s, l);
        O &&
          ((s = g.tickCoord + e * (b() / 2 + i)),
          (a[v] = ut(ut({}, g), {}, { isShow: !0 })));
      },
      w = 0;
    w < h;
    w++
  )
    y(w);
  return a;
}
function ay(e, t, r) {
  var n = e.tick,
    i = e.ticks,
    o = e.viewBox,
    a = e.minTickGap,
    u = e.orientation,
    s = e.interval,
    l = e.tickFormatter,
    f = e.unit,
    c = e.angle;
  if (!i || !i.length || !n) return [];
  if (W(s) || En.isSsr) return SK(i, typeof s == "number" && W(s) ? s : 0);
  var p = [],
    d = u === "top" || u === "bottom" ? "width" : "height",
    h =
      f && d === "width"
        ? ka(f, { fontSize: t, letterSpacing: r })
        : { width: 0, height: 0 },
    y = function (g, S) {
      var b = te(l) ? l(g.value, S) : g.value;
      return d === "width"
        ? wK(ka(b, { fontSize: t, letterSpacing: r }), h, c)
        : ka(b, { fontSize: t, letterSpacing: r })[d];
    },
    w = i.length >= 2 ? yr(i[1].coordinate - i[0].coordinate) : 1,
    m = xK(o, w, d);
  return s === "equidistantPreserveStart"
    ? OK(w, m, y, i, a)
    : (s === "preserveStart" || s === "preserveStartEnd"
        ? (p = IK(w, m, y, i, a, s === "preserveStartEnd"))
        : (p = EK(w, m, y, i, a)),
      p.filter(function (v) {
        return v.isShow;
      }));
}
var TK = ["viewBox"],
  $K = ["viewBox"],
  CK = ["ticks"];
function $o(e) {
  "@babel/helpers - typeof";
  return (
    ($o =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    $o(e)
  );
}
function Ki() {
  return (
    (Ki = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Ki.apply(this, arguments)
  );
}
function fw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function mt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? fw(Object(r), !0).forEach(function (n) {
          uy(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : fw(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function Pp(e, t) {
  if (e == null) return {};
  var r = kK(e, t),
    n,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (n = o[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n]);
  }
  return r;
}
function kK(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function jK(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function pw(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, OA(n.key), n);
  }
}
function MK(e, t, r) {
  return (
    t && pw(e.prototype, t),
    r && pw(e, r),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function NK(e, t, r) {
  return (
    (t = lc(t)),
    DK(
      e,
      SA() ? Reflect.construct(t, r || [], lc(e).constructor) : t.apply(e, r)
    )
  );
}
function DK(e, t) {
  if (t && ($o(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return LK(e);
}
function LK(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function SA() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch {}
  return (SA = function () {
    return !!e;
  })();
}
function lc(e) {
  return (
    (lc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }),
    lc(e)
  );
}
function RK(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && zh(e, t);
}
function zh(e, t) {
  return (
    (zh = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n;
        }),
    zh(e, t)
  );
}
function uy(e, t, r) {
  return (
    (t = OA(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function OA(e) {
  var t = FK(e, "string");
  return $o(t) == "symbol" ? t : t + "";
}
function FK(e, t) {
  if ($o(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if ($o(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Qo = (function (e) {
  function t(r) {
    var n;
    return (
      jK(this, t),
      (n = NK(this, t, [r])),
      (n.state = { fontSize: "", letterSpacing: "" }),
      n
    );
  }
  return (
    RK(t, e),
    MK(
      t,
      [
        {
          key: "shouldComponentUpdate",
          value: function (n, i) {
            var o = n.viewBox,
              a = Pp(n, TK),
              u = this.props,
              s = u.viewBox,
              l = Pp(u, $K);
            return !ro(o, s) || !ro(a, l) || !ro(i, this.state);
          },
        },
        {
          key: "componentDidMount",
          value: function () {
            var n = this.layerReference;
            if (n) {
              var i = n.getElementsByClassName(
                "recharts-cartesian-axis-tick-value"
              )[0];
              i &&
                this.setState({
                  fontSize: window.getComputedStyle(i).fontSize,
                  letterSpacing: window.getComputedStyle(i).letterSpacing,
                });
            }
          },
        },
        {
          key: "getTickLineCoord",
          value: function (n) {
            var i = this.props,
              o = i.x,
              a = i.y,
              u = i.width,
              s = i.height,
              l = i.orientation,
              f = i.tickSize,
              c = i.mirror,
              p = i.tickMargin,
              d,
              h,
              y,
              w,
              m,
              v,
              g = c ? -1 : 1,
              S = n.tickSize || f,
              b = W(n.tickCoord) ? n.tickCoord : n.coordinate;
            switch (l) {
              case "top":
                (d = h = n.coordinate),
                  (w = a + +!c * s),
                  (y = w - g * S),
                  (v = y - g * p),
                  (m = b);
                break;
              case "left":
                (y = w = n.coordinate),
                  (h = o + +!c * u),
                  (d = h - g * S),
                  (m = d - g * p),
                  (v = b);
                break;
              case "right":
                (y = w = n.coordinate),
                  (h = o + +c * u),
                  (d = h + g * S),
                  (m = d + g * p),
                  (v = b);
                break;
              default:
                (d = h = n.coordinate),
                  (w = a + +c * s),
                  (y = w + g * S),
                  (v = y + g * p),
                  (m = b);
                break;
            }
            return {
              line: { x1: d, y1: y, x2: h, y2: w },
              tick: { x: m, y: v },
            };
          },
        },
        {
          key: "getTickTextAnchor",
          value: function () {
            var n = this.props,
              i = n.orientation,
              o = n.mirror,
              a;
            switch (i) {
              case "left":
                a = o ? "start" : "end";
                break;
              case "right":
                a = o ? "end" : "start";
                break;
              default:
                a = "middle";
                break;
            }
            return a;
          },
        },
        {
          key: "getTickVerticalAnchor",
          value: function () {
            var n = this.props,
              i = n.orientation,
              o = n.mirror,
              a = "end";
            switch (i) {
              case "left":
              case "right":
                a = "middle";
                break;
              case "top":
                a = o ? "start" : "end";
                break;
              default:
                a = o ? "end" : "start";
                break;
            }
            return a;
          },
        },
        {
          key: "renderAxisLine",
          value: function () {
            var n = this.props,
              i = n.x,
              o = n.y,
              a = n.width,
              u = n.height,
              s = n.orientation,
              l = n.mirror,
              f = n.axisLine,
              c = mt(
                mt(mt({}, ae(this.props, !1)), ae(f, !1)),
                {},
                { fill: "none" }
              );
            if (s === "top" || s === "bottom") {
              var p = +((s === "top" && !l) || (s === "bottom" && l));
              c = mt(
                mt({}, c),
                {},
                { x1: i, y1: o + p * u, x2: i + a, y2: o + p * u }
              );
            } else {
              var d = +((s === "left" && !l) || (s === "right" && l));
              c = mt(
                mt({}, c),
                {},
                { x1: i + d * a, y1: o, x2: i + d * a, y2: o + u }
              );
            }
            return A.createElement(
              "line",
              Ki({}, c, {
                className: se(
                  "recharts-cartesian-axis-line",
                  ir(f, "className")
                ),
              })
            );
          },
        },
        {
          key: "renderTicks",
          value: function (n, i, o) {
            var a = this,
              u = this.props,
              s = u.tickLine,
              l = u.stroke,
              f = u.tick,
              c = u.tickFormatter,
              p = u.unit,
              d = ay(mt(mt({}, this.props), {}, { ticks: n }), i, o),
              h = this.getTickTextAnchor(),
              y = this.getTickVerticalAnchor(),
              w = ae(this.props, !1),
              m = ae(f, !1),
              v = mt(mt({}, w), {}, { fill: "none" }, ae(s, !1)),
              g = d.map(function (S, b) {
                var x = a.getTickLineCoord(S),
                  O = x.line,
                  _ = x.tick,
                  P = mt(
                    mt(
                      mt(
                        mt({ textAnchor: h, verticalAnchor: y }, w),
                        {},
                        { stroke: "none", fill: l },
                        m
                      ),
                      _
                    ),
                    {},
                    {
                      index: b,
                      payload: S,
                      visibleTicksCount: d.length,
                      tickFormatter: c,
                    }
                  );
                return A.createElement(
                  qe,
                  Ki(
                    {
                      className: "recharts-cartesian-axis-tick",
                      key: "tick-"
                        .concat(S.value, "-")
                        .concat(S.coordinate, "-")
                        .concat(S.tickCoord),
                    },
                    yl(a.props, S, b)
                  ),
                  s &&
                    A.createElement(
                      "line",
                      Ki({}, v, O, {
                        className: se(
                          "recharts-cartesian-axis-tick-line",
                          ir(s, "className")
                        ),
                      })
                    ),
                  f &&
                    t.renderTickItem(
                      f,
                      P,
                      "".concat(te(c) ? c(S.value, b) : S.value).concat(p || "")
                    )
                );
              });
            return A.createElement(
              "g",
              { className: "recharts-cartesian-axis-ticks" },
              g
            );
          },
        },
        {
          key: "render",
          value: function () {
            var n = this,
              i = this.props,
              o = i.axisLine,
              a = i.width,
              u = i.height,
              s = i.ticksGenerator,
              l = i.className,
              f = i.hide;
            if (f) return null;
            var c = this.props,
              p = c.ticks,
              d = Pp(c, CK),
              h = p;
            return (
              te(s) && (h = p && p.length > 0 ? s(this.props) : s(d)),
              a <= 0 || u <= 0 || !h || !h.length
                ? null
                : A.createElement(
                    qe,
                    {
                      className: se("recharts-cartesian-axis", l),
                      ref: function (w) {
                        n.layerReference = w;
                      },
                    },
                    o && this.renderAxisLine(),
                    this.renderTicks(
                      h,
                      this.state.fontSize,
                      this.state.letterSpacing
                    ),
                    lt.renderCallByParent(this.props)
                  )
            );
          },
        },
      ],
      [
        {
          key: "renderTickItem",
          value: function (n, i, o) {
            var a;
            return (
              A.isValidElement(n)
                ? (a = A.cloneElement(n, i))
                : te(n)
                  ? (a = n(i))
                  : (a = A.createElement(
                      Cl,
                      Ki({}, i, {
                        className: "recharts-cartesian-axis-tick-value",
                      }),
                      o
                    )),
              a
            );
          },
        },
      ]
    )
  );
})(z.Component);
uy(Qo, "displayName", "CartesianAxis");
uy(Qo, "defaultProps", {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: { x: 0, y: 0, width: 0, height: 0 },
  orientation: "bottom",
  ticks: [],
  stroke: "#666",
  tickLine: !0,
  axisLine: !0,
  tick: !0,
  mirror: !1,
  minTickGap: 5,
  tickSize: 6,
  tickMargin: 2,
  interval: "preserveEnd",
});
var BK = ["x1", "y1", "x2", "y2", "key"],
  zK = ["offset"];
function gi(e) {
  "@babel/helpers - typeof";
  return (
    (gi =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    gi(e)
  );
}
function dw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function ct(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? dw(Object(r), !0).forEach(function (n) {
          UK(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : dw(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function UK(e, t, r) {
  return (
    (t = WK(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function WK(e) {
  var t = HK(e, "string");
  return gi(t) == "symbol" ? t : t + "";
}
function HK(e, t) {
  if (gi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (gi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ni() {
  return (
    (ni = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    ni.apply(this, arguments)
  );
}
function hw(e, t) {
  if (e == null) return {};
  var r = GK(e, t),
    n,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (n = o[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n]);
  }
  return r;
}
function GK(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var VK = function (t) {
  var r = t.fill;
  if (!r || r === "none") return null;
  var n = t.fillOpacity,
    i = t.x,
    o = t.y,
    a = t.width,
    u = t.height,
    s = t.ry;
  return A.createElement("rect", {
    x: i,
    y: o,
    ry: s,
    width: a,
    height: u,
    stroke: "none",
    fill: r,
    fillOpacity: n,
    className: "recharts-cartesian-grid-bg",
  });
};
function _A(e, t) {
  var r;
  if (A.isValidElement(e)) r = A.cloneElement(e, t);
  else if (te(e)) r = e(t);
  else {
    var n = t.x1,
      i = t.y1,
      o = t.x2,
      a = t.y2,
      u = t.key,
      s = hw(t, BK),
      l = ae(s, !1);
    l.offset;
    var f = hw(l, zK);
    r = A.createElement(
      "line",
      ni({}, f, { x1: n, y1: i, x2: o, y2: a, fill: "none", key: u })
    );
  }
  return r;
}
function qK(e) {
  var t = e.x,
    r = e.width,
    n = e.horizontal,
    i = n === void 0 ? !0 : n,
    o = e.horizontalPoints;
  if (!i || !o || !o.length) return null;
  var a = o.map(function (u, s) {
    var l = ct(
      ct({}, e),
      {},
      { x1: t, y1: u, x2: t + r, y2: u, key: "line-".concat(s), index: s }
    );
    return _A(i, l);
  });
  return A.createElement(
    "g",
    { className: "recharts-cartesian-grid-horizontal" },
    a
  );
}
function KK(e) {
  var t = e.y,
    r = e.height,
    n = e.vertical,
    i = n === void 0 ? !0 : n,
    o = e.verticalPoints;
  if (!i || !o || !o.length) return null;
  var a = o.map(function (u, s) {
    var l = ct(
      ct({}, e),
      {},
      { x1: u, y1: t, x2: u, y2: t + r, key: "line-".concat(s), index: s }
    );
    return _A(i, l);
  });
  return A.createElement(
    "g",
    { className: "recharts-cartesian-grid-vertical" },
    a
  );
}
function XK(e) {
  var t = e.horizontalFill,
    r = e.fillOpacity,
    n = e.x,
    i = e.y,
    o = e.width,
    a = e.height,
    u = e.horizontalPoints,
    s = e.horizontal,
    l = s === void 0 ? !0 : s;
  if (!l || !t || !t.length) return null;
  var f = u
    .map(function (p) {
      return Math.round(p + i - i);
    })
    .sort(function (p, d) {
      return p - d;
    });
  i !== f[0] && f.unshift(0);
  var c = f.map(function (p, d) {
    var h = !f[d + 1],
      y = h ? i + a - p : f[d + 1] - p;
    if (y <= 0) return null;
    var w = d % t.length;
    return A.createElement("rect", {
      key: "react-".concat(d),
      y: p,
      x: n,
      height: y,
      width: o,
      stroke: "none",
      fill: t[w],
      fillOpacity: r,
      className: "recharts-cartesian-grid-bg",
    });
  });
  return A.createElement(
    "g",
    { className: "recharts-cartesian-gridstripes-horizontal" },
    c
  );
}
function YK(e) {
  var t = e.vertical,
    r = t === void 0 ? !0 : t,
    n = e.verticalFill,
    i = e.fillOpacity,
    o = e.x,
    a = e.y,
    u = e.width,
    s = e.height,
    l = e.verticalPoints;
  if (!r || !n || !n.length) return null;
  var f = l
    .map(function (p) {
      return Math.round(p + o - o);
    })
    .sort(function (p, d) {
      return p - d;
    });
  o !== f[0] && f.unshift(0);
  var c = f.map(function (p, d) {
    var h = !f[d + 1],
      y = h ? o + u - p : f[d + 1] - p;
    if (y <= 0) return null;
    var w = d % n.length;
    return A.createElement("rect", {
      key: "react-".concat(d),
      x: p,
      y: a,
      width: y,
      height: s,
      stroke: "none",
      fill: n[w],
      fillOpacity: i,
      className: "recharts-cartesian-grid-bg",
    });
  });
  return A.createElement(
    "g",
    { className: "recharts-cartesian-gridstripes-vertical" },
    c
  );
}
var QK = function (t, r) {
    var n = t.xAxis,
      i = t.width,
      o = t.height,
      a = t.offset;
    return kP(
      ay(
        ct(
          ct(ct({}, Qo.defaultProps), n),
          {},
          { ticks: Wr(n, !0), viewBox: { x: 0, y: 0, width: i, height: o } }
        )
      ),
      a.left,
      a.left + a.width,
      r
    );
  },
  ZK = function (t, r) {
    var n = t.yAxis,
      i = t.width,
      o = t.height,
      a = t.offset;
    return kP(
      ay(
        ct(
          ct(ct({}, Qo.defaultProps), n),
          {},
          { ticks: Wr(n, !0), viewBox: { x: 0, y: 0, width: i, height: o } }
        )
      ),
      a.top,
      a.top + a.height,
      r
    );
  },
  ji = {
    horizontal: !0,
    vertical: !0,
    horizontalPoints: [],
    verticalPoints: [],
    stroke: "#ccc",
    fill: "none",
    verticalFill: [],
    horizontalFill: [],
  };
function PA(e) {
  var t,
    r,
    n,
    i,
    o,
    a,
    u = ry(),
    s = ny(),
    l = Fq(),
    f = ct(
      ct({}, e),
      {},
      {
        stroke: (t = e.stroke) !== null && t !== void 0 ? t : ji.stroke,
        fill: (r = e.fill) !== null && r !== void 0 ? r : ji.fill,
        horizontal:
          (n = e.horizontal) !== null && n !== void 0 ? n : ji.horizontal,
        horizontalFill:
          (i = e.horizontalFill) !== null && i !== void 0
            ? i
            : ji.horizontalFill,
        vertical: (o = e.vertical) !== null && o !== void 0 ? o : ji.vertical,
        verticalFill:
          (a = e.verticalFill) !== null && a !== void 0 ? a : ji.verticalFill,
        x: W(e.x) ? e.x : l.left,
        y: W(e.y) ? e.y : l.top,
        width: W(e.width) ? e.width : l.width,
        height: W(e.height) ? e.height : l.height,
      }
    ),
    c = f.x,
    p = f.y,
    d = f.width,
    h = f.height,
    y = f.syncWithTicks,
    w = f.horizontalValues,
    m = f.verticalValues,
    v = Dq(),
    g = Lq();
  if (
    !W(d) ||
    d <= 0 ||
    !W(h) ||
    h <= 0 ||
    !W(c) ||
    c !== +c ||
    !W(p) ||
    p !== +p
  )
    return null;
  var S = f.verticalCoordinatesGenerator || QK,
    b = f.horizontalCoordinatesGenerator || ZK,
    x = f.horizontalPoints,
    O = f.verticalPoints;
  if ((!x || !x.length) && te(b)) {
    var _ = w && w.length,
      P = b(
        {
          yAxis: g ? ct(ct({}, g), {}, { ticks: _ ? w : g.ticks }) : void 0,
          width: u,
          height: s,
          offset: l,
        },
        _ ? !0 : y
      );
    Vr(
      Array.isArray(P),
      "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(
        gi(P),
        "]"
      )
    ),
      Array.isArray(P) && (x = P);
  }
  if ((!O || !O.length) && te(S)) {
    var I = m && m.length,
      E = S(
        {
          xAxis: v ? ct(ct({}, v), {}, { ticks: I ? m : v.ticks }) : void 0,
          width: u,
          height: s,
          offset: l,
        },
        I ? !0 : y
      );
    Vr(
      Array.isArray(E),
      "verticalCoordinatesGenerator should return Array but instead it returned [".concat(
        gi(E),
        "]"
      )
    ),
      Array.isArray(E) && (O = E);
  }
  return A.createElement(
    "g",
    { className: "recharts-cartesian-grid" },
    A.createElement(VK, {
      fill: f.fill,
      fillOpacity: f.fillOpacity,
      x: f.x,
      y: f.y,
      width: f.width,
      height: f.height,
      ry: f.ry,
    }),
    A.createElement(
      qK,
      ni({}, f, { offset: l, horizontalPoints: x, xAxis: v, yAxis: g })
    ),
    A.createElement(
      KK,
      ni({}, f, { offset: l, verticalPoints: O, xAxis: v, yAxis: g })
    ),
    A.createElement(XK, ni({}, f, { horizontalPoints: x })),
    A.createElement(YK, ni({}, f, { verticalPoints: O }))
  );
}
PA.displayName = "CartesianGrid";
function Co(e) {
  "@babel/helpers - typeof";
  return (
    (Co =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Co(e)
  );
}
function JK(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function eX(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, IA(n.key), n);
  }
}
function tX(e, t, r) {
  return (
    t && eX(e.prototype, t),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function rX(e, t, r) {
  return (
    (t = cc(t)),
    nX(
      e,
      AA() ? Reflect.construct(t, r || [], cc(e).constructor) : t.apply(e, r)
    )
  );
}
function nX(e, t) {
  if (t && (Co(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return iX(e);
}
function iX(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function AA() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch {}
  return (AA = function () {
    return !!e;
  })();
}
function cc(e) {
  return (
    (cc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }),
    cc(e)
  );
}
function oX(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && Uh(e, t);
}
function Uh(e, t) {
  return (
    (Uh = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n;
        }),
    Uh(e, t)
  );
}
function EA(e, t, r) {
  return (
    (t = IA(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function IA(e) {
  var t = aX(e, "string");
  return Co(t) == "symbol" ? t : t + "";
}
function aX(e, t) {
  if (Co(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Co(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Wh() {
  return (
    (Wh = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Wh.apply(this, arguments)
  );
}
function uX(e) {
  var t = e.xAxisId,
    r = ry(),
    n = ny(),
    i = dA(t);
  return i == null
    ? null
    : A.createElement(
        Qo,
        Wh({}, i, {
          className: se(
            "recharts-".concat(i.axisType, " ").concat(i.axisType),
            i.className
          ),
          viewBox: { x: 0, y: 0, width: r, height: n },
          ticksGenerator: function (a) {
            return Wr(a, !0);
          },
        })
      );
}
var xf = (function (e) {
  function t() {
    return JK(this, t), rX(this, t, arguments);
  }
  return (
    oX(t, e),
    tX(t, [
      {
        key: "render",
        value: function () {
          return A.createElement(uX, this.props);
        },
      },
    ])
  );
})(A.Component);
EA(xf, "displayName", "XAxis");
EA(xf, "defaultProps", {
  allowDecimals: !0,
  hide: !1,
  orientation: "bottom",
  width: 0,
  height: 30,
  mirror: !1,
  xAxisId: 0,
  tickCount: 5,
  type: "category",
  padding: { left: 0, right: 0 },
  allowDataOverflow: !1,
  scale: "auto",
  reversed: !1,
  allowDuplicatedCategory: !0,
});
function ko(e) {
  "@babel/helpers - typeof";
  return (
    (ko =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    ko(e)
  );
}
function sX(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function lX(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, CA(n.key), n);
  }
}
function cX(e, t, r) {
  return (
    t && lX(e.prototype, t),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function fX(e, t, r) {
  return (
    (t = fc(t)),
    pX(
      e,
      TA() ? Reflect.construct(t, r || [], fc(e).constructor) : t.apply(e, r)
    )
  );
}
function pX(e, t) {
  if (t && (ko(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return dX(e);
}
function dX(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function TA() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch {}
  return (TA = function () {
    return !!e;
  })();
}
function fc(e) {
  return (
    (fc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }),
    fc(e)
  );
}
function hX(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && Hh(e, t);
}
function Hh(e, t) {
  return (
    (Hh = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n;
        }),
    Hh(e, t)
  );
}
function $A(e, t, r) {
  return (
    (t = CA(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function CA(e) {
  var t = vX(e, "string");
  return ko(t) == "symbol" ? t : t + "";
}
function vX(e, t) {
  if (ko(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ko(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Gh() {
  return (
    (Gh = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Gh.apply(this, arguments)
  );
}
var mX = function (t) {
    var r = t.yAxisId,
      n = ry(),
      i = ny(),
      o = hA(r);
    return o == null
      ? null
      : A.createElement(
          Qo,
          Gh({}, o, {
            className: se(
              "recharts-".concat(o.axisType, " ").concat(o.axisType),
              o.className
            ),
            viewBox: { x: 0, y: 0, width: n, height: i },
            ticksGenerator: function (u) {
              return Wr(u, !0);
            },
          })
        );
  },
  Sf = (function (e) {
    function t() {
      return sX(this, t), fX(this, t, arguments);
    }
    return (
      hX(t, e),
      cX(t, [
        {
          key: "render",
          value: function () {
            return A.createElement(mX, this.props);
          },
        },
      ])
    );
  })(A.Component);
$A(Sf, "displayName", "YAxis");
$A(Sf, "defaultProps", {
  allowDuplicatedCategory: !0,
  allowDecimals: !0,
  hide: !1,
  orientation: "left",
  width: 60,
  height: 0,
  mirror: !1,
  yAxisId: 0,
  tickCount: 5,
  type: "number",
  padding: { top: 0, bottom: 0 },
  allowDataOverflow: !1,
  scale: "auto",
  reversed: !1,
});
function vw(e) {
  return wX(e) || bX(e) || gX(e) || yX();
}
function yX() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function gX(e, t) {
  if (e) {
    if (typeof e == "string") return Vh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Vh(e, t);
  }
}
function bX(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function wX(e) {
  if (Array.isArray(e)) return Vh(e);
}
function Vh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var qh = function (t, r, n, i, o) {
    var a = wr(t, oy),
      u = wr(t, gf),
      s = [].concat(vw(a), vw(u)),
      l = wr(t, wf),
      f = "".concat(i, "Id"),
      c = i[0],
      p = r;
    if (
      (s.length &&
        (p = s.reduce(function (y, w) {
          if (
            w.props[f] === n &&
            kr(w.props, "extendDomain") &&
            W(w.props[c])
          ) {
            var m = w.props[c];
            return [Math.min(y[0], m), Math.max(y[1], m)];
          }
          return y;
        }, p)),
      l.length)
    ) {
      var d = "".concat(c, "1"),
        h = "".concat(c, "2");
      p = l.reduce(function (y, w) {
        if (
          w.props[f] === n &&
          kr(w.props, "extendDomain") &&
          W(w.props[d]) &&
          W(w.props[h])
        ) {
          var m = w.props[d],
            v = w.props[h];
          return [Math.min(y[0], m, v), Math.max(y[1], m, v)];
        }
        return y;
      }, p);
    }
    return (
      o &&
        o.length &&
        (p = o.reduce(function (y, w) {
          return W(w) ? [Math.min(y[0], w), Math.max(y[1], w)] : y;
        }, p)),
      p
    );
  },
  kA = { exports: {} };
(function (e) {
  var t = Object.prototype.hasOwnProperty,
    r = "~";
  function n() {}
  Object.create &&
    ((n.prototype = Object.create(null)), new n().__proto__ || (r = !1));
  function i(s, l, f) {
    (this.fn = s), (this.context = l), (this.once = f || !1);
  }
  function o(s, l, f, c, p) {
    if (typeof f != "function")
      throw new TypeError("The listener must be a function");
    var d = new i(f, c || s, p),
      h = r ? r + l : l;
    return (
      s._events[h]
        ? s._events[h].fn
          ? (s._events[h] = [s._events[h], d])
          : s._events[h].push(d)
        : ((s._events[h] = d), s._eventsCount++),
      s
    );
  }
  function a(s, l) {
    --s._eventsCount === 0 ? (s._events = new n()) : delete s._events[l];
  }
  function u() {
    (this._events = new n()), (this._eventsCount = 0);
  }
  (u.prototype.eventNames = function () {
    var l = [],
      f,
      c;
    if (this._eventsCount === 0) return l;
    for (c in (f = this._events)) t.call(f, c) && l.push(r ? c.slice(1) : c);
    return Object.getOwnPropertySymbols
      ? l.concat(Object.getOwnPropertySymbols(f))
      : l;
  }),
    (u.prototype.listeners = function (l) {
      var f = r ? r + l : l,
        c = this._events[f];
      if (!c) return [];
      if (c.fn) return [c.fn];
      for (var p = 0, d = c.length, h = new Array(d); p < d; p++)
        h[p] = c[p].fn;
      return h;
    }),
    (u.prototype.listenerCount = function (l) {
      var f = r ? r + l : l,
        c = this._events[f];
      return c ? (c.fn ? 1 : c.length) : 0;
    }),
    (u.prototype.emit = function (l, f, c, p, d, h) {
      var y = r ? r + l : l;
      if (!this._events[y]) return !1;
      var w = this._events[y],
        m = arguments.length,
        v,
        g;
      if (w.fn) {
        switch ((w.once && this.removeListener(l, w.fn, void 0, !0), m)) {
          case 1:
            return w.fn.call(w.context), !0;
          case 2:
            return w.fn.call(w.context, f), !0;
          case 3:
            return w.fn.call(w.context, f, c), !0;
          case 4:
            return w.fn.call(w.context, f, c, p), !0;
          case 5:
            return w.fn.call(w.context, f, c, p, d), !0;
          case 6:
            return w.fn.call(w.context, f, c, p, d, h), !0;
        }
        for (g = 1, v = new Array(m - 1); g < m; g++) v[g - 1] = arguments[g];
        w.fn.apply(w.context, v);
      } else {
        var S = w.length,
          b;
        for (g = 0; g < S; g++)
          switch (
            (w[g].once && this.removeListener(l, w[g].fn, void 0, !0), m)
          ) {
            case 1:
              w[g].fn.call(w[g].context);
              break;
            case 2:
              w[g].fn.call(w[g].context, f);
              break;
            case 3:
              w[g].fn.call(w[g].context, f, c);
              break;
            case 4:
              w[g].fn.call(w[g].context, f, c, p);
              break;
            default:
              if (!v)
                for (b = 1, v = new Array(m - 1); b < m; b++)
                  v[b - 1] = arguments[b];
              w[g].fn.apply(w[g].context, v);
          }
      }
      return !0;
    }),
    (u.prototype.on = function (l, f, c) {
      return o(this, l, f, c, !1);
    }),
    (u.prototype.once = function (l, f, c) {
      return o(this, l, f, c, !0);
    }),
    (u.prototype.removeListener = function (l, f, c, p) {
      var d = r ? r + l : l;
      if (!this._events[d]) return this;
      if (!f) return a(this, d), this;
      var h = this._events[d];
      if (h.fn)
        h.fn === f && (!p || h.once) && (!c || h.context === c) && a(this, d);
      else {
        for (var y = 0, w = [], m = h.length; y < m; y++)
          (h[y].fn !== f || (p && !h[y].once) || (c && h[y].context !== c)) &&
            w.push(h[y]);
        w.length ? (this._events[d] = w.length === 1 ? w[0] : w) : a(this, d);
      }
      return this;
    }),
    (u.prototype.removeAllListeners = function (l) {
      var f;
      return (
        l
          ? ((f = r ? r + l : l), this._events[f] && a(this, f))
          : ((this._events = new n()), (this._eventsCount = 0)),
        this
      );
    }),
    (u.prototype.off = u.prototype.removeListener),
    (u.prototype.addListener = u.prototype.on),
    (u.prefixed = r),
    (u.EventEmitter = u),
    (e.exports = u);
})(kA);
var xX = kA.exports;
const SX = he(xX);
var Ap = new SX(),
  Ep = "recharts.syncMouseEvents";
function ju(e) {
  "@babel/helpers - typeof";
  return (
    (ju =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    ju(e)
  );
}
function OX(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function _X(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, jA(n.key), n);
  }
}
function PX(e, t, r) {
  return (
    t && _X(e.prototype, t),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function Ip(e, t, r) {
  return (
    (t = jA(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function jA(e) {
  var t = AX(e, "string");
  return ju(t) == "symbol" ? t : t + "";
}
function AX(e, t) {
  if (ju(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ju(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var EX = (function () {
  function e() {
    OX(this, e),
      Ip(this, "activeIndex", 0),
      Ip(this, "coordinateList", []),
      Ip(this, "layout", "horizontal");
  }
  return PX(e, [
    {
      key: "setDetails",
      value: function (r) {
        var n,
          i = r.coordinateList,
          o = i === void 0 ? null : i,
          a = r.container,
          u = a === void 0 ? null : a,
          s = r.layout,
          l = s === void 0 ? null : s,
          f = r.offset,
          c = f === void 0 ? null : f,
          p = r.mouseHandlerCallback,
          d = p === void 0 ? null : p;
        (this.coordinateList =
          (n = o ?? this.coordinateList) !== null && n !== void 0 ? n : []),
          (this.container = u ?? this.container),
          (this.layout = l ?? this.layout),
          (this.offset = c ?? this.offset),
          (this.mouseHandlerCallback = d ?? this.mouseHandlerCallback),
          (this.activeIndex = Math.min(
            Math.max(this.activeIndex, 0),
            this.coordinateList.length - 1
          ));
      },
    },
    {
      key: "focus",
      value: function () {
        this.spoofMouse();
      },
    },
    {
      key: "keyboardEvent",
      value: function (r) {
        if (this.coordinateList.length !== 0)
          switch (r.key) {
            case "ArrowRight": {
              if (this.layout !== "horizontal") return;
              (this.activeIndex = Math.min(
                this.activeIndex + 1,
                this.coordinateList.length - 1
              )),
                this.spoofMouse();
              break;
            }
            case "ArrowLeft": {
              if (this.layout !== "horizontal") return;
              (this.activeIndex = Math.max(this.activeIndex - 1, 0)),
                this.spoofMouse();
              break;
            }
          }
      },
    },
    {
      key: "setIndex",
      value: function (r) {
        this.activeIndex = r;
      },
    },
    {
      key: "spoofMouse",
      value: function () {
        var r, n;
        if (this.layout === "horizontal" && this.coordinateList.length !== 0) {
          var i = this.container.getBoundingClientRect(),
            o = i.x,
            a = i.y,
            u = i.height,
            s = this.coordinateList[this.activeIndex].coordinate,
            l =
              ((r = window) === null || r === void 0 ? void 0 : r.scrollX) || 0,
            f =
              ((n = window) === null || n === void 0 ? void 0 : n.scrollY) || 0,
            c = o + s + l,
            p = a + this.offset.top + u / 2 + f;
          this.mouseHandlerCallback({ pageX: c, pageY: p });
        }
      },
    },
  ]);
})();
function IX(e, t, r) {
  if (r === "number" && t === !0 && Array.isArray(e)) {
    var n = e == null ? void 0 : e[0],
      i = e == null ? void 0 : e[1];
    if (n && i && W(n) && W(i)) return !0;
  }
  return !1;
}
function TX(e, t, r, n) {
  var i = n / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: e === "horizontal" ? t.x - i : r.left + 0.5,
    y: e === "horizontal" ? r.top + 0.5 : t.y - i,
    width: e === "horizontal" ? n : r.width - 1,
    height: e === "horizontal" ? r.height - 1 : n,
  };
}
function MA(e) {
  var t = e.cx,
    r = e.cy,
    n = e.radius,
    i = e.startAngle,
    o = e.endAngle,
    a = Je(t, r, n, i),
    u = Je(t, r, n, o);
  return {
    points: [a, u],
    cx: t,
    cy: r,
    radius: n,
    startAngle: i,
    endAngle: o,
  };
}
function $X(e, t, r) {
  var n, i, o, a;
  if (e === "horizontal")
    (n = t.x), (o = n), (i = r.top), (a = r.top + r.height);
  else if (e === "vertical")
    (i = t.y), (a = i), (n = r.left), (o = r.left + r.width);
  else if (t.cx != null && t.cy != null)
    if (e === "centric") {
      var u = t.cx,
        s = t.cy,
        l = t.innerRadius,
        f = t.outerRadius,
        c = t.angle,
        p = Je(u, s, l, c),
        d = Je(u, s, f, c);
      (n = p.x), (i = p.y), (o = d.x), (a = d.y);
    } else return MA(t);
  return [
    { x: n, y: i },
    { x: o, y: a },
  ];
}
function Mu(e) {
  "@babel/helpers - typeof";
  return (
    (Mu =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Mu(e)
  );
}
function mw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function As(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? mw(Object(r), !0).forEach(function (n) {
          CX(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : mw(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function CX(e, t, r) {
  return (
    (t = kX(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function kX(e) {
  var t = jX(e, "string");
  return Mu(t) == "symbol" ? t : t + "";
}
function jX(e, t) {
  if (Mu(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Mu(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function MX(e) {
  var t,
    r,
    n = e.element,
    i = e.tooltipEventType,
    o = e.isActive,
    a = e.activeCoordinate,
    u = e.activePayload,
    s = e.offset,
    l = e.activeTooltipIndex,
    f = e.tooltipAxisBandSize,
    c = e.layout,
    p = e.chartName,
    d =
      (t = n.props.cursor) !== null && t !== void 0
        ? t
        : (r = n.type.defaultProps) === null || r === void 0
          ? void 0
          : r.cursor;
  if (!n || !d || !o || !a || (p !== "ScatterChart" && i !== "axis"))
    return null;
  var h,
    y = db;
  if (p === "ScatterChart") (h = a), (y = qH);
  else if (p === "BarChart") (h = TX(c, a, s, f)), (y = Zm);
  else if (c === "radial") {
    var w = MA(a),
      m = w.cx,
      v = w.cy,
      g = w.radius,
      S = w.startAngle,
      b = w.endAngle;
    (h = {
      cx: m,
      cy: v,
      startAngle: S,
      endAngle: b,
      innerRadius: g,
      outerRadius: g,
    }),
      (y = LP);
  } else (h = { points: $X(c, a, s) }), (y = db);
  var x = As(
    As(As(As({ stroke: "#ccc", pointerEvents: "none" }, s), h), ae(d, !1)),
    {},
    {
      payload: u,
      payloadIndex: l,
      className: se("recharts-tooltip-cursor", d.className),
    }
  );
  return z.isValidElement(d) ? z.cloneElement(d, x) : z.createElement(y, x);
}
var NX = ["item"],
  DX = [
    "children",
    "className",
    "width",
    "height",
    "style",
    "compact",
    "title",
    "desc",
  ];
function jo(e) {
  "@babel/helpers - typeof";
  return (
    (jo =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    jo(e)
  );
}
function Xi() {
  return (
    (Xi = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Xi.apply(this, arguments)
  );
}
function yw(e, t) {
  return FX(e) || RX(e, t) || DA(e, t) || LX();
}
function LX() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function RX(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (r != null) {
    var n,
      i,
      o,
      a,
      u = [],
      s = !0,
      l = !1;
    try {
      if (((o = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t);
          s = !0
        );
    } catch (f) {
      (l = !0), (i = f);
    } finally {
      try {
        if (!s && r.return != null && ((a = r.return()), Object(a) !== a))
          return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function FX(e) {
  if (Array.isArray(e)) return e;
}
function gw(e, t) {
  if (e == null) return {};
  var r = BX(e, t),
    n,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (n = o[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n]);
  }
  return r;
}
function BX(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function zX(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function UX(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, LA(n.key), n);
  }
}
function WX(e, t, r) {
  return (
    t && UX(e.prototype, t),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function HX(e, t, r) {
  return (
    (t = pc(t)),
    GX(
      e,
      NA() ? Reflect.construct(t, r || [], pc(e).constructor) : t.apply(e, r)
    )
  );
}
function GX(e, t) {
  if (t && (jo(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return VX(e);
}
function VX(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function NA() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch {}
  return (NA = function () {
    return !!e;
  })();
}
function pc(e) {
  return (
    (pc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }),
    pc(e)
  );
}
function qX(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && Kh(e, t);
}
function Kh(e, t) {
  return (
    (Kh = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n;
        }),
    Kh(e, t)
  );
}
function Mo(e) {
  return YX(e) || XX(e) || DA(e) || KX();
}
function KX() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function DA(e, t) {
  if (e) {
    if (typeof e == "string") return Xh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Xh(e, t);
  }
}
function XX(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function YX(e) {
  if (Array.isArray(e)) return Xh(e);
}
function Xh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function bw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function C(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? bw(Object(r), !0).forEach(function (n) {
          X(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : bw(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function X(e, t, r) {
  return (
    (t = LA(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function LA(e) {
  var t = QX(e, "string");
  return jo(t) == "symbol" ? t : t + "";
}
function QX(e, t) {
  if (jo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (jo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ZX = { xAxis: ["bottom", "top"], yAxis: ["left", "right"] },
  JX = { width: "100%", height: "100%" },
  RA = { x: 0, y: 0 };
function Es(e) {
  return e;
}
var eY = function (t, r) {
    return r === "horizontal"
      ? t.x
      : r === "vertical"
        ? t.y
        : r === "centric"
          ? t.angle
          : t.radius;
  },
  tY = function (t, r, n, i) {
    var o = r.find(function (f) {
      return f && f.index === n;
    });
    if (o) {
      if (t === "horizontal") return { x: o.coordinate, y: i.y };
      if (t === "vertical") return { x: i.x, y: o.coordinate };
      if (t === "centric") {
        var a = o.coordinate,
          u = i.radius;
        return C(
          C(C({}, i), Je(i.cx, i.cy, u, a)),
          {},
          { angle: a, radius: u }
        );
      }
      var s = o.coordinate,
        l = i.angle;
      return C(C(C({}, i), Je(i.cx, i.cy, s, l)), {}, { angle: l, radius: s });
    }
    return RA;
  },
  Of = function (t, r) {
    var n = r.graphicalItems,
      i = r.dataStartIndex,
      o = r.dataEndIndex,
      a = (n ?? []).reduce(function (u, s) {
        var l = s.props.data;
        return l && l.length ? [].concat(Mo(u), Mo(l)) : u;
      }, []);
    return a.length > 0
      ? a
      : t && t.length && W(i) && W(o)
        ? t.slice(i, o + 1)
        : [];
  };
function FA(e) {
  return e === "number" ? [0, "auto"] : void 0;
}
var Yh = function (t, r, n, i) {
    var o = t.graphicalItems,
      a = t.tooltipAxis,
      u = Of(r, t);
    return n < 0 || !o || !o.length || n >= u.length
      ? null
      : o.reduce(function (s, l) {
          var f,
            c = (f = l.props.data) !== null && f !== void 0 ? f : r;
          c &&
            t.dataStartIndex + t.dataEndIndex !== 0 &&
            t.dataEndIndex - t.dataStartIndex >= n &&
            (c = c.slice(t.dataStartIndex, t.dataEndIndex + 1));
          var p;
          if (a.dataKey && !a.allowDuplicatedCategory) {
            var d = c === void 0 ? u : c;
            p = Td(d, a.dataKey, i);
          } else p = (c && c[n]) || u[n];
          return p ? [].concat(Mo(s), [MP(l, p)]) : s;
        }, []);
  },
  ww = function (t, r, n, i) {
    var o = i || { x: t.chartX, y: t.chartY },
      a = eY(o, n),
      u = t.orderedTooltipTicks,
      s = t.tooltipAxis,
      l = t.tooltipTicks,
      f = F9(a, u, l, s);
    if (f >= 0 && l) {
      var c = l[f] && l[f].value,
        p = Yh(t, r, f, c),
        d = tY(n, u, f, o);
      return {
        activeTooltipIndex: f,
        activeLabel: c,
        activePayload: p,
        activeCoordinate: d,
      };
    }
    return null;
  },
  rY = function (t, r) {
    var n = r.axes,
      i = r.graphicalItems,
      o = r.axisType,
      a = r.axisIdKey,
      u = r.stackGroups,
      s = r.dataStartIndex,
      l = r.dataEndIndex,
      f = t.layout,
      c = t.children,
      p = t.stackOffset,
      d = CP(f, o);
    return n.reduce(function (h, y) {
      var w,
        m =
          y.type.defaultProps !== void 0
            ? C(C({}, y.type.defaultProps), y.props)
            : y.props,
        v = m.type,
        g = m.dataKey,
        S = m.allowDataOverflow,
        b = m.allowDuplicatedCategory,
        x = m.scale,
        O = m.ticks,
        _ = m.includeHidden,
        P = m[a];
      if (h[P]) return h;
      var I = Of(t.data, {
          graphicalItems: i.filter(function (U) {
            var K,
              re =
                a in U.props
                  ? U.props[a]
                  : (K = U.type.defaultProps) === null || K === void 0
                    ? void 0
                    : K[a];
            return re === P;
          }),
          dataStartIndex: s,
          dataEndIndex: l,
        }),
        E = I.length,
        $,
        M,
        N;
      IX(m.domain, S, v) &&
        (($ = mh(m.domain, null, S)),
        d && (v === "number" || x !== "auto") && (N = Ma(I, g, "category")));
      var j = FA(v);
      if (!$ || $.length === 0) {
        var D,
          L = (D = m.domain) !== null && D !== void 0 ? D : j;
        if (g) {
          if ((($ = Ma(I, g, v)), v === "category" && d)) {
            var T = Ej($);
            b && T
              ? ((M = $), ($ = ec(0, E)))
              : b ||
                ($ = eb(L, $, y).reduce(function (U, K) {
                  return U.indexOf(K) >= 0 ? U : [].concat(Mo(U), [K]);
                }, []));
          } else if (v === "category")
            b
              ? ($ = $.filter(function (U) {
                  return U !== "" && !ue(U);
                }))
              : ($ = eb(L, $, y).reduce(function (U, K) {
                  return U.indexOf(K) >= 0 || K === "" || ue(K)
                    ? U
                    : [].concat(Mo(U), [K]);
                }, []));
          else if (v === "number") {
            var k = H9(
              I,
              i.filter(function (U) {
                var K,
                  re,
                  Se =
                    a in U.props
                      ? U.props[a]
                      : (K = U.type.defaultProps) === null || K === void 0
                        ? void 0
                        : K[a],
                  ke =
                    "hide" in U.props
                      ? U.props.hide
                      : (re = U.type.defaultProps) === null || re === void 0
                        ? void 0
                        : re.hide;
                return Se === P && (_ || !ke);
              }),
              g,
              o,
              f
            );
            k && ($ = k);
          }
          d && (v === "number" || x !== "auto") && (N = Ma(I, g, "category"));
        } else
          d
            ? ($ = ec(0, E))
            : u && u[P] && u[P].hasStack && v === "number"
              ? ($ = p === "expand" ? [0, 1] : jP(u[P].stackGroups, s, l))
              : ($ = $P(
                  I,
                  i.filter(function (U) {
                    var K = a in U.props ? U.props[a] : U.type.defaultProps[a],
                      re =
                        "hide" in U.props
                          ? U.props.hide
                          : U.type.defaultProps.hide;
                    return K === P && (_ || !re);
                  }),
                  v,
                  f,
                  !0
                ));
        if (v === "number") ($ = qh(c, $, P, o, O)), L && ($ = mh(L, $, S));
        else if (v === "category" && L) {
          var F = L,
            H = $.every(function (U) {
              return F.indexOf(U) >= 0;
            });
          H && ($ = F);
        }
      }
      return C(
        C({}, h),
        {},
        X(
          {},
          P,
          C(
            C({}, m),
            {},
            {
              axisType: o,
              domain: $,
              categoricalDomain: N,
              duplicateDomain: M,
              originalDomain: (w = m.domain) !== null && w !== void 0 ? w : j,
              isCategorical: d,
              layout: f,
            }
          )
        )
      );
    }, {});
  },
  nY = function (t, r) {
    var n = r.graphicalItems,
      i = r.Axis,
      o = r.axisType,
      a = r.axisIdKey,
      u = r.stackGroups,
      s = r.dataStartIndex,
      l = r.dataEndIndex,
      f = t.layout,
      c = t.children,
      p = Of(t.data, { graphicalItems: n, dataStartIndex: s, dataEndIndex: l }),
      d = p.length,
      h = CP(f, o),
      y = -1;
    return n.reduce(function (w, m) {
      var v =
          m.type.defaultProps !== void 0
            ? C(C({}, m.type.defaultProps), m.props)
            : m.props,
        g = v[a],
        S = FA("number");
      if (!w[g]) {
        y++;
        var b;
        return (
          h
            ? (b = ec(0, d))
            : u && u[g] && u[g].hasStack
              ? ((b = jP(u[g].stackGroups, s, l)), (b = qh(c, b, g, o)))
              : ((b = mh(
                  S,
                  $P(
                    p,
                    n.filter(function (x) {
                      var O,
                        _,
                        P =
                          a in x.props
                            ? x.props[a]
                            : (O = x.type.defaultProps) === null || O === void 0
                              ? void 0
                              : O[a],
                        I =
                          "hide" in x.props
                            ? x.props.hide
                            : (_ = x.type.defaultProps) === null || _ === void 0
                              ? void 0
                              : _.hide;
                      return P === g && !I;
                    }),
                    "number",
                    f
                  ),
                  i.defaultProps.allowDataOverflow
                )),
                (b = qh(c, b, g, o))),
          C(
            C({}, w),
            {},
            X(
              {},
              g,
              C(
                C({ axisType: o }, i.defaultProps),
                {},
                {
                  hide: !0,
                  orientation: ir(ZX, "".concat(o, ".").concat(y % 2), null),
                  domain: b,
                  originalDomain: S,
                  isCategorical: h,
                  layout: f,
                }
              )
            )
          )
        );
      }
      return w;
    }, {});
  },
  iY = function (t, r) {
    var n = r.axisType,
      i = n === void 0 ? "xAxis" : n,
      o = r.AxisComp,
      a = r.graphicalItems,
      u = r.stackGroups,
      s = r.dataStartIndex,
      l = r.dataEndIndex,
      f = t.children,
      c = "".concat(i, "Id"),
      p = wr(f, o),
      d = {};
    return (
      p && p.length
        ? (d = rY(t, {
            axes: p,
            graphicalItems: a,
            axisType: i,
            axisIdKey: c,
            stackGroups: u,
            dataStartIndex: s,
            dataEndIndex: l,
          }))
        : a &&
          a.length &&
          (d = nY(t, {
            Axis: o,
            graphicalItems: a,
            axisType: i,
            axisIdKey: c,
            stackGroups: u,
            dataStartIndex: s,
            dataEndIndex: l,
          })),
      d
    );
  },
  oY = function (t) {
    var r = hn(t),
      n = Wr(r, !1, !0);
    return {
      tooltipTicks: n,
      orderedTooltipTicks: _m(n, function (i) {
        return i.coordinate;
      }),
      tooltipAxis: r,
      tooltipAxisBandSize: Gl(r, n),
    };
  },
  xw = function (t) {
    var r = t.children,
      n = t.defaultShowTooltip,
      i = Ut(r, Po),
      o = 0,
      a = 0;
    return (
      t.data && t.data.length !== 0 && (a = t.data.length - 1),
      i &&
        i.props &&
        (i.props.startIndex >= 0 && (o = i.props.startIndex),
        i.props.endIndex >= 0 && (a = i.props.endIndex)),
      {
        chartX: 0,
        chartY: 0,
        dataStartIndex: o,
        dataEndIndex: a,
        activeTooltipIndex: -1,
        isTooltipActive: !!n,
      }
    );
  },
  aY = function (t) {
    return !t || !t.length
      ? !1
      : t.some(function (r) {
          var n = Gr(r && r.type);
          return n && n.indexOf("Bar") >= 0;
        });
  },
  Sw = function (t) {
    return t === "horizontal"
      ? { numericAxisName: "yAxis", cateAxisName: "xAxis" }
      : t === "vertical"
        ? { numericAxisName: "xAxis", cateAxisName: "yAxis" }
        : t === "centric"
          ? { numericAxisName: "radiusAxis", cateAxisName: "angleAxis" }
          : { numericAxisName: "angleAxis", cateAxisName: "radiusAxis" };
  },
  uY = function (t, r) {
    var n = t.props,
      i = t.graphicalItems,
      o = t.xAxisMap,
      a = o === void 0 ? {} : o,
      u = t.yAxisMap,
      s = u === void 0 ? {} : u,
      l = n.width,
      f = n.height,
      c = n.children,
      p = n.margin || {},
      d = Ut(c, Po),
      h = Ut(c, no),
      y = Object.keys(s).reduce(
        function (b, x) {
          var O = s[x],
            _ = O.orientation;
          return !O.mirror && !O.hide
            ? C(C({}, b), {}, X({}, _, b[_] + O.width))
            : b;
        },
        { left: p.left || 0, right: p.right || 0 }
      ),
      w = Object.keys(a).reduce(
        function (b, x) {
          var O = a[x],
            _ = O.orientation;
          return !O.mirror && !O.hide
            ? C(C({}, b), {}, X({}, _, ir(b, "".concat(_)) + O.height))
            : b;
        },
        { top: p.top || 0, bottom: p.bottom || 0 }
      ),
      m = C(C({}, w), y),
      v = m.bottom;
    d && (m.bottom += d.props.height || Po.defaultProps.height),
      h && r && (m = U9(m, i, n, r));
    var g = l - m.left - m.right,
      S = f - m.top - m.bottom;
    return C(
      C({ brushBottom: v }, m),
      {},
      { width: Math.max(g, 0), height: Math.max(S, 0) }
    );
  },
  sY = function (t, r) {
    if (r === "xAxis") return t[r].width;
    if (r === "yAxis") return t[r].height;
  },
  lY = function (t) {
    var r = t.chartName,
      n = t.GraphicalChild,
      i = t.defaultTooltipEventType,
      o = i === void 0 ? "axis" : i,
      a = t.validateTooltipEventTypes,
      u = a === void 0 ? ["axis"] : a,
      s = t.axisComponents,
      l = t.legendContent,
      f = t.formatAxisMap,
      c = t.defaultProps,
      p = function (m, v) {
        var g = v.graphicalItems,
          S = v.stackGroups,
          b = v.offset,
          x = v.updateId,
          O = v.dataStartIndex,
          _ = v.dataEndIndex,
          P = m.barSize,
          I = m.layout,
          E = m.barGap,
          $ = m.barCategoryGap,
          M = m.maxBarSize,
          N = Sw(I),
          j = N.numericAxisName,
          D = N.cateAxisName,
          L = aY(g),
          T = [];
        return (
          g.forEach(function (k, F) {
            var H = Of(m.data, {
                graphicalItems: [k],
                dataStartIndex: O,
                dataEndIndex: _,
              }),
              U =
                k.type.defaultProps !== void 0
                  ? C(C({}, k.type.defaultProps), k.props)
                  : k.props,
              K = U.dataKey,
              re = U.maxBarSize,
              Se = U["".concat(j, "Id")],
              ke = U["".concat(D, "Id")],
              Xt = {},
              Et = s.reduce(function (zn, Un) {
                var _f = v["".concat(Un.axisType, "Map")],
                  sy = U["".concat(Un.axisType, "Id")];
                (_f && _f[sy]) || Un.axisType === "zAxis" || yi();
                var ly = _f[sy];
                return C(
                  C({}, zn),
                  {},
                  X(
                    X({}, Un.axisType, ly),
                    "".concat(Un.axisType, "Ticks"),
                    Wr(ly)
                  )
                );
              }, Xt),
              G = Et[D],
              Q = Et["".concat(D, "Ticks")],
              J = S && S[Se] && S[Se].hasStack && rU(k, S[Se].stackGroups),
              R = Gr(k.type).indexOf("Bar") >= 0,
              Ie = Gl(G, Q),
              ne = [],
              Le =
                L && B9({ barSize: P, stackGroups: S, totalSize: sY(Et, D) });
            if (R) {
              var Re,
                It,
                un = ue(re) ? M : re,
                Ii =
                  (Re =
                    (It = Gl(G, Q, !0)) !== null && It !== void 0 ? It : un) !==
                    null && Re !== void 0
                    ? Re
                    : 0;
              (ne = z9({
                barGap: E,
                barCategoryGap: $,
                bandSize: Ii !== Ie ? Ii : Ie,
                sizeList: Le[ke],
                maxBarSize: un,
              })),
                Ii !== Ie &&
                  (ne = ne.map(function (zn) {
                    return C(
                      C({}, zn),
                      {},
                      {
                        position: C(
                          C({}, zn.position),
                          {},
                          { offset: zn.position.offset - Ii / 2 }
                        ),
                      }
                    );
                  }));
            }
            var Ku = k && k.type && k.type.getComposedData;
            Ku &&
              T.push({
                props: C(
                  C(
                    {},
                    Ku(
                      C(
                        C({}, Et),
                        {},
                        {
                          displayedData: H,
                          props: m,
                          dataKey: K,
                          item: k,
                          bandSize: Ie,
                          barPosition: ne,
                          offset: b,
                          stackedData: J,
                          layout: I,
                          dataStartIndex: O,
                          dataEndIndex: _,
                        }
                      )
                    )
                  ),
                  {},
                  X(
                    X(
                      X({ key: k.key || "item-".concat(F) }, j, Et[j]),
                      D,
                      Et[D]
                    ),
                    "animationId",
                    x
                  )
                ),
                childIndex: Rj(k, m.children),
                item: k,
              });
          }),
          T
        );
      },
      d = function (m, v) {
        var g = m.props,
          S = m.dataStartIndex,
          b = m.dataEndIndex,
          x = m.updateId;
        if (!Kg({ props: g })) return null;
        var O = g.children,
          _ = g.layout,
          P = g.stackOffset,
          I = g.data,
          E = g.reverseStackOrder,
          $ = Sw(_),
          M = $.numericAxisName,
          N = $.cateAxisName,
          j = wr(O, n),
          D = J9(I, j, "".concat(M, "Id"), "".concat(N, "Id"), P, E),
          L = s.reduce(function (U, K) {
            var re = "".concat(K.axisType, "Map");
            return C(
              C({}, U),
              {},
              X(
                {},
                re,
                iY(
                  g,
                  C(
                    C({}, K),
                    {},
                    {
                      graphicalItems: j,
                      stackGroups: K.axisType === M && D,
                      dataStartIndex: S,
                      dataEndIndex: b,
                    }
                  )
                )
              )
            );
          }, {}),
          T = uY(
            C(C({}, L), {}, { props: g, graphicalItems: j }),
            v == null ? void 0 : v.legendBBox
          );
        Object.keys(L).forEach(function (U) {
          L[U] = f(g, L[U], T, U.replace("Map", ""), r);
        });
        var k = L["".concat(N, "Map")],
          F = oY(k),
          H = p(
            g,
            C(
              C({}, L),
              {},
              {
                dataStartIndex: S,
                dataEndIndex: b,
                updateId: x,
                graphicalItems: j,
                stackGroups: D,
                offset: T,
              }
            )
          );
        return C(
          C(
            {
              formattedGraphicalItems: H,
              graphicalItems: j,
              offset: T,
              stackGroups: D,
            },
            F
          ),
          L
        );
      },
      h = (function (w) {
        function m(v) {
          var g, S, b;
          return (
            zX(this, m),
            (b = HX(this, m, [v])),
            X(b, "eventEmitterSymbol", Symbol("rechartsEventEmitter")),
            X(b, "accessibilityManager", new EX()),
            X(b, "handleLegendBBoxUpdate", function (x) {
              if (x) {
                var O = b.state,
                  _ = O.dataStartIndex,
                  P = O.dataEndIndex,
                  I = O.updateId;
                b.setState(
                  C(
                    { legendBBox: x },
                    d(
                      {
                        props: b.props,
                        dataStartIndex: _,
                        dataEndIndex: P,
                        updateId: I,
                      },
                      C(C({}, b.state), {}, { legendBBox: x })
                    )
                  )
                );
              }
            }),
            X(b, "handleReceiveSyncEvent", function (x, O, _) {
              if (b.props.syncId === x) {
                if (
                  _ === b.eventEmitterSymbol &&
                  typeof b.props.syncMethod != "function"
                )
                  return;
                b.applySyncEvent(O);
              }
            }),
            X(b, "handleBrushChange", function (x) {
              var O = x.startIndex,
                _ = x.endIndex;
              if (O !== b.state.dataStartIndex || _ !== b.state.dataEndIndex) {
                var P = b.state.updateId;
                b.setState(function () {
                  return C(
                    { dataStartIndex: O, dataEndIndex: _ },
                    d(
                      {
                        props: b.props,
                        dataStartIndex: O,
                        dataEndIndex: _,
                        updateId: P,
                      },
                      b.state
                    )
                  );
                }),
                  b.triggerSyncEvent({ dataStartIndex: O, dataEndIndex: _ });
              }
            }),
            X(b, "handleMouseEnter", function (x) {
              var O = b.getMouseInfo(x);
              if (O) {
                var _ = C(C({}, O), {}, { isTooltipActive: !0 });
                b.setState(_), b.triggerSyncEvent(_);
                var P = b.props.onMouseEnter;
                te(P) && P(_, x);
              }
            }),
            X(b, "triggeredAfterMouseMove", function (x) {
              var O = b.getMouseInfo(x),
                _ = O
                  ? C(C({}, O), {}, { isTooltipActive: !0 })
                  : { isTooltipActive: !1 };
              b.setState(_), b.triggerSyncEvent(_);
              var P = b.props.onMouseMove;
              te(P) && P(_, x);
            }),
            X(b, "handleItemMouseEnter", function (x) {
              b.setState(function () {
                return {
                  isTooltipActive: !0,
                  activeItem: x,
                  activePayload: x.tooltipPayload,
                  activeCoordinate: x.tooltipPosition || { x: x.cx, y: x.cy },
                };
              });
            }),
            X(b, "handleItemMouseLeave", function () {
              b.setState(function () {
                return { isTooltipActive: !1 };
              });
            }),
            X(b, "handleMouseMove", function (x) {
              x.persist(), b.throttleTriggeredAfterMouseMove(x);
            }),
            X(b, "handleMouseLeave", function (x) {
              b.throttleTriggeredAfterMouseMove.cancel();
              var O = { isTooltipActive: !1 };
              b.setState(O), b.triggerSyncEvent(O);
              var _ = b.props.onMouseLeave;
              te(_) && _(O, x);
            }),
            X(b, "handleOuterEvent", function (x) {
              var O = Lj(x),
                _ = ir(b.props, "".concat(O));
              if (O && te(_)) {
                var P, I;
                /.*touch.*/i.test(O)
                  ? (I = b.getMouseInfo(x.changedTouches[0]))
                  : (I = b.getMouseInfo(x)),
                  _((P = I) !== null && P !== void 0 ? P : {}, x);
              }
            }),
            X(b, "handleClick", function (x) {
              var O = b.getMouseInfo(x);
              if (O) {
                var _ = C(C({}, O), {}, { isTooltipActive: !0 });
                b.setState(_), b.triggerSyncEvent(_);
                var P = b.props.onClick;
                te(P) && P(_, x);
              }
            }),
            X(b, "handleMouseDown", function (x) {
              var O = b.props.onMouseDown;
              if (te(O)) {
                var _ = b.getMouseInfo(x);
                O(_, x);
              }
            }),
            X(b, "handleMouseUp", function (x) {
              var O = b.props.onMouseUp;
              if (te(O)) {
                var _ = b.getMouseInfo(x);
                O(_, x);
              }
            }),
            X(b, "handleTouchMove", function (x) {
              x.changedTouches != null &&
                x.changedTouches.length > 0 &&
                b.throttleTriggeredAfterMouseMove(x.changedTouches[0]);
            }),
            X(b, "handleTouchStart", function (x) {
              x.changedTouches != null &&
                x.changedTouches.length > 0 &&
                b.handleMouseDown(x.changedTouches[0]);
            }),
            X(b, "handleTouchEnd", function (x) {
              x.changedTouches != null &&
                x.changedTouches.length > 0 &&
                b.handleMouseUp(x.changedTouches[0]);
            }),
            X(b, "triggerSyncEvent", function (x) {
              b.props.syncId !== void 0 &&
                Ap.emit(Ep, b.props.syncId, x, b.eventEmitterSymbol);
            }),
            X(b, "applySyncEvent", function (x) {
              var O = b.props,
                _ = O.layout,
                P = O.syncMethod,
                I = b.state.updateId,
                E = x.dataStartIndex,
                $ = x.dataEndIndex;
              if (x.dataStartIndex !== void 0 || x.dataEndIndex !== void 0)
                b.setState(
                  C(
                    { dataStartIndex: E, dataEndIndex: $ },
                    d(
                      {
                        props: b.props,
                        dataStartIndex: E,
                        dataEndIndex: $,
                        updateId: I,
                      },
                      b.state
                    )
                  )
                );
              else if (x.activeTooltipIndex !== void 0) {
                var M = x.chartX,
                  N = x.chartY,
                  j = x.activeTooltipIndex,
                  D = b.state,
                  L = D.offset,
                  T = D.tooltipTicks;
                if (!L) return;
                if (typeof P == "function") j = P(T, x);
                else if (P === "value") {
                  j = -1;
                  for (var k = 0; k < T.length; k++)
                    if (T[k].value === x.activeLabel) {
                      j = k;
                      break;
                    }
                }
                var F = C(C({}, L), {}, { x: L.left, y: L.top }),
                  H = Math.min(M, F.x + F.width),
                  U = Math.min(N, F.y + F.height),
                  K = T[j] && T[j].value,
                  re = Yh(b.state, b.props.data, j),
                  Se = T[j]
                    ? {
                        x: _ === "horizontal" ? T[j].coordinate : H,
                        y: _ === "horizontal" ? U : T[j].coordinate,
                      }
                    : RA;
                b.setState(
                  C(
                    C({}, x),
                    {},
                    {
                      activeLabel: K,
                      activeCoordinate: Se,
                      activePayload: re,
                      activeTooltipIndex: j,
                    }
                  )
                );
              } else b.setState(x);
            }),
            X(b, "renderCursor", function (x) {
              var O,
                _ = b.state,
                P = _.isTooltipActive,
                I = _.activeCoordinate,
                E = _.activePayload,
                $ = _.offset,
                M = _.activeTooltipIndex,
                N = _.tooltipAxisBandSize,
                j = b.getTooltipEventType(),
                D = (O = x.props.active) !== null && O !== void 0 ? O : P,
                L = b.props.layout,
                T = x.key || "_recharts-cursor";
              return A.createElement(MX, {
                key: T,
                activeCoordinate: I,
                activePayload: E,
                activeTooltipIndex: M,
                chartName: r,
                element: x,
                isActive: D,
                layout: L,
                offset: $,
                tooltipAxisBandSize: N,
                tooltipEventType: j,
              });
            }),
            X(b, "renderPolarAxis", function (x, O, _) {
              var P = ir(x, "type.axisType"),
                I = ir(b.state, "".concat(P, "Map")),
                E = x.type.defaultProps,
                $ = E !== void 0 ? C(C({}, E), x.props) : x.props,
                M = I && I[$["".concat(P, "Id")]];
              return z.cloneElement(
                x,
                C(
                  C({}, M),
                  {},
                  {
                    className: se(P, M.className),
                    key: x.key || "".concat(O, "-").concat(_),
                    ticks: Wr(M, !0),
                  }
                )
              );
            }),
            X(b, "renderPolarGrid", function (x) {
              var O = x.props,
                _ = O.radialLines,
                P = O.polarAngles,
                I = O.polarRadius,
                E = b.state,
                $ = E.radiusAxisMap,
                M = E.angleAxisMap,
                N = hn($),
                j = hn(M),
                D = j.cx,
                L = j.cy,
                T = j.innerRadius,
                k = j.outerRadius;
              return z.cloneElement(x, {
                polarAngles: Array.isArray(P)
                  ? P
                  : Wr(j, !0).map(function (F) {
                      return F.coordinate;
                    }),
                polarRadius: Array.isArray(I)
                  ? I
                  : Wr(N, !0).map(function (F) {
                      return F.coordinate;
                    }),
                cx: D,
                cy: L,
                innerRadius: T,
                outerRadius: k,
                key: x.key || "polar-grid",
                radialLines: _,
              });
            }),
            X(b, "renderLegend", function () {
              var x = b.state.formattedGraphicalItems,
                O = b.props,
                _ = O.children,
                P = O.width,
                I = O.height,
                E = b.props.margin || {},
                $ = P - (E.left || 0) - (E.right || 0),
                M = IP({
                  children: _,
                  formattedGraphicalItems: x,
                  legendWidth: $,
                  legendContent: l,
                });
              if (!M) return null;
              var N = M.item,
                j = gw(M, NX);
              return z.cloneElement(
                N,
                C(
                  C({}, j),
                  {},
                  {
                    chartWidth: P,
                    chartHeight: I,
                    margin: E,
                    onBBoxUpdate: b.handleLegendBBoxUpdate,
                  }
                )
              );
            }),
            X(b, "renderTooltip", function () {
              var x,
                O = b.props,
                _ = O.children,
                P = O.accessibilityLayer,
                I = Ut(_, Ar);
              if (!I) return null;
              var E = b.state,
                $ = E.isTooltipActive,
                M = E.activeCoordinate,
                N = E.activePayload,
                j = E.activeLabel,
                D = E.offset,
                L = (x = I.props.active) !== null && x !== void 0 ? x : $;
              return z.cloneElement(I, {
                viewBox: C(C({}, D), {}, { x: D.left, y: D.top }),
                active: L,
                label: j,
                payload: L ? N : [],
                coordinate: M,
                accessibilityLayer: P,
              });
            }),
            X(b, "renderBrush", function (x) {
              var O = b.props,
                _ = O.margin,
                P = O.data,
                I = b.state,
                E = I.offset,
                $ = I.dataStartIndex,
                M = I.dataEndIndex,
                N = I.updateId;
              return z.cloneElement(x, {
                key: x.key || "_recharts-brush",
                onChange: Ss(b.handleBrushChange, x.props.onChange),
                data: P,
                x: W(x.props.x) ? x.props.x : E.left,
                y: W(x.props.y)
                  ? x.props.y
                  : E.top + E.height + E.brushBottom - (_.bottom || 0),
                width: W(x.props.width) ? x.props.width : E.width,
                startIndex: $,
                endIndex: M,
                updateId: "brush-".concat(N),
              });
            }),
            X(b, "renderReferenceElement", function (x, O, _) {
              if (!x) return null;
              var P = b,
                I = P.clipPathId,
                E = b.state,
                $ = E.xAxisMap,
                M = E.yAxisMap,
                N = E.offset,
                j = x.type.defaultProps || {},
                D = x.props,
                L = D.xAxisId,
                T = L === void 0 ? j.xAxisId : L,
                k = D.yAxisId,
                F = k === void 0 ? j.yAxisId : k;
              return z.cloneElement(x, {
                key: x.key || "".concat(O, "-").concat(_),
                xAxis: $[T],
                yAxis: M[F],
                viewBox: {
                  x: N.left,
                  y: N.top,
                  width: N.width,
                  height: N.height,
                },
                clipPathId: I,
              });
            }),
            X(b, "renderActivePoints", function (x) {
              var O = x.item,
                _ = x.activePoint,
                P = x.basePoint,
                I = x.childIndex,
                E = x.isRange,
                $ = [],
                M = O.props.key,
                N =
                  O.item.type.defaultProps !== void 0
                    ? C(C({}, O.item.type.defaultProps), O.item.props)
                    : O.item.props,
                j = N.activeDot,
                D = N.dataKey,
                L = C(
                  C(
                    {
                      index: I,
                      dataKey: D,
                      cx: _.x,
                      cy: _.y,
                      r: 4,
                      fill: Qm(O.item),
                      strokeWidth: 2,
                      stroke: "#fff",
                      payload: _.payload,
                      value: _.value,
                    },
                    ae(j, !1)
                  ),
                  ml(j)
                );
              return (
                $.push(
                  m.renderActiveDot(
                    j,
                    L,
                    "".concat(M, "-activePoint-").concat(I)
                  )
                ),
                P
                  ? $.push(
                      m.renderActiveDot(
                        j,
                        C(C({}, L), {}, { cx: P.x, cy: P.y }),
                        "".concat(M, "-basePoint-").concat(I)
                      )
                    )
                  : E && $.push(null),
                $
              );
            }),
            X(b, "renderGraphicChild", function (x, O, _) {
              var P = b.filterFormatItem(x, O, _);
              if (!P) return null;
              var I = b.getTooltipEventType(),
                E = b.state,
                $ = E.isTooltipActive,
                M = E.tooltipAxis,
                N = E.activeTooltipIndex,
                j = E.activeLabel,
                D = b.props.children,
                L = Ut(D, Ar),
                T = P.props,
                k = T.points,
                F = T.isRange,
                H = T.baseLine,
                U =
                  P.item.type.defaultProps !== void 0
                    ? C(C({}, P.item.type.defaultProps), P.item.props)
                    : P.item.props,
                K = U.activeDot,
                re = U.hide,
                Se = U.activeBar,
                ke = U.activeShape,
                Xt = !!(!re && $ && L && (K || Se || ke)),
                Et = {};
              I !== "axis" && L && L.props.trigger === "click"
                ? (Et = {
                    onClick: Ss(b.handleItemMouseEnter, x.props.onClick),
                  })
                : I !== "axis" &&
                  (Et = {
                    onMouseLeave: Ss(
                      b.handleItemMouseLeave,
                      x.props.onMouseLeave
                    ),
                    onMouseEnter: Ss(
                      b.handleItemMouseEnter,
                      x.props.onMouseEnter
                    ),
                  });
              var G = z.cloneElement(x, C(C({}, P.props), Et));
              function Q(Un) {
                return typeof M.dataKey == "function"
                  ? M.dataKey(Un.payload)
                  : null;
              }
              if (Xt)
                if (N >= 0) {
                  var J, R;
                  if (M.dataKey && !M.allowDuplicatedCategory) {
                    var Ie =
                      typeof M.dataKey == "function"
                        ? Q
                        : "payload.".concat(M.dataKey.toString());
                    (J = Td(k, Ie, j)), (R = F && H && Td(H, Ie, j));
                  } else (J = k == null ? void 0 : k[N]), (R = F && H && H[N]);
                  if (ke || Se) {
                    var ne =
                      x.props.activeIndex !== void 0 ? x.props.activeIndex : N;
                    return [
                      z.cloneElement(
                        x,
                        C(C(C({}, P.props), Et), {}, { activeIndex: ne })
                      ),
                      null,
                      null,
                    ];
                  }
                  if (!ue(J))
                    return [G].concat(
                      Mo(
                        b.renderActivePoints({
                          item: P,
                          activePoint: J,
                          basePoint: R,
                          childIndex: N,
                          isRange: F,
                        })
                      )
                    );
                } else {
                  var Le,
                    Re =
                      (Le = b.getItemByXY(b.state.activeCoordinate)) !== null &&
                      Le !== void 0
                        ? Le
                        : { graphicalItem: G },
                    It = Re.graphicalItem,
                    un = It.item,
                    Ii = un === void 0 ? x : un,
                    Ku = It.childIndex,
                    zn = C(C(C({}, P.props), Et), {}, { activeIndex: Ku });
                  return [z.cloneElement(Ii, zn), null, null];
                }
              return F ? [G, null, null] : [G, null];
            }),
            X(b, "renderCustomized", function (x, O, _) {
              return z.cloneElement(
                x,
                C(
                  C({ key: "recharts-customized-".concat(_) }, b.props),
                  b.state
                )
              );
            }),
            X(b, "renderMap", {
              CartesianGrid: { handler: Es, once: !0 },
              ReferenceArea: { handler: b.renderReferenceElement },
              ReferenceLine: { handler: Es },
              ReferenceDot: { handler: b.renderReferenceElement },
              XAxis: { handler: Es },
              YAxis: { handler: Es },
              Brush: { handler: b.renderBrush, once: !0 },
              Bar: { handler: b.renderGraphicChild },
              Line: { handler: b.renderGraphicChild },
              Area: { handler: b.renderGraphicChild },
              Radar: { handler: b.renderGraphicChild },
              RadialBar: { handler: b.renderGraphicChild },
              Scatter: { handler: b.renderGraphicChild },
              Pie: { handler: b.renderGraphicChild },
              Funnel: { handler: b.renderGraphicChild },
              Tooltip: { handler: b.renderCursor, once: !0 },
              PolarGrid: { handler: b.renderPolarGrid, once: !0 },
              PolarAngleAxis: { handler: b.renderPolarAxis },
              PolarRadiusAxis: { handler: b.renderPolarAxis },
              Customized: { handler: b.renderCustomized },
            }),
            (b.clipPathId = "".concat(
              (g = v.id) !== null && g !== void 0 ? g : Kc("recharts"),
              "-clip"
            )),
            (b.throttleTriggeredAfterMouseMove = E_(
              b.triggeredAfterMouseMove,
              (S = v.throttleDelay) !== null && S !== void 0 ? S : 1e3 / 60
            )),
            (b.state = {}),
            b
          );
        }
        return (
          qX(m, w),
          WX(m, [
            {
              key: "componentDidMount",
              value: function () {
                var g, S;
                this.addListener(),
                  this.accessibilityManager.setDetails({
                    container: this.container,
                    offset: {
                      left:
                        (g = this.props.margin.left) !== null && g !== void 0
                          ? g
                          : 0,
                      top:
                        (S = this.props.margin.top) !== null && S !== void 0
                          ? S
                          : 0,
                    },
                    coordinateList: this.state.tooltipTicks,
                    mouseHandlerCallback: this.triggeredAfterMouseMove,
                    layout: this.props.layout,
                  }),
                  this.displayDefaultTooltip();
              },
            },
            {
              key: "displayDefaultTooltip",
              value: function () {
                var g = this.props,
                  S = g.children,
                  b = g.data,
                  x = g.height,
                  O = g.layout,
                  _ = Ut(S, Ar);
                if (_) {
                  var P = _.props.defaultIndex;
                  if (
                    !(
                      typeof P != "number" ||
                      P < 0 ||
                      P > this.state.tooltipTicks.length - 1
                    )
                  ) {
                    var I =
                        this.state.tooltipTicks[P] &&
                        this.state.tooltipTicks[P].value,
                      E = Yh(this.state, b, P, I),
                      $ = this.state.tooltipTicks[P].coordinate,
                      M = (this.state.offset.top + x) / 2,
                      N = O === "horizontal",
                      j = N ? { x: $, y: M } : { y: $, x: M },
                      D = this.state.formattedGraphicalItems.find(function (T) {
                        var k = T.item;
                        return k.type.name === "Scatter";
                      });
                    D &&
                      ((j = C(C({}, j), D.props.points[P].tooltipPosition)),
                      (E = D.props.points[P].tooltipPayload));
                    var L = {
                      activeTooltipIndex: P,
                      isTooltipActive: !0,
                      activeLabel: I,
                      activePayload: E,
                      activeCoordinate: j,
                    };
                    this.setState(L),
                      this.renderCursor(_),
                      this.accessibilityManager.setIndex(P);
                  }
                }
              },
            },
            {
              key: "getSnapshotBeforeUpdate",
              value: function (g, S) {
                if (!this.props.accessibilityLayer) return null;
                if (
                  (this.state.tooltipTicks !== S.tooltipTicks &&
                    this.accessibilityManager.setDetails({
                      coordinateList: this.state.tooltipTicks,
                    }),
                  this.props.layout !== g.layout &&
                    this.accessibilityManager.setDetails({
                      layout: this.props.layout,
                    }),
                  this.props.margin !== g.margin)
                ) {
                  var b, x;
                  this.accessibilityManager.setDetails({
                    offset: {
                      left:
                        (b = this.props.margin.left) !== null && b !== void 0
                          ? b
                          : 0,
                      top:
                        (x = this.props.margin.top) !== null && x !== void 0
                          ? x
                          : 0,
                    },
                  });
                }
                return null;
              },
            },
            {
              key: "componentDidUpdate",
              value: function (g) {
                Cd([Ut(g.children, Ar)], [Ut(this.props.children, Ar)]) ||
                  this.displayDefaultTooltip();
              },
            },
            {
              key: "componentWillUnmount",
              value: function () {
                this.removeListener(),
                  this.throttleTriggeredAfterMouseMove.cancel();
              },
            },
            {
              key: "getTooltipEventType",
              value: function () {
                var g = Ut(this.props.children, Ar);
                if (g && typeof g.props.shared == "boolean") {
                  var S = g.props.shared ? "axis" : "item";
                  return u.indexOf(S) >= 0 ? S : o;
                }
                return o;
              },
            },
            {
              key: "getMouseInfo",
              value: function (g) {
                if (!this.container) return null;
                var S = this.container,
                  b = S.getBoundingClientRect(),
                  x = fF(b),
                  O = {
                    chartX: Math.round(g.pageX - x.left),
                    chartY: Math.round(g.pageY - x.top),
                  },
                  _ = b.width / S.offsetWidth || 1,
                  P = this.inRange(O.chartX, O.chartY, _);
                if (!P) return null;
                var I = this.state,
                  E = I.xAxisMap,
                  $ = I.yAxisMap,
                  M = this.getTooltipEventType();
                if (M !== "axis" && E && $) {
                  var N = hn(E).scale,
                    j = hn($).scale,
                    D = N && N.invert ? N.invert(O.chartX) : null,
                    L = j && j.invert ? j.invert(O.chartY) : null;
                  return C(C({}, O), {}, { xValue: D, yValue: L });
                }
                var T = ww(this.state, this.props.data, this.props.layout, P);
                return T ? C(C({}, O), T) : null;
              },
            },
            {
              key: "inRange",
              value: function (g, S) {
                var b =
                    arguments.length > 2 && arguments[2] !== void 0
                      ? arguments[2]
                      : 1,
                  x = this.props.layout,
                  O = g / b,
                  _ = S / b;
                if (x === "horizontal" || x === "vertical") {
                  var P = this.state.offset,
                    I =
                      O >= P.left &&
                      O <= P.left + P.width &&
                      _ >= P.top &&
                      _ <= P.top + P.height;
                  return I ? { x: O, y: _ } : null;
                }
                var E = this.state,
                  $ = E.angleAxisMap,
                  M = E.radiusAxisMap;
                if ($ && M) {
                  var N = hn($);
                  return nb({ x: O, y: _ }, N);
                }
                return null;
              },
            },
            {
              key: "parseEventsOfWrapper",
              value: function () {
                var g = this.props.children,
                  S = this.getTooltipEventType(),
                  b = Ut(g, Ar),
                  x = {};
                b &&
                  S === "axis" &&
                  (b.props.trigger === "click"
                    ? (x = { onClick: this.handleClick })
                    : (x = {
                        onMouseEnter: this.handleMouseEnter,
                        onMouseMove: this.handleMouseMove,
                        onMouseLeave: this.handleMouseLeave,
                        onTouchMove: this.handleTouchMove,
                        onTouchStart: this.handleTouchStart,
                        onTouchEnd: this.handleTouchEnd,
                      }));
                var O = ml(this.props, this.handleOuterEvent);
                return C(C({}, O), x);
              },
            },
            {
              key: "addListener",
              value: function () {
                Ap.on(Ep, this.handleReceiveSyncEvent);
              },
            },
            {
              key: "removeListener",
              value: function () {
                Ap.removeListener(Ep, this.handleReceiveSyncEvent);
              },
            },
            {
              key: "filterFormatItem",
              value: function (g, S, b) {
                for (
                  var x = this.state.formattedGraphicalItems,
                    O = 0,
                    _ = x.length;
                  O < _;
                  O++
                ) {
                  var P = x[O];
                  if (
                    P.item === g ||
                    P.props.key === g.key ||
                    (S === Gr(P.item.type) && b === P.childIndex)
                  )
                    return P;
                }
                return null;
              },
            },
            {
              key: "renderClipPath",
              value: function () {
                var g = this.clipPathId,
                  S = this.state.offset,
                  b = S.left,
                  x = S.top,
                  O = S.height,
                  _ = S.width;
                return A.createElement(
                  "defs",
                  null,
                  A.createElement(
                    "clipPath",
                    { id: g },
                    A.createElement("rect", { x: b, y: x, height: O, width: _ })
                  )
                );
              },
            },
            {
              key: "getXScales",
              value: function () {
                var g = this.state.xAxisMap;
                return g
                  ? Object.entries(g).reduce(function (S, b) {
                      var x = yw(b, 2),
                        O = x[0],
                        _ = x[1];
                      return C(C({}, S), {}, X({}, O, _.scale));
                    }, {})
                  : null;
              },
            },
            {
              key: "getYScales",
              value: function () {
                var g = this.state.yAxisMap;
                return g
                  ? Object.entries(g).reduce(function (S, b) {
                      var x = yw(b, 2),
                        O = x[0],
                        _ = x[1];
                      return C(C({}, S), {}, X({}, O, _.scale));
                    }, {})
                  : null;
              },
            },
            {
              key: "getXScaleByAxisId",
              value: function (g) {
                var S;
                return (S = this.state.xAxisMap) === null ||
                  S === void 0 ||
                  (S = S[g]) === null ||
                  S === void 0
                  ? void 0
                  : S.scale;
              },
            },
            {
              key: "getYScaleByAxisId",
              value: function (g) {
                var S;
                return (S = this.state.yAxisMap) === null ||
                  S === void 0 ||
                  (S = S[g]) === null ||
                  S === void 0
                  ? void 0
                  : S.scale;
              },
            },
            {
              key: "getItemByXY",
              value: function (g) {
                var S = this.state,
                  b = S.formattedGraphicalItems,
                  x = S.activeItem;
                if (b && b.length)
                  for (var O = 0, _ = b.length; O < _; O++) {
                    var P = b[O],
                      I = P.props,
                      E = P.item,
                      $ =
                        E.type.defaultProps !== void 0
                          ? C(C({}, E.type.defaultProps), E.props)
                          : E.props,
                      M = Gr(E.type);
                    if (M === "Bar") {
                      var N = (I.data || []).find(function (T) {
                        return LH(g, T);
                      });
                      if (N) return { graphicalItem: P, payload: N };
                    } else if (M === "RadialBar") {
                      var j = (I.data || []).find(function (T) {
                        return nb(g, T);
                      });
                      if (j) return { graphicalItem: P, payload: j };
                    } else if (hf(P, x) || vf(P, x) || Iu(P, x)) {
                      var D = BG({
                          graphicalItem: P,
                          activeTooltipItem: x,
                          itemData: $.data,
                        }),
                        L = $.activeIndex === void 0 ? D : $.activeIndex;
                      return {
                        graphicalItem: C(C({}, P), {}, { childIndex: L }),
                        payload: Iu(P, x) ? $.data[D] : P.props.data[D],
                      };
                    }
                  }
                return null;
              },
            },
            {
              key: "render",
              value: function () {
                var g = this;
                if (!Kg(this)) return null;
                var S = this.props,
                  b = S.children,
                  x = S.className,
                  O = S.width,
                  _ = S.height,
                  P = S.style,
                  I = S.compact,
                  E = S.title,
                  $ = S.desc,
                  M = gw(S, DX),
                  N = ae(M, !1);
                if (I)
                  return A.createElement(
                    rw,
                    {
                      state: this.state,
                      width: this.props.width,
                      height: this.props.height,
                      clipPathId: this.clipPathId,
                    },
                    A.createElement(
                      jd,
                      Xi({}, N, { width: O, height: _, title: E, desc: $ }),
                      this.renderClipPath(),
                      Yg(b, this.renderMap)
                    )
                  );
                if (this.props.accessibilityLayer) {
                  var j, D;
                  (N.tabIndex =
                    (j = this.props.tabIndex) !== null && j !== void 0 ? j : 0),
                    (N.role =
                      (D = this.props.role) !== null && D !== void 0
                        ? D
                        : "application"),
                    (N.onKeyDown = function (T) {
                      g.accessibilityManager.keyboardEvent(T);
                    }),
                    (N.onFocus = function () {
                      g.accessibilityManager.focus();
                    });
                }
                var L = this.parseEventsOfWrapper();
                return A.createElement(
                  rw,
                  {
                    state: this.state,
                    width: this.props.width,
                    height: this.props.height,
                    clipPathId: this.clipPathId,
                  },
                  A.createElement(
                    "div",
                    Xi(
                      {
                        className: se("recharts-wrapper", x),
                        style: C(
                          {
                            position: "relative",
                            cursor: "default",
                            width: O,
                            height: _,
                          },
                          P
                        ),
                      },
                      L,
                      {
                        ref: function (k) {
                          g.container = k;
                        },
                      }
                    ),
                    A.createElement(
                      jd,
                      Xi({}, N, {
                        width: O,
                        height: _,
                        title: E,
                        desc: $,
                        style: JX,
                      }),
                      this.renderClipPath(),
                      Yg(b, this.renderMap)
                    ),
                    this.renderLegend(),
                    this.renderTooltip()
                  )
                );
              },
            },
          ])
        );
      })(z.Component);
    X(h, "displayName", r),
      X(
        h,
        "defaultProps",
        C(
          {
            layout: "horizontal",
            stackOffset: "none",
            barCategoryGap: "10%",
            barGap: 4,
            margin: { top: 5, right: 5, bottom: 5, left: 5 },
            reverseStackOrder: !1,
            syncMethod: "index",
          },
          c
        )
      ),
      X(h, "getDerivedStateFromProps", function (w, m) {
        var v = w.dataKey,
          g = w.data,
          S = w.children,
          b = w.width,
          x = w.height,
          O = w.layout,
          _ = w.stackOffset,
          P = w.margin,
          I = m.dataStartIndex,
          E = m.dataEndIndex;
        if (m.updateId === void 0) {
          var $ = xw(w);
          return C(
            C(
              C({}, $),
              {},
              { updateId: 0 },
              d(C(C({ props: w }, $), {}, { updateId: 0 }), m)
            ),
            {},
            {
              prevDataKey: v,
              prevData: g,
              prevWidth: b,
              prevHeight: x,
              prevLayout: O,
              prevStackOffset: _,
              prevMargin: P,
              prevChildren: S,
            }
          );
        }
        if (
          v !== m.prevDataKey ||
          g !== m.prevData ||
          b !== m.prevWidth ||
          x !== m.prevHeight ||
          O !== m.prevLayout ||
          _ !== m.prevStackOffset ||
          !ro(P, m.prevMargin)
        ) {
          var M = xw(w),
            N = {
              chartX: m.chartX,
              chartY: m.chartY,
              isTooltipActive: m.isTooltipActive,
            },
            j = C(C({}, ww(m, g, O)), {}, { updateId: m.updateId + 1 }),
            D = C(C(C({}, M), N), j);
          return C(
            C(C({}, D), d(C({ props: w }, D), m)),
            {},
            {
              prevDataKey: v,
              prevData: g,
              prevWidth: b,
              prevHeight: x,
              prevLayout: O,
              prevStackOffset: _,
              prevMargin: P,
              prevChildren: S,
            }
          );
        }
        if (!Cd(S, m.prevChildren)) {
          var L,
            T,
            k,
            F,
            H = Ut(S, Po),
            U =
              H &&
              (L =
                (T = H.props) === null || T === void 0
                  ? void 0
                  : T.startIndex) !== null &&
              L !== void 0
                ? L
                : I,
            K =
              H &&
              (k =
                (F = H.props) === null || F === void 0
                  ? void 0
                  : F.endIndex) !== null &&
              k !== void 0
                ? k
                : E,
            re = U !== I || K !== E,
            Se = !ue(g),
            ke = Se && !re ? m.updateId : m.updateId + 1;
          return C(
            C(
              { updateId: ke },
              d(
                C(
                  C({ props: w }, m),
                  {},
                  { updateId: ke, dataStartIndex: U, dataEndIndex: K }
                ),
                m
              )
            ),
            {},
            { prevChildren: S, dataStartIndex: U, dataEndIndex: K }
          );
        }
        return null;
      }),
      X(h, "renderActiveDot", function (w, m, v) {
        var g;
        return (
          z.isValidElement(w)
            ? (g = z.cloneElement(w, m))
            : te(w)
              ? (g = w(m))
              : (g = A.createElement(XP, m)),
          A.createElement(qe, { className: "recharts-active-dot", key: v }, g)
        );
      });
    var y = z.forwardRef(function (m, v) {
      return A.createElement(h, Xi({}, m, { ref: v }));
    });
    return (y.displayName = h.displayName), y;
  },
  cY = lY({
    chartName: "BarChart",
    GraphicalChild: Ei,
    defaultTooltipEventType: "axis",
    validateTooltipEventTypes: ["axis", "item"],
    axisComponents: [
      { axisType: "xAxis", AxisComp: xf },
      { axisType: "yAxis", AxisComp: Sf },
    ],
    formatAxisMap: fq,
  });
const fY = "_bar-tooltip_o3bqm_1",
  pY = { "bar-tooltip": "_bar-tooltip_o3bqm_1", barTooltip: fY },
  dY = qT(
    new Worker(
      new URL("/diceapp/assets/dice-worker-Blj8mnyL.js", import.meta.url),
      {}
    )
  ),
  hY = ({ progSrc: e, overrides: t }) => {
    const [r, n] = z.useState([]),
      i = z.useMemo(() => {
        const o = jg(r, ([a, u]) => u);
        return r.reduce((a, [u, s]) => {
          const l = jg(a, ({ count: f }) => f);
          return [...a, { cdf: (l + s) / o, pdf: s / o, count: s, result: u }];
        }, []);
      }, [r]);
    return (
      z.useEffect(() => {
        dY.calculateDistribtion(e, t).then(n);
      }, [e, t]),
      de.jsx(iF, {
        width: "100%",
        height: 300,
        children: de.jsxs(cY, {
          data: i,
          children: [
            de.jsx(PA, { strokeDasharray: "3 3", vertical: !1 }),
            de.jsx(Sf, {}),
            de.jsx(xf, { dataKey: "result" }),
            de.jsx(Ar, { content: de.jsx(vY, {}) }),
            de.jsx(Ei, { dataKey: "count" }),
          ],
        }),
      })
    );
  },
  vY = ({ payload: e }) => {
    if (!e || e.length === 0) return null;
    const { cdf: t, pdf: r, result: n } = e[0].payload;
    return de.jsxs("div", {
      className: pY.barTooltip,
      children: [
        de.jsxs("div", {
          children: ["P(≤ ", n, "): ", (t * 100).toFixed(2), "%"],
        }),
        de.jsxs("div", {
          children: ["P(= ", n, "): ", (r * 100).toFixed(2), "%"],
        }),
      ],
    });
  };
function mY() {
  const [e, t] = z.useState("2:num d20:die+5:mod"),
    [r, n] = z.useState({});
  return de.jsxs(de.Fragment, {
    children: [
      de.jsx(TT, {
        progSrc: e,
        overrides: r,
        onUpdateProgram: (i, o) => {
          t(i), n(o);
        },
      }),
      de.jsx(hY, { progSrc: e, overrides: r }),
    ],
  });
}
NS(document.getElementById("root")).render(
  de.jsx(z.StrictMode, { children: de.jsx(mY, {}) })
);
