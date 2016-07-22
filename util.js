/**
 * Created by liljay on 2016/7/19.
 */
let getResult = function (){
    return _.clone({ "success":1,"msg":"","result":{}})
};
let compact = function (arr, key){
    let newArr = arr.map(function(data){
        return data[key]
    })
    return newArr
}
let queryRela = function (id, relaKey, relatedKey, relas, details){
    relas = relas.filter(function(rela){
        return rela[relaKey] === id
    })
    let ids = compact(relas, relatedKey)
    return details.filter(function(detail){
        return ids.indexOf(detail.id) > -1
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
let uuid = function(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
let findIndex = function (arr, id){
    let newArr = arr.filter(function(user){
        return user.id === id
    })
    return newArr[0]
}
let addRela = function (id, relaIds, relaKey, relatedKey, relas){
    relaIds.forEach(function(id){
        let obj = {
            id: uuid()
        }
        obj[relaKey] = id
        obj[relatedKey] = id
        relas.push(obj)
    })
}
let notEmpty = function(id){
    return !!id && id.trim() !== ''
}
module.exports = {
    uuid,
    getResult,
    compact,
    queryRela,
    getPageData,
    findIndex,
    addRela,
    notEmpty
}