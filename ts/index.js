// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"actions/Card.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _1 = require(".");

exports.CARD_OPEN = "CARD_OPEN";
exports.CARD_CLOSE = "CARD_CLOSE";

function openCard(card) {
  return _1.dispatch({
    type: exports.CARD_OPEN,
    value: card
  });
}

exports.openCard = openCard;

function closeCard(card) {
  return _1.dispatch({
    type: exports.CARD_CLOSE,
    value: card
  });
}

exports.closeCard = closeCard;
},{".":"actions/index.ts"}],"actions/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Navigation_1 = require("./Navigation");

var Card_1 = require("./Card");

function dispatch(action) {
  switch (action.type) {
    case Navigation_1.NAVIGATION_TAB_ACTIVE_CHANGE:
      (function () {
        var _a = action.value,
            navigation = _a.navigation,
            tab = _a.tab;

        if (tab && !tab.active) {
          for (var _i = 0, _b = navigation.tabs; _i < _b.length; _i++) {
            var child = _b[_i];
            child.active = false;
          }

          tab.active = true; // ToDo: オートスクロール機能
        }
      })();

      break;

    case Navigation_1.NAVIGATION_PANEL_ACTIVE_CHANGE:
      (function () {
        var panel = action.value.panel;

        if (panel && !panel.active) {
          for (var _i = 0, _a = panel.group.panels; _i < _a.length; _i++) {
            var child = _a[_i];
            child.active = false;
          }

          panel.active = true;
        }
      })();

      break;

    case Card_1.CARD_OPEN:
      action.value.open = true;
      break;

    case Card_1.CARD_CLOSE:
      action.value.open = false;
      break;
  }
}

exports.dispatch = dispatch;
},{"./Navigation":"actions/Navigation.ts","./Card":"actions/Card.ts"}],"actions/Navigation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _1 = require(".");

exports.NAVIGATION_TAB_ACTIVE_CHANGE = "NAVIGATION_TAB_ACTIVE_CHANGE";
exports.NAVIGATION_PANEL_ACTIVE_CHANGE = "NAVIGATION_PANEL_ACTIVE_CHANGE";

function changeTabActive(navigation, tab) {
  return _1.dispatch({
    type: exports.NAVIGATION_TAB_ACTIVE_CHANGE,
    value: {
      navigation: navigation,
      tab: tab
    }
  });
}

exports.changeTabActive = changeTabActive;

function changePanelActive(navigation, panel) {
  return _1.dispatch({
    type: exports.NAVIGATION_PANEL_ACTIVE_CHANGE,
    value: {
      navigation: navigation,
      panel: panel
    }
  });
}

exports.changePanelActive = changePanelActive;
},{".":"actions/index.ts"}],"components/Navigation.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var index_1 = __importDefault(require("./index"));

var Navigation_1 = require("../actions/Navigation");

var Navigation =
/** @class */
function (_super) {
  __extends(Navigation, _super);

  function Navigation(elem) {
    return _super.call(this, elem) || this;
  }

  Object.defineProperty(Navigation.prototype, "tabs", {
    get: function get() {
      var tabs = this.elem.querySelectorAll(":scope > ." + Navigation.Tab.className);
      return Array.from(tabs).map(function (tab) {
        return new Navigation.Tab(tab);
      });
    },
    enumerable: true,
    configurable: true
  });

  Navigation.prototype.register = function () {
    for (var _i = 0, _a = this.tabs; _i < _a.length; _i++) {
      var childTab = _a[_i];
      childTab.register(this);
    }
  };

  Navigation.className = "navigation";
  return Navigation;
}(index_1.default);

(function (Navigation) {
  Navigation.CLASSES = {};
  Navigation.ATTRS = {}; // ========== Trigger ==========

  var Trigger =
  /** @class */
  function (_super) {
    __extends(Trigger, _super);

    function Trigger(elem) {
      return _super.call(this, elem) || this;
    }

    Object.defineProperty(Trigger.prototype, "selector", {
      get: function get() {
        return this.elem.getAttribute("selector");
      },
      set: function set(val) {
        this.elem.setAttribute("selector", val);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Trigger.prototype, "matched", {
      get: function get() {
        return this.selector ? document.querySelector(this.selector) : null;
      },
      enumerable: true,
      configurable: true
    });

    Trigger.prototype.register = function () {
      var _this = this;

      if (!this.available) return;
      this.elem.addEventListener("click", function () {
        return _this.handleClick();
      });
    };

    Object.defineProperty(Trigger.prototype, "available", {
      get: function get() {
        return Boolean(this.selector && this.matched);
      },
      enumerable: true,
      configurable: true
    });
    return Trigger;
  }(index_1.default);

  Navigation.Trigger = Trigger; // ========== Tab ==========

  var Tab =
  /** @class */
  function (_super) {
    __extends(Tab, _super);

    function Tab(elem) {
      return _super.call(this, elem) || this;
    }

    Object.defineProperty(Tab.prototype, "active", {
      get: function get() {
        return this.elem.hasAttribute(Tab.ATTRS.ACTIVE);
      },
      set: function set(val) {
        val ? this.elem.setAttribute(Tab.ATTRS.ACTIVE, "") : this.elem.removeAttribute(Tab.ATTRS.ACTIVE);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Tab.prototype, "disabled", {
      get: function get() {
        return this.elem.hasAttribute(Tab.ATTRS.DISABLED);
      },
      set: function set(val) {
        val ? this.elem.setAttribute(Tab.ATTRS.DISABLED, "") : this.elem.removeAttribute(Tab.ATTRS.DISABLED);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Tab.prototype, "matched", {
      get: function get() {
        return new Navigation.Panel(_super.prototype.matched);
      },
      enumerable: true,
      configurable: true
    });

    Tab.prototype.register = function (navigation) {
      var _this = this;

      if (!this.available) return;
      this.elem.addEventListener("click", function () {
        return _this.handleClick(navigation);
      });
    };

    Tab.prototype.handleClick = function (navigation) {
      if (!this.disabled && !this.active) {
        Navigation_1.changeTabActive(navigation, this);
        Navigation_1.changePanelActive(navigation, this.matched);
      }
    };

    Tab.className = "navigation_tab";
    return Tab;
  }(Trigger);

  Navigation.Tab = Tab;

  (function (Tab) {
    Tab.CLASSES = {};
    Tab.ATTRS = {
      ACTIVE: "active",
      DISABLED: "disabled"
    };
  })(Tab = Navigation.Tab || (Navigation.Tab = {})); // ========== Panel ==========


  var Panel =
  /** @class */
  function (_super) {
    __extends(Panel, _super);

    function Panel(elem) {
      return _super.call(this, elem) || this;
    }

    Object.defineProperty(Panel.prototype, "id", {
      get: function get() {
        return this.elem.id;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Panel.prototype, "group", {
      get: function get() {
        return new Navigation.Panel.PanelGroup(this.elem.parentElement);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Panel.prototype, "active", {
      get: function get() {
        return this.elem.hasAttribute(Panel.ATTRS.ACTIVE);
      },
      set: function set(val) {
        val ? this.elem.setAttribute(Panel.ATTRS.ACTIVE, "") : this.elem.removeAttribute(Panel.ATTRS.ACTIVE);
      },
      enumerable: true,
      configurable: true
    });
    Panel.className = "navigation_panel";
    return Panel;
  }(index_1.default);

  Navigation.Panel = Panel;

  (function (Panel) {
    Panel.CLASSES = {};
    Panel.ATTRS = {
      ACTIVE: "active"
    }; // ========== PanelGroup ==========

    var PanelGroup =
    /** @class */
    function (_super) {
      __extends(PanelGroup, _super);

      function PanelGroup(elem) {
        return _super.call(this, elem) || this;
      }

      Object.defineProperty(PanelGroup.prototype, "panels", {
        get: function get() {
          var panels = this.elem.querySelectorAll(":scope > ." + Panel.className);
          return Array.from(panels).map(function (panel) {
            return new Panel(panel);
          });
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PanelGroup.prototype, "activePanel", {
        get: function get() {
          return this.panels.find(function (panel) {
            return panel.active;
          });
        },
        enumerable: true,
        configurable: true
      });
      PanelGroup.className = "navigation_panelGroup";
      return PanelGroup;
    }(index_1.default);

    Panel.PanelGroup = PanelGroup;

    (function (PanelGroup) {
      PanelGroup.CLASSES = {};
      PanelGroup.ATTRS = {};
    })(PanelGroup = Panel.PanelGroup || (Panel.PanelGroup = {}));
  })(Panel = Navigation.Panel || (Navigation.Panel = {}));
})(Navigation || (Navigation = {}));

exports.default = Navigation;
},{"./index":"components/index.ts","../actions/Navigation":"actions/Navigation.ts"}],"components/Card.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var index_1 = __importDefault(require("./index"));

var Card_1 = require("../actions/Card");

var Card =
/** @class */
function (_super) {
  __extends(Card, _super);

  function Card(elem) {
    var _this = _super.call(this, elem) || this;

    _this.register();

    return _this;
  }

  Object.defineProperty(Card.prototype, "open", {
    get: function get() {
      return this.elem.hasAttribute(Card.ATTRS.OPEN);
    },
    set: function set(val) {
      val ? this.elem.setAttribute(Card.ATTRS.OPEN, "") : this.elem.removeAttribute(Card.ATTRS.OPEN);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Card.prototype, "cardTitle", {
    get: function get() {
      return new Card.CardTitle(this.elem.querySelector(":scope > ." + Card.CardTitle.className));
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Card.prototype, "cardContent", {
    get: function get() {
      return new Card.CardContent(this.elem.querySelector(":scope > ." + Card.CardContent.className));
    },
    enumerable: true,
    configurable: true
  });

  Card.prototype.register = function () {
    var _this = this;

    this.cardTitle.elem.addEventListener("click", function () {
      return _this.handleOpen();
    });
  };

  Card.prototype.handleOpen = function () {
    !this.open ? Card_1.openCard(this) : Card_1.closeCard(this);
  };

  Card.className = "card";
  return Card;
}(index_1.default);

(function (Card) {
  Card.CLASSES = {};
  Card.ATTRS = {
    OPEN: "open"
  }; // ========== CardTitle ==========

  var CardTitle =
  /** @class */
  function (_super) {
    __extends(CardTitle, _super);

    function CardTitle(elem) {
      return _super.call(this, elem) || this;
    }

    CardTitle.className = "card_title";
    return CardTitle;
  }(index_1.default);

  Card.CardTitle = CardTitle;

  (function (CardTitle) {
    CardTitle.CLASSES = {};
    CardTitle.ATTRS = {};
  })(CardTitle = Card.CardTitle || (Card.CardTitle = {})); // ========== CardContent ==========


  var CardContent =
  /** @class */
  function (_super) {
    __extends(CardContent, _super);

    function CardContent(elem) {
      return _super.call(this, elem) || this;
    }

    CardContent.className = "card_content";
    return CardContent;
  }(index_1.default);

  Card.CardContent = CardContent;

  (function (CardContent) {
    CardContent.CLASSES = {};
    CardContent.ATTRS = {};
  })(CardContent = Card.CardContent || (Card.CardContent = {}));
})(Card || (Card = {}));

exports.default = Card;
},{"./index":"components/index.ts","../actions/Card":"actions/Card.ts"}],"components/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Navigation_1 = __importDefault(require("./Navigation"));

var Card_1 = __importDefault(require("./Card"));

var Component =
/** @class */
function () {
  function Component(elem) {
    this.elem = elem;
  }

  return Component;
}();

exports.default = Component;

function initComponents() {
  var navigations = document.getElementsByClassName(Navigation_1.default.className);
  var cards = document.getElementsByClassName(Card_1.default.className);

  for (var _i = 0, navigations_1 = navigations; _i < navigations_1.length; _i++) {
    var nav = navigations_1[_i];
    new Navigation_1.default(nav);
  }

  for (var _a = 0, cards_1 = cards; _a < cards_1.length; _a++) {
    var card = cards_1[_a];
    new Card_1.default(card);
  }
}

exports.initComponents = initComponents;
},{"./Navigation":"components/Navigation.ts","./Card":"components/Card.ts"}],"utils/I18n.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function initLocalization() {
  document.documentElement.lang = navigator.language;
}

exports.initLocalization = initLocalization;
},{}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var components_1 = require("./components");

var I18n_1 = require("./utils/I18n");

I18n_1.initLocalization();
components_1.initComponents();
},{"./components":"components/index.ts","./utils/I18n":"utils/I18n.ts"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61874" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/index.js.map