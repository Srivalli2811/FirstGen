import { useEffect, useState } from "react";
import api from "../../utils/api";
import MoodChart from "./MoodChart";

const moodData = {
  1: {
    emoji: "😢",
    label: "Very Low",
    color: "#ef5350",
  },
  2: {
    emoji: "😟",
    label: "Low",
    color: "#f6b73c",
  },
  3: {
    emoji: "😐",
    label: "Okay",
    color: "#6b7280",
  },
  4: {
    emoji: "🙂",
    label: "Good",
    color: "#45b36b",
  },
  5: {
    emoji: "😊",
    label: "Great",
    color: "#22c55e",
  },
};

function formatDate(dateString) {
  const moodDate = new Date(dateString);
  const today = new Date();

  const diff =
    Math.floor(
      (today.setHours(0, 0, 0, 0) -
        moodDate.setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24)
    );

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";

  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function MoodHistory({ refresh }) {
  const [moods, setMoods] = useState([]);
  const [burnoutAlert, setBurnoutAlert] = useState(false);
  const [burnoutMessage, setBurnoutMessage] = useState("");

  useEffect(() => {
    api
      .get("/mood/history")
      .then((res) => {
        setMoods(res.data.moods);
        setBurnoutAlert(res.data.burnoutAlert);
        setBurnoutMessage(res.data.burnoutMessage);
      })
      .catch(console.error);
  }, [refresh]);

  return (
    <div className="card slide-up">

      <div className="flex-between mb-3">

        <div>

          <h2 className="card-title">
            📈 Mood Journey
          </h2>

          <p className="card-subtitle">
            Your emotional wellbeing over time.
          </p>

        </div>

      </div>

      {burnoutAlert && (

        <div className="burnout-alert">

          <h4>
            ⚠️ Burnout Risk Detected
          </h4>

          <p>
            {burnoutMessage}
          </p>

        </div>

      )}

      {moods.length > 0 && (
        <MoodChart moods={moods} />
      )}

      {moods.length === 0 ? (

        <div className="empty-moods">

          <div className="empty-icon">
            🌱
          </div>

          <h3>
            No Mood Entries Yet
          </h3>

          <p>
            Start logging your daily mood to
            build your personal wellness timeline.
          </p>

        </div>

      ) : (

        <div className="timeline">

          {moods.map((mood) => {
            const item = moodData[mood.score];

            return (

              <div
                key={mood._id}
                className="timeline-item hover-lift"
              >

                <div
                  className="timeline-dot"
                  style={{
                    background: item.color,
                  }}
                />

                <div className="timeline-card">

                  <div className="timeline-header">

                    <div className="timeline-mood">

                      <span className="timeline-emoji">
                        {item.emoji}
                      </span>

                      <div>

                        <h4>
                          {item.label}
                        </h4>

                        <span>
                          {formatDate(mood.date)}
                        </span>

                      </div>

                    </div>

                  </div>

                  {mood.note && (

                    <p className="timeline-note">
                      {mood.note}
                    </p>

                  )}

                </div>

              </div>

            );
          })}

        </div>

      )}

    </div>
  );
}

export default MoodHistory;