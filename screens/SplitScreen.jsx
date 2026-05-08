import React, { useState } from 'react';
import { COLORS } from '../constants';
import { AddContactModal } from '../components/AddContactModal';
import { Avatar } from '../components/Avatar';
import { StatusBar } from '../components/StatusBar';

export function SplitScreen({ onNav, appState, appActions }) {
  const { splitGroups, contacts } = appState;
  const [showForm, setShowForm] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedContacts, setSelectedContacts] = useState(["RK", "PS"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [splitType, setSplitType] = useState("equal");

  const toggleContact = (id) => {
    if (id === "RK") return;
    setSelectedContacts(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const handleCreate = () => {
    if (!purpose || !amount || selectedContacts.length < 2) return;
    const shareAmt = Math.round(Number(amount) / selectedContacts.length);
    const owedAmt = Number(amount) - shareAmt;
    const group = {
      name: purpose,
      members: selectedContacts.length,
      expenses: 1,
      total: `₹${amount}`,
      share: `₹${shareAmt}`,
      status: "Active",
      ids: selectedContacts.slice(0, 4)
    };
    appActions.onSplit(group, owedAmt);
    setShowForm(false);
    setPurpose("");
    setAmount("");
    setSelectedContacts(["RK"]);
    setSplitType("equal");
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.blue} 0%, #1e3a8a 100%)`,
        padding: "0 20px 20px",
      }}>
        <StatusBar />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ color: "#fff", margin: 0, fontSize: 20, fontWeight: 800 }}>Split Bills</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", margin: "2px 0 0", fontSize: 12 }}>Groups auto-collect by midnight</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            style={{
            background: "rgba(255,255,255,0.2)", border: "none", color: "#fff",
            borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, fontWeight: 600,
          }}>{showForm ? "Cancel" : "+ New"}</button>
        </div>
      </div>

      <div style={{ padding: "16px" }}>
        {showForm && (
          <div style={{ background: COLORS.card, borderRadius: 14, padding: 16, marginBottom: 16, border: `1px solid ${COLORS.border}` }}>
            <h4 style={{ color: COLORS.text, margin: "0 0 12px", fontSize: 15, fontWeight: 700 }}>New Split Group</h4>
            
            <p style={{ color: COLORS.textMuted, fontSize: 12, margin: "0 0 6px" }}>Purpose</p>
            <input 
              placeholder="e.g. Goa Trip 🏖" 
              value={purpose} onChange={e => setPurpose(e.target.value)}
              style={{ width: "100%", padding: "12px", marginBottom: 12, borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text, boxSizing: "border-box", fontSize: 14, outline: "none" }}
            />

            <p style={{ color: COLORS.textMuted, fontSize: 12, margin: "0 0 6px" }}>Total Amount (₹)</p>
            <input 
              type="number" placeholder="0" 
              value={amount} onChange={e => setAmount(e.target.value)}
              style={{ width: "100%", padding: "12px", marginBottom: 16, borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text, boxSizing: "border-box", fontSize: 14, outline: "none" }}
            />

            <p style={{ color: COLORS.textMuted, fontSize: 12, margin: "0 0 6px" }}>Split With (Tap to select)</p>
            <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8, marginBottom: 12 }} className="hide-scroll">
              {contacts.filter(c => c.id !== "RK").map(c => (
                <div key={c.id} onClick={() => toggleContact(c.id)} style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer",
                  opacity: selectedContacts.includes(c.id) ? 1 : 0.4, flexShrink: 0
                }}>
                  <div style={{
                    border: selectedContacts.includes(c.id) ? `2px solid ${COLORS.blue}` : "2px solid transparent",
                    borderRadius: "50%", padding: 2
                  }}>
                    <Avatar id={c.id} color={c.color} size={40} />
                  </div>
                  <span style={{ fontSize: 10, color: COLORS.text, fontWeight: 600 }}>{c.name.split(" ")[0]}</span>
                </div>
              ))}
              <div onClick={() => setIsModalOpen(true)} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", flexShrink: 0
              }}>
                <div style={{ border: "2px solid transparent", borderRadius: "50%", padding: 2 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%", background: COLORS.border,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, color: COLORS.textMuted,
                  }}>+</div>
                </div>
                <span style={{ fontSize: 10, color: COLORS.textMuted, fontWeight: 600 }}>Add</span>
              </div>
            </div>

            <AddContactModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
              onSave={(name, phone) => {
                const newC = appActions.onAddContact(name, phone);
                if (newC) setSelectedContacts(prev => [...prev, newC.id]);
                setIsModalOpen(false);
              }} 
            />

            <p style={{ color: COLORS.textMuted, fontSize: 12, margin: "0 0 6px" }}>Split Type</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {["equal", "percentage", "exact"].map(type => (
                <button key={type} onClick={() => setSplitType(type)} style={{
                  flex: 1, padding: "8px 0", borderRadius: 8,
                  border: `1px solid ${splitType === type ? COLORS.blue : COLORS.border}`,
                  background: splitType === type ? "rgba(37,99,235,0.1)" : COLORS.surface,
                  color: splitType === type ? COLORS.blue : COLORS.textMuted,
                  fontWeight: splitType === type ? 700 : 500, fontSize: 12, cursor: "pointer", textTransform: "capitalize"
                }}>
                  {type}
                </button>
              ))}
            </div>

            {amount && selectedContacts.length > 1 && splitType === "equal" && (
              <div style={{ background: "rgba(34,197,94,0.1)", borderRadius: 8, padding: "10px", marginBottom: 16 }}>
                <p style={{ color: COLORS.green, fontSize: 12, margin: 0, fontWeight: 600 }}>✅ Everyone pays ₹{Math.round(Number(amount) / selectedContacts.length)}</p>
              </div>
            )}

            {selectedContacts.length > 0 && splitType !== "equal" && (
              <div style={{ background: "rgba(0,0,0,0.02)", borderRadius: 10, padding: 12, marginBottom: 16, border: `1px solid ${COLORS.border}` }}>
                <p style={{ color: COLORS.text, fontSize: 13, fontWeight: 700, margin: "0 0 12px" }}>Enter {splitType === "percentage" ? "Percentages" : "Exact Amounts"}</p>
                {selectedContacts.map(id => {
                  const c = id === "RK" ? { name: "You (RK)", color: COLORS.blue } : contacts.find(x => x.id === id);
                  return (
                    <div key={id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Avatar id={id} color={c?.color || COLORS.blue} size={28} />
                        <span style={{ fontSize: 13, color: COLORS.text, fontWeight: 600 }}>{c?.name}</span>
                      </div>
                      <div style={{ position: "relative", width: 90 }}>
                        <span style={{ position: "absolute", left: 10, top: 9, color: COLORS.textMuted, fontSize: 13 }}>
                          {splitType === "exact" ? "₹" : ""}
                        </span>
                        <input 
                          type="number" placeholder="0"
                          style={{
                            width: "100%", padding: "8px 10px", 
                            paddingLeft: splitType === "exact" ? 22 : 10,
                            paddingRight: splitType === "percentage" ? 22 : 10,
                            borderRadius: 8, border: `1px solid ${COLORS.border}`, background: "#fff",
                            color: COLORS.text, fontSize: 14, fontWeight: 600, outline: "none", boxSizing: "border-box", textAlign: "right"
                          }}
                        />
                        <span style={{ position: "absolute", right: 10, top: 9, color: COLORS.textMuted, fontSize: 13 }}>
                          {splitType === "percentage" ? "%" : ""}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <button 
              onClick={handleCreate}
              style={{ width: "100%", padding: "12px", borderRadius: 8, border: "none", background: (purpose && amount && selectedContacts.length > 1) ? COLORS.blue : COLORS.textDim, color: "#fff", fontWeight: 700, cursor: (purpose && amount && selectedContacts.length > 1) ? "pointer" : "not-allowed" }}
            >Create Group</button>
          </div>
        )}
        <p style={{ color: COLORS.textMuted, fontSize: 13, margin: "0 0 12px" }}>Your groups</p>
        {splitGroups.map(g => (
          <div key={g.name} style={{
            background: COLORS.card, borderRadius: 14, padding: 16, marginBottom: 12,
            border: `1px solid ${COLORS.border}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <h4 style={{ color: COLORS.text, margin: "0 0 3px", fontSize: 16, fontWeight: 700 }}>{g.name}</h4>
                <span style={{ color: COLORS.textMuted, fontSize: 12 }}>{g.members} members · {g.expenses} expenses</span>
              </div>
              <span style={{
                padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                background: g.status === "Active" ? "rgba(34,197,94,0.15)" : "rgba(100,116,139,0.15)",
                color: g.status === "Active" ? COLORS.green : COLORS.textMuted,
              }}>{g.status}</span>
            </div>
            <div style={{ display: "flex", gap: -8, marginBottom: 10 }}>
              {g.ids.map((id, i) => (
                <div key={id} style={{ marginLeft: i > 0 ? -8 : 0 }}>
                  <Avatar id={id} color={contacts.find(c => c.id === id)?.color || COLORS.blue} size={30} />
                </div>
              ))}
              {g.members > g.ids.length && (
                <div style={{
                  width: 30, height: 30, borderRadius: "50%", background: COLORS.textDim,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, color: COLORS.text, marginLeft: -8,
                }}>+{g.members - g.ids.length}</div>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p style={{ color: COLORS.textMuted, fontSize: 11, margin: "0 0 2px" }}>Total</p>
                <p style={{ color: COLORS.text, fontWeight: 700, margin: 0 }}>{g.total}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ color: COLORS.textMuted, fontSize: 11, margin: "0 0 2px" }}>Your share</p>
                <p style={{ color: COLORS.blue, fontWeight: 700, margin: 0 }}>{g.share}</p>
              </div>
            </div>
          </div>
        ))}

        {/* How it works */}
        <div style={{ background: COLORS.card, borderRadius: 14, padding: 16, border: `1px solid ${COLORS.border}` }}>
          <h4 style={{ color: COLORS.text, margin: "0 0 12px", fontWeight: 700 }}>How TrustPay splits work</h4>
          {[
            "Create a group, invite friends",
            "Each member approves a one-time UPI mandate",
            "Add expenses — app splits automatically",
            "Unpaid shares auto-deducted next morning",
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%", background: COLORS.blue,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0,
              }}>{i + 1}</div>
              <span style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.5 }}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
