const express = require('express');
const controller = require('./controller');
const validation = require('./validation');
const validate = require('../../middlewares/validate');
const { fileUpload } = require('../../utils/fileUpload');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(),
    validate(validation.add),
    controller.addNewMovie
  )
  .get(validate(validation.getMovies), controller.getMovies);

  router
  .route('/user')
  .get(auth(), validate(validation.getMoviesByUser),controller.getMoviesByUser);


  router
  .route('/search')
  .get(validate(validation.searchMovieByTitle), controller.searchMovieByTitle);

  
router
  .route('/:movieId')
  .get(validate(validation.getMovie), controller.getMovie)
  .patch(auth(), validate(validation.updateMovie), controller.updateMovie)
  .delete(auth(), validate(validation.deleteMovie), controller.deleteMovie);


 

  
module.exports = {
  movieRoutes: router,
};
