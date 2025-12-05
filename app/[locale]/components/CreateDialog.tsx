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
import AddIcon from "@/public/icons/AddIcon";
import ViewAltIcon from "@/public/icons/ViewAltIcon";
import InsightIcon from "@/public/icons/InsightIcon";
import CreditCardIcon from "@/public/icons/CreditCardIcon";
import { AdsModal } from "./AdsModal";
import PaymentMethodModal from "./PaymentMethodModal";
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
    const [showAdsModal, setShowAdsModal] = useState(false);
	const [showAllAds, setShowAllAds] = useState(false);
    const [showAdPreview, setShowAdPreview] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
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
    const handleAdsModalClick = () => {
			setShowAdsModal(true);
			setOpen(false);
    };
    const handleOpenPayment = () => {
			setOpen(false);
			setOpenPayment(true);
		};
	return (
		<>
			<Dialog
				open={open}
				onOpenChange={(v) => setOpen(v)}
			>
				<DialogTrigger asChild>
					{children || (
						<Button className="rounded-2xl">Advertise with us</Button>
					)}
				</DialogTrigger>

				<DialogContent
					showCloseButton={false}
					className="max-w-2xl p-0  gap0 bg-white border-gray-400/30 overflow-hidden dark:bg-black dark:text-white "
				>
					<DialogHeader className="p-2 h-max flex flex-row items-center gap-2 border-b">
						<button className="h-8 w-8 flex items-center justify-center rounded-full border hover:bg-gray-200">
							<X />
						</button>
						<DialogTitle>Advertise with us</DialogTitle>
					</DialogHeader>
					<div className="p-2 space-y-2">
						<button
							onClick={handleAdsModalClick}
							className="flex h-max items-center gap-2"
						>
							<div className="h-8 w-8 flex justify-center items-center border rounded-md border-gray-400/20">
								<div className="h-5 w-5 r">
									<AddIcon />
								</div>
							</div>
							<p>Create a new ad</p>
						</button>
						<button
							onClick={handleAllAdsClick}
							className="flex h-max items-center gap-2"
						>
							<div className="h-8 w-8 flex justify-center items-center border rounded-md border-gray-400/20">
								<div className="h-5 w-5 r">
									<ViewAltIcon />
								</div>
							</div>
							<p>View ads</p>
						</button>
						<button
							onClick={handlePerformanceClick}
							className="flex h-max items-center gap-2"
						>
							<div className="h-8 w-8 flex justify-center items-center border rounded-md border-gray-400/20">
								<div className="h-5 w-5 r">
									<InsightIcon />
								</div>
							</div>
							<p>Ad insight</p>
						</button>
						<button
							onClick={handleOpenPayment}
							className="flex h-max items-center gap-2"
						>
							<div className="h-8 w-8 flex justify-center items-center border rounded-md border-gray-400/20">
								<div className="h-5 w-5 r">
									<CreditCardIcon />
								</div>
							</div>
							<p>Add payment method</p>
						</button>
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
			<AdsModal
				openAd={showAdsModal}
				onClose={() => setShowAdsModal(false)}
			/>
			<PaymentMethodModal
				open={openPayment}
				onClose={() => setOpenPayment(false)}
			/>
		</>
	);
}
