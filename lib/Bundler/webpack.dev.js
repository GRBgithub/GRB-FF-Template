const path = require("path");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const plugins = [new CleanWebpackPlugin()];
const GetSASS = (extract = false) => {
  const base = [
    {
      loader: "css-loader",
      options: {
        modules: true,
        importLoaders: 1,
      },
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [["autoprefixer"]],
        },
      },
    },
    "sass-loader",
    // Compiles Sass to CSS
  ];
  return {
    test: /\.s[ac]ss$/i,
    use: extract ? [MiniCssExtractPlugin.loader, ...base] : base,
  };
};
const rules = [
  {
    test: /\.(html)$/,
    use: ["html-loader"],
  },

  // TS
  {
    test: /\.ts?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  },

  // TSX
  {
    test: /\.tsx$/,
    exclude: /node_modules/,
    use: ["babel-loader"],
  },
  // JS(x)
  {
    test: /\.jsx?/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env", "@babel/preset-react"],
      },
    },
  },
  // CSS
  {
    test: /\.css$/,
    use: ["css-loader"],
  },

  // Images
  {
    test: /\.(jpg|png|gif|svg)$/,
    type: "asset/resource",
    generator: {
      filename: "assets/images/[hash][ext]",
    },
  },
  // Audio
  {
    test: /\.(mp3|wav)$/,
    loader: "file-loader",
    options: {
      name: "[path][name].[ext]",
    },
  },
  // Fonts
  {
    test: /\.(ttf|eot|woff|woff2)$/,
    type: "asset/resource",
    generator: {
      filename: "assets/fonts/[hash][ext]",
    },
  },
  // Shaders
  {
    test: /\.(glsl|vs|fs|vert|frag)$/,
    exclude: /node_modules/,
    use: ["glslify-import-loader", "raw-loader", "glslify-loader"],
  },
];
const optimization = {
  minimize: true,
  minimizer: [new CssMinimizerPlugin()],
};
const performance = {
  hints: false,
  maxEntrypointSize: 512000,
  maxAssetSize: 512000,
};
/*---------------------------------------------------------------------------------------
                                            Config
------------------------------------------------------------------------------------------*/
const serverConfig = {
  mode: "development",
  target: "node",
  performance,
  node: {
    __dirname: false,
  },
  plugins: [
    ...plugins,
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, "../../public"), to: path.resolve(__dirname, "../../dist/public") }],
    }),
  ],
  devtool: "source-map",
  resolve: {
    alias: {
      three: path.resolve("./node_modules/three"),
    },
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
  },
  externals: [nodeExternals()],
  entry: {
    "index.js": path.resolve(__dirname, "../EntryPoint/Server.js"),
  },
  module: {
    rules: [...rules, GetSASS()],
  },
  output: {
    path: path.resolve(__dirname, "../../dist"),
    filename: "[name]",
  },
};
const clientConfig = {
  mode: "development",
  target: "web",
  performance,
  plugins: [
    ...plugins,
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  devtool: "source-map",
  resolve: {
    alias: {
      three: path.resolve("./node_modules/three"),
    },
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
  },
  optimization,
  entry: {
    "main.js": path.resolve(__dirname, "../EntryPoint/Client.js"),
  },

  module: {
    rules: [...rules, GetSASS(true)],
  },
  output: {
    path: path.resolve(__dirname, "../../dist/public"),
    filename: "[name]",
  },
};
const SwConfig = {
  mode: "development",
  target: "web",
  optimization,
  entry: {
    "sw.js": path.resolve(__dirname, "../ServiceWorker.js"),
  },
  module: {
    rules: rules,
  },
  output: {
    path: path.resolve(__dirname, "../../dist"),
    filename: "[name]",
  },
};

module.exports = { serverConfig, clientConfig, SwConfig };
