import { useState } from "react";
import { COLORS } from "./constants";
import { BottomNav } from "./components/BottomNav";
import { HomeScreen } from "./screens/HomeScreen";
import { LendScreen } from "./screens/LendScreen";
import { SplitScreen } from "./screens/SplitScreen";
import { ScanScreen } from "./screens/ScanScreen";
import { RequestScreen } from "./screens/RequestScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { PhoneLayout } from "./components/PhoneLayout";

export default function App() {
  const [screen, setScreen] = useState("home");
  const navScreens = ["home", "lend", "scan", "split", "profile"];
  const activeTab = navScreens.includes(screen) ? screen : "home";

  const handleNav = (s) => setScreen(s);

  const [owed, setOwed] = useState(4500);
  const [owe, setOwe] = useState(1200);

  const [activeLoans, setActiveLoans] = useState([
    { id: "RK", name: "Rahul Kumar", sub: "Concert tickets", amount: "₹2,500", badge: "3d left", badgeColor: COLORS.blue, progress: 0.6 },
    { id: "PS", name: "Priya Sharma", sub: "Lunch split", amount: "₹800", badge: "Due today", badgeColor: COLORS.orange, progress: 0.95 },
    { id: "AM", name: "Aman Mehra", sub: "Goa trip", amount: "₹1,200", badge: "Auto-debit", badgeColor: COLORS.accent, progress: 0.4, extra: "⚡ Auto-debit processing from Aman's UPI" },
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: "NK", name: "Nikhil K.", sub: "✅ Repaid you · 2h ago", amount: "+₹500", color: COLORS.green, bg: "#10b981" },
    { id: "BB", name: "BigBazaar", sub: "🛒 UPI Payment · Yesterday", amount: "-₹890", color: COLORS.red, bg: "#6366f1" },
    { id: "SR", name: "Sanya Rathi", sub: "↑ You lent · Apr 28", amount: "-₹450", color: COLORS.red, bg: "#8b5cf6" },
    { id: "KM", name: "Karan Mehta", sub: "⚡ Auto-deducted · Apr 26", amount: "-₹750", color: COLORS.red, bg: "#ef4444" },
  ]);

  const [splitGroups, setSplitGroups] = useState([
    { name: "Goa Trip 🏖", members: 4, expenses: 6, total: "₹12,400", share: "₹3,100", status: "Active", ids: ["RK", "PS", "AM", "SR"] },
    { name: "Office Lunch 🍱", members: 3, expenses: 3, total: "₹1,800", share: "₹600", status: "Active", ids: ["RK", "SR", "KM"] },
    { name: "Hostel Room 🏠", members: 6, expenses: 14, total: "₹8,200", share: "₹1,366", status: "Settled", ids: ["PS", "AM"] },
  ]);

  const onLend = (contact, amount, purpose) => {
    setOwed(prev => prev + Number(amount));
    setActiveLoans(prev => [{
      id: contact.id, name: contact.name, sub: purpose || "Lent money", amount: `₹${amount}`, badge: "Just now", badgeColor: COLORS.blue, progress: 0
    }, ...prev]);
    setRecentActivity(prev => [{
      id: contact.id, name: contact.name, sub: "↑ You lent · Just now", amount: `-₹${amount}`, color: COLORS.red, bg: contact.color || COLORS.blue
    }, ...prev]);
  };

  const onSplit = (group) => {
    setSplitGroups(prev => [group, ...prev]);
    setRecentActivity(prev => [{
      id: "RL", name: group.name, sub: `⤨ Created Split · Just now`, amount: group.total, color: COLORS.text, bg: COLORS.blue
    }, ...prev]);
  };

  const onRequest = (contact, amount, purpose) => {
    setOwe(prev => prev + Number(amount));
    setActiveLoans(prev => [{
      id: contact.id, name: contact.name, sub: purpose || "Borrowed money", amount: `₹${amount}`, badge: "To Repay", badgeColor: COLORS.orange, progress: 0
    }, ...prev]);
    setRecentActivity(prev => [{
      id: contact.id, name: contact.name, sub: `↓ Borrowed ${purpose ? `for ${purpose}` : ''} · Just now`, amount: `+₹${amount}`, color: COLORS.text, bg: contact.color || COLORS.blue
    }, ...prev]);
  };

  const appState = { owed, owe, activeLoans, recentActivity, splitGroups };
  const appActions = { onLend, onSplit, onRequest };

  return (
    <PhoneLayout bottomNav={<BottomNav active={activeTab} onNav={handleNav} />}>
      {screen === "home" && <HomeScreen onNav={handleNav} appState={appState} />}
      {screen === "lend" && <LendScreen onNav={handleNav} appActions={appActions} />}
      {screen === "split" && <SplitScreen onNav={handleNav} appState={appState} appActions={appActions} />}
      {screen === "scan" && <ScanScreen onNav={handleNav} />}
      {screen === "request" && <RequestScreen onNav={handleNav} appActions={appActions} />}
      {screen === "profile" && <ProfileScreen />}
    </PhoneLayout>
  );
}

