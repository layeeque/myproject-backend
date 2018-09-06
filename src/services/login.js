const jwt = require('jsonwebtoken');
const empModel = require('../models/login');




module.exports =(req, res) => {
    return {
        login: (req, res) => {
            console.log("I am in login services")

            empModel.find({ 'email': req.body.email }, (err, data) => {
                if (err) {
                    res.status('400').send(err);
                } else {
                    console.log("value is " + data)
                    if(data == ""){
                        res.send({
                            'success': '0',
                            'message': 'Username/Password is Invalid'
                            
                        })

                    }
                    // else if (data[0].password != req.body.password) {
                    //     res.status(403).send({
                    //         'success': '0',
                    //         'message': 'Username/Password is Invalid'
                    //     })
                    // }
                     else {
                        var name = data[0].name;
                        var token = jwt.sign({ name }, 'secretkey', { expiresIn: '6000s' }).toString();
                        var resObj = {};
                        resObj['success'] = '1';
                        resObj['token'] = token;
                        resObj['data'] = data;
                        res.send(resObj);
                    }
                }
            })
        },
        signUp: (req, res) => {
            console.log("in sign up model")
            empModel.create(req.body, (err, data) => {
                if (err) {
                    res.status('400').send(err);
                } else {
                    
                    var resObj = {};
                    resObj['success'] = '1';
                    resObj['message'] = 'saved successfully';
                    res.send(resObj);
                }
            })
        },
        events: (req, res) => {
            var resObj = {};
            resObj['success'] = '1';
            resObj['message'] = 'saved successfully';
            res.send(resObj);
        },
        social:(req, res) => {
            var name = req.body.name;
            var token = jwt.sign({ name }, 'secretkey', { expiresIn: '6000s' }).toString();
            var resObj = {};
            resObj['success'] = '1';
            resObj['token'] = token;
            //resObj['data'] = data;
            res.send(resObj);
        }
        
    }
}
