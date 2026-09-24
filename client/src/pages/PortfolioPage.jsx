import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  MotionConfig,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

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
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ringRef = useRef(null);
  const dotRef = useRef(null);

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);

  const ringX = useSpring(pointerX, {
    stiffness: 420,
    damping: 34,
    mass: 0.45,
  });

  const ringY = useSpring(pointerY, {
    stiffness: 420,
    damping: 34,
    mass: 0.45,
  });

  useEffect(() => {
    const pointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    if (!pointerQuery.matches) {
      return undefined;
    }

    const ring = ringRef.current;
    const dot = dotRef.current;

    if (!ring || !dot) {
      return undefined;
    }

    document.body.classList.add("portfolio-custom-cursor");

    const handleMove = (event) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);

      ring.classList.add("portfolio-cursor-visible");
      dot.classList.add("portfolio-cursor-visible");

      const target =
        event.target instanceof Element
          ? event.target
          : null;

      ring.classList.toggle(
        "portfolio-cursor-active",
        Boolean(
          target?.closest(
            "a, button, [data-cursor='active']"
          )
        )
      );
    };

    const hide = () => {
      ring.classList.remove("portfolio-cursor-visible");
      dot.classList.remove("portfolio-cursor-visible");
    };

    window.addEventListener("mousemove", handleMove, {
      passive: true,
    });

    document.addEventListener("mouseleave", hide);

    return () => {
      document.body.classList.remove("portfolio-custom-cursor");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", hide);
    };
  }, [pointerX, pointerY]);

  useEffect(() => {
    const loadPortfolio = async ({ silent = false } = {}) => {
      try {
        if (!silent) {
          setLoading(true);
        }

        setError("");

        const response = await getPortfolio();

        setPortfolio(response?.portfolio || null);
      } catch (err) {
        console.error("Portfolio loading error:", err);

        if (!silent) {
          setError("Unable to load the portfolio right now.");
        }
      } finally {
        if (!silent) {
          setLoading(false);
        }
      }
    };

    const handlePortfolioUpdate = (event) => {
      if (event.key === "portfolio_profile_updated_at") {
        loadPortfolio({ silent: true });
      }
    };

    loadPortfolio();

    window.addEventListener("storage", handlePortfolioUpdate);

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

    let description = document.querySelector(
      'meta[name="description"]'
    );

    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }

    description.setAttribute(
      "content",
      "Freelance full-stack developer building clean websites, web applications, APIs and production-ready digital experiences."
    );
  }, []);

  if (loading) {
    return (
      <div className="portfolio-loading">
        <div className="portfolio-loading-mark">SP</div>

        <div className="portfolio-loading-track">
          <span />
        </div>

        <p>Loading experience</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portfolio-error">
        <span>PORTFOLIO UNAVAILABLE</span>

        <h1>Something didn&apos;t load correctly.</h1>

        <p>{error}</p>

        <button
          type="button"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    );
  }

  const profile = portfolio?.profile || null;
  const skillCategories =
    portfolio?.skillCategories || [];
  const projects = portfolio?.projects || [];
  const experiences = portfolio?.experiences || [];
  const education = portfolio?.education || [];

  return (
    <MotionConfig reducedMotion="user">
      <div className="portfolio-page">
        <motion.div
          ref={ringRef}
          className="portfolio-cursor-ring"
          style={{
            x: ringX,
            y: ringY,
          }}
          aria-hidden="true"
        />

        <motion.div
          ref={dotRef}
          className="portfolio-cursor-dot"
          style={{
            x: pointerX,
            y: pointerY,
          }}
          aria-hidden="true"
        />

        <Navbar profile={profile} />

        <main>
          <Hero profile={profile} />
          <About profile={profile} />
          <Projects projects={projects} />
          <TechStack skillCategories={skillCategories} />
          <Experience experiences={experiences} />
          <Education education={education} />
          <Contact profile={profile} />
        </main>

        <Footer profile={profile} />
      </div>
    </MotionConfig>
  );
}

export default PortfolioPage;
