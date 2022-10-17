const express =require('express');
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');
const {getBootcamps,getBootcamp,updateBootcamp,deleteBootcamp,createBootcamp,bootcampPhotoUpload} = require("../controller/bootcamps")
const router = express.Router();
const {protect,authorize} = require('../middleware/auth');

router.use('/:bootcampId/courses',courseRouter);
router.use('/:bootcampId/reviews',reviewRouter);
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
router.route('/').get(getBootcamps).post(protect ,authorize('publisher','admin'), createBootcamp);
router.route('/:id').get(getBootcamp).put(protect ,authorize('publisher','admin'),updateBootcamp).delete(protect ,authorize('publisher','admin'),deleteBootcamp);
router.route('/photo/:id').put(protect ,authorize('publisher','admin'), bootcampPhotoUpload);
module.exports = router;