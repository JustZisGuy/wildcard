module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    path: __dirname,
    libraryTarget: "umd",
    library: "wildling",
    filename: "dist/wildling.js",
    umdNamedDefine: true,
    globalObject: "this"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};
