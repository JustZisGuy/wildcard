/* eslint-disable no-console */
'use strict';

const createWildcard = require('../src'),
    wildcard = createWildcard({
        patterns: [
            // 0, 1 ... 9
            '#'
        ]
    });

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}
