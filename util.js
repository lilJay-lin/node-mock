/**
 * Created by liljay on 2016/7/19.
 */
const _ = require('lodash')
const getResult = function (){
    return _.clone({ "status":1,"msg":"","result":{}})
};
const compact = function (arr, key){
    let newArr = arr.map(function(data){
        return data[key]
    })
    return newArr
}
const queryRela = function (id, relaKey, relatedKey, relas, details){
    if (!relas || relas.length === 0) return []
    relas = relas.filter(function(rela){
        return rela[relaKey] === id
    })
    let ids = compact(relas, relatedKey)
    return details.filter(function(detail){
        return ids.indexOf(detail.id) > -1
    })
}
const getPageData = function (datas = [], curPage = 1){
    let result = {}
    let pageSize = 10
    let total = datas.length
    let totalPage = parseInt(total / pageSize, 10) + (total % pageSize === 0 ? 0 : 1)
    if(curPage > totalPage){
        result.datas = []
    }else {
        result.datas = datas.splice((curPage - 1) * pageSize, pageSize )
    }
    result.total = total
    result.curPage = curPage
    result.pageSize = pageSize
    result.totalPage = totalPage
    return result;
}
const uuid = function(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
const findIndex = function (arr, id){
    let newArr = arr.filter(function(user){
        return user.id === id
    })
    return newArr[0]
}
const addRela = function (id, relaIds, relaKey, relatedKey, relas){
    relaIds.forEach(function(relaId){
        let obj = {
            id: uuid()
        }
        obj[relaKey] = id
        obj[relatedKey] = relaId
        relas.push(obj)
    })
}
const delAllRela = function (id, relaKey, details){
    let i = 0, l = details.length - 1, detail
    for(; l > -1 ; l--){
        detail = details[l]
        if(detail[relaKey] === id){
            details.splice(l, 1)
        }
    }
}
const notEmpty = function(id){
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
    notEmpty,
    delAllRela
}