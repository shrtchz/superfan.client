/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import {
	ChevronDown,
	ArrowLeft,
	X,
	CircleUserRound,
	Check,
} from "lucide-react";
import { useQuizStore } from "@/store/useQuizStore";
import { useParams, useRouter } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import TimerIcon from "@/public/icons/TimerIcon";
import LockIcon from "@/public/icons/LockIcon";
import WalletIcon from "@/public/icons/WalletIcon";
import AwardIcon from "@/public/icons/AwardIcon";
import ScoreboardIcon from "@/public/icons/ScoreboardIcon";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
// import { ChevronDown, X } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import ShopIcon from "@/public/icons/ShopIcon";
import PodcastIcon from "@/public/icons/PodcastIcon";
import { usePodcast } from "../(dashboard)/context/PodcastContext";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import Logo from "@/public/icons/Logo";
import { useTheme } from "next-themes";
import DarkLogo from "@/public/icons/DarkLogo";

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
export default function AuthNavbar() {
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
		currentQuestionIndex,
	} = useQuizStore();

	// Local state for UI components
	const [mode, setMode] = useState<"ibeere" | "timer">("ibeere");
	const [value, setValue] = useState<string>("");
	const [applySelection, setApplySelection] = useState(false);
	const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
	// const [theme, setTheme] = useState<"dark" | "light">("dark");
	const { theme, setTheme, resolvedTheme } = useTheme();
	// alert(theme);
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
	const [isTestMenuOpen, setIsTestMenuOpen] = useState(false);

	const router = useRouter();
	const params = useParams();
	const locale = params.locale as string;

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

	const languages = [
		{ id: "yoruba", label: "Yoruba" },
		{ id: "igbo", label: "Igbo" },
		{ id: "hausa", label: "Hausa" },
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
		{ id: "1-25", label: "1 - 25" },
		{ id: "1-50", label: "1 - 50" },
		{ id: "1-100", label: "1 - 100" },
		{ id: "1-150", label: "1 - 150" },
	];

	const durations = [
		{ id: "10", label: "10" },
		{ id: "15", label: "15" },
		{ id: "25", label: "25" },
		{ id: "30", label: "30" },
	];

	const testLevels = [
		{ id: "basic", label: "Basic" },
		{ id: "intermediary", label: "Intermediary" },
		{ id: "advanced", label: "Advanced" },
	];

	const getLabel = (items: any[], id: string, fallback: string) => {
		if (!id) return fallback;
		return items.find((item) => item.id === id)?.label || fallback;
	};

	const allLevelOptions = [
		...levelOptions.basic,
		...levelOptions.intermediary,
		...levelOptions.advanced,
	];
	const { openPodcast } = usePodcast();
	const handleApply = () => {
		if (language && level && subject && questionCount && timer) {
			setIsTestMenuOpen(false);
			console.log("[v0] Selections applied:", {
				language,
				level,
				subject,
				questionCount,
				timer,
			});
		}
	};

	const allSelected = language && level && subject && questionCount && timer;

	// State to track which test level accordion is open
	const [openTestLevel, setOpenTestLevel] = useState<string>("");

	const handleTestLevelToggle = (levelId: string) => {
		// If clicking the same level that's already open, close it
		if (openTestLevel === levelId) {
			setOpenTestLevel("");
		} else {
			// Otherwise open the clicked level and set the level
			setOpenTestLevel(levelId);
			setLevel(levelId);
		}
	};

	const handleSubjectSelect = (levelId: string, subjectId: string) => {
		setLevel(levelId);
		setSubject(subjectId);
	};

	return (
		<nav className=" w-full border-t border-b    h-[80px] text-black flex items-center justify-center py4">
			<div className="w-full xl:w-[90%]  py-4 flex ">
				<div className=" grid  grid-cols-4 w-full ">
					<div className="col-span-1 w-full h-full flex items-center">
						<Link
							href={`/${locale}`}
							className="flex mt-3 xlmt-0    flex1 items-center p-0 gap-0 m-0 "
						>
							<div className="h-16 w-54 2xl:-translate-x-10 xl:-translate-x-0 ">
								{theme === "dark" ? <DarkLogo /> : <Logo />}
							</div>
						</Link>
					</div>
					<div className="col-span-2 2xl:ml-12 2 w-full flex items-center justifycenter py-3">
						<div className="flex1  wfull flex flex-col justifystart items-center text-black dark:text-white ">
							<div
								className={`w-md xl:w-lg max-w-2xl 2xl:w-3xl h-full  border-b-0 overflow-hidden relative`}
							>
								{/* CENTER SECTION */}
								<div className="flex h-max items-center justify-between ">
									<div className="flex gap-2 h-max items-center">
										<p>Test</p>
										<div className="h-8 flex flex-row justify-between ">
											<div className="data-[size=default]:h-8  !bg-inherit border-gray-400/30   text-black dark:text-white xl:px-2 px-1 xl:gap-1 text-black gap-0 w-20 text-xs xl:text-sm bo border rounded-md h-8 flex items-center justifycenter">
												{language
													? getLabel(languages, language, "Language")
													: "Language"}
											</div>
										</div>
									</div>
									<div className="w-20 gap-2 border-gray-400/30   text-black dark:text-white rounded-full h-8 flex items-center justify-center">
										<div className="h-8 w-8">
											<TimerIcon />
										</div>
										<p>
											{/* {timer ? timer : 0} */}
											0m</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-1  flex h-full items-center py3 xltranslate-x-0 -translatex6  justify-end">
						{/* RIGHT SECTION */}
						<div className="flex h-full items-center ">
							<div className="flex flex1 h-full items-center gap- ">
								{/* Questions Count Display */}
								<div className="flex  text-sm xl:text-base items-center text-black dark:text-white  w-max h-8 px-3 gap-2">
									<p>Questions Count</p>
									<div className=" rounded-md border border-gray-400/30  h-full flex items-center justify-center px-2">
										{/* {questionCount ? questionCount : 0}
										 */}
										{currentQuestionIndex +1 }
									</div>
								</div>
							</div>

							{/* AVATAR WITH DROPDOWN */}
							<UserAvatar />
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
