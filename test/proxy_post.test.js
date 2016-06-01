/**
 * Created by liljay on 2016/5/30.
 */
var request = require('superagent')
var chai = require('chai')
var assert = chai.assert;
describe('POST请求代理', function(){
    describe('#带json数据的post请求', function(){
        it('新增用户，请求成功返回用户列表', function(done){
            request.post('http://localhost:3000/user')
                    .send({
                        user: {
                            name: 'jim',
                            age: '18'
                        }
                    }).end(function(err, res){
                if(err){
                    throw err
                }
                let users = res.body.data
                assert.isNotNull(users)
                assert.isArray(users)
                assert.lengthOf(users, 3)
                done()
            })
        })
    })

    describe.only('#删除用户', function(){
        it('删除用户，请求成功返回用户列表', function(done){
            request.delete('http://localhost:3000/user/1')
                .end(function(err, res){
                    if(err){
                        throw err
                    }
                    let users = res.body
                    assert.isNotNull(users)
                    assert.isArray(users)
                    assert.lengthOf(users, 3)
                    done()
                })
        })
    })
})