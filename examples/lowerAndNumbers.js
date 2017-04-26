/* eslint-disable no-console */

const createWildling = require('../src');
const options = {
    patterns: [
        // 0, 1, ...9, a, b, ... z, 00, 10, ... zz
        '*{1-2}'
    ]
};
const wildcard = createWildling(options);

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}
