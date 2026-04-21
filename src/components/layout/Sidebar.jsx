import React, { useState } from "react";
import { Icons } from "../common/Icons";
import { useTheme } from "../../context/ThemeContext";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", Icon: Icons.Dashboard },
  { id: "portfolio", label: "Portfolio", Icon: Icons.Portfolio },
  { id: "transactions", label: "Transactions", Icon: Icons.Transactions },
  { id: "tax", label: "Tax", Icon: Icons.Tax },
  { id: "reports", label: "Reports", Icon: Icons.Reports },
];

export default function Sidebar() {
  const { theme, isDark } = useTheme();
  const [activeNav, setActiveNav] = useState("tax");

  return (
    <aside className="sidebar" style={{
      width: 60, background: theme.bgSecondary,
      display: "flex", flexDirection: "column",
      alignItems: "center", padding: "16px 0 12px", gap: 2, flexShrink: 0,
      borderRight: `1px solid ${theme.border}`,
      transition: "background 0.3s, border-color 0.3s",
      zIndex: 10,
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
      <div className="nav-items-container" style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', alignItems: 'center' }}>
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = activeNav === id;
          return (
            <button
              className="nav-button"
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
                <span className="active-indicator" style={{
                  position: "absolute", left: -1, top: "50%", transform: "translateY(-50%)",
                  width: 3, height: 20, borderRadius: "0 3px 3px 0",
                  background: `linear-gradient(180deg, ${theme.accentGradStart}, ${theme.accentGradEnd})`,
                }} />
              )}
              <Icon />
            </button>
          );
        })}
      </div>

      {/* User Avatar */}
      <div style={{ marginTop: "auto" }} className="user-avatar-container">
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: isDark ? "rgba(91,141,238,0.18)" : "rgba(79,70,229,0.12)",
          border: `1.5px solid ${theme.accentColor}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 700, color: theme.accentColor,
        }}>U</div>
      </div>
    </aside>
  );
}
