import { Sparkles } from "lucide-react";

interface SmartModeToggleProps {
  isSmartMode: boolean;
  onToggle: (enabled: boolean) => void;
}

export function SmartModeToggle({ isSmartMode, onToggle }: SmartModeToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(!isSmartMode)}
      className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isSmartMode
        ? "text-primary bg-primary/20 hover:bg-primary/30"
        : "text-white/40 hover:text-white/60 hover:bg-white/10"
        }`}
      title={isSmartMode ? "Smart Mode: Show tool calls" : "Basic Mode: Hide tool calls"}
    >
      <Sparkles className={`w-4 h-4 ${isSmartMode ? "animate-pulse" : ""}`} />
    </button>
  );
}
