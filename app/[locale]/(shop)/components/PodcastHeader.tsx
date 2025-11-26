/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronDown, Search, User, ShoppingCart, HandbagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useEffect, useState } from "react";
import {

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
import { Checkbox } from "@/components/ui/checkbox";
import ShopIcon from "@/public/icons/ShopIcon";
import PodcastIcon from "@/public/icons/PodcastIcon";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ThemeToggle } from "../../components/theme-toggle";
import { usePodcast } from "../../(dashboard)/context/PodcastContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GiftIcon from "@/public/icons/GiftIcon";
import { CartIcon }from "./CartIcon";
import HistoryIcon from "@/public/icons/HistoryIcon";

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
export default function PodcastHeader() {
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
  
      <div className="w-full px4">
        {/* Top Bar */}
        <div className="w-full flex items-center justify-between py-3">
  <div className="flex h-max items-center gap-2">
  <div className="w-full flex  gap-2 items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Superfan podcast</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Fascinating stories in easy-to-follow lingual
              </p>
            </div>
  </div>
          {/* Right side - Actions */}
          <div className="flex items-center gap-3 ">
            

          


            <div className="flex1 w-max  flex items-center gap-0.5 xl:gap-2  justify-end">
         

         {/* AVATAR WITH DROPDOWN */}
         <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <button className="flex items-center cursor-pointer text-black dark:text-white gap-0 rounded-md p1 hoverbg-gray-100 transition- mx-0 px-0">
               <div className="text-xl w9 flex items-center justify-center cursor-pointer border-[#2f3336]">
                 <CircleUserRound className="size-10" />
               </div>
             </button>
           </DropdownMenuTrigger>
           <DropdownMenuContent className="w-80 p-0 mr-4 dark:bg-black bgwhite" align="end">
             {/* User Info Section */}
             <div className="p-4 border-b">
               <div className="flex items-center gap-3">
                 <Avatar className="h-12 w-12">
                   <AvatarImage src="/avatar.png" alt="Babat Lawrence" />
                   <AvatarFallback className="bg-blue-500 text-white">BL</AvatarFallback>
                 </Avatar>
                 <div className="flex-1">
                   <h3 className="font-semibold">Babat Lawrence</h3>
                   <p className="text-sm text-gray-500">batumdeoluyemi@yahoo.com</p>
                 </div>
               </div>
             </div>

             {/* Manage Account Section */}
             <div className="p-4">
               <button
                 className="w-full h-10 mb-3 rounded-full flex items-center justify-center text-sm font-medium border dark:hover:bg-white hover:bg-black hover:text-white dark:hover:text-black"
                 onClick={() => setManageAccountDialogOpen(true)}
               >
                 Manage your account
               </button>

               {/* Account Section */}
               <div className="mb-4">
                 <h5 className="text-xs font-medium text-gray-500 mb-2">Account</h5>

                 {/* Upgrade to Premium with Dropdown */}
                 <DropdownMenuSub>
                   <DropdownMenuSubTrigger className="w-max flex items-center justifybetween p-2 cursor-pointer data-[state=open]:[&>svg]:rotate-90 [&>svg]:hidden [&>svg]:transition-transform [&>svg]:duration-200">
                     <div className="flex items-center dark:text-white gap-2">
                       <LockIcon />
                       <span className="text-sm">Upgrade to Premium</span>
                     </div>
                   </DropdownMenuSubTrigger>
                   <DropdownMenuPortal>
                     <DropdownMenuSubContent className="w-40">
                       <div className="py4">
                         <div className="space-y-3">
                           {/* 1 Month Plan */}
                           {/* 1 Month Plan */}
                 <button
                   onClick={() => handlePlanSelect("1month")}
                   className={`w-full flex items-center justify-between rounded-md px-3  transition-colors dark:text-white text-black ${
                     selectedPlan === "1month" 
                       ? "bg-primary/20 border border-primary/30" 
                       : "hover:bg-gray-500/30"
                   }`}
                 >
                   <div className="text-sm items-center text-left h-10 flex gap-2">
                   
                     <div className="">1 MONTH</div>
                   </div>
                   <div className="font-medium">N6,000</div>
                 </button>

                 {/* 1 Year Plan */}
                 <button
                   onClick={() => handlePlanSelect("1year")}
                   className={`w-full flex items-center justify-between rounded-md px-3  transition-colors dark:text-white text-black ${
                     selectedPlan === "1year" 
                       ? "bg-primary/20 border border-primary/30" 
                       : "hover:bg-gray-500/30"
                   }`}
                 >
                   <div className="text-sm items-center text-left h-10 flex gap-2">
                    
                     <div className="">1 YEAR</div>
                   </div>
                   <div className="font-medium">N60,000</div>
                 </button>
                         </div>
                       </div>
                     </DropdownMenuSubContent>
                   </DropdownMenuPortal>
                 </DropdownMenuSub>

                 {/* Wallet */}
                 <DropdownMenuItem
                   className="flex items-center justify-between p-2 cursor-pointer"
                   onClick={toggleWallet}
                 >
                   <div className="flex items-center dark:text-white gap-2">
                     <WalletIcon />
                     <span className="text-sm">Wallet</span>
                   </div>
                 </DropdownMenuItem>
               </div>

               {/* Others Section */}
               <div>
                 <h5 className="text-xs font-medium text-gray-500 mb-2">Others</h5>

                 {/* Reward Dropdown with Cash/Points - Now uses global state */}
                 <DropdownMenuSub>
                 <DropdownMenuSubTrigger className="w-max flex items-center p-2 cursor-pointer [&>svg]:rotate-90 [&>svg]:transition-transform [&>svg]:duration-200">
  <div className="flex items-center dark:text-white gap-2">
    <AwardIcon />
    <span className="text-sm">Reward</span>
  </div>
</DropdownMenuSubTrigger>
                   <DropdownMenuPortal>
                     <DropdownMenuSubContent className="w-20">
                       <div className="p2 w-full">
                         <div className="w-full items-start flex flex-col gap-2 ">
                           <button
                             onClick={() => setSelectedAccountType("cash")}
                             className={`flex-1 py-1 px-2 text-sm w-full text-left dark:text-white text-black ${
                               selectedAccountType === "cash"
                                 ? "dark:bg-white rounded-md bg-black/70 text-white dark:text-black"
                                 : ""
                             }`}
                           >
                             Cash
                           </button>
                           <hr className="w-full" />
                           <button
                             onClick={() => setSelectedAccountType("points")}
                             className={`flex-1 py-1 px-2 text-sm w-full text-left dark:text-white text-black ${
                               selectedAccountType === "points"
                                 ? "dark:bg-white bg-black/70 text-white rounded-md dark:text-black"
                                 : ""
                             }`}
                           >
                             Point
                           </button>
                         </div>
                       </div>
                     </DropdownMenuSubContent>
                   </DropdownMenuPortal>
                 </DropdownMenuSub>

                 {/* Theme Dropdown with Light/Dark */}
                 <ThemeToggle />

                 {/* Scoreboard */}
                 <DropdownMenuItem
                   className="flex items-center gap-2 p-2 cursor-pointer"
                   onClick={() => setScoreboardDialogOpen(true)}
                 >
                   <div className="flex items-center dark:text-white gap-2">
                     <ScoreboardIcon />
                   </div>
                   <span className="text-sm">Scoreboard</span>
                 </DropdownMenuItem>
                 <button
                 onClick={()=>router.push(`/${locale}/shop`)}
                 className="flex h-max items-center gap-2 px-2">
                   <div className="h-5 w-5 ">

                   <ShopIcon/>
                   </div>
                   <p>Shop</p>

                 </button>
                 <button 
                     onClick={openPodcast}
                 className="flex h-max items-center gap-2 px-2">
                   <div className="h-5 w-5">

                   <PodcastIcon/>
</div>
                   <p>Podcast</p>

                 </button>
               </div>
             </div>

             <hr className="w-full" />

             {/* Sign Out */}
             <DropdownMenuItem className="p-4 cursor-pointer">
               <button onClick={() => router.push(`/${locale}`)} className="flex items-center gap-2">
                 <Image src={"/sign-out-alt-solid-svgrepo-com.svg"} alt="sign out" height={20} width={20} />
                 <span className="font-medium">Sign out</span>
               </button>
             </DropdownMenuItem>
           </DropdownMenuContent>
         </DropdownMenu>
       </div>
          </div>
        </div>
        {/* Manage Account Dialog */}
      <Dialog open={manageAccountDialogOpen} onOpenChange={setManageAccountDialogOpen}>
        <DialogContent showCloseButton={false} className="sm:max-w-xl p-0 gap-0 overflow-hidden">
          <DialogHeader className="relative p-4 pb-4 flex flex-row justifybetween h-max items-center">
            {/* Camera Icon on Far Right */}
            <button className="h-10 w-10 rounded-full flex items-center justify-center border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-600 dark:text-gray-400"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </button>
            <DialogTitle className="text-sm font-bold ">
              <div className="">
                <p>Babat Lawrence</p>
                <p className="font-normal">batumdeoluyemi@yahoo.com</p>
              </div>
            </DialogTitle>
            <div className="absolute top-4 right-4">
              <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100 border" onClick={()=>setManageAccountDialogOpen(false)}>
                <X/>
              </button>
            </div>
          </DialogHeader>
          <hr className="w-full " />

          <div className="px-6 pb-6 space-y-2">
            {/* Profile Information - Two column layout */}
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    className="w-full"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="email"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username
                  </Label>
                  <Input
                    id="username"
                    className="w-full"
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Password Section - Two column layout */}
            <div className="grid grid-cols-2 gap-6">
              {/* Current Password */}
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm font-medium">
                  Current password
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  className="w-full"
                />
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium">
                  New password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  className="w-full"
                />
              </div>
            </div>
          </div>
          {/* Action Buttons - Reversed order as shown in image */}
          <hr className="w-full" />
          <div className="flex w-full py-2 justify-center gap-4 px-6">
            <div className="w-full rounded-full border text-black dark:text-white border-gray-300  hover:bg-black !hover:text-white">
              <button
                onClick={() => {
                  console.log("Saving profile changes...")
                  setManageAccountDialogOpen(false)
                }}
                className="w-full dark:text-white text-gray-500 text h-12 text-lg font-semibold"
              >
                Save changes
              </button>
            </div>
            {/* <div className="border-r h-full"></div>
            <div className="!w-[49%]">
              <button
                onClick={() => setManageAccountDialogOpen(false)}
                className="w-full 00 hover:bg-white bg-transparent dark:bg-black/80 text-black dark:text-white h-12 text-lg font-semibold"
              >
                Cancel
              </button>
            </div> */}
          </div>
        </DialogContent>
      </Dialog>

      {/* Scoreboard Dialog */}
      <Dialog open={scoreboardDialogOpen} onOpenChange={setScoreboardDialogOpen}>
           <DialogContent showCloseButton={false} className="border-0 sm:max-w-5xl p-0 gap-0 h-[400px] overflow-auto">
             <DialogHeader className="relative p-6 pb-4">
               <DialogTitle className="text-2xl font-bold text-center">Scoreboard</DialogTitle>
               <button
                 onClick={() => setScoreboardDialogOpen(false)}
                 className="absolute right-4 hover:bg-gray-300 top-4 h-8 w-8 flex items-center justify-center rounded-full"
               >
                 <X />
               </button>
             </DialogHeader>
     
             <div className="px-2 pb-6">
               {/* Scoreboard Table */}
               <div className="border-t overflow-auto">
                 {/* Table Header */}
                 <div className="grid text-sm grid-cols-10 font-semibold">
                   <div className="px-2 py-4 text-center col-span-1 border-r border-gray-400 dark:border-gray-500">Test Code</div>
                   <div className="px-2 py-4 text-center col-span-2 border-gray-300 dark:border-gray-600">Test Date</div>
                   <div className="px-2 py-4 text-center col-span-2 border-gray-300 dark:border-gray-600">Questions Completed</div>
                   <div className="px-2 py-4 text-center col-span-2 border-gray-300 dark:border-gray-600">Correct Answers</div>
                   <div className="px-2 py-4 text-center flex flex-row gap-2 h-max justify-center items-center col-span-3 relative">
                     {/* Reward Header with Dropdown */}
                     <div className="relative inlineblock">
                       <button
                         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                         className="flex itemscenter gap-1 hover:bg-gray-100 dark:hover:bg-gray-700 px2 py- rounded-md transition-colors justify-center"
                       >
                         Reward
                         <ChevronDown className={`h-4 w-4 mt-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                       </button>
                       
                       {/* Dropdown Menu */}
                       {isDropdownOpen && (
                         <div className="absolute top-full left-0 mt1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 min-w-[120px]">
                           {rewardOptions.map((option) => (
                             <button
                               key={option.value}
                               onClick={() => {
                                 setRewardFilter(option.value);
                                 setIsDropdownOpen(false);
                               }}
                               className={`w-full border-b text-left px3 py2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-md last:rounded-b-md ${
                                 rewardFilter === option.value ? 'bg-black/80 dark:bg-white/10 white text-white dark:text-white' : ''
                               }`}
                             >
                               {option.label}
                             </button>
                           ))}
                         </div>
                       )}
                     </div>
                     
                     {/* Current filter indicator */}
                     <div className="text-s font-normal text-gray-500 dark:text-gray-400 mt1">
                       {getCurrentFilterLabel()}
                     </div>
                   </div>
                 </div>
     
                 {/* Table Body */}
                 <div>
                   {filteredData.map((entry, index) => (
                     <div
                       key={entry.testCode}
                       className="text-sm grid grid-cols-10 border-t border-gray-200 dark:border-gray-700"
                     >
                       <div className="p-4 col-span-1 text-center border-r border-gray-400 dark:border-gray-500 font-medium">
                         {entry.testCode}
                       </div>
                       <div className="p-4 col-span-2 px-2 text-center border-gray-200 dark:border-gray-700">{entry.testDate}</div>
                       <div className="p-4 col-span-2 text-center border-gray-200 dark:border-gray-700">
                         {entry.questionsCompleted}
                       </div>
                       <div className="p-4 col-span-2 text-center border-gray-200 dark:border-gray-700">{entry.correctAnswers}</div>
                       <div className="p-4 col-span-3 text-center border-gray-200 dark:border-gray-700">
                         {/* Combined Reward Display */}
                         <div className="flex flex-col gap-1">
                           {entry.cashReward && (
                             <span className="font-medium text-balack dark:text-white">
                               {entry.cashReward}
                             </span>
                           )}
                           {entry.pointsReward && (
                             <span className="font-medium ">
                               {entry.pointsReward}
                             </span>
                           )}
                           {!entry.cashReward && !entry.pointsReward && (
                             <span className="text-gray-400 dark:text-gray-500 text-xs">
                               ...
                             </span>
                           )}
                         </div>
                       </div>
                     </div>
                   ))}
                   
                   {/* Show message when no data matches filter */}
                   {filteredData.length === 0 && (
                     <div className="text-center py-8 text-gray-500 dark:text-gray-400 col-span-10">
                       No entries found for the selected filter.
                     </div>
                   )}
                 </div>
     
                 {/* Summary Section - Aligned under respective columns */}
                 {filteredData.length > 0 && (
                   <div className="grid grid-cols-10 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                     <div className="p-4 border-gray-400 dark:border-gray-500 col-span-7"></div>
                     <div className="p-4 col-span-3 text-center font-medium">
                       <div className="flex flex-col gap-1">
                         {totals.totalCash > 0 && (
                           <span className="text-balack dark:text-white">NGN{totals.totalCash}</span>
                         )}
                         {totals.totalPoints > 0 && (
                           <span className="">{totals.totalPoints}PTS</span>
                         )}
                         {totals.totalCash === 0 && totals.totalPoints === 0 && (
                           <span className="text-gray-400 dark:text-gray-500">No rewards</span>
                         )}
                       </div>
                     </div>
                   </div>
                 )}
               </div>
             </div>
           </DialogContent>
         </Dialog>

      {/* Wallet Dialog - Updated with accumulated amount */}
      <Dialog open={walletDialogOpen} onOpenChange={setWalletDialogOpen}>
        <DialogContent showCloseButton={false} className="sm:max-w-md p-0 gap-0 overflow-hidden">
          <DialogHeader className="relative p-6 pb-4">
            <DialogTitle className="text-2xl font-bold textcenter">
              <span className="inline-flex items-baseline gap-1">
                <span className="text-xs">₦</span>
                <span className="text-2xl font-semibold">0.000</span>
              </span>
            </DialogTitle>
            <button
              onClick={() => setWalletDialogOpen(false)}
              className="absolute right-4 hover:bg-gray-300 top-4 h-8 w-8 flex items-center justify-center rounded-full"
            >
              <X />
            </button>
          </DialogHeader>

          <div className="px-6 pb-6 space-y-6">
            {/* Deposit and Withdraw Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleDeposit}
                className="w-full rounded-full border-gray-900 bg-black/80 dark:bg-white dark:text-black border text h-12 text-lg font-semibold"
              >
                Deposit
              </Button>
              <Button
                onClick={handleWithdraw}
                className="w-full rounded-full border border-gray-900 hover:bg-white bg-transparent dark:bg-black/80 text-black dark:text-white h-12 text-lg font-semibold"
              >
                Withdraw
              </Button>
            </div>

            {/* Activity Section */}
            <div className="space-y-4">
              <h3 className="font-semibold">Activity</h3>

              {/* Activity Items */}
              <div className="space-y-3">
                {/* Activity Item 1 */}
                <div className="flex justify-between items-center">
                  <div className="flex h-max gap-2">
                    <p className="text-sm">2/11/23</p>
                    <p className="text-sm text-gray-500">Money added to wallet</p>
                  </div>
                  <div className="text-green-600 font-medium">500.00</div>
                </div>

                {/* Activity Item 2 */}
                <div className="flex justify-between items-center">
                  <div className="flex h-max gap-2">
                    <p className="text-sm">3/11/23</p>
                    <p className="text-sm text-gray-500">Money moved to bank account</p>
                  </div>
                  <div className="text-red-600 font-medium">1000.00</div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Deposit Dialog with Back Button */}
      <Dialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen}>
        <DialogContent showCloseButton={false} className="sm:max-w-md p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-6 pb1 relative">
            <button
              onClick={goBackToWalletFromDeposit}
              className="absolute left-5 h-8 w-8 rounded-full justify-center top-6 hover:bg-gray-300 flex items-center gap-2 text-gray-600 hover: transition-colors"
            >
              <ArrowLeft className="" />
            </button>
            <DialogTitle className="text-xl font-bold text-center">Deposit from your Bank</DialogTitle>
            <button
              onClick={() => setDepositDialogOpen(false)}
              className="absolute right-4 hover:bg-gray-300 top-5 h-8 w-8 flex items-center justify-center rounded-full"
            >
              <X />
            </button>
          </DialogHeader>
          {/* Divider */}
          <hr className="w-full border-gray-200" />
          <div className="px-6 pb-6 space-y-6 mt-1">
            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="depositAmount" className="text-2xl font-medium">
                <p>Amount</p>
              </Label>
              <Input
                id="depositAmount"
                placeholder="0"
                className="w-full border-b border-t-0 border-l-0 border-r-0 rounded-none shadow-none focus:visible:ring-0 outline-0 focus-visible:outline-0
                focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-0 placeholder:text-3xl !text-3xl"
                type="number"
              />
            </div>

            {/* Information Text */}
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                When you create a deposit, you will get bank transfer details that must be submitted immediately. You
                can&apos;t create another deposit until the first one is completed or expires.
              </p>
              <p className="text-sm text-gray-600">Funds typically arrive in 1-2 hours.</p>
            </div>

            {/* Divider */}
            <hr className="w-full border-gray-200" />

            {/* Submit Button */}
            <Button
              onClick={closeAllDialogs}
              className="w-full rounded-full bg-gray-900 hover:bg-gray-800 h-12 text-lg font-semibold"
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog with Back Buttons */}
      <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
        <DialogContent showCloseButton={false} className="sm:max-w-md p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-6 pb-4 relative">
            <button
              onClick={selectedBankAccount ? goBackToBankSelection : goBackToWalletFromWithdraw}
              className="absolute left-5 h-8 w-8 rounded-full justify-center top-5 hover:bg-gray-300 flex items-center gap-2 text-gray-600 hover: transition-colors"
            >
              <ArrowLeft className="h textxl" />
            </button>
            <DialogTitle className="text-xl font-bold text-center">Withdraw to your Bank</DialogTitle>
            <button
              onClick={() => setWithdrawDialogOpen(false)}
              className="absolute right-4 hover:bg-gray-300 top-5 h-8 w-8 flex items-center justify-center rounded-full"
            >
              <X />
            </button>
          </DialogHeader>
          {/* Divider */}
          <hr className="w-full border-gray-200" />
          <div className="px-6 pb-6 space-y-6">
            {!selectedBankAccount ? (
              // Initial withdraw screen - choose bank account
              <>
                {/* Description */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Choose a bank account</h3>
                  <p className="text-sm text-gray-500">Withdraw or send money to your bank account.</p>
                </div>

                {/* Bank Account Selection */}
                <div className="space-y-4">
                  {/* Selected Bank Account */}
                  <button
                    onClick={() => handleBankAccountSelect("Omolade Yola, 0123456789 - UBA")}
                    className="w-full p-4 border border-gray-300 rounded-lg cursor-pointer dark:hover:text-black hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Omolade Yola, 0123456789 - UBA</p>
                      </div>
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-transparent"></div>
                      </div>
                    </div>
                  </button>

                  {/* Add Bank Account Button */}
                  <button
                    onClick={handleAddBankAccount}
                    className="w-full flex items-center justifycenter gap-2 hover:underline transition-colors"
                  >
                    <span className="text-sm font-medium">Add a bank account</span>
                  </button>
                </div>
              </>
            ) : (
              // Withdraw screen after bank account is selected
              <>
                {/* Amount Input */}
                <div className="space-y-2">
                  <Label htmlFor="withdrawAmount" className="text-2xl font-medium flex justify-between">
                    Amount
                    <p className="text-sm">Available balance: $0.00</p>
                  </Label>
                  <Input
                    id="withdrawAmount"
                    placeholder="0"
                    className="w-full !text-3xl border-b border-t-0 border-l-0 border-r-0 rounded-none textxl shadow-none focus:visible:ring-0 outline-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-0 placeholder:text-2xl"
                    type="number"
                  />
                </div>

                {/* Information Text */}
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Funds typically arrive in under an hour, but some can take up to a day to reflect the credit.
                    We&apos;ll be in touch if there&apos;s a substantial delay.
                  </p>
                </div>

                {/* Second Divider */}
                <hr className="w-full border-gray-200" />

                {/* Submit Button */}
                <Button
                  onClick={closeAllDialogs}
                  className="w-full rounded-full bg-gray-900 hover:bg-gray-800 h-12 text-lg font-semibold"
                >
                  Submit
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Bank Account Dialog with Back Button */}
      <Dialog open={addBankDialogOpen} onOpenChange={setAddBankDialogOpen}>
        <DialogContent showCloseButton={false} className="sm:max-w-md p-0 gap-0 overflow-hidden">
          <DialogHeader className="relative p-6 pb-4">
            <button
              onClick={goBackToWithdrawFromAddBank}
              className="absolute left-4 h-8 w-8 rounded-full justify-center top-5 hover:bg-gray-300 flex items-center gap-2 text-gray-600 hover: transition-colors"
            >
              <ArrowLeft className="" />
            </button>
            <DialogTitle className="text-xl font-bold text-center">Add Bank Account</DialogTitle>
            <button
              onClick={() => setAddBankDialogOpen(false)}
              className="absolute right-4 hover:bg-gray-300 top-5 h-8 w-8 flex items-center justify-center rounded-full"
            >
              <X />
            </button>
          </DialogHeader>

          <div className="px-6 pb-6 space-y-6">
            {/* Form Fields */}
            <div className="space-y-4">
              {/* Bank Selection */}
              <div className="space-y-2">
                <Label htmlFor="bankSelect" className="text-sm font-medium">
                  Select Bank
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uba">UBA</SelectItem>
                    <SelectItem value="first-bank">First Bank</SelectItem>
                    <SelectItem value="gtb">GTBank</SelectItem>
                    <SelectItem value="zenith">Zenith Bank</SelectItem>
                    <SelectItem value="access">Access Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Account Number */}
              <div className="space-y-2">
                <Label htmlFor="accountNumber" className="text-sm font-medium">
                  Account Number
                </Label>
                <Input id="accountNumber" placeholder="Enter your account number" className="w-full" type="number" />
              </div>

              {/* Account Name Display */}
              <div className="px-4 h-10 flex items-center border rounded-lg">
                <p className="text-sm text-gray-600 text-center">Account name automatically appears here</p>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={closeAllDialogs}
              className="w-full rounded-full bg-gray-900 hover:bg-gray-800 h-12 text-lg font-semibold"
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Premium Upgrade Dialog */}
      <Dialog open={premiumDialogOpen} onOpenChange={setPremiumDialogOpen}>
        <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-sm text-gray-400">
              Pay {getPlanAmount()} - {getPlanText()}
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-6 space-y-4">
            {/* Card Number */}
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-sm font-medium hidden">
                Card number
              </Label>
              <Input id="cardNumber" placeholder="Card number" className="w-full" />
            </div>

            {/* Expiration Date and CVC */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry" className="text-sm font-medium hidden">
                  Expiration date (MM/YY)
                </Label>
                <Input id="expiry" placeholder="Expiration date (MM/YY)" className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc" className="text-sm font-medium hidden">
                  CVC
                </Label>
                <Input id="cvc" placeholder="CVC" className="w-full" />
              </div>
            </div>

            {/* Name on Card */}
            <div className="space-y-2">
              <Label htmlFor="cardName" className="text-sm font-medium hidden">
                Name on card
              </Label>
              <Input id="cardName" placeholder="Name on card" className="w-full" />
            </div>

            {/* Pay Now Button */}
            <Button
              onClick={confirmPremiumUpgrade}
              className="w-full rounded-full bg-gray-900 hover:bg-gray-800 h-12 text-lg font-semibold dark:text-white text-black"
            >
              Pay now
            </Button>

            {/* Security Notice */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
              <span>Your information is encrypted and secure</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    
  );
}