/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { CreditCard, MapPin, Lock, ArrowBigLeft, ArrowLeft, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { items, total, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
//   const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  const handleCompletePurchase = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearCart();
    setIsProcessing(false);
    onOpenChange(false);
    alert("Purchase completed successfully!");
  };

//   const formatPrice = (price: number) => {
//     return `NGN ${price.toLocaleString()}`;
//   };

  return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent
				showCloseButton={false}
				className="p3 gap-0 sm:max-w-lg p-0 w-full max-h-[80vh] overflow-y-auto"
			>
				<DialogHeader className="px-3 h-12 flex flex-row items-center justify-between">
					<button onClick={() => onOpenChange(false)}>
						<ArrowLeft />
					</button>
					<DialogTitle className="text-2xl font-bold text-center">
						Checkout
					</DialogTitle>
					<button
						onClick={() => onOpenChange(false)}
						className="h-8 w-8 rounded-full border hover:bg-gray-300 flex items-center justify-center"
					>
						<X />
					</button>
				</DialogHeader>

				<hr className="border-gray border border-b" />
				<div className="space-y-2 p-3">
					{/* SHIPPING SECTION */}
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<h3 className="text-lg font-semibold">SHIPPING</h3>
						</div>

						<div className="space-y-2 w-full">
							{/* <Label htmlFor="fullName">Full name</Label> */}
							<Input
								className="dark:border-gray-400/30 focus:visible-outline-0 focus-visible:ring-0 border-black"
								id="fullName"
								placeholder="Enter your full name"
							/>
						</div>

						<div className="space-y-2 w-full">
							{/* <Label htmlFor="country">Country or region</Label> */}
							<Select defaultValue="nigeria">
								<SelectTrigger className="dark:border-gray-400/30 focus:visible-outline-0 focus-visible:ring-0 border-black w-full">
									<SelectValue placeholder="Select country" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="nigeria">Nigeria</SelectItem>
									<SelectItem value="ghana">Ghana</SelectItem>
									<SelectItem value="kenya">Kenya</SelectItem>
									<SelectItem value="south-africa">South Africa</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							{/* <Label htmlFor="address">Address</Label> */}
							<Input
								className="dark:border-gray-400/30 focus:visible-outline-0 focus-visible:ring-0 border-black"
								id="address"
								placeholder="Address"
							/>
						</div>

						<div className="space-y-2">
							{/* <Label htmlFor="phone">Phone number</Label> */}
							<div className="flex gap-2">
								<div className="w-24">
									<Select defaultValue="+234">
										<SelectTrigger className="dark:border-gray-400/30 focus:visible-outline-0 focus-visible:ring-0 border-black">
											<SelectValue>+234</SelectValue>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="+234">+234 (NG)</SelectItem>
											<SelectItem value="+233">+233 (GH)</SelectItem>
											<SelectItem value="+254">+254 (KE)</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<Input
									className="dark:border-gray-400/30 focus:visible-outline-0 focus-visible:ring-0 border-black"
									id="phone"
									placeholder="Phone number"
								/>
							</div>
						</div>
					</div>

					{/* PAYMENT SECTION */}
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<h3 className="text- font-semibold">PAYMENT</h3>
						</div>

						<div className="space-y-2 border rounded-lg p-4">
							<div className="flex items-center gap-2">
								<div className="bg-blu-600 rounded flex items-center justify-center">
									{/* <CreditCard className="h-4 w-4 text-white" /> */}
									<CreditCard className=" text-gray-600" />
								</div>
								<span className="font-medium">Card</span>
							</div>

							<div className="space-y-2">
								{/* <Label htmlFor="cardNumber">Card number</Label> */}
								<div className="flex gap-2">
									<Input
										className="dark:border-gray-400/30 focus:visible-outline-0 focus-visible:ring-0 border-black"
										id="cardNumber"
										placeholder="Card number"
									/>
									<div className="w-16 flex items-center justify-center border rounded bg-gray-50">
										<span className="text-xs font-medium text-blue-600">
											VISA
										</span>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									{/* <Label htmlFor="expiry"></Label> */}
									<Input
										className="dark:border-gray-400/30 focus:visible-outline-0 focus-visible:ring-0 border-black"
										id="expiry"
										placeholder="Expiration date"
									/>
								</div>

								<div className="space-y-2">
									{/* <Label htmlFor="cvc">Security code</Label> */}
									<Input
										className="dark:border-gray-400/30 focus:visible-outline-0 focus-visible:ring-0 border-black"
										id="cvc"
										placeholder="Security code<"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* COMPLETE PURCHASE BUTTON */}
					<Button
						onClick={handleCompletePurchase}
						disabled={isProcessing || items.length === 0}
						className="w-full py-6 text-lg rounded-full bg-inherit hover:text-white text-black border-gray-400/30 font-semibold border dark:border-white/20 dark:bg-inherit dark:hover:bg-white dark:hover:text-black dark:text-white"
					>
						{isProcessing ? (
							<div className="flex items-center gap-2">
								<div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
								Processing...
							</div>
						) : (
							<div className="flex items-center gap-2">
								{/* <Lock className="h-5 w-5" /> */}
								Complete purchase
							</div>
						)}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}