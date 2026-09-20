import { motion } from "framer-motion";

import {
  FiArrowUpRight,
  FiBriefcase,
  FiCalendar,
  FiCheck,
  FiCode,
  FiMapPin,
} from "react-icons/fi";

import "./Experience.css";

function Experience({
  experiences = [],
  performanceMode = false,
}) {
  const activeExperiences =
    experiences.filter(
      (experience) =>
        experience?.isActive !== false &&
        experience?.isVisible !== false
    );

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    return date.toLocaleDateString(
      "en-US",
      {
        month: "short",
        year: "numeric",
      }
    );
  };

  const getRole = (experience) =>
    experience?.role ||
    experience?.position ||
    experience?.title ||
    experience?.jobTitle ||
    "Full-Stack Developer";

  const getCompany = (experience) =>
    experience?.company ||
    experience?.companyName ||
    experience?.organization ||
    "Company";

  const getLocation = (experience) =>
    experience?.location ||
    experience?.companyLocation ||
    "";

  const getDescription = (experience) =>
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

  const getEndDate = (experience) => {
    if (
      experience?.isCurrent ||
      experience?.currentlyWorking
    ) {
      return "Present";
    }

    return (
      formatDate(
        experience?.endDate
      ) || ""
    );
  };

  const getResponsibilities = (
    experience
  ) => {
    const values =
      experience?.responsibilities ||
      experience?.highlights ||
      [];

    return Array.isArray(values)
      ? values.filter(Boolean)
      : [];
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

  const getCompanyInitial = (
    company
  ) =>
    String(company || "C")
      .trim()
      .charAt(0)
      .toUpperCase();

  return (
    <section
      id="experience"
      className="experience-section"
    >
      <div className="experience-grid-bg" />
      <div className="experience-glow experience-glow-one" />
      <div className="experience-glow experience-glow-two" />

      <div className="experience-container">
        <motion.div
          className="experience-section-label"
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
          <span>05</span>
          <div />
          <strong>
            EXPERIENCE
          </strong>
        </motion.div>

        <div className="experience-header">
          <motion.div
            className="experience-header-copy"
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
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <div className="experience-kicker">
              <span />
              PROFESSIONAL JOURNEY
            </div>

            <h2>
              Experience that
              <span>
                {" "}
                shaped how I build.
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="experience-header-note"
            initial={{
              opacity: 0,
              y: 18,
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
              delay: 0.08,
            }}
          >
            <span className="experience-header-count">
              {String(
                activeExperiences.length
              ).padStart(2, "0")}
            </span>

            <div>
              <strong>
                ROLES & EXPERIENCE
              </strong>

              <p>
                Real-world work across
                frontend, backend,
                databases and
                deployment.
              </p>
            </div>
          </motion.div>
        </div>

        {activeExperiences.length ===
        0 ? (
          <div className="experience-empty">
            <div className="experience-empty-icon">
              <FiBriefcase />
            </div>

            <span>
              PROFESSIONAL EXPERIENCE
            </span>

            <h3>
              Experience will appear
              here.
            </h3>

            <p>
              Add visible experience
              records from the admin
              dashboard to populate
              this section.
            </p>
          </div>
        ) : (
          <div className="experience-list">
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
                  Boolean(
                    experience?.isCurrent ||
                    experience
                      ?.currentlyWorking
                  );

                return (
                  <motion.article
                    className={`experience-card ${
                      current
                        ? "experience-card-current"
                        : ""
                    }`}
                    key={
                      experience?.id ||
                      `${company}-${role}-${index}`
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
                      amount: 0.15,
                    }}
                    transition={{
                      duration: 0.6,
                      delay:
                        index * 0.06,
                    }}
                  >
                    <div className="experience-card-rail">
                      <span className="experience-card-number">
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <div className="experience-card-line">
                        <span
                          className={
                            current
                              ? "experience-card-dot experience-card-dot-live"
                              : "experience-card-dot"
                          }
                        >
                          {current && (
                            <motion.i
                              animate={{
                                scale: [
                                  1,
                                  1.8,
                                  1,
                                ],
                                opacity: [
                                  0.6,
                                  0,
                                  0.6,
                                ],
                              }}
                              transition={{
                                duration: 2,
                                repeat:
                                  performanceMode
                                    ? 0
                                    : Infinity,
                              }}
                            />
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="experience-card-body">
                      <div className="experience-card-top">
                        <div className="experience-company">
                          <div className="experience-company-mark">
                            {experience
                              ?.companyLogo ? (
                              <img
                                src={
                                  experience.companyLogo
                                }
                                alt={company}
                              />
                            ) : (
                              <span>
                                {getCompanyInitial(
                                  company
                                )}
                              </span>
                            )}
                          </div>

                          <div className="experience-company-copy">
                            <span>
                              COMPANY
                            </span>

                            <h3>
                              {company}
                            </h3>

                            <div className="experience-company-meta">
                              {location && (
                                <span>
                                  <FiMapPin />
                                  {location}
                                </span>
                              )}

                              {(startDate ||
                                endDate) && (
                                <span>
                                  <FiCalendar />
                                  {startDate}
                                  {startDate &&
                                  endDate
                                    ? " — "
                                    : ""}
                                  {endDate}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="experience-card-badges">
                          {current && (
                            <span className="experience-current-badge">
                              <i />
                              CURRENT
                            </span>
                          )}

                          {employmentType && (
                            <span>
                              {
                                employmentType
                              }
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="experience-card-divider" />

                      <div className="experience-card-main">
                        <div className="experience-role-block">
                          <span>
                            ROLE
                          </span>

                          <h4>
                            {role}
                          </h4>

                          {description && (
                            <p>
                              {
                                description
                              }
                            </p>
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

                        <div className="experience-work-block">
                          <span className="experience-work-label">
                            CONTRIBUTIONS
                          </span>

                          {responsibilities.length >
                          0 ? (
                            <div className="experience-responsibilities">
                              {responsibilities
                                .slice(
                                  0,
                                  6
                                )
                                .map(
                                  (
                                    item,
                                    responsibilityIndex
                                  ) => (
                                    <div
                                      key={`${item}-${responsibilityIndex}`}
                                    >
                                      <FiCheck />

                                      <p>
                                        {
                                          item
                                        }
                                      </p>
                                    </div>
                                  )
                                )}
                            </div>
                          ) : (
                            <div className="experience-no-responsibilities">
                              <FiCode />

                              <span>
                                Role details
                                available in
                                the summary.
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {technologies.length >
                        0 && (
                        <div className="experience-stack">
                          <span>
                            STACK
                          </span>

                          <div>
                            {technologies
                              .slice(
                                0,
                                10
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
                        </div>
                      )}
                    </div>
                  </motion.article>
                );
              }
            )}
          </div>
        )}

        <div className="experience-footer">
          <span>
            CAREER / BUILD / GROW
          </span>

          <div />

          <span>
            FULL-STACK DEVELOPMENT
          </span>
        </div>
      </div>
    </section>
  );
}

export default Experience;
