import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { db } from "../firebase";

const ListItem = ({ title }) => {
  const [check, setCheck] = useState(false);

  return (
    <div
      className={`list_item ${check && "checked"}`}
      onClick={() => setCheck(!check)}
    >
      <Checkbox checked={check} />
      <h2> {title} </h2>
    </div>
  );
};

export default ListItem;
