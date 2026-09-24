import {
  useEffect,
  useState,
} from "react";

import {
  FiArrowUpRight,
  FiGithub,
  FiMenu,
  FiX,
} from "react-icons/fi";

import profileImage from "../assets/sample.png";

import "./Navbar.css";

function Navbar({ profile }) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(
        window.scrollY > 24
      );
    };

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );
    };
  }, []);

  const navItems = [
    {
      label: "Services",
      id: "about",
    },
    {
      label: "Work",
      id: "projects",
    },
    {
      label: "Stack",
      id: "skills",
    },
    {
      label: "Experience",
      id: "experience",
    },
    {
      label: "Contact",
      id: "contact",
    },
  ];

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    setMenuOpen(false);
  };

  return (
    <header
      className={`navbar ${
        scrolled
          ? "navbar-scrolled"
          : ""
      }`}
    >
      <div className="navbar-container">
        <button
          type="button"
          className="navbar-brand"
          onClick={() =>
            scrollTo("home")
          }
          data-cursor
        >
          <span className="navbar-brand-avatar">
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
              FREELANCE FULL-STACK
            </small>
          </span>
        </button>

        <nav className="navbar-links">
          {navItems.map(
            (item) => (
              <button
                type="button"
                key={item.id}
                onClick={() =>
                  scrollTo(item.id)
                }
              >
                {item.label}
              </button>
            )
          )}
        </nav>

        <div className="navbar-actions">
          {profile?.githubUrl && (
            <a
              href={
                profile.githubUrl
              }
              target="_blank"
              rel="noreferrer"
              className="navbar-github"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
          )}

          <button
            type="button"
            className="navbar-cta"
            onClick={() =>
              scrollTo("contact")
            }
          >
            Start a project
            <FiArrowUpRight />
          </button>

          <button
            type="button"
            className="navbar-menu-toggle"
            onClick={() =>
              setMenuOpen(
                (value) => !value
              )
            }
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <FiX />
            ) : (
              <FiMenu />
            )}
          </button>
        </div>
      </div>

      <div
        className={`navbar-mobile ${
          menuOpen
            ? "navbar-mobile-open"
            : ""
        }`}
      >
        {navItems.map(
          (item) => (
            <button
              type="button"
              key={item.id}
              onClick={() =>
                scrollTo(item.id)
              }
            >
              <span>
                {item.label}
              </span>

              <FiArrowUpRight />
            </button>
          )
        )}
      </div>
    </header>
  );
}

export default Navbar;
