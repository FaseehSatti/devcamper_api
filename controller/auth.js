const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
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
//@desc Get current user loggedin user
//@route post /api/v1/me
//@access Private
exports.getMe = asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        data: user
    })
});
//@desc Forgot Password
//@route post /api/v1/forgotpassword
//@access Private
exports.forgotPassword = asyncHandler(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorResponse(`there is no user with that email`,404))
    }
    const resetToken = user.getResetPasswordToken();
    // console.log(resetToken);
    await user.save({validateBeforeSave:false});
    //create reset url
    const resetUrl = `${req.protocol}://${req.get.host}/api/v1/resetpassword/${resetToken}`;
    const message = `You are receiving this email because you has requested the reset of password please make a put req to : \n\n ${resetUrl}`; 
    try{
        await sendEmail({
            email:user.email,
            subject:'passwordresettoken',
            message
        });
        res.status(200).json({success:true,data:'Email Sent'});
    }catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorResponse("email not sent",500));
    }
    res.status(200).json({
        success:true,
        data: user
    })
});
//@desc PUT Reset password
//@route post /api/resetpassword
//@access Public
exports.resetPassword = asyncHandler(async(req,res,next)=>{

    // get Hashed Token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

    const user = await user.findOne({
        resetPasswordToken,
        resetPasswordExpire  
    });
    if(!user){
        return next(new ErrorResponse('invalid token',400))
    }
     ///  set new password
     user.password = req.body.password;
     user.resetPasswordToken = undefined;
     user.resetPasswordExpire = undefined;
     await user.save();
     sendTokenResponse(user,200,res);
});
//@desc Get clogout clear cookie
//@route post /api/v1/me
//@access Private
exports.logout = asyncHandler(async(req,res,next)=>{
    res.cookie('token','none',{
        expires:new Date(Date.now()+10*1000),
        http:true
        });
    res.status(200).json({
        success:true,
        data: {}
    })
});