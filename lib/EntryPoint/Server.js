require("dotenv").config({ path: "../../.env" });
import express from "express";
import path from "path";
import Routes from "../Routing/Routes";
import { GetMeta } from "../Routing/Metadata";
import GetPage from "../../src/_document";
import { Metadata } from "../../Config/Default";

const PORT = process.env.PORT || 3000;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../../dist/public")));

app.use(express.json({ extended: false }));

let root = false;
for (const [key, value] of Object.entries(Routes)) {
  if (key === "/") root = true;
  app.get(key, async (_req, res) => {
    const Config = await value.Init();
    const html = page(Config, key);
    res.send(html);
  });
}
app.get("/sw.js", function (req, res) {
  //send the correct headers
  res.header("Content-Type", "text/javascript");

  res.sendFile(path.join(__dirname, "sw.js"));
});

if (!root) {
  app.get("/", (_req, res) => {
    res.send(Tutoriel());
  });
}

const publicDir = path.resolve(__dirname, "public");
app.use("/static", express.static(publicDir));

app.listen(PORT);
const PWA = `<script>if ('serviceWorker' in navigator) {window.addEventListener('load', function() {navigator.serviceWorker.register('/sw.js').then(function(registration) {console.log('ServiceWorker registration successful with scope: ', registration.scope);}, function(err) {console.log('ServiceWorker registration failed: ', err);});});}</script>`;
const page = (Config, key) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      ${GetPage(Config, key)}
     <style>
        #SSRSEO{
          opacity:0;
        }
      </style>
      <noscript>Please enable JavaScript to view this website</noscript>
      <script>
        window.__INITIAL__DATA__ = ${JSON.stringify(Config.Data)};
      </script>
        ${PWA}
      <script defer src="/static/main.js"></script>
    </html>
  `;
};
const Tutoriel = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      ${GetMeta(Metadata)}
      <body>
      <div class="Tutoriel_INIT">
       <h1>Regis Grumberg F(uck)-Framwork</h1>
       <ul>
        <li>npm run dev</li>
        <li>Create a directory in the Views directory that will create a view</li>
        <li>Change the url of your view in the Config.js in the variable Route</li>
        <li>Create a with data-root in it to create transition between page</li>
       </ul>
       </div>
      </body>
      <script>
      window.addEventListener('load',()=>{
        if("serviceWorker" in navigator){
          navigator.serviceWorker.register("/static/sw.js");
        }
      })
      </script>
      <noscript>Please enable JavaScript to view this website</noscript>
     <script defer src="/static/main.js"></script>
    </html>
  `;
};
