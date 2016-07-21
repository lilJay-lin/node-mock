/**
 * Created by liljay on 2016/7/21.
 */
var guui = require('../util')
let users = [];
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
module.exports =  {
    users,
    getPageData
}