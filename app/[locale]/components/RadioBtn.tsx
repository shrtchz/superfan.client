"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, ChevronDown, Sparkles } from "lucide-react";
import OponIcon from "@/public/icons/OponIcon";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

// Radio Button Component
interface RadioBoxProps extends React.HTMLAttributes<HTMLDivElement> {
	checked: boolean;
	size?: number;
	color?: string;
	borderColor?: string;
	className?: string;
	disabled?: boolean;
	onChange?: () => void;
}

export const RadioBtn: React.FC<RadioBoxProps> = ({
	checked,
	size = 20,
	color = "currentColor",
	borderColor = "border-gray-300 dark:border-gray-600",
	className = "",
	disabled = false,
	onChange,
	...props
}) => {
	const containerStyle = {
		width: `${size}px`,
		height: `${size}px`,
	};

	// Calculate dot size proportionally
	const dotSize = size * 0.5;

	const handleClick = () => {
		if (!disabled && onChange) {
			onChange();
		}
	};

	return (
		<div
			className={`
        rounded-full border flex items-center justify-center p-0 overflow-visible
        transition-all duration-200 cursor-pointer select-none
        ${borderColor}
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}
        ${className}
      `}
			style={containerStyle}
			onClick={handleClick}
			role="radio"
			aria-checked={checked}
			aria-disabled={disabled}
			tabIndex={disabled ? -1 : 0}
			onKeyDown={(e) => {
				if ((e.key === "Enter" || e.key === " ") && !disabled && onChange) {
					e.preventDefault();
					onChange();
				}
			}}
			{...props}
		>
			{checked && (
				<div
					className="rounded-full bg-black dark:bg-white transition-all duration-200"
					style={{
						width: `${dotSize}px`,
						height: `${dotSize}px`,
					}}
				/>
			)}
		</div>
	);
};
