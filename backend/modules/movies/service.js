const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const { tokenTypes } = require("../../config/tokens");
const Movie = require("./model");
const Review = require("../reviews/model");
const User = require("../user/model");
const Token = require("../tokens/model");

const create = async (body,user) => {
  if (await Movie.isNameTaken(body.name)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Movie with this name already exists"
    );
  }
  const movie = await Movie.create(body);

  if(movie){
    user.movies.push(movie._id);
    await user.save();
  }

  return movie;
};

const deleteMovie = async (movieId, user) => {
  const movie = await Movie.findById(movieId);
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, "Movie not found");
  }
  if (!user.movies.map(m => m.toString()).includes(movieId.toString())) {
    throw new ApiError(httpStatus.FORBIDDEN, "You can't delete a movie that is not in your list");
  }

  await User.populate(user, { path: "movies" });
  user.movies = user.movies.filter(m => m._id.toString() !== movieId.toString());

  await user.save();
  await Movie.deleteOne({ _id: movie._id });
  return movie;
}

const getMovies = async (filter, options) => {
  const aggregation = [
    { $match: filter },  
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "movie",
        as: "reviews"
      }
    },
    {
      $addFields: {
        reviewCount: { $size: "$reviews" }
      }
    },
    {
      $sort: { reviewCount: -1 ,_id: 1}
    }
  ];

  const countAggregation = [...aggregation, {
    $count: "total"
  }];

  const totalResults = await Movie.aggregate(countAggregation).then(results => results[0] ? results[0].total : 0);

  if (options.page && options.limit) {
    const skip = (options.page - 1) * options.limit;
    aggregation.push({ $skip: skip });
    aggregation.push({ $limit: options.limit });
  }

  const movies = await Movie.aggregate(aggregation);

  return {
    totalResults,
    movies
  };
};


const getMovieById = async (id) => {
  const movie = await Movie.findOne({ _id: id });
  const reviews = await Review.find({ movie: id });
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, "Movie not found");
  }

  const data = {
    movie,
    reviews
  };
  return data;
}

const getMovieByTitle = async (title) => {
  const movie = await Movie.findOne({ name: title });
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, "Movie not found");
  }
  return movie;
}

const updateMovie = async (movieId, updateBody,user) => {
  const movie = await Movie.findById(movieId);
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, "Movie not found");
  }
  if (!user.movies.includes(movieId)) {
    throw new ApiError(httpStatus.FORBIDDEN, "You can't update a movie that is not in your list");
  }
  Object.assign(movie, updateBody);
  await movie.save();
  return movie;
}

const getMoviesByUser = async (user) => {
  const foundUser = await User.populate(user, { path: "movies" });
  const reviews = await Review.find({ user: user._id });
  const data = user.movies.map(movie => {
    const movieReviews = reviews.filter(review => review.movie.toString() === movie._id.toString());
    return {
      movie,
      reviews: movieReviews
    };
  });
  return data;
}


module.exports = {
  create,
  deleteMovie,
  getMovies,
  getMovieById,
  updateMovie,
  getMovieByTitle,
  getMoviesByUser
};







