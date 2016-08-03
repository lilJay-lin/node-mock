/**
 * Created by liljay on 2016/7/21.
 */
var uuid = (require('../util')).uuid
let getRandom = function (len) {
    return Math.floor(Math.random() * len)
}
let roles = (function(){
    let roles = []
    let i = 0
    for(;i < 20; i++){
        let name = 'role' + (i + 1)
        roles.push({
            id:uuid(),
            name: name,
            description: 'i am active as a role, name ' + name
        })
    }
    return roles
})()
let permissions = (function(){
    let permissions = []
    let i = 0
    let name = 'permission'
    for(;i < 20; i++){
        permissions.push({
            id: uuid(),
            name: name  + (i + 1),
            code: uuid(),
            description: 'i am active as a permission, name ' + name
        })
    }
    return permissions
})()

let users = (function(){
    let i = 0;
    let users = []
    users.push({
        loginName: 'admin',
        password: '123456'
    })
    for(;i < 20; i++){
        let name = 'name' + (i + 1)
        users.push({
            id: uuid(),
            loginName: name,
            identity: 441522 + (Math.random() + '').substr(2, 10),
            phoneNum: 159 + (Math.random() + '').substr(3,8),
            name: uuid(),
            password: '',
            description: name
        })
    }
    return users
})();
let slaves = []
let userRelRole = (function(){
    let userRelRoles = []
    let i = 0
    for(; i<users.length; i++){
        userRelRoles.push({
            id: uuid(),
            roleId: roles[getRandom(roles.length)].id,
            userId: users[i].id
        })
    }
    return userRelRoles
})();
let roleRelPermission = (function(){
    let roleRelPermissions = []
    let i = 0
    for(; i<roles.length; i++){
        roleRelPermissions.push({
            id: uuid(),
            permissionId: permissions[getRandom(permissions.length)].id,
            roleId: roles[i].id
        })
    }
    return roleRelPermissions
})();
/*
*
* orderStatus:
* 1、未收未付
 2、未收需付
 3、已收未付
 4、已收需付
 5、未收未完
 6、未收完成
 7、已收未完
 8、已收完成
 9、未收失败
 10、已收失败
* */
let orders = (function(){
    let orders = []
    let i = 0;
    for(;i < 20; i++){
        let name = 'name' + (i + 1)
        let customerName = 'customerName'+ (i + 1)
        orders.push({
            id: uuid(),
            orderNumber: uuid(),
            orderStatus: getRandom(10) + 1,
            serviceType: '',
            customerName: customerName,
            customerPhoneNum: 159 + (Math.random() + '').substr(3,8),
            customerTel: '020-' + (Math.random() + '').substr(3,7),
            customerAddress: 'address road num ' + (i + 1),
            productInfo: 'productInfo ' + (i + 1),
            productImgs: '',
            logisticsInfo: 'logisticsInfo ' + (i + 1),
            logisticsImgs: '',
            repairInfo: 'repairInfo ' + (i + 1),
            repairImgs: '',
            isChecked: i % 2 === 0 ? 1 : 0,
            checkInfo: 'checkInfo' + (i + 1),
            shopInfo: 'shopInfo' + (i + 1),
            orderPrice: Math.floor(i * Math.random() * 100),
            servicePrice: Math.floor(i * Math.random() * 100),
            profit: Math.floor(i * Math.random() * 100),
            priceChangeReason: 'priceChangeReason' + (i + 1),
            judgment: Math.floor(i * Math.random() * 100),
            judgeReason: 'judgeReason' + (i + 1),
            description: 'description' + (i + 1),
            creatorId: users[getRandom(users.length)].id,
            cetateDate: '2016-07-24',
            completeDate: '',
            orderPriceChanged: Math.floor(i * Math.random() * 100),
            servicePriceChanged: Math.floor(i * Math.random() * 100)
        })
    }
    return orders
})();
let workers = (function(){
    let workers = []
    let i = 0;
    for(;i < 20; i++){
        let name = 'name' + (i + 1)
        let customerName = 'customerName'+ (i + 1)
        workers.push({
            id: uuid(),
            workmanNumber: uuid(),
            headImg: '',
            name: name,
            phoneNum: 159 + (Math.random() + '').substr(3,8),
            qq: (Math.random() + '').substr(3,8),
            receiveType: i % 2 === 0 ? 0 : 1,
            alipayAccount: '',
            bank: '',
            cardNum: '',
            birthday: null,
            province: '',
            city: '',
            area: '',
            address: 'address' + (i + 1),
            idCardFace: '',
            idCardBack: '',
            serviceType: '',
            serviceItems: '',
            serviceArea: '',
            teamPeopleNum: i,
            truckNum: i,
            tonnage: getRandom(10),
            willingPickAddress: 'willingPickAddress' + (i + 1),
            logistics: 'logistics' + (i + 1),
            strength: 'strength' + (i + 1),
            description: 'description' + (i + 1),
            cooperateTimes: i,
            score: getRandom(10)
        })
    }
    return workers
})();
let orderRelWorker = (function(){
    let orderRelWorker = []
    let i = 0
    for(; i<orders.length; i++){
        orderRelWorker.push({
            id: uuid(),
            workerId: workers[getRandom(workers.length)].id,
            orderId: orders[i].id
        })
    }
    return orderRelWorker
})();
module.exports =  {
    userRelRole,
    roles,
    permissions,
    users,
    roleRelPermission,
    slaves,
    orders,
    workers,
    orderRelWorker
}