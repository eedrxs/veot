import React, { useState, useEffect } from "react";
import { Contract, ContractClient } from "../libs/contraption";
import { POLL_ABI } from "../contracts/abi/abi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PollPage = ({ details, address, setJoinedPoll, signer }) => {
  const pollContract = new Contract(address, POLL_ABI);
  const pollContractClient = new ContractClient(address, POLL_ABI);
  const [totalVotes, setTotalVotes] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [votes, setVotes] = useState([]);
  const [dropdownOption, setDropdownOption] = useState("Stats");
  const [isDropdown, setIsDropdown] = useState(false);
  const colorArray = [
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
  // let isEligible = details[6];
  let pollId = details[7];

  useEffect(() => {
    (async () => {
      let { 0: totalVotes, 1: categories } =
        await pollContractClient.getOptionsAndVotes.call()({
          gas: 1000000,
          maxQueryPay: 1.5,
        });
      setVotes(new Array(categories.length).fill(undefined));
      setTotalVotes(totalVotes);
      setCategories(categories);
    })();
  }, []);

  function completedSelection() {
    return votes.some(categoryVote => categoryVote === undefined);
  }

  async function getCurrentVotes() {
    let { 0: totalVotes, 1: currentVotes } =
      await pollContractClient.getCurrentVotes.call()({
        gas: 1000000,
        maxQueryPay: 1.5,
      });
    let categories_ = JSON.parse(JSON.stringify(categories));
    for (let i = 0; i < currentVotes.length; i++) {
      for (let j = 0; j < currentVotes[i].length; j++) {
        categories_[i][2][j][1] = currentVotes[i][j];
      }
    }
    setCategories(categories_);
    setTotalVotes(totalVotes);
  }

  return (
    <main className="h-screen w-screen fixed top-0 left-0">
      <div
        id="wrapper"
        className="flex flex-col relative overflow-y-hidden min-h-full w-full lg:w-65p"
      >
        <div
          style={{ backdropFilter: "blur(14)" }}
          className="flex flex-col bg-llblue bg-opacity-50 backdrop-filter backdrop-blur-6px h-full flex-grow pt-14"
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
            <div className="relative w-full mt-2">
              <div className="absolute flex gap-x-2 w-full top-0 left-0">
                {categories.map(category => (
                  <div
                    key={category[0]}
                    className={
                      "bg-white w-13p flex-grow h-1 rounded-full" +
                      (currentPage === +category[0]
                        ? " bg-opacity-100"
                        : " bg-opacity-50")
                    }
                    onClick={() => {
                      setCurrentPage(+category[0]);
                    }}
                    onMouseOver={event => {
                      event.target.style.height = "6px";
                    }}
                    onMouseLeave={event => {
                      event.target.style.height = "4px";
                    }}
                  ></div>
                ))}
              </div>
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
                      {/* <small>{index + 1}.</small>  */}
                      {/* Option text */}
                      {option[2]}
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

              getCurrentVotes();
            }}
          >
            Vote
          </button>
        </div>
      </div>
      <div
        className={
          "fixed top-0 right-0 bg-blue h-full w-35p hidden lg:block text-white text-3xl" +
          (dropdownOption === "Details"
            ? ""
            : " lg:flex lg:flex-col justify-center ")
        }
      >
        {categories.length !== 0 ? (
          <React.Fragment>
            <div className="flex justify-between items-center text-2xl px-5 py-2 border-b-2 border-white border-opacity-20 text-white text-opacity-60">
              <p>{dropdownOption}</p>
              <button
                className={
                  "relative h-10 w-10 hover:bg-white hover:bg-opacity-20 rounded-full" +
                  (isDropdown ? " bg-white bg-opacity-20" : "")
                }
                onClick={() => setIsDropdown(!isDropdown)}
              >
                <FontAwesomeIcon icon={faEllipsisVertical} />
                {isDropdown ? (
                  <div className="absolute -bottom-20 right-0 bg-blue text-lg w-28 border border-white border-opacity-20">
                    <div
                      className="hover:bg-white hover:bg-opacity-20 py-1"
                      onClick={() => setDropdownOption("Stats")}
                    >
                      Stats
                    </div>
                    <div
                      className="hover:bg-white hover:bg-opacity-20 py-1"
                      onClick={() => setDropdownOption("Details")}
                    >
                      Details
                    </div>
                  </div>
                ) : null}
              </button>
            </div>
            {(key => {
              switch (key) {
                case "Stats":
                  return (
                    <div className="flex flex-col flex-grow justify-center">
                      <BarChart
                        category={categories[currentPage][1]}
                        options={categories[currentPage][2]}
                        colorArray={colorArray}
                      />
                    </div>
                  );

                case "Details":
                  return (
                    <div className="text-base px-5 mt-6 text-white text-opacity-70">
                      <p className="mb-2">
                        <b>Title:</b> {titleDesc[0]}
                      </p>
                      <p className="mb-2">
                        <b>Description:</b> {titleDesc[1]}
                      </p>
                      {!startEnd.length ? (
                        <p className="mb-2">
                          <b>Duration:</b> Timeless
                        </p>
                      ) : (
                        <React.Fragment>
                          <p className="mb-2">
                            <b>Starts:</b>{" "}
                            {new Date(startEnd[0] * 1000).toDateString() +
                              ",   " +
                              new Date(startEnd[0] * 1000).toLocaleTimeString()}
                          </p>
                          <p className="mb-2">
                            <b>Ends:</b>{" "}
                            {new Date(startEnd[1] * 1000).toDateString() +
                              ",   " +
                              new Date(startEnd[1] * 1000).toLocaleTimeString()}
                          </p>
                        </React.Fragment>
                      )}
                      <p className="mb-2">
                        <b>Participation:</b> {isOpen ? "Open" : "Closed"}
                      </p>
                      <p className="mb-2">
                        <b>Creation time:</b>{" "}
                        {new Date(creationTime * 1000).toDateString() +
                          ",   " +
                          new Date(creationTime * 1000).toLocaleTimeString()}
                      </p>
                      <p className="mb-2">
                        <b>Status:</b>{" "}
                        {(statusCode => {
                          switch (statusCode) {
                            case "0":
                              return "Upcoming";
                            case "1":
                              return "Ongoing";
                            case "2":
                              return "Ended";
                            default:
                              break;
                          }
                        })(status)}
                      </p>
                      <p className="mb-2">
                        <b>Poll ID:</b> {pollId}
                      </p>
                    </div>
                  );

                default:
                  break;
              }
            })(dropdownOption)}
          </React.Fragment>
        ) : null}
      </div>
    </main>
  );
};

export const BarChart = ({ category, options, colorArray }) => {
  let chartData = {
    labels: options.map(option => option[2]),
    datasets: [
      {
        label: "Votes", //options[1],
        data: options.map(option => option[1]),
        backgroundColor: options.map((option, index) => colorArray[index + 8]),
      },
    ],
  };

  let options_ = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: category,
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#ffffff4d",
          precision: 0,
        },
        grid: {
          color: "#ffffff14",
          borderColor: "#ffffff1a",
        },
      },
      x: {
        ticks: {
          color: "#ffffff4d",
          precision: 0,
        },
        grid: {
          color: "#ffffff14",
          borderColor: "#ffffff1a",
        },
      },
    },
  };

  return (
    <div className="w-95p mx-auto rounded-xl bg-white bg-opacity-5 px-2 py-4">
      <Bar data={chartData} options={options_} />
    </div>
  );
};

export default PollPage;
