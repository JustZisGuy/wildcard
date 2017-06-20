const test = require('ava');
const wildling = require('../src/index');

test('no patterns as input returns count of zero', (t) => {
  t.is(0, wildling({
    patterns: [],
  }).count());
});

test('single string pattern generates single output', (t) => {
  t.is(1, wildling({
    patterns: ['test'],
  }).count());
});

test('single string pattern returns next of same string', (t) => {
  const testString = 'test';

  t.is(testString, wildling({
    patterns: [testString],
  }).next());
});

test('single string returns get(0) of input string', (t) => {
  const testString = 'test';

  t.is(testString, wildling({
    patterns: [testString],
  }).get(0));
});

test('2 strings returns get(0) as first and get(1) of second input string', (t) => {
  const patterns = ['test1', 'test2'];
  const wc = wildling({
    patterns,
  });

  t.is(patterns[0], wc.get(0));
  t.is(patterns[1], wc.get(1));
});

test('single number wildling returns get(0) of zero', (t) => {
  const patterns = ['#'];
  const wc = wildling({
    patterns,
  });

  t.is('0', wc.get(0));
});

test('built-in dictionaries test', (t) => {
  const patterns = ['%{\'planets\'}'];
  const wc = wildling({
    patterns,
  });

  t.is(8, wc.count());
});

test('complex pattern test', (t) => {
  const wc = wildling({
    patterns: ['####test'],
  });

  t.is(10000, wc.count(), 'Count failed');
  t.is('9999test', wc.get(9999), 'Get failed');
});

test('behaviour when called without options', (t) => {
  const wc = wildling();

  t.is(0, wc.count());
  t.is(0, wc.index());
});

test('index behaviour on next and reset', (t) => {
  const wc = wildling({
    patterns: ['#'],
  });

  t.is(0, wc.index());
  wc.next();
  t.is(1, wc.index());
  wc.reset();
  t.is(0, wc.index());
});

test('get behaviour on invalid Index', (t) => {
  const wc = wildling({
    patterns: ['#'],
  });

  t.is(false, wc.get(999));
  t.is(false, wc.get(-2));
});

test('going from patterns to token sources', (t) => {
  const wc = wildling({
    patterns: [
      'foo\\##bar${2}',
      'a',
    ],
  });
  const sources = [
    'foo',
    '\\#',
    '#',
    'bar',
    '${2}',
  ];
  const generators = wc.generators();

  t.is(5, generators[0].tokens().length);
  t.is(1, generators[1].tokens().length);
  generators[0].tokens().forEach((token, tokenIndex) => {
    t.is(sources[tokenIndex], token.src());
  });
});

test('multiple patterns test', (t) => {
  const wc1 = wildling({
    patterns: ['', '#', '#{2-3}', '#{4-5}'],
  });
  const wc2 = wildling({
    patterns: ['#{0-5}'],
  });

  let string1;
  let string2;

  t.is(wc2.count(), wc1.count(), 'Both wildlings should have the same count');
  do {
    t.is(string2, string1, 'Both wildlings should have the same variants for each next');
    string1 = wc1.next();
    string2 = wc2.next();
  } while (string1 !== false && string2 !== false);

  t.is(
        true,
        string1 === false && string2 === false,
        `neither wildling should have more strings to generate wc1: ${string1} wc2: ${string2}`,
    );
});
