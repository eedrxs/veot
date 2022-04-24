import React from "react";

const ConnectPage = () => {
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
