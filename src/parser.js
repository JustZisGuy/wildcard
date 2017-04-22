'use strict';

let parserDictionaries;

const createToken = require('./token'),
    regex = /(\\[%@$*#&?-]{1}|[%@$*#&?-]{1}\{.*?\}|[%@$*#&?-]{1})(?=.*)/g,
    parseLengthWithVariants = (part, variants) => {
        const lengthArgRegex = /\{((\d+)-(\d+)|(\d+))\}/;

        let startLength = 1,
            endLength = 1,
            match;

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
    parseLengthWithString = (part) => {
        const lengthArgRegex = /\{'(.*)'(,(\d+)-(\d+)){0,1}(,(\d+)){0,1}\}/;

        let match,
            startLength = 1,
            endLength = 1;

        if (part.length > 1 && (match = lengthArgRegex.exec(part)) !== null) {
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
        return false;
    },
    simpleTokenizer = (variantsString) => {
        const variants = variantsString.split('');

        return (part) => {
            let options = parseLengthWithVariants(
                part,
                variants
            );

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
        '%': (part) => {
            let options = parseLengthWithString(part);

            if (options === false || !parserDictionaries.hasOwnProperty(options.string)) {
                options = {
                    variants: [part],
                    startLength: 1,
                    endLength: 1
                };
            } else {
                options.variants = parserDictionaries[options.string];
            }

            return createToken(options);
        },
        // special chars/words ${'<comma separated list
        // with \' as "'" mark'[,length | ,length-length]}
        $: (part) => {
            let options = parseLengthWithString(part);

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

function partToToken(part) {
    let token;

    if (tokenizers.hasOwnProperty(part[0])) {
        token = tokenizers[part[0]](part);
    } else if (part[0] === '\\' && tokenizers.hasOwnProperty(part[1])) {
        token = createToken({
            variants: [part.replace(/^\\/, '')]
        });
    } else {
        token = createToken({
            variants: [part]
        });
    }

    return token;
}

module.exports = (inputPattern, dictionaries) => {
    let tokens = [],
        partIndex,
        parts = inputPattern.split(regex).filter(Boolean);

    parserDictionaries = dictionaries;

    for (partIndex = 0; partIndex < parts.length; partIndex++) {
        tokens.push(partToToken(parts[partIndex]));
    }

    return tokens;
};
