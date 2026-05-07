import React from 'react';

export function Avatar({ id, color, size = 40 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: size * 0.35, fontWeight: 700,
      color: "#fff", flexShrink: 0,
    }}>{id}</div>
  );
}
