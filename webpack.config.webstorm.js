const path = require('path')

module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.vue', '.json', '.css'],
        alias: {
            '@': path.resolve('src'),
            '@components': path.resolve('src/components'),
            '@crud': path.resolve('src/components/Crud')
        }
    }
}
