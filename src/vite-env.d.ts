/// <reference types="vite/client" />

declare global {
  interface UIFramework {
    TeleAcknowledge: (message: string, options?: { sayExactly?: boolean, inputText?: string }) => void;
    registerTool?: (toolDefinition: any, executor: (args: any) => Promise<any>) => void;
    TellTele: (message: string) => void;
    setAvatarVolume?: (volume: number) => void;
    getAvatarVolume?: () => number;
  }

  interface Window {
    UIFramework?: UIFramework;
    teleNavigation: {
      navigateToSection: (navigationData: any) => boolean | { disableNewResponseCreation: boolean };
      getCurrentSection: () => string;
    };
    navigateToSection: (data: any) => boolean;
    teleVolume: {
      setVolume: (level: number) => void;
      adjustVolume: (delta: number) => void;
      getVolume: () => number;
    };
    scrollPage?: (direction: 'up' | 'down', amount?: 'little' | 'medium' | 'lot' | 'max' | number) => string;
    setPageContrast?: (mode: 'high' | 'normal' | 'low') => boolean;
    getPageContrast?: () => 'high' | 'normal' | 'low';
  }

}

export { };
