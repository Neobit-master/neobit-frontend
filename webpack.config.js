const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
      },
      {
        test: /\.(s[ac]ss|css)$/,
        exclude: /node_modules/,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          },
        ]
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif|woff)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin(
      {
        inject: true,
        template: './public/index.html',
        filename: 'index.html',
        favicon: './images/isotypeBlack_1x.png'
      }
    ),
    new MiniCSSExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: 'styles/[id].css'
    })
  ],
}