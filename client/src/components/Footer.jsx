import {
  FiArrowUp,
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";

import "./Footer.css";

function Footer({ profile }) {
  const email =
    profile?.email ||
    "suriyaprakashkumaran567@gmail.com";

  const githubUrl =
    profile?.githubUrl ||
    "https://github.com/suriyaprakash23112002";

  const linkedinUrl =
    profile?.linkedinUrl ||
    "https://www.linkedin.com/in/suriyaprakash-k-20821b352";

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const currentYear =
    new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-pitch">
            <span>AVAILABLE FOR FREELANCE</span>

            <h2>
              Need a website or
              web application?
            </h2>

            <button
              type="button"
              onClick={() =>
                scrollTo("contact")
              }
            >
              Start a conversation
              <FiArrowUpRight />
            </button>
          </div>

          <div className="footer-links">
            <div>
              <span>NAVIGATION</span>

              <button
                type="button"
                onClick={() =>
                  scrollTo("about")
                }
              >
                Services
              </button>

              <button
                type="button"
                onClick={() =>
                  scrollTo("projects")
                }
              >
                Work
              </button>

              <button
                type="button"
                onClick={() =>
                  scrollTo("skills")
                }
              >
                Stack
              </button>

              <button
                type="button"
                onClick={() =>
                  scrollTo("contact")
                }
              >
                Contact
              </button>
            </div>

            <div>
              <span>CONNECT</span>

              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FiGithub />
                GitHub
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FiLinkedin />
                LinkedIn
              </a>

              <a href={"mailto:" + email}>
                <FiMail />
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            <strong>
              {profile?.fullName ||
                "Suriyaprakash"}
            </strong>

            <span>
              Freelance Full-Stack
              Developer
            </span>
          </div>

          <p>
            © {currentYear} All rights
            reserved.
          </p>

          <button
            type="button"
            className="footer-top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            Back to top
            <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
