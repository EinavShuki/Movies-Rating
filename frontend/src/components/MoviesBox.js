import React from "react";
import { Link } from "react-router-dom";

const MoviesBox = ({ movies }) => {
  return (
    <div className="movies_grid">
      {movies.map((movie, index) => (
        <div className="movies zoomIn" key={index}>
          <Link className="arl" to={`/movie/${movie.imdbID}`}>
            To all reviews
          </Link>
          <div className="movie-info">
            <img
              alt={movie.Title}
              src={
                movie.Poster === "N/A"
                  ? "https://placehold.it/198x264&text=Image+Not+Found"
                  : movie.Poster
              }
            />

            <p style={{ marginBottom: "1rem" }}>
              {movie.Title} | {movie.Year}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoviesBox;
