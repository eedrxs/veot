import {
  Client,
  AccountId,
  PrivateKey,
  ContractCallQuery,
  ContractExecuteTransaction,
  Hbar
} from "@hashgraph/sdk";

import * as fs from "fs";
import * as dotenv from "dotenv";
import { log, clear } from "console";
import Web3 from "web3";

dotenv.config();

clear();

const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);

const client = Client.forTestnet()
  .setOperator(operatorId, operatorKey)
  .setDefaultMaxTransactionFee(new Hbar(0.75))
  .setMaxQueryPayment(new Hbar(0.01));

const contractId = "0.0.34224232";
const web3 = new Web3();
const abi = JSON.parse(
  fs.readFileSync("../abi/PollFactory_sol_PollFactory.json", "utf8")
);

async function currentTime() {
  log("currentTime Query");
  // generate function call with function name and parameters
  const functionCallAsUint8Array = encodeFunctionCall("currentTime", []);

  // query the contract
  const contractQueryTx = new ContractCallQuery()
    .setContractId(contractId)
    .setFunctionParameters(functionCallAsUint8Array)
    .setGas(100000);
  const contractQuerySubmit = await contractQueryTx.execute(client);
  const contractQueryResult = contractQuerySubmit.getUint256();
  log(`- Current time is: ${new Date(contractQueryResult * 1000)}`);
}

async function getPollCount() {
  log("getPollCount Query");
  // generate function call with function name and parameters
  const functionCallAsUint8Array = encodeFunctionCall("getPollCount", []);

  // query the contract
  const contractQueryTx = new ContractCallQuery()
    .setContractId(contractId)
    .setFunctionParameters(functionCallAsUint8Array)
    .setGas(100000);
  const contractQuerySubmit = await contractQueryTx.execute(client);
  const contractQueryResult = contractQuerySubmit.getUint256();
  log(`- Current poll count is: ${contractQueryResult}`);
}

async function createPoll() {
  log("- createPoll Call");
  // generate function call with function name and parameters
  const functionCallAsUint8Array = encodeFunctionCall("createPoll", [
    ["Poll 1", "Just a poll"],
    [],
    [
      [
        "0",
        "President",
        [
          ["0", "Mark"],
          ["1", "Joel"]
        ]
      ],
      [
        "1",
        "Vice",
        [
          ["0", "Joy"],
          ["1", "John"]
        ]
      ]
    ],
    []
  ]);

  // call the function
  const contractExecuteTx = new ContractExecuteTransaction()
    .setContractId(contractId)
    .setFunctionParameters(functionCallAsUint8Array)
    .setGas(1000000);

  const contractExecuteSubmit = await contractExecuteTx.execute(client);
  const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
  log(`- Contract function call status: ${contractExecuteRx.status}`);
}

async function getPollAddress(pollId) {
  log("- getPollAddress Query");
  const functionCallAsUint8Array = encodeFunctionCall("getPollAddress", [
    pollId
  ]);

  const contractQueryTx = await new ContractCallQuery()
    .setContractId(contractId)
    .setFunctionParameters(functionCallAsUint8Array)
    .setGas(100000)
    .execute(client);
  const { 0: result } = decodeFunctionResult(
    "getPollAddress",
    contractQueryTx.bytes
  );
  log(`-Poll ${pollId} address is ${result}`);
}

function encodeFunctionCall(functionName, parameters) {
  const functionAbi = abi.find(
    func => func.name === functionName && func.type === "function"
  );
  const encodedParametersHex = web3.eth.abi
    .encodeFunctionCall(functionAbi, parameters)
    .slice(2);
  return Buffer.from(encodedParametersHex, "hex");
}

function decodeFunctionResult(functionName, resultAsBytes) {
  const functionAbi = abi.find(func => func.name === functionName);
  const functionParameters = functionAbi.outputs;
  const resultHex = "0x".concat(Buffer.from(resultAsBytes).toString("hex"));
  const result = web3.eth.abi.decodeParameters(functionParameters, resultHex);
  return result;
}

getPollAddress(1);
