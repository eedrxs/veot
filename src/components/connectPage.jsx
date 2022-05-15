import React from "react";
import { HashConnect } from "hashconnect";
// import { ApiSession } from "@buidlerlabs/hedera-strato-js";
// import { HashPackWallet } from "../../libs/hashconnect";

// let hashconnect;
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
  // async function connectToHashPack() {
  //   let wallet = await HashPackWallet.getConnection(false);

  //   if (!wallet) {
  //     // No wallet-session could be recovered. Start a fresh one
  //     wallet = await HashPackWallet.newConnection({
  //       appMetadata: appMetadata,
  //       debug: false,
  //       networkName: "testnet"
  //     });
  //   }
  //   // window["hedera"] = wallet;
  //   // const { session } = await ApiSession.default({
  //   //   wallet: { type: "Browser" }
  //   // });
  //   // const { session } = await ApiSession.default({
  //   //   wallet: {
  //   //     type: "Sdk",
  //   //     sdk: {
  //   //       operatorId: sessionTemp.wallet.account.id,
  //   //       operatorKey:
  //   //         "302e020100300506032b657004220420f063a8dafe7385c574dfd050bdd4f571b649ad51e157cba3bdc4591e093dbbd3"
  //   //     }
  //   //   }
  //   // });

  //   // const hashconnect = new HashConnect();
  //   // let initData = await hashconnect.init(appMetadata);
  //   // let privateKey = initData.privKey;
  //   // console.log(privateKey);

  //   // setAccount({
  //   //   id: sessionTemp.wallet.account.id,
  //   //   privateKey:
  //   //     "302e020100300506032b657004220420f063a8dafe7385c574dfd050bdd4f571b649ad51e157cba3bdc4591e093dbbd3"
  //   // });
  //   // setSession(session);
  // }

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
