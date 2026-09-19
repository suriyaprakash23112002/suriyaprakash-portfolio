import { useEffect, useMemo, useState } from "react";
import {
  FiEdit2,
  FiExternalLink,
  FiFolder,
  FiGithub,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiSearch,
  FiStar,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import api from "../services/api";
import "./AdminProjects.css";

const emptyForm = {
  title: "",
  shortDescription: "",
  description: "",
  thumbnailUrl: "",
  liveUrl: "",
  githubUrl: "",
  status: "PUBLISHED",
  isFeatured: false,
  order: 0,
};

const getProjects = (response) => {
  const data = response?.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.projects)) return data.projects;
  if (Array.isArray(data?.data?.projects)) return data.data.projects;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/projects");
      setProjects(getProjects(response));
    } catch (err) {
      console.error("Projects loading error:", err);
      setError(err?.response?.data?.message || "Unable to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return projects;

    return projects.filter((project) =>
      `${project?.title || ""} ${project?.shortDescription || ""} ${
        project?.status || ""
      }`
        .toLowerCase()
        .includes(value)
    );
  }, [projects, search]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditingId(project.id);
    setForm({
      title: project?.title || project?.name || "",
      shortDescription: project?.shortDescription || project?.summary || "",
      description: project?.description || "",
      thumbnailUrl:
        project?.thumbnailUrl ||
        project?.imageUrl ||
        project?.coverImage ||
        "",
      liveUrl: project?.liveUrl || project?.demoUrl || "",
      githubUrl: project?.githubUrl || project?.repositoryUrl || "",
      status: project?.status || "PUBLISHED",
      isFeatured: project?.isFeatured === true || project?.featured === true,
      order: project?.order ?? 0,
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

  const saveProject = async (event) => {
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
        await api.put(`/projects/${editingId}`, payload);
      } else {
        await api.post("/projects", payload);
      }

      setMessage(
        editingId
          ? "Project updated successfully."
          : "Project created successfully."
      );
      setModalOpen(false);
      await loadProjects();
    } catch (err) {
      console.error("Project save error:", err);
      setError(err?.response?.data?.message || "Unable to save project.");
    } finally {
      setSaving(false);
    }
  };

  const removeProject = async (project) => {
    if (!window.confirm(`Delete "${project.title || project.name}"?`)) return;

    try {
      await api.delete(`/projects/${project.id}`);
      setMessage("Project deleted successfully.");
      await loadProjects();
    } catch (err) {
      console.error("Project delete error:", err);
      setError(err?.response?.data?.message || "Unable to delete project.");
    }
  };

  return (
    <div className="admin-projects">
      <div className="admin-projects-header">
        <div>
          <span>PORTFOLIO CONTENT</span>
          <h1>Projects</h1>
          <p>Manage portfolio case studies, project links and featured work.</p>
        </div>

        <div className="admin-projects-actions">
          <button type="button" onClick={loadProjects}>
            <FiRefreshCw />
            Refresh
          </button>

          <button type="button" className="primary" onClick={openCreate}>
            <FiPlus />
            New Project
          </button>
        </div>
      </div>

      {error && <div className="admin-projects-alert error">{error}</div>}
      {message && <div className="admin-projects-alert success">{message}</div>}

      <div className="admin-projects-toolbar">
        <div>
          <strong>{projects.length}</strong>
          <span>Total projects</span>
        </div>

        <div>
          <strong>{projects.filter((project) => project?.isFeatured).length}</strong>
          <span>Featured</span>
        </div>

        <label>
          <FiSearch />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search projects..."
          />
        </label>
      </div>

      {loading ? (
        <div className="admin-projects-loading">
          <FiRefreshCw />
          Loading projects...
        </div>
      ) : (
        <div className="admin-projects-grid">
          {filteredProjects.map((project) => {
            const image =
              project?.thumbnailUrl ||
              project?.imageUrl ||
              project?.coverImage ||
              "";

            return (
              <article className="admin-projects-card" key={project.id}>
                <div className="admin-projects-media">
                  {image ? (
                    <img src={image} alt={project?.title || "Project"} />
                  ) : (
                    <div className="admin-projects-fallback">
                      <FiFolder />
                    </div>
                  )}

                  {project?.isFeatured && (
                    <span className="admin-projects-featured">
                      <FiStar />
                      Featured
                    </span>
                  )}
                </div>

                <div className="admin-projects-card-body">
                  <div className="admin-projects-card-title">
                    <div>
                      <span>{project?.status || "PUBLISHED"}</span>
                      <h2>{project?.title || project?.name || "Project"}</h2>
                    </div>

                    <div className="admin-projects-card-actions">
                      <button type="button" onClick={() => openEdit(project)}>
                        <FiEdit2 />
                      </button>
                      <button type="button" onClick={() => removeProject(project)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                  <p>
                    {project?.shortDescription ||
                      project?.summary ||
                      project?.description ||
                      "No project description added."}
                  </p>

                  <div className="admin-projects-links">
                    {(project?.liveUrl || project?.demoUrl) && (
                      <a
                        href={project?.liveUrl || project?.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FiExternalLink />
                        Live
                      </a>
                    )}

                    {(project?.githubUrl || project?.repositoryUrl) && (
                      <a
                        href={project?.githubUrl || project?.repositoryUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FiGithub />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}

          {filteredProjects.length === 0 && (
            <div className="admin-projects-empty">
              <FiFolder />
              <h3>No projects found</h3>
              <p>Create your first portfolio project.</p>
            </div>
          )}
        </div>
      )}

      {modalOpen && (
        <div className="admin-projects-modal-backdrop">
          <form className="admin-projects-modal" onSubmit={saveProject}>
            <div className="admin-projects-modal-header">
              <div>
                <span>PROJECT EDITOR</span>
                <h2>{editingId ? "Edit Project" : "New Project"}</h2>
              </div>

              <button type="button" onClick={() => setModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <div className="admin-projects-form-grid">
              <label className="full">
                Project title
                <input
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="full">
                Short description
                <input
                  name="shortDescription"
                  type="text"
                  value={form.shortDescription}
                  onChange={handleChange}
                />
              </label>

              <label className="full">
                Description
                <textarea
                  name="description"
                  rows="5"
                  value={form.description}
                  onChange={handleChange}
                />
              </label>

              <label className="full">
                Thumbnail URL
                <input
                  name="thumbnailUrl"
                  type="url"
                  value={form.thumbnailUrl}
                  onChange={handleChange}
                />
              </label>

              <label>
                Live URL
                <input
                  name="liveUrl"
                  type="url"
                  value={form.liveUrl}
                  onChange={handleChange}
                />
              </label>

              <label>
                GitHub URL
                <input
                  name="githubUrl"
                  type="url"
                  value={form.githubUrl}
                  onChange={handleChange}
                />
              </label>

              <label>
                Status
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
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

              <label className="admin-projects-check full">
                <input
                  name="isFeatured"
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={handleChange}
                />
                Feature this project
              </label>
            </div>

            <div className="admin-projects-modal-actions">
              <button type="button" onClick={() => setModalOpen(false)}>
                Cancel
              </button>

              <button type="submit" className="primary" disabled={saving}>
                <FiSave />
                {saving ? "Saving..." : "Save Project"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminProjects;
