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
import { ArrowLeft, Check, ChevronDown, X, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import AdBadge from "@/public/icons/AdBadge";
// import CreateAdDialog from "./AdsModal";
import { RadioBtn } from "./RadioBtn";
import CreateAdDialog from "./CreateDialog";

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
	{
		icon: <AdBadge />,
		name: "Advertise",
		href: "",
	},
];

const AuthSidebar = () => {
	const params = useParams();
	const locale = params.locale as string;
	const router = useRouter();

	// Test modal state
	const [isTestMenuOpen, setIsTestMenuOpen] = useState(false);
const [isAdvertisingOpen, setIsAdvertisingOpen] = useState(false);
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

	// State for subjects
	const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
	const [isMorePopoverOpen, setIsMorePopoverOpen] = useState(false);

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

	// State for multiple selections
	const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

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

	// Primary subjects (always visible)
	const primarySubjects = [
		{ id: "general", label: "General" },
		{ id: "politics", label: "Politics" },
		{ id: "sports", label: "Sports" },
		{ id: "proverbs", label: "Proverbs" },
		{ id: "folktale", label: "FolkTale" },
		{ id: "more", label: "More", isMoreButton: true },
	];

	// Additional subjects in the "More" popover
	const additionalSubjects = [
		{ id: "movies", label: "Movies" },
		{ id: "music", label: "Music" },
		{ id: "history", label: "History" },
		{ id: "culture", label: "Culture" },
		{ id: "literature", label: "Literature" },
		{ id: "business", label: "Business" },
	];

	// All subjects combined
	const allSubjects = [
		...primarySubjects.filter((s) => !s.isMoreButton),
		...additionalSubjects,
	];

	const questionRanges = [
		{ id: "1-25", label: "1-25" },
		{ id: "1-50", label: "1-50" },
		{ id: "1-100", label: "1-100" },
		{ id: "1-150", label: "1-150" },
		{ id: "1-200", label: "1-200" },
		{ id: "1-250", label: "1-250" },
	];

	const durations = [
		{ id: "10", label: "10m" },
		{ id: "25", label: "25m" },
		{ id: "30", label: "30m" },
		{ id: "45", label: "45m" },
		{ id: "60", label: "60m" },
		{ id: "timefree", label: "Time Free" },
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
		setIsMorePopoverOpen(false);
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
			case "general":
				return <span>General</span>;
			case "proverbs":
				return <span>Proverbs</span>;
			case "folktale":
				return <span>FolkTale</span>;
			case "politics":
				return <span>Politics</span>;
			case "sports":
				return <span>Sports</span>;
			case "movies":
				return <span>Movies</span>;
			case "music":
				return <span>Music</span>;
			case "history":
				return <span>History</span>;
			case "culture":
				return <span>Culture</span>;
			case "literature":
				return <span>Literature</span>;
			case "business":
				return <span>Business</span>;
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

	// Toggle language selection
	const toggleLanguageSelection = (languageId: string) => {
		setSelectedLanguages([languageId]); // overwrite array
		setLanguage(languageId); // update store
	};

	// Toggle level selection
	const toggleLevelSelection = (levelId: string) => {
		setLevel(levelId); // update store
	};

	// Toggle subject selection
	const toggleSubjectSelection = (subjectId: string) => {
		if (selectedSubjects.includes(subjectId)) {
			// Remove subject if already selected
			const newSubjects = selectedSubjects.filter((id) => id !== subjectId);
			setSelectedSubjects(newSubjects);
		} else {
			// Add subject if not selected
			setSelectedSubjects([...selectedSubjects, subjectId]);
		}
	};

	// Check if a language is selected
	const isLanguageSelected = (languageId: string) => {
		return selectedLanguages.includes(languageId);
	};

	// Check if a level is selected
	const isLevelSelected = (levelId: string) => {
		return level === levelId;
	};

	// Check if a subject is selected
	const isSubjectSelected = (subjectId: string) => {
		return selectedSubjects.includes(subjectId);
	};

	// Get selected subjects count for display
	const getSelectedSubjectsCount = () => {
		return selectedSubjects.length;
	};

	// Get display text for the "More" button
	const getMoreButtonText = () => {
		const selectedAdditionalCount = additionalSubjects.filter((subject) =>
			selectedSubjects.includes(subject.id)
		).length;

		if (selectedAdditionalCount > 0) {
			return `More (${selectedAdditionalCount})`;
		}
		return "More";
	};
	const selectAllSubjects = () => {
		const allIds = [
			...primarySubjects.filter((s) => !s.isMoreButton).map((s) => s.id),
			...additionalSubjects.map((s) => s.id),
		];
		setSelectedSubjects(allIds);
	};
	const toggleAll = () => {
		const allIds = [
			...primarySubjects.filter((s) => !s.isMoreButton).map((s) => s.id),
			...additionalSubjects.map((s) => s.id),
		];

		const allSelected = allIds.every((id) => selectedSubjects.includes(id));

		if (allSelected) {
			// unselect all
			setSelectedSubjects([]);
		} else {
			// select all
			setSelectedSubjects(allIds);
		}
	};
	  
	const handleApply = () => {
		// Update the subject in store with comma-separated string
		const subjectsString = selectedSubjects.join(",");
		setSubject(subjectsString);

		if (
			language &&
			level &&
			selectedSubjects.length > 0 &&
			questionCount &&
			timer
		) {
			setIsTestMenuOpen(false);
			router.push(`/${locale}/dashboard`);
			console.log("[v0] Selections applied:", {
				language,
				level,
				subjects: selectedSubjects,
				subject: subjectsString,
				questionCount,
				timer,
				selectedLanguages,
			});
		}
	};

	const allSelected = !!(
		language &&
		level &&
		selectedSubjects.length > 0 &&
		questionCount &&
		timer
	);

	return (
		<div className="w-40 translate-x-8 2xl:-translate-x-2 text-black">
			<div className="gap-2 flex flex-col">
				{links.map((link, id) => {
					if (link.name === "Advertise") {
						return (
							<CreateAdDialog key={id}>
								<div className="flex items-center dark:text-white dark:hover:text-black gap-2 py-2 hover:bg-gray-100 rounded w-full text-left cursor-pointer">
									<div className="h-6 w-6">{link.icon}</div>
									<p>{link.name}</p>
								</div>
							</CreateAdDialog>
						);
					}
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
					className="sm:max-w-md rounded-2xl max-h-[90vh] gap-0 p-0 pt2 border-gray-400/30 overflow-y-auto"
				>
					<DialogHeader className="px-3 flex h-10  items-center flex-row justify-between">
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
							<h3 className=" font-semibold">Language</h3>
							<div className="grid grid-cols-3 space-y-1 w-full ">
								{languages.map((lang) => (
									<button
										key={lang.id}
										onClick={() => toggleLanguageSelection(lang.id)}
										className={`flex items-center justify-between rounded-lg text-left transition-colors `}
									>
										<div className="flex items-center gap-3">
											{/* Checkbox with X */}
											<div className="w-5 h-5  flex items-center justify-center p-0 overflow-visible">
												<RadioBtn
													checked={isLanguageSelected(lang.id)}
													className="dark:border-gray-400 border-gray-600"
												/>
											</div>
											<span className="text-black dark:text-white">
												{lang.label}
											</span>
										</div>
									</button>
								))}
							</div>
						</div>
						<hr className="border-gray-400/20" />

						{/* SUBJECT SECTION - WITH MORE POPOVER */}
						<div className="w-full space-y-1">
							<div className="flex gap-2 items-center">
								<h3 className=" font-semibold">Subject</h3>
								<Popover
									key="more"
									open={isMorePopoverOpen}
									onOpenChange={setIsMorePopoverOpen}
								>
									<PopoverTrigger asChild>
										<button
											className={`flex items-center justifycenter rounded-lg transition-colors w-full 
															`}
										>
											<div className="flex items-center gap-2">
												{/* <MoreHorizontal size={16} /> */}
												<span className="text-black dark:text-white">
													{getMoreButtonText()}
												</span>
											</div>
										</button>
									</PopoverTrigger>
									<PopoverContent
										className="w-40 py-4 p-0 border border-gray-400/30"
										align="start"
									>
										<div className="space-y-2">
											<button
												onClick={() => {
													const additionalIds = additionalSubjects.map(
														(s) => s.id
													);
													const allAdditionalSelected = additionalIds.every(
														(id) => selectedSubjects.includes(id)
													);

													if (allAdditionalSelected) {
														// Unselect only the additional subjects (leave primary selections intact)
														setSelectedSubjects((prev) =>
															prev.filter((id) => !additionalIds.includes(id))
														);
													} else {
														// Select all additional subjects (keep any existing primary selections)
														setSelectedSubjects((prev) =>
															Array.from(new Set([...prev, ...additionalIds]))
														);
													}
												}}
												className="flex items-center gap-3 h-6   px-2 w-full rounded-lg"
											>
												<RadioBtn
													checked={additionalSubjects
														.map((s) => s.id)
														.every((id) => selectedSubjects.includes(id))}
													className="dark:border-gray-400 border-gray-600"
												/>
												<span>All subjects</span>
											</button>
											<hr className=" border-gray-400/20" />

											{additionalSubjects.map((additionalSubject) => (
												<button
													key={additionalSubject.id}
													onClick={() =>
														toggleSubjectSelection(additionalSubject.id)
													}
													className="flex items-center px-2 justify-between w-full rounded-lg text-left transition-colors"
												>
													<div className="flex items-center gap-3">
														<div className="w-5 h-5  flex items-center justify-center p-0 overflow-visible">
															<RadioBtn
																checked={isSubjectSelected(
																	additionalSubject.id
																)}
																className="dark:border-gray-400 border-gray-600"
															/>
														</div>
														<span className="text-black dark:text-white">
															{additionalSubject.label}
														</span>
													</div>
												</button>
											))}
										</div>
									</PopoverContent>
								</Popover>
							</div>
							<div className="grid grid-cols-3 gap-2 w-full space-y-1">
								{primarySubjects.map((subjectItem) => {
									// if (subjectItem.isMoreButton) {
									// 	return (
									// 		<Popover
									// 			key="more"
									// 			open={isMorePopoverOpen}
									// 			onOpenChange={setIsMorePopoverOpen}
									// 		>
									// 			<PopoverTrigger asChild>
									// 				<button
									// 					className={`flex items-center justifycenter rounded-lg transition-colors w-full
									// 						`}
									// 				>
									// 					<div className="flex items-center gap-2">
									// 						<MoreHorizontal size={16} />
									// 						<span className="text-black dark:text-white">
									// 							{getMoreButtonText()}
									// 						</span>
									// 					</div>
									// 				</button>
									// 			</PopoverTrigger>
									// 			<PopoverContent
									// 				className="w-40 p-4 border border-gray-400/30"
									// 				align="start"
									// 			>
									// 				<div className="space-y-2">
									// 					<button
									// 						onClick={() => {
									// 							const additionalIds = additionalSubjects.map((s) => s.id);
									// 							const allAdditionalSelected = additionalIds.every((id) =>
									// 								selectedSubjects.includes(id)
									// 							);

									// 							if (allAdditionalSelected) {
									// 								// Unselect only the additional subjects (leave primary selections intact)
									// 								setSelectedSubjects((prev) =>
									// 									prev.filter((id) => !additionalIds.includes(id))
									// 								);
									// 							} else {
									// 								// Select all additional subjects (keep any existing primary selections)
									// 								setSelectedSubjects((prev) =>
									// 									Array.from(new Set([...prev, ...additionalIds]))
									// 								);
									// 							}
									// 						}}
									// 						className="flex items-center gap-3 w-full rounded-lg"
									// 					>
									// 						<RadioBtn
									// 							checked={additionalSubjects
									// 								.map((s) => s.id)
									// 								.every((id) => selectedSubjects.includes(id))}
									// 						/>
									// 						<span>Select all</span>
									// 					</button>

									// 					{additionalSubjects.map((additionalSubject) => (
									// 						<button
									// 							key={additionalSubject.id}
									// 							onClick={() =>
									// 								toggleSubjectSelection(additionalSubject.id)
									// 							}
									// 							className="flex items-center justify-between w-full rounded-lg text-left transition-colors"
									// 						>
									// 							<div className="flex items-center gap-3">
									// 								<div className="w-5 h-5  flex items-center justify-center p-0 overflow-visible">
									// 									<RadioBtn
									// 										checked={isSubjectSelected(
									// 											additionalSubject.id
									// 										)}
									// 										className="dark:border-gray-400 border-gray-600"
									// 									/>
									// 								</div>
									// 								<span className="text-black dark:text-white">
									// 									{additionalSubject.label}
									// 								</span>
									// 							</div>
									// 						</button>
									// 					))}
									// 				</div>
									// 			</PopoverContent>
									// 		</Popover>
									// 	);
									// }

									return (
										<button
											key={subjectItem.id}
											onClick={() => toggleSubjectSelection(subjectItem.id)}
											className={`flex items-center justifycenter rounded-lg transition-colors w-full`}
										>
											<div className="flex items-center gap-3">
												{/* Checkbox with X */}
												<div className="w-5 h-5  flex items-center justify-center p-0 overflow-visible">
													<RadioBtn
														checked={isSubjectSelected(subjectItem.id)}
														className="dark:border-gray-400 border-gray-600"
													/>
												</div>
												<span className="text-black dark:text-white">
													{subjectItem.label}
												</span>
											</div>
										</button>
									);
								})}
							</div>
						</div>
						<hr className="border-gray-400/20" />

						{/* TEST LEVEL SECTION - STANDALONE CHECKBOXES */}
						<div className="w-full space-y-1">
							<h3 className=" font-semibold">Test Level</h3>
							<div className="grid grid-cols-3 gap-2 w-full space-y-1">
								{testLevels.map((levelItem) => (
									<button
										key={levelItem.id}
										onClick={() => toggleLevelSelection(levelItem.id)}
										className={`flex items-center justifycenter rounded-lg transition-colors w-full`}
									>
										<div className="flex items-center gap-3">
											{/* Checkbox with X */}
											<div className="w-5 h-5  flex items-center justify-center p-0 overflow-visible">
												<RadioBtn
													checked={isLevelSelected(levelItem.id)}
													className="dark:border-gray-400 border-gray-600"
												/>
											</div>
											<span className="text-black dark:text-white">
												{levelItem.label}
											</span>
										</div>
									</button>
								))}
							</div>
						</div>
						<hr className="border-gray-400/20" />

						{/* QUESTIONS COUNT SECTION - CHECKBOXES */}
						<div className="w-full space-y-1">
							<div className="flex h-max items-center gap-2">
								<h3 className=" font-semibold">Questions Count</h3>
								<p>(in range)</p>
							</div>
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
												className={`w-5 h-5  border rounded-full flex items-center justify-center p-0 overflow-visible `}
											>
												{questionCount === range.label && (
													<RadioBtn
														checked={true}
														color="black"
														// borderColor="border-gray-300"
														className="dark:border-gray-400 border-gray-600"
													/>
												)}
											</div>
											<span>{range.label}</span>
										</div>
									</button>
								))}
							</div>
						</div>
						<hr className="border-gray-400/20" />

						{/* DURATION SECTION - CHECKBOXES */}
						<div className="w-full space-y-2">
							<div className="flex h-max items-center gap-2">
								<h3 className=" font-semibold">Duration</h3>
								<p>(in minutes)</p>
							</div>
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
											<div className="w-5 h-5 border rounded-full flex items-center justify-center p-0 overflow-visible">
												{timer === duration.label && (
													<RadioBtn
														checked={true}
														className="dark:border-gray-400 border-gray-600"
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
							className="w-full py-3  font-semibold roundedfull bg-transparent text-black  dark:text-white dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed rounded-none rounded-bl-xl rounded-br-xl"
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
