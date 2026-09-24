import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCode,
  FiGithub,
} from "react-icons/fi";

import "./Projects.css";

function Projects({ projects = [] }) {
  const activeProjects = projects.filter(
    (project) =>
      project?.isActive !== false &&
      project?.status !== "ARCHIVED"
  );

  const getTitle = (project) =>
    project?.title ||
    project?.name ||
    "Project";

  const getImage = (project) =>
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

  const getDescription = (project) =>
    project?.shortDescription ||
    project?.summary ||
    project?.description ||
    "A complete web project built around a real business need.";

  const getTechnologies = (project) =>
    (
      project?.technologies ||
      project?.projectTechnologies ||
      []
    )
      .map((item) =>
        typeof item === "string"
          ? item
          : item?.name ||
            item?.technology ||
            item?.technologyName ||
            item?.skill?.name ||
            ""
      )
      .filter(Boolean);

  const getLiveUrl = (project) =>
    project?.liveUrl ||
    project?.demoUrl ||
    project?.projectUrl ||
    "";

  const getGithubUrl = (project) =>
    project?.githubUrl ||
    project?.repositoryUrl ||
    project?.repoUrl ||
    "";

  return (
    <section
      id="projects"
      className="projects-section"
    >
      <div className="projects-container">
        <motion.div
          className="projects-header"
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.56,
          }}
        >
          <span className="projects-label">
            03 / SELECTED WORK
          </span>

          <div className="projects-heading-row">
            <h2>
              Projects that show
              <span>
                {" "}
                how I work.
              </span>
            </h2>

            <div className="projects-count">
              <strong>
                {String(
                  activeProjects.length
                ).padStart(
                  2,
                  "0"
                )}
              </strong>

              <p>
                Selected builds across
                websites, applications,
                APIs and deployment.
              </p>
            </div>
          </div>
        </motion.div>

        {activeProjects.length ===
        0 ? (
          <div className="projects-empty">
            <FiCode />
            <h3>
              Projects will appear here.
            </h3>
          </div>
        ) : (
          <div className="projects-list">
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
                  getImage(
                    project
                  );

                const technologies =
                  getTechnologies(
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
                    className={
                      "project-showcase " +
                      (index %
                        2 ===
                      1
                        ? "project-showcase-reverse"
                        : "")
                    }
                    key={
                      project?.id ||
                      title +
                        "-" +
                        index
                    }
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
                      amount: 0.16,
                    }}
                    transition={{
                      duration: 0.58,
                      delay:
                        index *
                        0.04,
                    }}
                  >
                    <div className="project-media">
                      {image ? (
                        <img
                          src={image}
                          alt={title}
                        />
                      ) : (
                        <div className="project-media-fallback">
                          <FiCode />
                          <span>
                            PROJECT PREVIEW
                          </span>
                        </div>
                      )}

                      <span className="project-number">
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>
                    </div>

                    <div className="project-content">
                      <div className="project-topline">
                        <span>
                          {project?.isCurrent
                            ? "CURRENT PROJECT"
                            : project?.isFeatured
                            ? "FEATURED PROJECT"
                            : "PROJECT"}
                        </span>

                        <div />
                      </div>

                      <h3>
                        {title}
                      </h3>

                      <p>
                        {getDescription(
                          project
                        )}
                      </p>

                      {technologies.length >
                        0 && (
                        <div className="project-stack">
                          {technologies
                            .slice(
                              0,
                              8
                            )
                            .map(
                              (
                                technology
                              ) => (
                                <span
                                  key={
                                    technology
                                  }
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
                        <div className="project-actions">
                          {liveUrl && (
                            <a
                              href={
                                liveUrl
                              }
                              target="_blank"
                              rel="noreferrer"
                            >
                              View live
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
                              className="project-source"
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
      </div>
    </section>
  );
}

export default Projects;
