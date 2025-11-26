/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, ChevronDown, } from "lucide-react";
import OponIcon from "@/public/icons/OponIcon";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<"1month" | "1year">("1month"); // Default to 1month
  const [premiumDialogOpen, setPremiumDialogOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const getPlanAmount = () => {
    return selectedPlan === "1month" ? "N6,000" : "N60,000";
  };

  const getPlanText = () => {
    return selectedPlan === "1month" ? "1 MONTH" : "1 YEAR";
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
      // Don't reset selectedPlan here so it remembers the choice
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleUpgradePremium = (plan: "1month" | "1year") => {
    setSelectedPlan(plan);
    setPremiumDialogOpen(true);
  };

  const handlePlanSelect = (plan: "1month" | "1year") => {
    setSelectedPlan(plan);
    // Auto-open the premium dialog when a plan is selected
    setPremiumDialogOpen(true);
  };

  return (
    <div className="flex flex-col justify-center gap-4 dark:text-white text-black itemscenter w-full flex-1 h-full border border-t-0 border-b-0 ">
 <div className={`w-full justifycenter flex items-center gap-4 flex-col h-[30%]  relative`}>

      <div className="flex h-max items-center gap-2">
        <div className="h-6 w-6">
          <OponIcon />
        </div>
        <p className="text-2xl">Opon</p>
      </div>
      <form onSubmit={handleSubmit} className="relative w-full max-w-md ">
        <Input
          type="text"
          placeholder="How can I help you today? Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="pr-12 h-12 text-base rounded-full"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute rounded-full right-1 top-1 h-10 w-10"
          disabled={!message.trim()}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </form>
      <div className="max-w-md ">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-max flex items-center justify-between p-2 cursor-pointer ">
            <div className="flex items-center dark:text-white gap-2">
              <span className="text-sm">
                Upgrade to Premium to use AI agent
              </span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent className="w-48 translate-x-1/2">
              <div className="py-1">
                <div className="space-y-1">
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
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>
 </div>
      
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
              <Label
                htmlFor="cardNumber"
                className="text-sm font-medium hidden"
              >
                Card number
              </Label>
              <Input
                id="cardNumber"
                placeholder="Card number"
                className="w-full"
              />
            </div>

            {/* Expiration Date and CVC */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry" className="text-sm font-medium hidden">
                  Expiration date (MM/YY)
                </Label>
                <Input
                  id="expiry"
                  placeholder="Expiration date (MM/YY)"
                  className="w-full"
                />
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
              <Input
                id="cardName"
                placeholder="Name on card"
                className="w-full"
              />
            </div>

            {/* Pay Now Button */}
            <Button
              onClick={confirmPremiumUpgrade}
              className="w-full rounded-full border bg-white hover:bg-gray-800 h-12 text-lg font-semibold text-black hover:text-white"
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