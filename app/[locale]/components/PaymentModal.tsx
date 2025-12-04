/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ArrowLeft } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

type Props = {
	open: boolean;
	onClose: () => void;
};

export default function PaymentModal({ open, onClose }: Props) {
	const [name, setName] = useState("");
	const [card, setCard] = useState("");
	const [expiry, setExpiry] = useState("");
	const [cvv, setCvv] = useState("");

	const handleSubmit = () => {
		const payload = { name, card, expiry, cvv };
		console.log("Payment Payload:", payload);
		alert("Payment submitted");
		onClose();
	};

	return (
		<Dialog
			open={open}
			onOpenChange={onClose}
		>
			<DialogContent
				showCloseButton={false}
				className="max-w-md rounded-2xl p-0 gap-0 overflow-hidden border-gray-400/30 dark:text-white"
			>
				{/* Header */}
				<DialogHeader className="flex flex-row items-center justify-between px-4 py-3 border-b">
					<DialogTitle className="flex gap-2">
						<button onClick={onClose}>
							<ArrowLeft size={20} />
						</button>
						<h2 className="font-semibold text-base">Make payment</h2>
					</DialogTitle>
					<button
						onClick={onClose}
						className="h-6 w-6 flex items-center justify-center hover:bg-gray-200 rounded-full border-gray-400/30 border"
					>
						<X size={18} />
					</button>
				</DialogHeader>

				{/* Body */}
				<div className="px5 space-y-4 ">
					<div className="p-3 space-y-2">
						<Input
							placeholder="Name on card"
							className="rounded-md h-12"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						<div className="relative">
							<Input
								placeholder="Card number"
								className="rounded-md h-12 pr-16"
								value={card}
								onChange={(e) => setCard(e.target.value)}
							/>
							<div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
								<img
									src="/visa.svg"
									className="h-5"
								/>
								<img
									src="/mastercard.svg"
									className="h-5"
								/>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<Input
								placeholder="MM/YY"
								className="rounded-md h-12"
								value={expiry}
								onChange={(e) => setExpiry(e.target.value)}
							/>
							<Input
								placeholder="CVV"
								className="rounded-md h-12"
								value={cvv}
								onChange={(e) => setCvv(e.target.value)}
							/>
						</div>
					</div>

					{/* Footer */}
					<div className="pt-4">
						<button
							className="rounded-none h-10 justify-center hover:bg-black hover:text-white flex items-center dark:hover:bg-white dark:hover:tetx-white w-full rounded-bl-xl rounded-br-xl"
							onClick={handleSubmit}
						>
							Submit
						</button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
