const Joi = require('joi').extend(require('@joi/date'));
const { objectId } = require('../../utils/custom.validation');

const add = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    genere: Joi.string().required(),
    rating: Joi.number().required().min(1).max(10),
    photoPath: Joi.string().optional(),
    description: Joi.string().required(),
  }),
};

const deleteMovie = {
  params: Joi.object().keys({
    movieId: Joi.string().custom(objectId),
  }),
};

const getMovies = {
  query: Joi.object().keys({
    name: Joi.string(),
    genere: Joi.string(),
    rating: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number(),
    page: Joi.number(),
  }),
};

const getMoviesByUser = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number(),
    page: Joi.number(),
  }),
};


const getMovie = {
  params: Joi.object().keys({
    movieId: Joi.string().custom(objectId),
  }),
};

const updateMovie = {
  params: Joi.object().keys({
    movieId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      genere: Joi.string(),
      rating: Joi.number(),
      photoPath: Joi.string(),
      description: Joi.string(),
    })
    .min(1),
};

const searchMovieByTitle = {
  query: Joi.object().keys({
    title: Joi.string().required(),
  }),
};


module.exports = {
  add,
  deleteMovie,
  getMovies,
  getMovie,
  updateMovie,
  searchMovieByTitle,
  getMoviesByUser,
};
