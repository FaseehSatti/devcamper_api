const mongooes = require('mongoose');
const slugify = require('slugify');
const BootcampSchema =new mongooes.Schema({
    name:{
        type:String,
        required:[true,'please add a name'],
        unique:true,
        trim:true,
        maxlength:[50,'name cannot be more than 50 characters']
    },
    slug:String,
    description:{
        type:String,
        required:[true,'please add description'],
        maxlength:[500,'description cannot be more than 500 characters']
    },
    website:{
        type:String,
        match:[/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,'please add a valid url with http or https']
    },
    phone:{
        type:String,
        maxlength:[20,'description cannot be more than 20 characters']
    },
    email:{
        type:String,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please add a valid email']
    },
    address:{
        type:String,
        required:[true,'please add address']
    },
    // location:{
    //     type:String,
    //     enum:['Point'],
    //     required:true
    // },
    // coordinates:{
    //     type:[Number],
    //     required:true,
    //     index:'2dsphere'
    // },
    // formattedAddress:String,
    // street:String,
    // city:String,
    // state:String,
    // zipcode:String,
    // country:String,
    careers:{
        type:[String],
        required:true,
        enum:[
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other'
        ]
    },
    averageRating:{
        type:Number,
        min:[1,"Rating must be atleast 1"],
        max:[10,"Rating cannot be more than 10"]
    },
    averageCost:Number,
    photo:{
        type:String,
        default:'no-photo.jpg'
    },
    housing:{
        type:Boolean,
        default:false
    },
    jobAssistance:{
        type:Boolean,
        default:false
    },
    jobGuarantee:{
        type:Boolean,
        default:false
    },
    acceptGi:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    user:{
        type:mongooes.Schema.ObjectId,
        ref:'User',
        required: true
    }
},
// {
//     toJSON:{virtuals:true},
//     toObject:{virtuals:true}
// }
);
BootcampSchema.pre('save' , function(next){
    // console.log('slugify ran',this.name);
    this.slug = slugify(this.name,{lower:true})
    next();
});
/////////////////
// BootcampSchema.pre('remove',async function (next){
//     console.log(`Courses are removed from bootcamp ${this._id}`);
//     await this.model('Course').deleteMany({bootcamp:this._id});
//     next();
// })
/////////////////
BootcampSchema.virtual('courses',{
    ref:'Course',
    localField:'_id',
    foreignField:'bootcamp',
    justOne: false
})
module.exports = mongooes.model('Bootcamp',BootcampSchema);