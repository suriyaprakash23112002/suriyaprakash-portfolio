import { motion } from "framer-motion";

import {
  SiReact,
  SiJavascript,
  SiPython,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiPrisma,
  SiGit,
  SiGithub,
  SiVercel,
  SiMysql,
} from "react-icons/si";

import {
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";

import {
  FiCode,
  FiDatabase,
  FiServer,
  FiCloud,
  FiTerminal,
} from "react-icons/fi";

import "./TechStack.css";

function TechStack({
  skillCategories = [],
}) {
  /* =====================================================
     FLATTEN SKILLS FROM DATABASE
  ===================================================== */

  const rawSkills =
    skillCategories
      .filter(
        (category) =>
          category?.isActive !== false
      )
      .flatMap((category) =>
        (category?.skills || [])
          .filter(
            (skill) =>
              skill?.isActive !== false
          )
          .map((skill) => ({
            ...skill,
            category:
              category?.name || "",
          }))
      );

  /* REMOVE DUPLICATES */

  const skills = rawSkills.filter(
    (skill, index, array) =>
      array.findIndex(
        (item) =>
          item?.name
            ?.toLowerCase()
            .trim() ===
          skill?.name
            ?.toLowerCase()
            .trim()
      ) === index
  );

  /* =====================================================
     ICON MAPPING
  ===================================================== */

  const getSkillIcon = (
    name = ""
  ) => {
    const value = name
      .toLowerCase()
      .trim();

    if (
      value.includes("react")
    ) {
      return <SiReact />;
    }

    if (
      value === "javascript" ||
      value === "js" ||
      value.includes(
        "javascript"
      )
    ) {
      return <SiJavascript />;
    }

    if (
      value.includes("python")
    ) {
      return <SiPython />;
    }

    if (
      value.includes("html")
    ) {
      return <FaHtml5 />;
    }

    if (
      value === "css" ||
      value === "css3" ||
      value.includes("css")
    ) {
      return <FaCss3Alt />;
    }

    if (
      value.includes("node")
    ) {
      return <SiNodedotjs />;
    }

    if (
      value.includes("express")
    ) {
      return <SiExpress />;
    }

    if (
      value.includes("postgres")
    ) {
      return <SiPostgresql />;
    }

    if (
      value.includes("prisma")
    ) {
      return <SiPrisma />;
    }

    if (
      value.includes("mysql")
    ) {
      return <SiMysql />;
    }

    if (
      value === "git"
    ) {
      return <SiGit />;
    }

    if (
      value.includes("github")
    ) {
      return <SiGithub />;
    }

    if (
      value.includes("vercel")
    ) {
      return <SiVercel />;
    }

    if (
      value.includes("neon") ||
      value.includes("database")
    ) {
      return <FiDatabase />;
    }

    if (
      value.includes("api") ||
      value.includes("rest")
    ) {
      return <FiServer />;
    }

    if (
      value.includes("deploy") ||
      value.includes("cloud")
    ) {
      return <FiCloud />;
    }

    return <FiCode />;
  };

  /* =====================================================
     DESKTOP NODE POSITIONS
  ===================================================== */

  const positions = [
    {
      x: 15,
      y: 16,
      type: "large",
    },
    {
      x: 46,
      y: 11,
      type: "medium",
    },
    {
      x: 76,
      y: 20,
      type: "large",
    },
    {
      x: 29,
      y: 36,
      type: "small",
    },
    {
      x: 61,
      y: 34,
      type: "large",
    },
    {
      x: 88,
      y: 42,
      type: "medium",
    },
    {
      x: 10,
      y: 55,
      type: "medium",
    },
    {
      x: 42,
      y: 55,
      type: "large",
    },
    {
      x: 71,
      y: 57,
      type: "small",
    },
    {
      x: 24,
      y: 76,
      type: "large",
    },
    {
      x: 54,
      y: 78,
      type: "medium",
    },
    {
      x: 83,
      y: 76,
      type: "large",
    },
    {
      x: 8,
      y: 87,
      type: "small",
    },
    {
      x: 68,
      y: 91,
      type: "small",
    },
    {
      x: 93,
      y: 61,
      type: "small",
    },
    {
      x: 40,
      y: 94,
      type: "small",
    },
  ];

  return (
    <section
      id="skills"
      className="skills-showcase"
    >
      {/* BACKGROUND */}

      <div className="skills-showcase-grid" />

      <div className="skills-glow skills-glow-one" />

      <div className="skills-glow skills-glow-two" />

      <div className="skills-showcase-container">
        {/* ===========================================
            SECTION LABEL
        =========================================== */}

        <motion.div
          className="skills-section-label"
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
        >
          <span>
            03
          </span>

          <div />

          <strong>
            SKILLS & TECHNOLOGIES
          </strong>
        </motion.div>

        {/* ===========================================
            MAIN LAYOUT
        =========================================== */}

        <div className="skills-showcase-layout">
          {/* =========================================
              LEFT
          ========================================= */}

          <motion.div
            className="skills-showcase-content"
            initial={{
              opacity: 0,
              x: -35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="skills-showcase-status">
              <span />

              MY DEVELOPMENT STACK
            </div>

            <h2>
              Technologies that
              <span>
                {" "}
                power my work.
              </span>
            </h2>

            <p>
              I work with a focused set
              of technologies to build
              responsive interfaces,
              scalable APIs, structured
              databases and production
              ready applications.
            </p>

            {/* SIMPLE WORKFLOW */}

            <div className="skills-workflow">
              <div>
                <span>
                  01
                </span>

                <strong>
                  Design
                </strong>
              </div>

              <i>
                /
              </i>

              <div>
                <span>
                  02
                </span>

                <strong>
                  Develop
                </strong>
              </div>

              <i>
                /
              </i>

              <div>
                <span>
                  03
                </span>

                <strong>
                  Connect
                </strong>
              </div>

              <i>
                /
              </i>

              <div>
                <span>
                  04
                </span>

                <strong>
                  Deploy
                </strong>
              </div>
            </div>

            {/* TERMINAL NOTE */}

            <motion.div
              className="skills-terminal-note"
              whileHover={{
                x: 5,
              }}
            >
              <FiTerminal />

              <div>
                <span>
                  CURRENT FOCUS
                </span>

                <strong>
                  Full-stack web
                  development
                </strong>
              </div>
            </motion.div>
          </motion.div>

          {/* =========================================
              RIGHT VISUAL CANVAS
          ========================================= */}

          <motion.div
            className="skills-canvas"
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            {/* CANVAS LABEL */}

            <div className="skills-canvas-header">
              <span>
                TECHNOLOGY MAP
              </span>

              <div>
                <span />
                LIVE
              </div>
            </div>

            {/* NETWORK */}

            <svg
              className="skills-network"
              viewBox="0 0 800 520"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M120 90 C220 150 310 80 390 180"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                whileInView={{
                  pathLength: 1,
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1.6,
                }}
              />

              <motion.path
                d="M390 180 C480 100 610 120 700 205"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                whileInView={{
                  pathLength: 1,
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1.8,
                  delay: 0.15,
                }}
              />

              <motion.path
                d="M90 285 C230 225 310 340 430 285"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                whileInView={{
                  pathLength: 1,
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1.8,
                  delay: 0.3,
                }}
              />

              <motion.path
                d="M430 285 C560 235 635 320 750 285"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                whileInView={{
                  pathLength: 1,
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1.8,
                  delay: 0.4,
                }}
              />

              <motion.path
                d="M190 405 C300 350 380 445 500 395 C595 355 660 390 715 440"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                whileInView={{
                  pathLength: 1,
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 2,
                  delay: 0.5,
                }}
              />
            </svg>

            {/* DECORATIVE DOTS */}

            <motion.span
              className="skills-map-dot skills-map-dot-one"
              animate={{
                opacity: [
                  0.2,
                  1,
                  0.2,
                ],
                scale: [
                  0.7,
                  1.3,
                  0.7,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            <motion.span
              className="skills-map-dot skills-map-dot-two"
              animate={{
                opacity: [
                  0.2,
                  1,
                  0.2,
                ],
                scale: [
                  0.7,
                  1.3,
                  0.7,
                ],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
              }}
            />

            <motion.span
              className="skills-map-dot skills-map-dot-three"
              animate={{
                opacity: [
                  0.2,
                  1,
                  0.2,
                ],
                scale: [
                  0.7,
                  1.3,
                  0.7,
                ],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
              }}
            />

            {/* SKILLS */}

            <div className="skills-node-area">
              {skills.map(
                (
                  skill,
                  index
                ) => {
                  const position =
                    positions[
                      index %
                        positions.length
                    ];

                  return (
                    <div
                      className={`skills-node-anchor skills-node-${position.type}`}
                      key={
                        skill.id ||
                        `${skill.name}-${index}`
                      }
                      style={{
                        "--node-x": `${position.x}%`,
                        "--node-y": `${position.y}%`,
                      }}
                    >
                      <motion.div
                        className="skills-node"
                        animate={{
                          y: [
                            0,
                            index % 2 === 0
                              ? -7
                              : 7,
                            0,
                          ],
                        }}
                        transition={{
                          duration:
                            4 +
                            (index % 5) *
                              0.4,

                          repeat:
                            Infinity,

                          ease:
                            "easeInOut",

                          delay:
                            index *
                            0.08,
                        }}
                        whileHover={{
                          scale: 1.1,
                        }}
                      >
                        <div className="skills-node-icon">
                          {getSkillIcon(
                            skill.name
                          )}
                        </div>

                        <span>
                          {skill.name}
                        </span>
                      </motion.div>
                    </div>
                  );
                }
              )}

              {/* EMPTY */}

              {skills.length === 0 && (
                <div className="skills-canvas-empty">
                  <FiCode />

                  <strong>
                    Technology stack
                  </strong>

                  <span>
                    Add skills from your
                    admin dashboard.
                  </span>
                </div>
              )}
            </div>

            {/* BOTTOM LABEL */}

            <div className="skills-canvas-bottom">
              <span>
                FRONTEND
              </span>

              <i />

              <span>
                BACKEND
              </span>

              <i />

              <span>
                DATABASE
              </span>

              <i />

              <span>
                DEPLOYMENT
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default TechStack;