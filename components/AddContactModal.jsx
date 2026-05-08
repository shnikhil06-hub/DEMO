import React, { useState } from 'react';
import { COLORS } from '../constants';

export function AddContactModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, padding: 20
    }}>
      <div style={{
        background: COLORS.card,
        borderRadius: 16,
        padding: 20,
        width: "100%",
        maxWidth: 320,
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
      }}>
        <h3 style={{ color: COLORS.text, marginTop: 0, marginBottom: 16, fontSize: 18 }}>Add New Contact</h3>
        
        <p style={{ color: COLORS.textMuted, fontSize: 12, margin: "0 0 6px" }}>Name</p>
        <input 
          autoFocus
          placeholder="e.g. Shubh" 
          value={name} onChange={e => setName(e.target.value)}
          style={{ width: "100%", padding: "12px", marginBottom: 12, borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text, boxSizing: "border-box", fontSize: 14, outline: "none" }}
        />

        <p style={{ color: COLORS.textMuted, fontSize: 12, margin: "0 0 6px" }}>Phone Number</p>
        <input 
          type="tel"
          placeholder="e.g. 9876543210" 
          value={phone} onChange={e => setPhone(e.target.value)}
          style={{ width: "100%", padding: "12px", marginBottom: 20, borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text, boxSizing: "border-box", fontSize: 14, outline: "none" }}
        />

        <div style={{ display: "flex", gap: 12 }}>
          <button 
            onClick={onClose}
            style={{ flex: 1, padding: "12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: "transparent", color: COLORS.text, fontWeight: 600, cursor: "pointer" }}
          >Cancel</button>
          <button 
            onClick={() => {
              if (name.trim() && phone.trim()) {
                onSave(name.trim(), phone.trim());
                setName("");
                setPhone("");
              }
            }}
            disabled={!name.trim() && !phone.trim()}
            style={{ flex: 1, padding: "12px", borderRadius: 8, border: "none", background: name.trim() && phone.trim() ? COLORS.blue : COLORS.textDim, color: "#fff", fontWeight: 600, cursor: name.trim() && phone.trim() ? "pointer" : "not-allowed" }}
          >Save</button>
        </div>
      </div>
    </div>
  );
}
