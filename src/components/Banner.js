import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const Banner = () => {
  const [movie, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);

      setMovies(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

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

  const opts = {
    height: "60%",
    width: "70%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button" onClick={() => handleClick(movie)}>
            Play
          </button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner_fadeBottom"></div>
      <div className={`${trailerUrl && "ytCont"}`}>
        {trailerUrl && (
          <div>
            <YouTube
              className="youtubeVideo"
              videoId={trailerUrl}
              opts={opts}
            />
            <button className="btnX" onClick={() => setTrailerUrl("")}>
              X
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Banner;
