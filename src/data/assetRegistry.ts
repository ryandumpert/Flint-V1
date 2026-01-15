/**
 * AIworks Asset Registry (Minimal)
 * 
 * Usage: Pass assetId to SmartImage component
 * - If assetId exists here → loads local file instantly
 * - If assetId NOT here → SmartImage treats it as a prompt and generates via AI
 */

export interface AssetDefinition {
    id: string;
    path: string;
    alt: string;
    description: string;
    generationPrompt: string;
    category: "avatar" | "platform" | "badge" | "dashboard" | "hero" | "ui" | "icon";
}

// Empty registry - all images will be AI-generated
export const ASSET_REGISTRY: Record<string, AssetDefinition> = {};

// Helper: Get all assets by category
export const getAssetsByCategory = (category: AssetDefinition["category"]): AssetDefinition[] => {
    return Object.values(ASSET_REGISTRY).filter(asset => asset.category === category);
};

// Helper: Check if asset exists
export const assetExists = (assetId: string): boolean => {
    return assetId in ASSET_REGISTRY;
};

// All available asset IDs for documentation
export const ALL_ASSET_IDS = Object.keys(ASSET_REGISTRY);
