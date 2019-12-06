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
})({"components/Component.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function Component(elem) {
  _classCallCheck(this, Component);

  this.elem = elem;
};

var _default = Component;
exports.default = _default;
},{}],"actions/Card.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openCard = openCard;
exports.closeCard = closeCard;
exports.CARD_CLOSE = exports.CARD_OPEN = void 0;

var _index = require("./index");

var CARD_OPEN = "CARD_OPEN";
exports.CARD_OPEN = CARD_OPEN;
var CARD_CLOSE = "CARD_CLOSE";
exports.CARD_CLOSE = CARD_CLOSE;

function openCard(card) {
  return (0, _index.dispatch)({
    type: CARD_OPEN,
    value: card
  });
}

function closeCard(card) {
  return (0, _index.dispatch)({
    type: CARD_CLOSE,
    value: card
  });
}
},{"./index":"actions/index.ts"}],"actions/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatch = dispatch;

var _Navigation = require("./Navigation");

var _Card = require("./Card");

function dispatch(action) {
  switch (action.type) {
    case _Navigation.NAVIGATION_TAB_ACTIVE_CHANGE:
      (function () {
        var _action$value = action.value,
            navigation = _action$value.navigation,
            tab = _action$value.tab;

        if (tab && !tab.active) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = navigation.tabs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var child = _step.value;
              child.active = false;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          tab.active = true; // ToDo: オートスクロール機能
        }
      })();

      break;

    case _Navigation.NAVIGATION_PANEL_ACTIVE_CHANGE:
      (function () {
        var panel = action.value.panel;

        if (panel && !panel.active) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = panel.group.panels[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var child = _step2.value;
              child.active = false;
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          panel.active = true;
        }
      })();

      break;

    case _Card.CARD_OPEN:
      action.value.open = true;
      break;

    case _Card.CARD_CLOSE:
      action.value.open = false;
      break;
  }
}
},{"./Navigation":"actions/Navigation.ts","./Card":"actions/Card.ts"}],"actions/Navigation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeTabActive = changeTabActive;
exports.changePanelActive = changePanelActive;
exports.NAVIGATION_PANEL_ACTIVE_CHANGE = exports.NAVIGATION_TAB_ACTIVE_CHANGE = void 0;

var _index = require("./index");

var NAVIGATION_TAB_ACTIVE_CHANGE = "NAVIGATION_TAB_ACTIVE_CHANGE";
exports.NAVIGATION_TAB_ACTIVE_CHANGE = NAVIGATION_TAB_ACTIVE_CHANGE;
var NAVIGATION_PANEL_ACTIVE_CHANGE = "NAVIGATION_PANEL_ACTIVE_CHANGE";
exports.NAVIGATION_PANEL_ACTIVE_CHANGE = NAVIGATION_PANEL_ACTIVE_CHANGE;

function changeTabActive(navigation, tab) {
  return (0, _index.dispatch)({
    type: NAVIGATION_TAB_ACTIVE_CHANGE,
    value: {
      navigation: navigation,
      tab: tab
    }
  });
}

function changePanelActive(navigation, panel) {
  return (0, _index.dispatch)({
    type: NAVIGATION_PANEL_ACTIVE_CHANGE,
    value: {
      navigation: navigation,
      panel: panel
    }
  });
}
},{"./index":"actions/index.ts"}],"components/Navigation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Navigation = void 0;

var _Component5 = _interopRequireDefault(require("./Component"));

var _Navigation = require("../actions/Navigation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Navigation =
/*#__PURE__*/
function (_Component) {
  _inherits(Navigation, _Component);

  function Navigation(elem) {
    var _this;

    _classCallCheck(this, Navigation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Navigation).call(this, elem));

    _this.register();

    return _this;
  }

  _createClass(Navigation, [{
    key: "register",
    value: function register() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.tabs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var childTab = _step.value;
          childTab.register(this);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "tabs",
    get: function get() {
      var tabs = this.elem.querySelectorAll(":scope > .".concat(Navigation.Tab.className));
      return Array.from(tabs).map(function (tab) {
        return new Navigation.Tab(tab);
      });
    }
  }]);

  return Navigation;
}(_Component5.default);

exports.Navigation = Navigation;
Navigation.className = "navigation";

(function (Navigation) {
  Navigation.CLASSES = {};
  Navigation.ATTRS = {}; // ========== Trigger ==========

  var Trigger =
  /*#__PURE__*/
  function (_Component2) {
    _inherits(Trigger, _Component2);

    function Trigger(elem) {
      _classCallCheck(this, Trigger);

      return _possibleConstructorReturn(this, _getPrototypeOf(Trigger).call(this, elem));
    }

    _createClass(Trigger, [{
      key: "register",
      value: function register() {
        var _this2 = this;

        if (!this.available) return;
        this.elem.addEventListener("click", function () {
          return _this2.handleClick();
        });
      }
    }, {
      key: "selector",
      get: function get() {
        return this.elem.getAttribute("selector");
      },
      set: function set(val) {
        this.elem.setAttribute("selector", val);
      }
    }, {
      key: "matched",
      get: function get() {
        return this.selector ? document.querySelector(this.selector) : null;
      }
    }, {
      key: "available",
      get: function get() {
        return Boolean(this.selector && this.matched);
      }
    }]);

    return Trigger;
  }(_Component5.default);

  Navigation.Trigger = Trigger; // ========== Tab ==========

  var Tab =
  /*#__PURE__*/
  function (_Trigger) {
    _inherits(Tab, _Trigger);

    function Tab(elem) {
      _classCallCheck(this, Tab);

      return _possibleConstructorReturn(this, _getPrototypeOf(Tab).call(this, elem));
    }

    _createClass(Tab, [{
      key: "register",
      value: function register(navigation) {
        var _this3 = this;

        if (!this.available) return;
        this.elem.addEventListener("click", function () {
          return _this3.handleClick(navigation);
        });
      }
    }, {
      key: "handleClick",
      value: function handleClick(navigation) {
        if (!this.disabled && !this.active) {
          (0, _Navigation.changeTabActive)(navigation, this);
          (0, _Navigation.changePanelActive)(navigation, this.matched);
        }
      }
    }, {
      key: "active",
      get: function get() {
        return this.elem.hasAttribute(Tab.ATTRS.ACTIVE);
      },
      set: function set(val) {
        val ? this.elem.setAttribute(Tab.ATTRS.ACTIVE, "") : this.elem.removeAttribute(Tab.ATTRS.ACTIVE);
      }
    }, {
      key: "disabled",
      get: function get() {
        return this.elem.hasAttribute(Tab.ATTRS.DISABLED);
      },
      set: function set(val) {
        val ? this.elem.setAttribute(Tab.ATTRS.DISABLED, "") : this.elem.removeAttribute(Tab.ATTRS.DISABLED);
      }
    }, {
      key: "matched",
      get: function get() {
        return new Navigation.Panel(_get(_getPrototypeOf(Tab.prototype), "matched", this));
      }
    }]);

    return Tab;
  }(Trigger);

  Tab.className = "navigation_tab";
  Navigation.Tab = Tab;

  (function (Tab) {
    Tab.CLASSES = {};
    Tab.ATTRS = {
      ACTIVE: "active",
      DISABLED: "disabled"
    };
  })(Tab = Navigation.Tab || (Navigation.Tab = {})); // ========== Panel ==========


  var Panel =
  /*#__PURE__*/
  function (_Component3) {
    _inherits(Panel, _Component3);

    function Panel(elem) {
      _classCallCheck(this, Panel);

      return _possibleConstructorReturn(this, _getPrototypeOf(Panel).call(this, elem));
    }

    _createClass(Panel, [{
      key: "id",
      get: function get() {
        return this.elem.id;
      }
    }, {
      key: "group",
      get: function get() {
        return new Navigation.Panel.PanelGroup(this.elem.parentElement);
      }
    }, {
      key: "active",
      get: function get() {
        return this.elem.hasAttribute(Panel.ATTRS.ACTIVE);
      },
      set: function set(val) {
        val ? this.elem.setAttribute(Panel.ATTRS.ACTIVE, "") : this.elem.removeAttribute(Panel.ATTRS.ACTIVE);
      }
    }]);

    return Panel;
  }(_Component5.default);

  Panel.className = "navigation_panel";
  Navigation.Panel = Panel;

  (function (Panel) {
    Panel.CLASSES = {};
    Panel.ATTRS = {
      ACTIVE: "active"
    }; // ========== PanelGroup ==========

    var PanelGroup =
    /*#__PURE__*/
    function (_Component4) {
      _inherits(PanelGroup, _Component4);

      function PanelGroup(elem) {
        _classCallCheck(this, PanelGroup);

        return _possibleConstructorReturn(this, _getPrototypeOf(PanelGroup).call(this, elem));
      }

      _createClass(PanelGroup, [{
        key: "panels",
        get: function get() {
          var panels = this.elem.querySelectorAll(":scope > .".concat(Panel.className));
          return Array.from(panels).map(function (panel) {
            return new Panel(panel);
          });
        }
      }, {
        key: "activePanel",
        get: function get() {
          return this.panels.find(function (panel) {
            return panel.active;
          });
        }
      }]);

      return PanelGroup;
    }(_Component5.default);

    PanelGroup.className = "navigation_panelGroup";
    Panel.PanelGroup = PanelGroup;

    (function (PanelGroup) {
      PanelGroup.CLASSES = {};
      PanelGroup.ATTRS = {};
    })(PanelGroup = Panel.PanelGroup || (Panel.PanelGroup = {}));
  })(Panel = Navigation.Panel || (Navigation.Panel = {}));
})(Navigation || (exports.Navigation = Navigation = {}));

var _default = Navigation;
exports.default = _default;
},{"./Component":"components/Component.ts","../actions/Navigation":"actions/Navigation.ts"}],"components/Card.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Card = void 0;

var _Component4 = _interopRequireDefault(require("./Component"));

var _Card = require("../actions/Card");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Card =
/*#__PURE__*/
function (_Component) {
  _inherits(Card, _Component);

  function Card(elem) {
    var _this;

    _classCallCheck(this, Card);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Card).call(this, elem));

    _this.register();

    return _this;
  }

  _createClass(Card, [{
    key: "register",
    value: function register() {
      var _this2 = this;

      this.cardTitle.elem.addEventListener("click", function () {
        return _this2.handleOpen();
      });
    }
  }, {
    key: "handleOpen",
    value: function handleOpen() {
      !this.open ? (0, _Card.openCard)(this) : (0, _Card.closeCard)(this);
    }
  }, {
    key: "open",
    get: function get() {
      return this.elem.hasAttribute(Card.ATTRS.OPEN);
    },
    set: function set(val) {
      val ? this.elem.setAttribute(Card.ATTRS.OPEN, "") : this.elem.removeAttribute(Card.ATTRS.OPEN);
    }
  }, {
    key: "cardTitle",
    get: function get() {
      return new Card.CardTitle(this.elem.querySelector(":scope > .".concat(Card.CardTitle.className)));
    }
  }, {
    key: "cardContent",
    get: function get() {
      return new Card.CardContent(this.elem.querySelector(":scope > .".concat(Card.CardContent.className)));
    }
  }]);

  return Card;
}(_Component4.default);

exports.Card = Card;
Card.className = "card";

(function (Card) {
  Card.CLASSES = {};
  Card.ATTRS = {
    OPEN: "open"
  }; // ========== CardTitle ==========

  var CardTitle =
  /*#__PURE__*/
  function (_Component2) {
    _inherits(CardTitle, _Component2);

    function CardTitle(elem) {
      _classCallCheck(this, CardTitle);

      return _possibleConstructorReturn(this, _getPrototypeOf(CardTitle).call(this, elem));
    }

    return CardTitle;
  }(_Component4.default);

  CardTitle.className = "card_title";
  Card.CardTitle = CardTitle;

  (function (CardTitle) {
    CardTitle.CLASSES = {};
    CardTitle.ATTRS = {};
  })(CardTitle = Card.CardTitle || (Card.CardTitle = {})); // ========== CardContent ==========


  var CardContent =
  /*#__PURE__*/
  function (_Component3) {
    _inherits(CardContent, _Component3);

    function CardContent(elem) {
      _classCallCheck(this, CardContent);

      return _possibleConstructorReturn(this, _getPrototypeOf(CardContent).call(this, elem));
    }

    return CardContent;
  }(_Component4.default);

  CardContent.className = "card_content";
  Card.CardContent = CardContent;

  (function (CardContent) {
    CardContent.CLASSES = {};
    CardContent.ATTRS = {};
  })(CardContent = Card.CardContent || (Card.CardContent = {}));
})(Card || (exports.Card = Card = {}));

var _default = Card;
exports.default = _default;
},{"./Component":"components/Component.ts","../actions/Card":"actions/Card.ts"}],"components/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initComponents = initComponents;

var _Navigation = _interopRequireDefault(require("./Navigation"));

var _Card = _interopRequireDefault(require("./Card"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initComponents() {
  var navigations = document.getElementsByClassName(_Navigation.default.className);
  var cards = document.getElementsByClassName(_Card.default.className);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = navigations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var nav = _step.value;
      new _Navigation.default(nav);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = cards[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var card = _step2.value;
      new _Card.default(card);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}
},{"./Navigation":"components/Navigation.ts","./Card":"components/Card.ts"}],"utils/I18n.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initLocalization = initLocalization;

function initLocalization() {
  document.documentElement.lang = navigator.language;
}
},{}],"index.ts":[function(require,module,exports) {
"use strict";

var _index = require("./components/index");

var _I18n = require("./utils/I18n");

(0, _I18n.initLocalization)();
(0, _index.initComponents)();
},{"./components/index":"components/index.ts","./utils/I18n":"utils/I18n.ts"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56140" + '/');

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
//# sourceMappingURL=index.js.map