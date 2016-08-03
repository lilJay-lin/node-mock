/**
 * Created by liljay on 2016/5/29.
 */
let datas = require('./datas')
let util = require('../util')
var _ = require('lodash')
let orders = datas.orders
let getResult = util.getResult
let workers = datas.workers

/*/order : GET_2/POST_2（searchKeyword）
 /order/{id} : GET_2/PATCH_2/DELETE_2
 /order/batch : PATCH_2/DELETE_2*/
let getPageData = util.getPageData
module.exports = {
    get: (req, res) => {
        let id = req.params.id
        let searchKeyword = req.query.searchKeyword
        let result = getResult();
        if(id){
            let order = util.findIndex(orders, id)
            let workmanId = order.workmanId
            let idx = _.findIndex(workers, {id: workmanId})
            order.workman = ~idx ? workers[idx] : {}
            result.result = order
        }else if(searchKeyword) {
            let curPage = req.query.curPage || 1
            let filterUsers = _.filter(orders, _.conforms({'shopInfo': function(name){
                return ~name.indexOf(searchKeyword)
            }}))
            let pageInfo = getPageData(filterUsers, curPage)
            _.forEach(pageInfo, (value, key) => {
                result.result[key] = value
            })
        }else {
            let curPage = req.query.curPage || 1
            let pageInfo = getPageData(_.clone(orders), curPage)
            _.forEach(pageInfo,(value, key) => {
                result.result[key] = value
            })
        }
        res.json(result)
    },
    post: (req, res) => {
        let result = getResult();
        let order = req.body
        if(order){
            let id = order.id
            let workerIds = order.workerIds || ''
            delete order.workerIds
            if(id){
                let idx = _.findIndex(orders, {id: id});
                orders[idx] = order
            }else{
                id = order.id = util.uuid();
                orders.push(order);
                result.result = order.id;
            }
            util.delAllRela(id, 'orderId', datas.orderRelWorker)
            util.notEmpty(workerIds) && util.addRela(id, workerIds.split(','), 'orderId', 'workerId', datas.orderRelWorker)
        }
        res.json(result)
    }
}