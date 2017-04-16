# Wildcard
String generator library

# Usage
```js
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

```

# Misc notes(TO BE REPLACED WITH USAGE INSTRUCTIONS)
string pattern examples:
\#: 0-9,
\#{2}: 00-99,
\#{1-2}: 0-9 and 00-99,
@: a-z,
\*-: a-z0-9,
&: a-zA-Z,
?: A-Z0-9,
!: A-Z,
-: a-zA-Z0-9,
~{åäö%\_}: åäö%\_,
${blue,red,yellow}: blue-yellow,
%{dictionary name}: contents of dictionary
escaped characters are supported
