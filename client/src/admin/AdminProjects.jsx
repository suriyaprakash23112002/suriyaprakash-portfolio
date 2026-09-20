import { useEffect, useMemo, useState } from "react";
import {
  FiCheck,
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
  return Number.isNaN(date.getTime())
    ? ""
    : date.toISOString().slice(0, 10);
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

      const [projectResponse, skillResponse] =
        await Promise.all([
          api.get("/projects/admin/all"),
          api.get("/skills/admin/all"),
        ]);

      setProjects(
        projectResponse?.data?.projects || []
      );

      setSkills(
        skillResponse?.data?.skills || []
      );
    } catch (err) {
      console.error(
        "Projects load error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredProjects = useMemo(() => {
    const value =
      search.trim().toLowerCase();

    if (!value) return projects;

    return projects.filter(
      (project) =>
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
      project?.images?.find(
        (image) => image.isCover
      ) || project?.images?.[0];

    setEditingId(project.id);

    setForm({
      title: project.title || "",
      shortDescription:
        project.shortDescription || "",
      description:
        project.description || "",
      githubUrl:
        project.githubUrl || "",
      liveUrl:
        project.liveUrl || "",
      status:
        project.status || "DRAFT",
      isFeatured:
        Boolean(project.isFeatured),
      isCurrent:
        Boolean(project.isCurrent),
      displayOrder:
        project.displayOrder ?? 0,
      startedAt:
        dateInput(project.startedAt),
      completedAt:
        dateInput(project.completedAt),
      coverImageUrl:
        cover?.url || "",
      images:
        Array.isArray(project?.images)
          ? project.images
          : [],
      technologyIds:
        project?.technologies
          ?.map(
            (item) =>
              item?.skill?.id ||
              item?.skillId
          )
          .filter(Boolean) || [],
    });

    setModalOpen(true);
  };

  const change = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
      ...(name === "isCurrent" &&
      checked
        ? { completedAt: "" }
        : {}),
    }));
  };

  const setStatus = (status) => {
    setForm((previous) => ({
      ...previous,
      status,
    }));
  };

  const toggleTechnology = (skillId) => {
    setForm((previous) => ({
      ...previous,
      technologyIds:
        previous.technologyIds.includes(
          skillId
        )
          ? previous.technologyIds.filter(
              (id) => id !== skillId
            )
          : [
              ...previous.technologyIds,
              skillId,
            ],
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
        shortDescription:
          form.shortDescription,
        description: form.description,
        githubUrl: form.githubUrl,
        liveUrl: form.liveUrl,
        status: form.status,
        isFeatured: form.isFeatured,
        isCurrent: form.isCurrent,
        displayOrder:
          Number(form.displayOrder || 0),
        startedAt:
          form.startedAt || null,
        completedAt:
          form.isCurrent
            ? null
            : form.completedAt || null,
        technologyIds:
          form.technologyIds,
        images: (() => {
          const existingImages =
            Array.isArray(form.images)
              ? form.images
              : [];

          const withoutCover =
            existingImages
              .filter(
                (image) =>
                  !image.isCover
              )
              .map(
                (image, index) => ({
                  url: image.url,
                  altText:
                    image.altText || "",
                  caption:
                    image.caption || "",
                  isCover: false,
                  displayOrder:
                    image.displayOrder ??
                    index + 1,
                })
              );

          const coverUrl =
            form.coverImageUrl.trim();

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
        await api.put(
          `/projects/${editingId}`,
          payload
        );
      } else {
        await api.post(
          "/projects",
          payload
        );
      }

      setMessage(
        editingId
          ? "Project updated."
          : "Project created."
      );

      setModalOpen(false);
      await loadData();
    } catch (err) {
      console.error(
        "Project save error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to save project."
      );
    } finally {
      setSaving(false);
    }
  };

  const remove = async (project) => {
    if (
      !window.confirm(
        `Delete "${project.title}"?`
      )
    ) {
      return;
    }

    try {
      await api.delete(
        `/projects/${project.id}`
      );

      setMessage(
        "Project deleted."
      );

      await loadData();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to delete project."
      );
    }
  };

  if (loading) {
    return (
      <AdminLoader label="Loading projects..." />
    );
  }

  return (
    <div className="admin-ui-page">
      <AdminPageHeader
        eyebrow="PORTFOLIO CONTENT"
        title="Projects"
        description="Manage your portfolio projects, links, technologies and publishing status."
        actions={
          <>
            <button
              className="admin-ui-button"
              type="button"
              onClick={loadData}
            >
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

      <AdminAlert type="error">
        {error}
      </AdminAlert>

      <AdminAlert type="success">
        {message}
      </AdminAlert>

      <div className="admin-ui-stats">
        <div className="admin-ui-stat">
          <span>TOTAL</span>
          <strong>{projects.length}</strong>
          <small>All projects</small>
        </div>

        <div className="admin-ui-stat">
          <span>PUBLISHED</span>
          <strong>
            {
              projects.filter(
                (project) =>
                  project.status ===
                  "PUBLISHED"
              ).length
            }
          </strong>
          <small>Visible publicly</small>
        </div>

        <div className="admin-ui-stat">
          <span>DRAFTS</span>
          <strong>
            {
              projects.filter(
                (project) =>
                  project.status ===
                  "DRAFT"
              ).length
            }
          </strong>
          <small>Work in progress</small>
        </div>

        <div className="admin-ui-stat">
          <span>FEATURED</span>
          <strong>
            {
              projects.filter(
                (project) =>
                  project.isFeatured
              ).length
            }
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
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
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
          <div className="admin-project-list-grid">
            {filteredProjects.map(
              (project) => {
                const cover =
                  project?.images?.find(
                    (image) =>
                      image.isCover
                  ) ||
                  project?.images?.[0];

                return (
                  <article
                    className="admin-project-list-card admin-ui-card"
                    key={project.id}
                  >
                    <div className="admin-project-list-media">
                      {cover?.url ? (
                        <img
                          src={cover.url}
                          alt={
                            cover.altText ||
                            project.title
                          }
                        />
                      ) : (
                        <FiFolder />
                      )}
                    </div>

                    <div className="admin-project-list-content">
                      <div className="admin-project-list-heading">
                        <div>
                          <span>
                            {project.status}
                          </span>
                          <h3>
                            {project.title}
                          </h3>
                        </div>

                        {project.isFeatured && (
                          <span className="admin-ui-badge">
                            <FiStar />
                            Featured
                          </span>
                        )}
                      </div>

                      <p>
                        {project.shortDescription ||
                          "No short description."}
                      </p>

                      {project?.technologies
                        ?.length > 0 && (
                        <div className="admin-project-list-tech">
                          {project.technologies
                            .slice(0, 5)
                            .map(
                              (item) => (
                                <span
                                  key={
                                    item?.skill
                                      ?.id ||
                                    item.skillId
                                  }
                                >
                                  {item?.skill
                                    ?.name ||
                                    "Technology"}
                                </span>
                              )
                            )}
                        </div>
                      )}

                      <div className="admin-project-list-footer">
                        <div className="admin-ui-actions">
                          {project.liveUrl && (
                            <a
                              className="admin-ui-icon-button"
                              href={
                                project.liveUrl
                              }
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
                              href={
                                project.githubUrl
                              }
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
                            onClick={() =>
                              openEdit(
                                project
                              )
                            }
                            aria-label="Edit project"
                          >
                            <FiEdit2 />
                          </button>

                          <button
                            className="admin-ui-icon-button admin-ui-button-danger"
                            type="button"
                            onClick={() =>
                              remove(
                                project
                              )
                            }
                            aria-label="Delete project"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        )}
      </section>

      <AdminModal
        open={modalOpen}
        onClose={() =>
          setModalOpen(false)
        }
        eyebrow="PROJECT EDITOR"
        title={
          editingId
            ? "Edit Project"
            : "New Project"
        }
        size="lg"
        footer={
          <>
            <button
              className="admin-ui-button"
              type="button"
              onClick={() =>
                setModalOpen(false)
              }
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
                  Save Project
                </>
              )}
            </button>
          </>
        }
      >
        <form
          id="project-form"
          className="admin-project-form"
          onSubmit={save}
        >
          <section className="admin-project-form-section">
            <div className="admin-project-form-section-head">
              <span className="admin-project-form-number">
                01
              </span>

              <div>
                <h3>
                  Project details
                </h3>
                <p>
                  Add the basic information visitors will read first.
                </p>
              </div>
            </div>

            <div className="admin-ui-form-grid">
              <label className="admin-ui-field admin-ui-field-full">
                <span>
                  Project title
                </span>

                <input
                  name="title"
                  value={form.title}
                  onChange={change}
                  placeholder="e.g. ZsmartClass LMS"
                  required
                />
              </label>

              <label className="admin-ui-field admin-ui-field-full">
                <span>
                  Short description
                </span>

                <input
                  name="shortDescription"
                  value={
                    form.shortDescription
                  }
                  onChange={change}
                  placeholder="Short summary for the project card"
                />
              </label>

              <label className="admin-ui-field admin-ui-field-full">
                <span>
                  Full description
                </span>

                <textarea
                  name="description"
                  value={
                    form.description
                  }
                  onChange={change}
                  placeholder="Explain what the project does, your role and important features."
                />
              </label>
            </div>
          </section>

          <section className="admin-project-form-section">
            <div className="admin-project-form-section-head">
              <span className="admin-project-form-number">
                02
              </span>

              <div>
                <h3>
                  Media & links
                </h3>
                <p>
                  Add the project image and external links.
                </p>
              </div>
            </div>

            <div className="admin-project-media-row">
              <div className="admin-project-cover-preview">
                {form.coverImageUrl ? (
                  <img
                    src={
                      form.coverImageUrl
                    }
                    alt="Project cover preview"
                  />
                ) : (
                  <>
                    <FiImage />
                    <span>
                      Cover preview
                    </span>
                  </>
                )}
              </div>

              <label className="admin-ui-field">
                <span>
                  Cover image URL
                </span>

                <input
                  name="coverImageUrl"
                  type="url"
                  value={
                    form.coverImageUrl
                  }
                  onChange={change}
                  placeholder="https://..."
                />

                <small className="admin-project-field-note">
                  Image upload can be connected later; this field is ready for the stored image URL.
                </small>
              </label>
            </div>

            <div className="admin-ui-form-grid admin-project-links-grid">
              <label className="admin-ui-field">
                <span>
                  Live project URL
                </span>

                <div className="admin-project-input-icon">
                  <FiLink />

                  <input
                    name="liveUrl"
                    type="url"
                    value={
                      form.liveUrl
                    }
                    onChange={change}
                    placeholder="https://..."
                  />
                </div>
              </label>

              <label className="admin-ui-field">
                <span>
                  GitHub URL
                </span>

                <div className="admin-project-input-icon">
                  <FiGithub />

                  <input
                    name="githubUrl"
                    type="url"
                    value={
                      form.githubUrl
                    }
                    onChange={change}
                    placeholder="https://github.com/..."
                  />
                </div>
              </label>
            </div>
          </section>

          <section className="admin-project-form-section">
            <div className="admin-project-form-section-head">
              <span className="admin-project-form-number">
                03
              </span>

              <div>
                <h3>
                  Publishing
                </h3>
                <p>
                  Control visibility, ordering and project dates.
                </p>
              </div>
            </div>

            <div className="admin-project-status-control">
              {[
                ["DRAFT", "Draft"],
                [
                  "PUBLISHED",
                  "Published",
                ],
                [
                  "ARCHIVED",
                  "Archived",
                ],
              ].map(
                ([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={
                      form.status === value
                        ? "admin-project-status active"
                        : "admin-project-status"
                    }
                    onClick={() =>
                      setStatus(value)
                    }
                  >
                    <span />
                    {label}
                  </button>
                )
              )}
            </div>

            <div className="admin-ui-form-grid admin-project-date-grid">
              <label className="admin-ui-field">
                <span>
                  Display order
                </span>

                <input
                  name="displayOrder"
                  type="number"
                  value={
                    form.displayOrder
                  }
                  onChange={change}
                />
              </label>

              <label className="admin-ui-field">
                <span>
                  Started at
                </span>

                <input
                  name="startedAt"
                  type="date"
                  value={form.startedAt}
                  onChange={change}
                />
              </label>

              <label className="admin-ui-field">
                <span>
                  Completed at
                </span>

                <input
                  name="completedAt"
                  type="date"
                  value={
                    form.completedAt
                  }
                  onChange={change}
                  disabled={
                    form.isCurrent
                  }
                />
              </label>
            </div>

            <div className="admin-project-option-grid">
              <label
                className={
                  form.isFeatured
                    ? "admin-project-option active"
                    : "admin-project-option"
                }
              >
                <input
                  name="isFeatured"
                  type="checkbox"
                  checked={
                    form.isFeatured
                  }
                  onChange={change}
                />

                <span className="admin-project-option-check">
                  <FiCheck />
                </span>

                <span>
                  <strong>
                    Featured project
                  </strong>
                  <small>
                    Give this project extra emphasis.
                  </small>
                </span>
              </label>

              <label
                className={
                  form.isCurrent
                    ? "admin-project-option active"
                    : "admin-project-option"
                }
              >
                <input
                  name="isCurrent"
                  type="checkbox"
                  checked={
                    form.isCurrent
                  }
                  onChange={change}
                />

                <span className="admin-project-option-check">
                  <FiCheck />
                </span>

                <span>
                  <strong>
                    Current project
                  </strong>
                  <small>
                    Mark this project as ongoing.
                  </small>
                </span>
              </label>
            </div>
          </section>

          <section className="admin-project-form-section">
            <div className="admin-project-form-section-head admin-project-form-section-head-tech">
              <span className="admin-project-form-number">
                04
              </span>

              <div>
                <h3>
                  Technologies
                </h3>
                <p>
                  Select the technologies used in this project.
                </p>
              </div>

              <strong className="admin-project-selected-count">
                {
                  form.technologyIds
                    .length
                }{" "}
                selected
              </strong>
            </div>

            {skills.length === 0 ? (
              <div className="admin-project-tech-empty">
                Add skills first from the Skills page.
              </div>
            ) : (
              <div className="admin-project-tech-grid">
                {skills.map((skill) => {
                  const selected =
                    form.technologyIds.includes(
                      skill.id
                    );

                  return (
                    <label
                      key={skill.id}
                      className={
                        selected
                          ? "admin-project-tech-item active"
                          : "admin-project-tech-item"
                      }
                    >
                      <input
                        type="checkbox"
                        checked={
                          selected
                        }
                        onChange={() =>
                          toggleTechnology(
                            skill.id
                          )
                        }
                      />

                      <span className="admin-project-tech-check">
                        <FiCheck />
                      </span>

                      <strong>
                        {skill.name}
                      </strong>
                    </label>
                  );
                })}
              </div>
            )}
          </section>
        </form>
      </AdminModal>
    </div>
  );
}

export default AdminProjects;
