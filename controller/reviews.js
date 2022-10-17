const asyncHandler = require('../middleware/async');
const Review = require('../models/Review'); 
const ErrorResponse = require('../utils/errorResponse');

//@desc Get reviews
//@route Get /api/v1/reviews
//@route Get /api/v1/bootcamps/:bootcampId/reviews
//@access Public
exports.getReviews = asyncHandler(async(req,res,next)=>{
    // if(req.params.bootcampId){
        const reviews = await Review.find();
    // }
    res.status(200).json({success:true,count:reviews.length,data:reviews})
});
//@desc Get Single reviews
//@route Get /api/v1/reviews/:id
//@route Get /api/v1/bootcamps/:bootcampId/reviews
//@access Public
exports.getReview = asyncHandler(async(req,res,next)=>{
    // if(req.params.bootcampId){
        const review = await Review.findById(req.params.id).populate({
            path:'bootcamp',
            select:'name description'
        });
        if(!review){
            return next(new ErrorResponse(`No reviewfound with id of ${req.params.id}`,404));
        }
        res.stauts(200).json({success:true,data:review});
    // }
    res.status(200).json({success:true,count:reviews.length,data:reviews})
});