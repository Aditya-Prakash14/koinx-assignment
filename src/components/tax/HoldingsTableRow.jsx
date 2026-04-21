import React, { useState } from "react";
import { fmt, fmtQty } from "../../utils/formatters";
import { useTheme } from "../../context/ThemeContext";

function CoinAvatar({ logo, name, coin }) {
  const { theme } = useTheme();
  const [imgError, setImgError] = useState(false);
  return (
    <div style={{
      width: 32, height: 32, borderRadius: "50%",
      background: theme.bgTertiary,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, overflow: "hidden", border: `1px solid ${theme.border}`
    }}>
      {!imgError && logo ? (
        <img src={logo} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={() => setImgError(true)} />
      ) : (
        <span style={{ fontSize: 10, fontWeight: 700, color: theme.textSecondary }}>
          {coin.slice(0, 3)}
        </span>
      )}
    </div>
  );
}

export default function HoldingsTableRow({ holding, selected, onToggle }) {
  const { theme } = useTheme();
  const isDark = theme.bg === "#0d0f18";
  const [hovered, setHovered] = useState(false);

  const stColor = holding.stcg.gain < 0 ? theme.loss : theme.gain;
  const ltColor = holding.ltcg.gain < 0 ? theme.loss : theme.gain;

  return (
    <tr
      onClick={() => onToggle(holding.coin)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        background: selected
          ? (isDark ? "rgba(91,141,238,0.08)" : "rgba(79,70,229,0.06)")
          : hovered
            ? theme.bgHover
            : "transparent",
        transition: "background 0.15s",
        borderBottom: `1px solid ${theme.border}`,
      }}
    >
      <td style={{ padding: "12px 10px 12px 16px", width: 40 }}>
        <div style={{
          width: 18, height: 18,
          borderRadius: 4,
          border: selected
            ? `2px solid ${theme.accentColor}`
            : `2px solid ${theme.borderAccent}`,
          background: selected
            ? theme.accentColor
            : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.15s",
          cursor: "pointer",
          flexShrink: 0,
        }}>
          {selected && (
            <svg viewBox="0 0 24 24" width={11} height={11} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </td>

      {/* Asset */}
      <td style={{ padding: "12px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <CoinAvatar logo={holding.logo} name={holding.coinName} coin={holding.coin} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: theme.text, maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {holding.coinName}
            </div>
            <div style={{ fontSize: 11, color: theme.textTertiary, marginTop: 1, fontWeight: 500 }}>
              {holding.coin}
            </div>
          </div>
        </div>
      </td>

      {/* Holdings & Avg Buy Price */}
      <td style={{ padding: "12px 14px", textAlign: "right" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, color: theme.text }}>
            {fmtQty(holding.totalHolding)} {holding.coin}
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: theme.textTertiary, marginTop: 1 }}>
            Avg: {fmt(holding.averageBuyPrice)}
          </span>
        </div>
      </td>

      {/* Current Price */}
      <td style={{ padding: "12px 14px", textAlign: "right" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, color: theme.text }}>
          {fmt(holding.currentPrice)}
        </span>
      </td>

      {/* Short-Term Gain */}
      <td style={{ padding: "12px 14px", textAlign: "right" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: stColor }}>
            {holding.stcg.gain < 0 ? "−" : holding.stcg.gain > 0 ? "+" : ""}{fmt(Math.abs(holding.stcg.gain))}
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: theme.textTertiary, marginTop: 1 }}>
            Bal: {fmtQty(holding.stcg.balance)}
          </span>
        </div>
      </td>

      {/* Long-Term Gain */}
      <td style={{ padding: "12px 14px", textAlign: "right" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: ltColor }}>
            {holding.ltcg.gain < 0 ? "−" : holding.ltcg.gain > 0 ? "+" : ""}{fmt(Math.abs(holding.ltcg.gain))}
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: theme.textTertiary, marginTop: 1 }}>
            Bal: {fmtQty(holding.ltcg.balance)}
          </span>
        </div>
      </td>

      {/* Amount to Sell */}
      <td style={{ padding: "12px 14px 12px 10px", textAlign: "right" }}>
        {selected ? (
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: theme.accentColor, background: `${theme.accentColor}1A`, padding: "4px 8px", borderRadius: 6 }}>
            {fmtQty(holding.totalHolding)} {holding.coin}
          </span>
        ) : (
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 500, color: theme.textTertiary }}>
            —
          </span>
        )}
      </td>
    </tr>
  );
}
