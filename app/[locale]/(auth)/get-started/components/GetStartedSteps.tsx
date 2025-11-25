"use client";

import React, { useState } from "react";
import LanguageSelection from "./Laguage";
import BankDetails from "./BankDetails";
import YorSelection from "./YorSelection";
import RewardSelection from "./RewardSelection";
import FundWallet from "./FundWallet";
import LevelSelection from "./LevelSelection";
import QuestionCount from "./QuestionCount";
import TimerCounter from "./TimerCount";


const GetStartedSteps = () => {
  const [step, setStep] = useState(1);

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  return (
    <div className="w-full flex-1 h-full flex justify-center px-6 pt-6">
      {step === 1 && <LanguageSelection onNext={next} />}
      {step === 2 && <YorSelection onBack={back}  onNext={next} />}
      {step===3 &&<LevelSelection onBack={back} onNext={next}/>}
      {step===4 && <QuestionCount onBack={back} onNext={next}/>}
      {step ===5 && <TimerCounter onBack={back} onNext={next}/>}
      {step === 6 && <RewardSelection onBack={back}  onNext={next} />}
      {step === 7 && <BankDetails onNext={next} onBack={back} />}
      {step === 8 && <FundWallet  onBack={back} />}
    </div>
  );
};

export default GetStartedSteps;
