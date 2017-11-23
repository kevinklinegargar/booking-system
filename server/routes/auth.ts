
import { Request, Response, Router } from "express";
var md5 = require('md5');


const loginRouter: Router = Router();


loginRouter.post('/login',(req:any,res:any)=>{
    //check if the password match then set the session
    let password = req.body.password;
    let singlePasswordHash = "dfa9fb3a21a1d2c013a7f1e544c312ee";
    if( singlePasswordHash == md5(password)){
        req.session.auth = true;
        res.json({
            success:true
        });
    }else{
        res.json({
            success:false
        });
    }
   


});
loginRouter.get('/check',(req:any,res:any)=>{
    //Check if currently login
    if(req.session.auth == true){
        res.json({
            success:true
        })
    }else{
        res.json({
            success:false
        });
    }
    
});
loginRouter.post('/logout',(req:any,res:any)=>{
    //Clear auth session
    req.session.auth = false;
    res.json({
        success:true
    });

    
});


export { loginRouter };