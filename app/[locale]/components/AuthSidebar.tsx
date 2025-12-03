/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import HmIcon from "@/public/icons/HmIcon";
import OponIcon from "@/public/icons/OponIcon";
import PodcastIcon from "@/public/icons/PodcastIcon";
import ShopBagIcon from "@/public/icons/ShopBagIcon";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuizStore } from "@/store/useQuizStore";
import { ArrowLeft, Check, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";

const links = [
	{
		icon: <HmIcon />,
		name: "Home",
		href: "/dashboard",
	},
	{
		icon: <OponIcon />,
		name: "Opon.ai",
		href: "/opon",
	},
	{
		icon: <ShopBagIcon />,
		name: "Shop",
		href: "/shop",
	},
	{
		icon: <PodcastIcon />,
		name: "Podcast",
		href: "/podcast",
	},
];

const AuthSidebar = () => {
	const params = useParams();
	const locale = params.locale as string;
	const router = useRouter();

	// Test modal state
	const [isTestMenuOpen, setIsTestMenuOpen] = useState(false);

	// Quiz store state
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
	} = useQuizStore();

	// Local state for UI components
	const [mode, setMode] = useState<"ibeere" | "timer">("ibeere");
	const [value, setValue] = useState<string>("");
	const [applySelection, setApplySelection] = useState(false);
	const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
	const [theme, setTheme] = useState<"dark" | "light">("dark");
	const [isPremium, setIsPremium] = useState(false);
	const [walletEnabled, setWalletEnabled] = useState(true);
	const [premiumDialogOpen, setPremiumDialogOpen] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState<"1month" | "1year" | null>(
		null
	);
	const [walletDialogOpen, setWalletDialogOpen] = useState(false);
	const [depositDialogOpen, setDepositDialogOpen] = useState(false);
	const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
	const [addBankDialogOpen, setAddBankDialogOpen] = useState(false);
	const [selectedBankAccount, setSelectedBankAccount] = useState<string | null>(
		null
	);
	const [scoreboardDialogOpen, setScoreboardDialogOpen] = useState(false);
	const [manageAccountDialogOpen, setManageAccountDialogOpen] = useState(false);

	const IBEERE_OPTIONS = ["1 - 25", "1 - 50", "1 - 100", "1 - 150"];
	const TIMER_OPTIONS = ["10", "15", "25", "30"];

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
	const [rewardFilter, setRewardFilter] = useState<RewardFilter>("cash");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// Filter the data based on selected reward type
	const filteredData = scoreboardData.filter((entry) => {
		switch (rewardFilter) {
			case "cash":
				return entry.cashReward !== "";
			case "points":
				return entry.pointsReward !== "";
			case "none":
				return entry.cashReward === "" && entry.pointsReward === "";
			default:
				return entry.cashReward !== ""; // Default to cash
		}
	});

	// Calculate totals for the summary
	const totals = filteredData.reduce(
		(acc, entry) => {
			if (entry.cashReward) {
				const cashValue = parseInt(entry.cashReward.replace("NGN", ""));
				acc.totalCash += cashValue;
			}
			if (entry.pointsReward) {
				const pointsValue = parseInt(entry.pointsReward.replace("PTS", ""));
				acc.totalPoints += pointsValue;
			}
			return acc;
		},
		{ totalCash: 0, totalPoints: 0 }
	);

	// Define the scoreboard data type
	interface ScoreboardEntry {
		testCode: number;
		testDate: string;
		questionsCompleted: number;
		correctAnswers: number;
		cashReward: string;
		pointsReward: string;
	}

	// Add this type for the filter
	type RewardFilter = "cash" | "points" | "none";
	const rewardOptions = [
		{ value: "none" as RewardFilter, label: "None" },
		{ value: "cash" as RewardFilter, label: "Cash" },
		{ value: "point" as RewardFilter, label: "Point" },
	];

	const getCurrentFilterLabel = () => {
		return (
			rewardOptions.find((option) => option.value === rewardFilter)?.label ||
			"Cash"
		);
	};

	// State for expanded test levels
	const [expandedTestLevels, setExpandedTestLevels] = useState<
		Record<string, boolean>
	>({
		basic: false,
		intermediary: false,
		advanced: false,
	});

	// State for multiple selections
	const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
	const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

	const languages = [
		{ id: "yoruba", label: "Yoruba" },
		{ id: "igbo", label: "Igbo" },
		{ id: "hausa", label: "Hausa" },
	];

	const testLevels = [
		{ id: "basic", label: "Basic" },
		{ id: "intermediary", label: "Intermediary" },
		{ id: "advanced", label: "Advanced" },
	];

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
	};

	const questionRanges = [
		{ id: "1-25", label: "1-25" },
		{ id: "1-50", label: "1-50" },
		{ id: "1-100", label: "1-100" },
		{ id: "1-150", label: "1-150" },
		{ id: "1-200", label: "1-200" },
		{ id: "1-250", label: "1-250" },
	];

	const durations = [
		{ id: "timefree", label: "Time Free" },
		{ id: "25", label: "25m" },
		{ id: "30", label: "30m" },
		{ id: "45", label: "45m" },
		{ id: "60", label: "60m" },
		{ id: "90", label: "90m" },
	];

	const allLevelOptions = [
		...levelOptions.basic,
		...levelOptions.intermediary,
		...levelOptions.advanced,
	];

	const getLabel = (items: any[], id: string | null) => {
		if (!id) return "N/A";
		return items.find((item) => item.id === id)?.label;
	};

	const handleModeSelect = (selectedMode: "ibeere" | "timer") => {
		if (applySelection) {
			setMode(selectedMode);
			setValue(""); // reset second dropdown
			setIsModeDropdownOpen(false); // Close dropdown only when applySelection is checked
		}
		// If applySelection is false, do nothing - the selection won't be applied and dropdown stays open
	};

	const handleUpgradePremium = (plan: "1month" | "1year") => {
		setSelectedPlan(plan);
		setPremiumDialogOpen(true);
	};

	const confirmPremiumUpgrade = () => {
		if (selectedPlan) {
			console.log(`Processing payment for: ${selectedPlan}`);
			if (selectedPlan === "1month") {
				console.log("Processing payment: N6,000 for 1 month");
			} else {
				console.log("Processing payment: N60,000 for 1 year");
			}
			setIsPremium(true);
			setPremiumDialogOpen(false);
			setSelectedPlan(null);
		}
	};

	const toggleWallet = () => {
		setWalletDialogOpen(true);
	};

	const getPlanAmount = () => {
		return selectedPlan === "1month" ? "N6,000" : "N60,000";
	};

	const getPlanText = () => {
		return selectedPlan === "1month" ? "1 MONTH" : "1 YEAR";
	};

	const handleDeposit = () => {
		setWalletDialogOpen(false);
		setDepositDialogOpen(true);
	};

	const handleWithdraw = () => {
		setWalletDialogOpen(false);
		setWithdrawDialogOpen(true);
	};

	const handleAddBankAccount = () => {
		setWithdrawDialogOpen(false);
		setAddBankDialogOpen(true);
	};

	const closeAllDialogs = () => {
		setWalletDialogOpen(false);
		setDepositDialogOpen(false);
		setWithdrawDialogOpen(false);
		setPremiumDialogOpen(false);
		setAddBankDialogOpen(false);
		setScoreboardDialogOpen(false);
		setManageAccountDialogOpen(false);
		setSelectedBankAccount(null);
		setIsTestMenuOpen(false);
	};

	const handleBankAccountSelect = (account: string) => {
		setSelectedBankAccount(account);
	};

	// Back navigation functions
	const goBackToWalletFromDeposit = () => {
		setDepositDialogOpen(false);
		setWalletDialogOpen(true);
	};

	const goBackToWalletFromWithdraw = () => {
		setWithdrawDialogOpen(false);
		setSelectedBankAccount(null);
		setWalletDialogOpen(true);
	};

	const goBackToWithdrawFromAddBank = () => {
		setAddBankDialogOpen(false);
		setWithdrawDialogOpen(true);
	};

	const goBackToBankSelection = () => {
		setSelectedBankAccount(null);
	};

	const handlePlanSelect = (plan: "1month" | "1year") => {
		setSelectedPlan(plan);
		// Auto-open the premium dialog when a plan is selected
		setPremiumDialogOpen(true);
	};

	// Map question types to display names
	const getQuestionTypeDisplayName = (type: string) => {
		switch (type) {
			case "isori":
				return <span>General</span>;
			case "owe":
				return <span>Proverbs</span>;
			case "alo":
				return <span>Fairytale</span>;
			default:
				return <span>General</span>;
		}
	};

	// Get accumulated amount for display in wallet
	const getAccumulatedAmount = () => {
		const currentTypeAmounts = accumulatedAmounts[selectedQuestionType];
		if (selectedAccountType === "cash") {
			return `NGN ${currentTypeAmounts.cash.toLocaleString()}`;
		} else {
			return `${currentTypeAmounts.points}pts`;
		}
	};

	// Toggle test level expansion
	const toggleTestLevelExpansion = (levelId: string) => {
		setExpandedTestLevels((prev) => ({
			...prev,
			basic: false,
			intermediary: false,
			advanced: false,
			[levelId]: !prev[levelId],
		}));

		// single-select
		setLevel(levelId);
		setSelectedSubjects([]); // reset subjects when changing level
	};

	// Toggle language selection
	const toggleLanguageSelection = (languageId: string) => {
		setSelectedLanguages([languageId]); // overwrite array
		setLanguage(languageId); // update store
	};

	// Toggle subject selection
	const toggleSubjectSelection = (subjectId: string) => {
		setSelectedSubjects([subjectId]); // overwrite array to enforce single selection
		setSubject(subjectId); // store in quiz store
	};

	// Check if a language is selected
	const isLanguageSelected = (languageId: string) => {
		return selectedLanguages.includes(languageId);
	};

	// Check if a subject is selected
	const isSubjectSelected = (subjectId: string) => {
		return selectedSubjects.includes(subjectId);
	};

	const handleApply = () => {
		if (language && level && subject && questionCount && timer) {
			setIsTestMenuOpen(false);
			router.push(`/${locale}/dashboard`);
			console.log("[v0] Selections applied:", {
				language,
				level,
				subject,
				questionCount,
				timer,
				selectedLanguages,
				selectedSubjects,
			});
		}
	};

	const allSelected = language && level && subject && questionCount && timer;

	// Get subjects for the selected level
	const getSubjectsForLevel = (levelId: string) => {
		return levelOptions[levelId as keyof typeof levelOptions] || [];
	};

	// Check if a level is selected (has a subject selected)
	const isLevelSelected = (levelId: string) => {
		return level === levelId && subject !== null;
	};

	// Get selected subject label for a level
	const getSelectedSubjectLabel = (levelId: string) => {
		const subjects = getSubjectsForLevel(levelId);
		const selectedSubject = subjects.find((s) =>
			selectedSubjects.includes(s.id)
		);
		return selectedSubject?.label || "";
	};

	return (
		<div className="w-40 translate-x-8 2xl:-translate-x-2 text-black">
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
			<div className="mt-4 w-full">
				<Button
					// variant="outline"
					className="w-full rounded-full text-black hover:bg-black border bg-inherit dark:text-white hover:text-white dark:hover:bg-white dark:hover:text-black"
					onClick={() => setIsTestMenuOpen(true)}
				>
					Start a Test
				</Button>
			</div>

			{/* NEW TEST MODAL USING SHADCN DIALOG */}
			<Dialog
				open={isTestMenuOpen}
				onOpenChange={setIsTestMenuOpen}
			>
				<DialogContent
					showCloseButton={false}
					className="sm:max-w-md rounded-2xl max-h-[90vh] p-0 pt-2 border-gray-400/30 overflow-y-auto"
				>
					<DialogHeader className="px-3 flex flex-row justify-between">
						<button onClick={() => setIsTestMenuOpen(false)}>
							<ArrowLeft />
						</button>

						<DialogTitle className="text-xl font-bold">New Test</DialogTitle>
						<button
							onClick={() => setIsTestMenuOpen(false)}
							className="border rounded-full dark:hover:text-black hover:bg-gray-200"
						>
							<X />
						</button>
					</DialogHeader>
					<hr className="border-gray-400/30" />

					<div className=" space-y-2 py-2 w-full px-3">
						{/* LANGUAGE SECTION - CHECKBOXES */}
						<div className="w-full space-y-1 p">
							<h3 className="text-lg font-semibold">Language</h3>
							<div className="flex flexcol space-y-1 w-full justify-between">
								{languages.map((lang) => (
									<button
										key={lang.id}
										onClick={() => toggleLanguageSelection(lang.id)}
										className={`flex items-center justify-between rounded-lg text-left transition-colors `}
									>
										<div className="flex items-center gap-3">
											{/* Checkbox with X */}
											<div
												className={`w-5 h-5 rounded border flex items-center justify-center `}
											>
												{isLanguageSelected(lang.id) && (
													<X
														size={12}
														className="dark:text-white font-bold"
													/>
												)}
											</div>
											<span className="text-black dark:text-white">
												{lang.label}
											</span>
										</div>
									</button>
								))}
							</div>
						</div>

						{/* TEST LEVEL SECTION - CHECKBOXES WITH DROPDOWN */}
						<div className="w-full space-y-1">
							<h3 className="text-lg font-semibold">Test Level</h3>
							<div className="grid grid-cols-3 gap-2 w-full space-y-1">
								{testLevels.map((levelItem) => {
									const subjects = getSubjectsForLevel(levelItem.id);
									const isExpanded = expandedTestLevels[levelItem.id];
									const isSelected = isLevelSelected(levelItem.id);
									const selectedSubjectLabel = getSelectedSubjectLabel(
										levelItem.id
									);

									return (
										<div
											key={levelItem.id}
											className="w-full space-y-1"
										>
											{/* Level button */}
											<button
												onClick={() => toggleTestLevelExpansion(levelItem.id)}
												className={`flex items-center  justifybetween   rounded-lg transition-colors w-full`}
											>
												<div className="flex items-center gap-3">
													{/* Checkbox with X */}
													<div
														className={`w-5 h-5 rounded  border flex items-center justify-center `}
													>
														{isSelected && (
															<X
																size={12}
																className="dark:text-white font-bold"
															/>
														)}
													</div>
													<div className="flex flex-col items-start">
														<span className="text-black dark:text-white">
															{levelItem.label}
														</span>
														{/* {isSelected && selectedSubjectLabel && (
															<span className="text-xs text-black dark:">
																{selectedSubjectLabel}
															</span>
														)} */}
													</div>
												</div>
												<ChevronDown
													className={`transition-transform ${
														isExpanded ? "rotate-180" : ""
													}`}
													size={16}
												/>
											</button>

											{/* Subjects dropdown - CHECKBOXES */}
											{isExpanded && (
												<div className="ml8 w-full space-y-1">
													{subjects.map((subjectItem) => (
														<button
															key={subjectItem.id}
															onClick={() =>
																toggleSubjectSelection(subjectItem.id)
															}
															className={`flex items-center w-full  rounded-lg text-left `}
														>
															<div className="flex items-center gap-3">
																{/* Checkbox with X for subjects */}
																<div
																	className={`w-4 h-4 rounded border flex items-center justify-center `}
																>
																	{isSubjectSelected(subjectItem.id) && (
																		<X
																			size={10}
																			className="dark:text-white font-bold"
																		/>
																	)}
																</div>
																<span className="text-sm">
																	{subjectItem.label}
																</span>
															</div>
														</button>
													))}
												</div>
											)}
										</div>
									);
								})}
							</div>
						</div>

						{/* QUESTIONS COUNT SECTION - CHECKBOXES */}
						<div className="w-full space-y-1">
							<h3 className="text-lg font-semibold">Questions Count</h3>
							<div className="grid grid-cols-3 gap-2">
								{questionRanges.map((range) => (
									<button
										key={range.id}
										onClick={() => setQuestionCount(range.label)}
										className={`   rounded-lg transition-colors ${
											questionCount === range.label
												? " "
												: " dark:bg-black text-black dark:text-white "
										}`}
									>
										<div className="flex items-center gap-2 col-span-1">
											{/* Checkbox with X */}
											<div
												className={`w-4 h-4 rounded border  flex items-center justify-center`}
											>
												{questionCount === range.label && (
													<X
														size={10}
														className="text-black dark: font-bold"
													/>
												)}
											</div>
											<span>{range.label}</span>
										</div>
									</button>
								))}
							</div>
						</div>

						{/* DURATION SECTION - CHECKBOXES */}
						<div className="w-full space-y-2">
							<h3 className="text-lg font-semibold">Duration</h3>
							<div className="grid grid-cols-3 gap-2">
								{durations.map((duration) => (
									<button
										key={duration.id}
										onClick={() => setTimer(duration.label)}
										className={`flex items-center justifycenter  rounded-lg transition-colors ${
											timer === duration.label
												? " dark:text-white"
												: "bg-gray50 dark:bg-black text-black dark:text-white"
										}`}
									>
										<div className="flex items-center gap-2">
											{/* Checkbox with X */}
											<div
												className={`w-4 h-4 rounded border flex items-center justify-center  }`}
											>
												{timer === duration.label && (
													<X
														size={10}
														className="text-black font-bold"
													/>
												)}
											</div>
											<span>{duration.label}</span>
										</div>
									</button>
								))}
							</div>
						</div>
					</div>
					<hr className="border-gray-400/30" />

					<DialogFooter className="p-0">
						<Button
							onClick={handleApply}
							disabled={!allSelected}
							className="w-full py-3 text-lg font-semibold roundedfull bg-transparent text-black  dark:text-white dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed rounded-none rounded-bl-xl rounded-br-xl"
						>
							Start
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AuthSidebar;
