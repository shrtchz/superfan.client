import React from "react";
import { useRouter } from "next/navigation";
import GetStartedSelection from "./GetStartedSelection"; // Adjust import path as needed
import { useQuizStore } from "@/store/useQuizStore";

const TimerCounter = ({ onNext, onBack }: { onNext: () => void; onBack?: () => void }) => {
  const router = useRouter();
  const { setTimer } = useQuizStore();
  const languages = [
    "Time Free!",
    "15 mins", 
    "30 mins",
    "45 mins",
    "60 mins",
    "90 mins"
  ];

  return (
    <GetStartedSelection
      onNext={onNext}
      fields={languages} // Use 'fields' instead of 'options'
      titleKey="TimerCounter"
      nextKey="BankDetails"
      skipKey="BankDetails"
      onBack={onBack || (() => router.back())}
      showNavigation={true}
      showSkip={true}
      ongetStartedSelect={(timer) => {
        setTimer(timer);
      }}
    />
  );
};

export default TimerCounter;