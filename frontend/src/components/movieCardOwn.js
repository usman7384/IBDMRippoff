import { API_STATIC_URL } from "../services/apiConfig";
import ReviewModal from "./ReviewModal";
import { Link } from "react-router-dom";
import movieService from "../services/movieServices";

const OwnMovieCard = ({ movie }) => {

  console.log("movie2",movie)
    const deleteMovie = async (id) => {
        try {
            const response = await movieService.deleteMovie(id)
            console.log("response",response)
            // if (response.status === 204) {
            //     console.log(response.data)
            //     return response.data
            // } else {
            //     throw new Error(`Failed to delete movie. Status: ${response.status}`)
            // }
        } catch (error) {
            throw new Error(`Error deleting movie: ${error.message}`)
        }
    }


    return (
        <div className="w-full md:w-1/2 card card-side bg-base-100 shadow-xl">
  <figure><img src={`${movie.movie.photoPath}`} className="w-[300px] h-[250px]" alt="Movie"/></figure>
  <div className="card-body">
    <Link to={`/movie/${movie.movie._id}`}>
    <h2 className="card-title">{movie.movie.name}</h2>
    </Link>
    <div className="">
      <p >{movie.movie.description}</p>
      <p >Rating : {movie.movie.rating}/10</p>
      </div>
    <div className="card-actions justify-end">
    <button
        className="btn btn-primary" 
        onClick={() => document.getElementById(`${movie.movie._id}`).showModal()}
      >
        Reviews
      </button>
      <button
        className="btn btn-error" 
        onClick={() => deleteMovie(movie.movie._id)}
      >
        Delete
      </button>
      <ReviewModal id={movie.movie._id} reviews={movie.reviews}/>
    </div>
  </div>
</div>

    );
}

export default OwnMovieCard;