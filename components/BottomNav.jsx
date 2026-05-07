import React from 'react';
import { COLORS } from '../constants';

export function BottomNav({ active, onNav }) {
  const tabs = [
    { id: "home", label: "Home", icon: "⌂" },
    { id: "lend", label: "Lend", icon: "🕒" },
    { id: "scan", label: "", icon: "▦", isCenter: true },
    { id: "split", label: "Split", icon: "⤨" },
    { id: "profile", label: "You", icon: "👤" },
  ];
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      width: "100%",
      background: COLORS.surface, borderTop: `1px solid ${COLORS.border}`,
      display: "flex", zIndex: 100,
      paddingBottom: 12,
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onNav(t.id)} style={{
          flex: 1, padding: "10px 0 0", border: "none", background: "none",
          color: active === t.id ? COLORS.blue : COLORS.textMuted,
          cursor: "pointer", display: "flex", flexDirection: "column",
          alignItems: "center", gap: 3,
        }}>
          {t.isCenter ? (
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: COLORS.blue,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, marginTop: -32, 
              boxShadow: "0 8px 24px rgba(59, 110, 245, 0.6)",
              color: "#fff",
            }}>{t.icon}</div>
          ) : (
            <span style={{ fontSize: 22 }}>{t.icon}</span>
          )}
          {t.label && <span style={{ fontSize: 10, fontWeight: active === t.id ? 700 : 500 }}>{t.label}</span>}
        </button>
      ))}
    </div>
  );
}

