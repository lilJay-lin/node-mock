/**
 * Created by linxiaojie on 2016/7/22.
 */
var request = require('superagent')
var expect = require('chai').expect
let util = require('../util')
let datas = require('../router/datas')
describe('#user test', function(){
    let id = ''
    it('get /user', function(done){
        request.get('http://localhost:3000/user')
            .end(function(err, res){
                if(err){
                    throw err
                }
                id = res.body.result.datas[0].id
                done()
            })
    })
    it('get /user/id', function (done){
        request.get('http://localhost:3000/user/' + id)
            .end(function(err, res){
                if(err){
                    throw err
                }
                console.log(res.body)
                let data = res.body.result.data
                expect(data.id).to.equal(id)
                done()
            })
    })
})