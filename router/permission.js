/**
 * Created by liljay on 2016/5/29.
 */
let datas = require('./datas')
let util = require('../util')
var _ = require('lodash')
let permissions = datas.permissions
let getResult = function (){
    return _.clone({ "success":1,"msg":"","result":{}})
};

/*/permission : GET_2/POST_2（searchKeyword）
/permission/{id} : GET_2/PATCH_2/DELETE_2
/permission/batch : PATCH_2/DELETE_2*/
let getPageData = util.getPageData
module.exports = {
    get: (req, res) => {
        let searchKeyword = req.query.searchKeyword
        let result = getResult();
        if(searchKeyword) {
            let curPage = req.query.curPage || 1
            let filterUsers = _.filter(permissions, _.conforms({'name': function(name){
                return ~name.indexOf(searchKeyword)
            }}))
            let pageInfo = getPageData(filterUsers, curPage)
            _.forEach(pageInfo, (value, key) => {
                result.result[key] = value
            })
        }else {
            let curPage = req.query.curPage || 1
            let pageInfo = getPageData(_.clone(permissions), curPage)
            _.forEach(pageInfo,(value, key) => {
                result.result[key] = value
            })
        }
        res.json(result)
    }
}