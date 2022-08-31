const jwt=require('jsonwebtoken');
const dbConfig = require('../config/dbConfig');

const sendToken=(user,statusCode , res)=>{
    const token = jwt.sign({id:this._id},dbConfig.JWT_SECRET,{
        expiresIn:dbConfig.JWT_EXPIRE
    })

    const options = {
        expires:new Date (
            Date.now()+dbConfig.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true
    };

    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token   
    });


}

module.exports=sendToken;