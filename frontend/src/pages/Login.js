import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import Notification from '../components/Notification';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null); 
  const [errorCount, setErrorCount] = useState(0); 
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData.email, formData.password);
      navigate('/'); 
    } catch (error) {
      console.error("Login failed:", error.message);
      setError(`Login failed: ${error.message}`); 
      setErrorCount(prevCount => prevCount + 1); 
    }
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
      <div className="w-full rounded-md border-t-4 bg-base-100 p-6 py-16 shadow-2xl lg:max-w-lg">
        <h1 className="mb-8 text-center text-3xl font-semibold">
          Login to IMDB Rip-off!
        </h1>
        {error && <Notification key={errorCount} message={error} type="error" />} 
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <input type="email" onChange={handleInputChange} placeholder="Email" name="email" className="input input-bordered w-full" />
          </div>
          <div>
            <input type="password" onChange={handleInputChange} placeholder="Enter Password" name="password" className="input input-bordered w-full" />
          </div>
          <div>
            <button type="submit" className="btn btn-block btn-primary">Login</button>
          </div>
          <div>
            <Link to="/signup">
              <button className="btn btn-neutral btn-block">Don't have an account? Create Account</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
