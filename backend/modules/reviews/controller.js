const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const reviewService = require('./service');
const tokenService = require('../tokens/service');
const pick = require('../../utils/pick');
const Movie = require('./model');


const addNewReview = catchAsync(async (req, res) => {
  const review = await reviewService.create(req.body, req.user,req.query.movieId);
  res.status(httpStatus.CREATED).send(review);
}
);

const deleteReview = catchAsync(async (req, res) => {
  const review=await reviewService.deleteReview(req.params.reviewId, req.user);  
  res.status(httpStatus.NO_CONTENT).send(review);
}
);

const getReviews = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['movie']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await reviewService.getReviews(filter, options);
  res.send(result);
}
);

const getReview = catchAsync(async (req, res) => {
  const review = await reviewService.getReviewById(req.params.reviewId);
  res.send(review);
}
);

const updateReview = catchAsync(async (req, res) => {
  const review = await reviewService.updateReview(req.params.reviewId, req.body, req.user);
  res.send(review);
}
);

const getReviewsByMovie = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['movie']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const reviews = await reviewService.getReviewsByMovie(req.query.movieId, filter, options);
  res.send(reviews);
}
);

const getReviewsByUser = catchAsync(async (req, res) => {
  const reviews = await reviewService.getReviewsByUser(req.user._id);
  res.send(reviews);
}
);

const getUserMovieReviews = catchAsync(async (req, res) => {
  const reviews = await reviewService.getUserMovieReviews(req.user._id,req.params.movieId);
  res.send(reviews);
}
);



module.exports = {
  addNewReview,
  deleteReview,
  getReviews,
  getReview,
  updateReview,
  getReviewsByMovie,
  getReviewsByUser,
  getUserMovieReviews
};


