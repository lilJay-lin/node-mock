/**
 * Created by liljay on 2016/5/30.
 */
var request = require('superagent')
var urlUtil = require('url')
var _ = require('lodash')
module.exports = function({port, host, protocol}){
    return function(req, res, next){
        let url = urlUtil.format({
            hostname: host,
            port,
            protocol,
            pathname : req.originalUrl
        })
        let method = req.method.toLowerCase()
        let sreq = request[method](url)
            .send(req.body || {});
        /*
         * 上传页面cookies
         * */
        let cookies = req.cookies
        console.log(req.cookies)
/*        _.forEach(cookies, (value, key) => {
            sreq.set('Cookie', key + '=' +  value)
        })*/
        sreq.end(function(err, sres){
            if(err){
                next(err)
                return
            }
            if(!sres.ok){
                next(sres)
                return
            }
            /*
            *  获取代理对象传回来的cookies
            * */
            let header = sres.header
            _.forEach(header, (value, key) => {
                res.set(key, value)
            })
            /*if(res.type === 'application/json'){
                res.json(sres.body)
            }else {
                res.send(sres.text)
            }*/
            res.json(sres)
        })
    }
}