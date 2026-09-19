import { useEffect, useState } from "react";
import {
  FiBookOpen,
  FiEdit2,
  FiMapPin,
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
  degree: "",
  fieldOfStudy: "",
  institution: "",
  location: "",
  startYear: "",
  endYear: "",
  isCurrent: false,
  grade: "",
  description: "",
  displayOrder: 0,
  isVisible: true,
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
      const response = await api.get("/education/admin/all");
      setItems(response?.data?.education || []);
    } catch (err) {
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
      degree: item.degree || "",
      fieldOfStudy: item.fieldOfStudy || "",
      institution: item.institution || "",
      location: item.location || "",
      startYear: item.startYear ?? "",
      endYear: item.endYear ?? "",
      isCurrent: Boolean(item.isCurrent),
      grade: item.grade || "",
      description: item.description || "",
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
      ...(name === "isCurrent" && checked ? { endYear: "" } : {}),
    }));
  };

  const save = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...form,
        startYear: form.startYear === "" ? null : Number(form.startYear),
        endYear: form.isCurrent || form.endYear === "" ? null : Number(form.endYear),
        displayOrder: Number(form.displayOrder || 0),
      };

      if (editingId) await api.put(`/education/${editingId}`, payload);
      else await api.post("/education", payload);

      setMessage(editingId ? "Education updated." : "Education created.");
      setModalOpen(false);
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to save education.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item.degree}"?`)) return;
    try {
      await api.delete(`/education/${item.id}`);
      setMessage("Education deleted.");
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to delete education.");
    }
  };

  if (loading) return <AdminLoader label="Loading education..." />;

  return (
    <div className="admin-ui-page">
      <AdminPageHeader
        eyebrow="PORTFOLIO CONTENT"
        title="Education"
        description="Manage qualifications, institutions and academic results."
        actions={
          <>
            <button className="admin-ui-button" type="button" onClick={loadItems}><FiRefreshCw />Refresh</button>
            <button className="admin-ui-button admin-ui-button-primary" type="button" onClick={openCreate}><FiPlus />Add Education</button>
          </>
        }
      />

      <AdminAlert type="error">{error}</AdminAlert>
      <AdminAlert type="success">{message}</AdminAlert>

      {items.length === 0 ? (
        <AdminEmptyState
          icon={<FiBookOpen />}
          title="No education records"
          description="Add your academic qualifications."
        />
      ) : (
        <div className="admin-ui-list">
          {items.map((item) => (
            <article className="admin-ui-list-card admin-ui-card" key={item.id}>
              <div className="admin-ui-list-icon"><FiBookOpen /></div>
              <div className="admin-ui-list-content">
                <span>QUALIFICATION</span>
                <h3>{item.degree}</h3>
                <h4>{item.institution}</h4>
                <div className="admin-ui-meta">
                  {item.location && <span><FiMapPin />{item.location}</span>}
                  <span>{item.startYear || "—"} — {item.isCurrent ? "Present" : item.endYear || "—"}</span>
                  {item.grade && <span>{item.grade}</span>}
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
        eyebrow="EDUCATION EDITOR"
        title={editingId ? "Edit Education" : "Add Education"}
        footer={
          <>
            <button className="admin-ui-button" type="button" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="admin-ui-button admin-ui-button-primary" type="submit" form="education-form" disabled={saving}>{saving ? <AdminSaving /> : <><FiSave />Save Education</>}</button>
          </>
        }
      >
        <form id="education-form" onSubmit={save}>
          <div className="admin-ui-form-grid">
            <label className="admin-ui-field"><span>Degree</span><input name="degree" value={form.degree} onChange={change} required /></label>
            <label className="admin-ui-field"><span>Field of study</span><input name="fieldOfStudy" value={form.fieldOfStudy} onChange={change} /></label>
            <label className="admin-ui-field admin-ui-field-full"><span>Institution</span><input name="institution" value={form.institution} onChange={change} required /></label>
            <label className="admin-ui-field"><span>Location</span><input name="location" value={form.location} onChange={change} /></label>
            <label className="admin-ui-field"><span>Grade / CGPA</span><input name="grade" value={form.grade} onChange={change} /></label>
            <label className="admin-ui-field"><span>Start year</span><input name="startYear" type="number" value={form.startYear} onChange={change} /></label>
            <label className="admin-ui-field"><span>End year</span><input name="endYear" type="number" value={form.endYear} onChange={change} disabled={form.isCurrent} /></label>
            <label className="admin-ui-field"><span>Display order</span><input name="displayOrder" type="number" value={form.displayOrder} onChange={change} /></label>
            <label className="admin-ui-check"><input name="isCurrent" type="checkbox" checked={form.isCurrent} onChange={change} />Currently studying</label>
            <label className="admin-ui-field admin-ui-field-full"><span>Description</span><textarea name="description" value={form.description} onChange={change} /></label>
            <label className="admin-ui-check admin-ui-field-full"><input name="isVisible" type="checkbox" checked={form.isVisible} onChange={change} />Visible on portfolio</label>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

export default AdminEducation;
