/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { type ReactNode, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import MasterCardIcon from "@/public/icons/MasterCardIcon";
import VisaIcon from "@/public/icons/VisaIcon";
import UsdcIcon from "@/public/icons/UsdcIcon";
import { CreditCardIcon, X } from "lucide-react";

// ------------------- TYPES -------------------
type CardData = {
	id: string;
	type: "card";
	brand: string;
	last4: string;
	isDefault: boolean;
	icon: ReactNode;
};

type BankData = {
	id: string;
	type: "bank";
	accountName: string;
	bank: string;
	accountNumber: string;
	isDefault: boolean;
};

export type WalletData = {
	id: string;
	type: "wallet";
	token: string;
	label: string;
	address: string;
	trusted: boolean;
	isDefault: boolean;
};

type PaymentItem = CardData | BankData | WalletData;

// ------------------- INITIAL CARDS -------------------
const sampleCards: CardData[] = [
	{
		id: "1",
		type: "card",
		brand: "Mastercard",
		last4: "3456",
		isDefault: true,
		icon: <MasterCardIcon />,
	},
	{
		id: "2",
		type: "card",
		brand: "Visa",
		last4: "1234",
		isDefault: false,
		icon: <VisaIcon />,
	},
	{
		id: "3",
		type: "card",
		brand: "Verve",
		last4: "9876",
		isDefault: false,
		icon: <VisaIcon />,
	},
];
type Props = {
	open: boolean;
	onClose: () => void;
};

// ------------------- MAIN COMPONENT -------------------
export default function PaymentMethodModal({ open, onClose }: Props) {
	const [items, setItems] = useState<PaymentItem[]>(sampleCards);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [showAddOptions, setShowAddOptions] = useState(false);

	const [addCardModalOpen, setAddCardModalOpen] = useState(false);
	const [editCardModalOpen, setEditCardModalOpen] = useState(false);
	const [addBankModalOpen, setAddBankModalOpen] = useState(false);
	const [addWalletModalOpen, setAddWalletModalOpen] = useState(false);
	const [editBankModalOpen, setEditBankModalOpen] = useState(false);
	const [editWalletModalOpen, setEditWalletModalOpen] = useState(false);
	// state for delete confirmation
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
	const [deleteTargetType, setDeleteTargetType] = useState<
		"bank" | "wallet" | null
	>(null);

	// open delete modal handler
	const triggerDelete = (id: string, type: "bank" | "wallet") => {
		setDeleteTargetId(id);
		setDeleteTargetType(type);
		setDeleteModalOpen(true);
	};

	const handleDelete = () => {
		if (!deleteTargetId) return;
		setItems((prev) => prev.filter((i) => i.id !== deleteTargetId));
		setSelectedId(null);
	};

	const selectedItem = items.find((c) => c.id === selectedId);

	// ------------------- FUNCTIONS -------------------
	const handleMakeDefault = (id: string) => {
		setItems((prev) =>
			prev.map((item) => ({ ...item, isDefault: item.id === id }))
		);
	};

	const handleAddCard = (card: Omit<CardData, "id">) => {
		setItems((prev) => [...prev, { ...card, id: Date.now().toString() }]);
	};

	const handleAddBank = (bank: Omit<BankData, "id">) => {
		setItems((prev) => [...prev, { ...bank, id: Date.now().toString() }]);
	};

	const handleAddWallet = (wallet: Omit<WalletData, "id">) => {
		setItems((prev) => [...prev, { ...wallet, id: Date.now().toString() }]);
	};

	// ------------------- RENDER -------------------
	return (
		<Dialog
			open={open}
			onOpenChange={(v) => !v && onClose()}
		>
			<DialogContent
				showCloseButton={false}
				className="sm:max-w-4xl border-0 p-0 gap-0 bg-white overflow-hidden dark:bg-black dark:text-white"
			>
				<DialogHeader className="relative  border-gray-400/30 flex flex-row items-center justify-center px-2 h-8">
					{/* <DialogTitle className="text-base font-semibold">
						Payment Methods
					</DialogTitle> */}
					<button
						onClick={onClose}
						aria-label="Close"
						className="absolute right-2 h-7 w-7 flex items-center justify-center hover:bg-gray-200 rounded-full border-gray-300 border"
					>
						<X size={18} />
					</button>
				</DialogHeader>
				<div className="p-4">
					<section className="py-4 flex-1">
						<div className="mt-2 md:flex w-full gap-4">
							{/* Left Column - Payment Items */}
							<div className="md:w-1/3 space-y-4">
								{items.map((item) => (
									<Card
										key={item.id}
										className={`cursor-pointer border-gray-400/30 shadow-none p-2 gap-0 ${
											selectedId === item.id ? "border-primary" : ""
										}`}
										onClick={() => {
											setSelectedId(item.id);
											setShowAddOptions(true);
										}}
									>
										<CardContent className="flex justify-start items-start">
											<div className="font-medium flex gap-2 h-fit w-full">
												{item.type === "card" && (
													<>
														<div className="h-16 w-16 relative">
															{item.icon}
														</div>
														<div>
															<div className="py-2">
																<div className="flex gap-1 items-center text-sm">
																	{item.brand}
																	{item.isDefault && (
																		<div className="text-xs text-muted-foreground">
																			Your default
																		</div>
																	)}
																</div>
																<p className="text-xs">
																	Debit card ending in **** {item.last4}
																</p>
															</div>
														</div>
													</>
												)}
												{item.type === "bank" && (
													<div className="flex items-center gap-3 py-2">
														{/* Bank icon */}
														<div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100">
															<span className="text-xl">🏦</span>
														</div>

														{/* Bank details */}
														<div className="flex flex-col">
															<p className="font-semibold text-sm">
																{item.bank}
															</p>
															<p className="text-xs text-muted-foreground">
																Account number ending in ****
															</p>
															<p className="text-blue-600 font-medium text-sm">
																{item.accountNumber.slice(-4)}
															</p>
														</div>
													</div>
												)}

												{item.type === "wallet" && (
													<div className="flex items-center gap-3 py-2">
														{/* Wallet icon */}
														<div className="h-8 w-8">
															<img
																src="/usdc.svg"
																alt="USDC"
																width={40}
																height={40}
															/>
														</div>

														{/* Wallet details */}
														<div className="flex flex-col">
															<p className="font-semibold text-sm">
																{item.label}
															</p>
															<p className="text-xs text-muted-foreground">
																Wallet address ending in ****
															</p>
															<p className="text-blue-600 font-medium text-sm">
																{item.address.slice(-4)}
															</p>
														</div>
													</div>
												)}
											</div>
										</CardContent>
									</Card>
								))}

								{/* Add new */}
								<div
									className="flex h-20 justify-center w-full gap-3 cursor-pointer"
									onClick={() => {
										setSelectedId(null);
										setShowAddOptions(true);
									}}
								>
									<div className="border border-gray-400/30 rounded-mg h-20 justify-center flex items-center w-1/3 p-4 border-dashed">
										<div className="h-10 w-10 flex items-center rounded-full border border-gray-400/30 justify-center">
											+
										</div>
									</div>
									<div className="w-2/3 h-20 items-center flex text-blue-400">
										<p>Add a payment method</p>
									</div>
								</div>
							</div>

							{/* Right Column - Details / Add Options */}
							<div className="md:w-2/3 space-y-4">
								{selectedItem && selectedItem.type === "card" && (
									<Card className="p-2 h40 flex flex-row border-gray-400/30 shadow-none">
										<div className="h-24 w-24 relative">
											{selectedItem.icon}
										</div>
										<div className="space-y p-3">
											<div className="font-semibold">{selectedItem.brand}</div>
											<p className="text-xs">
												Debit card ending in **** {selectedItem.last4}
											</p>
											<div className="flex gap-6 h-8">
												<Button
													variant={"ghost"}
													className="p-0 h-full bg-transparent hover:bg-transparent"
													onClick={() => setEditCardModalOpen(true)}
												>
													Edit card
												</Button>
												{!selectedItem.isDefault && (
													<Button
														variant={"ghost"}
														className="p-0 h-full bg-transparent hover:bg-transparent border border-gray-400/30 border-primary/80 w-max px-2"
														onClick={() => handleMakeDefault(selectedItem.id)}
													>
														Make default
													</Button>
												)}
											</div>
										</div>
									</Card>
								)}
								{/* ----------- BANK DETAILS ----------- */}
								{selectedItem && selectedItem.type === "bank" && (
									<Card className="p-2 flex flex-row border-gray-400/30 shadow-none">
										<div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
											<span className="text-xl">🏦</span>
										</div>
										<div className="space-y p-3">
											<div className="font-semibold">{selectedItem.bank}</div>
											<p className="text-xs">
												Account ending in ****{" "}
												{selectedItem.accountNumber.slice(-4)}
											</p>
											<div className="flex gap-6 h-8">
												<Button
													variant="ghost"
													className="p-0 h-full bg-transparent hover:bg-transparent"
													onClick={() => setEditBankModalOpen(true)}
												>
													Edit bank
												</Button>
												{!selectedItem.isDefault && (
													<Button
														variant={"ghost"}
														className="p-0 h-full bg-transparent hover:bg-transparent border border-gray-400/30 border-primary/80 w-max px-2"
														onClick={() => handleMakeDefault(selectedItem.id)}
													>
														Make default
													</Button>
												)}
											</div>
										</div>
									</Card>
								)}

								{/* ----------- WALLET DETAILS ----------- */}
								{selectedItem && selectedItem.type === "wallet" && (
									<Card className="p-2 flex flex-row border-gray-400/30 shadow-none   ">
										<div className="h-8 w-8">
											<img
												src="/usdc.svg"
												alt="USDC"
												width={40}
												height={40}
											/>
										</div>
										<div className="space-y p-3">
											<div className="font-semibold">{selectedItem.type}</div>
											<p className="text-xs">
												Wallet address ending in ****{" "}
												{selectedItem.address.slice(-4)}
											</p>
											<div className="flex gap-6 h-8">
												<Button
													variant="ghost"
													className="p-0 h-full bg-transparent hover:bg-transparent"
													onClick={() => setEditWalletModalOpen(true)}
												>
													Edit wallet
												</Button>
												{!selectedItem.isDefault && (
													<Button
														variant={"ghost"}
														className="p-0 h-full bg-transparent hover:bg-transparent border border-gray-400/30 border-primary/80 w-max px-2"
														onClick={() => handleMakeDefault(selectedItem.id)}
													>
														Make default
													</Button>
												)}
											</div>
										</div>
									</Card>
								)}

								{showAddOptions && (
									<AddPaymentOptions
										onAddCardClick={() => setAddCardModalOpen(true)}
										onAddBankClick={() => setAddBankModalOpen(true)}
										onAddWalletClick={() => setAddWalletModalOpen(true)}
									/>
								)}
								{/* <EditBankModal
                  open={editBankModalOpen}
                  onOpenChange={setEditBankModalOpen}
                  bank={selectedItem as BankData}
                /> */}
								<EditBankModal
									open={editBankModalOpen}
									onOpenChange={setEditBankModalOpen}
									bank={selectedItem as BankData}
									onDelete={() =>
										triggerDelete((selectedItem as BankData)?.id, "bank")
									}
								/>

								<EditWalletModal
									open={editWalletModalOpen}
									onOpenChange={setEditWalletModalOpen}
									wallet={selectedItem as WalletData}
									onDelete={() =>
										triggerDelete((selectedItem as WalletData)?.id, "wallet")
									}
								/>

								{/* <EditWalletModal
                  open={editWalletModalOpen}
                  onOpenChange={setEditWalletModalOpen}
                  wallet={selectedItem as WalletData}
                /> */}
							</div>
						</div>
					</section>
				</div>
				<AddCardModal
					open={addCardModalOpen}
					onOpenChange={setAddCardModalOpen}
					onAdd={handleAddCard}
				/>

				<AddBankModal
					open={addBankModalOpen}
					onOpenChange={setAddBankModalOpen}
					onAdd={handleAddBank}
				/>

				<AddWalletModal
					open={addWalletModalOpen}
					onOpenChange={setAddWalletModalOpen}
					onAdd={handleAddWallet}
				/>

				<DeleteConfirmModal
					open={deleteModalOpen}
					onOpenChange={setDeleteModalOpen}
					onConfirm={handleDelete}
					type={deleteTargetType || "bank"}
				/>
			</DialogContent>
		</Dialog>
	);
}

// ------------------- PAYMENT OPTIONS COMPONENT -------------------
const paymentMethods = [
	{
		id: 1,
		name: "Visa",
		icon: <VisaIcon />,
	},
	{
		id: 2,
		name: "MasterCard",
		icon: <MasterCardIcon />,
	},
	// {
	// 	id: 3,
	// 	name: "Verve",
	// 	icon: <VisaIcon />,
	// },
	{
		id: 3,
		name: "Usdc",
        icon: <div className="h-8 w-8">
            <img src="/usdc.svg" alt="USDC" width={40} height={40} />
        </div>,
	},
];

function AddPaymentOptions({
	onAddCardClick,
	onAddBankClick,
	onAddWalletClick,
}: {
	onAddCardClick: () => void;
	onAddBankClick: () => void;
	onAddWalletClick: () => void;
}) {
	return (
		<Card className="p-4 space-y-1 flex flex-col justify-start gap-2 border-gray-400/30 shadow-none">
			<div className="text-lg font-semibold flex gap-2 h-max items-center">
				Add a New Payment Method
				<div className="flex flex-wrap items-center gap-2">
					{paymentMethods.map((method) => (
						<div
							key={method.id}
							className="flex items-center h-10 w-10"
						>
							{method.icon}
						</div>
					))}
				</div>
			</div>
			<p className="font-bold">Credit card, Bank & Stablecoin</p>
			<p>
				Drabapp accepts major credit/debit cards, bank accounts and wallets.
			</p>
			<RadioGroup defaultValue="card">
				<div className="flex items-center space-x-2">
					<RadioGroupItem
						value="card"
						id="card"
						onClick={onAddCardClick}
					/>
					<Label htmlFor="card">Add a credit or debit card</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem
						value="bank"
						id="bank"
						onClick={onAddBankClick}
					/>
					<Label htmlFor="bank">Add a bank account</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem
						value="wallet"
						id="wallet"
						onClick={onAddWalletClick}
					/>
					<Label htmlFor="wallet">Add a digital wallet</Label>
				</div>
			</RadioGroup>
		</Card>
	);
}

// ------------------- ADD CARD MODAL -------------------
function AddCardModal({
	open,
	onOpenChange,
	onAdd,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	onAdd: (card: Omit<CardData, "id">) => void;
}) {
	const [brand] = useState("Visa");
	const [isDefault] = useState(false);
	const [icon] = useState<ReactNode>(<VisaIcon />);
	const [last4, setLast4] = useState("");

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent
				showCloseButton={false}
				className="spce-y-4 p-0"
			>
				<DialogHeader className="flex px-4 h-10  flex-row items-center justify-between">
					<DialogTitle>Add a new card</DialogTitle>
					<button
						onClick={() => onOpenChange(false)}
						aria-label="Close"
					>
						<X />
					</button>
				</DialogHeader>
				<hr className="border-gray-400/30" />
				<div className="space-y-4 px-4">
					<Input
						placeholder="Name on card"
						className="h-10"
					/>
					<div className="relative">
						<Input
							placeholder="Card number"
							onChange={(e) => setLast4(e.target.value.slice(-4))}
							className="h-10"
						/>
						<div className="absolute h-10  right-2 top-0 flex items-center">
							<div className="h-10 w-10">
								<VisaIcon />
							</div>
							<div className="h-10 w-10">
								<MasterCardIcon />
							</div>
							<div className="h-8 w-8">
								<img
									src="/usdc.svg"
									alt="USDC"
									width={40}
									height={40}
								/>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<Input
							placeholder="Expiration date (MM/YY)"
							className="h-10"
						/>
						<Input
							placeholder="CVC"
							className="h-10"
						/>
					</div>
				</div>
				<hr className="border-gray-400/30" />
				<button
					// className="w-full"
					className="w-full rounded-none rounded-br-lg rounded-bl-lg h-10 hover:text-white hover:bg-black"
					onClick={() => {
						onAdd({ type: "card", brand, last4, icon, isDefault });
						onOpenChange(false);
					}}
				>
					Add
				</button>
			</DialogContent>
		</Dialog>
	);
}

// ------------------- ADD BANK MODAL -------------------
function AddBankModal({
	open,
	onOpenChange,
	onAdd,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	onAdd: (bank: Omit<BankData, "id">) => void;
}) {
	const [accountName, setAccountName] = useState("");
	const [bank, setBank] = useState("");
	const [accountNumber, setAccountNumber] = useState("");

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent
				className="w-sm    border-0 gap-0 p-0 max-w-sm"
				showCloseButton={false}
			>
				<div className="hidden">
					<DialogTitle />
				</div>
				<div className="flex items-center justify-between border-b p-2">
					<div className="flex items-center gap-2">
						<h3 className="text-lg font-semibold">Add Bank Account</h3>
					</div>
					<button
						onClick={() => onOpenChange(false)}
						aria-label="Close"
					>
						<X />
					</button>
				</div>
				<div className="flex flex-col py-1  gap-2 px-2 gap0">
					<Label className="text-sm">Account Name</Label>
					<Input
						value={accountName}
						className=""
						onChange={(e) => setAccountName(e.target.value)}
						placeholder="Full name "
					/>

					<Label className="text-sm">Bank Name</Label>
					<select
						value={bank}
						onChange={(e) => setBank(e.target.value)}
						className={`w-full p-2 rounded-md outline-none border border-gray-400/30 border-gray-300 ${
							bank ? "text-gray-800" : "text-gray-400"
						}`}
					>
						<option
							value=""
							disabled
						>
							Select bank
						</option>
						<option value="GTBank">GTBank</option>
						<option value="Access Bank">Access Bank</option>
						<option value="Zenith Bank">Zenith Bank</option>
						<option value="First Bank">First Bank</option>
						<option value="UBA">UBA</option>
						<option value="Other">Other</option>
					</select>

					<Label className="text-sm">Account Number</Label>
					<Input
						className=""
						value={accountNumber}
						onChange={(e) => setAccountNumber(e.target.value)}
						placeholder="1234567890"
					/>
				</div>
<hr className="border-gray-400/30"/>
				<button
					className="w-full rounded-none rounded-br-lg rounded-bl-lg h-10 hover:text-white hover:bg-black"
					onClick={() => {
						onAdd({
							type: "bank",
							accountName,
							bank,
							accountNumber,
							isDefault: false,
						});
						onOpenChange(false);
					}}
				>
					Add Account
				</button>
			</DialogContent>
		</Dialog>
	);
}

// ------------------- ADD WALLET MODAL -------------------
function AddWalletModal({
	open,
	onOpenChange,
	onAdd,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	onAdd: (wallet: Omit<WalletData, "id">) => void;
}) {
	const [token, setToken] = useState("cNGN");
	const [label, setLabel] = useState("");
	const [address, setAddress] = useState("");
	const [trusted, setTrusted] = useState(false);

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent
				className="w-sm    border-0 gap-0 p-0 max-w-sm"
				showCloseButton={false}
			>
				<div className="hidden">
					<DialogTitle />
				</div>
				<div className="flex items-center justify-between border-b p-2">
					<div className="flex items-center gap-2">
						<h3 className="text-lg font-semibold">Add Wallet Address</h3>
					</div>
					<button
						onClick={() => onOpenChange(false)}
						aria-label="Close"
					>
						<X />
					</button>
				</div>

				<div className="flex items-center justify-between bg-gray-100 rounded p-2">
					<div className="flex items-center gap-2">
						<div className="h-6 w-6">
							<img
								src="/usdc.svg"
								alt="USDC"
								width={40}
								height={40}
							/>
						</div>
						<div className="font-semibold">{token}</div>
					</div>
					<select
						value={token}
						onChange={(e) => setToken(e.target.value)}
						className="bg-transparent"
					>
						<option value="cNGN">cNGN</option>
						<option value="USDC">USDC</option>
						<option value="USDT">USDT</option>
					</select>
				</div>

				<div className="flex flex-col py-1  gap-2 px-2 gap0">
					<Label className="text-sm">Label</Label>
					<Input
						className=""
						value={label}
						onChange={(e) => setLabel(e.target.value)}
						placeholder="e.g. My USDT wallet"
					/>

					<Label className="text-sm">Address</Label>
					<Input
						className=""
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						placeholder="Enter wallet address"
					/>

					<div className="flex items-center gap-2">
						<input
							id="trusted"
							type="checkbox"
							checked={trusted}
							onChange={(e) => setTrusted(e.target.checked)}
						/>
						<Label htmlFor="trusted">Mark as trusted wallet</Label>
					</div>
				</div>
				<hr className="border-gray-400/30" />
				<button
					className="w-full rounded-none rounded-br-lg rounded-bl-lg h-10 hover:text-white hover:bg-black"
					onClick={() => {
						onAdd({
							type: "wallet",
							token,
							label,
							address,
							trusted,
							isDefault: false,
						});
						onOpenChange(false);
					}}
				>
					Add Wallet
				</button>
			</DialogContent>
		</Dialog>
	);
}

// ------------------- EDIT CARD MODAL -------------------
function EditCardModal({
	open,
	onOpenChange,
	card,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	card: CardData | undefined;
}) {
	const [cardNumber, setCardNumber] = useState(
		card ? `xxxx-xxxx-xxxx-${card.last4}` : ""
	);
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");
	const [cvv, setCvv] = useState("");
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	if (!card) return null;

	return (
		<>
			<Dialog
				open={open}
				onOpenChange={onOpenChange}
			>
				<DialogContent
					className="space-y-1 p-0 gap-0 w-sm"
					showCloseButton={false}
				>
					<div className="hidden">
						<DialogTitle />
					</div>

					{/* Header */}
					<div className="flex items-center justify-between px-2">
						<h3 className="text-lg font-semibold">Edit debit card</h3>
						<button
							onClick={() => onOpenChange(false)}
							aria-label="Close"
						>
							<X />
						</button>
					</div>

					{/* Card number */}
					<div className="flex flex-col gap-1 px-2">
						<Label className="text-sm">Card number</Label>
						<div className="relative">
							{card.icon}
							<Input
								value={cardNumber}
								onChange={(e) => setCardNumber(e.target.value)}
								placeholder="xxxx-xxxx-xxxx-1234"
								className="pl-12" // padding left so text doesn’t overlap icon
							/>
						</div>
					</div>

					{/* Expiry + CVV */}
					<div className="grid grid-cols-3 gap-2 px-2">
						<div className="">
							<Label className="text-sm">Month</Label>
							<Input
								className=""
								value={month}
								onChange={(e) => setMonth(e.target.value)}
								placeholder="MM"
							/>
						</div>
						<div className="">
							<Label className="text-sm">Year</Label>
							<Input
								className=""
								value={year}
								onChange={(e) => setYear(e.target.value)}
								placeholder="YY"
							/>
						</div>
						<div className="">
							<Label className="text-sm">CVV</Label>
							<Input
								className=""
								value={cvv}
								onChange={(e) => setCvv(e.target.value)}
								placeholder="Last 4 digits"
							/>
						</div>
					</div>

					{/* Actions */}
					<div className="flex gap-2 mt-2 p-2">
						<Button
							variant="ghost"
							className="w-1/2 border border-gray-400/30 border-primary"
							onClick={() => setDeleteModalOpen(true)}
						>
							Delete card
						</Button>
						<Button
							className="w-1/2 bg-purple-600 text-white hover:bg-purple-700"
							onClick={() => onOpenChange(false)}
						>
							Save card
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			{/* Delete Confirmation */}
			<DeleteCardConfirmModal
				open={deleteModalOpen}
				onOpenChange={setDeleteModalOpen}
				onConfirm={() => {
					console.log("Card deleted:", card.id);
					setDeleteModalOpen(false);
					onOpenChange(false);
				}}
			/>
		</>
	);
}

// ------------------- DELETE CARD CONFIRM MODAL -------------------
function DeleteCardConfirmModal({
	open,
	onOpenChange,
	onConfirm,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	onConfirm: () => void;
}) {
	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent
				className="w-max p-0 border-0 max-w-sm"
				showCloseButton={false}
			>
				<div className="pt-4 px-3 space-y-4">
					<DialogHeader className="px-2 flex flex-row justify-between">
						<DialogTitle>Delete card</DialogTitle>
						<button
							onClick={() => onOpenChange(false)}
							aria-label="Close"
						>
							<X />
						</button>
					</DialogHeader>
					<p className="text-sm text-gray-600">
						Are you sure you want to delete this card from your Wallet?
					</p>
				</div>
				<Button
					className="w-full rounded-none rounded-br-lg rounded-bl-lg bg-red-600 text-white hover:bg-red-700"
					onClick={() => {
						onConfirm();
						onOpenChange(false);
					}}
				>
					Confirm
				</Button>
			</DialogContent>
		</Dialog>
	);
}

function EditBankModal({
	open,
	onOpenChange,
	bank,
	onDelete,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	bank: BankData | undefined;
	onDelete: () => void;
}) {
	const [accountName, setAccountName] = useState(bank?.accountName || "");
	const [bankName, setBankName] = useState(bank?.bank || "");
	const [accountNumber, setAccountNumber] = useState(bank?.accountNumber || "");

	if (!bank) return null;

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent showCloseButton={false} className="space-y3 gap-0 max-w-sm">
				<div className="hidden">
					<DialogTitle />
				</div>
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold">Edit Bank Account</h3>
					<button
						onClick={() => onOpenChange(false)}
						aria-label="Close"
					>
						<X />
					</button>
				</div>
				<div className="flex flex-col gap-3">
					{/* Account Name */}
					<Label className="text-sm">Account Name</Label>
					<Input
						className=""
						value={accountName}
						onChange={(e) => setAccountName(e.target.value)}
						placeholder="Account Name"
					/>

					{/* Bank Name (Dropdown) */}
					<Label className="text-sm">Bank Name</Label>
					<select
						value={bankName}
						onChange={(e) => setBankName(e.target.value)}
						className="w-full input pr8 outline p-2 rounded-md"
					>
						<option value="">Select bank</option>
						<option value="GTBank">GTBank</option>
						<option value="Access Bank">Access Bank</option>
						<option value="Zenith Bank">Zenith Bank</option>
						<option value="First Bank">First Bank</option>
						<option value="UBA">UBA</option>
						<option value="Other">Other</option>
					</select>

					{/* Account Number */}
					<Label className="text-sm">Account Number</Label>
					<Input
						className=""
						value={accountNumber}
						onChange={(e) => setAccountNumber(e.target.value)}
						placeholder="Account Number"
					/>
				</div>
				{/* Actions */}
				<div className="flex gap-2 pt-2">
					<Button
						variant="ghost"
						className="w-1/2 border border-gray-400/30 border-primary"
						onClick={onDelete}
					>
						Delete bank
					</Button>
					<Button
						className="w-1/2"
						onClick={() => onOpenChange(false)}
					>
						Save bank
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function EditWalletModal({
	open,
	onOpenChange,
	wallet,
	onDelete,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	wallet: WalletData | undefined;
	onDelete: () => void;
}) {
	const [label, setLabel] = useState(wallet?.label || "");
	const [address, setAddress] = useState(wallet?.address || "");

	if (!wallet) return null;

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent
				className="space p-0 max-w-sm"
				showCloseButton={false}
			>
				<div className="hidden">
					<DialogTitle />
				</div>
				<div className="flex items-center px-2 pt-2 justify-between">
					<h3 className="text-lg font-semibold">Edit Wallet Address</h3>
					<button
						onClick={() => onOpenChange(false)}
						aria-label="Close"
					>
						<X size={18} />
					</button>
				</div>
				<hr className="border-gray-400"/>
				<div className="flex flex-col px-2 gap-3">
					<div className="">
						<Label htmlFor="Label">Label</Label>
						<Input
							className=""
							value={label}
							onChange={(e) => setLabel(e.target.value)}
							placeholder="Label"
						/>
					</div>
					<div className="">
						<Label htmlFor="Wallet Address">Wallet Address</Label>
						<Input
							className=""
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							placeholder="Wallet Address"
						/>
					</div>
				</div>
				<hr className="border border-gray-400/30 border-gray-300" />
				{/* Actions */}
				<div className="flex gap-2 p-2">
					<Button
						variant="ghost"
						className="w-[49%] border border-gray-400/30 border-primary"
						onClick={onDelete}
					>
						Delete address
					</Button>
					<Button
						className="w-[49%]"
						onClick={() => onOpenChange(false)}
					>
						Save address
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

// ------------------- DELETE CONFIRM MODAL -------------------
function DeleteConfirmModal({
	open,
	onOpenChange,
	onConfirm,
	type,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	onConfirm: () => void;
	type: "bank" | "wallet";
}) {
	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent
				className="w-max p-0 border-0"
				showCloseButton={false}
			>
				<div className="pt-4 px-2 space-y-4">
					<DialogHeader className="px-2 p-0 flex flex-row justify-between bg-transparent hover:bg-transparent">
						<DialogTitle>
							Delete {type === "bank" ? "bank account" : "wallet address"}{" "}
						</DialogTitle>
						<button
							aria-label="Close"
							onClick={() => onOpenChange(false)}
						>
							<X size={18} />
						</button>
					</DialogHeader>
					<hr className="border-gray-400"/>
					<p className="text-sm text-gray-600">
						Are you sure you want to delete this{" "}
						{type === "bank" ? "bank account" : "account"} from your wallet?
					</p>
				</div>
				<Button
					className="w-full rounded-none rounded-br-lg rounded-bl-lg bg-red-600 text-white hover:bg-red-700"
					onClick={() => {
						onConfirm();
						onOpenChange(false);
					}}
				>
					Confirm
				</Button>
			</DialogContent>
		</Dialog>
	);
}
