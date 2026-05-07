import React, { useState } from 'react';
import { COLORS, CONTACTS } from '../constants';
import { Avatar } from '../components/Avatar';
import { StatusBar } from '../components/StatusBar';

export function ScanScreen({ onNav }) {
  const [scanned, setScanned] = useState(false);
  const [tab, setTab] = useState("scan");

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <style>
        {`
          @keyframes scanLine {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
        `}
      </style>
      <div style={{ background: "#0a0d14", padding: "0 0 20px" }}>
        <StatusBar />
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 20px", marginBottom: 20 }}>
          <button onClick={() => onNav("home")} style={{ background: "none", border: "none", color: COLORS.textMuted, cursor: "pointer", fontSize: 14 }}>✕ Close</button>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Scan & Pay</span>
          <span style={{ color: COLORS.blue, fontSize: 14, cursor: "pointer" }} onClick={() => setTab("upi")}>Enter UPI</span>
        </div>

        {tab === "scan" ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 24px" }}>
            <p style={{ color: COLORS.textMuted, fontSize: 13, marginBottom: 20 }}>Position QR code within the frame</p>
            <div style={{ position: "relative", width: 240, height: 240, marginBottom: 24 }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 40, height: 40, borderTop: "3px solid " + COLORS.blue, borderLeft: "3px solid " + COLORS.blue, borderRadius: "4px 0 0 0" }} />
              <div style={{ position: "absolute", top: 0, right: 0, width: 40, height: 40, borderTop: "3px solid " + COLORS.blue, borderRight: "3px solid " + COLORS.blue, borderRadius: "0 4px 0 0" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, width: 40, height: 40, borderBottom: "3px solid " + COLORS.blue, borderLeft: "3px solid " + COLORS.blue, borderRadius: "0 0 0 4px" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 40, height: 40, borderBottom: "3px solid " + COLORS.blue, borderRight: "3px solid " + COLORS.blue, borderRadius: "0 0 4px 0" }} />
              {/* Fake QR pattern */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", display: "grid", gridTemplateColumns: "repeat(4,20px)", gap: 6 }}>
                {[...Array(16)].map((_, i) => (
                  <div key={i} style={{ width: 20, height: 20, background: "rgba(255,255,255,0.15)", borderRadius: 2 }} />
                ))}
              </div>
              {/* Animated Scanning Line */}
              <div style={{
                position: "absolute", left: 0, right: 0, height: 3,
                background: COLORS.blue,
                boxShadow: `0 0 15px ${COLORS.blue}, 0 0 30px ${COLORS.blue}`,
                animation: "scanLine 2.5s infinite linear",
                zIndex: 10, borderRadius: 2
              }} />
            </div>
            
            {/* Automatic scanning simulation after a delay could go here, or just let user switch to UPI */}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 24px", minHeight: 284 }}>
            <p style={{ color: COLORS.textMuted, fontSize: 13, marginBottom: 20 }}>Enter any UPI ID to proceed</p>
            <div style={{ display: "flex", width: "100%", maxWidth: 320, background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "4px" }}>
              <input 
                type="text" 
                placeholder="e.g. nikhil@okicici"
                style={{ flex: 1, background: "none", border: "none", color: "#fff", padding: "12px 16px", outline: "none", fontSize: 16 }}
              />
              <button onClick={() => setScanned(true)} style={{ background: COLORS.blue, border: "none", color: "#fff", borderRadius: 8, padding: "0 20px", fontWeight: 700, cursor: "pointer" }}>Verify</button>
            </div>
            <button onClick={() => setTab("scan")} style={{ marginTop: 24, background: "none", border: "none", color: COLORS.blue, fontSize: 14, cursor: "pointer" }}>← Back to Camera</button>
          </div>
        )}

        <div style={{ padding: "0 24px" }}>
          {scanned && (
            <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid " + COLORS.green, borderRadius: 12, padding: "12px 20px", marginTop: 16, textAlign: "center" }}>
              <p style={{ color: COLORS.green, margin: 0, fontWeight: 600 }}>Proceed to Pay</p>
            </div>
          )}
        </div>
      </div>

      <div style={{ width: "100%", padding: "20px" }}>
        <p style={{ color: COLORS.textMuted, fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>PAY CONTACTS</p>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {CONTACTS.map(c => (
            <div key={c.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <Avatar id={c.id} color={c.color} size={44} />
              <span style={{ color: COLORS.text, fontSize: 12, fontWeight: 600 }}>{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
