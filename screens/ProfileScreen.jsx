import React from 'react';
import { COLORS } from '../constants';
import { StatusBar } from '../components/StatusBar';

export function ProfileScreen() {
  const breakdown = [
    { label: "Repayment History", score: 32, max: 35, color: COLORS.blue },
    { label: "On-time Rate", score: 28, max: 30, color: COLORS.green },
    { label: "Lending Activity", score: 14, max: 20, color: "#a855f7" },
    { label: "Account Age", score: 8, max: 15, color: COLORS.accent },
  ];
  const circumference = 2 * Math.PI * 52;
  const dashOffset = circumference * (1 - 0.82);

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: `linear-gradient(135deg, ${COLORS.blue} 0%, #1e3a8a 100%)`, padding: "0 20px 24px" }}>
        <StatusBar />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: COLORS.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 8 }}>RL</div>
          <h2 style={{ color: "#fff", margin: "0 0 2px", fontSize: 20, fontWeight: 800 }}>Ramit Layek</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", margin: 0, fontSize: 13 }}>+91 87654 32109 · ramitlayek@gmail.com</p>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Trust Score Card */}
        <div style={{ background: COLORS.card, borderRadius: 16, padding: 20, marginBottom: 16, border: `1px solid ${COLORS.border}` }}>
          <p style={{ color: COLORS.textMuted, fontSize: 11, letterSpacing: 1, fontWeight: 700, margin: "0 0 12px" }}>TRUST SCORE</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <div style={{ position: "relative", width: 90, height: 90 }}>
              <svg width="90" height="90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke={COLORS.border} strokeWidth="10" />
                <circle cx="60" cy="60" r="52" fill="none" stroke={COLORS.blue} strokeWidth="10"
                  strokeDasharray={circumference} strokeDashoffset={dashOffset}
                  strokeLinecap="round" transform="rotate(-90 60 60)" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: COLORS.text, fontSize: 22, fontWeight: 800 }}>82</span>
                <span style={{ color: COLORS.textMuted, fontSize: 10 }}>/ 100</span>
              </div>
            </div>
            <div>
              <h3 style={{ color: COLORS.text, fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>Very Good</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["⚡ Fast Payer", "🏅 Reliable Lender", "🏆 Top 10%"].map(b => (
                  <span key={b} style={{ background: "rgba(59,110,245,0.15)", color: COLORS.blue, fontSize: 11, padding: "3px 8px", borderRadius: 20, fontWeight: 600 }}>{b}</span>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", borderTop: `1px solid ${COLORS.border}`, paddingTop: 14 }}>
            {[["12", "Loans Given"], ["100%", "On-time"], ["4.2d", "Avg Repay"], ["2", "Auto-debits"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <p style={{ color: COLORS.text, fontWeight: 800, fontSize: 18, margin: "0 0 2px" }}>{v}</p>
                <p style={{ color: COLORS.textMuted, fontSize: 11, margin: 0 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Score Breakdown */}
        <div style={{ background: COLORS.card, borderRadius: 16, padding: 20, marginBottom: 16, border: `1px solid ${COLORS.border}` }}>
          <h4 style={{ color: COLORS.text, margin: "0 0 14px", fontWeight: 700 }}>Score Breakdown</h4>
          {breakdown.map(b => (
            <div key={b.label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ color: COLORS.textMuted, fontSize: 13 }}>{b.label}</span>
                <span style={{ color: COLORS.text, fontSize: 13, fontWeight: 600 }}>{b.score}/{b.max}</span>
              </div>
              <div style={{ height: 6, background: COLORS.border, borderRadius: 3 }}>
                <div style={{ width: `${(b.score / b.max) * 100}%`, height: "100%", background: b.color, borderRadius: 3 }} />
              </div>
            </div>
          ))}
          <div style={{ background: "rgba(59,110,245,0.08)", borderRadius: 10, padding: 12, marginTop: 14 }}>
            <p style={{ color: COLORS.blue, fontSize: 13, fontWeight: 700, margin: "0 0 6px" }}>💡 How to improve your score</p>
            {["→ Repay borrowed money before due date", "→ Lend to more friends and get repaid on time", "→ Avoid triggering auto-debits when you borrow"].map(t => (
              <p key={t} style={{ color: COLORS.textMuted, fontSize: 12, margin: "3px 0" }}>{t}</p>
            ))}
          </div>
        </div>

        {/* UPI Accounts */}
        <div style={{ background: COLORS.card, borderRadius: 16, padding: 20, marginBottom: 16, border: `1px solid ${COLORS.border}` }}>
          <h4 style={{ color: COLORS.text, margin: "0 0 14px", fontWeight: 700 }}>Linked UPI Accounts</h4>
          {[
            { bank: "HDFC Bank", upi: "ramit@hdfcbank", primary: true },
            { bank: "Paytm Payments Bank", upi: "9876543210@paytm", primary: false },
          ].map(a => (
            <div key={a.upi} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
              <div>
                <p style={{ color: COLORS.text, fontWeight: 600, margin: "0 0 2px", fontSize: 14 }}>{a.bank}</p>
                <p style={{ color: COLORS.textMuted, fontSize: 12, margin: 0 }}>{a.upi}</p>
              </div>
              {a.primary && <span style={{ background: "rgba(59,110,245,0.15)", color: COLORS.blue, fontSize: 11, padding: "3px 8px", borderRadius: 20, fontWeight: 600 }}>Primary</span>}
            </div>
          ))}
          <button style={{ width: "100%", marginTop: 12, padding: "10px", borderRadius: 10, border: `1px solid ${COLORS.border}`, background: "none", color: COLORS.blue, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>+ Add UPI Account</button>
        </div>

        {/* Settings */}
        {[
          { icon: "🔔", label: "Notifications", sub: "Reminders, alerts" },
          { icon: "🔒", label: "Privacy & Security", sub: "PIN, biometrics" },
          { icon: "📋", label: "Active Mandates", sub: "3 UPI AutoPay mandates" },
          { icon: "❓", label: "Help & Support", sub: "FAQs, contact us" },
          { icon: "⭐", label: "Rate TrustPay", sub: "Share your feedback" },
        ].map(s => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 14, background: COLORS.card, borderRadius: 12, padding: "14px 16px", marginBottom: 8, border: `1px solid ${COLORS.border}`, cursor: "pointer" }}>
            <span style={{ fontSize: 20 }}>{s.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ color: COLORS.text, margin: 0, fontWeight: 600, fontSize: 14 }}>{s.label}</p>
              <p style={{ color: COLORS.textMuted, margin: 0, fontSize: 12 }}>{s.sub}</p>
            </div>
            <span style={{ color: COLORS.textMuted }}>›</span>
          </div>
        ))}

        <button style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: "rgba(239,68,68,0.1)", color: COLORS.red, fontSize: 16, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>Sign Out</button>
        <p style={{ textAlign: "center", color: COLORS.textDim, fontSize: 11, marginTop: 12 }}>TrustPay v0.1.0 · Made with ❤️ in India</p>
      </div>
    </div>
  );
}
