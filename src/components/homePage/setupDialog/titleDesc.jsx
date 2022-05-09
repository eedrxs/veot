import React, { useRef } from "react";

const TitleDesc = ({ titleDesc, setTitleDesc }) => {
  const titleInput = useRef();
  const descInput = useRef();

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
          value={titleDesc.title}
          onChange={() => {
            setTitleDesc({
              title: titleInput.current.value,
              description: descInput.current.value
            });
          }}
          ref={titleInput}
          type="text"
          id="title"
          className="rounded-2xl p-3 mb-6"
        />
        <label htmlFor="description" className="text-white/70 mb-2">
          Description <i>(optional)</i>
        </label>
        <textarea
          value={titleDesc.description}
          onChange={() => {
            setTitleDesc({
              title: titleInput.current.value,
              description: descInput.current.value
            });
          }}
          ref={descInput}
          id="description"
          className="rounded-2xl p-3 h-30 mb-4 resize-none"
          // cols="30"
          rows="4"
        />
      </div>
    </React.Fragment>
  );
};

export default TitleDesc;
