const test = require("ava");
const parsePattern = require("../src/parser");

test("simple string returns count of one", t => {
  const tokens = parsePattern("test", {});

  t.is(1, tokens.length);
});

test("missing dictionary string pattern", t => {
  const tokens = parsePattern("%{'test'}", {});

  t.is(1, tokens.length);
});

test("complex pattern test, tokens length", t => {
  const tokens = parsePattern("####test", {});

  t.is(5, tokens.length);
});

test("complex pattern test, tokens counts expected", t => {
  const tokens = parsePattern("####test", {});
  let tokenIndex;

  for (tokenIndex = 0; tokenIndex < tokens.length - 1; tokenIndex += 1) {
    t.is(10, tokens[tokenIndex].count(), `part ${tokenIndex + 1}`);
  }
  t.is(1, tokens[tokens.length - 1].count(), `part ${tokens.length}`);
});
