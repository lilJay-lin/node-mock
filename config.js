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
        "post::/user/:id": "router/user.js",
        /*"delete::/user/:id": "router/user.js",*/
        "post::/user/batch": "router/user_batch.js",
        "post::/role/batch": "router/role_batch.js",
        "get::/role": "router/role.js",
        "get::/role/:id": "router/role.js",
        "post::/role": "router/role.js",
        "post::/role/:id": "router/role.js",
        "get::/permission": "router/permission.js",
        "post::/order/batch": "router/order_batch.js",
        "get::/order": "router/order.js",
        "get::/order/:id": "router/order.js",
        "post::/order": "router/order.js",
        "post::/order/:id": "router/order.js",
        "post::/user/self/order/batch": "router/order_batch.js",
        "get::/user/self/order": "router/order.js",
        "get::/user/self/order/:id": "router/order.js",
        "post::/user/self/order": "router/order.js",
        "post::/user/self/order/:id": "router/order.js",
        "post::/workman/batch": "router/worker_batch.js",
        "get::/workman": "router/worker.js",
        "get::/workman/:id": "router/worker.js",
        "post::/workman": "router/worker.js",
        "post::/workman/:id": "router/worker.js",
        "post::/user/login": "router/user_login.js"
        
    },
    /*www.chengongjiaju.cn*/
    proxy: {
        port: '80',
        host: '',
        protocol: 'http'
    }
}