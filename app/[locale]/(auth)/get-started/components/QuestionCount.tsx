import React from "react";
import { useRouter } from "next/navigation";
import GetStartedSelection from "./GetStartedSelection"; // Adjust import path as needed
import { useQuizStore } from "@/store/useQuizStore";

const QuestionCount = ({ onNext, onBack }: { onNext: () => void; onBack?: () => void }) => {
  const router = useRouter();
  const { setQuestionCount } = useQuizStore();
  const languages = [
    "1 - 25",
    "1 - 50", 
    "1 - 100",
    "1 - 200",
    "1 - 400",
    "1 - 1000"
  ];

  return (
    <GetStartedSelection
      onNext={onNext}
      fields={languages} // Use 'fields' instead of 'options'
      titleKey="QuestionCounter"
      nextKey="BankDetails"
      skipKey="BankDetails"
      onBack={onBack || (() => router.back())}
      showNavigation={true}
      showSkip={true}
      ongetStartedSelect={(count) => {
        setQuestionCount(count);
      }}
    />
    
  );
};

export default QuestionCount;