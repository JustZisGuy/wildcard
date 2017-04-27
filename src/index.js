/* eslint-disable consistent-return */
const createGenerator = require('./generator');
const dictionaries = require('./dictionaries');

function loadDictionariesFromOptions(options) {
    let hasDictionariesOption = options && options.dictionaries;

    if (hasDictionariesOption) {
        Object.keys(options.dictionaries).map((name) => {
            dictionaries[name] = options.dictionaries[name];
        });
    }
}

function generatorsFromPatterns(options) {
    const generators = [];
    let hasPatternsOption = options && options.patterns;

    if (hasPatternsOption) {
        options.patterns.forEach((inputPattern) => {
            generators.push(createGenerator(inputPattern, dictionaries));
        });
    }
    return generators;
}

function calculatePatternCount(generators) {
    let count = 0;

    generators.forEach((generator) => {
        count += generator.count();
    });
    return count;
}

module.exports = (options) => {
    let wildling;
    let internalIndex = 0;
    let patternCount;
    let generators;

    loadDictionariesFromOptions(options);
    generators = generatorsFromPatterns(options);
    patternCount = calculatePatternCount(generators);

    wildling = {
        index: () => internalIndex,
        count: () => patternCount,
        reset: () => {
            internalIndex = 0;
        },
        next: () => {
            let outOfResults = internalIndex === patternCount;

            if (outOfResults) {
                return false;
            }
            internalIndex++;
            return wildling.get(internalIndex - 1);
        },
        generators: () => generators,
        get: (index) => {
            let segmentIndex = 0;
            let invalidIndex = index > patternCount - 1 || index < 0;

            if (invalidIndex) {
                return false;
            }
            for (let generatorIndex in generators) {
                let generator = generators[generatorIndex];
                let patternIndex = index - segmentIndex;
                let foundPatternInGenerator = patternIndex < generator.count();

                if (foundPatternInGenerator) {
                    return generator.get(patternIndex);
                }
                segmentIndex += generator.count();
            }
        }
    };

    return wildling;
};
