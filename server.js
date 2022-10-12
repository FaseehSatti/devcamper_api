const express = require('express');
const dotenv = require('dotenv');
const bootcamps = require('./routes/bootcamps');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const connectDB =require('./config/db');
const errorHandler = require('./middleware/error');
const courses = require('./routes/courses');
const fileUpload = require('express-fileupload');
// load env file
dotenv.config({path: './config/config.env'}); 

connectDB();
const app =express();
//body parser
app.use(express.json());
// Morgan
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
//file uploading
app.use(fileUpload());
// app.use(logger);
// Mount routes
app.use('/api/v1/bootcamps',bootcamps);
app.use('/api/v1/courses',courses);
app.use(errorHandler);



const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`));
process.on("unhandledRejection",(err,promise)=>{
    console.log(`Error: ${err.message}`);
    server.close(()=>process.exit(1));
});