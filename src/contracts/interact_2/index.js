const { createClient, ClientContract } = require("./contraption.js");
const { ACCOUNT_ID, PRIVATE_KEY } = require("./details");
const { POLLFACTORY_ID, POLLFACTORY_ABI } = require("./abi");

let client = createClient(ACCOUNT_ID, PRIVATE_KEY);
let pollFactory = new ClientContract(POLLFACTORY_ID, POLLFACTORY_ABI);

async function main() {
  console.log(`Calling getPollCount------------------------>`);
  let { 0: pollCount } = await pollFactory.getPollCount.call()({
    client: client,
    maxQueryPay: 1.5,
    gas: 1000000,
  });

  console.log(`- Current poll count: ${JSON.stringify(pollCount)}`);
}

main();
