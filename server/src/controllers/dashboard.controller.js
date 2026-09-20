import prisma from "../utils/prisma.js";

export const getDashboard =
  async (req, res) => {
    try {
      const [
        projects,
        publishedProjects,
        skills,
        skillCategories,
        experiences,
        education,
        profile,
      ] =
        await Promise.all([
          prisma.project.count(),

          prisma.project.count({
            where: {
              status:
                "PUBLISHED",
            },
          }),

          prisma.skill.count(),

          prisma.skillCategory.count(),

          prisma.experience.count(),

          prisma.education.count(),

          prisma.profile.findUnique({
            where: {
              key:
                "main",
            },

            select: {
              fullName: true,
              headline: true,
              availableForWork:
                true,
              updatedAt: true,
            },
          }),
        ]);

      const recentProjects =
        await prisma.project.findMany({
          take: 5,

          orderBy: {
            updatedAt:
              "desc",
          },

          select: {
            id: true,
            title: true,
            slug: true,
            status: true,
            isFeatured: true,
            isCurrent: true,
            updatedAt: true,
          },
        });

      return res.status(200).json({
        success: true,

        dashboard: {
          counts: {
            projects,
            publishedProjects,
            skills,
            skillCategories,
            experiences,
            education,
          },

          profile,

          recentProjects,
        },
      });
    } catch (error) {
      console.error(
        "Dashboard error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to retrieve dashboard.",
      });
    }
  };