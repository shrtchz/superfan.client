import React from "react";

interface XBoxProps extends React.HTMLAttributes<HTMLDivElement> {
	checked: boolean;
	size?: number; // in pixels
	color?: string;
	borderColor?: string;
	className?: string;
	disabled?: boolean;
	onChange?: () => void;
}

const XBox: React.FC<XBoxProps> = ({
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

	// Match the original stroke width proportion (3.5px for 20px box)
	const strokeWidth = Math.max(2, (size * 3.5) / 20);

	const handleClick = () => {
		if (!disabled && onChange) {
			onChange();
		}
	};

	return (
		<div
			className={`
        rounded border flex items-center justify-center p-0 overflow-visible
        transition-all duration-200 cursor-pointer select-none
        ${borderColor}
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}
        ${className}
      `}
			style={containerStyle}
			onClick={handleClick}
			role="checkbox"
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
				<div className="w-full h-full relative">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke={color}
						className="absolute inset-0 w-full h-full dark:text-white"
						style={{
							strokeWidth: `${strokeWidth}px`,
						}}
						aria-hidden="true"
					>
						<path
							d="M3 3L21 21M3 21L21 3"
							strokeLinecap="square"
						/>
					</svg>
				</div>
			)}
		</div>
	);
};

export default XBox;
