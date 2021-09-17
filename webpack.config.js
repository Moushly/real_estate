const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let mode = 'development'; // Or production

// let target = 'web';
const plugins = [
  new HtmlWebpackPlugin({
    title: 'Dashboard',
    template: 'src/index.html',
    filename: 'index.html',
  }),
];

let config = {
  mode: mode,

  entry: {
    main: path.resolve(__dirname, 'src/js/app.js'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name][hash][ext][query]',
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        // generator: {
        //   filename: 'images/[name][hash][ext][query]',
        // },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: plugins,

  devtool: 'source-map',

  // required if using webpack-dev-server
  devServer: {
    port: 5001,
    contentBase: './dist',
    hot: true,
  },

  stats: {
    children: true,
  },
};

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  config.plugins.push(new CleanWebpackPlugin());
  config.module.rules[1].use[0] = MiniCssExtractPlugin.loader;
  config.plugins.push(new MiniCssExtractPlugin());
}

module.exports = config;
