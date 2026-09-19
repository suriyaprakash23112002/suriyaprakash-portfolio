import { useState } from "react";
import { motion } from "framer-motion";

import {
  FiMail,
  FiMessageCircle,
  FiGithub,
  FiLinkedin,
  FiArrowUpRight,
  FiCopy,
  FiCheck,
  FiCode,
} from "react-icons/fi";

import "./Contact.css";

function Contact({
  profile,
  settings = {},
}) {
  const [copied, setCopied] =
    useState(false);

  /* =====================================================
     SETTINGS HELPER
  ===================================================== */

  const getSetting = (
    ...possibleKeys
  ) => {
    /*
      Supports settings as:

      {
        whatsapp: "...",
        email: "..."
      }

      OR

      [
        {
          key: "whatsapp",
          value: "..."
        }
      ]
    */

    if (
      Array.isArray(settings)
    ) {
      for (
        const key of possibleKeys
      ) {
        const found =
          settings.find(
            (item) =>
              item?.key
                ?.toLowerCase() ===
                key.toLowerCase() ||
              item?.name
                ?.toLowerCase() ===
                key.toLowerCase()
          );

        if (found) {
          return (
            found?.value ||
            found?.settingValue ||
            ""
          );
        }
      }

      return "";
    }

    if (
      settings &&
      typeof settings === "object"
    ) {
      for (
        const key of possibleKeys
      ) {
        if (
          settings[key] !==
          undefined
        ) {
          const value =
            settings[key];

          if (
            typeof value ===
            "object"
          ) {
            return (
              value?.value ||
              value?.settingValue ||
              ""
            );
          }

          return value || "";
        }
      }
    }

    return "";
  };

  /* =====================================================
     CONTACT DATA
  ===================================================== */

  const email =
    profile?.email ||
    profile?.contactEmail ||
    getSetting(
      "email",
      "contactEmail",
      "contact_email"
    ) ||
    "suriyaprakashkumaran567@gmail.com";

  const directWhatsappUrl =
    profile?.whatsappUrl ||
    getSetting(
      "whatsappUrl",
      "whatsapp_url"
    );

  const rawWhatsapp =
    profile?.phone ||
    getSetting(
      "whatsapp",
      "whatsappNumber",
      "whatsapp_number",
      "phone"
    );

  const githubUrl =
    profile?.githubUrl ||
    getSetting(
      "github",
      "githubUrl",
      "github_url"
    );

  const linkedinUrl =
    profile?.linkedinUrl ||
    getSetting(
      "linkedin",
      "linkedinUrl",
      "linkedin_url"
    );

  /* =====================================================
     WHATSAPP
  ===================================================== */

  const whatsappNumber =
    rawWhatsapp
      ? String(
          rawWhatsapp
        ).replace(/\D/g, "")
      : "";

  const whatsappMessage =
    encodeURIComponent(
      `Hi Suriyaprakash, I came across your portfolio and would like to connect with you.`
    );

  const whatsappUrl =
    directWhatsappUrl ||
    (whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
      : "");

  /* =====================================================
     COPY EMAIL
  ===================================================== */

  const copyEmail =
    async () => {
      try {
        await navigator.clipboard.writeText(
          email
        );

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 1800);
      } catch (error) {
        console.error(
          "Unable to copy email:",
          error
        );
      }
    };

  /* =====================================================
     CHANNELS
  ===================================================== */

  const contactChannels = [
    {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      icon: <FiMail />,
      type: "email",
    },

    whatsappUrl && {
      label: "WhatsApp",
      value:
        rawWhatsapp ||
        "Message me",
      href: whatsappUrl,
      icon:
        <FiMessageCircle />,
      type: "whatsapp",
    },

    githubUrl && {
      label: "GitHub",
      value: "View repositories",
      href: githubUrl,
      icon: <FiGithub />,
      type: "github",
    },

    linkedinUrl && {
      label: "LinkedIn",
      value:
        "Professional profile",
      href: linkedinUrl,
      icon: <FiLinkedin />,
      type: "linkedin",
    },
  ].filter(Boolean);

  return (
    <section
      id="contact"
      className="contact-section"
    >
      {/* BACKGROUND */}

      <div className="contact-grid" />

      <div className="contact-glow contact-glow-one" />

      <div className="contact-glow contact-glow-two" />

      <div className="contact-container">
        {/* ============================================
            SECTION LABEL
        ============================================ */}

        <motion.div
          className="contact-section-label"
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <span>
            07
          </span>

          <div />

          <strong>
            CONTACT
          </strong>
        </motion.div>

        {/* ============================================
            MAIN
        ============================================ */}

        <div className="contact-main">
          {/* ==========================================
              LEFT
          ========================================== */}

          <motion.div
            className="contact-content"
            initial={{
              opacity: 0,
              x: -35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="contact-status">
              <span />

              OPEN TO CONVERSATIONS
            </div>

            <h2>
              Have an idea?
              <span>
                {" "}
                Let's build something
                meaningful.
              </span>
            </h2>

            <p>
              Whether it is a web
              application, full-stack
              project, collaboration or
              professional opportunity,
              feel free to reach out
              directly.
            </p>

            {/* EMAIL CTA */}

            <motion.a
              href={`mailto:${email}`}
              className="contact-main-button"
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <span>
                Start a conversation
              </span>

              <FiArrowUpRight />
            </motion.a>

            {/* RESPONSE NOTE */}

            <div className="contact-response">
              <div className="contact-response-icon">
                <FiCode />
              </div>

              <div>
                <span>
                  RESPONSE
                </span>

                <strong>
                  Usually available to
                  discuss new
                  opportunities
                </strong>
              </div>
            </div>
          </motion.div>

          {/* ==========================================
              RIGHT
          ========================================== */}

          <motion.div
            className="contact-directory"
            initial={{
              opacity: 0,
              x: 35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.75,
            }}
          >
            {/* HEADER */}

            <div className="contact-directory-header">
              <span>
                CONTACT DIRECTORY
              </span>

              <div>
                <span />
                ONLINE
              </div>
            </div>

            {/* CHANNELS */}

            <div className="contact-channels">
              {contactChannels.map(
                (
                  channel,
                  index
                ) => (
                  <motion.div
                    className="contact-channel"
                    key={
                      channel.type
                    }
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.45,
                      delay:
                        index * 0.07,
                    }}
                  >
                    <a
                      href={
                        channel.href
                      }
                      target={
                        channel.type ===
                        "email"
                          ? undefined
                          : "_blank"
                      }
                      rel={
                        channel.type ===
                        "email"
                          ? undefined
                          : "noreferrer"
                      }
                      className="contact-channel-link"
                    >
                      <div className="contact-channel-left">
                        <div className="contact-channel-icon">
                          {
                            channel.icon
                          }
                        </div>

                        <div className="contact-channel-copy">
                          <span>
                            {
                              channel.label
                            }
                          </span>

                          <strong>
                            {
                              channel.value
                            }
                          </strong>
                        </div>
                      </div>

                      <FiArrowUpRight className="contact-channel-arrow" />
                    </a>

                    {/* COPY EMAIL */}

                    {channel.type ===
                      "email" && (
                      <button
                        type="button"
                        className="contact-copy-button"
                        onClick={
                          copyEmail
                        }
                        aria-label="Copy email"
                      >
                        {copied ? (
                          <FiCheck />
                        ) : (
                          <FiCopy />
                        )}
                      </button>
                    )}
                  </motion.div>
                )
              )}
            </div>

            {/* BOTTOM */}

            <div className="contact-directory-bottom">
              <div>
                <span>
                  STATUS
                </span>

                <strong>
                  {profile?.availableForWork === false
                    ? "Currently unavailable"
                    : profile?.availabilityText || "Available for opportunities"}
                </strong>
              </div>

              <motion.span
                className="contact-directory-pulse"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(34,197,94,0.35)",
                    "0 0 0 8px rgba(34,197,94,0)",
                    "0 0 0 0 rgba(34,197,94,0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* ============================================
            FOOTER SIGNATURE
        ============================================ */}

        <div className="contact-signature">
          <span>
            SURIYAPRAKASH
          </span>

          <div />

          <span>
            FULL-STACK DEVELOPER
          </span>
        </div>
      </div>
    </section>
  );
}

export default Contact;