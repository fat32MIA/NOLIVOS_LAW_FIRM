
"use client";

import * as React from "react";
import { X } from 'lucide-react';
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const modalVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8",
  {
    variants: {
      position: {
        default: "items-center justify-center",
        top: "items-start justify-center",
        bottom: "items-end justify-center",
        left: "items-center justify-start",
        right: "items-center justify-end",
      },
    },
    defaultVariants: {
      position: "default",
    },
  }
);

const Modal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    open?: boolean;
    onClose?: () => void;
    position?: "default" | "top" | "bottom" | "left" | "right";
  }
>(({ className, children, open = false, onClose, position = "default", ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(open);
  
  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);
  
  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <>
      {/* Overlay */}
      <div 
        className="modal-overlay"
        onClick={handleClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div
        ref={ref}
        className={cn(modalVariants({ position }), className)}
        {...props}
      >
        <div className="relative w-full max-w-lg rounded-lg bg-background p-6 shadow-lg transition-all card-3d">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          {children}
        </div>
      </div>
    </>
  );
});
Modal.displayName = "Modal";

const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-4 text-center sm:text-left", className)}
    {...props}
  />
));
ModalHeader.displayName = "ModalHeader";

const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));
ModalTitle.displayName = "ModalTitle";

const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
ModalDescription.displayName = "ModalDescription";

const ModalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("py-2", className)}
    {...props}
  />
));
ModalBody.displayName = "ModalBody";

const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-4 flex justify-end space-x-2", className)}
    {...props}
  />
));
ModalFooter.displayName = "ModalFooter";

export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
};
