import React from "react";
import { Icons } from "../common/Icons";
import { useTheme } from "../../context/ThemeContext";

export default function Header({ title = "Tax Loss Harvesting" }) {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <header style={{
      height: 54, background: theme.bgSecondary,
      display: "flex", alignItems: "center",
      padding: "0 20px", gap: 10, flexShrink: 0,
      borderBottom: `1px solid ${theme.border}`,
      transition: "background 0.3s, border-color 0.3s",
      zIndex: 10,
    }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 11, color: theme.textTertiary }}>Tax</span>
        <svg viewBox="0 0 24 24" width={10} height={10} fill="none" stroke="currentColor" strokeWidth="2" style={{ color: theme.textQuaternary }}>
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span style={{ fontSize: 13, fontWeight: 700, color: theme.text, letterSpacing: "-0.3px" }}>
          {title}
        </span>
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
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
  );
}
