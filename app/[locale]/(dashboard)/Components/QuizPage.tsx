/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, MoreHorizontal, X, Check } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useQuizStore } from "@/store/useQuizStore";
import AngryfaceIcon from "@/public/icons/AngryfaceIcon";
import InputVerificationModal from "./InputVerification";
import CoinsIcon from "@/public/icons/CoinsIcon";
import AdModal from "./ad-modal";
// import AdModal from "./ad-modal";

export default function QuizPage() {
	const [showColorPalette, setShowColorPalette] = useState<boolean>(false);
	const [selectedPalette, setSelectedPalette] = useState<number>(0);
	const [isImageDialogOpen, setIsImageDialogOpen] = useState<boolean>(false);
	const [isEndTestDialogOpen, setIsEndTestDialogOpen] =
		useState<boolean>(false);
	const [showAnswerDialog, setShowAnswerDialog] = useState<boolean>(false);
	const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
	const [correctAnswer, setCorrectAnswer] = useState<string>("");
	const [selectedAnswerDisplay, setSelectedAnswerDisplay] =
		useState<string>("");
	const [hasCheckedAnswer, setHasCheckedAnswer] = useState<boolean>(false);
	const [showScorecard, setShowScorecard] = useState<boolean>(false);
	const [showAdModal, setShowAdModal] = useState<boolean>(false);

	// Use Zustand store
	const {
		selectedQuestionType,
		selectedAccountType,
		setSelectedAccountType,
		filteredQuestions,
		currentQuestionIndex,
		setCurrentQuestionIndex,
		accumulatedAmounts,
		calculateAccumulatedAmounts,
		level,
		subject,
		userAnswers,
		setUserAnswer,
		getUserAnswer,
		resetAllAnswers,
	} = useQuizStore();

	const current = filteredQuestions[currentQuestionIndex];
	const [isImageCollapsed, setIsImageCollapsed] = useState(false);
	const [showInputVerificationModal, setShowInputVerificationModal] =
		useState<boolean>(false);
	const [inputVerificationState, setInputVerificationState] = useState<{
		showFeedback: boolean;
		isCorrect: boolean;
		correctAnswer: string;
	}>({
		showFeedback: false,
		isCorrect: false,
		correctAnswer: "",
	});

	const currentUserAnswer = current ? getUserAnswer(current.id) : undefined;
	const [hideReward, setHideReward] = useState<boolean>(true);
	const [selectedOption, setSelectedOption] = useState<number | null>(
		currentUserAnswer?.selectedOptionIndex ?? null
	);
	const [inputAnswer, setInputAnswer] = useState<string>(
		currentUserAnswer?.inputAnswer ?? ""
	);

	useEffect(() => {
		if (current) {
			const savedAnswer = getUserAnswer(current.id);
			setSelectedOption(savedAnswer?.selectedOptionIndex ?? null);
			setInputAnswer(savedAnswer?.inputAnswer ?? "");
		}
	}, [currentQuestionIndex, current, getUserAnswer]);

	const toggleImageCollapse = () => {
		setIsImageCollapsed(!isImageCollapsed);
	};

	useEffect(() => {
		calculateAccumulatedAmounts();
	}, [selectedQuestionType, calculateAccumulatedAmounts]);

	const next = (): void => {
		if (currentQuestionIndex < filteredQuestions.length - 1) {
			if (current) {
				setUserAnswer(current.id, {
					selectedOptionIndex: selectedOption,
					inputAnswer: inputAnswer,
				});
			}
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	const prev = (): void => {
		if (currentQuestionIndex > 0) {
			if (current) {
				setUserAnswer(current.id, {
					selectedOptionIndex: selectedOption,
					inputAnswer: inputAnswer,
				});
			}
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	const handleOptionSelect = (optionIndex: number): void => {
		setSelectedOption(optionIndex);
		if (current) {
			setUserAnswer(current.id, {
				selectedOptionIndex: optionIndex,
				hasChecked: false,
			});
		}
	};

	const handleContinue = () => {
		setShowAnswerDialog(false);
		setHasCheckedAnswer(false);

		// Always show scorecard after checking answer
		setTimeout(() => {
			handleTestCompletion();
		}, 100);
	};

	const handleTestCompletion = () => {
		if (current) {
			setUserAnswer(current.id, {
				selectedOptionIndex: selectedOption,
				inputAnswer: inputAnswer,
				isCorrect: isAnswerCorrect,
				hasChecked: true,
			});
		}

		const completedQuestions = filteredQuestions.length;
		const correctAnswers = filteredQuestions.filter((question) => {
			const userAnswer = getUserAnswer(question.id);
			return userAnswer?.hasChecked && userAnswer.isCorrect;
		}).length;

		console.log(`Completed: ${completedQuestions}, Correct: ${correctAnswers}`);

		setShowScorecard(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputAnswer(value);
		if (current) {
			setUserAnswer(current.id, {
				inputAnswer: value,
				hasChecked: false,
			});
		}
	};

	const toggleColorPalette = (): void => {
		setShowColorPalette(!showColorPalette);
	};

	const openImageDialog = (): void => {
		setIsImageDialogOpen(true);
	};

	const openEndTestDialog = (): void => {
		setIsEndTestDialogOpen(true);
	};

	const handleEndTest = (): void => {
		console.log("Test ended and submitted");
		setCurrentQuestionIndex(0);
		setSelectedOption(null);
		setInputAnswer("");
		resetAllAnswers();
		setIsEndTestDialogOpen(false);
		setShowScorecard(false);
	};

	const handleRefresh = (): void => {
		setCurrentQuestionIndex(0);
		setSelectedOption(null);
		setInputAnswer("");
		resetAllAnswers();
		setIsEndTestDialogOpen(false);
		setShowScorecard(false);
	};

	const handleStartNewTest = () => {
		setShowScorecard(false);
		setShowAdModal(true);
	};

	const handleAdComplete = () => {
		setShowAdModal(false);
		handleRefresh();
	};

	const handleAdClose = () => {
		setShowAdModal(false);
	};

	const getAccountInfo = () => {
		const currentTypeAmounts = accumulatedAmounts[selectedQuestionType];

		if (selectedAccountType === "cash") {
			return {
				amount: `NGN ${currentTypeAmounts.cash.toLocaleString()}`,
				details: "Omolade Yola, 0123456789 - UBA",
			};
		} else if (selectedAccountType === "points") {
			return {
				amount: `${currentTypeAmounts.points}PTS`,
				details: "",
			};
		} else {
			return {};
		}
	};

	const accountInfo = getAccountInfo();

	const isInputQuestion: boolean = current?.input || !current?.options;

	if (!current) {
		return (
			<div className="flex items-center justify-center h-full text-gray-500">
				No questions available
			</div>
		);
	}

	const getQuestionTypeDisplayName = (type: string) => {
		const displaySubject = subject || type;

		switch (displaySubject) {
			case "isori":
			case "General":
				return <p className="flex h-max items-center gap-0.5">General</p>;
			case "alo":
			case "Folktale":
				return <p className="flex h-max items-center gap-0.5">Folktale</p>;
			case "owe":
			case "Proverbs":
				return <p className="flex h-max items-center gap-0.5">Proverbs</p>;
			default:
				return <p className="flex h-max items-center gap-0.5">General</p>;
		}
	};

	// Helper function to check input answers with flexibility
	const checkInputAnswer = (userAnswer: string): boolean => {
		if (!current?.answer) return false;

		// Case-insensitive comparison with trimmed whitespace
		const normalizedUserAnswer = userAnswer.trim().toLowerCase();
		const normalizedCorrectAnswer = current.answer.trim().toLowerCase();

		// Exact match
		if (normalizedUserAnswer === normalizedCorrectAnswer) return true;

		return false;
	};

	// Handle submit with input text checking
	const handleSubmit = () => {
		if (isInputQuestion) {
			if (inputAnswer.trim()) {
				// Check the input answer directly
				const isCorrect = checkInputAnswer(inputAnswer);

				// Set verification state
				setInputVerificationState({
					showFeedback: true,
					isCorrect: isCorrect,
					correctAnswer: current.answer || "",
				});

				// Update store with result
				setUserAnswer(current.id, {
					inputAnswer: inputAnswer,
					isCorrect: isCorrect,
					hasChecked: true,
				});

				// Show verification modal
				setShowInputVerificationModal(true);
			} else {
				alert("Please enter an answer before submitting.");
			}
		} else {
			// Handle multiple choice questions
			let selectedDisplay = "";

			if (selectedOption !== null && current.options) {
				const selectedOptionLetter = String.fromCharCode(65 + selectedOption);
				selectedDisplay = `${selectedOptionLetter}.    ${current.options[selectedOption]}`;
			} else {
				alert("Please select an answer before submitting.");
				return;
			}

			setSelectedAnswerDisplay(selectedDisplay);
			setHasCheckedAnswer(false);
			setShowAnswerDialog(true);
		}
	};

	// Handle verification for multiple choice in InputVerificationModal
	const handleVerificationCheckAnswer = (
		selectedOption: string,
		optionIndex: number
	) => {
		let correct = false;
		let correctAnswerText = "";

		if (current.answer) {
			const selectedAnswer = selectedOption;
			correct = selectedAnswer === current.answer;

			// Format the correct answer for display
			const verificationOptions = current.options || [current.answer];
			const correctIndex = verificationOptions.findIndex(
				(opt) => opt === current.answer
			);
			if (correctIndex !== -1) {
				const correctOptionLetter = String.fromCharCode(65 + correctIndex);
				correctAnswerText = `${correctOptionLetter}. ${current.answer}`;
			} else {
				correctAnswerText = current.answer;
			}
		}

		setInputVerificationState({
			showFeedback: true,
			isCorrect: correct,
			correctAnswer: correctAnswerText,
		});

		setUserAnswer(current.id, {
			selectedOptionIndex: optionIndex,
			inputAnswer: inputAnswer,
			isCorrect: correct,
			hasChecked: true,
		});
	};

	// Handle continue from input verification - also always show scorecard
	const handleVerificationContinue = () => {
		setShowInputVerificationModal(false);
		setInputVerificationState({
			showFeedback: false,
			isCorrect: false,
			correctAnswer: "",
		});

		// Clear input for next question
		setInputAnswer("");

		// Always show scorecard
		handleTestCompletion();
	};

	// Handle check answer in answer dialog (for multiple choice)
	const handleCheckAnswer = () => {
		let correct = false;
		let correctAnswerText = "";

		if (isInputQuestion) {
			// This shouldn't be called for input questions, but handle it anyway
			correct =
				inputAnswer.trim().toLowerCase() === current.answer?.toLowerCase();
			correctAnswerText = current.answer || "";
		} else {
			if (selectedOption !== null && current.answer) {
				const selectedAnswer = current.options?.[selectedOption];
				correct = selectedAnswer === current.answer;

				const correctIndex =
					current.options?.findIndex((opt) => opt === current.answer) ?? -1;
				if (correctIndex !== -1) {
					const correctOptionLetter = String.fromCharCode(65 + correctIndex);
					correctAnswerText = `${correctOptionLetter}. ${current.answer}`;
				} else {
					correctAnswerText = current.answer;
				}
			}
		}

		setIsAnswerCorrect(correct);
		setCorrectAnswer(correctAnswerText);
		setHasCheckedAnswer(true);

		setUserAnswer(current.id, {
			selectedOptionIndex: selectedOption,
			inputAnswer: inputAnswer,
			isCorrect: correct,
			hasChecked: true,
		});
	};

	const handleGoBack = () => {
		setShowAnswerDialog(false);
		setHasCheckedAnswer(false);
	};

	const getAnswerStatus = (questionId: string) => {
		const answer = getUserAnswer(questionId);
		if (
			!answer ||
			(!answer.selectedOptionIndex &&
				answer.selectedOptionIndex !== 0 &&
				!answer.inputAnswer)
		) {
			return "unanswered";
		}
		if (!answer.hasChecked) {
			return "answered";
		}
		return answer.isCorrect ? "correct" : "incorrect";
	};

	return (
		<div className="flex-1 w-full flex flex-col justify-center items-center text-black dark:text-white">
			<div
				className={`w-md xl:w-lg max-w-2xl 2xl:w-3xl h-full border border-t-0 border-b-0 overflow-hidden relative`}
			>
				{/* ===== TOP HEADER ===== */}
				<div
					className={`flex justify-between items-center px-5 py-2 pb-4 text-[13px] font-bold border-b`}
				>
					<div className="relative dark:text-white text-lg text-black w-max">
						<span className="w-max font-bold uppercase">
							{getQuestionTypeDisplayName(selectedQuestionType)}
						</span>
						<span className="w-max text-sm font-bold ml-2">
							{level && level?.charAt(0).toUpperCase() + level?.slice(1)} Level
						</span>
					</div>

					<div className="flex items-center gap-3 px-3 py-1 rounded-lg">
						<div className="">
							<div className="font-extrabold text-2xl text-black dark:text-white">
								{accountInfo.amount}
							</div>
							{selectedAccountType !== "none" && (
								<div className="text-sm text-black dark:text-white">
									Total Reward
								</div>
							)}
						</div>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button
									className={`py-1 p-0 rounded-full dark:text-white text-black hover:bg-black/20 dark:hover:bg-white/20 transition-colors`}
								>
									<MoreHorizontal size={16} />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="dark:bg-black border dark:text-white min-w-[120px]">
								<span>Reward</span>
								<DropdownMenuSeparator className="h-[0.5px] w-full bg-gray-300" />
								<DropdownMenuItem
									className={`cursor-pointer 
                    ${
											selectedAccountType === "none"
												? "dark:bg-white rounded-md bg-black/70 text-white dark:text-black"
												: ""
										}`}
									onClick={() => setSelectedAccountType("none")}
								>
									None
								</DropdownMenuItem>
								<DropdownMenuItem
									className={`cursor-pointer 
                    ${
											selectedAccountType === "cash"
												? "dark:bg-white rounded-md bg-black/70 text-white dark:text-black"
												: ""
										}`}
									onClick={() => setSelectedAccountType("cash")}
								>
									Cash
								</DropdownMenuItem>
								<DropdownMenuItem
									className={`cursor-pointer  ${
										selectedAccountType === "points"
											? "dark:bg-white rounded-md bg-black/70 text-white dark:text-black"
											: ""
									}`}
									onClick={() => setSelectedAccountType("points")}
								>
									Point
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				{/* ===== QUESTION BOX ===== */}
				<div className="flex justify-between px-6 py-2 h-24 relative border-b">
					<div className="space-y-2 text-black dark:text-white w-full">
						<div className="w-full flex h-max items-center justify-between">
							<div className="flex h-max gap-2 items-center">
								<span className="text-[13px] font-bold">
									Question {currentQuestionIndex + 1} of{" "}
									{filteredQuestions.length}
								</span>

								{selectedAccountType !== "none" &&
									!hideReward &&
									(current.cash || current.points) && (
										<>
											<div className="h-2 w-2 bg-gray-300 rounded-full"></div>
											<div className="text-sm capitalize">
												{selectedAccountType === "cash"
													? `NGN${current.cash?.toLocaleString()}`
													: `${current.points}PTS`}
											</div>
										</>
									)}
							</div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button
										className={`p-1 flex h-max gap-1 rounded-full dark:text-white text-black hover:bg-black/20 dark:hover:bg-white/20 transition-colors`}
									>
										<div className="h-4 w-4">
											<CoinsIcon />
										</div>
										<MoreHorizontal size={16} />
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="dark:bg-black border border-gray-400/30 min-w-[120px]">
									<DropdownMenuItem
										className={`cursor-pointer 
                      ${
												selectedAccountType === "cash"
													? "dark:bg-white rounded-md bg-black/70 text-white dark:text-black"
													: ""
											}`}
										onClick={() => setIsImageCollapsed(true)}
									>
										Expand Media
									</DropdownMenuItem>
									<DropdownMenuSeparator className="h-[0.5px] w-full border-b" />
									<DropdownMenuItem
										className={`cursor-pointer  ${
											selectedAccountType === "points"
												? "bg-white rounded-md dark:bg-black text-white dark:text-black"
												: ""
										}`}
										onClick={() => setHideReward(!hideReward)}
									>
										{hideReward ? "Remove Reward" : "Undo Remove"}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						<div className="text-base text-black dark:text-white font-extrabold leading-snug">
							{current.text}
						</div>
					</div>
					<div className="relative">
						<div className="absolute bottom-0.5 right-0 flex items-center gap-2">
							<button
								className={`w-6 h-6 border-2 border-black text-black dark:text-white dark:border-white rounded-full flex items-center justify-center ${
									currentQuestionIndex === 0 && "opacity-40"
								}`}
								onClick={prev}
								disabled={currentQuestionIndex === 0}
								aria-label="Previous question"
							>
								<ArrowLeft size={14} />
							</button>

							<button
								className={`w-6 h-6 border-2 border-black text-black dark:text-white dark:border-white rounded-full flex items-center justify-center ${
									currentQuestionIndex === filteredQuestions.length - 1 &&
									"opacity-40"
								}`}
								onClick={next}
								disabled={currentQuestionIndex === filteredQuestions.length - 1}
								aria-label="Next question"
							>
								<ArrowRight size={14} />
							</button>
						</div>
					</div>
				</div>

				{/* Show image for isori questions */}
				{current.image && isImageCollapsed && (
					<div
						className={`relative flex flex-col items-center justify-center p-2 py-4 border-b h-max w-full`}
					>
						<button
							className="absolute top-0 right-0 hover:bg-black hover:text-white px-2 text-sm dark:text-white text-black py-1 border rounded-bl-md border-r-0 border-t-0"
							onClick={() => {
								setIsImageCollapsed(false);
							}}
						>
							Collapse
						</button>

						<div className="p-2 w-[99%] flex justify-center items-center">
							<Image
								src={current.image || "/placeholder.svg"}
								alt="Question image"
								width={300}
								height={150}
								className="rounded-md object-cover h-[150px] w-auto"
							/>
						</div>
					</div>
				)}

				{/* ===== ANSWER AREA ===== */}
				<div className="space-y-4 mb-32">
					{isInputQuestion ? (
						<div className="flex flex-col items-center">
							{/* Input field with conditional Tailwind CSS classes */}
							<div
								className={`h-20 w-full border-b transition-all duration-300`}
							>
								<input
									id="answer-input"
									type="text"
									value={inputAnswer}
									onChange={handleInputChange}
									placeholder={
										currentUserAnswer?.hasChecked
											? currentUserAnswer.isCorrect
												? "✓ Correct answer!"
												: "✗ Try again..."
											: "Type your answer here..."
									}
									className={`w-full h-full font-extrabold text-[15px] px-6 transition-all duration-300 
                    focus:outline-none focus:ring-0 focus:border-transparent
                    ${
											currentUserAnswer?.hasChecked
												? currentUserAnswer.isCorrect
													? "text-green-800 bg-green-50 placeholder:text-green-600"
													: "text-red-800 bg-red-50 placeholder:text-red-600"
												: "text-black dark:text-white bg-transparent placeholder:text-black dark:placeholder:text-white"
										}
                  `}
									aria-label="Answer input"
									disabled={currentUserAnswer?.hasChecked}
								/>
							</div>

							{/* Feedback section below input */}
							{currentUserAnswer?.hasChecked && (
								<div className={`w-full p-4 mt-2 transition-all duration-300`}>
									<div className="flex items-center gap-3 px-2">
										{currentUserAnswer.isCorrect ? (
											<>
												<div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
													<Check
														size={20}
														className="text-white"
													/>
												</div>
												<div>
													<p className="text-green-800 font-bold text-base">
														Correct!
													</p>
													<p className="text-green-700 text-sm mt-1">
														Your answer &quot;
														<span className="font-semibold">{inputAnswer}</span>
														&quot; is correct!
													</p>
												</div>
											</>
										) : (
											<>
												<div>
													<p className="text-red-700 text-sm mt-1">
														Your answer: &quot;
														<span className="font-semibold">{inputAnswer}</span>
														&quot;
													</p>
													<p className="text-gray-700 text-sm">
														Correct answer:{" "}
														<span className="font-bold text-green-700">
															{current.answer}
														</span>
													</p>
												</div>
											</>
										)}
									</div>
								</div>
							)}
						</div>
					) : (
						<div className="">
							{current.options?.map((opt: string, i: number) => {
								const isCorrectOption =
									currentUserAnswer?.hasChecked && opt === current.answer;
								const isSelectedWrong =
									currentUserAnswer?.hasChecked &&
									selectedOption === i &&
									!currentUserAnswer.isCorrect;

								return (
									<button
										key={i}
										className={`relative
                      flex items-center w-full group
                      border border-l-0 border-r-0 border-t-0 py-1 px-4 
                      font-extrabold text-[15px]
                      transition-all duration-200 min-h-[60px]
                      ${
												selectedOption === i
													? currentUserAnswer?.hasChecked
														? currentUserAnswer.isCorrect
															? "bg-green-500 text-white hover:bg-green-600"
															: "bg-red-500 text-white hover:bg-red-600"
														: "bg-black text-white dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100"
													: isCorrectOption
													? "bg-green-100 text-green-800 border-green-300 hover:bg-green-200"
													: "text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
											}
                    `}
										onClick={() => handleOptionSelect(i)}
										aria-pressed={selectedOption === i}
									>
										<div
											className={`
                        w-10 h-10 border-[4px] rounded-full 
                        flex items-center justify-center 
                        font-extrabold text-[14px] flex-shrink-0
                        transition-colors duration-200
                        ${
													selectedOption === i
														? currentUserAnswer?.hasChecked
															? "border-white"
															: "border-white dark:border-black"
														: isCorrectOption
														? "border-green-600"
														: "border-black dark:border-white group-hover:border-white dark:group-hover:border-black"
												}
                      `}
										>
											{String.fromCharCode(65 + i)}
										</div>
										<div className="flex-1 text-left absolute left-[30%]">
											{opt}
										</div>
										{currentUserAnswer?.hasChecked && isCorrectOption && (
											<div className="absolute right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
												<Check
													size={16}
													className="text-white"
												/>
											</div>
										)}
										{isSelectedWrong && (
											<div className="absolute right-4 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
												<X
													size={16}
													className="text-white"
												/>
											</div>
										)}
									</button>
								);
							})}
						</div>
					)}
				</div>

				{/* ===== FOOTER AREA ===== */}
				<div className="absolute bottom-0 left-0 w-full border-t">
					<div className="flex w-full items-center justify-center h-14">
						<button
							className="h-full font-bold text-[14px] w-full text-black dark:text-white tracking-wide transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
							onClick={handleSubmit}
						>
							Submit
						</button>
						<div className="border-r h-full"></div>

						<button
							className="h-full font-bold text-[14px] w-full text-black dark:text-white tracking-wide transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
							onClick={() => {
								openEndTestDialog();
								setCurrentQuestionIndex(0);
								setSelectedOption(null);
								setInputAnswer("");
							}}
						>
							Quit Test
						</button>
					</div>
				</div>
			</div>

			{/* Scorecard Dialog */}
			<Dialog
				open={showScorecard}
				onOpenChange={setShowScorecard}
			>
				<DialogContent
					className="p-0 gap-0 w-sm rounded-2xl border border-gray-200 bg-white dark:bg-black overflow-hidden"
					showCloseButton={false}
				>
					{/* Header */}
					<div className="px-6 py-4 text-center border-b border-gray-200">
						<h2 className="text-2xl font-bold text-black dark:text-white mb-2">
							Your Scorecard
						</h2>
						<p className="text-gray-600 dark:text-gray-400 text-sm">
							You completed {filteredQuestions.length} questions and answered{" "}
							{
								filteredQuestions.filter((q) => getUserAnswer(q.id)?.isCorrect)
									.length
							}{" "}
							correctly!
						</p>
					</div>

					{/* Total Points */}
					<div className="px-6 py-6 text-center flex h-max items-center justify-center gap-2">
						<div className="text-gray-600 dark:text-gray-400 text-sm">
							Total points:
						</div>
						<div className="text-3xl font-bold text-black dark:text-white">
							{accumulatedAmounts[selectedQuestionType].points}PTS
						</div>
					</div>

					{/* Action Buttons */}
					<div className="px-6 py-4 border-t border-gray-200">
						<button
							onClick={handleStartNewTest}
							className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold text-sm rounded-full hover:opacity-90 transition-opacity mb-3"
						>
							Start a new Test
						</button>
					</div>
				</DialogContent>
			</Dialog>

			{/* Input Verification Modal */}
			<InputVerificationModal
				isOpen={showInputVerificationModal}
				onClose={() => {
					setShowInputVerificationModal(false);
					setInputVerificationState({
						showFeedback: false,
						isCorrect: false,
						correctAnswer: "",
					});
				}}
				userInput={inputAnswer}
				options={current?.options || []}
				onCheckAnswer={handleVerificationCheckAnswer}
				onContinue={handleVerificationContinue}
				currentQuestionIndex={currentQuestionIndex}
				totalQuestions={filteredQuestions.length}
				showFeedback={inputVerificationState.showFeedback}
				isAnswerCorrect={inputVerificationState.isCorrect}
				correctAnswer={inputVerificationState.correctAnswer}
			/>

			{/* ===== ANSWER DIALOG (For multiple choice) ===== */}
			<Dialog
				open={showAnswerDialog}
				onOpenChange={setShowAnswerDialog}
			>
				<DialogContent
					className="p-0 gap-0 max-w-[350px] rounded-xl border border-gray-200 bg-white dark:bg-black overflow-hidden"
					showCloseButton={false}
				>
					{/* Header */}
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
								Your answer
							</span>
						</div>
						<button
							onClick={() => setShowAnswerDialog(false)}
							className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors"
							aria-label="Close dialog"
						>
							<X size={16} />
						</button>
					</div>

					{/* Selected Answer Display */}
					<div className="px-6 py-4 border-b border-gray-200">
						<p className="text-xl font-bold text-black dark:text-white">
							{selectedAnswerDisplay || "No answer selected"}
						</p>
					</div>

					{/* Instruction Text */}
					<div className="px-6 py-4">
						<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
							Is this your final answer? If yes, check your answer if it right
							or wrong and continue. If not, go back and make changes.
						</p>
					</div>

					{/* Check Answer Button - Only show if not checked yet */}
					{!hasCheckedAnswer && (
						<div className="px-6 pb-4">
							<button
								onClick={handleCheckAnswer}
								className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold text-sm rounded-full hover:opacity-90 transition-opacity"
							>
								Check answer
							</button>
						</div>
					)}

					{/* Feedback Banner - Shows after checking answer */}
					{hasCheckedAnswer && (
						<div
							className={`px-4 py-4 flex items-center justify-between transition-all duration-300 ${
								isAnswerCorrect ? "bg-green-50" : "bg-red-50"
							}`}
						>
							<div className="flex items-center gap-3">
								{/* Icon */}
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

								{/* Text */}
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

							{/* Continue Button */}
							<button
								onClick={handleContinue}
								className={`px-6 py-2 rounded-full font-bold text-white text-sm transition-colors ${
									isAnswerCorrect
										? "bg-green-500 hover:bg-green-600"
										: "bg-red-500 hover:bg-red-600"
								}`}
							>
								Continue
							</button>
						</div>
					)}
				</DialogContent>
			</Dialog>

			{/* ===== END TEST DIALOG ===== */}
			<Dialog
				open={isEndTestDialogOpen}
				onOpenChange={setIsEndTestDialogOpen}
			>
				<DialogContent className="border-2 border-white text-black dark:text-white w-[300px]">
					<DialogHeader className="flex flex-col items-center justify-center">
						<span className="h-10 w-10">
							<AngryfaceIcon />
						</span>
						<DialogTitle className="text-center text-base font-bold w-[80%]">
							Wait, don&apos;t go! You&apos;ll lose your progress if you quit
							now
						</DialogTitle>
					</DialogHeader>

					<DialogFooter className="w-full">
						<div className="flex flex-col gap-2 w-full items-center">
							<button
								className="hover:text-white border hover:bg-black dark:bg-white text-black px-6 py-2 w-[90%] rounded-full font-bold transition-colors"
								onClick={() => setIsEndTestDialogOpen(false)}
							>
								Continue your Test
							</button>

							<div className="flex gap-2">
								<button
									className="text-red-600 px-4 py-2 rounded-full font-bold transition-colors"
									onClick={handleEndTest}
								>
									End it anyway
								</button>
							</div>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<AdModal
				isOpen={showAdModal}
				onClose={handleAdClose}
				onComplete={handleAdComplete}
			/>
		</div>
	);
}
