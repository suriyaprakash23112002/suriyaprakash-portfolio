import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../sections/Hero";
import About from "../sections/About";
import TechStack from "../sections/TechStack";
import SystemArchitecture from "../sections/SystemArchitecture";
import Projects from "../sections/Projects";
import Experience from "../sections/Experience";
import Education from "../sections/Education";
import Contact from "../sections/Contact";

import { getPortfolio } from "../services/portfolioService";

import "./PortfolioPage.css";
import "./PortfolioReadability.css";

function PortfolioPage() {
  const [portfolio, setPortfolio] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =====================================================
     LOAD PORTFOLIO
  ===================================================== */

  useEffect(() => {
    const loadPortfolio =
      async ({ silent = false } = {}) => {
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

    const handleProfileUpdate = (
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
      handleProfileUpdate
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleProfileUpdate
      );
    };
  }, []);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="portfolio-page-loading">
        <div className="portfolio-loader">
          <div className="portfolio-loader-ring" />

          <span>
            SP
          </span>
        </div>

        <p>
          Loading portfolio...
        </p>
      </div>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <div className="portfolio-page-error">
        <div className="portfolio-error-code">
          &lt;/&gt;
        </div>

        <h2>
          Portfolio unavailable
        </h2>

        <p>
          {error}
        </p>

        <button
          type="button"
          onClick={() =>
            window.location.reload()
          }
        >
          Try Again
        </button>
      </div>
    );
  }

  /* =====================================================
     PORTFOLIO DATA
  ===================================================== */

  const profile =
    portfolio?.profile ||
    null;

  const skillCategories =
    portfolio?.skillCategories ||
    [];

  const projects =
    portfolio?.projects ||
    [];

  const experiences =
    portfolio?.experiences ||
    [];

  const education =
    portfolio?.education ||
    [];

  const settings =
    portfolio?.settings ||
    {};

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="portfolio-page">
      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar
        profile={profile}
      />

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="portfolio-main">
        {/* ===============================================
            01 - HERO
        =============================================== */}

        <Hero
          profile={profile}
        />

        {/* ===============================================
            02 - ABOUT
        =============================================== */}

        <About
          profile={profile}
        />

        {/* ===============================================
            03 - SKILLS & TECHNOLOGIES
        =============================================== */}

        <TechStack
          skillCategories={
            skillCategories
          }
        />

        {/* ===============================================
            04 - FULL-STACK ARCHITECTURE
        =============================================== */}

        <SystemArchitecture
          skillCategories={skillCategories}
          projects={projects}
        />

        {/* ===============================================
            05 - PROJECTS
        =============================================== */}

        <Projects
          projects={
            projects
          }
        />

        {/* ===============================================
            06 - EXPERIENCE
        =============================================== */}

        <Experience
          experiences={
            experiences
          }
        />

        {/* ===============================================
            07 - EDUCATION
        =============================================== */}

        <Education
          education={
            education
          }
        />

        {/* ===============================================
            08 - CONTACT
        =============================================== */}

        <Contact
          profile={profile}
          settings={settings}
        />
      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer
        profile={profile}
        settings={settings}
      />

    </div>
  );
}

export default PortfolioPage;