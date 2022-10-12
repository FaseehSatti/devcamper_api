const express =require('express');
const courseRouter = require('./courses');
const {getBootcamps,getBootcamp,updateBootcamp,deleteBootcamp,createBootcamp,bootcampPhotoUpload} = require("../controller/bootcamps")
const router = express.Router();

router.use('/:bootcampId/courses',courseRouter);
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
router.route('/photo/:id').put(bootcampPhotoUpload);
module.exports = router;