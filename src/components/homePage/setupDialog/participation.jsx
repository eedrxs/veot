import React, { useState } from "react";
import { AccountId } from "@hashgraph/sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowUp,
  faSpinner,
  faCircleCheck,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";

const Participation = ({ isClosed, setIsClosed, addresses, setAddresses }) => {
  const [currentIcon, changeCurrentIcon] = useState({
    icon: addresses ? faCircleCheck : faFileArrowUp,
    spin: false,
  });

  return (
    <React.Fragment>
      <h1 className="text-white text-3xl font-medium mt-6 mb-4">
        Participation
      </h1>
      <div className="flex flex-col relative w-90p m-auto font-medium flex-grow">
        <div className="flex flex-row justify-between mb-4">
          <button
            className={
              "py-4 w-48p border border-white border-opacity-40 rounded-2xl font-medium" +
              (isClosed
                ? " bg-white bg-opacity-20 text-white text-opacity-90"
                : " text-white text-opacity-50")
            }
            onClick={() => setIsClosed(true)}
          >
            Closed
          </button>
          <button
            className={
              "py-4 w-47p border border-white border-opacity-40 rounded-2xl font-medium" +
              (!isClosed
                ? " bg-white bg-opacity-20 text-white text-opacity-90"
                : " text-white text-opacity-50")
            }
            onClick={() => setIsClosed(false)}
          >
            Open
          </button>
        </div>
        {isClosed ? (
          <div className="flex flex-col items-center justify-center h-48 px-4 bg-white bg-opacity-10 rounded-2xl text-white">
            <label
              htmlFor="upload"
              className="flex justify-between items-center w-55p py-3 px-2.3r bg-white bg-opacity-30 hover:bg-white hover:bg-opacity-25 rounded-xl text-lg"
            >
              <span>Upload</span>
              <FontAwesomeIcon
                icon={currentIcon.icon}
                spin={currentIcon.spin}
              />
            </label>
            <input
              className="hidden"
              type="file"
              id="upload"
              accept="application/json,.json"
              onChange={event => {
                changeCurrentIcon({ icon: faSpinner, spin: true });
                const reader = new FileReader();

                reader.onload = event => {
                  let [accountIds] = Object.values(
                    JSON.parse(event.target.result)
                  );
                  let accountAddresses = accountIds.map(
                    accountId =>
                      `0x${AccountId.fromString(accountId).toSolidityAddress()}`
                  );
                  setAddresses(accountAddresses);
                  changeCurrentIcon({ icon: faCircleCheck, spin: false });
                };

                if (event.target.files[0]) {
                  reader.readAsText(event.target.files[0]);
                  return;
                }

                changeCurrentIcon({ icon: faFileArrowUp, spin: false });
              }}
            />
            <p className="text-0.55r font-normal text-center px-10 mt-4">
              Upload a JSON document with a single array entry containing the
              account IDs of eligible participants
            </p>
          </div>
        ) : (
          <FontAwesomeIcon
            icon={faBoxOpen}
            className="text-white text-opacity-20 mx-auto mt-8 text-9xl"
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Participation;
