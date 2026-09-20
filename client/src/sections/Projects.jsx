import { motion } from "framer-motion";

import {
  FiArrowUpRight,
  FiCalendar,
  FiCode,
  FiExternalLink,
  FiGithub,
  FiLayers,
} from "react-icons/fi";

import "./Projects.css";

function Projects({
  projects = [],
  performanceMode = false,
}) {
  const activeProjects =
    projects.filter(
      (project) =>
        project?.isActive !== false &&
        project?.status !== "ARCHIVED"
    );

  const getProjectImage = (
    project
  ) =>
    project?.thumbnailUrl ||
    project?.imageUrl ||
    project?.coverImage ||
    project?.coverImageUrl ||
    project?.projectImages?.find(
      (image) => image?.isCover
    )?.imageUrl ||
    project?.projectImages?.find(
      (image) => image?.isCover
    )?.url ||
    project?.images?.find(
      (image) => image?.isCover
    )?.imageUrl ||
    project?.images?.find(
      (image) => image?.isCover
    )?.url ||
    project?.projectImages?.[0]
      ?.imageUrl ||
    project?.projectImages?.[0]?.url ||
    project?.images?.[0]?.imageUrl ||
    project?.images?.[0]?.url ||
    "";

  const getTitle = (project) =>
    project?.title ||
    project?.name ||
    "Project";

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

  const featuredProject =
    activeProjects.find(
      (project) =>
        project?.isFeatured ===
          true ||
        project?.featured ===
          true
    ) ||
    activeProjects[0] ||
    null;

  const remainingProjects =
    featuredProject
      ? activeProjects.filter(
          (project) =>
            project !==
            featuredProject
        )
      : [];

  const renderLinks = (
    project,
    compact = false
  ) => {
    const liveUrl =
      getLiveUrl(project);

    const githubUrl =
      getGithubUrl(project);

    if (
      !liveUrl &&
      !githubUrl
    ) {
      return null;
    }

    return (
      <div
        className={
          compact
            ? "project-card-links project-card-links-compact"
            : "project-card-links"
        }
      >
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="project-card-link project-card-link-primary"
          >
            <span>
              Live project
            </span>

            <FiArrowUpRight />
          </a>
        )}

        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="project-card-link"
          >
            <FiGithub />

            <span>
              Source
            </span>
          </a>
        )}
      </div>
    );
  };

  return (
    <section
      id="projects"
      className="projects-section"
    >
      <div className="projects-grid-bg" />

      <div className="projects-glow projects-glow-one" />
      <div className="projects-glow projects-glow-two" />

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
          <span>
            04
          </span>

          <div />

          <strong>
            SELECTED PROJECTS
          </strong>
        </motion.div>

        <div className="projects-header">
          <motion.div
            className="projects-header-copy"
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <div className="projects-kicker">
              <span />

              BUILD / SHIP / IMPROVE
            </div>

            <h2>
              Products I’ve
              <span>
                {" "}
                taken from idea to
                interface.
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
                PUBLISHED BUILDS
              </strong>

              <p>
                Full-stack work covering
                UI, APIs, data and
                deployment.
              </p>
            </div>
          </motion.div>
        </div>

        {!featuredProject ? (
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
          <div className="projects-content">
            <motion.article
              className="project-spotlight"
              initial={{
                opacity: 0,
                y: 28,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.65,
              }}
            >
              <div className="project-spotlight-media">
                {getProjectImage(
                  featuredProject
                ) ? (
                  <img
                    src={getProjectImage(
                      featuredProject
                    )}
                    alt={
                      getTitle(
                        featuredProject
                      )
                    }
                  />
                ) : (
                  <div className="project-media-fallback">
                    <div className="project-media-fallback-icon">
                      <FiCode />
                    </div>

                    <span>
                      FULL-STACK PROJECT
                    </span>
                  </div>
                )}

                <div className="project-spotlight-overlay" />

                <div className="project-spotlight-badges">
                  <span>
                    FEATURED
                  </span>

                  {featuredProject?.isCurrent && (
                    <span className="project-live-badge">
                      <i />
                      CURRENT
                    </span>
                  )}
                </div>

                <div className="project-spotlight-media-bottom">
                  <span>
                    PROJECT / 01
                  </span>

                  <FiLayers />
                </div>
              </div>

              <div className="project-spotlight-content">
                <div className="project-spotlight-heading">
                  <div>
                    <span>
                      CASE STUDY
                    </span>

                    <h3>
                      {getTitle(
                        featuredProject
                      )}
                    </h3>
                  </div>

                  {getProjectPeriod(
                    featuredProject
                  ) && (
                    <div className="project-period">
                      <FiCalendar />

                      <span>
                        {getProjectPeriod(
                          featuredProject
                        )}
                      </span>
                    </div>
                  )}
                </div>

                <p className="project-spotlight-summary">
                  {getShortDescription(
                    featuredProject
                  )}
                </p>

                {getFullDescription(
                  featuredProject
                ) &&
                  getFullDescription(
                    featuredProject
                  ) !==
                    getShortDescription(
                      featuredProject
                    ) && (
                    <p className="project-spotlight-description">
                      {getFullDescription(
                        featuredProject
                      )}
                    </p>
                  )}

                {getTechnologies(
                  featuredProject
                ).length >
                  0 && (
                  <div className="project-stack">
                    <span>
                      STACK
                    </span>

                    <div>
                      {getTechnologies(
                        featuredProject
                      )
                        .slice(
                          0,
                          9
                        )
                        .map(
                          (
                            technology,
                            index
                          ) => (
                            <span
                              key={`${technology}-${index}`}
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

                {renderLinks(
                  featuredProject
                )}
              </div>
            </motion.article>

            {remainingProjects.length >
              0 && (
              <div className="projects-library">
                <div className="projects-library-heading">
                  <span>
                    MORE PROJECTS
                  </span>

                  <span>
                    {String(
                      remainingProjects.length
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>
                </div>

                <div className="projects-library-grid">
                  {remainingProjects.map(
                    (
                      project,
                      index
                    ) => (
                      <motion.article
                        className="project-card"
                        key={
                          project?.id ||
                          getTitle(
                            project
                          ) ||
                          index
                        }
                        initial={{
                          opacity: 0,
                          y: 22,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.12,
                        }}
                        transition={{
                          duration: 0.52,
                          delay:
                            index *
                            0.05,
                        }}
                      >
                        <div className="project-card-media">
                          {getProjectImage(
                            project
                          ) ? (
                            <img
                              src={getProjectImage(
                                project
                              )}
                              alt={
                                getTitle(
                                  project
                                )
                              }
                            />
                          ) : (
                            <div className="project-card-fallback">
                              <FiCode />
                            </div>
                          )}

                          <div className="project-card-media-shade" />

                          <span className="project-card-index">
                            {String(
                              index + 2
                            ).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          {project?.isCurrent && (
                            <span className="project-card-current">
                              <i />
                              CURRENT
                            </span>
                          )}
                        </div>

                        <div className="project-card-body">
                          <div className="project-card-title-row">
                            <h3>
                              {getTitle(
                                project
                              )}
                            </h3>

                            {(getLiveUrl(
                              project
                            ) ||
                              getGithubUrl(
                                project
                              )) && (
                              <FiExternalLink />
                            )}
                          </div>

                          {getProjectPeriod(
                            project
                          ) && (
                            <div className="project-card-period">
                              <FiCalendar />

                              <span>
                                {getProjectPeriod(
                                  project
                                )}
                              </span>
                            </div>
                          )}

                          <p>
                            {getShortDescription(
                              project
                            )}
                          </p>

                          {getTechnologies(
                            project
                          ).length >
                            0 && (
                            <div className="project-card-tech">
                              {getTechnologies(
                                project
                              )
                                .slice(
                                  0,
                                  5
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
                          )}

                          {renderLinks(
                            project,
                            true
                          )}
                        </div>
                      </motion.article>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="projects-footer">
          <span>
            FRONTEND / BACKEND /
            DATA
          </span>

          <div />

          <span>
            BUILD • SHIP • LEARN
          </span>
        </div>
      </div>
    </section>
  );
}

export default Projects;
