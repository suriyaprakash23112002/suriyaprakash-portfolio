import {
  FiArrowUp,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiCode,
  FiFileText,
} from "react-icons/fi";

import profileImage from "../assets/sample.png";

import "./Footer.css";

function Footer({
  profile,
}) {
  /* =====================================================
     DATA
  ===================================================== */

  const email =
    profile?.email ||
    "suriyaprakashkumaran567@gmail.com";

  const githubUrl =
    profile?.githubUrl ||
    "https://github.com/suriyaprakash23112002";

  const linkedinUrl =
    profile?.linkedinUrl ||
    "https://www.linkedin.com/in/suriyaprakash-k-20821b352";

  const footerText =
    "Designed and developed by Suriyaprakash";

  const currentYear =
    new Date().getFullYear();

  /* =====================================================
     NAVIGATION
  ===================================================== */

  const navItems = [
    {
      label: "About",
      id: "about",
    },
    {
      label: "Skills",
      id: "skills",
    },
    {
      label: "Projects",
      id: "projects",
    },
    {
      label: "Experience",
      id: "experience",
    },
    {
      label: "Education",
      id: "education",
    },
    {
      label: "Contact",
      id: "contact",
    },
  ];

  const scrollToSection = (
    id
  ) => {
    const element =
      document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-glow" />

      <div className="footer-container">
        {/* =================================================
            TOP
        ================================================= */}

        <div className="footer-top">
          {/* BRAND */}

          <div className="footer-brand">
            <button
              type="button"
              className="footer-profile-button"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <span className="footer-profile-ring" />

              <img
                src={profile?.profileImageUrl || profileImage}
                alt={profile?.fullName || "Suriyaprakash"}
                className="footer-profile-image"
              />
            </button>

            <div className="footer-brand-copy">
              <strong>
                {profile?.fullName || "Suriyaprakash"}
              </strong>

              <span>
                {profile?.headline || "FULL-STACK DEVELOPER"}
              </span>
            </div>
          </div>

          {/* NAVIGATION */}

          <nav className="footer-navigation">
            {navItems.map(
              (item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() =>
                    scrollToSection(
                      item.id
                    )
                  }
                >
                  {item.label}
                </button>
              )
            )}
          </nav>

          {/* SOCIAL */}

          <div className="footer-socials">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FiGithub />
              </a>
            )}

            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                aria-label="Email"
              >
                <FiMail />
              </a>
            )}

            {profile?.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Resume"
                title="Resume"
              >
                <FiFileText />
              </a>
            )}
          </div>
        </div>

        {/* =================================================
            DIVIDER
        ================================================= */}

        <div className="footer-divider">
          <span />

          <FiCode />

          <span />
        </div>

        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="footer-bottom">
          <div className="footer-copyright">
            <span>
              © {currentYear}
            </span>

            <strong>
              {profile?.fullName || "Suriyaprakash"}
            </strong>

            <span>
              All rights reserved.
            </span>
          </div>

          <div className="footer-built">
            <span>
              {footerText}
            </span>
          </div>

          <button
            type="button"
            className="footer-top-button"
            onClick={
              scrollToTop
            }
          >
            <span>
              BACK TO TOP
            </span>

            <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;