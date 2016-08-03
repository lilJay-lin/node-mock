/**
 * Created by liljay on 2016/5/29.
 */
let datas = require('./datas')
let util = require('../util')
var _ = require('lodash')
let users = datas.users
let userRelRole = datas.userRelRole
let getResult = util.getResult

/*/user : GET_2/POST_2（searchKeyword）
/user/{id} : GET_2/PATCH_2/DELETE_2
/user/batch : PATCH_2/DELETE_2*/
let getPageData = util.getPageData
module.exports = {
    get: (req, res) => {
        let id = req.params.id
        let searchKeyword = req.query.searchKeyword
        let result = getResult();
        if(id){
            //console.log(users.length + ' ' + id)
            let user = util.findIndex(users, id)
            user.roles = util.queryRela(id, 'userId', 'roleId', datas.userRelRole, datas.roles)
            user.slaves = util.queryRela(id, 'masterId', 'slaveId', datas.slaves, datas.users)
            result.result = user
        }else if(searchKeyword) {
            let curPage = req.query.curPage || 1
            let filterUsers = _.filter(users, _.conforms({'loginName': function(name){
                return ~name.indexOf(searchKeyword)
            }}))
            let pageInfo = getPageData(filterUsers, curPage)
            _.forEach(pageInfo, (value, key) => {
                result.result[key] = value
            })
        }else {
            let curPage = req.query.curPage || 1
            let pageInfo = getPageData(_.clone(users), curPage)
            _.forEach(pageInfo,(value, key) => {
                result.result[key] = value
            })
        }
        res.json(result)
    },
/*    delete: (req, res) => {
        let result = getResult();
        let id = req.params.id
        let idx = _.findIndex(users, {id: id});
        if(~idx){
            users.splice(idx,1);
            result.result = {
                id: id
            }
        }else{
            result.success = 0;
            result.msg = "找不到用户:" + id
        }
        res.json(result)
    },*/
    post: (req, res) => {
        let result = getResult();
        let user = req.body
        if(user){
           let id = user.id
            let roleIds = user.roleIds || ''
            let slaveIds = user.slaveIds || ''
            delete user.roleIds
            delete user.slaveIds
            if(id){
                let idx = _.findIndex(users, {id: id});
                users[idx] = user
            }else{
                id = user.id = util.uuid();
                users.push(user);
                result.result = user.id;
            }
            try{
                util.delAllRela(id, 'userId', datas.userRelRole)
                util.delAllRela(id, 'masterId', datas.slaves)
                util.notEmpty(roleIds) && util.addRela(id, roleIds.split(','), 'userId', 'roleId', datas.userRelRole)
                util.notEmpty(slaveIds) && util.addRela(id, slaveIds.split(','), 'masterId', 'slaveId', datas.slaves)
            }catch (e){
                console.log(e)
            }
        }
        res.json(result)
    }
}