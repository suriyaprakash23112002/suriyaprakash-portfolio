import { motion } from "framer-motion";

import {
  FiArrowUpRight,
  FiGithub,
  FiExternalLink,
  FiCode,
  FiLayers,
} from "react-icons/fi";

import "./Projects.css";

function Projects({ projects = [] }) {
  /* =====================================================
     ACTIVE PROJECTS
  ===================================================== */

  const activeProjects = projects.filter(
    (project) =>
      project?.isActive !== false &&
      project?.status !== "ARCHIVED"
  );

  /* =====================================================
     HELPERS
  ===================================================== */

  const getProjectImage = (project) => {
    return (
      project?.thumbnailUrl ||
      project?.imageUrl ||
      project?.coverImage ||
      project?.projectImages?.[0]?.imageUrl ||
      project?.projectImages?.[0]?.url ||
      project?.images?.[0]?.imageUrl ||
      project?.images?.[0]?.url ||
      ""
    );
  };

  const getDescription = (project) => {
    return (
      project?.shortDescription ||
      project?.summary ||
      project?.description ||
      "A full-stack project built with modern web technologies."
    );
  };

  const getTechnologies = (project) => {
    const technologies =
      project?.technologies ||
      project?.projectTechnologies ||
      [];

    return technologies
      .map((item) => {
        if (typeof item === "string") {
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

  const getLiveUrl = (project) => {
    return (
      project?.liveUrl ||
      project?.demoUrl ||
      project?.projectUrl ||
      ""
    );
  };

  const getGithubUrl = (project) => {
    return (
      project?.githubUrl ||
      project?.repositoryUrl ||
      project?.repoUrl ||
      ""
    );
  };

  const scrollNumber = (index) =>
    String(index + 1).padStart(2, "0");

  const featuredProject =
    activeProjects.find(
      (project) =>
        project?.isFeatured === true ||
        project?.featured === true
    ) || activeProjects[0];

  const otherProjects = featuredProject
    ? activeProjects.filter(
        (project) =>
          project !== featuredProject
      )
    : [];

  return (
    <section
      id="projects"
      className="projects-section"
    >
      {/* BACKGROUND */}

      <div className="projects-grid" />

      <div className="projects-glow projects-glow-one" />

      <div className="projects-glow projects-glow-two" />

      <div className="projects-container">
        {/* ============================================
            SECTION LABEL
        ============================================ */}

        <motion.div
          className="projects-section-label"
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
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

        {/* ============================================
            HEADER
        ============================================ */}

        <div className="projects-header">
          <motion.div
            className="projects-heading"
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="projects-status">
              <span />

              DEVELOPMENT WORK
            </div>

            <h2>
              Projects built from
              <span>
                {" "}
                idea to deployment.
              </span>
            </h2>
          </motion.div>

          <motion.p
            className="projects-intro"
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
              duration: 0.6,
              delay: 0.1,
            }}
          >
            A selection of applications
            where I worked across
            frontend interfaces, backend
            APIs, databases and
            deployment.
          </motion.p>
        </div>

        {/* ============================================
            PROJECTS
        ============================================ */}

        {featuredProject ? (
          <div className="projects-showcase">
            {/* ========================================
                FEATURED PROJECT
            ======================================== */}

            <motion.article
              className="project-featured"
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.75,
              }}
            >
              {/* IMAGE */}

              <div className="project-featured-media">
                {getProjectImage(
                  featuredProject
                ) ? (
                  <img
                    src={getProjectImage(
                      featuredProject
                    )}
                    alt={
                      featuredProject?.title ||
                      featuredProject?.name ||
                      "Project"
                    }
                  />
                ) : (
                  <div className="project-image-fallback">
                    <motion.div
                      animate={{
                        rotate: [
                          0,
                          4,
                          0,
                          -4,
                          0,
                        ],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                      }}
                    >
                      <FiCode />
                    </motion.div>

                    <span>
                      FULL-STACK PROJECT
                    </span>
                  </div>
                )}

                <div className="project-featured-overlay" />

                <div className="project-featured-top">
                  <span>
                    FEATURED PROJECT
                  </span>

                  <span>
                    01
                  </span>
                </div>

                <div className="project-featured-bottom">
                  <div>
                    <span>
                      CASE STUDY
                    </span>

                    <strong>
                      {featuredProject?.title ||
                        featuredProject?.name ||
                        "Project"}
                    </strong>
                  </div>

                  <FiArrowUpRight />
                </div>
              </div>

              {/* FEATURED CONTENT */}

              <div className="project-featured-content">
                <div className="project-featured-heading">
                  <div>
                    <span>
                      PROJECT / 01
                    </span>

                    <h3>
                      {featuredProject?.title ||
                        featuredProject?.name ||
                        "Project"}
                    </h3>
                  </div>

                  <div className="project-featured-index">
                    <FiLayers />
                  </div>
                </div>

                <p>
                  {getDescription(
                    featuredProject
                  )}
                </p>

                {getTechnologies(
                  featuredProject
                ).length > 0 && (
                  <div className="project-technologies">
                    {getTechnologies(
                      featuredProject
                    )
                      .slice(0, 7)
                      .map(
                        (
                          technology,
                          index
                        ) => (
                          <span
                            key={`${technology}-${index}`}
                          >
                            {technology}
                          </span>
                        )
                      )}
                  </div>
                )}

                <div className="project-featured-actions">
                  {getLiveUrl(
                    featuredProject
                  ) && (
                    <a
                      href={getLiveUrl(
                        featuredProject
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="project-live-button"
                    >
                      View Project

                      <FiArrowUpRight />
                    </a>
                  )}

                  {getGithubUrl(
                    featuredProject
                  ) && (
                    <a
                      href={getGithubUrl(
                        featuredProject
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="project-github-button"
                    >
                      <FiGithub />

                      Source
                    </a>
                  )}
                </div>
              </div>
            </motion.article>

            {/* ========================================
                OTHER PROJECTS
            ======================================== */}

            <div className="projects-list">
              <div className="projects-list-header">
                <span>
                  MORE WORK
                </span>

                <span>
                  {String(
                    otherProjects.length
                  ).padStart(2, "0")}
                </span>
              </div>

              {otherProjects.length >
              0 ? (
                otherProjects.map(
                  (project, index) => (
                    <motion.article
                      className="project-list-item"
                      key={
                        project.id ||
                        project.title ||
                        index
                      }
                      initial={{
                        opacity: 0,
                        x: 25,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.55,
                        delay:
                          index * 0.07,
                      }}
                    >
                      <div className="project-list-number">
                        {scrollNumber(
                          index + 1
                        )}
                      </div>

                      <div className="project-list-content">
                        <div className="project-list-title">
                          <h3>
                            {project?.title ||
                              project?.name ||
                              "Project"}
                          </h3>

                          {(getLiveUrl(
                            project
                          ) ||
                            getGithubUrl(
                              project
                            )) && (
                            <FiArrowUpRight />
                          )}
                        </div>

                        <p>
                          {getDescription(
                            project
                          )}
                        </p>

                        {getTechnologies(
                          project
                        ).length > 0 && (
                          <div className="project-list-tech">
                            {getTechnologies(
                              project
                            )
                              .slice(0, 4)
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

                        <div className="project-list-links">
                          {getLiveUrl(
                            project
                          ) && (
                            <a
                              href={getLiveUrl(
                                project
                              )}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Live

                              <FiExternalLink />
                            </a>
                          )}

                          {getGithubUrl(
                            project
                          ) && (
                            <a
                              href={getGithubUrl(
                                project
                              )}
                              target="_blank"
                              rel="noreferrer"
                            >
                              GitHub

                              <FiGithub />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  )
                )
              ) : (
                <div className="projects-list-empty">
                  <span>
                    01
                  </span>

                  <p>
                    More projects will
                    appear here as they
                    are added.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ===========================================
             EMPTY STATE
          =========================================== */

          <motion.div
            className="projects-empty"
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <div className="projects-empty-icon">
              <FiCode />
            </div>

            <span>
              PROJECT ARCHIVE
            </span>

            <h3>
              Projects are being
              prepared.
            </h3>

            <p>
              Published projects will
              appear here automatically
              from the portfolio admin
              dashboard.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Projects;