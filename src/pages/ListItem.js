import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { db } from "../firebase";
import { useParams } from "react-router-dom";

const ListItem = ({ title, id, watched }) => {
  const { listId } = useParams();

  const handleChange = () => {
    db.collection("users")
      .doc(listId)
      .collection("movieList")
      .doc(id)
      .update({ watched: !watched });
  };

  return (
    <div
      className={`list_item ${watched && "checked"}`}
      onClick={() => handleChange()}
    >
      <Checkbox checked={watched} />
      <h2> {title} </h2>
    </div>
  );
};

export default ListItem;
