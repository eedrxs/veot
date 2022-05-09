import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const AddOption = ({ categoryId, onAddOption }) => {
  const input = useRef();
  const button = useRef();

  return (
    <div className="relative mb-5">
      <input
        type="text"
        ref={input}
        placeholder="Add option..."
        className="w-full py-3 pl-4 pr-14 rounded-full"
        onKeyDown={event => {
          if (event.key === "Enter") {
            event.preventDefault();
            button.current.click();
          }
        }}
      />
      <button
        className="absolute flex top-2 right-2 text-green hover:text-lgreen text-3xl"
        ref={button}
        onClick={() => {
          onAddOption(input.current.value, categoryId);
          input.current.value = "";
          input.current.focus();
        }}
      >
        <FontAwesomeIcon icon={solid("plus-circle")} />
      </button>
    </div>
  );
};

export default AddOption;
