import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import ListItem from "./ListItem";

const MyList = () => {
  const [myList, setMyList] = useState([]);
  const { listId } = useParams();

  let userHasMap = {};
  let newList = myList.filter((item, _) => {
    let userExists = userHasMap.hasOwnProperty(item.data.id);
    return userExists ? false : (userHasMap[item.data.id] = 1);
  });

  useEffect(() => {
    let unsubsribe;
    if (listId) {
      unsubsribe = db
        .collection("users")
        .doc(listId)
        .collection("movieList")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMyList(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          );
        });
    }
    return () => {
      unsubsribe();
    };
  }, [listId]);

  return (
    <div className="movie_list">
      <h3>
        MY LIST <span className="movie_listNumber">({newList.length})</span>
      </h3>
      {newList.map((movie) => (
        <ListItem
          key={movie.id}
          id={movie.id}
          title={movie.data.title}
          watched={movie.data.watched}
        />
      ))}
    </div>
  );
};

export default MyList;
