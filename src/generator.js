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
            let skip = 0,
                token,
                tokenIndex;

            if (index > count - 1 || index < 0) {
                return false;
            }

            for (tokenIndex = 0; tokenIndex < tokens.length; tokenIndex++) {
                token = tokens[tokenIndex];
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
