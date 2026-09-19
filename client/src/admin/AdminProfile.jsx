import { useEffect, useState } from "react";
import {
  FiExternalLink,
  FiRefreshCw,
  FiSave,
} from "react-icons/fi";

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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/profile");
      setForm({
        ...emptyForm,
        ...(response?.data?.profile || {}),
      });
    } catch (err) {
      console.error("Profile load error:", err);
      setError(err?.response?.data?.message || "Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await api.put("/profile", form);

      if (response?.data?.profile) {
        setForm({
          ...emptyForm,
          ...response.data.profile,
        });
      }

      setSuccess("Profile updated successfully.");
    } catch (err) {
      console.error("Profile update error:", err);
      setError(err?.response?.data?.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <AdminLoader label="Loading profile..." />;
  }

  return (
    <div className="admin-ui-page">
      <AdminPageHeader
        eyebrow="PROFILE MANAGEMENT"
        title="Profile"
        description="Manage the content used by the hero, about, contact and footer sections."
        actions={
          <button
            type="button"
            className="admin-ui-button"
            onClick={() => window.open("/", "_blank")}
          >
            View Portfolio
            <FiExternalLink />
          </button>
        }
      />

      <AdminAlert type="error">{error}</AdminAlert>
      <AdminAlert type="success">{success}</AdminAlert>

      <form onSubmit={handleSubmit} className="admin-ui-panel">
        <div className="admin-ui-section-title">
          <div>
            <span>IDENTITY</span>
            <h2>Personal information</h2>
          </div>
        </div>

        <div className="admin-ui-form-grid">
          <label className="admin-ui-field">
            <span>Full name</span>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </label>

          <label className="admin-ui-field">
            <span>Headline</span>
            <input
              name="headline"
              value={form.headline}
              onChange={handleChange}
              required
            />
          </label>

          <label className="admin-ui-field admin-ui-field-full">
            <span>Hero text</span>
            <textarea
              name="heroText"
              value={form.heroText || ""}
              onChange={handleChange}
            />
          </label>

          <label className="admin-ui-field admin-ui-field-full">
            <span>Short bio</span>
            <textarea
              name="shortBio"
              value={form.shortBio || ""}
              onChange={handleChange}
            />
          </label>

          <label className="admin-ui-field admin-ui-field-full">
            <span>Long bio</span>
            <textarea
              name="longBio"
              value={form.longBio || ""}
              onChange={handleChange}
            />
          </label>

          <label className="admin-ui-field">
            <span>Location</span>
            <input
              name="location"
              value={form.location || ""}
              onChange={handleChange}
            />
          </label>

          <label className="admin-ui-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
            />
          </label>

          <label className="admin-ui-field">
            <span>Phone</span>
            <input
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
            />
          </label>

          <label className="admin-ui-field">
            <span>WhatsApp URL</span>
            <input
              type="url"
              name="whatsappUrl"
              value={form.whatsappUrl || ""}
              onChange={handleChange}
              placeholder="https://wa.me/91..."
            />
          </label>

          <label className="admin-ui-field">
            <span>GitHub URL</span>
            <input
              type="url"
              name="githubUrl"
              value={form.githubUrl || ""}
              onChange={handleChange}
            />
          </label>

          <label className="admin-ui-field">
            <span>LinkedIn URL</span>
            <input
              type="url"
              name="linkedinUrl"
              value={form.linkedinUrl || ""}
              onChange={handleChange}
            />
          </label>

          <label className="admin-ui-field">
            <span>Profile image URL</span>
            <input
              type="url"
              name="profileImageUrl"
              value={form.profileImageUrl || ""}
              onChange={handleChange}
            />
          </label>

          <label className="admin-ui-field">
            <span>Resume URL</span>
            <input
              type="url"
              name="resumeUrl"
              value={form.resumeUrl || ""}
              onChange={handleChange}
            />
          </label>

          <label className="admin-ui-field admin-ui-field-full">
            <span>Availability text</span>
            <input
              name="availabilityText"
              value={form.availabilityText || ""}
              onChange={handleChange}
              placeholder="Available for opportunities"
            />
          </label>

          <label className="admin-ui-check admin-ui-field-full">
            <input
              type="checkbox"
              name="availableForWork"
              checked={Boolean(form.availableForWork)}
              onChange={handleChange}
            />
            Available for work
          </label>
        </div>

        <div className="admin-ui-actions admin-profile-actions">
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
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminProfile;
