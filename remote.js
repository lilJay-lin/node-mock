/**
 * Created by liljay on 2016/5/30.
 */
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
/**
 * Created by liljay on 2016/5/29.
 */
var user = [
    {
        "name": "liljay",
        "age": "18",
        "sex": "male"
    },
    {
        "name": "jack",
        "age": "28",
        "sex": "male"
    }
]
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next){
    console.log('req from client url:' + req.originalUrl + ', method type:' + req.method)
    next()
})
app.get('/json', function(req, res){
    res.json({
        name: 'remote',
        message: 'data from remote'
    })
})
app.get('/user', function(req, res){
    res.json(user)
})
app.post('/user', function(req, res){
    var u = req.body.user
    u && user.push(u)
    res.json({
        data: user
    })
})

app.delete('/user/:id', function(req, res){
    let index = req.params.id
    user.splice(index, 1)
    res.json(user)
})

app.listen(8080, function(){
    console.log('server is listening on 8080')
})