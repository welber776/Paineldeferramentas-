
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { App as CapacitorApp } from "@capacitor/app";

const queryClient = new QueryClient();

const App = () => {
  // Handle hardware back button for mobile
  useEffect(() => {
    const handleBackButton = () => {
      // Custom back button logic here
      console.log("Back button pressed");
      return false; // Return false to prevent default behavior
    };

    document.addEventListener("backbutton", handleBackButton);
    
    // Use Capacitor to set up app if on a native platform
    if (typeof CapacitorApp !== 'undefined') {
      CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
          // Handle case when user is on root page
          // For example, show exit confirmation
          if (confirm("Deseja sair do aplicativo?")) {
            CapacitorApp.exitApp();
          }
        }
      });
    }

    return () => {
      document.removeEventListener("backbutton", handleBackButton);
      if (typeof CapacitorApp !== 'undefined') {
        CapacitorApp.removeAllListeners();
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
