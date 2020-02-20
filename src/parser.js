let parserDictionaries;

const createToken = require("./token");

const tokenParsingRegex = /(\\[%@$*#&?-]{1}|[%@$*#&?-]{1}\{.*?\}|[%@$*#&?-]{1})(?=.*)/g;

function parseLengthWithVariants(part, variants) {
  const lengthArgRegex = /\{((\d+)-(\d+)|(\d+))\}/;
  const match = lengthArgRegex.exec(part);
  const partStringHasRangeParameters = match !== null && match[2];
  const partStringHasLengthParameter = match !== null && match[1];

  let startLength = 1;
  let endLength = 1;

  if (partStringHasRangeParameters) {
    startLength = parseInt(match[2], 10);
    endLength = parseInt(match[3], 10);
  } else if (partStringHasLengthParameter) {
    startLength = parseInt(match[1], 10);
    endLength = startLength;
  }

  return {
    variants,
    startLength,
    endLength,
    src: part
  };
}

function parseLengthWithString(part) {
  const lengthArgRegex = /\{'(.*)'(,(\d+)-(\d+)){0,1}(,(\d+)){0,1}\}/;
  const match = lengthArgRegex.exec(part);
  const partStringHasRangeParameters = match !== null && match[3] && match[4];
  const partStringHasLengthParameter = match !== null && match[6];

  if (partStringHasRangeParameters) {
    return {
      string: match[1],
      startLength: parseInt(match[3], 10),
      endLength: parseInt(match[4], 10),
      src: part
    };
  }
  if (partStringHasLengthParameter) {
    const length = parseInt(match[6], 10);

    return {
      string: match[1],
      startLength: length,
      endLength: length,
      src: part
    };
  }
  if (match !== null) {
    return {
      string: match[1],
      startLength: 1,
      endLength: 1,
      src: part
    };
  }
  return false;
}

function simpleTokenizer(variantsString) {
  const variants = variantsString.split("");

  return part => {
    const options = parseLengthWithVariants(part, variants);

    return createToken(options);
  };
}

const tokenizers = {
  // 0-9
  "#": simpleTokenizer("0123456789"),
  // a-z
  "@": simpleTokenizer("abcdefghijklmnopqrstuvwxyz"),
  // a-z0-9
  "*": simpleTokenizer("abcdefghijklmnopqrstuvwxyz0123456789"),
  // a-zA-Z0-9
  "-": simpleTokenizer(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  ),
  // A-Z
  "!": simpleTokenizer("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
  // A-Z0-9
  "?": simpleTokenizer("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"),
  // a-zA-Z
  "&": simpleTokenizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"),
  // dictionary
  "%": part => {
    let options = parseLengthWithString(part);
    const partMissingOptions =
      options === false || !(options.string in parserDictionaries);

    if (partMissingOptions) {
      options = {
        variants: [part],
        startLength: 1,
        endLength: 1,
        src: part
      };
    } else {
      options.variants = parserDictionaries[options.string];
    }

    return createToken(options);
  },
  // special chars/words ${'<comma separated list
  // with \' as "'" mark'[,length | ,length-length]}
  $: part => {
    let options = parseLengthWithString(part);

    if (options === false) {
      options = {
        variants: [part],
        startLength: 1,
        endLength: 1,
        src: part
      };
    } else {
      const variants = [];
      let workString = options.string;
      let index = 0;
      do {
        if (workString.substr(index, 2) === "\\,") {
          index += 2;
        } else if (workString[index] === ",") {
          variants.push(workString.substr(0, index));
          workString = workString.substr(index + 1);
          index = 0;
        } else {
          index += 1;
        }
      } while (index < workString.length);
      variants.push(workString);
      options.variants = variants.map(variant => variant.replace("\\,", ","));
    }

    return createToken(options);
  }
};

function partToToken(part) {
  const tokenizerMatches = part[0] in tokenizers;
  const isEscapedToken =
    part.length > 1 && part[0] === "\\" && part[1] in tokenizers;
  let token;

  if (tokenizerMatches) {
    token = tokenizers[part[0]](part);
  } else if (isEscapedToken) {
    token = createToken({
      variants: [part.replace(/^\\/, "")],
      src: part
    });
  } else {
    token = createToken({
      variants: [part],
      src: part
    });
  }

  return token;
}

module.exports = (inputPattern, dictionaries) => {
  const tokens = [];
  const parts = inputPattern.split(tokenParsingRegex).filter(Boolean);

  parserDictionaries = dictionaries;

  parts.forEach(part => tokens.push(partToToken(part)));

  return tokens;
};
