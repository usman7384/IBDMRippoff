import axios from 'axios'
import { API_BASE_URL } from './apiConfig'


const reviewService = {

    addReview: async (reviewData, movieId) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/reviews/?movieId=${movieId}`,
                reviewData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }

                }
            )

            if (response.status === 201) {
                return response.data
            } else {
                throw new Error(`Failed to fetch movies. Status: ${response.status}`)
            }
        } catch (error) {
            if (error.response) {
              const errorMessage = error.response.data.message || 'Unknown error';
              throw new Error(`${errorMessage}`);
            } 
          }
    },

    UserMovieReviews: async (movieId) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/reviews/user/movie/${movieId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if (response.status === 200) {
                return response.data
            } else {
                throw new Error(`Failed to fetch movies. Status: ${response.status}`)
            }
        } catch (error) {
            if (error.response) {
              const errorMessage = error.response.data.message || 'Unknown error';
              throw new Error(`${errorMessage}`);
            } 
          }
    },


    deleteReview: async (reviewId) => {
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/reviews/${reviewId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if (response.status === 204) {
                return response.data
            } else {
                throw new Error(`Failed to fetch movies. Status: ${response.status}`)
            }
        } catch (error) {
            if (error.response) {
              const errorMessage = error.response.data.message || 'Unknown error';
              throw new Error(`${errorMessage}`);
            } 
          }
        },

    updateReview: async (reviewData, reviewId) => {
        try {
            const response = await axios.patch(
                `${API_BASE_URL}/reviews/${reviewId}`,
                reviewData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if (response.status === 200) {
                return response.data
            } else {
                throw new Error(`Failed to fetch movies. Status: ${response.status}`)
            }
        } catch (error) {
            if (error.response) {
              const errorMessage = error.response.data.message || 'Unknown error';
              throw new Error(`${errorMessage}`);
            } 
          }
    }





}

export default reviewService