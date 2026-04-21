import React, { useState } from "react";
import HoldingsTableRow from "./HoldingsTableRow";
import SkeletonLoader from "../common/SkeletonLoader";
import { Icons } from "../common/Icons";
import { useTax } from "../../context/TaxContext";
import { useTheme } from "../../context/ThemeContext";

export default function HoldingsTable() {
  const { theme, isDark } = useTheme();
  const { holdings, selected, loading, toggleCoin, toggleAll } = useTax();
  const [isExpanded, setIsExpanded] = useState(false);

  const allSelected = holdings.length > 0 && selected.size === holdings.length;
  const someSelected = selected.size > 0 && !allSelected;

  const displayLimit = 5;
  const displayedHoldings = isExpanded ? holdings : holdings.slice(0, displayLimit);

  return (
    <div style={{
      background: theme.bgSecondary,
      borderRadius: 14,
      border: `1px solid ${theme.border}`,
      overflow: "hidden",
      boxShadow: theme.shadowCard,
      transition: "all 0.3s",
      display: "flex", flexDirection: "column"
    }}>
      {/* Table Header */}
      <div style={{
        padding: "14px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: `1px solid ${theme.border}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>
            Holdings Portfolio
          </span>
          <span style={{
            background: theme.bgTertiary,
            border: `1px solid ${theme.border}`,
            color: theme.textTertiary,
            fontSize: 11, fontWeight: 600,
            padding: "1px 8px", borderRadius: 20,
          }}>{holdings.length}</span>
        </div>
        {holdings.length > 0 && (
          <label style={{
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 12, color: theme.textSecondary, fontWeight: 500,
            cursor: "pointer", userSelect: "none",
          }}>
            <div
              onClick={toggleAll}
              style={{
                width: 18, height: 18, borderRadius: 4,
                border: allSelected || someSelected
                  ? `2px solid ${theme.accentColor}`
                  : `2px solid ${theme.borderAccent}`,
                background: allSelected
                  ? theme.accentColor
                  : someSelected
                    ? `${theme.accentColor}50`
                    : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.15s", cursor: "pointer",
              }}
            >
              {allSelected && (
                <svg viewBox="0 0 24 24" width={11} height={11} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {someSelected && !allSelected && (
                <svg viewBox="0 0 24 24" width={10} height={10} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              )}
            </div>
            Select all
          </label>
        )}
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
          <thead>
            <tr style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
              <th style={{ width: 40, padding: "10px 10px 10px 16px" }} />
              {[
                { label: "Asset", align: "left" },
                { label: "Holdings & Avg Buy Price", align: "right" },
                { label: "Current Price", align: "right" },
                { label: "Short-Term Gain", align: "right" },
                { label: "Long-Term Gain", align: "right" },
                { label: "Amount to Sell", align: "right" },
              ].map(({ label, align }, i) => (
                <th key={i} style={{
                  padding: "10px 14px",
                  fontSize: 10, fontWeight: 700,
                  color: theme.textQuaternary,
                  textAlign: align,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                }}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => <SkeletonLoader key={i} />)
              : displayedHoldings.map(holding => (
                <HoldingsTableRow
                  key={holding.coin}
                  holding={holding}
                  selected={selected.has(holding.coin)}
                  onToggle={toggleCoin}
                />
              ))
            }
          </tbody>
        </table>
      </div>

      {/* View All Button */}
      {!loading && holdings.length > displayLimit && (
        <div style={{
          display: "flex", justifyContent: "center",
          padding: "12px", borderTop: `1px solid ${theme.border}`,
          background: theme.bgSecondary
        }}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              background: "transparent",
              border: "none",
              color: theme.accentColor,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 12px",
              borderRadius: "6px",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = `${theme.accentColor}1A`}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            {isExpanded ? "Show Less" : "View All"}
            <svg
              viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2"
              style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      )}

      {/* Disclaimer */}
      <div style={{
        padding: "14px 20px",
        borderTop: `1px solid ${theme.border}`,
        display: "flex", alignItems: "flex-start", gap: 10,
        background: isDark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)",
      }}>
        <div style={{
          flexShrink: 0, marginTop: 1,
          color: theme.textTertiary, display: "flex",
        }}>
          <Icons.Shield />
        </div>
        <p style={{ fontSize: 11, color: theme.textTertiary, lineHeight: 1.7, margin: 0 }}>
          <strong style={{ color: theme.textSecondary, fontWeight: 600 }}>Disclaimer: </strong>
          Tax Loss Harvesting involves selling assets at a loss to offset gains. Please consult a qualified tax professional before making any financial decisions. Estimates are based on a 30% rate under Section 115BBH of the Income Tax Act.
        </p>
      </div>
    </div>
  );
}
