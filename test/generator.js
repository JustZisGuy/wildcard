'use strict';

const test = require('ava'),
    createGenerator = require('../src/generator');

test('single string pattern returns count of one', (t) => {
    const generator = createGenerator('test', {});

    t.is(generator.count(), 1);
});

test('single string returns get(0) of input string', (t) => {
    const testString = 'test',
        generator = createGenerator(testString, {});

    t.is(generator.get(0), testString);
});

test('parser acceptance tests', (t) => {
    const tests = {
        '#': {
            count: 10,
            parts: 1
        },
        '##': {
            count: 100,
            parts: 2
        },
        '#{2}': {
            count: 100,
            parts: 1
        },
        'foo#bar': {
            count: 10,
            parts: 3
        },
        'foo#{2}bar': {
            count: 100,
            parts: 3
        },
        'foo#{1-2}bar': {
            count: 110,
            parts: 3
        },
        'foo@bar': {
            count: 26,
            parts: 3
        },
        'foo\\#bar': {
            count: 1,
            parts: 3
        }
    };

    let generator,
        props;

    Object.keys(tests).map((pattern) => {
        generator = createGenerator(pattern, {});
        props = tests[pattern];
        t.is(props.parts, generator.tokens().length, 'Length failed for ' + pattern);
        t.is(props.count, generator.count(), 'Count failed for ' + pattern);
    });
});

test('parser acceptance tests for words', (t) => {
    const tests = {
        '${\'_,.\'}': 2,
        '${\'_,.\',2}': 4,
        '${\'_,.\',2-2}': 4,
        '${\'_,.\',1-2}': 6,
        '${\'å,ä,ö\',1}': 3,
        '${\'å,ä,ö\',1-2}': 12
    };

    let generator,
        count;

    Object.keys(tests).map((pattern) => {
        generator = createGenerator(pattern, {});
        count = tests[pattern];
        t.is(
            count,
            generator.count(),
            'Count failed for ' + pattern + ' ' + generator.count() + '!=' + count
        );
    });
});

test('simple number wildcard returns get(0) of zero', (t) => {
    const generator = createGenerator('#', {});

    t.is('0', generator.get(0));
});

test('complex pattern test', (t) => {
    let generator = createGenerator('####test', {});

    t.is(10000, generator.count(), 'Count failed');
    t.is('9999test', generator.get(9999), 'Get failed');
});
