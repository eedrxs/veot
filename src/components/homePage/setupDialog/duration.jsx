import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";

const Duration = ({ isTimed, setIsTimed, duration, setDuration }) => {
  return (
    <React.Fragment>
      <h1 className="text-white text-3xl font-medium mt-6 mb-4">Duration</h1>
      <div className="flex flex-col relative w-90p m-auto font-medium flex-grow">
        <div className="flex flex-row justify-between mb-4">
          <button
            className={
              "py-4 w-46p border border-white border-opacity-40 rounded-2xl font-medium" +
              (isTimed
                ? " bg-white bg-opacity-20 text-white text-opacity-90"
                : " text-white text-opacity-50")
            }
            onClick={() => setIsTimed(true)}
          >
            Timed
          </button>
          <button
            className={
              "py-4 w-49p border border-white border-opacity-40 rounded-2xl font-medium" +
              (!isTimed
                ? " bg-white bg-opacity-20 text-white text-opacity-90"
                : " text-white text-opacity-50")
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
            <label htmlFor="start" className="text-white text-opacity-70 mb-2">
              Start
            </label>
            <StartTime time={duration} setTime={setDuration} />
            <label htmlFor="end" className="text-white text-opacity-70 mb-2">
              End
            </label>
            <EndTime time={duration} setTime={setDuration} />
          </React.Fragment>
        ) : (
          <FontAwesomeIcon
            icon={faInfinity}
            className="text-white text-opacity-20 mx-auto mt-8 text-9xl"
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
