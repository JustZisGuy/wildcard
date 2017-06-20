/* eslint-disable no-console */

const createWildling = require('../src');

const options = {
  patterns: [
    // the first # in this pattern wont be interpreted as a wildcard
    // creating a pattern of #0, #1, ... #9
    '\\##',
  ],
};
const wildcard = createWildling(options);

let string = wildcard.next();

while (string) {
    // Use string here
  console.log(string);
  string = wildcard.next();
}
