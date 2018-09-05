const dashboard = require('../models/dashboard');


module.exports =   (req, res) => {
    return {
        loadData: (req, res) => {
            console.log("I am in loadData")
            _email=req.body.email;
            console.log("quered email is "+_email)
            dashboard.find({email:_email}, (err, data) => {
                console.log(JSON.stringify(data))
                if (err) {
                    res.status('400').send(err);
                } else {
                    res.send(data);
                }
            })
        },
        deleteData: (req, res) => {
            console.log("I am in deleteData")

            dashboard.remove({_id:req.body.id}, (err, data) => {
                if (err) {
                    console.log("failure")
                    res.status('400').send(err);
                } else {
                    console.log("success")
                    res.send(data);
                }
            })
        },
        add: (req, res) => {
            console.log("I am in add $$$$$$$^^^^^^^^^*************")

            dashboard.create(req.body, (err, data) => {
                if (err) {
                    console.log("failure")
                    res.status('400').send(err);
                } else {
                    console.log("success")
                    res.send(data);
                }
            })
        },
        update: (req, res) => {
            console.log("I am in update"+ JSON.stringify(req.body))

            var data = req.body.update
            // dashboard.findOneAndUpdate({"fname":req.body.update.fname},{$rename:{"fname":req.body.update.fname,"lname":req.body.update.lname,"address":req.body.update.address,"state":req.body.update.state,"mobile":req.body.update.mobile}},{multi:true}, (err, data) => {
                //dashboard.update({fname:req.body.update.fname},{fname:req.body.update.fname,lname:req.body.update.lname,address:req.body.update.address,state:req.body.update.state,mobile:req.body.update.mobile}, (err, data) => {
                id=req.body._id;
                ufname=req.body.fname;
                ulname=req.body.lname;
                uaddress=req.body.address;
                ustate=req.body.state;
                umobile=req.body.mobile;  
                console.log(ufname+" "+ulname+" "+uaddress+" "+ustate+" "+umobile) 
                
                dashboard.updateOne({_id:id},{  $set: {fname:ufname,lname:ulname,address:uaddress,state:ustate,mobile:umobile}},{multi:true}, (err, data) => {
                    if (err) {
                    console.log("failure")
                    res.status('400').send(err);
                } else {
                    console.log("success")
                    console.log(data)
                    res.send(data);
                }
            })
        },
        
        edit: (req, res) => {
            console.log(req.body.id)
            console.log(typeof req.body.id)
           dashboard.findById({_id:req.body.id},(err, data)=>{
            if (err) {
                console.log("failure")
                res.status('400').send(err);
            } else {
                console.log("success")
                console.log(data)
                res.send(data);
            }
           })
            
        }
    }
}
