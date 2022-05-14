import React from "react";

const PollEntry = () => {
  return (
    <div className="w-full py-2 bg-llblue">
      <div className="grid grid-cols-pollentry relative items-center md:gap-x-14 h-20 w-11/12 mx-auto">
        <div className="text-white text-opacity-50">
          <p className="font-medium text-lg md:text-2xl">2434</p>
          <p className="text-xs">2h ago</p>
        </div>
        <div className="text-white">
          <div className="md:text-lg font-medium">
            Who is the Goat?
            <span className="font-normal inline-block bg-lgreen rounded-full ml-4 text-xs py-1 px-2 relative bottom-1">
              Active
            </span>
          </div>
          <div className="text-xs md:text-sm">
            A poll to determine who the greatest footballer of all time
          </div>
          <div className="text-xs text-white text-opacity-70 italic mt-1">
            <span className="inline-block mr-2">Open</span>
            <span className="inline-block">Timeless</span>
          </div>
        </div>
        <div className="font-medium absolute bottom-0 right-0 text-sm text-white text-opacity-70">
          31 votes
        </div>
      </div>
    </div>
  );
};

export default PollEntry;
