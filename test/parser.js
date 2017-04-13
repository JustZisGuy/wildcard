'use strict';

const test = require('ava'),
    parsePattern = require('../src/parser');

test('simple string returns count of one', (t) => {
    const tokens = parsePattern('test', {});

    if (tokens.length !== 1) {
        t.fail();
    }
    t.pass();
});

test('complex pattern test, tokens length', (t) => {
    let tokens = parsePattern('####test', {});

    t.is(5, tokens.length);
    t.pass();
});

test('complex pattern test, tokens counts expected', (t) => {
    let tokens = parsePattern('####test', {}),
        tokenIndex;

    for (tokenIndex = 0; tokenIndex < tokens.length - 1; tokenIndex++) {
        t.is(10, tokens[tokenIndex].count(), 'part ' + (tokenIndex + 1));
    }
    t.is(1, tokens[tokens.length - 1].count(), 'part ' + tokens.length);
    t.pass();
});
