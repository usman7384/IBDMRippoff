import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserMovies from "./pages/UserMovies";
import Movie from "./pages/Movie";
import Layout from "./Layout/Layout";
import AddMovie from "./components/AddMovieModal";
import "./App.css";
import PrivateRoute from "./Routes/ProtectedRoutes";
import PublicRoute from "./Routes/PublicRoute";
function App() {

  return (
    <div>
      <AddMovie />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<PublicRoute>  <Login /> </PublicRoute> } />
              <Route path="signup" element={<PublicRoute>  <SignUp /> </PublicRoute> } />
              <Route path="movie/:id" element={<Movie />} />
              <Route path="usermovies" element={<PrivateRoute>  <UserMovies /> </PrivateRoute> }/>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
