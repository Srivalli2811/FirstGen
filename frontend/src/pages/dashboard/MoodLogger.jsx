import { useEffect, useState } from "react";
import api from "../../utils/api";

const moodOptions = [
  {
    score: 1,
    emoji: "😢",
    title: "Very Low",
    color: "#ef5350",
  },
  {
    score: 2,
    emoji: "😟",
    title: "Low",
    color: "#f6b73c",
  },
  {
    score: 3,
    emoji: "😐",
    title: "Okay",
    color: "#6b7280",
  },
  {
    score: 4,
    emoji: "🙂",
    title: "Good",
    color: "#45b36b",
  },
  {
    score: 5,
    emoji: "😊",
    title: "Great",
    color: "#22c55e",
  },
];

function MoodLogger({ onMoodLogged }) {
  const [selectedScore, setSelectedScore] = useState(null);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [todayMood, setTodayMood] = useState(null);

  useEffect(() => {
    api
      .get("/mood/today")
      .then((res) => {
        if (res.data) {
          setTodayMood(res.data);
          setSelectedScore(res.data.score);
          setNote(res.data.note);
        }
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async () => {
    if (!selectedScore) {
      setMessage("Please choose your mood.");
      return;
    }

    try {
      await api.post("/mood/log", {
        score: selectedScore,
        note,
      });

      setTodayMood({
        score: selectedScore,
        note,
      });

      setMessage(
        todayMood
          ? "✅ Mood updated successfully."
          : "✅ Mood logged successfully."
      );

      onMoodLogged?.();
    } catch {
      setMessage("Unable to save your mood.");
    }
  };

  const currentMood = moodOptions.find(
    (m) => m.score === selectedScore
  );

  return (
    <div className="mood-card">

      <div className="mood-header">

        <h3>How are you feeling today?</h3>

        <p>
          Your daily check-in helps us provide better
          recommendations and wellness support.
        </p>

      </div>

      <div className="mood-grid">

        {moodOptions.map((mood) => (
          <button
            key={mood.score}
            className={
              selectedScore === mood.score
                ? "mood-option active"
                : "mood-option"
            }
            onClick={() => setSelectedScore(mood.score)}
          >
            <span className="mood-emoji">
              {mood.emoji}
            </span>

            <span className="mood-title">
              {mood.title}
            </span>
          </button>
        ))}

      </div>

      {currentMood && (
        <div className="selected-mood">

          <strong>
            Current Mood:
          </strong>

          <span
            style={{
              color: currentMood.color,
              fontWeight: 700,
            }}
          >
            {" "}
            {currentMood.emoji} {currentMood.title}
          </span>

        </div>
      )}

      <div className="form-group mt-3">

        <label className="form-label">
          Journal (Optional)
        </label>

        <textarea
          className="form-input mood-note"
          rows={4}
          placeholder="Write about your day, challenges, achievements, or anything on your mind..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

      </div>

      <button
        className="btn-primary mood-submit"
        onClick={handleSubmit}
      >
        {todayMood
          ? "Update Today's Mood"
          : "Save Today's Mood"}
      </button>

      {message && (
        <div className="mood-message">
          {message}
        </div>
      )}

    </div>
  );
}

export default MoodLogger;