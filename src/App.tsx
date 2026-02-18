import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LightboardProvider } from "@/contexts/LightboardContext";
import { VolumeProvider } from "@/contexts/VolumeContext";

import { ContractProvider } from "@/contexts/ContractContext";
import Index from "./pages/Index";
import DesignTokens from "./pages/DesignTokens";

const App = () => (
  <TooltipProvider>
    <VolumeProvider>
      <ContractProvider>
        <LightboardProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/design-tokens" element={<DesignTokens />} />
            </Routes>
          </BrowserRouter>
        </LightboardProvider>
      </ContractProvider>
    </VolumeProvider>
  </TooltipProvider>
);

export default App;
