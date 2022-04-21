import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const PollPage = () => {
  return (
    // grid md:grid-cols-[auto_500px] grid-cols-[auto_300px]
    <main className="h-screen w-screen">
      <div className="bg-llblue/50 backdrop-blur-lg h-full w-[100%] md:w-[65%]">
        <div className="flex flex-col h-full w-11/12 pt-14 mx-auto">
          <div className="mb-4">
            <FontAwesomeIcon
              icon={solid("arrow-left")}
              className="text-blue bg-white/50 h-5 w-5 p-2 rounded-full"
            />
          </div>
          <div
            id="poll-header"
            className="grid grid-cols-[auto_12rem] items-end text-blue"
          >
            <p className="font-medium text-2xl md:text-3xl">
              SUG Elections 2022
            </p>
            <p className="text-right font-medium text-lg md:text-xl">#5478</p>
          </div>
          <div className="flex flex-row justify-between w-full h-1 mt-2">
            <div className="bg-white w-[13%] rounded-full"></div>
            <div className="bg-white w-[13%] rounded-full"></div>
            <div className="bg-white w-[13%] rounded-full"></div>
            <div className="bg-white w-[13%] rounded-full"></div>
            <div className="bg-white w-[13%] rounded-full"></div>
            <div className="bg-white w-[13%] rounded-full"></div>
          </div>
          <div className="bg-blue rounded-tl-2xl rounded-tr-2xl mt-3 pt-3 pb-12 md:pb-14 grow">
            <div id="wrapper" className="w-[95%] mx-auto">
              <div
                id="category-bar"
                className="flex flex-row justify-between items-center mb-2 md:mb-4"
              >
                <p className="font-medium md:text-xl text-white/70">
                  President
                </p>
                <div>
                  <FontAwesomeIcon
                    icon={solid("arrow-left")}
                    className="text-blue bg-white/50 md:h-5 md:w-5 p-2 rounded-full"
                  />
                  <FontAwesomeIcon
                    icon={solid("arrow-right")}
                    className="text-blue bg-white/50 md:h-5 md:w-5 p-2 ml-2 rounded-full"
                  />
                </div>
              </div>
              <div className="relative px-4 py-6 mb-4 md:py-10 border-white/50 text-white/70 md:text-lg border rounded-2xl">
                Jonathan Onyebuchi
                <span className="block absolute top-1 right-4 text-white/70 text-sm md:text-lg">
                  453
                </span>
              </div>
              <div className="relative px-4 py-6 mb-4 md:py-10 border-white/50 text-white/70 md:text-lg border rounded-2xl">
                Suleiman Bakare
                <span className="block absolute top-1 right-4 text-white/70 text-sm md:text-lg">
                  1221
                </span>
              </div>
              <div className="relative px-4 py-6 mb-4 md:py-10 border-white/50 text-white/70 md:text-lg border rounded-2xl">
                Bello Abubakar Danladi
                <span className="block absolute top-1 right-4 text-white/70 text-sm md:text-lg">
                  249
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="footer"
        className="flex justify-between items-center fixed bottom-0 px-3 md:px-5 w-[100%] md:w-[65%] h-12 md:h-14 bg-lblue text-white"
      >
        <div>
          2,239 <i>total votes</i>
        </div>
        <div className="bg-green rounded-xl md:rounded-2xl py-2 px-12 md:px-28 h-[75%] font-medium">
          Vote
        </div>
      </div>
      <div className="fixed top-0 right-0 bg-blue h-full hidden md:block md:w-[35%]"></div>
    </main>
  );
};

export default PollPage;
