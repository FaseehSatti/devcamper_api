const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add a name']
    },
    email:{
        type:String,
        required:[true,'please add an email'],
        unique:true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please add a valid email']
    },
    role:{
        type:String,
        enum:['user','publisher'],
        default:'user'
    },
    password:{
        type:String,
        required:[true,'please add a password'],
        minlength:6,
        select:false
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    date:{
        type:Date,
        default:Date.now
    }
});

// Encrypt password using bcrypt
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})


// sign jwt and return
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id:this._id} , process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRE
    });
};
//match user enterd pass to hash pass in the database
UserSchema.methods.matchPassword = async function(enteredPassword){
    // console.log(enteredPassword);
    // console.log(this.password);
    return await bcrypt.compare(enteredPassword,this.password);
}
//generate and hash password token
UserSchema.methods.getResetPasswordToken = function(){
    //generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //hash token and set to resettokenfield
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    //set expire
    this.resetPasswordExpire = Date.now()+10*60*1000;
    return resetToken;
}
module.exports = mongoose.model('User',UserSchema);