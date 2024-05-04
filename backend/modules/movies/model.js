const mongoose = require("mongoose");
const { paginate } = require("../../utils/plugins");
const config = require("../../config/config");
const Review = require("../reviews/model");

const movieSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    genere: {
      type: String,
      required: true,
      trim: true,
    },
    rating : {
      type: Number,
      required: true,
      trim: true,
      min: 1,
      max: 10,
    },
    photoPath: {
      type: String,
      required: false,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
       
  },
  {
    timestamps: true,
  },
  {
    toJSON: {
      transform(doc, ret) {
        if (ret.photoPath) {
          ret.photoPath = config.rootPath + ret.photoPath;
        }
      },
    },
  }
);

// add plugin that converts mongoose to json
// userSchema.plugin(toJSON);
movieSchema.plugin(paginate);

movieSchema.statics.isNameTaken = async function (name) {
  const movie = await this.findOne({ name });
  return !!movie;
};

/**
 * @typedef Movie
 */
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
