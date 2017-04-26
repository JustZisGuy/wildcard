/* eslint-disable no-console */

const createWildling = require('../src');
const options = {
    patterns: [
        // using built-in dictionary
        '%{\'planets\'}',
        // using dictionary passed on when creating the wildcard
        '%{\'test\'}'
    ],
    dictionaries: {
        test: [
            'alpha',
            'beta',
            'gamma'
        ]
    }
};
const wildcard = createWildling(options);

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}
