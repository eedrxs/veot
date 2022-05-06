import React from "react";

const ViewPoll = () => {
  return (
    <div
      id="right-side"
      className="md:col-span-2 col-span-3 flex flex-col justify-center items-center bg-blue"
    >
      <div className="w-10/12 md:w-8/12">
        <input
          type="text"
          className="py-4 px-8 w-full rounded-2xl focus:outline-none border-gold border-2 placeholder:text-gold mb-4"
          placeholder="Enter Poll ID"
        ></input>
        <button
          type="button"
          className="py-4 px-8 w-full bg-gold hover:bg-dgold text-white rounded-2xl"
        >
          View Poll
        </button>
      </div>
    </div>
  );
};

export default ViewPoll;
