import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";

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

      <div className="dashboard-hero card">

        <div className="hero-content">

          <h1>
            Counselor Dashboard
          </h1>

          <p>
            Welcome back, <strong>{user?.name}</strong>.
            Monitor students, identify burnout risks,
            and review mood history.
          </p>

        </div>

        <button
          className="btn btn-outline"
          onClick={logout}
        >
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

      </div>

      <div className="counselor-grid">

        <div className="card">

          <h2 className="card-title">
            Students
          </h2>

          <div className="student-list">

            {students.length === 0 ? (

              <div className="empty-moods">
                No students registered.
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

                    <div>

                      <h4>
                        {student.name}
                      </h4>

                      <p>
                        {student.email}
                      </p>

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
                👈
              </div>

              <h3>
                Select a Student
              </h3>

              <p>
                Choose a student from the list
                to view mood history.
              </p>

            </div>

          ) : (

            <>

              <h2 className="card-title">
                {selectedStudent.name}
              </h2>

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

              <div className="timeline">

                {studentMoods.map((mood) => (

                  <div
                    key={mood._id}
                    className="timeline-item"
                  >

                    <div
                      className="timeline-dot"
                      style={{
                        background:
                          moods[mood.score].color,
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
                            {mood.date}
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

            </>

          )}

        </div>

      </div>

    </div>
  );
}

export default CounselorDashboard;