/* eslint-disable no-console */

const createWildling = require("../src");

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
