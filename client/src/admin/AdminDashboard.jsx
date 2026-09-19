import { motion } from "framer-motion";

import {
  FiUser,
  FiCode,
  FiFolder,
  FiBriefcase,
  FiBookOpen,
  FiActivity,
  FiArrowUpRight,
  FiEye,
} from "react-icons/fi";

import {
  useNavigate,
} from "react-router-dom";

import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate =
    useNavigate();

  const stats = [
    {
      label: "Profile",
      value: "01",
      text: "Personal information",
      icon: <FiUser />,
      path: "/admin/profile",
    },

    {
      label: "Skills",
      value: "Manage",
      text: "Technologies & categories",
      icon: <FiCode />,
      path: "/admin/skills",
    },

    {
      label: "Projects",
      value: "Manage",
      text: "Portfolio case studies",
      icon: <FiFolder />,
      path: "/admin/projects",
    },

    {
      label: "Experience",
      value: "Manage",
      text: "Professional history",
      icon: <FiBriefcase />,
      path: "/admin/experience",
    },

    {
      label: "Career",
      value: "Manage",
      text: "Career journey",
      icon: <FiActivity />,
      path: "/admin/career",
    },

    {
      label: "Education",
      value: "Manage",
      text: "Academic records",
      icon: <FiBookOpen />,
      path: "/admin/education",
    },
  ];

  return (
    <div className="admin-dashboard">
      {/* ===============================================
          HEADER
      =============================================== */}

      <div className="admin-dashboard-header">
        <div>
          <span>
            OVERVIEW
          </span>

          <h1>
            Dashboard
          </h1>

          <p>
            Manage your portfolio
            content from one place.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            window.open(
              "/",
              "_blank"
            )
          }
        >
          <FiEye />

          <span>
            View Portfolio
          </span>

          <FiArrowUpRight />
        </button>
      </div>

      {/* ===============================================
          WELCOME
      =============================================== */}

      <motion.section
        className="admin-dashboard-welcome"
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <div>
          <span className="admin-dashboard-online">
            <i />

            SYSTEM ONLINE
          </span>

          <h2>
            Welcome back,
            <span>
              {" "}
              Suriyaprakash.
            </span>
          </h2>

          <p>
            Update your projects,
            technologies, experience
            and portfolio details
            directly from this
            dashboard.
          </p>
        </div>

        <div className="admin-dashboard-code">
          <span>
            &lt;/&gt;
          </span>
        </div>
      </motion.section>

      {/* ===============================================
          MANAGEMENT GRID
      =============================================== */}

      <div className="admin-dashboard-section-heading">
        <div>
          <span>
            CONTENT
          </span>

          <h3>
            Portfolio Management
          </h3>
        </div>

        <span>
          06 MODULES
        </span>
      </div>

      <div className="admin-dashboard-grid">
        {stats.map(
          (
            item,
            index
          ) => (
            <motion.button
              type="button"
              key={item.label}
              className="admin-dashboard-card"
              onClick={() =>
                navigate(
                  item.path
                )
              }
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay:
                  index * 0.05,
              }}
              whileHover={{
                y: -4,
              }}
            >
              <div className="admin-dashboard-card-top">
                <div className="admin-dashboard-card-icon">
                  {item.icon}
                </div>

                <FiArrowUpRight className="admin-dashboard-card-arrow" />
              </div>

              <div className="admin-dashboard-card-content">
                <span>
                  {item.value}
                </span>

                <h4>
                  {item.label}
                </h4>

                <p>
                  {item.text}
                </p>
              </div>
            </motion.button>
          )
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;