import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'
import authService from '../services/authServices';
import Notification from '../components/Notification';


const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
      })
      const [error, setError] = useState(null); 
      const [errorCount, setErrorCount] = useState(0); 
      const navigate = useNavigate()
    
      const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }))
      }
    
      const handleFormSubmit = async (e) => {
        e.preventDefault()
    
        try {
          await authService
            .register({
              name: formData.name,
              email: formData.email,
              password: formData.password
            })
            .then((res) => {
              navigate('/login')
              console.log(res)
            })
        } catch (error) {
          console.log(error)
          setError(`Registration failed: ${error.message}`); 
          setErrorCount(prevCount => prevCount + 1); 
        }
      }


    return (
        <div >
        <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
          <div className="w-full rounded-md border-t-4 bg-base-100 p-6 py-16 shadow-2xl lg:max-w-lg">
            <h1 className="mb-8 text-center text-3xl font-semibold">
              Sign Up To IMDB Rip-off!
            </h1>
            {error && <Notification key={errorCount} message={error} type="error" />} 
      <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    placeholder="Name"
                    name="name"
                    className="input input-bordered w-full "
                  />
                </div>
                <div>
                  <input
                    type="email"
                    onChange={handleInputChange}
                    placeholder="Email"
                    name="email"
                    className="input input-bordered w-full "
                  />
                </div>
                <div>
                  <input
                    type="password"
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                    name="password"
                    className="input input-bordered w-full "
                  />
                </div>
                <div>
                  <button className="btn btn-block btn-primary " type="submit">
                    Sign Up
                  </button>
                </div>
                <div>
                  <Link to='/login'>
                    <button className="btn btn-neutral btn-block ">
                      Already Have An Account? Login
                    </button>
                  </Link>
                </div>
              </form>
              </div>
          </div>
        </div>
    );
    }

export default SignUp;
