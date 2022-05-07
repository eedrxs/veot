import React, { useState, useEffect } from "react";
import { Banner, Polls, ViewPoll, SetupDialog } from "./homePage/index";

const HomePage = ({ session }) => {
  const [setupDialog, toggleSetupDialog] = useState(false);
  const [pollFactory, setPollFactory] = useState(null);

  useEffect(() => {
    if (pollFactory) return;
    (async () => {
      const pollFactory = await session.getLiveContract({
        id: "0.0.34224232",
        abi: [
          "function createPoll(string[] titleDesc_, uint[] startEnd_, tuple(uint8 id, string text, tuple(uint8 id, string text)[] options)[] categories_, address[] participation_) external",
          "function queryPoll(uint pollId) public view returns(tuple(string[] titleDesc, uint[] startEnd, uint creationTime, uint8 pollStatus, uint votes, bool isOpen, bool isEligible))",
          "function fetchPolls(uint pollId, uint8 n) external view returns(tuple(string[] titleDesc, uint[] startEnd, uint creationTime, uint8 pollStatus, uint votes, bool isOpen, bool isEligible)[])",
          "function getPollCount() external view returns(uint)",
          "function getPollAddress(uint pollId) external view returns(address)",
          "function pollStatus(uint[] memory _startEnd) public view returns(uint8)",
          "function currentTime() public view returns(uint)",
          "event pollCreated(uint indexed pollCount)"
        ]
      });
      console.log(pollFactory);
      setPollFactory(pollFactory);
      // const pollCount = await pollFactory.getPollCount();
      // const liveContract = await session.getLiveContract({
      //   id: "0.0.30771282",
      //   abi: [
      //     "function get() view returns (uint256)",
      //     "function num() view returns (uint256)",
      //     "function set(uint256 _num)"
      //   ]
      // });
      // console.log(liveContract);
      // const bigNumberGetResult = await liveContract.get();

      // console.log(bigNumberGetResult.toNumber());
    })();
  }, [session, pollFactory]);

  return (
    <React.Fragment>
      {setupDialog ? (
        <SetupDialog
          toggleSetupDialog={toggleSetupDialog}
          pollFactory={pollFactory}
        />
      ) : null}
      <div className="grid md:grid-rows-3 h-screen w-screen font-sans">
        <Banner />
        <div id="poll-section" className="row-span-2 grid grid-cols-7">
          <Polls toggleSetupDialog={toggleSetupDialog} />
          <ViewPoll />
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
