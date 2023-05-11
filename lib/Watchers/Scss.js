

const chokidar = require("chokidar");
const fs = require("fs");
const { removeLines } = require("../Utils/Watch");



const SCSSwatchadd = ()=> {
    return chokidar.watch("src/Views/**/*.scss", { ignored: /node_modules/ }).on("add", (path, event) => {
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
}
  const SCSSwatchdelete = ()=> {
    return  chokidar
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
  
  }
    module.exports = {SCSSwatchadd,SCSSwatchdelete}