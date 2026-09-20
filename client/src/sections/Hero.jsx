import { useEffect, useState } from "react";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import {
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiCode,
  FiServer,
  FiDatabase,
  FiCloud,
  FiFileText,
} from "react-icons/fi";

import profileImage from "../assets/sample.png";

import "./Hero.css";

function Hero({ profile, performanceMode = false }) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const smoothCursorX = useSpring(cursorX, {
    stiffness: 500,
    damping: 35,
    mass: 0.5,
  });

  const smoothCursorY = useSpring(cursorY, {
    stiffness: 500,
    damping: 35,
    mass: 0.5,
  });

  const [cursorVisible, setCursorVisible] =
    useState(false);

  const [cursorHover, setCursorHover] =
    useState(false);

  const [
    tallDesktopViewport,
    setTallDesktopViewport,
  ] = useState(false);

  useEffect(() => {
    const updateViewportMode = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setTallDesktopViewport(
        width >= 900 &&
          height / width >= 1.25
      );
    };

    updateViewportMode();

    window.addEventListener(
      "resize",
      updateViewportMode,
      { passive: true }
    );

    window.addEventListener(
      "orientationchange",
      updateViewportMode
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateViewportMode
      );

      window.removeEventListener(
        "orientationchange",
        updateViewportMode
      );
    };
  }, []);

  useEffect(() => {
    const finePointer =
      window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;

    if (
      !finePointer ||
      performanceMode
    ) {
      document.body.classList.remove(
        "hero-custom-cursor-enabled"
      );

      return;
    }

    document.body.classList.add(
      "hero-custom-cursor-enabled"
    );

    const handleMouseMove = (event) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);

      setCursorVisible(true);

      const target = event.target;

      if (target instanceof Element) {
        const interactive =
          target.closest(
            "a, button, .hero-tech-card, .hero-image-frame"
          );

        setCursorHover(
          Boolean(interactive)
        );
      }
    };

    const hideCursor = () => {
      setCursorVisible(false);
    };

    const showCursor = () => {
      setCursorVisible(true);
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    document.addEventListener(
      "mouseleave",
      hideCursor
    );

    document.addEventListener(
      "mouseenter",
      showCursor
    );

    return () => {
      document.body.classList.remove(
        "hero-custom-cursor-enabled"
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.removeEventListener(
        "mouseleave",
        hideCursor
      );

      document.removeEventListener(
        "mouseenter",
        showCursor
      );
    };
  }, [
    cursorX,
    cursorY,
    performanceMode,
  ]);

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const techItems = [
    {
      className: "hero-tech-react",
      label: "Frontend",
      value: "React",
      icon: <FiCode />,
    },
    {
      className: "hero-tech-node",
      label: "Backend",
      value: "Node.js",
      icon: <FiServer />,
    },
    {
      className: "hero-tech-database",
      label: "Database",
      value: "PostgreSQL",
      icon: <FiDatabase />,
    },
    {
      className: "hero-tech-cloud",
      label: "Deployment",
      value: "Cloud",
      icon: <FiCloud />,
    },
  ];

  return (
    <section
      id="home"
      className={`hero-section ${
        tallDesktopViewport
          ? "hero-desktop-site-portrait"
          : ""
      } ${
        performanceMode
          ? "hero-performance-mode"
          : ""
      }`}
    >
      {/* CUSTOM CURSOR */}

      <motion.div
        className={`hero-cursor-ring ${
          cursorHover
            ? "hero-cursor-ring-hover"
            : ""
        }`}
        style={{
          left: smoothCursorX,
          top: smoothCursorY,
        }}
        animate={{
          opacity: cursorVisible ? 1 : 0,
        }}
      />

      <motion.div
        className="hero-cursor-dot"
        style={{
          left: cursorX,
          top: cursorY,
        }}
        animate={{
          opacity: cursorVisible ? 1 : 0,
        }}
      />

      {/* BACKGROUND */}

      <div className="hero-grid" />

      <div className="hero-data-streams" aria-hidden="true">
        <span className="hero-data-stream hero-data-stream-one" />
        <span className="hero-data-stream hero-data-stream-two" />
        <span className="hero-data-stream hero-data-stream-three" />
      </div>

      <motion.div
        className="hero-floating-code hero-floating-code-one"
        aria-hidden="true"
        animate={{
          y: [0, -10, 0],
          opacity: [0.35, 0.72, 0.35],
        }}
        transition={{
          duration: 5.5,
          repeat: performanceMode ? 0 : Infinity,
          ease: "easeInOut",
        }}
      >
        API / REST
      </motion.div>

      <motion.div
        className="hero-floating-code hero-floating-code-two"
        aria-hidden="true"
        animate={{
          y: [0, 9, 0],
          opacity: [0.3, 0.65, 0.3],
        }}
        transition={{
          duration: 6.2,
          repeat: performanceMode ? 0 : Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      >
        PRISMA / SQL
      </motion.div>

      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />

      <div className="hero-container">
        {/* LEFT */}

        <div className="hero-content">
          <motion.div
            className="hero-availability"
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <span className="hero-availability-dot" />

            <span>
              {profile?.availableForWork === false
                ? "Currently unavailable"
                : profile?.availabilityText || "Available for opportunities"}
            </span>
          </motion.div>

          <motion.span
            className="hero-eyebrow"
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
              delay: 0.08,
            }}
          >
            FULL-STACK DEVELOPER
          </motion.span>

          <motion.h1
            initial={{
              opacity: 0,
              y: 28,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.14,
            }}
          >
            {profile?.fullName ||
              "Suriyaprakash"}
          </motion.h1>

          <motion.h2
            initial={{
              opacity: 0,
              y: 22,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.2,
            }}
          >
            Building modern
            <span>
              {" "}
              full-stack experiences{" "}
            </span>
            that work beautifully from
            interface to database.
          </motion.h2>

          <motion.p
            className="hero-description"
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.28,
            }}
          >
            {profile?.heroText ||
              "I build complete modern web applications from frontend interfaces to backend APIs and databases."}
          </motion.p>

          {/* NEW ACTION DOCK */}

          <motion.div
            className="hero-action-dock"
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.36,
            }}
          >
            <div className="hero-action-buttons">
              <button
                type="button"
                className="hero-primary-button"
                onClick={() =>
                  scrollToSection(
                    "projects"
                  )
                }
              >
                View Projects
                <FiArrowUpRight />
              </button>

              {profile?.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-resume-button"
                  aria-label="Open resume"
                >
                  <FiFileText />
                  Resume
                </a>
              )}

              <button
                type="button"
                className="hero-secondary-button"
                onClick={() =>
                  scrollToSection(
                    "contact"
                  )
                }
              >
                Contact Me
              </button>
            </div>

            {(profile?.githubUrl ||
              profile?.linkedinUrl) && (
              <div className="hero-action-separator" />
            )}

            <div className="hero-action-socials">
              {profile?.githubUrl && (
                <a
                  href={
                    profile.githubUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="hero-social-button"
                  aria-label="GitHub"
                >
                  <FiGithub />

                  <span>
                    GitHub
                  </span>
                </a>
              )}

              {profile?.linkedinUrl && (
                <a
                  href={
                    profile.linkedinUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="hero-social-button"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin />

                  <span>
                    LinkedIn
                  </span>
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}

        <motion.div
          className="hero-portrait-area"
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.18,
          }}
        >
          <div className="hero-portrait-stage">
            <div className="hero-portrait-grid" aria-hidden="true" />

            <motion.div
              className="hero-orbit-sweep"
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{
                duration: 16,
                repeat: performanceMode ? 0 : Infinity,
                ease: "linear",
              }}
            />

            <div className="hero-hud-corners" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>

            <motion.div
              className="hero-signal-chip hero-signal-chip-one"
              aria-hidden="true"
              animate={{
                y: [0, -7, 0],
                opacity: [0.45, 1, 0.45],
              }}
              transition={{
                duration: 3.6,
                repeat: performanceMode ? 0 : Infinity,
                ease: "easeInOut",
              }}
            >
              UI / API
            </motion.div>

            <motion.div
              className="hero-signal-chip hero-signal-chip-two"
              aria-hidden="true"
              animate={{
                y: [0, 7, 0],
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{
                duration: 4.2,
                repeat: performanceMode ? 0 : Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              DB / CLOUD
            </motion.div>

            {/* LIVE RINGS */}

            <div className="hero-ring-anchor hero-ring-anchor-one">
              <motion.div
                className="hero-live-ring hero-live-ring-one"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 32,
                  repeat: performanceMode ? 0 : Infinity,
                  ease: "linear",
                }}
              />
            </div>

            <div className="hero-ring-anchor hero-ring-anchor-two">
              <motion.div
                className="hero-live-ring hero-live-ring-two"
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 24,
                  repeat: performanceMode ? 0 : Infinity,
                  ease: "linear",
                }}
              />
            </div>

            <div className="hero-ring-anchor hero-ring-anchor-three">
              <motion.div
                className="hero-live-ring hero-live-ring-three"
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

            <div className="hero-orbit hero-orbit-outer" />
            <div className="hero-orbit hero-orbit-inner" />

            {/* SCANNER */}

            <motion.div
              className="hero-live-scan"
              animate={{
                y: [
                  -115,
                  115,
                  -115,
                ],

                opacity: [
                  0,
                  0.65,
                  0,
                ],
              }}
              transition={{
                duration: 5,
                repeat: performanceMode ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />

            {/* PARTICLES */}

            <motion.span
              className="hero-particle hero-particle-one"
              animate={{
                x: [
                  0,
                  9,
                  0,
                ],

                y: [
                  0,
                  -18,
                  0,
                ],

                opacity: [
                  0.25,
                  1,
                  0.25,
                ],
              }}
              transition={{
                duration: 3.4,
                repeat: performanceMode ? 0 : Infinity,
              }}
            />

            <motion.span
              className="hero-particle hero-particle-two"
              animate={{
                x: [
                  0,
                  -9,
                  0,
                ],

                y: [
                  0,
                  15,
                  0,
                ],

                opacity: [
                  0.2,
                  1,
                  0.2,
                ],
              }}
              transition={{
                duration: 4,
                repeat: performanceMode ? 0 : Infinity,
              }}
            />

            <motion.span
              className="hero-particle hero-particle-three"
              animate={{
                y: [
                  0,
                  -16,
                  0,
                ],

                opacity: [
                  0.25,
                  1,
                  0.25,
                ],
              }}
              transition={{
                duration: 3.2,
                repeat: performanceMode ? 0 : Infinity,
              }}
            />

            <motion.span
              className="hero-particle hero-particle-four"
              animate={{
                x: [0, 12, 0],
                y: [0, 10, 0],
                opacity: [0.18, 0.85, 0.18],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: 4.4,
                repeat: performanceMode ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.span
              className="hero-particle hero-particle-five"
              animate={{
                x: [0, -10, 0],
                y: [0, -12, 0],
                opacity: [0.2, 0.9, 0.2],
                scale: [0.9, 1.25, 0.9],
              }}
              transition={{
                duration: 5,
                repeat: performanceMode ? 0 : Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            />

            {/* IMAGE */}

            <div className="hero-image-anchor">
              <motion.div
                className="hero-image-wrapper"
                animate={{
                  y: [
                    0,
                    -6,
                    0,
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: performanceMode ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="hero-image-glow" />

                <div className="hero-image-frame">
                  <img
                    src={
                      profile?.heroImageUrl ||
                      profile?.profileImageUrl ||
                      profileImage
                    }
                    alt={
                      profile?.fullName ||
                      "Suriyaprakash"
                    }
                    className="hero-profile-image"
                  />

                  <div className="hero-image-overlay" />

                  <div className="hero-image-bottom">
                    <div>
                      <span>
                        {(
                          profile?.fullName ||
                          "Suriyaprakash"
                        ).toUpperCase()}
                      </span>

                      <strong>
                        Full-Stack Developer
                      </strong>
                    </div>

                    <div className="hero-image-live">
                      <span />
                      ONLINE
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* TECH CARDS */}

            {techItems.map(
              (item, index) => (
                <motion.div
                  key={item.label}
                  className={`hero-tech-card ${item.className}`}
                  initial={{
                    opacity: 0,
                    scale: 0.85,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,

                    y: [
                      0,
                      index % 2 === 0
                        ? -6
                        : 6,
                      0,
                    ],
                  }}
                  transition={{
                    opacity: {
                      duration: 0.5,
                      delay:
                        0.45 +
                        index * 0.1,
                    },

                    scale: {
                      duration: 0.5,
                      delay:
                        0.45 +
                        index * 0.1,
                    },

                    y: {
                      duration:
                        4 +
                        index * 0.4,

                      repeat: performanceMode ? 0 : Infinity,

                      ease:
                        "easeInOut",
                    },
                  }}
                  whileHover={{
                    scale: 1.07,
                  }}
                >
                  <div className="hero-tech-icon">
                    {item.icon}
                  </div>

                  <div className="hero-tech-details">
                    <span>
                      {item.label}
                    </span>

                    <strong>
                      {item.value}
                    </strong>
                  </div>
                </motion.div>
              )
            )}

            <motion.div
              className="hero-code-label"
              animate={{
                opacity: [
                  0.45,
                  1,
                  0.45,
                ],
              }}
              transition={{
                duration: 2.8,
                repeat: performanceMode ? 0 : Infinity,
              }}
            >
              <span>
                &lt;/&gt;
              </span>

              BUILD • CONNECT • DEPLOY
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="hero-bottom-line">
        <span>01</span>

        <div />

        <span>
          SCROLL TO EXPLORE
        </span>
      </div>
    </section>
  );
}

export default Hero;