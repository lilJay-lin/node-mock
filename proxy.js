/**
 * Created by liljay on 2016/5/30.
 */
var request = require('superagent')
var urlUtil = require('url')
var _ = require('lodash')
module.exports = function({port, host, protocol}){
    return function(req, res, next){
        let path = req.originalUrl
        let parts = path.trim().split('?')
        let search = parts.length > 1 ? '?' + parts.splice(1,1).join('') : ''
        let pathname = parts[0]
        let url = urlUtil.format({
            hostname: host,
            port,
            protocol,
            pathname,
            search
        })
        let method = req.method.toLowerCase()
        let sreq = request[method](url)
            //.type('application/json')
            .send(req.body || {})

        /*
         * 上传页面cookies
         * */
        let cookies = req.cookies
        _.forEach(cookies, (value, key) => {
            sreq.set('Cookie', key + '=' +  value)
        })
        /*
        *  获取代理对象传回来的cookies
        * */
        sreq.on('response', (sres) => {
            res.set('set-cookie', sres.header['set-cookie'])
        })
        sreq.pipe(res)
    }
}