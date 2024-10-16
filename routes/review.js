const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isAuthor, validateReview} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

// Reviews //
//Post Review Route
router
.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.postReview));

// Delete Review route
router
.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.deleteReview));

module.exports = router;