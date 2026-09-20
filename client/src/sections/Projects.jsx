import { motion } from "framer-motion";

import {
  FiArrowUpRight,
  FiCalendar,
  FiCode,
  FiExternalLink,
  FiGithub,
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

  const getTitle = (project) =>
    project?.title ||
    project?.name ||
    "Project";

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
    project?.images?.[0]?.url ||
    project?.images?.[0]?.imageUrl ||
    "";

  const getDescription = (
    project
  ) =>
    project?.shortDescription ||
    project?.summary ||
    project?.description ||
    "A full-stack project built with modern web technologies.";

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

  const getPeriod = (project) => {
    const start =
      formatDate(
        project?.startedAt
      );

    if (project?.isCurrent) {
      return start
        ? `${start} — Present`
        : "Current";
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
              y: 22,
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
              Real projects.
              <span>
                {" "}
                Clear outcomes.
              </span>
            </h2>

            <p>
              A focused collection of
              applications I’ve built
              across frontend, backend,
              databases and deployment.
            </p>
          </motion.div>

          <div className="projects-count-block">
            <span>
              {String(
                activeProjects.length
              ).padStart(
                2,
                "0"
              )}
            </span>

            <div>
              <strong>
                PROJECTS
              </strong>

              <small>
                Published work
              </small>
            </div>
          </div>
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
              Projects will appear here.
            </h3>

            <p>
              Publish projects from the
              admin dashboard to show
              them in this section.
            </p>
          </div>
        ) : (
          <div className="projects-grid-list">
            {activeProjects.map(
              (
                project,
                index
              ) => {
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
                  getPeriod(
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

                return (
                  <motion.article
                    className="project-card"
                    key={
                      project?.id ||
                      `${title}-${index}`
                    }
                    initial={{
                      opacity: 0,
                      y: 26,
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
                      duration: 0.5,
                      delay:
                        index * 0.05,
                    }}
                  >
                    <div className="project-card-media">
                      {image ? (
                        <img
                          src={image}
                          alt={title}
                        />
                      ) : (
                        <div className="project-card-fallback">
                          <FiCode />

                          <span>
                            PROJECT
                          </span>
                        </div>
                      )}

                      <div className="project-card-overlay" />

                      <div className="project-card-top">
                        <span className="project-card-number">
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <div className="project-card-badges">
                          {project?.isFeatured && (
                            <span>
                              FEATURED
                            </span>
                          )}

                          {project?.isCurrent && (
                            <span className="project-card-current">
                              <i />
                              CURRENT
                            </span>
                          )}
                        </div>
                      </div>

                      {(liveUrl ||
                        githubUrl) && (
                        <div className="project-card-media-link">
                          <FiExternalLink />
                        </div>
                      )}
                    </div>

                    <div className="project-card-content">
                      <div className="project-card-heading">
                        <h3>
                          {title}
                        </h3>

                        {period && (
                          <div className="project-card-period">
                            <FiCalendar />

                            <span>
                              {period}
                            </span>
                          </div>
                        )}
                      </div>

                      <p>
                        {getDescription(
                          project
                        )}
                      </p>

                      {technologies.length >
                        0 && (
                        <div className="project-card-tech">
                          {technologies
                            .slice(
                              0,
                              6
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

                      {(liveUrl ||
                        githubUrl) && (
                        <div className="project-card-actions">
                          {liveUrl && (
                            <a
                              href={
                                liveUrl
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="project-action-primary"
                            >
                              View project

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
                              className="project-action-secondary"
                            >
                              <FiGithub />

                              Source
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.article>
                );
              }
            )}
          </div>
        )}

        <div className="projects-footer">
          <span>
            DESIGN / DEVELOP / DEPLOY
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
