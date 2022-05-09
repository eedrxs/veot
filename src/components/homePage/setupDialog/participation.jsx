import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Participation = ({ isClosed, setIsClosed }) => {
  return (
    <React.Fragment>
      <h1 className="text-white text-3xl font-medium mt-6 mb-4">
        Participation
      </h1>
      <div className="flex flex-col relative w-[90%] m-auto font-medium grow">
        <div className="flex flex-row justify-between mb-4">
          <button
            className={
              "py-4 w-[48%] border border-white/40 rounded-2xl font-medium" +
              (isClosed ? " bg-white/20 text-white/90" : " text-white/50")
            }
            onClick={() => setIsClosed(true)}
          >
            Closed
          </button>
          <button
            className={
              "py-4 w-[47%] border border-white/40 rounded-2xl font-medium" +
              (!isClosed ? " bg-white/20 text-white/90" : " text-white/50")
            }
            onClick={() => setIsClosed(false)}
          >
            Open
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-48 px-4 bg-white/10 rounded-2xl text-white">
          <label
            htmlFor="upload"
            className="flex justify-between items-center w-[55%] py-3 px-[2.3rem] bg-white/30 hover:bg-white/25 rounded-xl text-lg"
          >
            <span>Upload</span>
            <FontAwesomeIcon icon={solid("file-arrow-up")} />
          </label>
          <input
            className="hidden"
            type="file"
            id="upload"
            accept="application/json,.json"
          />
          <p className="text-[0.55rem] font-normal text-center px-10 mt-4">
            Upload a JSON document with a single array entry containing the
            account IDs of eligible participants
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Participation;
