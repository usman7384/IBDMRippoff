import { API_STATIC_URL } from "../services/apiConfig";
import ReviewModal from "./ReviewModal";

const TopRated = ({ movie }) => {
  return (
    <div className="relative rounded-lg shadow-lg">
        <div className="hero min-h-screen bg-base-200">
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
        {movie && (
      <div className="md:absolute bottom-0 right-0 flex flex-col shadow-lg bg-white/70 p-4 rounded-lg h-1/2 md:h-full text-black">
        
          <>
            <img
              src={`${API_STATIC_URL}/${movie.photoPath}`}
              className="rounded-lg shadow-2xl w-[300px] h-[300px]"
              alt=""
            />
            <div>
              <h1 className="text-3xl font-bold">Top Rated Movie</h1>
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
              <ReviewModal id={movie._id} reviews={movie.reviews} />
            </div>
          </>
       
      </div>
       )}
    </div>
  );
};

export default TopRated;
