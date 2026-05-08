import { useState } from "react";
import { COLORS, CONTACTS as initialContacts } from "../constants";
import { BottomNav } from "../components/BottomNav";
import { HomeScreen } from "./HomeScreen";
import { LendScreen } from "./LendScreen";
import { SplitScreen } from "./SplitScreen";
import { ScanScreen } from "./ScanScreen";
import { RequestScreen } from "./RequestScreen";
import { ProfileScreen } from "./ProfileScreen";
import { PhoneLayout } from "../components/PhoneLayout";

export default function App() {
  const [screen, setScreen] = useState("home");
  const navScreens = ["home", "lend", "scan", "split", "profile"];
  const activeTab = navScreens.includes(screen) ? screen : "home";

  const handleNav = (s) => setScreen(s);

  const [owed, setOwed] = useState(0);
  const [owe, setOwe] = useState(0);
  const [contacts, setContacts] = useState(initialContacts);

  const onAddContact = (name, phone) => {
    if (!name) return null;
    const newId = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "NN";
    const colors = ["#f43f5e", "#8b5cf6", "#14b8a6", "#f59e0b", "#3b82f6", "#ec4899"];
    const color = colors[contacts.length % colors.length];
    const newContact = { id: newId, name: name.split(" ")[0], full: name, phone: phone || "", color };
    setContacts(prev => [...prev, newContact]);
    return newContact;
  };
  const [activeLoans, setActiveLoans] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [splitGroups, setSplitGroups] = useState([]);

  const onLend = (contact, amount, purpose, tenure = 7) => {
    setOwed(prev => prev + Number(amount));
    setActiveLoans(prev => [{
      id: contact.id, name: contact.name, sub: purpose || "Lent money", amount: `₹${amount}`, badge: "Just now", badgeColor: COLORS.blue, progress: 0, type: "lent", tenure
    }, ...prev]);
    setRecentActivity(prev => [{
      id: contact.id, name: contact.name, sub: "↑ You lent · Just now", amount: `-₹${amount}`, color: COLORS.red, bg: contact.color || COLORS.blue
    }, ...prev]);
  };

  const onSplit = (group, owedAmt = 0) => {
    setSplitGroups(prev => [group, ...prev]);
    if (owedAmt > 0) {
      setOwed(prev => prev + owedAmt);
    }
    setRecentActivity(prev => [{
      id: "RL", name: group.name, sub: `⤨ Created Split · Just now`, amount: group.total, color: COLORS.text, bg: COLORS.blue
    }, ...prev]);
  };

  const onRequest = (contact, amount, purpose, tenure = 7) => {
    setOwe(prev => prev + Number(amount));
    setActiveLoans(prev => [{
      id: contact.id, name: contact.name, sub: purpose || "Borrowed money", amount: `₹${amount}`, badge: "To Repay", badgeColor: COLORS.orange, progress: 0, type: "borrowed", tenure
    }, ...prev]);
    setRecentActivity(prev => [{
      id: contact.id, name: contact.name, sub: `↓ Borrowed ${purpose ? `for ${purpose}` : ''} · Just now`, amount: `+₹${amount}`, color: COLORS.text, bg: contact.color || COLORS.blue
    }, ...prev]);
  };

  const appState = { owed, owe, activeLoans, recentActivity, splitGroups, contacts };
  const appActions = { onLend, onSplit, onRequest, onAddContact };

  return (
    <PhoneLayout bottomNav={<BottomNav active={activeTab} onNav={handleNav} />}>
      {screen === "home" && <HomeScreen onNav={handleNav} appState={appState} />}
      {screen === "lend" && <LendScreen onNav={handleNav} appState={appState} appActions={appActions} />}
      {screen === "split" && <SplitScreen onNav={handleNav} appState={appState} appActions={appActions} />}
      {screen === "scan" && <ScanScreen onNav={handleNav} />}
      {screen === "request" && <RequestScreen onNav={handleNav} appState={appState} appActions={appActions} />}
      {screen === "profile" && <ProfileScreen />}
    </PhoneLayout>
  );
}

