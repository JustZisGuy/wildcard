# Wildling wildcard

String generator library. This is a library for creating patterns from strings with wildcard tokens which can then be used for various purposes.

[![Build Status](https://travis-ci.org/JustZisGuy/wildling.svg?branch=master)](https://travis-ci.org/JustZisGuy/wildling)
[![Coverage Status](https://coveralls.io/repos/github/JustZisGuy/wildling/badge.svg)](https://coveralls.io/github/JustZisGuy/wildling)
[![NPM](https://nodei.co/npm/wildling.png)](https://npmjs.org/package/wildling)

## Introduction

```javascript

const createWildling = require('wildling');

const options = {
  patterns: [
    // a single string without any wildcards
    "abrakadabra",
    // strings foo0, foo1 ... foo9
    "foo#"
  ]
};
const wildcard = createWildling(options);

let string = wildcard.next();

while (string) {
  // Use string here
  console.log(string);
  string = wildcard.next();
}

```
This example will write the following words to console.log:

```
abrakadabra
foo0
foo1
foo2
foo3
foo4
foo5
foo6
foo7
foo8
foo9
```

### In a browser

```xml
<html>
  <head>
    <script type="text/javascript" src="../dist/wildling.js"></script>
    <script type="text/javascript">
      var options = {
        patterns: [
          // strings foo0, foo1 ... foo9
          "foo#"
        ]
      };
      var wildcard = wildling(options);
      var string;
      while ((string = wildcard.next())) {
        document.write(string + "<br />");
      }
    </script>
  </head>
  <body></body>
</html>

```
This example will write the following lines in the browser body:

```
foo0
foo1
foo2
foo3
foo4
foo5
foo6
foo7
foo8
foo9
```

## Installation

via npm

```
npm install wildling
```

## Tests

Wildling is using Ava for testing and nyc for test coverage.
To test run:

```
npm test
```

## Why?

In the example above it would be rather pointless to use Wildling but for more
complex patterns like when you are trying to find a domain name for a project
named clams(Assuming all good tlds for this is taken) then we could use wildling
to create a script to check whois records like this:

1. write simple script for checking if a domain name is free
2. import wildling into it
3. specify a dictionary called tld with com, net and org
4. use built-in dictionary called colors
5. use a pattern like this

```
%{'colors',0-1}clams%{'colors',0-1}#{0-2}.%{'tld'}
```

6. and let the script run
   We would then find out that fx. clams9.com and blueclamsred87.org are free and all the others are taken(unlikely I know :) ).

## Escaping charaters to avoid pattern creation

```javascript

const createWildling = require('wildling');

const options = {
  patterns: [
    // the first # in this pattern wont be interpreted as a wildcard
    // creating a pattern of #0, #1, ... #9
    "\\##"
  ]
};
const wildcard = createWildling(options);

let string = wildcard.next();

while (string) {
  // Use string here
  console.log(string);
  string = wildcard.next();
}

```

## Wildling parameters

```javascript

const createWildling = require('wildling');

const options = {
  patterns: [
    // gives 0, 1, ... 9
    "#",
    // same as above
    "#{1}",
    // gives 00, 10, 20, ... 99
    "#{2}",
    // same as above
    "##",
    // first gives 0, 1, ... 9 then 00, 10, 20, ... 99
    "#{1-2}"
  ]
};
const wildcard = createWildling(options);

let string = wildcard.next();

while (string) {
  // Use string here
  console.log(string);
  string = wildcard.next();
}

```
In simple wildcards the format is

```
<wildcard character>[{<startLength>[-endLength]}]
```

Meaning these would all be valid patterns:

```
#
#{2}
#{2-4}
```

In the special wildcards the format is

```
<wildcard character>{'<settings>'[,<startLength>[-endLength]]}
```

Meaning these would all be valid patterns:

```
${'test,dummy'}
${'test,dummy',2}
${'test,dummy',2-4}
```

## The simple wildcards

### \# Numbers 0-9

```javascript

const createWildling = require('wildling');

const options = {
  patterns: [
    // 0, 1 ... 9
    "#"
  ]
};
const wildcard = createWildling(options);

let string = wildcard.next();

while (string) {
  // Use string here
  console.log(string);
  string = wildcard.next();
}

```

### @ Lowercase letters a-z

```javascript

const createWildling = require('wildling');

const options = {
  patterns: [
    // a, b, c, ... zz
    "@{1-2}"
  ]
};
const wildcard = createWildling(options);

let string = wildcard.next();

while (string) {
  // Use string here
  console.log(string);
  string = wildcard.next();
}

```

### \* Lowercase letters a-z and numbers 0-9

```javascript

const createWildling = require('wildling');

const options = {
  patterns: [
    // 0, 1, ...9, a, b, ... z, 00, 10, ... zz
    "*{1-2}"
  ]
};
const wildcard = createWildling(options);

let string = wildcard.next();

while (string) {
  // Use string here
  console.log(string);
  string = wildcard.next();
}

```

### & Lower and uppercase letters a-zA-Z

```javascript

const createWildling = require('wildling');

const options = {
  patterns: [
    // a, b, c, ... z, A, B, C, ... Z
    "&"
  ]
};
const wildcard = createWildling(options);

let string = wildcard.next();

while (string) {
  // Use string here
  console.log(string);
  string = wildcard.next();
}

```

### ? Uppercase letters A-Z and numbers 0-9

```javascript

const createWildling = require('wildling');

const options = {
  patterns: [
    // 0, 1, ... 9, A, B, ... Z
    "?"
  ]
};
const wildcard = createWildling(options);

let string = wildcard.next();

while (string) {
  // Use string here
  console.log(string);
  string = wildcard.next();
}

```

### ! Uppercase letters A-Z

```javascript

const createWildling = require('wildling');

const options = {
  patterns: [
    // A, B, ... Z
    "!"
  ]
};
const wildcard = createWildling(options);

let string = wildcard.next();

while (string) {
  // Use string here
  console.log(string);
  string = wildcard.next();
}

```

### - Lower and uppercase letters a-zA-Z and numbers 0-9

```javascript

const createWildling = require('wildling');

const options = {
  patterns: [
    // 0, 1, ... 9, a, b, ... z, A, B, ... Z
    "-"
  ]
};
const wildcard = createWildling(options);

let string = wildcard.next();

while (string) {
  // Use string here
  console.log(string);
  string = wildcard.next();
}

```

## The special wildcards

### \$ Words and special characters

```javascript

const createWildling = require('wildling');

const options = {
  patterns: [
    // all combinations with length 1-2 of the words blue, red and green
    // fx. red and blueblue
    "${'blue,red,green',1-2}"
  ]
};
const wildcard = createWildling(options);

let string = wildcard.next();

while (string) {
  // Use string here
  console.log(string);
  string = wildcard.next();
}

```

### % Dictionaries

```javascript

const createWildling = require('wildling');

const options = {
  patterns: [
    // using built-in dictionary
    "%{'planets'}",
    // using dictionary passed on when creating the wildcard
    "%{'test'}"
  ],
  dictionaries: {
    test: ["alpha", "beta", "gamma"]
  }
};
const wildcard = createWildling(options);

let string = wildcard.next();

while (string) {
  // Use string here
  console.log(string);
  string = wildcard.next();
}

```
Wildling also has some built-in libraries which are:

- colors
- planets
- passwords
  But these are mainly for demo, test and example purposes

## License

MIT, see LICENSE file
