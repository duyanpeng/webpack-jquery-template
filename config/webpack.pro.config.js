const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackBaseConfig = require('./webpack.base.config.js');
const WebpackMerge = require('webpack-merge')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const TransferWebpackPlugin = require('transfer-webpack-plugin');
module.exports = WebpackMerge(WebpackBaseConfig, {
    entry: {
        main:'./index.js',
        vendor:['jquery']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[chunkhash].js',
    },
    mode: 'production',
    module:{
        rules:[
            {
                test: /\.css$/, 
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","postcss-loader"]
                  })
            },
            {
                test: /\.less$/, 
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","postcss-loader","less-loader"]
                  })
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'],{
            root:     path.resolve(__dirname,'../'),
            verbose:  true,
            dry:      false
        }),

        new TransferWebpackPlugin([
            { from: 'static', to: 'static' },
        ]),
        new ExtractTextPlugin("styles.[chunkhash].css"),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        
    ],
    optimization: {
        splitChunks: {
            // chunks:'all'
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: false
                }
            }
        }
    }
})
