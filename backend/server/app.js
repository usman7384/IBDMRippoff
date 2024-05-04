const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const morgan = require('../config/morgan');
const { jwtStrategy } = require('../config/passport');
const logRequest = require('../middlewares/logRequest');
const { errorConverter, errorHandler } = require('../middlewares/error');
const {  userRoutes } = require('../modules/user/route');
const {  movieRoutes } = require('../modules/movies/route');
const {reviewsRouter} = require('../modules/reviews/route');
const ApiError = require('../utils/ApiError');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const config = require('../config/config');




const app = express();

app.use(session({ secret: config.OAuthSessionSecret, resave: true, saveUninitialized: true , cookie: {
  maxAge: 3600000, // Session expiration time (1 hour)
},}));


// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

app.use(morgan.successHandler);
app.use(morgan.errorHandler);


// set security HTTP headers
app.use(helmet());
//   .contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     imgSrc: ["'self'", "data:", "http://127.0.0.1:8000", "http://localhost:3000"],
//     // Add other directives as needed
//   }
// }));

// parse json request body
app.use(express.json());
app.use(express.urlencoded({extended: true }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));


// sanitize request data
app.use(xss());
app.use(mongoSanitize());


// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// const imageCorsOptions = {
//   origin: '*', // Ideally, this should be restricted to your domain
//   methods: 'GET',
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: false,
//   optionsSuccessStatus: 200
// };
// // // use public folder to serve files
// // // app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
app.use(express.static('public/uploads'));
// app.use('/public/uploads', cors(imageCorsOptions), (req, res, next) => {
//   console.log('Received request for:', req.path);
//   next();
// }, express.static('public/uploads'));

// define routes here
app.get('/', (req, res) => {
  res.send('Welcome to imdb ripp off');
});


app.use('/api/user', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewsRouter);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'API Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
