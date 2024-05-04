const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const { tokenTypes } = require("../../config/tokens");
const User = require("./model");
const Token = require("../tokens/model");

const register = async (body) => {
  if (await User.isEmailTaken(body.email)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User with this email already exists"
    );
  }
  const user = await User.create(body);
  return user;
};

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await getUser({ email });
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

const getUser = async (filter) => {
  return await User.findOne(filter);
};

const logout = async (id) => {
  const refreshTokenDoc = await Token.findOne({
    user: id,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    await systemConfigService.updateActiveSessionCount(-1);
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  await refreshTokenDoc.remove();
};

const getUserById = async (id) => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

const queryUsers = async (filter, options) => {
  return await User.paginate(filter, options);
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  getUserById,
  queryUsers,
  register,
};
