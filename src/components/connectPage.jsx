import React, { useEffect } from "react";
import { ApiSession } from "@buidlerlabs/hedera-strato-js";
import { HashPackWallet } from "../../libs/hashconnect";

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

const ConnectPage = ({ setSession }) => {
  async function connectToHashPack() {
    let wallet = await HashPackWallet.getConnection(false);

    if (!wallet) {
      // No wallet-session could be recovered. Start a fresh one
      wallet = await HashPackWallet.newConnection({
        appMetadata: appMetadata,
        debug: false,
        networkName: "testnet"
      });
    }
    window["hedera"] = wallet;
    const { session } = await ApiSession.default({
      wallet: { type: "Browser" }
    });
    setSession(session);
  }

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
