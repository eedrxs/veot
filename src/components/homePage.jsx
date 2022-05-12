import React, { useState, useEffect } from "react";
// import { AccountId } from "@hashgraph/sdk";
// import { hethers } from "@hashgraph/hethers";
import { Contract, createClient } from "../../libs/my-contraption-js";
import { POLLFACTORY_ID, POLLFACTORY_ABI } from "../../contracts/abi/abi";
import { Banner, Polls, ViewPoll, SetupDialog } from "./homePage/index";

const HomePage = ({ /*account,*/ signer }) => {
  const [setupDialog, toggleSetupDialog] = useState(false);
  // const pollFactory = new hethers.Contract(
  //   `0x${AccountId.fromString(POLLFACTORY_ID).toSolidityAddress()}`,
  //   POLLFACTORY_READABLE_ABI,
  //   signer
  // );
  // const [pollFactory, setPollFactory] = useState(null);
  const client = createClient(
    "0.0.34142789",
    "302e020100300506032b657004220420f063a8dafe7385c574dfd050bdd4f571b649ad51e157cba3bdc4591e093dbbd3"
  );
  const pollFactory = new Contract(POLLFACTORY_ID, POLLFACTORY_ABI);
  console.log(signer);

  // useEffect(() => {
  //   if (pollFactory) return;
  //   (async () => {
  //     const pollFactory = await session.getLiveContract({
  //       id: "0.0.34224232",
  //       abi: [
  //         "function createPoll(string[] titleDesc_, uint[] startEnd_, tuple(uint8 id, string text, tuple(uint8 id, string text)[] options)[] categories_, address[] participation_) external",
  //         "function queryPoll(uint pollId) public view returns(tuple(string[] titleDesc, uint[] startEnd, uint creationTime, uint8 pollStatus, uint votes, bool isOpen, bool isEligible))",
  //         "function fetchPolls(uint pollId, uint8 n) external view returns(tuple(string[] titleDesc, uint[] startEnd, uint creationTime, uint8 pollStatus, uint votes, bool isOpen, bool isEligible)[])",
  //         "function getPollCount() external view returns(uint)",
  //         "function getPollAddress(uint pollId) external view returns(address)",
  //         "function pollStatus(uint[] memory _startEnd) public view returns(uint8)",
  //         "function currentTime() public view returns(uint)",
  //         "event pollCreated(uint indexed pollCount)"
  //       ]
  //     });
  //     console.log(pollFactory);
  //     setPollFactory(pollFactory);
  //     const pollCount = await pollFactory.getPollCount();

  //     // console.log(`- Poll count: ${pollCount}`);
  //   })();
  // }, [session, pollFactory]);

  return (
    <React.Fragment>
      {setupDialog ? (
        <SetupDialog
          toggleSetupDialog={toggleSetupDialog}
          signer={signer}
          client={client}
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
