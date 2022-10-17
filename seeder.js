const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//load env var
dotenv.config({path:'./config/config.env'});
//load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');
const User = require('./models/User');
const Review = require('./models/Review');

mongoose.connect(process.env.MONGO_URI,{
    // useNewUrlParser :true,
    // useCreateIndex: true,
    // useFindAndModify:false
});
//Read json files
 const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'))
 const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`,'utf-8'))
 const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`,'utf-8'))
 const reviews = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`,'utf-8'))

//  IMPORT INTO DB
const importData = async()=>{
    try{
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        await User.create(users);
        await Review.create(reviews);
        console.log("Data Imported...");
        process.exit();
    }catch(err){
        console.log(err);
    }
}

// DELETE DATA DB
const deleteData = async()=>{
    try{
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        console.log("Data Destroyed...");
        process.exit();
    }catch(err){
        console.log(err);
    }
} 

if(process.argv[2] === '-i'){
    importData();
}
else if(process.argv[2]==='-d'){
    deleteData();
}