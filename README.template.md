# Wildcard
[![Build Status](https://travis-ci.org/JustZisGuy/wildcard.svg?branch=master)](https://travis-ci.org/JustZisGuy/wildcard)
[![Coverage Status](https://coveralls.io/repos/github/JustZisGuy/wildcard/badge.svg?branch=master)](https://coveralls.io/github/JustZisGuy/wildcard?branch=master)
String generator library

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

## Escaping charaters to avoid pattern creation
{{examples/escaping.js}}

## Wildcard parameters in the simple wildcards
{{examples/parameters.js}}

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

Mention built in dictionaries

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
${'blue,red,yellow',startLength,endLength}: blue-yellow,
%{'dictionary name',startLength,endLength}: contents of dictionary
escaped characters are supported
