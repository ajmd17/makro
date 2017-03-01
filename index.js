"use strict";
var util = {
  objectToString: function (obj) {
    if (typeof obj == 'object') {
      return JSON.stringify(obj);
    }
    return String(obj);
  },
  substituteArguments: function (code, params) {
    var paramKeys = [];
    return code.replace(/{([^{}]*)}/g, function (a, b) {
      var keyIndex = paramKeys.indexOf(b);
      if (keyIndex == -1) {
        keyIndex = paramKeys.length;
        paramKeys.push(b);
      }
      return params.length >= keyIndex
        ? util.objectToString(params[keyIndex]) : 'undefined';
    });
  },
  makeMacro: function (code) {
    if (typeof code === 'string') {
      return function () {
        return eval(util.substituteArguments(code, arguments));
      };
    }
    return code;
  }
};
var makro = function (name, code) {
  // definition of a macro
  // check for whitespace
  if (/\s/g.test(name)) {
    throw new Error('Macro name \'' + name + '\' must not contain whitespace');
  }
  var macro = util.makeMacro(typeof code !== 'undefined' ? code : 1);
  var hasParams = false;
  if (typeof code === 'string') {
    hasParams = /{([^{}]*)}/g.test(code);
  }
  else {
    hasParams = true;
  }
  var defineProps = function (obj) {
    if (hasParams) {
      Object.defineProperty(obj, name, {
        value: macro,
        writable: false
      });
    }
    else {
      // no params, use a getter
      Object.defineProperty(obj, name, {
        get: macro
      });
    }
  };
  defineProps(makro);
  if (makro.enableGlobals) {
    if (typeof window !== 'undefined') {
      defineProps(window);
    }
  }
  return macro;
};
makro.enableGlobals = false;
makro.defined = function (name) {
  return typeof makro[name] === 'function';
};
exports['default'] = makro;
module.exports = exports['default'];