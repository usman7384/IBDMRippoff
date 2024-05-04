const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const userService = require('./service');
const tokenService = require('../tokens/service');
const pick = require('../../utils/pick');
const User = require('./model');

const register = catchAsync(async (req, res) => {
  const user = await userService.register(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.loginUserWithEmailAndPassword(
    email,
    password
  );
  let tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  const { id } = req.body;
  await userService.logout(id);
  res.status(httpStatus.OK).send({ message: 'User logout' });
});

const queryUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['page', 'limit']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await userService.getUserById(userId);
  res.send(result);
});




module.exports = {
  register,
  login,
  logout,
  getUser,
  queryUsers,
};
