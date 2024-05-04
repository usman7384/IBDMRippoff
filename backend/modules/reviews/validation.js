const Joi = require('joi').extend(require('@joi/date'));
const { query } = require('express');
const { objectId } = require('../../utils/custom.validation');

const add = {
  query: Joi.object().keys({
    movieId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    stars: Joi.number().required().min(1).max(5),
    description: Joi.string().required(),
  }),
};

const deleteReview = {
  params: Joi.object().keys({
    reviewId: Joi.string().custom(objectId),
  }),
};

const getReviews = {
  query: Joi.object().keys({
    movieId: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number(),
    page: Joi.number(),
  }),
};

const getReview = {
  params: Joi.object().keys({
    reviewId: Joi.string().custom(objectId),
  }),
};

const updateReview = {
  params: Joi.object().keys({
    reviewId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      stars: Joi.number().min(1).max(5),
      description: Joi.string(),
    })
    .min(1),
};

const getReviewsByMovie = {
  query: Joi.object().keys({
    movieId: Joi.string().custom(objectId),
  }),
};

const getReviewsByUser = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};


const getUserMovieReviews = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    movieId: Joi.string().custom(objectId),
  }),
};


module.exports = {
  add,
  deleteReview,
  getReviews,
  getReview,
  updateReview,
  getReviewsByMovie,
  getReviewsByUser,
  getUserMovieReviews,
};




