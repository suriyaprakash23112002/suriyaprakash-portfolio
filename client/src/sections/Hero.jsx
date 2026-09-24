import { motion } from "framer-motion";
import { FiArrowDownRight, FiArrowUpRight, FiCode, FiLayers, FiZap } from "react-icons/fi";
import profileImage from "../assets/sample.png";
import "./Hero.css";

function Hero({ profile }) {
  const name = profile?.fullName || "Suriyaprakash";
  const headline = profile?.headline || "Freelance Full-Stack Developer";
  const bio = profile?.shortBio || "I design and build modern websites and web applications that are clear, fast and ready for real users.";

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const services = [
    { icon: <FiLayers />, label: "Websites", text: "Modern, responsive business websites" },
    { icon: <FiCode />, label: "Web Apps", text: "Full-stack products, portals and dashboards" },
    { icon: <FiZap />, label: "Launch", text: "APIs, database setup and deployment" },
  ];

  return (
    <section id="home" className="hero-section">
      <div className="hero-shell">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="hero-status">
            <span />
            {profile?.availableForWork === false
              ? "Currently unavailable"
              : profile?.availabilityText || "Available for freelance projects"}
          </div>

          <p className="hero-eyebrow">{headline}</p>

          <h1>
            I build digital products
            <span> clients feel confident sharing.</span>
          </h1>

          <p className="hero-description">{bio}</p>

          <div className="hero-actions">
            <button
              type="button"
              className="hero-primary"
              onClick={() => scrollTo("contact")}
            >
              Discuss your project
              <FiArrowUpRight />
            </button>

            <button
              type="button"
              className="hero-secondary"
              onClick={() => scrollTo("projects")}
            >
              View selected work
              <FiArrowDownRight />
            </button>
          </div>

          <div className="hero-service-row">
            {services.map((service, index) => (
              <motion.div
                className="hero-service"
                key={service.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.18 + index * 0.08 }}
              >
                <div className="hero-service-icon">{service.icon}</div>
                <div>
                  <strong>{service.label}</strong>
                  <span>{service.text}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
        >
          <div className="hero-image-card">
            <img
              src={profile?.heroImageUrl || profile?.profileImageUrl || profileImage}
              alt={name}
            />

            <div className="hero-image-caption">
              <div>
                <span>YOUR DEVELOPMENT PARTNER</span>
                <strong>{name}</strong>
              </div>

              <div className="hero-image-availability">
                <i />
                ONLINE
              </div>
            </div>
          </div>

          <div className="hero-visual-note hero-note-top">
            <span>01</span>
            <strong>Understand</strong>
            <small>Your goals first</small>
          </div>

          <div className="hero-visual-note hero-note-bottom">
            <span>02</span>
            <strong>Build & ship</strong>
            <small>Clean and production-ready</small>
          </div>
        </motion.div>
      </div>

      <div className="hero-bottom">
        <span>SCROLL TO EXPLORE</span>
        <div />
        <span>WEB • PRODUCT • FULL-STACK</span>
      </div>
    </section>
  );
}

export default Hero;
