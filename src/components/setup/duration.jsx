import React from "react";
import ReactDatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Duration = () => {
  return (
    <React.Fragment>
      <h1 className="text-white text-3xl font-medium mt-6 mb-4">Duration</h1>
      <div className="flex flex-col relative w-[90%] m-auto font-medium grow">
        <div className="flex flex-row justify-between mb-4">
          <button className="py-4 w-[45%] border border-white/50 rounded-2xl text-white/50 font-medium">
            Timed
          </button>
          <button className="py-4 w-[50%] border border-white/50 rounded-2xl text-white/50 font-medium">
            Timeless
          </button>
        </div>
        <label htmlFor="start" className="text-white/70 mb-2">
          Start
        </label>
        <input
          type="text"
          name="start"
          id="start"
          className="w-full py-3 pl-4 pr-14 rounded-full mb-6"
        />
        <label htmlFor="end" className="text-white/70 mb-2">
          End
        </label>
        <input
          type="text"
          name="end"
          id="end"
          className="w-full py-3 pl-4 pr-14 rounded-full"
        />
        <button
          type="button"
          className="absolute bottom-0 w-full bg-gold py-4 rounded-2xl font-medium text-white text-xl"
        >
          Next
        </button>
      </div>
    </React.Fragment>
  );
};

export default Duration;
