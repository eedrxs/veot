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
    "../../libs/hashconnect": "./libs/hashconnect.js"
  })(webpackConfig);

  return webpackConfig;
};
