/**
 * Created by liljay on 2016/5/29.
 *
 * router非静态，需要配置不同的请求rule和对应的method请求
 * '/user': 'get::router/user.js', ***>修改为 'get::/user' method + url 唯一key
 *
 * 纯静态请求：
 * '/article'： 'mock/article.json'
 */
module.exports = {
    routes: {
        'get::/user': 'router/user.js',
        'get::/user/:id': 'router/user.js',
        'get::/article': 'mock/article.json',
    },
    proxy: {
        port: '8080',
        host: 'localhost',
        protocol: 'http'
    }
}