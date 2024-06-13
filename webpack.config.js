const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssNano = require('cssnano');
const { merge } = require('webpack-merge');

const isProduction = process.env.NODE_ENV === 'production';

const commonConfig = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader', // Extract or inject styles
          'css-loader',   // Translates CSS into CommonJS modules
          'sass-loader',  // Compiles Sass to CSS
        ],
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader', // Extract or inject styles
          'css-loader',   // Translates CSS into CommonJS modules
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'], // Bootstrap 4 dependency
    }),
  ],
};

const productionConfig = {
  mode: 'production',
  devtool: 'hidden-source-map', // Use hidden source maps if needed
  output: {
    filename: '[name].[contenthash].js', // Cache busting
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          'css-loader',                // Translates CSS into CommonJS modules
          'postcss-loader',            // Process CSS with PostCSS and cssnano
          'sass-loader',               // Compiles Sass to CSS
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          'css-loader',                // Translates CSS into CommonJS modules
          'postcss-loader',            // Process CSS with PostCSS and cssnano
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',  // Output CSS file name
    }),
  ],
};

const developmentConfig = {
  mode: 'development',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    open: true,
  },
};

module.exports = merge(
  commonConfig,
  isProduction ? productionConfig : developmentConfig
);