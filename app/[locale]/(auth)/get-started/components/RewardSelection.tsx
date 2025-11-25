"use client";

import React from "react";
import GetStartedSelection from "./GetStartedSelection";
import { useQuizStore } from "@/store/useQuizStore";

const RewardSelection = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const rewards = ["Point", "Cash","None"];
  const { setReward } = useQuizStore();
  const handleRewardSelect = (reward: string) => {
    console.log("Selected reward:", reward);
    // Additional logic for CASH selection if needed
  };

  return (
    <GetStartedSelection
      onNext={onNext}
      onBack={onBack}
      // ongetStartedSelect={handleRewardSelect}
      ongetStartedSelect={(reward) => {
        setReward(reward);
      }}
      fields={rewards}
      titleKey="Reward"
      nextKey="BankDetails"
      skipKey="BankDetails"
      showNavigation={true} // Keep navigation visible for CASH selection
      showSkip={false}
      requireSelection={true} // Force user to select before proceeding
    />
  );
};

export default RewardSelection;