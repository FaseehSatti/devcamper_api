const express =require('express');
const {getReviews,getReview} = require("../controller/reviews");
const Review = require('../models/Review');
const router = express.Router({mergeParams:true});
const {protect,authorize} = require('../middleware/auth');
router.route('/').get(getReviews);
router.route('/:id').get(getReview);
module.exports = router;