import { useState, useEffect, useCallback, useMemo } from "react";
import { taxAPI } from "./services/api";

// ─── Utilities ────────────────────────────────────────────────────────────────
const fmt = (n) => "₹" + Math.abs(Math.round(n)).toLocaleString("en-IN");
const fmtQty = (n) => {
  if (n === 0) return "0";
  if (n < 0.001) return n.toExponential(2);
  const str = n >= 1000 ? n.toLocaleString("en-IN", { maximumFractionDigits: 3 }) : n.toFixed(3);
  return str.replace(/\.?0+$/, "");
};

// Calculate initial net values
const computeHolding = (h) => {
  return h; // Format is already clean from API mapping directly to table
};

// ─── Theme ────────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg: "#0d0f18",
    bgSecondary: "#12141f",
    bgTertiary: "#181b28",
    bgHover: "#1e2133",
    bgCard: "#13161f",
    border: "#1e2235",
    borderAccent: "#2a2f4a",
    text: "#eaedf5",
    textSecondary: "#8b93b0",
    textTertiary: "#4e566e",
    textQuaternary: "#333a52",
    accentColor: "#0255fbff",
    accentGradStart: "#6366f1",
    accentGradEnd: "#8b5cf6",
    gain: "#22c55e",
    loss: "#f05a5a",
    scrollbarTrack: "#0d0f18",
    scrollbarThumb: "#1e2235",
    scrollbarThumbHover: "#2a2f4a",
    shadow: "0 4px 24px rgba(0,0,0,0.4)",
    shadowCard: "0 2px 12px rgba(0,0,0,0.3)",
  },
  light: {
    bg: "#f4f5f8",
    bgSecondary: "#ffffff",
    bgTertiary: "#f0f1f5",
    bgHover: "#e8eaf0",
    bgCard: "#ffffff",
    border: "#e4e6ef",
    borderAccent: "#d1d5db",
    text: "#111827",
    textSecondary: "#4b5563",
    textTertiary: "#6b7280",
    textQuaternary: "#9ca3af",
    accentColor: "#4f46e5",
    accentGradStart: "#4f46e5",
    accentGradEnd: "#7c3aed",
    gain: "#16a34a",
    loss: "#dc2626",
    scrollbarTrack: "#f4f5f8",
    scrollbarThumb: "#e4e6ef",
    scrollbarThumbHover: "#9ca3af",
    shadow: "0 4px 24px rgba(0,0,0,0.08)",
    shadowCard: "0 2px 8px rgba(0,0,0,0.06)",
  },
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const Icons = {
  Sun: () => (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Warning: () => (
    <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  CheckCircle: () => (
    <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Info: () => (
    <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  Dashboard: () => (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  Portfolio: () => (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Transactions: () => (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  Tax: () => (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  Reports: () => (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  Lightning: () => (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="#fff" stroke="#fff" strokeWidth="0">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

// ─── Nav Items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", Icon: Icons.Dashboard },
  { id: "portfolio", label: "Portfolio", Icon: Icons.Portfolio },
  { id: "transactions", label: "Transactions", Icon: Icons.Transactions },
  { id: "tax", label: "Tax", Icon: Icons.Tax },
  { id: "reports", label: "Reports", Icon: Icons.Reports },
];

// ─── InfoTip ──────────────────────────────────────────────────────────────────
function InfoTip({ text, theme }) {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <span
        onMouseEnter={() => { setShow(true); setHovered(true); }}
        onMouseLeave={() => { setShow(false); setHovered(false); }}
        style={{
          width: 16, height: 16, borderRadius: "50%",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          color: hovered ? theme.accentColor : theme.textTertiary,
          cursor: "help", userSelect: "none",
          border: `1px solid ${hovered ? theme.accentColor : theme.border}`,
          transition: "all 0.2s",
        }}
      >
        <Icons.Info />
      </span>
      {show && (
        <span style={{
          position: "absolute", bottom: "calc(100% + 8px)", left: "50%",
          transform: "translateX(-50%)",
          background: theme.bgTertiary,
          border: `1px solid ${theme.border}`,
          borderRadius: 8, padding: "8px 12px",
          fontSize: 11, color: theme.textSecondary,
          maxWidth: 260, whiteSpace: "normal", zIndex: 200,
          lineHeight: 1.6,
          boxShadow: theme.shadow,
          pointerEvents: "none",
        }}>{text}</span>
      )}
    </span>
  );
}

// ─── Summary Card ─────────────────────────────────────────────────────────────
function SummaryCard({ title, tip, cg, savings, theme, isRightCard }) {
  const isDark = theme.bg === "#0d0f18";

  // Calculate display values based on instructions
  const netStGains = cg.stcg.profits - cg.stcg.losses;
  const netLtGains = cg.ltcg.profits - cg.ltcg.losses;
  const realizedCapitalGains = netStGains + netLtGains;
  const taxLiability = Math.max(0, realizedCapitalGains) * 0.3; // Using simple 30% rule for demo

  // Specific layout from Figma / PRD:
  // Show Profits / Losses for ST and LT, then Net for each, then Realised

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
        <InfoTip text={tip} theme={theme} />
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

// ─── Coin Avatar ──────────────────────────────────────────────────────────────
function CoinAvatar({ logo, name, coin, theme }) {
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

// ─── Holdings Row ─────────────────────────────────────────────────────────────
function HoldingsRow({ holding, selected, onToggle, theme }) {
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
          <CoinAvatar logo={holding.logo} name={holding.coinName} coin={holding.coin} theme={theme} />
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

// ─── Skeleton Row ─────────────────────────────────────────────────────────────
function SkeletonRow({ theme }) {
  return (
    <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
      {[40, 140, 110, 80, 90, 90, 80].map((w, i) => (
        <td key={i} style={{ padding: "14px 14px" }}>
          <div style={{
            height: i === 1 ? 32 : 12,
            width: i === 1 ? 32 : w,
            borderRadius: i === 1 ? "50%" : 4,
            background: theme.bgTertiary,
            animation: "shimmer 1.5s ease-in-out infinite",
            ...(i === 1 ? { display: "flex" } : {}),
          }} />
        </td>
      ))}
    </tr>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function TaxLossHarvesting() {
  const [activeNav, setActiveNav] = useState("tax");
  const [taxSummary, setTaxSummary] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? THEMES.dark : THEMES.light;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); setError(null);

        // Use Promise.all to fetch mock APIs concurrently
        const [summaryRes, holdingsRes] = await Promise.all([
          taxAPI.getSummary(),
          taxAPI.getHoldings()
        ]);

        setTaxSummary(summaryRes.capitalGains);
        setHoldings(holdingsRes.map(computeHolding));
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleCoin = useCallback((coinId) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(coinId) ? next.delete(coinId) : next.add(coinId);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelected(prev =>
      prev.size === holdings.length ? new Set() : new Set(holdings.map(h => h.coin))
    );
  }, [holdings]);

  const allSelected = holdings.length > 0 && selected.size === holdings.length;
  const someSelected = selected.size > 0 && !allSelected;

  // Compute After Harvesting state based strictly on assignment instructions
  const postHarvestingSummary = useMemo(() => {
    if (!taxSummary) return null;

    // Start with a deep copy of the pre-harvesting logic
    let tempStProfits = taxSummary.stcg.profits;
    let tempStLosses = taxSummary.stcg.losses;
    let tempLtProfits = taxSummary.ltcg.profits;
    let tempLtLosses = taxSummary.ltcg.losses;

    // Apply adjustments based on selected holdings
    holdings.forEach(h => {
      if (selected.has(h.coin)) {
        // Short-term updates
        if (h.stcg.gain > 0) tempStProfits += h.stcg.gain;
        else if (h.stcg.gain < 0) tempStLosses += Math.abs(h.stcg.gain);

        // Long-term updates
        if (h.ltcg.gain > 0) tempLtProfits += h.ltcg.gain;
        else if (h.ltcg.gain < 0) tempLtLosses += Math.abs(h.ltcg.gain);
      }
    });

    return {
      stcg: { profits: tempStProfits, losses: tempStLosses },
      ltcg: { profits: tempLtProfits, losses: tempLtLosses }
    };
  }, [taxSummary, holdings, selected]);

  // Tax Savings Calculation
  let savings = 0;
  if (taxSummary && postHarvestingSummary) {
    const preNet = (taxSummary.stcg.profits - taxSummary.stcg.losses) + (taxSummary.ltcg.profits - taxSummary.ltcg.losses);
    const postNet = (postHarvestingSummary.stcg.profits - postHarvestingSummary.stcg.losses) + (postHarvestingSummary.ltcg.profits - postHarvestingSummary.ltcg.losses);

    // If Realised Capital Gains reduces, we have savings.
    // In actual implementation, we might simulate a 30% tax slab.
    const preTax = Math.max(0, preNet) * 0.3;
    const postTax = Math.max(0, postNet) * 0.3;

    if (preTax > postTax) {
      savings = preTax - postTax;
    }
  }

  return (
    <div style={{
      display: "flex", height: "100vh", overflow: "hidden",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      background: theme.bg, color: theme.text,
      transition: "background 0.3s, color 0.3s",
    }}>

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside className="sidebar" style={{
        width: 60, background: theme.bgSecondary,
        display: "flex", flexDirection: "column",
        alignItems: "center", padding: "16px 0 12px", gap: 2, flexShrink: 0,
        borderRight: `1px solid ${theme.border}`,
        transition: "background 0.3s, border-color 0.3s",
      }}>
        {/* Logo */}
        <div
          title="KoinX"
          style={{
            width: 38, height: 38, borderRadius: 10,
            background: `linear-gradient(135deg, ${theme.accentGradStart} 0%, ${theme.accentGradEnd} 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 18, cursor: "pointer",
            boxShadow: `0 6px 20px ${theme.accentGradStart}40`,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08) rotate(-5deg)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) rotate(0deg)"; }}
        >
          <Icons.Lightning />
        </div>

        {/* Nav Items */}
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = activeNav === id;
          return (
            <button
              key={id} title={label}
              onClick={() => setActiveNav(id)}
              style={{
                width: 40, height: 40, borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", border: "none", outline: "none",
                background: isActive
                  ? (isDark ? "rgba(91,141,238,0.16)" : "rgba(79,70,229,0.1)")
                  : "transparent",
                color: isActive ? theme.accentColor : theme.textQuaternary,
                transition: "all 0.15s",
                position: "relative",
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = theme.bgHover; e.currentTarget.style.color = theme.textSecondary; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = theme.textQuaternary; } }}
            >
              {isActive && (
                <span style={{
                  position: "absolute", left: -1, top: "50%", transform: "translateY(-50%)",
                  width: 3, height: 20, borderRadius: "0 3px 3px 0",
                  background: `linear-gradient(180deg, ${theme.accentGradStart}, ${theme.accentGradEnd})`,
                }} />
              )}
              <Icon />
            </button>
          );
        })}

        {/* User Avatar */}
        <div style={{ marginTop: "auto" }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: isDark ? "rgba(91,141,238,0.18)" : "rgba(79,70,229,0.12)",
            border: `1.5px solid ${theme.accentColor}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: theme.accentColor,
          }}>U</div>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

        {/* Top Bar */}
        <header style={{
          height: 54, background: theme.bgSecondary,
          display: "flex", alignItems: "center",
          padding: "0 20px", gap: 10, flexShrink: 0,
          borderBottom: `1px solid ${theme.border}`,
          transition: "background 0.3s, border-color 0.3s",
        }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: theme.textTertiary }}>Tax</span>
            <svg viewBox="0 0 24 24" width={10} height={10} fill="none" stroke="currentColor" strokeWidth="2" style={{ color: theme.textQuaternary }}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span style={{ fontSize: 13, fontWeight: 700, color: theme.text, letterSpacing: "-0.3px" }}>
              Tax Loss Harvesting
            </span>
          </div>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
            {/* Theme toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                background: theme.bgTertiary,
                border: `1px solid ${theme.border}`,
                color: theme.textSecondary,
                width: 32, height: 32, borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = theme.accentColor; e.currentTarget.style.color = theme.accentColor; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.textSecondary; }}
            >
              {isDark ? <Icons.Sun /> : <Icons.Moon />}
            </button>
          </div>
        </header>

        {/* Scrollable Body */}
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
                  theme={theme}
                  isRightCard={false}
                />
              </div>
              <div className="summary-card" style={{ flex: 1, minWidth: "calc(50% - 8px)" }}>
                <SummaryCard
                  title="After Harvesting"
                  tip="Simulated position if you sell the selected holdings to offset your gains."
                  cg={postHarvestingSummary}
                  savings={savings}
                  theme={theme}
                  isRightCard={true}
                />
              </div>
            </div>
          )}

          {/* Holdings Table Card */}
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
                    ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} theme={theme} />)
                    : holdings.map(holding => (
                      <HoldingsRow
                        key={holding.coin}
                        holding={holding}
                        selected={selected.has(holding.coin)}
                        onToggle={toggleCoin}
                        theme={theme}
                      />
                    ))
                  }
                </tbody>
              </table>
            </div>

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
        </div>
      </main>

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { font-family: inherit; }

        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.9; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${theme.scrollbarTrack}; }
        ::-webkit-scrollbar-thumb { background: ${theme.scrollbarThumb}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${theme.scrollbarThumbHover}; }

        /* Responsive */
        @media (max-width: 768px) {
          .sidebar { display: none !important; }
          .summary-cards { flex-direction: column !important; }
          .summary-card { min-width: 100% !important; }
        }
        @media (max-width: 480px) {
          .summary-cards { gap: 10px !important; }
        }
      `}</style>
    </div>
  );
}
