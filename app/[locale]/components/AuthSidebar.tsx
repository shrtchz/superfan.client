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
import { Button } from "@/components/ui/button";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      router.push(`/${locale}/dashboard`)
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
							<Link
								href={`/${locale}${link.href}`}
								key={id}
							>
								<div className="flex items-center dark:text-white dark:hover:text-black gap-2 py-2 hover:bg-gray-100 rounded">
									<div className="h-6 w-6">{link.icon}</div>
									<p>{link.name}</p>
								</div>
							</Link>
						);
					})}
				</div>
				{/* START TEST BUTTON */}
				<div className="mt-4 w-full relative">
					<Button
						variant="outline"
						className="w-full rounded-full"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						Start a Test
					</Button>

					{/* DROPDOWN MENU */}
					{isMenuOpen && (
						<div className="absolute top-12 left-0 z-50 bg-white dark:bg-black border rounded-2xl shadow w-72 max-h-[300px] overflow-auto p-0">
							<Accordion
								type="single"
								collapsible
							>
								{/* LANGUAGE */}
								<AccordionItem value="language">
									<AccordionTrigger className="px-6 py-3 hover:no-underline">
										<div className="flex flex-col items-start w-full">
											<span className="font-semibold">Language</span>
											{language && (
												<span className="text-xs text-primary">
													{getLabel(languages, language)}
												</span>
											)}
										</div>
									</AccordionTrigger>
									<AccordionContent>
										{languages.map((item) => (
											<button
												key={item.id}
												onClick={() => setLanguage(item.id)}
												className={`flex w-full px-6 py-2 justify-between text-left hover:bg-muted/50
                        ${language === item.id ? "bg-primary/10" : ""}`}
											>
												<span>{item.label}</span>
												{language === item.id && <Check size={16} />}
											</button>
										))}
									</AccordionContent>
								</AccordionItem>

								{/* TEST LEVEL + SUBJECT */}
								<AccordionItem value="testLevel">
									<AccordionTrigger className="px-6 py-3 hover:no-underline">
										<div className="flex flex-col items-start w-full">
											<span className="font-semibold">Test Level</span>
											{level && (
												<span className="text-xs text-primary capitalize">
													{getLabel(testLevels, level)} •{" "}
													{getLabel(
														level
															? levelOptions[level as keyof typeof levelOptions]
															: [],
														subject
													)}
												</span>
											)}
										</div>
									</AccordionTrigger>

									<AccordionContent>
										{testLevels.map((levelObj) => (
											<div
												key={levelObj.id}
												className="border-b last:border-none"
											>
												<button
													className="flex w-full px-6 py-3 justify-between items-center hover:bg-muted/30"
													onClick={() => handleTestLevelToggle(levelObj.id)}
												>
													<span>{levelObj.label}</span>
													<ChevronDown
														className={`transition-transform ${
															openTestLevel === levelObj.id ? "rotate-180" : ""
														}`}
														size={16}
													/>
												</button>

												{openTestLevel === levelObj.id && (
													<div className="pb-2">
														{(
															levelOptions[
																levelObj.id as keyof typeof levelOptions
															] || []
														).map((sub) => (
															<button
																key={sub.id}
																onClick={() => setSubject(sub.id)}
																className={`flex w-full px-6 py-2 justify-between hover:bg-muted/50
                              ${
																subject === sub.id && level === levelObj.id
																	? "text-primary bg-primary/10"
																	: ""
															}`}
															>
																<span>{sub.label}</span>
																{subject === sub.id &&
																	level === levelObj.id && <Check size={14} />}
															</button>
														))}
													</div>
												)}
											</div>
										))}
									</AccordionContent>
								</AccordionItem>

								{/* QUESTION COUNT */}
								<AccordionItem value="count">
									<AccordionTrigger className="px-6 py-3 hover:no-underline">
										<div className="flex flex-col items-start w-full">
											<span className="font-semibold">Question Count</span>
											{questionCount && (
												<span className="text-xs text-primary">
													{questionCount}
												</span>
											)}
										</div>
									</AccordionTrigger>
									<AccordionContent className="">
										{questionRanges.map((item) => (
											<button
												key={item.id}
												onClick={() => setQuestionCount(item.label)}
												className={`flex w-full px-6 py-2 justify-between hover:bg-muted/50 
                      ${questionCount === item.label ? "bg-primary/10" : ""}`}
											>
												<span>{item.label}</span>
												{questionCount === item.label && <Check size={16} />}
											</button>
										))}
									</AccordionContent>
								</AccordionItem>

								{/* DURATION */}
								<AccordionItem value="duration">
									<AccordionTrigger className="px-6 py-3 hover:no-underline">
										<div className="flex flex-col items-start w-full">
											<span className="font-semibold">Duration</span>
											{timer && (
												<span className="text-xs text-primary">{timer}</span>
											)}
										</div>
									</AccordionTrigger>
									<AccordionContent>
										{durations.map((item) => (
											<button
												key={item.id}
												onClick={() => setTimer(item.label)}
												className={`flex w-full px-6 py-2 justify-between hover:bg-muted/50
                      ${timer === item.label ? "bg-primary/10" : ""}`}
											>
												<span>{item.label}</span>
												{timer === item.label && <Check size={16} />}
											</button>
										))}
									</AccordionContent>
								</AccordionItem>
							</Accordion>

							{/* APPLY BUTTON */}
							<Button
								disabled={!allSelected}
								onClick={handleApply}
								className="rounded-none w-full py-2 mt-2 border-t"
							>
								Apply Selection
							</Button>
						</div>
					)}
				</div>
			</div>
		);
};

export default AuthSidebar;