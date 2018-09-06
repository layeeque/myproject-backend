const jwt = require('jsonwebtoken');
const empModel = require('../models/login');
var nodemailer = require('nodemailer');
var randomstring = require("randomstring");

module.exports =(req, res) => {
    return {
        login: (req, res) => {
            console.log("I am in login services")
            console.log(req.body.email+" "+req.body.password)

            empModel.find({ 'email': req.body.email,'password':req.body.password }, (err, data) => {
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
        },
        changePassword: (req, res) => {
            

            empModel.find({ 'email': req.body.email }, (err, data) => {
                if(data== ""){
                    var resObj = {};
                    resObj['success'] = '0';  
                  resObj['message'] = 'You are not Registered User. Please Register yourself';
                    res.send(resObj);

                }
                else{
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'layeequerehman@gmail.com',
                            pass: 'Alfaiz@22'
                        }
                    });
                    var newpassword=randomstring.generate(7);
                    console.log("new password is "+newpassword)

                    empModel.updateOne({email:req.body.email},{  $set: {password:newpassword}},{multi:true}, (err, data) => {
                        if (err) {
                        console.log("failure")
                        res.status('400').send(err);
                    } else {
                        console.log("success")
                        //console.log(data)
                        var resObj = {};
                        resObj['success'] = '1';  
                        resObj['message'] = 'your new Password has been sent to your Registered Email '+ req.body.email;
                        res.send(resObj);
                       
                    }
            
                    var mailOptions = {
                        from: 'layeequerehman@gmail.com',
                        to: req.body.email,
                        subject: 'TODO App New Password ',
                        text: 'Hi '+req.body.email+', \n\n Your new passowrd is '+newpassword +'. \n\n\n Best Regards, \n TODO App'
                    };
            
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            res.send("email successfully sent");
                        }
                    })

                })
            }
       
        })
        
    }
}}
