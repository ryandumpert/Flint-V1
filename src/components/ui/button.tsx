import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button Component - CLEAN MINIMAL STYLE
 * - All text: mist gray
 * - No shadows/glows
 * - Pill-shaped
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 backdrop-blur-xl rounded-full text-mist",
  {
    variants: {
      variant: {
        default: "bg-mist/15 border border-mist/30 hover:bg-mist/25 hover:border-mist/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        primary: "bg-flamingo/80 border border-flamingo/60 hover:bg-flamingo hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        destructive: "bg-flamingo/60 border border-flamingo/40 hover:bg-flamingo/80 hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        outline: "bg-transparent border border-mist/30 hover:bg-mist/10 hover:border-mist/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        secondary: "bg-wave/30 border border-wave/50 hover:bg-wave/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        ghost: "hover:bg-mist/10 hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        link: "underline-offset-4 hover:underline",
        vision: "bg-flamingo/20 border border-flamingo/30 hover:bg-flamingo/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 py-3.5 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
