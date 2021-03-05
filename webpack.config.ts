import path from 'path';
// import webpack from 'webpack';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const plugins = [
  new StyleLintPlugin(),
  new HtmlWebpackPlugin({
    template: './source/index.html',
  }),
  new VueLoaderPlugin(),
  new ForkTsCheckerWebpackPlugin({ eslint: true }),
  new ForkTsCheckerNotifierWebpackPlugin({
    title: 'TypeScript',
    excludeWarnings: false,
  }),
];

export default () => {
  const config = {
    mode: 'development',
    entry: {
      index: './source/index.ts',
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      filename: '[name].js',
    },
    plugins,
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            fix: true,
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.ts?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                data: '@import "./source/index.scss";',
                includePaths: [__dirname, './source'],
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[ext]',
          },
        },
        {
          test: /\.svg$/,
          use: [
            'vue-svg-loader',
          ],
        },
      ],
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '~': path.resolve(__dirname, 'source/'),
      },
      extensions: ['.ts', '.js', '.vue', '.json'],
    },
    devServer: {
      historyApiFallback: true,
      overlay: true,
      port: 9000,
      open: false,
      disableHostCheck: true,
      noInfo: true,
      stats: 'minimal',
    },
    performance: {
      hints: false,
    },
    devtool: '#eval-source-map',
    watch: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },
  };

  // if (env.production && env.production === 'true') {
  //   config.devtool = '#source-map';
  //   config.mode = 'production';
  //   config.plugins = (config.plugins || []).concat([
  //     new webpack.DefinePlugin({
  //       'process.env': {
  //         NODE_ENV: '"production"'
  //       }
  //     }),
  //     new webpack.LoaderOptionsPlugin({
  //       minimize: true
  //     })
  //   ])
  // }

  return config;
};
