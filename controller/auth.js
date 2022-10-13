const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
//@desc Register User
//@route POST/api/v1/auth/register
//@access Public
exports.register = asyncHandler(async(req,res,next)=>{
    const{name,email,password,role} = req.body;
    const user =await User.create({name,email,password,role});
    //create token
    sendTokenResponse(user,200,res);
    // const token = user.getSignedJwtToken();
    // res.status(200).json({success:true,msg:"please register",token:token});
});
//@desc Register User
//@route Login/api/v1/auth/register
//@access Public
exports.login = asyncHandler(async(req,res,next)=>{
    const{email,password} = req.body;
    if(!email || !password){
        return next(new ErrorResponse("Please provide email and paswword",400));
    }
    const user = await User.findOne({email}).select('+password');
    // console.log(user); 
    if(!user){
        return next(new ErrorResponse("Invalid credentials",401));
    }
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return next(new ErrorResponse("Invalid credentials",401));
    }
    //create token
    sendTokenResponse(user,200,res);
    // const token = user.getSignedJwtToken();
    // res.status(200).json({success:true,msg:"please register",token:token});
});

//get cookie from model, create cookie and send response
const sendTokenResponse = (user,statusCode,res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires : new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true
    }
    if(process.env.NODE_ENV === 'production'){
        options.secure = true;
    }
    res.status(statusCode).cookie('token',token,options).json({success:true,token});
}