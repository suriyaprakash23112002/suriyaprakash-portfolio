import { useEffect, useState } from "react";
import {
  FiExternalLink,
  FiGithub,
  FiImage,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiRefreshCw,
  FiSave,
} from "react-icons/fi";

import profileImage from "../assets/sample.png";
import api from "../services/api";

import {
  AdminAlert,
  AdminLoader,
  AdminPageHeader,
  AdminSaving,
} from "./AdminUI";

import "./AdminProfile.css";

const emptyForm = {
  fullName: "",
  headline: "",
  heroText: "",
  shortBio: "",
  longBio: "",
  location: "",
  email: "",
  phone: "",
  githubUrl: "",
  linkedinUrl: "",
  whatsappUrl: "",
  resumeUrl: "",
  profileImageUrl: "",
  availableForWork: true,
  availabilityText: "",
};

function AdminProfile() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const previewImage =
    !imageError && form.profileImageUrl?.trim()
      ? form.profileImageUrl.trim()
      : profileImage;

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await api.get("/profile");

      setForm({
        ...emptyForm,
        ...(response?.data?.profile || {}),
      });

      setImageError(false);
    } catch (err) {
      console.error("Profile load error:", err);

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

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    if (name === "profileImageUrl") {
      setImageError(false);
    }

    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response =
        await api.put("/profile", form);

      if (response?.data?.profile) {
        setForm({
          ...emptyForm,
          ...response.data.profile,
        });
      }

      setImageError(false);

      localStorage.setItem(
        "portfolio_profile_updated_at",
        String(Date.now())
      );

      setSuccess(
        "Profile updated. Hero, navbar and footer now use this profile data."
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

  if (loading) {
    return (
      <AdminLoader label="Loading profile..." />
    );
  }

  return (
    <div className="admin-ui-page admin-profile-page">
      <AdminPageHeader
        eyebrow="PROFILE MANAGEMENT"
        title="Profile"
        description="Your single source of truth for the hero, navbar, footer, about and contact sections."
        actions={
          <button
            type="button"
            className="admin-ui-button"
            onClick={() =>
              window.open("/", "_blank")
            }
          >
            View Portfolio
            <FiExternalLink />
          </button>
        }
      />

      <AdminAlert type="error">
        {error}
      </AdminAlert>

      <AdminAlert type="success">
        {success}
      </AdminAlert>

      <form
        onSubmit={handleSubmit}
        className="admin-profile-layout"
      >
        <aside className="admin-profile-preview admin-ui-card">
          <div className="admin-profile-preview-header">
            <div>
              <span>LIVE PROFILE</span>
              <strong>
                Portfolio identity
              </strong>
            </div>

            <div className="admin-profile-live">
              <i />
              LIVE
            </div>
          </div>

          <div className="admin-profile-photo-stage">
            <div className="admin-profile-photo-ring" />

            <div className="admin-profile-photo-frame">
              <img
                src={previewImage}
                alt={
                  form.fullName ||
                  "Profile preview"
                }
                onError={() =>
                  setImageError(true)
                }
              />

              <div className="admin-profile-photo-scan" />
            </div>

            <div className="admin-profile-photo-status">
              <span />
              {form.availableForWork
                ? "AVAILABLE"
                : "UNAVAILABLE"}
            </div>
          </div>

          <div className="admin-profile-preview-copy">
            <span>
              {form.headline ||
                "FULL-STACK DEVELOPER"}
            </span>

            <h2>
              {form.fullName ||
                "Suriyaprakash"}
            </h2>

            <p>
              {form.heroText ||
                "Your hero introduction will appear here."}
            </p>
          </div>

          <div className="admin-profile-preview-meta">
            {form.location && (
              <span>
                <FiMapPin />
                {form.location}
              </span>
            )}

            {form.email && (
              <span>
                <FiMail />
                {form.email}
              </span>
            )}
          </div>

          <div className="admin-profile-preview-links">
            <div>
              <FiImage />
              <span>
                <strong>
                  One profile image
                </strong>
                <small>
                  Hero · Navbar · Footer
                </small>
              </span>
            </div>

            <div>
              <FiGithub />
              <span>
                <strong>
                  GitHub
                </strong>
                <small>
                  {form.githubUrl
                    ? "Connected"
                    : "Not set"}
                </small>
              </span>
            </div>

            <div>
              <FiLinkedin />
              <span>
                <strong>
                  LinkedIn
                </strong>
                <small>
                  {form.linkedinUrl
                    ? "Connected"
                    : "Not set"}
                </small>
              </span>
            </div>
          </div>
        </aside>

        <div className="admin-profile-editor">
          <section className="admin-ui-panel admin-profile-section">
            <div className="admin-profile-section-heading">
              <div>
                <span>01 · IDENTITY</span>
                <h2>
                  Profile image & identity
                </h2>
              </div>

              <FiImage />
            </div>

            <div className="admin-ui-form-grid">
              <label className="admin-ui-field admin-ui-field-full">
                <span>
                  Profile image URL
                </span>

                <input
                  type="url"
                  name="profileImageUrl"
                  value={
                    form.profileImageUrl ||
                    ""
                  }
                  onChange={handleChange}
                  placeholder="https://..."
                />

                <small className="admin-profile-field-note">
                  Save once and this same
                  image is used in the
                  hero, navbar and footer.
                </small>
              </label>

              <label className="admin-ui-field">
                <span>
                  Full name
                </span>

                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="admin-ui-field">
                <span>
                  Headline
                </span>

                <input
                  name="headline"
                  value={form.headline}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="admin-ui-field admin-ui-field-full">
                <span>
                  Hero introduction
                </span>

                <textarea
                  name="heroText"
                  value={
                    form.heroText || ""
                  }
                  onChange={handleChange}
                />
              </label>

              <label className="admin-ui-check admin-ui-field-full">
                <input
                  type="checkbox"
                  name="availableForWork"
                  checked={Boolean(
                    form.availableForWork
                  )}
                  onChange={handleChange}
                />
                Available for work
              </label>

              <label className="admin-ui-field admin-ui-field-full">
                <span>
                  Availability text
                </span>

                <input
                  name="availabilityText"
                  value={
                    form.availabilityText ||
                    ""
                  }
                  onChange={handleChange}
                  placeholder="Available for opportunities"
                />
              </label>
            </div>
          </section>

          <section className="admin-ui-panel admin-profile-section">
            <div className="admin-profile-section-heading">
              <div>
                <span>02 · STORY</span>
                <h2>
                  About content
                </h2>
              </div>
            </div>

            <div className="admin-ui-form-grid">
              <label className="admin-ui-field admin-ui-field-full">
                <span>
                  Short bio
                </span>

                <textarea
                  name="shortBio"
                  value={
                    form.shortBio || ""
                  }
                  onChange={handleChange}
                />
              </label>

              <label className="admin-ui-field admin-ui-field-full">
                <span>
                  Long bio
                </span>

                <textarea
                  name="longBio"
                  value={
                    form.longBio || ""
                  }
                  onChange={handleChange}
                />
              </label>
            </div>
          </section>

          <section className="admin-ui-panel admin-profile-section">
            <div className="admin-profile-section-heading">
              <div>
                <span>03 · CONTACT</span>
                <h2>
                  Contact details
                </h2>
              </div>
            </div>

            <div className="admin-ui-form-grid">
              <label className="admin-ui-field">
                <span>
                  Location
                </span>

                <input
                  name="location"
                  value={
                    form.location || ""
                  }
                  onChange={handleChange}
                />
              </label>

              <label className="admin-ui-field">
                <span>
                  Email
                </span>

                <input
                  type="email"
                  name="email"
                  value={
                    form.email || ""
                  }
                  onChange={handleChange}
                />
              </label>

              <label className="admin-ui-field">
                <span>
                  Phone
                </span>

                <input
                  name="phone"
                  value={
                    form.phone || ""
                  }
                  onChange={handleChange}
                />
              </label>

              <label className="admin-ui-field">
                <span>
                  WhatsApp URL
                </span>

                <input
                  type="url"
                  name="whatsappUrl"
                  value={
                    form.whatsappUrl || ""
                  }
                  onChange={handleChange}
                  placeholder="https://wa.me/91..."
                />
              </label>
            </div>
          </section>

          <section className="admin-ui-panel admin-profile-section">
            <div className="admin-profile-section-heading">
              <div>
                <span>04 · LINKS</span>
                <h2>
                  Professional links
                </h2>
              </div>
            </div>

            <div className="admin-ui-form-grid">
              <label className="admin-ui-field">
                <span>
                  GitHub URL
                </span>

                <input
                  type="url"
                  name="githubUrl"
                  value={
                    form.githubUrl || ""
                  }
                  onChange={handleChange}
                />
              </label>

              <label className="admin-ui-field">
                <span>
                  LinkedIn URL
                </span>

                <input
                  type="url"
                  name="linkedinUrl"
                  value={
                    form.linkedinUrl || ""
                  }
                  onChange={handleChange}
                />
              </label>

              <label className="admin-ui-field admin-ui-field-full">
                <span>
                  Resume URL
                </span>

                <input
                  type="url"
                  name="resumeUrl"
                  value={
                    form.resumeUrl || ""
                  }
                  onChange={handleChange}
                />
              </label>
            </div>
          </section>

          <div className="admin-profile-savebar">
            <div>
              <span>
                PROFILE SYNC
              </span>

              <strong>
                Save changes to update
                your portfolio identity.
              </strong>
            </div>

            <div className="admin-ui-actions">
              <button
                type="button"
                className="admin-ui-button"
                onClick={loadProfile}
                disabled={saving}
              >
                <FiRefreshCw />
                Reset
              </button>

              <button
                type="submit"
                className="admin-ui-button admin-ui-button-primary"
                disabled={saving}
              >
                {saving ? (
                  <AdminSaving />
                ) : (
                  <>
                    <FiSave />
                    Save Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminProfile;
