import axios from 'axios'
import { API_BASE_URL } from './apiConfig'


const authService = {
  register: async (userData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 201) {
        return response.data
      } else {
        throw new Error(`${response.message} Status: ${response.code}`)
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || 'Unknown error';
        throw new Error(`${errorMessage}`);
      } 
    }
  },

  login : async (credentials) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/login/`,
        credentials,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 200) {
        localStorage.setItem('token', response.data.tokens.access.token)
        localStorage.setItem('refresh_token', response.data.tokens.refresh.token)
        return response.data
      } else {
        throw new Error(`${response.message} Status: ${response.code}`)
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || 'Unknown error';
        throw new Error(`${errorMessage}`);
      } 
    }
  }
}

export default authService