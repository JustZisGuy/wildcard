/* eslint-disable no-console */

const createWildling = require('../src');
const wildcard = createWildling({
    patterns: [
        // 0, 1, ...9, a, b, ... z, 00, 10, ... zz
        '*{1-2}'
    ]
});

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}
