const {
  Client,
  AccountId,
  PrivateKey,
  ContractCallQuery,
  ContractExecuteTransaction,
  Hbar,
} = require("@hashgraph/sdk");
const Web3 = require("web3");

const web3 = new Web3();

function createClient(accountId, privateKey) {
  const operatorId = AccountId.fromString(accountId);
  const operatorKey = PrivateKey.fromString(privateKey);
  return Client.forTestnet().setOperator(operatorId, operatorKey);
}

class SignerContract {
  constructor(contractId, contractAbi) {
    this.contractId = contractId;
    this.contractAbi = contractAbi;

    contractAbi.forEach(func => {
      if (func.type === "function") {
        if (func.stateMutability === "nonpayable") {
          this[func.name] = {};
          this[func.name].abi = func;
          this[func.name].call = (parameters = []) => {
            const encodedParameters = web3.eth.abi
              .encodeFunctionCall(this[func.name].abi, parameters)
              .slice(2);
            const encodedParametersHex = Buffer.from(encodedParameters, "hex");

            return async ({ maxTxFee, gas, signer }) => {
              const contractExecuteTx = await new ContractExecuteTransaction()
                .setContractId(this.contractId)
                .setFunctionParameters(encodedParametersHex)
                .setMaxTransactionFee(new Hbar(maxTxFee))
                .setGas(gas)
                .freezeWithSigner(signer);

              await contractExecuteTx.executeWithSigner(signer);
            };
          };
        }

        if (func.stateMutability === "view") {
          this[func.name] = {};
          this[func.name].abi = func;
          this[func.name].call = (parameters = []) => {
            const encodedParameters = web3.eth.abi
              .encodeFunctionCall(this[func.name].abi, parameters)
              .slice(2);
            const encodedParametersHex = Buffer.from(encodedParameters, "hex");

            return async ({ maxQueryPay, gas, signer }) => {
              const contractQueryTx = new ContractCallQuery()
                .setContractId(this.contractId)
                .setFunctionParameters(encodedParametersHex)
                .setMaxQueryPayment(new Hbar(maxQueryPay))
                .setGas(gas);
              const contractQuerySubmit =
                await contractQueryTx.executeWithSigner(signer);
              const functionParameters = this[func.name].abi.outputs;
              const resultHex = "0x".concat(
                Buffer.from(contractQuerySubmit.bytes).toString("hex")
              );
              const result = web3.eth.abi.decodeParameters(
                functionParameters,
                resultHex
              );
              return result;
            };
          };
        }
      }
    });
  }
}

class ClientContract {
  constructor(contractId, contractAbi) {
    this.contractId = contractId;
    this.contractAbi = contractAbi;

    contractAbi.forEach(func => {
      if (func.type === "function") {
        if (func.stateMutability === "nonpayable") {
          this[func.name] = {};
          this[func.name].abi = func;
          this[func.name].call = (parameters = []) => {
            const encodedParameters = web3.eth.abi
              .encodeFunctionCall(this[func.name].abi, parameters)
              .slice(2);
            const encodedParametersHex = Buffer.from(encodedParameters, "hex");

            return async ({ maxTxFee, gas, client }) => {
              const contractExecuteTx = new ContractExecuteTransaction()
                .setContractId(this.contractId)
                .setFunctionParameters(encodedParametersHex)
                .setMaxTransactionFee(new Hbar(maxTxFee))
                .setGas(gas);
              await contractExecuteTx.execute(client);
            };
          };
        }

        if (func.stateMutability === "view") {
          this[func.name] = {};
          this[func.name].abi = func;
          this[func.name].call = (parameters = []) => {
            const encodedParameters = web3.eth.abi
              .encodeFunctionCall(this[func.name].abi, parameters)
              .slice(2);
            const encodedParametersHex = Buffer.from(encodedParameters, "hex");

            return async ({ maxQueryPay, gas, client }) => {
              const contractQueryTx = new ContractCallQuery()
                .setContractId(this.contractId)
                .setFunctionParameters(encodedParametersHex)
                .setMaxQueryPayment(new Hbar(maxQueryPay))
                .setGas(gas);
              const contractQuerySubmit = await contractQueryTx.execute(client);
              const functionParameters = this[func.name].abi.outputs;
              const resultHex = "0x".concat(
                Buffer.from(contractQuerySubmit.bytes).toString("hex")
              );
              const result = web3.eth.abi.decodeParameters(
                functionParameters,
                resultHex
              );
              return result;
            };
          };
        }
      }
    });
  }
}

module.exports = { createClient, SignerContract, ClientContract }
