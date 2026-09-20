import prisma from "../utils/prisma.js";

export const getPortfolio =
  async (req, res) => {
    try {
      const [
        profile,
        skillCategories,
        projects,
        experiences,
        education,
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

        ]);

      return res.status(200).json({
        success: true,

        portfolio: {
          profile,
          skillCategories,
          projects,
          experiences,
          education,
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