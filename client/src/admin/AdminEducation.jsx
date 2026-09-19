import { useEffect, useState } from "react";
import {
  FiBookOpen,
  FiEdit2,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import api from "../services/api";
import "./AdminEducation.css";

const emptyForm = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  location: "",
  startDate: "",
  endDate: "",
  grade: "",
  description: "",
  isActive: true,
  order: 0,
};

const getList = (response) => {
  const data = response?.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.education)) return data.education;
  if (Array.isArray(data?.data?.education)) return data.data.education;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const dateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toISOString().slice(0, 10);
};

function AdminEducation() {
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
      const response = await api.get("/education");
      setItems(getList(response));
    } catch (err) {
      console.error("Education load error:", err);
      setError(err?.response?.data?.message || "Unable to load education.");
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
      institution:
        item?.institution ||
        item?.institutionName ||
        item?.college ||
        item?.university ||
        "",
      degree: item?.degree || item?.qualification || item?.course || "",
      fieldOfStudy: item?.fieldOfStudy || item?.specialization || "",
      location: item?.location || "",
      startDate: dateInput(item?.startDate),
      endDate: dateInput(item?.endDate),
      grade: item?.grade || item?.cgpa || item?.percentage || "",
      description: item?.description || "",
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
        order: Number(form.order || 0),
        endDate: form.endDate || null,
      };

      if (editingId) {
        await api.put(`/education/${editingId}`, payload);
      } else {
        await api.post("/education", payload);
      }

      setMessage(
        editingId
          ? "Education updated successfully."
          : "Education created successfully."
      );
      setModalOpen(false);
      await loadItems();
    } catch (err) {
      console.error("Education save error:", err);
      setError(err?.response?.data?.message || "Unable to save education.");
    } finally {
      setSaving(false);
    }
  };

  const removeItem = async (item) => {
    if (!window.confirm(`Delete "${item.degree || item.qualification}"?`)) return;

    try {
      await api.delete(`/education/${item.id}`);
      setMessage("Education deleted successfully.");
      await loadItems();
    } catch (err) {
      console.error("Education delete error:", err);
      setError(err?.response?.data?.message || "Unable to delete education.");
    }
  };

  return (
    <div className="admin-education">
      <div className="admin-education-header">
        <div>
          <span>PORTFOLIO CONTENT</span>
          <h1>Education</h1>
          <p>Manage qualifications, institutions and academic records.</p>
        </div>

        <div className="admin-education-actions">
          <button type="button" onClick={loadItems}>
            <FiRefreshCw />
            Refresh
          </button>
          <button type="button" className="primary" onClick={openCreate}>
            <FiPlus />
            Add Education
          </button>
        </div>
      </div>

      {error && <div className="admin-education-alert error">{error}</div>}
      {message && <div className="admin-education-alert success">{message}</div>}

      {loading ? (
        <div className="admin-education-loading">Loading education...</div>
      ) : (
        <div className="admin-education-grid">
          {items.map((item, index) => (
            <article className="admin-education-card" key={item.id}>
              <div className="admin-education-card-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className="admin-education-icon">
                  <FiBookOpen />
                </div>
                <div className="admin-education-card-actions">
                  <button type="button" onClick={() => openEdit(item)}>
                    <FiEdit2 />
                  </button>
                  <button type="button" onClick={() => removeItem(item)}>
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              <span className="admin-education-label">QUALIFICATION</span>
              <h2>{item?.degree || item?.qualification || item?.course}</h2>
              <h3>
                {item?.institution ||
                  item?.institutionName ||
                  item?.college ||
                  item?.university}
              </h3>

              {item?.fieldOfStudy && <p className="field">{item.fieldOfStudy}</p>}

              <p>{item?.description || "No description added."}</p>

              <div className="admin-education-meta">
                <span>
                  {dateInput(item?.startDate) || "Start"} —{" "}
                  {dateInput(item?.endDate) || "End"}
                </span>
                {(item?.grade || item?.cgpa || item?.percentage) && (
                  <span>{item?.grade || item?.cgpa || item?.percentage}</span>
                )}
              </div>
            </article>
          ))}

          {items.length === 0 && (
            <div className="admin-education-empty">No education records yet.</div>
          )}
        </div>
      )}

      {modalOpen && (
        <div className="admin-education-modal-backdrop">
          <form className="admin-education-modal" onSubmit={saveItem}>
            <div className="admin-education-modal-header">
              <div>
                <span>EDUCATION EDITOR</span>
                <h2>{editingId ? "Edit Education" : "Add Education"}</h2>
              </div>
              <button type="button" onClick={() => setModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <div className="admin-education-form-grid">
              <label className="full">
                Institution
                <input
                  name="institution"
                  value={form.institution}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Degree
                <input name="degree" value={form.degree} onChange={handleChange} required />
              </label>

              <label>
                Field of study
                <input
                  name="fieldOfStudy"
                  value={form.fieldOfStudy}
                  onChange={handleChange}
                />
              </label>

              <label>
                Location
                <input name="location" value={form.location} onChange={handleChange} />
              </label>

              <label>
                Grade / CGPA / %
                <input name="grade" value={form.grade} onChange={handleChange} />
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
                />
              </label>

              <label>
                Order
                <input name="order" type="number" value={form.order} onChange={handleChange} />
              </label>

              <label className="admin-education-check">
                <input
                  name="isActive"
                  type="checkbox"
                  checked={form.isActive}
                  onChange={handleChange}
                />
                Active
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
            </div>

            <div className="admin-education-modal-actions">
              <button type="button" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="primary" disabled={saving}>
                <FiSave />
                {saving ? "Saving..." : "Save Education"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminEducation;
