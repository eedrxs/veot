import React from "react";
import { TopBar, PollEntry } from "./index";

const Polls = ({ toggleSetupDialog, polls }) => {
  return (
    <div
      id="left-side"
      className="relative pt-12 md:col-span-5 col-span-4 bg-green"
    >
      <TopBar toggleSetupDialog={toggleSetupDialog} />
      {polls.map(poll => {
        let titleDesc = poll[0];
        let startEnd = poll[1];
        let creationTime = poll[2];
        let status = poll[3];
        let votes = poll[4];
        let isOpen = poll[5];
        let isEligible = poll[6];
        let pollId = poll[7];
        return (
          <PollEntry
            titleDesc={titleDesc}
            startEnd={startEnd}
            creationTime={creationTime * 1000}
            status={status}
            votes={votes}
            isOpen={isOpen}
            pollId={pollId}
            key={pollId}
          />
        );
      })}
    </div>
  );
};

export default Polls;
