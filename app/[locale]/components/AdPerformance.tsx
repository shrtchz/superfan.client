/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
type Props = {
	open: boolean;
	onClose: () => void;
};
export function AdPerformance({ onClose, open }: Props) {
      const [date, setDate] = useState<Date>(new Date(2025, 11, 1)); // Dec 1, 2025
      const [endDate, setEndDate] = useState<Date>(new Date(2025, 11, 3)); // Dec 3, 2025
      const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    
      const formatDateRange = (start: Date, end: Date) => {
        return `${format(start, "MMM d, yyyy")} - ${format(end, "MMM d, yyyy")}`;
      };
    
	  const handleSelect = (range: { from?: Date; to?: Date } | undefined) => {
		if (range?.from && range?.to) {
		  setDate(range.from);
		  setEndDate(range.to);
		  setIsPopoverOpen(false);
		} else if (range?.from) {
		  setDate(range.from);
		  setEndDate(range.from);
		}
	  };
    return (
			<Dialog
				open={open}
				onOpenChange={onClose}
			>
				<DialogContent
					showCloseButton={false}
					className="sm:max-w-1/2  rounded-2xl p-0 gap-0 overflow-hidden border-gray-400/30 dark:text-white"
				>
					<div className="p-6 w-full">
						{/* Header with Date Picker */}
						<div className="mb-6 flex items-center gap-4">
							<Popover
								open={isPopoverOpen}
								onOpenChange={setIsPopoverOpen}
							>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className={cn(
											"w-max justify-start text-left font-normal",
											!date && ""
										)}
									>
										{" "}
										<CalendarIcon className="mr-2 h-4 w-4" />
										<p className="">This month:</p>
										{date ? (
											formatDateRange(date, endDate)
										) : (
											<span>Pick a date range</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="range"
										defaultMonth={date}
										selected={{ from: date, to: endDate }}
										onSelect={handleSelect}
										numberOfMonths={2}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
							{/* Views Card */}
							<Card className="border border-gray-400/30 shadow-none gap-0">
								<CardHeader className="pb-3">
									<CardTitle className="text-lg font-medium">Views</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<p>Views</p>
									<div className="flex h-max items-center gap-3">
										<div className="text-3xl font-bold">0</div>
										<div className="text-sm  mt-1">0%</div>
									</div>

									<div className="space-y-2">
										<div className="flex justify-between text-sm">
											<span className="">From registered users</span>
											<span>&lt;0.1%</span>
										</div>
									</div>

									<div className="space-y-2 border-t">
										<div className="flex gap-4 h-max items-center justifybetween text-sm">
											<span className="">Viewers</span>
											<div className="flex gap-2 h-max items-center">
												<p className="text-xl font-medium">0</p>
												<p>0%</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Interactions Card */}
							<Card className="border border-gray-400/30 shadow-none gap-0">
								<CardHeader className="pb-3">
									<CardTitle className="text-lg font-medium">
										Interactions
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<p> Content interactions	</p>
									<div className="flex h-max items-center gap-3">
										<div className="text-3xl font-bold">0</div>
										<div className="text-sm  mt-1">0%</div>
									</div>

									<div className="space-y-2">
										<div className="flex justify-between text-sm">
											<span className="">From registered users</span>
											<span></span>
										</div>
									</div>

								
								</CardContent>
							</Card>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		);
}
