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
    controller.addNewReview
  )
  .get(validate(validation.getReviews), controller.getReviews);

  router
  .route('/movie')
  .get(validate(validation.getReviewsByMovie), controller.getReviewsByMovie);

  router
  .route('/user')
  .get(auth(),validate(validation.getReviewsByUser), controller.getReviewsByUser);


router
  .route('/:reviewId')
  .get(validate(validation.getReview), controller.getReview)
  .patch(auth(),validate(validation.updateReview), controller.updateReview)
  .delete(auth(), validate(validation.deleteReview), controller.deleteReview);

router
  .route('/user/movie/:movieId')
  .get(auth(),validate(validation.getUserMovieReviews), controller.getUserMovieReviews);





 

  
module.exports = {
  reviewsRouter: router,
};
