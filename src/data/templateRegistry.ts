import React, { lazy } from "react";

// Lazy load templates - Fiserv Offer Engine Demo
export const TEMPLATE_REGISTRY: Record<string, React.FC<any>> = {
    // Fiserv Offer Engine (9 templates)
    ProblemSolutionMatrix: lazy(() => import("@/components/templates/ProblemSolutionMatrix").then(m => ({ default: m.ProblemSolutionMatrix }))),
    OnboardingJourney: lazy(() => import("@/components/templates/OnboardingJourney").then(m => ({ default: m.OnboardingJourney }))),
    FeatureGrid: lazy(() => import("@/components/templates/FeatureGrid").then(m => ({ default: m.FeatureGrid }))),
    DataTable: lazy(() => import("@/components/templates/DataTable").then(m => ({ default: m.DataTable }))),
    SplitContent: lazy(() => import("@/components/templates/SplitContent").then(m => ({ default: m.SplitContent }))),
    IconList: lazy(() => import("@/components/templates/IconList").then(m => ({ default: m.IconList }))),
    BankPortalMockup: lazy(() => import("@/components/templates/BankPortalMockup").then(m => ({ default: m.BankPortalMockup }))),
    OnboardingStep: lazy(() => import("@/components/templates/OnboardingStep").then(m => ({ default: m.OnboardingStep }))),
    OnboardingFlow: lazy(() => import("@/components/templates/OnboardingFlow").then(m => ({ default: m.OnboardingFlow }))),
};
