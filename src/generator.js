const parsePattern = require('./parser');

module.exports = (inputPattern, dictionaries) => {
  let count = 1;
  const tokens = parsePattern(inputPattern, dictionaries);

  tokens.forEach((token) => {
    count *= token.count();
  });

  const generator = {
    count: () => count,
    tokens: () => tokens,
    get: (index) => {
      const stringArray = [];
      let indexWithOffset = index;
      const invalidIndex = index > count - 1 || index < 0;

      if (invalidIndex) {
        return false;
      }
      tokens.forEach((token, tokenIndex) => {
        stringArray[tokenIndex] = token.get(indexWithOffset % token.count());
        indexWithOffset = Math.floor(indexWithOffset / token.count());
      });
      return stringArray.join('');
    },
  };

  return generator;
};
