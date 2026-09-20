import { useEffect, useState } from "react";
import {
  FiGithub,
  FiLinkedin,
  FiArrowUpRight,
  FiMenu,
  FiX,
} from "react-icons/fi";

import profileImage from "../assets/sample.png";
import "./Navbar.css";

function Navbar({ profile }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Education", id: "education" },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMenuOpen(false);
  };

  return (
    <header
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
    >
      <div className="navbar-container">
        {/* LEFT BRAND */}
        <div
          className="navbar-brand"
          onClick={() => scrollToSection("home")}
        >
          <div className="navbar-brand-image-wrap">
            <img
              src={profile?.profileImageUrl || profileImage}
              alt={profile?.fullName || "Suriyaprakash"}
              className="navbar-brand-image"
            />
          </div>

          <div className="navbar-brand-text">
            <h3>{profile?.fullName || "Suriyaprakash"}</h3>
            <span>{profile?.headline || "FULL-STACK DEVELOPER"}</span>
          </div>
        </div>

        {/* CENTER MENU */}
        <nav className="navbar-menu desktop-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              className="navbar-link"
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="navbar-actions">
          <a
            href={profile?.githubUrl || "https://github.com/suriyaprakash23112002"}
            target="_blank"
            rel="noreferrer"
            className="navbar-icon-btn"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>

          <a
            href={profile?.linkedinUrl || "https://www.linkedin.com/in/suriyaprakash-k-20821b352"}
            target="_blank"
            rel="noreferrer"
            className="navbar-icon-btn"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>

          <button
            className="navbar-contact-btn"
            onClick={() => scrollToSection("contact")}
          >
            Contact
            <FiArrowUpRight />
          </button>

          <button
            className="navbar-mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`navbar-mobile-menu ${
          menuOpen ? "navbar-mobile-menu-open" : ""
        }`}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            className="navbar-mobile-link"
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
          </button>
        ))}

        <button
          className="navbar-mobile-contact"
          onClick={() => scrollToSection("contact")}
        >
          Contact
          <FiArrowUpRight />
        </button>
      </div>
    </header>
  );
}

export default Navbar;