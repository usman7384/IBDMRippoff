import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import reviewService from "../services/reviewServices";
import UpdateReviewForm from "./UpdateReview";
import Notification from "./Notification";

const UserMovieReviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null); 
  const [errorCount, setErrorCount] = useState(0); 
  const [success, setSuccess] = useState(null); 
  const [successCount, setSuccessCount] = useState(0); 

  useEffect(() => {
    reviewService
      .UserMovieReviews(id)
      .then((data) => {
        console.log("usermovie", data);
        setReviews(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const deleteReview = async (id) => {
    try {
      const response = await reviewService.deleteReview(id);
      const newReviews = reviews.filter((review) => review._id !== id);
      setReviews(newReviews);
      console.log("response", response);
      setSuccess("Deletion Successful")
      setSuccessCount(prevCount => prevCount + 1)

    } catch (error) {
    setError(`Deletion Failed ${error.message}`); 
      setErrorCount(prevCount => prevCount + 1); 
    }
  };


  return (
    <div className="">
         {error && <Notification key={errorCount} message={error} type="error" />} 
    {success && <Notification key={successCount} message={success} type="success" />} 
      {reviews.length === 0 ? (
        <h2 className="text-xl font-bold m-4">Post A Review Below</h2>
      ) : (
        <h2 className="text-3xl font-bold m-4">Your Reviews</h2>
      )}

      <ul>
        {reviews?.map((review) => {
          return (
            <div className="flex flex-row justify-between">
              <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-primary">
                  {review.description}
                </div>
              </div>
              <div className="flex flex-row justify-end space-x-4">
                <div className="rating">
                  {Array.from({ length: review.stars }, (_, index) => {
                    return (
                      <input
                        type="radio"
                        name="rating-4"
                        className="mask mask-star-2 bg-green-500"
                        readOnly
                        disabled
                      />
                    );
                  })}
                </div>
                <div className="flex flex-row">
                    <UpdateReviewForm reviewID={review._id}/>
                  <div className="lg:tooltip" data-tip="Delete Review">
                    <button
                      className="btn btn-circle btn-outline"
                      onClick={() => deleteReview(review._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="lg:tooltip" data-tip="Edit Review">
                    <button
                      className="btn btn-circle btn-outline"
                      onClick={() => document.getElementById(`${review._id}`).showModal()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v12m-6-6h12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default UserMovieReviews;
