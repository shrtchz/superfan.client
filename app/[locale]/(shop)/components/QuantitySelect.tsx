"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/store/useCartStore";


interface QuantitySelectProps {
  itemId: string;
  currentQuantity: number;
  maxQuantity?: number;
}

export function QuantitySelect({ itemId, currentQuantity, maxQuantity = 10 }: QuantitySelectProps) {
  const { updateQuantity } = useCartStore();

  const handleQuantityChange = (value: string) => {
    const newQuantity = parseInt(value);
    updateQuantity(itemId, newQuantity);
  };

  return (
    <Select value={currentQuantity.toString()} onValueChange={handleQuantityChange}>
      <SelectTrigger className="w-20 h-8">
        <SelectValue>{currentQuantity}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: maxQuantity }, (_, i) => i + 1).map((num) => (
          <SelectItem key={num} value={num.toString()}>
            {num}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}