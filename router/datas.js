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
    for(;i < 20; i++){
        let name = 'name' + (i + 1)
        users.push({
            id: uuid(),
            login_name: name,
            identity: 441522 + (Math.random() + '').substr(2, 10),
            phone_num: 159 + (Math.random() + '').substr(3,8),
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
            role_id: roles[getRandom(roles.length)].id,
            user_id: users[i].id
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
            permission_id: permissions[getRandom(permissions.length)].id,
            role_id: roles[i].id
        })
    }
    return roleRelPermissions
})();
/*
*
* order_status:
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
        let customer_name = 'customer_name'+ (i + 1)
        orders.push({
            id: uuid(),
            order_number: uuid(),
            order_status: getRandom(10) + 1,
            service_type: '',
            customer_name: customer_name,
            customer_phone_num: 159 + (Math.random() + '').substr(3,8),
            customer_tel: '020-' + (Math.random() + '').substr(3,7),
            customer_address: 'address road num ' + (i + 1),
            product_info: 'product_info ' + (i + 1),
            product_imgs: [],
            logistics_info: 'logistics_info ' + (i + 1),
            logistics_imgs: [],
            repair_info: 'repair_info ' + (i + 1),
            repair_imgs: [],
            is_checked: i % 2 === 0 ? true : false,
            check_info: 'check_info' + (i + 1),
            shop_info: 'shop_info' + (i + 1),
            order_price: Math.floor(i * Math.random() * 100),
            service_price: Math.floor(i * Math.random() * 100),
            profit: Math.floor(i * Math.random() * 100),
            price_change_reason: 'price_change_reason' + (i + 1),
            judgment: Math.floor(i * Math.random() * 100),
            judge_reason: 'judge_reason' + (i + 1),
            description: 'description' + (i + 1),
            creator_id: users[getRandom(users.length)].id,
            cetate_date: '2016-07-24',
            complete_date: '',
            order_price_changed: Math.floor(i * Math.random() * 100),
            service_price_changed: Math.floor(i * Math.random() * 100)
        })
    }
    return orders
})();
let workers = (function(){
    let workers = []
    let i = 0;
    for(;i < 20; i++){
        let name = 'name' + (i + 1)
        let customer_name = 'customer_name'+ (i + 1)
        workers.push({
            id: uuid(),
            workman_number: uuid(),
            head_img: '',
            name: name,
            phone_num: 159 + (Math.random() + '').substr(3,8),
            qq: (Math.random() + '').substr(3,8),
            receive_type: i % 2 === 0 ? 0 : 1,
            alipay_account: '',
            bank: '',
            card_num: '',
            birthday: null,
            province: '',
            city: '',
            area: '',
            address: 'address' + (i + 1),
            id_card_face: '',
            id_care_back: '',
            service_type: '',
            service_items: '',
            service_area: '',
            team_people_num: i,
            truck_num: i,
            tonnage: getRandom(10),
            willing_pick_address: 'willing_pick_address' + (i + 1),
            logistics: 'logistics' + (i + 1),
            strength: 'strength' + (i + 1),
            description: 'description' + (i + 1),
            cooperate_times: i,
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
            worker_id: workers[getRandom(workers.length)].id,
            order_id: orders[i].id
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