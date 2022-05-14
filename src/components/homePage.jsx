import React, { useState, useEffect } from "react";
import { Contract } from "../libs/contraption";
import { POLLFACTORY_ID, POLLFACTORY_ABI } from "../contracts/abi/abi";
import { Banner, Polls, ViewPoll, SetupDialog } from "./homePage/index";

const HomePage = ({ signer }) => {
  const pollFactory = new Contract(POLLFACTORY_ID, POLLFACTORY_ABI);
  const [setupDialog, toggleSetupDialog] = useState(false);
  const [pollCount, setPollCount] = useState(null);
  const [polls, setPolls] = useState();

  // useEffect(() => {
  //   if (pollCount) return;
  //   let pollCount_ = pollFactory.getPollCount.call()({
  //     signer: signer,
  //     gas: 1000000,
  //     queryPay: 0.75,
  //   });
  //   setPollCount(pollCount_);
  // });

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
          <Polls toggleSetupDialog={toggleSetupDialog} />
          <ViewPoll />
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
