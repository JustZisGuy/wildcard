/* eslint-disable no-console, global-require */

const test = require('ava');
const sinon = require('sinon');
const fs = require('fs');
const clearRequire = require('clear-require');
const util = require('util');
const argv = process.argv;

// the following variables provides control of the cli program flow
let writeFileContents;
let writeFileFail;
let consoleError;

function StubException(message) {
    this.message = message;
    this.name = 'StubException';
}

function resetFlowVariables() {
    writeFileContents = '';
    writeFileFail = false;
    consoleError = '';
}

test.beforeEach(() => {
    resetFlowVariables();
    sinon.stub(console, 'error').callsFake((...args) => {
        consoleError += `${util.format.apply(null, args)}\n`;
    });
    sinon.stub(fs, 'writeFileSync').callsFake((outFile, output) => {
        if (writeFileFail) {
            throw new StubException('writeFileSync Failed');
        }
        if (outFile) {
            writeFileContents = output;
        }
    });
});

test.afterEach(() => {
    console.error.restore();
    clearRequire('../scripts/readme.js');
    process.argv = argv;
    fs.writeFileSync.restore();
});

test('Script can be run', (t) => {
    process.argv = [
        'node',
        './scripts/readme.js',
        'test/readme_files/README.template.md',
        'outFile'
    ];
    sinon.stub(process, 'exit').callsFake((code) => {
        throw new StubException(code);
    });
    try {
        require('../scripts/readme.js');
        process.exit.restore();
        t.pass();
    } catch (ex) {
        process.exit.restore();
        t.fail(ex.message);
    }
});

test('Script run with incorrect usage parameters exits prematurely with a correct error', (t) => {
    process.argv = ['node', './scripts/readme.js'];
    sinon.stub(process, 'exit').callsFake((code) => {
        throw new StubException(code);
    });
    try {
        require('../scripts/readme.js');
        process.exit.restore();
        t.fail();
    } catch (ex) {
        process.exit.restore();
        if (consoleError === 'Usage: node readme.js <path to infile> <path to outfile>\n') {
            t.pass();
        } else {
            t.fail(ex);
        }
    }
});

test('Error is shown when inFile is not part of cwd', (t) => {
    process.argv = ['node', './scripts/readme.js', '/inFile', 'outFile'];
    sinon.stub(process, 'exit').callsFake((code) => {
        throw new StubException(code);
    });
    try {
        require('../scripts/readme.js');
        process.exit.restore();
        t.fail();
    } catch (ex) {
        process.exit.restore();
        if (consoleError === 'both infile and outfile must be inside cwd\n') {
            t.pass();
        } else {
            t.fail(ex);
        }
    }
});

test('Error is shown when outFile is not part of cwd', (t) => {
    process.argv = [
        'node',
        './scripts/readme.js',
        'test/readme_files/README.template.md',
        '/outFile'
    ];
    sinon.stub(process, 'exit').callsFake((code) => {
        throw new StubException(code);
    });
    try {
        require('../scripts/readme.js');
        process.exit.restore();
        t.fail();
    } catch (ex) {
        process.exit.restore();
        if (consoleError === 'both infile and outfile must be inside cwd\n') {
            t.pass();
        } else {
            t.fail(ex);
        }
    }
});

test('Error is shown when inFile does not exist', (t) => {
    process.argv = [
        'node',
        './scripts/readme.js',
        'test/readme_files/NO.README.template.md',
        'outFile'
    ];
    sinon.stub(process, 'exit').callsFake((code) => {
        throw new StubException(code);
    });
    try {
        require('../scripts/readme.js');
        process.exit.restore();
        t.fail();
    } catch (ex) {
        process.exit.restore();
        if (ex.message.indexOf('ENOENT: no such file or directory, open') === 0) {
            t.pass();
        } else {
            t.fail(ex);
        }
    }
});

test('Error is shown when writeFileSync fails', (t) => {
    process.argv = [
        'node',
        './scripts/readme.js',
        'test/readme_files/README.template.md',
        'outFile'
    ];
    writeFileFail = true;
    sinon.stub(process, 'exit').callsFake((code) => {
        throw new StubException(code);
    });
    try {
        require('../scripts/readme.js');
        process.exit.restore();
        t.fail();
    } catch (ex) {
        process.exit.restore();
        t.pass(ex);
    }
});

test('pattern matching works', (t) => {
    const targetContents = fs.readFileSync('test/readme_files/README.md', 'utf8');

    process.argv = [
        'node',
        './scripts/readme.js',
        'test/readme_files/README.template.md',
        'outFile'
    ];
    sinon.stub(process, 'exit').callsFake((code) => {
        throw new StubException(code);
    });
    try {
        require('../scripts/readme.js');
        process.exit.restore();
        t.is(targetContents, writeFileContents);
    } catch (ex) {
        process.exit.restore();
        t.fail(ex);
    }
});

test('Error is when patterns match file outside cwd', (t) => {
    process.argv = [
        'node',
        './scripts/readme.js',
        'test/readme_files/README.failing.template.md',
        'outFile'
    ];
    sinon.stub(process, 'exit').callsFake((code) => {
        throw new StubException(code);
    });
    try {
        require('../scripts/readme.js');
        process.exit.restore();
        t.fail();
    } catch (ex) {
        process.exit.restore();
        t.pass(ex);
    }
});
