// const asyncHandler = require('../middleware/async');
// const User = require('../models/User');
// const ErrorResponse = require('../utils/errorResponse');

// //@desc get all User
// //@route GET /api/v1/auth/user
// //@access Private/Admin
// exports.getUser = asyncHandler(async(req,res,next)=>{
//     const{name,email,password,role} = req.body;
//     const user =await User.create({name,email,password,role});
//     sendTokenResponse(user,200,res);
// });