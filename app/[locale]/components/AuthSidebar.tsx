/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import HmIcon from "@/public/icons/HmIcon";
import OponIcon from "@/public/icons/OponIcon";
import PodcastIcon from "@/public/icons/PodcastIcon";
import ShopBagIcon from "@/public/icons/ShopBagIcon";
// import ShopIcon from "@/public/icons/ShopIcon";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
// import {  } from "next/router";
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useQuizStore } from "@/store/useQuizStore";
import { Check, ChevronDown } from "lucide-react";
const links = [
    {
        icon: <HmIcon />,
        name: "Home",
        href: "/dashboard"
    },
    {
        icon: <OponIcon />,
        name: "Opon.ai",
        href: "/opon"
    },
    {
        icon: <ShopBagIcon />,
        name: "Shop",
        href: "/shop"
    },
    {
        icon: <PodcastIcon />,
        name: "Podcast",
        href: "/podcast"
    }
];

const AuthSidebar = () => {
    const params = useParams();
    const locale = params.locale as string;
    const router = useRouter()
    const [isTestMenuOpen, setIsTestMenuOpen] = useState(false)
      const {
    language,
    setLanguage,
    level,
    setLevel,
    subject,
    setSubject,
    questionCount,
    setQuestionCount,
    timer,
    setTimer,
    selectedQuestionType,
    setSelectedQuestionType,
    selectedAccountType,
    setSelectedAccountType,
    accumulatedAmounts,
  } = useQuizStore()

  // Local state for UI components
  const [mode, setMode] = useState<"ibeere" | "timer">("ibeere")
  const [value, setValue] = useState<string>("")
  const [applySelection, setApplySelection] = useState(false)
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [isPremium, setIsPremium] = useState(false)
  const [walletEnabled, setWalletEnabled] = useState(true)
  const [premiumDialogOpen, setPremiumDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<"1month" | "1year" | null>(null)
  const [walletDialogOpen, setWalletDialogOpen] = useState(false)
  const [depositDialogOpen, setDepositDialogOpen] = useState(false)
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false)
  const [addBankDialogOpen, setAddBankDialogOpen] = useState(false)
  const [selectedBankAccount, setSelectedBankAccount] = useState<string | null>(null)
  const [scoreboardDialogOpen, setScoreboardDialogOpen] = useState(false)
  const [manageAccountDialogOpen, setManageAccountDialogOpen] = useState(false)
 

  const IBEERE_OPTIONS = ["1 - 25", "1 - 50", "1 - 100", "1 - 150"]
  const TIMER_OPTIONS = ["10", "15", "25", "30"]

  // Scoreboard data matching the image
  const scoreboardData: ScoreboardEntry[] = [
    {
      testCode: 1,
      testDate: "12 Jul 2025",
      questionsCompleted: 20,
      correctAnswers: 2,
      cashReward: "NGN30",
      pointsReward: "",
    },
    {
      testCode: 2,
      testDate: "13 Nov 2025",
      questionsCompleted: 30,
      correctAnswers: 2,
      cashReward: "",
      pointsReward: "400PTS",
    },
    {
      testCode: 3,
      testDate: "12 Jul 2025",
      questionsCompleted: 20,
      correctAnswers: 2,
      cashReward: "NGN30",
      pointsReward: "",
    },
    {
      testCode: 4,
      testDate: "12 Jul 2025",
      questionsCompleted: 20,
      correctAnswers: 2,
      cashReward: "NGN30",
      pointsReward: "",
    },
    {
      testCode: 5,
      testDate: "13 Nov 2025",
      questionsCompleted: 30,
      correctAnswers: 2,
      cashReward: "",
      pointsReward: "400PTS",
    },
    // Add an entry with no rewards for testing
    {
      testCode: 6,
      testDate: "14 Dec 2025",
      questionsCompleted: 25,
      correctAnswers: 1,
      cashReward: "",
      pointsReward: "",
    },
  ];
  const [rewardFilter, setRewardFilter] = useState<RewardFilter>('cash');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter the data based on selected reward type
  const filteredData = scoreboardData.filter(entry => {
    switch (rewardFilter) {
      case 'cash':
        return entry.cashReward !== '';
      case 'points':
        return entry.pointsReward !== '';
      case 'none':
        return entry.cashReward === '' && entry.pointsReward === '';
      default:
        return entry.cashReward !== ''; // Default to cash
    }
  });

  // Calculate totals for the summary
  const totals = filteredData.reduce(
    (acc, entry) => {
      if (entry.cashReward) {
        const cashValue = parseInt(entry.cashReward.replace('NGN', ''));
        acc.totalCash += cashValue;
      }
      if (entry.pointsReward) {
        const pointsValue = parseInt(entry.pointsReward.replace('PTS', ''));
        acc.totalPoints += pointsValue;
      }
      return acc;
    },
    { totalCash: 0, totalPoints: 0 }
  );
// Define the scoreboard data type
interface ScoreboardEntry {
  testCode: number
  testDate: string
  questionsCompleted: number
  correctAnswers: number
  cashReward: string
  pointsReward: string
}

// Add this type for the filter
type RewardFilter = 'cash' | 'points' | 'none';
  const rewardOptions = [
    { value: 'none' as RewardFilter, label: 'None' },
    { value: 'cash' as RewardFilter, label: 'Cash' },
    { value: 'point' as RewardFilter, label: 'Point' },
  ];

  const getCurrentFilterLabel = () => {
    return rewardOptions.find(option => option.value === rewardFilter)?.label || 'Cash';
  };

  const handleModeSelect = (selectedMode: "ibeere" | "timer") => {
    if (applySelection) {
      setMode(selectedMode)
      setValue("") // reset second dropdown
      setIsModeDropdownOpen(false) // Close dropdown only when applySelection is checked
    }
    // If applySelection is false, do nothing - the selection won't be applied and dropdown stays open
  }

  const handleUpgradePremium = (plan: "1month" | "1year") => {
    setSelectedPlan(plan)
    setPremiumDialogOpen(true)
  }

  const confirmPremiumUpgrade = () => {
    if (selectedPlan) {
      console.log(`Processing payment for: ${selectedPlan}`)
      if (selectedPlan === "1month") {
        console.log("Processing payment: N6,000 for 1 month")
      } else {
        console.log("Processing payment: N60,000 for 1 year")
      }
      setIsPremium(true)
      setPremiumDialogOpen(false)
      setSelectedPlan(null)
    }
  }

  const toggleWallet = () => {
    setWalletDialogOpen(true)
  }

  const getPlanAmount = () => {
    return selectedPlan === "1month" ? "N6,000" : "N60,000"
  }

  const getPlanText = () => {
    return selectedPlan === "1month" ? "1 MONTH" : "1 YEAR"
  }

  const handleDeposit = () => {
    setWalletDialogOpen(false)
    setDepositDialogOpen(true)
  }

  const handleWithdraw = () => {
    setWalletDialogOpen(false)
    setWithdrawDialogOpen(true)
  }

  const handleAddBankAccount = () => {
    setWithdrawDialogOpen(false)
    setAddBankDialogOpen(true)
  }

  const closeAllDialogs = () => {
    setWalletDialogOpen(false)
    setDepositDialogOpen(false)
    setWithdrawDialogOpen(false)
    setPremiumDialogOpen(false)
    setAddBankDialogOpen(false)
    setScoreboardDialogOpen(false)
    setManageAccountDialogOpen(false)
    setSelectedBankAccount(null)
  }

  const handleBankAccountSelect = (account: string) => {
    setSelectedBankAccount(account)
  }

  // Back navigation functions
  const goBackToWalletFromDeposit = () => {
    setDepositDialogOpen(false)
    setWalletDialogOpen(true)
  }

  const goBackToWalletFromWithdraw = () => {
    setWithdrawDialogOpen(false)
    setSelectedBankAccount(null)
    setWalletDialogOpen(true)
  }

  const goBackToWithdrawFromAddBank = () => {
    setAddBankDialogOpen(false)
    setWithdrawDialogOpen(true)
  }

  const goBackToBankSelection = () => {
    setSelectedBankAccount(null)
  }
  const handlePlanSelect = (plan: "1month" | "1year") => {
    setSelectedPlan(plan);
    // Auto-open the premium dialog when a plan is selected
    setPremiumDialogOpen(true);
  };
  // Map question types to display names
  const getQuestionTypeDisplayName = (type: string) => {
    switch (type) {
      case "isori":
        return <span>General</span>
      case "owe":
        return <span>Proverbs</span>
      case "alo":
        return <span>Fairytale</span>
      default:
        return <span>General</span>
    }
  }

  // Get accumulated amount for display in wallet
  const getAccumulatedAmount = () => {
    const currentTypeAmounts = accumulatedAmounts[selectedQuestionType]
    if (selectedAccountType === "cash") {
      return `NGN ${currentTypeAmounts.cash.toLocaleString()}`
    } else {
      return `${currentTypeAmounts.points}pts`
    }
  }

  const languages = [
    { id: "yoruba", label: "Yoruba" },
    { id: "igbo", label: "Igbo" },
    { id: "hausa", label: "Hausa" },
  ]

  const levelOptions = {
    basic: [
      { id: "isori", label: "General" },
      { id: "owe", label: "Proverbs" },
      { id: "alo", label: "FolkTales" },
    ],
    intermediary: [
      { id: "isori", label: "General" },
      { id: "owe", label: "Proverbs" },
      { id: "alo", label: "FolkTales" },
    ],
    advanced: [
      { id: "isori", label: "General" },
      { id: "owe", label: "Proverbs" },
      { id: "alo", label: "FolkTales" },
    ],
  }

  const questionRanges = [
    { id: "1-25", label: "1 - 25" },
    { id: "1-50", label: "1 - 50" },
    { id: "1-100", label: "1 - 100" },
    { id: "1-150", label: "1 - 150" },
  ]

  const durations = [
    { id: "10", label: "10" },
    { id: "15", label: "15" },
    { id: "25", label: "25" },
    { id: "30", label: "30" },
  ]

  const testLevels = [
    { id: "basic", label: "Basic" },
    { id: "intermediary", label: "Intermediary" },
    { id: "advanced", label: "Advanced" },
  ]

  const getLabel = (items: any[], id: string | null) => {
    if (!id) return "N/A"
    return items.find((item) => item.id === id)?.label
  }

  const allLevelOptions = [...levelOptions.basic, ...levelOptions.intermediary, ...levelOptions.advanced]

  const handleApply = () => {
    if (language && level && subject && questionCount && timer) {
      setIsTestMenuOpen(false)
      console.log("[v0] Selections applied:", {
        language,
        level,
        subject,
        questionCount,
        timer,
      })
    }
  }

  const allSelected = language && level && subject && questionCount && timer

  // State to track which test level accordion is open
  const [openTestLevel, setOpenTestLevel] = useState<string>("")

  const handleTestLevelToggle = (levelId: string) => {
    // If clicking the same level that's already open, close it
    if (openTestLevel === levelId) {
      setOpenTestLevel("")
    } else {
      // Otherwise open the clicked level and set the level
      setOpenTestLevel(levelId)
      setLevel(levelId)
    }
  }

  const handleSubjectSelect = (levelId: string, subjectId: string) => {
    setLevel(levelId)
    setSubject(subjectId)
  }
    return (
        <div className=" w-40  translate-x-8 text-black">
            <div className="gap-2 flex flex-col">
                {links.map((link, id) => {
                    return (
                        <Link href={`/${locale}${link.href}`} key={id}>
                            <div className="flex items-center gap-2 py-2 hover:bg-gray-100 rounded">
                                <div className="h-6 w-6">
                                    {link.icon}
                                </div>
                                <p>{link.name}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <div className="mt-4 w-full relative">
                <button
                    onClick={() => setIsTestMenuOpen(!isTestMenuOpen)}


                    className="hover:bg-black hover:text-white border rounded-full h-10 w-full flex justify-center items-center bg-transparent" >
                    Start a Test
                </button>

          {isTestMenuOpen && (
            <div className="absolute top-10 left-0 h-[400px] overflow-auto z-50">
              {/* Main Card with Accordion */}
              <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden  w-80">
                <Accordion type="single" collapsible className="w-full">
                  {/* Language */}
                  <AccordionItem value="language" className="border-b border-border last:border-b-0">
                    <AccordionTrigger className="hover:no-underline py-3 px-6 hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-start justify-between w-full gap-2">
                        <span className="font-semibold text-foreground text-left">Language</span>
                        {language && (
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                            {getLabel(languages, language)}
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-2">
                      <div className="space-y-2">
                        {languages.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setLanguage(item.id)}
                            className={`w-full text-left border-t px-4 py-3 transition-all duration-200 flex 
                      dark:text-white text-black items-center justify-between hover:bg-muted/50 ${
                              language === item.id ? "bg-primary/10" : ""
                            }`}
                          >
                            <span className="font-medium">{item.label}</span>
                            {language === item.id && <Check size={18} />}
                          </button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Test Level with Nested Subjects - FIXED TOGGLE FUNCTIONALITY */}
                  <AccordionItem value="testLevel" className="border-b border-border last:border-b-0">
                    <AccordionTrigger className="hover:no-underline py-3 px-6 hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-start justify-between w-full gap-2">
                        <span className="font-semibold text-foreground text-left">Test Level</span>
                        {level && (
                          <span className="text-xs font-medium dark:text-white text-black px-2 py-1 rounded-md capitalize">
                            {testLevels.find((t) => t.id === level)?.label}
                            {subject && ` • ${getLabel(allLevelOptions, subject)}`}
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2">
                      <div className="space-y-2">
                        {testLevels.map((testLevel) => (
                          <div key={testLevel.id} className="border-b border-border/50 last:border-b-0">
                            {/* Test Level Header with Toggle */}
                            <button
                              onClick={() => handleTestLevelToggle(testLevel.id)}
                              className={`w-full text-left py-3 px-4 transition-all duration-200 flex items-center justify-between hover:bg-muted/30 ${
                                openTestLevel === testLevel.id ? "bg-muted/30" : ""
                              }`}
                            >
                              <div className="flex items-center dark:text-white text-black  justify-between w-full">
                                <span className={`font-medium text-sm ${level === testLevel.id ? "text-primary" : ""}`}>
                                  {testLevel.label}
                                </span>
                                <div className="flex items-center gap-2">
                                  {level === testLevel.id && <Check size={16} />}
                                  <ChevronDown 
                                    size={16} 
                                    className={`transition-transform duration-200 ${
                                      openTestLevel === testLevel.id ? "rotate-180" : ""
                                    }`}
                                  />
                                </div>
                              </div>
                            </button>

                            {/* Subjects for this level - Conditionally rendered */}
                            {openTestLevel === testLevel.id && (
                              <div className="pb-3 pt-1">
                                <div className="space-y-1">
                                  {levelOptions[testLevel.id as keyof typeof levelOptions]?.map((item) => (
                                    <button
                                      key={item.id}
                                      onClick={() => handleSubjectSelect(testLevel.id, item.id)}
                                      className={`w-full text-left px-6 py-2 text-sm dark:text-white text-black rounded transition-all duration-200 flex items-center justify-between hover:bg-muted/50 ${
                                        subject === item.id && level === testLevel.id 
                                          ? "bg-primary/10 text-primary" 
                                          : ""
                                      }`}
                                    >
                                      <span className="font-medium">{item.label}</span>
                                      {subject === item.id && level === testLevel.id && <Check size={16} />}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Questions Range */}
                  <AccordionItem value="range" className="border-b border-border last:border-b-0">
                    <AccordionTrigger className="hover:no-underline py-3 px-6 hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-start justify-between w-full gap-2">
                        <span className="font-semibold text-foreground text-left">Question Count</span>
                        {questionCount && (
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                            {questionCount}
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2">
                      <div className="space-y-2">
                        {questionRanges.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setQuestionCount(item.label)}
                            className={`w-full text-left px-6 py-2 border-t transition-all duration-200 flex 
                             dark:text-white text-black items-center justify-between hover:bg-muted/50 ${
                              questionCount === item.label ? "bg-primary/10" : ""
                            }`}
                          >
                            <span className="font-medium">{item.label}</span>
                            {questionCount === item.label && <Check size={18} />}
                          </button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Timer/Duration */}
                  <AccordionItem value="duration" className="border-b border-border last:border-b-0">
                    <AccordionTrigger className="hover:no-underline py-3 px-6 hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-start justify-between w-full gap-2">
                        <span className="font-semibold text-foreground text-left">Duration</span>
                        {timer && (
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                            {timer}
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2">
                      <div className="space-y-2">
                        {durations.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setTimer(item.label)}
                            className={`w-full text-left px-4 py-2 border-t transition-all duration-200 flex 
                             dark:text-white text-black items-center justify-between hover:bg-muted/50 font-medium ${
                              timer === item.label ? "bg-primary/5" : ""
                            }`}
                          >
                            <span>{item.label}</span>
                            {timer === item.label && <Check size={16} />}
                          </button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                {/* Apply Button */}
                <button
                  onClick={handleApply}
                  disabled={!allSelected}
                  className="w-full flex items-center px-6 border-t h-10 justify-center hover:text-white hover:bg-black text-black   font-semibold"
                >
                  Apply Selection
                </button>
              </div>
            </div>
          )}
            </div>
        </div>
    );
};

export default AuthSidebar;