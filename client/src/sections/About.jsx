import { motion } from "framer-motion";

import {
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiPrisma,
  SiGit,
  SiGithub,
  SiVercel,
  SiPython,
} from "react-icons/si";

import {
  FiCode,
  FiServer,
  FiDatabase,
  FiCloud,
} from "react-icons/fi";

import "./About.css";

function About({ profile, performanceMode = false }) {
  const capabilities = [
    {
      label: "Frontend",
      detail: "Interfaces & interactions",
      icon: <FiCode />,
    },
    {
      label: "Backend",
      detail: "APIs & application logic",
      icon: <FiServer />,
    },
    {
      label: "Database",
      detail: "Data & architecture",
      icon: <FiDatabase />,
    },
    {
      label: "Deployment",
      detail: "Production & delivery",
      icon: <FiCloud />,
    },
  ];

  const technologies = [
    {
      name: "React",
      icon: <SiReact />,
      className: "about-tech-react",
    },
    {
      name: "JavaScript",
      icon: <SiJavascript />,
      className: "about-tech-javascript",
    },
    {
      name: "Node.js",
      icon: <SiNodedotjs />,
      className: "about-tech-node",
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql />,
      className: "about-tech-postgres",
    },
    {
      name: "Prisma",
      icon: <SiPrisma />,
      className: "about-tech-prisma",
    },
    {
      name: "Express",
      icon: <SiExpress />,
      className: "about-tech-express",
    },
  ];

  const tickerItems = [
    {
      name: "React",
      icon: <SiReact />,
    },
    {
      name: "JavaScript",
      icon: <SiJavascript />,
    },
    {
      name: "Node.js",
      icon: <SiNodedotjs />,
    },
    {
      name: "Express",
      icon: <SiExpress />,
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql />,
    },
    {
      name: "Prisma",
      icon: <SiPrisma />,
    },
    {
      name: "Python",
      icon: <SiPython />,
    },
    {
      name: "Git",
      icon: <SiGit />,
    },
    {
      name: "GitHub",
      icon: <SiGithub />,
    },
    {
      name: "Vercel",
      icon: <SiVercel />,
    },
  ];

  return (
    <section
      id="about"
      className="about-section"
    >
      <div className="about-grid" />

      <div className="about-glow about-glow-left" />
      <div className="about-glow about-glow-right" />

      <div className="about-container">
        {/* SECTION LABEL */}

        <motion.div
          className="about-section-label"
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
            duration: 0.5,
          }}
        >
          <span>02</span>

          <div />

          <strong>
            ABOUT ME
          </strong>
        </motion.div>

        <div className="about-main">
          {/* LEFT */}

          <motion.div
            className="about-content"
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="about-live">
              <span />

              DEVELOPMENT SYSTEM ACTIVE
            </div>

            <h2>
              I turn ideas into
              <span>
                {" "}
                complete digital
                experiences.
              </span>
            </h2>

            <p className="about-primary-text">
              {profile?.longBio ||
                profile?.shortBio ||
                "I work across frontend development, backend APIs, databases and deployment to build complete web applications."}
            </p>

            <p className="about-secondary-text">
              I enjoy working through the
              complete development cycle —
              designing responsive interfaces,
              connecting APIs, structuring data
              and taking applications into
              production.
            </p>

            {/* NEW CAPABILITY RAIL */}

            <motion.div
              className="about-capability-rail"
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
                duration: 0.65,
                delay: 0.15,
              }}
            >

              {capabilities.map(
                (item, index) => (
                  <motion.div
                    key={item.label}
                    className="about-capability-item"
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
                      delay:
                        0.15 +
                        index * 0.08,
                    }}
                    whileHover={{
                      y: -4,
                    }}
                  >
                    <div className="about-capability-icon">
                      {item.icon}
                    </div>

                    <div className="about-capability-copy">
                      <strong>
                        {item.label}
                      </strong>

                      <span>
                        {item.detail}
                      </span>
                    </div>
                  </motion.div>
                )
              )}
            </motion.div>
          </motion.div>

          {/* RIGHT LIVE SYSTEM */}

          <motion.div
            className="about-tech-system"
            initial={{
              opacity: 0,
              scale: 0.92,
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
            <div className="about-tech-stage">
              <div className="about-orbit-anchor about-orbit-anchor-one">
                <motion.div
                  className="about-orbit about-orbit-one"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 38,
                    repeat: performanceMode ? 0 : Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              <div className="about-orbit-anchor about-orbit-anchor-two">
                <motion.div
                  className="about-orbit about-orbit-two"
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 28,
                    repeat: performanceMode ? 0 : Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              <div className="about-orbit-anchor about-orbit-anchor-three">
                <motion.div
                  className="about-orbit about-orbit-three"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 18,
                    repeat: performanceMode ? 0 : Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              <motion.div
                className="about-scan"
                animate={{
                  y: [
                    -120,
                    120,
                    -120,
                  ],

                  opacity: [
                    0,
                    0.7,
                    0,
                  ],
                }}
                transition={{
                  duration: 4.5,
                  repeat: performanceMode ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="about-core"
                animate={{
                  boxShadow: [
                    "0 0 25px rgba(37,99,235,0.08)",
                    "0 0 60px rgba(37,99,235,0.22)",
                    "0 0 25px rgba(37,99,235,0.08)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: performanceMode ? 0 : Infinity,
                }}
              >
                <motion.div
                  className="about-core-icon"
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
                    repeat: performanceMode ? 0 : Infinity,
                  }}
                >
                  <FiCode />
                </motion.div>

                <span>
                  FULL STACK
                </span>

                <strong>
                  BUILD
                </strong>

                <div className="about-core-status">
                  <span />
                  ACTIVE
                </div>
              </motion.div>

              {technologies.map(
                (item, index) => (
                  <motion.div
                    key={item.name}
                    className={`about-floating-tech ${item.className}`}
                    animate={{
                      y: [
                        0,
                        index % 2 === 0
                          ? -8
                          : 8,
                        0,
                      ],

                      rotate: [
                        0,
                        index % 2 === 0
                          ? 2
                          : -2,
                        0,
                      ],
                    }}
                    transition={{
                      duration:
                        3.5 +
                        index * 0.4,

                      repeat: performanceMode ? 0 : Infinity,

                      ease:
                        "easeInOut",
                    }}
                    whileHover={{
                      scale: 1.12,
                    }}
                  >
                    <div>
                      {item.icon}
                    </div>

                    <span>
                      {item.name}
                    </span>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* TECHNOLOGY TICKER */}

        <div className="about-ticker">
          <div className="about-ticker-title">
            <span />

            TECH STACK
          </div>

          <div className="about-ticker-window">
            <motion.div
              className="about-ticker-track"
              animate={{
                x: [
                  "0%",
                  "-50%",
                ],
              }}
              transition={{
                duration: 25,
                repeat: performanceMode ? 0 : Infinity,
                ease: "linear",
              }}
            >
              {[
                ...tickerItems,
                ...tickerItems,
              ].map(
                (item, index) => (
                  <div
                    className="about-ticker-item"
                    key={`${item.name}-${index}`}
                  >
                    <span>
                      {item.icon}
                    </span>

                    {item.name}
                  </div>
                )
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;