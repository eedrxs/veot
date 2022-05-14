import React from "react";
import { TopBar, PollEntry } from "./index";

const Polls = ({ toggleSetupDialog }) => {
  return (
    <div
      id="left-side"
      className="relative pt-12 md:col-span-5 col-span-4 bg-green"
    >
      <TopBar toggleSetupDialog={toggleSetupDialog} />
      <PollEntry />
    </div>
  );
};

export default Polls;
