'use strict';

const parsePattern = require('./parser');

module.exports = (inputPattern, dictionaries) => {
    let generator,
        count = 1,
        tokens = parsePattern(inputPattern, dictionaries);

    tokens.forEach((token) => {
        count *= token.count();
    });

    generator = {
        count: () => {
            return count;
        },
        tokens: () => {
            return tokens;
        },
        get: (index) => {
            let token,
                tokenIndex,
                stringArray = [],
                indexWithOffset = index;

            if (index > count - 1 || index < 0) {
                return false;
            }
            for (tokenIndex = 0; tokenIndex < tokens.length; tokenIndex++) {
                token = tokens[tokenIndex];
                stringArray[tokenIndex] = token.get(indexWithOffset % token.count());
                indexWithOffset = Math.floor(indexWithOffset / token.count());
            }
            return stringArray.join('');
        }
    };

    return generator;
};
