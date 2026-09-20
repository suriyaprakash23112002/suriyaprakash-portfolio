import { motion } from "framer-motion";

import {
  FiBriefcase,
  FiMapPin,
  FiCalendar,
  FiArrowUpRight,
  FiCode,
} from "react-icons/fi";

import "./Experience.css";

function Experience({
  experiences = [],
}) {
  /* =====================================================
     HELPERS
  ===================================================== */

  const activeExperiences =
    experiences.filter(
      (experience) =>
        experience?.isActive !== false
    );

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString(
      "en-US",
      {
        month: "short",
        year: "numeric",
      }
    );
  };

  const getRole = (
    experience
  ) =>
    experience?.role ||
    experience?.position ||
    experience?.title ||
    experience?.jobTitle ||
    "Full-Stack Developer";

  const getCompany = (
    experience
  ) =>
    experience?.company ||
    experience?.companyName ||
    experience?.organization ||
    "Company";

  const getLocation = (
    experience
  ) =>
    experience?.location ||
    experience?.companyLocation ||
    "";

  const getDescription = (
    experience
  ) =>
    experience?.description ||
    experience?.summary ||
    experience?.details ||
    "";

  const getEmploymentType = (
    experience
  ) => {
    const value =
      experience?.employmentType ||
      experience?.type ||
      "";

    return String(value)
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(
        /\b\w/g,
        (letter) =>
          letter.toUpperCase()
      );
  };

  const getEndDate = (
    experience
  ) => {
    if (
      experience?.isCurrent ||
      experience?.currentlyWorking
    ) {
      return "Present";
    }

    return (
      formatDate(
        experience?.endDate
      ) || "Present"
    );
  };

  const getResponsibilities = (
    experience
  ) => {
    if (
      Array.isArray(
        experience?.responsibilities
      )
    ) {
      return experience.responsibilities;
    }

    if (
      Array.isArray(
        experience?.highlights
      )
    ) {
      return experience.highlights;
    }

    return [];
  };

  const getTechnologies = (
    experience
  ) => {
    const values =
      experience?.technologies ||
      experience?.skills ||
      experience?.techStack ||
      [];

    if (!Array.isArray(values)) {
      return [];
    }

    return values
      .map((item) => {
        if (
          typeof item === "string"
        ) {
          return item;
        }

        return (
          item?.name ||
          item?.technology ||
          item?.skill?.name ||
          ""
        );
      })
      .filter(Boolean);
  };

    return (
    <section
      id="experience"
      className="experience-section"
    >
      {/* BACKGROUND */}

      <div className="experience-bg-lines" />

      <div className="experience-glow experience-glow-one" />

      <div className="experience-glow experience-glow-two" />

      <div className="experience-container">
        {/* ============================================
            SECTION LABEL
        ============================================ */}

        <motion.div
          className="experience-section-label"
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
            06
          </span>

          <div />

          <strong>
            EXPERIENCE
          </strong>
        </motion.div>

        {/* ============================================
            HEADER
        ============================================ */}

        <div className="experience-header">
          <motion.div
            className="experience-heading"
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
            <div className="experience-status">
              <span />

              PROFESSIONAL EXPERIENCE
            </div>

            <h2>
              Where I’ve worked
              <span>
                {" "}
                and what I’ve built.
              </span>
            </h2>
          </motion.div>

          <motion.p
            className="experience-intro"
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
            A view of the roles,
            responsibilities and
            technologies that have
            shaped my full-stack
            development journey.
          </motion.p>
        </div>

        {/* ============================================
            TIMELINE
        ============================================ */}

        {activeExperiences.length === 0 ? (
          <div className="experience-empty">
            <FiBriefcase />

            <span>
              PROFESSIONAL TIMELINE
            </span>

            <h3>
              Building real-world
              experience.
            </h3>

            <p>
              My professional roles,
              responsibilities and
              production work will be
              documented here as the
              journey grows.
            </p>
          </div>
        ) : (
        <div className="experience-timeline">
          {activeExperiences.map(
            (
              experience,
              index
            ) => {
              const role =
                getRole(
                  experience
                );

              const company =
                getCompany(
                  experience
                );

              const location =
                getLocation(
                  experience
                );

              const description =
                getDescription(
                  experience
                );

              const employmentType =
                getEmploymentType(
                  experience
                );

              const responsibilities =
                getResponsibilities(
                  experience
                );

              const technologies =
                getTechnologies(
                  experience
                );

              const startDate =
                formatDate(
                  experience?.startDate
                );

              const endDate =
                getEndDate(
                  experience
                );

              const current =
                experience?.isCurrent ||
                experience?.currentlyWorking ||
                endDate === "Present";

              return (
                <motion.article
                  className={`experience-item ${
                    current
                      ? "experience-item-current"
                      : ""
                  }`}
                  key={
                    experience?.id ||
                    `${company}-${role}-${index}`
                  }
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
                    amount: 0.18,
                  }}
                  transition={{
                    duration: 0.65,
                    delay:
                      index * 0.07,
                  }}
                >
                  {/* ==================================
                      TIMELINE NUMBER
                  ================================== */}

                  <div className="experience-index">
                    <span>
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <div className="experience-index-dot">
                      {current && (
                        <motion.span
                          animate={{
                            scale: [
                              1,
                              1.8,
                              1,
                            ],
                            opacity: [
                              0.7,
                              0,
                              0.7,
                            ],
                          }}
                          transition={{
                            duration:
                              2,
                            repeat:
                              Infinity,
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* ==================================
                      META
                  ================================== */}

                  <div className="experience-meta">
                    <span className="experience-meta-label">
                      {current
                        ? "CURRENT ROLE"
                        : "EXPERIENCE"}
                    </span>

                    <h3>
                      {company}
                    </h3>

                    {location && (
                      <div className="experience-location">
                        <FiMapPin />

                        {location}
                      </div>
                    )}

                    <div className="experience-dates">
                      <FiCalendar />

                      <span>
                        {startDate ||
                          "Start"}
                      </span>

                      <i>
                        —
                      </i>

                      <span>
                        {endDate}
                      </span>
                    </div>

                    {employmentType && (
                      <span className="experience-type">
                        {
                          employmentType
                        }
                      </span>
                    )}
                  </div>

                  {/* ==================================
                      MAIN CONTENT
                  ================================== */}

                  <div className="experience-content">
                    <div className="experience-role-row">
                      <div>
                        <span>
                          ROLE
                        </span>

                        <h3>
                          {role}
                        </h3>
                      </div>

                      <div className="experience-role-icon">
                        <FiBriefcase />
                      </div>
                    </div>

                    {description && (
                      <p className="experience-description">
                        {
                          description
                        }
                      </p>
                    )}

                    {responsibilities.length >
                      0 && (
                      <div className="experience-responsibilities">
                        {responsibilities
                          .slice(
                            0,
                            5
                          )
                          .map(
                            (
                              item,
                              responsibilityIndex
                            ) => (
                              <div
                                key={`${item}-${responsibilityIndex}`}
                              >
                                <span />

                                <p>
                                  {
                                    item
                                  }
                                </p>
                              </div>
                            )
                          )}
                      </div>
                    )}

                    {technologies.length >
                      0 && (
                      <div className="experience-technologies">
                        {technologies
                          .slice(
                            0,
                            8
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

                    {experience?.companyUrl && (
                      <a
                        href={
                          experience.companyUrl
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="experience-company-link"
                      >
                        Visit company

                        <FiArrowUpRight />
                      </a>
                    )}
                  </div>
                </motion.article>
              );
            }
          )}
        </div>
        )}

        {/* ============================================
            BOTTOM
        ============================================ */}

        <motion.div
          className="experience-footer"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
        >
          <FiCode />

          <span>
            LEARNING • BUILDING •
            IMPROVING
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default Experience;