//壓縮、打包的相關設定
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const base = require('./webpack.base.conf');
const terserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports=merge(base,{
    mode:'production',
    devtool:'source-map',
    output:{
        filename:'main.js'
    },
    module:{
        rules:[
            {
                test:/\.(ico|png|jpg|gif|jpe?g|svg)$/i,
                use:[
                    {
                        loader:'image-webpack-loader',//壓縮圖片
                        options:{
                            bypassOnDebug:true
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify('<production>')
        }),
        new HtmlWebpackPlugin({
            title:'fetch-polyfill',
            template:'src/index.html',
            filename:'index.html',
            favicon:'src/images/icon.ico',
            minify:{
                removeComments:true,//刪除註釋
                collapseWhitespace:true//刪除空格
            }
        }),
        new CleanWebpackPlugin() 
    ],
    optimization:{
        minimizer:[
            new terserPlugin(),
            new optimizeCssAssetsPlugin()
        ]
    }
})