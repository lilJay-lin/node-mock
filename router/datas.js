/**
 * Created by liljay on 2016/7/21.
 */
var guui = (require('../util')).uuid
let getRandom = function (len) {
    return Math.floor(Math.random() * len)
}
let roles = (function(){
    let roles = []
    let i = 0
    for(;i < 20; i++){
        let name = 'role' + (i + 1)
        roles.push({
            id:guui(),
            name: name,
            description: 'i am active as a role, name ' + name
        })
    }
    return roles
})()
let permissions = (function(){
    let permissions = []
    let i = 0
    let name = 'permission' + (i + 1)
    for(;i < 20; i++){
        permissions.push({
            id: guui(),
            name: name,
            code: guui(),
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
            id: guui(),
            login_name: name,
            identity: 441522 + (Math.random() + '').substr(2, 10),
            phone_num: 159 + (Math.random() + '').substr(3,8),
            name: guui(),
            password: '',
            description: name
        })
    }
    return users
})();
let userRelRole = (function(){
    let userRelRoles = []
    let i = 0
    for(; i<users.length; i++){
        userRelRoles.push({
            id: guui(),
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
            id: guui(),
            permission_id: permissions[getRandom(permissions.length)].id,
            role_id: roles[i].id
        })
    }
    return roleRelPermissions
})();

module.exports =  {
    userRelRole,
    roles,
    permissions,
    users,
    roleRelPermission
}