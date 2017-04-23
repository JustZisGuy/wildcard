/* eslint-disable no-console */
'use strict';

const createWildling = require('../src'),
    wildcard = createWildling({
        patterns: [
            // the first # in this pattern wont be interpreted as a wildcard
            // creating a pattern of #0, #1, ... #9
            '\\##'
        ]
    });

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}
