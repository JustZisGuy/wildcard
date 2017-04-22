/* eslint-disable no-console */
'use strict';

const createWildcard = require('../src'),
    wildcard = createWildcard({
        patterns: [
            // a single string without any wildcards
            'abrakadabra',
            // strings foo0, foo1 ... foo9
            'foo#'
        ]
    });

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}
