/* eslint-disable no-console */

const createWildling = require('../src');
const wildcard = createWildling({
    patterns: [
        // A, B, ... Z
        '!'
    ]
});

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}
