"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { Label } from "@/components/ui/label";

const BUTTON_OPTIONS = [
	"Apply now",
	"Book now",
	"Contact us",
	"Download",
	"Learn more",
	"Shop now",
	"Sign up",
	"Watch more",
];

export default function ButtonLabelSelect() {
	const [buttonLabel, setButtonLabel] = useState("Apply now");
	const [open, setOpen] = useState(false);

	return (
		<div className="space-y-2 w-full">
			<Label className="font-semibold">Button label</Label>

			<Popover
				open={open}
				onOpenChange={setOpen}
			>
				<PopoverTrigger asChild>
					<button className="w-full flex justify-between items-center border border-gray-400/30 rounded-md p-2 bg-white dark:bg-black text-sm">
						{buttonLabel}
						<ChevronDown className="h-4 w-4 opacity-70" />
					</button>
				</PopoverTrigger>

				<PopoverContent className="p-0 w-98">
					<Command>
						<CommandList className="max-h-[260px] overflow-auto">
							{BUTTON_OPTIONS.map((item) => (
								<CommandItem
									key={item}
									value={item}
									onSelect={() => {
										setButtonLabel(item);
										setOpen(false);
									}}
									className="flex items-center gap-3 py-3 px-4 cursor-pointer"
								>
									<div
										className={cn(
											"h-5 w-5 rounded-sm border flex items-center justify-center",
											buttonLabel === item
												? "border-black dark:border-white "
												: "border-gray-300"
										)}
									>
										{buttonLabel === item && (
											<Check className="h-4 w-4 text-black dark:text-white" />
										)}
									</div>

									<span>{item}</span>
								</CommandItem>
							))}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
