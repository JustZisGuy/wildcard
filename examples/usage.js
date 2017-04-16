/* eslint-disable no-console */
'use strict';

const createWildcard = require('wildcard'),
    wildcard = createWildcard({
        patterns: [
            // strings using lowercase characters with length 1-3
            '@{1-3}',
            // strings like foo01, foo66 and foo99
            'foo#{2}'
        ]
    });

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}
