(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("wildling", [], factory);
	else if(typeof exports === 'object')
		exports["wildling"] = factory();
	else
		root["wildling"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  colors: ['red', 'blue', 'green', 'black', 'white', 'yellow', 'green', 'magenta', 'orange', 'purple', 'brown', 'gray', 'cyan', 'teal', 'pink', 'crimson'],
  planets: ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'],
  passwords: ['123456', 'password', '12345678', 'qwerty', '12345', '1234567', 'baseball', 'welcome', '1234567890', 'abc123', '111111', '1qaz2wsx', 'dragon', 'master', 'monkey', 'letmein', 'login', 'princess', 'qwertyuiop', 'solo', 'passw0rd', 'starwars']
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parsePattern = __webpack_require__(3);

module.exports = function (inputPattern, dictionaries) {
  var _count = 1;
  var _tokens = parsePattern(inputPattern, dictionaries);

  _tokens.forEach(function (token) {
    _count *= token.count();
  });

  var generator = {
    count: function count() {
      return _count;
    },
    tokens: function tokens() {
      return _tokens;
    },
    get: function get(index) {
      var stringArray = [];
      var indexWithOffset = index;
      var invalidIndex = index > _count - 1 || index < 0;

      if (invalidIndex) {
        return false;
      }
      _tokens.forEach(function (token, tokenIndex) {
        stringArray[tokenIndex] = token.get(indexWithOffset % token.count());
        indexWithOffset = Math.floor(indexWithOffset / token.count());
      });
      return stringArray.join('');
    }
  };

  return generator;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createGenerator = __webpack_require__(1);
var dictionaries = __webpack_require__(0);

function loadDictionariesFromOptions(options) {
  var hasDictionariesOption = options && options.dictionaries;

  if (hasDictionariesOption) {
    Object.keys(options.dictionaries).forEach(function (name) {
      dictionaries[name] = options.dictionaries[name];
    });
  }
}

function generatorsFromPatterns(options) {
  var generators = [];
  var hasPatternsOption = options && options.patterns;

  if (hasPatternsOption) {
    options.patterns.forEach(function (inputPattern) {
      generators.push(createGenerator(inputPattern, dictionaries));
    });
  }
  return generators;
}

function calculatePatternCount(generators) {
  var count = 0;

  generators.forEach(function (generator) {
    count += generator.count();
  });
  return count;
}

module.exports = function (options) {
  var internalIndex = 0;

  loadDictionariesFromOptions(options);
  var _generators = generatorsFromPatterns(options);
  var patternCount = calculatePatternCount(_generators);

  var wildling = {
    index: function index() {
      return internalIndex;
    },
    count: function count() {
      return patternCount;
    },
    reset: function reset() {
      internalIndex = 0;
    },
    next: function next() {
      var outOfResults = internalIndex === patternCount;

      if (outOfResults) {
        return false;
      }
      internalIndex += 1;
      return wildling.get(internalIndex - 1);
    },
    generators: function generators() {
      return _generators;
    },
    get: function get(index) {
      var segmentIndex = 0;
      var invalidIndex = index > patternCount - 1 || index < 0;

      if (invalidIndex) {
        return false;
      }
      for (var generatorIndex = 0; generatorIndex < _generators.length; generatorIndex += 1) {
        var generator = _generators[generatorIndex];
        var patternIndex = index - segmentIndex;
        var foundPatternInGenerator = patternIndex < generator.count();

        if (foundPatternInGenerator) {
          return generator.get(patternIndex);
        }
        segmentIndex += generator.count();
      }
      return false; // this will never happen
    }
  };

  return wildling;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parserDictionaries = void 0;

var createToken = __webpack_require__(4);

var tokenParsingRegex = /(\\[%@$*#&?-]{1}|[%@$*#&?-]{1}\{.*?\}|[%@$*#&?-]{1})(?=.*)/g;

function parseLengthWithVariants(part, variants) {
  var lengthArgRegex = /\{((\d+)-(\d+)|(\d+))\}/;
  var match = lengthArgRegex.exec(part);
  var partStringHasRangeParameters = match !== null && match[2];
  var partStringHasLengthParameter = match !== null && match[1];

  var startLength = 1;
  var endLength = 1;

  if (partStringHasRangeParameters) {
    startLength = parseInt(match[2], 10);
    endLength = parseInt(match[3], 10);
  } else if (partStringHasLengthParameter) {
    startLength = parseInt(match[1], 10);
    endLength = startLength;
  }

  return {
    variants: variants,
    startLength: startLength,
    endLength: endLength,
    src: part
  };
}

function parseLengthWithString(part) {
  var lengthArgRegex = /\{'(.*)'(,(\d+)-(\d+)){0,1}(,(\d+)){0,1}\}/;
  var match = lengthArgRegex.exec(part);
  var partStringHasRangeParameters = match !== null && match[3] && match[4];
  var partStringHasLengthParameter = match !== null && match[6];

  if (partStringHasRangeParameters) {
    return {
      string: match[1],
      startLength: parseInt(match[3], 10),
      endLength: parseInt(match[4], 10),
      src: part
    };
  } else if (partStringHasLengthParameter) {
    var length = parseInt(match[6], 10);

    return {
      string: match[1],
      startLength: length,
      endLength: length,
      src: part
    };
  } else if (match !== null) {
    return {
      string: match[1],
      startLength: 1,
      endLength: 1,
      src: part
    };
  }
  return false;
}

function simpleTokenizer(variantsString) {
  var variants = variantsString.split('');

  return function (part) {
    var options = parseLengthWithVariants(part, variants);

    return createToken(options);
  };
}

var tokenizers = {
  // 0-9
  '#': simpleTokenizer('0123456789'),
  // a-z
  '@': simpleTokenizer('abcdefghijklmnopqrstuvwxyz'),
  // a-z0-9
  '*': simpleTokenizer('abcdefghijklmnopqrstuvwxyz0123456789'),
  // a-zA-Z0-9
  '-': simpleTokenizer('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'),
  // A-Z
  '!': simpleTokenizer('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
  // A-Z0-9
  '?': simpleTokenizer('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'),
  // a-zA-Z
  '&': simpleTokenizer('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
  // dictionary
  '%': function _(part) {
    var options = parseLengthWithString(part);
    var partMissingOptions = options === false || !(options.string in parserDictionaries);

    if (partMissingOptions) {
      options = {
        variants: [part],
        startLength: 1,
        endLength: 1,
        src: part
      };
    } else {
      options.variants = parserDictionaries[options.string];
    }

    return createToken(options);
  },
  // special chars/words ${'<comma separated list
  // with \' as "'" mark'[,length | ,length-length]}
  $: function $(part) {
    var options = parseLengthWithString(part);

    if (options === false) {
      options = {
        variants: [part],
        startLength: 1,
        endLength: 1,
        src: part
      };
    } else {
      options.variants = options.string.split(',');
    }

    return createToken(options);
  }
};

function partToToken(part) {
  var tokenizerMatches = part[0] in tokenizers;
  var isEscapedToken = part.length > 1 && part[0] === '\\' && part[1] in tokenizers;
  var token = void 0;

  if (tokenizerMatches) {
    token = tokenizers[part[0]](part);
  } else if (isEscapedToken) {
    token = createToken({
      variants: [part.replace(/^\\/, '')],
      src: part
    });
  } else {
    token = createToken({
      variants: [part],
      src: part
    });
  }

  return token;
}

module.exports = function (inputPattern, dictionaries) {
  var tokens = [];
  var parts = inputPattern.split(tokenParsingRegex).filter(Boolean);

  parserDictionaries = dictionaries;

  parts.forEach(function (part) {
    return tokens.push(partToToken(part));
  });

  return tokens;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function defaultIntegerOption(option, fallback) {
  return typeof option === 'number' && option >= 0 ? option : fallback;
}

module.exports = function (options) {
  var _count = 0;
  var startLength = defaultIntegerOption(options.startLength, 1);
  var endLength = defaultIntegerOption(options.endLength, 1);
  var variants = options.variants || [];

  for (var length = startLength; length <= endLength; length += 1) {
    _count += variants.length ** length;
  }

  // calculate length of target combination and index for that particular length
  function getTokenParameters(index) {
    var stringLength = void 0;
    var indexWithOffset = void 0;

    indexWithOffset = index;
    for (stringLength = startLength; stringLength <= endLength; stringLength += 1) {
      var offsetCount = variants.length ** stringLength;
      if (indexWithOffset < offsetCount) {
        break;
      } else {
        indexWithOffset -= offsetCount;
      }
    }

    return {
      indexWithOffset: indexWithOffset,
      stringLength: stringLength
    };
  }

  function calculateTokenString(tokenParameters) {
    var stringArray = [];
    var indexWithOffset = tokenParameters.indexWithOffset;

    // calculate combination parts
    for (var stringIndex = 0; stringIndex < tokenParameters.stringLength; stringIndex += 1) {
      var variantIndex = indexWithOffset % variants.length;
      indexWithOffset = Math.floor(indexWithOffset / variants.length);
      stringArray[stringIndex] = variants[variantIndex];
    }
    return stringArray.join('');
  }

  var token = {
    count: function count() {
      return _count;
    },
    src: function src() {
      return options.src;
    },
    get: function get(index) {
      var invalidIndex = index > _count - 1 || index < 0;

      if (invalidIndex) {
        return false;
      }

      // special case, zero length string
      if (index === 0 && startLength === 0) {
        return '';
      }

      var tokenParameters = getTokenParameters(index);

      return calculateTokenString(tokenParameters);
    }
  };

  return token;
};

/***/ })
/******/ ]);
});