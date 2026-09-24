import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCheck,
  FiCopy,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiMessageCircle,
} from "react-icons/fi";
import "./Contact.css";

function Contact({ profile }) {
  const [copied, setCopied] = useState(false);

  const email =
    profile?.email ||
    "suriyaprakashkumaran567@gmail.com";

  const phone =
    profile?.phone || "";

  const whatsappNumber =
    String(phone).replace(/D/g, "");

  const whatsappUrl =
    profile?.whatsappUrl ||
    (whatsappNumber
      ? "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(
          "Hi Suriyaprakash, I saw your portfolio and would like to discuss a project."
        )
      : "");

  const githubUrl =
    profile?.githubUrl ||
    "https://github.com/suriyaprakash23112002";

  const linkedinUrl =
    profile?.linkedinUrl ||
    "https://www.linkedin.com/in/suriyaprakash-k-20821b352";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      console.error("Unable to copy email:", error);
    }
  };

  const channels = [
    {
      label: "Email",
      value: email,
      href: "mailto:" + email,
      icon: <FiMail />,
    },
    whatsappUrl && {
      label: "WhatsApp",
      value: phone || "Start a chat",
      href: whatsappUrl,
      icon: <FiMessageCircle />,
    },
    githubUrl && {
      label: "GitHub",
      value: "View repositories",
      href: githubUrl,
      icon: <FiGithub />,
    },
    linkedinUrl && {
      label: "LinkedIn",
      value: "Connect professionally",
      href: linkedinUrl,
      icon: <FiLinkedin />,
    },
  ].filter(Boolean);

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <motion.div
          className="contact-intro"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <span>07 — CONTACT</span>
          <h2>
            Have a project in mind?
            <em> Let’s make it real.</em>
          </h2>
          <p>
            Tell me what you are trying to build, what is already in place,
            and where you need help. I can support the project from interface
            and backend development through deployment.
          </p>

          <div className="contact-cta-row">
            <a href={"mailto:" + email} className="contact-primary">
              Start a project
              <FiArrowUpRight />
            </a>

            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="contact-secondary"
              >
                <FiMessageCircle />
                WhatsApp
              </a>
            )}
          </div>

          <div className="contact-availability">
            <span />
            <div>
              <small>AVAILABILITY</small>
              <strong>
                {profile?.availableForWork === false
                  ? "Currently unavailable"
                  : profile?.availabilityText ||
                    "Open to freelance projects"}
              </strong>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.58, delay: 0.06 }}
        >
          <div className="contact-card-head">
            <span>DIRECT CONTACT</span>
            <strong>Choose what works for you.</strong>
          </div>

          <div className="contact-channels">
            {channels.map((channel) => (
              <div className="contact-channel" key={channel.label}>
                <a
                  href={channel.href}
                  target={channel.label === "Email" ? undefined : "_blank"}
                  rel={channel.label === "Email" ? undefined : "noreferrer"}
                >
                  <div className="contact-channel-icon">{channel.icon}</div>

                  <div className="contact-channel-copy">
                    <span>{channel.label}</span>
                    <strong>{channel.value}</strong>
                  </div>

                  <FiArrowUpRight />
                </a>

                {channel.label === "Email" && (
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email"
                    className="contact-copy"
                  >
                    {copied ? <FiCheck /> : <FiCopy />}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="contact-card-bottom">
            {profile?.location ? (
              <div>
                <FiMapPin />
                <span>{profile.location}</span>
              </div>
            ) : (
              <span>Remote collaboration welcome</span>
            )}

            <span>READY TO DISCUSS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
