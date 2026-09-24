import { motion } from "framer-motion";
import { FiAward, FiBookOpen, FiCalendar, FiMapPin } from "react-icons/fi";
import "./Education.css";

function Education({ education = [] }) {
  const items = education.filter(
    (item) =>
      item?.isActive !== false &&
      item?.isVisible !== false
  );

  const institutionOf = (item) =>
    item?.institution ||
    item?.institutionName ||
    item?.college ||
    item?.school ||
    item?.university ||
    "Institution";

  const degreeOf = (item) =>
    item?.degree ||
    item?.qualification ||
    item?.course ||
    item?.title ||
    "Qualification";

  const fieldOf = (item) =>
    item?.fieldOfStudy ||
    item?.specialization ||
    item?.field ||
    "";

  const cgpaOf = (item) =>
    item?.cgpa ||
    item?.grade ||
    "";

  const periodOf = (item) => {
    const start = item?.startYear || "";
    const end =
      item?.isCurrent || item?.currentlyStudying
        ? "Present"
        : item?.endYear || "";

    return [start, end].filter(Boolean).join(" — ");
  };

  return (
    <section id="education" className="education-section">
      <div className="education-container">
        <motion.div
          className="education-heading"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <span>06 — EDUCATION</span>

          <div className="education-heading-row">
            <h2>
              The foundation
              <em> behind the work.</em>
            </h2>

            <p>
              Academic milestones that support the way I approach
              software, systems and continuous learning.
            </p>
          </div>
        </motion.div>

        {items.length === 0 ? (
          <div className="education-empty">
            <FiBookOpen />
            <span>Education will appear here.</span>
          </div>
        ) : (
          <div className="education-grid">
            {items.map((item, index) => (
              <motion.article
                className="education-card"
                key={item?.id || institutionOf(item) + index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.48, delay: index * 0.05 }}
              >
                <div className="education-card-top">
                  <span>{String(index + 1).padStart(2, "0")}</span>

                  <div className="education-card-period">
                    <FiCalendar />
                    {periodOf(item) || "Academic record"}
                  </div>
                </div>

                <div className="education-card-main">
                  <small>QUALIFICATION</small>
                  <h3>{degreeOf(item)}</h3>

                  {fieldOf(item) && (
                    <p className="education-field">{fieldOf(item)}</p>
                  )}

                  <div className="education-institution">
                    <FiBookOpen />
                    <div>
                      <span>INSTITUTION</span>
                      <strong>{institutionOf(item)}</strong>
                    </div>
                  </div>

                  {item?.location && (
                    <div className="education-location">
                      <FiMapPin />
                      <span>{item.location}</span>
                    </div>
                  )}

                  {item?.description && (
                    <p className="education-description">{item.description}</p>
                  )}
                </div>

                {cgpaOf(item) && (
                  <div className="education-cgpa">
                    <FiAward />
                    <div>
                      <span>CGPA</span>
                      <strong>{cgpaOf(item)}</strong>
                    </div>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Education;
