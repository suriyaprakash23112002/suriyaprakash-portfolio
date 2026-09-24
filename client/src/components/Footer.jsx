import {
  FiArrowUp,
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

  const currentYear =
    new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <strong>
            {profile?.fullName ||
              "Suriyaprakash"}
          </strong>

          <span>
            Freelance Full-Stack
            Developer
          </span>
        </div>

        <div className="footer-socials">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FiGithub />
            GitHub
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
            LinkedIn
          </a>

          <a
            href={
              "mailto:" +
              email
            }
          >
            <FiMail />
            Email
          </a>
        </div>

        <div className="footer-right">
          <span>
            © {currentYear}
          </span>

          <button
            type="button"
            onClick={
              scrollToTop
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
