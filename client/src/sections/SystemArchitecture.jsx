import { motion } from "framer-motion";

import {
  FiActivity,
  FiArrowRight,
  FiCheckCircle,
  FiCloud,
  FiCode,
  FiCpu,
  FiDatabase,
  FiGitBranch,
  FiLayers,
  FiServer,
  FiShield,
  FiTerminal,
  FiZap,
} from "react-icons/fi";

import "./SystemArchitecture.css";

function SystemArchitecture({
  skillCategories = [],
  projects = [],
  performanceMode = false,
}) {
  const activeSkills = skillCategories
    .filter((category) => category?.isActive !== false)
    .flatMap((category) =>
      (category?.skills || []).filter(
        (skill) => skill?.isActive !== false
      )
    );

  const activeProjects = projects.filter(
    (project) =>
      project?.status !== "ARCHIVED" &&
      project?.isActive !== false
  );

  const stages = [
    {
      step: "01",
      type: "CLIENT",
      title: "React Interface",
      detail: "Responsive UI, interactions and reusable components.",
      tech: "React + JavaScript",
      icon: <FiCode />,
    },
    {
      step: "02",
      type: "SERVER",
      title: "Express API",
      detail: "REST endpoints, authentication and application logic.",
      tech: "Node.js + Express",
      icon: <FiServer />,
    },
    {
      step: "03",
      type: "DATA ACCESS",
      title: "Prisma Layer",
      detail: "Typed queries, relations and controlled database access.",
      tech: "Prisma ORM",
      icon: <FiGitBranch />,
    },
    {
      step: "04",
      type: "DATABASE",
      title: "PostgreSQL",
      detail: "Relational data stored with a production-ready structure.",
      tech: "PostgreSQL + Neon",
      icon: <FiDatabase />,
    },
    {
      step: "05",
      type: "DELIVERY",
      title: "Cloud Deploy",
      detail: "Build, environment configuration and production delivery.",
      tech: "Vercel + Cloud",
      icon: <FiCloud />,
    },
  ];

  const runtimeLines = [
    {
      time: "00.012",
      label: "request",
      value: "GET /api/portfolio",
    },
    {
      time: "00.046",
      label: "auth",
      value: "admin/public route resolved",
    },
    {
      time: "00.093",
      label: "database",
      value: "Prisma → PostgreSQL",
    },
    {
      time: "00.128",
      label: "response",
      value: "JSON payload returned",
    },
    {
      time: "00.171",
      label: "render",
      value: "React interface updated",
    },
  ];

  const principles = [
    {
      icon: <FiLayers />,
      title: "End-to-end thinking",
      text: "I design features across frontend, API and data layers.",
    },
    {
      icon: <FiShield />,
      title: "Maintainable structure",
      text: "Reusable components, protected routes and clear data models.",
    },
    {
      icon: <FiZap />,
      title: "Production mindset",
      text: "Development decisions include deployment and real usage.",
    },
  ];

  return (
    <section
      id="architecture"
      className="architecture-section"
    >
      <div className="architecture-background-grid" />
      <div className="architecture-glow architecture-glow-left" />
      <div className="architecture-glow architecture-glow-right" />

      <div className="architecture-container">
        <motion.div
          className="architecture-section-label"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <span>04</span>
          <div />
          <strong>SYSTEM ARCHITECTURE</strong>
        </motion.div>

        <div className="architecture-header">
          <motion.div
            className="architecture-heading"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
          >
            <div className="architecture-live-label">
              <i />
              FULL-STACK SYSTEM ONLINE
            </div>

            <h2>
              One request.
              <span> Five layers. One complete product.</span>
            </h2>
          </motion.div>

          <motion.div
            className="architecture-intro"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            <p>
              I build beyond the screen. Each feature moves through a complete
              engineering path—from interface interaction to API logic,
              database operations and production delivery.
            </p>

            <div className="architecture-intro-meta">
              <span>
                <FiActivity />
                LIVE REQUEST FLOW
              </span>
              <code>GET /api/portfolio</code>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="architecture-workbench"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.16 }}
          transition={{ duration: 0.75 }}
        >
          <div className="architecture-workbench-topbar">
            <div className="architecture-window-controls">
              <i />
              <i />
              <i />
            </div>

            <div className="architecture-file">
              <FiCpu />
              <span>fullstack.pipeline</span>
            </div>

            <div className="architecture-workbench-status">
              <span />
              RUNNING
            </div>
          </div>

          <div className="architecture-map">
            <motion.div
              className="architecture-map-scan"
              animate={{
                x: ["-20%", "120%"],
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                duration: 4.8,
                repeat: performanceMode ? 0 : Infinity,
                ease: "linear",
              }}
            />

            <div className="architecture-map-caption">
              <div>
                <span>REQUEST PIPELINE</span>
                <strong>Interface → production</strong>
              </div>

              <div className="architecture-map-badge">
                <span />
                200 OK
              </div>
            </div>

            <div className="architecture-flow">
              {stages.map((stage, index) => (
                <div className="architecture-stage-wrap" key={stage.step}>
                  <motion.article
                    className="architecture-stage"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                    }}
                    whileHover={{
                      y: -7,
                      scale: 1.015,
                    }}
                  >
                    <div className="architecture-stage-top">
                      <span>{stage.step}</span>

                      <div className="architecture-stage-icon">
                        {stage.icon}
                      </div>
                    </div>

                    <div className="architecture-stage-copy">
                      <span>{stage.type}</span>
                      <h3>{stage.title}</h3>
                      <p>{stage.detail}</p>
                    </div>

                    <code>{stage.tech}</code>
                  </motion.article>

                  {index < stages.length - 1 && (
                    <div className="architecture-link" aria-hidden="true">
                      <div className="architecture-link-line">
                        <motion.span
                          animate={{
                            x: [0, 42, 0],
                            opacity: [0.15, 1, 0.15],
                          }}
                          transition={{
                            duration: 1.9,
                            repeat: performanceMode ? 0 : Infinity,
                            delay: index * 0.18,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                      <FiArrowRight />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="architecture-runtime">
            <div className="architecture-terminal">
              <div className="architecture-terminal-header">
                <div>
                  <FiTerminal />
                  <span>runtime.trace</span>
                </div>

                <strong>
                  <i />
                  LIVE
                </strong>
              </div>

              <div className="architecture-terminal-body">
                {runtimeLines.map((line, index) => (
                  <motion.div
                    className="architecture-terminal-row"
                    key={line.label}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: 0.25 + index * 0.11,
                    }}
                  >
                    <span>{line.time}</span>
                    <strong>{line.label}</strong>
                    <code>{line.value}</code>
                    <FiCheckCircle />
                  </motion.div>
                ))}

                <motion.div
                  className="architecture-terminal-cursor"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1,
                    repeat: performanceMode ? 0 : Infinity,
                  }}
                >
                  <span>$</span>
                  <i />
                </motion.div>
              </div>
            </div>

            <div className="architecture-system-overview">
              <div className="architecture-overview-heading">
                <span>PORTFOLIO ENGINE</span>
                <strong>System overview</strong>
              </div>

              <div className="architecture-overview-stats">
                <div>
                  <span>TECHNOLOGIES</span>
                  <strong>
                    {String(activeSkills.length).padStart(2, "0")}
                  </strong>
                  <small>active stack nodes</small>
                </div>

                <div>
                  <span>PROJECTS</span>
                  <strong>
                    {String(activeProjects.length).padStart(2, "0")}
                  </strong>
                  <small>portfolio builds</small>
                </div>

                <div>
                  <span>LAYERS</span>
                  <strong>05</strong>
                  <small>delivery stages</small>
                </div>

                <div>
                  <span>CONTENT</span>
                  <strong>API</strong>
                  <small>database driven</small>
                </div>
              </div>

              <div className="architecture-overview-route">
                <div className="architecture-route-pulse" />
                <div>
                  <span>CURRENT FLOW</span>
                  <strong>Client → API → ORM → DB → UI</strong>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="architecture-principles">
          {principles.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
              whileHover={{ y: -4 }}
            >
              <div>{item.icon}</div>
              <span>
                <strong>{item.title}</strong>
                <small>{item.text}</small>
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SystemArchitecture;
