/* eslint-disable no-console, global-require, import/no-dynamic-require */

const test = require('ava');
const sinon = require('sinon');
const util = require('util');
const fs = require('fs');
const path = require('path');

let consoleLog = '';

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
    t.is(console.log.called, true);
    t.is(expected, consoleLog);
  };
}

// All examples must be tested
const exampleFiles = fs.readdirSync('examples');
exampleFiles.forEach((exampleFile) => {
  if (path.extname(exampleFile) === '.js') {
    const exampleName = path.basename(exampleFile, '.js');
    test(exampleName, testRunsAndMatches(exampleName));
  }
});
