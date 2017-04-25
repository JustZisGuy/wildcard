function intOption(option, fallback) {
    return typeof option === 'number' && option >= 0 ? option : fallback;
}

module.exports = (options) => {
    let token,
        count = 0,
        startLength = intOption(options.startLength, 1),
        endLength = intOption(options.endLength, 1),
        variants = options.variants || [],
        length;

    for (length = startLength; length <= endLength; length++) {
        count += Math.pow(variants.length, length);
    }

    // calculate length of target combination and index for that particular length
    function getTokenParameters(index) {
        let offsetCount,
            stringLength,
            indexWithOffset;

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
        let stringArray = [],
            stringIndex,
            variantIndex,
            indexWithOffset = tokenParameters.indexWithOffset;

        // calculate combination parts
        for (stringIndex = 0; stringIndex < tokenParameters.stringLength; stringIndex++) {
            variantIndex = indexWithOffset % variants.length;
            indexWithOffset = Math.floor(indexWithOffset / variants.length);
            stringArray[stringIndex] = variants[variantIndex];
        }
        return stringArray.join('');
    }

    token = {
        count: () => {
            return count;
        },
        get: (index) => {
            let tokenParameters;

            if (index > count - 1 || index < 0) {
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
