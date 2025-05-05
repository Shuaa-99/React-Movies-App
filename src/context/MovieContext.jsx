// src/context/MovieContext.js
import { createContext, useContext, useState } from "react";
import axios from "axios";

const MovieContext = createContext();

//  (provider)
export const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // get movies
  const getMovies = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (err) {
      setError("Failed to load movies, please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        loading,
        error,
        getMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => useContext(MovieContext);
