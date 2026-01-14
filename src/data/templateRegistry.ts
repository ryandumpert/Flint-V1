import React, { lazy } from "react";

// Lazy load templates - Fiserv Offer Engine Demo
export const TEMPLATE_REGISTRY: Record<string, React.FC<any>> = {
    // Core Templates (9)
    ProblemSolutionMatrix: lazy(() => import("@/components/templates/ProblemSolutionMatrix").then(m => ({ default: m.ProblemSolutionMatrix }))),
    OnboardingJourney: lazy(() => import("@/components/templates/OnboardingJourney").then(m => ({ default: m.OnboardingJourney }))),
    FeatureGrid: lazy(() => import("@/components/templates/FeatureGrid").then(m => ({ default: m.FeatureGrid }))),
    DataTable: lazy(() => import("@/components/templates/DataTable").then(m => ({ default: m.DataTable }))),
    SplitContent: lazy(() => import("@/components/templates/SplitContent").then(m => ({ default: m.SplitContent }))),
    IconList: lazy(() => import("@/components/templates/IconList").then(m => ({ default: m.IconList }))),
    BankPortalMockup: lazy(() => import("@/components/templates/BankPortalMockup").then(m => ({ default: m.BankPortalMockup }))),
    OnboardingStep: lazy(() => import("@/components/templates/OnboardingStep").then(m => ({ default: m.OnboardingStep }))),
    OnboardingFlow: lazy(() => import("@/components/templates/OnboardingFlow").then(m => ({ default: m.OnboardingFlow }))),

    // Conversational Templates (15)
    TimelineRoadmap: lazy(() => import("@/components/templates/TimelineRoadmap").then(m => ({ default: m.TimelineRoadmap }))),
    MetricsGrid: lazy(() => import("@/components/templates/MetricsGrid").then(m => ({ default: m.MetricsGrid }))),
    WorkflowDiagram: lazy(() => import("@/components/templates/WorkflowDiagram").then(m => ({ default: m.WorkflowDiagram }))),
    PricingTable: lazy(() => import("@/components/templates/PricingTable").then(m => ({ default: m.PricingTable }))),
    ProductCatalog: lazy(() => import("@/components/templates/ProductCatalog").then(m => ({ default: m.ProductCatalog }))),
    ComparisonTable: lazy(() => import("@/components/templates/ComparisonTable").then(m => ({ default: m.ComparisonTable }))),
    FAQAccordion: lazy(() => import("@/components/templates/FAQAccordion").then(m => ({ default: m.FAQAccordion }))),
    ContactCard: lazy(() => import("@/components/templates/ContactCard").then(m => ({ default: m.ContactCard }))),
    SegmentSelector: lazy(() => import("@/components/templates/SegmentSelector").then(m => ({ default: m.SegmentSelector }))),
    BrandingPreview: lazy(() => import("@/components/templates/BrandingPreview").then(m => ({ default: m.BrandingPreview }))),
    StatusTracker: lazy(() => import("@/components/templates/StatusTracker").then(m => ({ default: m.StatusTracker }))),
    ArchitectureDiagram: lazy(() => import("@/components/templates/ArchitectureDiagram").then(m => ({ default: m.ArchitectureDiagram }))),
    ChecklistCard: lazy(() => import("@/components/templates/ChecklistCard").then(m => ({ default: m.ChecklistCard }))),
    TeamCards: lazy(() => import("@/components/templates/TeamCards").then(m => ({ default: m.TeamCards }))),
    QuickActions: lazy(() => import("@/components/templates/QuickActions").then(m => ({ default: m.QuickActions }))),

    // Scheduling (live-update)
    MeetingScheduler: lazy(() => import("@/components/templates/MeetingScheduler").then(m => ({ default: m.MeetingScheduler }))),
};
