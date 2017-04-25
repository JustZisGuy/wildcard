/* eslint-disable no-console */

const createWildling = require('../src'),
    wildcard = createWildling({
        patterns: [
            // a, b, c, ... z, A, B, C, ... Z
            '&'
        ]
    });

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}
