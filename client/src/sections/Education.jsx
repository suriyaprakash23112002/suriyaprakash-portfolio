import { motion } from "framer-motion";

import {
  FiArrowUpRight,
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiMapPin,
} from "react-icons/fi";

import "./Education.css";

function Education({
  education = [],
}) {
  const activeEducation =
    education.filter(
      (item) =>
        item?.isActive !== false &&
        item?.isVisible !== false
    );

  const getInstitution = (
    item
  ) =>
    item?.institution ||
    item?.institutionName ||
    item?.college ||
    item?.school ||
    item?.university ||
    "Institution";

  const getDegree = (
    item
  ) =>
    item?.degree ||
    item?.qualification ||
    item?.course ||
    item?.title ||
    "Qualification";

  const getField = (
    item
  ) =>
    item?.fieldOfStudy ||
    item?.specialization ||
    item?.field ||
    "";

  const getLocation = (
    item
  ) =>
    item?.location ||
    item?.institutionLocation ||
    "";

  const getDescription = (
    item
  ) =>
    item?.description ||
    item?.summary ||
    item?.details ||
    "";

  const getCgpa = (
    item
  ) =>
    item?.cgpa ||
    item?.grade ||
    "";

  const getStartYear = (
    item
  ) =>
    item?.startYear ||
    "";

  const getEndYear = (
    item
  ) => {
    if (
      item?.isCurrent ||
      item?.currentlyStudying
    ) {
      return "Present";
    }

    return (
      item?.endYear ||
      ""
    );
  };

  const getHighlights = (
    item
  ) => {
    if (
      Array.isArray(
        item?.highlights
      )
    ) {
      return item.highlights.filter(
        Boolean
      );
    }

    if (
      Array.isArray(
        item?.achievements
      )
    ) {
      return item.achievements.filter(
        Boolean
      );
    }

    return [];
  };

  return (
    <section
      id="education"
      className="education-section"
    >
      <div className="education-grid-bg" />
      <div className="education-glow education-glow-one" />
      <div className="education-glow education-glow-two" />

      <div className="education-container">
        <motion.div
          className="education-section-label"
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
          <span>06</span>
          <div />
          <strong>
            EDUCATION
          </strong>
        </motion.div>

        <div className="education-header">
          <motion.div
            className="education-header-copy"
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
            <div className="education-kicker">
              <span />
              ACADEMIC FOUNDATION
            </div>

            <h2>
              Learning that
              <span>
                {" "}
                supports how I build.
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="education-header-note"
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
            <span className="education-header-count">
              {String(
                activeEducation.length
              ).padStart(
                2,
                "0"
              )}
            </span>

            <div>
              <strong>
                QUALIFICATIONS
              </strong>

              <p>
                Academic milestones
                that support my
                software-development
                foundation.
              </p>
            </div>
          </motion.div>
        </div>

        {activeEducation.length ===
        0 ? (
          <div className="education-empty">
            <div className="education-empty-icon">
              <FiBookOpen />
            </div>

            <span>
              ACADEMIC RECORD
            </span>

            <h3>
              Education will appear
              here.
            </h3>

            <p>
              Add visible education
              records from the admin
              dashboard to populate
              this section.
            </p>
          </div>
        ) : (
          <div className="education-timeline">
            {activeEducation.map(
              (
                item,
                index
              ) => {
                const institution =
                  getInstitution(
                    item
                  );

                const degree =
                  getDegree(
                    item
                  );

                const field =
                  getField(
                    item
                  );

                const location =
                  getLocation(
                    item
                  );

                const description =
                  getDescription(
                    item
                  );

                const cgpa =
                  getCgpa(
                    item
                  );

                const startYear =
                  getStartYear(
                    item
                  );

                const endYear =
                  getEndYear(
                    item
                  );

                const highlights =
                  getHighlights(
                    item
                  );

                const current =
                  Boolean(
                    item?.isCurrent ||
                    item?.currentlyStudying
                  );

                return (
                  <motion.article
                    className={`education-record ${
                      current
                        ? "education-record-current"
                        : ""
                    }`}
                    key={
                      item?.id ||
                      `${institution}-${degree}-${index}`
                    }
                    initial={{
                      opacity: 0,
                      y: 26,
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
                      duration: 0.58,
                      delay:
                        index *
                        0.06,
                    }}
                  >
                    <div className="education-record-rail">
                      <span className="education-record-number">
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <span className="education-record-dot" />

                      <span className="education-record-line" />
                    </div>

                    <div className="education-record-body">
                      <div className="education-record-years">
                        <span>
                          {startYear ||
                            "—"}
                        </span>

                        <i />

                        <span>
                          {endYear ||
                            "—"}
                        </span>
                      </div>

                      <div className="education-record-main">
                        <div className="education-record-topline">
                          <span>
                            QUALIFICATION
                          </span>

                          {current && (
                            <span className="education-current-badge">
                              <i />
                              CURRENT
                            </span>
                          )}
                        </div>

                        <h3>
                          {degree}
                        </h3>

                        {field && (
                          <p className="education-field">
                            {field}
                          </p>
                        )}

                        <div className="education-institution-row">
                          <div className="education-institution-mark">
                            <FiBookOpen />
                          </div>

                          <div>
                            <span>
                              INSTITUTION
                            </span>

                            <strong>
                              {
                                institution
                              }
                            </strong>
                          </div>
                        </div>

                        {description && (
                          <p className="education-description">
                            {
                              description
                            }
                          </p>
                        )}

                        {highlights.length >
                          0 && (
                          <div className="education-highlights">
                            {highlights
                              .slice(
                                0,
                                4
                              )
                              .map(
                                (
                                  highlight,
                                  highlightIndex
                                ) => (
                                  <div
                                    key={`${highlight}-${highlightIndex}`}
                                  >
                                    <span />

                                    <p>
                                      {
                                        highlight
                                      }
                                    </p>
                                  </div>
                                )
                              )}
                          </div>
                        )}
                      </div>

                      <aside className="education-record-meta">
                        <div className="education-meta-label">
                          ACADEMIC DETAILS
                        </div>

                        {location && (
                          <div className="education-meta-item">
                            <FiMapPin />

                            <div>
                              <span>
                                LOCATION
                              </span>

                              <strong>
                                {
                                  location
                                }
                              </strong>
                            </div>
                          </div>
                        )}

                        {(startYear ||
                          endYear) && (
                          <div className="education-meta-item">
                            <FiCalendar />

                            <div>
                              <span>
                                PERIOD
                              </span>

                              <strong>
                                {startYear}
                                {startYear &&
                                endYear
                                  ? " — "
                                  : ""}
                                {endYear}
                              </strong>
                            </div>
                          </div>
                        )}

                        {cgpa && (
                          <div className="education-cgpa">
                            <FiAward />

                            <div>
                              <span>
                                CGPA
                              </span>

                              <strong>
                                {
                                  cgpa
                                }
                              </strong>
                            </div>
                          </div>
                        )}

                        {item?.institutionUrl && (
                          <a
                            href={
                              item.institutionUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="education-link"
                          >
                            Institution
                            <FiArrowUpRight />
                          </a>
                        )}
                      </aside>
                    </div>
                  </motion.article>
                );
              }
            )}
          </div>
        )}

        <div className="education-footer">
          <span>
            LEARN / BUILD / IMPROVE
          </span>

          <div />

          <span>
            ACADEMIC FOUNDATION
          </span>
        </div>
      </div>
    </section>
  );
}

export default Education;
