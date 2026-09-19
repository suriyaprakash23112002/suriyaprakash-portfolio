import { useEffect, useState } from "react";
import {
  FiActivity,
  FiEdit2,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import api from "../services/api";
import "./AdminCareer.css";

const emptyForm = {
  title: "",
  subtitle: "",
  description: "",
  eventType: "",
  date: "",
  order: 0,
  isActive: true,
};

const getList = (response) => {
  const data = response?.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.career)) return data.career;
  if (Array.isArray(data?.careerJourney)) return data.careerJourney;
  if (Array.isArray(data?.data?.career)) return data.data.career;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const dateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toISOString().slice(0, 10);
};

function AdminCareer() {
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
      const response = await api.get("/career");
      setItems(getList(response));
    } catch (err) {
      console.error("Career load error:", err);
      setError(err?.response?.data?.message || "Unable to load career journey.");
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
      title: item?.title || "",
      subtitle: item?.subtitle || "",
      description: item?.description || "",
      eventType: item?.eventType || item?.type || "",
      date: dateInput(item?.date || item?.eventDate),
      order: item?.order ?? 0,
      isActive: item?.isActive !== false,
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
      };

      if (editingId) {
        await api.put(`/career/${editingId}`, payload);
      } else {
        await api.post("/career", payload);
      }

      setMessage(
        editingId
          ? "Career event updated successfully."
          : "Career event created successfully."
      );
      setModalOpen(false);
      await loadItems();
    } catch (err) {
      console.error("Career save error:", err);
      setError(err?.response?.data?.message || "Unable to save career event.");
    } finally {
      setSaving(false);
    }
  };

  const removeItem = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;

    try {
      await api.delete(`/career/${item.id}`);
      setMessage("Career event deleted successfully.");
      await loadItems();
    } catch (err) {
      console.error("Career delete error:", err);
      setError(err?.response?.data?.message || "Unable to delete career event.");
    }
  };

  return (
    <div className="admin-career">
      <div className="admin-career-header">
        <div>
          <span>PORTFOLIO CONTENT</span>
          <h1>Career Journey</h1>
          <p>Manage milestones that describe your growth as a developer.</p>
        </div>

        <div className="admin-career-actions">
          <button type="button" onClick={loadItems}>
            <FiRefreshCw />
            Refresh
          </button>
          <button type="button" className="primary" onClick={openCreate}>
            <FiPlus />
            Add Milestone
          </button>
        </div>
      </div>

      {error && <div className="admin-career-alert error">{error}</div>}
      {message && <div className="admin-career-alert success">{message}</div>}

      {loading ? (
        <div className="admin-career-loading">Loading career journey...</div>
      ) : (
        <div className="admin-career-timeline">
          {items.map((item, index) => (
            <article className="admin-career-item" key={item.id}>
              <div className="admin-career-line">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i />
              </div>

              <div className="admin-career-icon">
                <FiActivity />
              </div>

              <div className="admin-career-content">
                <span>{item?.eventType || item?.type || "MILESTONE"}</span>
                <h2>{item?.title}</h2>
                {item?.subtitle && <h3>{item.subtitle}</h3>}
                <p>{item?.description || "No description added."}</p>
                <small>{dateInput(item?.date || item?.eventDate) || "No date"}</small>
              </div>

              <div className="admin-career-card-actions">
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
            <div className="admin-career-empty">No career milestones yet.</div>
          )}
        </div>
      )}

      {modalOpen && (
        <div className="admin-career-modal-backdrop">
          <form className="admin-career-modal" onSubmit={saveItem}>
            <div className="admin-career-modal-header">
              <div>
                <span>CAREER EDITOR</span>
                <h2>{editingId ? "Edit Milestone" : "Add Milestone"}</h2>
              </div>
              <button type="button" onClick={() => setModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <div className="admin-career-form-grid">
              <label className="full">
                Title
                <input name="title" value={form.title} onChange={handleChange} required />
              </label>

              <label className="full">
                Subtitle
                <input name="subtitle" value={form.subtitle} onChange={handleChange} />
              </label>

              <label>
                Event type
                <input
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                  placeholder="WORK / EDUCATION / PROJECT"
                />
              </label>

              <label>
                Date
                <input name="date" type="date" value={form.date} onChange={handleChange} />
              </label>

              <label>
                Order
                <input name="order" type="number" value={form.order} onChange={handleChange} />
              </label>

              <label className="admin-career-check">
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

            <div className="admin-career-modal-actions">
              <button type="button" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="primary" disabled={saving}>
                <FiSave />
                {saving ? "Saving..." : "Save Milestone"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminCareer;
