import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import firebase from "firebase";

const base_url = "https://image.tmdb.org/t/p/original/";

const MovieInfo = ({ movieInfo, handleClick, setMovieInfo, id }) => {
  const [add, setAdd] = useState(false);
  const [locUserId, setLocUserId] = useState("");
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    if (locUserId) {
      db.collection("users")
        .doc(locUserId)
        .collection("movieList")
        .onSnapshot((snapshot) => {
          setMyList(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [locUserId]);

  
  useEffect(() => {
    const data = localStorage.getItem("current-user");

    if (data) {
      const dataPars = JSON.parse(data);
      setLocUserId(dataPars.uid);
    }
  }, []);

  const addToMyList = () => {
    db.collection("users")
      .doc(locUserId)
      .collection("movieList")
      .add({
        title: movieInfo?.title || movieInfo?.original_name || movieInfo?.name,
        id: movieInfo.id,
        watched: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setAdd(true);

    setTimeout(() => setAdd(false), 2000);
  };

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
            <button className="banner_button btnI" onClick={addToMyList}>
              Add to my list
            </button>
            <div className={`addList ${!add && "addNone"}`}>
              <h3>Movie is added</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
