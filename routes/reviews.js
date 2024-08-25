const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { reviewSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review.js");
const Campground = require("../models/campground.js");
const { validateReview, isAuthorOfReview, isLoggedIn } = require("../middleware.js");
const reviews = require("../controllers/reviews.js");


router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete("/:reviewId", isLoggedIn, isAuthorOfReview, catchAsync(reviews.deleteReview));

module.exports = router;