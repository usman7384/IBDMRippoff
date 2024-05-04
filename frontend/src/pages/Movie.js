import Hero from "../components/Movie";
import ReviewForm from "../components/AddReview";
import UserMovieReviews from "../components/UserMovieReviews";
import { useAuth } from '../context/AuthContext'; 

const Movie = () => {
    const { isLoggedIn } = useAuth(); 

    return (
        <div className="m-8 md:m-16">
            <Hero/>
            {isLoggedIn && 
            <div>
            <UserMovieReviews />
            <ReviewForm />
            </div>
            }
        </div>
    );
}

export default Movie;
