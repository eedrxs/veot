import React, { useState, useEffect } from "react";
import { Contract, ContractClient } from "../libs/contraption";
import { POLLFACTORY_ID, POLLFACTORY_ABI } from "../contracts/abi/abi";
import { Banner, Polls, ViewPoll, SetupDialog } from "./homePage/index";

const HomePage = ({ signer }) => {
  const pollFactory = new Contract(POLLFACTORY_ID, POLLFACTORY_ABI);
  const pollFactoryClient = new ContractClient(POLLFACTORY_ID, POLLFACTORY_ABI);
  const [setupDialog, toggleSetupDialog] = useState(false);
  const [pollCount, setPollCount] = useState(null);
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    (async () => {
      if (pollCount != null) return;
      let { 0: pollCount_ } = await pollFactoryClient.getPollCount.call()({
        gas: 1000000,
        maxQueryPay: 0.95,
      });
      let { 0: polls_ } = await pollFactoryClient.fetchPolls.call([
        pollCount_,
        4,
      ])({
        gas: 1000000,
        maxQueryPay: 1.25,
      });
      console.log(polls_);
      setPolls(polls_);
      setPollCount(pollCount_);
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     if (!pollCount) return;
  //     let { 0: polls_ } = await pollFactoryClient.fetchPolls.call([
  //       pollCount,
  //       4,
  //     ])({
  //       gas: 1000000,
  //       maxQueryPay: 0.95,
  //     });
  //     console.log(polls_);
  //     setPolls(polls_);
  //   })();
  // }, [polls, pollCount, pollFactoryClient]);

  return (
    <React.Fragment>
      {setupDialog ? (
        <SetupDialog
          toggleSetupDialog={toggleSetupDialog}
          signer={signer}
          pollFactory={pollFactory}
        />
      ) : null}
      <div className="grid md:grid-rows-3 h-screen w-screen font-sans">
        <Banner pollCount={pollCount} />
        <div id="poll-section" className="row-span-2 grid grid-cols-7">
          <Polls toggleSetupDialog={toggleSetupDialog} polls={polls} />
          <ViewPoll />
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
