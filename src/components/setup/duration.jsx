import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
        <StartTime />
        <label htmlFor="end" className="text-white/70 mb-2">
          End
        </label>
        <EndTime />
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

const StartTime = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      minDate={new Date()}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      showTimeInput
      dateFormat="MMMM d, yyyy h:mm aa"
      className="w-full py-3 pl-4 pr-14 rounded-full mb-6"
      placeholderText="Choose when the poll begins"
      timeInputLabel="Time:"
    />
  );
};

const EndTime = () => {
  const [startDate, setStartDate] = useState(null);
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
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
