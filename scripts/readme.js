/* eslint-disable no-console */
'use strict';

// This script is a quick and dirty way to support including external js files
// in README.md. I want my usage examples to be linted and working
const fs = require('fs'),
    path = require('path'),
    templateRegex = /\{\{.*?\}\}/g;

let matches,
    matchIndex,
    output,
    includedFile,
    inFile,
    outFile;

if (process.argv.length !== 4) {
    console.error('Usage: node readme.js <path to infile> <path to outfile>');
    process.exit(-1);
}

inFile = process.argv[2];
outFile = process.argv[3];

/* Quick sanity check */
function partOfCWD(file) {
    const cwdPath = path.resolve('.'),
        filePath = path.resolve(file);

    return filePath.indexOf(cwdPath) === 0;
}

if (!partOfCWD(inFile) || !partOfCWD(outFile)) {
    console.error('both infile and outfile must be inside cwd');
    process.exit(-1);
}

output = fs.readFileSync(inFile, 'utf8');
matches = output.match(templateRegex).map((pathPattern) => {
    return pathPattern.replace(/\{\{|\}\}/g, '');
});

for (matchIndex = 0; matchIndex < matches.length; matchIndex++) {
    includedFile = matches[matchIndex];

    if (!partOfCWD(includedFile)) {
        console.error(`${includedFile} is not a part of cwd`);
        process.exit(-1);
    }

    fs.accessSync(includedFile, fs.constants.R_OK);

    output = output.replace(
        '{{' + includedFile + '}}',
        '```js\n' + fs.readFileSync(includedFile, 'utf8') + '\n```'
    );
}
// let's leave this out of the usage examples :)
output = output.replace(/\/\*\ eslint\-disable\ no\-console\ \*\/\n/g, '');
output = output.replace(/\'use\ strict\'\;\n/g, '');
output = output.replace(/\'\.\.\/src\'/g, '\'wildling\'');

fs.writeFileSync(outFile, output, 'utf8');
