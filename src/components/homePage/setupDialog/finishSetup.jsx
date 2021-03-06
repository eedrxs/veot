import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const FinishSetup = () => {
  return (
    <React.Fragment>
      <h1 className="text-white text-3xl font-medium mt-6 mb-4">
        You're all set!
      </h1>
      <div className="flex flex-col relative w-90p m-auto text-white font-normal flex-grow">
        <div className="flex items-center mb-2 mt-8">
          <FontAwesomeIcon
            icon={solid("check-circle")}
            className="text-lgreen mr-3"
          />
          <p>Title and Description</p>
        </div>
        <div className="flex items-center mb-2">
          <FontAwesomeIcon
            icon={solid("check-circle")}
            className="text-lgreen mr-3"
          />
          <p>Type and Options</p>
        </div>
        <div className="flex items-center mb-2">
          <FontAwesomeIcon
            icon={solid("check-circle")}
            className="text-lgreen mr-3"
          />
          <p>Duration</p>
        </div>
        <div className="flex items-center mb-2">
          <FontAwesomeIcon
            icon={solid("check-circle")}
            className="text-lgreen mr-3"
          />
          <p>Participation</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FinishSetup;
