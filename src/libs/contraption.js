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
  _ = { maxTxFee: 0.75, maxQryPay: 0.01 }
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
            const encodedParameters = web3.eth.abi
              .encodeFunctionCall(this[func.name].abi, parameters)
              .slice(2);
            const encodedParametersHex = Buffer.from(encodedParameters, "hex");

            return async _ => {
              const contractQueryTx = await new ContractCallQuery()
                .setContractId(this.contractId)
                .setFunctionParameters(encodedParametersHex)
                .setQueryPayment(new Hbar(_.queryPay))
                .setGas(_.gas)
                .executeWithSigner(_.signer);
              const functionParameters = func.outputs;
              const resultHex = "0x".concat(
                Buffer.from(contractQueryTx.bytes).toString("hex")
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

// export class Contract {
//   constructor(contractId, contractAbi) {
//     this.contractId = contractId;

//     contractAbi.forEach(func => {
//       if (func.type === "function") {
//         if (func.stateMutability === "nonpayable") {
//           this[func.name] = (parameters = []) => {
//             const encodedParametersHex = Buffer.from(
//               web3.eth.abi.encodeFunctionCall(func, parameters).slice(2),
//               "hex"
//             );

//             return async _ => {
//               const contractExecuteTx = new ContractExecuteTransaction()
//                 .setContractId(this.contractId)
//                 .setFunctionParameters(encodedParametersHex)
//                 .setGas(_.gas);

//               const contractExecuteSubmit = await contractExecuteTx.execute(
//                 _.client
//               );
//               return contractExecuteSubmit.getReceipt(_.client);
//             };
//           };
//         }

//         if (func.stateMutability === "view") {
//           this[func.name] = async (parameters = []) => {
//             const encodedParametersHex = Buffer.from(
//               web3.eth.abi.encodeFunctionCall(func, parameters).slice(2),
//               "hex"
//             );

//             return async _ => {
//               const contractQueryTx = await new ContractCallQuery()
//                 .setContractId(this.contractId)
//                 .setFunctionParameters(encodedParametersHex)
//                 .setGas(_.gas)
//                 .execute(_.client);
//               const functionParameters = func.outputs;
//               const resultHex = "0x".concat(
//                 Buffer.from(contractQueryTx.bytes).toString("hex")
//               );
//               const result = web3.eth.abi.decodeParameters(
//                 functionParameters,
//                 resultHex
//               );
//               return result;
//             };
//           };
//         }
//       }
//     });
//   }
// }
