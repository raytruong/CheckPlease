const webpack = require('webpack');
const path = require('path');

let server = {
  entry: './server-src/server.js',
  output: {
    path: __dirname,
    filename: 'app.js'
  },
  target: 'node',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
      { test: /\.css$/, use: { loader: 'css-loader' } }
    ]
  }
}

let client = {
  entry: './client-src/entry.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.css$/, loader: 'css-loader' }
    ]
  }  
}

module.exports = [server, client];
