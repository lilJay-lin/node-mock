/**
 * Created by linxiaojie on 2016/7/22.
 */
var request = require('superagent')
var expect = require('chai').expect
let util = require('../util')
let datas = require('../router/datas')
describe('test util', function(){
    it('util.queryRela', function(){
        let users = datas.users
        let id = users[0].id
        let roles = util.queryRela(id, 'user_id', 'role_id', datas.userRelRole, datas.roles);
        expect(roles).to.have.length(1);
    })
})
describe('test addRela', function(){
    it('util.addRela', function(){
        let users = datas.users
        let id = users[0].id
        let relaId = 'sssssss'
        let roles = util.addRela(id, [relaId], 'user_id', 'role_id', datas.userRelRole);
        let finds = datas.userRelRole.filter(function(rela){
            return rela['role_id'] === relaId
        })
        expect(finds).to.have.length(1);
    })
})