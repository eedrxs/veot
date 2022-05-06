import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const TypeOptions = () => {
  return (
    <React.Fragment>
      <h1 className="text-white text-3xl font-medium mt-6 mb-4">
        Type and Options
      </h1>
      <div className="flex flex-col relative w-[90%] m-auto font-medium grow">
        <div className="flex flex-row justify-between mb-2">
          <button className="py-4 w-[45%] border border-white/50 rounded-2xl text-white/50 font-medium">
            Basic
          </button>
          <button className="py-4 w-[50%] border border-white/50 rounded-2xl text-white/50 font-medium">
            Categorised
          </button>
        </div>
        <div className="overflow-y-auto h-64 pb-1">
          <div className="px-4 py-4 border-white/50 border rounded-2xl">
            <div className="relative pr-5">
              <textarea
                className="block w-full resize-none bg-transparent text-white focus:outline-none"
                readOnly
                contentEditable={false}
              >
                Vice President
              </textarea>
              <FontAwesomeIcon
                icon={solid("xmark")}
                className="text-lg text-white absolute right-0 top-0"
              />
            </div>

            <div className="relative mt-4 w-full py-4 pl-4 pr-14 rounded-full bg-white h-12">
              <FontAwesomeIcon
                icon={solid("minus-circle")}
                className="absolute top-2 right-2 text-red-500 text-3xl"
              />
            </div>
            <div className="relative mt-4">
              <input
                type="text"
                name="option"
                id="option"
                className="w-full py-3 pl-4 pr-14 rounded-full"
              />
              <FontAwesomeIcon
                icon={solid("plus-circle")}
                className="absolute top-2 right-2 text-green text-3xl"
              />
            </div>
          </div>
          <div className="relative mt-4">
            <input
              type="text"
              name="option"
              id="option"
              className="w-full py-3 pl-4 pr-14 rounded-full"
            />
            <FontAwesomeIcon
              icon={solid("plus-circle")}
              className="absolute top-2 right-2 text-green text-3xl"
            />
          </div>
        </div>
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

export default TypeOptions;
