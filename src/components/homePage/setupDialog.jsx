import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {
  TitleDesc,
  TypeOptions,
  Duration,
  Participation,
  FinishSetup,
} from "./setupDialog/index";

import Web3 from "web3";
import {
  Client,
  AccountId,
  PrivateKey,
  ContractCallQuery,
  ContractExecuteTransaction,
  Hbar,
} from "@hashgraph/sdk";
import { POLLFACTORY_ABI } from "../../../contracts/abi/abi";

const operatorId = AccountId.fromString("0.0.34142789");
const operatorKey = PrivateKey.fromString(
  "302e020100300506032b657004220420f063a8dafe7385c574dfd050bdd4f571b649ad51e157cba3bdc4591e093dbbd3"
);

const client = Client.forTestnet()
  .setOperator(operatorId, operatorKey)
  .setDefaultMaxTransactionFee(new Hbar(0.75))
  .setMaxQueryPayment(new Hbar(0.01));

const contractId = "0.0.34224232";
const web3 = new Web3(Web3.givenProvider);
const abi = POLLFACTORY_ABI;

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

async function getPollCount() {
  console.log("getPollCount Query");
  // generate function call with function name and parameters
  const functionCallAsUint8Array = encodeFunctionCall("getPollCount", []);

  // query the contract
  const contractQueryTx = new ContractCallQuery()
    .setContractId(contractId)
    .setFunctionParameters(functionCallAsUint8Array)
    .setGas(100000);
  const contractQuerySubmit = await contractQueryTx.execute(client);
  const contractQueryResult = contractQuerySubmit.getUint256();
  console.log(`- Current poll count is: ${contractQueryResult}`);
}

console.log(getPollCount());

const SetupDialog = ({ toggleSetupDialog, pollFactory, signer, client }) => {
  const [page, setPage] = useState(1);
  const [isBasic, setIsBasic] = useState(true);
  const [isTimed, setIsTimed] = useState(true);
  const [isClosed, setIsClosed] = useState(true);
  const [titleDesc, setTitleDesc] = useState({
    title: "",
    description: "",
  });
  const [categories, setCategories] = useState([
    { id: null, textContent: "", options: [] },
  ]);
  const [duration, setDuration] = useState({ start: new Date(), end: null });
  const [addresses, setAddresses] = useState(null);

  const handleAddOption = (option, categoryId) => {
    let c = [...categories];
    c[categoryId].options.push({ id: null, textContent: option });
    setCategories(c);
  };

  const handleRemoveOption = (optionId, categoryId) => {
    let c = [...categories];
    c[categoryId].options.splice(optionId, 1);
    setCategories(c);
  };

  const handleAddCategory = category => {
    let c = [...categories];
    c.push({ id: null, textContent: category, options: [] });
    setCategories(c);
  };

  const handleRemoveCategory = categoryId => {
    let c = [...categories];
    c.splice(categoryId, 1);
    setCategories(c);
  };

  const handleFinishSetup = async () => {
    const titleDesc_ = Object.values(titleDesc);
    const startEnd_ = isTimed
      ? Object.values(duration).map(date => date.getTime() / 1000.0)
      : [];
    const addresses_ = isClosed ? addresses : [];
    const categories_ = categories.map((category, index) => {
      category.id = index;
      category.options = category.options.map((option, index) => {
        option.id = index;
        return Object.values(option);
      });
      return Object.values(category);
    });
    // await pollFactory.getPollCount();
    // console.log(pollFactory.getPollCount()({ client: client, gas: 1000000 }));
    // pollFactory.createPoll(
    //   titleDesc_,
    //   startEnd_,
    //   categories_,
    //   addresses_
    // )({ signer: signer, gas: 1000000, maxTxFee: 0.75 });
    // console.log("- Poll created: ", pollCreated);
    // console.log("- TitleDesc: ", titleDesc_);
    // console.log("- StartEnd: ", startEnd_);
    // console.log("- Addresses: ", addresses_);
    // console.log("- Categories: ", categories_);
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-llblue/50 backdrop-blur-[6px] z-50">
      <div className="relative flex flex-col h-[75%] w-[450px] lg:w-[470px] bg-blue rounded-3xl pt-4 pb-8 px-6">
        <div
          className={
            "flex text-white/70" +
            (page === 1 ? " justify-end" : " justify-between")
          }
        >
          {page === 1 ? null : (
            <button
              className="hover:underline underline-offset-2"
              onClick={() => page - 1 && setPage(page - 1)}
            >
              prev
            </button>
          )}
          <FontAwesomeIcon
            icon={solid("xmark-circle")}
            className="text-2xl hover:text-white/50"
            onClick={() => toggleSetupDialog(false)}
          />
        </div>
        {(page => {
          switch (page) {
            case 1:
              return (
                <TitleDesc titleDesc={titleDesc} setTitleDesc={setTitleDesc} />
              );
            case 2:
              return (
                <TypeOptions
                  isBasic={isBasic}
                  setIsBasic={setIsBasic}
                  categories={categories}
                  setCategories={setCategories}
                  onAddOption={handleAddOption}
                  onRemoveOption={handleRemoveOption}
                  onAddCategory={handleAddCategory}
                  onRemoveCategory={handleRemoveCategory}
                />
              );
            case 3:
              return (
                <Duration
                  isTimed={isTimed}
                  setIsTimed={setIsTimed}
                  duration={duration}
                  setDuration={setDuration}
                />
              );
            case 4:
              return (
                <Participation
                  isClosed={isClosed}
                  setIsClosed={setIsClosed}
                  addresses={addresses}
                  setAddresses={setAddresses}
                />
              );
            case 5:
              return <FinishSetup />;
            default:
          }
        })(page)}
        <button
          type="button"
          className={
            "absolute bottom-8 w-[90%] py-4 rounded-2xl font-medium text-white text-xl" +
            (page !== 5
              ? " bg-gold hover:bg-dgold"
              : " bg-green hover:bg-lgreen")
          }
          onClick={
            page !== 5
              ? () => page < 5 && setPage(page + 1)
              : () => handleFinishSetup()
          }
        >
          {page !== 5 ? "Next" : "Set up Poll"}
        </button>
      </div>
    </div>
  );
};

export default SetupDialog;
