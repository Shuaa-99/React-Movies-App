// src/pages/Main.js
import React, { useEffect, useState } from "react";
import { useMovie } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

const apiKey = import.meta.env.VITE_TMDB_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

const Home = () => {
  const { getMovies, movies, loading, error } = useMovie();
  const [query, setQuery] = useState("");

  useEffect(() => {
    getMovies(API_URL);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
      getMovies(SEARCH_URL);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <form onSubmit={handleSearch} className="flex justify-center p-2">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="w-80 h-8 rounded-md p-1 m-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn-danger-bordered">
          Search
        </button>
      </form>

      <div className="flex justify-center flex-wrap">
        {!loading &&
          !error &&
          movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} {...movie} />)}
      </div>
    </div>
  );
};

export default Home;
