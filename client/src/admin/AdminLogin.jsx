import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiAlertCircle,
} from "react-icons/fi";

import {
  loginAdmin,
} from "../services/authService";

import "./AdminLogin.css";

function AdminLogin() {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setError("");
      setLoading(true);

      try {
        const data =
          await loginAdmin(
            formData.email,
            formData.password
          );

        localStorage.setItem(
          "portfolio_admin_token",
          data.token
        );

        localStorage.setItem(
          "portfolio_admin",
          JSON.stringify(
            data.admin
          )
        );

        navigate(
          "/admin/dashboard",
          {
            replace: true,
          }
        );
      } catch (error) {
        setError(
          error.response?.data
            ?.message ||
            "Unable to login."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="admin-login-page">
      <div className="admin-login-background">
        <div className="admin-login-grid" />
        <div className="admin-login-glow" />
      </div>

      <div className="admin-login-wrapper">
        <div className="admin-login-brand">
          <div className="admin-login-brand-mark">
            SP
          </div>

          <div>
            <span>
              SURIYAPRAKASH
            </span>

            <p>
              Portfolio Admin
            </p>
          </div>
        </div>

        <div className="admin-login-card">
          <div className="admin-login-heading">
            <span className="admin-login-label">
              SECURE ACCESS
            </span>

            <h1>
              Welcome back.
            </h1>

            <p>
              Sign in to manage your
              portfolio.
            </p>
          </div>

          {error && (
            <div className="admin-login-error">
              <FiAlertCircle />

              <span>
                {error}
              </span>
            </div>
          )}

          <form
            onSubmit={
              handleSubmit
            }
          >
            <div className="admin-field">
              <label
                htmlFor="email"
              >
                Email
              </label>

              <div className="admin-input-wrapper">
                <FiMail />

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Admin email"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="admin-field">
              <label
                htmlFor="password"
              >
                Password
              </label>

              <div className="admin-input-wrapper">
                <FiLock />

                <input
                  type="password"
                  id="password"
                  name="password"
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Admin password"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="admin-login-button"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign In"}

              {!loading && (
                <FiArrowRight />
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            Protected administrative
            access
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;