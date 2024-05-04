const express = require('express');
const controller = require('./controller');
const validation = require('./validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { fileUpload } = require('../../utils/fileUpload');

const router = express.Router();

router
  .route('/')
  .post(
    validate(validation.register),
    controller.register
  )
  .get(validate(validation.queryUsers), controller.queryUsers);

router.route('/login').post(validate(validation.login), controller.login);
router.route('/logout').post(validate(validation.logout), controller.logout);

router
  .route('/users/:userId')
  .get(auth(), validate(validation.getUser), controller.getUser)

  
module.exports = {
  userRoutes: router,
};
