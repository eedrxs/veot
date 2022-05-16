import React, { useState, useEffect } from "react";
import { Contract, ContractClient } from "../libs/contraption";
import { POLL_ABI } from "../contracts/abi/abi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Chart, BarElement } from "chart.js";
Chart.register(BarElement);

const PollPage = ({ details, address, setJoinedPoll, signer }) => {
  const pollContract = new Contract(address, POLL_ABI);
  const pollContractClient = new ContractClient(address, POLL_ABI);
  const [totalVotes, setTotalVotes] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [votes, setVotes] = useState([]);
  const [chartData, setChartData] = useState({});
  var colorArray = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];

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
      setVotes(new Array(categories.length).fill(undefined));
      setTotalVotes(totalVotes);
      setCategories(categories);
    })();
  }, []);

  function completedSelection() {
    return votes.some(categoryVote => categoryVote === undefined);
  }

  return (
    <main className="h-screen w-screen fixed top-0 left-0">
      <div
        id="wrapper"
        className="flex flex-col relative overflow-y-hidden min-h-full w-full lg:w-65p"
      >
        <div
          style={{ backdropFilter: "blur(14)" }}
          className="flex flex-col bg-llblue bg-opacity-50 backdrop-blur-lg h-full flex-grow pt-14"
        >
          <div className="flex flex-col min-h-full w-11/12 flex-grow mx-auto">
            <div className="mb-4">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-blue bg-white bg-opacity-50 hover:bg-opacity-40 h-5 w-5 p-2 rounded-full"
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
            <div className="flex flex-row gap-x-2 justify-between w-full h-1 mt-2">
              {categories.map(category => (
                <div
                  key={category[0]}
                  className="bg-white w-13p flex-grow hover:h-4 rounded-full"
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
                        "relative px-4 py-6 mb-4 lg:py-10 border-white border-opacity-50 hover:bg-white hover:bg-opacity-10 text-white text-opacity-70 lg:text-lg border rounded-2xl" +
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
            className={
              "rounded-xl py-2 px-28 h-75p font-medium" +
              (completedSelection() ? " bg-red-400" : " bg-green")
            }
            disabled={completedSelection()}
            onClick={async () => {
              try {
                await pollContract.vote.call([votes])({
                  signer: signer,
                  gas: 1000000,
                  maxTxFee: 0.75,
                });
              } catch (error) {
                console.log(error);
                alert("It seems you've already voted.");
              }

              let { 0: totalVotes, 1: currentVotes } =
                await pollContractClient.getCurrentVotes.call()({
                  gas: 1000000,
                  maxQueryPay: 0.75,
                });
              setTotalVotes(totalVotes);
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
