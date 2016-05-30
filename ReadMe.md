
# 前端开发用的模拟数据请求

## 实现本地静态数据配置和简单mock数据逻辑处理

配置表格式：

mock目录下存放静态json文件， router目录下存放请求处理js模拟接口请求处理

`
    ~~var config = {
                     '/user': 'get::router/user.js',
                     '/user/:id': 'get::router/user.js',
                     '/article': 'get::mock/article.json'
                 }~~
    var config = {
                     routes:{
                         'get::/user': 'router/user.js',
                         'get::/user/:id': 'router/user.js',
                         'get::/article': 'mock/article.json'
                     }
                 } 
                 
`

## 实现请求代理

config配置增加proxy做请求代理,proxy.host非空时，请求实际为代理请求

`
    var config = {
                     routes:{
                         'get::/user': 'router/user.js',
                         'get::/user/:id': 'router/user.js',
                         'get::/article': 'mock/article.json'
                     },
                     proxy: {
                         port: '8080',
                         host: 'localhost',
                         protocal: 'http'
                     }
                 } 
                 
`

