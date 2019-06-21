/* eslint-disable no-console */

const createWildling = require("../src");

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
