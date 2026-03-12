"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Dialog = ({ children, open, onOpenChange }: { children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }) => {
  const [isOpen, setIsOpen] = React.useState(open || false)
  
  React.useEffect(() => {
    if (open !== undefined) setIsOpen(open)
  }, [open])
  
  const handleClose = () => {
    setIsOpen(false)
    onOpenChange?.(false)
  }
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative z-50">
        {children}
      </div>
    </div>
  )
}

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative bg-[#042f2e] border border-white/10 rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
DialogContent.displayName = "DialogContent"

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold text-white", className)}
    {...props}
  />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-white/60", className)}
    {...props}
  />
))
DialogDescription.displayName = "DialogDescription"

const DialogClose = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:ring-offset-2"
  >
    <X className="h-4 w-4 text-white" />
    <span className="sr-only">Close</span>
  </button>
)

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose }
