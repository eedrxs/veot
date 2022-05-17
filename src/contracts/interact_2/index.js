import { createClient, ClientContract } from "./contraption.js";
import { ACCOUNT_ID, PRIVATE_KEY } from "./details";
import { POLLFACTORY_ID, POLLFACTORY_ABI } from "./abi";

let client = createClient(ACCOUNT_ID, PRIVATE_KEY);
let pollFactory = new ClientContract(POLLFACTORY_ID, POLLFACTORY_ABI);

async function main() {
  console.log(`Calling getPollCount------------------------>`);
  let result = await pollFactory.getPollCount.call()({
    client: client,
    maxQueryPay: 0.01,
    gas: 1000000,
  });

  console.log(`- Current poll count: ${result}`);
}

main();
