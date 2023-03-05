//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import TodoList from "./component/TodoList.jsx";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import Home from "./component/home.jsx";

//render your react application
ReactDOM.render(<TodoList />, document.querySelector("#app"));
