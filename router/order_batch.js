/**
 * Created by liljay on 2016/7/21.
 */
let datas = require('./datas')
var util = require('../util')
var _ = require('lodash')
let orders = datas.orders
let getResult = util.getResult
module.exports = {
    post: (req, res) => {
        let data = req.body
        let str = data.ids
        let result = getResult()
        let delIds = []
        if(str){
            let ids = str.split(',')
            _.forEach(ids, function (id) {
                let idx = _.findIndex(orders, {id: id});
                if(~idx){
                    orders.splice(idx,1);
                    delIds.push(id)
                }
            })
        }
        result.result = delIds
        res.json(result)
    }
}