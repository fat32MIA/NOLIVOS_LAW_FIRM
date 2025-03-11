const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Rutas principales
const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, 'app');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');
const UI_DIR = path.join(COMPONENTS_DIR, 'ui');
const LIB_DIR = path.join(ROOT_DIR, 'lib');

// Asegurarse de que los directorios existen
function ensureDirectories() {
  const dirs = [
    COMPONENTS_DIR,
    UI_DIR,
    LIB_DIR,
    path.join(COMPONENTS_DIR, 'admin'),
    path.join(COMPONENTS_DIR, 'document-scanner'),
    path.join(COMPONENTS_DIR, 'immigration'),
    path.join(COMPONENTS_DIR, 'chat'),
  ];
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Creado directorio: ${path.relative(ROOT_DIR, dir)}`);
    }
  }
}

// Crear todos los componentes UI necesarios
function createUIComponents() {
  const components = {
    'accordion.tsx': `"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 shrink-0 transition-transform duration-200"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }`,
    
    'alert.tsx': `import * as React from "react"

import { cn } from "@/lib/utils"

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(
      "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
      className
    )}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }`,
    
    'avatar.tsx': `"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-800",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }`,
    
    'badge.tsx': `import * as React from "react"

import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success"
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 text-gray-900 hover:bg-gray-100",
    success: "bg-green-600 text-white hover:bg-green-700"
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }`,
    
    'button.tsx': `import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variantStyles = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      destructive: "bg-red-600 text-white hover:bg-red-700",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      ghost: "hover:bg-gray-100",
      link: "text-blue-600 underline-offset-4 hover:underline"
    };
    
    const sizeStyles = {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-3 rounded-md text-sm",
      lg: "h-11 px-8 rounded-md",
      icon: "h-10 w-10"
    };
    
    const combinedClassName = [
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    ].filter(Boolean).join(" ");
    
    return (
      <button
        className={combinedClassName}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }`,
    
    'card.tsx': `import * as React from "react"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={\`rounded-lg border border-gray-300 bg-white shadow-sm \${className || ''}\`}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={\`flex flex-col space-y-1.5 p-6 \${className || ''}\`}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={\`text-2xl font-semibold leading-none tracking-tight \${className || ''}\`}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={\`text-sm text-gray-500 \${className || ''}\`}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={\`p-6 pt-0 \${className || ''}\`} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={\`flex items-center p-6 pt-0 \${className || ''}\`}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }`,
    
    'input.tsx': `import * as React from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={\`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 \${className || ''}\`}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }`,
    
    'label.tsx': `"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={\`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 \${className || ''}\`}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }`,
    
    'textarea.tsx': `import * as React from "react"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={\`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-2 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 \${className || ''}\`}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }`,
    
    'dropdown-menu.tsx': `"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-gray-100 data-[state=open]:bg-gray-100",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ml-auto h-4 w-4"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-2 w-2 fill-current"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-gray-200", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}`,
    
    'tabs.tsx': `"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }`,
    
    'table.tsx': `import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-gray-50 font-medium", className)}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-50",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-gray-500", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}`,
  };
  
  for (const [file, content] of Object.entries(components)) {
    const filePath = path.join(UI_DIR, file);
    fs.writeFileSync(filePath, content);
    console.log(`✅ Creado componente UI: ${file}`);
  }
}

// Crear componente ThemeProvider
function createThemeProvider() {
  const themeProviderPath = path.join(COMPONENTS_DIR, 'theme-provider.tsx');
  const themeProviderContent = `"use client"

import * as React from "react"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
`;
  
  fs.writeFileSync(themeProviderPath, themeProviderContent);
  console.log('✅ Creado components/theme-provider.tsx');
}

// Crear utils.ts
function createUtils() {
  const utilsPath = path.join(LIB_DIR, 'utils.ts');
  const utilsContent = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;
  
  fs.writeFileSync(utilsPath, utilsContent);
  console.log('✅ Creado lib/utils.ts');
}

// Crear db.ts
function createDb() {
  const dbPath = path.join(LIB_DIR, 'db.ts');
  const dbContent = `// Simulación de base de datos
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  createdAt: Date;
}

export interface Case {
  id: string;
  clientId: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
}

export interface Document {
  id: string;
  caseId: string;
  name: string;
  type: string;
  url: string;
  createdAt: Date;
}

// Datos de ejemplo
const clients: Client[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    phone: "555-1234",
    status: "active",
    createdAt: new Date("2023-01-15")
  },
  {
    id: "2",
    name: "María López",
    email: "maria@example.com",
    phone: "555-5678",
    status: "active",
    createdAt: new Date("2023-02-20")
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    phone: "555-9012",
    status: "inactive",
    createdAt: new Date("2023-03-10")
  }
];

const cases: Case[] = [
  {
    id: "1",
    clientId: "1",
    title: "Visa de trabajo",
    description: "Solicitud de visa de trabajo H-1B",
    status: "in-progress",
    createdAt: new Date("2023-01-20")
  },
  {
    id: "2",
    clientId: "1",
    title: "Renovación de Green Card",
    description: "Renovación de tarjeta de residencia permanente",
    status: "pending",
    createdAt: new Date("2023-02-05")
  },
  {
    id: "3",
    clientId: "2",
    title: "Naturalización",
    description: "Proceso de naturalización para ciudadanía",
    status: "completed",
    createdAt: new Date("2023-02-25")
  }
];

const documents: Document[] = [
  {
    id: "1",
    caseId: "1",
    name: "Pasaporte",
    type: "identification",
    url: "/documents/passport.pdf",
    createdAt: new Date("2023-01-21")
  },
  {
    id: "2",
    caseId: "1",
    name: "Carta de empleo",
    type: "employment",
    url: "/documents/employment-letter.pdf",
    createdAt: new Date("2023-01-22")
  },
  {
    id: "3",
    caseId: "2",
    name: "Green Card actual",
    type: "identification",
    url: "/documents/green-card.pdf",
    createdAt: new Date("2023-02-06")
  }
];

// Funciones de acceso a datos
export async function getClients(): Promise<Client[]> {
  return clients;
}

export async function getClient(id: string): Promise<Client | undefined> {
  return clients.find(client => client.id === id);
}

export async function getCases(clientId?: string): Promise<Case[]> {
  if (clientId) {
    return cases.filter(c => c.clientId === clientId);
  }
  return cases;
}

export async function getCase(id: string): Promise<Case | undefined> {
  return cases.find(c => c.id === id);
}

export async function getDocuments(caseId?: string): Promise<Document[]> {
  if (caseId) {
    return documents.filter(doc => doc.caseId === caseId);
  }
  return documents;
}

export async function getDocument(id: string): Promise<Document | undefined> {
  return documents.find(doc => doc.id === id);
}
`;
  
  fs.writeFileSync(dbPath, dbContent);
  console.log('✅ Creado lib/db.ts');
}

// Crear componentes faltantes
function createMissingComponents() {
  // ApiKeySettings
  const apiKeySettingsPath = path.join(COMPONENTS_DIR, 'admin', 'api-key-settings.tsx');
  const apiKeySettingsContent = `"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function ApiKeySettings() {
  const [openaiKey, setOpenaiKey] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Aquí iría la lógica para guardar la clave API
    console.log('Guardando clave API:', openaiKey)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración de API Keys</CardTitle>
        <CardDescription>
          Configura las claves API necesarias para el funcionamiento del sistema.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="openai-key">OpenAI API Key</Label>
          <Input
            id="openai-key"
            type="password"
            placeholder="sk-..."
            value={openaiKey}
            onChange={(e) => setOpenaiKey(e.target.value)}
          />
          <p className="text-sm text-gray-500">
            Esta clave se utiliza para el asistente de inmigración y la generación de documentos.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>
          {saved ? '¡Guardado!' : 'Guardar configuración'}
        </Button>
      </CardFooter>
    </Card>
  )
}
`;
  
  fs.writeFileSync(apiKeySettingsPath, apiKeySettingsContent);
  console.log('✅ Creado components/admin/api-key-settings.tsx');
  
  // DocumentOCR
  const documentOcrPath = path.join(COMPONENTS_DIR, 'document-scanner', 'document-ocr.tsx');
  const documentOcrContent = `"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function DocumentOCR() {
  const [file, setFile] = useState<File | null>(null)
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setResult(null)
    }
  }

  const handleScan = async () => {
    if (!file) return

    setScanning(true)
    
    // Simulación de escaneo OCR
    setTimeout(() => {
      setResult("Documento escaneado correctamente. Se ha extraído el texto del documento.")
      setScanning(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Escáner de Documentos</CardTitle>
        <CardDescription>
          Sube un documento para extraer su texto mediante OCR.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            type="file"
            accept="image/png,image/jpeg,application/pdf"
            onChange={handleFileChange}
          />
          <p className="text-sm text-gray-500">
            Formatos soportados: PDF, JPG, PNG
          </p>
        </div>
        
        {file && (
          <div className="p-4 border rounded-md bg-gray-50">
            <p className="font-medium">Archivo seleccionado:</p>
            <p>{file.name}</p>
          </div>
        )}
        
        {result && (
          <div className="p-4 border rounded-md bg-green-50 text-green-700">
            {result}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleScan} 
          disabled={!file || scanning}
        >
          {scanning ? 'Escaneando...' : 'Escanear documento'}
        </Button>
      </CardFooter>
    </Card>
  )
}
`;
  
  fs.writeFileSync(documentOcrPath, documentOcrContent);
  console.log('✅ Creado components/document-scanner/document-ocr.tsx');
  
  // Chatbot
  const chatbotPath = path.join(COMPONENTS_DIR, 'immigration', 'chatbot.tsx');
  const chatbotContent = `"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy el asistente de inmigración. ¿En qué puedo ayudarte hoy?'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    // Añadir mensaje del usuario
    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Simular respuesta del asistente
    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: 'Gracias por tu pregunta. Estoy procesando la información y te responderé en breve.'
      }
      setMessages(prev => [...prev, assistantMessage])
      setLoading(false)
    }, 1000)
  }

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>Asistente de Inmigración</CardTitle>
        <CardDescription>
          Haz preguntas sobre procesos de inmigración y te ayudaré.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={\`flex \${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }\`}
            >
              <div
                className={\`max-w-[80%] rounded-lg p-3 \${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }\`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-900">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex w-full space-x-2">
          <Input
            placeholder="Escribe tu pregunta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()}>
            Enviar
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
`;
  
  fs.writeFileSync(chatbotPath, chatbotContent);
  console.log('✅ Creado components/immigration/chatbot.tsx');
  
  // ChatInterface
  const chatInterfacePath = path.join(COMPONENTS_DIR, 'chat', 'chat-interface.tsx');
  const chatInterfaceContent = `"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! Soy el asistente legal de Nolivos Law Firm. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    // Añadir mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Simular respuesta del asistente
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Gracias por tu mensaje. Estoy aquí para ayudarte con cualquier consulta legal relacionada con inmigración.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setLoading(false)
    }, 1000)
  }

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
            <AvatarFallback>NL</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Chat con Asistente Legal</CardTitle>
            <CardDescription>
              Consulta tus dudas legales en tiempo real
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={\`flex \${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }\`}
            >
              {message.role === 'assistant' && (
                <Avatar className="mr-2 h-8 w-8">
                  <AvatarFallback>NL</AvatarFallback>
                </Avatar>
              )}
              <div
                className={\`max-w-[80%] rounded-lg p-3 \${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }\`}
              >
                <div>{message.content}</div>
                <div className={\`text-xs mt-1 \${
                  message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                }\`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              {message.role === 'user' && (
                <Avatar className="ml-2 h-8 w-8">
                  <AvatarFallback>TÚ</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <Avatar className="mr-2 h-8 w-8">
                <AvatarFallback>NL</AvatarFallback>
              </Avatar>
              <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-900">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex w-full space-x-2">
          <Input
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()}>
            Enviar
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
`;
  
  fs.writeFileSync(chatInterfacePath, chatInterfaceContent);
  console.log('✅ Creado components/chat/chat-interface.tsx');
}

// Crear o actualizar páginas
function createOrUpdatePages() {
  // Página principal
  const homePage = path.join(APP_DIR, 'page.tsx');
  const homePageContent = `'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-bold text-center mb-8">Nolivos Law Firm</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <div className="rounded-lg border border-gray-300 bg-white shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-semibold">Admin</h3>
              <p className="text-sm text-gray-500">Panel de administración</p>
            </div>
            <div className="p-6 pt-0">
              <p>Acceso a todas las funciones administrativas.</p>
            </div>
            <div className="flex items-center p-6 pt-0">
              <Link href="/admin/dashboard" className="w-full">
                <button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 rounded-md font-medium">
                  Acceder
                </button>
              </Link>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-300 bg-white shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-semibold">Abogado</h3>
              <p className="text-sm text-gray-500">Panel de abogado</p>
            </div>
            <div className="p-6 pt-0">
              <p>Gestión de casos y clientes.</p>
            </div>
            <div className="flex items-center p-6 pt-0">
              <Link href="/lawyer/dashboard" className="w-full">
                <button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 rounded-md font-medium">
                  Acceder
                </button>
              </Link>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-300 bg-white shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-semibold">Cliente</h3>
              <p className="text-sm text-gray-500">Portal de cliente</p>
            </div>
            <div className="p-6 pt-0">
              <p>Seguimiento de casos y documentos.</p>
            </div>
            <div className="flex items-center p-6 pt-0">
              <Link href="/client/dashboard" className="w-full">
                <button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 rounded-md font-medium">
                  Acceder
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
`;
  
  fs.writeFileSync(homePage, homePageContent);
  console.log('✅ Actualizada página principal');
  
  // Layout principal
  const layoutPath = path.join(APP_DIR, 'layout.tsx');
  const layoutContent = `import './globals.css';
import { Suspense } from 'react';

export const metadata = {
  title: 'Nolivos Law Firm',
  description: 'Servicios legales de inmigración',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
`;
  
  fs.writeFileSync(layoutPath, layoutContent);
  console.log('✅ Actualizado layout principal');
  
  // Admin Dashboard
  const adminDashboardDir = path.join(APP_DIR, 'admin', 'dashboard');
  if (!fs.existsSync(adminDashboardDir)) {
    fs.mkdirSync(adminDashboardDir, { recursive: true });
  }
  
  const adminDashboardPath = path.join(adminDashboardDir, 'page.tsx');
  const adminDashboardContent = `'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Clientes</CardTitle>
            <CardDescription>Gestión de clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Administra la información de los clientes.</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/clients" className="w-full">
              <button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 rounded-md font-medium">
                Gestionar
              </button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Base de Datos</CardTitle>
            <CardDescription>Configuración de base de datos</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Configura la conexión a la base de datos.</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/database" className="w-full">
              <button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 rounded-md font-medium">
                Configurar
              </button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Redis</CardTitle>
            <CardDescription>Configuración de Redis</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Configura la conexión a Redis para caché.</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/redis" className="w-full">
              <button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 rounded-md font-medium">
                Configurar
              </button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Configuración General</CardTitle>
            <CardDescription>Ajustes generales</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Configura los ajustes generales del sistema.</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/settings" className="w-full">
              <button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 rounded-md font-medium">
                Configurar
              </button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>API Settings</CardTitle>
            <CardDescription>Configuración de APIs</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Configura las claves API para servicios externos.</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/api-settings" className="w-full">
              <button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 rounded-md font-medium">
                Configurar
              </button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
`;
  
  fs.writeFileSync(adminDashboardPath, adminDashboardContent);
  console.log('✅ Creada página de dashboard de administrador');
  
  // Lawyer Dashboard
  const lawyerDashboardDir = path.join(APP_DIR, 'lawyer', 'dashboard');
  if (!fs.existsSync(lawyerDashboardDir)) {
    fs.mkdirSync(lawyerDashboardDir, { recursive: true });
  }
  
  const lawyerDashboardPath = path.join(lawyerDashboardDir, 'page.tsx');
  const lawyerDashboardContent = `'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getClients, getCases } from "@/lib/db";
import { useEffect, useState } from "react";

export default function LawyerDashboard() {
  const [clients, setClients] = useState([]);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const clientsData = await getClients();
        const casesData = await getCases();
        setClients(clientsData);
        setCases(casesData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Panel de Abogado</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Clientes</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {loading ? "..." : clients.length}
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">Total de clientes activos</p>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Casos</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {loading ? "..." : cases.length}
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">Total de casos en gestión</p>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pendientes</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {loading ? "..." : cases.filter(c => c.status === "pending").length}
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">Casos pendientes de acción</p>
          </CardFooter>
        </Card>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Casos Recientes</h2>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Caso</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">Cargando casos...</TableCell>
                </TableRow>
              ) : cases.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No hay casos disponibles</TableCell>
                </TableRow>
              ) : (
                cases.slice(0, 5).map((c) => {
                  const client = clients.find(client => client.id === c.clientId);
                  return (
                    <TableRow key={c.id}>
                      <TableCell>{client ? client.name : "Cliente desconocido"}</TableCell>
                      <TableCell>{c.title}</TableCell>
                      <TableCell>
                        <Badge variant={
                          c.status === "completed" ? "success" : 
                          c.status === "in-progress" ? "default" : 
                          "secondary"
                        }>
                          {c.status === "completed" ? "Completado" : 
                           c.status === "in-progress" ? "En progreso" : 
                           "Pendiente"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Ver detalles</Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end p-4">
          <Button variant="outline">Ver todos los casos</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
`;
  
  fs.writeFileSync(lawyerDashboardPath, lawyerDashboardContent);
  console.log('✅ Creada página de dashboard de abogado');
  
  // Client Dashboard
  const clientDashboardDir = path.join(APP_DIR, 'client', 'dashboard');
  if (!fs.existsSync(clientDashboardDir)) {
    fs.mkdirSync(clientDashboardDir, { recursive: true });
  }
  
  const clientDashboardPath = path.join(clientDashboardDir, 'page.tsx');
  const clientDashboardContent = `'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCases, getDocuments } from "@/lib/db";
import { useEffect, useState } from "react";

export default function ClientDashboard() {
  const [cases, setCases] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Simulamos que el cliente actual tiene ID "1"
        const clientId = "1";
        const casesData = await getCases(clientId);
        const documentsData = await getDocuments();
        setCases(casesData);
        setDocuments(documentsData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Portal del Cliente</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Mis Casos</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {loading ? "..." : cases.length}
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">Total de casos activos</p>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Mis Documentos</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {loading ? "..." : documents.length}
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">Total de documentos</p>
          </CardFooter>
        </Card>
      </div>
      
      <Tabs defaultValue="cases" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="cases">Mis Casos</TabsTrigger>
          <TabsTrigger value="documents">Mis Documentos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cases">
          <Card>
            <CardHeader>
              <CardTitle>Casos Activos</CardTitle>
              <CardDescription>
                Listado de tus casos en proceso
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Cargando casos...</p>
              ) : cases.length === 0 ? (
                <p>No tienes casos activos</p>
              ) : (
                <div className="space-y-4">
                  {cases.map((c) => (
                    <div key={c.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{c.title}</h3>
                          <p className="text-sm text-gray-500">{c.description}</p>
                        </div>
                        <Badge variant={
                          c.status === "completed" ? "success" : 
                          c.status === "in-progress" ? "default" : 
                          "secondary"
                        }>
                          {c.status === "completed" ? "Completado" : 
                           c.status === "in-progress" ? "En progreso" : 
                           "Pendiente"}
                        </Badge>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          Fecha de inicio: {new Date(c.createdAt).toLocaleDateString()}
                        </p>
                        <Button size="sm">Ver detalles</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documentos</CardTitle>
              <CardDescription>
                Documentos relacionados con tus casos
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Cargando documentos...</p>
              ) : documents.length === 0 ? (
                <p>No tienes documentos disponibles</p>
              ) : (
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{doc.name}</h3>
                          <p className="text-sm text-gray-500">Tipo: {doc.type}</p>
                        </div>
                        <Badge>Documento</Badge>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          Fecha: {new Date(doc.createdAt).toLocaleDateString()}
                        </p>
                        <Button size="sm">Descargar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
`;
  
  fs.writeFileSync(clientDashboardPath, clientDashboardContent);
  console.log('✅ Creada página de dashboard de cliente');
  
  // API Settings
  const apiSettingsDir = path.join(APP_DIR, 'admin', 'api-settings');
  if (!fs.existsSync(apiSettingsDir)) {
    fs.mkdirSync(apiSettingsDir, { recursive: true });
  }
  
  const apiSettingsPath = path.join(apiSettingsDir, 'page.tsx');
  const apiSettingsContent = `'use client';

import ApiKeySettings from '@/components/admin/api-key-settings';

export default function ApiSettingsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Configuración de APIs</h1>
      <ApiKeySettings />
    </div>
  );
}
`;
  
  fs.writeFileSync(apiSettingsPath, apiSettingsContent);
  console.log('✅ Creada página de configuración de APIs');
  
  // Immigration Assistant
  const immigrationAssistantDir = path.join(APP_DIR, 'immigration-assistant');
  if (!fs.existsSync(immigrationAssistantDir)) {
    fs.mkdirSync(immigrationAssistantDir, { recursive: true });
  }
  
  const immigrationAssistantPath = path.join(immigrationAssistantDir, 'page.tsx');
  const immigrationAssistantContent = `'use client';

import Chatbot from '@/components/immigration/chatbot';

export default function ImmigrationAssistantPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Asistente de Inmigración</h1>
      <Chatbot />
    </div>
  );
}
`;
  
  fs.writeFileSync(immigrationAssistantPath, immigrationAssistantContent);
  console.log('✅ Creada página de asistente de inmigración');
}

// Actualizar package.json para añadir dependencias necesarias
function updatePackageJson() {
  const packageJsonPath = path.join(ROOT_DIR, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Añadir dependencias necesarias
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.dependencies["@radix-ui/react-avatar"] = "^1.0.3";
    packageJson.dependencies["@radix-ui/react-dropdown-menu"] = "^2.0.5";
    packageJson.dependencies["@radix-ui/react-label"] = "^2.0.2";
    packageJson.dependencies["@radix-ui/react-slot"] = "^1.0.2";
    packageJson.dependencies["@radix-ui/react-tabs"] = "^1.0.4";
    packageJson.dependencies["clsx"] = "^2.0.0";
    packageJson.dependencies["tailwind-merge"] = "^2.0.0";
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Actualizado package.json con dependencias necesarias');
  }
}

// Instalar dependencias
function installDependencies() {
  try {
    console.log('📦 Instalando dependencias...');
    execSync('npm install', { cwd: ROOT_DIR, stdio: 'inherit' });
    console.log('✅ Dependencias instaladas correctamente');
  } catch (error) {
    console.error('❌ Error al instalar dependencias:', error);
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando corrección completa del proyecto...');
  
  // 1. Asegurarse de que los directorios existen
  ensureDirectories();
  
  // 2. Crear todos los componentes UI necesarios
  createUIComponents();
  
  // 3. Crear componente ThemeProvider
  createThemeProvider();
  
  // 4. Crear utils.ts
  createUtils();
  
  // 5. Crear db.ts
  createDb();
  
  // 6. Crear componentes faltantes
  createMissingComponents();
  
  // 7. Crear o actualizar páginas
  createOrUpdatePages();
  
  // 8. Actualizar package.json
  updatePackageJson();
  
  // 9. Instalar dependencias
  installDependencies();
  
  console.log('');
  console.log('✅ Proyecto corregido completamente');
  console.log('');
  console.log('📋 Resumen de acciones:');
  console.log('1. Se han creado todos los componentes UI necesarios');
  console.log('2. Se ha creado el componente ThemeProvider');
  console.log('3. Se ha creado utils.ts');
  console.log('4. Se ha creado db.ts');
  console.log('5. Se han creado los componentes faltantes');
  console.log('6. Se han creado o actualizado las páginas');
  console.log('7. Se ha actualizado package.json con las dependencias necesarias');
  console.log('8. Se han instalado las dependencias');
  console.log('');
  console.log('🏁 Ahora ejecuta:');
  console.log('   npm run dev');
}

main().catch(err => {
  console.error('❌ Error en el script:', err);
  process.exit(1);
});
