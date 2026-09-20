import { useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  FiArrowUpRight,
  FiCalendar,
  FiCode,
  FiGithub,
  FiMinus,
  FiPlus,
} from "react-icons/fi";

import "./Projects.css";

function Projects({
  projects = [],
  performanceMode = false,
}) {
  const [openProjectId, setOpenProjectId] =
    useState(null);

  const activeProjects =
    projects.filter(
      (project) =>
        project?.isActive !== false &&
        project?.status !== "ARCHIVED"
    );

  const getTitle = (project) =>
    project?.title ||
    project?.name ||
    "Project";

  const getProjectKey = (
    project,
    index
  ) =>
    project?.id ||
    project?.slug ||
    `${getTitle(project)}-${index}`;

  const getProjectImage = (
    project
  ) =>
    project?.thumbnailUrl ||
    project?.imageUrl ||
    project?.coverImage ||
    project?.coverImageUrl ||
    project?.images?.find(
      (image) => image?.isCover
    )?.url ||
    project?.images?.find(
      (image) => image?.isCover
    )?.imageUrl ||
    project?.projectImages?.find(
      (image) => image?.isCover
    )?.url ||
    project?.projectImages?.find(
      (image) => image?.isCover
    )?.imageUrl ||
    project?.images?.[0]?.url ||
    project?.images?.[0]?.imageUrl ||
    project?.projectImages?.[0]?.url ||
    project?.projectImages?.[0]?.imageUrl ||
    "";

  const getShortDescription = (
    project
  ) =>
    project?.shortDescription ||
    project?.summary ||
    project?.description ||
    "A full-stack project built with modern web technologies.";

  const getFullDescription = (
    project
  ) =>
    project?.description || "";

  const getTechnologies = (
    project
  ) => {
    const technologies =
      project?.technologies ||
      project?.projectTechnologies ||
      [];

    return technologies
      .map((item) => {
        if (
          typeof item === "string"
        ) {
          return item;
        }

        return (
          item?.name ||
          item?.technology ||
          item?.technologyName ||
          item?.skill?.name ||
          ""
        );
      })
      .filter(Boolean);
  };

  const getLiveUrl = (
    project
  ) =>
    project?.liveUrl ||
    project?.demoUrl ||
    project?.projectUrl ||
    "";

  const getGithubUrl = (
    project
  ) =>
    project?.githubUrl ||
    project?.repositoryUrl ||
    project?.repoUrl ||
    "";

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "";
    }

    return date.toLocaleDateString(
      "en-US",
      {
        month: "short",
        year: "numeric",
      }
    );
  };

  const getProjectPeriod = (
    project
  ) => {
    const start =
      formatDate(
        project?.startedAt
      );

    if (project?.isCurrent) {
      return start
        ? `${start} — Present`
        : "Current project";
    }

    const end =
      formatDate(
        project?.completedAt
      );

    if (start && end) {
      return `${start} — ${end}`;
    }

    return start || end || "";
  };

  const getProjectYear = (
    project
  ) => {
    if (project?.isCurrent) {
      return "NOW";
    }

    const value =
      project?.completedAt ||
      project?.startedAt;

    if (!value) {
      return "—";
    }

    const date = new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "—";
    }

    return String(
      date.getFullYear()
    );
  };

  const toggleProject = (
    projectKey
  ) => {
    setOpenProjectId(
      (current) =>
        current === projectKey
          ? null
          : projectKey
    );
  };

  return (
    <section
      id="projects"
      className="projects-section"
    >
      <div className="projects-grid-bg" />

      <div className="projects-container">
        <motion.div
          className="projects-section-label"
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          <span>04</span>
          <div />
          <strong>
            PROJECTS
          </strong>
        </motion.div>

        <div className="projects-header">
          <motion.div
            className="projects-header-copy"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.55,
            }}
          >
            <div className="projects-kicker">
              <span />
              SELECTED WORK
            </div>

            <h2>
              Selected work.
              <span>
                {" "}
                Built end to end.
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="projects-header-note"
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.55,
              delay: 0.08,
            }}
          >
            <span className="projects-header-count">
              {String(
                activeProjects.length
              ).padStart(
                2,
                "0"
              )}
            </span>

            <div>
              <strong>
                PROJECTS & BUILDS
              </strong>

              <p>
                Selected full-stack work
                across frontend, backend,
                databases and deployment.
              </p>
            </div>
          </motion.div>
        </div>

        {activeProjects.length === 0 ? (
          <div className="projects-empty">
            <div className="projects-empty-icon">
              <FiCode />
            </div>

            <span>
              PROJECT ARCHIVE
            </span>

            <h3>
              Projects will appear
              here.
            </h3>

            <p>
              Publish projects from the
              admin dashboard to show
              them in this section.
            </p>
          </div>
        ) : (
          <div className="project-index">
            {activeProjects.map(
              (
                project,
                index
              ) => {
                const projectKey =
                  getProjectKey(
                    project,
                    index
                  );

                const isOpen =
                  openProjectId ===
                  projectKey;

                const title =
                  getTitle(
                    project
                  );

                const image =
                  getProjectImage(
                    project
                  );

                const technologies =
                  getTechnologies(
                    project
                  );

                const period =
                  getProjectPeriod(
                    project
                  );

                const liveUrl =
                  getLiveUrl(
                    project
                  );

                const githubUrl =
                  getGithubUrl(
                    project
                  );

                const shortDescription =
                  getShortDescription(
                    project
                  );

                const fullDescription =
                  getFullDescription(
                    project
                  );

                return (
                  <motion.article
                    className={`project-index-item ${
                      isOpen
                        ? "project-index-item-open"
                        : ""
                    }`}
                    key={projectKey}
                    initial={{
                      opacity: 0,
                      y: 14,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.4,
                      delay:
                        index * 0.035,
                    }}
                  >
                    <button
                      type="button"
                      className="project-index-row"
                      onClick={() =>
                        toggleProject(
                          projectKey
                        )
                      }
                      aria-expanded={
                        isOpen
                      }
                      aria-controls={`project-panel-${index}`}
                    >
                      <span className="project-index-number-block">
                        <strong>
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </strong>

                      </span>

                      <span className="project-index-project">
                        <strong>
                          {title}
                        </strong>

                        <span className="project-index-description-preview">
                          {
                            shortDescription
                          }
                        </span>

                        <span className="project-index-tech-preview">
                          {technologies
                            .slice(
                              0,
                              5
                            )
                            .join(
                              "  /  "
                            ) ||
                            "Full-stack project"}
                        </span>
                      </span>

                      <span className="project-index-meta">
                        <span className="project-index-year">
                          {getProjectYear(
                            project
                          )}
                        </span>

                        <span className="project-index-status">
                          {project?.isCurrent ? (
                            <span className="project-status-current">
                              <i />
                              CURRENT
                            </span>
                          ) : project?.isFeatured ? (
                            <span>
                              FEATURED
                            </span>
                          ) : (
                            <span>
                              PROJECT
                            </span>
                          )}
                        </span>
                      </span>

                      <span className="project-index-open-copy">
                        {isOpen
                          ? "CLOSE"
                          : "VIEW"}
                      </span>

                      <span className="project-index-toggle">
                        {isOpen ? (
                          <FiMinus />
                        ) : (
                          <FiPlus />
                        )}
                      </span>
                    </button>

                    <AnimatePresence
                      initial={false}
                    >
                      {isOpen && (
                        <motion.div
                          id={`project-panel-${index}`}
                          className="project-detail"
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration:
                              performanceMode
                                ? 0.18
                                : 0.32,
                            ease:
                              "easeInOut",
                          }}
                        >
                          <div className="project-detail-inner">
                            <div className="project-detail-media">
                              {image ? (
                                <img
                                  src={image}
                                  alt={
                                    title
                                  }
                                />
                              ) : (
                                <div className="project-detail-fallback">
                                  <FiCode />

                                  <span>
                                    PROJECT
                                    PREVIEW
                                  </span>
                                </div>
                              )}

                              <span className="project-detail-index">
                                PROJECT /{" "}
                                {String(
                                  index + 1
                                ).padStart(
                                  2,
                                  "0"
                                )}
                              </span>
                            </div>

                            <div className="project-detail-content">
                              <div className="project-detail-topline">
                                <span>
                                  {project?.isFeatured
                                    ? "FEATURED BUILD"
                                    : "PROJECT DETAIL"}
                                </span>

                                {period && (
                                  <span className="project-detail-period">
                                    <FiCalendar />
                                    {period}
                                  </span>
                                )}
                              </div>

                              <h3>
                                {title}
                              </h3>

                              <p className="project-detail-summary">
                                {
                                  shortDescription
                                }
                              </p>

                              {fullDescription &&
                                fullDescription !==
                                  shortDescription && (
                                  <p className="project-detail-description">
                                    {
                                      fullDescription
                                    }
                                  </p>
                                )}

                              {technologies.length >
                                0 && (
                                <div className="project-detail-stack">
                                  <span>
                                    STACK
                                  </span>

                                  <div>
                                    {technologies
                                      .slice(
                                        0,
                                        10
                                      )
                                      .map(
                                        (
                                          technology,
                                          techIndex
                                        ) => (
                                          <span
                                            key={`${technology}-${techIndex}`}
                                          >
                                            {
                                              technology
                                            }
                                          </span>
                                        )
                                      )}
                                  </div>
                                </div>
                              )}

                              {(liveUrl ||
                                githubUrl) && (
                                <div className="project-detail-actions">
                                  {liveUrl && (
                                    <a
                                      href={
                                        liveUrl
                                      }
                                      target="_blank"
                                      rel="noreferrer"
                                      className="project-detail-primary"
                                    >
                                      Live project
                                      <FiArrowUpRight />
                                    </a>
                                  )}

                                  {githubUrl && (
                                    <a
                                      href={
                                        githubUrl
                                      }
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <FiGithub />
                                      GitHub
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              }
            )}
          </div>
        )}

        <div className="projects-footer">
          <span>
            BUILD / SHIP / ITERATE
          </span>

          <div />

          <span>
            FULL-STACK WORK
          </span>
        </div>
      </div>
    </section>
  );
}

export default Projects;
