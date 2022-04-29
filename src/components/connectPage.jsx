import React, { useEffect } from "react";
// import { ApiSession } from "../hedera-strato.js";

function log(stuff) {
  console.log(stuff);
}

// const { session } = await ApiSession.default({ wallet: { type: "Browser" } });
// const liveContract = await session.getLiveContract({
//   id: "0.0.34224232",
//   abi: [
//     "function createPoll( string[] memory titleDesc_, uint[] memory startEnd_, Category_[] memory categories_, address[] memory participation_) external",
//     "function queryPoll(uint pollId) public view returns(QueryResult memory)",
//     "function fetchPolls(uint pollId, uint8 n) external view returns(QueryResult[] memory)",
//     "function getPollCount() external view returns(uint)",
//     "function getPollAddress(uint pollId) external view returns(address)",
//     "function pollStatus(uint[] memory _startEnd) public view returns(PollStatus)",
//     "function currentTime() public view returns(uint)"
//   ]
// });
// const bigNumberGetResult = await liveContract.get();

// console.log(bigNumberGetResult.toNumber());

let appMetadata = {
  name: "Veot",
  description: "A decentralised polling platform built on the Hedera Hashgraph",
  icon: "https://www.hashpack.app/img/logo.svg"
};

let saveData = {
  topic: "",
  pairingString: "",
  privateKey: "",
  pairedWalletData: null,
  pairedAccounts: []
};

function loadLocalData() {
  let foundData = localStorage.getItem("veotData");

  if (foundData) {
    saveData = JSON.parse(foundData);
    log(saveData);
    return true;
  } else return false;
}

const ConnectPage = ({ hashconnect, onAccount }) => {
  const connect = async () => {
    if (!loadLocalData()) {
      //first init and store the private for later
      let initData = await hashconnect.init(appMetadata);
      saveData.privateKey = initData.privKey;

      //then connect, storing the new topic for later
      const state = await hashconnect.connect();
      saveData.topic = state.topic;

      //generate a pairing string, which you can display and generate a QR code from
      saveData.pairingString = hashconnect.generatePairingString(
        state,
        "testnet",
        true
      );

      //find any supported local wallets
      hashconnect.findLocalWallets();

      //listen for foundExtensionEvent
      hashconnect.foundExtensionEvent.once(extensionMetadata => {
        hashconnect.connectToLocalWallet(
          saveData.pairingString,
          extensionMetadata
        );
        localStorage.setItem("veotData", JSON.stringify(saveData));
      });

      //   // Listen for PairingEvent
      //   hashconnect.pairingEvent.once(pairingData => {
      //     saveData.pairedWalletData = pairingData.metadata;
      //     pairingData.accountIds.forEach(id => {
      //       if (pairedAccounts.indexOf(id) == -1) pairedAccounts.push(id);
      //     });
      //   });
    } else {
      //use loaded data for initialization + connection
      await hashconnect.init(appMetadata, saveData.privateKey);
      await hashconnect.connect(saveData.topic, saveData.pairedWalletData);
    }
  };

  return (
    <div className="grid grid-cols-[0_auto] lg:grid-cols-[auto_550px] h-screen w-screen">
      <div className="bg-[url(./images/banner.jpg)] bg-cover"></div>
      <div className="flex flex-col justify-center items-center bg-blue text-white text-center">
        <div className="border-2 border-white h-14 w-14 mb-4"></div>
        <p className="font-bold text-7xl mb-14">Veot</p>
        <p className="text-sm mb-44">
          A decentralised polling platform <br /> built upon the Hedera
          Hashgraph
        </p>
        <button
          type="button"
          onClick={connect}
          className="bg-gold hover:bg-dgold font-medium py-5 px-12 rounded-3xl mb-10"
        >
          Connect to HashPack Wallet
        </button>
        <div className="flex justify-center">
          <div className="border-2 h-4 w-4 mr-6"></div>
          <div className="border-2 h-4 w-4"></div>
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;
