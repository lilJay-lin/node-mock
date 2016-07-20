/**
 * Created by liljay on 2016/5/29.
 */
var guui = require('../util')
var _ = require('lodash')
let users = [
];
let getResult = function (){
    return _.clone({ "success":1,"msg":"","result":{}})
};
let i = 0;
let names = ['jack', 'liljay', 'jim', 'lucy', 'alimy', 'yesl']
for(;i < 20; i++){
    let name = names[parseInt(Math.random() * names.length)];
    users.push({
        id: guui(),
        login_name: name,
        identity: 441522 + (Math.random() + '').substr(2, 10),
        phone_num: 159 + (Math.random() + '').substr(3,8),
        name: guui(),
        password: '',
        description: name
    })
}
/*/user : GET_2/POST_2（searchKeyword）
/user/{id} : GET_2/PATCH_2/DELETE_2
/user/batch : PATCH_2/DELETE_2*/
let getPageData = function (datas = [], curPage = 1){
    let result = {result: {}}
    let pageSize = 10
    let total = datas.length
    let totalPage = parseInt(total / pageSize, 10) + (total % pageSize === 0 ? 0 : 1)
    if(curPage > totalPage){
        result.result.datas = []
    }else {
        result.result.datas = datas.splice((curPage - 1) * pageSize, pageSize -1 )
    }
    result.total = total
    result.curPage = curPage
    result.pageSize = pageSize
    result.totalPage = totalPage
    return result;
}
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