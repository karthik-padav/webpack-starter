const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js", // bundle file name
    path: path.resolve(__dirname, "dist"), // Absolute path of dist folder where the bundle file gets created
    clean: true, // Cleans dist folder before generating
    assetModuleFilename: "images/[hash][ext][query]", // This creates folder for images
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html", // generates index.html file inside dist folder
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // Do not touch node_modules
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          //  "style-loader","css-loader"
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", options: { modules: true } },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", options: { modules: true } },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
};
