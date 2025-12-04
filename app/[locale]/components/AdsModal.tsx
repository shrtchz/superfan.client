/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
	Upload,
	X,
	Info,
	ChevronLeft,
	ChevronRight,
	ArrowLeft,
} from "lucide-react";
import { BsFileImage } from "react-icons/bs";
import MoneyIcon from "@/public/icons/MoneyIcon";
import PaymentModal from "./PaymentModal";
import ButtonLabelSelect from "./ButtonLabel";
import { AdPerformance } from "./AdPerformance";
import { AllAds } from "./AllAds";
import { AdPreview } from "./AdPreview";
/**
 * CreateAdDialog.tsx
 *
 * - Two-step dialog:
 *   Step 1: Media + Description + Headline + CTA + URL
 *   Step 2: Schedule & Cost (start date/time, run continuously or days/end date, cost calc)
 *
 * - Multi-file upload (multiple at once or sequential), previews (object URLs)
 * - Remove preview, reorder previews via simple left/right buttons
 * - Headline char counter
 * - Days <-> End date sync
 * - Simple cost calc (dailyFee * days)
 *
 * Replace icon paths as needed for your assets.
 */

type MediaPreview = { id: string; url: string; name?: string; type?: string };

export default function CreateAdDialog({
	children,
}: {
	children?: React.ReactNode;
}) {
	const [open, setOpen] = useState(false);
	const [step, setStep] = useState<1 | 2>(1);
    const [activeTab, setActiveTab] = useState("all");
	// Step 1 state
	const [description, setDescription] = useState("");
	const [media, setMedia] = useState<MediaPreview[]>([]);
	const [headline, setHeadline] = useState("");
	const [buttonLabel, setButtonLabel] = useState("Apply now");
	const [websiteUrl, setWebsiteUrl] = useState("");

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
	const [dailyFee, setDailyFee] = useState<number>(500); // default ₦500/day
    const [showPayment, setShowPayment] = useState(false);
    const [showPerformance, setShowPerformance] = useState(false);
    const [showAllAds, setShowAllAds] = useState(false);
    const [showAdPreview, setShowAdPreview] = useState(false);
	// Keep endDate and days in sync
	useEffect(() => {
		// days changes -> update endDate
		const sd = new Date(startDate);
		sd.setDate(sd.getDate() + Math.max(0, days));
		setEndDate(sd.toISOString().slice(0, 10));
	}, [days, startDate]);

	useEffect(() => {
		// endDate changed manually -> update days
		const sd = new Date(startDate);
		const ed = new Date(endDate);
		const diffMs = ed.getTime() - sd.getTime();
		const newDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
		if (!Number.isNaN(newDays) && newDays >= 0) {
			setDays(newDays);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [endDate]);

	// Cost calculation
	const totalFee = useMemo(() => {
		const d = runContinuously ? 1 * dailyFee : Math.max(0, days) * dailyFee;
		return d;
	}, [dailyFee, days, runContinuously]);

	// File handling: create object URLs for preview and cleanup
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
			const merged = [...prev, ...newPreviews].slice(0, 5); // limit 5
			return merged;
		});

		// reset input so same file can be chosen again
		e.currentTarget.value = "";
	};

	// Clean up object URLs on unmount or when media removed
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

	const moveMedia = (index: number, dir: -1 | 1) => {
		setMedia((prev) => {
			const copy = [...prev];
			const newIndex = index + dir;
			if (newIndex < 0 || newIndex >= copy.length) return prev;
			const tmp = copy[newIndex];
			copy[newIndex] = copy[index];
			copy[index] = tmp;
			return copy;
		});
	};

	// Step navigation with validation
	const goToStep2 = () => {
		// minimal validations: at least one media and headline not empty
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

	const backToStep1 = () => setStep(1);

	const handlePublish = () => {
		// Compose payload
		const payload = {
			description,
			headline,
			buttonLabel,
			websiteUrl,
			media: media.map((m) => ({ name: m.name, type: m.type })), // real upload should be done separately
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
		// close dialog + reset
		setOpen(false);
		setStep(1);
	};
    const handlePerformanceClick = () => {
			setShowPerformance(true);
			setOpen(false);
    };
    const handleAllAdsClick = () => {
			setShowAllAds(true);
			setOpen(false);
    };
    const handleAdsPreviewClick = () => {
			setShowAdPreview(true);
			setOpen(false);
		};
    return (
			<>
				<Dialog
					open={open}
					onOpenChange={(v) => setOpen(v)}
				>
					<DialogTrigger asChild>
						{children || <Button className="rounded-2xl">Create New Ad</Button>}
					</DialogTrigger>

					<DialogContent
						showCloseButton={false}
						className="max-w-2xl rounded-none rounded-br-2xl rounded-bl-2xl gap-2 border-0 p-0 gap0 bg-white border-gray-400/30 overflow-hidden dark:bg-black dark:text-white "
					>
						{step === 1 && (
							<div
								onClick={(e) => e.stopPropagation()}
								className=" w-lg 
                  flex justify-end gap-2 z-[60] p-1"
							>
								<button
									onClick={handleAllAdsClick}
									className={` hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-white py-2 px-4  text-sm font-semibold border border-gray-200  `}
								>
									All ads
								</button>

								<button
									onClick={handlePerformanceClick}
									className={`hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-white py-2 px-4  text-sm font-semibold border border-gray-200 dark:bg-black text-black  `}
								>
									Ad Performance
								</button>

								<button
									onClick={handleAdsPreviewClick}
									className={` hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-white py-2 px-4  text-sm font-semibold border border-gray-200 ${"dark:bg-black text-black   "}`}
								>
									Ad preview
								</button>
							</div>
						)}
						<div className="dark:bg-black border  border-gray-400/30 rounded-tl-2xl rounded-tr-2xl dark:text-white bg-white w-full flex flex-col">
							{/* Header */}
							<div className="flex items-center justify-between px-2 py-3 h-10 border-b border-gray-400/30 ">
								<DialogTitle className="text-lg font-semibold flex flex-row items-center gap-2  ">
									{step === 2 && (
										<button
											onClick={backToStep1}
											className="flex items-center gap-1 text-sm px-2 py-1 rounded-md hover:bg-gray-100"
											aria-label="Back"
										>
											<ArrowLeft size={16} />
										</button>
									)}
									{step === 1 ? "Create new ad" : "Schedule and cost"}
								</DialogTitle>
								<div className="flex items-center gap-3">
									<button
										onClick={() => setOpen(false)}
										aria-label="Close"
										className="h-6 w-6 flex items-center justify-center hover:bg-gray-200 rounded-full border-gray-400/30 border"
									>
										<X size={18} />
									</button>
								</div>
							</div>

							{/* Body */}
							{step === 1 ? (
								<div className="p4 space-y-2 max-h-[75vh] overflow-y-auto bgwhite w-full">
									<div className="p-2 space-y-2 w-full">
										{/* Description */}
										<div className="space-y-2 ">
											<Label className="font-semibold">Description</Label>
											<Textarea
												className="rounded-md resize-none h-24"
												placeholder="Describe your ad..."
												value={description}
												onChange={(e) => setDescription(e.target.value)}
											/>
										</div>
										{/* Media top bar */}
										<div className="flex items-center gap-2 border border-gray-400/30 rounded-md px-2 py-3">
											<BsFileImage />
											<span className="font-semibold text-sm">
												Media {media.length}/5
											</span>
											<span className="text-gray-500 text-xs">
												· Select multiple images or videos to create a carousel
											</span>
											<div className="ml-auto flex items-center justify-center w-4 h-4 rounded-full border text-gray-600">
												<Info />
											</div>
										</div>

										{/* Media grid */}
										{/* Media + Upload Layout */}
										<div className="grid grid-cols-[1fr_240px] gap-4 w-full">
											{/* LEFT: Preview */}
											<div className="relative w-full aspect-[4/3]">
												{/* 1 IMAGE */}
												{media.length > 0 && (
													<div className="absolute inset-0 rounded-md overflow-hidden border border-gray-400/30 p-2">
														<img
															src={media[0].url}
															className="w-full h-full object-cover"
														/>
													</div>
												)}

												{/* 2 IMAGES */}
												{/* {media.length === 2 && (
									<div className="absolute inset-0 grid grid-cols-2 gap-2">
										{media.map((m) => (
											<div
												key={m.id}
												className="rounded-md overflow-hidden border"
											>
												<img
													src={m.url}
													className="w-full h-full object-cover"
												/>
											</div>
										))}
									</div>
								)} */}

												{/* 3 IMAGES */}
												{/* {media.length === 3 && (
									<div className="absolute inset-0 grid grid-cols-[2fr_1fr] gap-2">
										<div className="rounded-md overflow-hidden border">
											<img
												src={media[0].url}
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="grid grid-rows-2 gap-2">
											{media.slice(1).map((m) => (
												<div
													key={m.id}
													className="rounded-md overflow-hidden border"
												>
													<img
														src={m.url}
														className="w-full h-full object-cover"
													/>
												</div>
											))}
										</div>
									</div>
								)} */}

												{/* 4 IMAGES */}
												{/* {media.length === 4 && (
									<div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2">
										{media.map((m) => (
											<div
												key={m.id}
												className="rounded-md overflow-hidden border"
											>
												<img
													src={m.url}
													className="w-full h-full object-cover"
												/>
											</div>
										))}
									</div>
								)} */}

												{/* 5 IMAGES */}
												{/* {media.length === 5 && (
									<div className="absolute inset-0 grid grid-cols-[2fr_1fr] gap-2">
										<div className="rounded-md overflow-hidden border">
											<img
												src={media[0].url}
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="grid grid-cols-2 grid-rows-2 gap-2">
											{media.slice(1).map((m) => (
												<div
													key={m.id}
													className="rounded-md overflow-hidden border"
												>
													<img
														src={m.url}
														className="w-full h-full object-cover"
													/>
												</div>
											))}
										</div>
									</div>
								)} */}
											</div>

											{/* RIGHT: Upload Box */}
											{media.length < 5 && (
												<label className="border border-dashed rounded-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/30 transition">
													<Upload size={26} />
													<span className="text-sm mt-2 font-medium">
														Add photo or video
													</span>
													<input
														type="file"
														multiple
														accept="image/*,video/*"
														className="hidden"
														onChange={handleMediaUpload}
													/>
												</label>
											)}
										</div>

										{/* Headline */}
										<div className="space-y-2">
											<div className="flex justify-between">
												<Label className="font-semibold">Headline</Label>
												<p className="text-xs text-gray-500">
													{headline.length}/25
												</p>
											</div>
											<Input
												maxLength={25}
												placeholder="Headline"
												className="rounded-md"
												value={headline}
												onChange={(e) => setHeadline(e.target.value)}
											/>
										</div>

										{/* Button Label */}
										{/* <div className="space-y-2">
										<Label className="font-semibold">Button label</Label>
										<select
											className="w-full border border-gray-400/30 rounded-md p-2 bgwhite dark:bg-black dat text-sm"
											value={buttonLabel}
											onChange={(e) => setButtonLabel(e.target.value)}
										>
											<option>Apply now</option>
											<option>Learn more</option>
											<option>Sign up</option>
										</select>
									</div> */}
										<div className="w-full">
											<ButtonLabelSelect />
										</div>

										{/* Website URL */}
										<div className="space-y-2">
											<Label className="font-semibold">Website URL</Label>
											<Input
												placeholder="https://www.example.com"
												className="rounded-md"
												value={websiteUrl}
												onChange={(e) => setWebsiteUrl(e.target.value)}
											/>
										</div>
									</div>

									{/* Footer actions */}
									<div className="flex w-full pt-2  border-t">
										<button
											className="rounded-none h-10 justify-center hover:bg-black hover:text-white flex items-center dark:hover:bg-white dark:hover:tetx-white w-full rounded-bl-xl rounded-br-xl"
											onClick={goToStep2}
										>
											Next
										</button>
									</div>
								</div>
							) : (
								// Step 2 content
								<div className="p4 space-y-6 max-h-[75vh] overflow-y-auto w-full">
									<div className="space-y-3 px-4">
										<div className="py3 flex gap-2 rounded-md h-20 shadow-lg bg-gray-50 text-sm">
											<div className="w-2 h-full bg-black dark:bg-white"></div>
											<div className="">
												<p>This ad will run continuously on a daily budget</p>

												<p>
													Running an ad continuously can help improve
													performance by giving it more time to reach people
													likely to respond. If you prefer, you can set an end
													date instead.
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
											<div className=" ">
												<label className="flex items-start gap-1 cursor-pointer">
													<input
														type="radio"
														name="runMode"
														checked={runContinuously}
														onChange={() => setRunContinuously(true)}
														className="
      mt-1
      w-4 h-4
      aspect-square
      appearance-none
      rounded-full
      border border-gray-400
      bg-white
      flex items-center justify-center
      transition

      checked:border-gray-400
      checked:bg-white

      before:content-['']
      before:block
      before:w-2 before:h-2
      before:rounded-full
      before:bg-transparent
      checked:before:bg-black
    "
													/>

													<div className="text-sm">
														<p className="font-medium text-black">
															Run this ad continuously
														</p>
														<p className=" leading-tight">
															Your ad will continue to run on daily budget
															unless you pause it, which you can do any time
														</p>
													</div>
												</label>

												<label className="flex items-center gap-1 cursor-pointer">
													<input
														type="radio"
														name="runMode"
														checked={!runContinuously}
														onChange={() => setRunContinuously(false)}
														className="
      w-4 h-4
      aspect-square
      appearance-none
      rounded-full
      border border-gray-400
      bg-white
      flex items-center justify-center
      transition

      checked:border-gray-400
      checked:bg-white

      before:content-['']
      before:block
      before:w-2 before:h-2
      before:rounded-full
      before:bg-transparent
      checked:before:bg-black
    "
													/>

													<span className="text-sm text-black">
														Choose when this ad will end
													</span>
												</label>
											</div>
										</div>

										{/* {!runContinuously && ( */}
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
										{/* )} */}
									</div>
									<div className="border border-gray-400/30 border-t border-l-0 border-b-0 p-4 space-y-4 bg-gray-50">
										<div className="flex justify-between items-center">
											<div className="flex items-center gap-2 font-semibold text-inherit">
												<div className="h-6 w-6">
													<MoneyIcon />
												</div>
												<span>Cost</span>
											</div>
											<div className="">
												<p className="text-xs text-gray-500">
													The total amount to be spent for{" "}
													{runContinuously ? "1 day" : `${days} days`}: ₦
													{totalFee.toLocaleString()}
												</p>
											</div>
											<div>
												<button
													className="rounded-md border border-gray-400/30 w-14 h-8 dark:hover:bg-white dark:text-white hover:bg-black hover:text-white flex items-center justify-center"
													onClick={() => setShowPayment(true)}
												>
													Pay
												</button>
											</div>
										</div>

										<div className="grid grid-cols-2 gap-3 text-center">
											<div className="">
												<p className="text-xs ">Daily Flat Fee</p>
												<div className="border border-gray-400/30 rounded-md p-4 bg-white">
													<p className="text-xl font-bold">
														₦{dailyFee.toLocaleString()}
													</p>
												</div>
											</div>
											<div className="">
												<p className="text-xs ">Total Fee</p>
												<div className="border border-gray-400/30 rounded-md p-4 bg-white">
													<p className="text-xl font-bold">
														₦{totalFee.toLocaleString()}
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className="flex w-full pt-2  border-t">
										<button
											className="rounded-none h-10 justify-center hover:bg-black hover:text-white flex items-center dark:hover:bg-white dark:hover:tetx-white w-full rounded-bl-xl rounded-br-xl"
											onClick={handlePublish}
										>
											Publish
										</button>
									</div>
								</div>
							)}
						</div>
					</DialogContent>
				</Dialog>
				<PaymentModal
					open={showPayment}
					onClose={() => setShowPayment(false)}
				/>
				<AdPerformance
					open={showPerformance}
					onClose={() => setShowPerformance(false)}
				/>
				<AllAds
					open={showAllAds}
					onClose={() => setShowAllAds(false)}
				/>
				<AdPreview
					open={showAdPreview}
					onClose={() => setShowAdPreview(false)}
				/>
			</>
		);
}
