const mongoose = require("mongoose");
const { paginate } = require("../../utils/plugins");

const reviewSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    stars: {
      type: Number,
      required: true,
      trim: true,
      min: 1,
      max: 5,
    }, 
    user : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    movie : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },

  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
// userSchema.plugin(toJSON);
reviewSchema.plugin(paginate);


/**
 * @typedef Review
 */
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
