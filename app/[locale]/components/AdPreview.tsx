import { Globe2Icon, MoreHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type Props = {
	open: boolean;
	onClose: () => void;
};
export function AdPreview({ onClose, open }: Props) {
	return (
		<Dialog
			open={open}
			onOpenChange={onClose}
		>
			<DialogContent
				showCloseButton={false}
				className="  rounded-2xl p-0 gap-0 overflow-hidden border-gray-400/30 dark:text-white"
			>
				<div className=" rounded-lg  0 bg-white shadow-sm">
					{/* Header */}
					<div className="flex items-center justify-between p-3">
						<div className="flex items-center gap-3">
							{/* Logo */}
							<div className="flex h-10 w-10 items-center justify-center rounded-full ">
								<img
									src="/shortchase_logo.jpeg"
									alt="Shortchase Logo"
									className="h-10 w-10"
								/>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900">Shortchase</h3>
								<div className="flex items-center gap-1 text-xs text-gray-500">
									<span>Sponsored</span>
									<span>·</span>
						
								</div>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<button className="rounded-full p-1.5 hover:bg-gray-100">
								<MoreHorizontal className="h-5 w-5 text-gray-600" />
							</button>
							<button
								onClick={onClose}
								className="rounded-full p-1.5 hover:bg-gray-100">
								<X className="h-5 w-5 text-gray-600" />
							</button>
						</div>
					</div>
					<hr className="border border-gray-400/30"/>
					<div className="p-2">
						<p>Own every step of the customer journey.Equifax Health keeps customer on your platform by delivering instant credit scores and reports...more</p>
</div>
					{/* Main Image */}
					<div className="p-3">

					<div className="relative border border-gray-400/30  rounded-xl">
						<img
							src="/shortchase_logo.jpeg"
							alt="Park scene with people running and cycling"
							className="w-full object-cover p-2"
							style={{ aspectRatio: "1/1" }}
						/>
					</div>
					</div>

					{/* Footer */}
					<div className="flex items-center justify-between bg-gray-50 px-4 py-3">
						<div>
							<p className="text-sm text-gray-500">shortchase.com</p>
							<p className="font-semibold text-gray-900">Make a prediction</p>
						</div>
						<Button
							variant="secondary"
							className="bg-gray-200 font-semibold text-gray-900 hover:bg-gray-300"
						>
							Apply now
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
