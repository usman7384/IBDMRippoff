const Joi = require('joi').extend(require('@joi/date'));
const { password, objectId } = require('../../utils/custom.validation');

const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const queryUsers = {
  query: Joi.object().keys({
    isVerified: Joi.boolean(),
    resetPasswordRequest: Joi.boolean(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  register,
  login,
  logout,
  getUser,
  queryUsers,
};
