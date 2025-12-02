// Input Verification Modal Component with Feedback
"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check, X, ArrowLeft } from "lucide-react";
import { useState } from "react";

// Input Verification Modal Component - For options selection only
const InputVerificationModal: React.FC<{
	isOpen: boolean;
	onClose: () => void;
	userInput: string;
	options: string[];
	onCheckAnswer: (selectedOption: string, optionIndex: number) => void;
	onContinue: () => void;
	currentQuestionIndex: number;
	totalQuestions: number;
	showFeedback?: boolean;
	isAnswerCorrect?: boolean;
	correctAnswer?: string;
}> = ({
	isOpen,
	onClose,
	userInput,
	options,
	onCheckAnswer,
	onContinue,
	currentQuestionIndex,
	totalQuestions,
	showFeedback = false,
	isAnswerCorrect = false,
	correctAnswer = "",
}) => {
	const [selectedOption, setSelectedOption] = useState<string>("");
	const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);

	const handleOptionSelect = (option: string, index: number) => {
		setSelectedOption(option);
		setSelectedOptionIndex(index);
	};

	const handleCheckAnswerClick = () => {
		if (selectedOption && selectedOptionIndex !== -1) {
			onCheckAnswer(selectedOption, selectedOptionIndex);
		}
	};

	const handleModalContinue = () => {
		setSelectedOption("");
		setSelectedOptionIndex(-1);
		onContinue();
	};

	const handleClose = () => {
		setSelectedOption("");
		setSelectedOptionIndex(-1);
		onClose();
	};

	const handleGoBack = () => {
		setSelectedOption("");
		setSelectedOptionIndex(-1);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<Dialog
			open={isOpen}
			onOpenChange={handleClose}
		>
			<DialogContent
				className="p-0 gap-0 max-w-[400px] rounded-2xl border border-gray-200 bg-white dark:bg-black overflow-hidden"
				showCloseButton={false}
			>
				{/* Header with Arrow Back and Close Button */}
				<div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
					<div className="flex items-center gap-3">
						<button
							onClick={handleGoBack}
							className="text-black dark:text-white hover:opacity-70 transition-opacity"
							aria-label="Go back"
						>
							<ArrowLeft size={20} />
						</button>
						<span className="text-lg font-bold text-black dark:text-white">
							Your Answer
						</span>
					</div>
					<button
						onClick={handleClose}
						className="w-8 h-8 rounded-full border-2  flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors"
						aria-label="Close dialog"
					>
						<X size={16} />
					</button>
				</div>

				{/* User's Answer Section */}
				<div className="px-6 py-4 border-b border-gray-200">
					<div className="p-3 rounded">
						<p className="font-semibold text-black dark:text-white text-lg">
							{userInput}
						</p>
					</div>
				</div>

				{/* Instructions */}
				<div className="px-6 py-4 border-b border-gray-200">
					<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
						From the options below, pick the one most similar to your response
						and check it to continue.
					</p>
				</div>

				{/* Options */}
				<div className="space-y-0">
					{options.map((opt, i) => {
						const isSelected = selectedOptionIndex === i;

						return (
							<button
								key={i}
								className={`relative
                flex items-center w-full group
                border border-l-0 border-r-0 border-t-0 py-1 px-4 
                font-extrabold text-[15px]
                transition-all min-h-[60px]
                ${
									isSelected
										? "bg-black text-white dark:bg-white dark:text-black"
										: "text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
								}
              `}
								onClick={() => handleOptionSelect(opt, i)}
								aria-pressed={isSelected}
							>
								<div
									className={`
                  w-10 h-10 border-[4px] rounded-full 
                  flex items-center justify-center 
                  font-extrabold text-[14px] flex-shrink-0
                  transition-colors 
                  ${
										isSelected
											? "border-white dark:border-black"
											: "border-black dark:border-white group-hover:border-white dark:group-hover:border-black"
									}
                `}
								>
									{String.fromCharCode(65 + i)}
								</div>
								<div className="flex-1 text-left absolute left-[30%]">
									{opt}
								</div>

								{/* Show checkmark for selected option (before verification) */}
								{isSelected && !showFeedback && (
									<Check
										size={20}
										className="absolute right-4 text-white dark:text-black"
									/>
								)}

								{/* Show feedback icons after checking */}
								{showFeedback && isSelected && (
									<>
										{isAnswerCorrect ? (
											<Check
												size={20}
												className="absolute right-4 text-white"
											/>
										) : (
											<X
												size={20}
												className="absolute right-4 text-white"
											/>
										)}
									</>
								)}
							</button>
						);
					})}
				</div>

				{/* Check Answer Button */}
				<div className="px-6 py-4">
					<button
						onClick={handleCheckAnswerClick}
						disabled={!selectedOption}
						className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
					>
						Check answer
					</button>
				</div>

				{/* Feedback Section */}
				{showFeedback && (
					<div
						className={`px-4 py-4 flex items-center justify-between ${
							isAnswerCorrect ? "bg-green-100" : "bg-red-100"
						}`}
					>
						<div className="flex items-center gap-3">
							<div
								className={`w-10 h-10 rounded-full flex items-center justify-center ${
									isAnswerCorrect ? "bg-green-500" : "bg-red-500"
								}`}
							>
								{isAnswerCorrect ? (
									<Check
										size={24}
										className="text-white"
										strokeWidth={3}
									/>
								) : (
									<X
										size={24}
										className="text-white"
										strokeWidth={3}
									/>
								)}
							</div>

							<div>
								<p
									className={`font-bold text-base ${
										isAnswerCorrect ? "text-green-700" : "text-red-600"
									}`}
								>
									{isAnswerCorrect ? "Correct!" : "Incorrect"}
								</p>
								<p
									className={`text-sm font-medium ${
										isAnswerCorrect ? "text-green-700" : "text-red-600"
									}`}
								>
									{correctAnswer}
								</p>
							</div>
						</div>

						<button
							onClick={handleModalContinue}
							className={`px-6 py-2 rounded-full font-bold text-white text-sm ${
								isAnswerCorrect
									? "bg-green-500 hover:bg-green-600"
									: "bg-red-500 hover:bg-red-600"
							} transition-colors`}
						>
							Continue
						</button>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default InputVerificationModal;
