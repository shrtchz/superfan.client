/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

// Enhanced GetStartedSelection component
interface Props {
  onNext?: () => void;
  ongetStartedSelect?: (getStarted: string) => void;
  showNavigation?: boolean;
  showSkip?: boolean;
  fields?: string[];
  titleKey?: string;
  nextKey?: string;
  skipKey?: string;
  onBack?: () => void;
  renderItem?: (item: string, isSelected: boolean) => React.ReactNode;
  requireSelection?: boolean;
}

const GetStartedSelection: React.FC<Props> = ({
  onNext,
  onBack,
  ongetStartedSelect,
  showNavigation = true,
  showSkip = true,
  fields,
  titleKey = "GetStarted",
  nextKey = "BankDetails",
  skipKey = "BankDetails",
  renderItem,
  requireSelection = true,
}) => {
  const t = useTranslations(titleKey);
  const bt = useTranslations(nextKey);
  const st = useTranslations(skipKey);
  const router = useRouter();
  const params = useParams()
  const locale = params.locale as string
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const displayItems = fields;

  const handleSelect = (val: string) => {
    setSelectedItem(val);
    
    if (ongetStartedSelect) {
      ongetStartedSelect(val);
    }
  };

  const handleNext = () => {
    if (requireSelection && !selectedItem) {
      alert("Please select an option before proceeding");
      return;
    }

    // Check if selected item should route to dashboard
    if (selectedItem && (selectedItem.toLowerCase() === "none" || selectedItem.toLowerCase() === "point")) {
      router.push(`/${locale}/dashboard`);
      return;
    }
    
    if (onNext) {
      onNext();
    }
  };

  const handleSkip = () => {
    // Skip should always work regardless of selection
    if (onNext) {
      onNext();
    }
  };

  // Next button requires selection when requireSelection is true
  const isNextDisabled = requireSelection && !selectedItem;

  return (
    <div className="flex flex-col items-center justify-center px-6 w-full">
      <div className="h-[85%] flex-col flex items-center w-full">
        <div className="flex-col flex items-center w-full h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center h-max mb-8 gap-3 pt-4 w-full max-w-lg px-2">
            <button onClick={onBack} className="cursor-pointer text-black">
              <ArrowLeft />
            </button>
            <h2 className=" font-semibold text-center text-gray-800">
              {t("title")}
            </h2>
          </div>

          {/* Grid container */}
          <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-lg h-[390px] overflow-scroll px-2 pb-10">
            {displayItems?.map((item) => (
              renderItem ? (
                <div key={item} onClick={() => handleSelect(item)} className="cursor-pointer ">
                  {renderItem(item, selectedItem === item)}
                </div>
              ) : (
                <button
                  key={item}
                  onClick={() => handleSelect(item)}
                  className={`w-32 h-40 border-2 text-base rounded-lg font-medium transition-colors ${
                    selectedItem === item
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-900 hover:border-gray-800 hover:bg-black hover:text-white"
                  }`}
                >
                  {item}
                </button>
              )
            ))}
          </div>
        </div>
      </div>

      {showNavigation && (
        <>
          <hr className="w-full border-gray-300"/>
          <div className="w-full flex justify-center h-[10%]">
            <div className="w-[50%] 2xl:w-[30%] flex justify-center items-center">
              <div className="flex gap-4 mt-6 w-[60%] mx-auto justify-center">
                {/* Next Button - Disabled when selection is required but not made */}
                <button
                  onClick={handleNext}
                  disabled={isNextDisabled}
                  className={`flex-1 py-2 rounded-md ${
                    isNextDisabled
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {bt("next")}
                </button>

                {/* Skip Button - Always shown and always enabled */}
                <button
                  onClick={handleSkip}
                  className="flex-1 py-2 rounded-md border bg-white text-black border-gray-300 hover:bg-gray-50"
                >
                  {st("skip")}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GetStartedSelection;