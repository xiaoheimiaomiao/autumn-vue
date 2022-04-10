const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title // 网址标题
const port = 8071 // 端口配置

module.exports= {
    // 基本路径 baseURL已经过时
    publicPath: '/',
    // 输出文件目录
    outputDir: 'dist',
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
    },
    // webpack-dev-server 相关配置
    devServer: {
        open: false,
        disableHostCheck: true,
        port: port,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                changeOrigin: true,
                target: 'http://127.0.0.1:8060',
                pathRewrite: {
                    '^/api': '' //请求的时候使用这个api就可以
                }
            }
        }
    },
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src'),
                '@components': resolve('src/components'),
                '@crud': resolve('src/components/Crud')
            }
        }
    },
}
