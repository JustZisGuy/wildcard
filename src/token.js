'use strict';

module.exports = (options) => {
    let token,
        count = 0,
        startLength = options.startLength || 1,
        endLength = options.endLength || 1,
        variants = options.variants,
        length;

    for (length = startLength; length <= endLength; length++) {
        count += Math.pow(variants.length, length);
    }

    token = {
        count: () => {
            return count;
        },
        get: (index) => {
            let maxi,
                a = [],
                c,
                d,
                k;

            if (index > count - 1 || index < 0) {
                return false;
            }

            while (
                (
                    maxi = Math.floor(
                        Math.pow(variants.length, length)
                    )
                ) - 1 < index
            ) {
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
