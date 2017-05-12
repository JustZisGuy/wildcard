# Wildling wildcard
String generator library. This is a library for creating patterns from strings with wildcard tokens which can then be used for various purposes.

[![Build Status](https://travis-ci.org/JustZisGuy/wildling.svg?branch=master)](https://travis-ci.org/JustZisGuy/wildling)
[![Coverage Status](https://coveralls.io/repos/github/JustZisGuy/wildling/badge.svg)](https://coveralls.io/github/JustZisGuy/wildling)
[![NPM](https://nodei.co/npm/wildling.png)](https://npmjs.org/package/wildling)

## Introduction
{{examples/usage.js}}
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
{{examples/index.html}}
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
{{examples/escaping.js}}

## Wildling parameters
{{examples/parameters.js}}
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
{{examples/numbers.js}}

### @ Lowercase letters a-z
{{examples/lowercase.js}}

### * Lowercase letters a-z and numbers 0-9
{{examples/lowerAndNumbers.js}}

### & Lower and uppercase letters a-zA-Z
{{examples/lowerAndUpper.js}}

### ? Uppercase letters A-Z and numbers 0-9
{{examples/upperAndNumbers.js}}

### ! Uppercase letters A-Z
{{examples/uppercase.js}}

### - Lower and uppercase letters a-zA-Z and numbers 0-9
{{examples/lowerAndUpperAndNumbers.js}}

## The special wildcards
### $ Words and special characters
{{examples/words.js}}

### % Dictionaries
{{examples/dictionaries.js}}
Wildling also has some built-in libraries which are:
- colors
- planets
- passwords
But these are mainly for demo, test and example purposes

## License
MIT, see LICENSE file
