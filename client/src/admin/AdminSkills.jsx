import { useEffect, useMemo, useState } from "react";
import {
  FiCode,
  FiEdit2,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiSearch,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import api from "../services/api";
import "./AdminSkills.css";

const emptyCategory = {
  name: "",
  description: "",
  order: 0,
  isActive: true,
};

const emptySkill = {
  name: "",
  categoryId: "",
  proficiency: "",
  order: 0,
  isActive: true,
};

const getList = (response, keys = []) => {
  const data = response?.data;

  if (Array.isArray(data)) return data;

  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key];
    if (Array.isArray(data?.data?.[key])) return data.data[key];
  }

  if (Array.isArray(data?.data)) return data.data;

  return [];
};

function AdminSkills() {
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [categoryForm, setCategoryForm] = useState(emptyCategory);
  const [skillForm, setSkillForm] = useState(emptySkill);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [categoryResponse, skillResponse] = await Promise.all([
        api.get("/skills/categories"),
        api.get("/skills"),
      ]);

      setCategories(
        getList(categoryResponse, ["categories", "skillCategories"])
      );
      setSkills(getList(skillResponse, ["skills"]));
    } catch (err) {
      console.error("Skills loading error:", err);
      setError(
        err?.response?.data?.message ||
          "Unable to load skill categories and technologies."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const categoryMap = useMemo(() => {
    return Object.fromEntries(
      categories.map((category) => [category.id, category.name])
    );
  }, [categories]);

  const filteredSkills = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return skills;

    return skills.filter((skill) => {
      const categoryName =
        skill?.category?.name ||
        categoryMap[skill?.categoryId] ||
        "";

      return (
        skill?.name?.toLowerCase().includes(value) ||
        categoryName.toLowerCase().includes(value)
      );
    });
  }, [skills, search, categoryMap]);

  const openCreateCategory = () => {
    setEditingCategoryId(null);
    setCategoryForm(emptyCategory);
    setCategoryModalOpen(true);
  };

  const openEditCategory = (category) => {
    setEditingCategoryId(category.id);
    setCategoryForm({
      name: category?.name || "",
      description: category?.description || "",
      order: category?.order ?? 0,
      isActive: category?.isActive !== false,
    });
    setCategoryModalOpen(true);
  };

  const openCreateSkill = () => {
    setEditingSkillId(null);
    setSkillForm({
      ...emptySkill,
      categoryId: categories?.[0]?.id || "",
    });
    setSkillModalOpen(true);
  };

  const openEditSkill = (skill) => {
    setEditingSkillId(skill.id);
    setSkillForm({
      name: skill?.name || "",
      categoryId: skill?.categoryId || skill?.category?.id || "",
      proficiency: skill?.proficiency || "",
      order: skill?.order ?? 0,
      isActive: skill?.isActive !== false,
    });
    setSkillModalOpen(true);
  };

  const saveCategory = async (event) => {
    event.preventDefault();

    if (!categoryForm.name.trim()) return;

    try {
      setSaving(true);
      setError("");
      setMessage("");

      if (editingCategoryId) {
        await api.put(
          `/skills/categories/${editingCategoryId}`,
          categoryForm
        );
      } else {
        await api.post("/skills/categories", categoryForm);
      }

      setMessage(
        editingCategoryId
          ? "Category updated successfully."
          : "Category created successfully."
      );
      setCategoryModalOpen(false);
      await loadData();
    } catch (err) {
      console.error("Category save error:", err);
      setError(
        err?.response?.data?.message || "Unable to save category."
      );
    } finally {
      setSaving(false);
    }
  };

  const saveSkill = async (event) => {
    event.preventDefault();

    if (!skillForm.name.trim() || !skillForm.categoryId) return;

    try {
      setSaving(true);
      setError("");
      setMessage("");

      if (editingSkillId) {
        await api.put(`/skills/${editingSkillId}`, skillForm);
      } else {
        await api.post("/skills", skillForm);
      }

      setMessage(
        editingSkillId
          ? "Technology updated successfully."
          : "Technology created successfully."
      );
      setSkillModalOpen(false);
      await loadData();
    } catch (err) {
      console.error("Skill save error:", err);
      setError(
        err?.response?.data?.message || "Unable to save technology."
      );
    } finally {
      setSaving(false);
    }
  };

  const removeCategory = async (category) => {
    const confirmed = window.confirm(
      `Delete "${category.name}" category?`
    );

    if (!confirmed) return;

    try {
      await api.delete(`/skills/categories/${category.id}`);
      setMessage("Category deleted successfully.");
      await loadData();
    } catch (err) {
      console.error("Category delete error:", err);
      setError(
        err?.response?.data?.message || "Unable to delete category."
      );
    }
  };

  const removeSkill = async (skill) => {
    const confirmed = window.confirm(`Delete "${skill.name}"?`);

    if (!confirmed) return;

    try {
      await api.delete(`/skills/${skill.id}`);
      setMessage("Technology deleted successfully.");
      await loadData();
    } catch (err) {
      console.error("Skill delete error:", err);
      setError(
        err?.response?.data?.message || "Unable to delete technology."
      );
    }
  };

  return (
    <div className="admin-skills">
      <div className="admin-skills-header">
        <div>
          <span>PORTFOLIO CONTENT</span>
          <h1>Skills & Technologies</h1>
          <p>Manage technology categories and the stack shown on your portfolio.</p>
        </div>

        <div className="admin-skills-header-actions">
          <button type="button" onClick={loadData}>
            <FiRefreshCw />
            Refresh
          </button>

          <button type="button" onClick={openCreateCategory}>
            <FiPlus />
            Category
          </button>

          <button
            type="button"
            className="admin-skills-primary"
            onClick={openCreateSkill}
            disabled={categories.length === 0}
          >
            <FiPlus />
            Technology
          </button>
        </div>
      </div>

      {error && <div className="admin-skills-alert error">{error}</div>}
      {message && <div className="admin-skills-alert success">{message}</div>}

      <div className="admin-skills-summary">
        <div>
          <span>{String(categories.length).padStart(2, "0")}</span>
          <strong>Categories</strong>
        </div>
        <div>
          <span>{String(skills.length).padStart(2, "0")}</span>
          <strong>Technologies</strong>
        </div>
        <div>
          <span>
            {String(
              skills.filter((skill) => skill?.isActive !== false).length
            ).padStart(2, "0")}
          </span>
          <strong>Active</strong>
        </div>
      </div>

      <section className="admin-skills-section">
        <div className="admin-skills-section-heading">
          <div>
            <span>01</span>
            <h2>Categories</h2>
          </div>
        </div>

        <div className="admin-skills-category-grid">
          {categories.map((category) => (
            <article key={category.id} className="admin-skills-category-card">
              <div>
                <FiCode />
              </div>

              <section>
                <span>{category?.isActive === false ? "INACTIVE" : "ACTIVE"}</span>
                <h3>{category.name}</h3>
                <p>
                  {category?.description ||
                    `${skills.filter((skill) =>
                      (skill?.categoryId || skill?.category?.id) === category.id
                    ).length} technologies`}
                </p>
              </section>

              <div className="admin-skills-card-actions">
                <button type="button" onClick={() => openEditCategory(category)}>
                  <FiEdit2 />
                </button>
                <button type="button" onClick={() => removeCategory(category)}>
                  <FiTrash2 />
                </button>
              </div>
            </article>
          ))}

          {!loading && categories.length === 0 && (
            <div className="admin-skills-empty">
              Create your first category before adding technologies.
            </div>
          )}
        </div>
      </section>

      <section className="admin-skills-section">
        <div className="admin-skills-section-heading">
          <div>
            <span>02</span>
            <h2>Technologies</h2>
          </div>

          <label className="admin-skills-search">
            <FiSearch />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search technologies..."
            />
          </label>
        </div>

        {loading ? (
          <div className="admin-skills-loading">
            <FiRefreshCw />
            Loading technologies...
          </div>
        ) : (
          <div className="admin-skills-table-wrap">
            <table className="admin-skills-table">
              <thead>
                <tr>
                  <th>Technology</th>
                  <th>Category</th>
                  <th>Proficiency</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {filteredSkills.map((skill) => (
                  <tr key={skill.id}>
                    <td>
                      <strong>{skill.name}</strong>
                    </td>
                    <td>
                      {skill?.category?.name ||
                        categoryMap[skill?.categoryId] ||
                        "—"}
                    </td>
                    <td>{skill?.proficiency || "—"}</td>
                    <td>{skill?.order ?? 0}</td>
                    <td>
                      <span
                        className={`admin-skills-status ${
                          skill?.isActive === false ? "off" : ""
                        }`}
                      >
                        {skill?.isActive === false ? "Inactive" : "Active"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-skills-row-actions">
                        <button type="button" onClick={() => openEditSkill(skill)}>
                          <FiEdit2 />
                        </button>
                        <button type="button" onClick={() => removeSkill(skill)}>
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredSkills.length === 0 && (
                  <tr>
                    <td colSpan="6">
                      <div className="admin-skills-empty">
                        No technologies found.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {categoryModalOpen && (
        <div className="admin-skills-modal-backdrop">
          <form className="admin-skills-modal" onSubmit={saveCategory}>
            <div className="admin-skills-modal-header">
              <div>
                <span>CATEGORY</span>
                <h2>{editingCategoryId ? "Edit category" : "New category"}</h2>
              </div>

              <button type="button" onClick={() => setCategoryModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <label>
              Name
              <input
                type="text"
                value={categoryForm.name}
                onChange={(event) =>
                  setCategoryForm((previous) => ({
                    ...previous,
                    name: event.target.value,
                  }))
                }
                required
              />
            </label>

            <label>
              Description
              <textarea
                rows="4"
                value={categoryForm.description}
                onChange={(event) =>
                  setCategoryForm((previous) => ({
                    ...previous,
                    description: event.target.value,
                  }))
                }
              />
            </label>

            <div className="admin-skills-modal-grid">
              <label>
                Order
                <input
                  type="number"
                  value={categoryForm.order}
                  onChange={(event) =>
                    setCategoryForm((previous) => ({
                      ...previous,
                      order: Number(event.target.value),
                    }))
                  }
                />
              </label>

              <label className="admin-skills-check">
                <input
                  type="checkbox"
                  checked={categoryForm.isActive}
                  onChange={(event) =>
                    setCategoryForm((previous) => ({
                      ...previous,
                      isActive: event.target.checked,
                    }))
                  }
                />
                Active
              </label>
            </div>

            <div className="admin-skills-modal-actions">
              <button type="button" onClick={() => setCategoryModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="primary" disabled={saving}>
                <FiSave />
                {saving ? "Saving..." : "Save Category"}
              </button>
            </div>
          </form>
        </div>
      )}

      {skillModalOpen && (
        <div className="admin-skills-modal-backdrop">
          <form className="admin-skills-modal" onSubmit={saveSkill}>
            <div className="admin-skills-modal-header">
              <div>
                <span>TECHNOLOGY</span>
                <h2>{editingSkillId ? "Edit technology" : "New technology"}</h2>
              </div>

              <button type="button" onClick={() => setSkillModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <label>
              Technology name
              <input
                type="text"
                value={skillForm.name}
                onChange={(event) =>
                  setSkillForm((previous) => ({
                    ...previous,
                    name: event.target.value,
                  }))
                }
                required
              />
            </label>

            <label>
              Category
              <select
                value={skillForm.categoryId}
                onChange={(event) =>
                  setSkillForm((previous) => ({
                    ...previous,
                    categoryId: event.target.value,
                  }))
                }
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="admin-skills-modal-grid">
              <label>
                Proficiency
                <input
                  type="text"
                  value={skillForm.proficiency}
                  onChange={(event) =>
                    setSkillForm((previous) => ({
                      ...previous,
                      proficiency: event.target.value,
                    }))
                  }
                  placeholder="Advanced"
                />
              </label>

              <label>
                Order
                <input
                  type="number"
                  value={skillForm.order}
                  onChange={(event) =>
                    setSkillForm((previous) => ({
                      ...previous,
                      order: Number(event.target.value),
                    }))
                  }
                />
              </label>
            </div>

            <label className="admin-skills-check">
              <input
                type="checkbox"
                checked={skillForm.isActive}
                onChange={(event) =>
                  setSkillForm((previous) => ({
                    ...previous,
                    isActive: event.target.checked,
                  }))
                }
              />
              Active
            </label>

            <div className="admin-skills-modal-actions">
              <button type="button" onClick={() => setSkillModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="primary" disabled={saving}>
                <FiSave />
                {saving ? "Saving..." : "Save Technology"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminSkills;
