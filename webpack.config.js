let path = require('path');
let webpack = require('webpack');

let HtmlWebpackPlugin = require("html-webpack-plugin");
let CopyWebpackPlugin = require("copy-webpack-plugin");
//
let CleanWebpackPlugin = require("clean-webpack-plugin");

// const ExtractTextPlugin = require("extract-text-webpack-plugin");
let appConfigData = require("./build/appConfig");
let extConfigData = require("./build/extconfig");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const extractLess = new ExtractTextPlugin({
//     filename: "[name].[contenthash].css",
//     disable: process.env.NODE_ENV === "development"
// });
//
// console.log(appConfigData.mainPages);
// console .log('====================================');
// console.log(appConfigData.entryPoints);

let proxyServer = {};
if (extConfigData.crossServers) {
    //
    for (let keyField in extConfigData.crossServers) {
        //
        let proxyItem = {
            target: extConfigData.crossServers[keyField],
            changeOrigin: true,
            secure: false
        };
        proxyServer[keyField] = proxyItem;
    }
}
//
module.exports = {
    entry: appConfigData.entryPoints,

    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            //scss
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            //sass
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                ],
            },
            //vue 文件组.
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                    // other vue-loader options go here
                }
            },
            //es6 js files.
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            //media.
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            // resolve *.ts files.
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            // less files.
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    // compiles Less to CSS
                    loader: 'less-loader',
                    options: {
                        paths: [
                            path.resolve(__dirname, 'src')
                        ]
                    }

                }]
            },
            //url loader.
            {
                test: /\.(woff|otf|eot|woff2|ttf|svg|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=30000&name=[name]_[hash].[ext]'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json', ".ts", ".tsx"]
    },

    //server config.
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
        port: extConfigData.PORT || 8080,
        host: extConfigData.ADDRESS || "localhost",
        proxy: proxyServer,
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
};

//
var htmlPlugins = [];
//
appConfigData.mainPages.forEach((item, index) => {
    //
    let plugin = new HtmlWebpackPlugin({
        //
        template: item.template,
        filename: item.filename,
        title: item.title,
        chunks: item.chunks
    });
    //
    htmlPlugins.push(plugin);
});

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false
        }),
        // css

        // new ExtractTextPlugin({
        //     filename: "style.css",
        //     allChunks: true
        // }),

        // extractLess,
        //clear dirs.
        new CleanWebpackPlugin(["dist"]),
    ]).concat(htmlPlugins);
}
