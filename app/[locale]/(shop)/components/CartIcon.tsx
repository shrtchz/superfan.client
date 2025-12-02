"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { HandbagIcon } from "lucide-react";
import { CartDialog } from "./CartDiaalog";
import { useCartStore } from "@/store/useCartStore";
import { CheckoutDialog } from "./CheckoutDIalog";
; // Adjust import path as needed

export function CartIcon() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const { itemCount } = useCartStore();
  
    const handleCheckout = () => {
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
    };
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsCartOpen(true)}
        className="relative"
      >
                           <HandbagIcon className="size-6"/>

        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-black dark:bg-white dark:text-black text-white text-xs rounded-full flex items-center justify-center">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </Button>

      <CartDialog 
             open={isCartOpen} 
             onOpenChange={setIsCartOpen}
             onCheckout={handleCheckout} 
      />
      <CheckoutDialog 
        open={isCheckoutOpen} 
        onOpenChange={setIsCheckoutOpen}
      />
    </>
  );
}