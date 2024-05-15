import { API_STATIC_URL } from "../services/apiConfig";
import ReviewModal from "./ReviewModal";
import { useState,useEffect } from "react";
import movieService from "../services/movieServices";
import { useParams } from 'react-router-dom';
import React from 'react';

const Hero = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    console.log("id in hera",id)
    movieService.getMovieById(id)
    .then((data) => {
      console.log("data",data)
        setMovie(data.movie)
        setReviews(data.reviews)
    })
    .catch((error) => {
        console.log(error)
    })
}
, [id])


    return (
      <div className="relative rounded-lg shadow-lg shadow-white bg-dark">
      <div className="hero  min-h-screen bg-base-200">
        <iframe
          title="spiderman"
          src="https://www.youtube.com/embed/JfVOs4VSpmA?autoplay=1"
          frameBorder="0"
          className="rounded-lg"
          height="100%"
          width="100%"
          allowFullScreen
        ></iframe>
      </div>
      <div className="md:absolute bottom-0 right-0 flex  flex-col  shadow-lg bg-white/70 p-4 rounded-lg h-1/2 md:h-full text-black">
        <img
          src={`${movie.photoPath}`}
          className="w-full rounded-lg shadow-2xl h-[300px]"
          alt=""
        />
        <div>
          <h1 className="text-5xl font-bold">{movie.name}</h1>
          <div className="py-6">
            <p>{movie.description}</p>
            <p>Rating : {movie.rating}/10</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById(`${movie._id}`).showModal()}
          >
            User Reviews
          </button>
          <ReviewModal id={movie._id} reviews={reviews} />
        </div>
      </div>
    </div>
    );
    }

export default Hero;