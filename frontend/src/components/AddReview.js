import React, { useState } from "react";
import reviewService from "../services/reviewServices";
import { useParams } from 'react-router-dom';
import Notification from "./Notification";

const ReviewForm = () => {
    const { id } = useParams();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null); 
  const [errorCount, setErrorCount] = useState(0); 
  const [success, setSuccess] = useState(null); 
  const [successCount, setSuccessCount] = useState(0); 

  const handleStarClick = (starRating) => {
    setRating(starRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const response= await reviewService.addReview({ description:review, stars:rating }, id);
    setReview("");
    setRating(0);
    setSuccess("Review Added")
    setSuccessCount(prevCount => prevCount + 1)
    }catch(error){
      setError(`Failed Adding Review : ${error.message}`); 
      setErrorCount(prevCount => prevCount + 1); 
    }
  };

  return (
    <div className="">
        {error && <Notification key={errorCount} message={error} type="error" />} 
    {success && <Notification key={successCount} message={success} type="success" />} 
      <h2 className="text-3xl font-bold m-4">Add Another Review</h2>
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
  );
};

export default ReviewForm;
