import { useEffect, useMemo, useState } from "react";
import {
  FiCalendar,
  FiCheck,
  FiCode,
  FiEdit2,
  FiExternalLink,
  FiFolder,
  FiGithub,
  FiImage,
  FiLink,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiSearch,
  FiStar,
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

import "./AdminProjects.css";

const emptyForm = {
  title: "",
  shortDescription: "",
  description: "",
  githubUrl: "",
  liveUrl: "",
  status: "DRAFT",
  isFeatured: false,
  isCurrent: false,
  displayOrder: 0,
  startedAt: "",
  completedAt: "",
  coverImageUrl: "",
  images: [],
  technologyIds: [],
};

const dateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [projectResponse, skillResponse] = await Promise.all([
        api.get("/projects/admin/all"),
        api.get("/skills/admin/all"),
      ]);

      setProjects(projectResponse?.data?.projects || []);
      setSkills(skillResponse?.data?.skills || []);
    } catch (err) {
      console.error("Projects load error:", err);
      setError(err?.response?.data?.message || "Unable to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredProjects = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return projects;

    return projects.filter((project) =>
      `${project.title} ${project.shortDescription || ""} ${project.status}`
        .toLowerCase()
        .includes(value)
    );
  }, [projects, search]);

  const selectedSkills = useMemo(
    () => skills.filter((skill) => form.technologyIds.includes(skill.id)),
    [skills, form.technologyIds]
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (project) => {
    const cover =
      project?.images?.find((image) => image.isCover) ||
      project?.images?.[0];

    setEditingId(project.id);
    setForm({
      title: project.title || "",
      shortDescription: project.shortDescription || "",
      description: project.description || "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      status: project.status || "DRAFT",
      isFeatured: Boolean(project.isFeatured),
      isCurrent: Boolean(project.isCurrent),
      displayOrder: project.displayOrder ?? 0,
      startedAt: dateInput(project.startedAt),
      completedAt: dateInput(project.completedAt),
      coverImageUrl: cover?.url || "",
      images: Array.isArray(project?.images) ? project.images : [],
      technologyIds:
        project?.technologies
          ?.map((item) => item?.skill?.id || item?.skillId)
          .filter(Boolean) || [],
    });
    setModalOpen(true);
  };

  const change = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "isCurrent" && checked ? { completedAt: "" } : {}),
    }));
  };

  const toggleTechnology = (skillId) => {
    setForm((previous) => ({
      ...previous,
      technologyIds: previous.technologyIds.includes(skillId)
        ? previous.technologyIds.filter((id) => id !== skillId)
        : [...previous.technologyIds, skillId],
    }));
  };

  const save = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const payload = {
        title: form.title,
        shortDescription: form.shortDescription,
        description: form.description,
        githubUrl: form.githubUrl,
        liveUrl: form.liveUrl,
        status: form.status,
        isFeatured: form.isFeatured,
        isCurrent: form.isCurrent,
        displayOrder: Number(form.displayOrder || 0),
        startedAt: form.startedAt || null,
        completedAt: form.isCurrent ? null : form.completedAt || null,
        technologyIds: form.technologyIds,
        images: (() => {
          const existingImages = Array.isArray(form.images)
            ? form.images
            : [];

          const withoutCover = existingImages
            .filter((image) => !image.isCover)
            .map((image, index) => ({
              url: image.url,
              altText: image.altText || "",
              caption: image.caption || "",
              isCover: false,
              displayOrder: image.displayOrder ?? index + 1,
            }));

          const coverUrl = form.coverImageUrl.trim();

          return coverUrl
            ? [
                {
                  url: coverUrl,
                  altText: form.title,
                  caption: "",
                  isCover: true,
                  displayOrder: 0,
                },
                ...withoutCover,
              ]
            : withoutCover;
        })(),
      };

      if (editingId) {
        await api.put(`/projects/${editingId}`, payload);
      } else {
        await api.post("/projects", payload);
      }

      setMessage(editingId ? "Project updated." : "Project created.");
      setModalOpen(false);
      await loadData();
    } catch (err) {
      console.error("Project save error:", err);
      setError(err?.response?.data?.message || "Unable to save project.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (project) => {
    if (!window.confirm(`Delete "${project.title}"?`)) return;

    try {
      await api.delete(`/projects/${project.id}`);
      setMessage("Project deleted.");
      await loadData();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to delete project.");
    }
  };

  if (loading) {
    return <AdminLoader label="Loading projects..." />;
  }

  return (
    <div className="admin-ui-page admin-projects-page">
      <AdminPageHeader
        eyebrow="PORTFOLIO CONTENT"
        title="Projects"
        description="Build and publish project case studies from one focused workspace."
        actions={
          <>
            <button className="admin-ui-button" type="button" onClick={loadData}>
              <FiRefreshCw />
              Refresh
            </button>

            <button
              className="admin-ui-button admin-ui-button-primary"
              type="button"
              onClick={openCreate}
            >
              <FiPlus />
              New Project
            </button>
          </>
        }
      />

      <AdminAlert type="error">{error}</AdminAlert>
      <AdminAlert type="success">{message}</AdminAlert>

      <div className="admin-ui-stats">
        <div className="admin-ui-stat">
          <span>TOTAL</span>
          <strong>{projects.length}</strong>
          <small>All projects</small>
        </div>

        <div className="admin-ui-stat">
          <span>PUBLISHED</span>
          <strong>
            {projects.filter((project) => project.status === "PUBLISHED").length}
          </strong>
          <small>Visible publicly</small>
        </div>

        <div className="admin-ui-stat">
          <span>DRAFTS</span>
          <strong>
            {projects.filter((project) => project.status === "DRAFT").length}
          </strong>
          <small>Work in progress</small>
        </div>

        <div className="admin-ui-stat">
          <span>FEATURED</span>
          <strong>
            {projects.filter((project) => project.isFeatured).length}
          </strong>
          <small>Highlighted work</small>
        </div>
      </div>

      <section className="admin-ui-panel">
        <div className="admin-ui-section-title">
          <div>
            <span>PROJECT LIBRARY</span>
            <h2>All projects</h2>
          </div>

          <label className="admin-ui-search">
            <FiSearch />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects..."
            />
          </label>
        </div>

        {filteredProjects.length === 0 ? (
          <AdminEmptyState
            icon={<FiFolder />}
            title="No projects found"
            description="Create your first portfolio project."
          />
        ) : (
          <div className="admin-projects-grid">
            {filteredProjects.map((project) => {
              const cover =
                project?.images?.find((image) => image.isCover) ||
                project?.images?.[0];

              return (
                <article className="admin-project-card admin-ui-card" key={project.id}>
                  <div className="admin-project-card-media">
                    {cover?.url ? (
                      <img src={cover.url} alt={cover.altText || project.title} />
                    ) : (
                      <FiFolder />
                    )}

                    <div className="admin-project-card-badges">
                      <span className="admin-ui-badge">{project.status}</span>
                      {project.isFeatured && (
                        <span className="admin-ui-badge">
                          <FiStar />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="admin-project-card-body">
                    <h3>{project.title}</h3>
                    <p>{project.shortDescription || "No short description."}</p>

                    {project?.technologies?.length > 0 && (
                      <div className="admin-project-card-tech">
                        {project.technologies.slice(0, 5).map((item) => (
                          <span key={item?.skill?.id || item.skillId}>
                            {item?.skill?.name || "Technology"}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="admin-project-card-footer">
                      <div className="admin-ui-actions">
                        {project.liveUrl && (
                          <a
                            className="admin-ui-icon-button"
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Live project"
                          >
                            <FiExternalLink />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            className="admin-ui-icon-button"
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub project"
                          >
                            <FiGithub />
                          </a>
                        )}
                      </div>

                      <div className="admin-ui-actions">
                        <button
                          className="admin-ui-icon-button"
                          type="button"
                          onClick={() => openEdit(project)}
                          aria-label="Edit project"
                        >
                          <FiEdit2 />
                        </button>

                        <button
                          className="admin-ui-icon-button admin-ui-button-danger"
                          type="button"
                          onClick={() => remove(project)}
                          aria-label="Delete project"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        eyebrow="PROJECT WORKSPACE"
        title={editingId ? "Edit Project" : "Create Project"}
        size="xl"
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
              form="project-form"
              disabled={saving}
            >
              {saving ? (
                <AdminSaving />
              ) : (
                <>
                  <FiSave />
                  {editingId ? "Update Project" : "Create Project"}
                </>
              )}
            </button>
          </>
        }
      >
        <form id="project-form" onSubmit={save} className="admin-project-editor">
          <aside className="admin-project-editor-preview">
            <div className="admin-project-preview-top">
              <div>
                <span>LIVE PREVIEW</span>
                <strong>Public project card</strong>
              </div>

              <span className="admin-ui-badge">{form.status}</span>
            </div>

            <div className="admin-project-preview-media">
              {form.coverImageUrl ? (
                <img src={form.coverImageUrl} alt={form.title || "Project preview"} />
              ) : (
                <div className="admin-project-preview-placeholder">
                  <FiImage />
                  <span>Cover image preview</span>
                </div>
              )}

              {form.isFeatured && (
                <span className="admin-project-preview-featured">
                  <FiStar />
                  FEATURED
                </span>
              )}
            </div>

            <div className="admin-project-preview-copy">
              <span>{form.isCurrent ? "CURRENT PROJECT" : "PORTFOLIO PROJECT"}</span>
              <h3>{form.title || "Untitled project"}</h3>
              <p>
                {form.shortDescription ||
                  "A concise project summary will appear here while you type."}
              </p>
            </div>

            <div className="admin-project-preview-tech">
              {selectedSkills.length > 0 ? (
                selectedSkills.slice(0, 6).map((skill) => (
                  <span key={skill.id}>{skill.name}</span>
                ))
              ) : (
                <span>No technologies selected</span>
              )}
            </div>

            <div className="admin-project-preview-info">
              <div>
                <FiCode />
                <span>
                  <small>STACK</small>
                  <strong>{form.technologyIds.length} selected</strong>
                </span>
              </div>

              <div>
                <FiCalendar />
                <span>
                  <small>TIMELINE</small>
                  <strong>
                    {form.startedAt || form.completedAt
                      ? `${form.startedAt || "Start"} → ${form.isCurrent ? "Present" : form.completedAt || "End"}`
                      : "Not set"}
                  </strong>
                </span>
              </div>
            </div>

            <div className="admin-project-preview-links">
              <span>
                <FiLink />
                {form.liveUrl ? "Live URL added" : "No live URL"}
              </span>
              <span>
                <FiGithub />
                {form.githubUrl ? "GitHub URL added" : "No GitHub URL"}
              </span>
            </div>
          </aside>

          <div className="admin-project-editor-fields">
            <section className="admin-project-editor-block">
              <div className="admin-project-editor-block-title">
                <span>01</span>
                <div>
                  <strong>Project information</strong>
                  <small>Tell visitors what you built and why it matters.</small>
                </div>
              </div>

              <div className="admin-ui-form-grid">
                <label className="admin-ui-field admin-ui-field-full">
                  <span>Project title</span>
                  <input
                    name="title"
                    value={form.title}
                    onChange={change}
                    placeholder="e.g. ZsmartClass LMS"
                    required
                  />
                </label>

                <label className="admin-ui-field admin-ui-field-full">
                  <span>Short description</span>
                  <input
                    name="shortDescription"
                    value={form.shortDescription}
                    onChange={change}
                    placeholder="One sentence for the project card"
                  />
                </label>

                <label className="admin-ui-field admin-ui-field-full">
                  <span>Full description</span>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={change}
                    placeholder="Problem, solution, responsibilities and important features..."
                  />
                </label>
              </div>
            </section>

            <section className="admin-project-editor-block">
              <div className="admin-project-editor-block-title">
                <span>02</span>
                <div>
                  <strong>Media & links</strong>
                  <small>Add the project cover and places visitors can open.</small>
                </div>
              </div>

              <div className="admin-ui-form-grid">
                <label className="admin-ui-field admin-ui-field-full">
                  <span>Cover image URL</span>
                  <input
                    name="coverImageUrl"
                    type="url"
                    value={form.coverImageUrl}
                    onChange={change}
                    placeholder="https://..."
                  />
                </label>

                <label className="admin-ui-field">
                  <span>Live project URL</span>
                  <input
                    name="liveUrl"
                    type="url"
                    value={form.liveUrl}
                    onChange={change}
                    placeholder="https://..."
                  />
                </label>

                <label className="admin-ui-field">
                  <span>GitHub URL</span>
                  <input
                    name="githubUrl"
                    type="url"
                    value={form.githubUrl}
                    onChange={change}
                    placeholder="https://github.com/..."
                  />
                </label>
              </div>
            </section>

            <section className="admin-project-editor-block">
              <div className="admin-project-editor-block-title">
                <span>03</span>
                <div>
                  <strong>Visibility & timeline</strong>
                  <small>Control publishing, ordering and project dates.</small>
                </div>
              </div>

              <div className="admin-ui-form-grid">
                <label className="admin-ui-field">
                  <span>Status</span>
                  <select name="status" value={form.status} onChange={change}>
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </label>

                <label className="admin-ui-field">
                  <span>Display order</span>
                  <input
                    name="displayOrder"
                    type="number"
                    value={form.displayOrder}
                    onChange={change}
                  />
                </label>

                <label className="admin-ui-field">
                  <span>Started at</span>
                  <input
                    name="startedAt"
                    type="date"
                    value={form.startedAt}
                    onChange={change}
                  />
                </label>

                <label className="admin-ui-field">
                  <span>Completed at</span>
                  <input
                    name="completedAt"
                    type="date"
                    value={form.completedAt}
                    onChange={change}
                    disabled={form.isCurrent}
                  />
                </label>
              </div>

              <div className="admin-project-switches">
                <label className={`admin-project-switch-card ${form.isFeatured ? "admin-project-switch-card-active" : ""}`}>
                  <input
                    name="isFeatured"
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={change}
                  />

                  <span className="admin-project-switch-box">
                    <FiCheck />
                  </span>

                  <span>
                    <strong>Featured project</strong>
                    <small>Give this project extra emphasis in the portfolio.</small>
                  </span>
                </label>

                <label className={`admin-project-switch-card ${form.isCurrent ? "admin-project-switch-card-active" : ""}`}>
                  <input
                    name="isCurrent"
                    type="checkbox"
                    checked={form.isCurrent}
                    onChange={change}
                  />

                  <span className="admin-project-switch-box">
                    <FiCheck />
                  </span>

                  <span>
                    <strong>Current project</strong>
                    <small>Show that this project is still active or evolving.</small>
                  </span>
                </label>
              </div>
            </section>

            <section className="admin-project-editor-block">
              <div className="admin-project-editor-block-title">
                <span>04</span>
                <div>
                  <strong>Technology stack</strong>
                  <small>Select every technology used in this project.</small>
                </div>

                <em>{form.technologyIds.length} selected</em>
              </div>

              {skills.length === 0 ? (
                <div className="admin-project-tech-empty">
                  Add skills first from the Skills page.
                </div>
              ) : (
                <div className="admin-project-tech-picker">
                  {skills.map((skill) => {
                    const selected = form.technologyIds.includes(skill.id);

                    return (
                      <label
                        className={`admin-project-tech-option ${selected ? "admin-project-tech-option-selected" : ""}`}
                        key={skill.id}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleTechnology(skill.id)}
                        />

                        <span className="admin-project-tech-check">
                          <FiCheck />
                        </span>

                        <strong>{skill.name}</strong>
                      </label>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

export default AdminProjects;
