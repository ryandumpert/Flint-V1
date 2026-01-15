import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Badge Component - 8-COLOR BRAND PALETTE
 * - Flamingo: Primary/CTA badges
 * - Sapphire: Secondary badges
 * - Turmeric: Warning/accent badges
 * - All text: mist gray (white on dark green background)
 * - Light frost glassmorphism (very lite blur)
 * - Pill-shaped
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 backdrop-blur-sm text-mist",
  {
    variants: {
      variant: {
        // Flamingo - Primary CTA badges
        default: "bg-flamingo/80 border-flamingo/60",
        vision: "bg-flamingo/80 border-flamingo/60",
        // Mist outline - subtle
        outline: "bg-mist/10 border-mist/30",
        // Sapphire - Secondary
        secondary: "bg-sapphire/60 border-sapphire/40",
        // Turmeric - Warning/destructive
        destructive: "bg-turmeric/70 border-turmeric/50",
        // Wave Blue - Partner
        partner: "bg-wave/50 border-wave/40",
        // Jade Green - Use case/success
        usecase: "bg-jade/50 border-jade/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
