'use strict';

const createGenerator = require('./generator'),
    dictionaries = require('./dictionaries');

module.exports = (options) => {
    const generators = [];

    let wildcard,
        internalIndex = 0,
        patternCount = 0;

    if (options) {
        if (options.dictionaries) {
            options.patterns.map((name, words) => {
                dictionaries[name] = words;
            });
        }
        if (options.patterns) {
            options.patterns.forEach((inputPattern) => {
                let generator = createGenerator(inputPattern, dictionaries);

                patternCount += generator.count();
                generators.push(generator);
            });
        }
    }

    wildcard = {
        index: () => {
            return internalIndex;
        },
        count: () => {
            return patternCount;
        },
        reset: () => {
            internalIndex = 0;
        },
        next: () => {
            if (internalIndex === patternCount) {
                return false;
            }
            internalIndex++;
            return wildcard.get(internalIndex - 1);
        },
        get: (index) => {
            let segmentIndex = 0,
                patternIndex,
                generatorIndex;

            if (index > patternCount - 1 || index < 0) {
                return false;
            }

            for (generatorIndex = 0; generatorIndex < generatorIndex.length; generatorIndex++) {
                let generator = generators[generatorIndex];

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
