const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../../config/config');
const userService = require('../user/service');
const Token = require('./model');
const { tokenTypes } = require('../../config/tokens');
const { v4: uuidv4 } = require('uuid');
var ObjectId = require('mongoose').Types.ObjectId;
/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type, email) => {
  const uuid = uuidv4();
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    uid: uuid,
    email,
  });
  return tokenDoc;
};
/**
 *
 * @param {*} id
 * @returns
 */
const checkForces = async (id) => {
  const found = await Token.find({ uid: id.ud });
  return found;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user, forced) => {
  let accessTokenExpires;
  let refreshTokenExpires;
  if (forced === 'APP') {
    accessTokenExpires = moment().add(1, 'years');
    refreshTokenExpires = moment().add(1, 'years');
  } else {
    accessTokenExpires = moment().add(
      config.jwt.accessExpirationMinutes,
      'minutes'
    );
    refreshTokenExpires = moment().add(
      config.jwt.refreshExpirationDays,
      'hours'
    );
  }
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  let new_token = await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH,
    user.email
  );
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires,
      uuid: new_token.uid,
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires,
      uuid: new_token.uid,
    },
  };
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  checkForces,
};
