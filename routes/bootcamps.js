const express =require('express');
const {getBootcamps,getBootcamp,updateBootcamp,deleteBootcamp,createBootcamp} = require("../controller/bootcamps")
const router = express.Router();

// router.get('/',(req,res)=>{
//     res.status(400).json({success:true,msg:"show all bootcamps"})
// });
// router.get('/:id',(req,res)=>{
//     res.status(400).json({success:true,msg:`Get bootcamp ${req.params.id}`})
// });
// router.post('/',(req,res)=>{
//     res.status(400).json({success:true,msg:"create new bootcamp"})
// });
// router.put('/:id',(req,res)=>{
//     res.status(400).json({success:true,msg:`Update bootcamp ${req.params.id}`})
// });
// router.delete('/:id',(req,res)=>{
//     res.status(400).json({success:true,msg:`Delete bootcamp ${req.params.id}`})
// });
router.route('/').get(getBootcamps).post(createBootcamp);
router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp);
module.exports = router;