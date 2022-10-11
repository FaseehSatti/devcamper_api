const mongooes = require('mongoose');
const connectDB = async() =>{
    const conn = await mongooes.connect(process.env.MONGO_URI,{
        // useNewUrlParser :true,
        // useCreateIndex: true,
        // useFindAndModify:false
    });
    console.log(`connected ${conn.connection.host}`);
}
module.exports = connectDB;
