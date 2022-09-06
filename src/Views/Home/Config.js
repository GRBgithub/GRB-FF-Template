import React from "react";
import ReactDOM from "react-dom";
import Home from "./index.js";
import Manager from "./Manager";
import ReactDOMServer from "react-dom/server";
// Route for the component
const Route = "/";

const Init = async (_req, res) => {
  // INIT CALL API

  const Data = await fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((json) => {
      return json;
    });

  // METADATA
  const Metadata = {
    title: Data.title,
    icon: "",
    keyword: "",
    author: "",
    description: "",
    preview: "",
    url: "",
  };
  // Fake SSR render just what the robot need
  const SSRSEO = () => {
    return (
      <div id="SSRSEO">
        <h1>{Data.title}</h1>
        <p>{Data.title}</p>
      </div>
    );
  };

  return {
    Data,
    Metadata,
    SSRSEO,
  };
};

// Replace the SSRSEO component by the real page
const Render = () => {
  if (!document.querySelector(`[data-key='${Route}']`)) {
    const x = document.createElement("section");
    x.dataset.key = Route;
    document.getElementById("root").appendChild(x);
  }

  ReactDOM.render(<Home props={window.__INITIAL__DATA__}></Home>, document.querySelector(`[data-key='${Route}']`));
};
export { Route, Init, Render, Manager };
