const chokidar = require("chokidar");
const fs = require("fs");

const fileExists = (path) => (file) => fs.existsSync(`${path}/${file}`);

const writeToPath = (path) => (file, content) => {
  const filePath = `${path}/${file}`;

  fs.writeFile(filePath, content, (err) => {
    if (err) throw err;
    console.log("Created file: ", filePath);
    return true;
  });
};

function createFiles(path, name) {
  const files = {
    index: "index.js",
    Config: "Config.js",
    Manager: `Manager.js`,
  };

  if (name !== "components") {
    const writeFile = writeToPath(path);
    const toFileMissingBool = (file) => !fileExists(path)(file);
    const checkAllMissing = (acc, cur) => acc && cur;

    const noneExist = Object.values(files).map(toFileMissingBool).reduce(checkAllMissing);

    if (noneExist) {
      console.log(`Detected new component: ${name}, ${path}`);
      Object.entries(files).forEach(([type, fileName]) => {
        writeFile(fileName, templates[type](name));
      });
      // setTimeout(() => {
      //   fs.mkdirSync(path + "/components", { recursive: true });
      // }, 100);
    }
  }
}

const removeLines = (data, lines = []) => {
  return data
    .split("\n")
    .filter((val, idx) => lines.indexOf(idx) === -1)
    .join("\n");
};

const watcher = chokidar.watch("src/Views/*", { ignored: /node_modules/ }).on("addDir", (path, event) => {

  let name = path.replace(/.*\/Views\//, "");
  if (name.includes("Views") || name.includes("src") || name.includes("/")) {
    name = name.replace("/", "");
    name = name.replace("Views", "");
    name = name.replace("src", "");
    name = name.replace(/\\/g, "");
    name = name.replace(/\\\//g, "");
  }

  if (!name.includes("/")) {
    createFiles(path, name);
    const importjk = `import * as ${name}Config from "../../src/Views/${name}/Config";`;
    const routejk = `Routes[${name}Config.Route] = { ...${name}Config, Manager: new ${name}Config.Manager() };`;

    fs.readFile("lib/Routing/Routes.js", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("----READ----");
      const allLines = data.split(/\r\n|\n/);
      if (allLines.indexOf(routejk) === -1) {
        allLines.splice(allLines.indexOf("//Routes") - 1, 0, routejk);
        fs.writeFileSync("lib/Routing/Routes.js", allLines.join("\r\n"), {
          encoding: "utf8",
          flag: "w",
        });
      }
      if (allLines.indexOf(importjk) === -1) {
        allLines.splice(allLines.indexOf("//Import") - 1, 0, importjk);
        fs.writeFileSync("lib/Routing/Routes.js", allLines.join("\r\n"), {
          encoding: "utf8",
          flag: "w",
        });
      }
    });
  }
});

const watcherunliked = chokidar.watch("src/Views/*", { ignored: /node_modules/ }).on("unlinkDir", (path, event) => {
  let name = path.replace(/.*\/Views\//, "");
  if (name.includes("Views") || name.includes("src") || name.includes("/")) {
    name = name.replace("/", "");
    name = name.replace("Views", "");
    name = name.replace("src", "");
    name = name.replace(/\\/g, "");
    name = name.replace(/\\\//g, "");
  }

  if (!name.includes("/"))
    fs.readFile("lib/Routing/Routes.js", "utf8", (err, data) => {
      if (err) throw err;
      let lineToDelete = [];
      const allLines = data.split(/\r\n|\n/);
      // Reading line by line
      const importjk = `import * as ${name}Config from "../../src/Views/${name}/Config";`;
      const routejk = `Routes[${name}Config.Route] = { ...${name}Config, Manager: new ${name}Config.Manager() };`;

      console.log("------DELETE-------");
      allLines.forEach((line, i) => {
        if (line === importjk) lineToDelete.push(i);
        if (line === routejk) lineToDelete.push(i);
      });

      fs.writeFile("lib/Routing/Routes.js", removeLines(data, lineToDelete), "utf8", function (err) {
        if (err) throw err;
        console.log("the lines have been removed.");
      });
    });
});

console.log("--RWATCHER--");
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

const SASSwatchadd = chokidar.watch("src/Views/**/*.scss", { ignored: /node_modules/ }).on("add", (path, event) => {
  const importjk = `@import "../../${path}";`;

  fs.readFile("Config/GlobalStyles/index.scss", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("----READ----");
    const allLines = data.split(/\r\n|\n/);

    if (allLines.indexOf(importjk) === -1) {
      allLines.splice(allLines.indexOf("/*COMPO*/") - 1, 0, importjk);
      fs.writeFileSync("Config/GlobalStyles/index.scss", allLines.join("\r\n"), {
        encoding: "utf8",
        flag: "w",
      });
    }
  });
});

const SASSwatchdelete = chokidar
  .watch("src/Views/**/*.scss", { ignored: /node_modules/ })
  .on("unlink", (path, event) => {
    fs.readFile("Config/GlobalStyles/index.scss", "utf8", (err, data) => {
      if (err) throw err;

      let lineToDelete = [];
      const allLines = data.split(/\r\n|\n/);
      // Reading line by line
      console.log(path);
      const importjk = `@import "../../${path}";`;

      console.log("------DELETE-------");
      allLines.forEach((line, i) => {
        if (line === importjk) lineToDelete.push(i);
      });

      fs.writeFile("Config/GlobalStyles/index.scss", removeLines(data, lineToDelete), "utf8", function (err) {
        if (err) throw err;
        console.log("the lines have been removed.");
      });
    });
  });
