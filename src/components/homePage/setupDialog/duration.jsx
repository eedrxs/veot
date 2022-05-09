import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Duration = ({ isTimed, setIsTimed, duration, setDuration }) => {
  return (
    <React.Fragment>
      <h1 className="text-white text-3xl font-medium mt-6 mb-4">Duration</h1>
      <div className="flex flex-col relative w-[90%] m-auto font-medium grow">
        <div className="flex flex-row justify-between mb-4">
          <button
            className={
              "py-4 w-[46%] border border-white/40 rounded-2xl font-medium" +
              (isTimed ? " bg-white/20 text-white/90" : " text-white/50")
            }
            onClick={() => setIsTimed(true)}
          >
            Timed
          </button>
          <button
            className={
              "py-4 w-[49%] border border-white/40 rounded-2xl font-medium" +
              (!isTimed ? " bg-white/20 text-white/90" : " text-white/50")
            }
            onClick={() => {
              setDuration({ start: null, end: null });
              setIsTimed(false);
            }}
          >
            Timeless
          </button>
        </div>
        {isTimed ? (
          <React.Fragment>
            <label htmlFor="start" className="text-white/70 mb-2">
              Start
            </label>
            <StartTime time={duration} setTime={setDuration} />
            <label htmlFor="end" className="text-white/70 mb-2">
              End
            </label>
            <EndTime time={duration} setTime={setDuration} />
          </React.Fragment>
        ) : (
          <FontAwesomeIcon
            icon={solid("infinity")}
            className="text-white/20 mx-auto mt-8 text-9xl"
          />
        )}
      </div>
    </React.Fragment>
  );
};

const StartTime = ({ time, setTime }) => {
  return (
    <DatePicker
      selected={time.start}
      onChange={date => setTime({ start: date, end: time.end })}
      minDate={new Date()}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      showTimeInput
      dateFormat="MMMM d, yyyy h:mm aa"
      className="w-full py-3 pl-4 pr-14 rounded-full mb-6"
      placeholderText="Choose when the poll starts"
      timeInputLabel="Time:"
    />
  );
};

const EndTime = ({ time, setTime }) => {
  return (
    <DatePicker
      selected={time.end}
      onChange={date => setTime({ start: time.start, end: date })}
      minDate={new Date()}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      showTimeInput
      dateFormat="MMMM d, yyyy h:mm aa"
      className="w-full py-3 pl-4 pr-14 rounded-full mb-6"
      placeholderText="Choose when the poll ends"
      timeInputLabel="Time:"
    />
  );
};

export default Duration;
