/* eslint-disable no-console */

const createWildling = require('../src');
const options = {
    patterns: [
        // gives 0, 1, ... 9
        '#',
        // same as above
        '#{1}',
        // gives 00, 10, 20, ... 99
        '#{2}',
        // same as above
        '##',
        // first gives 0, 1, ... 9 then 00, 10, 20, ... 99
        '#{1-2}'
    ]
};
const wildcard = createWildling(options);

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}
