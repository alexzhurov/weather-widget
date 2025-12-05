const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "weather-widget.js",
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
  target: "web",
  resolve: {
    extensions: [".ts", ".js", ".vue"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: { appendTsSuffixTo: [/\.vue$/] },
      },
      {
        test: /\.(scss|css)$/i,
        resourceQuery: /raw/,
        type: "asset/source",
      },
      {
        test: /\.(scss|css)$/i,
        resourceQuery: { not: [/raw/, /inline/] },
        use: ["css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
};
