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
module.exports = {
    get: (req, res) => {
        let index = req.params.id
        if(index){
            res.json(user[index])
        }
        res.json(user)
    },
    delete: (req, res) => {
        let index = req.params.id
        user.splice(index, 1)
        res.json(user)
    }
}