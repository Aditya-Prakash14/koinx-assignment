import React from "react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import TaxLossHarvestingPage from "./components/tax/TaxLossHarvestingPage";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { TaxProvider } from "./context/TaxContext";

function AppLayout() {
  const { theme } = useTheme();

  return (
    <div className="app-container" style={{
      display: "flex", height: "100vh", overflow: "hidden",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      background: theme.bg, color: theme.text,
      transition: "background 0.3s, color 0.3s",
    }}>
      <Sidebar />
      <div className="main-container" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <Header />
        <TaxLossHarvestingPage />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TaxProvider>
        <AppLayout />
      </TaxProvider>
    </ThemeProvider>
  );
}
