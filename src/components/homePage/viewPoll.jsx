import React, { useRef } from "react";
import { AccountId } from "@hashgraph/sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ViewPoll = ({
  pollFactoryClient,
  selectedPoll,
  setSelectedPoll,
  setJoinedPoll,
}) => {
  const input = useRef();

  let titleDesc = selectedPoll[0];
  let startEnd = selectedPoll[1];
  let creationTime = selectedPoll[2];
  let status = selectedPoll[3];
  let votes = selectedPoll[4];
  let isOpen = selectedPoll[5];
  let isEligible = selectedPoll[6];
  let pollId = selectedPoll[7];

  async function viewPoll() {
    let { 0: poll } = await pollFactoryClient.queryPoll.call([
      input.current.value,
    ])({
      gas: 1000000,
      maxQueryPay: 0.75,
    });
    setSelectedPoll(poll);
  }

  async function joinPoll(pollId) {
    let { 0: address } = await pollFactoryClient.getPollAddress.call([pollId])({
      gas: 1000000,
      maxQueryPay: 0.75,
    });
    setJoinedPoll({
      address: AccountId.fromSolidityAddress(address).toString(),
      details: selectedPoll,
    });
  }

  return (
    <div
      id="right-side"
      className="md:col-span-2 col-span-3 flex flex-col justify-center items-center bg-blue"
    >
      {selectedPoll.length ? (
        <div className="w-11/12 md:w-9/12 text-white text-opacity-50 text-sm">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-blue bg-white bg-opacity-50 hover:bg-opacity-30 h-4 w-4 p-2 mb-10 rounded-full"
            onClick={() => setSelectedPoll([])}
          />
          <h1 className="font-medium text-3xl mb-1">{titleDesc[0]}</h1>
          <h3 className="font-medium text-lg mb-8">{titleDesc[1]}</h3>
          <p>Poll ID: {pollId}</p>
          <p>Participation: {isOpen ? "Open" : "Closed"}</p>
          {!startEnd.length ? (
            <p>Duration: Timeless</p>
          ) : (
            <React.Fragment>
              <p>Starts: {new Date(startEnd[0] * 1000).toDateString()}</p>
              <p>Ends: {new Date(startEnd[1] * 1000).toDateString()}</p>
            </React.Fragment>
          )}
          <p>Votes: {votes}</p>
          <p>Created: {new Date(creationTime * 1000).toDateString()}</p>
          <button
            type="button"
            disabled={!isEligible}
            className={
              "py-4 px-8 mt-10 w-full text-white rounded-2xl" +
              (isEligible
                ? " bg-gold hover:bg-dgold"
                : " bg-red-500 hover:bg-red-600")
            }
            onClick={() => joinPoll(pollId)}
          >
            {isEligible ? "Join Poll" : "Not Eligible"}
          </button>
        </div>
      ) : (
        <div className="w-10/12 md:w-8/12">
          <input
            type="text"
            ref={input}
            className="py-4 px-8 w-full text-center rounded-2xl focus:outline-none border-gold border-2 placeholder:gold mb-4"
            placeholder="Enter Poll ID"
          ></input>
          <button
            type="button"
            className="py-4 px-8 w-full bg-gold hover:bg-dgold text-white rounded-2xl"
            onClick={() => viewPoll()}
          >
            View Poll
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewPoll;
