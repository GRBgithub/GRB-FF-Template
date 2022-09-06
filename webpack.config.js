const nodeExternals = require("webpack-node-externals");
const path = require("path");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/*---------------------------------------------------------------------------------------
                                            Loader
------------------------------------------------------------------------------------------*/
const js = {
  test: /\.jsx?/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
  },
};

const css = {
  test: /\.scss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: "",
      },
    },
    {
      loader: "css-loader",
    },
    {
      loader: "postcss-loader",
    },
    {
      loader: "sass-loader",
    },
  ],
};
const sass = {
  test: /\.s[ac]ss$/i,
  use: [
    // Creates `style` nodes from JS strings
    "style-loader",
    // Translates CSS into CommonJS
    "css-loader",
    // Compiles Sass to CSS
    "sass-loader",
  ],
};

const file = {
  test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
  loader: "file-loader",
  options: {
    name(file) {
      return "[hash].[ext]";
    },
  },
};

const image = {
  test: /\.(jpe?g|png|gif|svg|webp)$/i,
  use: [
    {
      loader: ImageMinimizerPlugin.loader,
      options: {
        severityError: "warning", // Ignore errors on corrupted images
        minimizerOptions: {
          plugins: ["gifsicle"],
        },
      },
    },
  ],
};

const raw = [
  {
    test: /\.(glsl|frag|vert)$/,
    loader: "raw-loader",
    exclude: /node_modules/,
  },

  {
    test: /\.(glsl|frag|vert)$/,
    loader: "glslify-loader",
    exclude: /node_modules/,
  },
];
/*---------------------------------------------------------------------------------------
                                            Config
------------------------------------------------------------------------------------------*/
const serverConfig = {
  mode: "development",
  target: "node",
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  entry: {
    "index.js": path.resolve(__dirname, "lib/EntryPoint/Server.js"),
  },
  module: {
    rules: [js, sass, image, file, ...raw],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]",
  },
};

const clientConfig = {
  mode: "development",
  target: "web",
  entry: {
    "main.js": path.resolve(__dirname, "lib/EntryPoint/Client.js"),
  },
  module: {
    rules: [js, sass, image, file, ...raw],
  },
  output: {
    path: path.resolve(__dirname, "dist/public"),
    filename: "[name]",
  },
};
module.exports = [serverConfig, clientConfig];
