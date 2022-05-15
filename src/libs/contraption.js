import {
  Client,
  AccountId,
  PrivateKey,
  ContractCallQuery,
  ContractExecuteTransaction,
  Hbar,
} from "@hashgraph/sdk";
import Web3 from "web3";

const web3 = new Web3();

export function createClient(
  accountId,
  privateKey,
  _ = { maxTxFee: 0.75, maxQryPay: 0.05 }
) {
  const operatorId = AccountId.fromString(accountId);
  const operatorKey = PrivateKey.fromString(privateKey);
  return Client.forTestnet()
    .setOperator(operatorId, operatorKey)
    .setDefaultMaxTransactionFee(new Hbar(_.maxTxFee))
    .setMaxQueryPayment(new Hbar(_.maxQryPay));
}

export class Contract {
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

            return async _ => {
              const contractExecuteTx = await new ContractExecuteTransaction()
                .setContractId(this.contractId)
                .setFunctionParameters(encodedParametersHex)
                .setMaxTransactionFee(new Hbar(_.maxTxFee))
                .setGas(_.gas)
                .freezeWithSigner(_.signer);

              await contractExecuteTx.executeWithSigner(_.signer);
              // const contractExecuteSubmit = await (await contractExecuteTx).executeWithSigner(
              //   _.signer
              // );
              // return contractExecuteSubmit.getReceipt(_.client);
            };
          };
        }

        if (func.stateMutability === "view") {
          this[func.name] = {};
          this[func.name].abi = func;
          this[func.name].call = (parameters = []) => {
            console.log("---called");
            const encodedParameters = web3.eth.abi
              .encodeFunctionCall(this[func.name].abi, parameters)
              .slice(2);
            const encodedParametersHex = Buffer.from(encodedParameters, "hex");

            return async _ => {
              const contractQueryTx = new ContractCallQuery()
                .setContractId(this.contractId)
                .setFunctionParameters(encodedParametersHex)
                .setMaxQueryPayment(new Hbar(_.maxQueryPay))
                .setQueryPayment(new Hbar(_.maxQueryPay))
                .setGas(_.gas);
              const contractQuerySubmit =
                await contractQueryTx.executeWithSigner(_.signer);

              console.log(encodedParameters);
              console.log(this[func.name].abi.outputs);
              console.log(contractQueryTx);
              if (!contractQuerySubmit) return;
              const functionParameters = this[func.name].abi.outputs;
              const resultHex = "0x".concat(
                Buffer.from(contractQuerySubmit.bytes).toString("hex")
              );
              const result = web3.eth.abi.decodeParameters(
                functionParameters,
                resultHex
              );
              console.log(result);
              return result;
            };
          };
        }
      }
    });
  }
}

export class ContractClient {
  constructor(contractId, contractAbi) {
    this.contractId = contractId;
    this.contractAbi = contractAbi;
    this.client = createClient(
      "0.0.34142789",
      "302e020100300506032b657004220420f063a8dafe7385c574dfd050bdd4f571b649ad51e157cba3bdc4591e093dbbd3"
    );

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

            return async _ => {
              const contractExecuteTx = new ContractExecuteTransaction()
                .setContractId(this.contractId)
                .setFunctionParameters(encodedParametersHex)
                // .setMaxTransactionFee(new Hbar(_.maxTxFee))
                .setGas(_.gas);
              // .freeze(_.client);

              await contractExecuteTx.execute(this.client);
              // const contractExecuteSubmit = await (await contractExecuteTx).executeWithSigner(
              //   _.signer
              // );
              // return contractExecuteSubmit.getReceipt(_.client);
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

            return async _ => {
              const contractQueryTx = new ContractCallQuery()
                .setContractId(this.contractId)
                .setFunctionParameters(encodedParametersHex)
                // .setMaxQueryPayment(new Hbar(_.maxQueryPay))
                // .setQueryPayment(new Hbar(_.maxQueryPay))
                .setGas(_.gas);
              const contractQuerySubmit = await contractQueryTx.execute(
                this.client
              );
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
