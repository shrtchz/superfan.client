import React from "react";
import { useRouter } from "next/navigation";
import GetStartedSelection from "./GetStartedSelection"; // Adjust import path as needed
import { useQuizStore } from "@/store/useQuizStore";

const LanguageSelection = ({ onNext, onBack }: { onNext: () => void; onBack?: () => void }) => {
  const router = useRouter();
  const { setLanguage } = useQuizStore();
  const languages = [
    "Yoruba",
    "Igbo", 
    "Hausa",
    "Tiv",
    "Ibibio",
    "Efik"
  ];

  return (
    <GetStartedSelection
      onNext={onNext}
      fields={languages} // Use 'fields' instead of 'options'
      titleKey="GetStarted"
      nextKey="BankDetails"
      skipKey="BankDetails"
      onBack={onBack || (() => router.back())}
      showNavigation={true}
      showSkip={true}
      ongetStartedSelect={(lang) => {
        setLanguage(lang);
      }}
    />
  );
};

export default LanguageSelection;