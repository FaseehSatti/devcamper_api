const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
//@desc Get all bootcamps
//@route Get /api/v1/bootcamps
//@access Public
exports.getBootcamps = async(req,res,next)=>{
    try{
    const bootcamps = await Bootcamp.find();
    res.status(200).json({success:true,count:bootcamps.length,data:bootcamps})
    }catch(err){
    res.status(400).json({success:false})
    }
}
//@desc Get single bootcamp
//@route Get /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = async(req,res,next)=>{
    try{
        const bootcamp = await Bootcamp.findById(req.params.id); 
        if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`,404));
        }
        res.status(200).json({success:true,data:bootcamp})
    }
    catch(err){
        // res.status(400).json({success:false})
        // next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`,404));
        next(err);
    }
}
//@desc create a bootcamp
//@route Get /api/v1/bootcamps
//@access Private
exports.createBootcamp = async(req,res,next)=>{
    try{
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({success:true,data:bootcamp}) 
    }catch(err){
        res.status(400).json({success:false, msg:err.message}); 
    }

}
//@desc Update bootcamp
//@route Get /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = async(req,res,next)=>{
    try{
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body ,{
            new:true,
            runValidators:true
        });
        if(!bootcamp){
            return res.status(400).json({success:false})
        }
        res.status(200).json({success:true,data:bootcamp}); 
    }catch(err){
        res.status(400).json({success:false}); 
    }
}
//@desc delete bootcamp
//@route Get /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = async(req,res,next)=>{
    try{
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if(!bootcamp){
            return res.status(400).json({success:false})
        }
        res.status(200).json({success:true,data:{}}); 
    }catch(err){
        res.status(400).json({success:false}); 
    }
}