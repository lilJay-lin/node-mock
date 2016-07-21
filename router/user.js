/**
 * Created by liljay on 2016/5/29.
 */
let datas = require('./datas')
var _ = require('lodash')
let users = datas.users
let getResult = function (){
    return _.clone({ "success":1,"msg":"","result":{}})
};

/*/user : GET_2/POST_2（searchKeyword）
/user/{id} : GET_2/PATCH_2/DELETE_2
/user/batch : PATCH_2/DELETE_2*/
let getPageData = datas.getPageData
module.exports = {
    get: (req, res) => {
        let id = req.params.id
        let searchKeyword = req.query.searchKeyword
        let result = getResult();
        if(id){
            let idx = _.findIndex(users, {id: id});
            result.data = users[idx]
        }else if(searchKeyword) {
            let curPage = req.query.curPage || 1
            let filterUsers = _.filter(users, _.conforms({'login_name': function(name){
                return ~searchKeyword.indexOf(name)
            }}))
            let pageInfo = getPageData(filterUsers, curPage)
            _.forEach(pageInfo, (value, key) => {
                result[key] = value
            })
        }else {
            let curPage = req.query.curPage || 1
            let pageInfo = getPageData(_.clone(users), curPage)
            _.forEach(pageInfo,(value, key) => {
                result[key] = value
            })
        }
        res.json(result)
    },
    delete: (req, res) => {
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
    },
    post: (req, res) => {
        let result = getResult();
        let user = req.body
        if(user){
           let id = user.id
            if(id){
                let idx = _.findIndex(users, {id: id});
                user[idx] = user
            }else{
                user.id = guui();
                users.push(user);
                result.result.id = user.id;
            }
        }
        res.json(result)
    }
}