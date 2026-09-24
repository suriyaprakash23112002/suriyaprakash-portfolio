import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCode,
  FiDatabase,
  FiLayout,
  FiServer,
} from "react-icons/fi";

import "./About.css";

function About({ profile }) {
  const services = [
    {
      icon: <FiLayout />,
      title: "Business websites",
      text: "Clear, responsive websites that make your brand look professional and make it easy for visitors to take action.",
    },
    {
      icon: <FiCode />,
      title: "Custom web apps",
      text: "Dashboards, portals and interactive web products built around your workflow instead of a generic template.",
    },
    {
      icon: <FiServer />,
      title: "Backend & APIs",
      text: "Authentication, business logic and API integrations that connect the interface to real application features.",
    },
    {
      icon: <FiDatabase />,
      title: "Database & launch",
      text: "Structured data, production setup and deployment so the finished product is ready to use and maintain.",
    },
  ];

  const process = [
    {
      number: "01",
      title: "Understand",
      text: "We define the goal, users and scope.",
    },
    {
      number: "02",
      title: "Plan",
      text: "I turn the idea into a clear build path.",
    },
    {
      number: "03",
      title: "Build",
      text: "Frontend, backend and data come together.",
    },
    {
      number: "04",
      title: "Launch",
      text: "I test, deploy and hand over the project.",
    },
  ];

  const goToContact = () => {
    document
      .getElementById("contact")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section
      id="about"
      className="about-section"
    >
      <div className="about-container">
        <motion.div
          className="about-header"
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.56,
          }}
        >
          <span className="about-label">
            02 / SERVICES
          </span>

          <div className="about-heading-row">
            <h2>
              What I can build
              <span>
                {" "}
                for your business.
              </span>
            </h2>

            <p>
              {profile?.longBio ||
                "I work across the full development process, from interface and user experience to backend APIs, databases and deployment."}
            </p>
          </div>
        </motion.div>

        <div className="about-services">
          {services.map(
            (
              service,
              index
            ) => (
              <motion.article
                className="about-service"
                key={service.title}
                initial={{
                  opacity: 0,
                  y: 22,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.48,
                  delay:
                    index * 0.05,
                }}
              >
                <div className="about-service-top">
                  <div>
                    {
                      service.icon
                    }
                  </div>

                  <span>
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>
                </div>

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.text}
                </p>
              </motion.article>
            )
          )}
        </div>

        <motion.div
          className="about-process"
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.18,
          }}
          transition={{
            duration: 0.56,
          }}
        >
          <div className="about-process-heading">
            <span>
              HOW WE WORK
            </span>

            <h3>
              Simple process.
              Clear communication.
            </h3>
          </div>

          <div className="about-process-steps">
            {process.map(
              (step) => (
                <div
                  key={
                    step.number
                  }
                  className="about-process-step"
                >
                  <span>
                    {step.number}
                  </span>

                  <strong>
                    {step.title}
                  </strong>

                  <p>
                    {step.text}
                  </p>
                </div>
              )
            )}
          </div>

          <button
            type="button"
            onClick={
              goToContact
            }
          >
            Discuss a project
            <FiArrowUpRight />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
