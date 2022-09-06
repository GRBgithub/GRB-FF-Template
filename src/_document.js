import React from "react";
import ReactDOMServer from "react-dom/server";
import { Metadata } from "../lib/Routing/Metadata";

const GetPage = (Config, key) => {
  return ReactDOMServer.renderToString(
    <>
      <head>{Metadata({ props: Config.Metadata })}</head>
      <body>
        <main id="root">
          <section data-key={key}>
            <Config.SSRSEO></Config.SSRSEO>
          </section>
        </main>
      </body>
    </>
  );
};

export default GetPage;
