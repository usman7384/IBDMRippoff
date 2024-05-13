import axios from 'axios'
import { API_BASE_URL } from './apiConfig'


const movieService = {

    getAllMovies: async (page,limit) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/movies/`,
                {
                    params: {
                        page: page,
                        limit: limit
                    },

                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response.status === 200) {
                console.log(response.data)
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

    getMovieById: async (id) => {
        try {
            console.log("id",id)
            const response = await axios.get(
                `${API_BASE_URL}/movies/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response.status === 200) {
                console.log(response.data)
                return response.data
            } else {
                throw new Error(`Failed to fetch movie. Status: ${response.status}`)
            }
        } catch (error) {
            throw new Error(`Error fetching movie: ${error.message}`)
        }
    }
    ,

    searchMovieByTitle: async (title) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/movies/search/?title=${title}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response.status === 200) {
                console.log(response.data)
                return response.data
            } else {
                throw new Error(`Failed to fetch movie. Status: ${response.status}`)
            }
        } catch (error) {
            if (error.response) {
              const errorMessage = error.response.data.message || 'Unknown error';
              throw new Error(`${errorMessage}`);
            } 
          }
    },

    addNewMovie: async (movieData) => {
        console.log("movieData",movieData)
        try {
            const response = await axios.post(
                `${API_BASE_URL}/movies/`,
                movieData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if (response.status === 201) {
                console.log(response.data)
                return response.data
            } else {
                throw new Error(`Failed to add movie. Status: ${response.status}`)
            }
        } catch (error) {
            if (error.response) {
              const errorMessage = error.response.data.message || 'Unknown error';
              throw new Error(`${errorMessage}`);
            } 
          }
    },

    getMoviesByUser: async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/movies/user/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if (response.status === 200) {
                console.log(response.data)
                return response.data
            } else {
                throw new Error(`Failed to fetch movies. Status: ${response.status}`)
            }
        } catch (error) {
            throw new Error(`Error fetching movies: ${error.message}`)
        }
    },

    deleteMovie: async (id) => {
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/movies/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
        } catch (error) {
            if (error.response) {
              const errorMessage = error.response.data.message || 'Unknown error';
              throw new Error(`${errorMessage}`);
            } 
          }
    }








}

export default movieService