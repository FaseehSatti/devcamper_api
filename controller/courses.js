const asyncHandler = require('../middleware/async');
const course = require('../models/course'); 
const ErrorResponse = require('../utils/errorResponse');
//@desc Get all courses
//@route Get /api/v1/courses
//@route Get /api/v1/bootcamps/bootcampId/courses
//@access Public
exports.getCourses = asyncHandler(async(req,res,next)=>{
    
})