import React, { useState } from "react";
import { Icons } from "./Icons";
import { useTheme } from "../../context/ThemeContext";

export default function InfoTip({ text }) {
  const { theme } = useTheme();
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
          textAlign: "left",
        }}>
          {text}
        </span>
      )}
    </span>
  );
}
