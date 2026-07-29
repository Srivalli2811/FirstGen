import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import "../../styles/CounselorDashboard.css";

const moods = {
  1: { emoji: "😢", label: "Very Low", color: "#ef5350" },
  2: { emoji: "😟", label: "Low", color: "#f6b73c" },
  3: { emoji: "😐", label: "Okay", color: "#6b7280" },
  4: { emoji: "🙂", label: "Good", color: "#45b36b" },
  5: { emoji: "😊", label: "Great", color: "#22c55e" },
};

function CounselorDashboard() {
  const { user, logout } = useAuth();

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentMoods, setStudentMoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/counselor/students")
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleStudentClick = async (student) => {
    setSelectedStudent(student);

    try {
      const res = await api.get(
        `/counselor/students/${student._id}/moods`
      );

      setStudentMoods(res.data.moods);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="loading-page">
        <div className="loader"></div>
        <p>Loading students...</p>
      </div>
    );

  return (
    <div className="counselor-page">

      <div className="dashboard-hero">

        <div className="counselor-profile">

          <div className="counselor-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="hero-content">
            <h1>Counselor Dashboard</h1>

            <p>
              Welcome back, <strong>{user?.name}</strong>
            </p>

            <div className="hero-subinfo">
              <span>🧑‍💼 Counselor</span>
              <span>|</span>
              <span>{students.length} Students</span>
              <span>|</span>
              <span>
                {students.filter((s) => s.burnoutAlert).length}{" "}
                Active Alerts
              </span>
            </div>
          </div>
        </div>

        <button className="btn-secondary" onClick={logout}>
          Logout
        </button>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">👨‍🎓</div>
          <div className="stat-value">
            {students.length}
          </div>
          <div className="stat-label">
            Students
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-value">
            {
              students.filter((s) => s.burnoutAlert)
                .length
            }
          </div>
          <div className="stat-label">
            Burnout Alerts
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">😊</div>
          <div className="stat-value">{studentMoods.length}</div>
          <div className="stat-label">Mood Records</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👤</div>
          <div className="stat-value">
            {selectedStudent ? "1" : "0"}
          </div>
          <div className="stat-label">Viewing</div>
        </div>

      </div>

      <div className="counselor-grid">

        <div className="card">

          <h2 className="card-title">
            Students
          </h2>

          <div className="student-list">

            {students.length === 0 ? (

              <div className="empty-selection">

                <div className="empty-icon">
                  🧑‍🤝‍🧑
                </div>

                <h3>
                  No students yet
                </h3>

                <p>
                  Once students register, you'll be able to
                  monitor their moods, detect burnout risks,
                  and review their history here.
                </p>

              </div>

            ) : (

              students.map((student) => (

                <div
                  key={student._id}
                  className={`student-card ${
                    selectedStudent?._id ===
                    student._id
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleStudentClick(student)
                  }
                >

                  <div className="student-top">

                    <div className="student-identity">
                      <div className="student-avatar">
                        {student.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h4>{student.name}</h4>
                        <p>{student.email}</p>
                      </div>
                    </div>

                    {student.burnoutAlert && (
                      <span className="burnout-chip">
                        ⚠️ Risk
                      </span>
                    )}

                  </div>

                  <small>

                    {student.lastMoodScore ? (
                      <>
                        {
                          moods[
                            student.lastMoodScore
                          ].emoji
                        }{" "}
                        Last mood •{" "}
                        {student.lastMoodDate}
                      </>
                    ) : (
                      "No mood entries"
                    )}

                  </small>

                </div>

              ))

            )}

          </div>

        </div>

        <div className="card">

          {!selectedStudent ? (

            <div className="empty-selection">

              <div className="empty-icon">
                📊
              </div>

              <h3>
                Select a Student
              </h3>

              <p>
                Click on any student from the left panel to
                view their mood history and burnout analysis.
              </p>

            </div>

          ) : (

            <>

              <div className="student-detail-header">

                <div className="student-avatar-large">
                  {selectedStudent.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2>{selectedStudent.name}</h2>
                  <p>{selectedStudent.email}</p>
                </div>

              </div>

              <div className="student-summary-grid">

                <div className="summary-item">
                  <span className="summary-label">Current Mood</span>
                  <span className="summary-value">
                    {selectedStudent.lastMoodScore ? (
                      <>
                        {moods[selectedStudent.lastMoodScore].emoji}{" "}
                        {moods[selectedStudent.lastMoodScore].label}
                      </>
                    ) : (
                      "No data"
                    )}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Last Active</span>
                  <span className="summary-value">
                    {selectedStudent.lastMoodDate
                      ? new Date(selectedStudent.lastMoodDate).toLocaleDateString()
                      : "No data"}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Burnout Risk</span>
                  <span
                    className={`summary-value ${
                      selectedStudent.burnoutAlert ? "risk-high" : "risk-low"
                    }`}
                  >
                    {selectedStudent.burnoutAlert ? "High" : "Low"}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Total Mood Entries</span>
                  <span className="summary-value">{studentMoods.length}</span>
                </div>

              </div>

              {selectedStudent.burnoutAlert && (

                <div className="burnout-alert">

                  <h4>
                    Burnout Risk
                  </h4>

                  <p>
                    This student may require
                    additional support.
                  </p>

                </div>

              )}

              {studentMoods.length === 0 ? (

                <div className="empty-selection">
                  <div className="empty-icon">📝</div>

                  <h3>No Mood Records</h3>

                  <p>
                    This student hasn't logged any moods yet.
                  </p>
                </div>

              ) : (

                <div className="timeline">

                  {studentMoods.map((mood) => (

                    <div
                      key={mood._id}
                      className="timeline-item"
                    >

                      <div
                        className="timeline-dot"
                        style={{
                          "--dot-color": moods[mood.score].color,
                        }}
                      />

                      <div className="timeline-card">

                        <div className="timeline-mood">

                          <span className="timeline-emoji">
                            {
                              moods[mood.score]
                                .emoji
                            }
                          </span>

                          <div>

                            <h4>
                              {
                                moods[mood.score]
                                  .label
                              }
                            </h4>

                            <span>
                              {new Date(mood.date).toLocaleString([], {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </span>

                          </div>

                        </div>

                        {mood.note && (
                          <p className="timeline-note">
                            {mood.note}
                          </p>
                        )}

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </>

          )}

        </div>

      </div>

    </div>
  );
}

export default CounselorDashboard;