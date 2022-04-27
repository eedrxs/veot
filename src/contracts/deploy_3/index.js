require("dotenv").config();
const { log, clear } = require("console");
const fs = require("fs");
const {
  Client,
  AccountId,
  PrivateKey,
  FileCreateTransaction,
  FileAppendTransaction,
  ContractCreateTransaction,
  ContractCallQuery,
  ContractExecuteTransaction,
  ContractFunctionParameters,
  Hbar
} = require("@hashgraph/sdk");

clear();

const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);
client.setDefaultMaxTransactionFee(new Hbar(0.75));
client.setMaxQueryPayment(new Hbar(0.01));

async function main() {
  // // STEP 1 ======================================================
  // log("STEP 1 ======================================================");
  // const bytecode = fs.readFileSync(
  //   "../bin/PollFactory_sol_PollFactory.bin"
  // );
  // log("- Done");

  // // Create a file on Hedera and store the bytecode
  // const fileCreateTx = new FileCreateTransaction()
  //   .setKeys([operatorKey])
  //   .freezeWith(client);
  // const fileCreateSign = await fileCreateTx.sign(operatorKey);
  // const fileCreateSubmit = await fileCreateSign.execute(client);
  // const fileCreateRx = await fileCreateSubmit.getReceipt(client);
  // const bytecodeFileId = fileCreateRx.fileId;
  // log(`- The smart contract bytecode file ID is: ${bytecodeFileId}`);

  // // Append contents to the file
  // const fileAppendTx = new FileAppendTransaction()
  //   .setFileId(bytecodeFileId)
  //   .setContents(bytecode)
  //   .setMaxChunks(25)
  //   .freezeWith(client);
  // const fileAppendSign = await fileAppendTx.sign(operatorKey);
  // const fileAppendSubmit = await fileAppendSign.execute(client);
  // const fileAppendRx = await fileAppendSubmit.getReceipt(client);
  // log(`- Content added: ${fileAppendRx.status}`);

  // // STEP 2 ======================================================
  // log("STEP 2 ======================================================");
  // // Create the smart contract
  // const contractInstantiateTx = new ContractCreateTransaction()
  //   .setBytecodeFileId(bytecodeFileId)
  //   .setMaxTransactionFee(new Hbar(3.0))
  //   .setGas(3000000);
  // const contractInstantiateSubmit = await contractInstantiateTx.execute(client);
  // const contractInstantiateRx = await contractInstantiateSubmit.getReceipt(
  //   client
  // );
  // const contractId = contractInstantiateRx.contractId;
  // const contractAddress = contractId.toSolidityAddress();
  // log(`- The smart contract ID is: ${contractId}`);
  // log(`- The smart contract ID in Solidity format is: ${contractAddress}`);

  const contractId = "0.0.34224232";

  // STEP 3 ======================================================
  log("STEP 3 ======================================================");
  // Query the smart contract
  const contractQueryTx = new ContractCallQuery()
    .setContractId(contractId)
    .setGas(100000)
    .setFunction("currentTime");
  const contractQuerySubmit = await contractQueryTx.execute(client);
  const contractQueryResult = contractQuerySubmit.getUint256();
  log(`- Current time is: ${new Date(contractQueryResult * 1000)}`);

  // Call contract function
  const contractExecuteTx = new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(100000)
    .setFunction(
      "createPoll",
      new ContractFunctionParameters()
        .addStringArray(["Poll 1, Just a poll"])
        .addUint256Array([])
        ._addParam()
    );
}
main();
