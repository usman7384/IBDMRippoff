const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const movieService = require('./service');
const tokenService = require('../tokens/service');
const pick = require('../../utils/pick');
const Movie = require('./model');


const addNewMovie = catchAsync(async (req, res) => {
  let createBody = req.body;
  if(req.files && req.files[0]){
    createBody.photoPath = req.files[0].filename;}
  const movie = await movieService.create(req.body, req.user);
  res.status(httpStatus.CREATED).send(movie);
}
);

const deleteMovie = catchAsync(async (req, res) => {
  const movie=await movieService.deleteMovie(req.params.movieId, req.user);  
  res.status(httpStatus.NO_CONTENT).send(movie);
}
);


const getMovies = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'genere', 'rating']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await movieService.getMovies(filter, options);
  res.send(result);
}
);

const getMovie = catchAsync(async (req, res) => {
  const movie = await movieService.getMovieById(req.params.movieId);
  res.send(movie);
}
);

const searchMovieByTitle = catchAsync(async (req, res) => {
  const movie = await movieService.getMovieByTitle(req.query.title);
  res.send(movie);
}
);

const updateMovie = catchAsync(async (req, res) => {
  let createBody = req.body;
  if(req.files && req.files[0]){
    createBody.photoPath = req.files[0].filename;}
  const movie = await movieService.updateMovie(req.params.movieId, req.body, req.user);
  res.send(movie);
}
);

const getMoviesByUser = catchAsync(async (req, res) => {
  const result = await movieService.getMoviesByUser(req.user);
  res.send(result);
}
);

module.exports = {
  addNewMovie,
  deleteMovie,
  getMovies,
  getMovie,
  updateMovie,
  searchMovieByTitle,
  getMoviesByUser
};



