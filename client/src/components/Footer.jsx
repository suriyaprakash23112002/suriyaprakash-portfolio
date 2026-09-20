import {
  FiArrowUp,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiCode,
} from "react-icons/fi";

import "./Footer.css";

function Footer({
  profile,
  settings = {},
}) {
  /* =====================================================
     SETTINGS HELPER
  ===================================================== */

  const getSetting = (
    ...possibleKeys
  ) => {
    if (
      Array.isArray(settings)
    ) {
      for (
        const key of possibleKeys
      ) {
        const found =
          settings.find(
            (item) =>
              item?.key
                ?.toLowerCase() ===
                key.toLowerCase() ||
              item?.name
                ?.toLowerCase() ===
                key.toLowerCase()
          );

        if (found) {
          return (
            found?.value ||
            found?.settingValue ||
            ""
          );
        }
      }

      return "";
    }

    if (
      settings &&
      typeof settings === "object"
    ) {
      for (
        const key of possibleKeys
      ) {
        if (
          settings[key] !== undefined
        ) {
          const value =
            settings[key];

          if (
            typeof value ===
            "object"
          ) {
            return (
              value?.value ||
              value?.settingValue ||
              ""
            );
          }

          return value || "";
        }
      }
    }

    return "";
  };

  /* =====================================================
     DATA
  ===================================================== */

  const email =
    profile?.email ||
    profile?.contactEmail ||
    getSetting(
      "email",
      "contactEmail",
      "contact_email"
    );

  const githubUrl =
    profile?.githubUrl ||
    getSetting(
      "github",
      "githubUrl",
      "github_url"
    );

  const linkedinUrl =
    profile?.linkedinUrl ||
    getSetting(
      "linkedin",
      "linkedinUrl",
      "linkedin_url"
    );

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
      label: "Architecture",
      id: "architecture",
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
              className="footer-logo"
              onClick={
                scrollToTop
              }
              aria-label="Back to top"
            >
              SP
            </button>

            <div className="footer-brand-copy">
              <strong>
                Suriyaprakash
              </strong>

              <span>
                FULL-STACK DEVELOPER
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
              Suriyaprakash
            </strong>

            <span>
              All rights reserved.
            </span>
          </div>

          <div className="footer-built">
            <span>
              DESIGNED & BUILT
            </span>

            <i />

            <strong>
              WITH REACT
            </strong>
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