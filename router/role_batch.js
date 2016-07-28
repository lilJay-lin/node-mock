/**
 * Created by liljay on 2016/7/21.
 */
let datas = require('./datas')
var util = require('../util')
var _ = require('lodash')
let roles = datas.roles
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
                let idx = _.findIndex(roles, {id: id});
                if(~idx){
                    roles.splice(idx,1);
                    delIds.push(id)
                }
            })
        }
        result.result =  delIds
        res.json(result)
    }
}