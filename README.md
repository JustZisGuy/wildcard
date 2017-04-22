# Wildcard
String generator library

## Introduction
```js

const createWildcard = require('wildcard'),
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

## Escaping charaters to avoid pattern creation
```js

const createWildcard = require('wildcard'),
    wildcard = createWildcard({
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

```

## Wildcard parameters in the simple wildcards
```js

const createWildcard = require('wildcard'),
    wildcard = createWildcard({
        patterns: [
            // gives 0, 1, ... 9
            '#',
            // same as above
            '#{1}',
            // gives 00, 10, 20, ... 99
            '#{2}',
            // same as above
            '##',
            // first gives 0, 1, ... 9 then 00, 10, 20, ... 99
            '#{1-2}'
        ]
    });

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}

```

## The simple wildcards
### \# Numbers 0-9
```js

const createWildcard = require('wildcard'),
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

```

### @ Lowercase letters a-z
```js

const createWildcard = require('wildcard'),
    wildcard = createWildcard({
        patterns: [
            // a, b, c, ... zz
            '@{1-2}'
        ]
    });

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}

```

### * Lowercase letters a-z and numbers 0-9
```js

const createWildcard = require('wildcard'),
    wildcard = createWildcard({
        patterns: [
            // 0, 1, ...9, a, b, ... z, 00, 10, ... zz
            '*{1-2}'
        ]
    });

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}

```

### & Lower and uppercase letters a-zA-Z
```js

const createWildcard = require('wildcard'),
    wildcard = createWildcard({
        patterns: [
            // a, b, c, ... z, A, B, C, ... Z
            '&'
        ]
    });

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}

```

### ? Uppercase letters A-Z and numbers 0-9
```js

const createWildcard = require('wildcard'),
    wildcard = createWildcard({
        patterns: [
            // 0, 1, ... 9, A, B, ... Z
            '?'
        ]
    });

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}

```

### ! Uppercase letters A-Z
```js

const createWildcard = require('wildcard'),
    wildcard = createWildcard({
        patterns: [
            // A, B, ... Z
            '!'
        ]
    });

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}

```

### - Lower and uppercase letters a-zA-Z and numbers 0-9
```js

const createWildcard = require('wildcard'),
    wildcard = createWildcard({
        patterns: [
            // 0, 1, ... 9, a, b, ... z, A, B, ... Z
            '-'
        ]
    });

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}

```

## The special wildcards
### $ Words and special characters
```js

const createWildcard = require('wildcard'),
    wildcard = createWildcard({
        patterns: [
            // all combinations with length 1-2 of the words blue, red and green
            // fx. red and blueblue
            '${\'blue,red,green\',1-2}'
        ]
    });

let string;

while (string = wildcard.next()) {
    // Use string here
    console.log(string);
}

```

### % Dictionaries
```js

const createWildcard = require('wildcard'),
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

```

Mention built in dictionaries
