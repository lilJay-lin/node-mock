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
        "get::/user": "router/user.js",
        "get::/user/:id": "router/user.js",
        "post::/user": "router/user.js",
        /*"delete::/user/:id": "router/user.js",*/
        "post::/user/batch": "router/user_batch.js",
        "post::/role/batch": "router/role_batch.js",
        "get::/role": "router/role.js",
        "get::/role/:id": "router/role.js",
        "post::/role": "router/role.js",
        "get::/permission": "router/permission.js",
        "post::/order/batch": "router/order_batch.js",
        "get::/order": "router/order.js",
        "get::/order/:id": "router/order.js",
        "post::/order": "router/order.js",
        "post::/worker/batch": "router/worker_batch.js",
        "get::/worker": "router/worker.js",
        "get::/worker/:id": "router/worker.js",
        "post::/worker": "router/worker.js",
        
    },
    proxy: {
        port: '8080',
        host: '',
        protocol: 'http'
    }
}