"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import { useCartStore } from "@/stores/cart-store";
import { X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { QuantitySelect } from "./QuantitySelect";
import { RemoveConfirmationDialog } from "./Remove";

interface CartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCheckout?: () => void;
}

export function CartDialog({
  open,
  onOpenChange,
  onCheckout,
}: CartDialogProps) {
  const { items, total, itemCount, removeFromCart, updateQuantity } =
    useCartStore();
  //   const { items, total, itemCount, removeFromCart } = useCartStore();
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const formatPrice = (price: number) => {
    return `NGN ${price.toLocaleString()}`;
  };
  const handleRemoveClick = (itemId: string, itemName: string) => {
    setItemToRemove({ id: itemId, name: itemName });
    setRemoveDialogOpen(true);
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove.id);
      setRemoveDialogOpen(false);
      setItemToRemove(null);
    }
  };
  return (
		<>
			<Dialog
				open={open}
				onOpenChange={onOpenChange}
			>
				<DialogContent
					showCloseButton={false}
					className="sm:max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
				>
					<DialogHeader className="">
						<DialogTitle className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								{/* <ShoppingBag className="h-5 w-5" /> */}
								<span>
									{itemCount} ITEM{itemCount !== 1 ? "S" : ""} IN YOUR CART FOR{" "}
									{formatPrice(total)}
								</span>
							</div>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => onOpenChange(false)}
								className="h-8 w-8"
							>
								<X className="h-4 w-4" />
							</Button>
						</DialogTitle>
					</DialogHeader>

					<div className="flex-1 overflow-y-auto">
						{/* Cart Items */}
						<div className="grid grid-cols-4 border-b">
							<div className="col-span-2">ITEM</div>
							<div className="col-span-">QUANTITY</div>
							<div className="col-span-1">PRICE</div>
						</div>
						<div className="space-y-6 py-4">
							{items.map((item) => (
								<div
									key={item.id}
									className=" grid grid-cols-4"
								>
									{/* Product Image */}
									<div className=" col-span-2 flex gap-3 h-max items-center">
										<div className="relative w-20 h-20  bg-gray-100 rounded-lg flex items-center justify-center">
											{item.image ? (
												<img
													src={item.image}
													alt={item.name}
													className="w-full h-full object-cover rounded-lg"
												/>
											) : (
												<ShoppingBag className="h-8 w-8 text-gray-400" />
											)}
											<div className="absolute -top-2 right-0">
												<button
													// variant="ghost"
													// size="icon"
													onClick={() => handleRemoveClick(item.id, item.name)}
													className="h-5 w-5 hover:bg-gray-400 rounded-full border"
												>
													<X className="h-4 w-4" />
												</button>
											</div>
										</div>
										<div className="w-1/2">
											<h3 className="font-semibold text-gray-900 dark:text-white">
												{item.name}
											</h3>
										</div>
									</div>

									{/* Product Details */}
									<div className="flex-1">
										{/* <div className="flex justify-between items-start">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="h-6 w-6"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div> */}

										{/* Quantity Controls */}
										<div className="mt-3 flex items-center justify-between">
											<div className="flex items-center gap-4">
												<QuantitySelect
													itemId={item.id}
													currentQuantity={item.quantity}
													maxQuantity={20} // You can set a maximum quantity
												/>
											</div>
										</div>
									</div>
									<div className="col-span-1 h-10 flex items-center ">
										<div className="text-rigt">
											{/* <span className="text-sm text-gray-600 font-medium">PRICE</span> */}
											<p className="font-semibold text-gray-900 dark:text-white">
												{formatPrice(item.price * item.quantity)}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Footer with Totals and Actions */}
					<div className="border-t pt-4 space-y-4">
						{/* Subtotal */}
						<div className="grid grid-cols-4">
							<div className="col-span-2"></div>

							<div className="flex justify-between items- col-span-1">
								<p className="font-semibold">Subtotal</p>
							</div>
							<div className="col-span-1">
								<p className="font-semibold text-lg">{formatPrice(total)}</p>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex gap-3">
							<Button
								variant="ghost"
								onClick={() => onOpenChange(false)}
								className="flex-1 flex items-center gap-2 rounded-full border hover:bg-black hover:text-white "
							>
								Back to Shopping
							</Button>
							<Button
								className="flex-1 bg-black hover:border hover:bg-black/90 rounded-full text-white hover:text-white
                border border-white/20 dark:bg-inherit dark:hover:bg-white dark:hover:text-black dark:text-white"
								disabled={items.length === 0}
								onClick={onCheckout}
							>
								Checkout
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
			{/* Remove Confirmation Dialog */}
			<RemoveConfirmationDialog
				open={removeDialogOpen}
				onOpenChange={setRemoveDialogOpen}
				itemName={itemToRemove?.name || ""}
				onConfirm={handleConfirmRemove}
			/>
		</>
	);
}
