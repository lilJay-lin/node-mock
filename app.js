/**
 * Created by liljay on 2016/5/29.
 */
var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var app = express()
var port = 3000
var config = require('./config')
var _ = require('lodash')
var fs = require('fs')
var path  = require('path')
var proxy = require('./proxy')
var httpProxy = require('http-proxy')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Content-Type, accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use((req, res, next) => {
    console.log('requesting url :' + req.originalUrl + ', method type:' + req.method)
    next()
})

/*
* 请求代理方式
*/
if(!!config.proxy.host){
    /*var proxy = httpProxy.createProxyServer({})
    app.use((req, res) => {
        proxy.web(req, res, {
            target: config.proxy
        });
    })*/
    app.all('/*', proxy(config.proxy))
}else{/*本地请求方式*/
    _.forEach(config.routes, (url, key) => {
        let arr = key.split('::')
        let route = app.route(arr[1])
        let method = arr[0]
        let type = url.split('/')[0]
        url = path.resolve(__dirname, url)
        if(type === 'mock'){
            route[method]((req, res, next) =>  {
                fs.exists(url, (exists) => {
                    if(exists){
                        let readStream = fs.createReadStream(url)
                        readStream.pipe(res)
                    }else{
                        next({
                            name: 'FileNotExitsError',
                            message: '请求的数据文件不存在：' + url
                        })
                    }
                })
            })
        }else {
            let router = require(url)
            route[method](router[method])
        }
    })
}


app.use('*', (req, res) => {
    res.end('requesting url:' + req.originalUrl + ' not found')
})

app.use((err, req, res, next) => {
    res.type('html')
    res.end(JSON.stringify(err))
})

app.listen(port, () => {
    console.log('server is starting on port ' + port)
})