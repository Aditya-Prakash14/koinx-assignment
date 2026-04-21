import React, { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import TaxLossHarvestingPage from "./components/tax/TaxLossHarvestingPage";
import PlaceholderPage from "./components/pages/PlaceholderPage";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { TaxProvider } from "./context/TaxContext";

function AppLayout() {
  const { theme } = useTheme();
  const [activeNav, setActiveNav] = useState("tax");

  const getPageTitle = () => {
    switch(activeNav) {
      case "dashboard": return "Dashboard";
      case "portfolio": return "Portfolio";
      case "transactions": return "Transactions";
      case "tax": return "Tax Loss Harvesting";
      case "reports": return "Reports";
      default: return "";
    }
  };

  const getBreadcrumb = () => {
    switch(activeNav) {
      case "tax": return "Tax";
      default: return getPageTitle();
    }
  };

  const renderContent = () => {
    if (activeNav === "tax") {
      return <TaxLossHarvestingPage />;
    }
    return <PlaceholderPage title={getPageTitle()} />;
  };

  return (
    <div className="app-container" style={{
      display: "flex", height: "100vh", overflow: "hidden",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      background: theme.bg, color: theme.text,
      transition: "background 0.3s, color 0.3s",
    }}>
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="main-container" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0, minHeight: 0 }}>
        <Header title={getPageTitle()} breadcrumb={getBreadcrumb()} />
        {renderContent()}
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
