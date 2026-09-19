import { useEffect, useState } from "react";
import {
  FiBriefcase,
  FiCalendar,
  FiEdit2,
  FiMapPin,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import api from "../services/api";
import "./AdminExperience.css";

const emptyForm = {
  company: "",
  role: "",
  employmentType: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
  isActive: true,
  order: 0,
};

const getList = (response) => {
  const data = response?.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.experiences)) return data.experiences;
  if (Array.isArray(data?.data?.experiences)) return data.data.experiences;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const dateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toISOString().slice(0, 10);
};

function AdminExperience() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadItems = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/experience");
      setItems(getList(response));
    } catch (err) {
      console.error("Experience load error:", err);
      setError(err?.response?.data?.message || "Unable to load experience.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({
      company: item?.company || item?.companyName || "",
      role: item?.role || item?.position || item?.title || "",
      employmentType: item?.employmentType || item?.type || "",
      location: item?.location || "",
      startDate: dateInput(item?.startDate),
      endDate: dateInput(item?.endDate),
      isCurrent: item?.isCurrent === true || item?.currentlyWorking === true,
      description: item?.description || item?.summary || "",
      isActive: item?.isActive !== false,
      order: item?.order ?? 0,
    });
    setModalOpen(true);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "isCurrent" && checked ? { endDate: "" } : {}),
    }));
  };

  const saveItem = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const payload = {
        ...form,
        endDate: form.isCurrent ? null : form.endDate || null,
        order: Number(form.order || 0),
      };

      if (editingId) {
        await api.put(`/experience/${editingId}`, payload);
      } else {
        await api.post("/experience", payload);
      }

      setMessage(
        editingId
          ? "Experience updated successfully."
          : "Experience created successfully."
      );
      setModalOpen(false);
      await loadItems();
    } catch (err) {
      console.error("Experience save error:", err);
      setError(err?.response?.data?.message || "Unable to save experience.");
    } finally {
      setSaving(false);
    }
  };

  const removeItem = async (item) => {
    if (!window.confirm(`Delete "${item.role || item.position}"?`)) return;

    try {
      await api.delete(`/experience/${item.id}`);
      setMessage("Experience deleted successfully.");
      await loadItems();
    } catch (err) {
      console.error("Experience delete error:", err);
      setError(err?.response?.data?.message || "Unable to delete experience.");
    }
  };

  return (
    <div className="admin-experience">
      <div className="admin-experience-header">
        <div>
          <span>PORTFOLIO CONTENT</span>
          <h1>Experience</h1>
          <p>Manage your professional roles, companies and work history.</p>
        </div>

        <div className="admin-experience-actions">
          <button type="button" onClick={loadItems}>
            <FiRefreshCw />
            Refresh
          </button>
          <button type="button" className="primary" onClick={openCreate}>
            <FiPlus />
            Add Experience
          </button>
        </div>
      </div>

      {error && <div className="admin-experience-alert error">{error}</div>}
      {message && <div className="admin-experience-alert success">{message}</div>}

      {loading ? (
        <div className="admin-experience-loading">
          <FiRefreshCw />
          Loading experience...
        </div>
      ) : (
        <div className="admin-experience-list">
          {items.map((item, index) => (
            <article className="admin-experience-card" key={item.id}>
              <div className="admin-experience-index">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="admin-experience-icon">
                <FiBriefcase />
              </div>

              <div className="admin-experience-content">
                <span>{item?.isCurrent ? "CURRENT ROLE" : "EXPERIENCE"}</span>
                <h2>{item?.role || item?.position || item?.title}</h2>
                <h3>{item?.company || item?.companyName}</h3>

                <div className="admin-experience-meta">
                  {item?.location && (
                    <span>
                      <FiMapPin />
                      {item.location}
                    </span>
                  )}

                  <span>
                    <FiCalendar />
                    {dateInput(item?.startDate) || "Start"}
                    {" — "}
                    {item?.isCurrent ? "Present" : dateInput(item?.endDate) || "End"}
                  </span>
                </div>

                <p>{item?.description || item?.summary || "No description added."}</p>
              </div>

              <div className="admin-experience-card-actions">
                <button type="button" onClick={() => openEdit(item)}>
                  <FiEdit2 />
                </button>
                <button type="button" onClick={() => removeItem(item)}>
                  <FiTrash2 />
                </button>
              </div>
            </article>
          ))}

          {items.length === 0 && (
            <div className="admin-experience-empty">
              No experience records yet.
            </div>
          )}
        </div>
      )}

      {modalOpen && (
        <div className="admin-experience-modal-backdrop">
          <form className="admin-experience-modal" onSubmit={saveItem}>
            <div className="admin-experience-modal-header">
              <div>
                <span>EXPERIENCE EDITOR</span>
                <h2>{editingId ? "Edit Experience" : "Add Experience"}</h2>
              </div>

              <button type="button" onClick={() => setModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <div className="admin-experience-form-grid">
              <label>
                Company
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Role
                <input
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Employment type
                <input
                  name="employmentType"
                  value={form.employmentType}
                  onChange={handleChange}
                  placeholder="Full Time / Trainee / Internship"
                />
              </label>

              <label>
                Location
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                />
              </label>

              <label>
                Start date
                <input
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={handleChange}
                />
              </label>

              <label>
                End date
                <input
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={handleChange}
                  disabled={form.isCurrent}
                />
              </label>

              <label className="admin-experience-check">
                <input
                  name="isCurrent"
                  type="checkbox"
                  checked={form.isCurrent}
                  onChange={handleChange}
                />
                Current role
              </label>

              <label>
                Order
                <input
                  name="order"
                  type="number"
                  value={form.order}
                  onChange={handleChange}
                />
              </label>

              <label className="full">
                Description
                <textarea
                  name="description"
                  rows="6"
                  value={form.description}
                  onChange={handleChange}
                />
              </label>

              <label className="admin-experience-check full">
                <input
                  name="isActive"
                  type="checkbox"
                  checked={form.isActive}
                  onChange={handleChange}
                />
                Active on portfolio
              </label>
            </div>

            <div className="admin-experience-modal-actions">
              <button type="button" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="primary" disabled={saving}>
                <FiSave />
                {saving ? "Saving..." : "Save Experience"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminExperience;
