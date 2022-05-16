import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

const TopBar = ({ toggleSetupDialog, getLatest }) => {
  return (
    <div id="top-bar" className="absolute top-0 left-0 bg-ablue h-12 w-full">
      <div className="flex flex-row justify-between items-center w-11/12 h-full mx-auto">
        <div className="h-8 w-8 text-center pt-1 bg-lblue hover:bg-llblue rounded-full text-white">
          <FontAwesomeIcon icon={faRotateLeft} onClick={() => getLatest()} />
        </div>
        <button
          type="button"
          onClick={() => toggleSetupDialog(true)}
          className="bg-green hover:bg-lgreen text-white py-1 px-4 rounded-full"
        >
          Create Poll
        </button>
      </div>
    </div>
  );
};

export default TopBar;
