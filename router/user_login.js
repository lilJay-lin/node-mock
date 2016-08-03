/**
 * Created by liljay on 2016/7/31.
 */
let datas = require('./datas')
let util = require('../util')
var _ = require('lodash')
let users = datas.users
let getResult = util.getResult
module.exports = {
    post: function (req, res) {
        let user = req.body
        let idx = _.findIndex(users, {loginName: user.loginName, password: user.password})
        let result = util.getResult()
        if (idx === -1){
            result.status = 0
        }
        result.result = {
            userName: 'admin',
            loginName: 'admin',
            password: '123456',
            userId: 'self',
            permissionCodes: 'roleManager,userManager,orderManager,workmanManager,analysisManager'
        }
        res.json(result)
    }
}