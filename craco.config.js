const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "@buidlerlabs/hedera-strato-js": "./src/lib/hedera-strato-hashpack.js"
        }
      }
    }
  ]
};
