/**
 * Created by liljay on 2016/7/21.
 */
let datas = require('./datas')
var guui = require('../util')
var _ = require('lodash')
let users = datas.users
let getResult = function (){
    return _.clone({ "success":1,"msg":"","result":{}})
};
module.exports = {
    post: (req, res) => {
        let data = req.body
        let str = data.ids
        let result = getResult()
        let delIds = []
        if(str){
            let ids = str.split(',')
            _.forEach(ids, function (id) {
                let idx = _.findIndex(users, {id: id});
                if(~idx){
                    users.splice(idx,1);
                    delIds.push(id)
                }
            })
        }
        result.result = {
            ids: delIds
        }
        res.json(result)
    }
}