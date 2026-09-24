import { motion } from "framer-motion";
import { FiArrowUpRight, FiCheck, FiCode, FiLayout, FiServer, FiUploadCloud } from "react-icons/fi";
import "./About.css";

function About({ profile }) {
  const services = [
    {
      icon: <FiLayout />,
      title: "Business websites",
      text: "Clean, responsive websites that present your brand clearly and guide visitors toward action.",
      points: ["Responsive UI", "Clear content structure", "Fast loading"],
    },
    {
      icon: <FiCode />,
      title: "Web applications",
      text: "Custom interfaces, dashboards and product experiences built around your actual workflow.",
      points: ["React interfaces", "Admin dashboards", "Reusable components"],
    },
    {
      icon: <FiServer />,
      title: "Backend & data",
      text: "Reliable APIs, authentication and database structures that support real application features.",
      points: ["Node.js / Express", "Prisma / PostgreSQL", "API integration"],
    },
    {
      icon: <FiUploadCloud />,
      title: "Launch & support",
      text: "From environment setup to production deployment, I help move the build into a usable live product.",
      points: ["Vercel deployment", "Environment setup", "Post-launch fixes"],
    },
  ];

  const process = [
    ["01", "Discover", "Understand the goal, users and scope."],
    ["02", "Design", "Shape a clear structure and interaction flow."],
    ["03", "Build", "Develop frontend, backend and data layers."],
    ["04", "Launch", "Test, deploy and hand over cleanly."],
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <motion.div
          className="about-heading"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <span className="about-label">02 — SERVICES</span>
          <h2>
            One developer.
            <span> From idea to launch.</span>
          </h2>
          <p>
            {profile?.longBio ||
              "I work across design-minded frontend development, backend APIs, databases and deployment, so clients can move from an idea to a finished web product without juggling multiple developers."}
          </p>
        </motion.div>

        <div className="about-services">
          {services.map((service, index) => (
            <motion.article
              className="about-service-card"
              key={service.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="about-service-top">
                <div className="about-service-icon">{service.icon}</div>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>

              <h3>{service.title}</h3>
              <p>{service.text}</p>

              <div className="about-service-points">
                {service.points.map((point) => (
                  <span key={point}>
                    <FiCheck />
                    {point}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="about-process"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <div className="about-process-title">
            <span>HOW I WORK</span>
            <h3>A simple, transparent process.</h3>
          </div>

          <div className="about-process-steps">
            {process.map(([number, title, text]) => (
              <div className="about-process-step" key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="about-process-cta"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Tell me about your project
            <FiArrowUpRight />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
