import prisma from "../utils/prisma.js";

const convertSetting = (
  setting
) => {
  switch (
    setting.valueType
  ) {
    case "NUMBER":
      return Number(
        setting.value
      );

    case "BOOLEAN":
      return (
        setting.value ===
        "true"
      );

    case "JSON":
      try {
        return JSON.parse(
          setting.value
        );
      } catch {
        return null;
      }

    default:
      return setting.value;
  }
};

export const getPortfolio =
  async (req, res) => {
    try {
      const [
        profile,
        skillCategories,
        projects,
        experiences,
        career,
        education,
        rawSettings,
      ] =
        await Promise.all([
          prisma.profile.findUnique({
            where: {
              key:
                "main",
            },
          }),

          prisma.skillCategory.findMany({
            where: {
              isActive:
                true,
            },

            orderBy: {
              displayOrder:
                "asc",
            },

            include: {
              skills: {
                where: {
                  isActive:
                    true,
                },

                orderBy: {
                  displayOrder:
                    "asc",
                },
              },
            },
          }),

          prisma.project.findMany({
            where: {
              status:
                "PUBLISHED",
            },

            orderBy: [
              {
                displayOrder:
                  "asc",
              },
              {
                createdAt:
                  "desc",
              },
            ],

            include: {
              images: {
                orderBy: {
                  displayOrder:
                    "asc",
                },
              },

              technologies: {
                include: {
                  skill: {
                    select: {
                      id: true,
                      name: true,
                      slug: true,
                      icon: true,
                    },
                  },
                },
              },
            },
          }),

          prisma.experience.findMany({
            where: {
              isVisible:
                true,
            },

            orderBy: [
              {
                displayOrder:
                  "asc",
              },
              {
                startDate:
                  "desc",
              },
            ],
          }),

          prisma.careerJourney.findMany({
            where: {
              isVisible:
                true,
            },

            orderBy: [
              {
                displayOrder:
                  "asc",
              },
              {
                startDate:
                  "asc",
              },
            ],
          }),

          prisma.education.findMany({
            where: {
              isVisible:
                true,
            },

            orderBy: {
              displayOrder:
                "asc",
            },
          }),

          prisma.siteSetting.findMany(),
        ]);

      const settings = {};

      rawSettings.forEach(
        (setting) => {
          settings[setting.key] =
            convertSetting(
              setting
            );
        }
      );

      return res.status(200).json({
        success: true,

        portfolio: {
          profile,
          skillCategories,
          projects,
          experiences,
          career,
          education,
          settings,
        },
      });
    } catch (error) {
      console.error(
        "Portfolio API error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to retrieve portfolio.",
      });
    }
  };