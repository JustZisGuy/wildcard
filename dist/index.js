/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
    var generator = void 0,
        _count = 1,
        _tokens = parsePattern(inputPattern, dictionaries);

    _tokens.forEach(function (token) {
        _count *= token.count();
    });

    generator = {
        count: function count() {
            return _count;
        },
        tokens: function tokens() {
            return _tokens;
        },
        get: function get(index) {
            var skip = 0,
                token = void 0,
                tokenIndex = void 0;

            if (index > _count - 1 || index < 0) {
                return false;
            }

            for (tokenIndex = 0; tokenIndex < _tokens.length; tokenIndex++) {
                token = _tokens[tokenIndex];
                if (token.count() + skip > index) {
                    return token.get(index - skip);
                }
                skip += token.count();
            }
            return false;
        }
    };

    return generator;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createGenerator = __webpack_require__(1),
    dictionaries = __webpack_require__(0);

module.exports = function (options) {
    var generators = [];

    var wildcard = void 0,
        internalIndex = 0,
        patternCount = 0;

    if (options) {
        if (options.dictionaries) {
            options.patterns.map(function (name, words) {
                dictionaries[name] = words;
            });
        }
        if (options.patterns) {
            options.patterns.forEach(function (inputPattern) {
                var generator = createGenerator(inputPattern, dictionaries);

                patternCount += generator.count();
                generators.push(generator);
            });
        }
    }

    wildcard = {
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
            if (internalIndex === patternCount) {
                return false;
            }
            internalIndex++;
            return wildcard.get(internalIndex - 1);
        },
        get: function get(index) {
            var segmentIndex = 0,
                patternIndex = void 0,
                generatorIndex = void 0;

            if (index > patternCount - 1 || index < 0) {
                return false;
            }

            for (generatorIndex = 0; generatorIndex < generatorIndex.length; generatorIndex++) {
                var generator = generators[generatorIndex];

                patternIndex = index - segmentIndex;
                if (generator.count() < patternIndex) {
                    return generator.get(patternIndex);
                }
                segmentIndex += generator.count();
            }
            return false;
        }
    };

    return wildcard;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createToken = __webpack_require__(4),
    regex = /(\\[%@$*#&?-]{1}|[%@$*#&?-]{1}\{.*?\}|[%@$*#&?-]{1})(?=.*)/g,
    parseLengthWithVariants = function parseLengthWithVariants(part, variants) {
    var lengthArgRegex = /\{((\d+)-(\d+)|(\d+))\}/;

    var startLength = 1,
        endLength = 1,
        match = void 0;

    if (part.length > 1) {
        if ((match = lengthArgRegex.exec(part)) !== null) {
            if (match[2]) {
                startLength = parseInt(match[2], 10);
                endLength = parseInt(match[3], 10);
            } else {
                startLength = parseInt(match[1], 10);
                endLength = startLength;
            }
        }
    }

    return {
        variants: variants,
        startLength: startLength,
        endLength: endLength
    };
},
    parseLengthWithString = function parseLengthWithString(part) {
    var lengthArgRegex = /\{'(.*)'(,(\d+)-(\d+)){0,1}(,(\d+)){0,1}\}/;

    var match = void 0,
        startLength = 1,
        endLength = 1;

    if (part.length > 1) {
        if ((match = lengthArgRegex.exec(part)) !== null) {
            if (match[3] && match[4]) {
                startLength = parseInt(match[3], 10);
                endLength = parseInt(match[4], 10);
            } else if (match[6]) {
                startLength = parseInt(match[6], 10);
                endLength = startLength;
            }
            return {
                string: match[1],
                startLength: startLength,
                endLength: endLength
            };
        }
    }
    return false;
},
    simpleTokenizer = function simpleTokenizer(variantsString) {
    var variants = variantsString.split('');

    return function (part) {
        var options = parseLengthWithVariants(part, variants);

        return createToken(options);
    };
},
    tokenizers = {
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
    '%': function _(part, dictionaries) {
        var options = parseLengthWithString(part);

        if (options === false || !dictionaries.hasOwnProperty(options.string)) {
            options = {
                variants: [part],
                startLength: 1,
                endLength: 1
            };
        } else {
            options.variants = dictionaries[options.string];
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
                endLength: 1
            };
        } else {
            options.variants = options.string.split(',');
        }

        return createToken(options);
    }
};

function partToToken(part, dictionaries) {
    var token = void 0;

    if (tokenizers.hasOwnProperty(part[0])) {
        token = tokenizers[part[0]](part, dictionaries);
    } else {
        token = createToken({
            variants: [part]
        });
    }

    return token;
}

module.exports = function (inputPattern, dictionaries) {
    var tokens = [],
        partIndex = void 0,
        parts = inputPattern.split(regex).filter(Boolean);

    for (partIndex = 0; partIndex < parts.length; partIndex++) {
        tokens.push(partToToken(parts[partIndex], dictionaries));
    }

    return tokens;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (options) {
    var token = void 0,
        _count = 0,
        startLength = options.startLength || 1,
        endLength = options.endLength || 1,
        variants = options.variants,
        length = void 0;

    for (length = startLength; length <= endLength; length++) {
        _count += Math.pow(variants.length, length);
    }

    token = {
        count: function count() {
            return _count;
        },
        get: function get(index) {
            var maxi = void 0,
                a = [],
                c = void 0,
                d = void 0,
                k = void 0;

            if (index > _count - 1 || index < 0) {
                return false;
            }

            while ((maxi = Math.floor(Math.pow(variants.length, length))) - 1 < index) {
                index -= maxi;
                length += 1;
            }
            for (k = 0; k < a.length; k++) {
                d = Math.floor(index / variants.length);
                c = index - d * variants.length;
                index /= variants.length;
                a[k] = variants[c];
            }
            return a.join();
        }
    };

    return token;
};

/***/ })
/******/ ]);