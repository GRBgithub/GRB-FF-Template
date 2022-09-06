const { merge } = require("webpack-merge");
const devConfiguration = require("./webpack.dev.js");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const ProdConfig = {
  mode: "production",
  plugins: [new TerserPlugin(), new CompressionPlugin()],
};
module.exports = [
  merge(devConfiguration.serverConfig, ProdConfig),
  merge(devConfiguration.clientConfig, ProdConfig),
  merge(devConfiguration.SwConfig, ProdConfig),
];
