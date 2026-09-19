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
      technologyIds:
        project?.technologies?.map((item) => item?.skill?.id || item?.skillId).filter(Boolean) || [],
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
        completedAt: form.completedAt || null,
        technologyIds: form.technologyIds,
        images: form.coverImageUrl.trim()
          ? [
              {
                url: form.coverImageUrl.trim(),
                altText: form.title,
                isCover: true,
                displayOrder: 0,
              },
            ]
          : [],
      };

      if (editingId) await api.put(`/projects/${editingId}`, payload);
      else await api.post("/projects", payload);

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

  if (loading) return <AdminLoader label="Loading projects..." />;

  return (
    <div className="admin-ui-page">
      <AdminPageHeader
        eyebrow="PORTFOLIO CONTENT"
        title="Projects"
        description="Manage project case studies, links, technologies and visibility."
        actions={
          <>
            <button className="admin-ui-button" type="button" onClick={loadData}>
              <FiRefreshCw />Refresh
            </button>
            <button className="admin-ui-button admin-ui-button-primary" type="button" onClick={openCreate}>
              <FiPlus />New Project
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
          <strong>{projects.filter((project) => project.status === "PUBLISHED").length}</strong>
          <small>Visible publicly</small>
        </div>
        <div className="admin-ui-stat">
          <span>DRAFTS</span>
          <strong>{projects.filter((project) => project.status === "DRAFT").length}</strong>
          <small>Work in progress</small>
        </div>
        <div className="admin-ui-stat">
          <span>FEATURED</span>
          <strong>{projects.filter((project) => project.isFeatured).length}</strong>
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
          <div className="admin-projects-refactor-grid">
            {filteredProjects.map((project) => {
              const cover =
                project?.images?.find((image) => image.isCover) ||
                project?.images?.[0];

              return (
                <article className="admin-projects-refactor-card admin-ui-card" key={project.id}>
                  <div className="admin-projects-refactor-media">
                    {cover?.url ? (
                      <img src={cover.url} alt={cover.altText || project.title} />
                    ) : (
                      <FiFolder />
                    )}
                    {project.isFeatured && (
                      <span className="admin-ui-badge">
                        <FiStar />Featured
                      </span>
                    )}
                  </div>

                  <div className="admin-projects-refactor-body">
                    <span>{project.status}</span>
                    <h3>{project.title}</h3>
                    <p>{project.shortDescription || "No short description."}</p>

                    {project?.technologies?.length > 0 && (
                      <div className="admin-projects-refactor-tech">
                        {project.technologies.slice(0, 5).map((item) => (
                          <span key={item?.skill?.id || item.skillId}>
                            {item?.skill?.name || "Technology"}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="admin-projects-refactor-footer">
                      <div className="admin-ui-actions">
                        {project.liveUrl && (
                          <a className="admin-ui-icon-button" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label="Live project"><FiExternalLink /></a>
                        )}
                        {project.githubUrl && (
                          <a className="admin-ui-icon-button" href={project.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub project"><FiGithub /></a>
                        )}
                      </div>

                      <div className="admin-ui-actions">
                        <button className="admin-ui-icon-button" type="button" onClick={() => openEdit(project)}><FiEdit2 /></button>
                        <button className="admin-ui-icon-button admin-ui-button-danger" type="button" onClick={() => remove(project)}><FiTrash2 /></button>
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
        eyebrow="PROJECT EDITOR"
        title={editingId ? "Edit Project" : "New Project"}
        size="lg"
        footer={
          <>
            <button className="admin-ui-button" type="button" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="admin-ui-button admin-ui-button-primary" type="submit" form="project-form" disabled={saving}>{saving ? <AdminSaving /> : <><FiSave />Save Project</>}</button>
          </>
        }
      >
        <form id="project-form" onSubmit={save}>
          <div className="admin-ui-form-grid">
            <label className="admin-ui-field admin-ui-field-full"><span>Project title</span><input name="title" value={form.title} onChange={change} required /></label>
            <label className="admin-ui-field admin-ui-field-full"><span>Short description</span><input name="shortDescription" value={form.shortDescription} onChange={change} /></label>
            <label className="admin-ui-field admin-ui-field-full"><span>Description</span><textarea name="description" value={form.description} onChange={change} /></label>
            <label className="admin-ui-field admin-ui-field-full"><span>Cover image URL</span><input name="coverImageUrl" type="url" value={form.coverImageUrl} onChange={change} /></label>
            <label className="admin-ui-field"><span>Live URL</span><input name="liveUrl" type="url" value={form.liveUrl} onChange={change} /></label>
            <label className="admin-ui-field"><span>GitHub URL</span><input name="githubUrl" type="url" value={form.githubUrl} onChange={change} /></label>
            <label className="admin-ui-field">
              <span>Status</span>
              <select name="status" value={form.status} onChange={change}>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </label>
            <label className="admin-ui-field"><span>Display order</span><input name="displayOrder" type="number" value={form.displayOrder} onChange={change} /></label>
            <label className="admin-ui-field"><span>Started at</span><input name="startedAt" type="date" value={form.startedAt} onChange={change} /></label>
            <label className="admin-ui-field"><span>Completed at</span><input name="completedAt" type="date" value={form.completedAt} onChange={change} disabled={form.isCurrent} /></label>
            <label className="admin-ui-check"><input name="isFeatured" type="checkbox" checked={form.isFeatured} onChange={change} />Featured project</label>
            <label className="admin-ui-check"><input name="isCurrent" type="checkbox" checked={form.isCurrent} onChange={change} />Current project</label>

            <div className="admin-ui-field admin-ui-field-full">
              <span>Technologies</span>
              <div className="admin-projects-refactor-skill-grid">
                {skills.map((skill) => (
                  <label className="admin-projects-refactor-skill" key={skill.id}>
                    <input
                      type="checkbox"
                      checked={form.technologyIds.includes(skill.id)}
                      onChange={() => toggleTechnology(skill.id)}
                    />
                    <span>{skill.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

export default AdminProjects;
