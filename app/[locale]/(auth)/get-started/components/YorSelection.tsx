import React from "react";
import GetStartedSelection from "./GetStartedSelection";
import { useQuizStore } from "@/store/useQuizStore";

const YorSelection = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const subjects = [
    { english: "General", yoruba: "Gbogbo" },
    { english: "Proverbs", yoruba: "Owe" },
    { english: "Folktale", yoruba: "Alo" },
    { english: "Sports", yoruba: "Idaraya" },
    { english: "Politics", yoruba: "Oselu" },
    { english: "Drama", yoruba: "Osere" }
  ];
  const { setSubject } = useQuizStore();
  const subjectNames = subjects.map(subject => subject.english);

  const renderSubjectItem = (item: string, isSelected: boolean) => {
    const subject = subjects.find(s => s.english === item);
    return (
      <button
        className={`w-32 h-40 border-2 rounded-lg font-semibold transition-colors flex flex-col items-center justify-center text-center ${
          isSelected
            ? "border-black bg-black text-white"
            : "border-gray-300 text-gray-900 hover:border-gray-800 hover:bg-black hover:text-white"
        }`}
      >
        <div className="  mt-2">{subject?.english}</div>
        <div className="font-normal whitespace-pre-line mt-1">{subject?.yoruba}</div>
      </button>
    );
  };

  return (
    <GetStartedSelection
      onNext={onNext}
      onBack={onBack}
      fields={subjectNames}
      titleKey="SubjectToTest"
      nextKey="BankDetails"
      skipKey="BankDetails"
      showNavigation={true}
      showSkip={true}
      renderItem={renderSubjectItem}
      ongetStartedSelect={(subject) => {
        setSubject(subject);
      }}
    />
  );
};

export default YorSelection;