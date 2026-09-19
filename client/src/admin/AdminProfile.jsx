import { useEffect, useState } from "react";

import {
  FiUser,
  FiSave,
  FiMapPin,
  FiMail,
  FiPhone,
  FiGithub,
  FiLinkedin,
  FiImage,
  FiFileText,
  FiBriefcase,
  FiType,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
  FiExternalLink,
} from "react-icons/fi";

import api from "../services/api";

import "./AdminProfile.css";

const initialForm = {
  name: "",
  role: "",
  headline: "",
  bio: "",
  location: "",
  email: "",
  phone: "",
  whatsapp: "",
  githubUrl: "",
  linkedinUrl: "",
  profileImageUrl: "",
  resumeUrl: "",
  availability: true,
};

function AdminProfile() {
  const [form, setForm] =
    useState(initialForm);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /* =====================================================
     LOAD PROFILE
  ===================================================== */

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await api.get(
          "/profile"
        );

      const profile =
        response?.data?.profile ||
        response?.data?.data ||
        response?.data ||
        {};

      setForm({
        name:
          profile?.name || "",

        role:
          profile?.role ||
          profile?.title ||
          "",

        headline:
          profile?.headline ||
          "",

        bio:
          profile?.bio ||
          profile?.about ||
          "",

        location:
          profile?.location ||
          "",

        email:
          profile?.email ||
          profile?.contactEmail ||
          "",

        phone:
          profile?.phone || "",

        whatsapp:
          profile?.whatsapp ||
          profile?.whatsappNumber ||
          "",

        githubUrl:
          profile?.githubUrl ||
          "",

        linkedinUrl:
          profile?.linkedinUrl ||
          "",

        profileImageUrl:
          profile?.profileImageUrl ||
          profile?.imageUrl ||
          profile?.avatarUrl ||
          "",

        resumeUrl:
          profile?.resumeUrl ||
          "",

        availability:
          profile?.availability ??
          profile?.isAvailable ??
          true,
      });
    } catch (err) {
      console.error(
        "Profile load error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  /* =====================================================
     HANDLE INPUT
  ===================================================== */

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setSuccess("");
  };

  /* =====================================================
     SAVE PROFILE
  ===================================================== */

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      try {
        setSaving(true);
        setError("");
        setSuccess("");

        const payload = {
          ...form,
        };

        const response =
          await api.put(
            "/profile",
            payload
          );

        const updatedProfile =
          response?.data?.profile ||
          response?.data?.data;

        if (updatedProfile) {
          setForm(
            (previous) => ({
              ...previous,
              ...updatedProfile,
            })
          );
        }

        setSuccess(
          "Profile updated successfully."
        );
      } catch (err) {
        console.error(
          "Profile update error:",
          err
        );

        setError(
          err?.response?.data?.message ||
            "Unable to update profile."
        );
      } finally {
        setSaving(false);
      }
    };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="admin-profile-loading">
        <FiRefreshCw />

        <span>
          Loading profile...
        </span>
      </div>
    );
  }

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="admin-profile">
      {/* ===============================================
          PAGE HEADER
      =============================================== */}

      <div className="admin-profile-page-header">
        <div>
          <span>
            PROFILE MANAGEMENT
          </span>

          <h1>
            Profile
          </h1>

          <p>
            Manage the personal
            information displayed
            throughout your portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            window.open(
              "/",
              "_blank"
            )
          }
          className="admin-profile-view-button"
        >
          View Portfolio

          <FiExternalLink />
        </button>
      </div>

      {/* ===============================================
          MESSAGES
      =============================================== */}

      {error && (
        <div className="admin-profile-message admin-profile-error">
          <FiAlertCircle />

          <span>
            {error}
          </span>
        </div>
      )}

      {success && (
        <div className="admin-profile-message admin-profile-success">
          <FiCheckCircle />

          <span>
            {success}
          </span>
        </div>
      )}

      {/* ===============================================
          MAIN GRID
      =============================================== */}

      <form
        className="admin-profile-layout"
        onSubmit={
          handleSubmit
        }
      >
        {/* =============================================
            LEFT - PREVIEW
        ============================================= */}

        <aside className="admin-profile-preview-panel">
          <div className="admin-profile-preview-header">
            <span>
              LIVE PREVIEW
            </span>

            <div>
              <i />

              PUBLIC
            </div>
          </div>

          <div className="admin-profile-avatar-wrap">
            {form.profileImageUrl ? (
              <img
                src={
                  form.profileImageUrl
                }
                alt={
                  form.name ||
                  "Profile"
                }
                className="admin-profile-avatar"
              />
            ) : (
              <div className="admin-profile-avatar-placeholder">
                <FiUser />
              </div>
            )}

            <span className="admin-profile-avatar-status" />
          </div>

          <div className="admin-profile-preview-copy">
            <span>
              FULL-STACK DEVELOPER
            </span>

            <h2>
              {form.name ||
                "Suriyaprakash"}
            </h2>

            <h3>
              {form.role ||
                "Full-Stack Developer"}
            </h3>

            <p>
              {form.headline ||
                "Your professional headline will appear here."}
            </p>
          </div>

          <div className="admin-profile-preview-meta">
            {form.location && (
              <div>
                <FiMapPin />

                <span>
                  {
                    form.location
                  }
                </span>
              </div>
            )}

            {form.email && (
              <div>
                <FiMail />

                <span>
                  {form.email}
                </span>
              </div>
            )}
          </div>

          <div className="admin-profile-availability">
            <span
              className={
                form.availability
                  ? "admin-profile-availability-dot"
                  : "admin-profile-availability-dot admin-profile-availability-off"
              }
            />

            <div>
              <span>
                AVAILABILITY
              </span>

              <strong>
                {form.availability
                  ? "Available for opportunities"
                  : "Currently unavailable"}
              </strong>
            </div>
          </div>
        </aside>

        {/* =============================================
            RIGHT - FORM
        ============================================= */}

        <div className="admin-profile-form-panel">
          {/* ===========================================
              BASIC INFORMATION
          =========================================== */}

          <section className="admin-profile-form-section">
            <div className="admin-profile-form-heading">
              <div className="admin-profile-form-icon">
                <FiUser />
              </div>

              <div>
                <span>
                  SECTION 01
                </span>

                <h2>
                  Basic Information
                </h2>

                <p>
                  Your primary
                  portfolio identity.
                </p>
              </div>
            </div>

            <div className="admin-profile-form-grid">
              {/* NAME */}

              <div className="admin-profile-field">
                <label htmlFor="name">
                  Name
                </label>

                <div className="admin-profile-input-wrap">
                  <FiUser />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={
                      form.name
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Suriyaprakash"
                  />
                </div>
              </div>

              {/* ROLE */}

              <div className="admin-profile-field">
                <label htmlFor="role">
                  Professional Role
                </label>

                <div className="admin-profile-input-wrap">
                  <FiBriefcase />

                  <input
                    id="role"
                    name="role"
                    type="text"
                    value={
                      form.role
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Full-Stack Developer"
                  />
                </div>
              </div>

              {/* HEADLINE */}

              <div className="admin-profile-field admin-profile-field-full">
                <label htmlFor="headline">
                  Headline
                </label>

                <div className="admin-profile-input-wrap">
                  <FiType />

                  <input
                    id="headline"
                    name="headline"
                    type="text"
                    value={
                      form.headline
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Building complete web products from frontend to deployment."
                  />
                </div>
              </div>

              {/* BIO */}

              <div className="admin-profile-field admin-profile-field-full">
                <label htmlFor="bio">
                  Bio / About
                </label>

                <textarea
                  id="bio"
                  name="bio"
                  value={
                    form.bio
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Write a short professional introduction..."
                  rows="6"
                />

                <div className="admin-profile-character-count">
                  {
                    form.bio.length
                  }{" "}
                  characters
                </div>
              </div>
            </div>
          </section>

          {/* ===========================================
              CONTACT DETAILS
          =========================================== */}

          <section className="admin-profile-form-section">
            <div className="admin-profile-form-heading">
              <div className="admin-profile-form-icon">
                <FiMail />
              </div>

              <div>
                <span>
                  SECTION 02
                </span>

                <h2>
                  Contact Details
                </h2>

                <p>
                  Public contact
                  information used
                  throughout the
                  portfolio.
                </p>
              </div>
            </div>

            <div className="admin-profile-form-grid">
              {/* LOCATION */}

              <div className="admin-profile-field">
                <label htmlFor="location">
                  Location
                </label>

                <div className="admin-profile-input-wrap">
                  <FiMapPin />

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={
                      form.location
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Bangalore, India"
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div className="admin-profile-field">
                <label htmlFor="email">
                  Email
                </label>

                <div className="admin-profile-input-wrap">
                  <FiMail />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={
                      form.email
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* PHONE */}

              <div className="admin-profile-field">
                <label htmlFor="phone">
                  Phone
                </label>

                <div className="admin-profile-input-wrap">
                  <FiPhone />

                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={
                      form.phone
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="+91..."
                  />
                </div>
              </div>

              {/* WHATSAPP */}

              <div className="admin-profile-field">
                <label htmlFor="whatsapp">
                  WhatsApp
                </label>

                <div className="admin-profile-input-wrap">
                  <FiPhone />

                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="text"
                    value={
                      form.whatsapp
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="919876543210"
                  />
                </div>

                <small>
                  Include country code
                  without spaces if
                  possible.
                </small>
              </div>
            </div>
          </section>

          {/* ===========================================
              SOCIAL LINKS
          =========================================== */}

          <section className="admin-profile-form-section">
            <div className="admin-profile-form-heading">
              <div className="admin-profile-form-icon">
                <FiGithub />
              </div>

              <div>
                <span>
                  SECTION 03
                </span>

                <h2>
                  Social & Professional
                  Links
                </h2>

                <p>
                  Links used in the
                  navbar, hero,
                  contact section and
                  footer.
                </p>
              </div>
            </div>

            <div className="admin-profile-form-grid">
              {/* GITHUB */}

              <div className="admin-profile-field">
                <label htmlFor="githubUrl">
                  GitHub
                </label>

                <div className="admin-profile-input-wrap">
                  <FiGithub />

                  <input
                    id="githubUrl"
                    name="githubUrl"
                    type="url"
                    value={
                      form.githubUrl
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              {/* LINKEDIN */}

              <div className="admin-profile-field">
                <label htmlFor="linkedinUrl">
                  LinkedIn
                </label>

                <div className="admin-profile-input-wrap">
                  <FiLinkedin />

                  <input
                    id="linkedinUrl"
                    name="linkedinUrl"
                    type="url"
                    value={
                      form.linkedinUrl
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ===========================================
              MEDIA
          =========================================== */}

          <section className="admin-profile-form-section">
            <div className="admin-profile-form-heading">
              <div className="admin-profile-form-icon">
                <FiImage />
              </div>

              <div>
                <span>
                  SECTION 04
                </span>

                <h2>
                  Media & Resume
                </h2>

                <p>
                  Manage your public
                  profile image and
                  resume link.
                </p>
              </div>
            </div>

            <div className="admin-profile-form-grid">
              {/* PROFILE IMAGE */}

              <div className="admin-profile-field admin-profile-field-full">
                <label htmlFor="profileImageUrl">
                  Profile Image URL
                </label>

                <div className="admin-profile-input-wrap">
                  <FiImage />

                  <input
                    id="profileImageUrl"
                    name="profileImageUrl"
                    type="url"
                    value={
                      form.profileImageUrl
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* RESUME */}

              <div className="admin-profile-field admin-profile-field-full">
                <label htmlFor="resumeUrl">
                  Resume URL
                </label>

                <div className="admin-profile-input-wrap">
                  <FiFileText />

                  <input
                    id="resumeUrl"
                    name="resumeUrl"
                    type="url"
                    value={
                      form.resumeUrl
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ===========================================
              AVAILABILITY
          =========================================== */}

          <section className="admin-profile-availability-setting">
            <div>
              <span>
                AVAILABILITY
              </span>

              <h3>
                Open to opportunities
              </h3>

              <p>
                Show an availability
                indicator on your
                public portfolio.
              </p>
            </div>

            <label className="admin-profile-switch">
              <input
                type="checkbox"
                name="availability"
                checked={
                  form.availability
                }
                onChange={
                  handleChange
                }
              />

              <span />
            </label>
          </section>

          {/* ===========================================
              ACTIONS
          =========================================== */}

          <div className="admin-profile-actions">
            <button
              type="button"
              className="admin-profile-reset-button"
              onClick={
                loadProfile
              }
              disabled={
                saving
              }
            >
              <FiRefreshCw />

              Reset
            </button>

            <button
              type="submit"
              className="admin-profile-save-button"
              disabled={
                saving
              }
            >
              {saving ? (
                <>
                  <FiRefreshCw className="admin-profile-spin" />

                  Saving...
                </>
              ) : (
                <>
                  <FiSave />

                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminProfile;