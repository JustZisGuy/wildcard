/* eslint-disable no-console */

const createWildling = require('../src');
const wildcard = createWildling({
    patterns: [
        // a, b, c, ... zz
        '@{1-2}'
    ]
});

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}
