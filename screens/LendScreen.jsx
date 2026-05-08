import React, { useState } from 'react';
import { COLORS } from '../constants';
import { StatusBar } from '../components/StatusBar';
import { AddContactModal } from '../components/AddContactModal';

export function LendScreen({ onNav, appState, appActions }) {
  const { contacts } = appState;
  const [selected, setSelected] = useState("PS");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tenure, setTenure] = useState(7);
  const [sent, setSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contact = contacts.find(c => c.id === selected) || contacts[0];
  const tenureDays = [1, 3, 5, 7, 14, 30];
  const repayDate = new Date();
  repayDate.setDate(repayDate.getDate() + tenure);
  const dateStr = repayDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  if (sent) return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <StatusBar />
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>✓</div>
        <h2 style={{ color: COLORS.text, fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>Money Sent!</h2>
        <p style={{ color: COLORS.textMuted, fontSize: 14 }}>You sent ₹{amount} to {contact ? contact.full : undefined}. An auto-pay mandate is active.</p>
      </div>
      <div style={{ background: COLORS.card, borderRadius: 16, padding: 20, width: "100%", maxWidth: 360, border: `1px solid ${COLORS.border}` }}>
        {[
          ["Lending to", contact?.full],
          ["Amount", `₹${amount}`],
          ["Tenure", `${tenure} days`],
          ["Repay by", dateStr],
          ["If unpaid", `Auto-debit on Day ${tenure + 1}`],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${COLORS.border}` }}>
            <span style={{ color: COLORS.textMuted, fontSize: 14 }}>{k}</span>
            <span style={{ color: k === "If unpaid" ? COLORS.blue : COLORS.text, fontSize: 14, fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
      <button onClick={() => { setSent(false); onNav("home"); }} style={{
        marginTop: 24, width: "100%", maxWidth: 360, padding: "16px", borderRadius: 14,
        background: COLORS.blue, border: "none", color: "#fff", fontSize: 16,
        fontWeight: 700, cursor: "pointer",
      }}>Back to Home</button>
    </div>
  );

  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.blue} 0%, #1e3a8a 100%)`,
        padding: "0 20px 24px",
      }}>
        <StatusBar />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => onNav("home")} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 14 }}>← Back</button>
          <div>
            <h2 style={{ color: "#fff", margin: 0, fontSize: 20, fontWeight: 800 }}>Lend Money</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", margin: 0, fontSize: 12 }}>Auto-collected if not repaid</p>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px" }}>
        {/* Contact Picker */}
        <div style={{ background: COLORS.card, borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${COLORS.border}` }}>
          <p style={{ color: COLORS.textMuted, fontSize: 13, margin: "0 0 12px" }}>Who are you lending to?</p>
          <div style={{ display: "flex", overflowX: "auto", gap: 12, paddingBottom: 8 }} className="hide-scroll">
            {contacts.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id)} style={{
                background: "none", border: "none", cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%", background: c.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 700, color: "#fff",
                  border: selected === c.id ? `3px solid ${COLORS.blue}` : "3px solid transparent",
                  boxSizing: "border-box",
                }}>{c.id}</div>
                <span style={{ color: selected === c.id ? COLORS.blue : COLORS.textMuted, fontSize: 11, fontWeight: selected === c.id ? 700 : 500 }}>{c.name}</span>
              </button>
            ))}
            <button onClick={() => setIsModalOpen(true)} style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", background: COLORS.border,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, fontWeight: 500, color: COLORS.textMuted,
              }}>+</div>
              <span style={{ color: COLORS.textMuted, fontSize: 11, fontWeight: 500 }}>Add</span>
            </button>
          </div>
        </div>

        <AddContactModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={(name, phone) => {
            const newC = appActions.onAddContact(name, phone);
            if (newC) setSelected(newC.id);
            setIsModalOpen(false);
          }} 
        />

        {/* Amount */}
        <div style={{ background: COLORS.card, borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${COLORS.border}` }}>
          <p style={{ color: COLORS.textMuted, fontSize: 13, margin: "0 0 10px" }}>Amount (₹)</p>
          <div style={{
            display: "flex", alignItems: "center",
            background: COLORS.surface, borderRadius: 10, padding: "12px 16px", marginBottom: 10,
          }}>
            <span style={{ color: COLORS.textMuted, fontSize: 20, marginRight: 6 }}>₹</span>
            <input
              type="number" value={amount} onChange={e => setAmount(e.target.value)}
              placeholder="0"
              style={{
                background: "none", border: "none", outline: "none",
                color: COLORS.text, fontSize: 28, fontWeight: 700, width: "100%",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["500", "1k", "2k", "5k"].map(p => (
              <button key={p} onClick={() => setAmount(p === "1k" ? "1000" : p === "2k" ? "2000" : p === "5k" ? "5000" : "500")}
                style={{
                  flex: 1, padding: "8px 0", borderRadius: 8, border: `1px solid ${COLORS.border}`,
                  background: COLORS.surface, color: COLORS.textMuted, cursor: "pointer", fontSize: 13,
                }}>₹{p}</button>
            ))}
          </div>
        </div>

        {/* Purpose */}
        <div style={{ background: COLORS.card, borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${COLORS.border}` }}>
          <p style={{ color: COLORS.textMuted, fontSize: 13, margin: "0 0 10px" }}>What's it for?</p>
          <input
            value={purpose} onChange={e => setPurpose(e.target.value)}
            placeholder="Concert tickets, groceries..."
            style={{
              width: "100%", background: COLORS.surface, border: `1px solid ${COLORS.border}`,
              borderRadius: 10, padding: "12px 14px", color: COLORS.text, fontSize: 14,
              outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        {/* Tenure */}
        <div style={{ background: COLORS.card, borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${COLORS.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: COLORS.textMuted, fontSize: 13 }}>Repayment tenure</span>
            <span style={{ color: COLORS.blue, fontWeight: 700, fontSize: 14 }}>{tenure} days</span>
          </div>
          <input type="range" min={1} max={30} value={tenure} onChange={e => setTenure(+e.target.value)}
            style={{ width: "100%", accentColor: COLORS.blue, marginBottom: 12 }} />
          <div style={{ display: "flex", gap: 6 }}>
            {tenureDays.map(d => (
              <button key={d} onClick={() => setTenure(d)} style={{
                flex: 1, padding: "6px 0", borderRadius: 8,
                border: `1px solid ${tenure === d ? COLORS.blue : COLORS.border}`,
                background: tenure === d ? COLORS.blue : COLORS.surface,
                color: tenure === d ? "#fff" : COLORS.textMuted,
                cursor: "pointer", fontSize: 12, fontWeight: tenure === d ? 700 : 500,
              }}>{d}d</button>
            ))}
          </div>
        </div>

        {/* Loan Summary */}
        {amount && (
          <div style={{ background: COLORS.card, borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${COLORS.border}` }}>
            <p style={{ color: COLORS.text, fontWeight: 700, margin: "0 0 10px", fontSize: 14 }}>📋 Loan Summary</p>
            {[
              ["Lending to", contact?.full, COLORS.blue],
              ["Amount", `₹${amount}`, COLORS.text],
              ["Repay by", dateStr, COLORS.text],
            ].map(([k, v, c]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0" }}>
                <span style={{ color: COLORS.textMuted, fontSize: 13 }}>{k}</span>
                <span style={{ color: c, fontSize: 13, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div style={{ background: "rgba(245,158,11,0.1)", borderRadius: 8, padding: "8px 10px", marginTop: 10 }}>
              <p style={{ color: COLORS.accent, fontSize: 11, margin: 0 }}>⚡ If {contact?.name} doesn't pay by {dateStr}, ₹{amount} will be auto-deducted via UPI AutoPay the next morning.</p>
            </div>
            <div style={{ background: "rgba(59,110,245,0.1)", borderRadius: 8, padding: "8px 10px", marginTop: 8 }}>
              <p style={{ color: COLORS.blue, fontSize: 11, margin: 0 }}>ℹ The borrower must approve a UPI AutoPay mandate when accepting. No consent = no auto-debit.</p>
            </div>
          </div>
        )}

        <button
          disabled={!amount || !selected}
          onClick={() => {
            appActions.onLend(contact, amount, purpose, tenure);
            setSent(true);
          }}
          style={{
            width: "100%", padding: "16px", borderRadius: 14, border: "none",
            background: amount && selected ? COLORS.blue : COLORS.textDim,
            color: "#fff", fontSize: 16, fontWeight: 700, cursor: amount && selected ? "pointer" : "not-allowed",
          }}>
          Send ₹{amount} to {contact?.full}
        </button>
      </div>
    </div>
  );
}
