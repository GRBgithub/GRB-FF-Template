
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
const removeLines = (data, lines = []) => {
  return data
    .split("\n")
    .filter((val, idx) => lines.indexOf(idx) === -1)
    .join("\n");
};

function createFiles(path, name,templates) {
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
    }
  }
}

module.exports = {fileExists,writeToPath,removeLines,createFiles}