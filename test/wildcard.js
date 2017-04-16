'use strict';

const test = require('ava'),
    wildcard = require('../src/index');

test('no patterns as input returns count of zero', (t) => {
    t.is(0, wildcard({
        patterns: []
    }).count());
});

test('single string pattern generates single output', (t) => {
    t.is(1, wildcard({
        patterns: ['test']
    }).count());
});

test('single string pattern returns next of same string', (t) => {
    let testString = 'test';

    t.is(testString, wildcard({
        patterns: [testString]
    }).next());
});

test('single string returns get(0) of input string', (t) => {
    let testString = 'test';

    t.is(testString, wildcard({
        patterns: [testString]
    }).get(0));
});

test('2 strings returns get(0) as first and get(1) of second input string', (t) => {
    let patterns = ['test1', 'test2'];
    const wc = wildcard({
        patterns: patterns
    });

    t.is(patterns[0], wc.get(0));
    t.is(patterns[1], wc.get(1));
});

test('single number wildcard returns get(0) of zero', (t) => {
    let patterns = ['#'];
    const wc = wildcard({
        patterns: patterns
    });

    t.is('0', wc.get(0));
});

test('built-in dictionaries test', (t) => {
    let patterns = ['%{\'planets\'}'];
    const wc = wildcard({
        patterns: patterns
    });

    t.is(8, wc.count());
});

test('complex pattern test', (t) => {
    let wc = wildcard({
        patterns: ['####test']
    });

    t.is(10000, wc.count(), 'Count failed');
    t.is('9999test', wc.get(9999), 'Get failed');
});

test('multiple patterns test', (t) => {
    const wc1 = wildcard({
            patterns: ['', '#', '#{2-3}', '#{4-5}']
        }),
        wc2 = wildcard({
            patterns: ['#{0-5}']
        });

    let string1,
        string2;

    t.is(wc2.count(), wc1.count(), 'Both wildcards should have the same count');
    do {
        t.is(string2, string1, 'Both wildcards should have the same variants for each next');
        string1 = wc1.next();
        string2 = wc2.next();
    } while (string1 !== false && string2 !== false);

    t.is(
        true,
        string1 === false && string2 === false,
        'neither wildcard should have more strings to generate wc1: ' +
            string1 + ' wc2:' + string2
    );
});
