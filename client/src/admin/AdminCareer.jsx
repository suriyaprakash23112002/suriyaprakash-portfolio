import { useEffect, useState } from "react";
import {
  FiActivity,
  FiCalendar,
  FiEdit2,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiTrash2,
} from "react-icons/fi";

import api from "../services/api";
import {
  AdminAlert,
  AdminEmptyState,
  AdminLoader,
  AdminModal,
  AdminPageHeader,
  AdminSaving,
} from "./AdminUI";

const emptyForm = {
  title: "",
  organization: "",
  description: "",
  eventType: "ROLE",
  startDate: "",
  endDate: "",
  icon: "",
  displayOrder: 0,
  isVisible: true,
};

const dateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
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
      const response = await api.get("/career/admin/all");
      setItems(response?.data?.career || []);
    } catch (err) {
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
      title: item.title || "",
      organization: item.organization || "",
      description: item.description || "",
      eventType: item.eventType || "ROLE",
      startDate: dateInput(item.startDate),
      endDate: dateInput(item.endDate),
      icon: item.icon || "",
      displayOrder: item.displayOrder ?? 0,
      isVisible: item.isVisible !== false,
    });
    setModalOpen(true);
  };

  const change = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const save = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      setError("");
      const payload = {
        ...form,
        endDate: form.endDate || null,
        displayOrder: Number(form.displayOrder || 0),
      };

      if (editingId) await api.put(`/career/${editingId}`, payload);
      else await api.post("/career", payload);

      setMessage(editingId ? "Career event updated." : "Career event created.");
      setModalOpen(false);
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to save career event.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try {
      await api.delete(`/career/${item.id}`);
      setMessage("Career event deleted.");
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to delete career event.");
    }
  };

  if (loading) return <AdminLoader label="Loading career journey..." />;

  return (
    <div className="admin-ui-page">
      <AdminPageHeader
        eyebrow="PORTFOLIO CONTENT"
        title="Career Journey"
        description="Manage the milestones that describe your professional growth."
        actions={
          <>
            <button className="admin-ui-button" type="button" onClick={loadItems}><FiRefreshCw />Refresh</button>
            <button className="admin-ui-button admin-ui-button-primary" type="button" onClick={openCreate}><FiPlus />Add Milestone</button>
          </>
        }
      />

      <AdminAlert type="error">{error}</AdminAlert>
      <AdminAlert type="success">{message}</AdminAlert>

      {items.length === 0 ? (
        <AdminEmptyState
          icon={<FiActivity />}
          title="No career milestones"
          description="Add milestones to build your career timeline."
        />
      ) : (
        <div className="admin-ui-list">
          {items.map((item) => (
            <article className="admin-ui-list-card admin-ui-card" key={item.id}>
              <div className="admin-ui-list-icon"><FiActivity /></div>
              <div className="admin-ui-list-content">
                <span>{item.eventType}</span>
                <h3>{item.title}</h3>
                {item.organization && <h4>{item.organization}</h4>}
                <div className="admin-ui-meta">
                  <span><FiCalendar />{dateInput(item.startDate)}{item.endDate ? ` — ${dateInput(item.endDate)}` : ""}</span>
                  <span className={`admin-ui-badge ${item.isVisible ? "admin-ui-badge-success" : "admin-ui-badge-muted"}`}>{item.isVisible ? "Visible" : "Hidden"}</span>
                </div>
                {item.description && <p>{item.description}</p>}
              </div>
              <div className="admin-ui-actions">
                <button className="admin-ui-icon-button" type="button" onClick={() => openEdit(item)}><FiEdit2 /></button>
                <button className="admin-ui-icon-button admin-ui-button-danger" type="button" onClick={() => remove(item)}><FiTrash2 /></button>
              </div>
            </article>
          ))}
        </div>
      )}

      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        eyebrow="CAREER EDITOR"
        title={editingId ? "Edit Milestone" : "Add Milestone"}
        footer={
          <>
            <button className="admin-ui-button" type="button" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="admin-ui-button admin-ui-button-primary" type="submit" form="career-form" disabled={saving}>{saving ? <AdminSaving /> : <><FiSave />Save Milestone</>}</button>
          </>
        }
      >
        <form id="career-form" onSubmit={save}>
          <div className="admin-ui-form-grid">
            <label className="admin-ui-field admin-ui-field-full"><span>Title</span><input name="title" value={form.title} onChange={change} required /></label>
            <label className="admin-ui-field admin-ui-field-full"><span>Organization</span><input name="organization" value={form.organization} onChange={change} /></label>
            <label className="admin-ui-field">
              <span>Event type</span>
              <select name="eventType" value={form.eventType} onChange={change}>
                <option value="ROLE">Role</option>
                <option value="PROMOTION">Promotion</option>
                <option value="PROJECT">Project</option>
                <option value="MILESTONE">Milestone</option>
              </select>
            </label>
            <label className="admin-ui-field"><span>Icon key</span><input name="icon" value={form.icon} onChange={change} /></label>
            <label className="admin-ui-field"><span>Start date</span><input name="startDate" type="date" value={form.startDate} onChange={change} required /></label>
            <label className="admin-ui-field"><span>End date</span><input name="endDate" type="date" value={form.endDate} onChange={change} /></label>
            <label className="admin-ui-field"><span>Display order</span><input name="displayOrder" type="number" value={form.displayOrder} onChange={change} /></label>
            <label className="admin-ui-check"><input name="isVisible" type="checkbox" checked={form.isVisible} onChange={change} />Visible on portfolio</label>
            <label className="admin-ui-field admin-ui-field-full"><span>Description</span><textarea name="description" value={form.description} onChange={change} /></label>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

export default AdminCareer;
