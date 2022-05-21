import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmarkCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import AddOption from "./addOption";

const Category = ({
  category,
  categoryId,
  isBasic,
  onAddOption,
  onRemoveOption,
  onRemoveCategory,
  scroll,
}) => {
  return (
    <div
      className={
        "rounded-2xl" +
        (isBasic ? "" : " pt-4 px-4 mb-4 border-white border-opacity-50 border")
      }
    >
      {isBasic ? null : (
        <div className="relative pr-5">
          <textarea
            className="block w-full resize-none bg-transparent text-white focus:outline-none"
            defaultValue={category.textContent}
            contentEditable={false}
          />
          <FontAwesomeIcon
            icon={faXmarkCircle}
            className="text-lg text-white text-opacity-70 hover:text-white hover:text-opacity-50 absolute right-0 top-0"
            onClick={() => onRemoveCategory(categoryId)}
          />
        </div>
      )}

      {category.options.map((option, index) => (
        <div className="relative mb-5" key={index}>
          <input
            type="text"
            value={option.textContent}
            readOnly
            className="w-full py-3 pl-4 pr-14 focus:outline-none rounded-full"
          />
          <FontAwesomeIcon
            icon={faMinusCircle}
            className="absolute top-2 right-2 text-red-500 hover:text-red-600 shadow-redbutton text-3xl rounded-full"
            onClick={() => {
              onRemoveOption(index, categoryId);
              scroll.current.topScroll -= 68;
            }}
          />
        </div>
      ))}
      <AddOption
        categoryId={categoryId}
        onAddOption={onAddOption}
        scroll={scroll}
      />
    </div>
  );
};

export default Category;
