import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/signup", {
        name,
        email,
        password,
        role,
      });

      login(response.data.user, response.data.token);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to create your account."
      );
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card slide-up">

        <div className="auth-logo">
          🚀
        </div>

        <h1 className="auth-title">
          Create Your Account
        </h1>

        <p className="auth-subtitle">
          Join FirstGen and unlock scholarships, AI mentoring,
          mental wellness support, and career guidance.
        </p>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label className="form-label">
              Full Name
            </label>

            <input
              className="form-input"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Email Address
            </label>

            <input
              className="form-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Password
            </label>

            <input
              className="form-input"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Register As
            </label>

            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">
                🎓 Student
              </option>

              <option value="counselor">
                👩‍🏫 Counselor
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="btn-primary auth-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <p className="auth-link">
          Already have an account?

          <Link to="/login">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;