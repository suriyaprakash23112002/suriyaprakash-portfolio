import { motion } from "framer-motion";

import {
  FiActivity,
  FiArrowRight,
  FiCloud,
  FiCode,
  FiDatabase,
  FiGitBranch,
  FiServer,
  FiTerminal,
} from "react-icons/fi";

import "./SystemArchitecture.css";

function SystemArchitecture({
  skillCategories = [],
  projects = [],
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

  const flow = [
    {
      step: "01",
      label: "Interface",
      title: "React UI",
      detail: "Responsive views, interactions and component-driven interfaces.",
      icon: <FiCode />,
      command: "client → event",
    },
    {
      step: "02",
      label: "Application",
      title: "Node + Express",
      detail: "REST APIs, validation, authentication and business logic.",
      icon: <FiServer />,
      command: "request → api",
    },
    {
      step: "03",
      label: "Data layer",
      title: "Prisma ORM",
      detail: "Typed data access, relational models and controlled migrations.",
      icon: <FiGitBranch />,
      command: "service → prisma",
    },
    {
      step: "04",
      label: "Database",
      title: "PostgreSQL",
      detail: "Structured relational data backed by PostgreSQL / Neon.",
      icon: <FiDatabase />,
      command: "query → data",
    },
    {
      step: "05",
      label: "Delivery",
      title: "Cloud Deploy",
      detail: "Frontend and backend prepared for production deployment.",
      icon: <FiCloud />,
      command: "build → production",
    },
  ];

  const terminalLines = [
    { key: "route", value: "GET /api/portfolio", tone: "blue" },
    { key: "auth", value: "admin session verified", tone: "green" },
    { key: "db", value: "prisma → postgresql", tone: "cyan" },
    { key: "render", value: "react UI hydrated", tone: "white" },
  ];

  return (
    <section
      id="architecture"
      className="architecture-section"
    >
      <div className="architecture-grid" />
      <div className="architecture-glow architecture-glow-one" />
      <div className="architecture-glow architecture-glow-two" />

      <div className="architecture-container">
        <motion.div
          className="architecture-section-label"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span>04</span>
          <div />
          <strong>SYSTEM ARCHITECTURE</strong>
        </motion.div>

        <div className="architecture-layout">
          <motion.div
            className="architecture-copy"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="architecture-status">
              <span />
              FULL-STACK DELIVERY MAP
            </div>

            <h2>
              I build the complete path
              <span> from interface to production.</span>
            </h2>

            <p>
              My work is not limited to one layer. I connect the user
              experience, API logic, database structure and deployment flow
              so the whole product works as one system.
            </p>

            <div className="architecture-metrics">
              <div>
                <span>STACK NODES</span>
                <strong>{String(activeSkills.length).padStart(2, "0")}</strong>
                <small>Technologies managed</small>
              </div>

              <div>
                <span>PROJECT DATA</span>
                <strong>{String(activeProjects.length).padStart(2, "0")}</strong>
                <small>Portfolio projects</small>
              </div>

              <div>
                <span>CONTENT MODE</span>
                <strong>API</strong>
                <small>Database driven</small>
              </div>
            </div>

            <div className="architecture-principles">
              <div>
                <FiActivity />
                <span>
                  <strong>Build for the full request cycle</strong>
                  <small>UI → API → data → response</small>
                </span>
              </div>

              <div>
                <FiTerminal />
                <span>
                  <strong>Keep content maintainable</strong>
                  <small>Admin managed, reusable and deployable</small>
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="architecture-console"
            initial={{ opacity: 0, scale: 0.96, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div className="architecture-console-top">
              <div className="architecture-window-dots">
                <i />
                <i />
                <i />
              </div>

              <span>request_pipeline.ts</span>

              <div className="architecture-console-live">
                <i />
                LIVE
              </div>
            </div>

            <div className="architecture-request">
              <div>
                <span>REQUEST TRACE</span>
                <strong>Full-stack execution path</strong>
              </div>

              <code>GET /api/portfolio</code>
            </div>

            <div className="architecture-flow">
              {flow.map((item, index) => (
                <div
                  className="architecture-flow-row"
                  key={item.step}
                >
                  <motion.div
                    className="architecture-node"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                    }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="architecture-node-index">
                      {item.step}
                    </div>

                    <div className="architecture-node-icon">
                      {item.icon}
                    </div>

                    <div className="architecture-node-copy">
                      <span>{item.label}</span>
                      <strong>{item.title}</strong>
                      <p>{item.detail}</p>
                    </div>

                    <code>{item.command}</code>
                  </motion.div>

                  {index < flow.length - 1 && (
                    <div className="architecture-connector">
                      <motion.span
                        animate={{ y: [0, 16, 0] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          delay: index * 0.12,
                          ease: "easeInOut",
                        }}
                      />
                      <FiArrowRight />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="architecture-terminal">
              <div className="architecture-terminal-heading">
                <FiTerminal />
                <span>RUNTIME TRACE</span>
              </div>

              <div className="architecture-terminal-lines">
                {terminalLines.map((line, index) => (
                  <motion.div
                    key={line.key}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: 0.35 + index * 0.12,
                    }}
                  >
                    <span>$</span>
                    <code className={`architecture-terminal-${line.tone}`}>
                      {line.value}
                    </code>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="architecture-bottom">
          <span>FRONTEND</span>
          <i />
          <span>API</span>
          <i />
          <span>DATABASE</span>
          <i />
          <span>DEPLOYMENT</span>
        </div>
      </div>
    </section>
  );
}

export default SystemArchitecture;
