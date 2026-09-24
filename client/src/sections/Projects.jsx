import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiChevronDown,
  FiCode,
  FiGithub,
} from "react-icons/fi";
import "./Projects.css";

function Projects({ projects = [] }) {
  const [openId, setOpenId] = useState(null);

  const activeProjects = projects.filter(
    (project) =>
      project?.isActive !== false &&
      project?.status !== "ARCHIVED"
  );

  const titleOf = (project) =>
    project?.title || project?.name || "Project";

  const imageOf = (project) =>
    project?.thumbnailUrl ||
    project?.imageUrl ||
    project?.coverImage ||
    project?.coverImageUrl ||
    project?.images?.find((image) => image?.isCover)?.url ||
    project?.images?.find((image) => image?.isCover)?.imageUrl ||
    project?.images?.[0]?.url ||
    project?.images?.[0]?.imageUrl ||
    "";

  const techOf = (project) =>
    (project?.technologies || project?.projectTechnologies || [])
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

  const descriptionOf = (project) =>
    project?.shortDescription ||
    project?.summary ||
    project?.description ||
    "A full-stack project built around a practical business need.";

  const liveOf = (project) =>
    project?.liveUrl || project?.demoUrl || project?.projectUrl || "";

  const githubOf = (project) =>
    project?.githubUrl || project?.repositoryUrl || project?.repoUrl || "";

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <motion.div
          className="projects-heading"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <span>03 — SELECTED WORK</span>

          <div className="projects-heading-row">
            <h2>
              Work that shows
              <em> how I solve.</em>
            </h2>

            <div>
              <strong>{String(activeProjects.length).padStart(2, "0")}</strong>
              <p>
                Real builds across websites, applications, APIs and deployment.
              </p>
            </div>
          </div>
        </motion.div>

        {activeProjects.length === 0 ? (
          <div className="projects-empty">
            <FiCode />
            <h3>Projects will appear here.</h3>
          </div>
        ) : (
          <div className="projects-list">
            {activeProjects.map((project, index) => {
              const key = project?.id || titleOf(project) + "-" + index;
              const open = openId === key;
              const technologies = techOf(project);

              return (
                <motion.article
                  className={"project-case " + (open ? "project-case-open" : "")}
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                >
                  <button
                    type="button"
                    className="project-case-trigger"
                    onClick={() => setOpenId(open ? null : key)}
                    aria-expanded={open}
                  >
                    <span className="project-case-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="project-case-title">
                      <strong>{titleOf(project)}</strong>
                      <small>
                        {technologies.slice(0, 5).join(" / ") ||
                          "Full-stack project"}
                      </small>
                    </span>

                    <span className="project-case-summary">
                      {descriptionOf(project)}
                    </span>

                    <span className="project-case-view">
                      {open ? "Close" : "View case"}
                      <FiChevronDown />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        className="project-case-detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                      >
                        <div className="project-case-detail-inner">
                          <div className="project-case-media">
                            {imageOf(project) ? (
                              <img src={imageOf(project)} alt={titleOf(project)} />
                            ) : (
                              <div className="project-case-fallback">
                                <FiCode />
                                <span>PROJECT PREVIEW</span>
                              </div>
                            )}
                          </div>

                          <div className="project-case-copy">
                            <span>PROJECT OVERVIEW</span>
                            <h3>{titleOf(project)}</h3>

                            <p>
                              {project?.description || descriptionOf(project)}
                            </p>

                            {technologies.length > 0 && (
                              <div className="project-case-stack">
                                {technologies.slice(0, 10).map((tech) => (
                                  <span key={tech}>{tech}</span>
                                ))}
                              </div>
                            )}

                            <div className="project-case-actions">
                              {liveOf(project) && (
                                <a
                                  href={liveOf(project)}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Live project
                                  <FiArrowUpRight />
                                </a>
                              )}

                              {githubOf(project) && (
                                <a
                                  href={githubOf(project)}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <FiGithub />
                                  Source
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
