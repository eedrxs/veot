const { alias } = require("react-app-rewire-alias");

console.log("Starting with dev overrides");

module.exports = webpackConfig => {
  // Remove 'ModuleScopePlugin' so that we can load js files from 'libs' folder (outside 'src')
  const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
    ({ constructor }) => constructor && constructor.name === "ModuleScopePlugin"
  );
  webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);

  alias({
    "@buidlerlabs/hedera-strato-js": "./libs/hedera-strato-js.js",
    "../../libs/hashconnect": "./libs/hashconnect.js",
    "../../libs/my-contraption-js": "./libs/my-contraption-js.js",
    // web3: "./libs/web3.js",
  })(webpackConfig);

  return webpackConfig;
};

// const { alias } = require("react-app-rewire-alias");
// const CopyPlugin = require("copy-webpack-plugin");

// module.exports = webpackConfig => {
//   // Remove 'ModuleScopePlugin' so that we can load js files from 'libs' folder (outside 'src')
//   const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
//     ({ constructor }) => constructor && constructor.name === "ModuleScopePlugin"
//   );
//   webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);

//   // Tweak 'HtmlWebpackPlugin' to serve bundle as type='module' so that 'import' works
//   const htmlPlugin = webpackConfig.plugins.find(
//     ({ constructor }) => constructor && constructor.name === "HtmlWebpackPlugin"
//   );
//   htmlPlugin.userOptions.scriptLoading = "module";

//   alias({
//     "@buidlerlabs/hedera-strato-js": "./libs/hedera-strato-js.js"
//   })(webpackConfig);

//   return {
//     ...webpackConfig,
//     output: {
//       ...webpackConfig.output,
//       module: true,
//       library: {
//         ...webpackConfig.output.library,
//         type: "module"
//       }
//     },
//     experiments: {
//       ...webpackConfig.experiments,
//       outputModule: true
//     },
//     externalsType: "module",
//     externals: {
//       ...webpackConfig.externals,
//       "@buidlerlabs/hedera-strato-js": "./libs/hedera-strato-js.js"
//     },
//     plugins: [
//       ...webpackConfig.plugins,
//       new CopyPlugin({
//         patterns: [{ from: "./libs", to: "static/js" }]
//       })
//     ]
//   };
// };
