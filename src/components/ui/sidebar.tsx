import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/shadcn-button"

const sidebarVariants = cva(
  "fixed z-50 flex h-screen w-64 flex-col border-r bg-background/95 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-90 data-[state=open]:zoom-in-90 data-[state=closed]:ease-in data-[state=open]:ease-out",
  {
    variants: {
      position: {
        left: "left-0",
        right: "right-0",
      },
    },
    defaultVariants: {
      position: "left",
    },
  }
)

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, position, ...props }, ref) => {
    return (
      <div className={cn(sidebarVariants({ position, className }))} ref={ref} {...props} />
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div className={cn("flex items-center justify-between py-4 px-6", className)} ref={ref} {...props} />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "scroll-m-20 text-2xl font-semibold tracking-tight",
      className
    )}
    {...props}
  />
))
SidebarTitle.displayName = "SidebarTitle"

const SidebarDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SidebarDescription.displayName = "SidebarDescription"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div className={cn("flex-1 overflow-y-auto py-2 px-4", className)} ref={ref} {...props} />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div className={cn("flex items-center py-4 px-6", className)} ref={ref} {...props} />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarClose = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button
    variant="ghost"
    size="sm"
    className={cn(
      "absolute right-2 top-2 rounded-full p-1.5 opacity-0 transition-opacity hover:bg-secondary hover:text-muted-foreground focus:bg-secondary focus:text-muted-foreground sm:opacity-100",
      className
    )}
    {...props}
    ref={ref}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="sr-only">Close sidebar</span>
  </Button>
))
SidebarClose.displayName = "SidebarClose"

export {
  Sidebar,
  SidebarClose,
  SidebarContent,
  SidebarDescription,
  SidebarFooter,
  SidebarHeader,
  SidebarTitle,
}
