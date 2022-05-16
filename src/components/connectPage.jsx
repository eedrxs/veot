import React from "react";
import { HashConnect } from "hashconnect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";

let saveData = {
  topic: "",
  pairingString: "",
  privateKey: "",
  pairedWalletData: null,
  pairedAccounts: [],
};
let appMetadata = {
  name: "Veot",
  description: "A decentralised polling platform built on the Hedera Hashgraph",
  icon: "https://www.hashpack.app/img/logo.svg",
};

const loadLocalData = () => {
  let foundData = localStorage.getItem("veotMetadata");

  if (foundData) {
    saveData = JSON.parse(foundData);
    return true;
  } else return false;
};

const ConnectPage = ({ setSigner }) => {
  async function connectToHashPack() {
    //create the hashconnect instance
    let hashconnect = new HashConnect();

    hashconnect.foundExtensionEvent.once(extensionMetadata => {
      hashconnect.connectToLocalWallet(
        saveData.pairingString,
        extensionMetadata
      );
    });

    hashconnect.pairingEvent.once(pairingData => {
      saveData.pairedWalletData = pairingData.metadata;
      pairingData.accountIds.forEach(id => {
        if (saveData.pairedAccounts.indexOf(id) === -1)
          saveData.pairedAccounts.push(id);
      });

      localStorage.setItem("veotMetadata", JSON.stringify(saveData));
      let provider = hashconnect.getProvider(
        "testnet",
        saveData.topic,
        saveData.pairedAccounts[0]
      );
      let signer = hashconnect.getSigner(provider);
      setSigner(signer);
    });

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
        false
      );

      //find any supported local wallets
      hashconnect.findLocalWallets();
    } else {
      //use loaded data for initialization + connection
      await hashconnect.init(appMetadata, saveData.privateKey);
      await hashconnect.connect(saveData.topic, saveData.pairedWalletData);
      let provider = hashconnect.getProvider(
        "testnet",
        saveData.topic,
        saveData.pairedAccounts[0]
      );
      let signer = hashconnect.getSigner(provider);
      setSigner(signer);
    }
  }

  return (
    <div className="grid grid-cols-connectpage-sm lg:grid-cols-connectpage h-screen w-screen">
      <div className="bg-banner bg-cover"></div>
      <div className="flex flex-col justify-center items-center bg-blue text-white text-center">
        <div className="border-2 border-white h-14 w-14 mb-4"></div>
        <p className="font-bold text-7xl mb-14">Veot</p>
        <p className="text-sm mb-44">
          A decentralised polling platform <br /> built upon the Hedera
          Hashgraph
        </p>
        <button
          type="button"
          onClick={connectToHashPack}
          className="bg-gold hover:bg-dgold shadow-goldbutton font-medium py-5 px-12 rounded-3xl mb-10"
        >
          Connect to HashPack Wallet
        </button>
        <div className="flex justify-center">
          <a
            href="https://twitter.com/eedrxs"
            target="_blank"
            rel="noreferrer"
            className="text-white text-lg text-opacity-50 hover:text-opacity-40 mr-6"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://github.com/eedrxs/veot"
            target="_blank"
            rel="noreferrer"
            className="text-white text-lg text-opacity-50 hover:text-opacity-40"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;
