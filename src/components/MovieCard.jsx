// src/components/MovieCard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?auto=format&fit=crop&w=700&q=80";

const MovieCard = ({ title, poster_path, overview, id }) => {
  const navigate = useNavigate();

  return (
    <div
      className="movie"
      id="container"
      onClick={() => navigate("/details/" + id)}
    >
      {/* <div className="bg-white rounded-lg shadow-md overflow-hidden"> */}
      <img
        src={poster_path ? IMG_API + poster_path : defaultImage}
        alt={title}
      />
      <div className="flex align-center justify-between p-1 text-white">
        <h5 className="p-3">{title}</h5>
      </div>
      <div className="movie-over">
        <h2>Overview</h2>
        <p>{overview}</p>
      </div>
      {/* </div> */}
    </div>
  );
};

export default MovieCard;
