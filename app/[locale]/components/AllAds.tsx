/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, MoreHorizontal, ArrowUpDown } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface Ad {
	id: string;
	adId: string;
	status: "On" | "Off";
	startDate: string;
	endDate: string;
	action: string;
}

const initialAds: Ad[] = [
	{
		id: "1",
		adId: "1601371083937311",
		status: "On",
		startDate: "11/2/25",
		endDate: "14/2/25",
		action: "Deleted",
	},
	{
		id: "2",
		adId: "1601371083937311",
		status: "On",
		startDate: "11/2/25",
		endDate: "14/2/25",
		action: "Paused",
	},
];

type Props = {
	open: boolean;
	onClose: () => void;
};
export function AllAds({ onClose, open }: Props) {
	const [ads] = React.useState<Ad[]>(initialAds);
	const [selectedAds, setSelectedAds] = React.useState<string[]>([]);
	const [filterType, setFilterType] = React.useState<"all" | "active">("all");

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedAds(ads.map((ad) => ad.id));
		} else {
			setSelectedAds([]);
		}
	};

	const handleSelectAd = (adId: string, checked: boolean) => {
		if (checked) {
			setSelectedAds([...selectedAds, adId]);
		} else {
			setSelectedAds(selectedAds.filter((id) => id !== adId));
		}
	};

	const filteredAds =
		filterType === "active" ? ads.filter((ad) => ad.status === "On") : ads;

	return (
		<Dialog
			open={open}
			onOpenChange={onClose}
		>
			<DialogContent
				showCloseButton={false}
				className="sm:max-w-1/2  rounded-md p-0 gap-0 overflow-hidden border-gray-400/30 dark:text-white"
			>
				<div className="w-full border border-border rounded-lg overflow-hidden">
					<Table>
						<TableHeader>
							<TableRow className="bg-muted/30">
								<TableHead className="w-12 border-r">
									<Checkbox
										checked={
											selectedAds.length === ads.length && ads.length > 0
										}
										onCheckedChange={handleSelectAll}
									/>
								</TableHead>
								<TableHead className="w-32 border-r border-gray-400/30">
									<button
									
										className=" px-0 flex h-max gap-1  w-fit  text-left p-0 font-medium"
									>
										Off / On
										<ArrowUpDown className="ml1 h-4 w-4" />
									</button>
								</TableHead>
								<TableHead className="border-r w-[250px] border-gray-400/30">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
										<button
									
									className=" px-0 flex h-max gap-1  w-full  justify-between text-left p-0 font-medium"
								>
												<span className="flex gap-2">
													Ad
													<ArrowUpDown className="ml-1 h-4 w-4" />
												</span>

												<ChevronDown className="mr-1 h-4 w-4" />
												{/* {filterType === "all" ? "All ads" : "Active ads"} */}
											</button>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											align="end"
											className="w-max "
										>
											<DropdownMenuItem onClick={() => setFilterType("all")}>
												All ads
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => setFilterType("active")}>
												Active ads
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableHead>

								<TableHead className="border-r border-gray-400/30">
									Start Date - End Date
                                </TableHead>

								<TableHead className="w-20 border-gray-400/30">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<button
												
												className="h-8 px2 gap-1 w-full flex justify-between items-center font-medium"
											>
												<span>Actions</span>
												<ChevronDown className="h-4 w-4" />
											</button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" >
											<DropdownMenuItem>Pause</DropdownMenuItem>
											<DropdownMenuItem>Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
                                </TableHead>
                                <TableHead className="border-r border-gray-400/30">
                                </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredAds.map((ad) => (
								<TableRow key={ad.id}>
									<TableCell className="border-r">
										<Checkbox
											checked={selectedAds.includes(ad.id)}
											onCheckedChange={(checked) =>
												handleSelectAd(ad.id, checked as boolean)
											}
										/>
									</TableCell>
									<TableCell>{ad.status}</TableCell>
									<TableCell className="font-mono">{ad.adId}</TableCell>
								
									<TableCell>
										{ad.startDate} - {ad.endDate}
									</TableCell>
									<TableCell>{ad.action}</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													className="h-8 w-8 p-0"
												>
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem>Pause</DropdownMenuItem>
												<DropdownMenuItem>Delete</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</DialogContent>
		</Dialog>
	);
}
