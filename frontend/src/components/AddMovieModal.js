import React, { useState } from "react";
import movieService from "../services/movieServices";
import Notification from './Notification';

const AddMovie = () => {
  const [formData, setFormData] = useState({
    name: "",
    genere: "",
    rating: "",
    description: "",
  });

  const [error, setError] = useState(null); 
  const [errorCount, setErrorCount] = useState(0); 
  const [success, setSuccess] = useState(null); 
  const [successCount, setSuccessCount] = useState(0); 
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("genere", formData.genere);
    formDataToSend.append("rating", formData.rating);
    formDataToSend.append("description", formData.description);
    if (file) {
      formDataToSend.append("photoPath", file);
    }

    try {
      await movieService.addNewMovie(formDataToSend);
      console.log("Movie added successfully");
      setSuccess("Movie Added")
      setSuccessCount(prevCount => prevCount + 1)
    } catch (error) {
      console.error("Movie add failed:", error.message);
      setError(`Failed Adding Movie : ${error.message}`); 
      setErrorCount(prevCount => prevCount + 1); 

    }
  };

  return (
    <div>
    {error && <Notification key={errorCount} message={error} type="error" />} 
    {success && <Notification key={successCount} message={success} type="success" />} 


      <dialog id="addMovie" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Add A New Movie</h3>

          <form className="space-y-4" onSubmit={handleFormSubmit} method="dialog">
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
                type="text"
                onChange={handleInputChange}
                placeholder="Genere"
                name="genere"
                className="input input-bordered w-full "
              />
            </div>
            <div>
              <input
                type="text"
                onChange={handleInputChange}
                placeholder="Rating"
                name="rating"
                className="input input-bordered w-full "
              />
            </div>
            <div>
              <input
                type="text"
                onChange={handleInputChange}
                placeholder="Description"
                name="description"
                className="input input-bordered w-full "
              />
            </div>
            <div>
              <input
                type="file"
                onChange={handleFileChange}
                placeholder="Photo"
                name="photoPath"
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>
            <div>
              
              <button type="submit" className="btn btn-block btn-primary">
                Add Movie
              </button>
            </div>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddMovie;
