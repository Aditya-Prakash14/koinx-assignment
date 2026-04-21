import React from "react";
import InfoTip from "../common/InfoTip";
import { fmt } from "../../utils/formatters";
import { useTheme } from "../../context/ThemeContext";

export default function SummaryCard({ title, tip, cg, savings, isRightCard }) {
  const { theme } = useTheme();
  const isDark = theme.bg === "#0d0f18";

  if (!cg) return null;

  const netStGains = cg.stcg.profits - cg.stcg.losses;
  const netLtGains = cg.ltcg.profits - cg.ltcg.losses;
  const realizedCapitalGains = netStGains + netLtGains;

  const groups = [
    {
      title: "Short Term (STCG)",
      rows: [
        { label: "Profits", val: cg.stcg.profits, type: "gain" },
        { label: "Losses", val: -cg.stcg.losses, type: "loss" },
        { label: "Net Short Term", val: netStGains, type: "neutral", strong: true }
      ]
    },
    {
      title: "Long Term (LTCG)",
      rows: [
        { label: "Profits", val: cg.ltcg.profits, type: "gain" },
        { label: "Losses", val: -cg.ltcg.losses, type: "loss" },
        { label: "Net Long Term", val: netLtGains, type: "neutral", strong: true }
      ]
    }
  ];

  return (
    <div style={{
      background: isRightCard && !isDark ? "#eef2ff" : isRightCard && isDark ? "#1e1b4b" : theme.bgSecondary,
      borderRadius: 14,
      border: `1px solid ${isRightCard ? theme.accentColor + '50' : theme.border}`,
      overflow: "hidden",
      flex: 1, minWidth: 0,
      boxShadow: theme.shadowCard,
      transition: "all 0.3s",
      display: "flex", flexDirection: "column"
    }}>
      {/* Card Header */}
      <div style={{
        padding: "16px 20px",
        display: "flex", alignItems: "center", gap: 8,
        borderBottom: `1px solid ${isRightCard ? theme.accentColor + '30' : theme.border}`,
        background: isRightCard
          ? (isDark ? "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.1) 100%)" : "linear-gradient(135deg, rgba(79,70,229,0.1) 0%, rgba(139,92,246,0.05) 100%)")
          : (isDark ? "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)" : "linear-gradient(135deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0) 100%)")
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: isRightCard
            ? `linear-gradient(135deg, ${theme.accentGradStart}, ${theme.accentGradEnd})`
            : theme.textTertiary,
          boxShadow: isRightCard ? `0 0 8px rgba(99,102,241,0.5)` : 'none',
        }} />
        <span style={{ fontSize: 14, fontWeight: 700, color: theme.text, letterSpacing: "-0.2px" }}>
          {title}
        </span>
        <InfoTip text={tip} />
      </div>

      {/* Rows Group */}
      <div style={{ padding: "10px 0", flex: 1, display: "flex", flexDirection: "column" }}>
        {groups.map((g, gIdx) => (
          <div key={g.title} style={{
            paddingBottom: 10,
            marginBottom: 10,
            borderBottom: gIdx === 0 ? `1px dashed ${theme.border}` : 'none'
          }}>
            <div style={{ padding: "0 20px", fontSize: 11, fontWeight: 700, color: theme.textTertiary, textTransform: "uppercase", marginBottom: 6 }}>
              {g.title}
            </div>
            {g.rows.map(({ label, val, type, strong }) => {
              const colorMap = { gain: theme.gain, loss: theme.loss, neutral: theme.text };
              const color = colorMap[type];
              const prefix = type === "gain" ? "+" : type === "loss" ? "−" : val < 0 ? "−" : "";
              return (
                <div key={label} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "6px 20px",
                }}>
                  <span style={{ fontSize: 12, color: strong ? theme.text : theme.textSecondary, fontWeight: strong ? 600 : 400 }}>
                    {label}
                  </span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                    fontSize: strong ? 13 : 12,
                    fontWeight: strong ? 700 : 500,
                    color: val < 0 && type === "neutral" ? theme.loss : color,
                  }}>
                    {prefix}{fmt(Math.abs(val))}
                  </span>
                </div>
              );
            })}
          </div>
        ))}

        {/* Realised Total */}
        <div style={{
          marginTop: "auto",
          background: isRightCard
            ? (isDark ? "rgba(99,102,241,0.1)" : "rgba(79,70,229,0.08)")
            : (isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"),
          borderTop: `1px solid ${isRightCard ? theme.accentColor + '40' : theme.border}`,
          padding: "16px 20px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: savings > 0 ? 8 : 0 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>
              Realised Capital Gains
            </span>
            <span style={{
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              fontSize: 16, fontWeight: 800,
              color: realizedCapitalGains < 0 ? theme.loss : theme.gain,
            }}>
              {realizedCapitalGains < 0 ? "−" : ""}{fmt(Math.abs(realizedCapitalGains))}
            </span>
          </div>

          {savings > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#22c55e" }}>
              <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 700 }}>
                You're going to save {fmt(savings)} in taxes!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
