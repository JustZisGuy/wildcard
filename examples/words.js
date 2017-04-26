/* eslint-disable no-console */

const createWildling = require('../src');
const wildcard = createWildling({
    patterns: [
        // all combinations with length 1-2 of the words blue, red and green
        // fx. red and blueblue
        '${\'blue,red,green\',1-2}'
    ]
});

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}
