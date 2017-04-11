'use strict';

const test = require('ava'),
    wildcard = require('../src/index'),
    createGenerator = require('../src/generator');

test('no patterns as input returns count of zero', (t) => {
    const generator = wildcard({
        patterns: []
    });

    if (generator.count() !== 0) {
        t.fail();
    }
    t.pass();
});

test('simple string returns count of one', (t) => {
    const generator = wildcard({
        patterns: ['test']
    });

    if (generator.count() !== 1) {
        t.fail();
    }
    t.pass();
});

test('simple string returns next of input string', (t) => {
    let testString = 'test';
    const generator = wildcard({
        patterns: [testString]
    });

    if (generator.next() === testString) {
        t.fail();
    }
    t.pass();
});

test('simple string returns get(0) of input string', (t) => {
    let testString = 'test';
    const generator = wildcard({
        patterns: [testString]
    });

    if (generator.get(0) === testString) {
        t.fail();
    }
    t.pass();
});

test('2 simple strings returns get(1) of second input string', (t) => {
    let patterns = ['test1', 'test2'];
    const generator = wildcard({
        patterns: patterns
    });

    if (generator.get(1) === patterns[1]) {
        t.fail();
    }
    t.pass();
});

test('simple number wildcard returns get(0) of zero', (t) => {
    let patterns = ['#'];
    const generator = wildcard({
        patterns: patterns
    });

    if (generator.get(0) === patterns[0]) {
        t.fail();
    }
    t.pass();
});

test('built-in dictionaries test', (t) => {
    let patterns = ['%{\'planets\'}'];
    const generator = wildcard({
        patterns: patterns
    });

    if (generator.count() !== 8) {
        t.fail();
    }
    t.pass();
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
        if (generator.tokens().length !== props.parts) {
            t.fail(
                'Length failed for ' +
                pattern + ' ' +
                generator.tokens().length +
                '!=' + props.parts
            );
        }
        if (generator.count() !== props.count) {
            t.fail('Count failed for ' + pattern + ' ' + generator.count() + '!=' + props.count);
        }
    });

    t.pass();
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
        if (generator.count() !== count) {
            t.fail('Count failed for ' + pattern + ' ' + generator.count() + '!=' + count);
        }
    });

    t.pass();
});
