import { useState,useEffect } from "react";
import movieService from "../services/movieServices";
import OwnMovieCard from "../components/movieCardOwn";
const UserMovies = () => {
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {

    movieService.getMoviesByUser()
    .then((data) => {
      console.log("data new",data)
        setMovies(data)
        // setReviews(data.reviews)
    })
    .catch((error) => {
        console.log(error)
    })
}
, [])


    return (
      <div className="m-8 md:m-16">
                <section className="text-center md:text-left">
        <h2 className="text-3xl font-bold m-4">All User Movies</h2>

        <div className="grid grid-cols-1 gap-4 ">
        {movies?.map((movie) => {
            console.log("movie",movie)
            return <OwnMovieCard key={movie.id} movie={movie} />
        })}
                    </div>
        </section>
</div>
    );
    }

export default UserMovies;