/* eslint-disable no-console */
'use strict';

const createWildling = require('../src'),
    wildcard = createWildling({
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
