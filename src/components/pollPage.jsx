import React, { useState, useEffect } from "react";
import { Contract, ContractClient } from "../libs/contraption";
import { POLL_ABI } from "../contracts/abi/abi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const PollPage = ({ details, address, setJoinedPoll, signer }) => {
  const pollContract = new Contract(address, POLL_ABI);
  const pollContractClient = new ContractClient(address, POLL_ABI);
  const [totalVotes, setTotalVotes] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [votes, setVotes] = useState([]);

  let titleDesc = details[0];
  let startEnd = details[1];
  let creationTime = details[2];
  let status = details[3];
  // let votes = details[4];
  let isOpen = details[5];
  let isEligible = details[6];
  let pollId = details[7];

  useEffect(() => {
    (async () => {
      let { 0: totalVotes, 1: categories } =
        await pollContractClient.getOptionsAndVotes.call()({
          gas: 1000000,
          maxQueryPay: 0.75,
        });
      setVotes(new Array(categories.length));
      setTotalVotes(totalVotes);
      setCategories(categories);
    })();
  }, []);

  // function vote() {
  //   if ()
  // }

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
              <p className="font-medium text-2xl lg:text-3xl">{titleDesc[0]}</p>
              <p className="text-right font-medium text-lg lg:text-xl">
                #{pollId}
              </p>
            </div>
            <div className="flex flex-row justify-between w-full h-1 mt-2">
              {categories.map(category => (
                <div
                  key={category[0]}
                  className="bg-white w-13p rounded-full"
                  onClick={() => {
                    setCurrentPage(+category[0]);
                  }}
                ></div>
              ))}
            </div>
            <div className="bg-blue rounded-tl-2xl rounded-tr-2xl mt-3 pt-3 pb-12 lg:pb-14 flex-grow">
              {categories.length !== 0 ? (
                <div id="wrapper" className="w-95p mx-auto">
                  <div
                    id="category-bar"
                    className="flex flex-row justify-between items-center mb-2 lg:mb-4"
                  >
                    <p className="font-medium lg:text-xl text-white text-opacity-70">
                      {categories[currentPage][1]}
                    </p>
                    <div>
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="text-blue bg-white bg-opacity-50 hover:bg-opacity-40 lg:h-5 lg:w-5 p-2 rounded-full"
                        onClick={() => {
                          if (currentPage === 0) return;
                          setCurrentPage(currentPage - 1);
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-blue bg-white bg-opacity-50 hover:bg-opacity-40 lg:h-5 lg:w-5 p-2 ml-2 rounded-full"
                        onClick={() => {
                          if (currentPage === categories.length - 1) return;
                          setCurrentPage(currentPage + 1);
                        }}
                      />
                    </div>
                  </div>
                  {categories[currentPage][2].map((option, index) => (
                    <div
                      key={index}
                      className={
                        "relative px-4 py-6 mb-4 lg:py-10 border-white border-opacity-50 hover:bg-white hover:bg-opacity-5 text-white text-opacity-70 lg:text-lg border rounded-2xl" +
                        (votes[currentPage] === +option[0]
                          ? " bg-white bg-opacity-10"
                          : "")
                      }
                      onClick={() => {
                        let votes_ = [...votes];
                        votes_[currentPage] = +option[0];
                        setVotes(votes_);
                      }}
                    >
                      {option[2]} {/* Option text */}
                      <span className="block absolute top-1 right-4 text-white text-opacity-70 text-sm lg:text-lg">
                        {option[1]} {/* Votes */}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div
          id="footer"
          className="flex justify-between items-center fixed bottom-0 px-3 lg:px-5 w-full lg:w-65p h-12 lg:h-14 bg-lblue text-white"
        >
          <div>
            {totalVotes} <i>total votes</i>
          </div>
          <button
            type="button"
            className="bg-green rounded-xl py-2 px-28 h-75p font-medium"
            disabled={votes.some(categoryVote => categoryVote === undefined)}
            onClick={async () => {
              await pollContract.vote.call([votes])({
                signer: signer,
                gas: 1000000,
                maxTxFee: 0.75,
              });
            }}
          >
            Vote
          </button>
        </div>
      </div>
      <div className="fixed top-0 right-0 bg-blue h-full w-35p hidden lg:block text-white text-3xl">
        Hello World!
      </div>
    </main>
  );
};

export default PollPage;
