import { motion } from "framer-motion";
import {
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiMapPin,
} from "react-icons/fi";

import "./Education.css";

function Education({
  education = [],
}) {
  const items = education.filter(
    (item) =>
      item?.isActive !== false &&
      item?.isVisible !== false
  );

  const getInstitution = (item) =>
    item?.institution ||
    item?.institutionName ||
    item?.college ||
    item?.school ||
    item?.university ||
    "Institution";

  const getDegree = (item) =>
    item?.degree ||
    item?.qualification ||
    item?.course ||
    item?.title ||
    "Qualification";

  const getField = (item) =>
    item?.fieldOfStudy ||
    item?.specialization ||
    item?.field ||
    "";

  const getCgpa = (item) =>
    item?.cgpa ||
    item?.grade ||
    "";

  const getPeriod = (item) => {
    const start =
      item?.startYear || "";

    const end =
      item?.isCurrent ||
      item?.currentlyStudying
        ? "Present"
        : item?.endYear ||
          "";

    return [start, end]
      .filter(Boolean)
      .join(" — ");
  };

  return (
    <section
      id="education"
      className="education-section"
    >
      <div className="education-container">
        <motion.div
          className="education-header"
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
            06 / EDUCATION
          </span>

          <div className="education-heading-row">
            <h2>
              Academic
              <span>
                {" "}
                foundation.
              </span>
            </h2>

            <p>
              Education supports the
              technical foundation
              behind the way I approach
              development and problem
              solving.
            </p>
          </div>
        </motion.div>

        {items.length === 0 ? (
          <div className="education-empty">
            <FiBookOpen />
            <span>
              Education will appear
              here.
            </span>
          </div>
        ) : (
          <div className="education-grid">
            {items.map(
              (
                item,
                index
              ) => (
                <motion.article
                  className="education-card"
                  key={
                    item?.id ||
                    getInstitution(
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
                  <div className="education-card-top">
                    <span>
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    {getPeriod(
                      item
                    ) && (
                      <div>
                        <FiCalendar />
                        {getPeriod(
                          item
                        )}
                      </div>
                    )}
                  </div>

                  <h3>
                    {getDegree(
                      item
                    )}
                  </h3>

                  {getField(
                    item
                  ) && (
                    <p className="education-field">
                      {getField(
                        item
                      )}
                    </p>
                  )}

                  <div className="education-institution">
                    <FiBookOpen />

                    <div>
                      <small>
                        INSTITUTION
                      </small>

                      <strong>
                        {getInstitution(
                          item
                        )}
                      </strong>
                    </div>
                  </div>

                  {item?.location && (
                    <div className="education-location">
                      <FiMapPin />

                      <span>
                        {
                          item.location
                        }
                      </span>
                    </div>
                  )}

                  {getCgpa(
                    item
                  ) && (
                    <div className="education-cgpa">
                      <FiAward />

                      <div>
                        <small>
                          CGPA
                        </small>

                        <strong>
                          {getCgpa(
                            item
                          )}
                        </strong>
                      </div>
                    </div>
                  )}
                </motion.article>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Education;
