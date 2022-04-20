import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const PollPage = () => {
  return (
    <main className="grid md:grid-cols-[auto_500px] grid-cols-[auto_300px] h-screen w-screen">
      <div className="bg-llblue/[0.5] backdrop-blur-lg">
        <div className="bg-blue h-full w-11/12 mx-auto">
          <div className="mb-4 mt-14">
            <FontAwesomeIcon
              icon={solid("arrow-left")}
              className="text-white bg-white/50 h-5 w-5 p-2 rounded-full"
            />
          </div>
          <div className="grid grid-cols-[auto_12rem] items-end text-white">
            <p className="font-medium text-2xl md:text-3xl">
              SUG Elections 2022
            </p>
            <p className="text-right font-medium text-lg md:text-xl">#5478</p>
          </div>
          <div className="flex flex-row justify-between w-full h-2">
            <div className="bg-white"></div>
            <div className="bg-white"></div>
            <div className="bg-white"></div>
            <div className="bg-white"></div>
            <div className="bg-white"></div>
            <div className="bg-white"></div>
          </div>
        </div>
      </div>
      <div className="bg-green"></div>
    </main>
  );
};

export default PollPage;
