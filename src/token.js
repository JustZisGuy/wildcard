function defaultIntegerOption(option, fallback) {
  return typeof option === 'number' && option >= 0 ? option : fallback;
}

module.exports = (options) => {
  let count = 0;
  const startLength = defaultIntegerOption(options.startLength, 1);
  const endLength = defaultIntegerOption(options.endLength, 1);
  const variants = options.variants || [];

  for (let length = startLength; length <= endLength; length += 1) {
    count += variants.length ** length;
  }

    // calculate length of target combination and index for that particular length
  function getTokenParameters(index) {
    let stringLength;
    let indexWithOffset;

    indexWithOffset = index;
    for (stringLength = startLength; stringLength <= endLength; stringLength += 1) {
      const offsetCount = variants.length ** stringLength;
      if (indexWithOffset < offsetCount) {
        break;
      } else {
        indexWithOffset -= offsetCount;
      }
    }

    return {
      indexWithOffset,
      stringLength,
    };
  }

  function calculateTokenString(tokenParameters) {
    const stringArray = [];
    let indexWithOffset = tokenParameters.indexWithOffset;

        // calculate combination parts
    for (let stringIndex = 0; stringIndex < tokenParameters.stringLength; stringIndex += 1) {
      const variantIndex = indexWithOffset % variants.length;
      indexWithOffset = Math.floor(indexWithOffset / variants.length);
      stringArray[stringIndex] = variants[variantIndex];
    }
    return stringArray.join('');
  }

  const token = {
    count: () => count,
    src: () => options.src,
    get: (index) => {
      const invalidIndex = index > count - 1 || index < 0;

      if (invalidIndex) {
        return false;
      }

            // special case, zero length string
      if (index === 0 && startLength === 0) {
        return '';
      }

      const tokenParameters = getTokenParameters(index);

      return calculateTokenString(tokenParameters);
    },
  };

  return token;
};
