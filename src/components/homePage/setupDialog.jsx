import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {
  TitleDesc,
  TypeOptions,
  Duration,
  Participation,
  FinishSetup
} from "./setupDialog/index";

const SetupDialog = ({ toggleSetupDialog, pollFactory }) => {
  const [page, setPage] = useState(1);
  const [isBasic, setIsBasic] = useState(true);
  const [isTimed, setIsTimed] = useState(true);
  const [isClosed, setIsClosed] = useState(true);
  const [titleDesc, setTitleDesc] = useState({
    title: "",
    description: ""
  });
  const [categories, setCategories] = useState([
    { textContent: "", options: [] }
  ]);
  const [duration, setDuration] = useState({ start: new Date(), end: null });
  const [addresses, setAddresses] = useState(null);

  const handleAddOption = (option, categoryId) => {
    let c = [...categories];
    c[categoryId].options.push(option);
    setCategories(c);
  };

  const handleRemoveOption = (optionId, categoryId) => {
    let c = [...categories];
    c[categoryId].options.splice(optionId, 1);
    setCategories(c);
  };

  const handleAddCategory = category => {
    let c = [...categories];
    c.push({ textContent: category, options: [] });
    setCategories(c);
  };

  const handleRemoveCategory = categoryId => {
    let c = [...categories];
    c.splice(categoryId, 1);
    setCategories(c);
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-llblue/50 backdrop-blur-[6px] z-50">
      <div className="relative flex flex-col h-[75%] w-[450px] lg:w-[470px] bg-blue rounded-3xl pt-4 pb-8 px-6">
        <div
          className={
            "flex text-white/70" +
            (page === 1 ? " justify-end" : " justify-between")
          }
        >
          {page === 1 ? null : (
            <button
              className="hover:underline underline-offset-2"
              onClick={() => page - 1 && setPage(page - 1)}
            >
              prev
            </button>
          )}
          <FontAwesomeIcon
            icon={solid("xmark-circle")}
            className="text-2xl hover:text-white/50"
            onClick={() => toggleSetupDialog(false)}
          />
        </div>
        {(page => {
          switch (page) {
            case 1:
              return (
                <TitleDesc titleDesc={titleDesc} setTitleDesc={setTitleDesc} />
              );
            case 2:
              return (
                <TypeOptions
                  isBasic={isBasic}
                  setIsBasic={setIsBasic}
                  categories={categories}
                  setCategories={setCategories}
                  onAddOption={handleAddOption}
                  onRemoveOption={handleRemoveOption}
                  onAddCategory={handleAddCategory}
                  onRemoveCategory={handleRemoveCategory}
                />
              );
            case 3:
              return (
                <Duration
                  isTimed={isTimed}
                  setIsTimed={setIsTimed}
                  duration={duration}
                  setDuration={setDuration}
                />
              );
            case 4:
              return (
                <Participation
                  isClosed={isClosed}
                  setIsClosed={setIsClosed}
                  addresses={addresses}
                  setAddresses={setAddresses}
                />
              );
            case 5:
              return <FinishSetup />;
            default:
          }
        })(page)}
        <button
          type="button"
          className={
            "absolute bottom-8 w-[90%] py-4 rounded-2xl font-medium text-white text-xl" +
            (page !== 5
              ? " bg-gold hover:bg-dgold"
              : " bg-green hover:bg-lgreen")
          }
          onClick={page !== 5 ? () => page < 5 && setPage(page + 1) : null}
        >
          {page !== 5 ? "Next" : "Set up Poll"}
        </button>
      </div>
    </div>
  );
};

export default SetupDialog;
