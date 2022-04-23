import React from "react";

const TitleDesc = () => {
  return (
    <React.Fragment>
      <h1 className="text-white text-3xl font-medium mt-6 mb-5">
        Title and Description
      </h1>
      <div className="flex flex-col relative w-[90%] m-auto font-medium grow">
        <label htmlFor="title" className="text-white/70 mb-2">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="rounded-2xl p-3 mb-6"
        />
        <label htmlFor="description" className="text-white/70 mb-2">
          Description <i>(optional)</i>
        </label>
        <textarea
          name="description"
          id="description"
          className="rounded-2xl p-3 h-30 mb-4 resize-none"
          cols="30"
          rows="5"
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

export default TitleDesc;
