const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const { tokenTypes } = require("../../config/tokens");
const Movie = require("./model");
const User = require("../user/model");
const Review = require("../reviews/model");
const Token = require("../tokens/model");

const create = async (body,user,movieId) => {
  body.user = user._id;
  body.movie = movieId;

  const review = await Review.create(body);
  return review;
};

const deleteReview = async (reviewId, user) => {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review not found");
  }
  if (review.user.toString() !== user._id.toString()) {
    throw new ApiError(httpStatus.FORBIDDEN, "You can't delete a review that is not yours");
  }
  await Review.deleteOne({ _id: review._id });
  return review;
}


const getReviews = async (filter, options) => {
  return await Review.paginate(filter, options);
};

const getReviewById = async (id) => {
  const review = await Review.findOne({ _id: id });
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review not found");
  }
  return review;
}

const updateReview = async (id, body, user) => {
  const review = await Review.findOne({
    _id: id
  });
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review not found");
  }
  if (review.user.toString() !== user._id.toString()) {
   throw new ApiError(httpStatus.FORBIDDEN, "You can't update a review that is not yours");
  }

  Object.assign(review, body);
  await review.save();
  return review;
}

const getReviewsByMovie = async (movieId, filter, options) => {
  const query = { movie: movieId, ...filter };

  const reviews = await Review.paginate(query, options);

  if (!reviews) {
    throw new ApiError(httpStatus.NOT_FOUND, "Reviews not found");
  }

  return reviews;
}


const getReviewsByUser = async (userId) => {
  const reviews = await Review.find({ user: userId });
  if (!reviews) {
    throw new ApiError(httpStatus.NOT_FOUND, "Reviews not found");
  }
  return reviews;
}


const getUserMovieReviews = async (userId, movieId) => {
  const reviews = await Review.find({ user: userId, movie: movieId });
  if (!reviews) {
    throw new ApiError(httpStatus.NOT_FOUND, "Reviews not found");
  }
  return reviews;
}


module.exports = {
  create,
  deleteReview,
  getReviews,
  getReviewById,
  updateReview,
  getReviewsByMovie,
  getReviewsByUser,
  getUserMovieReviews
};






