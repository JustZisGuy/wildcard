/* eslint-disable no-console */
'use strict';

const fs = require('fs'),
    templateRegex = /\{\{.*?\}\}/g;

let matches,
    matchIndex,
    output,
    includedFile,
    inFile,
    outFile;

if (process.argv.length !== 4) {
    // eslint-disable-next-line no-console
    console.error('Usage: <infile> <outfile>');
    process.exit(-1);
}
inFile = process.argv[2];
outFile = process.argv[3];

output = fs.readFileSync(inFile, 'utf8');
matches = output.match(templateRegex).map((path) => {
    return path.replace(/\{\{|\}\}/g, '');
});
for (matchIndex = 0; matchIndex < matches.length; matchIndex++) {
    includedFile = matches[matchIndex];

    output = output.replace(
        '{{' + includedFile + '}}',
        '```js\n' + fs.readFileSync(includedFile, 'utf8') + '\n```'
    );
}

fs.writeFileSync(outFile, output, 'utf8');
