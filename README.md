# wildcard
String generator library

# Usage
```js
const generator = wildcard({
    patterns: [
        '@{1-3}', // strings using lowercase characters with length 1-3
        'foo#{2}' // strings like foo01, foo66 and foo99
    ];
});
let string;
while (string = generator.next) {
    // TODO Do something with string
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
