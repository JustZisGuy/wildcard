/* eslint-disable no-console */

// This script is a quick and dirty way to support including external js files
// in README.md. I want my usage examples to be linted and working
const fs = require('fs');
const path = require('path');
const templateRegex = /\{\{.*?\}\}/g;
const inFile = process.argv[2] || false;
const outFile = process.argv[3] || false;
const missingFilesParameters = !inFile || !outFile;

let matches;
let matchIndex;
let output;
let includedFile;
let filesNotInCWD;

function partOfCWD(file) {
    const cwdPath = path.resolve('.');
    const filePath = path.resolve(file);
    const isPartOfCWD = filePath.indexOf(cwdPath) === 0;

    return isPartOfCWD;
}

if (missingFilesParameters) {
    console.error('Usage: node readme.js <path to infile> <path to outfile>');
    process.exit(2);
}

filesNotInCWD = !partOfCWD(inFile) || !partOfCWD(outFile);
if (filesNotInCWD) {
    console.error('both infile and outfile must be inside cwd');
    process.exit(1);
}

output = fs.readFileSync(inFile, 'utf8');
matches = output.match(templateRegex).map((pathPattern) => pathPattern.replace(/\{\{|\}\}/g, ''));

for (matchIndex = 0; matchIndex < matches.length; matchIndex++) {
    includedFile = matches[matchIndex];

    if (!partOfCWD(includedFile)) {
        console.error(`${includedFile} is not a part of cwd`);
        process.exit(1);
    }

    fs.accessSync(includedFile, fs.constants.R_OK);

    output = output.replace(
        `{{${includedFile}}}`,
        `\`\`\`js\n${fs.readFileSync(includedFile, 'utf8')}\n\`\`\``
    );
}
// let's leave this out of the usage examples :)
output = output.replace(/\/\* eslint-disable no-console \*\/\n/g, '');
output = output.replace(/'\.\.\/src'/g, '\'wildling\'');

fs.writeFileSync(outFile, output, 'utf8');
