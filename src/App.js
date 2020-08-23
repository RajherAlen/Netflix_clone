import React from "react";
import "./App.css";
// import Row from "./components/Row";
// import requests from "./requests";
// import Banner from "./components/Banner";
import Nav from "./components/Nav";
import RowList from "./components/RowList";
import { BrowserRouter, Route } from "react-router-dom";
import MyList from "./pages/MyList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Route exact path="/" component={RowList} />
        <Route path="/mymovielist/:listId" component={MyList} />
      </BrowserRouter>
    </div>
  );
}

export default App;
