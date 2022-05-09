import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const AddCategory = ({ onAddCategory }) => {
  const input = useRef();
  const button = useRef();

  return (
    <div className="relative mt-4">
      <input
        type="text"
        ref={input}
        placeholder="Add category..."
        className="w-full py-3 pl-4 pr-14 rounded-full"
        onKeyDown={event => {
          if (event.key === "Enter") {
            event.preventDefault();
            button.current.click();
          }
        }}
      />
      <button
        ref={button}
        className="absolute flex top-2 right-2 text-green text-3xl"
        onClick={() => {
          onAddCategory(input.current.value);
          input.current.value = "";
        }}
      >
        <FontAwesomeIcon icon={solid("plus-circle")} />
      </button>
    </div>
  );
};

export default AddCategory;
