import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCalendar,
  FiMapPin,
} from "react-icons/fi";
import "./Experience.css";

function Experience({ experiences = [] }) {
  const items = experiences.filter(
    (experience) =>
      experience?.isActive !== false &&
      experience?.isVisible !== false
  );

  const roleOf = (item) =>
    item?.role ||
    item?.position ||
    item?.title ||
    item?.jobTitle ||
    "Full-Stack Developer";

  const companyOf = (item) =>
    item?.company ||
    item?.companyName ||
    item?.organization ||
    "Company";

  const locationOf = (item) =>
    item?.location ||
    item?.companyLocation ||
    "";

  const descriptionOf = (item) =>
    item?.description ||
    item?.summary ||
    "";

  const typeOf = (item) =>
    item?.employmentType ||
    item?.type ||
    "";

  const technologiesOf = (item) =>
    (item?.technologies || item?.skills || [])
      .map((value) =>
        typeof value === "string"
          ? value
          : value?.name || value?.skill?.name || ""
      )
      .filter(Boolean);

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);

    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const periodOf = (item) => {
    const start =
      item?.startYear ||
      formatDate(item?.startDate || item?.fromDate);

    const end =
      item?.isCurrent
        ? "Present"
        : item?.endYear ||
          formatDate(item?.endDate || item?.toDate);

    return [start, end].filter(Boolean).join(" — ");
  };

  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">
        <motion.div
          className="experience-heading"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <span>05 — EXPERIENCE</span>

          <div className="experience-heading-row">
            <h2>
              Practical experience.
              <em> Real delivery.</em>
            </h2>

            <p>
              The environments where I learned to turn requirements
              into working interfaces, APIs and production features.
            </p>
          </div>
        </motion.div>

        {items.length === 0 ? (
          <div className="experience-empty">
            <FiBriefcase />
            <span>Experience will appear here.</span>
          </div>
        ) : (
          <div className="experience-list">
            {items.map((item, index) => {
              const technologies = technologiesOf(item);

              return (
                <motion.article
                  className="experience-item"
                  key={item?.id || companyOf(item) + index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.48, delay: index * 0.05 }}
                >
                  <div className="experience-index">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="experience-core">
                    <div className="experience-kicker">
                      <span>{companyOf(item)}</span>

                      {item?.isCurrent && (
                        <small>
                          <i />
                          CURRENT
                        </small>
                      )}
                    </div>

                    <h3>{roleOf(item)}</h3>

                    {descriptionOf(item) && (
                      <p>{descriptionOf(item)}</p>
                    )}

                    {technologies.length > 0 && (
                      <div className="experience-stack">
                        {technologies.slice(0, 8).map((technology) => (
                          <span key={technology}>{technology}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <aside className="experience-meta">
                    {periodOf(item) && (
                      <div>
                        <FiCalendar />
                        <span>{periodOf(item)}</span>
                      </div>
                    )}

                    {locationOf(item) && (
                      <div>
                        <FiMapPin />
                        <span>{locationOf(item)}</span>
                      </div>
                    )}

                    {typeOf(item) && (
                      <span className="experience-type">
                        {typeOf(item)}
                      </span>
                    )}

                    {item?.companyUrl && (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Company
                        <FiArrowUpRight />
                      </a>
                    )}
                  </aside>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Experience;
