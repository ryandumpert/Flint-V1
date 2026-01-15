import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button Component - 8-COLOR BRAND PALETTE
 * - Flamingo (#F2617A): Primary CTAs (call to action)
 * - Sapphire Blue (#47A1AD): Default/standard buttons
 * - Turmeric Yellow (#CC850A): Secondary/warning buttons
 * - All text: mist gray (white on dark green background)
 * - Light frost glassmorphism (very lite blur)
 * - Pill-shaped
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 backdrop-blur-sm rounded-full text-mist",
  {
    variants: {
      variant: {
        // Sapphire Blue - Default buttons
        default: "bg-sapphire/70 border border-sapphire/50 hover:bg-sapphire/90 hover:border-sapphire/70 hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        // Flamingo Pink - PRIMARY CTAs (call to action)
        primary: "bg-flamingo/80 border border-flamingo/60 hover:bg-flamingo hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        // Flamingo - Destructive/warning
        destructive: "bg-flamingo/60 border border-flamingo/40 hover:bg-flamingo/80 hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        // Outline - transparent with mist border
        outline: "bg-transparent border border-mist/30 hover:bg-mist/10 hover:border-mist/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        // Turmeric Yellow - Secondary buttons
        secondary: "bg-turmeric/70 border border-turmeric/50 hover:bg-turmeric/90 hover:border-turmeric/70 hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        // Ghost - minimal
        ghost: "hover:bg-mist/10 hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        // Link
        link: "underline-offset-4 hover:underline",
        // Vision - Flamingo accent for CTAs
        vision: "bg-flamingo/20 border border-flamingo/30 hover:bg-flamingo/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
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
