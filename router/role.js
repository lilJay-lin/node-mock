/**
 * Created by liljay on 2016/5/29.
 */
let datas = require('./datas')
let util = require('../util')
var _ = require('lodash')
let roles = datas.roles
let roleRelRole = datas.roleRelRole
let getResult = function (){
    return _.clone({ "success":1,"msg":"","result":{}})
};

/*/role : GET_2/POST_2（searchKeyword）
/role/{id} : GET_2/PATCH_2/DELETE_2
/role/batch : PATCH_2/DELETE_2*/
let getPageData = util.getPageData
module.exports = {
    get: (req, res) => {
        let id = req.params.id
        let searchKeyword = req.query.searchKeyword
        let result = getResult();
        if(id){
            let role = util.findIndex(roles, id)
            role.permissions = util.queryRela(id, 'role_id', 'permission_id', datas.roleRelPermission, datas.permissions)
            result.result.data = role
        }else if(searchKeyword) {
            let curPage = req.query.curPage || 1
            let filterUsers = _.filter(roles, _.conforms({'login_name': function(name){
                return ~searchKeyword.indexOf(name)
            }}))
            let pageInfo = getPageData(filterUsers, curPage)
            _.forEach(pageInfo, (value, key) => {
                result[key] = value
            })
        }else {
            let curPage = req.query.curPage || 1
            let pageInfo = getPageData(_.clone(roles), curPage)
            _.forEach(pageInfo,(value, key) => {
                result[key] = value
            })
        }
        res.json(result)
    },
    post: (req, res) => {
        let result = getResult();
        let role = req.body
        if(role){
           let id = role.id
            let permissionIds = role.permissionIds
            delete role.permissionIds
            if(id){
                let idx = _.findIndex(roles, {id: id});
                role[idx] = role
            }else{
                id = role.id = guui();
                roles.push(role);
                result.result.id = role.id;
            }
            util.notEmpty(permissionIds) && util.addRela(id, permissionIds.split(','), 'role_id', 'permission_id', datas.roleRelPermission)
        }
        res.json(result)
    }
}