import {
  useEffect,
  useState,
} from "react";
import {
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
    { label: "Services", id: "about" },
    { label: "Work", id: "projects" },
    { label: "Stack", id: "skills" },
    { label: "Experience", id: "experience" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMenuOpen(false);
  };

  return (
    <header
      className={
        "navbar " +
        (scrolled ? "navbar-scrolled" : "")
      }
    >
      <div className="navbar-shell">
        <button
          type="button"
          className="navbar-brand"
          onClick={() => scrollTo("home")}
        >
          <span className="navbar-brand-image">
            <img
              src={
                profile?.profileImageUrl ||
                profileImage
              }
              alt={
                profile?.fullName ||
                "Suriyaprakash"
              }
            />
          </span>

          <span className="navbar-brand-copy">
            <strong>
              {profile?.fullName ||
                "Suriyaprakash"}
            </strong>

            <small>
              FREELANCE DEVELOPER
            </small>
          </span>
        </button>

        <nav className="navbar-links">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="navbar-contact"
            onClick={() => scrollTo("contact")}
          >
            Start a project
            <FiArrowUpRight />
          </button>

          <button
            type="button"
            className="navbar-menu"
            onClick={() =>
              setMenuOpen((value) => !value)
            }
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <div
        className={
          "navbar-mobile " +
          (menuOpen ? "navbar-mobile-open" : "")
        }
      >
        {navItems.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => scrollTo(item.id)}
          >
            <span>{item.label}</span>
            <FiArrowUpRight />
          </button>
        ))}

        <button
          type="button"
          className="navbar-mobile-contact"
          onClick={() => scrollTo("contact")}
        >
          <span>Start a project</span>
          <FiArrowUpRight />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
