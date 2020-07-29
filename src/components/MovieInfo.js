import React from "react";

const base_url = "https://image.tmdb.org/t/p/original/";

const MovieInfo = ({ movieInfo, handleClick, setMovieInfo }) => {
  console.log(movieInfo);
  return (
    <div className="movieCont">
      <button className="btnX xInfo" onClick={() => setMovieInfo("")}>
        X
      </button>
      <div className="movieInfo">
        <img
          className="moviePoster"
          src={`${base_url}${movieInfo.poster_path}`}
          alt={movieInfo.title}
        />
        <div className="movieOverview">
          <h1 className="movieTitle">
            {movieInfo.title || movieInfo.original_name || movieInfo.name}
          </h1>
          <p className="releaseDate"> {movieInfo.release_date} </p>
          <h4 className="overview">{movieInfo.overview}</h4>
          <h5 className="imdb">IMDB: {movieInfo.vote_average}</h5>
          <div className="banner_buttons btnInfo">
            <button
              className="banner_button btnI"
              onClick={() => handleClick(movieInfo)}
            >
              Play
            </button>
            <button className="banner_button btnI">My List</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
