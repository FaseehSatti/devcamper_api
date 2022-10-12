const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
//@desc Get all bootcamps
//@route Get /api/v1/bootcamps
//@access Public
///////////////////
// exports.getBootcamps =  async(req,res,next)=>{
//     try{
//     const bootcamps = await Bootcamp.find();
//     res.status(200).json({success:true,count:bootcamps.length,data:bootcamps})
//     }catch(err){
//     next(err);
//     }
// }
/////////////////////
exports.getBootcamps = asyncHandler( async(req,res,next)=>{
    const bootcamps = await Bootcamp.find().populate('courses');
    res.status(200).json({success:true,count:bootcamps.length,data:bootcamps})
});
//@desc Get single bootcamp
//@route Get /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = asyncHandler(async(req,res,next)=>{
    /////////////////
    // try{
    //     const bootcamp = await Bootcamp.findById(req.params.id); 
    //     if(!bootcamp){
    //     return next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`,404));
    //     }
    //     res.status(200).json({success:true,data:bootcamp})
    // }
    // catch(err){
    //     // res.status(400).json({success:false})
    //     // next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`,404));
    //     next(err);
    // }
    /////////////////
        const bootcamp = await Bootcamp.findById(req.params.id); 
        if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`,404));
        }
        res.status(200).json({success:true,data:bootcamp})
        // res.status(400).json({success:false})
        // next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`,404));
});
//@desc create a bootcamp
//@route Get /api/v1/bootcamps
//@access Private
exports.createBootcamp =asyncHandler(async(req,res,next)=>{
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({success:true,data:bootcamp}) 

});
//@desc Update bootcamp
//@route Get /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp =asyncHandler( async(req,res,next)=>{
    // try{
    //     const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body ,{
    //         new:true,
    //         runValidators:true
    //     });
    //     if(!bootcamp){
    //         return next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`,404));
    //     }
    //     res.status(200).json({success:true,data:bootcamp}); 
    // }catch(err){
    //     next(err); 
    // }
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body ,{
            new:true,
            runValidators:true
        });
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`,404));
        }
        res.status(200).json({success:true,data:bootcamp}); 
});
//@desc delete bootcamp
//@route Get /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp =asyncHandler(async(req,res,next)=>{
    // try{
    //     const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    //     if(!bootcamp){
    //         return next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`,404)); 
    //     }
    //     res.status(200).json({success:true,data:{}}); 
    // }catch(err){
    //     next(err); 
    // }
        // const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`,404)); 
        }
        res.status(200).json({success:true,data:{}}); 
        // bootcamp.remove();
});

//@desc upload bootcamp
//@route PUT /api/v1/bootcamps/:id/photo
//@access Private
exports.bootcampPhotoUpload =asyncHandler(async(req,res,next)=>{
    console.log(req.files);

        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`,404)); 
        }
        if(!req.files){
            return next(new ErrorResponse("please upload the file",400));
        }
        console.log(req.files);
});
