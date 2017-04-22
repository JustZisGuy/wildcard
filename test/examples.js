/* eslint-disable no-console */
'use strict';

const test = require('ava'),
    sinon = require('sinon'),
    util = require('util'),
    fs = require('fs'),
    path = require('path');

let consoleLog = '',
    exampleFiles,
    exampleIndex,
    exampleName;

test.beforeEach(() => {
    sinon.stub(console, 'log').callsFake((...args) => {
        consoleLog += `${util.format.apply(null, args)}\n`;
    });
});

test.afterEach(() => {
    consoleLog = '';
    console.log.restore();
});

function testRunsAndMatches(name) {
    const expected = fs.readFileSync(`test/examples_files/${name}.txt`, 'utf8');

    return (t) => {
        require(`../examples/${name}`);
        t.is(true, console.log.called);
        t.is(expected, consoleLog);
    };
}

// All examples must be tested
exampleFiles = fs.readdirSync('examples');
for (exampleIndex in exampleFiles) {
    exampleName = path.basename(exampleFiles[exampleIndex], '.js');
    test(exampleName, testRunsAndMatches(exampleName));
}
