const { resolve, join } = require('path');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

const { HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const DashboardPlugin = require("webpack-dashboard/plugin");
const WebpackNotifierPlugin = require('webpack-notifier');
const WindiCSS = require('windicss-webpack-plugin').default
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  mode: 'development',
  context: __dirname, // to automatically find tsconfig.json
  // target: ['web', 'es5'],
  entry: {
    app: './src/main.js',
    // index: './src/index.js',
    // print: './src/print.js',
    // another: './src/another-module.js',
  },
  output: {
    filename: 'main.js',
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  // Adjust module resolution algorithm
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['*', '.ts', '.tsx', '.js', '.vue', '.json']
  },

  // Resolve encountered imports
  module: {
    rules: [
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
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: [
              'babel-loader',
              'vue-svg-loader',
            ],
          },
          {
            loader: 'file-loader',
            query: {
              name: 'assets/[name].[hash:8].[ext]',
            },
          },
        ],
      },
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
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true,
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
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
      typescript: {
        extensions: {
          vue: true
        }
      }
    }),
    new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: true }),
    new FriendlyErrorsWebpackPlugin(),
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
    // new CopyWebpackPlugin({
    //   patterns: [{
    //     from: utils.resolve('static/img'),
    //     to: utils.resolve('dist/static/img'),
    //     toType: 'dir'
    //   }]
    // }),
    // new BundleAnalyzerPlugin(),
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
    contentBase: './dist',
    // clientLogLevel: 'warning',
    open: true,
    historyApiFallback: true,
    overlay: true,
    // stats: 'errors-only',
    stats: 'minimal'
  },
};
