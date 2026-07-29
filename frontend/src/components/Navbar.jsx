import { useAuth } from "../context/AuthContext";

function Navbar({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth();

  const tabs = [
    {
      id: "dashboard",
      icon: "🏠",
      label: "Dashboard",
    },
    {
      id: "chat",
      icon: "🤖",
      label: "AI Mentor",
    },
    {
      id: "scholarships",
      icon: "🎓",
      label: "Scholarships",
    },
  ];

  const avatarLetter =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <nav className="navbar">
      {/* Left */}
      <div className="navbar-brand">
        <div className="brand-icon">🎓</div>

        <div className="brand-text">
          <h1>FirstGen</h1>
          <span>Empowering First-Generation Students</span>
        </div>
      </div>

      {/* Center */}
      <div className="navbar-links">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "nav-link active" : "nav-link"}
            onClick={() => setActiveTab(tab.id)}
          >
            <span style={{ marginRight: "8px" }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Right */}
      <div className="navbar-user">
        <div className="user-avatar" title={user?.email || user?.name}>
          {avatarLetter}
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;