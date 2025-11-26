"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


interface RemoveConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    itemName: string;
    onConfirm: () => void;
  }
  
 export  function RemoveConfirmationDialog({ open, onOpenChange, itemName, onConfirm }: RemoveConfirmationDialogProps) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">
              ARE YOU SURE YOU WANT TO REMOVE {itemName.toUpperCase()} FROM YOUR CART?
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex gap-3 justify-center mt-6">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-full"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              className="flex-1 rounded-full"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }