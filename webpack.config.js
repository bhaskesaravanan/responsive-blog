const path = require("path");

module.exports =(argv)=> {
  return{
    devtool: "inline-source-map",
    entry: [path.join(__dirname, "./assets/index.tsx")],
    output: {
      path: path.join(__dirname, "./public/js/dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.s[ac]ss$/i, 
          use:["style-loader", 'css-loader', "sass-loader"]
        }
      ],
    },
    resolve: {
      extensions:[".ts",".tsx",".jsx",".js"],
      modules:["node_modules"]
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 8000,
    },
  }
};
