import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import {
  TitleDesc,
  TypeOptions,
  Duration,
  Participation,
  FinishSetup,
} from "./setupDialog/index";

const SetupDialog = ({ toggleSetupDialog, signer, pollFactory, getLatest }) => {
  const [page, setPage] = useState(1);
  const [isBasic, setIsBasic] = useState(true);
  const [isTimed, setIsTimed] = useState(true);
  const [isClosed, setIsClosed] = useState(true);
  const [titleDesc, setTitleDesc] = useState({
    title: "",
    description: "",
  });
  const [categories, setCategories] = useState([
    { id: null, textContent: "", options: [] },
  ]);
  const [duration, setDuration] = useState({ start: null, end: null });
  const [addresses, setAddresses] = useState(null);

  const handleAddOption = (option, categoryId) => {
    let c = [...categories];
    c[categoryId].options.push({ id: null, textContent: option });
    setCategories(c);
  };

  const handleRemoveOption = (optionId, categoryId) => {
    let c = [...categories];
    c[categoryId].options.splice(optionId, 1);
    setCategories(c);
  };

  const handleAddCategory = category => {
    let c = [...categories];
    c.push({ id: null, textContent: category, options: [] });
    setCategories(c);
  };

  const handleRemoveCategory = categoryId => {
    let c = [...categories];
    c.splice(categoryId, 1);
    setCategories(c);
  };

  const handleFinishSetup = async () => {
    const titleDesc_ = Object.values(titleDesc);
    const startEnd_ = isTimed
      ? Object.values(duration).map(date =>
          parseInt(new Date(date).getTime() / 1000.0)
        )
      : [];
    const addresses_ = isClosed ? [...addresses] : [];
    let size = { width: 0, depth: 0 };
    const categories_ = categories.map((category, index) => {
      size.width += 1;
      let depth = 0;
      category.id = index;
      category.options = category.options.map((option, index) => {
        depth += 1;
        option.id = index;
        return Object.values(option);
      });
      if (depth > size.depth) size.depth = depth;
      return Object.values(category);
    });
    await pollFactory.createPoll.call([
      titleDesc_,
      startEnd_,
      categories_,
      addresses_,
    ])({
      signer: signer,
      gas: 1000000,
      maxTxFee: Math.ceil((size.width * size.depth * 20) / 100),
    });
    getLatest();
    toggleSetupDialog(false);
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-llblue bg-opacity-50 backdrop-filter backdrop-blur-6px z-50">
      <div className="relative flex flex-col h-75p w-450px lg:w-470px bg-blue rounded-3xl pt-4 pb-8 px-6">
        <div
          className={
            "flex text-white text-opacity-70" +
            (page === 1 ? " justify-end" : " justify-between")
          }
        >
          {page === 1 ? null : (
            <button
              className="hover:underline"
              onClick={() => page - 1 && setPage(page - 1)}
            >
              prev
            </button>
          )}
          <FontAwesomeIcon
            icon={faXmarkCircle}
            className="text-2xl hover:text-white hover:text-opacity-50"
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
            "absolute bottom-8 w-90p py-4 rounded-2xl font-medium text-white text-xl" +
            (page !== 5
              ? " bg-gold hover:bg-dgold"
              : " bg-green hover:bg-lgreen")
          }
          onClick={
            page !== 5
              ? () => page < 5 && setPage(page + 1)
              : () => handleFinishSetup()
          }
        >
          {page !== 5 ? "Next" : "Set up Poll"}
        </button>
      </div>
    </div>
  );
};

export default SetupDialog;
