import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Icons } from "../common/Icons";

export default function PlaceholderPage({ title }) {
  const { theme } = useTheme();

  return (
    <div style={{
      flex: 1, overflow: "auto",
      padding: "20px", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: theme.bg, color: theme.text,
      transition: "background 0.3s",
    }}>
      <div style={{
        background: theme.bgSecondary,
        padding: "40px", borderRadius: 14,
        border: `1px dashed ${theme.border}`,
        display: "flex", flexDirection: "column",
        alignItems: "center", textAlign: "center",
        maxWidth: 400,
        boxShadow: theme.shadowCard
      }}>
        <div style={{ color: theme.textTertiary, marginBottom: 16 }}>
          {title === "Dashboard" && <Icons.Dashboard />}
          {title === "Portfolio" && <Icons.Portfolio />}
          {title === "Transactions" && <Icons.Transactions />}
          {title === "Reports" && <Icons.Reports />}
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: theme.text }}>
          {title}
        </h2>
        <p style={{ fontSize: 13, color: theme.textSecondary, lineHeight: 1.5 }}>
          This page is currently under development. Please check back later or switch to the Tax tab to view the active tax harvesting assignment.
        </p>
      </div>
    </div>
  );
}
