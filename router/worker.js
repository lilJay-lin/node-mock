/**
 * Created by liljay on 2016/5/29.
 */
let datas = require('./datas')
let util = require('../util')
var _ = require('lodash')
let workers = datas.workers
let getResult = util.getResult

/*/worker : GET_2/POST_2（searchKeyword）
 /worker/{id} : GET_2/PATCH_2/DELETE_2
 /worker/batch : PATCH_2/DELETE_2*/
let getPageData = util.getPageData
module.exports = {
    get: (req, res) => {
        let id = req.params.id
        let searchKeyword = req.query.searchKeyword
        let result = getResult();
        if(id){
            let worker = util.findIndex(workers, id)
            result.result = worker
        }else if(searchKeyword) {
            let curPage = req.query.curPage || 1
            let filterUsers = _.filter(workers, _.conforms({'name': function(name){
                return ~name.indexOf(searchKeyword)
            }}))
            let pageInfo = getPageData(filterUsers, curPage)
            _.forEach(pageInfo, (value, key) => {
                result.result[key] = value
            })
        }else {
            let curPage = req.query.curPage || 1
            let pageInfo = getPageData(_.clone(workers), curPage)
            _.forEach(pageInfo,(value, key) => {
                result.result[key] = value
            })
        }
        res.json(result)
    },
    post: (req, res) => {
        let result = getResult();
        let worker = req.body
        if(worker){
            let id = worker.id
            if(id){
                let idx = _.findIndex(workers, {id: id});
                workers[idx] = worker
            }else{
                id = worker.id = util.uuid();
                workers.push(worker);
                result.result = worker.id;
            }
        }
        res.json(result)
    }
}