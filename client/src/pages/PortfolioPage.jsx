import {
  useEffect,
  useRef,
  useState,
} from "react";
import { MotionConfig } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../sections/Hero";
import About from "../sections/About";
import Projects from "../sections/Projects";
import TechStack from "../sections/TechStack";
import Experience from "../sections/Experience";
import Education from "../sections/Education";
import Contact from "../sections/Contact";

import { getPortfolio } from "../services/portfolioService";

import "./PortfolioPage.css";

function PortfolioPage() {
  const [portfolio, setPortfolio] =
    useState(null);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  const cursorDotRef =
    useRef(null);
  const cursorRingRef =
    useRef(null);

  useEffect(() => {
    const finePointer =
      window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      );

    if (!finePointer.matches) {
      return undefined;
    }

    const dot =
      cursorDotRef.current;
    const ring =
      cursorRingRef.current;

    if (!dot || !ring) {
      return undefined;
    }

    document.body.classList.add(
      "freelance-cursor-enabled"
    );

    let frame = null;
    let x = -100;
    let y = -100;

    const paint = () => {
      dot.style.transform =
        `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      ring.style.transform =
        `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      frame = null;
    };

    const move = (event) => {
      x = event.clientX;
      y = event.clientY;

      dot.classList.add(
        "portfolio-cursor-visible"
      );

      ring.classList.add(
        "portfolio-cursor-visible"
      );

      const target =
        event.target instanceof Element
          ? event.target
          : null;

      ring.classList.toggle(
        "portfolio-cursor-active",
        Boolean(
          target?.closest(
            "a, button, [data-cursor]"
          )
        )
      );

      if (!frame) {
        frame =
          requestAnimationFrame(
            paint
          );
      }
    };

    const hide = () => {
      dot.classList.remove(
        "portfolio-cursor-visible"
      );

      ring.classList.remove(
        "portfolio-cursor-visible"
      );
    };

    window.addEventListener(
      "mousemove",
      move,
      { passive: true }
    );

    document.addEventListener(
      "mouseleave",
      hide
    );

    return () => {
      document.body.classList.remove(
        "freelance-cursor-enabled"
      );

      window.removeEventListener(
        "mousemove",
        move
      );

      document.removeEventListener(
        "mouseleave",
        hide
      );

      if (frame) {
        cancelAnimationFrame(
          frame
        );
      }
    };
  }, []);

  useEffect(() => {
    const loadPortfolio =
      async ({
        silent = false,
      } = {}) => {
        try {
          if (!silent) {
            setLoading(true);
          }

          setError("");

          const response =
            await getPortfolio();

          setPortfolio(
            response?.portfolio ||
              null
          );
        } catch (err) {
          console.error(
            "Portfolio loading error:",
            err
          );

          if (!silent) {
            setError(
              "Unable to load portfolio."
            );
          }
        } finally {
          if (!silent) {
            setLoading(false);
          }
        }
      };

    const handlePortfolioUpdate = (
      event
    ) => {
      if (
        event.key ===
        "portfolio_profile_updated_at"
      ) {
        loadPortfolio({
          silent: true,
        });
      }
    };

    loadPortfolio();

    window.addEventListener(
      "storage",
      handlePortfolioUpdate
    );

    return () => {
      window.removeEventListener(
        "storage",
        handlePortfolioUpdate
      );
    };
  }, []);

  useEffect(() => {
    document.title =
      "Suriyaprakash | Freelance Full-Stack Developer";

    let descriptionMeta =
      document.querySelector(
        'meta[name="description"]'
      );

    if (!descriptionMeta) {
      descriptionMeta =
        document.createElement(
          "meta"
        );

      descriptionMeta.setAttribute(
        "name",
        "description"
      );

      document.head.appendChild(
        descriptionMeta
      );
    }

    descriptionMeta.setAttribute(
      "content",
      "Freelance full-stack developer portfolio of Suriyaprakash — websites, web applications, dashboards, APIs and deployment."
    );
  }, []);

  if (loading) {
    return (
      <div className="portfolio-page-loading">
        <span className="portfolio-loading-mark">
          SP
        </span>

        <div className="portfolio-loading-line">
          <span />
        </div>

        <p>
          Preparing the portfolio
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portfolio-page-error">
        <span>
          SOMETHING WENT WRONG
        </span>

        <h1>
          The portfolio could not
          load.
        </h1>

        <p>{error}</p>

        <button
          type="button"
          onClick={() =>
            window.location.reload()
          }
        >
          Try again
        </button>
      </div>
    );
  }

  const profile =
    portfolio?.profile || null;

  const skillCategories =
    portfolio?.skillCategories ||
    [];

  const projects =
    portfolio?.projects || [];

  const experiences =
    portfolio?.experiences || [];

  const education =
    portfolio?.education || [];

  return (
    <MotionConfig reducedMotion="user">
      <div className="portfolio-page">
        <div
          ref={cursorRingRef}
          className="portfolio-cursor-ring"
          aria-hidden="true"
        />

        <div
          ref={cursorDotRef}
          className="portfolio-cursor-dot"
          aria-hidden="true"
        />

        <Navbar
          profile={profile}
        />

        <main className="portfolio-main">
          <Hero
            profile={profile}
          />

          <About
            profile={profile}
          />

          <Projects
            projects={projects}
          />

          <TechStack
            skillCategories={
              skillCategories
            }
          />

          <Experience
            experiences={
              experiences
            }
          />

          <Education
            education={education}
          />

          <Contact
            profile={profile}
          />
        </main>

        <Footer
          profile={profile}
        />
      </div>
    </MotionConfig>
  );
}

export default PortfolioPage;
