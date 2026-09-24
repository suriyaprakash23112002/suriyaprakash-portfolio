import { motion } from "framer-motion";
import {
  FiCode,
  FiDatabase,
  FiLayers,
  FiServer,
} from "react-icons/fi";

import "./TechStack.css";

function TechStack({
  skillCategories = [],
}) {
  const activeCategories =
    skillCategories
      .filter(
        (category) =>
          category?.isActive !==
          false
      )
      .map(
        (category) => ({
          ...category,
          skills: (
            category?.skills ||
            []
          ).filter(
            (skill) =>
              skill?.isActive !==
              false
          ),
        })
      )
      .filter(
        (category) =>
          category.skills
            .length > 0
      );

  const icons = [
    <FiCode />,
    <FiServer />,
    <FiDatabase />,
    <FiLayers />,
  ];

  return (
    <section
      id="skills"
      className="skills-section"
    >
      <div className="skills-container">
        <motion.div
          className="skills-header"
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
          <span>
            04 / STACK
          </span>

          <div className="skills-heading-row">
            <h2>
              Practical tools.
              <span>
                {" "}
                Clean execution.
              </span>
            </h2>

            <p>
              I use a focused stack
              that lets me build,
              connect and deploy
              complete web products
              efficiently.
            </p>
          </div>
        </motion.div>

        {activeCategories.length ===
        0 ? (
          <div className="skills-empty">
            Skills will appear here.
          </div>
        ) : (
          <div className="skills-grid">
            {activeCategories.map(
              (
                category,
                index
              ) => (
                <motion.article
                  className="skills-card"
                  key={
                    category?.id ||
                    category?.name ||
                    index
                  }
                  initial={{
                    opacity: 0,
                    y: 20,
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
                    duration: 0.46,
                    delay:
                      index *
                      0.04,
                  }}
                >
                  <div className="skills-card-top">
                    <div>
                      {
                        icons[
                          index %
                            icons.length
                        ]
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
                    {category?.name ||
                      "Technology"}
                  </h3>

                  {category?.description && (
                    <p>
                      {
                        category.description
                      }
                    </p>
                  )}

                  <div className="skills-list">
                    {category.skills.map(
                      (skill) => (
                        <span
                          key={
                            skill?.id ||
                            skill?.name
                          }
                        >
                          {
                            skill?.name
                          }
                        </span>
                      )
                    )}
                  </div>
                </motion.article>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default TechStack;
