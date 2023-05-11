
const chokidar = require("chokidar");
const fs = require("fs");
const templates = require("./templates");
const { removeLines,createFiles } = require("../Utils/Watch");

const watcher = ()=> {
return chokidar.watch("src/Views/*", { ignored: /node_modules/ }).on("addDir", (path, event) => {
  
  let name = path.replace(/.*\/Views\//, "");
  if (name.includes("Views") || name.includes("src") || name.includes("/")) {
    name = name.replace("/", "").replace("Views", "").replace("src", "").replace(/\\/g, "").replace(/\\\//g, "");

  }

  if (!name.includes("/")) {
    console.log(name)
    createFiles(path, name,templates);
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
}


const watcherunliked = ()=> {
    return chokidar.watch("src/Views/*", { ignored: /node_modules/ }).on("unlinkDir", (path, event) => {
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
}

module.exports = {watcherunliked ,watcher}