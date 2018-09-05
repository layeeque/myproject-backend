const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    console.log("I am in token val function $$ " + req.body.token)
    if(req.body.token == undefined ||req.body.token == "")
    {
        res.send({
            'success': '0',
            'message': 'forbidden / Anauthorised access' 
        })
    }
    else{
        jwt.verify(req.body.token, 'secretkey', (err, authData) => {
            if (err) {
                console.log("err "+ err)
                res.sendStatus(403);
            } else {
                console.log("auth data "+ JSON.stringify(authData))
                next()
            }
        })
    }  
}