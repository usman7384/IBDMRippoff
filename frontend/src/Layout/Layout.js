import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import React from 'react';


const Layout = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <>
    <div className="mx-8 md:mx-16 my-2 md:my-4">
      <nav className="navbar bg-black rounded-full text-white">
        <div className="flex-1 ">
          <Link to="/">
            <li className="btn btn-ghost bg-none text-3xl font-extrabold hover:scale-105">IMDB <span className="line-through">Ripp Off</span></li>
          </Link>
        </div>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full hover:scale-105">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          {isLoggedIn && (

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              <Link to="/usermovies">
                <li>
                  <a>My Movies</a>
                </li>
              </Link>
              <li
                onClick={() => document.getElementById(`addMovie`).showModal()}
              >
                <a>Add New Movie</a>
              </li>
              <li onClick={logout}>
                <a>Logout</a>
              </li>
            </ul>
          )}
          {!isLoggedIn && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              <Link to="/login">
                <li>
                  <a>Login</a>
                </li>
              </Link>
              <Link to="/signup">
                <li>
                  <a>Sign Up</a>
                </li>
              </Link>
            </ul>
          )}
        </div>
      </nav>
      </div>
          
      <Outlet />

      <Footer />
    </>
  );
};

export default Layout;
