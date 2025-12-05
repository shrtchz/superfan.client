/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AdModalProps {
	isOpen: boolean;
	onClose: () => void;
	onComplete: () => void;
}

export default function AdModal({ isOpen, onClose, onComplete }: AdModalProps) {
	const [currentAd, setCurrentAd] = useState(1);
	const [canSkip, setCanSkip] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const totalAds = 2;
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const skipTimerRef = useRef<NodeJS.Timeout | null>(null);

	const videoSrc = "/foot.mp4";

	useEffect(() => {
		if (isOpen) {
			setCurrentAd(1);
			setCanSkip(false);
			setCurrentTime(0);
			setIsPlaying(true);

			skipTimerRef.current = setTimeout(() => {
				setCanSkip(true);
			}, 2000);
		}

		return () => {
			if (skipTimerRef.current) {
				clearTimeout(skipTimerRef.current);
			}
		};
	}, [isOpen, currentAd]);

	useEffect(() => {
		if (videoRef.current && isOpen) {
			videoRef.current.muted = false;
			videoRef.current
				.play()
				.then(() => {
					setIsPlaying(true);
				})
				.catch((err) => {
					console.log("[v0] Autoplay failed:", err);
					setIsPlaying(false);
				});
		}
	}, [isOpen, currentAd]);

	const handleTimeUpdate = () => {
		if (videoRef.current) {
			setCurrentTime(videoRef.current.currentTime);
		}
	};

	const handleLoadedMetadata = () => {
		if (videoRef.current) {
			setDuration(videoRef.current.duration);
		}
	};

	const handleVideoEnded = () => {
		if (currentAd < totalAds) {
			setCurrentAd(currentAd + 1);
			setCanSkip(false);
			setCurrentTime(0);
			skipTimerRef.current = setTimeout(() => {
				setCanSkip(true);
			}, 2000);
		} else {
			onComplete();
		}
	};

	const handleSkip = () => {
		if (skipTimerRef.current) {
			clearTimeout(skipTimerRef.current);
		}

		if (currentAd < totalAds) {
			setCurrentAd(currentAd + 1);
			setCanSkip(false);
			setCurrentTime(0);
		} else {
			onComplete();
		}
	};

	const handleClose = () => {
		if (skipTimerRef.current) {
			clearTimeout(skipTimerRef.current);
		}
		if (videoRef.current) {
			videoRef.current.pause();
		}
		onClose();
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={handleClose}
		>
			<DialogContent
				className="p-0 gap-0 max-w-[380px] rounded-lg border border-gray-300 bg-white overflow-hidden"
				showCloseButton={false}
			>
				{/* Ad Header */}
				<div className="px-3">
					<div className="flex items-center gap-2  py-2 bg-white borderb">
						<div className="w-8 h-8 bg-[#8B1538] rounded-full flex items-center justify-center">
							<span className="text-white text-xs font-bold">sp</span>
						</div>
						<div className="flex-1">
							<div className="flex flex-col itemscenter gap-1">
								<span className="font-bold text-sm text-gray-900">Superfan</span>
								<span className="text-gray-400 text-xs">Sponsored</span>
							</div>
						</div>
					</div>
					<p className="text-xs text-gray-600 line-clamp-1">
						Own every step of the customer journey. Equifax Credit Health™ keeps
						customers on your platform...
					</p>
				</div>

				<div className="relative bg-black aspect-[4/3]">
					<video
						ref={videoRef}
						src={videoSrc}
						className="w-full h-full object-cover"
						onTimeUpdate={handleTimeUpdate}
						onLoadedMetadata={handleLoadedMetadata}
						onEnded={handleVideoEnded}
						onPlay={() => setIsPlaying(true)}
						onPause={() => setIsPlaying(false)}
						playsInline
						autoPlay
						controls
						controlsList="nodownload"
					/>
				</div>
				<div className="flex items-center justify-between mt-1 p-2">
					<span className="textwhite text-xs">
						Strengthen customer loyalty with Equifax Credit Health
					</span>
					<button className="px-3 py-1 border  border-blue-600  text-blue-400 text-xs rounded-full transition-colors">
						Request Demo
					</button>
				</div>
				{/* Footer with Ad counter and buttons */}
				<div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-t">
					<span className="text-sm text-gray-600">
						Ad {currentAd} of {totalAds}
					</span>
					<div className="flex items-center gap-3">
						<button
							onClick={handleSkip}
							disabled={!canSkip}
							className={`text-sm font-medium transition-colors  hover:text-white hover:bg-black w-20 flex items-center justify-center px-3 py-1 rounded-full border `}
						>
							Skip
						</button>
						<button
							onClick={handleClose}
							className={`text-sm font-medium transition-colors  hover:text-white hover:bg-black w-20 flex items-center justify-center px-3 py-1 rounded-full border `}
						>
							Close
						</button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
