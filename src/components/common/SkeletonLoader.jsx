import React from "react";
import { useTheme } from "../../context/ThemeContext";

export default function SkeletonLoader() {
  const { theme } = useTheme();

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
            opacity: 0.6
          }} />
        </td>
      ))}
    </tr>
  );
}
