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
import { useEffect, useState } from "react";
import {
  ChevronDown,
  ArrowLeft,
  X,
  CircleUserRound,
  Check,
} from "lucide-react";
import { useQuizStore } from "@/store/useQuizStore";
import { useParams, usePathname, useRouter } from "next/navigation";
// import { ThemeToggle } from "./theme-toggle"
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

import Link from "next/link";
import { useLocale } from "next-intl";
import { ThemeToggle } from "../../components/theme-toggle";
import { usePodcast } from "../../(dashboard)/context/PodcastContext";
import ShopHeader from "./ShopHeader";
import AIHeader from "./AIHeader";
import PodcastHeader from "./PodcastHeader";

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

export default function PodcastNavbar() {
  // const router = useRouter();
  const pathname = usePathname();
  const initialLocale = useLocale();

  const languageCode = pathname.split("/")[1];
  const urlPath = pathname.replace(`/${languageCode}`, "");

  const languages = {
    en: { code: "en", name: "English" },
    fr: { code: "fr", name: "Français" },
    // de: { code: "de", name: "Deutsch" },
  } as const;

  type Locale = keyof typeof languages;

  const [userLocale, setUserLocale] = useState<Locale>(initialLocale as Locale);

  const currentLanguage = languages[userLocale];

  const [pendingLocale, setPendingLocale] = useState<string | null>(null);

  useEffect(() => {
    if (!pendingLocale) return;

    document.cookie = `NEXT_LOCALE=${pendingLocale}; path=/; max-age=31536000`;
  }, [pendingLocale]);

  const handleLocaleChange = (locale: Locale) => {
    setPendingLocale(locale);
    setUserLocale(locale);
    router.push(`/${locale}${urlPath}`);
  };

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
  const [isTestMenuOpen, setIsTestMenuOpen] = useState(false);
  const { openPodcast } = usePodcast();

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

  const getLabel = (items: any[], id: string | null) => {
    if (!id) return "N/A";
    return items.find((item) => item.id === id)?.label;
  };

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
  const handleBankAccountSelect = (account: string) => {
    setSelectedBankAccount(account);
  };
  const handleSubjectSelect = (levelId: string, subjectId: string) => {
    setLevel(levelId);
    setSubject(subjectId);
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

  return (
    <div className=" w-full border-t border-b h-[80px] text-black flex items-center justify-center py4">
      <div className=" w-[90%]  py-4 flex ">
        <div className="px-1 grid  grid-cols-4 w-full ">
          <div className="col-span-1 ">
            <Link
              href={`/${locale}`}
              className="flex flex1 w-full   flex1 items-center space-x-2"
            >
              <Image
                src="/GAME WHITE AND BLACK 2-1.svg"
                alt="Logo"
                width={200}
                height={150}
                priority
              />
              
            </Link>
          </div>
          <div className="col-span-3 ">
            <PodcastHeader/>
          </div>
        
        </div>
      </div>
    </div>
  );
}
