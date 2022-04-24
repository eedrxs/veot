import React, { useEffect } from "react";

function log(stuff) {
  console.log(stuff);
}

let appMetadata = {
  name: "Veot",
  description: "A decentralised polling platform built on the Hedera Hashgraph",
  icon: "https://absolute.url/to/icon.png"
};

const saveData = {
  topic: "",
  pairingString: "",
  privateKey: "",
  pairedWalletData: null,
  pairedAccounts: []
};

const ConnectPage = ({ hashconnect, onAccount }) => {
  const connect = async () => {
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

    hashconnect.foundExtensionEvent.once(walletMetadata => {
      hashconnect.connectToLocalWallet(saveData.pairingString, walletMetadata);
      localStorage.setItem("veotData", saveData);
    });
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
