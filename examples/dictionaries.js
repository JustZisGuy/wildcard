/* eslint-disable no-console */
'use strict';

const createWildcard = require('../src'),
    wildcard = createWildcard({
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
    });

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}
