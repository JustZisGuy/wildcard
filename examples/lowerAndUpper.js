/* eslint-disable no-console */

const createWildling = require('../src');
const options = {
    patterns: [
        // a, b, c, ... z, A, B, C, ... Z
        '&'
    ]
};
const wildcard = createWildling(options);

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}
