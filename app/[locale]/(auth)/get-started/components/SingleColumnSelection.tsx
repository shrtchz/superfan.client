"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

interface SingleColumnSelectionProps {
  onNext?: () => void;
  onBack?: () => void;
  options?: string[];
  title?: string;
  nextKey?: string;
  skipKey?: string;
  showSkip?: boolean;
  onSelection?: (selected: string) => void;
}

const SingleColumnSelection: React.FC<SingleColumnSelectionProps> = ({
  onNext,
  onBack,
  options = [],
  title = "What test level would you like?",
  nextKey = "BankDetails",
  skipKey = "BankDetails",
  showSkip = true,
  onSelection
}) => {
  const bt = useTranslations(nextKey);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    if (onSelection) {
      onSelection(option);
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 w-full">
      <div className="h-[80%] flex-col flex items-center w-full">
        <div className="flex-col flex items-center w-full h-full overflow-y-auto">
          <div className="relative flex items-center justify-center text-black h-max max-w-sm w-full mb-8 pt-4 gap-2">
            <button onClick={onBack} className="text-black cursor-pointer">
              <ArrowLeft />
            </button>
            <h2 className="font-semibold text-center text-gray-800">
              {title}
            </h2>
          </div>

          <div className="flex flex-col gap-4 mb-8 w-full max-w-md h-[300px] overflow-scroll px-2 pb-10">
            <div className="flex flexcol h-full w-full gap-4 justify-center items-center">
              {options.map((item, key) => (
                <button
                  key={key}
                  onClick={() => handleSelect(item)}
                  className={`w-1/3 h-40 px-3 border-2 rounded-lg font-semibold transition-colors flex items-center justify-center text-center ${
                    selectedOption === item
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-900 hover:border-gray-800 hover:bg-black hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="w-full" />

      <div className="w-full flex justify-center h-[15%]">
        <div className="w-[50%] 2xl:w-[30%] flex justify-center items-center">
          <div className="flex gap-4 mt-6 w-[60%] mx-auto justify-center">
            <button
              onClick={handleNext}
              className="flex-1 bg-black text-white py-2 rounded-md"
            >
              {bt("next")}
            </button>

            {showSkip && (
              <button className="hover:bg-gray-200 text-black flex-1 border py-2 rounded-md">
                {bt("skip")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleColumnSelection;