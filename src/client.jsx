import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";

const initial = window.__INITIAL__DATA__;

ReactDOM.hydrate(
  <App
    username={initial.username}
    title={initial.title}
    description={initial.description}
  />,
  document.getElementById("root")
);
