/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html {\n  font-family: 'Alegreya';\n  font-size: 1rem;\n  min-height: 100vh;\n}\n\nbody {\n  display: flex;\n  font-size: 1.2rem;\n  margin: 0px;\n  min-height: 100vh;\n  justify-content: center;\n  align-items: center;\n}\n\np {\n  margin: 0px;\n}\n\nbutton {\n  font-family: 'Alegreya';\n}\n\n.sidebar {\n  align-items: center;\n  background-color: white;\n  display: flex;\n  flex: 0 1 200px;\n  flex-direction: column;\n  justify-content: flex-start;\n  padding: 4px;\n}\n\n.travel-tracker-logo {\n  height: 108px;\n  padding-bottom: 20px;\n  padding-top: 40px;\n  width: 200px;\n}\n\n.user-page {\n  display: flex;\n  min-height: 100vh;\n}\n\n.sidebar-buttons {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.sidebar__btn {\n  background-color: #ECB390;\n  border: 1px solid gainsboro;\n  border-radius: 12px;\n  box-shadow: 1px 1px 0.5px grey;\n  cursor: pointer;\n  font-size: 1.5rem;\n  padding: 10px;\n  width: 100%;\n}\n\n.sidebar__btn:hover {\n  background-color: #00917C;\n  box-shadow: 1px 1px 0.5px gray;\n  border-left: 0px;\n  border-top: 0px;\n  color: white;\n  cursor: pointer;\n}\n\n.user-info {\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n}\n\n.user-spending {\n  align-items: center;\n  display: flex;\n  font-size: 1.25rem;\n  padding-left: 18px;\n  text-align: center;\n}\n\n.username {\n  font-size: 1rem;\n}\n\n.profile {\n  align-items: center;\n  display: flex;\n  font-size: 1.2rem;\n  font-weight: bolder;\n  gap: 12px;\n}\n\n.profile-image {\n  height: 30px;\n  border: 2px solid black;\n  border-radius: 50%;\n  width: 30px;\n}\n\n.content {\n  background-color: #ECB390;\n  display: flex;\n  flex: 1 1 0px;\n  flex-direction: column;\n  padding: 30px 20px;\n}\n\n.nav {\n  align-items: center;\n  display:flex;\n  justify-content:space-between;\n}\n\n.nav-title {\n  font-size: 2rem;\n  flex: 1 1 0px;\n  padding-left: 20px;\n}\n\n.nav-buttons {\n  display: flex;\n  gap: 10px;\n}\n\n.nav__btn {\n  border-radius: 50%;\n  padding: 10px;\n}\n\n.end {\n  display:flex;\n  justify-content: flex-end;\n  margin: 0px;\n  padding: 10px;\n}\n\n.home {\n  background-color: #FCF8E8;\n  border-top: none;\n  border-radius: 10px;\n  box-shadow: 3px 3px 2px gainsboro;\n  display: flex;\n  flex: 1 1 0px;\n  flex-direction: column;\n  padding: 20px;\n}\n\n.trip {\n  display: flex;\n  flex: 0 1 0px;\n}\n\n.image-container {\n  flex: 1 1 0px;\n  padding-left: 10px;\n}\n\n.trip-title {\n  display: flex;\n  justify-content: center;\n}\n\n.trip-image {\n  border-radius: 16px;\n  width: 100%;\n}\n\n.trip-details {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 0px;\n  font-size: 1.2rem;\n  gap: 10px;\n  padding-left: 30px;\n}\n\n.form-title {\n  font-size: 1.8rem;\n  padding-left: 20px;\n}\n\n.request-form {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 0px;\n  font-size: 1.2rem;\n  gap: 14px;\n}\n\n.form-buttons {\n  gap: 20px;\n}\n\n.trip-categories {\n  display: flex;\n  flex: 1 1 0px;\n  gap: 20px;\n  justify-content: space-between;\n  padding-top: 20px;\n}\n\n.trip-column {\n  background-color: #00917C;\n  border-radius: 14px;\n  box-shadow: 3px 3px 2px #94B49F;\n  color: #FCF8E8;\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 0px;\n  font-size: 1.25rem;\n  gap: 2px;\n  padding: 10px;\n}\n\n.trip__btn {\n  background-color: #FCF8E8;\n  border: 1px solid gainsboro;\n  border-radius: 4px;\n  box-shadow: 1px 1px 0.5px #94B49F;\n  font-size: 1rem;\n  padding: 2px;\n}\n\n.trip__btn:hover {\n  background-color: white;\n  box-shadow: 1px 1px 0.5px gray;\n  cursor: pointer;\n}\n\n.material-symbols-outlined {\n  font-variation-settings:\n  'FILL' 0,\n  'wght' 400,\n  'GRAD' 0,\n  'opsz' 48\n}\n\n.hidden {\n  display: none\n}\n\n/* Add breakpoints so when the screen is less than 600px in width, everything goes into a column*/\n@media screen and (max-width: 600px) {\n  body {\n    flex-direction: column;\n  }\n  .user-page {\n    flex-direction: column;\n  }\n  .sidebar {\n    padding-bottom: 10px;\n  }\n  .travel-tracker-logo {\n    padding-bottom: 30px;\n    padding-top: 10px;\n  }\n  .trip {\n    flex-direction: column;\n  }\n  .trip-details {\n    padding: 10px 20px;\n  }\n  .trip-categories {\n    flex-direction: column;\n    gap: 20px;\n  }\n  .user-info {\n    flex-direction: column;\n    gap: 10px;\n  }\n  .image-container {\n    align-items: center;\n    display: flex;\n    flex: 1 1 300px;\n    justify-content: center;\n    overflow: hidden;\n  }\n  .trip-image {\n    border-radius: 20px;\n    padding: 20px;\n  }\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,uBAAuB;EACvB,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,iBAAiB;EACjB,WAAW;EACX,iBAAiB;EACjB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,mBAAmB;EACnB,uBAAuB;EACvB,aAAa;EACb,eAAe;EACf,sBAAsB;EACtB,2BAA2B;EAC3B,YAAY;AACd;;AAEA;EACE,aAAa;EACb,oBAAoB;EACpB,iBAAiB;EACjB,YAAY;AACd;;AAEA;EACE,aAAa;EACb,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,yBAAyB;EACzB,2BAA2B;EAC3B,mBAAmB;EACnB,8BAA8B;EAC9B,eAAe;EACf,iBAAiB;EACjB,aAAa;EACb,WAAW;AACb;;AAEA;EACE,yBAAyB;EACzB,8BAA8B;EAC9B,gBAAgB;EAChB,eAAe;EACf,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,8BAA8B;EAC9B,SAAS;AACX;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,kBAAkB;EAClB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,iBAAiB;EACjB,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,YAAY;EACZ,uBAAuB;EACvB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,YAAY;EACZ,6BAA6B;AAC/B;;AAEA;EACE,eAAe;EACf,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,SAAS;AACX;;AAEA;EACE,kBAAkB;EAClB,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,yBAAyB;EACzB,WAAW;EACX,aAAa;AACf;;AAEA;EACE,yBAAyB;EACzB,gBAAgB;EAChB,mBAAmB;EACnB,iCAAiC;EACjC,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,aAAa;AACf;;AAEA;EACE,aAAa;EACb,aAAa;AACf;;AAEA;EACE,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,aAAa;EACb,iBAAiB;EACjB,SAAS;EACT,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,aAAa;EACb,iBAAiB;EACjB,SAAS;AACX;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,aAAa;EACb,aAAa;EACb,SAAS;EACT,8BAA8B;EAC9B,iBAAiB;AACnB;;AAEA;EACE,yBAAyB;EACzB,mBAAmB;EACnB,+BAA+B;EAC/B,cAAc;EACd,aAAa;EACb,sBAAsB;EACtB,aAAa;EACb,kBAAkB;EAClB,QAAQ;EACR,aAAa;AACf;;AAEA;EACE,yBAAyB;EACzB,2BAA2B;EAC3B,kBAAkB;EAClB,iCAAiC;EACjC,eAAe;EACf,YAAY;AACd;;AAEA;EACE,uBAAuB;EACvB,8BAA8B;EAC9B,eAAe;AACjB;;AAEA;EACE;;;;;AAKF;;AAEA;EACE;AACF;;AAEA,iGAAiG;AACjG;EACE;IACE,sBAAsB;EACxB;EACA;IACE,sBAAsB;EACxB;EACA;IACE,oBAAoB;EACtB;EACA;IACE,oBAAoB;IACpB,iBAAiB;EACnB;EACA;IACE,sBAAsB;EACxB;EACA;IACE,kBAAkB;EACpB;EACA;IACE,sBAAsB;IACtB,SAAS;EACX;EACA;IACE,sBAAsB;IACtB,SAAS;EACX;EACA;IACE,mBAAmB;IACnB,aAAa;IACb,eAAe;IACf,uBAAuB;IACvB,gBAAgB;EAClB;EACA;IACE,mBAAmB;IACnB,aAAa;EACf;AACF","sourcesContent":["html {\n  font-family: 'Alegreya';\n  font-size: 1rem;\n  min-height: 100vh;\n}\n\nbody {\n  display: flex;\n  font-size: 1.2rem;\n  margin: 0px;\n  min-height: 100vh;\n  justify-content: center;\n  align-items: center;\n}\n\np {\n  margin: 0px;\n}\n\nbutton {\n  font-family: 'Alegreya';\n}\n\n.sidebar {\n  align-items: center;\n  background-color: white;\n  display: flex;\n  flex: 0 1 200px;\n  flex-direction: column;\n  justify-content: flex-start;\n  padding: 4px;\n}\n\n.travel-tracker-logo {\n  height: 108px;\n  padding-bottom: 20px;\n  padding-top: 40px;\n  width: 200px;\n}\n\n.user-page {\n  display: flex;\n  min-height: 100vh;\n}\n\n.sidebar-buttons {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.sidebar__btn {\n  background-color: #ECB390;\n  border: 1px solid gainsboro;\n  border-radius: 12px;\n  box-shadow: 1px 1px 0.5px grey;\n  cursor: pointer;\n  font-size: 1.5rem;\n  padding: 10px;\n  width: 100%;\n}\n\n.sidebar__btn:hover {\n  background-color: #00917C;\n  box-shadow: 1px 1px 0.5px gray;\n  border-left: 0px;\n  border-top: 0px;\n  color: white;\n  cursor: pointer;\n}\n\n.user-info {\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n}\n\n.user-spending {\n  align-items: center;\n  display: flex;\n  font-size: 1.25rem;\n  padding-left: 18px;\n  text-align: center;\n}\n\n.username {\n  font-size: 1rem;\n}\n\n.profile {\n  align-items: center;\n  display: flex;\n  font-size: 1.2rem;\n  font-weight: bolder;\n  gap: 12px;\n}\n\n.profile-image {\n  height: 30px;\n  border: 2px solid black;\n  border-radius: 50%;\n  width: 30px;\n}\n\n.content {\n  background-color: #ECB390;\n  display: flex;\n  flex: 1 1 0px;\n  flex-direction: column;\n  padding: 30px 20px;\n}\n\n.nav {\n  align-items: center;\n  display:flex;\n  justify-content:space-between;\n}\n\n.nav-title {\n  font-size: 2rem;\n  flex: 1 1 0px;\n  padding-left: 20px;\n}\n\n.nav-buttons {\n  display: flex;\n  gap: 10px;\n}\n\n.nav__btn {\n  border-radius: 50%;\n  padding: 10px;\n}\n\n.end {\n  display:flex;\n  justify-content: flex-end;\n  margin: 0px;\n  padding: 10px;\n}\n\n.home {\n  background-color: #FCF8E8;\n  border-top: none;\n  border-radius: 10px;\n  box-shadow: 3px 3px 2px gainsboro;\n  display: flex;\n  flex: 1 1 0px;\n  flex-direction: column;\n  padding: 20px;\n}\n\n.trip {\n  display: flex;\n  flex: 0 1 0px;\n}\n\n.image-container {\n  flex: 1 1 0px;\n  padding-left: 10px;\n}\n\n.trip-title {\n  display: flex;\n  justify-content: center;\n}\n\n.trip-image {\n  border-radius: 16px;\n  width: 100%;\n}\n\n.trip-details {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 0px;\n  font-size: 1.2rem;\n  gap: 10px;\n  padding-left: 30px;\n}\n\n.form-title {\n  font-size: 1.8rem;\n  padding-left: 20px;\n}\n\n.request-form {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 0px;\n  font-size: 1.2rem;\n  gap: 14px;\n}\n\n.form-buttons {\n  gap: 20px;\n}\n\n.trip-categories {\n  display: flex;\n  flex: 1 1 0px;\n  gap: 20px;\n  justify-content: space-between;\n  padding-top: 20px;\n}\n\n.trip-column {\n  background-color: #00917C;\n  border-radius: 14px;\n  box-shadow: 3px 3px 2px #94B49F;\n  color: #FCF8E8;\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 0px;\n  font-size: 1.25rem;\n  gap: 2px;\n  padding: 10px;\n}\n\n.trip__btn {\n  background-color: #FCF8E8;\n  border: 1px solid gainsboro;\n  border-radius: 4px;\n  box-shadow: 1px 1px 0.5px #94B49F;\n  font-size: 1rem;\n  padding: 2px;\n}\n\n.trip__btn:hover {\n  background-color: white;\n  box-shadow: 1px 1px 0.5px gray;\n  cursor: pointer;\n}\n\n.material-symbols-outlined {\n  font-variation-settings:\n  'FILL' 0,\n  'wght' 400,\n  'GRAD' 0,\n  'opsz' 48\n}\n\n.hidden {\n  display: none\n}\n\n/* Add breakpoints so when the screen is less than 600px in width, everything goes into a column*/\n@media screen and (max-width: 600px) {\n  body {\n    flex-direction: column;\n  }\n  .user-page {\n    flex-direction: column;\n  }\n  .sidebar {\n    padding-bottom: 10px;\n  }\n  .travel-tracker-logo {\n    padding-bottom: 30px;\n    padding-top: 10px;\n  }\n  .trip {\n    flex-direction: column;\n  }\n  .trip-details {\n    padding: 10px 20px;\n  }\n  .trip-categories {\n    flex-direction: column;\n    gap: 20px;\n  }\n  .user-info {\n    flex-direction: column;\n    gap: 10px;\n  }\n  .image-container {\n    align-items: center;\n    display: flex;\n    flex: 1 1 300px;\n    justify-content: center;\n    overflow: hidden;\n  }\n  .trip-image {\n    border-radius: 20px;\n    padding: 20px;\n  }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_modal_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_modal_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_modal_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 7 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".login-start {\n  margin: 0 auto;\n  padding: 20px;\n  width: 180px;\n  text-align: center;\n  color:#00917C;\n}\n\n.modal {\n  display: none;\n  font-family: 'Alegreya';\n}\n\n.modal.is-open {\n  display: block;\n}\n\n.modal__overlay {\n  align-items: center;\n  background: rgba(0,0,0,0.6);\n  display: flex;\n  justify-content: center;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n\n.modal__container {\n  background-color: #fff;\n  border-radius: 12px;\n  box-sizing: border-box;\n  height: 50%;\n  overflow-y: auto;\n  padding: 30px;\n  width: 60%;\n}\n\n.modal__title {\n  color: #00917C;\n  font-size: 1.25rem;\n}\n\n.modal__close {\n  background: transparent;\n  border: 0;\n}\n\n.modal__header {\n  display: flex;\n  justify-content: space-between;\n}\n\n.modal__content {\n  color: rgba(0,0,0,.8);\n  line-height: 1.5;\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n}\n\n.modal__btn {\n  border-radius: 0.25rem;\n  border-style: none;\n  border-width: 0;\n  cursor: pointer;\n  font-size: 1rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  overflow: visible;\n}\n\n.modal__btn:disabled {\n  background-color: rgb(95, 94, 94);\n}\n\n.modal__btn:focus, .modal__btn:hover {\n  transform: scale(1.05);\n}\n\n.modal__btn-primary {\n  background-color: #00917C;\n  color: #fff;\n}\n\n.cost-estimate__btn {\n  background-color: transparent;\n  border: 0px;\n  font-size: 1.5rem;\n  font-weight: bold;\n}\n\n.cost-estimate__btn:hover {\n  color: #ec8442;\n  cursor: pointer;\n  text-decoration: underline;     \n  text-decoration-color: #ec8442;  \n}", "",{"version":3,"sources":["webpack://./src/css/modal.css"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,aAAa;EACb,YAAY;EACZ,kBAAkB;EAClB,aAAa;AACf;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,2BAA2B;EAC3B,aAAa;EACb,uBAAuB;EACvB,eAAe;EACf,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;AACX;;AAEA;EACE,sBAAsB;EACtB,mBAAmB;EACnB,sBAAsB;EACtB,WAAW;EACX,gBAAgB;EAChB,aAAa;EACb,UAAU;AACZ;;AAEA;EACE,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,uBAAuB;EACvB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,qBAAqB;EACrB,gBAAgB;EAChB,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;EACtB,kBAAkB;EAClB,eAAe;EACf,eAAe;EACf,eAAe;EACf,kBAAkB;EAClB,mBAAmB;EACnB,mBAAmB;EACnB,sBAAsB;EACtB,iBAAiB;AACnB;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,yBAAyB;EACzB,WAAW;AACb;;AAEA;EACE,6BAA6B;EAC7B,WAAW;EACX,iBAAiB;EACjB,iBAAiB;AACnB;;AAEA;EACE,cAAc;EACd,eAAe;EACf,0BAA0B;EAC1B,8BAA8B;AAChC","sourcesContent":[".login-start {\n  margin: 0 auto;\n  padding: 20px;\n  width: 180px;\n  text-align: center;\n  color:#00917C;\n}\n\n.modal {\n  display: none;\n  font-family: 'Alegreya';\n}\n\n.modal.is-open {\n  display: block;\n}\n\n.modal__overlay {\n  align-items: center;\n  background: rgba(0,0,0,0.6);\n  display: flex;\n  justify-content: center;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n\n.modal__container {\n  background-color: #fff;\n  border-radius: 12px;\n  box-sizing: border-box;\n  height: 50%;\n  overflow-y: auto;\n  padding: 30px;\n  width: 60%;\n}\n\n.modal__title {\n  color: #00917C;\n  font-size: 1.25rem;\n}\n\n.modal__close {\n  background: transparent;\n  border: 0;\n}\n\n.modal__header {\n  display: flex;\n  justify-content: space-between;\n}\n\n.modal__content {\n  color: rgba(0,0,0,.8);\n  line-height: 1.5;\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n}\n\n.modal__btn {\n  border-radius: 0.25rem;\n  border-style: none;\n  border-width: 0;\n  cursor: pointer;\n  font-size: 1rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  overflow: visible;\n}\n\n.modal__btn:disabled {\n  background-color: rgb(95, 94, 94);\n}\n\n.modal__btn:focus, .modal__btn:hover {\n  transform: scale(1.05);\n}\n\n.modal__btn-primary {\n  background-color: #00917C;\n  color: #fff;\n}\n\n.cost-estimate__btn {\n  background-color: transparent;\n  border: 0px;\n  font-size: 1.5rem;\n  font-weight: bold;\n}\n\n.cost-estimate__btn:hover {\n  color: #ec8442;\n  cursor: pointer;\n  text-decoration: underline;     \n  text-decoration-color: #ec8442;  \n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/travel-tracker-logo.webp");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/profile.webp");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchData": () => (/* binding */ fetchData),
/* harmony export */   "postTripRequest": () => (/* binding */ postTripRequest)
/* harmony export */ });
const errorMessage = document.getElementById('postErrorMessage');

const fetchData = (fileName) => {
  return fetch(`http://localhost:3001/api/v1/${fileName}`)
    .then((response) => response.json())
    .catch((error) =>
      console.log(
        'There was a problem loading your data. Please try again.',
        error
      )
    );
};

const postTripRequest = (formData) => {
  fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type' : 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        console.log(data.message);
        displayErrorMessage(data);
      }
    }).catch(err => displayErrorMessage(err))
}

const displayErrorMessage = (data) => {
  if (!data.message.includes('successfully posted')) {
    errorMessage.innerText = `There was an issue processing your request. ${data.message}`;
  }
  errorMessage.classList.remove('hidden');
}

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _trips_Trip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _destinations_Destination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);




class Traveler {
  constructor(userDetails, tripsData) {
    this.id = userDetails.id;
    this.name = userDetails.name;
    this.travelerType = userDetails.travelerType;
    this.listOfTrips = this.sortTripsByDate(tripsData);
  }

  getFirstName() {
    const splitName = this.name.split(' ');
    return splitName[0]
  }

  getYearlySpendingOnTrips(listOfDestinations) {
    const userSpending = this.listOfTrips.reduce((sum, userTrip) => {    
      const trip = new _trips_Trip__WEBPACK_IMPORTED_MODULE_1__.default(userTrip);
      const tripDestination = new _destinations_Destination__WEBPACK_IMPORTED_MODULE_2__.default(listOfDestinations.getDestinationById(trip.destinationID));
      const totalLodgingCost = tripDestination.getTotalCostOfLodging(trip.duration);
      const totalFlightCost = tripDestination.getTotalCostOfFlights(trip.numOfTravelers);
      const totalSpending = totalLodgingCost + totalFlightCost;
      
      if (trip.status === 'approved' && trip.isBetweenAYear()) {
        sum += totalSpending;
      }
      
      return sum;
    }, 0);

    const agentFee = userSpending * .10;
    const total = userSpending + agentFee;
    return total.toLocaleString("en-US");
  }

  sortTripsByDate(tripsData) {
    const sortedTrips = tripsData
      .filter(trip => trip.userID === this.id)
      .sort((first, last) => {
        return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(last.date) - dayjs__WEBPACK_IMPORTED_MODULE_0___default()(first.date);
      });

    return sortedTrips;
  }

  getEstimatedCostForTrip(listOfDestinations, userInputs) {
    const destination = new _destinations_Destination__WEBPACK_IMPORTED_MODULE_2__.default(listOfDestinations.find(d => d.destination === userInputs.destination));
    const estimatedLogdingCost = destination.getTotalCostOfLodging(userInputs.duration);
    const estimatedFlightCost = destination.getTotalCostOfFlights(userInputs.travelers);
    const tripEstimate = estimatedLogdingCost + estimatedFlightCost;
    const agentFee = tripEstimate * .10;
    const totalEstimate = tripEstimate + agentFee;

    return totalEstimate.toLocaleString("en-US");
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Traveler);

/***/ }),
/* 12 */
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},v="en",D={};D[v]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return v;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(v=i),i||!r&&v},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var v=this.$locale().weekStart||0,D=(y<v?y+7:y)-v;return $(r?m-D:m+(6-D),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,v=O.m(this,M);return v=(l={},l[c]=v/12,l[f]=v,l[h]=v/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?v:O.a(v)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),T=_.prototype;return w.prototype=T,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[v],w.Ls=D,w.p={},w}));

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs_plugin_customParseFormat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var dayjs_plugin_customParseFormat__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_customParseFormat__WEBPACK_IMPORTED_MODULE_1__);
 
const isBetween = __webpack_require__(14);
dayjs__WEBPACK_IMPORTED_MODULE_0___default().extend(isBetween);

dayjs__WEBPACK_IMPORTED_MODULE_0___default().extend((dayjs_plugin_customParseFormat__WEBPACK_IMPORTED_MODULE_1___default()));

class Trip {
  constructor(tripDetails) {
    this.id = tripDetails.id;
    this.userID = tripDetails.userID;
    this.destinationID = tripDetails.destinationID;
    this.numOfTravelers = tripDetails.travelers;
    this.date = this.getDate(tripDetails.date);
    this.duration = tripDetails.duration;
    this.status = tripDetails.status || "pending";
    this.suggestedActivities = tripDetails.suggestedActivities;
  }

  getDate(date) {
    if (date.length <= 9) {
      const parsed = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format('YYYY/MM/DD');
      return parsed;
    } else {
      return date.slice(0, 10);
    }
  }

  isPastTrip() {
    return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(this.date).isBefore(dayjs__WEBPACK_IMPORTED_MODULE_0___default()());
  }

  isUpcomingTrip() {
    return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(this.date).isAfter(dayjs__WEBPACK_IMPORTED_MODULE_0___default()());
  }
  
  isPendingTrip() {
    return this.status === 'pending'; 
  }

  isBetweenAYear() {
    const dateNow = dayjs__WEBPACK_IMPORTED_MODULE_0___default()();
    const yearNow = dayjs__WEBPACK_IMPORTED_MODULE_0___default()().year();
    const dateAYearAgo = dayjs__WEBPACK_IMPORTED_MODULE_0___default()().set('year', yearNow - 1);
    
    return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(this.date).isBetween(dateAYearAgo, dateNow);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Trip);

/***/ }),
/* 14 */
/***/ (function(module) {

!function(e,i){ true?module.exports=i():0}(this,(function(){"use strict";return function(e,i,t){i.prototype.isBetween=function(e,i,s,f){var n=t(e),o=t(i),r="("===(f=f||"()")[0],u=")"===f[1];return(r?this.isAfter(n,s):!this.isBefore(n,s))&&(u?this.isBefore(o,s):!this.isAfter(o,s))||(r?this.isBefore(n,s):!this.isAfter(n,s))&&(u?this.isAfter(o,s):!this.isBefore(o,s))}}}));

/***/ }),
/* 15 */
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},t=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,n=/\d\d/,r=/\d\d?/,i=/\d*[^-_:/,()\s\d]+/,o={},s=function(e){return(e=+e)+(e>68?1900:2e3)};var a=function(e){return function(t){this[e]=+t}},f=[/[+-]\d\d:?(\d\d)?|Z/,function(e){(this.zone||(this.zone={})).offset=function(e){if(!e)return 0;if("Z"===e)return 0;var t=e.match(/([+-]|\d\d)/g),n=60*t[1]+(+t[2]||0);return 0===n?0:"+"===t[0]?-n:n}(e)}],h=function(e){var t=o[e];return t&&(t.indexOf?t:t.s.concat(t.f))},u=function(e,t){var n,r=o.meridiem;if(r){for(var i=1;i<=24;i+=1)if(e.indexOf(r(i,0,t))>-1){n=i>12;break}}else n=e===(t?"pm":"PM");return n},d={A:[i,function(e){this.afternoon=u(e,!1)}],a:[i,function(e){this.afternoon=u(e,!0)}],S:[/\d/,function(e){this.milliseconds=100*+e}],SS:[n,function(e){this.milliseconds=10*+e}],SSS:[/\d{3}/,function(e){this.milliseconds=+e}],s:[r,a("seconds")],ss:[r,a("seconds")],m:[r,a("minutes")],mm:[r,a("minutes")],H:[r,a("hours")],h:[r,a("hours")],HH:[r,a("hours")],hh:[r,a("hours")],D:[r,a("day")],DD:[n,a("day")],Do:[i,function(e){var t=o.ordinal,n=e.match(/\d+/);if(this.day=n[0],t)for(var r=1;r<=31;r+=1)t(r).replace(/\[|\]/g,"")===e&&(this.day=r)}],M:[r,a("month")],MM:[n,a("month")],MMM:[i,function(e){var t=h("months"),n=(h("monthsShort")||t.map((function(e){return e.slice(0,3)}))).indexOf(e)+1;if(n<1)throw new Error;this.month=n%12||n}],MMMM:[i,function(e){var t=h("months").indexOf(e)+1;if(t<1)throw new Error;this.month=t%12||t}],Y:[/[+-]?\d+/,a("year")],YY:[n,function(e){this.year=s(e)}],YYYY:[/\d{4}/,a("year")],Z:f,ZZ:f};function c(n){var r,i;r=n,i=o&&o.formats;for(var s=(n=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,n,r){var o=r&&r.toUpperCase();return n||i[r]||e[r]||i[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,n){return t||n.slice(1)}))}))).match(t),a=s.length,f=0;f<a;f+=1){var h=s[f],u=d[h],c=u&&u[0],l=u&&u[1];s[f]=l?{regex:c,parser:l}:h.replace(/^\[|\]$/g,"")}return function(e){for(var t={},n=0,r=0;n<a;n+=1){var i=s[n];if("string"==typeof i)r+=i.length;else{var o=i.regex,f=i.parser,h=e.slice(r),u=o.exec(h)[0];f.call(t,u),e=e.replace(u,"")}}return function(e){var t=e.afternoon;if(void 0!==t){var n=e.hours;t?n<12&&(e.hours+=12):12===n&&(e.hours=0),delete e.afternoon}}(t),t}}return function(e,t,n){n.p.customParseFormat=!0,e&&e.parseTwoDigitYear&&(s=e.parseTwoDigitYear);var r=t.prototype,i=r.parse;r.parse=function(e){var t=e.date,r=e.utc,s=e.args;this.$u=r;var a=s[1];if("string"==typeof a){var f=!0===s[2],h=!0===s[3],u=f||h,d=s[2];h&&(d=s[2]),o=this.$locale(),!f&&d&&(o=n.Ls[d]),this.$d=function(e,t,n){try{if(["x","X"].indexOf(t)>-1)return new Date(("X"===t?1e3:1)*e);var r=c(t)(e),i=r.year,o=r.month,s=r.day,a=r.hours,f=r.minutes,h=r.seconds,u=r.milliseconds,d=r.zone,l=new Date,m=s||(i||o?1:l.getDate()),M=i||l.getFullYear(),Y=0;i&&!o||(Y=o>0?o-1:l.getMonth());var p=a||0,v=f||0,D=h||0,g=u||0;return d?new Date(Date.UTC(M,Y,m,p,v,D,g+60*d.offset*1e3)):n?new Date(Date.UTC(M,Y,m,p,v,D,g)):new Date(M,Y,m,p,v,D,g)}catch(e){return new Date("")}}(t,a,r),this.init(),d&&!0!==d&&(this.$L=this.locale(d).$L),u&&t!=this.format(a)&&(this.$d=new Date("")),o={}}else if(a instanceof Array)for(var l=a.length,m=1;m<=l;m+=1){s[1]=a[m-1];var M=n.apply(this,s);if(M.isValid()){this.$d=M.$d,this.$L=M.$L,this.init();break}m===l&&(this.$d=new Date(""))}else i.call(this,e)}}}));

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Destination {
  constructor(destinationDetails) {
    this.id = destinationDetails.id;
    this.destination = destinationDetails.destination;
    this.estimatedLodgingCostPerDay = destinationDetails.estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = destinationDetails.estimatedFlightCostPerPerson;
    this.image = destinationDetails.image;
    this.alt = destinationDetails.alt;
  }

  getTotalCostOfLodging(duration) {
    return this.estimatedLodgingCostPerDay * duration;
  }

  getTotalCostOfFlights(numOfTravelers) {
    return this.estimatedFlightCostPerPerson * numOfTravelers;
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Destination);

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class DestinationsRepo {
  constructor(destinationsData) {
    this.destinationsData = destinationsData;
  }

  getDestinationById(destinationId) {
    return this.destinationsData.find(destination => destination.id === destinationId);
  }

  getDestinationIdByName(locationName) {
    const destination = this.destinationsData.find(obj => obj.destination === locationName)
    return destination.id;
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DestinationsRepo);

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function t(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,n=new Array(t);o<t;o++)n[o]=e[o];return n}var n,i,a,r,s,l=(n=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","[contenteditable]",'[tabindex]:not([tabindex^="-"])'],i=function(){function o(e){var n=e.targetModal,i=e.triggers,a=void 0===i?[]:i,r=e.onShow,s=void 0===r?function(){}:r,l=e.onClose,c=void 0===l?function(){}:l,d=e.openTrigger,u=void 0===d?"data-micromodal-trigger":d,f=e.closeTrigger,h=void 0===f?"data-micromodal-close":f,v=e.openClass,g=void 0===v?"is-open":v,m=e.disableScroll,b=void 0!==m&&m,y=e.disableFocus,p=void 0!==y&&y,w=e.awaitCloseAnimation,E=void 0!==w&&w,k=e.awaitOpenAnimation,M=void 0!==k&&k,A=e.debugMode,C=void 0!==A&&A;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),this.modal=document.getElementById(n),this.config={debugMode:C,disableScroll:b,openTrigger:u,closeTrigger:h,openClass:g,onShow:s,onClose:c,awaitCloseAnimation:E,awaitOpenAnimation:M,disableFocus:p},a.length>0&&this.registerTriggers.apply(this,t(a)),this.onClick=this.onClick.bind(this),this.onKeydown=this.onKeydown.bind(this)}var i,a,r;return i=o,(a=[{key:"registerTriggers",value:function(){for(var e=this,t=arguments.length,o=new Array(t),n=0;n<t;n++)o[n]=arguments[n];o.filter(Boolean).forEach((function(t){t.addEventListener("click",(function(t){return e.showModal(t)}))}))}},{key:"showModal",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(this.activeElement=document.activeElement,this.modal.setAttribute("aria-hidden","false"),this.modal.classList.add(this.config.openClass),this.scrollBehaviour("disable"),this.addEventListeners(),this.config.awaitOpenAnimation){var o=function t(){e.modal.removeEventListener("animationend",t,!1),e.setFocusToFirstNode()};this.modal.addEventListener("animationend",o,!1)}else this.setFocusToFirstNode();this.config.onShow(this.modal,this.activeElement,t)}},{key:"closeModal",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=this.modal;if(this.modal.setAttribute("aria-hidden","true"),this.removeEventListeners(),this.scrollBehaviour("enable"),this.activeElement&&this.activeElement.focus&&this.activeElement.focus(),this.config.onClose(this.modal,this.activeElement,e),this.config.awaitCloseAnimation){var o=this.config.openClass;this.modal.addEventListener("animationend",(function e(){t.classList.remove(o),t.removeEventListener("animationend",e,!1)}),!1)}else t.classList.remove(this.config.openClass)}},{key:"closeModalById",value:function(e){this.modal=document.getElementById(e),this.modal&&this.closeModal()}},{key:"scrollBehaviour",value:function(e){if(this.config.disableScroll){var t=document.querySelector("body");switch(e){case"enable":Object.assign(t.style,{overflow:""});break;case"disable":Object.assign(t.style,{overflow:"hidden"})}}}},{key:"addEventListeners",value:function(){this.modal.addEventListener("touchstart",this.onClick),this.modal.addEventListener("click",this.onClick),document.addEventListener("keydown",this.onKeydown)}},{key:"removeEventListeners",value:function(){this.modal.removeEventListener("touchstart",this.onClick),this.modal.removeEventListener("click",this.onClick),document.removeEventListener("keydown",this.onKeydown)}},{key:"onClick",value:function(e){(e.target.hasAttribute(this.config.closeTrigger)||e.target.parentNode.hasAttribute(this.config.closeTrigger))&&(e.preventDefault(),e.stopPropagation(),this.closeModal(e))}},{key:"onKeydown",value:function(e){27===e.keyCode&&this.closeModal(e),9===e.keyCode&&this.retainFocus(e)}},{key:"getFocusableNodes",value:function(){var e=this.modal.querySelectorAll(n);return Array.apply(void 0,t(e))}},{key:"setFocusToFirstNode",value:function(){var e=this;if(!this.config.disableFocus){var t=this.getFocusableNodes();if(0!==t.length){var o=t.filter((function(t){return!t.hasAttribute(e.config.closeTrigger)}));o.length>0&&o[0].focus(),0===o.length&&t[0].focus()}}}},{key:"retainFocus",value:function(e){var t=this.getFocusableNodes();if(0!==t.length)if(t=t.filter((function(e){return null!==e.offsetParent})),this.modal.contains(document.activeElement)){var o=t.indexOf(document.activeElement);e.shiftKey&&0===o&&(t[t.length-1].focus(),e.preventDefault()),!e.shiftKey&&t.length>0&&o===t.length-1&&(t[0].focus(),e.preventDefault())}else t[0].focus()}}])&&e(i.prototype,a),r&&e(i,r),o}(),a=null,r=function(e){if(!document.getElementById(e))return console.warn("MicroModal: ❗Seems like you have missed %c'".concat(e,"'"),"background-color: #f8f9fa;color: #50596c;font-weight: bold;","ID somewhere in your code. Refer example below to resolve it."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<div class="modal" id="'.concat(e,'"></div>')),!1},s=function(e,t){if(function(e){e.length<=0&&(console.warn("MicroModal: ❗Please specify at least one %c'micromodal-trigger'","background-color: #f8f9fa;color: #50596c;font-weight: bold;","data attribute."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<a href="#" data-micromodal-trigger="my-modal"></a>'))}(e),!t)return!0;for(var o in t)r(o);return!0},{init:function(e){var o=Object.assign({},{openTrigger:"data-micromodal-trigger"},e),n=t(document.querySelectorAll("[".concat(o.openTrigger,"]"))),r=function(e,t){var o=[];return e.forEach((function(e){var n=e.attributes[t].value;void 0===o[n]&&(o[n]=[]),o[n].push(e)})),o}(n,o.openTrigger);if(!0!==o.debugMode||!1!==s(n,r))for(var l in r){var c=r[l];o.targetModal=l,o.triggers=t(c),a=new i(o)}},show:function(e,t){var o=t||{};o.targetModal=e,!0===o.debugMode&&!1===r(e)||(a&&a.removeEventListeners(),(a=new i(o)).showModal())},close:function(e){e?a.closeModalById(e):a.closeModal()}});"undefined"!=typeof window&&(window.MicroModal=l);/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (l);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _css_modal_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _images_travel_tracker_logo_webp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _images_profile_webp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _apiCalls_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _travelers_Traveler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _trips_Trip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var _destinations_DestinationsRepo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(17);
/* harmony import */ var micromodal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(18);
// Import styles





// Import local files





// Global variables
let allDestinations;
let currentUser;

// Import third party libraries


// Query Selectors
const username = document.getElementById('username');
const userSpending = document.getElementById('userSpending');
const previewDestination = document.getElementById('previewDestination');
const previewTripDate = document.getElementById('previewTripDate');
const previewDuration = document.getElementById('previewDuration');
const previewNumberOfPeople = document.getElementById('previewNumberOfPeople');
const previewTripCost = document.getElementById('previewTripCost');
const previewImage = document.getElementById('previewImage');
const pastTrips = document.getElementById('pastTrips');
const upcomingTrips = document.getElementById('upcomingTrips');
const pendingTrips = document.getElementById('pendingTrips');
const formTitle = document.getElementById('modalFormTitle');
const formDestinations = document.getElementById('formDestinations');
const tripRequestForm = document.getElementById('requestForm');
const bookTripBtn = document.getElementById('bookTripBtn');
const estimatedCost = document.getElementById('formEstimatedCost');
const getEstimatedCost = document.getElementById('getEstimatedCost');
const formTripDate = document.getElementById('formTripDate');
const formDestination = document.getElementById('formDestinations');
const formDuration = document.getElementById('formDuration');
const formNumOfTravelers = document.getElementById('formNumOfTravelers');
const tripsContainer = document.getElementById('tripsContainer');
const loginForm = document.getElementById('loginForm');
const usernameLogin = document.getElementById('usernameLogin');
const password = document.getElementById('password');
const loginPage = document.getElementById('loginPage');
const userPage = document.getElementById('userPage');
const invalidLogin = document.getElementById('invalidLogin');

// Event Listeners
window.addEventListener('load', () => startApplication());
tripRequestForm.addEventListener('change', () => handleButtonState());
tripRequestForm.addEventListener('submit', (event) => handleFormSubmit(event));
getEstimatedCost.addEventListener('click', () => handleCostEstimate());
tripsContainer.addEventListener('click', (event) => renderSelectedTrip(event))
loginForm.addEventListener('submit', (event) => handleLogin(event));

// Functions
const startApplication = () => {
  micromodal__WEBPACK_IMPORTED_MODULE_8__.default.init();
}

const renderApplication = () => {
  if (!allDestinations) {
    (0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_4__.fetchData)('destinations')
      .then(data => {
        allDestinations = new _destinations_DestinationsRepo__WEBPACK_IMPORTED_MODULE_7__.default(data.destinations);
        renderApplication();
      }).catch((error) => console.log('There was a problem retrieving your data.', error));

    return null;
  }

  if (currentUser && allDestinations) {
    renderUsername();
    renderDestinationChoices(allDestinations);
    renderTripsForUser();
    renderYearlySpending();
    renderMostRecentTrip();
  }
}
  

const renderUsername = () => {
  ;(0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_4__.fetchData)('trips')
    .then(data => {
      const traveler = new _travelers_Traveler__WEBPACK_IMPORTED_MODULE_5__.default(currentUser, data.trips);
      username.innerText = traveler.name;
      formTitle.innerText = `Where would you like to go next, ${traveler.getFirstName()}?`;
    })
}

const renderDestinationChoices = () => {
  formDestinations.innerHTML = '<option value="" disabled selected>Select a destination</option>';
  allDestinations.destinationsData.forEach(object => {
    formDestinations.innerHTML += `<option value="${object.destination}">${object.destination}</option>`;
  });
}

const renderTripsForUser = () => {
  ;(0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_4__.fetchData)('trips')
    .then(data => {
      currentUser = new _travelers_Traveler__WEBPACK_IMPORTED_MODULE_5__.default(currentUser, data.trips);
      pastTrips.innerHTML = '<h3 class="trip-title">Past Trips</h3>';
      upcomingTrips.innerHTML = '<h3 class="trip-title">Upcoming Trips</h3>';
      pendingTrips.innerHTML = '<h3 class="trip-title">Pending Trips</h3>';
      currentUser.listOfTrips.forEach(userTrip => {
        const trip = new _trips_Trip__WEBPACK_IMPORTED_MODULE_6__.default(userTrip);
        const tripDestination = allDestinations.getDestinationById(trip.destinationID);

        if (trip.isPastTrip() && !trip.isPendingTrip()) {
          pastTrips.innerHTML += `<button class="trip__btn">${tripDestination.destination} on ${trip.date}</button>`;
        } else if (trip.isUpcomingTrip() && !trip.isPendingTrip()) {
          upcomingTrips.innerHTML += `<button class="trip__btn">${tripDestination.destination} on ${trip.date}</button>`;
        } else if (trip.isPendingTrip()) {
          pendingTrips.innerHTML += `<button class="trip__btn">${tripDestination.destination} on ${trip.date}</button>`;
        }
      });
    }).catch(err => console.log('There was a problem retrieving your data', err))
}

const renderYearlySpending = () => {
  ;(0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_4__.fetchData)('trips')
  .then(data => {
    currentUser = new _travelers_Traveler__WEBPACK_IMPORTED_MODULE_5__.default(currentUser, data.trips)
    const yearlySpending = currentUser.getYearlySpendingOnTrips(allDestinations);
    userSpending.innerText = `Total Spending this past year: $${yearlySpending}`;
  });
}

const changeDateFormat = (date) => {
  return date.split('-').join('/');
}

const handleFormSubmit = (event) => {
  event.preventDefault();
  (0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_4__.fetchData)('trips')
    .then(data => {
      let tripsLength = data.trips.length;
      let formData = {
        id: tripsLength + 1,
        userID: currentUser.id,
        destinationID: allDestinations.getDestinationIdByName(formDestination.value),
        travelers: parseInt(formNumOfTravelers.value),
        date: changeDateFormat(formTripDate.value),
        duration: parseInt(formDuration.value),
        status: 'pending',
        suggestedActivities: [],
      }
      return formData;
    }).then(formData => {
      (0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_4__.postTripRequest)(formData);
      renderApplication();
      handleButtonState();
      event.target.reset();
      resetEstimatedCost();
    })
}

const resetEstimatedCost = () => {
  estimatedCost.innerText = '';
}

const handleCostEstimate = () => {
  ;(0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_4__.fetchData)('trips')
    .then(data => {
      currentUser = new _travelers_Traveler__WEBPACK_IMPORTED_MODULE_5__.default(currentUser, data.trips);
      let userInputs = {
        destination: formDestination.value, 
        travelers: parseInt(formNumOfTravelers.value),
        duration: parseInt(formDuration.value),
      }
      const estimate = currentUser.getEstimatedCostForTrip(allDestinations.destinationsData, userInputs);
      renderCostEstimate(estimate);
    })
}

const renderCostEstimate = (estimate) => {
  estimatedCost.innerHTML = `<h3>Estimated Cost: $${estimate}</h3>`;
}

const handleButtonState = () => {
  if (
    formTripDate.value === "" ||
    formDestination.value === "" ||
    formDuration.value === "" ||
    formNumOfTravelers.value === ""
  ) {
    bookTripBtn.disabled = true;
    getEstimatedCost.disabled = true;
  } else {
    bookTripBtn.disabled = false;
    getEstimatedCost.disabled = false;
  }
}

const renderMostRecentTrip = () => {
  ;(0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_4__.fetchData)('trips')
    .then(data => {
      const traveler = new _travelers_Traveler__WEBPACK_IMPORTED_MODULE_5__.default(currentUser, data.trips);
      const mostRecentTrip = traveler.listOfTrips[0];
      const destination = allDestinations.getDestinationById(mostRecentTrip.destinationID)

      previewDestination.innerText = destination.destination;
      previewImage.src = destination.image;
      previewImage.alt = destination.alt;
      previewTripDate.innerText = mostRecentTrip.date;
      previewDuration.innerText = `${mostRecentTrip.duration} days`;
      previewNumberOfPeople.innerText = `${mostRecentTrip.travelers} travelers`;
      previewTripCost.innerText = `Cost $${traveler.getEstimatedCostForTrip(allDestinations.destinationsData, {
        destination: destination.destination, 
        travelers: parseInt(mostRecentTrip.travelers),
        duration: parseInt(mostRecentTrip.duration),
      })}`
    })
}
const renderSelectedTrip = (event) => {
  ;(0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_4__.fetchData)('trips') 
    .then(data => {
      const traveler = new _travelers_Traveler__WEBPACK_IMPORTED_MODULE_5__.default(currentUser, data.trips);
      const getInnerText = event.target.innerText;
      const splitText = getInnerText.split(' ');
      const destinationName = splitText.slice(0, splitText.length - 2).join(' ');
      const destinationId = allDestinations.getDestinationIdByName(destinationName);
      const tripObj = traveler.listOfTrips.find(trip => trip.destinationID === destinationId)
      const destination = allDestinations.getDestinationById(destinationId);

      previewDestination.innerText = destination.destination;
      previewImage.src = destination.image;
      previewImage.alt = destination.alt;
      previewTripDate.innerText = tripObj.date;
      previewDuration.innerText = `${tripObj.duration} days`;
      previewNumberOfPeople.innerText = `${tripObj.travelers} travelers`;
      previewTripCost.innerText = `Cost $${traveler.getEstimatedCostForTrip(allDestinations.destinationsData, {
        destination: destinationName, 
        travelers: parseInt(tripObj.travelers),
        duration: parseInt(tripObj.duration),
      })}`
    })
}

const handleLogin = (event) => {
  event.preventDefault();
  if (usernameLogin.value === 'traveler50' && 
  password.value === 'travel') {
    loginPage.classList.add('hidden');
    userPage.classList.remove('hidden');
    event.target.reset();

    (0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_4__.fetchData)('travelers/50')
      .then(data => {
        currentUser = data;
        renderApplication();
      }).catch((error) => console.log('There was a problem retrieving your data.', error));
  } else {
    renderInvalidLogin();
    event.target.reset();
  }
}

const renderInvalidLogin = () => {
  invalidLogin.innerText = 'Invalid login. Please try again.'
  invalidLogin.classList.remove('hidden');
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map