import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiCalendar,
  FiMapPin,
} from "react-icons/fi";

import "./Experience.css";

function Experience({
  experiences = [],
}) {
  const items = experiences.filter(
    (experience) =>
      experience?.isActive !== false &&
      experience?.isVisible !== false
  );

  const getRole = (item) =>
    item?.role ||
    item?.position ||
    item?.title ||
    item?.jobTitle ||
    "Full-Stack Developer";

  const getCompany = (item) =>
    item?.company ||
    item?.companyName ||
    item?.organization ||
    "Company";

  const getDescription = (item) =>
    item?.description ||
    item?.summary ||
    "";

  const getLocation = (item) =>
    item?.location ||
    item?.companyLocation ||
    "";

  const getTechnologies = (item) =>
    (
      item?.technologies ||
      item?.skills ||
      []
    )
      .map((value) =>
        typeof value === "string"
          ? value
          : value?.name ||
            value?.skill?.name ||
            ""
      )
      .filter(Boolean);

  const formatDate = (value) => {
    if (!value) {
      return "";
    }

    const date = new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
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

  const getPeriod = (item) => {
    const start =
      item?.startYear ||
      formatDate(
        item?.startDate ||
          item?.fromDate
      );

    const end =
      item?.isCurrent
        ? "Present"
        : item?.endYear ||
          formatDate(
            item?.endDate ||
              item?.toDate
          );

    return [start, end]
      .filter(Boolean)
      .join(" — ");
  };

  return (
    <section
      id="experience"
      className="experience-section"
    >
      <div className="experience-container">
        <motion.div
          className="experience-header"
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.56,
          }}
        >
          <span>
            05 / EXPERIENCE
          </span>

          <div className="experience-heading-row">
            <h2>
              Experience that
              <span>
                {" "}
                shaped how I build.
              </span>
            </h2>

            <p>
              Real project work,
              collaboration and
              production problem solving
              behind the portfolio.
            </p>
          </div>
        </motion.div>

        {items.length === 0 ? (
          <div className="experience-empty">
            <FiBriefcase />
            <span>
              Experience will appear
              here.
            </span>
          </div>
        ) : (
          <div className="experience-list">
            {items.map(
              (
                item,
                index
              ) => {
                const technologies =
                  getTechnologies(
                    item
                  );

                return (
                  <motion.article
                    className="experience-row"
                    key={
                      item?.id ||
                      getCompany(
                        item
                      ) +
                        "-" +
                        index
                    }
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
                      amount: 0.18,
                    }}
                    transition={{
                      duration: 0.48,
                      delay:
                        index *
                        0.04,
                    }}
                  >
                    <div className="experience-number">
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    <div className="experience-main">
                      <div className="experience-company-line">
                        <strong>
                          {getCompany(
                            item
                          )}
                        </strong>

                        {item?.isCurrent && (
                          <span>
                            CURRENT
                          </span>
                        )}
                      </div>

                      <h3>
                        {getRole(
                          item
                        )}
                      </h3>

                      {getDescription(
                        item
                      ) && (
                        <p>
                          {getDescription(
                            item
                          )}
                        </p>
                      )}

                      {technologies.length >
                        0 && (
                        <div className="experience-stack">
                          {technologies
                            .slice(
                              0,
                              8
                            )
                            .map(
                              (
                                technology
                              ) => (
                                <span
                                  key={
                                    technology
                                  }
                                >
                                  {
                                    technology
                                  }
                                </span>
                              )
                            )}
                        </div>
                      )}
                    </div>

                    <aside className="experience-meta">
                      {getPeriod(
                        item
                      ) && (
                        <div>
                          <FiCalendar />
                          <span>
                            {getPeriod(
                              item
                            )}
                          </span>
                        </div>
                      )}

                      {getLocation(
                        item
                      ) && (
                        <div>
                          <FiMapPin />
                          <span>
                            {getLocation(
                              item
                            )}
                          </span>
                        </div>
                      )}

                      {(item?.employmentType ||
                        item?.type) && (
                        <small>
                          {item?.employmentType ||
                            item?.type}
                        </small>
                      )}
                    </aside>
                  </motion.article>
                );
              }
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Experience;
