/* eslint-disable no-console */

const createWildling = require('../src');

const options = {
  patterns: [
        // a, b, c, ... zz
    '@{1-2}',
  ],
};
const wildcard = createWildling(options);

let string = wildcard.next();

while (string) {
    // Use string here
  console.log(string);
  string = wildcard.next();
}
