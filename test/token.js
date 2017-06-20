const test = require('ava');
const createToken = require('../src/token');

test('a token of length 0 returns count 1 and get(0) of \'\'', (t) => {
  const token = createToken({
    startLength: 0,
    endLength: 0,
    variants: ['test'],
  });

  t.is(token.count(), 1);
  t.is(token.get(0), '');
});


test('simple string returns count of one', (t) => {
  const token = createToken({
    startLength: 1,
    endLength: 1,
    variants: ['test'],
  });

  t.is(token.count(), 1);
});

test('simple string returns get(1) of false', (t) => {
  const token = createToken({
    startLength: 1,
    endLength: 1,
    variants: ['test'],
  });

  t.is(token.get(1), false);
});

test('number token with length 2 returns count of 100', (t) => {
  const token = createToken({
    startLength: 2,
    endLength: 2,
    variants: '0123456789'.split(''),
  });

  t.is(token.count(), 100);
});

test('number token with length 1-2 returns count of 110', (t) => {
  const token = createToken({
    startLength: 1,
    endLength: 2,
    variants: '0123456789'.split(''),
  });

  t.is(token.count(), 110);
});

test('number token with length 1-2 returns get(0) of 0', (t) => {
  const token = createToken({
    startLength: 1,
    endLength: 2,
    variants: '0123456789'.split(''),
  });

  t.is(token.get(0), '0');
});

test('string token with variants[abc] and lengths 1 and 2', (t) => {
  const token = createToken({
    startLength: 1,
    endLength: 2,
    variants: 'abc'.split(''),
  });

  t.is(token.get(11), 'cc');
});
