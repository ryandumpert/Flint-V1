/**
 * UIFramework Registration & API Exposure
 * Exposes runtime agent API functions to the global window object, allowing Flint (the Runtime Agent)
 * to operate the Glass (this UI). Part of the Teleglass platform architecture.
 *
 * Architecture:
 * - Glass (this code) = Front-end UI (React/TypeScript), exposes teleNavigation API
 * - Tele (separate) = Trained in Teleglass platform, operates Glass via this API
 * - glass-prompt.md = Instructions for Tele to generate Glass JSON
 *
 * See /docs/ARCHITECTURE.md for complete system documentation.
 */

// SUBSECTION-ONLY ARCHITECTURE
interface NavigationData {
  badge?: string;
  title?: string;
  subtitle?: string;
  headers?: string[];
  subsectionsIds?: string[];
  subsectionIds?: string[]; // alternate spelling
  section?: string;
  sectionId?: string;
  subsections?: any;
}

interface NavigationAPI {
  navigateToSection: (navigationData: NavigationData | string) => boolean;
  getCurrentSection: () => string;
  flashTele: () => void;
  scrollPage?: (direction: string, amount?: string | number) => string;
}

/**
 * Expose navigation API to window for console access and Tele integration
 */
export const exposeNavigationAPI = (navigationAPI: NavigationAPI): void => {
  (window as any).teleNavigation = navigationAPI;
  (window as any).navigateToSection = navigationAPI.navigateToSection;
};
