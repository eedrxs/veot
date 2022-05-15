import React, { useState, useEffect } from "react";
import { Contract, ContractClient } from "../libs/contraption";
import { POLL_ABI } from "../contracts/abi/abi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const PollPage = ({ joinedPoll, setJoinedPoll }) => {
  const pollFactory = new Contract(joinedPoll, POLL_ABI);
  const pollFactoryClient = new ContractClient(joinedPoll, POLL_ABI);
  const [optionsVotes, setOptionsVotes] = useState([]);

  useEffect(() => {
    (async () => {
      let { 0: optionsVotes } =
        await pollFactoryClient.getOptionsAndVotes.call()({
          gas: 1000000,
          maxQueryPay: 0.75,
        });
    })();
    console.log(optionsVotes);
    // setOptionsVotes()
  }, []);

  return (
    <main className="h-screen w-screen fixed top-0 left-0">
      <div
        id="wrapper"
        className="flex flex-col relative overflow-y-hidden min-h-full w-full lg:w-65p"
      >
        <div className="flex flex-col bg-llblue bg-opacity-50 backdrop-blur-lg h-full flex-grow pt-14">
          <div className="flex flex-col min-h-full w-11/12 flex-grow mx-auto">
            <div className="mb-4">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-blue bg-white bg-opacity-50 h-5 w-5 p-2 rounded-full"
                onClick={() => setJoinedPoll(null)}
              />
            </div>
            <div
              id="poll-header"
              className="grid grid-cols-pollpage items-end text-blue"
            >
              <p className="font-medium text-2xl lg:text-3xl">
                SUG Elections 2022
              </p>
              <p className="text-right font-medium text-lg lg:text-xl">#5478</p>
            </div>
            <div className="flex flex-row justify-between w-full h-1 mt-2">
              <div className="bg-white w-13p rounded-full"></div>
              <div className="bg-white w-13p rounded-full"></div>
              <div className="bg-white w-13p rounded-full"></div>
              <div className="bg-white w-13p rounded-full"></div>
              <div className="bg-white w-13p rounded-full"></div>
              <div className="bg-white w-13p rounded-full"></div>
            </div>
            <div className="bg-blue rounded-tl-2xl rounded-tr-2xl mt-3 pt-3 pb-12 lg:pb-14 flex-grow">
              <div id="wrapper" className="w-95p mx-auto">
                <div
                  id="category-bar"
                  className="flex flex-row justify-between items-center mb-2 lg:mb-4"
                >
                  <p className="font-medium lg:text-xl text-white text-opacity-70">
                    President
                  </p>
                  <div>
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="text-blue bg-white bg-opacity-50 lg:h-5 lg:w-5 p-2 rounded-full"
                    />
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-blue bg-white bg-opacity-50 lg:h-5 lg:w-5 p-2 ml-2 rounded-full"
                    />
                  </div>
                </div>
                <div className="relative px-4 py-6 mb-4 lg:py-10 border-white border-opacity-50 text-white text-opacity-70 lg:text-lg border rounded-2xl">
                  Jonathan Onyebuchi
                  <span className="block absolute top-1 right-4 text-white text-opacity-70 text-sm lg:text-lg">
                    453
                  </span>
                </div>
                <div className="relative px-4 py-6 mb-4 lg:py-10 border-white border-opacity-50 text-white text-opacity-70 lg:text-lg border rounded-2xl">
                  Suleiman Bakare
                  <span className="block absolute top-1 right-4 text-white text-opacity-70 text-sm lg:text-lg">
                    1221
                  </span>
                </div>
                <div className="relative px-4 py-6 mb-4 lg:py-10 border-white border-opacity-50 text-white text-opacity-70 lg:text-lg border rounded-2xl">
                  Bello Abubakar Danladi
                  <span className="block absolute top-1 right-4 text-white text-opacity-70 text-sm lg:text-lg">
                    249
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="footer"
          className="flex justify-between items-center fixed bottom-0 px-3 lg:px-5 w-full lg:w-65p h-12 lg:h-14 bg-lblue text-white"
        >
          <div>
            2,239 <i>total votes</i>
          </div>
          <div className="bg-green rounded-xl py-2 px-28 h-75p font-medium">
            Vote
          </div>
        </div>
      </div>
      <div className="fixed top-0 right-0 bg-blue h-full w-35p hidden lg:block text-white text-3xl">
        Hello World!
      </div>
    </main>
  );
};

export default PollPage;
