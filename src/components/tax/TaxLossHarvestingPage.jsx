import React from "react";
import SummaryCard from "./SummaryCard";
import HoldingsTable from "./HoldingsTable";
import { Icons } from "../common/Icons";
import { useTax } from "../../context/TaxContext";
import { useTheme } from "../../context/ThemeContext";

export default function TaxLossHarvestingPage() {
  const { theme, isDark } = useTheme();
  const { taxSummary, postHarvestingSummary, loading, error, savings, selected } = useTax();

  return (
    <div style={{
      flex: 1, overflow: "auto",
      padding: "20px", display: "flex", flexDirection: "column", gap: 16,
      background: theme.bg, transition: "background 0.3s",
    }}>

      {/* Error Banner */}
      {error && (
        <div style={{
          padding: "10px 16px", borderRadius: 10,
          background: isDark ? "rgba(239,68,68,0.08)" : "rgba(239,68,68,0.06)",
          border: "1px solid rgba(239,68,68,0.2)",
          fontSize: 12, color: isDark ? "#fca5a5" : "#dc2626",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <Icons.Warning />
          {error}
        </div>
      )}

      {/* Selection Feedback Banner */}
      {selected.size > 0 && !error && (
        <div style={{
          padding: "12px 16px", borderRadius: 10,
          background: isDark ? "rgba(91,141,238,0.1)" : "rgba(79,70,229,0.1)",
          border: `1px solid ${theme.accentColor}40`,
          fontSize: 13, color: theme.text,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: `0 4px 12px ${theme.accentColor}20`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
             <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke={theme.accentColor} strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
             </svg>
             <strong>{selected.size} asset(s) selected</strong> for harvesting. Check "After Harvesting" summary.
          </div>
        </div>
      )}

      {/* Summary Cards */}
      {loading || !taxSummary || !postHarvestingSummary ? (
        <div style={{ display: "flex", gap: 16 }} className="summary-cards">
          {[0, 1].map(i => (
            <div key={i} style={{
              flex: 1, minWidth: 0, height: 280,
              background: theme.bgSecondary,
              borderRadius: 14, border: `1px solid ${theme.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%",
                border: `2px solid ${theme.border}`,
                borderTopColor: theme.accentColor,
                animation: "spin 0.8s linear infinite",
              }} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }} className="summary-cards">
          <div className="summary-card" style={{ flex: 1, minWidth: "calc(50% - 8px)" }}>
            <SummaryCard
              title="Pre Harvesting"
              tip="Your current capital gains based on actual realised transactions."
              cg={taxSummary}
              isRightCard={false}
            />
          </div>
          <div className="summary-card" style={{ flex: 1, minWidth: "calc(50% - 8px)" }}>
            <SummaryCard
              title="After Harvesting"
              tip="Simulated position if you sell the selected holdings to offset your gains."
              cg={postHarvestingSummary}
              savings={savings}
              isRightCard={true}
            />
          </div>
        </div>
      )}

      {/* Holdings Table Card */}
      <HoldingsTable />
      
    </div>
  );
}
