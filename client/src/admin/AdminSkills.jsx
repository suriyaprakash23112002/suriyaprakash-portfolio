import { useEffect, useMemo, useState } from "react";
import {
  FiCode,
  FiEdit2,
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

const emptyCategory = {
  name: "",
  description: "",
  displayOrder: 0,
  isActive: true,
};

const emptySkill = {
  name: "",
  categoryId: "",
  icon: "",
  proficiency: "",
  yearsExperience: "",
  isFeatured: false,
  isActive: true,
  displayOrder: 0,
};

function AdminSkills() {
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryForm, setCategoryForm] = useState(emptyCategory);
  const [skillForm, setSkillForm] = useState(emptySkill);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [skillOpen, setSkillOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [categoryResponse, skillResponse] = await Promise.all([
        api.get("/skill-categories/admin/all"),
        api.get("/skills/admin/all"),
      ]);

      setCategories(categoryResponse?.data?.categories || []);
      setSkills(skillResponse?.data?.skills || []);
    } catch (err) {
      console.error("Skills load error:", err);
      setError(err?.response?.data?.message || "Unable to load skills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredSkills = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return skills;

    return skills.filter((skill) =>
      `${skill.name} ${skill?.category?.name || ""}`
        .toLowerCase()
        .includes(value)
    );
  }, [skills, search]);

  const openCategoryCreate = () => {
    setEditingCategoryId(null);
    setCategoryForm(emptyCategory);
    setCategoryOpen(true);
  };

  const openCategoryEdit = (category) => {
    setEditingCategoryId(category.id);
    setCategoryForm({
      name: category.name || "",
      description: category.description || "",
      displayOrder: category.displayOrder ?? 0,
      isActive: category.isActive !== false,
    });
    setCategoryOpen(true);
  };

  const openSkillCreate = () => {
    setEditingSkillId(null);
    setSkillForm({
      ...emptySkill,
      categoryId: categories[0]?.id || "",
    });
    setSkillOpen(true);
  };

  const openSkillEdit = (skill) => {
    setEditingSkillId(skill.id);
    setSkillForm({
      name: skill.name || "",
      categoryId: skill.categoryId || skill?.category?.id || "",
      icon: skill.icon || "",
      proficiency: skill.proficiency ?? "",
      yearsExperience: skill.yearsExperience ?? "",
      isFeatured: Boolean(skill.isFeatured),
      isActive: skill.isActive !== false,
      displayOrder: skill.displayOrder ?? 0,
    });
    setSkillOpen(true);
  };

  const saveCategory = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      if (editingCategoryId) {
        await api.put(`/skill-categories/${editingCategoryId}`, categoryForm);
      } else {
        await api.post("/skill-categories", categoryForm);
      }

      setMessage(editingCategoryId ? "Category updated." : "Category created.");
      setCategoryOpen(false);
      await loadData();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to save category.");
    } finally {
      setSaving(false);
    }
  };

  const saveSkill = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const payload = {
        ...skillForm,
        proficiency:
          skillForm.proficiency === "" ? null : Number(skillForm.proficiency),
        yearsExperience:
          skillForm.yearsExperience === ""
            ? null
            : Number(skillForm.yearsExperience),
        displayOrder: Number(skillForm.displayOrder || 0),
      };

      if (editingSkillId) {
        await api.put(`/skills/${editingSkillId}`, payload);
      } else {
        await api.post("/skills", payload);
      }

      setMessage(editingSkillId ? "Technology updated." : "Technology created.");
      setSkillOpen(false);
      await loadData();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to save technology.");
    } finally {
      setSaving(false);
    }
  };

  const removeCategory = async (category) => {
    if (!window.confirm(`Delete "${category.name}" category?`)) return;

    try {
      setError("");
      await api.delete(`/skill-categories/${category.id}`);
      setMessage("Category deleted.");
      await loadData();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to delete category.");
    }
  };

  const removeSkill = async (skill) => {
    if (!window.confirm(`Delete "${skill.name}"?`)) return;

    try {
      setError("");
      await api.delete(`/skills/${skill.id}`);
      setMessage("Technology deleted.");
      await loadData();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to delete technology.");
    }
  };

  if (loading) {
    return <AdminLoader label="Loading skills..." />;
  }

  return (
    <div className="admin-ui-page">
      <AdminPageHeader
        eyebrow="PORTFOLIO CONTENT"
        title="Skills & Technologies"
        description="Manage technology categories, proficiency and the stack shown publicly."
        actions={
          <>
            <button className="admin-ui-button" type="button" onClick={loadData}>
              <FiRefreshCw /> Refresh
            </button>
            <button className="admin-ui-button" type="button" onClick={openCategoryCreate}>
              <FiPlus /> Category
            </button>
            <button
              className="admin-ui-button admin-ui-button-primary"
              type="button"
              onClick={openSkillCreate}
              disabled={!categories.length}
            >
              <FiPlus /> Technology
            </button>
          </>
        }
      />

      <AdminAlert type="error">{error}</AdminAlert>
      <AdminAlert type="success">{message}</AdminAlert>

      <div className="admin-ui-stats">
        <div className="admin-ui-stat">
          <span>CATEGORIES</span>
          <strong>{categories.length}</strong>
          <small>Technology groups</small>
        </div>
        <div className="admin-ui-stat">
          <span>TECHNOLOGIES</span>
          <strong>{skills.length}</strong>
          <small>Total skills</small>
        </div>
        <div className="admin-ui-stat">
          <span>ACTIVE</span>
          <strong>{skills.filter((skill) => skill.isActive).length}</strong>
          <small>Visible skills</small>
        </div>
        <div className="admin-ui-stat">
          <span>FEATURED</span>
          <strong>{skills.filter((skill) => skill.isFeatured).length}</strong>
          <small>Highlighted skills</small>
        </div>
      </div>

      <section className="admin-ui-panel">
        <div className="admin-ui-section-title">
          <div>
            <span>01</span>
            <h2>Categories</h2>
          </div>
        </div>

        {categories.length === 0 ? (
          <AdminEmptyState
            icon={<FiCode />}
            title="No categories yet"
            description="Create a category before adding technologies."
          />
        ) : (
          <div className="admin-ui-list">
            {categories.map((category) => (
              <article className="admin-ui-list-card admin-ui-card" key={category.id}>
                <div className="admin-ui-list-icon">
                  <FiCode />
                </div>

                <div className="admin-ui-list-content">
                  <span>{category.isActive ? "ACTIVE" : "INACTIVE"}</span>
                  <h3>{category.name}</h3>
                  <p>{category.description || `${category?._count?.skills || 0} skills`}</p>
                </div>

                <div className="admin-ui-actions">
                  <button className="admin-ui-icon-button" type="button" onClick={() => openCategoryEdit(category)}>
                    <FiEdit2 />
                  </button>
                  <button className="admin-ui-icon-button admin-ui-button-danger" type="button" onClick={() => removeCategory(category)}>
                    <FiTrash2 />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="admin-ui-panel admin-ui-section">
        <div className="admin-ui-section-title">
          <div>
            <span>02</span>
            <h2>Technologies</h2>
          </div>

          <label className="admin-ui-search">
            <FiSearch />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search technologies..."
            />
          </label>
        </div>

        <div className="admin-ui-table-wrap">
          <table className="admin-ui-table">
            <thead>
              <tr>
                <th>Technology</th>
                <th>Category</th>
                <th>Proficiency</th>
                <th>Experience</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredSkills.map((skill) => (
                <tr key={skill.id}>
                  <td><strong>{skill.name}</strong></td>
                  <td>{skill?.category?.name || "—"}</td>
                  <td>{skill.proficiency ?? "—"}{skill.proficiency != null ? "%" : ""}</td>
                  <td>{skill.yearsExperience ?? "—"}</td>
                  <td>
                    <span className={`admin-ui-badge ${skill.isActive ? "admin-ui-badge-success" : "admin-ui-badge-muted"}`}>
                      {skill.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <div className="admin-ui-actions">
                      <button className="admin-ui-icon-button" type="button" onClick={() => openSkillEdit(skill)}>
                        <FiEdit2 />
                      </button>
                      <button className="admin-ui-icon-button admin-ui-button-danger" type="button" onClick={() => removeSkill(skill)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <AdminModal
        open={categoryOpen}
        onClose={() => setCategoryOpen(false)}
        eyebrow="CATEGORY"
        title={editingCategoryId ? "Edit Category" : "New Category"}
        footer={
          <>
            <button className="admin-ui-button" type="button" onClick={() => setCategoryOpen(false)}>Cancel</button>
            <button className="admin-ui-button admin-ui-button-primary" type="submit" form="category-form" disabled={saving}>
              {saving ? <AdminSaving /> : <><FiSave />Save Category</>}
            </button>
          </>
        }
      >
        <form id="category-form" onSubmit={saveCategory}>
          <div className="admin-ui-form-grid">
            <label className="admin-ui-field admin-ui-field-full">
              <span>Name</span>
              <input
                value={categoryForm.name}
                onChange={(event) => setCategoryForm((previous) => ({ ...previous, name: event.target.value }))}
                required
              />
            </label>

            <label className="admin-ui-field admin-ui-field-full">
              <span>Description</span>
              <textarea
                value={categoryForm.description}
                onChange={(event) => setCategoryForm((previous) => ({ ...previous, description: event.target.value }))}
              />
            </label>

            <label className="admin-ui-field">
              <span>Display order</span>
              <input
                type="number"
                value={categoryForm.displayOrder}
                onChange={(event) => setCategoryForm((previous) => ({ ...previous, displayOrder: Number(event.target.value) }))}
              />
            </label>

            <label className="admin-ui-check">
              <input
                type="checkbox"
                checked={categoryForm.isActive}
                onChange={(event) => setCategoryForm((previous) => ({ ...previous, isActive: event.target.checked }))}
              />
              Active
            </label>
          </div>
        </form>
      </AdminModal>

      <AdminModal
        open={skillOpen}
        onClose={() => setSkillOpen(false)}
        eyebrow="TECHNOLOGY"
        title={editingSkillId ? "Edit Technology" : "New Technology"}
        footer={
          <>
            <button className="admin-ui-button" type="button" onClick={() => setSkillOpen(false)}>Cancel</button>
            <button className="admin-ui-button admin-ui-button-primary" type="submit" form="skill-form" disabled={saving}>
              {saving ? <AdminSaving /> : <><FiSave />Save Technology</>}
            </button>
          </>
        }
      >
        <form id="skill-form" onSubmit={saveSkill}>
          <div className="admin-ui-form-grid">
            <label className="admin-ui-field">
              <span>Name</span>
              <input
                value={skillForm.name}
                onChange={(event) => setSkillForm((previous) => ({ ...previous, name: event.target.value }))}
                required
              />
            </label>

            <label className="admin-ui-field">
              <span>Category</span>
              <select
                value={skillForm.categoryId}
                onChange={(event) => setSkillForm((previous) => ({ ...previous, categoryId: event.target.value }))}
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </label>

            <label className="admin-ui-field">
              <span>Icon key</span>
              <input
                value={skillForm.icon}
                onChange={(event) => setSkillForm((previous) => ({ ...previous, icon: event.target.value }))}
              />
            </label>

            <label className="admin-ui-field">
              <span>Proficiency (0-100)</span>
              <input
                type="number"
                min="0"
                max="100"
                value={skillForm.proficiency}
                onChange={(event) => setSkillForm((previous) => ({ ...previous, proficiency: event.target.value }))}
              />
            </label>

            <label className="admin-ui-field">
              <span>Years experience</span>
              <input
                type="number"
                step="0.1"
                min="0"
                value={skillForm.yearsExperience}
                onChange={(event) => setSkillForm((previous) => ({ ...previous, yearsExperience: event.target.value }))}
              />
            </label>

            <label className="admin-ui-field">
              <span>Display order</span>
              <input
                type="number"
                value={skillForm.displayOrder}
                onChange={(event) => setSkillForm((previous) => ({ ...previous, displayOrder: Number(event.target.value) }))}
              />
            </label>

            <label className="admin-ui-check">
              <input
                type="checkbox"
                checked={skillForm.isFeatured}
                onChange={(event) => setSkillForm((previous) => ({ ...previous, isFeatured: event.target.checked }))}
              />
              Featured
            </label>

            <label className="admin-ui-check">
              <input
                type="checkbox"
                checked={skillForm.isActive}
                onChange={(event) => setSkillForm((previous) => ({ ...previous, isActive: event.target.checked }))}
              />
              Active
            </label>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

export default AdminSkills;
