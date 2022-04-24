import React, { useState, useEffect } from "react";
import getPolls from "./services/getPolls";
import { solid, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import PollPage from "./components/pollPage";
import SetupDialog from "./components/setupDialog";
import ConnectPage from "./components/connectPage";

const App = () => {
  return <ConnectPage />;
  // return <PollPage />;
  return (
    <React.Fragment>
      {/* <SetupDialog /> */}
      <main className="grid md:grid-rows-3 h-screen w-screen font-sans">
        <div
          id="banner"
          className="row-span-1 relative bg-[url(./images/banner.jpg)] bg-cover bg-[center_bottom_-13rem] md:bg-[center_bottom_-30rem]"
        >
          <div className="absolute bottom-8 right-8 text-right text-white">
            <p className="text-4xl md:text-5xl font-bold">2434</p>
            <p className="text-sm md:text-base">polls created</p>
          </div>
        </div>
        <div id="poll-section" className="row-span-2 grid grid-cols-7">
          <div
            id="left-side"
            className="relative pt-12 md:col-span-5 col-span-4 bg-green-500"
          >
            <div id="top-bar" className="absolute top-0 bg-ablue h-12 w-full">
              <div className="flex flex-row justify-between items-center w-11/12 h-full mx-auto">
                <div className="h-8 w-8 text-center pt-1 bg-lblue rounded-full text-white">
                  12
                </div>
                <button
                  type="button"
                  className="bg-green hover:bg-lgreen text-white py-1 px-4 rounded-full"
                >
                  Create Poll
                </button>
              </div>
              <div className="w-full py-2 bg-llblue">
                <div className="grid grid-cols-[70px_auto_60px] relative items-center md:gap-x-14 h-20 w-11/12 mx-auto">
                  <div className="text-white/[0.5]">
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
                      A poll to determine who the greatest footballer of all
                      time
                    </div>
                    <div className="text-xs text-white/[0.7] italic mt-1">
                      <span className="inline-block mr-2">Open</span>
                      <span className="inline-block">Timeless</span>
                    </div>
                  </div>
                  <div className="font-medium absolute bottom-0 right-0 text-sm text-white/[0.7]">
                    31 votes
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        </div>
      </main>
    </React.Fragment>
  );
};

export default App;
