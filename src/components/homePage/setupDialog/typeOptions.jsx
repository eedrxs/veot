import React from "react";
import { Category } from "./Category";
import AddCategory from "./addCategory";

const TypeOptions = ({
  isBasic,
  setIsBasic,
  categories,
  setCategories,
  onAddOption,
  onRemoveOption,
  onAddCategory,
  onRemoveCategory,
}) => {
  return (
    <React.Fragment>
      <h1 className="text-white text-3xl font-medium mt-6 mb-4">
        Type and Options
      </h1>
      <div className="flex flex-col relative w-90p m-auto font-medium flex-grow">
        <div className="flex flex-row justify-between mb-2">
          <button
            className={
              "py-4 w-45p border border-white border-opacity-40 rounded-2xl font-medium" +
              (isBasic
                ? " bg-white bg-opacity-20 text-white text-opacity-90"
                : " text-white text-opacity-50")
            }
            onClick={() => {
              setCategories([{ textContent: "", options: [] }]);
              setIsBasic(true);
            }}
          >
            Basic
          </button>
          <button
            className={
              "py-4 w-50p border border-white border-opacity-40 rounded-2xl font-medium" +
              (!isBasic
                ? " bg-white bg-opacity-20 text-white text-opacity-90"
                : " text-white text-opacity-50")
            }
            onClick={() => {
              setCategories([]);
              setIsBasic(false);
            }}
          >
            Categorised
          </button>
        </div>
        <div className={"overflow-y-auto h-72 pb-1" + (isBasic ? " mt-4" : "")}>
          {categories.map((category, index) => (
            <Category
              category={category}
              categoryId={index}
              isBasic={isBasic}
              onAddOption={onAddOption}
              onRemoveOption={onRemoveOption}
              onRemoveCategory={onRemoveCategory}
              key={index}
            />
          ))}

          {isBasic ? null : <AddCategory onAddCategory={onAddCategory} />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TypeOptions;
