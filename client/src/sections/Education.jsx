import { motion } from "framer-motion";

import {
  FiBookOpen,
  FiCalendar,
  FiMapPin,
  FiAward,
  FiArrowUpRight,
} from "react-icons/fi";

import "./Education.css";

function Education({
  education = [],
}) {
  /* =====================================================
     ACTIVE EDUCATION
  ===================================================== */

  const activeEducation =
    education.filter(
      (item) =>
        item?.isActive !== false
    );

  /* =====================================================
     HELPERS
  ===================================================== */

  const formatDate = (value) => {
    if (!value) return "";

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
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

  const getGrade = (
    item
  ) =>
    item?.grade ||
    item?.cgpa ||
    item?.percentage ||
    "";

  const getStartDate = (
    item
  ) =>
    item?.startYear ||
    formatDate(
      item?.startDate ||
        item?.fromDate
    );

  const getEndDate = (
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
      formatDate(
        item?.endDate ||
          item?.toDate
      ) || ""
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
      return item.highlights;
    }

    if (
      Array.isArray(
        item?.achievements
      )
    ) {
      return item.achievements;
    }

    return [];
  };

    return (
    <section
      id="education"
      className="education-section"
    >
      {/* BACKGROUND */}

      <div className="education-grid" />

      <div className="education-glow education-glow-one" />

      <div className="education-glow education-glow-two" />

      <div className="education-container">
        {/* ============================================
            SECTION LABEL
        ============================================ */}

        <motion.div
          className="education-section-label"
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
            duration: 0.5,
          }}
        >
          <span>
            07
          </span>

          <div />

          <strong>
            EDUCATION
          </strong>
        </motion.div>

        {/* ============================================
            HEADER
        ============================================ */}

        <div className="education-header">
          <motion.div
            className="education-heading"
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
            <div className="education-status">
              <span />

              ACADEMIC FOUNDATION
            </div>

            <h2>
              Education behind
              <span>
                {" "}
                my technical foundation.
              </span>
            </h2>
          </motion.div>

          <motion.p
            className="education-intro"
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
            My academic journey and
            the learning foundation
            that supports how I
            approach software
            development.
          </motion.p>
        </div>

        {/* ============================================
            EDUCATION LIST
        ============================================ */}

        {activeEducation.length === 0 ? (
          <div className="education-empty">
            <FiBookOpen />

            <span>
              ACADEMIC FOUNDATION
            </span>

            <h3>
              Learning that supports
              the way I build.
            </h3>

            <p>
              My qualifications and
              academic milestones will
              appear here as part of my
              development story.
            </p>
          </div>
        ) : (
        <div className="education-list">
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

              const grade =
                getGrade(
                  item
                );

              const startDate =
                getStartDate(
                  item
                );

              const endDate =
                getEndDate(
                  item
                );

              const highlights =
                getHighlights(
                  item
                );

              return (
                <motion.article
                  className="education-item"
                  key={
                    item?.id ||
                    `${institution}-${degree}-${index}`
                  }
                  initial={{
                    opacity: 0,
                    y: 30,
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
                    duration: 0.65,
                    delay:
                      index * 0.07,
                  }}
                >
                  {/* INDEX */}

                  <div className="education-index">
                    <span>
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <div>
                      <FiBookOpen />
                    </div>
                  </div>

                  {/* MAIN */}

                  <div className="education-main">
                    <span className="education-record-label">
                      QUALIFICATION
                    </span>

                    <h3>
                      {degree}
                    </h3>

                    {field && (
                      <p className="education-field">
                        {field}
                      </p>
                    )}

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

                  {/* META */}

                  <div className="education-meta">
                    <div className="education-institution">
                      <span>
                        INSTITUTION
                      </span>

                      <strong>
                        {
                          institution
                        }
                      </strong>
                    </div>

                    {location && (
                      <div className="education-meta-row">
                        <FiMapPin />

                        <span>
                          {
                            location
                          }
                        </span>
                      </div>
                    )}

                    {(startDate ||
                      endDate) && (
                      <div className="education-meta-row">
                        <FiCalendar />

                        <span>
                          {startDate}
                          {startDate &&
                          endDate
                            ? " — "
                            : ""}
                          {endDate}
                        </span>
                      </div>
                    )}

                    {grade && (
                      <div className="education-grade">
                        <FiAward />

                        <div>
                          <span>
                            RESULT
                          </span>

                          <strong>
                            {
                              grade
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
                        Visit institution

                        <FiArrowUpRight />
                      </a>
                    )}
                  </div>
                </motion.article>
              );
            }
          )}
        </div>

        {/* ============================================
            FOOTER
        ============================================ */}

        <motion.div
          className="education-footer"
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
          <span>
            CONTINUOUS LEARNING
          </span>

          <div />

          <span>
            BUILD • LEARN • IMPROVE
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default Education;