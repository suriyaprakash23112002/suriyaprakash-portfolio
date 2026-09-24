import { motion } from "framer-motion";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiCheck,
} from "react-icons/fi";

import profileImage from "../assets/sample.png";

import "./Hero.css";

function Hero({ profile }) {
  const name =
    profile?.fullName || "Suriyaprakash";

  const role =
    profile?.headline ||
    "Freelance Full-Stack Developer";

  const shortBio =
    profile?.shortBio ||
    "I build clean, responsive websites and web applications that are easy to use, easy to maintain and ready for real customers.";

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const highlights = [
    "Responsive websites",
    "Custom web applications",
    "Backend, database & deployment",
  ];

  return (
    <section
      id="home"
      className="hero-section"
    >
      <div className="hero-container">
        <motion.div
          className="hero-copy"
          initial={{
            opacity: 0,
            y: 26,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.62,
            ease: "easeOut",
          }}
        >
          <div className="hero-availability">
            <span />

            {profile?.availableForWork ===
            false
              ? "Currently unavailable"
              : profile?.availabilityText ||
                "Available for freelance projects"}
          </div>

          <p className="hero-role">
            {role}
          </p>

          <h1>
            I build websites and
            <span>
              {" "}
              web apps people enjoy
              using.
            </span>
          </h1>

          <p className="hero-description">
            {shortBio}
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="hero-action-primary"
              onClick={() =>
                scrollTo("contact")
              }
            >
              Start a project
              <FiArrowUpRight />
            </button>

            <button
              type="button"
              className="hero-action-secondary"
              onClick={() =>
                scrollTo("projects")
              }
            >
              See my work
              <FiArrowDownRight />
            </button>
          </div>

          <div className="hero-highlights">
            {highlights.map(
              (item) => (
                <span key={item}>
                  <FiCheck />
                  {item}
                </span>
              )
            )}
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{
            opacity: 0,
            x: 28,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.66,
            delay: 0.06,
            ease: "easeOut",
          }}
        >
          <div className="hero-image-wrap">
            <img
              src={
                profile?.heroImageUrl ||
                profile?.profileImageUrl ||
                profileImage
              }
              alt={name}
            />
          </div>

          <div className="hero-card hero-card-name">
            <span>WORKING WITH</span>

            <strong>
              {name}
            </strong>
          </div>

          <div className="hero-card hero-card-service">
            <span>
              FULL-STACK DELIVERY
            </span>

            <strong>
              Design → Build → Launch
            </strong>
          </div>
        </motion.div>
      </div>

      <div className="hero-scroll-line">
        <span>
          FREELANCE DEVELOPMENT
        </span>

        <div />

        <span>
          WEB • APP • API
        </span>
      </div>
    </section>
  );
}

export default Hero;
