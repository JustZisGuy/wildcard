module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    libraryTarget: 'umd',
    library: 'wildling',
    filename: 'dist/wildling.js',
    umdNamedDefine: true,
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};
