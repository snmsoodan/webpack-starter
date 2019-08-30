var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  "faker","lodash","react","react-dom","react-input-range","react-redux","react-router", "redux","redux-form","redux-thunk"
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS //create seperate bundles
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js' //bundle.js vendor.js (from entry key name)
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({   //removing issue of duplicating code in bundle and vendor
      names: ['vendor', 'manifest']   //manifest tells webpack whether vendor files changes
    }),                               // added because of chunkhash used in output(hash is different on every build)
    new HtmlWebpackPlugin({   //script tags are automatically added to index.html
      template: 'src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) //react looks for this variable behaves fiferently in prod
    })
  ]
};
