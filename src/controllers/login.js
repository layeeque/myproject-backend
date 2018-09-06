const loginService = require('../services/login');
const dashboardService = require('../services/dashboard');
const tokenval = require('../services/tokenvalidation')

const jwt = require('jsonwebtoken');

module.exports = (app) => {
    app.post('/login', (req, res) => {

        loginService().login(req, res);
    });
    app.post('/signUp', (req, res) => {
        console.log("in sign up ctrl")
        loginService().signUp(req, res);
    });
    app.post('/changePassword', (req, res) => {
        console.log("in change password ctrl")
        loginService().changePassword(req, res);
    });
    app.post('/loadData', tokenval, (req, res) => {
        dashboardService().loadData(req, res);

    })
    app.post('/deleteData',tokenval, (req, res) => {
        dashboardService().deleteData(req, res);
    })
    app.post('/add',tokenval, (req, res) => {
        dashboardService().add(req, res);
    })
    app.post('/update',tokenval, (req, res) => {
        dashboardService().update(req, res);
    })
    app.post('/edit',tokenval, (req, res) => {
        dashboardService().edit(req, res);
    })
    app.post('/social', (req, res) => {
        loginService().social(req, res);
    })

}


// function tokenval(req, res, next) {
//     console.log("I am in token val function $$ " + req.body.token)
//     if(req.body.token == undefined ||req.body.token == "")
//     {
//         res.send({
//             'success': '0',
//             'message': 'forbidden / Anauthorised access' 
//         })
//     }
//     else{
//         jwt.verify(req.body.token, 'secretkey', (err, authData) => {
//             if (err) {
//                 console.log("err "+ err)
//                 res.sendStatus(403);
//             } else {
//                 console.log("auth data "+ JSON.stringify(authData))
//                 next()
//             }
//         })
//     }  
// }


