require("dotenv").config();
const {
  Client,
  AccountId,
  PrivateKey,
  FileCreateTransaction,
  ContractCreateTransaction,
  ContractCallQuery,
  ContractExecuteTransaction,
  ContractFunctionParameters,
  Hbar
} = require("@hashgraph/sdk");
const { log } = require("console");
const fs = require("fs");

// Configure acounts and client
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function main() {
  // Import compiled contract bytecode
  const contractBytecode = fs.readFileSync("../bin/eoa_sol_EOA.bin");

  // Create a file on Hedera and store the bytecode
  const fileCreateTx = new FileCreateTransaction()
    .setContents(contractBytecode)
    .setKeys([operatorKey])
    .setMaxTransactionFee(new Hbar(0.75))
    .freezeWith(client);
  const fileCreateSign = await fileCreateTx.sign(operatorKey);
  const fileCreateSubmit = await fileCreateSign.execute(client);
  const fileCreateRx = await fileCreateSubmit.getReceipt(client);
  const bytecodeFileId = fileCreateRx.fileId;
  log(`- The bytecode file ID is: ${bytecodeFileId}`);

  // Instantiate the smart contract
  const contractInstantiateTx = new ContractCreateTransaction()
    .setBytecodeFileId(bytecodeFileId)
    .setGas(100000);
  // .setConstructorParameters(
  //   new ContractFunctionParameters().addString("Alice").addUint256(1111111)
  // );
  const contractInstantiateSubmit = await contractInstantiateTx.execute(client);
  const contractInstantiateRx = await contractInstantiateSubmit.getReceipt(
    client
  );
  const contractId = contractInstantiateRx.contractId;
  const contractAddress = contractId.toSolidityAddress();
  log(`- The smart contract ID is: ${contractId}`);
  log(`- The smart contract address in Solidity format is: ${contractAddress}`);

  // Query the contract to check changes in state variable
  const contractQueryTx = new ContractCallQuery()
    .setContractId(contractId)
    .setGas(100000)
    .setFunction("myAddress")
    .setMaxQueryPayment(new Hbar(0.00000001));
  const contractQuerySubmit = await contractQueryTx.execute(client);
  const contractQueryResult = contractQuerySubmit.getAddress(0);
  log(`- Here's your account address: ${contractQueryResult}`);

  // // Call contract function to update the state variable
  // const contractExecuteTx = new ContractExecuteTransaction()
  //   .setContractId(contractId)
  //   .setGas(100000)
  //   .setFunction(
  //     "setMobileNumber",
  //     new ContractFunctionParameters().addString("Bob").addUint256(222222)
  //   )
  //   .setMaxTransactionFee(new Hbar(0.75));
  // const contractExecuteSubmit = await contractExecuteTx.execute(client);
  // const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
  // log(`- Contract function call status: ${contractExecuteRx.status}`);

  // // Query the contract to check changes in state variable
  // const contractQueryTx1 = new ContractCallQuery()
  //   .setContractId(contractId)
  //   .setGas(100000)
  //   .setFunction(
  //     "getMobileNumber",
  //     new ContractFunctionParameters().addString("Bob")
  //   )
  //   .setMaxQueryPayment(new Hbar(0.00000001));
  // const contractQuerySubmit1 = await contractQueryTx1.execute(client);
  // const contractQueryResult1 = contractQuerySubmit1.getUint256(0);
  // log(`- Here's the phone number that you asked for: ${contractQueryResult1}`);
}
main();
