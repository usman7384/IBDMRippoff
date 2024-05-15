import { API_STATIC_URL } from "../services/apiConfig";
import ReviewModal from "./ReviewModal";
import { Link } from "react-router-dom";
import React from 'react';

const MovieCard = ({ movie }) => {
    return (
        <div className="w-full md:w-1/2 card card-side bg-base-100 shadow-xl">
  <figure><img src={`${movie.photoPath}`} className="w-[300px] h-[250px]" alt="Movie"/></figure>
  <div className="card-body">
    <Link to={`/movie/${movie._id}`}>
    <h2 className="card-title">{movie.name}</h2>
    </Link>
    <div className="">
      <p >{movie.description}</p>
      <p >Rating : {movie.rating}/10</p>
      </div>
    <div className="card-actions justify-end">
    <button
        className="btn btn-primary" 
        onClick={() => document.getElementById(`${movie._id}`).showModal()}
      >
        Reviews
      </button>
      <ReviewModal id={movie._id} reviews={movie.reviews}/>
    </div>
  </div>
</div>

    );
}

export default MovieCard;