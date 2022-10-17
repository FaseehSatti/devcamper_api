const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true,'please add a course title']
    },
    description:{
        type:String,
        required:[true,'please add a description']
    },
    weeks:{
        type:String,
        required:[true,'please add number of weeks']
    },
    tuition:{
        type:Number,
        required:[true,'please add tution cost']
    },
    minimumSkill:{
        type:String,
        required:[true,'please add minimum skill'],
        enum:['beginner','intermediate','advanced']
    },
    scholarshipAvailable:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    bootcamp:{
        type:mongoose.Schema.ObjectId,
        ref:'Bootcamp',
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    }
});
CourseSchema.statics.getAverageCost =async function(bootcampId){
    // console.log("Calculating....");

    const obj = await this.aggregate([
        {
            $match : {bootcamp : bootcampId}
        },
        {
            $group : {
                _id : '$bootcamp',
                averageCost:{$avg : '$tuition'}
            }
        }
    ]);
    // console.log(obj);
    try{
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId,{
            averageCost: Math.ceil(obj[0].averageCost/10)*10
        })
    }catch(err){
        console.log(err)
    }
}
// Call get average cost after save
CourseSchema.post('save',function(){
    this.constructor.getAverageCost(this.bootcamp);
});
// Call get average coet before save
CourseSchema.pre('save',function(){
    this.constructor.getAverageCost(this.bootcamp);
})
module.exports = mongoose.model('Course',CourseSchema);