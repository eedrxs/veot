import React, { useState, useEffect } from "react";
import { Contract, ContractClient } from "../libs/contraption";
import { POLLFACTORY_ID, POLLFACTORY_ABI } from "../contracts/abi/abi";
import { Banner, Polls, ViewPoll, SetupDialog } from "./homePage/index";

const HomePage = ({ signer, setJoinedPoll }) => {
  const pollFactory = new Contract(POLLFACTORY_ID, POLLFACTORY_ABI);
  const pollFactoryClient = new ContractClient(POLLFACTORY_ID, POLLFACTORY_ABI);
  const [setupDialog, toggleSetupDialog] = useState(false);
  const [pollCount, setPollCount] = useState(null);
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState([]);
  const [earliestPoll, setEarliestPoll] = useState();

  useEffect(() => {
    (async () => {
      if (pollCount != null) return;
      let { 0: pollCount_ } = await pollFactoryClient.getPollCount.call()({
        gas: 1000000,
        maxQueryPay: 1.5,
      });
      let { 0: polls_ } = await pollFactoryClient.fetchPolls.call([
        pollCount_,
        5,
      ])({
        gas: 1000000,
        maxQueryPay: 1.5,
      });
      setEarliestPoll(+polls_[polls_.length - 1][7]);
      setPolls(polls_);
      setPollCount(pollCount_);
    })();
  }, []);

  async function loadMore() {
    if (earliestPoll === 1) return;
    let quantity = earliestPoll > 5 ? 5 : Math.abs(0 - earliestPoll) - 1;
    let { 0: polls_ } = await pollFactoryClient.fetchPolls.call([
      earliestPoll - 1,
      quantity,
    ])({
      gas: 1000000,
      maxQueryPay: 1.5,
    });
    let _polls = [...polls].concat(polls_);
    setEarliestPoll(+polls_[polls_.length - 1][7]);
    setPolls(_polls);
  }

  async function getLatest() {
    let { 0: pollCount_ } = await pollFactoryClient.getPollCount.call()({
      gas: 1000000,
      maxQueryPay: 1.5,
    });
    if (+pollCount_ > +pollCount) {
      setPollCount(pollCount_);
      let { 0: polls_ } = await pollFactoryClient.fetchPolls.call([
        pollCount_,
        pollCount_ - pollCount,
      ])({
        gas: 1000000,
        maxQueryPay: 1.5,
      });
      let _polls = [...polls_, ...polls];
      setPolls(_polls);
    }
  }

  return (
    <React.Fragment>
      {setupDialog ? (
        <SetupDialog
          toggleSetupDialog={toggleSetupDialog}
          signer={signer}
          pollFactory={pollFactory}
          getLatest={getLatest}
        />
      ) : null}
      <div className="grid md:grid-rows-3 h-screen w-screen font-sans">
        <Banner pollCount={pollCount} />
        <div id="poll-section" className="row-span-2 grid grid-cols-7">
          <Polls
            toggleSetupDialog={toggleSetupDialog}
            polls={polls}
            setSelectedPoll={setSelectedPoll}
            getLatest={getLatest}
            loadMore={loadMore}
          />
          <ViewPoll
            pollFactoryClient={pollFactoryClient}
            selectedPoll={selectedPoll}
            setSelectedPoll={setSelectedPoll}
            setJoinedPoll={setJoinedPoll}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
