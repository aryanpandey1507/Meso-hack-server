const models = require('../models');
const User =models.users;

const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwt');
const bcrypt = require('bcryptjs');

exports.registerUser=catchAsyncErrors(async(req,res)=>{


    const {name , email , schoolName , password}=req.body;
    console.log(name , email , schoolName , password);
    
    const password_hash=await bcrypt.hash(password,10);
    

        const userExist = await User.findOne({ where:{ email : email}});

        if(userExist)
        {
            res.status(200).json({
                message:"User already exist"
            })
        }

        const user = await User.create({
            name,
            email,
            schoolName,
            password_hash
        });


        sendToken(user,201,res);

      

});

exports.getUsers=catchAsyncErrors(async(req,res)=>{
    

        
        const users = await User.findAll();

        res.status(200).json({
          success:true,
          users
        })
   
})

exports.getUser=catchAsyncErrors(async(req,res)=>{

    
    const id = req.params.id;

        const user=await User.findOne({where :{id}});
        res.status(200).json({
            success:true,
            user
        })
    
})


exports.loginUser=async(req,res)=>{

    const {email , password}=req.body;
     console.log(email , password);

    
    if(!email || !password)
    {
        return res.status(201).json({message:"Please Enter email and password"});
    }

    const user=await User.findOne({where:{email:email}});
    // console.log(user);
    

    if(!user)
    {
        return res.status(201).json({message:"Invalid Email or password"});
    }

    const isPasswordMatched=  await bcrypt.compare(password, user.password_hash);
    // console.log(isPasswordMatched);

    if(!isPasswordMatched)
    {
        return res.status(200).json({message:"Invalid Email or password"});
    }

    sendToken(user,200 , res);

}


exports.logoutUser=catchAsyncErrors( async (req,res)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:"true",
        message:"Logged out"
    })
})
