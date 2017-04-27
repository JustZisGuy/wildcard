function defaultIntegerOption(option, fallback) {
    return typeof option === 'number' && option >= 0 ? option : fallback;
}

module.exports = (options) => {
    let token;
    let count = 0;
    let startLength = defaultIntegerOption(options.startLength, 1);
    let endLength = defaultIntegerOption(options.endLength, 1);
    let variants = options.variants || [];
    let length;

    for (length = startLength; length <= endLength; length++) {
        count += Math.pow(variants.length, length);
    }

    // calculate length of target combination and index for that particular length
    function getTokenParameters(index) {
        let offsetCount;
        let stringLength;
        let indexWithOffset;

        indexWithOffset = index;
        for (stringLength = startLength; stringLength <= endLength; stringLength++) {
            offsetCount = Math.pow(variants.length, stringLength);
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
        let stringArray = [];
        let stringIndex;
        let variantIndex;
        let indexWithOffset = tokenParameters.indexWithOffset;

        // calculate combination parts
        for (stringIndex = 0; stringIndex < tokenParameters.stringLength; stringIndex++) {
            variantIndex = indexWithOffset % variants.length;
            indexWithOffset = Math.floor(indexWithOffset / variants.length);
            stringArray[stringIndex] = variants[variantIndex];
        }
        return stringArray.join('');
    }

    token = {
        count: () => count,
        src: () => options.src,
        get: (index) => {
            let tokenParameters;
            let invalidIndex = index > count - 1 || index < 0;

            if (invalidIndex) {
                return false;
            }

            // special case, zero length string
            if (index === 0 && startLength === 0) {
                return '';
            }

            tokenParameters = getTokenParameters(index);

            return calculateTokenString(tokenParameters);
        }
    };

    return token;
};
