import { useState } from "react";

import { useAuth } from "../../context/AuthContext";

import Navbar from "../../components/Navbar";

import MoodLogger from "./MoodLogger";
import MoodHistory from "./MoodHistory";
import Chatbot from "./Chatbot";
import ScholarshipFinder from "./ScholarshipFinder";

function Dashboard() {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("dashboard");

  const [refresh, setRefresh] = useState(0);

  function handleMoodLogged() {
    setRefresh((prev) => prev + 1);
  }

  return (
    <>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="page-container fade-in">

        {activeTab === "dashboard" && (
          <>

            {/* Hero */}

            <section className="dashboard-hero card gradient-bg">

              <div className="hero-content">

                <h1>
                  Welcome back,
                  <br />
                  {user?.name} 👋
                </h1>

                <p>
                  Every small step matters.
                  Track your mood, discover opportunities,
                  and let AI guide your academic journey.
                </p>

              </div>

            </section>

            {/* Mood */}

            <section className="card mt-3 hover-lift">
              <h2 className="card-title">
                🌱 Daily Mood Check-In
              </h2>

              <p className="card-subtitle">
                Tell us how you're feeling today.
              </p>

              <MoodLogger
                onMoodLogged={handleMoodLogged}
              />
            </section>

            {/* History */}

            <section className="mt-3">
              <MoodHistory refresh={refresh} />
            </section>

          </>
        )}

        {activeTab === "chat" && (
          <Chatbot />
        )}

        {activeTab === "scholarships" && (
          <ScholarshipFinder />
        )}

      </main>
    </>
  );
}

export default Dashboard;