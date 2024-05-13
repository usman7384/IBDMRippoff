import MovieCard from "../components/movieCard";
import TopRated from "../components/TopRated";
import React from "react";
import movieService from "../services/movieServices";
import { useEffect } from "react";
const Home = () => {
  const [movies, setMovies] = React.useState([]);
  const [topRated, setTopRated] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [moviesPerPage, setMoviesPerPage] = React.useState(5);
  const [totalMovies, setTotalMovies] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);


  const onNext = () => {
    if(currentPage < totalPages) setCurrentPage(currentPage + 1);
    console.log("currentPage",currentPage)
    };

    const onPrevious = () => {
    if(currentPage > 1) setCurrentPage(currentPage - 1);
    console.log("currentPage",currentPage)

    };




  useEffect(() => {
    movieService
      .getAllMovies(currentPage, moviesPerPage)
      .then((data) => {
        setMovies(data.movies);
        setFilteredMovies(data.movies);
        if(topRated?.length===0) setTopRated(data.movies[0]);
        setTotalMovies(data.totalResults);
        setTotalPages(totalMovies/moviesPerPage);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage,moviesPerPage,totalMovies,topRated]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const filtered = movies.filter((movie) => {
      return movie.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredMovies(filtered);
  };

  return (
    <div className="m-8 md:m-16">
      <section className="min-h-screen bg-base-200">
        <TopRated movie={topRated} />
      </section>
      <section className="text-center md:text-left">
        {(movies && movies.length === 0) ? <div><h2 className="text-3xl font-bold m-4">No Movies Found</h2></div>
        :
        <div>        <h2 className="text-3xl font-bold m-4">All Movies</h2>

        <div className="my-4 md:my-16 w-full">
          <form onSubmit={handleFormSubmit}>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="w-full"
                placeholder="Search Movie By Title"
                name="search"
                value={search}
                onChange={handleInputChange}
              />
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </label>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-8 ">
          {filteredMovies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>

        <div className="join flex  my-8 md:my-16 mx-auto justify-center">
          <button className="join-item btn btn-outline w-1/2 md:w-1/4" onClick={onPrevious}>Previous page</button>
          <button className="join-item btn btn-outline w-1/2 md:w-1/4" onClick={onNext}>Next</button>
        </div>
        </div>

        }
      </section>
    </div>
  );
};

export default Home;
