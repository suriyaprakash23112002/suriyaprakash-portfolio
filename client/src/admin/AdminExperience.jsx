import { useEffect, useMemo, useState } from "react";
import {
  FiBriefcase,
  FiCalendar,
  FiEdit2,
  FiMapPin,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiSearch,
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
  company: "",
  role: "",
  employmentType: "FULL_TIME",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  summary: "",
  displayOrder: 0,
  isVisible: true,
};

const dateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};

function AdminExperience() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadItems = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/experience/admin/all");
      setItems(response?.data?.experiences || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load experience.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filteredItems = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return items;

    return items.filter((item) =>
      `${item.role || ""} ${item.company || ""} ${item.location || ""} ${item.employmentType || ""}`
        .toLowerCase()
        .includes(value)
    );
  }, [items, search]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({
      company: item.company || "",
      role: item.role || "",
      employmentType: item.employmentType || "FULL_TIME",
      location: item.location || "",
      startDate: dateInput(item.startDate),
      endDate: dateInput(item.endDate),
      isCurrent: Boolean(item.isCurrent),
      summary: item.summary || "",
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
      ...(name === "isCurrent" && checked ? { endDate: "" } : {}),
    }));
  };

  const save = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...form,
        endDate: form.isCurrent ? null : form.endDate || null,
        displayOrder: Number(form.displayOrder || 0),
      };

      if (editingId) await api.put(`/experience/${editingId}`, payload);
      else await api.post("/experience", payload);

      setMessage(editingId ? "Experience updated." : "Experience created.");
      setModalOpen(false);
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to save experience.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item.role}" at "${item.company}"?`)) return;

    try {
      await api.delete(`/experience/${item.id}`);
      setMessage("Experience deleted.");
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to delete experience.");
    }
  };

  if (loading) return <AdminLoader label="Loading experience..." />;

  return (
    <div className="admin-ui-page">
      <AdminPageHeader
        eyebrow="PORTFOLIO CONTENT"
        title="Experience"
        description="Manage professional roles, companies and employment history."
        actions={
          <>
            <button className="admin-ui-button" type="button" onClick={loadItems}>
              <FiRefreshCw />
              Refresh
            </button>

            <button
              className="admin-ui-button admin-ui-button-primary"
              type="button"
              onClick={openCreate}
            >
              <FiPlus />
              Add Experience
            </button>
          </>
        }
      />

      <AdminAlert type="error">{error}</AdminAlert>
      <AdminAlert type="success">{message}</AdminAlert>

      <div className="admin-ui-stats">
        <div className="admin-ui-stat">
          <span>TOTAL</span>
          <strong>{items.length}</strong>
          <small>All experience</small>
        </div>

        <div className="admin-ui-stat">
          <span>CURRENT</span>
          <strong>{items.filter((item) => item.isCurrent).length}</strong>
          <small>Current roles</small>
        </div>

        <div className="admin-ui-stat">
          <span>VISIBLE</span>
          <strong>{items.filter((item) => item.isVisible).length}</strong>
          <small>Shown publicly</small>
        </div>

        <div className="admin-ui-stat">
          <span>HIDDEN</span>
          <strong>{items.filter((item) => !item.isVisible).length}</strong>
          <small>Hidden records</small>
        </div>
      </div>

      <section className="admin-ui-panel">
        <div className="admin-ui-section-title">
          <div>
            <span>EXPERIENCE LIBRARY</span>
            <h2>All experience</h2>
          </div>

          <label className="admin-ui-search">
            <FiSearch />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search experience..."
            />
          </label>
        </div>

        {filteredItems.length === 0 ? (
          <AdminEmptyState
            icon={<FiBriefcase />}
            title={search ? "No experience found" : "No experience records"}
            description={
              search
                ? "Try another search term."
                : "Add your professional experience to display it on the portfolio."
            }
          />
        ) : (
          <div className="admin-ui-list">
            {filteredItems.map((item) => (
              <article className="admin-ui-list-card admin-ui-card" key={item.id}>
                <div className="admin-ui-list-icon">
                  <FiBriefcase />
                </div>

                <div className="admin-ui-list-content">
                  <span>{item.isCurrent ? "CURRENT ROLE" : item.employmentType}</span>
                  <h3>{item.role}</h3>
                  <h4>{item.company}</h4>

                  <div className="admin-ui-meta">
                    {item.location && (
                      <span>
                        <FiMapPin />
                        {item.location}
                      </span>
                    )}

                    <span>
                      <FiCalendar />
                      {dateInput(item.startDate)} —{" "}
                      {item.isCurrent ? "Present" : dateInput(item.endDate) || "End"}
                    </span>

                    <span
                      className={`admin-ui-badge ${
                        item.isVisible
                          ? "admin-ui-badge-success"
                          : "admin-ui-badge-muted"
                      }`}
                    >
                      {item.isVisible ? "Visible" : "Hidden"}
                    </span>
                  </div>

                  {item.summary && <p>{item.summary}</p>}
                </div>

                <div className="admin-ui-actions">
                  <button
                    className="admin-ui-icon-button"
                    type="button"
                    onClick={() => openEdit(item)}
                    aria-label="Edit experience"
                  >
                    <FiEdit2 />
                  </button>

                  <button
                    className="admin-ui-icon-button admin-ui-button-danger"
                    type="button"
                    onClick={() => remove(item)}
                    aria-label="Delete experience"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        eyebrow="EXPERIENCE EDITOR"
        title={editingId ? "Edit Experience" : "Add Experience"}
        footer={
          <>
            <button
              className="admin-ui-button"
              type="button"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>

            <button
              className="admin-ui-button admin-ui-button-primary"
              type="submit"
              form="experience-form"
              disabled={saving}
            >
              {saving ? <AdminSaving /> : <><FiSave />Save Experience</>}
            </button>
          </>
        }
      >
        <form id="experience-form" onSubmit={save}>
          <div className="admin-ui-form-grid">
            <label className="admin-ui-field">
              <span>Company</span>
              <input name="company" value={form.company} onChange={change} required />
            </label>

            <label className="admin-ui-field">
              <span>Role</span>
              <input name="role" value={form.role} onChange={change} required />
            </label>

            <label className="admin-ui-field">
              <span>Employment type</span>
              <select name="employmentType" value={form.employmentType} onChange={change}>
                <option value="TRAINEE">Trainee</option>
                <option value="INTERNSHIP">Internship</option>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="FREELANCE">Freelance</option>
              </select>
            </label>

            <label className="admin-ui-field">
              <span>Location</span>
              <input name="location" value={form.location} onChange={change} />
            </label>

            <label className="admin-ui-field">
              <span>Start date</span>
              <input name="startDate" type="date" value={form.startDate} onChange={change} required />
            </label>

            <label className="admin-ui-field">
              <span>End date</span>
              <input name="endDate" type="date" value={form.endDate} onChange={change} disabled={form.isCurrent} />
            </label>

            <label className="admin-ui-field">
              <span>Display order</span>
              <input name="displayOrder" type="number" value={form.displayOrder} onChange={change} />
            </label>

            <label className="admin-ui-check">
              <input name="isCurrent" type="checkbox" checked={form.isCurrent} onChange={change} />
              Current role
            </label>

            <label className="admin-ui-field admin-ui-field-full">
              <span>Summary</span>
              <textarea name="summary" value={form.summary} onChange={change} />
            </label>

            <label className="admin-ui-check admin-ui-field-full">
              <input name="isVisible" type="checkbox" checked={form.isVisible} onChange={change} />
              Visible on portfolio
            </label>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

export default AdminExperience;
