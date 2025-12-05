"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, ArrowLeft, Play, ImageIcon } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { AdPreview } from "./AdPreview";
import MediaIcon from "@/public/icons/MediaIcon";

type MediaPreview = { id: string; url: string; name?: string; type?: string };

type Props = {
	openAd: boolean;
	onClose: () => void;
};

export function AdsModal({ onClose, openAd }: Props) {
	const [open, setOpen] = useState(false);
	const [step, setStep] = useState<1 | 2>(1);
	const [activeTab, setActiveTab] = useState("all");
	const [showAdPreview, setShowAdPreview] = useState(false);

	// Step 1 state
	const [description, setDescription] = useState("");
	const [media, setMedia] = useState<MediaPreview[]>([]);
	const [headline, setHeadline] = useState("");
	const [buttonLabel, setButtonLabel] = useState("Apply now");
	const [websiteUrl, setWebsiteUrl] = useState("");
	const [editMode, setEditMode] = useState(false);

	// Step 2 state
	const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);
	const [startDate, setStartDate] = useState<string>(todayIso);
	const [startTime, setStartTime] = useState<string>(() => {
		const now = new Date();
		const h = String(now.getHours()).padStart(2, "0");
		const m = String(now.getMinutes()).padStart(2, "0");
		return `${h}:${m}`;
	});
	const [runContinuously, setRunContinuously] = useState(true);
	const [days, setDays] = useState<number>(7);
	const [endDate, setEndDate] = useState<string>(() => {
		const d = new Date();
		d.setDate(d.getDate() + 7);
		return d.toISOString().slice(0, 10);
	});

	// Cost
	const [dailyFee, setDailyFee] = useState<number>(500);
	const [showPayment, setShowPayment] = useState(false);

	useEffect(() => {
		const sd = new Date(startDate);
		sd.setDate(sd.getDate() + Math.max(0, days));
		setEndDate(sd.toISOString().slice(0, 10));
	}, [days, startDate]);

	useEffect(() => {
		const sd = new Date(startDate);
		const ed = new Date(endDate);
		const diffMs = ed.getTime() - sd.getTime();
		const newDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
		if (!Number.isNaN(newDays) && newDays >= 0) {
			setDays(newDays);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [endDate]);

	const totalFee = useMemo(() => {
		const d = runContinuously ? 1 * dailyFee : Math.max(0, days) * dailyFee;
		return d;
	}, [dailyFee, days, runContinuously]);

	const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;
		const newPreviews: MediaPreview[] = Array.from(files).map((f, i) => ({
			id: `${Date.now()}-${i}`,
			url: URL.createObjectURL(f),
			name: f.name,
			type: f.type,
		}));

		setMedia((prev) => {
			const merged = [...prev, ...newPreviews].slice(0, 5);
			return merged;
		});

		e.currentTarget.value = "";
	};

	useEffect(() => {
		return () => {
			media.forEach((m) => URL.revokeObjectURL(m.url));
		};
	}, [media]);

	const removeMedia = (index: number) => {
		setMedia((prev) => {
			const removed = prev[index];
			if (removed) URL.revokeObjectURL(removed.url);
			return prev.filter((_, i) => i !== index);
		});
	};

	const goToStep2 = () => {
		if (media.length === 0) {
			alert("Upload at least one image or video.");
			return;
		}
		if (!headline.trim()) {
			alert("Headline is required.");
			return;
		}
		setStep(2);
	};

	const backToStep1 = () => {
		if (step === 1) {
			onClose();
		}
		setStep(1);
	};
	const handleAdsPreviewClick = () => {
		setShowAdPreview(true);
		onClose();

	};
	const handlePublish = () => {
		const payload = {
			description,
			headline,
			buttonLabel,
			websiteUrl,
			media: media.map((m) => ({ name: m.name, type: m.type })),
			schedule: {
				startDate,
				startTime,
				runContinuously,
				days,
				endDate,
			},
			cost: {
				dailyFee,
				totalFee,
			},
		};

		console.log("Publish payload:", payload);
		alert("Publish clicked — payload logged to console.");
		onClose();
		setStep(1);
	};

	return (
		<>
			<Dialog
				open={openAd}
				onOpenChange={(v) => !v && onClose()}
			>
				<DialogContent
					showCloseButton={false}
					className="max-w-md gap-2 border-0 p-0 bg-white border-gray-400/30 overflow-hidden dark:bg-black dark:text-white"
				>
					<DialogHeader className="relative border-b border-gray-400/30 flex flex-row items-center justify-center px-2 h-12">
						<button
							onClick={backToStep1}
							className="absolute left-2 flex items-center gap-1 text-sm p-1 rounded-full hover:bg-gray-100 border border-gray-300"
							aria-label="Back"
						>
							<ArrowLeft size={18} />
						</button>

						<DialogTitle className="text-base font-semibold">
							{step === 1 ? "Create ad" : "Schedule and cost"}
						</DialogTitle>

						<button
							onClick={onClose}
							aria-label="Close"
							className="absolute right-2 h-7 w-7 flex items-center justify-center hover:bg-gray-200 rounded-full border-gray-300 border"
						>
							<X size={18} />
						</button>
					</DialogHeader>

					{step === 1 ? (
						<div className="space-y-4 max-h-[75vh] overflow-y-auto w-full">
							<div className="px-4 space-y-4">
								<div className="space-y-2">
									<div className="flex justify-between">
										<Label className="font-semibold">Description</Label>
										<p className="text-xs text-muted-foreground">
											{description.length}/100
										</p>
									</div>
									<Textarea
										className="rounded-md resize-none h-20 border-gray-300"
										maxLength={100}
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</div>

								<div className="flex items-center gap-2">
									<label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
										<ImageIcon size={16} />
										<span className="text-sm font-medium">Add media</span>
										<input
											type="file"
											multiple
											accept="image/*,video/*"
											className="hidden"
											onChange={handleMediaUpload}
										/>
									</label>
									<button
										onClick={() => setEditMode(!editMode)}
										className="px-3 py-2 border hover:bg-red-600 hover:text-white border-gray-300 rounded-md text-sm font-medium hover:b0"
									>
										Edit
									</button>
									<button
										onClick={handleAdsPreviewClick}

										className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
									>
										Preview ad
									</button>
								</div>

								<div className="relative border border-dashed border-gray-300 rounded-lg  h-48 flex items-center justify-center">
									{media.length > 0 ? (
										<>
											{media[0].type?.startsWith("video") ? (
												<video
													src={media[0].url}
													className="w-full h-full object-cover rounded-lg"
												/>
											) : (
												<img
													src={media[0].url || "/placeholder.svg"}
													alt="Preview"
													className="w-full h-full object-cover rounded-lg"
												/>
											)}
											{editMode && (
												<button
													onClick={() => removeMedia(0)}
													className="absolute top-2 right-2 h-6 w-6 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100"
												>
													<X size={14} />
												</button>
											)}
										</>
									) : (
										<div className="flex flex-col items-center text-gray-">
											<div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
											
													<MediaIcon/>
											</div>
											
										</div>
									)}
									{editMode && media.length > 0 && (
										<button
											onClick={() => removeMedia(0)}
											className="absolute top-2 right-2 h-6 w-6 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 border border-gray-200"
										>
											<X size={14} />
										</button>
									)}
								</div>

								<div className="space-y-2">
									<div className="flex justify-between">
										<Label className="font-semibold">Headline</Label>
										<p className="text-xs text-muted-foreground">
											{headline.length}/25
										</p>
									</div>
									<Input
										maxLength={25}
										className="rounded-md border-gray-300"
										value={headline}
										onChange={(e) => setHeadline(e.target.value)}
									/>
								</div>

								{/* Button Label */}
								<div className="space-y-2">
									<Label className="font-semibold">Button label</Label>
									<Select
										value={buttonLabel}
										onValueChange={setButtonLabel}
									>
										<SelectTrigger className="w-full border-gray-300">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Apply now">Apply now</SelectItem>
											<SelectItem value="Learn more">Learn more</SelectItem>
											<SelectItem value="Shop now">Shop now</SelectItem>
											<SelectItem value="Sign up">Sign up</SelectItem>
											<SelectItem value="Contact us">Contact us</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label className="font-semibold">Website URL</Label>
									<Input
										className="rounded-md border-gray-300"
										value={websiteUrl}
										onChange={(e) => setWebsiteUrl(e.target.value)}
									/>
								</div>
							</div>

							{/* Footer */}
							<div className="flex w-full border-t border-gray-200">
								<button
									className="h-12 justify-center hover:bg-black hover:text-white flex items-center w-full font-medium"
									onClick={goToStep2}
								>
									Next
								</button>
							</div>
						</div>
					) : (
						<div className="space-y-6 max-h-[75vh] overflow-y-auto w-full">
							<div className="space-y-3 px-4">
								<div className="flex gap-2 rounded-md shadow-sm bg-gray-50 text-sm overflow-hidden">
									<div className="w-1 bg-black dark:bg-white shrink-0"></div>
									<div className="py-3 pr-3">
										<p className="font-medium">
											This ad will run continuously on a daily budget
										</p>
										<p className="text-muted-foreground text-xs mt-1">
											Running an ad continuously can help improve performance by
											giving it more time to reach people likely to respond.
										</p>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<Label>Start date</Label>
										<Input
											type="date"
											value={startDate}
											onChange={(e) => setStartDate(e.target.value)}
											className="rounded-md"
										/>
									</div>
									<div>
										<Label>Start time</Label>
										<Input
											type="time"
											value={startTime}
											onChange={(e) => setStartTime(e.target.value)}
											className="rounded-md"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<label className="flex items-start gap-2 cursor-pointer">
										<input
											type="radio"
											name="runMode"
											checked={runContinuously}
											onChange={() => setRunContinuously(true)}
											className="mt-1 w-4 h-4 accent-black"
										/>
										<div className="text-sm">
											<p className="font-medium">Run this ad continuously</p>
											<p className="text-muted-foreground text-xs">
												Your ad will continue to run on daily budget unless you
												pause it
											</p>
										</div>
									</label>

									<label className="flex items-center gap-2 cursor-pointer">
										<input
											type="radio"
											name="runMode"
											checked={!runContinuously}
											onChange={() => setRunContinuously(false)}
											className="w-4 h-4 accent-black"
										/>
										<span className="text-sm">
											Choose when this ad will end
										</span>
									</label>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<Label>Days</Label>
										<Input
											type="number"
											min={1}
											value={days}
											onChange={(e) => setDays(Number(e.target.value))}
											className="rounded-md"
										/>
									</div>
									<div>
										<Label>End date</Label>
										<Input
											type="date"
											value={endDate}
											onChange={(e) => setEndDate(e.target.value)}
											className="rounded-md"
										/>
									</div>
								</div>
							</div>

							<div className="border-t border-gray-200 p-4 space-y-4 bg-gray-50">
								<div className="flex justify-between items-center">
									<span className="font-semibold">Cost</span>
									<p className="text-xs text-muted-foreground">
										Total for {runContinuously ? "1 day" : `${days} days`}: ₦
										{totalFee.toLocaleString()}
									</p>
									<button
										className="rounded-md border border-gray-300 px-4 py-1.5 text-sm hover:bg-black hover:text-white"
										onClick={() => setShowPayment(true)}
									>
										Pay
									</button>
								</div>

								<div className="grid grid-cols-2 gap-3 text-center">
									<div>
										<p className="text-xs mb-1">Daily Flat Fee</p>
										<div className="border border-gray-300 rounded-md p-3 bg-white">
											<p className="text-lg font-bold">
												₦{dailyFee.toLocaleString()}
											</p>
										</div>
									</div>
									<div>
										<p className="text-xs mb-1">Total Fee</p>
										<div className="border border-gray-300 rounded-md p-3 bg-white">
											<p className="text-lg font-bold">
												₦{totalFee.toLocaleString()}
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className="flex w-full border-t border-gray-200">
								<button
									className="h-12 justify-center hover:bg-black hover:text-white flex items-center w-full font-medium"
									onClick={handlePublish}
								>
									Publish
								</button>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
			<AdPreview
				open={showAdPreview}
				onClose={() => setShowAdPreview(false)}
			/>
		</>
	);
}
