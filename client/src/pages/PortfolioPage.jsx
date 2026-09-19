import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../sections/Hero";
import About from "../sections/About";
import TechStack from "../sections/TechStack";
import Projects from "../sections/Projects";
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

  /* =====================================================
     LOAD PORTFOLIO
  ===================================================== */

  useEffect(() => {
    const loadPortfolio =
      async () => {
        try {
          setLoading(true);

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

          setError(
            "Unable to load portfolio."
          );
        } finally {
          setLoading(false);
        }
      };

    loadPortfolio();
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

  const career =
    portfolio?.career ||
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
            04 - PROJECTS
        =============================================== */}

        <Projects
          projects={
            projects
          }
        />

        {/* ===============================================
            05 - EXPERIENCE
        =============================================== */}

        <Experience
          experiences={
            experiences
          }
        />

        {/* ===============================================
            06 - EDUCATION
        =============================================== */}

        <Education
          education={
            education
          }
        />

        {/* ===============================================
            07 - CONTACT
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

      {/* =================================================
          CAREER DATA
          RESERVED FOR FUTURE USE
      ================================================= */}

      {/*
        career is already loaded:

        career

        We can later add a separate
        Career Journey section if needed.
      */}
    </div>
  );
}

export default PortfolioPage;