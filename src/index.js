const createGenerator = require("./generator");
const dictionaries = require("./dictionaries");

function loadDictionariesFromOptions(options) {
  const hasDictionariesOption = options && options.dictionaries;

  if (hasDictionariesOption) {
    Object.keys(options.dictionaries).forEach(name => {
      dictionaries[name] = options.dictionaries[name];
    });
  }
}

function generatorsFromPatterns(options) {
  const generators = [];
  const hasPatternsOption = options && options.patterns;

  if (hasPatternsOption) {
    options.patterns.forEach(inputPattern => {
      generators.push(createGenerator(inputPattern, dictionaries));
    });
  }
  return generators;
}

function calculatePatternCount(generators) {
  let count = 0;

  generators.forEach(generator => {
    count += generator.count();
  });
  return count;
}

module.exports = options => {
  let internalIndex = 0;

  loadDictionariesFromOptions(options);
  const generators = generatorsFromPatterns(options);
  const patternCount = calculatePatternCount(generators);

  const wildling = {
    index: () => internalIndex,
    count: () => patternCount,
    reset: () => {
      internalIndex = 0;
    },
    next: () => {
      const outOfResults = internalIndex === patternCount;

      if (outOfResults) {
        return false;
      }
      internalIndex += 1;
      return wildling.get(internalIndex - 1);
    },
    generators: () => generators,
    get: index => {
      let segmentIndex = 0;
      const invalidIndex = index > patternCount - 1 || index < 0;

      if (invalidIndex) {
        return false;
      }
      for (
        let generatorIndex = 0;
        generatorIndex < generators.length;
        generatorIndex += 1
      ) {
        const generator = generators[generatorIndex];
        const patternIndex = index - segmentIndex;
        const foundPatternInGenerator = patternIndex < generator.count();

        if (foundPatternInGenerator) {
          return generator.get(patternIndex);
        }
        segmentIndex += generator.count();
      }
      return false; // this will never happen
    }
  };

  return wildling;
};
