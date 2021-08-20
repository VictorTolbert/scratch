const { resolve, join } = require('path');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
// const babelConfig = require('./babel.config')

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const DashboardPlugin = require("webpack-dashboard/plugin");
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackNotifierPlugin = require('webpack-notifier');
const WindiCSS = require('windicss-webpack-plugin').default;

module.exports = {
  mode: 'development',

  context: __dirname, // to automatically find tsconfig.json

  entry: {
    main: './src/main.js',
    // index: './src/index.js',
    // print: './src/print.js',
    // another: './src/another-module.js',
  },

  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  // Adjust module resolution algorithm
  resolve: {
    alias: {
      vue: '@vue/compat',
      vue$: 'vue/dist/vue.esm.js',
      //   vue$: 'vue/dist/vue.esm-bundler.js',
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['*', '.ts', '.tsx', '.js', '.vue', '.json']
  },

  // Resolve encountered imports
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: 'babel-loader',
          //   options: babelConfig,
          // },
          {
            loader: 'ts-loader',
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/],
              appendTsxSuffixTo: [/\.vue$/],
            },
          },
        ],
        // options: {
        //   // disable type checker - we will use it in fork plugin
        //   transpileOnly: true,
        //   appendTsSuffixTo: [/\.vue$/],
        // },
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          'postcss-loader',
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      // {
      //   test: /\.svg$/,
      //   oneOf: [
      //     {
      //       resourceQuery: /inline/,
      //       use: [
      //         'babel-loader',
      //         'vue-svg-loader',
      //       ],
      //     },
      //     {
      //       loader: 'file-loader',
      //       query: {
      //         name: 'assets/[name].[hash:8].[ext]',
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader',
        ],
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader',
        ],
      },
      {
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },

  // Perform additional processing
  plugins: [
      new CleanWebpackPlugin(),
      new DashboardPlugin(),
      new ForkTsCheckerWebpackPlugin({
        // eslint: {
        //   files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
        // },
        // typescript: {
        //   extensions: {
        //     vue: true
        //   }
        // }
      }),
      new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: true }),
      new MiniCssExtractPlugin({
        filename: "styles/[name].css",
      }),
      new HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: 'Development',
        showErrors: true,
        cache: true,
        template: join(__dirname, 'public/index.html')
      }),
      new VueLoaderPlugin(),
      new WebpackNotifierPlugin({
        title: 'Webpack'
      }),
      new WindiCSS(),
  ],

  // Adjust how modules are built
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  devtool: 'inline-source-map',

  devServer: {
    // clientLogLevel: 'warning',
    open: true,
    historyApiFallback: true,
  },
};
