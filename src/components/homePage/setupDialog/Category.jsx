import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import AddOption from "./addOption";

const Category = ({
  category,
  categoryId,
  isBasic,
  onAddOption,
  onRemoveOption,
  onRemoveCategory
}) => {
  return (
    <div
      className={
        "rounded-2xl" +
        (isBasic ? "" : " pt-4 px-4 mb-4 border-white/50 border")
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
            icon={solid("xmark-circle")}
            className="text-lg text-white/70 absolute right-0 top-0"
            onClick={() => onRemoveCategory(categoryId)}
          />
        </div>
      )}

      {category.options.map((option, index) => (
        <div className="relative mb-5" key={index}>
          <input
            type="text"
            value={option}
            readOnly
            className="w-full py-3 pl-4 pr-14 focus:outline-0 rounded-full"
          />
          <FontAwesomeIcon
            icon={solid("minus-circle")}
            className="absolute top-2 right-2 text-red-500 text-3xl"
            onClick={() => onRemoveOption(index, categoryId)}
          />
        </div>
      ))}
      <AddOption categoryId={categoryId} onAddOption={onAddOption} />
    </div>
  );
};

export default Category;
