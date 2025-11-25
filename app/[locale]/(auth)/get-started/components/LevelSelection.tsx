"use client";

import React from "react";
import GetStartedSelection from "./GetStartedSelection";
import { useTranslations } from "next-intl";
import { useQuizStore } from "@/store/useQuizStore";

const LevelSelection = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const levels = ["Basic","Intermediary", "Advanced"];
  const { setLevel } = useQuizStore();
  // const r = useTranslations("TestLevel");

  const handleLevelSelect = (level: string) => {
    console.log("Selected level:", level);
    // You can add additional logic here
  };

  return (
    <GetStartedSelection
      onNext={onNext}
      onBack={onBack}
      fields={levels}
      titleKey="TestLevel"
      nextKey="BankDetails"
      skipKey="BankDetails"
      showNavigation={true}
      showSkip={true}
      // ongetStartedSelect={handleLevelSelect}
      ongetStartedSelect={(lvl) => {
        setLevel(lvl);
      }}
      />
  );
};

export default LevelSelection;