import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const AddCategory = ({ onAddCategory, scroll }) => {
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
        className="absolute flex top-2 right-2 text-green hover:text-lgreen shadow-greenbutton text-3xl rounded-full"
        onClick={() => {
          onAddCategory(input.current.value);
          input.current.value = "";
          setTimeout(() => (scroll.current.scrollTop += 1000), 50);
        }}
      >
        <FontAwesomeIcon icon={faPlusCircle} />
      </button>
    </div>
  );
};

export default AddCategory;
