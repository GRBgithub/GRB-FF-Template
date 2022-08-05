import React from "react";
import Counter from "./components/Counter.jsx";
import Repo from "./components/Repo.jsx";

export default function App(props) {
  const { username, title, description } = props;

  return (
    <>
      <h1>{title}</h1>
      <p>
        <i>{description}</i>
      </p>

      <h2>Greeting</h2>
      <p>Hello, {username}!</p>

      <h2>Counter</h2>
      <Counter />

      <h2>Source code</h2>
      <Repo />
    </>
  );
}
