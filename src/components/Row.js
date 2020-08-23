import React, { useState, useEffect } from "react";
import axios from "../axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import MovieInfo from "./MovieInfo";
import { db } from "../firebase";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchURL, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movieInfo, setMovieInfo] = useState("");
  const [user, setUser] = useState([]);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setUser(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          user: doc.data(),
        }))
      );
    });
  }, []);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);

      return request;
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "600px",
    width: "70%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.original_name || movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch(console.error());
    }
  };

  const handleClickInfo = (movie) => {
    if (movieInfo) {
      setMovieInfo("");
    } else {
      setMovieInfo(movie);
    }
  };

  const esc = () => {
    setTrailerUrl("");
  };

  return (
    <div className="row">
      <h2 className="title"> {title} </h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClickInfo(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.title}
          />
        ))}
      </div>
      {movieInfo && (
        <MovieInfo
          movieInfo={movieInfo}
          handleClick={handleClick}
          setMovieInfo={setMovieInfo}
          user={user[0]}
        />
      )}
      {trailerUrl && (
        <div className="ytInfo">
          <YouTube className="ytInfoVideo" videoId={trailerUrl} opts={opts} />
          <button className="btnX  xInfo" onClick={() => setTrailerUrl("")}>
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default Row;
