const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "main.tsx"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.json$/,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      favicon: path.join(__dirname, "src", "ico", "favicon.ico"),
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, "src"),
    port: 8002,
    historyApiFallback: true,
  },
};
