import React from "react";
import ReactDOMServer from "react-dom/server";
import { Metadata as Default } from "../../Config/Default";
const UpdateMeta = (props) => {
  document.querySelector("head").innerHTML = GetMeta(props);
};

const GetMeta = (props) => {
  return ReactDOMServer.renderToString(<Metadata props={props}></Metadata>);
};
const Metadata = ({ props }) => {
  return (
    <>
      <title>{props.title ? props.title : Default.title}</title>
      {/*  Meta Tags */}
      <meta charSet="utf-8"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      {/* Icons Meta Tags */}
      <link rel="icon" type="image/ico" href={`/static/${props.icon ? props.icon : Default.icon} `} />
      <link rel="apple-touch-icon" href={`/static/${props.appleicon ? props.appleicon : Default.appleicon}`}></link>

      <meta name="keywords" content={props.keyword ? props.keyword : Default.keyword} />
      <meta name="author" content={props.author ? props.author : Default.author} />
      <meta name="description" content={props.description ? props.description : Default.description} />
      {/* Google / Search Engine Tags  */}
      <meta itemProp="name" content={props.title ? props.title : Default.title} />
      <meta itemProp="description" content={props.description ? props.description : Default.description} />
      <meta itemProp="image" content={`/static/${props.preview ? props.preview : Default.preview}`} />
      {/* Facebook Meta Tags  */}
      <meta property="og:url" content={props.url ? props.url : Default.url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title ? props.title : Default.title} />
      <meta property="og:description" content={props.description ? props.description : Default.description} />
      <meta property="og:image" content={`/static/${props.preview ? props.preview : Default.preview}`} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={props.title ? props.title : Default.title} />
      <meta name="twitter:description" content={props.description ? props.description : Default.description} />
      <meta name="twitter:image" content={`/static/${props.preview ? props.preview : Default.preview}`} />

      {/* Pwa Meta Tags */}
      <meta name="theme-color" content={props.themeColor ? props.themeColor : Default.themeColor} />
      <link rel="manifest" href="/static/site.webmanifest"></link>

      {/* Import CSS */}
      <link rel="stylesheet" type="text/css" defer href="/static/main.js.css"></link>
    </>
  );
};

export { Metadata, UpdateMeta, GetMeta };
