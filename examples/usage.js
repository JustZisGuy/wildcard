/* eslint-disable no-console */

const createWildling = require('../src');
const options = {
    patterns: [
        // a single string without any wildcards
        'abrakadabra',
        // strings foo0, foo1 ... foo9
        'foo#'
    ]
};
const wildcard = createWildling(options);

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}
