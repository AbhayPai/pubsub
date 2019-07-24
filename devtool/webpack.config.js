const Path = require('path');
const CssNano = require('cssnano');
const SetMeUp = require('./custom_modules/setmeup');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let PathsToClean = [
    './../assets/*',
    './../*.html',
];

let CleanOptions = {
    verbose:  true,
    allowExternal: true,
    exclude:  [
        /node_modules/,
    ],
};

const Webpack_DIR = __dirname;

module.exports = {
    entry: new SetMeUp({
        Path: Path,
        Webpack_DIR
    }).entry,

    output: {
        filename: '[name].js',
        path: Path.join(Webpack_DIR, './', '../', 'assets/', 'js/')
    },

    resolve: {
        alias: new SetMeUp({
            Path,
            Webpack_DIR
        }).alias
    },

    module:{
        rules: [{
            test: /\.(js|jsx)$/,
            loader: [
                'babel-loader'
            ],
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader'
                }
            ]
        }, {
            test: /\.(jpe?g|png|gif|ico)$/i,
            use: 'file-loader?name=/images/[name].[ext]',
        }, {
            test: /\.woff|woff2|eot|ttf|svg$/,
            use: {
                loader: 'url-loader'
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'eslint-loader',
                options: {
                    configFile: './.eslintrc.json'
                },
            },
        },{
            test: /\.handlebars$/,
            loader: 'handlebars-loader',
                query: {
                    helperDirs: [
                        Path.resolve(Webpack_DIR, './custom_modules/handlebars')
                    ]
                }
        }
    ]},

    plugins: [
        new StyleLintPlugin({
            configFile: './.stylelintrc',
            files: [
                './src/assets/scss/**/*.scss'
            ]
        }),

        new CleanWebpackPlugin(
            PathsToClean,
            CleanOptions
        ),

        new UglifyJsPlugin({
            exclude: /node_modules/,
            sourceMap: true,
            uglifyOptions: {
                mangle: true,
                compress: true,
                ie8: true,
                output: {
                    comments: false,
                },
            },
            cache: false
        }),

        new MiniCssExtractPlugin({
            filename: './../css/[name].css'
        }),

        new CopyWebpackPlugin(
            new SetMeUp({
                Path,
                Webpack_DIR
            }).copyFiles
        ),

        new OptimizeCssAssetsPlugin({
            cssProcessor: CssNano,
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
    ].concat(
        new SetMeUp({
            Path,
            Webpack_DIR,
            HtmlWebpackPlugin
        }).createHtml()
    )
};
