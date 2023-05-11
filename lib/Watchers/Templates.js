const templates = {
    index: (name) =>
      `import React from 'react';
      const ${name} = ({ props }) => {
  return (
        <h1 className="${name}">
           ${name} 
        </h1>
    )
  };
  export default ${name};`,
  
    Manager: (name) =>
      `
  import GSAP from "gsap";
  import { Route } from "./Config";
  import Views from "../../../lib/Routing/Views";
  export default class Manager extends Views {
    constructor() {
      super(Route);
      this.Elements = {
        views:` +
      "`[data-key='${Route}']`" +
      `,
      };
    }
  
    in({ PrevUrl, InFinish }) {
      this.animation = GSAP.timeline({
        onComplete: () => {
          InFinish();
        },
        defaults: { duration: 0.8, ease: "expo" },
      }).fromTo(
        this.DOM.views,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        }
      );
      console.log(this.DOM.views);
    }
  
    out({ NextUrl, NextShow, OutFinish }) {
      this.animation = GSAP.timeline({
        onStart: () => {
          NextShow();
        },
        onComplete: () => {
          OutFinish();
        },
        defaults: { duration: 0.8, ease: "expo" },
      }).fromTo(
        this.DOM.views,
        {
          opacity: 1,
        },
        {
          opacity: 0,
        }
      );
      console.log(this.DOM.views);
    }
    TIME(e) {}
    SIZES(e) {}
    DEBUG() {}
  }
  
  `,
    Config: (name) =>
      `
  import React from "react";
  import ReactDOM from "react-dom";
  import ${name} from "./index.js";
  import Manager from "./Manager";
  
  // Route for the component
  const Route = "/${name}";
  
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
    if (!document.querySelector(` +
      "`[data-key='${Route}']`" +
      `)) {
      const x = document.createElement("section");
      x.dataset.key = Route;
      document.getElementById("root").appendChild(x);
    }
  
    ReactDOM.render(
      <${name} props={window.__INITIAL__DATA__}></${name}>,
      document.querySelector(` +
      "`[data-key='${Route}']`" +
      `)
    );
  };
  export { Route, Init, Render, Manager };
  
    `,
  };

  module.exports = templates