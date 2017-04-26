/* eslint-disable no-console */

const createWildling = require('../src');
const options = {
    patterns: [
        // the first # in this pattern wont be interpreted as a wildcard
        // creating a pattern of #0, #1, ... #9
        '\\##'
    ]
};
const wildcard = createWildling(options);

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}
