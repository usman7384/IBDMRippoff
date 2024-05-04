import React, { useState } from "react";
import reviewService from "../services/reviewServices";

const UpdateReviewForm = ({reviewID}) => {

    console.log("reviewID",reviewID )
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleStarClick = (starRating) => {
    setRating(starRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    reviewService.updateReview({ description:review, stars:rating }, reviewID);
    setReview("");
    setRating(0);
  };

  return (
    <div className="flex justify-center items-center">
    <dialog  id={reviewID} className="modal bg-black/45 w-11/12 max-w-md h-1/2 rounded-lg">
    <div className="">
      <h2 className="text-3xl font-bold m-4">Update Review</h2>
      <form onSubmit={handleSubmit} className="flex flex-col justify-start space-y-4">
        <textarea
          type="text"
          placeholder="Enter your review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="textarea textarea-info textarea-lg w-full "
        />
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <input
              key={star}
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-green-500" 
              onClick={() => handleStarClick(star)}
            />
          ))}
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
    <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
    </dialog>
    </div>
  );
};

export default UpdateReviewForm;
