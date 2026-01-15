import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Badge Component - CLEAN MINIMAL STYLE
 * - All text: mist gray
 * - No shadows/glows
 * - Pill-shaped
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 backdrop-blur-md text-mist",
  {
    variants: {
      variant: {
        default: "bg-flamingo/80 border-flamingo/60",
        vision: "bg-flamingo/80 border-flamingo/60",
        outline: "bg-mist/10 border-mist/30",
        secondary: "bg-wave/50 border-wave/40",
        destructive: "bg-flamingo/60 border-flamingo/40",
        partner: "bg-wave/50 border-wave/40",
        usecase: "bg-mist/10 border-mist/30",
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
