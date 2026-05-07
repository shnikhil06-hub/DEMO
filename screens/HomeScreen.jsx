import React from 'react';
import { COLORS, CONTACTS } from '../constants';
import { Avatar } from '../components/Avatar';
import { StatusBar } from '../components/StatusBar';

export function HomeScreen({ onNav, appState }) {
  const { owed, owe, activeLoans, recentActivity } = appState;
  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.blue} 0%, #1e3a8a 100%)`,
        padding: "0 20px 24px",
      }}>
        <StatusBar />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: 0 }}>Good morning 👋</p>
            <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "2px 0 0" }}>Ramit Layek</h2>
          </div>
          <div style={{
            width: 38, height: 38, borderRadius: "50%", background: COLORS.blue,
            border: "2px solid rgba(255,255,255,0.4)", display: "flex",
            alignItems: "center", justifyContent: "center", color: "#fff",
            fontWeight: 700, fontSize: 14, position: "relative",
          }}>
            RL
            <div style={{
              position: "absolute", top: -2, right: -2, width: 10, height: 10,
              borderRadius: "50%", background: COLORS.green, border: "2px solid " + COLORS.blue,
            }} />
          </div>
        </div>

        {/* Balance row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          {[
            { label: "YOU'RE OWED", amount: `₹${owed.toLocaleString()}`, sub: "3 people", color: COLORS.green },
            { label: "YOU OWE", amount: `₹${owe.toLocaleString()}`, sub: "Due in 5 days", color: COLORS.accent },
          ].map(b => (
            <div key={b.label} style={{
              flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: 12,
              padding: "12px 14px", backdropFilter: "blur(10px)",
            }}>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 10, fontWeight: 700, letterSpacing: 0.8, margin: "0 0 4px" }}>{b.label}</p>
              <p style={{ color: b.color, fontSize: 22, fontWeight: 800, margin: "0 0 2px" }}>{b.amount}</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, margin: 0 }}>{b.sub}</p>
            </div>
          ))}
        </div>

        {/* Trust score */}
        <div style={{
          background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 14px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 20,
        }}>
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>Trust Score</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", gap: 3 }}>
              {[...Array(10)].map((_, i) => (
                <div key={i} style={{
                  width: 16, height: 5, borderRadius: 3,
                  background: i < 8 ? "#fff" : "rgba(255,255,255,0.25)",
                }} />
              ))}
            </div>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>82</span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Very Good</span>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {[
            { icon: "↑", label: "Lend", screen: "lend" },
            { icon: "⊕", label: "Split", screen: "split" },
            { icon: "↓", label: "Borrow", screen: "request" },
            { icon: "▦", label: "Scan & Pay", screen: "scan" },
          ].map(a => (
            <button key={a.label} onClick={() => onNav(a.screen)} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              background: "none", border: "none", cursor: "pointer", color: "#fff",
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "rgba(255,255,255,0.15)", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 20,
              }}>{a.icon}</div>
              <span style={{ fontSize: 12, fontWeight: 500 }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Loans */}
      <div style={{ padding: "20px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ color: COLORS.text, margin: 0, fontSize: 16, fontWeight: 700 }}>Active Loans</h3>
          <span style={{ color: COLORS.blue, fontSize: 13 }}>See all →</span>
        </div>
        {activeLoans.map(l => (
          <div key={l.id} style={{
            background: COLORS.card, borderRadius: 14, padding: "14px 16px",
            marginBottom: 10, border: `1px solid ${COLORS.border}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar id={l.id} color={CONTACTS.find(c => c.id === l.id)?.color || COLORS.blue} size={40} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: COLORS.text, fontWeight: 600, fontSize: 14 }}>{l.name}</span>
                  <span style={{ color: COLORS.text, fontWeight: 700, fontSize: 15 }}>{l.amount}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                  <span style={{ color: COLORS.textMuted, fontSize: 12 }}>{l.sub}</span>
                  <span style={{ color: l.badgeColor, fontSize: 12, fontWeight: 600 }}>{l.badge}</span>
                </div>
              </div>
            </div>
            <div style={{ height: 4, background: COLORS.border, borderRadius: 2, marginTop: 10 }}>
              <div style={{ width: `${l.progress * 100}%`, height: "100%", background: l.badgeColor, borderRadius: 2 }} />
            </div>
            {l.extra && (
              <div style={{ background: "rgba(245,158,11,0.1)", borderRadius: 8, padding: "6px 10px", marginTop: 8 }}>
                <span style={{ color: COLORS.accent, fontSize: 12 }}>{l.extra}</span>
              </div>
            )}
          </div>
        ))}

        {/* Recent Activity */}
        <h3 style={{ color: COLORS.text, margin: "16px 0 12px", fontSize: 16, fontWeight: 700 }}>Recent Activity</h3>
        {recentActivity.map((a, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 0", borderBottom: `1px solid ${COLORS.border}`,
          }}>
            <Avatar id={a.id} color={a.bg} size={40} />
            <div style={{ flex: 1 }}>
              <div style={{ color: COLORS.text, fontWeight: 600, fontSize: 14 }}>{a.name}</div>
              <div style={{ color: COLORS.textMuted, fontSize: 12 }}>{a.sub}</div>
            </div>
            <span style={{ color: a.color, fontWeight: 700, fontSize: 15 }}>{a.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
