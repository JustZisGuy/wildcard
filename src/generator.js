const parsePattern = require('./parser');

module.exports = (inputPattern, dictionaries) => {
    let generator;
    let count = 1;
    let tokens = parsePattern(inputPattern, dictionaries);

    tokens.forEach((token) => {
        count *= token.count();
    });

    generator = {
        count: () => count,
        tokens: () => tokens,
        get: (index) => {
            let stringArray = [];
            let indexWithOffset = index;

            if (index > count - 1 || index < 0) {
                return false;
            }
            tokens.forEach((token, tokenIndex) => {
                stringArray[tokenIndex] = token.get(indexWithOffset % token.count());
                indexWithOffset = Math.floor(indexWithOffset / token.count());
            });
            return stringArray.join('');
        }
    };

    return generator;
};
