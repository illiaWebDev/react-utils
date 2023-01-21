// @ts-check
/* eslint-disable  @typescript-eslint/no-var-requires,import/no-extraneous-dependencies */
const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' );
const ReactRefreshWebpackPlugin = require( '@pmmmwh/react-refresh-webpack-plugin' );


const publicDir = path.resolve( __dirname, './public' );


/** @type { import( 'webpack-dev-server' ).WebpackConfiguration } */
const config = {
  mode: 'development',
  entry: path.resolve( __dirname, './index.tsx' ),
  output: {
    path: publicDir,
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx', // Or 'ts' if you don't need tsx
          target: 'es2015',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin( {
      template: path.resolve( __dirname, './index.html' ),
    } ),
    new ForkTsCheckerWebpackPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
  watchOptions: {
    // for some systems, watching many files can result in a lot of CPU or memory usage
    // https://webpack.js.org/configuration/watch/#watchoptionsignored
    // don't use this pattern, if you have a monorepo with linked packages
    ignored: /node_modules/,
  },
  devServer: {
    port: 9007,
    static: {
      directory: publicDir,
    },
    hot: true,
  },
};

module.exports = config;
