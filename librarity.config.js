module.exports = {
  confirmOverwrite: false,
  replacePatterns: [
    [/\/\* eslint-disable no-console \*\/\n/g, ""],
    [/"\.\.\/src"/g, "'wildling'"]
  ]
};
