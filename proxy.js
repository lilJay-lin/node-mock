/**
 * Created by liljay on 2016/5/30.
 */
var request = require('superagent')
var urlUtil = require('url')
module.exports = function({port, host, protocol}){
    return function(req, res, next){
        let url = urlUtil.format({
            hostname: host,
            port,
            protocol,
            pathname : req.originalUrl
        })
        let method = req.method.toLowerCase()
        request[method](url)
            .send(req.body || {})
            .end(function(err, sres){
            if(err){
                next(err)
                return ;
            }
            res.json(sres.body)
        })
    }
}