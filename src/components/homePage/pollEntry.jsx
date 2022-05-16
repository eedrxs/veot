import React from "react";

const PollEntry = ({
  titleDesc,
  startEnd,
  creationTime,
  status,
  votes,
  isOpen,
  pollId,
  poll,
  setSelectedPoll,
}) => {
  return (
    <div
      className={"w-full py-2" + (pollId % 2 ? " bg-llblue" : "  bg-lblue")}
      onClick={() => setSelectedPoll(poll)}
    >
      <div className="grid grid-cols-pollentry relative items-center md:gap-x-14 h-20 w-11/12 mx-auto">
        <div className="text-white text-opacity-50">
          <p className="font-medium text-lg md:text-2xl">{pollId}</p>
          <p className="text-xs"></p>
        </div>
        <div className="text-white">
          <div className="md:text-lg font-medium">
            {titleDesc[0]}
            <span
              className={
                "font-normal inline-block rounded-full ml-4 text-xs py-1 px-2 relative bottom-1" +
                (status === "0"
                  ? "  bg-gold"
                  : status === "1"
                  ? "  bg-lgreen"
                  : "  bg-red-500")
              }
            >
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
            </span>
          </div>
          <div className="text-xs md:text-sm">{titleDesc[1]}</div>
          <div className="text-xs text-white text-opacity-70 italic mt-1">
            <span className="inline-block mr-2">
              {isOpen ? "Open" : "Closed"}
            </span>
            <span className="inline-block">
              {startEnd.length ? "Timed" : "Timeless"}
            </span>
          </div>
        </div>
        <div className="font-medium absolute bottom-0 right-0 text-sm text-white text-opacity-70">
          {votes} votes
        </div>
      </div>
    </div>
  );
};

export default PollEntry;
