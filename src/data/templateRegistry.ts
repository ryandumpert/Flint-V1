import React, { lazy } from "react";

// Lazy load templates - Generic UI Components for Conversational Interfaces
export const TEMPLATE_REGISTRY: Record<string, React.FC<any>> = {
    // ==========================================
    // LAYOUT TEMPLATES
    // ==========================================

    // SplitContent: Two-column layout with image/text
    // USE FOR: About sections, hero content, side-by-side comparisons
    SplitContent: lazy(() => import("@/components/templates/SplitContent").then(m => ({ default: m.SplitContent }))),
};
