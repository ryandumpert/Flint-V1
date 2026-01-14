/**
 * Static Template Registry
 * Maps template IDs to their React components for the static onboarding flow
 * 
 * NOTE: Currently empty - static templates removed. 
 * Structure preserved for future onboarding screens (e.g., merchant onboarding mockups)
 */

import { lazy } from 'react';

// Lazy load all static templates for code splitting
// Empty for now - add templates as needed for merchant onboarding mockups
export const STATIC_TEMPLATE_REGISTRY: Record<string, React.LazyExoticComponent<React.FC<any>>> = {
    // Future: Add merchant onboarding mockup screens here
    // Example: OnboardingStep1: lazy(() => import('@/components/static-templates/OnboardingStep1').then(m => ({ default: m.OnboardingStep1 }))),
};

export default STATIC_TEMPLATE_REGISTRY;
