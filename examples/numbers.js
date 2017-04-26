/* eslint-disable no-console */

const createWildling = require('../src');
const options = {
    patterns: [
        // 0, 1 ... 9
        '#'
    ]
};
const wildcard = createWildling(options);

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}
