/**
 * useOnboardingFlow
 * Hook to manage state and progression through the static onboarding flow
 * 
 * NOTE: Currently returns immediately complete - no onboarding flow.
 * Structure preserved for future merchant onboarding mockups.
 */

import { useState, useCallback } from 'react';
import { OnboardingData } from '@/types/onboarding';

interface UseOnboardingFlowReturn {
    // State
    currentStepIndex: number;
    isOnboardingComplete: boolean;
    isTransitioning: boolean;
    userData: OnboardingData;

    // Actions
    goToNext: () => void;
    goToBack: () => void;
    goToSkip: () => void;
    completeOnboarding: () => void;
    setUserData: (data: Partial<OnboardingData>) => void;
    resetOnboarding: () => void;

    // Computed
    currentStepId: string;
    totalSteps: number;
    progress: number;
}

export const useOnboardingFlow = (): UseOnboardingFlowReturn => {
    // No onboarding flow - immediately complete
    const [currentStepIndex] = useState(0);
    const [isOnboardingComplete] = useState(true); // Always complete
    const [isTransitioning] = useState(false);
    const [userData, setUserDataState] = useState<OnboardingData>({});

    // With empty flow, these are no-ops
    const totalSteps = 1;
    const progress = 100;
    const currentStepId = 'complete';

    // No-op actions (preserved for API compatibility)
    const goToNext = useCallback(() => { }, []);
    const goToBack = useCallback(() => { }, []);
    const goToSkip = useCallback(() => { }, []);
    const completeOnboarding = useCallback(() => { }, []);
    const setUserData = useCallback((data: Partial<OnboardingData>) => {
        setUserDataState(prev => ({ ...prev, ...data }));
    }, []);
    const resetOnboarding = useCallback(() => { }, []);

    return {
        currentStepIndex,
        isOnboardingComplete,
        isTransitioning,
        userData,
        goToNext,
        goToBack,
        goToSkip,
        completeOnboarding,
        setUserData,
        resetOnboarding,
        currentStepId,
        totalSteps,
        progress,
    };
};

export default useOnboardingFlow;
